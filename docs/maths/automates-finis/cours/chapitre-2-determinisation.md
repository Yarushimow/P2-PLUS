---
title: "Ch. 2 — Déterminisation et complétion"
---

# Chapitre 2 — Automates déterministes, déterminisation, complétion

=== "Version simplifiée"

    ## Déterministe ou non

    !!! definition "Automate déterministe"
        Un automate est **déterministe** si :

        1. il a **une seule** entrée ;
        2. de chaque état sort **au plus une** flèche par lettre.

        Sinon il est **non déterministe** : plusieurs entrées, ou deux flèches de même étiquette qui partent du même état.
        Avoir plusieurs sorties ne gêne pas le déterminisme.

    Dans un automate non déterministe, un mot peut suivre plusieurs chemins. Il est **reconnu s'il existe au moins un chemin**
    d'une entrée vers une sortie étiqueté par ce mot.

    Le **langage** d'un automate peut être vide, fini ou infini. Un langage est **reconnaissable** s'il existe un automate fini qui le reconnaît.

    ## Déterminisation (méthode des parties)

    !!! theoreme "Tout automate est équivalent à un automate déterministe"
        Les états du déterminisé sont des **ensembles d'états** de l'automate de départ (au plus $2^n$, mais en pratique beaucoup moins).

    !!! methode "Algorithme de déterminisation"
        1. **État initial** : l'ensemble $I$ de **toutes** les entrées (par exemple $\{1, 4\}$, noté « 14 »).
        2. Pour chaque nouvel état composé $S$ et chaque lettre $a$ : la cible est l'**union** des cibles en $a$ de tous les états de $S$.
        3. Chaque ensemble jamais vu devient une nouvelle ligne de la table. On s'arrête quand plus aucun nouvel état n'apparaît.
        4. **Terminaux** : les états composés qui contiennent **au moins un** état terminal d'origine.

    Exemple : l'automate qui reconnaît les mots finissant par $abaa$ ($0 \xrightarrow{a,b} 0$, $0 \xrightarrow{a} 1 \xrightarrow{b} 2 \xrightarrow{a} 3 \xrightarrow{a} 4$, sortie 4).

    === "Automate de départ"

        | | état | a | b |
        |---|---|---|---|
        | E | 0 | 0, 1 | 0 |
        | | 1 | – | 2 |
        | | 2 | 3 | – |
        | | 3 | 4 | – |
        | S | 4 | – | – |

    === "Déterminisé"

        | | état | a | b |
        |---|---|---|---|
        | E | 0 | 01 | 0 |
        | | 01 | 01 | 02 |
        | | 02 | 013 | 0 |
        | | 013 | 014 | 02 |
        | S | 014 | 01 | 02 |

        5 états au lieu des $2^5 = 32$ possibles. Seul 014 contient la sortie 4.

    !!! piege "Noms des états composés"
        « 01 » et « 10 » désignent le **même** ensemble $\{0, 1\}$. Si les numéros dépassent 9, sépare-les (« 1.12 » ≠ « 11.2 »).

    ## Complétion

    !!! definition "Automate complet"
        Un automate **déterministe** est **complet** si de chaque état part **exactement une** flèche pour **chaque** lettre
        (aucun « – » dans la table).

    !!! methode "Compléter"
        Ajouter un **état poubelle** P (non terminal), remplacer chaque « – » par P, et ajouter la ligne P → P pour toutes les lettres.
        Le langage ne change pas. On ne complète que des automates **déterministes** (pour un non déterministe, ça ne sert à rien).

    **Conséquence** : tout langage reconnaissable est reconnu par un automate **déterministe complet** (ADC).
    Un ADC dont **tous** les états sont terminaux reconnaît $A^*$.

    ## Encore quelques définitions

    - Un état est **accessible** s'il existe un chemin depuis une entrée jusqu'à lui ; **coaccessible** s'il existe un chemin de lui vers une sortie.
    - Un automate **émondé** est à la fois accessible et coaccessible : on peut supprimer les autres états sans changer le langage.

