---
title: "TP1 corrigé — Premières commandes"
---

# TP1 corrigé — Premières commandes

Énoncé : [TP1 sur le site du cours](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp1/).
Rappels : [notes du TP1](../cours/tp1-premieres-commandes.md).

## Exercice 1 — Premières commandes et raccourcis

??? success "Correction"
    | Commande | Nom | Arguments | Rôle |
    |----------|-----|-----------|------|
    | `date` | date | — | date et heure |
    | `cal` / `cal 3 2022` | cal | — / `3`, `2022` | calendrier du mois / de mars 2022 |
    | `who` | who | — | utilisateurs connectés |
    | `who am i` | who | `am`, `i` | uniquement sa propre session |
    | `  who  am   i` | who | `am`, `i` | idem : les espaces en trop sont ignorés |
    | `uname` | uname | — | nom du noyau (`Linux`) |
    | `uname -m -r` / `uname -mrs` | uname | options | architecture, version du noyau (+ nom) : les options se combinent |
    | `echo Hello, world!` | echo | `Hello,`, `world!` | affiche ses arguments séparés par **un** espace |

    - ++ctrl+d++ sur une ligne **non vide** ne fait rien (ou efface le caractère sous le
      curseur) ; sur une ligne **vide**, il envoie EOF et **ferme le shell**.
    - Dans un nouveau terminal, ++ctrl+p++ remonte l'historique : il est conservé
      d'une session à l'autre (fichier `~/.bash_history`).

## Exercice 2 — Se repérer dans l'arborescence

??? success "Correction"
    - `pwd` dans le home → `/home/<login>`.
    - `cd ..` répété : `/home`, puis `/`, puis `/` reste `/` : la racine n'a pas de parent.
    - `cd` seul ramène au home.
    - `ls` liste le contenu du répertoire courant ; `/usr/include` contient les **en-têtes C**.
    - `cat stdlib.h` affiche le fichier, `wc -l stdlib.h` compte ses lignes.
    - `/usr/share/man` contient les pages de manuel, rangées par section (`man1`, `man2`…).
    - `echo ~` affiche le chemin du home : c'est le **shell** qui remplace `~` avant
      d'exécuter la commande, `echo` ne voit que `/home/<login>`.

## Exercice 3 — Créer, déplacer, copier, supprimer

??? success "Correction"
    - `mkdir abeilles tp_shell/tp1 ~/arbres` : `abeilles` et `tp_shell/tp1` sont
      **relatifs**, `~/arbres` est **absolu**.
    - `mkdir -p vivant/plante/fleur …` : `-p` crée les parents manquants.
    - `rmdir vivant tp_shell/tp1/exos/ex1` : `vivant` échoue (*Directory not empty*),
      `ex1` est supprimé. `rmdir` ne supprime que les dossiers **vides**.
      `rmdir tp_shell/tp1` échoue aussi : `ls -R tp_shell` montre qu'il contient
      encore `exos`. On supprime de bas en haut (`rmdir tp_shell/tp1/exos tp_shell/tp1`)
      ou d'un coup avec `rmdir -p tp_shell/tp1/exos` (qui retire aussi `tp_shell` s'il devient vide).
    - Déplacements :
        - `mv arbres/hello.c arbres/bonjour.c` → **renommage** ;
        - `mv abeilles arbres vivant/` → les deux dossiers vont **dans** `vivant` ;
        - `mv bidule vivant` → `bidule` va dans `vivant` (dossier existant) ;
        - `mv vivant vie` → `vie` n'existe pas : **renommage**.
    - `cp` : si le dernier argument est un dossier existant, copie **dedans** ; sinon,
      copie sous ce nouveau nom (2 arguments seulement). Pour un dossier source, il faut `-R`.
    - `rm` est définitif ; `rm -r` / `rm -R` pour un dossier non vide.

## Exercice 4 — Construire une arborescence

??? success "Correction"
    ```bash
    $ cd
    $ mkdir Mail Rapport Web                     # une seule commande
    $ mkdir -p Rapport/Docs/{Afaire,Fait}
    $ touch Rapport/rapport.txt Web/index.html
    $ cd ~/Rapport/Docs/Afaire                   # 1
    $ cd ../Fait                                 # 2
    $ cp ~/Rapport/rapport.txt .
    $ mv rapport.txt rapport_copie.txt           # 3
    $ cd ../..                                   # 4 → ~/Rapport
    $ cat ../Web/index.html                      # 5
    $ ls ../Web                                  # 6
    $ cd && rm -r Mail Rapport Web               # 7
    ```

## Exercice 5 — Internes vs externes

??? success "Correction"
    - **Internes** : `cd`, `echo`, `pwd`, `type`, `help`, `umask`, `hash`, `exit`.
    - **Externes** : `ls`, `cat`, `wc`, `cp`, `mv`, `rm`, `mkdir`, `rmdir`, `touch`,
      `date`, `cal`, `who`, `uname`, `man`.
    - La plupart des programmes sont dans `/bin`, `/usr/bin` (et `/sbin`, `/usr/sbin`
      pour l'administration).

## Exercice 6 — Obtenir l'aide

??? success "Correction"
    - `ls -l` : format long ; `ls -a` : inclut les fichiers cachés.
    - `rm -f` : force, sans confirmation ni erreur si le fichier manque. Fichier nommé
      `-f` : `rm -- -f` ou `rm ./-f`.
    - `touch` met surtout à jour les **dates** d'accès / de modification (`-a`, `-m`, `-d`).
    - Bibliothèques : section **3** ; `man 1 printf` = la commande, `man 3 printf` = la fonction C.
    - SYNOPSIS de `mv` : `[OPTION]...` = options facultatives et répétables,
      `SOURCE... DIRECTORY` = une ou plusieurs sources vers un dossier.

## Exercice 7 — Jokers

??? success "Correction"
    Fichiers : `annee1 Annee2 annee4 annee45 annee41 annee510 annee_saucisse annee_banane bonbon`.

    | Demande | Commande |
    |---------|----------|
    | finissent par 5 | `ls *5` → `annee45` |
    | commencent par `annee4` | `ls annee4*` |
    | `annee4` + 7 caractères max | `ls annee4 annee4?` |
    | `annee` + 6ᵉ caractère non numérique | `ls annee[^0-9]*` |
    | contiennent `ana` | `ls *ana*` |
    | commencent par `a` ou `A` | `ls [aA]*` |
    | avant-dernier caractère `4` ou `1` | `ls *[41]?` → `annee41 annee45 annee510` |
    | cachés du home | `ls -d ~/.*` |
    | `std*.h` dans `/usr/include` | `ls /usr/include/std*.h` |

    `echo c*` affiche `c*` : aucun fichier ne correspond, le motif est laissé tel quel.
