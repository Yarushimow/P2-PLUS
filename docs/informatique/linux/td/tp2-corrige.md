---
title: "TP2 corrigé — Système de fichiers et permissions"
---

# TP2 corrigé — Système de fichiers et permissions

Énoncé : [TP2 sur le site du cours](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp2/).
Rappels : [notes du TP2](../cours/tp2-fichiers-permissions.md).

## Exercice 1 — `id` et `/etc/passwd`

??? success "Correction"
    `id` affiche `uid=1000(login) gid=1000(login) groups=…` ; `id root` : `uid=0(root)`.
    `/etc/passwd` décrit **tous les comptes** (y compris les comptes système), un par
    ligne : `login:x:UID:GID:commentaire:home:shell`. root a l'UID 0, le home `/root`
    et le shell `/bin/bash` ; votre compte a un UID ≥ 1000 et un home dans `/home`.

## Exercice 2 — Lire les permissions

??? success "Correction"
    Un répertoire a un `d` en première position (`ls -ld` pour le voir lui-même).
    Par défaut (`umask 022`) : fichier `-rw-r--r--` (644), répertoire `drwxr-xr-x` (755).

    | Ligne | Type | Symbolique | Octal |
    |-------|------|-----------|:-----:|
    | `drwxr-xr-x a` | répertoire | `rwxr-xr-x` | 755 |
    | `dr-xr--r-- b` | répertoire | `r-xr--r--` | 544 |
    | `-rw-r--r-- c.txt` | fichier | `rw-r--r--` | 644 |
    | `--w--w-r-- d.c` | fichier | `-w--w-r--` | 224 |
    | `-rwxr-xr-x op` | fichier | `rwxr-xr-x` | 755 |

    Habituellement : `/etc/passwd` → 644, `/usr/bin/ls` → 755, le home → 755 (ou 700 / 750).

## Exercice 3 — `chmod`

??? success "Correction"
    En partant de `f` créé par `touch` (644, `rw-r--r--`) :

    | Commande | Résultat |
    |----------|----------|
    | `chmod a= f` | `---------` (000) |
    | `chmod o+rw f` | `------rw-` (006) |
    | `chmod u=o f` | `rw----rw-` (606) |
    | `chmod o-wx f` | `rw----r--` (604) |
    | `chmod g+u f` | `rw-rw-r--` (664) |
    | `chmod a+x,g-w f` | `rwxr-xr-x` (755) |

    `chmod 644 f` → `rw-r--r--`.

    | Objectif | Octal | Symbolique |
    |----------|:-----:|------------|
    | x pour tous, rw pour le propriétaire seul | 711 | `chmod u=rwx,go=x f` |
    | r et x pour tous, w pour personne | 555 | `chmod a=rx f` |
    | tout pour tous sauf w pour les autres | 775 | `chmod a=rwx,o-w f` |
    | rw propriétaire, x groupe, rien autres | 610 | `chmod u=rw,g=x,o= f` |

## Exercice 4 — Effet des permissions sur un fichier

??? success "Correction"
    `f` sans `r` pour le propriétaire, `g` sans `w` :

    - `cat f` → *Permission denied* ; `cat g` → OK.
    - Éditer `g` → impossible d'enregistrer (lecture seule).
    - `cp f h` → échoue (lecture impossible) ; `cp g h` → OK, `h` reçoit le contenu de `g`
      et les droits de `g` filtrés par le `umask` (`r--r--r--` ici).
    - `echo "toto" >> f` → **réussit** (`w` présent) ; après avoir rendu `r`, `cat f`
      montre la ligne ajoutée.
    - `rm g` demande confirmation (*remove write-protected file?*), `rm -f g` supprime
      sans rien demander : **supprimer dépend des droits du dossier**, pas du fichier.

## Exercice 5 — Permissions sur les répertoires

