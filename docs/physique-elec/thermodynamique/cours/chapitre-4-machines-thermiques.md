---
title: "Ch. 4 — Machines thermiques"
---

# Chapitre 4 — Les machines thermiques

=== "Version simplifiée"

    Une **machine thermique** fait subir des **cycles** à un fluide qui échange du
    travail $W$ et de la chaleur avec des sources.

    ## Pas de moteur monotherme

    Sur un cycle avec une seule source à $T_0$ : $\Delta U = 0 = W + Q$ et
    $\Delta S = 0 = Q/T_0 + S_c$, donc $Q = -T_0S_c \le 0$ et $W \ge 0$.
    **Une machine monotherme ne peut que recevoir du travail** (c'est l'énoncé de
    Kelvin-Planck). Un moteur a besoin d'au moins **deux sources**.

    ## Machine ditherme

    Source chaude $T_C$ (chaleur $Q_C$), source froide $T_F$ (chaleur $Q_F$), travail $W$.

    !!! theoreme "Les deux principes sur un cycle"

        $$
        W + Q_C + Q_F = 0
        \qquad\qquad
        \frac{Q_C}{T_C} + \frac{Q_F}{T_F} \le 0 \ \ (\text{inégalité de Clausius, = 0 si réversible})
        $$

    | Machine | Signes | Performance |
    |---|---|---|
    | **Moteur** | $W < 0$, $Q_C > 0$, $Q_F < 0$ | rendement $\eta = \dfrac{-W}{Q_C} \le 1 - \dfrac{T_F}{T_C}$ |
    | **Réfrigérateur / climatiseur** | $W > 0$, $Q_F > 0$, $Q_C < 0$ | efficacité $e = \dfrac{Q_F}{W} \le \dfrac{T_F}{T_C - T_F}$ |
    | **Pompe à chaleur** | $W > 0$, $Q_F > 0$, $Q_C < 0$ | efficacité $e = \dfrac{-Q_C}{W} \le \dfrac{T_C}{T_C - T_F}$ |

    La borne est atteinte par le **cycle de Carnot** (réversible). Un réfrigérateur
    ou une PAC peut avoir une efficacité **supérieure à 1** : ce n'est pas un
    rendement, il « pompe » de la chaleur au lieu de la créer.

    ## Le cycle de Carnot

    Deux **isothermes** (contact avec chaque source) et deux **adiabatiques
    réversibles**. Dans le diagramme $T$–$S$, c'est un **rectangle** :
    l'aire du rectangle est le travail net, et la chaleur échangée avec une
    source est l'aire sous l'isotherme correspondante.

    !!! methode "Étudier un cycle (Otto, Diesel, Carnot…)"
        1. **États** : compléter $(p, V, T)$ de chaque point avec $pV = nRT$,
           Laplace sur les adiabatiques et $p$, $V$ ou $T$ constant ailleurs.
        2. **Échanges** par transformation : $W$ et $Q$ (isochore : $W = 0$,
           $Q = C_V\Delta T$ ; isobare : $Q = C_p\Delta T$ ; adiabatique : $Q = 0$,
           $W = C_V\Delta T$ ; isotherme : $Q = -W = nRT\ln(V_f/V_i)$).
        3. **Vérifier** $W_{cycle} + Q_{cycle} = 0$.
        4. **Performance** : ne mettre au dénominateur que la chaleur **utile**
           (reçue de la source chaude pour un moteur, prise à la source froide
           pour un frigo).

    !!! example "Cycle d'Otto (moteur à essence)"
        Compression adiabatique, combustion isochore, détente adiabatique,
        refroidissement isochore. Avec le rapport volumétrique $\alpha = V_{max}/V_{min}$ :

        $$
        \eta = 1 - \frac{1}{\alpha^{\gamma - 1}}
        $$

        Pour $\alpha = 8$, $\gamma = 1{,}4$ : $\eta \approx 56\,\%$ (idéal ; un vrai moteur fait ~40 %).

    ## Enjeux

    Les centrales thermiques sont des machines dithermes ; les data centers
    rejettent l'essentiel de leur énergie en chaleur à basse température, que
    l'on ne sait valoriser qu'avec un faible rendement (faible écart $T_C - T_F$).

