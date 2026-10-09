---
title: "Résumé — TP3 Environnement et compilateur C"
---

# Résumé — TP3 Environnement de travail et compilateur C

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp3/){ .md-button }
[:material-book-open-variant: Cours détaillé](../cours/tp3-environnement-compilation.md){ .md-button }
[:material-check: Corrigé](../td/tp3-corrige.md){ .md-button }

!!! abstract "L'essentiel en 30 secondes"
    - `nom=valeur` **sans espace** ; `$nom` / `${nom}` ; variable inconnue → **chaîne vide**.
    - `\` inhibe un caractère, `'…'` inhibe **tout**, `"…"` laisse actifs `$`, `` ` ``, `\`.
    - `{a,b}` **génère** des mots ; `[ab]` **filtre** des fichiers existants.
    - `$(cmd)` = sortie d'une commande ; `${var}` = valeur d'une variable.
    - `gcc` : préprocesseur → compilation → assemblage (`-c` → `.o`) → édition de liens.
    - Descripteurs : 0 stdin, 1 stdout, 2 stderr ; `dup2(fd, 1)` = la redirection `>`.

## Variables

```bash
$ x=coucou
$ echo $x ${x}s $xs     # coucou coucous (vide)
$ export x              # transmise aux processus fils
```

`env` / `printenv` : variables d'environnement ; `set` : toutes les variables.
Une affectation est évaluée **une fois** : changer une variable ensuite ne met pas à
jour celles qui en dépendent.

## Quoting

| Écriture (x=coucou) | Affiche |
|---------------------|---------|
| `echo $x` | `coucou` |
| `echo '$x'` | `$x` |
| `echo "$x"` | `coucou` |
| `echo \$x` | `$x` |
| `echo "*"` / `echo *` | `*` / la liste des fichiers |
| `echo 'aujourd'\''hui'` | `aujourd'hui` |

`touch a\ b c` → **2 arguments** (`a b` et `c`).

## Accolades et substitution

```bash
$ echo a{b,c}d {1..3}          # abd acd 1 2 3
$ mkdir -p projet/{src,tests,docs}
$ echo "Nous sommes le $(date)"
$ phrase="$prefix $(date)"     # guillemets : une seule valeur
```

## `gcc`

| Commande | Produit |
|----------|---------|
| `gcc hello.c` | `a.out` |
| `gcc hello.c -o hello` | `hello` |
| `gcc -c hello.c` | `hello.o` (pas d'édition de liens) |
| `gcc *.o -o run` | édition de liens des objets |
| `-E` / `-S` | s'arrête après le préprocesseur / la compilation (`.s`) |
| `-Wall -Wextra -Werror` | plus de warnings / warnings → erreurs |

**Erreur** = pas d'exécutable ; **warning** = exécutable produit quand même.
Conventions : `void f(void)`, garde d'en-tête `BYE_H`.

## Programmation système (⭐, au DE)

- `write(fd, buf, n)` / `read(fd, buf, n)` : renvoient le nombre d'octets traités
  (parfois moins → boucler) ; `read` renvoie **0** en fin de fichier, **-1** en erreur.
- `open(f, O_WRONLY | O_CREAT | O_TRUNC, 0644)` → plus petit descripteur libre.
- `dup2(fd, STDOUT_FILENO); close(fd);` → stdout va dans le fichier.
- `dup(fd)` → copie qui **partage la position** ; deux `open()` ont des positions séparées.

## Auto-test

??? question "`echo '$(date)'` ?"
    Affiche `$(date)` : rien n'est développé entre apostrophes.

??? question "`var3=$var $var2` (var=hello, var2=world) ?"
    Erreur : `world` est pris pour une commande. Il faut `var3="$var $var2"`.

??? question "`gcc -c main.c` crée-t-il un exécutable ?"
    Non, seulement `main.o`.