??? success "Correction"
    `rep` contient `a` et `b`.

    | Droits de `rep` | `cd rep` | `ls rep` | `cat rep/a` | `touch rep/c` | `rm rep/a` |
    |:---------------:|:--------:|:--------:|:-----------:|:-------------:|:----------:|
    | `---` | ✗ | ✗ | ✗ | ✗ | ✗ |
    | `r--` | ✗ | noms seuls (+ erreurs) | ✗ | ✗ | ✗ |
    | `-w-` | ✗ | ✗ | ✗ | ✗ | ✗ |
    | `--x` | ✓ | ✗ | ✓ | ✗ | ✗ |

    Avec `--x`, `echo "toto" >> rep/a` et `ls -l rep/a` marchent (on connaît le nom),
    `cat rep/c` échoue (n'existe pas, et on ne peut pas le créer).

    Avec `-wx` pour tous : on peut créer `d`, renommer `b` (`mv rep/b rep/b2`), retirer
    tous les droits sur `d` (on en est propriétaire), puis **supprimer `d`** (`rm -f`) :
    seuls comptent `w` + `x` sur `rep`. Seul `ls rep` reste impossible.

## Exercice 6 — Le `PATH`

??? success "Correction"
    1. `echo $PATH` : la liste des dossiers où le shell cherche les commandes, séparés par `:`.
    2. Après `PATH=~/bin:$PATH`, `~/bin` (développé en `/home/login/bin`) est **en tête**.
    3. `type cat` → `/usr/bin/cat`, `type rm` → `/usr/bin/rm`.
    4. `cp /usr/bin/cat ~/bin/rm`.
    5. `echo "quelques caractères" > fic` puis `cp fic fic2`, `cp fic fic3`.
    6. `rm fic` **affiche** le contenu : le shell trouve d'abord `~/bin/rm` (une copie de `cat`).
    7. `type rm` → `rm is /home/login/bin/rm` (ou *hashed*).
    8. `/usr/bin/rm fic` supprime vraiment : un chemin contenant `/` **ne passe pas** par le `PATH`.
    9. Après `chmod -x ~/bin/rm`, `rm fic2` → *Permission denied* : Bash a mémorisé
       l'emplacement et ne bascule pas vers `/usr/bin/rm`.
    10. `hash -r` vide le cache ; `type rm` → `/usr/bin/rm` (le fichier non exécutable est
        ignoré lors de la recherche) ; `rm fic2` supprime.
    11. Avec `x` rétabli : `~/bin/rm fic3` et `./rm fic3` affichent ; `/usr/bin/rm rm`
        supprime le faux `rm` ; ensuite `rm fic3` supprime (après `hash -r` si besoin).
    12. **Bilan** : le `PATH` contient des dossiers ; il n'est consulté que pour un nom
        **sans `/`** ; en cas de doublon, la **première** correspondance (ordre du `PATH`)
        gagne.

## Exercice 7 — On lâche le clavier

??? success "Correction"
    Chaque commande demande d'abord `x` sur tous les dossiers traversés
    (`/`, `/usr`, `/usr/include`).

    | Commande | Droits nécessaires |
    |----------|--------------------|
    | `cat /usr/include/stdio.h` | `x` sur `/`, `/usr`, `/usr/include` ; `r` sur `stdio.h` |
    | `cd /usr/include/` | `x` sur `/`, `/usr`, `/usr/include` |
    | `ls /usr/include/` | `x` sur `/`, `/usr` ; `r` sur `/usr/include` |
    | `echo '/* fin */' >> /usr/include/stdio.h` | `x` sur les dossiers ; `w` sur `stdio.h` |
    | `rm /usr/include/stdio.h` | `x` sur `/`, `/usr` ; `w` **et** `x` sur `/usr/include` |
    | `touch /usr/include/ma_bib.h` | `x` sur `/`, `/usr` ; `w` et `x` sur `/usr/include` |
    | `chmod u+w /usr/include/stdio.h` | `x` sur les dossiers ; être **propriétaire** de `stdio.h` (aucun bit requis) |
    | `/usr/bin/uname` | `x` sur `/`, `/usr`, `/usr/bin` ; `x` sur `uname` |

## Exercice 8 — `umask` (⭐)

??? success "Correction"
    Règle : `droits = base ET (NON umask)`, base 666 (fichier) / 777 (dossier).

    | `umask` | Fichier | Dossier | « Soustraction » fichier |
    |:-------:|:-------:|:-------:|:------------------------:|
    | 022 | 644 | 755 | 644 ✓ |
    | 240 | 426 `r---w-rw-` | 537 `r-x-wxrwx` | 426 ✓ |
    | 121 | **646** `rw-r--rw-` | 656 `rw-r-xrw-` | 545 ✗ |
    | 666 | 000 | 111 `--x--x--x` | 000 ✓ |

    La soustraction se trompe dès qu'un chiffre du masque contient un bit absent de la
    base (ici le `x` de `1`, alors que la base fichier n'a pas de `x`).
