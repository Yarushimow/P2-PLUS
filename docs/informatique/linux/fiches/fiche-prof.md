---
title: "Fiche du prof — Examen final (DE)"
---

# Fiche de révision du prof — Examen final

Retranscription de la fiche de **Dr. Y. Guifo Fodjo** (EFREI Paris, octobre 2026),
en vue du DE : **QCM, 1 h, 60 % de la note**. Chaque TP y est résumé en 4 blocs :
objectifs → commandes clés → pièges fréquents → auto-test. Les pièges marqués ▶
sont les items qui reviennent dans les QCM d'analyse.

[:material-file-pdf-box: Télécharger le PDF](fiche-prof-ti307.pdf){ .md-button .md-button--primary }

!!! warning "Périmètre de cette fiche"
    La fiche du prof couvre **les exercices 1 à 7 (tronc commun)** des TP1 à TP4 et
    exclut les exercices ⭐ (8 à 10). Elle aborde quand même `open` / `read` / `write`,
    `argc` / `argv` et `errno` pour le TP3. L'énoncé du TP3 annonce de son côté que les
    exercices ⭐ de programmation système sont évalués au DE : mieux vaut les
    connaître aussi (voir les [corrigés](../td/tp3-corrige.md#exercice-8-compilation-separee)).

## 1. TP1 — Premières commandes, navigation, gestion de fichiers

**Objectifs.** *Comprendre* le modèle shell / commande / arguments. *Appliquer* :
naviguer dans l'arborescence, lire et manipuler des fichiers, consulter l'aide
intégrée. *Analyser* : distinguer commandes internes (*builtins*) et externes.

| Catégorie | Commandes essentielles |
|-----------|------------------------|
| Navigation | `pwd` (répertoire courant) · `cd [chemin]` · `ls -l -a -R` |
| Lecture | `cat` · `wc -l -w -c` · `head -n N` · `tail -n N` |
| Création / copie / déplacement | `mkdir [-p]` · `touch` · `cp [-r]` · `mv` · `rm [-i -r]` |
| Identification | `file <chemin>` |
| Aide | `man <cmd>` (externes) · `help <cmd>` (internes) · `help` |

!!! note "Sections du manuel `man`"
    **1** commandes utilisateur · **2** appels système (noyau) · **3** bibliothèques C ·
    **8** administration système. Dans une page : `/motif` pour chercher, ++n++ suivant,
    ++q++ quitter. Lire d'abord NAME, puis SYNOPSIS.

!!! note "Jokers (globbing) — expansion par le shell avant l'exécution"
    `*` : séquence quelconque (y compris vide) · `?` : exactement 1 caractère ·
    `[abc]` : classe de caractères.
    Exemples : `cp *.csv data/` · `rm rapport_v[0-9].pdf` · `ls exo_0?.py`.

!!! note "Chemins absolus vs relatifs"
    **Absolu** : commence par `/` (ex. `/etc/passwd`). **Relatif** : par rapport à `pwd`
    (ex. `./script.sh`, `../dossier`). `~` = répertoire personnel.

!!! piege "Pièges fréquents (QCM)"
    - ▶ `rm *` dans le mauvais répertoire est **irréversible** : toujours vérifier avec
      `echo *` ou `ls *` d'abord.
    - ▶ `cd` sans argument ramène au **home**, pas à la racine (c'est `cd /` qui va à la racine).
    - ▶ `help` fonctionne pour les **builtins** (`cd`, `echo`, `pwd`, `type`) ; `man` pour les
      **externes** (`ls`, `cp`, `mv`, `rm`, `cat`). `type <cmd>` dit laquelle.
    - Le shell développe le joker **avant** de lancer la commande : `rm *.txt` dans un
      dossier vide produit l'erreur « No such file or directory » sur le motif littéral.

**Auto-test TP1.** Je sais : exécuter `man` et identifier la bonne section ; distinguer
builtin / externe ; utiliser les jokers sans détruire mon dossier ; composer un
chemin relatif correct depuis `pwd`.

## 2. TP2 — Système de fichiers et permissions

**Objectifs.** *Comprendre* le FHS (une seule racine `/`). *Appliquer* : identifier le
type d'un fichier, créer des liens symboliques, lire / modifier les permissions.
*Analyser* : diagnostiquer « Permission denied ». *Évaluer* : choisir les
permissions minimales pour un cas d'usage.

| Chemin | Contenu |
|--------|---------|
| `/bin` | commandes essentielles (`ls`, `cat`, `cp`…) |
| `/sbin` | commandes d'administration (`fdisk`, `ifconfig`…) |
| `/etc` | fichiers de configuration système |
| `/home` | répertoires personnels des utilisateurs |
| `/root` | répertoire personnel de l'administrateur |
| `/usr` | applications et bibliothèques (`/usr/bin`, `/usr/lib`) |
| `/var` | données variables (journaux, bases) |
| `/tmp` | fichiers temporaires |
| `/dev` | fichiers spéciaux représentant les périphériques |
| `/proc` | FS virtuel (infos sur les processus) |
| `/boot` | noyau et fichiers de démarrage |

**Types de fichiers** (premier caractère de `ls -l`) :

| `-` | `d` | `l` | `c` | `b` | `p` | `s` |
|-----|-----|-----|-----|-----|-----|-----|
| fichier ordinaire | répertoire | lien symbolique | périph. caractère | périph. bloc | tube nommé (FIFO) | socket |

Confirmation précise : `file <chemin>` (lit le **contenu**, pas seulement le nom).

**Liens symboliques.** `ln -s cible nom_lien` crée un raccourci. Si la cible est
supprimée, le lien devient **cassé** (*dangling*) : `cat lien` échoue avec « No such
file or directory ».

!!! note "Permissions — la grille à mémoriser"
    ```text
    -rw-r--r--  1 user group  215 Sep 15 10:24 notes.txt
    ```
    Caractère 1 : type · 2-4 : user (u) · 5-7 : group (g) · 8-10 : others (o).
    `r` = 4 (lecture) · `w` = 2 (écriture) · `x` = 1 (exécution, ou **traversée** pour un répertoire).

| Octal | Symbolique | Sens / usage typique |
|:-----:|:----------:|----------------------|
| 7 | `rwx` | tout : scripts shell appartenant à l'utilisateur |
| 6 | `rw-` | lecture + écriture : fichiers de données personnels |
| 5 | `r-x` | lecture + exécution : binaires système partagés |
| 4 | `r--` | lecture seule |
| 0 | `---` | aucun droit |
| 644 | `rw-r--r--` | défaut fichier (umask 022) : partagé en lecture |
| 755 | `rwxr-xr-x` | défaut répertoire ou binaire exécutable |
| 600 | `rw-------` | fichier privé (clé SSH, mot de passe) |
| 700 | `rwx------` | répertoire privé |

!!! piege "Pièges fréquents (QCM)"
    - ▶ `chmod 777` = tout le monde peut lire, écrire, exécuter. **Jamais** sur un
      dossier public, jamais sur un script.
    - ▶ **Traversée bloquée** : si `projet/prive/` a 700, un autre utilisateur ne peut pas
      lire `secret.txt` à l'intérieur, **même si** `secret.txt` a 644 — il faut le droit
      `x` sur **chaque** répertoire du chemin.
    - ▶ Sur un répertoire : `r` = lister les noms, `w` = créer / supprimer des entrées,
      `x` = entrer dedans avec `cd`.
    - ▶ **Lien symbolique cassé** : `ls -l` affiche encore le lien, mais toute opération
      (`cat`, `open`) échoue.
    - `a=r` dans `chmod` = `u=r,g=r,o=r` (`a` = *all*).

**Auto-test TP2.** Je récite le rôle de `/etc`, `/home`, `/usr`, `/var`, `/dev`, `/proc`.
Je lis une ligne `ls -l` et je donne l'octal. Je choisis les permissions minimales
pour : (a) mot de passe personnel, (b) script d'équipe, (c) page web publique.
J'explique la traversée bloquée.

??? success "Réponses possibles pour (a), (b), (c)"
    (a) `600` (`rw-------`) ; (b) `750` ou `770` selon que l'équipe doit le modifier
    (exécutable par le groupe, rien pour les autres) ; (c) `644` pour la page, `755`
    pour les dossiers qui la contiennent (traversée pour tous).

## 3. TP3 — Environnement de travail et compilateur C

**Objectifs.** *Comprendre* les 4 étapes de la compilation C. *Appliquer* : compiler
avec `gcc`, lire `argc` / `argv`, gérer `errno`, manipuler `open` / `read` / `write` /
`close`. *Analyser* : interpréter les warnings de `gcc`.

| # | Outil | Entrée → sortie | Option `gcc` |
|:-:|-------|-----------------|:------------:|
| 1 | `cpp` | `.c` → texte étendu | `-E` |
| 2 | `gcc` (*compile*) | texte étendu → assembleur `.s` | `-S` |
| 3 | `as` | `.s` → objet `.o` | `-c` |
| 4 | `ld` (*link*) | `.o` + bibliothèques → exécutable | (aucune) |

!!! note "Options `gcc` à mémoriser"
    `-o nom` : nommer l'exécutable (sinon `a.out`) · `-Wall` : avertissements courants ·
    `-Wextra` : avertissements supplémentaires · `-Werror` : warnings → erreurs ·
    `-g` : symboles de debug.

**Arguments en ligne de commande**

```c
int main(int argc, char **argv) { ... }
```

```text
./monprog hello world
  -> argc = 3, argv[0] = "./monprog", argv[1] = "hello", argv[2] = "world"
  -> argv[argc] vaut toujours NULL (fin du tableau, convention execv)
```

**Gestion des erreurs système**

| Outil | Rôle |
|-------|------|
| `errno` | variable globale (`<errno.h>`) positionnée par l'appel qui échoue |
| `perror("ctx")` | affiche sur stderr : `ctx: <message lisible>` |
| `strerror(errno)` | renvoie la chaîne descriptive correspondant au code |

Codes à connaître : **`ENOENT`** (fichier inexistant), **`EACCES`** (permission refusée),
**`EPERM`** (opération non permise).

**Appels système fichiers**

| Appel | Rôle |
|-------|------|
| `open(path, flags, mode)` | ouvre un fichier, renvoie un **descripteur** entier · `<fcntl.h>` |
| `read(fd, buf, count)` | lit jusqu'à `count` octets ; renvoie le nombre lu, **0 à EOF**, **−1** à l'erreur |
| `write(fd, buf, count)` | écrit `count` octets ; renvoie le nombre écrit |
| `close(fd)` | ferme le descripteur |

Trois descripteurs toujours ouverts : **0** = `STDIN_FILENO` (clavier) ·
**1** = `STDOUT_FILENO` (terminal) · **2** = `STDERR_FILENO` (terminal, erreurs).

!!! piege "Pièges fréquents (QCM)"
    - ▶ `./programme` : le `./` est obligatoire parce que `.` (le répertoire courant)
      n'est **pas** dans `$PATH`.
    - ▶ `gcc hello.c` sans `-o` produit `a.out`, pas `hello`.
    - ▶ Compiler sans `-Wall -Wextra` laisse passer des bugs (variable non initialisée,
      format `%d` avec un `double`, variable non utilisée).
    - ▶ Un tampon (`char buf[4096]`) est utilisé parce que lire 1 octet par 1 octet
      déclenche **un appel système par octet** → coût prohibitif.
    - `man 2 X` = appels système (noyau) ; `man 3 X` = bibliothèque C (ex. `man 3 printf`).

**Auto-test TP3.** Je cite les 4 étapes de compilation et l'option `gcc` pour
s'arrêter à chacune. J'écris `main(int argc, char **argv)` et je sais ce que vaut
`argv[0]`. J'écris la séquence `open` → `read` → `close` avec vérification `fd < 0`.
Je nomme 3 codes `errno` courants.

??? success "La séquence `open` → `read` → `close`"
    ```c
    #include <fcntl.h>
    #include <stdio.h>
    #include <unistd.h>

    int main(int argc, char **argv)
    {
        if (argc < 2) { fprintf(stderr, "Usage : %s fichier\n", argv[0]); return 1; }
        int fd = open(argv[1], O_RDONLY);
        if (fd < 0) { perror("open"); return 1; }      /* ENOENT, EACCES… */
        char buf[4096];
        ssize_t n;
        while ((n = read(fd, buf, sizeof buf)) > 0)
            write(STDOUT_FILENO, buf, n);
        if (n < 0) perror("read");
        close(fd);
        return 0;
    }
    ```

## 4. TP4 — Redirections, processus, signaux

**Objectifs.** *Appliquer* : redirections (`>`, `>>`, `<`, `1>`, `2>`), tubes (`|`),
contrôle de tâches. *Analyser* : processus vs tâche, avant-plan vs arrière-plan.
*Évaluer* : choisir entre arrêt propre (`SIGTERM`) et arrêt forcé (`SIGKILL`).

| # | Nom | Rôle par défaut |
|:-:|-----|-----------------|
| 0 | stdin | lit depuis le clavier |
| 1 | stdout | écrit sur le terminal (sortie normale) |
| 2 | stderr | écrit sur le terminal (messages d'erreur) |

| Opérateur | Effet |
|-----------|-------|
| `> fichier` | redirige stdout, **écrase** le fichier (créé s'il n'existe pas) |
| `>> fichier` | redirige stdout, **ajoute en fin** de fichier |
| `1> fichier` | synonyme explicite de `> fichier` |
| `2> fichier` | redirige **stderr** vers un fichier |
| `< fichier` (= `0<`) | redirige stdin : la commande lit depuis le fichier |
| `2>&1` | redirige stderr vers là où va stdout |

Exemple canonique : `cat f1 f2 f3 1> result.txt 2> error.txt` sépare proprement
résultats et erreurs.

**Tubes.** `cmd1 | cmd2` : la sortie standard de `cmd1` devient l'entrée standard de
`cmd2`. Enchaînable : `ls /usr/include/*.h | wc -l`.

!!! piege "Piège QCM — tube vs substitution"
    `ls *.h | wc -l` : `wc -l` compte les **lignes de la sortie** de `ls` (= nombre de fichiers).
    `wc -l $(ls *.h)` : `wc -l` reçoit les **noms de fichiers en argument** et compte les
    lignes **à l'intérieur** de chacun → résultat totalement différent.

| Commande | Rôle |
|----------|------|
| `ps` | processus de l'utilisateur courant (colonnes PID, TTY, TIME, CMD) |
| `ps -e` / `-A` | tous les processus du système |
| `top` | afficheur interactif, trié par CPU ; quitter avec ++q++ |
| `jobs` | tâches du shell courant |
| `jobs -p` | affiche les PID |
| `fg %n` | ramène la tâche `n` au premier plan |
| `bg %n` | reprend la tâche `n` en arrière-plan |
| `cmd &` | lance `cmd` directement en arrière-plan |

Raccourcis : ++ctrl+z++ suspend la tâche courante (`SIGTSTP`) · ++ctrl+c++ interrompt
(`SIGINT`) · ++ctrl+d++ envoie EOF sur stdin.

| Signal | N° | Sémantique |
|--------|:--:|------------|
| `SIGINT` | 2 | interruption (clavier ++ctrl+c++) — le processus **peut l'ignorer** |
| `SIGTSTP` | 20 | suspension (clavier ++ctrl+z++) |
| `SIGCONT` | 18 | reprise d'un processus suspendu (`fg`, `bg`) |
| `SIGTERM` | 15 | demande d'arrêt **propre** (défaut de `kill`) |
| `SIGKILL` | 9 | arrêt **forcé**, ne peut pas être ignoré ou capturé |

Syntaxes équivalentes : `kill -SIGTERM <PID>` = `kill -s SIGTERM <PID>` =
`kill -15 <PID>` = `kill <PID>`. Liste exhaustive : `kill -L`.

!!! piege "Pièges fréquents (QCM)"
    - ▶ `>` **écrase sans demander** → toujours préférer `>>` pour journaliser.
    - ▶ `ls > list_files.txt` : `list_files.txt` apparaît dedans parce que le shell le crée
      (via `>`) **avant** que `ls` ne lise le répertoire.
    - ▶ `SIGKILL` (9) ne peut pas être capturé ni ignoré ⇒ pas de nettoyage, pas de
      sauvegarde ⇒ **dernier recours** uniquement.
    - ▶ Un processus **suspendu** (*Stopped* dans `jobs`) consomme encore de la mémoire ;
      il faut `kill %n` pour vraiment le terminer.
    - ▶ Choix du signal : (a) interrompre son propre programme → `SIGINT` ; (b) arrêter
      proprement un service → `SIGTERM` ; (c) processus figé → `SIGKILL` ; (d) suspendre
      temporairement un calcul → `SIGTSTP`.
    - On ne peut envoyer de signal **qu'à ses propres processus**, sauf root.

**Auto-test TP4.** Je distingue `>` et `>>`, `1>` et `2>`. J'explique `ls *.h | wc -l`
vs `wc -l $(ls *.h)`. Je nomme les 5 signaux clés avec leur numéro. Je choisis le
bon signal dans un scénario donné.

## 5. Checklist finale avant l'examen

=== "TP1 — Shell de base"

    - [ ] Je sais ouvrir une page de manuel et identifier la bonne section (1, 2, 3, 8).
    - [ ] Je distingue builtin vs externe et je sais vérifier avec `type <cmd>`.
    - [ ] Je lis une commande utilisant `*`, `?`, `[...]` et je dis quels fichiers elle vise.
    - [ ] Je compose un chemin relatif correct depuis un `pwd` donné.

=== "TP2 — Fichiers et permissions"

    - [ ] Je récite les rôles de `/etc`, `/home`, `/usr`, `/var`, `/dev`, `/proc`.
    - [ ] Je convertis entre notation symbolique et octale (`rw-r--r--` ↔ 644).
    - [ ] Je choisis les permissions **minimales** pour un cas d'usage donné.
    - [ ] J'explique pourquoi `chmod 700` sur un répertoire bloque la lecture des fichiers 644 à l'intérieur (traversée).
    - [ ] J'explique ce qui se passe quand on fait `cat` sur un lien symbolique cassé.

=== "TP3 — GCC et appels système"

    - [ ] Je cite les 4 étapes de compilation et l'option `gcc` qui s'arrête à chacune.
    - [ ] J'explique pourquoi `./programme` nécessite `./` (lien avec `$PATH`).
    - [ ] J'identifie 3 codes `errno` et je sais utiliser `perror`.
    - [ ] J'écris la séquence `open` → `read` → `close` avec vérification d'erreur.
    - [ ] Je justifie l'usage de `-Wall -Wextra -Werror` en 3 lignes.

=== "TP4 — Redirections, processus, signaux"

    - [ ] Je distingue `>`, `>>`, `1>`, `2>`, `<`.
    - [ ] Je sais tracer où va la sortie dans un pipeline à 3 étages.
    - [ ] Je distingue `ls *.h | wc -l` de `wc -l $(ls *.h)`.
    - [ ] Je cite 5 signaux avec leur numéro et leur sémantique.
    - [ ] Je choisis le bon signal pour : arrêter proprement / forcer / suspendre.
    - [ ] Je sais basculer une tâche entre avant-plan et arrière-plan (`fg`, `bg`, `&`, ++ctrl+z++).

## Conseils de méthode pour le QCM

1. Repérer le **verbe** : « quelle commande affiche » (appliquer) vs « que se passe-t-il
   si » (analyser) vs « quel est le meilleur choix » (évaluer). L'effort n'est pas le même.
2. Éliminer les distracteurs grossiers : une option à la syntaxe inexistante
   (`kill terminate`, `chmod +X`…) est fausse par construction.
3. Attention à l'ordre des redirections : `2>&1 > fichier` **n'est pas** `> fichier 2>&1`.
4. Permissions : convertir systématiquement en octal avant de choisir.
5. Signaux : si l'énoncé évoque un processus figé, « ne peut pas être ignoré » pointe `SIGKILL`.
6. Si tu bloques, passe et reviens : un QCM se joue sur le temps.

!!! tip "Pourquoi l'ordre `2>&1` compte"
    Le shell traite les redirections **de gauche à droite**.

    - `cmd > f 2>&1` : stdout part dans `f`, puis stderr est copié **là où va stdout** → les deux dans `f`.
    - `cmd 2>&1 > f` : stderr est copié là où va stdout **à ce moment-là** (le terminal),
      puis seul stdout part dans `f` → les erreurs restent à l'écran.
