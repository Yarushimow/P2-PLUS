---
title: "Ch. 1 — Phénomènes physiques"
---

# Chapitre 1 — Lignes de transmission : phénomènes physiques

=== "Version simplifiée"

    ## 1. Superposition

    Une ligne est un **système linéaire** : on peut découper le signal du
    générateur en **composante continue** + **composante variable**, calculer la
    réponse de la ligne à chacune, puis **additionner**.

    ## 2. Réponse à une tension continue

    Aucun phénomène de propagation : la ligne se comporte comme deux fils.
    Les formules de l'électronique basses fréquences s'appliquent :

    $$
    U_0(0) = U_0(L_0) = E_{g0}\,\frac{R_t}{R_g + R_t},
    \qquad I_0 = \frac{E_{g0}}{R_g + R_t}
    $$

    ## 3. Réponse à une variation de tension

    Une variation de tension à l'entrée crée un champ $\vec E$ variable, qui crée
    un champ $\vec H$ variable : une **onde TEM** part dans l'isolant, à la vitesse

    $$
    v = \frac{c}{\sqrt{\varepsilon_r\mu_r}}
    $$

    On lui associe une **onde de tension** $U^+$ et une **onde de courant** $I^+$
    qui se déplacent du générateur vers la charge.

    !!! definition "Impédance caractéristique $R_c$"
        Pour une ligne donnée, le rapport onde de tension / onde de courant est une
        constante, qui ne dépend que de la géométrie et de l'isolant :
        $$
        R_c = \frac{U^+}{I^+} = -\frac{U^-}{I^-}
        $$
        (signe moins pour l'onde qui revient : le courant change de sens).
        Valeurs courantes : 50 Ω (coaxial RF), 75 Ω (TV), 100–120 Ω (paire torsadée).

    !!! definition "Temps de propagation"
        $$
        \tau = \frac{L_0}{v} = \frac{L_0\sqrt{\varepsilon_r\mu_r}}{c}
        $$

    !!! piege "$R_c$ n'est pas une résistance physique"
        On ne la mesure pas à l'ohmmètre : c'est un rapport d'ondes. Une ligne sans
        pertes ne dissipe rien, même si $R_c = 50\ \Omega$.

=== "Version papier"

    Les diapos du chapitre telles que projetées en cours (C. Maréchal, 2025-2026).

    <!-- papier: pdf/TE403P/2026-03-ct-lt-a-physique.pdf | Phénomènes physiques — support 2025-2026 | ch1 | diapo -->

    [![Phénomènes physiques — support 2025-2026, diapo 1 : Lignes de transmission :](papier/ch1/p01.jpg){ loading=lazy .papier }](papier/ch1/p01.jpg)
    <p class="papier-legende">Lignes de transmission : · Phénomènes physiques — support 2025-2026, diapo 1</p>

    [![Phénomènes physiques — support 2025-2026, diapo 2 : Lignes de transmission : phénomènes](papier/ch1/p02.jpg){ loading=lazy .papier }](papier/ch1/p02.jpg)
    <p class="papier-legende">Lignes de transmission : phénomènes · Phénomènes physiques — support 2025-2026, diapo 2</p>

    [![Phénomènes physiques — support 2025-2026, diapo 3 : 1. Théorème de superposition pour les](papier/ch1/p03.jpg){ loading=lazy .papier }](papier/ch1/p03.jpg)
    <p class="papier-legende">1. Théorème de superposition pour les · Phénomènes physiques — support 2025-2026, diapo 3</p>

    [![Phénomènes physiques — support 2025-2026, diapo 4 : Lignes de transmission : phénomènes](papier/ch1/p04.jpg){ loading=lazy .papier }](papier/ch1/p04.jpg)
    <p class="papier-legende">Lignes de transmission : phénomènes · Phénomènes physiques — support 2025-2026, diapo 4</p>

    [![Phénomènes physiques — support 2025-2026, diapo 5 : 2. Réponse de la ligne à une tension continue](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">2. Réponse de la ligne à une tension continue · Phénomènes physiques — support 2025-2026, diapo 5</p>

    [![Phénomènes physiques — support 2025-2026, diapo 6 : Gaine de](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">Gaine de · Phénomènes physiques — support 2025-2026, diapo 6</p>

    [![Phénomènes physiques — support 2025-2026, diapo 7 : Lignes de transmission : phénomènes](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">Lignes de transmission : phénomènes · Phénomènes physiques — support 2025-2026, diapo 7</p>

    [![Phénomènes physiques — support 2025-2026, diapo 8 : 3.a. Propagations des ondes de tension et de courant](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">3.a. Propagations des ondes de tension et de courant · Phénomènes physiques — support 2025-2026, diapo 8</p>

    [![Phénomènes physiques — support 2025-2026, diapo 9 : Vitesse de l’onde :](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">Vitesse de l’onde : · Phénomènes physiques — support 2025-2026, diapo 9</p>

    [![Phénomènes physiques — support 2025-2026, diapo 10 : U+ Onde de tension qui se déplace du générateur vers la charge](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">U+ Onde de tension qui se déplace du générateur vers la charge · Phénomènes physiques — support 2025-2026, diapo 10</p>

    [![Phénomènes physiques — support 2025-2026, diapo 11 : 3.b. Réflexion d’une onde à l’extrémité](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">3.b. Réflexion d’une onde à l’extrémité · Phénomènes physiques — support 2025-2026, diapo 11</p>

    [![Phénomènes physiques — support 2025-2026, diapo 12 : Convention de signe différente pour I+ et I](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">Convention de signe différente pour I+ et I · Phénomènes physiques — support 2025-2026, diapo 12</p>

    [![Phénomènes physiques — support 2025-2026, diapo 13 : En physique, on ne s’amuse jamais à changer les conventions de signe.](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">En physique, on ne s’amuse jamais à changer les conventions de signe. · Phénomènes physiques — support 2025-2026, diapo 13</p>

    [![Phénomènes physiques — support 2025-2026, diapo 14 : 3.c. Calcul du coefficient de réflexion en tension](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">3.c. Calcul du coefficient de réflexion en tension · Phénomènes physiques — support 2025-2026, diapo 14</p>

    [![Phénomènes physiques — support 2025-2026, diapo 15 : 3.d. Calcul du coefficient de réflexion en courant](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">3.d. Calcul du coefficient de réflexion en courant · Phénomènes physiques — support 2025-2026, diapo 15</p>

    <!-- /papier -->
