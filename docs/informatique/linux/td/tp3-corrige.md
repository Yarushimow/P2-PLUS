---
title: "TP3 corrigé — Environnement et compilateur C"
---

# TP3 corrigé — Environnement de travail et compilateur C

Énoncé : [TP3 sur le site du cours](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp3/).
Rappels : [notes du TP3](../cours/tp3-environnement-compilation.md).

## Exercice 1 — Variables

??? success "Correction"
    | Commande | Affiche | Pourquoi |
    |----------|---------|----------|
    | `echo nom_fich` | `nom_fich` | pas de `$` : texte littéral |
    | `echo $nom_fich` | `hello.c` | `$` déclenche le développement |
    | `echo ${nom_fich}` | `hello.c` | même chose, nom délimité |
    | `touch $nom_fich` | — | crée `hello.c` |
    | `echo $nom_fichpp` | *(vide)* | la variable `nom_fichpp` n'existe pas |
    | `echo ${nom_fich}pp` | `hello.cpp` | accolades = fin du nom |

    `nom = valeur` : le shell lance une commande `nom` avec les arguments `=` et
    `valeur` → *command not found*. `phrase="$sujet $verbe la $cod."` est calculée une
    fois : changer `sujet` ensuite ne modifie pas `phrase`.

## Exercice 2 — La contre-oblique

??? success "Correction"
    - `echo a\ \ \ b` → `a   b` (espaces inhibés, conservés).
    - `touch fichier\ vide` crée **un** fichier ; `rm fichier vide` cherche deux
      fichiers (`fichier` et `vide`) ; `rm fichier\ vide` le supprime.
    - `echo 3$canadiens` → `3` (variable vide) ; `echo 3\$canadiens` → `3$canadiens`.
    - `echo ; echo *` → ligne vide puis la liste des fichiers ; `echo \; echo \*` → `; echo *`.
    - `echo \"salut\"` → `"salut"` ; `echo \'salut\'` → `'salut'`.
    - `echo \` suivi d'Entrée : `\`+saut de ligne = **continuation** (invite `>`).
    - `echo \\` → `\`. Pour afficher `\\` : `echo \\\\` ou `echo '\\'`.
    - Devant un caractère ordinaire, `\` est simplement retiré (`echo \a` → `a`).

## Exercice 3 — L'apostrophe

??? success "Correction"
    Entre `'…'`, **aucun** caractère n'est spécial (ni `$`, ni `*`, ni `\`), et les
    sauts de ligne sont conservés. `touch 'ceci est un horrible nom de fichier'` crée un
    seul fichier ; `rm -i ceci est un …` sans apostrophes vise 7 fichiers différents.

    Une apostrophe ne peut pas apparaître entre apostrophes : on ferme, on ajoute `\'`,
    on rouvre → `echo 'aujourd'\''hui'`, ou on utilise des guillemets `"aujourd'hui"`.

## Exercice 4 — Le guillemet