=== "Version papier"

    Les diapos du CTD 2.

    <!-- papier: pdf/SM402P/ctd2.pdf | CTD 2 — Déterminisation, complétion | ctd2 | diapo -->

    [![CTD 2 — Déterminisation, complétion, diapo 1 : Automates déterministes et](papier/ctd2/p01.jpg){ loading=lazy .papier }](papier/ctd2/p01.jpg)
    <p class="papier-legende">Automates déterministes et · CTD 2 — Déterminisation, complétion, diapo 1</p>

    [![CTD 2 — Déterminisation, complétion, diapo 2 : Automates non-déterministes:](papier/ctd2/p02.jpg){ loading=lazy .papier }](papier/ctd2/p02.jpg)
    <p class="papier-legende">Automates non-déterministes: · CTD 2 — Déterminisation, complétion, diapo 2</p>

    [![CTD 2 — Déterminisation, complétion, diapo 3](papier/ctd2/p03.jpg){ loading=lazy .papier }](papier/ctd2/p03.jpg)
    <p class="papier-legende">CTD 2 — Déterminisation, complétion, diapo 3</p>

    [![CTD 2 — Déterminisation, complétion, diapo 4 : Définitions formelles : reconnaissance](papier/ctd2/p04.jpg){ loading=lazy .papier }](papier/ctd2/p04.jpg)
    <p class="papier-legende">Définitions formelles : reconnaissance · CTD 2 — Déterminisation, complétion, diapo 4</p>

    [![CTD 2 — Déterminisation, complétion, diapo 5 : Maintenant nous pouvons répondre aux questions posées tout à l’heure.](papier/ctd2/p05.jpg){ loading=lazy .papier }](papier/ctd2/p05.jpg)
    <p class="papier-legende">Maintenant nous pouvons répondre aux questions posées tout à l’heure. · CTD 2 — Déterminisation, complétion, diapo 5</p>

    [![CTD 2 — Déterminisation, complétion, diapo 6 : Les deux automates précédents sont des automates non déterministes.](papier/ctd2/p06.jpg){ loading=lazy .papier }](papier/ctd2/p06.jpg)
    <p class="papier-legende">Les deux automates précédents sont des automates non déterministes. · CTD 2 — Déterminisation, complétion, diapo 6</p>

    [![CTD 2 — Déterminisation, complétion, diapo 7 : Automates déterministes et non déterministes, cont.](papier/ctd2/p07.jpg){ loading=lazy .papier }](papier/ctd2/p07.jpg)
    <p class="papier-legende">Automates déterministes et non déterministes, cont. · CTD 2 — Déterminisation, complétion, diapo 7</p>

    [![CTD 2 — Déterminisation, complétion, diapo 8 : Définition :](papier/ctd2/p08.jpg){ loading=lazy .papier }](papier/ctd2/p08.jpg)
    <p class="papier-legende">Définition : · CTD 2 — Déterminisation, complétion, diapo 8</p>

    [![CTD 2 — Déterminisation, complétion, diapo 9 : Automates déterministes (AD) et non déterministes (AND).](papier/ctd2/p09.jpg){ loading=lazy .papier }](papier/ctd2/p09.jpg)
    <p class="papier-legende">Automates déterministes (AD) et non déterministes (AND). · CTD 2 — Déterminisation, complétion, diapo 9</p>

    [![CTD 2 — Déterminisation, complétion, diapo 10 : Soit nous avons un automate fini non déterministe (AND). Il peut avoir plus](papier/ctd2/p10.jpg){ loading=lazy .papier }](papier/ctd2/p10.jpg)
    <p class="papier-legende">Soit nous avons un automate fini non déterministe (AND). Il peut avoir plus · CTD 2 — Déterminisation, complétion, diapo 10</p>

    [![CTD 2 — Déterminisation, complétion, diapo 11 : Déterminisation, cont.](papier/ctd2/p11.jpg){ loading=lazy .papier }](papier/ctd2/p11.jpg)
    <p class="papier-legende">Déterminisation, cont. · CTD 2 — Déterminisation, complétion, diapo 11</p>

    [![CTD 2 — Déterminisation, complétion, diapo 12 : Déterminisation, cont.](papier/ctd2/p12.jpg){ loading=lazy .papier }](papier/ctd2/p12.jpg)
    <p class="papier-legende">Déterminisation, cont. · CTD 2 — Déterminisation, complétion, diapo 12</p>

    [![CTD 2 — Déterminisation, complétion, diapo 13](papier/ctd2/p13.jpg){ loading=lazy .papier }](papier/ctd2/p13.jpg)
    <p class="papier-legende">CTD 2 — Déterminisation, complétion, diapo 13</p>

    [![CTD 2 — Déterminisation, complétion, diapo 14 : Déterminisation, définition formelle](papier/ctd2/p14.jpg){ loading=lazy .papier }](papier/ctd2/p14.jpg)
    <p class="papier-legende">Déterminisation, définition formelle · CTD 2 — Déterminisation, complétion, diapo 14</p>

    [![CTD 2 — Déterminisation, complétion, diapo 15 : Déterminisation, explication sur un exemple](papier/ctd2/p15.jpg){ loading=lazy .papier }](papier/ctd2/p15.jpg)
    <p class="papier-legende">Déterminisation, explication sur un exemple · CTD 2 — Déterminisation, complétion, diapo 15</p>

    [![CTD 2 — Déterminisation, complétion, diapo 16 : Déterminisation, explication sur un exemple (cont.)](papier/ctd2/p16.jpg){ loading=lazy .papier }](papier/ctd2/p16.jpg)
    <p class="papier-legende">Déterminisation, explication sur un exemple (cont.) · CTD 2 — Déterminisation, complétion, diapo 16</p>

    [![CTD 2 — Déterminisation, complétion, diapo 17 : Déterminisation, explication sur un exemple (cont.)](papier/ctd2/p17.jpg){ loading=lazy .papier }](papier/ctd2/p17.jpg)
    <p class="papier-legende">Déterminisation, explication sur un exemple (cont.) · CTD 2 — Déterminisation, complétion, diapo 17</p>

    [![CTD 2 — Déterminisation, complétion, diapo 18 : Déterminisation, explication sur un exemple (cont.)](papier/ctd2/p18.jpg){ loading=lazy .papier }](papier/ctd2/p18.jpg)
    <p class="papier-legende">Déterminisation, explication sur un exemple (cont.) · CTD 2 — Déterminisation, complétion, diapo 18</p>

    [![CTD 2 — Déterminisation, complétion, diapo 19 : Voici l’automate déterminisé :](papier/ctd2/p19.jpg){ loading=lazy .papier }](papier/ctd2/p19.jpg)
    <p class="papier-legende">Voici l’automate déterminisé : · CTD 2 — Déterminisation, complétion, diapo 19</p>

    [![CTD 2 — Déterminisation, complétion, diapo 20 : Automates déterministes complets, complétion](papier/ctd2/p20.jpg){ loading=lazy .papier }](papier/ctd2/p20.jpg)
    <p class="papier-legende">Automates déterministes complets, complétion · CTD 2 — Déterminisation, complétion, diapo 20</p>

    [![CTD 2 — Déterminisation, complétion, diapo 21 : Automates déterministes complets, complétion](papier/ctd2/p21.jpg){ loading=lazy .papier }](papier/ctd2/p21.jpg)
    <p class="papier-legende">Automates déterministes complets, complétion · CTD 2 — Déterminisation, complétion, diapo 21</p>

    [![CTD 2 — Déterminisation, complétion, diapo 22 : Complétion, cont. :](papier/ctd2/p22.jpg){ loading=lazy .papier }](papier/ctd2/p22.jpg)
    <p class="papier-legende">Complétion, cont. : · CTD 2 — Déterminisation, complétion, diapo 22</p>

    [![CTD 2 — Déterminisation, complétion, diapo 23 : Si X est un langage reconnaissable sur l&#x27;alphabet A, on peut le reconnaître](papier/ctd2/p23.jpg){ loading=lazy .papier }](papier/ctd2/p23.jpg)
    <p class="papier-legende">Si X est un langage reconnaissable sur l&#x27;alphabet A, on peut le reconnaître · CTD 2 — Déterminisation, complétion, diapo 23</p>

    [![CTD 2 — Déterminisation, complétion, diapo 24 : Propriété importante d’un ADC dont tous les états sont](papier/ctd2/p24.jpg){ loading=lazy .papier }](papier/ctd2/p24.jpg)
    <p class="papier-legende">Propriété importante d’un ADC dont tous les états sont · CTD 2 — Déterminisation, complétion, diapo 24</p>

    [![CTD 2 — Déterminisation, complétion, diapo 25 : Encore quelques définitions :](papier/ctd2/p25.jpg){ loading=lazy .papier }](papier/ctd2/p25.jpg)
    <p class="papier-legende">Encore quelques définitions : · CTD 2 — Déterminisation, complétion, diapo 25</p>

    <!-- /papier -->
