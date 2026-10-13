#!/usr/bin/env python3
"""Crée l'arborescence d'une nouvelle matière dans le site de révision.

Exemples :
    python ajouter_cours.py maths algebre-lineaire --titre "Algèbre linéaire" --code SM302P
    python ajouter_cours.py informatique bdd --titre "Bases de données" --code TI306P \\
        --description "SQL, modèle relationnel, normalisation" --icone material-database

Ce que le script fait :
  - crée docs/<categorie>/<slug>/ avec index.md, cours/, td/, fiches/ (+ fiches/_modele.md) ;
  - crée la catégorie si elle n'existe pas encore (index.md + .pages) ;
  - ajoute une carte vers la matière sur la page d'accueil et sur celle de sa catégorie.

Il n'écrase jamais un fichier existant : on peut le relancer sans risque.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent
DOCS = RACINE / "docs"
ACCUEIL = DOCS / "index.md"
MODELE_FICHE = RACINE / "modeles" / "fiche.md"

CATEGORIES_CONNUES = {
    "maths": ("Maths", "material-sigma"),
    "physique-elec": ("Physique et électronique", "material-atom"),
    "informatique": ("Informatique générale", "material-laptop"),
}

MARQUEUR_FIN_CATEGORIES = "<!-- categories:fin -->"


# Emplacement des cartes dans la page d'une catégorie (docs/<categorie>/index.md)
MARQUEUR_CARTES_CATEGORIE = "<!-- cartes -->"


def marqueur_cartes(categorie: str) -> str:
    return f"<!-- cartes:{categorie} -->"


def ecrire(chemin: Path, contenu: str) -> None:
    """Écrit le fichier seulement s'il n'existe pas déjà."""
    if chemin.exists():
        print(f"  = {chemin.relative_to(RACINE)} (existe déjà, conservé)")
        return
    chemin.parent.mkdir(parents=True, exist_ok=True)
    chemin.write_text(contenu, encoding="utf-8")
    print(f"  + {chemin.relative_to(RACINE)}")


def slug_valide(valeur: str) -> str:
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", valeur):
        raise argparse.ArgumentTypeError(
            f"'{valeur}' : utiliser des minuscules, chiffres et tirets (ex. reseaux-1)"
        )
    return valeur


# --------------------------------------------------------------------------- #
# Contenus générés
# --------------------------------------------------------------------------- #

def page_categorie(titre: str, icone: str) -> str:
    return f"""---
title: {titre}
---

# :{icone}: {titre}

Choisis une matière :

<div class="grid cards" markdown>

{MARQUEUR_CARTES_CATEGORIE}

</div>
"""


def page_matiere(titre: str, code: str, description: str) -> str:
    return f"""---
title: {titre}
---

# {titre} <small>`{code}`</small>

{description}

<div class="agenda-matiere" data-module="{code}"></div>

<div class="grid cards" markdown>

-   :material-school:{{ .lg .middle }} **Cours**

    ---

    Mes notes de cours, chapitre par chapitre.

    [:octicons-arrow-right-24: Notes de cours](cours/index.md)

-   :material-pencil-box-multiple:{{ .lg .middle }} **TD**

    ---

    Corrections rédigées et méthodes des exercices types.

    [:octicons-arrow-right-24: Travaux dirigés](td/index.md)

-   :material-card-text:{{ .lg .middle }} **Fiches**

    ---

    Fiches de révision synthétiques pour les partiels.

    [:octicons-arrow-right-24: Fiches](fiches/index.md)

</div>

## Plan du cours

| Chapitre | Cours | TD | Fiche |
|----------|:-----:|:--:|:-----:|
| 1. …     |       |    |       |

## Infos pratiques

- **Code** : `{code}`
- **Évaluation** : …
- **Ressources officielles** : dans `pdf/` (local, non publié)
"""


def page_section(titre: str, texte: str) -> str:
    return f"""# {titre}

{texte}
"""


def modele_fiche() -> str:
    return MODELE_FICHE.read_text(encoding="utf-8")


def pages_meta(titre: str, nav: list[str] | None = None) -> str:
    lignes = [f"title: {titre}"]
    if nav:
        lignes.append("nav:")
        lignes += [f"  - {element}" for element in nav]
    return "\n".join(lignes) + "\n"


def carte_matiere(dossier: str, titre: str, code: str,
                  description: str, icone: str) -> str:
    """Carte d'une matière ; `dossier` est le chemin relatif vers la matière."""
    return f"""-   :{icone}:{{ .lg .middle }} **{titre}** · `{code}`

    ---

    {description}

    [:octicons-arrow-right-24: Réviser]({dossier}/index.md)

"""


def bloc_categorie(categorie: str, titre: str, icone: str) -> str:
    return f"""## :{icone}: {titre}

<div class="grid cards" markdown>

{marqueur_cartes(categorie)}

</div>

"""


# --------------------------------------------------------------------------- #
# Actions
# --------------------------------------------------------------------------- #

def creer_categorie(categorie: str, titre: str, icone: str) -> None:
    dossier = DOCS / categorie
    ecrire(dossier / "index.md", page_categorie(titre, icone))
    ecrire(dossier / ".pages", pages_meta(titre, ["index.md", "..."]))


def ajouter_au_menu_categorie(categorie: str, slug: str) -> None:
    """Place la matière dans le menu de la catégorie, dans l'ordre de création."""
    fichier = DOCS / categorie / ".pages"
    texte = fichier.read_text(encoding="utf-8")
    if f"  - {slug}\n" in texte or "  - ...\n" not in texte:
        return
    fichier.write_text(texte.replace("  - ...\n", f"  - {slug}\n  - ...\n"), encoding="utf-8")


