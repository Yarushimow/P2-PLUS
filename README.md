# P2-PLUS — Révisions EFREI

Site de révision (MkDocs Material) : https://yarushimow.github.io/P2-PLUS/

## Lancer en local

```bash
python -m venv .venv && source .venv/bin/activate   # Windows : .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve        # → http://127.0.0.1:8000, rechargement automatique
```

## Organisation

```
docs/<catégorie>/<matière>/
├── index.md        page d'accueil de la matière
├── cours/          notes de cours (une page par chapitre)
├── td/             corrections de TD
└── fiches/         fiches de révision (_modele.md = modèle, non publié)
```

La navigation est générée depuis l'arborescence ; les fichiers `.pages` fixent
les titres et l'ordre. Les formules LaTeX s'écrivent `$...$` et `$$...$$`.
Admonitions disponibles : `!!! definition`, `!!! theoreme`, `!!! methode`, `!!! piege`.

## Ajouter une matière

```bash
python ajouter_cours.py maths algebre-lineaire --titre "Algèbre linéaire" --code SM302P \
    --description "Espaces vectoriels, matrices, diagonalisation" --icone material-matrix
```

## PDF des profs

À ranger dans un dossier `pdf/` (n'importe où) : il est ignoré par git et exclu du site.

## Publication

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit le
site (`mkdocs build --strict`), optimise les images (`outils/optimiser_images.py` :
copies WebP plus légères et dimensions dans le HTML, sans toucher à `docs/`) et le
publie sur GitHub Pages.

## Section protégée (TP de Systèmes numériques)

Les TP sont chiffrés (AES-256-GCM, clé dérivée du mot de passe par PBKDF2) : le
dépôt ne contient aucune version lisible, et le mot de passe n'y figure nulle
part. Le site le demande et déchiffre dans le navigateur.

```bash
pip install cryptography
python outils/coffre.py ouvrir    # déchiffre vers prive/ (ignoré par git)
# … modifier ou ajouter des pages, PDF, fichiers .ms14 dans prive/systemes-numeriques-tp/ …
python outils/coffre.py fermer    # re-chiffre vers docs/…/tp/
```

Ne jamais ajouter de fichier lisible directement dans `docs/physique-elec/systemes-numeriques/tp/` :
la CI (`coffre.py verifier`) refuse le déploiement.

## Agenda et comptes à rebours

La page **Agenda** et l'encadré de chaque matière affichent le compte à rebours
des CE / DE et le nombre de séances restantes. Les données viennent de
`docs/data/calendrier.json`, généré par `outils/sync_calendrier.py` à partir du
flux iCal de l'emploi du temps Efrei.

- **Mise à jour automatique** : ajouter l'adresse iCal Efrei comme secret
  `EFREI_ICS_URL` (Settings → Secrets and variables → Actions). Le workflow la
  lit chaque nuit à 4 h UTC et à chaque push.
- **Mise à jour manuelle** : `EFREI_ICS_URL="https://…" python outils/sync_calendrier.py`
  (ou `--fichier emploi-du-temps.ics`), puis commit du JSON.
- Une matière est suivie dès que sa page contient
  `<div class="agenda-matiere" data-module="CODE"></div>` (ajouté
  automatiquement par `ajouter_cours.py`).
- Seuls le module, le type de séance, les horaires et les supports autorisés
  sont publiés (pas de salles ni d'enseignants).
