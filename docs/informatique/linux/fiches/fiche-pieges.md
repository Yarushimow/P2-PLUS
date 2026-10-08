---
title: "Fiche — Pièges du CC1 et du CE"
---

# Fiche — Pièges du CC1 et du CE

!!! abstract "L'essentiel en 30 secondes"
    - Linux **est** un système de type UNIX ; **Windows** ne l'est pas.
    - `man` → commandes **externes** ; `help` → commandes **internes** (builtins).
    - Supprimer / créer un fichier dépend des droits du **dossier parent** (`w` + `x`), pas du fichier.
    - `chmod u=o` : le propriétaire **copie** les droits actuels des autres ; `chmod a=` : plus aucun droit.
    - `'$x'` reste littéral, `"$x"` est développé ; une variable inconnue donne une **chaîne vide**.

## Les deux erreurs du CC1

!!! piege "Q6 — « Lequel n'est pas basé sur UNIX ? »"
    Réponse : **Windows**. Linux, Android (noyau Linux) et macOS (Darwin, certifié
    UNIX) sont tous de la famille UNIX.

!!! piege "Q15 — « Commande d'aide des commandes internes ? »"
    Réponse : **`help`** (ex. `help cd`). `man` documente les commandes externes.
    `type cmd` dit à quelle famille appartient `cmd`.

## Shell, chemins, jokers

| Ce qui trompe | La nuance |
|---------------|-----------|
| `~/dir` absolu ou relatif ? | **Absolu** : le shell remplace `~` par `/home/login` avant l'exécution. |
| `cd ..` / `cd -` / `cd` | parent / **dernier** dossier visité / home |
| `touch a\ b c` | **2 arguments** : `a b` (espace inhibé) et `c` |
| `*.[ch]` sur `x.cpp` | `[ch]` = **un** caractère → `.cpp` n'est pas pris |
| `ls dir/a?[1-4]` vs `ls dir/a*[1234]` | `?` = exactement **un** caractère ; `*` = zéro ou plus |
| `*` et les fichiers cachés | `*` et `?` ne prennent **jamais** un nom commençant par `.` |
| `mv a b` | renomme `a` (fichier **ou** dossier) en `b`, ou le **déplace dans** `b` si `b` est un dossier existant |
| `mv a b c` | `c` doit être un dossier : `a` et `b` y sont déplacés |
| `rmdir d` sur un dossier plein | échoue : `rmdir` ne supprime que les dossiers **vides** (sinon `rm -r`) |
| `ls > f.txt` | `f.txt` apparaît dans sa propre liste : le shell le crée **avant** de lancer `ls` |

## Permissions

| Ce qui trompe | La nuance |
|---------------|-----------|
| `rm dir/f` | il faut `w` **et** `x` sur `dir` ; les droits de `f` ne comptent pas |
| `cat f` | seulement `r` sur `f` (et `x` sur les dossiers traversés) |
| `cd d` | `x` sur `d` |
| `ls d` | `r` sur `d` (avec `x` pour voir les détails) |
| `chmod u=o f` sur `-rwxr-xr--` | u prend `r--` → `-r--r-xr--` |
| `=` vs `+` / `-` | `=` **remplace** (efface le reste de la classe) ; `+` / `-` ne touchent qu'aux bits cités |
| `umask 022` | fichier `644`, dossier `755`. Règle exacte : `base ET NON umask` (`umask 121` → `646`, pas `545`) |
| fichier créé avec `x` ? | jamais : base **666** pour un fichier, 777 pour un dossier |
| `s` / `t` dans `ls -l` | `s` sur le x de u (SUID) ou de g (SGID), `t` sur le x de o (sticky) ; **majuscule** si `x` absent |

## Variables et quoting

| Ce qui trompe | La nuance |
|---------------|-----------|
| `x = 5` | erreur : **pas d'espace** autour de `=` |
| `echo $variable` quand seule `var` existe | **chaîne vide** (le shell cherche `variable`) |
| `var3=$var $var2` | erreur : `$var2` est lu comme une commande. Il faut `var3="$var $var2"` |
| `'…'` vs `"…"` | apostrophes : **tout** littéral ; guillemets : `$`, `` ` `` et `\` restent actifs |
| `{a,b}` vs `[ab]` | accolades **génèrent** du texte ; crochets **filtrent** des fichiers existants |
| `$(…)` vs `${…}` | sortie d'une **commande** / valeur d'une **variable** |
| `cmd $(cmd a b)` | la sortie `a b` devient deux arguments → `cmd a b` affiche `a b` |

## Redirections, processus, signaux

| Ce qui trompe | La nuance |
|---------------|-----------|
| `>` vs `>>` | écrase / ajoute ; `>` ≡ `1>`, `<` ≡ `0<` |
| `cat f` vs `cat < f` | 1 argument / **0 argument** (le fichier arrive par stdin) |
| `ls *.h | wc -l` vs `wc -l $(ls *.h)` | nombre de **fichiers** / nombre de **lignes dans** les fichiers |
| Ctrl-Z / Ctrl-C | `SIGTSTP` (suspend) / `SIGINT` (interrompt) ; `fg` / `bg` envoient `SIGCONT` |
| `kill PID` | envoie `SIGTERM` (15) par défaut ; `SIGKILL` (9) ne s'intercepte pas |
| processus vs tâche | toute tâche est un processus, l'inverse est faux |

## Auto-test

??? question "Quels chemins sont absolus : `~/dir`, `dir`, `./dir`, `/dir` ?"
    `/dir` et `~/dir`.

??? question "`dir` contient `aa1 aa2 aa3 aa4 ab1 aaa aab abc abc1`. Quelle commande affiche `aa1 aa2 aa3 aa4 ab1 abc1` ?"
    `ls dir/a*[1234]` : commence par `a`, finit par un chiffre de 1 à 4, n'importe quoi entre.
    `ls dir/a?[1-4]` raterait `abc1` (4 caractères).

??? question "Droits nécessaires sur `dir` pour `rm dir/f` ?"
    `w` et `x`.
