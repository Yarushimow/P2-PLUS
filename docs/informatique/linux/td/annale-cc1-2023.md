---
title: "Annale — CC1 2023 corrigé"
---

# Annale — CC1 2023 (QCM, 20 questions)

QCM sur Moodle, une vingtaine de minutes. Questions et réponses officielles,
avec l'explication. Les deux pièges qui coûtent le plus de points :
[Q6](#q6-systemes-a-base-dunix) et [Q15](#q15-aide-des-commandes-internes).

!!! tip "Méthode"
    Réponds d'abord sans déplier, puis vérifie. Les questions à **plusieurs
    réponses** (Q2, Q3, Q11, Q13, Q17) sont notées partiellement : une case oubliée
    coûte des points.

## Q1 — `echo toto`

Que fait la commande `echo toto` ?

- A. Affiche le contenu du fichier `toto`
- B. Affiche le contenu du fichier `toto` et la chaîne `toto`
- C. Affiche la chaîne de caractères `toto`
- D. Affiche le contenu du fichier `toto` ou la chaîne `toto`

??? success "Réponse : C"
    `echo` affiche ses arguments, sans jamais ouvrir de fichier (c'est le rôle de `cat`).

## Q2 — Résultats possibles de `mv a b`

- A. Le fichier `a` est renommé en `b`
- B. Le répertoire `a` est renommé en `b`
- C. Le répertoire `a` est déplacé dans le répertoire `b`
- D. Le fichier `a` est déplacé dans le répertoire `b`

??? success "Réponse : A, B, C et D"
    Si `b` est un répertoire existant, `a` (fichier **ou** répertoire) est déplacé
    dedans ; sinon `a` est renommé en `b`. Le cas C est le plus souvent oublié.

## Q3 — Commandes qui suppriment un répertoire

- A. `rmdir`
- B. `ls`
- C. `pwd`
- D. `rm -r`

??? success "Réponse : A et D"
    `rmdir` (répertoire vide) et `rm -r` (récursif).

## Q4 — Jokers

`dir` contient `aa1 aa2 aa3 aa4 ab1 aaa aab abc abc1`. Quelle commande affiche
`aa1 aa2 aa3 aa4 ab1 abc1` ?

- A. `ls dir/a?[1-4]`
- B. `ls dir/a*[1234]`
- C. `ls dir/a?[c]*`
- D. `ls dir/a?[0-9]`

??? success "Réponse : B"
    Il faut « commence par `a`, finit par 1 à 4 », avec un milieu de longueur
    quelconque à cause de `abc1`. A et D imposent exactement 3 caractères (ratent
    `abc1`), C donne seulement `abc abc1`.

## Q5 — Nombre d'arguments

Combien d'arguments la ligne `touch a\ b c` contient-elle ?

- A. 1 — B. 3 — C. 2 — D. 0

??? success "Réponse : C (2)"
    L'espace précédé de `\` est inhibé : les arguments sont `a b` et `c`.

## Q6 — Systèmes à base d'UNIX

Lequel n'est **pas** un système d'exploitation à base d'UNIX ?

- A. Android
- B. Windows
- C. Linux
- D. Mac OS

??? success "Réponse : B (Windows)"
    Linux est de type UNIX, Android repose sur le noyau Linux, macOS est certifié UNIX.
    Voir la [lecture préliminaire](../cours/lecture-preliminaire.md#la-famille-unix-aujourdhui).

## Q7 — `mv a b c`

- A. `a` est déplacé dans `b` et renommé en `c`
- B. `a` et `b` sont renommés en `c`
- C. `a` et `b` sont déplacés dans le répertoire `c`
- D. `a` est renommé en `b` et déplacé dans `c`

??? success "Réponse : C"
    Avec plus de deux arguments, le dernier est forcément le répertoire de destination.

## Q8 — Droits pour `rm dir/f`

Quelles permissions faut-il sur le répertoire `dir` ?

- A. `r` et `w` — B. seulement `x` — C. seulement `w` — D. `w` et `x`

??? success "Réponse : D"
    `w` pour modifier le contenu du dossier, `x` pour y accéder. Les droits de `f`
    lui-même ne comptent pas.

## Q9 — Droits pour `cat f`

`f` a les droits `-rwxr-xr--`. Quelles permissions faut-il pour `cat f` ?

- A. `r` et `w` — B. seulement `x` — C. seulement `r` — D. `r` et `x`

??? success "Réponse : C"
    Lire le contenu demande seulement `r` sur le fichier.

## Q10 — Variable inexistante

`var` vaut `hello`. Que produit `echo $variable` ?

- A. `$variable` — B. `helloriable` — C. `hello` — D. Chaîne vide

??? success "Réponse : D"
    Le shell cherche la variable `variable`, qui n'existe pas → chaîne vide. Pour
    coller du texte après `var`, il faut `${var}iable`.

## Q11 — Fichiers dont le nom contient `file`

`dir` contient `file-a.txt file-b.txt file-c.txt`.

- A. `ls dir/file*.txt`
- B. `ls dir/file-[abc].txt`
- C. `ls dir/file?txt`
- D. `ls dir/file*`

??? success "Réponse : A, B et D"
    `file?txt` exige exactement **un** caractère entre `file` et `txt` (ex. `file.txt`) :
    aucun des trois noms ne convient.

## Q12 — Concaténer deux variables

`var=hello`, `var2=world`. Comment obtenir `var3` = `hello world` ?

- A. `var3=$var $var2`
- B. `var3="$var $var2"`
- C. `var3=$var$var2`
- D. `var3="$var$var2"`

??? success "Réponse : B"
    Sans guillemets, l'espace coupe la ligne : A lance la commande `world` avec
    `var3=hello` en variable temporaire. C et D donnent `helloworld`.

## Q13 — Chemins absolus

- A. `~/dir` — B. `dir` — C. `./dir` — D. `/dir`

??? success "Réponse : A et D"
    `~` est remplacé par le home (`/home/login`) avant l'exécution.

## Q14 — Chemins relatifs

- A. `/home/debian` — B. `~` — C. `dir` — D. `/dir`

??? success "Réponse : C"

## Q15 — Aide des commandes internes

- A. `info` — B. `help` — C. `man` — D. `whatis`

??? success "Réponse : B (`help`)"
    `help cd`, `help echo`… `man` documente les commandes **externes**.
    `type cmd` indique si `cmd` est interne (*shell builtin*).

## Q16 — Afficher `PATH`

- A. `echo $(PATH)` — B. `echo $PATH` — C. `echo PATH` — D. `echo $PATH$`

??? success "Réponse : B"
    `$(PATH)` exécuterait une **commande** `PATH` ; `echo PATH` affiche le mot ;
    `$PATH$` ajoute un `$` à la fin.

## Q17 — Lire `ls -ld`

```text
drwxr-xr-x  12 debian debian  384 Sep 20 09:17 a
drwxr-xr-x   4 debian debian  128 Sep 20 09:20 b
-rwxr-xr-x   1 debian debian 3097 Jul 19 12:35 c
-rw-r--r--   1 debian debian 4524 Jul 19 13:34 d
drwxr-xr-x  11 debian debian  352 Jul 19 14:39 e
```

- A. `a` est un répertoire
- B. `c` est un fichier exécutable
- C. En octal, les permissions de `e` sont 755
- D. `e` est un fichier normal

??? success "Réponse : A, B et C"
    `e` commence par `d` : c'est un répertoire, pas un fichier normal.

## Q18 — `cp file-{1..9}.txt files`

- A. `file-1.txt` et `file-9.txt` sont déplacés dans `files`
- B. `file-1.txt` à `file-9.txt` sont renommés en `files`
- C. `file-1.txt` à `file-9.txt` sont copiés dans le répertoire `files`
- D. `file-1.txt` à `file-9.txt` sont déplacés dans `files`

??? success "Réponse : C"
    `{1..9}` génère les 9 noms ; `cp` copie (ne déplace pas) ; avec plusieurs sources, la
    destination est un répertoire.

## Q19 — Substitution de commande

`cmd` affiche ses arguments. Résultat de `cmd $(cmd a b)` ?

- A. `cmd a b` — B. `$(cmd a b)` — C. `a b a b` — D. `a b`

??? success "Réponse : D"
    `$(cmd a b)` est remplacé par `a b`, puis `cmd a b` affiche `a b`.

## Q20 — `chmod u=o`

`f` a les droits `-rwxr-xr--`. Après `chmod u=o f` ?

- A. `-rwxr-xr--` — B. `-rw-rw-rw-` — C. `-r--r-xr--` — D. `-rwxrwxrwx`

??? success "Réponse : C"
    Le propriétaire reçoit exactement les droits actuels des autres (`r--`) ; le groupe
    et les autres ne bougent pas.
