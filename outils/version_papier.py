#!/usr/bin/env python3
"""Remplit les onglets « Version papier » à partir des PDF des profs.

Dans une page Markdown, on place (indenté comme le reste de l'onglet) :

    <!-- papier: pdf/SP402P/chapitre-1.pdf | Chapitre 1 — support 2025-2026 | ch1 | diapo -->

champs : PDF source (gardé en local, jamais publié) | nom affiché | sous-dossier des
images | mot pour une page (« diapo » ou « page »), et en option | pages (ex. 3-12).

    python outils/version_papier.py docs/physique-elec/thermodynamique/cours/*.md

Le script rend chaque page en JPG dans <dossier de la page>/papier/<sous-dossier>/ et
écrit sous le commentaire une image cliquable + une légende (titre de la page) par
page, jusqu'au marqueur <!-- /papier -->. Relancer le script régénère le bloc.
"""

import html
import re
import subprocess
import sys
import tempfile
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
LARGEUR = 1100
QUALITE = 70

BALISE = re.compile(
    r"^(?P<retrait>[ \t]*)<!-- papier: (?P<champs>[^>]*?) -->\n"
    r"(?:.*?^[ \t]*<!-- /papier -->\n)?",
    re.M | re.S,
)


_pages_texte: dict[Path, list[list[str]]] = {}


def lignes_pages(pdf: Path) -> list[list[str]]:
    """Lignes de texte de chaque page (pdftotext sépare les pages par un saut de page)."""
    if pdf not in _pages_texte:
        texte = subprocess.run(["pdftotext", "-q", str(pdf), "-"], capture_output=True, text=True).stdout
        _pages_texte[pdf] = [[re.sub(r"\s+", " ", l).strip(" •▪●–-\u2022\uf0b7\uf0a7")
                              for l in page.splitlines()] for page in texte.split("\f")]
    return _pages_texte[pdf]


def titre_page(pdf: Path, n: int) -> str:
    pages = lignes_pages(pdf)
    if n - 1 >= len(pages):
        return ""
    # Lignes répétées sur beaucoup de pages (pied de page, nom du prof, titre du cours) : ignorées
    frequence: dict[str, int] = {}
    for page in pages:
        for ligne in set(page):
            frequence[ligne] = frequence.get(ligne, 0) + 1
    seuil = max(3, len(pages) // 4)
    for ligne in pages[n - 1]:
        if len(ligne) < 4 or re.fullmatch(r"[\d\s/.,]+", ligne) or "efrei" in ligne.lower():
            continue
        if len(pages) > 6 and frequence.get(ligne, 0) > seuil:
            continue
        # Bouts de formules (lettres mathématiques Unicode, peu de lettres) : on passe
        lettres = sum(ch.isalpha() for ch in ligne)
        if (any(0x1D400 <= ord(ch) <= 0x1D7FF for ch in ligne) or len(ligne.split()) < 2
                or lettres < 4 or lettres < 0.6 * len(ligne.replace(" ", ""))):
            continue
        return ligne[:90] + ("…" if len(ligne) > 90 else "")
    return ""


def nombre_pages(pdf: Path) -> int:
    info = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True).stdout
    return int(re.search(r"^Pages:\s+(\d+)", info, re.M).group(1))


def generer(page_md: Path, retrait: str, champs: str) -> str:
    morceaux = [c.strip() for c in champs.split("|")]
    source, nom, dossier, mot = morceaux[:4]
    pdf = RACINE / source
    if not pdf.exists():
        sys.exit(f"{page_md}: PDF introuvable : {source}")
    total = nombre_pages(pdf)
    debut, fin = 1, total
    if len(morceaux) > 4 and morceaux[4]:
        a, _, b = morceaux[4].partition("-")
        debut, fin = int(a), int(b or a)

    cible = page_md.parent / "papier" / dossier
    cible.mkdir(parents=True, exist_ok=True)
    for ancien in cible.glob("*.jpg"):
        ancien.unlink()
    chiffres = len(str(fin))
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["pdftoppm", "-f", str(debut), "-l", str(fin), "-scale-to-x", str(LARGEUR),
                        "-scale-to-y", "-1", "-jpeg", "-jpegopt", f"quality={QUALITE}",
                        str(pdf), f"{tmp}/p"], check=True)
        for f in sorted(Path(tmp).glob("p-*.jpg")):
            n = int(f.stem.split("-")[1])
            f.rename(cible / f"p{n:0{max(chiffres, 2)}d}.jpg")

    lignes = [f"{retrait}<!-- papier: {champs} -->"]
    for n in range(debut, fin + 1):
        img = f"papier/{dossier}/p{n:0{max(chiffres, 2)}d}.jpg"
        titre = titre_page(pdf, n)
        ou = f"{nom}, {mot} {n}"
        alt = html.escape(f"{ou} : {titre}" if titre else ou).replace("[", "(").replace("]", ")")
        legende = html.escape(f"{titre} · {ou}" if titre else ou)
        lignes += [
            "",
            f"{retrait}[![{alt}]({img}){{ loading=lazy .papier }}]({img})",
            f'{retrait}<p class="papier-legende">{legende}</p>',
        ]
    lignes += ["", f"{retrait}<!-- /papier -->", ""]
    print(f"  {page_md.relative_to(RACINE)} ← {source} ({fin - debut + 1} {mot}s)")
    return "\n".join(lignes)


def main() -> None:
    for chemin in sys.argv[1:]:
        page = Path(chemin).resolve()
        texte = page.read_text(encoding="utf-8")
        nouveau = BALISE.sub(lambda m: generer(page, m.group("retrait"), m.group("champs")), texte)
        if nouveau != texte:
            page.write_text(nouveau, encoding="utf-8")


if __name__ == "__main__":
    main()
