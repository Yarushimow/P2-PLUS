---
title: "TP4 corrigé — Redirections, processus et signaux"
---

# TP4 corrigé — Redirections, processus et signaux

Énoncé : [TP4 sur le site du cours](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp4/).
Rappels : [notes du TP4](../cours/tp4-redirections-processus-signaux.md).

## Exercice 1 — Sortie standard

??? success "Correction"
    - `>` crée ou **écrase** le fichier ; `>>` **ajoute** à la fin.
    - `1>` ≡ `>` et `1>>` ≡ `>>` : le canal 1 (stdout) est implicite.
    - `ls > list_files.txt; cat list_files.txt` enregistre la liste du dossier puis
      l'affiche. `list_files.txt` y figure car le shell crée le fichier **avant**
      d'exécuter `ls`.

## Exercice 2 — Erreur standard

??? success "Correction"
    `cat file-1.txt file-2.txt file-3.txt` affiche `Hello world !` puis deux erreurs :
    *Permission denied* (`file-2.txt` illisible) et *No such file or directory*
    (`file-3.txt` n'existe pas).

    Avec `> result.txt`, les erreurs **restent à l'écran** : `>` ne redirige que le canal 1.
    Avec `1> result.txt 2> error.txt`, `result.txt` contient `Hello world !` et
    `error.txt` les deux messages. stdout porte les **résultats**, stderr les **erreurs**.

## Exercice 3 — Entrée standard

??? success "Correction"
    - `cat` sans argument lit **stdin** (le clavier) : 0 argument ; chaque ligne tapée
      est réaffichée (écho du terminal + recopie par `cat`) jusqu'à ++ctrl+d++.
    - `cat > catout.txt` : ce qu'on tape va dans le fichier (`hello`, `world`).
    - `cat < catout.txt` / `cat 0< catout.txt` : 0 argument, affiche le contenu ;
      c'est le shell qui ouvre le fichier et le branche sur stdin. `<` ≡ `0<`.

## Exercice 4 — Tubes

??? success "Correction"
    ```bash
    $ ls /usr/include/*.h > include_files.txt
    $ ls /usr/include/*.h | wc -l        # stdout de ls → stdin de wc ; résultat à l'écran
    $ echo "Il y a $(ls /usr/include/*.h | wc -l) fichiers .h dans le répertoire /usr/include"
    $ wc -l $(ls /usr/include/*.h)       # lignes de chaque fichier + total
    $ echo "Il y a $(ls /usr/include/*.h | wc -l) fichiers .h dans le répertoire /usr/include" >> include_files.txt
    ```
    Dans le 2ᵉ cas, `wc` reçoit sur stdin la **liste** (une ligne par fichier) ; dans le
    4ᵉ, il reçoit des **noms de fichiers en arguments** et compte les lignes **de leur
    contenu**.

## Exercice 5 — `sleep`

??? success "Correction"
    - `sleep 10` bloque le prompt 10 s (premier plan).
    - ++ctrl+z++ **suspend** `sleep 240` : `ps` le montre encore ; `fg %1` le relance au
      premier plan ; ++ctrl+c++ le **termine** : il disparaît de `ps`.
    - Les commandes tapées pendant `sleep 240` ne s'exécutent pas tout de suite : elles
      attendent dans le tampon du terminal et partent quand le shell reprend la main.
    - `fg %n` ramène la tâche `n` au premier plan (et lui envoie `SIGCONT`).

## Exercice 6 — Avant-plan, arrière-plan

??? success "Correction"
    ```c
    #include <stdio.h>
    #include <unistd.h>

    int main(void)
    {
        unsigned long i = 0;
        while (1) {
            i++;
            if (i % 100 == 0) {
                printf("%lu\n", i);
                fflush(stdout);
                sleep(1);
            }
        }
    }
    ```
    - Arrière-plan : `cmd &`, ou ++ctrl+z++ puis `bg`. Avant-plan : `fg`.
    - ++ctrl+z++ suspend (on peut reprendre), ++ctrl+c++ termine.
    - `jobs -p` affiche les PID des tâches (utiles pour `kill`).
    - `bg` relance une tâche suspendue **en arrière-plan** : le compteur continue
      d'écrire dans le terminal, mais le prompt est disponible.
    - États vus : *Running*, *Stopped*, *Terminated* (ou *Interrupt*).

## Exercice 7 — `kill`

??? success "Correction"
    `kill -l` : `SIGINT` 2, `SIGKILL` 9, `SIGTERM` 15, `SIGCONT` 18, `SIGTSTP` 20.

    | Commande | Effet sur `jobs` |
    |----------|------------------|
    | `kill -SIGTSTP <PID 1>` | tâche 1 *Stopped* |
    | `kill -SIGINT %2` | tâche 2 *Interrupt* (disparaît au `jobs` suivant) |
    | `kill -SIGCONT %1` | tâche 1 de nouveau *Running* |
    | `kill -s SIGTERM <PID 1>` | tâche 1 *Terminated* |
    | `kill -9 <PID 3>` | tâche 3 *Killed* |

    - `SIGINT` interrompt, `SIGTSTP` suspend (reprise possible) ; `SIGTERM` demande un
      arrêt définitif mais propre.
    - Syntaxes équivalentes : `kill -SIGTERM`, `kill -TERM`, `kill -s SIGTERM`,
      `kill -15`, et `kill` sans option ; la cible peut être un PID ou `%n`.
    - (a) `SIGINT` ; (b) `SIGTERM` ; (c) `SIGKILL` en dernier recours ; (d) `SIGTSTP` puis `SIGCONT`.

## Exercice 8 — `signal()` (⭐)

??? success "Correction"
    - Ctrl-C n'arrête plus le programme : `SIGINT` est **capturé** par `handler`, qui
      compte au lieu de laisser l'action par défaut. Au 3ᵉ, la boucle s'arrête.
    - `kill <PID>` (SIGTERM, non capturé) termine le programme.
    - `kill -9 <PID>` le tue : `SIGKILL` ne peut **jamais** être capturé ni ignoré.
    - `printf` dans un gestionnaire n'est pas *async-signal-safe* : un signal qui arrive
      pendant un `printf` du programme peut corrompre le tampon (sorties mélangées,
      voire blocage). D'où `write()`.

## Exercice 9 — `fork()` (⭐)

??? success "Correction"
    « Avant fork » s'affiche **une fois**, puis deux flots s'exécutent : le parent
    (`pid` > 0) et le fils (`pid` == 0). Le parent appelle `wait()` pour récupérer le
    code de retour du fils ; sans `wait`, un fils terminé reste **zombie**.

    ```c
    for (int k = 0; k < 2; k++) {
        pid_t p = fork();
        if (p < 0) { perror("fork"); return 1; }
        if (p == 0) { printf("[FILS %d] PID %d\n", k, getpid()); exit(0); }
    }
    wait(NULL);
    wait(NULL);          /* un wait par fils */
    ```

## Exercice 10 — Mini-shell (⭐)

??? success "Correction"
    - `execvp` remplace le code du processus fils par le programme demandé : s'il réussit,
      il n'y a plus de code à qui « revenir ». La ligne suivante ne s'exécute qu'en cas
      d'échec (`./mysh /commande/inexistante` → `execvp: No such file…`, code 127).
    - `execv` : chemin exact, tableau d'arguments ; `execvp` : cherche dans le `PATH` ;
      `execve` : chemin exact + environnement fourni.
    - Redirection vers `mysh.out` dans le fils, avant `execvp` :

    ```c
    int fd = open("mysh.out", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd == -1) { perror("open"); exit(1); }
    dup2(fd, STDOUT_FILENO);
    close(fd);
    execvp(argv[1], &argv[1]);
    ```
