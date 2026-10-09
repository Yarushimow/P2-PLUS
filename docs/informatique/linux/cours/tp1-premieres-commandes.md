---
title: "TP1 — Premières commandes"
---

# TP1 — Premières commandes

Anatomie d'une commande, navigation dans l'arborescence, gestion des fichiers,
types de commandes et aide, jokers. Exercices corrigés : [TP1 corrigé](../td/tp1-corrige.md).

[:material-file-document: Énoncé](https://yvanguifo.github.io/introduction-linux-fr/contenus/tp1/){ .md-button }
[:material-card-text: Résumé](../fiches/resume-tp1.md){ .md-button }

!!! abstract "À retenir"
    - Une commande = **nom** + **options** + **arguments**, séparés par des espaces.
    - Chemin **absolu** : commence par `/` (ou `~`, remplacé par le home). Sinon **relatif**.
    - `rmdir` ne supprime que les dossiers **vides** ; `cp` / `rm` ont besoin de `-R` / `-r` pour un dossier.
    - `man` → commandes externes, `help` → commandes internes, `type` → dit laquelle.
    - Les jokers `*`, `?`, `[…]` sont **développés par le shell** avant l'exécution.

## Anatomie d'une commande

```text
ls   -l -a   /etc  /tmp
│    │       └─────────── arguments
│    └─────────────────── options (combinables : -la)
└──────────────────────── nom de la commande
```

- Les **espaces** séparent les mots ; plusieurs espaces valent un seul
  (`echo   Hello,     world!` affiche `Hello, world!`).
- Options courtes combinables : `uname -m -r` ≡ `uname -mr`.
- Le `$` en début de ligne dans les énoncés est l'**invite** (prompt) : on ne le tape pas.
  `PS1='$ '` raccourcit l'invite.

Premières commandes : `date`, `cal` (`cal 3 2022` = mars 2022), `who`, `who am i`,
`uname` (`-m` architecture, `-r` version du noyau, `-s` nom du noyau), `echo`.

## Raccourcis clavier

| Touche | Effet |
|--------|-------|
| ++up++ / ++ctrl+p++, ++down++ / ++ctrl+n++ | Remonter / descendre dans l'historique |
| ++tab++ | Complétion (2 × ++tab++ : liste des possibilités) |
| ++ctrl+l++ | Efface l'écran |
| ++ctrl+u++ | Efface la ligne jusqu'au curseur |
| ++ctrl+d++ | Fin d'entrée (EOF) ; sur une ligne vide, ferme le shell |
| ++ctrl+c++ | Interrompt la commande en cours |

## Se repérer dans l'arborescence

| Commande | Rôle |
|----------|------|
| `pwd` | Affiche le chemin **absolu** du répertoire courant |
| `cd chemin` | Change de répertoire |
| `cd` (seul) / `cd ~` | Va au home |
| `cd ..` | Remonte au parent (à la racine, `cd ..` reste sur `/`) |
| `cd -` | Retourne au **dernier** répertoire visité |
| `ls [chemin]` | Liste le contenu (`-l` détail, `-a` cachés, `-R` récursif, `-d` le dossier lui-même) |
| `cat f` | Affiche (concatène) des fichiers |
| `wc f` | Compte lignes (`-l`), mots (`-w`), octets (`-c`) |

Repères : `/usr/include` contient les en-têtes C (`stdlib.h`, `stdio.h`),
`/usr/share/man` les pages de manuel, `/bin` les programmes de base.

!!! definition "Définition — Chemins"
    - `/` : la racine, et le séparateur (sous Windows c'est `\`).
    - **Absolu** : part de la racine, commence par `/`. Ex. `/home/yoan/tp1`.
    - **Relatif** : part du répertoire courant. Ex. `tp1`, `./tp1`, `../tp2`.
    - `.` = répertoire courant, `..` = parent, `~` = home.

!!! piege "Piège — `~/dir` est absolu"
    Le shell remplace `~` par le chemin du home (`echo ~` affiche `/home/login`)
    **avant** d'exécuter : `~/dir` devient `/home/login/dir`, un chemin absolu.
    `./dir` est relatif.

## Gérer fichiers et répertoires

| Commande | Rôle | Options |
|----------|------|---------|
| `mkdir d1 d2` | Crée des répertoires | `-p` crée les parents manquants |
| `rmdir d` | Supprime un répertoire **vide** | `-p` supprime aussi les parents devenus vides |
| `touch f` | Crée un fichier vide (ou met à jour sa date) | |
| `mv src dest` | Renomme **ou** déplace | |
| `cp src dest` | Copie | `-R` pour un répertoire |
| `rm f` | Supprime (définitif, pas de corbeille) | `-r` récursif, `-f` sans confirmation ni erreur, `-i` demande confirmation |

!!! methode "Méthode — Que fait `mv` / `cp` ?"
    Tout dépend du **dernier argument** :

    - c'est un **répertoire existant** → les sources sont **déplacées / copiées dedans** ;
    - sinon (2 arguments seulement) → la source est **renommée / copiée sous ce nom**.

    Donc `mv a b` peut renommer un fichier ou un dossier `a` en `b`, ou déplacer `a`
    dans le dossier `b`. Avec 3 arguments ou plus (`mv a b c`), le dernier doit être
    un dossier.

```bash
$ mkdir -p vivant/plante/fleur      # crée les 3 niveaux d'un coup
$ touch bidule
$ mv bidule vivant                  # vivant existe → bidule va dedans
$ mv vivant vie                     # vie n'existe pas → renommage
$ cp -R vie copie_vie               # copie récursive d'un dossier
$ rm -r copie_vie                   # suppression récursive
```

!!! piege "Piège — Fichier dont le nom commence par un tiret"
    `rm -f` est lu comme une option. Pour supprimer un fichier nommé `-f` :
    `rm -- -f` ou `rm ./-f`.

## Types de commandes et aide

| Type | Exemple | Aide |
|------|---------|------|
| **Externe** (programme dans un dossier du `PATH`) | `ls`, `cp`, `mkdir`, `cat` | `man ls` |
| **Interne** (*builtin*, intégrée au shell) | `cd`, `echo`, `type`, `help`, `pwd`* | `help cd` |
| **Alias** | `ll` (souvent `ls -l`) | `type ll` |
| **Fonction** du shell | | `type` |

\* `pwd` et `echo` existent en interne **et** en externe (`type -a echo`) ; c'est la
version interne qui est utilisée.

- `type cmd` donne le type (`type type` → *shell builtin*). La plupart des programmes
  externes sont dans `/bin`, `/usr/bin`.
- Une page `man` : NAME, SYNOPSIS, DESCRIPTION, parfois EXAMPLES. On quitte avec ++q++.
- Dans un SYNOPSIS, `[ ]` = facultatif, `...` = répétable.
- Sections du manuel : 1 = commandes, 2 = appels système, 3 = bibliothèques
  (`man 1 printf` ≠ `man 3 printf`).

## Jokers (expansion des chemins)

Le **shell** remplace le motif par la liste des noms **existants** qui
correspondent, triés, puis lance la commande. Si rien ne correspond, le motif est
laissé tel quel.

| Motif | Correspond à |
|-------|--------------|
| `*` | toute suite de caractères, même vide |
| `?` | **exactement un** caractère |
| `[abc]` | un caractère parmi a, b, c |
| `[a-z]`, `[0-9]` | un caractère dans l'intervalle |
| `[^abc]` (ou `[!abc]`) | un caractère **sauf** a, b, c |

!!! piege "Piège — Fichiers cachés"
    `*` et `?` ne prennent jamais un nom qui commence par `.`. Pour les cachés :
    `echo .*` ou `ls -a`.

Avec `annee1 Annee2 annee4 annee45 annee41 annee510 annee_saucisse annee_banane bonbon` :

| Commande | Résultat |
|----------|----------|
| `echo *_*` | `annee_banane annee_saucisse` |
| `echo [ab]*` | tous les `annee…` et `bonbon` (pas `Annee2`) |
| `echo [^ab]*` | `Annee2` |
| `echo c*` | `c*` (aucune correspondance : motif laissé tel quel) |
| `echo ??????` | `annee1 Annee2 annee4 bonbon` (noms de 6 caractères) |
| `ls *5` | `annee45` |
| `ls annee[^0-9]*` | `annee_banane annee_saucisse` |
| `ls *4?` | `annee41 annee45` (avant-dernier = 4) |

## Pour aller plus loin (exercices ⭐)

- **`find chemin critères`** descend **récursivement** (contrairement aux jokers) :
  `-type f|d`, `-name "*.conf"` (guillemets pour que le shell ne développe pas),
  `-mtime -1`, `-size +100c`.
- **Liens** : `ln cible lien` (physique, **même inode**, interdit sur un dossier,
  survit à la suppression de la cible) ; `ln -s cible lien` (symbolique, contient un
  chemin, **cassé** si la cible disparaît). `ls -i` montre les inodes.
- **Script** : première ligne `#!/bin/bash` (*shebang*), `chmod +x script.sh`, lancement
  avec `./script.sh` (le dossier courant n'est pas dans le `PATH`). `$1` = premier
  argument, `[ -z "$1" ]` teste s'il est vide.