def creer_matiere(categorie: str, slug: str, titre: str, code: str,
                  description: str) -> None:
    ajouter_au_menu_categorie(categorie, slug)
    dossier = DOCS / categorie / slug
    ecrire(dossier / "index.md", page_matiere(titre, code, description))
    ecrire(dossier / ".pages",
           pages_meta(f"{titre} ({code})", ["index.md", "cours", "td", "fiches"]))

    ecrire(dossier / "cours" / "index.md", page_section(
        "Notes de cours",
        "Une page par chapitre : `chapitre-1.md`, `chapitre-2.md`…",
    ))
    ecrire(dossier / "cours" / ".pages", pages_meta("Cours"))

    ecrire(dossier / "td" / "index.md", page_section(
        "Travaux dirigés",
        "Une page par TD : `td-1.md`, `td-2.md`… avec l'énoncé résumé et la méthode.",
    ))
    ecrire(dossier / "td" / ".pages", pages_meta("TD"))

    ecrire(dossier / "fiches" / "index.md", page_section(
        "Fiches de révision",
        "Pour créer une fiche, copie `_modele.md` (non publié) sous un nouveau nom.",
    ))
    ecrire(dossier / "fiches" / ".pages", pages_meta("Fiches"))
    ecrire(dossier / "fiches" / "_modele.md", modele_fiche())


def ajouter_carte_accueil(categorie: str, slug: str, titre: str, code: str,
                          description: str, icone: str,
                          titre_categorie: str, icone_categorie: str) -> None:
    texte = ACCUEIL.read_text(encoding="utf-8")
    lien = f"({categorie}/{slug}/index.md)"
    if lien in texte:
        print(f"  = {ACCUEIL.relative_to(RACINE)} (carte déjà présente)")
        return

    marqueur = marqueur_cartes(categorie)
    if marqueur not in texte:
        if MARQUEUR_FIN_CATEGORIES not in texte:
            sys.exit(f"Marqueur {MARQUEUR_FIN_CATEGORIES} introuvable dans docs/index.md")
        texte = texte.replace(
            MARQUEUR_FIN_CATEGORIES,
            bloc_categorie(categorie, titre_categorie, icone_categorie)
            + MARQUEUR_FIN_CATEGORIES,
        )

    carte = carte_matiere(f"{categorie}/{slug}", titre, code, description, icone)
    texte = texte.replace(marqueur, carte + marqueur)
    ACCUEIL.write_text(texte, encoding="utf-8")
    print(f"  ~ {ACCUEIL.relative_to(RACINE)} (carte ajoutée)")


def ajouter_carte_categorie(categorie: str, slug: str, titre: str, code: str,
                            description: str, icone: str) -> None:
    fichier = DOCS / categorie / "index.md"
    nom = fichier.relative_to(RACINE)
    texte = fichier.read_text(encoding="utf-8")
    if f"({slug}/index.md)" in texte:
        print(f"  = {nom} (carte déjà présente)")
        return
    if MARQUEUR_CARTES_CATEGORIE not in texte:
        print(f"  ! {nom} : marqueur {MARQUEUR_CARTES_CATEGORIE} absent, carte non ajoutée")
        return
    carte = carte_matiere(slug, titre, code, description, icone)
    fichier.write_text(texte.replace(MARQUEUR_CARTES_CATEGORIE, carte + MARQUEUR_CARTES_CATEGORIE),
                       encoding="utf-8")
    print(f"  ~ {nom} (carte ajoutée)")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Crée l'arborescence d'une nouvelle matière (index, cours/, td/, fiches/).",
    )
    parser.add_argument("categorie", type=slug_valide,
                        help="dossier de la catégorie, ex. maths, physique-elec, informatique")
    parser.add_argument("slug", type=slug_valide,
                        help="nom de dossier de la matière, ex. reseaux-2")
    parser.add_argument("--titre", required=True, help='ex. "Réseaux 2"')
    parser.add_argument("--code", required=True, help="code EFREI, ex. TI306P")
    parser.add_argument("--description", default="",
                        help="une phrase affichée sur la carte d'accueil")
    parser.add_argument("--icone", default="material-book-open-variant",
                        help="icône Material de la carte, ex. material-lan")
    parser.add_argument("--titre-categorie",
                        help="titre lisible si la catégorie est nouvelle")
    parser.add_argument("--icone-categorie", default="material-folder",
                        help="icône si la catégorie est nouvelle")
    args = parser.parse_args()

    titre_cat, icone_cat = CATEGORIES_CONNUES.get(
        args.categorie,
        (args.titre_categorie or args.categorie.replace("-", " ").capitalize(),
         args.icone_categorie),
    )
    description = args.description or f"Cours, TD et fiches de {args.titre}."

    print(f"Matière « {args.titre} » ({args.code}) → docs/{args.categorie}/{args.slug}/")
    creer_categorie(args.categorie, titre_cat, icone_cat)
    creer_matiere(args.categorie, args.slug, args.titre, args.code, description)
    ajouter_carte_accueil(args.categorie, args.slug, args.titre, args.code,
                          description, args.icone, titre_cat, icone_cat)
    ajouter_carte_categorie(args.categorie, args.slug, args.titre, args.code,
                            description, args.icone)
    print("Terminé. Lance `mkdocs serve` pour voir le résultat.")


if __name__ == "__main__":
    main()
