#!/usr/bin/env python3
"""Coffre chiffré de la section TP de Systèmes numériques.

Le dépôt ne contient AUCUNE version lisible des TP : les pages, les PDF et les
fichiers Multisim sont chiffrés (AES-256-GCM, clé dérivée du mot de passe par
PBKDF2-SHA256, 600 000 itérations). Le mot de passe n'est écrit nulle part dans
le dépôt ; le site le demande au visiteur et déchiffre dans son navigateur
(docs/javascripts/coffre.js).

Les sources lisibles vivent dans prive/ (ignoré par git) :

    python outils/coffre.py ouvrir    # déchiffre le coffre vers prive/systemes-numeriques-tp/
    # … modifier / ajouter des pages .md, PDF, fichiers .ms14 dans prive/ …
    python outils/coffre.py fermer    # rend les pages avec MkDocs, chiffre tout vers docs/
    python outils/coffre.py verifier  # (CI) échoue si un fichier lisible traîne dans la section

Le mot de passe est demandé au clavier, ou lu dans la variable COFFRE_MDP.
Dépendance : pip install cryptography
"""

import base64
import getpass
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
SECTION = Path("physique-elec/systemes-numeriques/tp")  # relatif à docs/
PUBLIC = RACINE / "docs" / SECTION
PRIVE = RACINE / "prive" / "systemes-numeriques-tp"
DOSSIER_COFFRE = PUBLIC / "coffre"
CONFIG = DOSSIER_COFFRE / "coffre.json"
MANIFESTE = DOSSIER_COFFRE / "manifeste.bin"

ITERATIONS = 600_000
ENTETE = b"CFR1"
# Fichiers laissés en clair dans la section publique
AUTORISES_EN_CLAIR = {".pages"}


# --------------------------------------------------------------------------- #
# Chiffrement
# --------------------------------------------------------------------------- #

def lire_mdp() -> str:
    mdp = os.environ.get("COFFRE_MDP") or getpass.getpass("Mot de passe du coffre : ")
    if not mdp:
        sys.exit("Mot de passe vide.")
    return mdp


def cle(mdp: str, sel: bytes, iterations: int):
    # Import ici : `verifier` (CI) n'a pas besoin de la bibliothèque cryptography
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=sel, iterations=iterations)
    return AESGCM(kdf.derive(mdp.encode("utf-8")))


def chiffrer(aes, donnees: bytes) -> bytes:
    iv = os.urandom(12)
    return ENTETE + iv + aes.encrypt(iv, donnees, None)


def dechiffrer(aes, blob: bytes) -> bytes:
    if not blob.startswith(ENTETE):
        raise ValueError("format inconnu")
    return aes.decrypt(blob[4:16], blob[16:], None)


def charger_config() -> dict | None:
    if CONFIG.exists():
        return json.loads(CONFIG.read_text(encoding="utf-8"))
    return None


def ouvrir_cle(mdp: str) -> tuple:
    config = charger_config()
    if config is None:
        sys.exit("Pas de coffre dans docs/ : lancer d'abord `fermer`.")
    aes = cle(mdp, base64.b64decode(config["sel"]), config["iterations"])
    try:
        manifeste = json.loads(dechiffrer(aes, MANIFESTE.read_bytes()))
    except Exception:
        sys.exit("Mot de passe incorrect.")
    return aes, manifeste


# --------------------------------------------------------------------------- #
# ouvrir : docs/ (chiffré) → prive/ (lisible)
# --------------------------------------------------------------------------- #

def cmd_ouvrir() -> None:
    aes, manifeste = ouvrir_cle(lire_mdp())
    if PRIVE.exists():
        shutil.rmtree(PRIVE)
    for rel, info in manifeste["pages"].items():
        page = json.loads(dechiffrer(aes, (DOSSIER_COFFRE / info["bin"]).read_bytes()))
        ecrire(PRIVE / rel, page["md"].encode("utf-8"))
    for rel, info in manifeste["fichiers"].items():
        ecrire(PRIVE / rel, dechiffrer(aes, (DOSSIER_COFFRE / info["bin"]).read_bytes()))
    if (PUBLIC / ".pages").exists():
        shutil.copy2(PUBLIC / ".pages", PRIVE / ".pages")
    n = len(manifeste["pages"]) + len(manifeste["fichiers"])
    print(f"{n} fichiers déchiffrés dans {PRIVE.relative_to(RACINE)}/ (ignoré par git).")


def ecrire(chemin: Path, donnees: bytes) -> None:
    chemin.parent.mkdir(parents=True, exist_ok=True)
    chemin.write_bytes(donnees)


