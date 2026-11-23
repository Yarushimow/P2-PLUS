---
title: "Ch. 8 — Standardisation"
---

# Chapitre 8 — Standardisation et reconnaissance du mot vide

=== "Version simplifiée"

    ## Le mot vide

    Le mot vide « arrive » dans toute entrée (c'est lui qui, suivi de $a$, donne $a$). Donc un automate reconnaît $\varepsilon$
    si et seulement si **une de ses entrées est aussi une sortie**.

    Problème : pour enlever $\varepsilon$ du langage, on ne peut pas simplement retirer la sortie de cette entrée, car des mots
    reviennent peut-être dans cet état (par exemple $aa$, $aaa$…). D'où la standardisation.

    !!! definition "Automate standard"
        Un automate est **standard** s'il a **une seule entrée** $i$ et **aucune transition qui arrive sur $i$**.

    !!! methode "Standardiser"
        1. Ajouter un nouvel état $i$, seule entrée. Les anciennes entrées ne sont plus des entrées.
        2. Pour **chaque** transition $e \xrightarrow{a} q$ partant d'une ancienne entrée $e$, ajouter $i \xrightarrow{a} q$.
        3. $i$ est **terminal** si et seulement si une ancienne entrée était terminale (c'est-à-dire si l'automate reconnaissait $\varepsilon$).

        Les anciens états et leurs transitions sont gardés tels quels.

    Dans un automate standard, rien ne revient sur $i$ : **retirer la sortie de $i$ enlève exactement $\varepsilon$** du langage,
    et **ajouter une sortie sur $i$ ajoute exactement $\varepsilon$**. C'est l'utilité principale de la standardisation.

    ## Exemple : les entiers binaires divisibles par 3

    On lit un nombre binaire de gauche à droite en retenant son **reste modulo 3**. Ajouter un 0 à droite multiplie par 2,
    ajouter un 1 multiplie par 2 et ajoute 1 : le nouveau reste est $(2r + b) \bmod 3$.

    | | reste $r$ | 0 | 1 |
    |---|---|---|---|
    | E/S | 0 | 0 | 1 |
    | | 1 | 2 | 0 |
    | | 2 | 1 | 2 |

    Exemple : $1011010_2 = 90$ passe par les restes 1, 2, 2, 2, 1, 0, 0 et finit en 0 : reconnu.
    Pour reconnaître les nombres de reste 2, il suffit de mettre la sortie sur l'état 2 ; pour « non divisibles par 3 », sur 1 et 2.

    Mais cet automate reconnaît aussi $\varepsilon$, qui n'est pas un nombre. Solution : le **standardiser** (nouvel état $i$ avec
    $i \xrightarrow{0} 0$ et $i \xrightarrow{1} 1$), puis **retirer la sortie de $i$**.

    !!! tip "Généralisation"
        Divisibilité par $n$ en base 2 : $n$ états $0, \dots, n - 1$, transition $r \xrightarrow{b} (2r + b) \bmod n$
        ([TD 1, exercice 4](../td/td-1-construction.md) avec $n = 7$).

