---
title: "TP4+ — Filtres de texte, grep, sed, awk"
---

# TP4+ — Quelques commandes supplémentaires : filtres de texte

Un **filtre** lit son entrée standard (ou les fichiers donnés en argument) et
écrit le résultat transformé sur sa sortie standard. Les combiner avec des tubes
permet de répondre à des questions précises en une ligne.
Exercices corrigés : [TP4+ corrigé](../td/tp4-filtres-corrige.md).

!!! abstract "À retenir"
    - `head` / `tail -n N` : premières / dernières lignes (10 par défaut).
    - `grep motif` : lignes qui contiennent le motif (`-v` inverse, `-i` ignore la casse, `-r` récursif, `-l` noms de fichiers).
    - `cut -d SEP -f N` : champ N ; `cut -c 1-3` : caractères 1 à 3.
    - `uniq` n'enlève que les doublons **consécutifs** → `sort | uniq`.
    - Combo classique : `sort | uniq -c | sort -rn`.

## Les filtres de base

| Commande | Rôle | Options |
|----------|------|---------|
| `head` | premières lignes | `-n 2` (2 lignes), `-c` (octets) |
| `tail` | dernières lignes | `-n 3`, `-f` (suit le fichier qui grossit) |
| `grep` | lignes correspondant à un motif | `-v` inverse, `-i` casse, `-r` récursif, `-l` noms, `-n` numéros, `-c` compte, `-E` regex étendue |
| `cut` | colonnes | `-d ' '` séparateur, `-f 1,2` champs, `-c 1-3` caractères |
| `sort` | trie les lignes | `-n` numérique, `-r` inverse |
| `uniq` | supprime les lignes identiques **consécutives** | `-c` compte |
| `tr` | remplace des caractères | `tr ':' ' '`, `-d` supprime |
| `rev` | inverse chaque ligne | |
| `wc` | compte | `-l`, `-w`, `-c` |
| `tee` | écrit dans un fichier **et** sur stdout | `-a` ajoute |

```bash
$ grep -i "dormez" fj            # insensible à la casse
$ grep -v "Dormez" fj            # lignes SANS « Dormez »
$ cut -d ' ' -f 1,2 fj           # deux premiers mots de chaque ligne
$ cut -c 1-3 fj                  # trois premiers caractères
$ cut -d: -f1,3,6 /etc/passwd    # login, UID, home
```

## Pipelines types

```bash
# 10 fichiers .h les plus légers, nom de base seulement
$ wc -c /usr/include/*.h | sort -n | head -n 10 | rev | cut -d/ -f1 | rev | cut -d. -f1

# Répartition des shells de connexion
$ cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn

# Valeur de RAND_MAX
$ grep -r "define RAND_MAX" /usr/include

# Fichiers de /etc contenant 127.0.0.1 : chemins, puis noms seuls
$ grep -rl "127.0.0.1" /etc 2>/dev/null
$ grep -rl "127.0.0.1" /etc 2>/dev/null | rev | cut -d/ -f1 | rev

# Home de l'utilisateur games
$ grep "^games:" /etc/passwd | cut -d: -f6
```

!!! methode "Méthode — Le dernier champ avec `rev`"
    `cut` compte les champs depuis la gauche. Pour garder le **dernier** (nom de
    fichier à la fin d'un chemin) : `rev | cut -d/ -f1 | rev` (on retourne la ligne,
    on prend le 1ᵉʳ champ, on retourne à nouveau).

!!! piege "Piège — `wc -c *.h` affiche une ligne « total »"
    Après `sort -n`, elle se retrouve **en dernier** : sans danger avec `head`, mais à
    écarter avec `tail` (`grep -v total`).

## `sed` (⭐)

| Commande | Effet |
|----------|-------|
| `sed 's/x/y/' f` | remplace la **1ʳᵉ** occurrence de `x` sur chaque ligne |
| `sed 's/x/y/g' f` | remplace **toutes** les occurrences (`g` = global) |
| `sed '/motif/d' f` | supprime les lignes contenant `motif` |
| `sed -i '…' f` | modifie le fichier **en place** (sinon le fichier n'est pas touché) |

## `awk` (⭐)

`awk` découpe chaque ligne en champs : `$1`, `$2`… (`$0` = ligne entière), séparateur
fixé par `-F`. Un programme est une suite de `condition { action }`.

```bash
$ awk -F: '{ print $1, $7 }' /etc/passwd                     # login et shell
$ awk -F: '$7 == "/bin/bash" { print $1 }' /etc/passwd       # comptes bash
$ awk -F: '$3 >= 1000 { n++ } END { print n }' /etc/passwd   # nb d'humains
$ awk '$3 == "connexion" { c[$2]++ } END { for (u in c) print u, c[u] }' acces.log
```

`END { … }` s'exécute après la dernière ligne ; `BEGIN { … }` avant la première.
`cut` suffit pour extraire une colonne ; `awk` dès qu'il faut **filtrer**, **calculer**
ou **reformater**.

Dans un script : `${1:-/etc/passwd}` vaut `$1` s'il est défini et non vide, sinon
`/etc/passwd`.
