---
title: "Résumé — TP4 Redirections, processus, signaux"
---

# Résumé — TP4 Redirections, processus et signaux

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp4/){ .md-button }
[:material-book-open-variant: Cours détaillé](../cours/tp4-redirections-processus-signaux.md){ .md-button }
[:material-check: Corrigé](../td/tp4-corrige.md){ .md-button }

!!! abstract "L'essentiel en 30 secondes"
    - `>` écrase, `>>` ajoute, `2>` erreurs, `<` lit un fichier sur stdin ; `>` ≡ `1>`, `<` ≡ `0<`.
    - `cmd1 | cmd2` : stdout de `cmd1` → stdin de `cmd2`.
    - Processus = PID ; tâche = processus lancé depuis le shell (`%1`, `%2`…).
    - Ctrl-Z suspend (`SIGTSTP`), Ctrl-C interrompt (`SIGINT`), `fg` / `bg` reprennent (`SIGCONT`).
    - `kill` envoie `SIGTERM` (15) par défaut ; `SIGKILL` (9) ne s'intercepte pas.

## Redirections

| Syntaxe | Effet |
|---------|-------|
| `cmd > f` | stdout → `f` (écrasé) |
| `cmd >> f` | stdout ajouté à `f` |
| `cmd 2> err` | stderr → `err` |
| `cmd > ok 2> err` | deux fichiers séparés |
| `cmd > f 2>&1` | tout dans `f` |
| `cmd < f` | stdin depuis `f` |

- `ls > l.txt` : `l.txt` apparaît dans la liste (créé avant `ls`).
- `cat f` = 1 argument ; `cat < f` = 0 argument (le shell branche le fichier sur stdin).
- `ls *.h | wc -l` compte les **fichiers** ; `wc -l $(ls *.h)` compte les **lignes dans** les fichiers.

## Processus et tâches

| Commande | Effet |
|----------|-------|
| `ps`, `ps -e`, `top` | lister les processus |
| `jobs`, `jobs -p` | tâches du shell, leurs PID |
| `cmd &` | lancer en arrière-plan |
| ++ctrl+z++ / `bg %1` / `fg %1` | suspendre / relancer en fond / ramener devant |

## Signaux

| Signal | N° | Origine | Effet |
|--------|:--:|---------|-------|
| `SIGINT` | 2 | Ctrl-C | interrompre |
| `SIGKILL` | 9 | `kill -9` | tuer de force (non interceptable) |
| `SIGTERM` | 15 | `kill` | arrêt propre |
| `SIGCONT` | 18 | `fg`, `bg` | reprendre |
| `SIGTSTP` | 20 | Ctrl-Z | suspendre |

`kill -SIGTERM PID` = `kill -s SIGTERM PID` = `kill -15 PID` = `kill PID` ; cible PID ou `%n`.
Choix : interrompre → SIGINT, arrêter un service → SIGTERM, processus figé → SIGKILL,
pause → SIGTSTP puis SIGCONT.

## Programmation système (⭐, au DE)

- `signal(SIGINT, handler)` : Ctrl-C n'arrête plus le programme ; variable partagée en
  `volatile sig_atomic_t`, `write()` (pas `printf`) dans le gestionnaire.
- `fork()` retourne **0** dans le fils, le **PID du fils** dans le parent, **-1** en échec.
- `wait()` / `waitpid()` : sans eux, le fils terminé reste **zombie**.
- `execvp(argv[1], &argv[1])` remplace le programme ; ne revient **qu'en cas d'échec**.
- Mini-shell = `fork` → `exec` dans le fils → `wait` dans le parent ; `dup2` avant `exec` pour rediriger.

## Auto-test

??? question "`cat a b c > r.txt` avec `b` illisible et `c` absent : que voit-on à l'écran ?"
    Les deux messages d'erreur : `>` ne redirige que stdout.

??? question "Différence `SIGTSTP` / `SIGTERM` ?"
    `SIGTSTP` suspend (reprise possible avec `SIGCONT`) ; `SIGTERM` demande l'arrêt définitif.

??? question "Que renvoie `fork()` dans le fils ?"
    0.
