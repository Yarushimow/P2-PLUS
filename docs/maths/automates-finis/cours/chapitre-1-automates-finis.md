---
title: "Ch. 1 — Automates finis"
---

# Chapitre 1 — Machine de Turing et automates finis

=== "Version simplifiée"

    ## D'où ça vient : la machine de Turing

    En 1936, Alan Turing décrit une machine idéale : un **ruban infini** découpé en cases, une **tête de lecture/écriture**
    et un **nombre fini d'états**. Selon l'état courant et le symbole lu, la machine écrit un symbole, se déplace d'une case
    (ou pas) et change d'état. La **thèse de Church-Turing** affirme que tout calcul algorithmique peut être fait par une telle machine.

    Un **automate fini** est une version bien plus simple : il **lit** un mot de gauche à droite sans rien écrire, et répond
    seulement « reconnu » ou « non reconnu ». Sa mémoire est bornée (un nombre fini d'états), quelle que soit la longueur du mot.
    On en trouve partout : recherche de motifs dans un texte, compilateurs, protocoles de communication, contrôle de processus.

    | | Machine de Turing | Automate fini |
    |---|---|---|
    | Entrée | texte sur le ruban | un mot |
    | Mémoire | ruban infini, modifiable | aucun ruban, seulement l'état courant |
    | Sortie | texte sur le ruban | reconnu / non reconnu |

    ## Vocabulaire

    !!! definition "Alphabet, mot, langage"
        - Un **alphabet** $A$ est un ensemble fini de **lettres** (caractères).
        - Un **mot** est une suite finie de lettres ; sa **longueur** $|w|$ est son nombre de lettres. Exemple : $abacda$ est de longueur 6.
        - Le **mot vide** $\varepsilon$ est l'unique mot de longueur 0 : $\varepsilon w = w\varepsilon = w$.
          **Attention** : $\varepsilon$ est un mot, pas une lettre de l'alphabet.
        - $A^*$ est l'ensemble de **tous** les mots sur $A$, mot vide compris (il est infini).
        - Un **langage** est un ensemble de mots. Le **langage d'un automate** est l'ensemble des mots qu'il reconnaît.

    ## Définition d'un automate fini

    !!! definition "Automate fini"
        Un automate fini sur l'alphabet $A$ est un quadruplet $(Q, I, T, E)$ :

        - $Q$ : l'ensemble **fini** des états ;
        - $I \subseteq Q$ : les états **initiaux** (entrées) ;
        - $T \subseteq Q$ : les états **terminaux** (sorties) ;
        - $E \subseteq Q \times A \times Q$ : les **transitions** (flèches) $(p, a, q)$, aussi notées $p \xrightarrow{a} q$.

        Une boucle $(p, a, p)$ est une transition comme une autre. Un état peut être initial et terminal à la fois.

    Un mot est **reconnu** s'il existe un chemin étiqueté par ce mot qui va d'un état initial à un état terminal.

    ## Trois représentations du même automate

    1. **Graphe** : un cercle par état, une flèche entrante pour les entrées, une flèche sortante (ou un double cercle) pour les sorties.
    2. **Table de transitions** : une ligne par état, une colonne par lettre ; E et S marquent les entrées et les sorties, « – » une transition absente.
    3. **Quadruplet** $(Q, I, T, E)$ écrit en ensembles.

    Exemple : deux états $S_1$ (entrée) et $S_2$ (sortie), $S_1 \xrightarrow{1} S_2$ et $S_2 \xrightarrow{0} S_1$. Il reconnaît $1$, $101$, $10101$… :

    | | état | 0 | 1 |
    |---|---|---|---|
    | E | $S_1$ | – | $S_2$ |
    | S | $S_2$ | $S_1$ | – |

    !!! tip "Pour le projet et les exercices"
        La **table de transitions** est la représentation à privilégier : c'est elle qu'on manipule dans tous les algorithmes
        (déterminisation, minimisation…) et c'est elle qu'on stocke dans un programme.

    Dans ce cours, on n'étudie que les automates **accepteurs** (réponse oui/non). Il existe d'autres familles : automates qui classent
    les mots, transducteurs qui produisent une sortie, automates pondérés.

=== "Version papier"

    Les diapos du CTD 1, puis la mini-présentation qui l'accompagne.

    <!-- papier: pdf/SM402P/ctd1.pdf | CTD 1 — Machine de Turing, automates finis | ctd1 | diapo -->

    [![CTD 1 — Machine de Turing, automates finis, diapo 1 : Machine de Turing](papier/ctd1/p01.jpg){ loading=lazy .papier }](papier/ctd1/p01.jpg)
    <p class="papier-legende">Machine de Turing · CTD 1 — Machine de Turing, automates finis, diapo 1</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 2 : L’informatique est une discipline assez récente. Il est difficile de](papier/ctd1/p02.jpg){ loading=lazy .papier }](papier/ctd1/p02.jpg)
    <p class="papier-legende">L’informatique est une discipline assez récente. Il est difficile de · CTD 1 — Machine de Turing, automates finis, diapo 2</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 3 : mathématicien, cryptologue et informaticien](papier/ctd1/p03.jpg){ loading=lazy .papier }](papier/ctd1/p03.jpg)
    <p class="papier-legende">mathématicien, cryptologue et informaticien · CTD 1 — Machine de Turing, automates finis, diapo 3</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 4 : Durant la Seconde Guerre mondiale, il joue un rôle majeur dans les](papier/ctd1/p04.jpg){ loading=lazy .papier }](papier/ctd1/p04.jpg)
    <p class="papier-legende">Durant la Seconde Guerre mondiale, il joue un rôle majeur dans les · CTD 1 — Machine de Turing, automates finis, diapo 4</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 5 : À l&#x27;origine, le concept de machine de Turing, inventé avant l&#x27;ordinateur,](papier/ctd1/p05.jpg){ loading=lazy .papier }](papier/ctd1/p05.jpg)
    <p class="papier-legende">À l&#x27;origine, le concept de machine de Turing, inventé avant l&#x27;ordinateur, · CTD 1 — Machine de Turing, automates finis, diapo 5</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 6 : L’affirmation que tout problème de calcul](papier/ctd1/p06.jpg){ loading=lazy .papier }](papier/ctd1/p06.jpg)
    <p class="papier-legende">L’affirmation que tout problème de calcul · CTD 1 — Machine de Turing, automates finis, diapo 6</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 7 : État courant de la machine:](papier/ctd1/p07.jpg){ loading=lazy .papier }](papier/ctd1/p07.jpg)
    <p class="papier-legende">État courant de la machine: · CTD 1 — Machine de Turing, automates finis, diapo 7</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 8 : État courant de la machine:](papier/ctd1/p08.jpg){ loading=lazy .papier }](papier/ctd1/p08.jpg)
    <p class="papier-legende">État courant de la machine: · CTD 1 — Machine de Turing, automates finis, diapo 8</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 9 : État courant de la machine:](papier/ctd1/p09.jpg){ loading=lazy .papier }](papier/ctd1/p09.jpg)
    <p class="papier-legende">État courant de la machine: · CTD 1 — Machine de Turing, automates finis, diapo 9</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 10 : Automates finis: le](papier/ctd1/p10.jpg){ loading=lazy .papier }](papier/ctd1/p10.jpg)
    <p class="papier-legende">Automates finis: le · CTD 1 — Machine de Turing, automates finis, diapo 10</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 11 : Automates finis fournissent un outil de construction](papier/ctd1/p11.jpg){ loading=lazy .papier }](papier/ctd1/p11.jpg)
    <p class="papier-legende">Automates finis fournissent un outil de construction · CTD 1 — Machine de Turing, automates finis, diapo 11</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 12 : Un automate est constitué d&#x27;états et de transitions.](papier/ctd1/p12.jpg){ loading=lazy .papier }](papier/ctd1/p12.jpg)
    <p class="papier-legende">Un automate est constitué d&#x27;états et de transitions. · CTD 1 — Machine de Turing, automates finis, diapo 12</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 13 : Représentation graphique d’un automate fini](papier/ctd1/p13.jpg){ loading=lazy .papier }](papier/ctd1/p13.jpg)
    <p class="papier-legende">Représentation graphique d’un automate fini · CTD 1 — Machine de Turing, automates finis, diapo 13</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 14 : Représentation d’un automate fini](papier/ctd1/p14.jpg){ loading=lazy .papier }](papier/ctd1/p14.jpg)
    <p class="papier-legende">Représentation d’un automate fini · CTD 1 — Machine de Turing, automates finis, diapo 14</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 15 : Représentation d’un automate fini](papier/ctd1/p15.jpg){ loading=lazy .papier }](papier/ctd1/p15.jpg)
    <p class="papier-legende">Représentation d’un automate fini · CTD 1 — Machine de Turing, automates finis, diapo 15</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 16 : Quelques définitions](papier/ctd1/p16.jpg){ loading=lazy .papier }](papier/ctd1/p16.jpg)
    <p class="papier-legende">Quelques définitions · CTD 1 — Machine de Turing, automates finis, diapo 16</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 17 : Quelques définitions, cont.](papier/ctd1/p17.jpg){ loading=lazy .papier }](papier/ctd1/p17.jpg)
    <p class="papier-legende">Quelques définitions, cont. · CTD 1 — Machine de Turing, automates finis, diapo 17</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 18 : L’automate qu’on vient d’étudier est dit « fini » car il](papier/ctd1/p18.jpg){ loading=lazy .papier }](papier/ctd1/p18.jpg)
    <p class="papier-legende">L’automate qu’on vient d’étudier est dit « fini » car il · CTD 1 — Machine de Turing, automates finis, diapo 18</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 19 : Il existe plusieurs types d&#x27;automates finis.](papier/ctd1/p19.jpg){ loading=lazy .papier }](papier/ctd1/p19.jpg)
    <p class="papier-legende">Il existe plusieurs types d&#x27;automates finis. · CTD 1 — Machine de Turing, automates finis, diapo 19</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 20 : Maintenant on a des outils pour donner une définition formelle](papier/ctd1/p20.jpg){ loading=lazy .papier }](papier/ctd1/p20.jpg)
    <p class="papier-legende">Maintenant on a des outils pour donner une définition formelle · CTD 1 — Machine de Turing, automates finis, diapo 20</p>

    [![CTD 1 — Machine de Turing, automates finis, diapo 21 : Comparaison avec la machine de Turing :](papier/ctd1/p21.jpg){ loading=lazy .papier }](papier/ctd1/p21.jpg)
    <p class="papier-legende">Comparaison avec la machine de Turing : · CTD 1 — Machine de Turing, automates finis, diapo 21</p>

    <!-- /papier -->

    <!-- papier: pdf/SM402P/mini.pdf | Mini-présentation du CTD 1 | mini | diapo -->

    [![Mini-présentation du CTD 1, diapo 1 : Miniprésentation TD 1](papier/mini/p01.jpg){ loading=lazy .papier }](papier/mini/p01.jpg)
    <p class="papier-legende">Miniprésentation TD 1 · Mini-présentation du CTD 1, diapo 1</p>

    [![Mini-présentation du CTD 1, diapo 2 : Un automate est constitué d&#x27;états et de transitions.](papier/mini/p02.jpg){ loading=lazy .papier }](papier/mini/p02.jpg)
    <p class="papier-legende">Un automate est constitué d&#x27;états et de transitions. · Mini-présentation du CTD 1, diapo 2</p>

    [![Mini-présentation du CTD 1, diapo 3 : Représentation graphique d’un automate fini](papier/mini/p03.jpg){ loading=lazy .papier }](papier/mini/p03.jpg)
    <p class="papier-legende">Représentation graphique d’un automate fini · Mini-présentation du CTD 1, diapo 3</p>

    [![Mini-présentation du CTD 1, diapo 4 : Représentation d’un automate fini](papier/mini/p04.jpg){ loading=lazy .papier }](papier/mini/p04.jpg)
    <p class="papier-legende">Représentation d’un automate fini · Mini-présentation du CTD 1, diapo 4</p>

    [![Mini-présentation du CTD 1, diapo 5 : Quelques définitions](papier/mini/p05.jpg){ loading=lazy .papier }](papier/mini/p05.jpg)
    <p class="papier-legende">Quelques définitions · Mini-présentation du CTD 1, diapo 5</p>

    [![Mini-présentation du CTD 1, diapo 6 : Quelques définitions, cont.](papier/mini/p06.jpg){ loading=lazy .papier }](papier/mini/p06.jpg)
    <p class="papier-legende">Quelques définitions, cont. · Mini-présentation du CTD 1, diapo 6</p>

    [![Mini-présentation du CTD 1, diapo 7 : Maintenant on a des outils pour donner une définition formelle](papier/mini/p07.jpg){ loading=lazy .papier }](papier/mini/p07.jpg)
    <p class="papier-legende">Maintenant on a des outils pour donner une définition formelle · Mini-présentation du CTD 1, diapo 7</p>

    <!-- /papier -->
