---
title: "Ch. 2 — Premier principe"
---

# Chapitre 2 — Le premier principe

=== "Version simplifiée"

    ## Énergie interne

    L'**énergie interne** $U$ est l'énergie microscopique du système (agitation et
    interactions des particules). C'est une **fonction d'état** : sa variation ne
    dépend que des états initial et final, pas du chemin suivi.

    !!! theoreme "Premier principe (système fermé)"

        $$
        \Delta U + \Delta E_c + \Delta E_p = W + Q
        \qquad\text{souvent :}\qquad
        \Delta U = W + Q
        $$

        Forme infinitésimale : $dU = \delta W + \delta Q$.
        $W$ et $Q$ **dépendent du chemin** (d'où le $\delta$) ; $\Delta U$ non.

    Cas particuliers : système isolé → $\Delta U = 0$ ; cycle → $\Delta U = 0$ donc $W = -Q$.

    ## Le travail des forces de pression

    $$
    W = -\int p_{ext}\,dV
    $$

    | Transformation | Travail reçu |
    |---|---|
    | isochore | $W = 0$ |
    | isobare / monobare | $W = -p_{ext}\,(V_f - V_i)$ |
    | isotherme quasi-statique (GP) | $W = -nRT\ln\dfrac{V_f}{V_i} = nRT\ln\dfrac{p_f}{p_i}$ |
    | adiabatique quasi-statique (GP) | $W = \Delta U = \dfrac{p_fV_f - p_iV_i}{\gamma - 1}$ |

    Dans le diagramme de Clapeyron, $|W|$ = **aire sous la courbe**. Pour un cycle,
    $|W_{cycle}|$ = aire du cycle : sens **horaire** → $W < 0$ (moteur) ; sens
    **trigonométrique** → $W > 0$ (récepteur).

    Travail électrique reçu par un dipôle : $W = U\,I\,\Delta t = R\,I^2\,\Delta t$.

    ## Les transferts thermiques

    Trois modes : **conduction**, **convection**, **rayonnement**.

    !!! definition "Chaleur sensible et chaleur latente"
        - **Sensible** (la température change) : $Q = m\,c\,\Delta T = C\,\Delta T$.
        - **Latente** (changement d'état à $T$ constante) : $Q = m\,L$
          ($L$ : chaleur latente massique de fusion, vaporisation, sublimation…).

    ## Lois de Joule et enthalpie

    !!! theoreme "Lois de Joule (gaz parfait)"
        - 1ʳᵉ loi : $U$ ne dépend que de $T$ → $\Delta U = C_V\,\Delta T$.
        - **Enthalpie** $H = U + pV$ ; 2ᵉ loi : $H$ ne dépend que de $T$ → $\Delta H = C_p\,\Delta T$.
        - À pression constante : $Q_p = \Delta H$ ; à volume constant : $Q_V = \Delta U$.

    !!! theoreme "Relation de Mayer et coefficient de Laplace"

        $$
        C_p - C_V = nR \qquad \gamma = \frac{C_p}{C_V}
        \qquad
        C_V = \frac{nR}{\gamma - 1}\qquad C_p = \frac{\gamma\,nR}{\gamma - 1}
        $$

        Monoatomique : $\gamma = 5/3$, $C_{V,m} = \frac32 R$ ; diatomique (air, N₂, O₂) : $\gamma = 7/5$, $C_{V,m} = \frac52 R$.

    Phases condensées (solides, liquides) : $C_p \approx C_V = C$, et $\Delta U \approx \Delta H = C\,\Delta T$.

    ## Lois de Laplace

    !!! theoreme "Adiabatique quasi-statique (réversible) d'un gaz parfait"

        $$
        pV^\gamma = \text{cte}
        \qquad TV^{\gamma - 1} = \text{cte}
        \qquad T^\gamma p^{1-\gamma} = \text{cte}
        $$

        Dans le diagramme de Clapeyron, une adiabatique est **plus pentue** qu'une isotherme.

    !!! piege "Conditions d'application"
        Laplace exige **trois** conditions : gaz parfait, adiabatique, **quasi-statique**.
        Une détente brutale (ex. détente de Joule-Gay-Lussac) n'obéit pas à Laplace.

=== "Version papier"

    Les diapos du chapitre 2 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/SP402P/2526sp402-chapitre2-premierprincipe.pdf | Chapitre 2 — support 2025-2026 | ch2 | diapo -->

    [![Chapitre 2 — support 2025-2026, diapo 1 : SP402 - Thermodynamique](papier/ch2/p01.jpg){ loading=lazy .papier }](papier/ch2/p01.jpg)
    <p class="papier-legende">SP402 - Thermodynamique · Chapitre 2 — support 2025-2026, diapo 1</p>

    [![Chapitre 2 — support 2025-2026, diapo 2 : Plan du cours](papier/ch2/p02.jpg){ loading=lazy .papier }](papier/ch2/p02.jpg)
    <p class="papier-legende">Plan du cours · Chapitre 2 — support 2025-2026, diapo 2</p>

    [![Chapitre 2 — support 2025-2026, diapo 3 : CHAPITRE 2](papier/ch2/p03.jpg){ loading=lazy .papier }](papier/ch2/p03.jpg)
    <p class="papier-legende">CHAPITRE 2 · Chapitre 2 — support 2025-2026, diapo 3</p>

    [![Chapitre 2 — support 2025-2026, diapo 4 : James Prescott Joule](papier/ch2/p04.jpg){ loading=lazy .papier }](papier/ch2/p04.jpg)
    <p class="papier-legende">James Prescott Joule · Chapitre 2 — support 2025-2026, diapo 4</p>

    [![Chapitre 2 — support 2025-2026, diapo 5 : Révolution industrielle (1780-1850)](papier/ch2/p05.jpg){ loading=lazy .papier }](papier/ch2/p05.jpg)
    <p class="papier-legende">Révolution industrielle (1780-1850) · Chapitre 2 — support 2025-2026, diapo 5</p>

    [![Chapitre 2 — support 2025-2026, diapo 6 : Expérience décisive de Joule](papier/ch2/p06.jpg){ loading=lazy .papier }](papier/ch2/p06.jpg)
    <p class="papier-legende">Expérience décisive de Joule · Chapitre 2 — support 2025-2026, diapo 6</p>

    [![Chapitre 2 — support 2025-2026, diapo 7 : Clausius et l’énergie interne](papier/ch2/p07.jpg){ loading=lazy .papier }](papier/ch2/p07.jpg)
    <p class="papier-legende">Clausius et l’énergie interne · Chapitre 2 — support 2025-2026, diapo 7</p>

    [![Chapitre 2 — support 2025-2026, diapo 8 : 2. L’énergie](papier/ch2/p08.jpg){ loading=lazy .papier }](papier/ch2/p08.jpg)
    <p class="papier-legende">2. L’énergie · Chapitre 2 — support 2025-2026, diapo 8</p>

    [![Chapitre 2 — support 2025-2026, diapo 9 : Définition de l’énergie interne](papier/ch2/p09.jpg){ loading=lazy .papier }](papier/ch2/p09.jpg)
    <p class="papier-legende">Définition de l’énergie interne · Chapitre 2 — support 2025-2026, diapo 9</p>

    [![Chapitre 2 — support 2025-2026, diapo 10 : Propriétés de l’énergie interne](papier/ch2/p10.jpg){ loading=lazy .papier }](papier/ch2/p10.jpg)
    <p class="papier-legende">Propriétés de l’énergie interne · Chapitre 2 — support 2025-2026, diapo 10</p>

    [![Chapitre 2 — support 2025-2026, diapo 11 : Variations d’énergie interne](papier/ch2/p11.jpg){ loading=lazy .papier }](papier/ch2/p11.jpg)
    <p class="papier-legende">Variations d’énergie interne · Chapitre 2 — support 2025-2026, diapo 11</p>

    [![Chapitre 2 — support 2025-2026, diapo 12 : 3. Enoncés du](papier/ch2/p12.jpg){ loading=lazy .papier }](papier/ch2/p12.jpg)
    <p class="papier-legende">3. Enoncés du · Chapitre 2 — support 2025-2026, diapo 12</p>

    [![Chapitre 2 — support 2025-2026, diapo 13 : Enoncé du premier principe](papier/ch2/p13.jpg){ loading=lazy .papier }](papier/ch2/p13.jpg)
    <p class="papier-legende">Enoncé du premier principe · Chapitre 2 — support 2025-2026, diapo 13</p>

    [![Chapitre 2 — support 2025-2026, diapo 14 : Premier principe : cas particuliers](papier/ch2/p14.jpg){ loading=lazy .papier }](papier/ch2/p14.jpg)
    <p class="papier-legende">Premier principe : cas particuliers · Chapitre 2 — support 2025-2026, diapo 14</p>

    [![Chapitre 2 — support 2025-2026, diapo 15 : Signe des échanges d’énergie](papier/ch2/p15.jpg){ loading=lazy .papier }](papier/ch2/p15.jpg)
    <p class="papier-legende">Signe des échanges d’énergie · Chapitre 2 — support 2025-2026, diapo 15</p>

    [![Chapitre 2 — support 2025-2026, diapo 16 : Changement d’état et chemin suivi](papier/ch2/p16.jpg){ loading=lazy .papier }](papier/ch2/p16.jpg)
    <p class="papier-legende">Changement d’état et chemin suivi · Chapitre 2 — support 2025-2026, diapo 16</p>

    [![Chapitre 2 — support 2025-2026, diapo 17 : Premier principe, version infinitésimale](papier/ch2/p17.jpg){ loading=lazy .papier }](papier/ch2/p17.jpg)
    <p class="papier-legende">Premier principe, version infinitésimale · Chapitre 2 — support 2025-2026, diapo 17</p>

    [![Chapitre 2 — support 2025-2026, diapo 18 : Application du premier principe](papier/ch2/p18.jpg){ loading=lazy .papier }](papier/ch2/p18.jpg)
    <p class="papier-legende">Application du premier principe · Chapitre 2 — support 2025-2026, diapo 18</p>

    [![Chapitre 2 — support 2025-2026, diapo 19 : 4. Transferts](papier/ch2/p19.jpg){ loading=lazy .papier }](papier/ch2/p19.jpg)
    <p class="papier-legende">4. Transferts · Chapitre 2 — support 2025-2026, diapo 19</p>

    [![Chapitre 2 — support 2025-2026, diapo 20 : Une histoire de piston](papier/ch2/p20.jpg){ loading=lazy .papier }](papier/ch2/p20.jpg)
    <p class="papier-legende">Une histoire de piston · Chapitre 2 — support 2025-2026, diapo 20</p>

    [![Chapitre 2 — support 2025-2026, diapo 21 : Calcul du travail de la force de pression](papier/ch2/p21.jpg){ loading=lazy .papier }](papier/ch2/p21.jpg)
    <p class="papier-legende">Calcul du travail de la force de pression · Chapitre 2 — support 2025-2026, diapo 21</p>

    [![Chapitre 2 — support 2025-2026, diapo 22 : Cas particuliers](papier/ch2/p22.jpg){ loading=lazy .papier }](papier/ch2/p22.jpg)
    <p class="papier-legende">Cas particuliers · Chapitre 2 — support 2025-2026, diapo 22</p>

    [![Chapitre 2 — support 2025-2026, diapo 23 : Lecture graphique du travail (1/2)](papier/ch2/p23.jpg){ loading=lazy .papier }](papier/ch2/p23.jpg)
    <p class="papier-legende">Lecture graphique du travail (1/2) · Chapitre 2 — support 2025-2026, diapo 23</p>

    [![Chapitre 2 — support 2025-2026, diapo 24 : Lecture graphique du travail (2/2)](papier/ch2/p24.jpg){ loading=lazy .papier }](papier/ch2/p24.jpg)
    <p class="papier-legende">Lecture graphique du travail (2/2) · Chapitre 2 — support 2025-2026, diapo 24</p>

    [![Chapitre 2 — support 2025-2026, diapo 25 : Travail électrique](papier/ch2/p25.jpg){ loading=lazy .papier }](papier/ch2/p25.jpg)
    <p class="papier-legende">Travail électrique · Chapitre 2 — support 2025-2026, diapo 25</p>

    [![Chapitre 2 — support 2025-2026, diapo 26 : 5. Transferts](papier/ch2/p26.jpg){ loading=lazy .papier }](papier/ch2/p26.jpg)
    <p class="papier-legende">5. Transferts · Chapitre 2 — support 2025-2026, diapo 26</p>

    [![Chapitre 2 — support 2025-2026, diapo 27 : Modes de transfert thermique](papier/ch2/p27.jpg){ loading=lazy .papier }](papier/ch2/p27.jpg)
    <p class="papier-legende">Modes de transfert thermique · Chapitre 2 — support 2025-2026, diapo 27</p>

    [![Chapitre 2 — support 2025-2026, diapo 28 : Chaleurs sensible et latente](papier/ch2/p28.jpg){ loading=lazy .papier }](papier/ch2/p28.jpg)
    <p class="papier-legende">Chaleurs sensible et latente · Chapitre 2 — support 2025-2026, diapo 28</p>

    [![Chapitre 2 — support 2025-2026, diapo 29 : Capacité thermique](papier/ch2/p29.jpg){ loading=lazy .papier }](papier/ch2/p29.jpg)
    <p class="papier-legende">Capacité thermique · Chapitre 2 — support 2025-2026, diapo 29</p>

    [![Chapitre 2 — support 2025-2026, diapo 30 : Calcul de chaleur sensible](papier/ch2/p30.jpg){ loading=lazy .papier }](papier/ch2/p30.jpg)
    <p class="papier-legende">Calcul de chaleur sensible · Chapitre 2 — support 2025-2026, diapo 30</p>

    [![Chapitre 2 — support 2025-2026, diapo 31 : Calcul de chaleur latente](papier/ch2/p31.jpg){ loading=lazy .papier }](papier/ch2/p31.jpg)
    <p class="papier-legende">Calcul de chaleur latente · Chapitre 2 — support 2025-2026, diapo 31</p>

    [![Chapitre 2 — support 2025-2026, diapo 32 : Calcul de chaleurs : synthèse](papier/ch2/p32.jpg){ loading=lazy .papier }](papier/ch2/p32.jpg)
    <p class="papier-legende">Calcul de chaleurs : synthèse · Chapitre 2 — support 2025-2026, diapo 32</p>

    [![Chapitre 2 — support 2025-2026, diapo 33 : 6. Lois de Joule](papier/ch2/p33.jpg){ loading=lazy .papier }](papier/ch2/p33.jpg)
    <p class="papier-legende">6. Lois de Joule · Chapitre 2 — support 2025-2026, diapo 33</p>

    [![Chapitre 2 — support 2025-2026, diapo 34 : Expérience de Joule-Gay-Lussac : protocole](papier/ch2/p34.jpg){ loading=lazy .papier }](papier/ch2/p34.jpg)
    <p class="papier-legende">Expérience de Joule-Gay-Lussac : protocole · Chapitre 2 — support 2025-2026, diapo 34</p>

    [![Chapitre 2 — support 2025-2026, diapo 35 : Expérience de Joule-Gay-Lussac : observations et conclusions](papier/ch2/p35.jpg){ loading=lazy .papier }](papier/ch2/p35.jpg)
    <p class="papier-legende">Expérience de Joule-Gay-Lussac : observations et conclusions · Chapitre 2 — support 2025-2026, diapo 35</p>

    [![Chapitre 2 — support 2025-2026, diapo 36 : 1ère loi de Joule : conséquences (1/2)](papier/ch2/p36.jpg){ loading=lazy .papier }](papier/ch2/p36.jpg)
    <p class="papier-legende">1ère loi de Joule : conséquences (1/2) · Chapitre 2 — support 2025-2026, diapo 36</p>

    [![Chapitre 2 — support 2025-2026, diapo 37 : 1ère loi de Joule : conséquences (2/2)](papier/ch2/p37.jpg){ loading=lazy .papier }](papier/ch2/p37.jpg)
    <p class="papier-legende">1ère loi de Joule : conséquences (2/2) · Chapitre 2 — support 2025-2026, diapo 37</p>

    [![Chapitre 2 — support 2025-2026, diapo 38 : Transformation isobare : l’enthalpie](papier/ch2/p38.jpg){ loading=lazy .papier }](papier/ch2/p38.jpg)
    <p class="papier-legende">Transformation isobare : l’enthalpie · Chapitre 2 — support 2025-2026, diapo 38</p>

    [![Chapitre 2 — support 2025-2026, diapo 39 : Enoncé de la 2ème loi de Joule](papier/ch2/p39.jpg){ loading=lazy .papier }](papier/ch2/p39.jpg)
    <p class="papier-legende">Enoncé de la 2ème loi de Joule · Chapitre 2 — support 2025-2026, diapo 39</p>

    [![Chapitre 2 — support 2025-2026, diapo 40 : Capacité thermique à pression constante](papier/ch2/p40.jpg){ loading=lazy .papier }](papier/ch2/p40.jpg)
    <p class="papier-legende">Capacité thermique à pression constante · Chapitre 2 — support 2025-2026, diapo 40</p>

    [![Chapitre 2 — support 2025-2026, diapo 41 : Lois de Joule : synthèse](papier/ch2/p41.jpg){ loading=lazy .papier }](papier/ch2/p41.jpg)
    <p class="papier-legende">Lois de Joule : synthèse · Chapitre 2 — support 2025-2026, diapo 41</p>

    [![Chapitre 2 — support 2025-2026, diapo 42 : Lois de Joule : application au Gaz Parfait](papier/ch2/p42.jpg){ loading=lazy .papier }](papier/ch2/p42.jpg)
    <p class="papier-legende">Lois de Joule : application au Gaz Parfait · Chapitre 2 — support 2025-2026, diapo 42</p>

    [![Chapitre 2 — support 2025-2026, diapo 43 : Lois de Joule : application au Gaz Parfait](papier/ch2/p43.jpg){ loading=lazy .papier }](papier/ch2/p43.jpg)
    <p class="papier-legende">Lois de Joule : application au Gaz Parfait · Chapitre 2 — support 2025-2026, diapo 43</p>

    [![Chapitre 2 — support 2025-2026, diapo 44 : Le cas des phases denses](papier/ch2/p44.jpg){ loading=lazy .papier }](papier/ch2/p44.jpg)
    <p class="papier-legende">Le cas des phases denses · Chapitre 2 — support 2025-2026, diapo 44</p>

    [![Chapitre 2 — support 2025-2026, diapo 45 : 7. Lois de Laplace](papier/ch2/p45.jpg){ loading=lazy .papier }](papier/ch2/p45.jpg)
    <p class="papier-legende">7. Lois de Laplace · Chapitre 2 — support 2025-2026, diapo 45</p>

    [![Chapitre 2 — support 2025-2026, diapo 46 : Le problème initial de Laplace : la vitesse du son](papier/ch2/p46.jpg){ loading=lazy .papier }](papier/ch2/p46.jpg)
    <p class="papier-legende">Le problème initial de Laplace : la vitesse du son · Chapitre 2 — support 2025-2026, diapo 46</p>

    [![Chapitre 2 — support 2025-2026, diapo 47 : Hypothèses de travail](papier/ch2/p47.jpg){ loading=lazy .papier }](papier/ch2/p47.jpg)
    <p class="papier-legende">Hypothèses de travail · Chapitre 2 — support 2025-2026, diapo 47</p>

    [![Chapitre 2 — support 2025-2026, diapo 48 : Etablissement des lois de Laplace](papier/ch2/p48.jpg){ loading=lazy .papier }](papier/ch2/p48.jpg)
    <p class="papier-legende">Etablissement des lois de Laplace · Chapitre 2 — support 2025-2026, diapo 48</p>

    [![Chapitre 2 — support 2025-2026, diapo 49 : Lois de Laplace : interprétation graphique](papier/ch2/p49.jpg){ loading=lazy .papier }](papier/ch2/p49.jpg)
    <p class="papier-legende">Lois de Laplace : interprétation graphique · Chapitre 2 — support 2025-2026, diapo 49</p>

    [![Chapitre 2 — support 2025-2026, diapo 50 : Lois de Laplace : synthèse](papier/ch2/p50.jpg){ loading=lazy .papier }](papier/ch2/p50.jpg)
    <p class="papier-legende">Lois de Laplace : synthèse · Chapitre 2 — support 2025-2026, diapo 50</p>

    [![Chapitre 2 — support 2025-2026, diapo 51 : Questions ouvertes](papier/ch2/p51.jpg){ loading=lazy .papier }](papier/ch2/p51.jpg)
    <p class="papier-legende">Questions ouvertes · Chapitre 2 — support 2025-2026, diapo 51</p>

    [![Chapitre 2 — support 2025-2026, diapo 52 : SP402 - Chapitre 3 : le second principe](papier/ch2/p52.jpg){ loading=lazy .papier }](papier/ch2/p52.jpg)
    <p class="papier-legende">SP402 - Chapitre 3 : le second principe · Chapitre 2 — support 2025-2026, diapo 52</p>

    [![Chapitre 2 — support 2025-2026, diapo 53 : SAVOIR FAIRE DU CHAPITRE](papier/ch2/p53.jpg){ loading=lazy .papier }](papier/ch2/p53.jpg)
    <p class="papier-legende">SAVOIR FAIRE DU CHAPITRE · Chapitre 2 — support 2025-2026, diapo 53</p>

    [![Chapitre 2 — support 2025-2026, diapo 54 : Corrigé des exercices de cours (1/3)](papier/ch2/p54.jpg){ loading=lazy .papier }](papier/ch2/p54.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (1/3) · Chapitre 2 — support 2025-2026, diapo 54</p>

    [![Chapitre 2 — support 2025-2026, diapo 55 : Corrigé des exercices de cours (2/3)](papier/ch2/p55.jpg){ loading=lazy .papier }](papier/ch2/p55.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (2/3) · Chapitre 2 — support 2025-2026, diapo 55</p>

    [![Chapitre 2 — support 2025-2026, diapo 56 : Corrigé des exercices de cours (3/3)](papier/ch2/p56.jpg){ loading=lazy .papier }](papier/ch2/p56.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (3/3) · Chapitre 2 — support 2025-2026, diapo 56</p>

    <!-- /papier -->