# --------------------------------------------------------------------------- #
# fermer : prive/ (lisible) → docs/ (chiffré)
# --------------------------------------------------------------------------- #

def titre_page(md: str, defaut: str) -> str:
    m = re.search(r'^title:\s*"?(.*?)"?\s*$', md, re.M)
    if m:
        return m.group(1)
    m = re.search(r"^#\s+(.+)$", md, re.M)
    return m.group(1).strip() if m else defaut


def url_page(rel: str) -> str:
    """URL (relative à la section) d'une page .md, avec use_directory_urls."""
    p = Path(rel)
    return "" if p.name == "index.md" else f"{p.with_suffix('').as_posix()}/"


def rendre_pages(pages: list[str]) -> dict[str, str]:
    """Construit le site dans un dossier temporaire avec les pages lisibles et
    renvoie le HTML de l'article de chaque page (même rendu que le reste du site)."""
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        for nom in ("mkdocs.yml", "overrides"):
            src = RACINE / nom
            (shutil.copytree if src.is_dir() else shutil.copy2)(src, tmp / nom)
        shutil.copytree(RACINE / "docs", tmp / "docs",
                        ignore=shutil.ignore_patterns("*.jpg", "*.png", "*.webp", "*.pdf"))
        section = tmp / "docs" / SECTION
        shutil.rmtree(section)
        shutil.copytree(PRIVE, section)
        subprocess.run(["mkdocs", "build", "-q", "-d", str(tmp / "site")], cwd=tmp,
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        rendus = {}
        for rel in pages:
            html = (tmp / "site" / SECTION / url_page(rel) / "index.html").read_text(encoding="utf-8")
            m = re.search(r'<article class="md-content__inner md-typeset">(.*?)</article>', html, re.S)
            if not m:
                sys.exit(f"Rendu introuvable pour {rel}")
            rendus[rel] = m.group(1).strip()
        return rendus


def cmd_fermer() -> None:
    if not PRIVE.exists():
        sys.exit(f"{PRIVE.relative_to(RACINE)}/ n'existe pas : lancer d'abord `ouvrir`.")
    mdp = lire_mdp()

    config = charger_config()
    ancien = {"pages": {}, "fichiers": {}}
    if config is None:
        if os.environ.get("COFFRE_MDP") is None and getpass.getpass("Confirmer : ") != mdp:
            sys.exit("Les deux mots de passe ne correspondent pas.")
        config = {"version": 1, "iterations": ITERATIONS,
                  "sel": base64.b64encode(os.urandom(16)).decode()}
        aes = cle(mdp, base64.b64decode(config["sel"]), ITERATIONS)
    else:
        aes, ancien = ouvrir_cle(mdp)
    sel = base64.b64decode(config["sel"])

    def nom_bin(rel: str) -> str:
        # Nom opaque et stable : ne révèle pas le nom du fichier
        return hashlib.sha256(sel + rel.encode()).hexdigest()[:20] + ".bin"

    tous = sorted(p.relative_to(PRIVE).as_posix() for p in PRIVE.rglob("*") if p.is_file())
    pages = [r for r in tous if r.endswith(".md")]
    fichiers = [r for r in tous if not r.endswith(".md") and Path(r).name not in AUTORISES_EN_CLAIR]

    nouveau = {"pages": {}, "fichiers": {}}
    a_garder = {CONFIG.name, MANIFESTE.name}
    DOSSIER_COFFRE.mkdir(parents=True, exist_ok=True)

    # 1) Fichiers joints (PDF, .ms14…) : on ne rechiffre que ce qui a changé
    for rel in fichiers:
        donnees = (PRIVE / rel).read_bytes()
        empreinte = hashlib.sha256(donnees).hexdigest()
        info = {"bin": nom_bin(rel), "sha256": empreinte}
        cible = DOSSIER_COFFRE / info["bin"]
        if ancien["fichiers"].get(rel, {}).get("sha256") != empreinte or not cible.exists():
            cible.write_bytes(chiffrer(aes, donnees))
        nouveau["fichiers"][rel] = info
        a_garder.add(info["bin"])

    # 2) Pages : rendu MkDocs, liens vers les fichiers joints → liens chiffrés
    rendus = rendre_pages(pages)
    section_site = Path("/") / SECTION
    for rel in pages:
        md = (PRIVE / rel).read_text(encoding="utf-8")
        dossier_url = section_site / url_page(rel)

        def remplacer(m: re.Match) -> str:
            balise, href = m.group(0), m.group(1)
            if re.match(r"^(https?:|mailto:|#)", href):
                return balise
            cible_rel = os.path.relpath(os.path.normpath(str(dossier_url / href.split("#")[0])), str(section_site))
            info = nouveau["fichiers"].get(Path(cible_rel).as_posix())
            if not info:
                return balise
            lien = os.path.relpath(str(section_site / "coffre" / info["bin"]), str(dossier_url))
            ouvrir = ' data-ouvrir="1"' if 'target="_blank"' in balise else ""
            balise = balise.replace(f'href="{href}"', 'href="#"', 1)
            balise = re.sub(r'\s(download|target="_blank")(?==|\s|>)(="[^"]*")?', "", balise)
            return balise[:-1] + f' data-coffre="{lien}" data-nom="{Path(cible_rel).name}"{ouvrir}>'

        html = re.sub(r'<a\b[^>]*\bhref="([^"]+)"[^>]*>', remplacer, rendus[rel])
        info = {"bin": nom_bin(rel)}
        (DOSSIER_COFFRE / info["bin"]).write_bytes(
            chiffrer(aes, json.dumps({"md": md, "html": html}, ensure_ascii=False).encode()))
        nouveau["pages"][rel] = info
        a_garder.add(info["bin"])

    # 3) Section publique : seulement des pages « verrou » + le coffre
    for p in sorted(PUBLIC.iterdir()):
        if p.name == "coffre" or p.name in AUTORISES_EN_CLAIR:
            continue
        shutil.rmtree(p) if p.is_dir() else p.unlink()
    if (PRIVE / ".pages").exists():
        shutil.copy2(PRIVE / ".pages", PUBLIC / ".pages")
    for rel in pages:
        md = (PRIVE / rel).read_text(encoding="utf-8")
        dossier_url = section_site / url_page(rel)
        lien = os.path.relpath(str(section_site / "coffre" / nouveau["pages"][rel]["bin"]), str(dossier_url))
        titre = titre_page(md, "Travaux pratiques").replace('"', '\\"')
        ecrire(PUBLIC / rel, (
            "---\n"
            f'title: "{titre}"\n'
            "search:\n  exclude: true\n"
            "---\n\n"
            "<!-- Page chiffrée : voir outils/coffre.py (le contenu lisible n'est pas dans le dépôt). -->\n"
            f'<div class="coffre" data-coffre="{lien}"></div>\n'
        ).encode())
    for p in DOSSIER_COFFRE.iterdir():
        if p.name not in a_garder:
            p.unlink()

    CONFIG.write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
    MANIFESTE.write_bytes(chiffrer(aes, json.dumps(nouveau, ensure_ascii=False).encode()))
    print(f"Coffre fermé : {len(pages)} pages et {len(fichiers)} fichiers chiffrés "
          f"dans docs/{SECTION.as_posix()}/coffre/.")


# --------------------------------------------------------------------------- #
# verifier : garde-fou pour la CI
# --------------------------------------------------------------------------- #

def cmd_verifier() -> None:
    erreurs = []
    for p in sorted(PUBLIC.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(PUBLIC).as_posix()
        if rel.startswith("coffre/"):
            if p.name != CONFIG.name and not p.read_bytes().startswith(ENTETE):
                erreurs.append(f"{rel} : fichier non chiffré dans le coffre")
        elif p.name in AUTORISES_EN_CLAIR:
            continue
        elif p.suffix == ".md":
            texte = p.read_text(encoding="utf-8")
            corps = texte.split("---", 2)[-1]
            lignes = [l for l in corps.strip().splitlines() if l.strip()]
            if not all(l.startswith(("<!--", '<div class="coffre"')) for l in lignes):
                erreurs.append(f"{rel} : page en clair (doit être générée par `coffre.py fermer`)")
        else:
            erreurs.append(f"{rel} : fichier en clair")
    if erreurs:
        print("Section TP protégée : contenu lisible détecté !\n  " + "\n  ".join(erreurs))
        print("→ mettre ces fichiers dans prive/ puis lancer `python outils/coffre.py fermer`.")
        sys.exit(1)
    print("Coffre TP : OK, aucun contenu lisible.")


if __name__ == "__main__":
    commandes = {"ouvrir": cmd_ouvrir, "fermer": cmd_fermer, "verifier": cmd_verifier}
    if len(sys.argv) != 2 or sys.argv[1] not in commandes:
        sys.exit("Usage : python outils/coffre.py ouvrir|fermer|verifier")
    commandes[sys.argv[1]]()
