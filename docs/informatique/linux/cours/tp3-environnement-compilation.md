---
title: "TP3 — Environnement de travail et compilateur C"
---

# TP3 — Environnement de travail et compilateur C

Variables du shell, caractères spéciaux et inhibition, expansion d'accolades,
substitution de commande, compilation avec `gcc`, puis programmation système
(descripteurs, `read`, `write`, `dup`, `dup2`). Exercices corrigés : [TP3 corrigé](../td/tp3-corrige.md).

!!! abstract "À retenir"
    - `nom=valeur` **sans espace** ; `$nom` ou `${nom}` pour la valeur ; variable inconnue → **vide**.
    - `\` inhibe un caractère, `'…'` inhibe **tout**, `"…"` laisse actifs `$`, `` ` `` et `\`.
    - `{a,b}` **génère** des mots ; `[ab]` **filtre** des fichiers existants.
    - `$(cmd)` = sortie de la commande ; `${var}` = valeur de la variable.
    - `gcc` : préprocesseur → compilation → assemblage (`-c` → `.o`) → édition de liens.
    - Descripteurs : **0** stdin, **1** stdout, **2** stderr. `dup2(fd, 1)` = la redirection `>`.

## Variables du shell

```bash
$ nom_fich=hello.c        # pas d'espace autour du =
$ echo nom_fich           # nom_fich   (texte littéral)
$ echo $nom_fich          # hello.c
$ echo $nom_fichpp        # (vide) : la variable nom_fichpp n'existe pas
$ echo ${nom_fich}pp      # hello.cpp : les accolades délimitent le nom
$ x = 5                   # erreur : le shell cherche une commande « x »
```

- Une variable inexistante se développe en **chaîne vide**, sans erreur.
- `phrase="$sujet $verbe"` est évaluée **au moment de l'affectation** : modifier
  `sujet` ensuite ne change pas `phrase`.
- Variable **shell** (locale) vs variable d'**environnement** (transmise aux processus
  fils après `export`). `env` / `printenv` : l'environnement ; `set` : tout.

## Caractères spéciaux et inhibition

Caractères qui ont un sens pour le shell : `;` `|` `&` `<` `>` `(` `)` `$` `` ` ``
espace `\` `'` `"` `*` `?` `[` `]` `#` `~` …

| Mécanisme | Effet | `$var` développé ? | `*` développé ? |
|-----------|-------|:-----------------:|:---------------:|
| `\c` | rend **le caractère suivant** littéral ; `\` + Entrée = continuer la ligne | — | — |
| `'…'` | **tout** est littéral (même `\`) | non | non |
| `"…"` | littéral sauf `$`, `` ` `` et `\` | **oui** | non |

```bash
$ touch fichier\ vide        # un seul fichier « fichier vide »
$ echo 3\$canadiens          # 3$canadiens
$ echo \\                    # \
$ x=coucou
$ echo '$x' "$x"             # $x coucou
$ echo "il a dit \"salut\""  # il a dit "salut"
$ echo 'aujourd'\''hui'      # aujourd'hui : on ferme, \', on rouvre
```

!!! piege "Piège — Compter les arguments"
    `touch a\ b c` reçoit **2 arguments** : `a b` et `c`. L'espace inhibé ne sépare plus.

## Expansion d'accolades

```bash
$ echo a{b,c,d}e             # abe ace ade
$ echo {1..5} {a..e}         # 1 2 3 4 5 a b c d e
$ echo {a..b}{1..2}          # a1 a2 b1 b2
$ mkdir -p projet/{src,tests,docs}
$ touch fichier_{01..05}.txt
$ mkdir -p ~/labo/{donnees/{brutes,nettoyees},scripts,resultats}
```

!!! piege "Piège — `{a,b,c}` vs `[abc]`"
    Les accolades **génèrent** les chaînes même si aucun fichier n'existe. Les crochets
    sont un joker : ils ne produisent que des noms de fichiers **existants**, et pour
    **un seul** caractère.

## Substitution de commande

`$(commande)` est remplacé par la **sortie** de la commande (l'ancienne forme
`` `commande` `` s'imbrique mal).

```bash
$ echo "Nous sommes le $(date)"
$ aujourdhui=$(date)
$ prefix="Nous sommes le"
$ phrase=${prefix} ${aujourdhui}     # erreur : le 1er mot de la date (« jeu. ») est pris pour une commande
$ phrase="${prefix} ${aujourdhui}"   # correct : les guillemets gardent un seul mot
```

Les guillemets empêchent le découpage en mots du résultat (espaces et sauts de
ligne conservés avec `echo "$phrase"`).

## Compilation C avec `gcc`

| Étape | Outil | Option qui s'arrête là | Produit |
|-------|-------|------------------------|---------|
| Préprocesseur | `cpp` | `-E` | code C développé |
| Compilation | `gcc` | `-S` | `.s` (assembleur) |
| Assemblage | `as` | `-c` | `.o` (objet) |
| Édition de liens | `ld` | (défaut) | exécutable |

```bash
$ gcc hello.c                  # → a.out (écrasé sans prévenir)
$ gcc hello.c -o hello         # → hello
$ gcc main.c hello.c -o run    # plusieurs sources
$ tar -xvf hello.tar.gz        # extraire une archive (x extraire, v verbeux, f fichier)
```

- **Erreur** : la compilation échoue, aucun exécutable (ex. accolade manquante).
- **Warning** : l'exécutable est produit quand même (ex. `return 1;` dans une fonction `void`).
- `-Wall` / `-Wextra` activent plus d'avertissements (variable inutilisée…) ;
  `-Werror` transforme les warnings en erreurs.

!!! methode "Méthode — Compilation séparée"
    ```bash
    $ gcc -c {hello,bye}.c        # hello.o bye.o
    $ gcc -c main.c               # main.o
    $ gcc *.o -o run              # édition de liens
    ```
    On ne recompile que les `.c` modifiés. Conventions : `void f(void)` (pas `void f()`)
    et garde d'en-tête `BYE_H` (pas `_BYE_H_`, identifiant réservé).

## Programmation système (⭐, évaluée au DE)

| N° | Constante | Rôle |
|:--:|-----------|------|
| 0 | `STDIN_FILENO` | entrée standard |
| 1 | `STDOUT_FILENO` | sortie standard |
| 2 | `STDERR_FILENO` | erreur standard |

- `ssize_t write(int fd, const void *buf, size_t n)` / `ssize_t read(int fd, void *buf, size_t n)` :
  retour **> 0** = octets traités (peut être **moins** que demandé → boucler),
  `read` renvoie **0** à la fin de fichier, **-1** en cas d'erreur (`perror`).
  `ssize_t` est signé pour pouvoir renvoyer -1.
- `open(chemin, O_WRONLY | O_CREAT | O_TRUNC, 0644)` ouvre et renvoie le plus petit
  descripteur libre.
- `dup2(fd, STDOUT_FILENO)` : le descripteur 1 pointe vers le fichier de `fd`. C'est ce
  que fait le shell pour `cmd > fichier` : `open`, `dup2`, `close(fd)`, puis exécution.
- `dup(fd)` : copie vers le plus petit descripteur libre ; les deux **partagent la même
  position** (offset). Deux `open()` du même fichier ont des positions indépendantes.

```c
int fd = open(argv[1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
if (fd == -1) { perror("open"); return 1; }
dup2(fd, STDOUT_FILENO);   /* stdout → fichier */
close(fd);                 /* le descripteur d'origine ne sert plus */
printf("Ligne redirigée.\n");
```
