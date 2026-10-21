"""Génère les pages d'index « Annales » (liens vers le SharePoint du département de maths).

Les PDF restent sur SharePoint (accès réservé aux comptes EFREI) : le site ne fait que pointer dessus.
Pour ajouter une annale : ajouter son nom de fichier SharePoint dans FICHIERS, puis
    python outils/annales.py
"""
from pathlib import Path
from urllib.parse import quote

BASE = "https://efrei365net.sharepoint.com/sites/DepartementMathematiques/Documents%20partages/"
DOCS = Path(__file__).resolve().parent.parent / "docs" / "maths"

# Noms exacts sur SharePoint (attention à « 2526-SM301-DE .pdf », avec une espace).
FICHIERS = {
    "probabilites": """
1920-SM301-DE.pdf 2021-SM301-DE.pdf 2021-SM301-DE-Solution.pdf 2122-SM301-DE-Solution.pdf
2223-SM301-CE.pdf 2223-SM301-CE-Solution.pdf 2223-SM301-DE.pdf 2223-SM301-DE-Solution.pdf 2223-SM301I-CE.pdf
2324-SM301-CE.pdf 2324-SM301-CE-Solution.pdf 2324-SM301-DE.pdf 2324-SM301-DE-Solution.pdf 2324-SM301I-CE.pdf 2324-SM301I-DE.pdf
2425-SM301-CE.pdf 2425-SM301-CE-Solution.pdf 2425-SM301-DE.pdf 2425-SM301-DE-Solution.pdf
2425-SM301I-CE.pdf 2425-SM301I-CE-Solution.pdf 2425-SM301I-DE.pdf 2425-SM301I-DE-Solution.pdf
2526-SM301-CE.pdf 2526-SM301-CE-Solution.pdf 2526-SM301-DE|.pdf 2526-SM301-DE-Solution.pdf
2526-SM301I-CE.pdf 2526-SM301I-CE-Solution.pdf 2526-SM301I-DE.pdf 2526-SM301I-DE-Solution.pdf
2627-SM301-CE.pdf 2627-SM301-CE-Solution.pdf 2627-SM301I-CE.pdf 2627-SM301I-CE-Solution.pdf
""",
    "fonctions-plusieurs-variables": """
2021-SM302-CE.pdf 2021-SM302-CE-Solution.pdf 2021-SM302-DE.pdf 2021-SM302-DE-Solution.pdf
2122-SM302-CE.pdf 2122-SM302-CE-Solution.pdf 2122-SM302-DE.pdf 2122-SM302-DE-Solution.pdf
2122-SM302I-CE.pdf 2122-SM302I-DE.pdf
2223-SM302-DE.pdf 2223-SM302-DE-Solution.pdf 2223-SM302I-DE.pdf
23-24-SM302I-DE.pdf 2324-SM302-DE.pdf 2324-SM302-DE-Solution.pdf
2425-SM302-CE.pdf 2425-SM302-CE-Solution.pdf 2425-SM302-DE.pdf 2425-SM302-DE-Solution.pdf
2425-SM302I-CE.pdf 2425-SM302I-DE.pdf
2526-SM302-CE.pdf 2526-SM302-CE-Solution.pdf 2526-SM302-DE.pdf 2526-SM302-DE-Solution.pdf
2526-SM302I-CE.pdf 2526-SM302I-DE.pdf
""",
}

# Fichiers que SharePoint classe comme corrigés malgré leur nom.
CORRIGES_FORCES = {"2122-SM302I-DE.pdf"}

# Corrections rédigées sur le site : (matière, type, année de début) -> page
CORRECTIONS = {
    ("fonctions-plusieurs-variables", "DE", 2023): "annale-de-2023.md",
    ("fonctions-plusieurs-variables", "DE", 2024): "annale-de-2024.md",
}

INTRO = {
    "probabilites": "Probabilités (SM301P)",
    "fonctions-plusieurs-variables": "Fonctions de plusieurs variables (SM302P)",
}

EXTRA = {
    "fonctions-plusieurs-variables": """
## Corrections rédigées

| Annale | Contenu |
|--------|---------|
| [DE blanc 2023-2024](annale-de-blanc.md) | Continuité + polaires, cercle de maxima, cylindriques, EDP, optimisation |
| [DE 2023-2024](annale-de-2023.md) | Cours, EDP par changement de variables, intégrales, Viviani |
| [DE 2024-2025](annale-de-2024.md) | Points critiques, hessiennes, lagrangien, Torricelli |
""",
}


def analyse(nom):
    affiche = nom.replace("|", " ")
    prefixe = nom.split("-SM")[0].replace("-", "")
    annee = 2000 + int(prefixe[:2])
    corps = nom.split("-SM")[1]
    anglais = corps[3] == "I"
    typ = "CE" if "-CE" in corps else "DE"
    corrige = "Solution" in nom or nom in CORRIGES_FORCES
    return annee, typ, anglais, corrige, affiche


def lien(nom, texte):
    return f"[{texte}]({BASE}{quote(nom)}){{ target=_blank }}"


def page(matiere):
    lignes = {}
    for brut in FICHIERS[matiere].split():
        annee, typ, en, corr, nom = analyse(brut)
        lignes.setdefault((typ, annee), {})[(en, corr)] = nom
    out = [
        "# Annales",
        "",
        f"Sujets et corrigés officiels de **{INTRO[matiere]}**, hébergés sur le "
        "[SharePoint du département de maths](https://efrei365net.sharepoint.com/sites/DepartementMathematiques).",
        "",
        '!!! info "Connexion EFREI nécessaire"',
        "    Les liens ouvrent les PDF sur SharePoint : il faut être connecté avec ton compte EFREI.",
        "    Méthode conseillée par le département : 2 h en conditions d'examen, sans cours ni corrigé,",
        "    puis le cours si tu bloques, et le corrigé en dernier.",
        "",
    ]
    for typ, titre in (("CE", "Contrôles écrits (CE)"), ("DE", "Devoirs sur table (DE)")):
        annees = sorted((a for t, a in lignes if t == typ), reverse=True)
        if not annees:
            continue
        avec_site = any(k[0] == matiere for k in CORRECTIONS)
        entete = "| Année | Sujet | Corrigé | English |" + (" Correction du site |" if avec_site else "")
        sep = "|-------|:-----:|:-------:|:-------:|" + (":------------------:|" if avec_site else "")
        out += [f"## {titre}", "", entete, sep]
        for a in annees:
            d = lignes[(typ, a)]
            def cell(en, corr, txt):
                return lien(d[(en, corr)], txt) if (en, corr) in d else "—"
            en = " · ".join(x for x in (
                lien(d[(True, False)], "Subject") if (True, False) in d else "",
                lien(d[(True, True)], "Solution") if (True, True) in d else "") if x) or "—"
            site = CORRECTIONS.get((matiere, typ, a))
            site = f" [:material-pencil: Rédigée]({site}) |" if site else (" |" if avec_site else "")
            out.append(f"| {a}-{a + 1} | {cell(False, False, ':material-file-pdf-box: Sujet')} | "
                       f"{cell(False, True, ':material-check-circle: Corrigé')} | {en} |{site}")
        out.append("")
    out.append(EXTRA.get(matiere, "").strip())
    return "\n".join(out).rstrip() + "\n"


if __name__ == "__main__":
    for m in FICHIERS:
        dossier = DOCS / m / "annales"
        dossier.mkdir(exist_ok=True)
        (dossier / "index.md").write_text(page(m), encoding="utf-8")
        print("écrit", dossier / "index.md")