=== "Version papier"

    Les diapos du CTD 8, puis l'exemple détaillé de la division par 3.

    <!-- papier: pdf/SM402P/ctd8.pdf | CTD 8 — Standardisation | ctd8 | diapo -->

    [![CTD 8 — Standardisation, diapo 1 : Standardisation et son](papier/ctd8/p01.jpg){ loading=lazy .papier }](papier/ctd8/p01.jpg)
    <p class="papier-legende">Standardisation et son · CTD 8 — Standardisation, diapo 1</p>

    [![CTD 8 — Standardisation, diapo 2 : Reconnaissance du mot vide](papier/ctd8/p02.jpg){ loading=lazy .papier }](papier/ctd8/p02.jpg)
    <p class="papier-legende">Reconnaissance du mot vide · CTD 8 — Standardisation, diapo 2</p>

    [![CTD 8 — Standardisation, diapo 3 : Reconnaissance du mot vide, cont.](papier/ctd8/p03.jpg){ loading=lazy .papier }](papier/ctd8/p03.jpg)
    <p class="papier-legende">Reconnaissance du mot vide, cont. · CTD 8 — Standardisation, diapo 3</p>

    [![CTD 8 — Standardisation, diapo 4 : Automates standards](papier/ctd8/p04.jpg){ loading=lazy .papier }](papier/ctd8/p04.jpg)
    <p class="papier-legende">Automates standards · CTD 8 — Standardisation, diapo 4</p>

    [![CTD 8 — Standardisation, diapo 5 : On peut transformer tout automate non standard en un automate](papier/ctd8/p05.jpg){ loading=lazy .papier }](papier/ctd8/p05.jpg)
    <p class="papier-legende">On peut transformer tout automate non standard en un automate · CTD 8 — Standardisation, diapo 5</p>

    [![CTD 8 — Standardisation, diapo 6 : Algorithme de standardisation](papier/ctd8/p06.jpg){ loading=lazy .papier }](papier/ctd8/p06.jpg)
    <p class="papier-legende">Algorithme de standardisation · CTD 8 — Standardisation, diapo 6</p>

    [![CTD 8 — Standardisation, diapo 7 : (i est terminal ssi au moins un des](papier/ctd8/p07.jpg){ loading=lazy .papier }](papier/ctd8/p07.jpg)
    <p class="papier-legende">(i est terminal ssi au moins un des · CTD 8 — Standardisation, diapo 7</p>

    [![CTD 8 — Standardisation, diapo 8 : Un autre exemple de standardisation :](papier/ctd8/p08.jpg){ loading=lazy .papier }](papier/ctd8/p08.jpg)
    <p class="papier-legende">Un autre exemple de standardisation : · CTD 8 — Standardisation, diapo 8</p>

    [![CTD 8 — Standardisation, diapo 9 : Examinons ce qui se passe si on fait certaines manipulations avec les](papier/ctd8/p09.jpg){ loading=lazy .papier }](papier/ctd8/p09.jpg)
    <p class="papier-legende">Examinons ce qui se passe si on fait certaines manipulations avec les · CTD 8 — Standardisation, diapo 9</p>

    [![CTD 8 — Standardisation, diapo 10 : Exemple :](papier/ctd8/p10.jpg){ loading=lazy .papier }](papier/ctd8/p10.jpg)
    <p class="papier-legende">Exemple : · CTD 8 — Standardisation, diapo 10</p>

    [![CTD 8 — Standardisation, diapo 11 : Solution :](papier/ctd8/p11.jpg){ loading=lazy .papier }](papier/ctd8/p11.jpg)
    <p class="papier-legende">Solution : · CTD 8 — Standardisation, diapo 11</p>

    [![CTD 8 — Standardisation, diapo 12 : N mod 3 ajout d’un 0 à la fin: 2N mod 3](papier/ctd8/p12.jpg){ loading=lazy .papier }](papier/ctd8/p12.jpg)
    <p class="papier-legende">N mod 3 ajout d’un 0 à la fin: 2N mod 3 · CTD 8 — Standardisation, diapo 12</p>

    [![CTD 8 — Standardisation, diapo 13 : Revenons à la tâche d’origine: lire un nombre binaire et dire s’il est divisible](papier/ctd8/p13.jpg){ loading=lazy .papier }](papier/ctd8/p13.jpg)
    <p class="papier-legende">Revenons à la tâche d’origine: lire un nombre binaire et dire s’il est divisible · CTD 8 — Standardisation, diapo 13</p>

    [![CTD 8 — Standardisation, diapo 14 : Donc si on considère notre graphique comme un automate fini, l’entrée](papier/ctd8/p14.jpg){ loading=lazy .papier }](papier/ctd8/p14.jpg)
    <p class="papier-legende">Donc si on considère notre graphique comme un automate fini, l’entrée · CTD 8 — Standardisation, diapo 14</p>

    [![CTD 8 — Standardisation, diapo 15 : Et voici un autre, qui reconnait tous les nombres binaires qui](papier/ctd8/p15.jpg){ loading=lazy .papier }](papier/ctd8/p15.jpg)
    <p class="papier-legende">Et voici un autre, qui reconnait tous les nombres binaires qui · CTD 8 — Standardisation, diapo 15</p>

    [![CTD 8 — Standardisation, diapo 16 : Comment éviter la reconnaissance du mot vide](papier/ctd8/p16.jpg){ loading=lazy .papier }](papier/ctd8/p16.jpg)
    <p class="papier-legende">Comment éviter la reconnaissance du mot vide · CTD 8 — Standardisation, diapo 16</p>

    [![CTD 8 — Standardisation, diapo 17 : 1. Standardiser l’automate](papier/ctd8/p17.jpg){ loading=lazy .papier }](papier/ctd8/p17.jpg)
    <p class="papier-legende">1. Standardiser l’automate · CTD 8 — Standardisation, diapo 17</p>

    [![CTD 8 — Standardisation, diapo 18 : Voici donc un automate qui reconnait toutes les écritures binaires représentant](papier/ctd8/p18.jpg){ loading=lazy .papier }](papier/ctd8/p18.jpg)
    <p class="papier-legende">Voici donc un automate qui reconnait toutes les écritures binaires représentant · CTD 8 — Standardisation, diapo 18</p>

    <!-- /papier -->

    <!-- papier: pdf/SM402P/div3.pdf | Exemple — division par 3 en base 2 | div3 | diapo -->

    [![Exemple — division par 3 en base 2, diapo 1 : Exemple :](papier/div3/p01.jpg){ loading=lazy .papier }](papier/div3/p01.jpg)
    <p class="papier-legende">Exemple : · Exemple — division par 3 en base 2, diapo 1</p>

    [![Exemple — division par 3 en base 2, diapo 2 : Solution :](papier/div3/p02.jpg){ loading=lazy .papier }](papier/div3/p02.jpg)
    <p class="papier-legende">Solution : · Exemple — division par 3 en base 2, diapo 2</p>

    [![Exemple — division par 3 en base 2, diapo 3 : N mod 3 ajout d’un 0 à la fin: 2N mod 3](papier/div3/p03.jpg){ loading=lazy .papier }](papier/div3/p03.jpg)
    <p class="papier-legende">N mod 3 ajout d’un 0 à la fin: 2N mod 3 · Exemple — division par 3 en base 2, diapo 3</p>

    [![Exemple — division par 3 en base 2, diapo 4 : Revenons à la tâche d’origine: lire un nombre binaire et dire s’il est divisible](papier/div3/p04.jpg){ loading=lazy .papier }](papier/div3/p04.jpg)
    <p class="papier-legende">Revenons à la tâche d’origine: lire un nombre binaire et dire s’il est divisible · Exemple — division par 3 en base 2, diapo 4</p>

    [![Exemple — division par 3 en base 2, diapo 5 : Donc si on considère notre graphique comme un automate fini, l’entrée](papier/div3/p05.jpg){ loading=lazy .papier }](papier/div3/p05.jpg)
    <p class="papier-legende">Donc si on considère notre graphique comme un automate fini, l’entrée · Exemple — division par 3 en base 2, diapo 5</p>

    [![Exemple — division par 3 en base 2, diapo 6 : Et voici un autre, qui reconnait tous les nombres binaires qui](papier/div3/p06.jpg){ loading=lazy .papier }](papier/div3/p06.jpg)
    <p class="papier-legende">Et voici un autre, qui reconnait tous les nombres binaires qui · Exemple — division par 3 en base 2, diapo 6</p>

    <!-- /papier -->