??? success "Correction"
    - `echo "$x"` → `coucou` ; `echo '$x'` → `$x`.
    - `echo "le prix est de 30$"` → `le prix est de 30$` (`$` suivi de rien reste littéral).
    - Restent spéciaux entre `"…"` : **`$`**, **`` ` ``** et **`\`** (devant `$`, `` ` ``, `"`, `\` ou saut de ligne).
    - On préfère `'…'` quand on veut un texte **100 % littéral** (ex. un `$` à afficher tel quel) ;
      `"…"` quand on veut développer des variables tout en gardant les espaces.

## Exercice 5 — Accolades

??? success "Correction"
    ```bash
    $ echo a{b,c,d}e          # abe ace ade
    $ echo {1..10}            # 1 2 3 4 5 6 7 8 9 10
    $ echo {a..e}{1..3}       # a1 a2 a3 b1 b2 b3 … e3
    $ mkdir -p ~/labo/{donnees/{brutes,nettoyees},scripts,resultats}
    ```
    `{a,b,c}` **génère** trois mots sans regarder le disque ; `[abc]` est un joker qui
    ne correspond qu'à des noms **existants**, sur **un** caractère.

## Exercice 6 — Substitution de commande

??? success "Correction"
    - `echo date` → `date` ; `echo $(date)` → la date : `$(…)` est remplacé par la sortie.
    - `phrase=${prefix} ${aujourdhui}` → erreur : après le premier mot, le reste est lu comme une commande.
    - `phrase="${prefix} ${aujourdhui}"` → OK : les guillemets font un seul mot.
    - `echo $phrase` (espaces multiples écrasés) vs `echo "$phrase"` (texte exact).
    - `$(…)` exécute une **commande** ; `${…}` lit une **variable**.

## Exercice 7 — Compilation

??? success "Correction"
    ```c
    #include <stdio.h>

    int main(void)
    {
        printf("Hello world !\n");
        return 0;
    }
    ```
    - `gcc hello.c` → `a.out` (`./a.out`) ; `gcc hello.c -o hello` → `hello`.
    - `tar -xvf hello.tar.gz && cd hello && gcc main.c hello.c -o run && ./run`.
    - Accolade fermante retirée → **erreur** (*expected declaration or statement at end of
      input*) : pas d'exécutable.
    - `return 1;` dans une fonction `void` → **warning** (`-Wreturn-type`) : l'exécutable
      est produit.
    - `-Wall -Wextra` signale en plus la variable inutilisée ; `-Werror` fait échouer la
      compilation. En intégration continue, `-Werror` empêche de livrer du code « sale ».

## Exercice 8 — Compilation séparée (⭐)

??? success "Correction"
    ```bash
    $ touch bye.{c,h}
    ```
    ```c
    /* bye.h */
    #ifndef BYE_H
    #define BYE_H
    void bye(void);
    #endif
    ```
    ```c
    /* bye.c */
    #include <stdio.h>
    #include "bye.h"

    void bye(void)
    {
        printf("I'm done, bye !\n");
    }
    ```
    ```bash
    $ gcc -c {hello,bye}.c      # hello.o bye.o
    $ gcc -c main.c             # après avoir ajouté #include "bye.h" et l'appel bye()
    $ gcc *.o -o run && ./run
    ```

## Exercice 9 — Descripteurs standards (⭐)

??? success "Correction"
    ```c
    #include <string.h>
    #include <unistd.h>

    int main(void)
    {
        const char *out = "message sur stdout\n";
        const char *err = "message sur stderr\n";
        write(STDOUT_FILENO, out, strlen(out));
        write(STDERR_FILENO, err, strlen(err));
        return 0;
    }
    ```
    `./std-fd > sortie.txt` : seul le message d'erreur reste à l'écran.
    `./std-fd 2> erreur.txt` : seul le message normal s'affiche. Séparer les deux canaux
    permet de filtrer / enregistrer les résultats sans perdre les erreurs.

## Exercice 9 bis — `read()` (⭐)

??? success "Correction"
    ```c
    #include <stdio.h>
    #include <unistd.h>
    #define TAILLE 4096

    int main(void)
    {
        char buf[TAILLE];
        ssize_t n;
        while ((n = read(STDIN_FILENO, buf, TAILLE)) > 0) {
            ssize_t ecrit = 0;
            while (ecrit < n) {                  /* écriture partielle possible */
                ssize_t w = write(STDOUT_FILENO, buf + ecrit, n - ecrit);
                if (w == -1) { perror("write"); return 1; }
                ecrit += w;
            }
        }
        if (n == -1) { perror("read"); return 1; }
        return 0;                                /* n == 0 : fin de fichier */
    }
    ```
    `read` renvoie un `ssize_t` (signé) pour pouvoir renvoyer -1. Avec le clavier, c'est
    le `read` qui suit ++ctrl+d++ sur une ligne vide qui renvoie 0. Un seul `write` sans
    boucle peut perdre des octets sur un tube ou un terminal. Un tampon plus grand fait
    moins d'appels système mais consomme plus de mémoire.

## Exercice 10 — `dup2()` (⭐)

??? success "Correction"
    ```c
    #include <fcntl.h>
    #include <stdio.h>
    #include <unistd.h>

    int main(int argc, char *argv[])
    {
        if (argc < 2) { fprintf(stderr, "Usage : %s fichier\n", argv[0]); return 1; }
        int fd = open(argv[1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
        if (fd == -1) { perror("open"); return 1; }
        dup2(fd, STDOUT_FILENO);
        close(fd);
        printf("Ligne 1 redirigée.\nLigne 2 redirigée.\nLigne 3 redirigée.\n");
        return 0;
    }
    ```
    - `close(fd)` : après `dup2`, le descripteur 1 suffit ; on libère le doublon.
    - `dup2(STDOUT_FILENO, fd)` (inversé) ferait pointer `fd` vers le terminal : rien
      n'est redirigé.
    - Pour stderr : `dup2(fd, STDERR_FILENO)`.

## Exercice 10 bis — `dup()` (⭐)

??? success "Correction"
    `fd` vaut 3 et `copie` vaut 4 (plus petits descripteurs libres). Les trois lignes
    se suivent dans `journal.txt` : les deux descripteurs partagent **la même position**.
    Avec un second `open()`, chaque descripteur a sa propre position (qui repart de 0) :
    les écritures s'écrasent. `dup2(fd, 1)` ≈ `close(1); dup(fd);` — mais cette version
    n'est pas **atomique** (un autre thread peut prendre le descripteur 1 entre les deux).
