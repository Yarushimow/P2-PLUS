# Notes de cours

Le module se fait en cours-TP : une page par TP, avec les notions, les commandes
et les pièges. Source : le site du cours de M. Guifo,
[yvanguifo.github.io/introduction-linux-fr](https://yvanguifo.github.io/introduction-linux-fr/).

| Page | Contenu |
|------|---------|
| [Lecture préliminaire](lecture-preliminaire.md) | OS, UNIX, GNU/Linux, distributions, chronologie, shell |
| [TP1 — Premières commandes](tp1-premieres-commandes.md) | Anatomie d'une commande, raccourcis, chemins, `mkdir` / `mv` / `cp` / `rm`, `type` / `man` / `help`, jokers |
| [TP2 — Fichiers et permissions](tp2-fichiers-permissions.md) | FHS, `/etc/passwd`, `ls -l`, `chmod`, droits sur les dossiers, `PATH`, `umask`, SUID / SGID / sticky |
| [TP3 — Environnement et compilation C](tp3-environnement-compilation.md) | Variables, `\` `'` `"`, accolades, `$(…)`, `gcc`, descripteurs, `read` / `write` / `dup2` |
| [TP4 — Redirections, processus, signaux](tp4-redirections-processus-signaux.md) | `>` `>>` `2>` `<`, tubes, `ps` / `jobs` / `fg` / `bg`, `kill`, `signal` / `fork` / `exec` |
| [TP4+ — Filtres de texte](tp4-filtres-texte.md) | `head`, `tail`, `grep`, `cut`, `sort`, `uniq`, `tr`, `sed`, `awk` |

!!! tip "Ce qui est évalué"
    Le QCM du DE porte sur les exercices du tronc commun de chaque TP (marqués
    « item type DE » dans les énoncés) et, depuis 2026-2027, sur les exercices de
    programmation système ⭐ des TP3 et TP4.
