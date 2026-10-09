---
title: "Résumé — TP2 Fichiers et permissions"
---

# Résumé — TP2 Système de fichiers et permissions

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp2/){ .md-button }
[:material-book-open-variant: Cours détaillé](../cours/tp2-fichiers-permissions.md){ .md-button }
[:material-check: Corrigé](../td/tp2-corrige.md){ .md-button }

!!! abstract "L'essentiel en 30 secondes"
    - Une seule arborescence depuis `/` ; config dans `/etc`, utilisateurs dans `/home`, logs dans `/var`.
    - `/etc/passwd` : 7 champs `login:x:UID:GID:commentaire:home:shell` ; root = UID 0.
    - `ls -l` : type + 3 × `rwx` pour **u** / **g** / **o**. Poids **r=4, w=2, x=1**.
    - Dossier : `r` lister, `w` créer/supprimer, `x` entrer et accéder.
    - Supprimer / créer un fichier → `w` + `x` sur le **dossier parent**.
    - `PATH` : dossiers parcourus **dans l'ordre**, la première commande trouvée gagne.

## Répertoires à connaître

| Dossier | Contenu |
|---------|---------|
| `/bin`, `/sbin` | programmes essentiels / d'administration |
| `/etc` | configuration |
| `/home`, `/root` | homes des utilisateurs / de root |
| `/usr` | programmes et bibliothèques installés |
| `/var` | données variables (journaux) |
| `/tmp` | temporaires (sticky bit) |
| `/dev`, `/proc` | périphériques, infos des processus |

## Lire et changer les droits

| Octal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|-------|---|---|---|---|---|---|---|---|
| rwx | `---` | `--x` | `-w-` | `-wx` | `r--` | `r-x` | `rw-` | `rwx` |

- **Octal** : `chmod 754 f` → `rwxr-xr--` (réécrit tout).
- **Symbolique** : `chmod [ugoa][+-=][rwx]`, chaînable avec `,`.
    - `+` / `-` ne touchent que les bits cités ;
    - `=` **remplace** la classe : `chmod a= f` → `---------`, `chmod u=o f` → u copie o.
- `ls -ld dossier` montre les droits du dossier lui-même.

## Droits minimaux d'une opération

| Opération | Droit |
|-----------|-------|
| `cat f` | `r` sur `f` |
| `echo … >> f` | `w` sur `f` |
| `./f` | `x` sur `f` |
| `cd d` | `x` sur `d` |
| `ls d` | `r` sur `d` |
| `rm d/f`, `touch d/f`, `mv d/a d/b` | `w` + `x` sur `d` |
| `chmod` | être propriétaire |

Plus `x` sur **tous les dossiers traversés** du chemin.

## `PATH`

- Consulté seulement pour un nom **sans `/`** ; `/usr/bin/rm`, `./rm` le contournent.
- Un dossier ajouté **en tête** (`PATH=~/bin:$PATH`) peut masquer une commande système.
- Bash mémorise les emplacements : `hash -r` vide ce cache ; `type -a cmd` liste toutes les correspondances.

## Pour aller plus loin (⭐)

- `umask` : base 666 (fichier) / 777 (dossier), `droits = base ET NON umask`.
  `022` → 644 / 755 ; `121` → fichier **646** (pas 545).
- SUID `4000` (`s` sur u), SGID `2000` (`s` sur g), sticky `1000` (`t` sur o).

## Auto-test

??? question "`chmod u=o f` sur `-rwxr-xr--` ?"
    `-r--r-xr--`.

??? question "`rep` en `--x` : `ls rep`, `cat rep/a` ?"
    `ls` échoue (pas de `r`) ; `cat rep/a` marche si `a` est lisible (on connaît son nom).

??? question "`rm g` sur un fichier en 000, dossier en `rwx` ?"
    Il réussit (après confirmation, ou directement avec `-f`) : seuls comptent les droits du dossier.
