---
title: "TP4 — Redirections, processus et signaux"
---

# TP4 — Canaux standards et redirections, processus et tâches, signaux

Rediriger les trois canaux, enchaîner avec des tubes, observer et piloter les
processus, envoyer des signaux, puis `signal()`, `fork()`, `wait()` et `execvp()` en C.
Exercices corrigés : [TP4 corrigé](../td/tp4-corrige.md).

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp4/){ .md-button }
[:material-card-text: Résumé](../fiches/resume-tp4.md){ .md-button }

!!! abstract "À retenir"
    - `>` écrase, `>>` ajoute, `2>` redirige les erreurs, `<` lit un fichier sur stdin.
    - `>` ≡ `1>`, `>>` ≡ `1>>`, `<` ≡ `0<`.
    - `cmd1 | cmd2` : stdout de `cmd1` → stdin de `cmd2`.
    - Ctrl-Z = `SIGTSTP` (suspend), Ctrl-C = `SIGINT` (interrompt), `fg`/`bg` = `SIGCONT`.
    - `kill` envoie `SIGTERM` (15) par défaut ; `SIGKILL` (9) ne peut être ni intercepté ni ignoré.

## Canaux standards et redirections

| N° | Nom | Par défaut |
|:--:|-----|-----------|
| 0 | stdin | clavier |
| 1 | stdout | terminal |
| 2 | stderr | terminal (messages d'erreur) |

| Syntaxe | Effet |
|---------|-------|
| `cmd > f` (= `1>`) | stdout vers `f`, **écrasé** (vidé avant même l'exécution) |
| `cmd >> f` (= `1>>`) | stdout **ajouté** à la fin de `f` |
| `cmd 2> err` | stderr vers `err` |
| `cmd > ok 2> err` | sortie et erreurs dans deux fichiers |
| `cmd > f 2>&1` | les deux dans `f` |
| `cmd < f` (= `0<`) | stdin lu depuis `f` (qui doit exister et être lisible) |

```bash
$ cat file-1.txt file-2.txt file-3.txt 1> result.txt 2> error.txt
# result.txt : le contenu de file-1.txt (seul lisible)
# error.txt  : « Permission denied » (file-2) et « No such file » (file-3)
```

!!! piege "Piège — `ls > list_files.txt`"
    `list_files.txt` apparaît dans sa propre liste : le shell **crée** le fichier de
    redirection avant de lancer `ls`.

!!! piege "Piège — `cat f` vs `cat < f`"
    Même affichage, mais `cat f` reçoit **1 argument** (il ouvre lui-même le fichier)
    alors que `cat < f` en reçoit **0** : c'est le shell qui branche le fichier sur
    stdin. `cat` sans argument recopie son entrée (le clavier) jusqu'à ++ctrl+d++.

## Tubes

```bash
$ ls /usr/include/*.h | wc -l          # nombre de fichiers .h
$ echo "Il y a $(ls /usr/include/*.h | wc -l) fichiers .h dans le répertoire /usr/include"
$ wc -l $(ls /usr/include/*.h)         # lignes CONTENUES dans chaque fichier + total
```

!!! piege "Piège — Tube vs substitution"
    Avec le tube, `wc -l` reçoit sur stdin **la liste des noms** (une ligne par fichier).
    Avec `$(…)`, les noms deviennent des **arguments** : `wc` ouvre chaque fichier et
    compte ses lignes. Le total est bien plus grand.

## Processus et tâches

!!! definition "Définition — Processus et tâche"
    Un **processus** est un programme en cours d'exécution, identifié par un **PID**.
    Une **tâche** (*job*) est un processus (ou groupe) lancé **depuis le shell courant**,
    numérotée `%1`, `%2`… Toute tâche est un processus ; l'inverse est faux.

| Commande / touche | Effet |
|-------------------|-------|
| `ps` / `ps -e` | processus de l'utilisateur dans ce terminal / tous les processus |
| `top` | vue interactive triée par CPU (++q++ pour quitter) |
| `jobs` / `jobs -p` | tâches du shell / leurs PID |
| `cmd &` | lance directement en **arrière-plan** |
| ++ctrl+z++ | **suspend** la tâche au premier plan (`SIGTSTP`) → état *Stopped* |
| ++ctrl+c++ | **interrompt** la tâche au premier plan (`SIGINT`) |
| `fg %n` | ramène la tâche `n` au **premier plan** (et la relance) |
| `bg %n` | relance la tâche `n` suspendue en **arrière-plan** |

Colonnes de `ps` : PID, TTY (`pts/N` = pseudo-terminal), TIME (temps CPU consommé), CMD.

## Signaux

| Signal | N° | Origine | Effet |
|--------|:--:|---------|-------|
| `SIGINT` | 2 | ++ctrl+c++ | demande d'interruption |
| `SIGKILL` | 9 | `kill -9` | arrêt **forcé**, ni interceptable ni ignorable |
| `SIGTERM` | 15 | `kill` (défaut) | demande d'arrêt **propre** |
| `SIGCONT` | 18 | `fg`, `bg` | reprise d'un processus suspendu |
| `SIGTSTP` | 20 | ++ctrl+z++ | suspension |

```bash
$ kill -l                     # liste des signaux
$ kill -SIGTERM 4521          # ces trois écritures sont équivalentes…
$ kill -s SIGTERM 4521
$ kill -15 4521
$ kill 4521                   # … et SIGTERM est le signal par défaut
$ kill -SIGTSTP %1            # on peut viser une tâche par son numéro
```

!!! methode "Méthode — Choisir le signal"
    - Interrompre un programme lancé dans son terminal → `SIGINT` (Ctrl-C).
    - Arrêter proprement un service → `SIGTERM` (il peut sauvegarder, libérer).
    - Processus figé qui ignore `SIGTERM` → `SIGKILL` en **dernier recours** (aucun nettoyage).
    - Mettre un calcul en pause sans le perdre → `SIGTSTP`, puis `SIGCONT`.

On ne peut signaler que ses propres processus (sauf root).

## Programmation système (⭐, évaluée au DE)

=== "signal()"

    ```c
    static volatile sig_atomic_t compteur = 0;
    void handler(int sig) { (void)sig; compteur++; }
    /* main : */ signal(SIGINT, handler);   /* Ctrl-C n'arrête plus le programme */
    while (compteur < 3) pause();           /* attend un signal */
    ```

    - Variable partagée avec le gestionnaire : `volatile sig_atomic_t`.
    - Dans le gestionnaire, seulement des fonctions *async-signal-safe* : `write()`, pas `printf()`.
    - `SIGKILL` ne peut pas être capturé. `sigaction()` est préféré à `signal()` (comportement portable).

=== "fork() / wait()"

    ```c
    pid_t pid = fork();
    if (pid < 0)       { perror("fork"); return 1; }
    else if (pid == 0) { /* fils */   printf("fils %d, parent %d\n", getpid(), getppid()); exit(0); }
    else               { /* parent */ int st; wait(&st); }
    ```

    - `fork()` duplique le processus : il **retourne deux fois** — `0` dans le fils,
      le PID du fils dans le parent, `-1` en cas d'échec.
    - Le parent doit `wait()` : sinon le fils terminé reste **zombie** (entrée dans la
      table des processus jusqu'à ce qu'on récupère son code de retour).

=== "execvp() — mini-shell"

    ```c
    if (pid == 0) {
        execvp(argv[1], &argv[1]);   /* remplace l'image du fils */
        perror("execvp");            /* n'arrive qu'en cas d'échec */
        exit(127);
    }
    waitpid(pid, &status, 0);
    if (WIFEXITED(status)) printf("code %d\n", WEXITSTATUS(status));
    ```

    - Un shell fait pour chaque commande : `fork()` → `exec*()` dans le fils → `wait()` dans le parent.
    - `exec*` ne revient **jamais** s'il réussit (le code du programme est remplacé).
    - `execv` : chemin complet ; `execvp` : cherche dans le `PATH` ; `execve` : environnement explicite.
    - Rediriger la sortie de la commande : `open` + `dup2(fd, 1)` **avant** l'`exec`.
