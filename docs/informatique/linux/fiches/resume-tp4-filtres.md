---
title: "Résumé — TP4+ Filtres de texte"
---

# Résumé — TP4+ Quelques commandes supplémentaires

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp4-exo/){ .md-button }
[:material-book-open-variant: Cours détaillé](../cours/tp4-filtres-texte.md){ .md-button }
[:material-check: Corrigé](../td/tp4-filtres-corrige.md){ .md-button }

!!! abstract "L'essentiel en 30 secondes"
    - Un **filtre** lit stdin (ou ses fichiers) et écrit sur stdout ; on les chaîne avec `|`.
    - `grep` : `-v` inverse, `-i` casse, `-r` récursif, `-l` noms de fichiers seuls.
    - `cut -d SEP -f N` (champs) / `cut -c 1-3` (caractères).
    - `uniq` ne retire que les doublons **consécutifs** → `sort | uniq`.
    - Classique : `sort | uniq -c | sort -rn` ; dernier champ : `rev | cut -d/ -f1 | rev`.

## Les filtres

| Commande | Rôle | Options |
|----------|------|---------|
| `head` / `tail` | premières / dernières lignes | `-n N`, `tail -f` |
| `grep motif` | lignes qui contiennent le motif | `-v -i -r -l -n -c -E`, `^` début de ligne |
| `cut` | colonnes | `-d`, `-f`, `-c` |
| `sort` | trier | `-n` numérique, `-r` inverse |
| `uniq` | doublons consécutifs | `-c` compte |
| `tr` | remplacer / supprimer des caractères | `-d`, `-s` |
| `rev` | inverser chaque ligne | |
| `tee` | écrire dans un fichier **et** à l'écran | |

## Lignes de commande du TP

```bash
$ wc -c /usr/include/*.h | sort -n | head -n 10 | rev | cut -d/ -f1 | rev | cut -d. -f1
$ grep -r "define RAND_MAX" /usr/include
$ grep -rl "127.0.0.1" /etc 2>/dev/null
$ grep -rl "127.0.0.1" /etc 2>/dev/null | rev | cut -d/ -f1 | rev
$ grep "^games:" /etc/passwd | cut -d: -f6
$ cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn
```

## `sed` et `awk` (⭐)

| Commande | Effet |
|----------|-------|
| `sed 's/a/b/' f` | 1ʳᵉ occurrence par ligne |
| `sed 's/a/b/g' f` | toutes les occurrences |
| `sed '/motif/d' f` | supprime les lignes |
| `sed -i …` | modifie le fichier en place |
| `awk -F: '{ print $1, $7 }'` | champs 1 et 7 |
| `awk -F: '$3 >= 1000'` | filtre par condition |
| `awk '… { n++ } END { print n }'` | compte, affiche à la fin |

`cut` pour extraire, `awk` pour filtrer / calculer / formater.

## Auto-test

??? question "Pourquoi `sort` avant `uniq` ?"
    `uniq` ne fusionne que les lignes identiques **qui se suivent**.

??? question "Afficher les lignes de `/etc/passwd` sans `nologin` ?"
    `grep -v nologin /etc/passwd` (ou `sed '/nologin/d' /etc/passwd`).
