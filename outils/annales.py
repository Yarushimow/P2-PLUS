"""Génère les pages d'index « Annales » (liens vers les SharePoint des départements de maths et de physique).

Les PDF restent sur SharePoint (accès réservé aux comptes EFREI) : le site ne fait que pointer dessus.
Pour ajouter une annale : ajouter son nom de fichier SharePoint dans FICHIERS, puis
    python outils/annales.py champs-em          (une ou plusieurs matières)
Attention : les pages Annales de maths ont été retouchées à la main depuis (CE rédigés,
encadré « ce qui tombe au CE ») ; les régénérer écraserait ces ajouts.
"""
import re
from pathlib import Path
from urllib.parse import quote

SP = "https://efrei365net.sharepoint.com/sites/"
DOCS = Path(__file__).resolve().parent.parent / "docs"

# matière -> (dossier dans docs/, site SharePoint, nom du département)
MATIERES = {
    "probabilites": ("maths/probabilites", "DepartementMathematiques", "maths"),
    "fonctions-plusieurs-variables": ("maths/fonctions-plusieurs-variables", "DepartementMathematiques", "maths"),
    "champs-em": ("physique-elec/champs-em", "DepartementPhysique", "physique"),
    "physique-moderne": ("physique-elec/physique-moderne", "DepartementPhysique", "physique"),
    "systemes-numeriques": ("physique-elec/systemes-numeriques", "DepartementPhysique", "physique"),
}

# Noms exacts sur SharePoint ; « | » remplace une espace dans le nom (ex. « 2526-SM301-DE .pdf »).
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
    "champs-em": """
2122-SP301-CE.pdf 2122-SP301-CE|Correction.pdf 2122-SP301-DE|.pdf 2122-SP301-DE-correction.pdf
2223-SP301-DE.pdf 2223-SP301-DE-correction.pdf 2324-SP301-DE.pdf 2425-SP301-DE-correction.pdf
2526-SP301-DE.pdf 2526-SP301-DE-correction.pdf
2122-SP301I-CE.pdf 2021-SP301I-DE.pdf 2122-SP301I-DE.pdf 2223-SP301I-DE.pdf 2324-SP301I-DE.pdf
""",
    "physique-moderne": """
2223-SP303-DE-Correction.pdf 2324-SP303-DE-Correction.pdf 2425-SP303-DE-Correction.pdf 2526-SP303-DE-correction.pdf
""",
    "systemes-numeriques": """
2526-TE302-CE.pdf 2223-TE302-DE-correction.pdf 2324-TE302-DE-correction.pdf
2425-TE302-DE|-|Correction.pdf 2526-TE302-DE.pdf 2526-TE302-DE-correction.pdf
""",
}

# Fichiers que SharePoint classe comme corrigés malgré leur nom.
CORRIGES_FORCES = {"2122-SM302I-DE.pdf"}

# Corrections rédigées sur le site : (matière, type, année de début) -> page
CORRECTIONS = {
    ("fonctions-plusieurs-variables", "DE", 2023): "annale-de-2023.md",
    ("fonctions-plusieurs-variables", "DE", 2024): "annale-de-2024.md",
    ("champs-em", "DE", 2022): "annale-de-2022.md",
    ("champs-em", "DE", 2023): "annale-de-2023.md",
    ("systemes-numeriques", "DE", 2023): "annale-de-2023.md",
}

INTRO = {
    "probabilites": "Probabilités (SM301P)",
    "fonctions-plusieurs-variables": "Fonctions de plusieurs variables (SM302P)",
    "champs-em": "Champs électromagnétiques (SP301P)",
    "physique-moderne": "Physique moderne (SP303P)",
    "systemes-numeriques": "Systèmes numériques (TE302P)",
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
    "champs-em": """
## Corrections rédigées

| Annale | Contenu |
|--------|---------|
| [DE 2022-2023](annale-de-2022.md) | Triangle de charges, sphère creuse (Gauss + potentiel), spire |
| [DE 2023-2024](annale-de-2023.md) | Atome d'hydrogène, condensateurs cylindrique et plan, Ampère avec $J_s$ |
""",
    "physique-moderne": """
## Corrections rédigées

| Annale | Contenu |
|--------|---------|
| [CE 2022-2023](annale-ce-2022.md) | Le CE complet, corrigé |
""",
    "systemes-numeriques": """
## Corrections rédigées

| Annale | Contenu |
|--------|---------|
| [DE 2023-2024](annale-de-2023.md) | QCM, compteur {1, 3, 0, 4} en JK et en $J = K$ |
""",
}


def analyse(nom):
    affiche = nom.replace("|", " ")
    m = re.match(r"([\d-]+)-(?:SM|SP|TE)\d{3}(I?)-(CE|DE)", affiche)
    annee = 2000 + int(m.group(1).replace("-", "")[:2])
    anglais = m.group(2) == "I"
    typ = m.group(3)
    corrige = bool(re.search(r"solution|correction", affiche, re.I)) or affiche in CORRIGES_FORCES
    return annee, typ, anglais, corrige, affiche


def page(matiere):
    _, site_sp, departement = MATIERES[matiere]

    def lien(nom, texte):
        return f"[{texte}]({SP}{site_sp}/Documents%20partages/{quote(nom)}){{ target=_blank }}"

    lignes = {}
    for brut in FICHIERS[matiere].split():
        annee, typ, en, corr, nom = analyse(brut)
        lignes.setdefault((typ, annee), {})[(en, corr)] = nom
    out = [
        "# Annales",
        "",
        f"Sujets et corrigés officiels de **{INTRO[matiere]}**, hébergés sur le "
        f"[SharePoint du département de {departement}]({SP}{site_sp}).",
        "",
        '!!! info "Connexion EFREI nécessaire"',
        "    Les liens ouvrent les PDF sur SharePoint : il faut être connecté avec ton compte EFREI.",
        "    Méthode conseillée : conditions d'examen, sans cours ni corrigé,",
        "    puis le cours si tu bloques, et le corrigé en dernier.",
        "",
    ]
    for typ, titre in (("CE", "Contrôles écrits (CE)"), ("DE", "Devoirs sur table (DE)")):
        annees = sorted((a for t, a in lignes if t == typ), reverse=True)
        if not annees:
            continue
        avec_site = any(k[0] == matiere for k in CORRECTIONS)
        avec_en = any(en for (t, _), d in lignes.items() if t == typ for en, _ in d)
        entete = "| Année | Sujet | Corrigé |" + (" English |" if avec_en else "") + (" Correction du site |" if avec_site else "")
        sep = "|-------|:-----:|:-------:|" + (":-------:|" if avec_en else "") + (":------------------:|" if avec_site else "")
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
            en = f" {en} |" if avec_en else ""
            out.append(f"| {a}-{a + 1} | {cell(False, False, ':material-file-pdf-box: Sujet')} | "
                       f"{cell(False, True, ':material-check-circle: Corrigé')} |{en}{site}")
        out.append("")
    out.append(EXTRA.get(matiere, "").strip())
    return "\n".join(out).rstrip() + "\n"


if __name__ == "__main__":
    import sys
    for m in sys.argv[1:] or [m for m in FICHIERS if MATIERES[m][2] == "physique"]:
        dossier = DOCS / MATIERES[m][0] / "annales"
        dossier.mkdir(exist_ok=True)
        (dossier / "index.md").write_text(page(m), encoding="utf-8")
        print("écrit", dossier / "index.md")