=== "Version papier"

    Les diapos du chapitre 4 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/SP402P/2526sp402-chapitre4-applications.pdf | Chapitre 4 — support 2025-2026 | ch4 | diapo -->

    [![Chapitre 4 — support 2025-2026, diapo 1 : SP402 - Thermodynamique](papier/ch4/p01.jpg){ loading=lazy .papier }](papier/ch4/p01.jpg)
    <p class="papier-legende">SP402 - Thermodynamique · Chapitre 4 — support 2025-2026, diapo 1</p>

    [![Chapitre 4 — support 2025-2026, diapo 2 : Plan du cours](papier/ch4/p02.jpg){ loading=lazy .papier }](papier/ch4/p02.jpg)
    <p class="papier-legende">Plan du cours · Chapitre 4 — support 2025-2026, diapo 2</p>

    [![Chapitre 4 — support 2025-2026, diapo 3 : CHAPITRE 4](papier/ch4/p03.jpg){ loading=lazy .papier }](papier/ch4/p03.jpg)
    <p class="papier-legende">CHAPITRE 4 · Chapitre 4 — support 2025-2026, diapo 3</p>

    [![Chapitre 4 — support 2025-2026, diapo 4 : 1. Généralités sur](papier/ch4/p04.jpg){ loading=lazy .papier }](papier/ch4/p04.jpg)
    <p class="papier-legende">1. Généralités sur · Chapitre 4 — support 2025-2026, diapo 4</p>

    [![Chapitre 4 — support 2025-2026, diapo 5 : Définition d’une machine thermique](papier/ch4/p05.jpg){ loading=lazy .papier }](papier/ch4/p05.jpg)
    <p class="papier-legende">Définition d’une machine thermique · Chapitre 4 — support 2025-2026, diapo 5</p>

    [![Chapitre 4 — support 2025-2026, diapo 6 : Catégories de machines thermiques](papier/ch4/p06.jpg){ loading=lazy .papier }](papier/ch4/p06.jpg)
    <p class="papier-legende">Catégories de machines thermiques · Chapitre 4 — support 2025-2026, diapo 6</p>

    [![Chapitre 4 — support 2025-2026, diapo 7 : Impossibilité d’une motrice monotherme](papier/ch4/p07.jpg){ loading=lazy .papier }](papier/ch4/p07.jpg)
    <p class="papier-legende">Impossibilité d’une motrice monotherme · Chapitre 4 — support 2025-2026, diapo 7</p>

    [![Chapitre 4 — support 2025-2026, diapo 8 : Les machines dithermes](papier/ch4/p08.jpg){ loading=lazy .papier }](papier/ch4/p08.jpg)
    <p class="papier-legende">Les machines dithermes · Chapitre 4 — support 2025-2026, diapo 8</p>

    [![Chapitre 4 — support 2025-2026, diapo 9 : Etude des machines thermiques : principes généraux](papier/ch4/p09.jpg){ loading=lazy .papier }](papier/ch4/p09.jpg)
    <p class="papier-legende">Etude des machines thermiques : principes généraux · Chapitre 4 — support 2025-2026, diapo 9</p>

    [![Chapitre 4 — support 2025-2026, diapo 10 : Moteur vs récepteur](papier/ch4/p10.jpg){ loading=lazy .papier }](papier/ch4/p10.jpg)
    <p class="papier-legende">Moteur vs récepteur · Chapitre 4 — support 2025-2026, diapo 10</p>

    [![Chapitre 4 — support 2025-2026, diapo 11 : Bilan entropique : inégalité de Clausius](papier/ch4/p11.jpg){ loading=lazy .papier }](papier/ch4/p11.jpg)
    <p class="papier-legende">Bilan entropique : inégalité de Clausius · Chapitre 4 — support 2025-2026, diapo 11</p>

    [![Chapitre 4 — support 2025-2026, diapo 12 : Le diagramme entropique est une représentation graphique des](papier/ch4/p12.jpg){ loading=lazy .papier }](papier/ch4/p12.jpg)
    <p class="papier-legende">Le diagramme entropique est une représentation graphique des · Chapitre 4 — support 2025-2026, diapo 12</p>

    [![Chapitre 4 — support 2025-2026, diapo 13 : 2. Performances](papier/ch4/p13.jpg){ loading=lazy .papier }](papier/ch4/p13.jpg)
    <p class="papier-legende">2. Performances · Chapitre 4 — support 2025-2026, diapo 13</p>

    [![Chapitre 4 — support 2025-2026, diapo 14 : Rendement et efficacité : définitions](papier/ch4/p14.jpg){ loading=lazy .papier }](papier/ch4/p14.jpg)
    <p class="papier-legende">Rendement et efficacité : définitions · Chapitre 4 — support 2025-2026, diapo 14</p>

    [![Chapitre 4 — support 2025-2026, diapo 15 : Rendement et efficacités des machines](papier/ch4/p15.jpg){ loading=lazy .papier }](papier/ch4/p15.jpg)
    <p class="papier-legende">Rendement et efficacités des machines · Chapitre 4 — support 2025-2026, diapo 15</p>

    [![Chapitre 4 — support 2025-2026, diapo 16 : Exercices : bilan énergétique et efficacité](papier/ch4/p16.jpg){ loading=lazy .papier }](papier/ch4/p16.jpg)
    <p class="papier-legende">Exercices : bilan énergétique et efficacité · Chapitre 4 — support 2025-2026, diapo 16</p>

    [![Chapitre 4 — support 2025-2026, diapo 17 : Rendements max (de Carnot)](papier/ch4/p17.jpg){ loading=lazy .papier }](papier/ch4/p17.jpg)
    <p class="papier-legende">Rendements max (de Carnot) · Chapitre 4 — support 2025-2026, diapo 17</p>

    [![Chapitre 4 — support 2025-2026, diapo 18 : 3. Machines](papier/ch4/p18.jpg){ loading=lazy .papier }](papier/ch4/p18.jpg)
    <p class="papier-legende">3. Machines · Chapitre 4 — support 2025-2026, diapo 18</p>

    [![Chapitre 4 — support 2025-2026, diapo 19 : Moteurs dithermes : aperçu général](papier/ch4/p19.jpg){ loading=lazy .papier }](papier/ch4/p19.jpg)
    <p class="papier-legende">Moteurs dithermes : aperçu général · Chapitre 4 — support 2025-2026, diapo 19</p>

    [![Chapitre 4 — support 2025-2026, diapo 20 : Exemple du moteur essence 4 temps](papier/ch4/p20.jpg){ loading=lazy .papier }](papier/ch4/p20.jpg)
    <p class="papier-legende">Exemple du moteur essence 4 temps · Chapitre 4 — support 2025-2026, diapo 20</p>

    [![Chapitre 4 — support 2025-2026, diapo 21 : Modèle idéal : le cycle de Carnot](papier/ch4/p21.jpg){ loading=lazy .papier }](papier/ch4/p21.jpg)
    <p class="papier-legende">Modèle idéal : le cycle de Carnot · Chapitre 4 — support 2025-2026, diapo 21</p>

    [![Chapitre 4 — support 2025-2026, diapo 22 : Cycle de Carnot : bilan d’entropie](papier/ch4/p22.jpg){ loading=lazy .papier }](papier/ch4/p22.jpg)
    <p class="papier-legende">Cycle de Carnot : bilan d’entropie · Chapitre 4 — support 2025-2026, diapo 22</p>

    [![Chapitre 4 — support 2025-2026, diapo 23 : Cycle de Carnot : calcul du rendement](papier/ch4/p23.jpg){ loading=lazy .papier }](papier/ch4/p23.jpg)
    <p class="papier-legende">Cycle de Carnot : calcul du rendement · Chapitre 4 — support 2025-2026, diapo 23</p>

    [![Chapitre 4 — support 2025-2026, diapo 24 : 4. Machines](papier/ch4/p24.jpg){ loading=lazy .papier }](papier/ch4/p24.jpg)
    <p class="papier-legende">4. Machines · Chapitre 4 — support 2025-2026, diapo 24</p>

    [![Chapitre 4 — support 2025-2026, diapo 25 : Machines réceptrices : aperçu général](papier/ch4/p25.jpg){ loading=lazy .papier }](papier/ch4/p25.jpg)
    <p class="papier-legende">Machines réceptrices : aperçu général · Chapitre 4 — support 2025-2026, diapo 25</p>

    [![Chapitre 4 — support 2025-2026, diapo 26 : Exemple : réfrigérateur](papier/ch4/p26.jpg){ loading=lazy .papier }](papier/ch4/p26.jpg)
    <p class="papier-legende">Exemple : réfrigérateur · Chapitre 4 — support 2025-2026, diapo 26</p>

    [![Chapitre 4 — support 2025-2026, diapo 27 : Exemple : la pompe à chaleur](papier/ch4/p27.jpg){ loading=lazy .papier }](papier/ch4/p27.jpg)
    <p class="papier-legende">Exemple : la pompe à chaleur · Chapitre 4 — support 2025-2026, diapo 27</p>

    [![Chapitre 4 — support 2025-2026, diapo 28 : Modèle idéal : cycle de Carnot inversé](papier/ch4/p28.jpg){ loading=lazy .papier }](papier/ch4/p28.jpg)
    <p class="papier-legende">Modèle idéal : cycle de Carnot inversé · Chapitre 4 — support 2025-2026, diapo 28</p>

    [![Chapitre 4 — support 2025-2026, diapo 29 : Performance des machines réceptrices](papier/ch4/p29.jpg){ loading=lazy .papier }](papier/ch4/p29.jpg)
    <p class="papier-legende">Performance des machines réceptrices · Chapitre 4 — support 2025-2026, diapo 29</p>

    [![Chapitre 4 — support 2025-2026, diapo 30 : Machines réceptrices : exercice](papier/ch4/p30.jpg){ loading=lazy .papier }](papier/ch4/p30.jpg)
    <p class="papier-legende">Machines réceptrices : exercice · Chapitre 4 — support 2025-2026, diapo 30</p>

    [![Chapitre 4 — support 2025-2026, diapo 31 : 4. Enjeux](papier/ch4/p31.jpg){ loading=lazy .papier }](papier/ch4/p31.jpg)
    <p class="papier-legende">4. Enjeux · Chapitre 4 — support 2025-2026, diapo 31</p>

    [![Chapitre 4 — support 2025-2026, diapo 32 : L’énergie à l’échelle mondiale](papier/ch4/p32.jpg){ loading=lazy .papier }](papier/ch4/p32.jpg)
    <p class="papier-legende">L’énergie à l’échelle mondiale · Chapitre 4 — support 2025-2026, diapo 32</p>

    [![Chapitre 4 — support 2025-2026, diapo 33 : Centrales thermiques = machine ditherme](papier/ch4/p33.jpg){ loading=lazy .papier }](papier/ch4/p33.jpg)
    <p class="papier-legende">Centrales thermiques = machine ditherme · Chapitre 4 — support 2025-2026, diapo 33</p>

    [![Chapitre 4 — support 2025-2026, diapo 34 : Le numérique est un système thermique](papier/ch4/p34.jpg){ loading=lazy .papier }](papier/ch4/p34.jpg)
    <p class="papier-legende">Le numérique est un système thermique · Chapitre 4 — support 2025-2026, diapo 34</p>

    [![Chapitre 4 — support 2025-2026, diapo 35 : Energie et climat](papier/ch4/p35.jpg){ loading=lazy .papier }](papier/ch4/p35.jpg)
    <p class="papier-legende">Energie et climat · Chapitre 4 — support 2025-2026, diapo 35</p>

    [![Chapitre 4 — support 2025-2026, diapo 36 : Annexe 1](papier/ch4/p36.jpg){ loading=lazy .papier }](papier/ch4/p36.jpg)
    <p class="papier-legende">Annexe 1 · Chapitre 4 — support 2025-2026, diapo 36</p>

    [![Chapitre 4 — support 2025-2026, diapo 37 : SAVOIR FAIRE DU CHAPITRE](papier/ch4/p37.jpg){ loading=lazy .papier }](papier/ch4/p37.jpg)
    <p class="papier-legende">SAVOIR FAIRE DU CHAPITRE · Chapitre 4 — support 2025-2026, diapo 37</p>

    [![Chapitre 4 — support 2025-2026, diapo 38 : Annexe 2](papier/ch4/p38.jpg){ loading=lazy .papier }](papier/ch4/p38.jpg)
    <p class="papier-legende">Annexe 2 · Chapitre 4 — support 2025-2026, diapo 38</p>

    [![Chapitre 4 — support 2025-2026, diapo 39 : Rappels : lois et modèles](papier/ch4/p39.jpg){ loading=lazy .papier }](papier/ch4/p39.jpg)
    <p class="papier-legende">Rappels : lois et modèles · Chapitre 4 — support 2025-2026, diapo 39</p>

    [![Chapitre 4 — support 2025-2026, diapo 40 : Rappels : transformations particulières](papier/ch4/p40.jpg){ loading=lazy .papier }](papier/ch4/p40.jpg)
    <p class="papier-legende">Rappels : transformations particulières · Chapitre 4 — support 2025-2026, diapo 40</p>

    [![Chapitre 4 — support 2025-2026, diapo 41 : Annexe 3](papier/ch4/p41.jpg){ loading=lazy .papier }](papier/ch4/p41.jpg)
    <p class="papier-legende">Annexe 3 · Chapitre 4 — support 2025-2026, diapo 41</p>

    [![Chapitre 4 — support 2025-2026, diapo 42 : Cycle de Carnot : rapports volumétriques](papier/ch4/p42.jpg){ loading=lazy .papier }](papier/ch4/p42.jpg)
    <p class="papier-legende">Cycle de Carnot : rapports volumétriques · Chapitre 4 — support 2025-2026, diapo 42</p>

    [![Chapitre 4 — support 2025-2026, diapo 43 : Cycle de Carnot : travail fourni](papier/ch4/p43.jpg){ loading=lazy .papier }](papier/ch4/p43.jpg)
    <p class="papier-legende">Cycle de Carnot : travail fourni · Chapitre 4 — support 2025-2026, diapo 43</p>

    [![Chapitre 4 — support 2025-2026, diapo 44 : Cycle de Carnot : chaleur échangée](papier/ch4/p44.jpg){ loading=lazy .papier }](papier/ch4/p44.jpg)
    <p class="papier-legende">Cycle de Carnot : chaleur échangée · Chapitre 4 — support 2025-2026, diapo 44</p>

    [![Chapitre 4 — support 2025-2026, diapo 45 : Annexe 4](papier/ch4/p45.jpg){ loading=lazy .papier }](papier/ch4/p45.jpg)
    <p class="papier-legende">Annexe 4 · Chapitre 4 — support 2025-2026, diapo 45</p>

    [![Chapitre 4 — support 2025-2026, diapo 46 : Corrigé des exercices de cours](papier/ch4/p46.jpg){ loading=lazy .papier }](papier/ch4/p46.jpg)
    <p class="papier-legende">Corrigé des exercices de cours · Chapitre 4 — support 2025-2026, diapo 46</p>

    <!-- /papier -->
