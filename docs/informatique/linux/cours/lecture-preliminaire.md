---
title: "Lecture préliminaire — UNIX, GNU/Linux, shell"
---

# Lecture préliminaire — origines et philosophie de GNU/Linux

Le module apprend la ligne de commande sur **Debian** : le shell, les scripts et
l'automatisation. Cette lecture pose le vocabulaire et l'histoire, qui tombent
en QCM (cf. [Q6 du CC1](../td/annale-cc1-2023.md#q6-systemes-a-base-dunix)).

!!! abstract "À retenir"
    - Un **OS** gère le matériel et offre aux programmes des services communs.
    - **UNIX** : Ken Thompson, Bell Labs, 1969. **Linux** : Linus Torvalds, 1991.
    - **GNU/Linux** = noyau Linux + outils du projet GNU (Stallman, 1983).
    - Linux, Android, macOS, FreeBSD sont de la famille UNIX. **Windows non.**
    - Le **shell** est l'interface texte ; on utilise **Bash**.

## Système d'exploitation

!!! definition "Définition — Système d'exploitation"
    Couche logicielle qui gère les ressources de la machine (processeur, mémoire,
    disques, périphériques, réseau) et offre aux applications une interface
    uniforme vers le matériel, tout en les empêchant d'interférer entre elles.

## UNIX, Linux, GNU/Linux

- **UNIX** est créé en 1969 par Ken Thompson aux Bell Labs (AT&T), puis enrichi à
  Berkeley (UCB) dans les années 1970-80. Ses descendants forment la famille des
  systèmes « de type Unix », réputés stables, sûrs et flexibles.
- **Linux** est lancé en 1991 par Linus Torvalds (Linus + UNIX), comme alternative
  libre à MINIX, dont la licence interdisait de modifier et redistribuer le noyau.
- **GNU/Linux** : le noyau seul ne suffit pas. Les utilitaires de base viennent du
  projet **GNU** de Richard Stallman (1983), sous licence **GPL**.
- **Libre ≠ gratuit** : libre veut dire qu'on peut utiliser, étudier, modifier et
  redistribuer le logiciel.

!!! definition "Définition — Distribution"
    Assemblage d'un noyau, d'utilitaires et d'applications prêt à installer. Les plus
    connues : Ubuntu, Fedora, **Debian** (celle du cours). Debian est construite
    autour du noyau Linux.

## Chronologie

| Année | Événement |
|:-----:|-----------|
| 1969 | Première version d'UNIX (Ken Thompson, Bell Labs) |
| 1973 | UNIX réécrit en **C** → portable |
| 1983 | Richard Stallman lance le projet **GNU** |
| 1985 | Création de la Free Software Foundation |
| 1987 | MINIX (Andrew Tanenbaum), système éducatif |
| 1991 | Linus Torvalds lance **Linux** |
| 1992 | Linux passe sous licence GPL |
| 1993 | Fondation du projet **Debian** |

## La famille UNIX aujourd'hui

| Système | Lien avec UNIX |
|---------|----------------|
| GNU/Linux | Noyau Linux + outils GNU ; domine les serveurs (100 % du TOP500 depuis 2017) |
| Android | Noyau Linux + pile logicielle Google |
| macOS / iOS | Certifiés UNIX, basés sur Darwin (noyau XNU : Mach + couche BSD) |
| FreeBSD | Descendant direct de BSD (consoles PlayStation, équipements réseau) |
| **Windows** | **Pas** un système de type UNIX |

## Le shell

!!! definition "Définition — Shell"
    Programme qui fournit l'interface **textuelle** (CLI) d'un système de type Unix :
    il lit les commandes tapées dans un terminal et les exécute. Par opposition aux
    interfaces graphiques (GUI).

Le cours utilise **Bash** (*Bourne Again SHell*), le shell du projet GNU :
compatible avec `sh`, il reprend des idées de `ksh` et `csh` et vise la norme POSIX.
