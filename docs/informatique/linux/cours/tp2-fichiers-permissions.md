---
title: "TP2 — Système de fichiers et permissions"
---

# TP2 — Système de fichiers et permissions

Hiérarchie des répertoires, utilisateurs, lecture et modification des droits,
droits sur les répertoires, `PATH`. Exercices corrigés : [TP2 corrigé](../td/tp2-corrige.md).

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp2/){ .md-button }
[:material-card-text: Résumé](../fiches/resume-tp2.md){ .md-button }

!!! abstract "À retenir"
    - `ls -l` : 1 caractère de **type** + 9 bits `rwx` pour **u**ser / **g**roup / **o**thers.
    - Poids : **r = 4, w = 2, x = 1** → `rwxr-xr--` = 754.
    - Sur un **dossier** : `r` = lister, `w` = créer / supprimer / renommer, `x` = entrer et accéder.
    - Supprimer ou créer un fichier → `w` + `x` sur le **dossier parent**.
    - Le shell cherche les commandes dans le `PATH`, **dans l'ordre** ; la première trouvée gagne.

## Hiérarchie du système de fichiers

Une seule arborescence qui part de `/` : pas de lettres de lecteur, les disques
sont **montés** dans l'arbre (norme FHS).

| Répertoire | Contenu |
|------------|---------|
| `/bin`, `/sbin` | Programmes essentiels / d'administration |
| `/boot` | Démarrage (noyau) |
| `/dev` | Périphériques (sous forme de fichiers) |
| `/etc` | Configuration (dont `/etc/passwd`) |
| `/home` | Répertoires des utilisateurs |
| `/lib` | Bibliothèques, modules du noyau |
| `/media`, `/mnt` | Points de montage |
| `/opt` | Logiciels additionnels |
| `/proc` | Système virtuel décrivant les processus |
| `/root` | Home de l'administrateur |
| `/tmp` | Fichiers temporaires |
| `/usr` | Programmes et bibliothèques installés |
| `/var` | Données variables : journaux, mails, bases |

!!! definition "Définition — Inode"
    Le nom d'un fichier est rangé dans son répertoire, qui l'associe à un **numéro
    d'inode**. L'inode contient les métadonnées (taille, droits, propriétaire, dates)
    et l'emplacement des données. Un répertoire est donc une **table nom → inode**.

## Utilisateurs et `/etc/passwd`

`id` affiche UID, GID et groupes (`id root` : UID 0). Chaque ligne de
`/etc/passwd` décrit un compte en **7 champs** séparés par `:` :

```text
yoan:x:1000:1000:Yoan:/home/yoan:/bin/bash
login:mdp:UID:GID:commentaire:home:shell
```

Le `x` indique que le mot de passe (haché) est dans `/etc/shadow`.

## Lire les permissions

```text
-rwxr-xr--  1  yoan  etu  2048  sept. 9  tp2.sh
│└┬┘└┬┘└┬┘  │   │     │    │      │       └ nom
│ u  g  o   │   │     │    │      └ date de modification
│           │   │     │    └ taille (octets)
│           │   │     └ groupe
│           │   └ propriétaire
│           └ nombre de liens
└ type : - fichier, d répertoire, l lien symbolique
```

`ls -l dossier` liste le **contenu** ; `ls -ld dossier` affiche le dossier **lui-même**.

| Octal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|-------|---|---|---|---|---|---|---|---|
| rwx | `---` | `--x` | `-w-` | `-wx` | `r--` | `r-x` | `rw-` | `rwx` |

## Modifier les permissions : `chmod`

=== "Notation symbolique"

    `chmod [ugoa][+-=][rwx] fichier` — on peut chaîner avec des virgules.

    | Commande | Effet |
    |----------|-------|
    | `chmod u+x f` | ajoute `x` au propriétaire |
    | `chmod go-w f` | retire `w` au groupe et aux autres |
    | `chmod a=r f` | **exactement** `r` pour tous → `r--r--r--` |
    | `chmod a= f` | plus aucun droit → `---------` |
    | `chmod u=o f` | u reçoit les droits **actuels** de o |
    | `chmod g+u f` | g gagne les droits actuels de u |
    | `chmod a+x,g-w f` | deux changements en une commande |

=== "Notation octale"

    Trois chiffres, un par classe : **tous** les droits sont réécrits.

    | Commande | Résultat |
    |----------|----------|
    | `chmod 644 f` | `rw-r--r--` |
    | `chmod 755 f` | `rwxr-xr-x` |
    | `chmod 640 f` | `rw-r-----` |
    | `chmod 700 f` | `rwx------` |

