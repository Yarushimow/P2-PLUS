---
title: "TP4+ corrigé — Filtres de texte"
---

# TP4+ corrigé — Quelques commandes supplémentaires

Énoncé : [page « Quelques commandes supplémentaires »](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp4-exo/).
Rappels : [notes sur les filtres](../cours/tp4-filtres-texte.md).

## Exercice 1 — Frère Jacques

??? success "Correction"
    - Les résultats s'affichent sur la **sortie standard** (le terminal) ; le fichier
      `fj` n'est jamais modifié.
    - `head -n 2` / `tail -n 3` : nombre de lignes (10 par défaut).
    - `grep -v` : lignes qui **ne** contiennent **pas** le motif ; `grep -i` : ignore la
      casse (`grep "dormez"` ne trouve rien si le texte écrit « Dormez »).
    - `sort` trie les lignes ; `uniq` ne supprime que les doublons **consécutifs**
      (dans la comptine, les lignes répétées se suivent, donc elles fusionnent).
    - `cut -c 1-3` : caractères 1 à 3 ; `cut -d ' ' -f 1,2` : champs 1 et 2 avec
      l'espace comme séparateur.

## Exercice 2 — Les 10 fichiers `.h` les plus légers

??? success "Correction"
    ```bash
    $ wc -c /usr/include/*.h | sort -n | head -n 10 | tr -s ' ' | cut -d ' ' -f 3 | cut -d / -f 4 | cut -d . -f 1
    ```
    `wc -c` donne « taille chemin », `sort -n` trie par taille, `head` garde les 10
    premiers (la ligne *total* est la plus grande, donc en bas). `tr -s ' '` réduit les
    espaces d'alignement pour que `cut` fonctionne, puis on garde le nom du fichier
    (`/usr/include/poll.h` → 4ᵉ champ avec `/`) et on retire l'extension.

    Variante plus robuste : `… | head -n 10 | rev | cut -d / -f 1 | rev | cut -d . -f 1`.

## Exercice 3 — `grep`

??? success "Correction"
    ```bash
    # 1. Valeur de RAND_MAX
    $ grep -r "define RAND_MAX" /usr/include
    # 2. Chemins des fichiers de /etc contenant 127.0.0.1
    $ grep -rl "127.0.0.1" /etc 2>/dev/null
    # 3. Noms seuls (sans le chemin)
    $ grep -rl "127.0.0.1" /etc 2>/dev/null | rev | cut -d / -f 1 | rev
    # 4. Home de l'utilisateur games
    $ grep "^games:" /etc/passwd | cut -d : -f 6
    ```
    `2>/dev/null` masque les *Permission denied* des fichiers illisibles. Le `^` ancre le
    motif en début de ligne (sinon une ligne contenant « games » ailleurs serait prise).

## Exercice 4 — `sed` (⭐)

??? success "Correction"
    - `sed '/nologin/d' /etc/passwd` : `d` **supprime** de la sortie les lignes qui
      contiennent `nologin` ; il reste les comptes avec un vrai shell
      (comparer avec `wc -l`).
    - Sans `g`, seule la **première** occurrence de chaque ligne est remplacée ; avec `g`,
      toutes. Sur une ligne contenant deux fois « Dormez », la différence se voit.

## Exercice 5 — `awk` (⭐)

??? success "Correction"
    - `count++` incrémente un compteur (initialisé à 0) pour chaque ligne qui vérifie la
      condition ; le bloc `END` s'exécute une fois, après la dernière ligne, pour
      afficher le total.
    - `cut` : extraire un champ tel quel (`cut -d: -f1 /etc/passwd`). `awk` : dès qu'il
      faut une condition, un calcul ou une mise en forme
      (`awk -F: '$3 >= 1000 { print $1 }' /etc/passwd`).

## Exercice 6 — Script d'analyse (⭐)

??? success "Correction"
    ```bash
    # Utilisateurs ayant le même shell que root
    shell_root=$(grep "^root:" "$FICHIER" | cut -d: -f7)
    echo "6. Même shell que root ($shell_root) :"
    awk -F: -v s="$shell_root" '$7 == s && $1 != "root" { print "   - " $1 }' "$FICHIER"
    ```
    - `${1:-/etc/passwd}` : `$1` s'il est défini et non vide, sinon la valeur par défaut.
    - `tr '\n' ','` met les noms sur **une** ligne séparés par des virgules (sinon un nom
      par ligne) ; alternative : `paste -sd, -`.
