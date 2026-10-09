---
title: "Résumé — TP1 Premières commandes"
---

# Résumé — TP1 Premières commandes

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp1/){ .md-button }
[:material-book-open-variant: Cours détaillé](../cours/tp1-premieres-commandes.md){ .md-button }
[:material-check: Corrigé](../td/tp1-corrige.md){ .md-button }

!!! abstract "L'essentiel en 30 secondes"
    - Une commande = **nom** + **options** + **arguments**, séparés par des espaces (plusieurs espaces = un seul).
    - Chemin **absolu** : commence par `/` (ou `~`, remplacé par le home). Sinon **relatif** au dossier courant.
    - `.` = courant, `..` = parent, `~` = home ; `cd -` = dernier dossier visité.
    - `rmdir` : dossiers **vides** seulement. `cp -R` / `rm -r` pour un dossier.
    - `man` → commandes **externes**, `help` → commandes **internes** ; `type` dit laquelle.
    - Jokers `*` `?` `[…]` développés **par le shell**, jamais sur les fichiers cachés.

## Commandes du TP

| Commande | Rôle |
|----------|------|
| `pwd` | chemin absolu du dossier courant |
| `cd` / `cd ..` / `cd -` / `cd ~` | changer de dossier |
| `ls -l -a -R -d` | lister (détail, cachés, récursif, le dossier lui-même) |
| `mkdir -p a/b/c` | créer, parents compris |
| `rmdir`, `rmdir -p` | supprimer un dossier vide (et ses parents vides) |
| `touch f` | créer un fichier vide / mettre à jour sa date |
| `mv src dest` | renommer **ou** déplacer |
| `cp`, `cp -R` | copier (dossier : `-R`) |
| `rm`, `rm -r`, `rm -f` | supprimer (définitif) |
| `cat`, `wc -l -w -c` | afficher, compter lignes / mots / octets |
| `type`, `man`, `help` | type de commande, aide externe, aide interne |
| `date`, `cal`, `who`, `uname -mrs`, `echo` | utilitaires de base |

Raccourcis : ++tab++ complétion, ++up++ / ++ctrl+p++ historique, ++ctrl+l++ efface
l'écran, ++ctrl+u++ efface la ligne, ++ctrl+d++ EOF (ferme le shell sur ligne vide),
++ctrl+c++ interrompt.

## `mv` et `cp` : la règle

Si le **dernier argument** est un dossier existant → les sources vont **dedans**.
Sinon (2 arguments) → **renommage** / copie sous ce nom. Avec 3 arguments ou plus,
le dernier doit être un dossier.

## Jokers

| Motif | Correspond à |
|-------|--------------|
| `*` | n'importe quelle suite (même vide) |
| `?` | **exactement un** caractère |
| `[abc]`, `[a-z]` | un caractère de la liste / de l'intervalle |
| `[^abc]` | un caractère **sauf** ceux-là |

Aucune correspondance → le motif reste tel quel (`echo c*` affiche `c*`).

## Pièges

- `~/dir` est **absolu** (le shell remplace `~` avant l'exécution).
- `[ch]` = **un** caractère : `*.[ch]` ne prend pas `.cpp`.
- `rm -f` sur un fichier nommé `-f` : `rm -- -f` ou `rm ./-f`.
- Sections du manuel : 1 commandes, 2 appels système, 3 bibliothèques (`man 3 printf`).

## Auto-test

??? question "`mkdir a/b/c` sans `-p`, `a` n'existe pas ?"
    Erreur : un parent manque. Avec `-p`, toute l'arborescence est créée.

??? question "`echo ??????` sur `annee1 Annee2 annee45 bonbon` ?"
    `annee1 Annee2 bonbon` : les noms d'exactement 6 caractères.

??? question "`cd` sans argument ?"
    Retour au home.
