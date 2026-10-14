#!/usr/bin/env python3
"""Optimise les images du site construit (à lancer après `mkdocs build`).

    python outils/optimiser_images.py site

Pour chaque <img> qui pointe vers une image locale du site :
  - ajoute width/height (la page réserve la place de l'image avant son
    chargement : plus de décalage pendant la lecture) ;
  - crée une copie WebP quand elle est nettement plus légère, et fait pointer
    l'image affichée dessus. Le lien autour de l'image (zoom) garde l'original.

Ne touche qu'au dossier `site/` généré : les sources dans docs/ ne changent pas.
"""

import re
import sys
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path
from urllib.parse import unquote

from PIL import Image

QUALITE_WEBP = 80
GAIN_MINIMUM = 0.15  # on ne garde le WebP que s'il est au moins 15 % plus léger
FORMATS = {".jpg", ".jpeg", ".png"}

BALISE_IMG = re.compile(r"<img\b[^>]*>", re.IGNORECASE)
ATTR_SRC = re.compile(r'\ssrc="([^"]+)"')


def traiter_image(chemin: Path) -> tuple[Path, int, int, bool, int, int]:
    """Renvoie (chemin, largeur, hauteur, webp_garde, octets_avant, octets_apres)."""
    avant = chemin.stat().st_size
    with Image.open(chemin) as im:
        largeur, hauteur = im.size
        webp = chemin.with_suffix(".webp")
        if not webp.exists():
            im.save(webp, "WEBP", quality=QUALITE_WEBP, method=6)
    apres = webp.stat().st_size
    if apres > avant * (1 - GAIN_MINIMUM):
        webp.unlink()
        return chemin, largeur, hauteur, False, avant, avant
    return chemin, largeur, hauteur, True, avant, apres


def main() -> None:
    site = Path(sys.argv[1] if len(sys.argv) > 1 else "site").resolve()
    pages = list(site.rglob("*.html"))

    # 1) Repérer les images locales utilisées par les pages
    references: dict[Path, list[tuple[Path, str]]] = {}
    images: set[Path] = set()
    for page in pages:
        html = page.read_text(encoding="utf-8")
        for balise in BALISE_IMG.findall(html):
            m = ATTR_SRC.search(balise)
            if not m or re.match(r"^(https?:|data:|//)", m.group(1)):
                continue
            fichier = (page.parent / unquote(m.group(1).split("?")[0])).resolve()
            if fichier.suffix.lower() in FORMATS and fichier.is_file() and site in fichier.parents:
                images.add(fichier)
                references.setdefault(page, []).append((fichier, balise))

    # 2) Convertir en parallèle
    with ProcessPoolExecutor() as pool:
        resultats = {r[0]: r for r in pool.map(traiter_image, sorted(images), chunksize=8)}

    # 3) Réécrire les balises <img>
    for page, liste in references.items():
        html = page.read_text(encoding="utf-8")
        for fichier, balise in liste:
            _, largeur, hauteur, webp, _, _ = resultats[fichier]
            nouvelle = balise
            if webp:
                nouvelle = ATTR_SRC.sub(
                    lambda m: ' src="' + re.sub(r"\.(jpe?g|png)$", ".webp", m.group(1), flags=re.I) + '"',
                    nouvelle, count=1)
            if not re.search(r"\swidth=", nouvelle):
                nouvelle = re.sub(r"\s*/?>$", f' width="{largeur}" height="{hauteur}" />', nouvelle)
            html = html.replace(balise, nouvelle)
        page.write_text(html, encoding="utf-8")

    avant = sum(r[4] for r in resultats.values())
    apres = sum(r[5] for r in resultats.values())
    nb_webp = sum(r[3] for r in resultats.values())
    print(f"{len(images)} images, {nb_webp} converties en WebP : "
          f"{avant / 1e6:.1f} Mo → {apres / 1e6:.1f} Mo affichés "
          f"(-{100 * (1 - apres / max(avant, 1)):.0f} %)")


if __name__ == "__main__":
    main()