!!! piege "Piège — `=` remplace, `+` / `-` ajustent"
    `chmod u=o f` sur `-rwxr-xr--` donne `-r--r-xr--` : la classe u est **écrasée**
    par la valeur de o (`r--`). Avec `+` ou `-`, seuls les bits cités changent.

## Effet des permissions

=== "Sur un fichier"

    | Bit | Autorise |
    |-----|----------|
    | `r` | lire le contenu (`cat f`, `cp f g`) |
    | `w` | modifier le contenu (`echo … >> f`, éditeur) |
    | `x` | exécuter (`./f`) |

=== "Sur un répertoire"

    | Bit | Autorise |
    |-----|----------|
    | `r` | **lister** les noms (`ls d`) |
    | `w` | **créer, supprimer, renommer** des entrées (`touch d/c`, `rm d/a`, `mv`) |
    | `x` | **entrer** (`cd d`) et **accéder** aux fichiers par leur nom (`cat d/a`) |

| Droits du dossier | `ls d` | `cd d` | `cat d/a` | `touch d/c`, `rm d/a` |
|:-----------------:|:------:|:------:|:---------:|:----------------------:|
| `---` | ✗ | ✗ | ✗ | ✗ |
| `r--` | noms seuls (erreurs) | ✗ | ✗ | ✗ |
| `-w-` | ✗ | ✗ | ✗ | ✗ (il faut aussi `x`) |
| `--x` | ✗ | ✓ | ✓ si on connaît le nom | ✗ |
| `-wx` | ✗ | ✓ | ✓ | ✓ |
| `r-x` | ✓ | ✓ | ✓ | ✗ |
| `rwx` | ✓ | ✓ | ✓ | ✓ |

!!! methode "Méthode — Droits minimaux d'une commande"
    1. Tous les **dossiers traversés** du chemin demandent `x`.
    2. Puis selon l'opération :
        - lire un fichier → `r` sur le fichier ;
        - écrire dans un fichier → `w` sur le fichier ;
        - exécuter → `x` sur le fichier (et `r` en plus pour un script) ;
        - lister un dossier → `r` sur le dossier ;
        - créer / supprimer / renommer une entrée → `w` + `x` sur le **dossier qui la contient** ;
        - changer les droits (`chmod`) → être **propriétaire** (ou root), aucun bit requis.

!!! piege "Piège — Supprimer un fichier protégé"
    `rm g` sur un fichier sans `w` demande confirmation, `rm -f g` le supprime sans
    rien demander : seuls comptent `w` + `x` sur le dossier.

## Le `PATH`

`PATH` est une liste de dossiers séparés par `:`. Quand on tape un nom de commande
**sans `/`**, le shell la cherche dans ces dossiers **dans l'ordre** et prend la
**première** trouvée. Un chemin explicite (`/usr/bin/rm`, `./rm`, `~/bin/rm`)
contourne le `PATH`.

```bash
$ echo $PATH
/usr/local/bin:/usr/bin:/bin
$ PATH=~/bin:$PATH        # ~/bin passe en tête (pour ce terminal seulement)
$ type -a rm              # toutes les correspondances, dans l'ordre
$ hash -r                 # vide le cache des emplacements de Bash
```

!!! piege "Piège — Le faux `rm`"
    Une copie de `cat` nommée `~/bin/rm` placée en tête du `PATH` **masque** le vrai
    `rm` : `rm fic` affiche le fichier au lieu de le supprimer. Si on lui retire `x`,
    Bash ne bascule pas tout seul vers `/usr/bin/rm` (il a mémorisé l'emplacement) :
    erreur de permission jusqu'à `hash -r`.

## Pour aller plus loin (exercices ⭐)

- **`umask`** : droits retirés à la création. Base **666** (fichier), **777** (dossier).
  Règle exacte : `droits = base ET (NON umask)`. Avec `umask 022` → 644 / 755.
  La « soustraction » est fausse quand le masque retire un bit absent de la base
  (`umask 121` → fichier **646**, pas 545).
- **Bits spéciaux** (4ᵉ chiffre en tête) : SUID `4000` (exécution avec les droits du
  propriétaire, ex. `passwd`), SGID `2000` (droits du groupe ; sur un dossier, héritage
  du groupe), sticky `1000` (sur un dossier, seul le propriétaire d'un fichier peut le
  supprimer, ex. `/tmp` = `drwxrwxrwt`). Affichés `s` / `s` / `t` à la place du `x`.
- **Audit** : `find / -perm -4000 -type f 2>/dev/null` (fichiers SUID),
  `find /home -nouser -o -nogroup`.
