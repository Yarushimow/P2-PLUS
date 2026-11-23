---
title: "Ch. 5 — Expression rationnelle → automate"
---

# Chapitre 5 — Expressions rationnelles et passage à un automate

=== "Version simplifiée"

    ## Expressions rationnelles (ER)

    Une ER décrit un langage de façon compacte (« tous les mots qui finissent par $abaa$ » s'écrit $(a + b)^*abaa$).

    !!! definition "Définition"
        - $\varnothing$ (aucun mot), $\varepsilon$ (le mot vide) et chaque lettre $a \in A$ sont des ER.
        - Si $X$ et $Y$ sont des ER, alors $X + Y$ (**union**), $XY$ (**concaténation**) et $X^*$ (**étoile**) aussi.

        $X^* = \{u_1u_2\cdots u_n \mid n \ge 0, u_i \in X\}$ : $\varepsilon$ appartient **toujours** à $X^*$.
        **Priorités** : $^*$ avant la concaténation, avant $+$. Ainsi $ab + c^* = (ab) + (c^*)$.

    !!! theoreme "Identités utiles"
        | Identité | Remarque |
        |---|---|
        | $E + F = F + E$, $(E + F) + G = E + (F + G)$ | mais $EF \ne FE$ en général |
        | $E(F + G) = EF + EG$, $(E + F)G = EG + FG$ | distributivité |
        | $E + \varnothing = E$, $E\varnothing = \varnothing E = \varnothing$, $E\varepsilon = \varepsilon E = E$ | $\varnothing$ joue le rôle de 0, $\varepsilon$ celui de 1 |
        | $E + E = E$, $(E^*)^* = E^*$ | « $2E$ » ne veut rien dire |
        | $E^* = \varepsilon + EE^* = \varepsilon + E^*E$ | on note $E^+ = EE^*$ |
        | $(EF)^* = \varepsilon + E(FE)^*F$ | |
        | $(E + F)^* = (E^*F)^*E^* = E^*(FE^*)^*$ | |

    !!! theoreme "Théorème de Kleene"
        Un langage est **reconnaissable par un automate fini** si et seulement s'il est **décrit par une expression rationnelle**.
        Ce chapitre donne le sens ER → automate, le [chapitre 7](chapitre-7-automate-vers-er.md) le sens inverse.

    ## Construction de l'automate (règles du cours)

    On découpe l'ER en **modules** (du plus extérieur au plus intérieur) et on traduit chaque opération.
    Chaque module a **une seule entrée** $i$ et **une seule sortie** $f$ (règle imposée par le cours).

    | ER | Automate |
    |---|---|
    | lettre $a$ | $i \xrightarrow{a} f$ |
    | $\varepsilon$ | $i \xrightarrow{\varepsilon} f$ |
    | $X + Y$ | nouvel $i$ avec $\varepsilon$ vers les entrées de $X$ et de $Y$ ; $\varepsilon$ des sorties de $X$ et $Y$ vers un nouveau $f$ |
    | $XY$ | la sortie de $X$ est **confondue** avec l'entrée de $Y$ |
    | $X^*$ | nouveaux $i$ et $f$ ; $i \xrightarrow{\varepsilon}$ entrée de $X$, sortie de $X \xrightarrow{\varepsilon} f$, sortie de $X \xrightarrow{\varepsilon}$ entrée de $X$ (retour), $i \xrightarrow{\varepsilon} f$ (saut) |

    Conséquences : au plus deux flèches entrent dans un état et au plus deux en sortent. La ε-transition « retour » est toujours à
    l'intérieur de la ε-transition « saut ».

    !!! methode "La chaîne complète"
        ER → automate asynchrone (règles ci-dessus) → ε-clôtures → déterminisation → complétion → minimisation.

        Exemple : $(ab + ba)^*$ donne, après déterminisation et minimisation, un automate à 3 états plus une poubelle
        ($0'$ initial et terminal, $3'$ après $a$, $6'$ après $b$, puis retour en un état terminal équivalent à $0'$).

    !!! tip "Expressions rationnelles des éditeurs"
        En informatique (grep, Python, emacs), la syntaxe diffère : `[a-c][ab]*` pour $(a + b + c)(a + b)^*$, `|` pour $+$, `.` pour « n'importe quel caractère ».

=== "Version papier"

    Les diapos du CTD 5.

    <!-- papier: pdf/SM402P/ctd5.pdf | CTD 5 — Expressions rationnelles | ctd5 | diapo -->

    [![CTD 5 — Expressions rationnelles, diapo 1 : Expressions rationnelles.](papier/ctd5/p01.jpg){ loading=lazy .papier }](papier/ctd5/p01.jpg)
    <p class="papier-legende">Expressions rationnelles. · CTD 5 — Expressions rationnelles, diapo 1</p>

    [![CTD 5 — Expressions rationnelles, diapo 2 : Nous avons dit qu’un langage est appelé](papier/ctd5/p02.jpg){ loading=lazy .papier }](papier/ctd5/p02.jpg)
    <p class="papier-legende">Nous avons dit qu’un langage est appelé · CTD 5 — Expressions rationnelles, diapo 2</p>

    [![CTD 5 — Expressions rationnelles, diapo 3 : On voudrait bien pouvoir décrire un langage par un moyen plus](papier/ctd5/p03.jpg){ loading=lazy .papier }](papier/ctd5/p03.jpg)
    <p class="papier-legende">On voudrait bien pouvoir décrire un langage par un moyen plus · CTD 5 — Expressions rationnelles, diapo 3</p>

    [![CTD 5 — Expressions rationnelles, diapo 4 : Expressions rationnelles](papier/ctd5/p04.jpg){ loading=lazy .papier }](papier/ctd5/p04.jpg)
    <p class="papier-legende">Expressions rationnelles · CTD 5 — Expressions rationnelles, diapo 4</p>

    [![CTD 5 — Expressions rationnelles, diapo 5 : Soit A un alphabet fini, non vide.](papier/ctd5/p05.jpg){ loading=lazy .papier }](papier/ctd5/p05.jpg)
    <p class="papier-legende">Soit A un alphabet fini, non vide. · CTD 5 — Expressions rationnelles, diapo 5</p>

    [![CTD 5 — Expressions rationnelles, diapo 6 : Les trois opérations:](papier/ctd5/p06.jpg){ loading=lazy .papier }](papier/ctd5/p06.jpg)
    <p class="papier-legende">Les trois opérations: · CTD 5 — Expressions rationnelles, diapo 6</p>

    [![CTD 5 — Expressions rationnelles, diapo 7](papier/ctd5/p07.jpg){ loading=lazy .papier }](papier/ctd5/p07.jpg)
    <p class="papier-legende">CTD 5 — Expressions rationnelles, diapo 7</p>

    [![CTD 5 — Expressions rationnelles, diapo 8 : Variantes de notation](papier/ctd5/p08.jpg){ loading=lazy .papier }](papier/ctd5/p08.jpg)
    <p class="papier-legende">Variantes de notation · CTD 5 — Expressions rationnelles, diapo 8</p>

    [![CTD 5 — Expressions rationnelles, diapo 9 : Quelques identités rationnelles](papier/ctd5/p09.jpg){ loading=lazy .papier }](papier/ctd5/p09.jpg)
    <p class="papier-legende">Quelques identités rationnelles · CTD 5 — Expressions rationnelles, diapo 9</p>

    [![CTD 5 — Expressions rationnelles, diapo 10 : Une loi commutative pour + : E + F = F + E](papier/ctd5/p10.jpg){ loading=lazy .papier }](papier/ctd5/p10.jpg)
    <p class="papier-legende">Une loi commutative pour + : E + F = F + E · CTD 5 — Expressions rationnelles, diapo 10</p>

    [![CTD 5 — Expressions rationnelles, diapo 11 : Quelques identités (liste très partielle !) qui relient l’étoile et les autres opérations …](papier/ctd5/p11.jpg){ loading=lazy .papier }](papier/ctd5/p11.jpg)
    <p class="papier-legende">Quelques identités (liste très partielle !) qui relient l’étoile et les autres opérations … · CTD 5 — Expressions rationnelles, diapo 11</p>

    [![CTD 5 — Expressions rationnelles, diapo 12 : Théorème de KLEENE (les années 50).](papier/ctd5/p12.jpg){ loading=lazy .papier }](papier/ctd5/p12.jpg)
    <p class="papier-legende">Théorème de KLEENE (les années 50). · CTD 5 — Expressions rationnelles, diapo 12</p>

    [![CTD 5 — Expressions rationnelles, diapo 13 : Expression rationnelle  Automate fini](papier/ctd5/p13.jpg){ loading=lazy .papier }](papier/ctd5/p13.jpg)
    <p class="papier-legende">Expression rationnelle  Automate fini · CTD 5 — Expressions rationnelles, diapo 13</p>

    [![CTD 5 — Expressions rationnelles, diapo 14 : Toute ER peut être séparé en éléments (modules) qui, à leur tour, consistent](papier/ctd5/p14.jpg){ loading=lazy .papier }](papier/ctd5/p14.jpg)
    <p class="papier-legende">Toute ER peut être séparé en éléments (modules) qui, à leur tour, consistent · CTD 5 — Expressions rationnelles, diapo 14</p>

    [![CTD 5 — Expressions rationnelles, diapo 15 : Ou bien on peut commencer la construction de l’intérieur, en formant](papier/ctd5/p15.jpg){ loading=lazy .papier }](papier/ctd5/p15.jpg)
    <p class="papier-legende">Ou bien on peut commencer la construction de l’intérieur, en formant · CTD 5 — Expressions rationnelles, diapo 15</p>

    [![CTD 5 — Expressions rationnelles, diapo 16 : Principe: on veut construire un AF modulaire dont la modularité](papier/ctd5/p16.jpg){ loading=lazy .papier }](papier/ctd5/p16.jpg)
    <p class="papier-legende">Principe: on veut construire un AF modulaire dont la modularité · CTD 5 — Expressions rationnelles, diapo 16</p>

    [![CTD 5 — Expressions rationnelles, diapo 17 : Expression rationnelle  Automate fini](papier/ctd5/p17.jpg){ loading=lazy .papier }](papier/ctd5/p17.jpg)
    <p class="papier-legende">Expression rationnelle  Automate fini · CTD 5 — Expressions rationnelles, diapo 17</p>

    [![CTD 5 — Expressions rationnelles, diapo 18 : Dans le discours suivant, on notera un module X déjà construit dont le](papier/ctd5/p18.jpg){ loading=lazy .papier }](papier/ctd5/p18.jpg)
    <p class="papier-legende">Dans le discours suivant, on notera un module X déjà construit dont le · CTD 5 — Expressions rationnelles, diapo 18</p>

    [![CTD 5 — Expressions rationnelles, diapo 19 : Expression rationnelle  Automate fini](papier/ctd5/p19.jpg){ loading=lazy .papier }](papier/ctd5/p19.jpg)
    <p class="papier-legende">Expression rationnelle  Automate fini · CTD 5 — Expressions rationnelles, diapo 19</p>

    [![CTD 5 — Expressions rationnelles, diapo 20 : 2) L’opération concaténation : XY est représentée par l’automate](papier/ctd5/p20.jpg){ loading=lazy .papier }](papier/ctd5/p20.jpg)
    <p class="papier-legende">2) L’opération concaténation : XY est représentée par l’automate · CTD 5 — Expressions rationnelles, diapo 20</p>

    [![CTD 5 — Expressions rationnelles, diapo 21 : 3) L’opération * : X* est représentée par l’automate asynchrone suivant :](papier/ctd5/p21.jpg){ loading=lazy .papier }](papier/ctd5/p21.jpg)
    <p class="papier-legende">3) L’opération * : X* est représentée par l’automate asynchrone suivant : · CTD 5 — Expressions rationnelles, diapo 21</p>

    [![CTD 5 — Expressions rationnelles, diapo 22 : La transition  inverse est toujours complètement à l’intérieur de la transition](papier/ctd5/p22.jpg){ loading=lazy .papier }](papier/ctd5/p22.jpg)
    <p class="papier-legende">La transition  inverse est toujours complètement à l’intérieur de la transition · CTD 5 — Expressions rationnelles, diapo 22</p>

    [![CTD 5 — Expressions rationnelles, diapo 23 : Un autre exemple.](papier/ctd5/p23.jpg){ loading=lazy .papier }](papier/ctd5/p23.jpg)
    <p class="papier-legende">Un autre exemple. · CTD 5 — Expressions rationnelles, diapo 23</p>

    [![CTD 5 — Expressions rationnelles, diapo 24 : Voici le détail de la déterminisation et minimisation de cet automate :](papier/ctd5/p24.jpg){ loading=lazy .papier }](papier/ctd5/p24.jpg)
    <p class="papier-legende">Voici le détail de la déterminisation et minimisation de cet automate : · CTD 5 — Expressions rationnelles, diapo 24</p>

    [![CTD 5 — Expressions rationnelles, diapo 25 : Voici le détail de la déterminisation de cet automate :](papier/ctd5/p25.jpg){ loading=lazy .papier }](papier/ctd5/p25.jpg)
    <p class="papier-legende">Voici le détail de la déterminisation de cet automate : · CTD 5 — Expressions rationnelles, diapo 25</p>

    <!-- /papier -->
