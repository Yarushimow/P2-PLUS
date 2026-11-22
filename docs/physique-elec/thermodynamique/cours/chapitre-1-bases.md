---
title: "Ch. 1 — Bases de la thermodynamique"
---

# Chapitre 1 — Les bases de la thermodynamique

=== "Version simplifiée"

    La **thermodynamique** étudie les échanges d'énergie sous forme de **chaleur**
    et de **travail**, et les transformations de la matière qui les accompagnent.
    On décrit un système à l'échelle **macroscopique** (pression, température…)
    sans suivre chaque molécule.

    ## Systèmes

    !!! definition "Système et convention de signe"
        Le **système** est la portion d'espace étudiée ; le reste est le **milieu extérieur**.
        **Convention : tout ce que le système reçoit est compté positivement**
        ($W > 0$ ou $Q > 0$ = reçu ; $< 0$ = cédé).

    | Système | Échange de matière | Échange d'énergie |
    |---|:-:|:-:|
    | **Ouvert** | oui | oui |
    | **Fermé** | non | oui |
    | **Isolé** | non | non |

    ## Variables d'état

    - **Extensives** (proportionnelles à la taille du système, s'additionnent) :
      $n$, $V$, $m$, $U$, $S$…
    - **Intensives** (ne dépendent pas de la taille) : $p$, $T$, $\rho$, volume molaire…

    !!! piege "Unités SI à imposer partout"
        $p$ en **Pa** (1 bar = $10^5$ Pa, 1 atm = 101 325 Pa), $V$ en **m³**
        (1 L = $10^{-3}$ m³), $T$ en **K** ($T(\text{K}) = T(°\text{C}) + 273{,}15$).
        Le Pa·m³ est un joule : $pV$ est homogène à une énergie.

    ## Équilibre et transformations

    Un système est en **équilibre thermodynamique** s'il est à la fois en équilibre
    **thermique** ($T$ uniforme et égale à l'extérieur si les parois le permettent),
    **mécanique** ($p$ uniforme) et **chimique**.

    | Transformation | Ce qui est constant |
    |---|---|
    | isotherme / isobare / isochore | $T$ / $p$ / $V$ du système |
    | monotherme / monobare | $T$ / $p$ de l'**extérieur** |
    | adiabatique | pas d'échange de chaleur ($Q = 0$) |
    | quasi-statique | suite d'états d'équilibre (infiniment lente) |
    | cyclique | état final = état initial |

    Le **diagramme de Clapeyron** représente une transformation dans le plan $(V, p)$.

    ## Le gaz parfait

    !!! theoreme "Équation d'état du gaz parfait"

        $$
        pV = nRT \qquad R = 8{,}314\ \text{J·mol}^{-1}\text{·K}^{-1}
        $$

        Modèle valable à basse pression (molécules ponctuelles, sans interactions).
        Aux CNTP (273 K, 1 atm), une mole occupe 22,4 L.

    Dans le diagramme de Clapeyron, les **isothermes** d'un gaz parfait sont des
    hyperboles $p = nRT/V$.

    ## Les gaz réels : Van der Waals

    $$
    \left(p + a\frac{n^2}{V^2}\right)(V - nb) = nRT
    $$

    - $a\,n^2/V^2$ : **pression interne** due aux attractions entre molécules ;
    - $nb$ : **covolume**, volume propre des molécules.

    On compare $\varepsilon_1 = \dfrac{a(n/V)^2}{p}$ et $\varepsilon_0 = \dfrac{nb}{V}$ à 1 :
    s'ils sont petits, le gaz parfait suffit.

    ## Coefficients thermoélastiques

    $$
    \alpha = \frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_p \ \ (\text{K}^{-1},\ \text{dilatation isobare})
    \qquad
    \chi_T = -\frac{1}{V}\left(\frac{\partial V}{\partial p}\right)_T \ \ (\text{Pa}^{-1},\ \text{compressibilité isotherme})
    $$

    Pour une petite variation : $\dfrac{\Delta V}{V} \approx \alpha\,\Delta T$. Pour un gaz parfait, $\alpha = 1/T$ et $\chi_T = 1/p$.

=== "Version papier"

    Les diapos du chapitre 1 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/SP402P/2526sp402-chapitre1-basesthermo.pdf | Chapitre 1 — support 2025-2026 | ch1 | diapo -->

    [![Chapitre 1 — support 2025-2026, diapo 1 : SP402 - Thermodynamique](papier/ch1/p01.jpg){ loading=lazy .papier }](papier/ch1/p01.jpg)
    <p class="papier-legende">SP402 - Thermodynamique · Chapitre 1 — support 2025-2026, diapo 1</p>

    [![Chapitre 1 — support 2025-2026, diapo 2 : Plan du cours](papier/ch1/p02.jpg){ loading=lazy .papier }](papier/ch1/p02.jpg)
    <p class="papier-legende">Plan du cours · Chapitre 1 — support 2025-2026, diapo 2</p>

    [![Chapitre 1 — support 2025-2026, diapo 3 : Plan du cours](papier/ch1/p03.jpg){ loading=lazy .papier }](papier/ch1/p03.jpg)
    <p class="papier-legende">Plan du cours · Chapitre 1 — support 2025-2026, diapo 3</p>

    [![Chapitre 1 — support 2025-2026, diapo 4 : CHAPITRE 1](papier/ch1/p04.jpg){ loading=lazy .papier }](papier/ch1/p04.jpg)
    <p class="papier-legende">CHAPITRE 1 · Chapitre 1 — support 2025-2026, diapo 4</p>

    [![Chapitre 1 — support 2025-2026, diapo 5 : Introduction et](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">Introduction et · Chapitre 1 — support 2025-2026, diapo 5</p>

    [![Chapitre 1 — support 2025-2026, diapo 6 : Qu’est-ce que la thermodynamique ?](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">Qu’est-ce que la thermodynamique ? · Chapitre 1 — support 2025-2026, diapo 6</p>

    [![Chapitre 1 — support 2025-2026, diapo 7 : Objectifs et portée](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">Objectifs et portée · Chapitre 1 — support 2025-2026, diapo 7</p>

    [![Chapitre 1 — support 2025-2026, diapo 8 : Pourquoi ce cours ?](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">Pourquoi ce cours ? · Chapitre 1 — support 2025-2026, diapo 8</p>

    [![Chapitre 1 — support 2025-2026, diapo 9 : Rapide historique (1/2)](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">Rapide historique (1/2) · Chapitre 1 — support 2025-2026, diapo 9</p>

    [![Chapitre 1 — support 2025-2026, diapo 10 : Rapide historique (2/2)](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">Rapide historique (2/2) · Chapitre 1 — support 2025-2026, diapo 10</p>

    [![Chapitre 1 — support 2025-2026, diapo 11 : Applications modernes](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">Applications modernes · Chapitre 1 — support 2025-2026, diapo 11</p>

    [![Chapitre 1 — support 2025-2026, diapo 12 : 1.2. Systèmes](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">1.2. Systèmes · Chapitre 1 — support 2025-2026, diapo 12</p>

    [![Chapitre 1 — support 2025-2026, diapo 13 : Echelles d’observations](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">Echelles d’observations · Chapitre 1 — support 2025-2026, diapo 13</p>

    [![Chapitre 1 — support 2025-2026, diapo 14 : Système thermodynamique : définition](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">Système thermodynamique : définition · Chapitre 1 — support 2025-2026, diapo 14</p>

    [![Chapitre 1 — support 2025-2026, diapo 15 : Système thermodynamique : signe des échanges](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">Système thermodynamique : signe des échanges · Chapitre 1 — support 2025-2026, diapo 15</p>

    [![Chapitre 1 — support 2025-2026, diapo 16 : Catégories de systèmes thermodynamiques](papier/ch1/p16.jpg){ loading=lazy .papier }](papier/ch1/p16.jpg)
    <p class="papier-legende">Catégories de systèmes thermodynamiques · Chapitre 1 — support 2025-2026, diapo 16</p>

    [![Chapitre 1 — support 2025-2026, diapo 17 : Systèmes thermodynamiques : synthèse](papier/ch1/p17.jpg){ loading=lazy .papier }](papier/ch1/p17.jpg)
    <p class="papier-legende">Systèmes thermodynamiques : synthèse · Chapitre 1 — support 2025-2026, diapo 17</p>

    [![Chapitre 1 — support 2025-2026, diapo 18 : 1.3. Variables d’états](papier/ch1/p18.jpg){ loading=lazy .papier }](papier/ch1/p18.jpg)
    <p class="papier-legende">1.3. Variables d’états · Chapitre 1 — support 2025-2026, diapo 18</p>

    [![Chapitre 1 — support 2025-2026, diapo 19 : Etat thermodynamique et variables d’états](papier/ch1/p19.jpg){ loading=lazy .papier }](papier/ch1/p19.jpg)
    <p class="papier-legende">Etat thermodynamique et variables d’états · Chapitre 1 — support 2025-2026, diapo 19</p>

    [![Chapitre 1 — support 2025-2026, diapo 20 : Grandeurs extensives et intensives](papier/ch1/p20.jpg){ loading=lazy .papier }](papier/ch1/p20.jpg)
    <p class="papier-legende">Grandeurs extensives et intensives · Chapitre 1 — support 2025-2026, diapo 20</p>

    [![Chapitre 1 — support 2025-2026, diapo 21 : La quantité de matière](papier/ch1/p21.jpg){ loading=lazy .papier }](papier/ch1/p21.jpg)
    <p class="papier-legende">La quantité de matière · Chapitre 1 — support 2025-2026, diapo 21</p>

    [![Chapitre 1 — support 2025-2026, diapo 22 : Le volume](papier/ch1/p22.jpg){ loading=lazy .papier }](papier/ch1/p22.jpg)
    <p class="papier-legende">Le volume · Chapitre 1 — support 2025-2026, diapo 22</p>

    [![Chapitre 1 — support 2025-2026, diapo 23 : La température](papier/ch1/p23.jpg){ loading=lazy .papier }](papier/ch1/p23.jpg)
    <p class="papier-legende">La température · Chapitre 1 — support 2025-2026, diapo 23</p>

    [![Chapitre 1 — support 2025-2026, diapo 24 : La pression](papier/ch1/p24.jpg){ loading=lazy .papier }](papier/ch1/p24.jpg)
    <p class="papier-legende">La pression · Chapitre 1 — support 2025-2026, diapo 24</p>

    [![Chapitre 1 — support 2025-2026, diapo 25 : Variables d’états : à retenir](papier/ch1/p25.jpg){ loading=lazy .papier }](papier/ch1/p25.jpg)
    <p class="papier-legende">Variables d’états : à retenir · Chapitre 1 — support 2025-2026, diapo 25</p>

    [![Chapitre 1 — support 2025-2026, diapo 26 : 1.4. Equilibre](papier/ch1/p26.jpg){ loading=lazy .papier }](papier/ch1/p26.jpg)
    <p class="papier-legende">1.4. Equilibre · Chapitre 1 — support 2025-2026, diapo 26</p>

    [![Chapitre 1 — support 2025-2026, diapo 27 : Equilibre thermodynamique](papier/ch1/p27.jpg){ loading=lazy .papier }](papier/ch1/p27.jpg)
    <p class="papier-legende">Equilibre thermodynamique · Chapitre 1 — support 2025-2026, diapo 27</p>

    [![Chapitre 1 — support 2025-2026, diapo 28 : Equilibre thermique](papier/ch1/p28.jpg){ loading=lazy .papier }](papier/ch1/p28.jpg)
    <p class="papier-legende">Equilibre thermique · Chapitre 1 — support 2025-2026, diapo 28</p>

    [![Chapitre 1 — support 2025-2026, diapo 29 : Equilibre mécanique](papier/ch1/p29.jpg){ loading=lazy .papier }](papier/ch1/p29.jpg)
    <p class="papier-legende">Equilibre mécanique · Chapitre 1 — support 2025-2026, diapo 29</p>

    [![Chapitre 1 — support 2025-2026, diapo 30 : Equilibre chimique](papier/ch1/p30.jpg){ loading=lazy .papier }](papier/ch1/p30.jpg)
    <p class="papier-legende">Equilibre chimique · Chapitre 1 — support 2025-2026, diapo 30</p>

    [![Chapitre 1 — support 2025-2026, diapo 31 : Equilibre thermodynamique : synthèse](papier/ch1/p31.jpg){ loading=lazy .papier }](papier/ch1/p31.jpg)
    <p class="papier-legende">Equilibre thermodynamique : synthèse · Chapitre 1 — support 2025-2026, diapo 31</p>

    [![Chapitre 1 — support 2025-2026, diapo 32 : 1.5. Transformations](papier/ch1/p32.jpg){ loading=lazy .papier }](papier/ch1/p32.jpg)
    <p class="papier-legende">1.5. Transformations · Chapitre 1 — support 2025-2026, diapo 32</p>

    [![Chapitre 1 — support 2025-2026, diapo 33 : Transformations thermodynamiques](papier/ch1/p33.jpg){ loading=lazy .papier }](papier/ch1/p33.jpg)
    <p class="papier-legende">Transformations thermodynamiques · Chapitre 1 — support 2025-2026, diapo 33</p>

    [![Chapitre 1 — support 2025-2026, diapo 34 : Transformations « iso- »](papier/ch1/p34.jpg){ loading=lazy .papier }](papier/ch1/p34.jpg)
    <p class="papier-legende">Transformations « iso- » · Chapitre 1 — support 2025-2026, diapo 34</p>

    [![Chapitre 1 — support 2025-2026, diapo 35 : Transformations « mono- »](papier/ch1/p35.jpg){ loading=lazy .papier }](papier/ch1/p35.jpg)
    <p class="papier-legende">Transformations « mono- » · Chapitre 1 — support 2025-2026, diapo 35</p>

    [![Chapitre 1 — support 2025-2026, diapo 36 : Transformations « quasi-statique»](papier/ch1/p36.jpg){ loading=lazy .papier }](papier/ch1/p36.jpg)
    <p class="papier-legende">Transformations « quasi-statique» · Chapitre 1 — support 2025-2026, diapo 36</p>

    [![Chapitre 1 — support 2025-2026, diapo 37 : Transformations thermodynamiques : synthèse](papier/ch1/p37.jpg){ loading=lazy .papier }](papier/ch1/p37.jpg)
    <p class="papier-legende">Transformations thermodynamiques : synthèse · Chapitre 1 — support 2025-2026, diapo 37</p>

    [![Chapitre 1 — support 2025-2026, diapo 38 : Diagramme de Clapeyron](papier/ch1/p38.jpg){ loading=lazy .papier }](papier/ch1/p38.jpg)
    <p class="papier-legende">Diagramme de Clapeyron · Chapitre 1 — support 2025-2026, diapo 38</p>

    [![Chapitre 1 — support 2025-2026, diapo 39 : Transformation cyclique : exercice](papier/ch1/p39.jpg){ loading=lazy .papier }](papier/ch1/p39.jpg)
    <p class="papier-legende">Transformation cyclique : exercice · Chapitre 1 — support 2025-2026, diapo 39</p>

    [![Chapitre 1 — support 2025-2026, diapo 40 : 1.6. Le gaz parfait](papier/ch1/p40.jpg){ loading=lazy .papier }](papier/ch1/p40.jpg)
    <p class="papier-legende">1.6. Le gaz parfait · Chapitre 1 — support 2025-2026, diapo 40</p>

    [![Chapitre 1 — support 2025-2026, diapo 41 : Phases de la matière (rappels)](papier/ch1/p41.jpg){ loading=lazy .papier }](papier/ch1/p41.jpg)
    <p class="papier-legende">Phases de la matière (rappels) · Chapitre 1 — support 2025-2026, diapo 41</p>

    [![Chapitre 1 — support 2025-2026, diapo 42 : Définition : CNTP](papier/ch1/p42.jpg){ loading=lazy .papier }](papier/ch1/p42.jpg)
    <p class="papier-legende">Définition : CNTP · Chapitre 1 — support 2025-2026, diapo 42</p>

    [![Chapitre 1 — support 2025-2026, diapo 43 : Le concept de gaz parfait](papier/ch1/p43.jpg){ loading=lazy .papier }](papier/ch1/p43.jpg)
    <p class="papier-legende">Le concept de gaz parfait · Chapitre 1 — support 2025-2026, diapo 43</p>

    [![Chapitre 1 — support 2025-2026, diapo 44 : L’équation des gaz parfaits](papier/ch1/p44.jpg){ loading=lazy .papier }](papier/ch1/p44.jpg)
    <p class="papier-legende">L’équation des gaz parfaits · Chapitre 1 — support 2025-2026, diapo 44</p>

    [![Chapitre 1 — support 2025-2026, diapo 45 : Conséquences et applications](papier/ch1/p45.jpg){ loading=lazy .papier }](papier/ch1/p45.jpg)
    <p class="papier-legende">Conséquences et applications · Chapitre 1 — support 2025-2026, diapo 45</p>

    [![Chapitre 1 — support 2025-2026, diapo 46 : Diagramme de Clapeyron pour un GP](papier/ch1/p46.jpg){ loading=lazy .papier }](papier/ch1/p46.jpg)
    <p class="papier-legende">Diagramme de Clapeyron pour un GP · Chapitre 1 — support 2025-2026, diapo 46</p>

    [![Chapitre 1 — support 2025-2026, diapo 47 : 1.7. Les gaz réels](papier/ch1/p47.jpg){ loading=lazy .papier }](papier/ch1/p47.jpg)
    <p class="papier-legende">1.7. Les gaz réels · Chapitre 1 — support 2025-2026, diapo 47</p>

    [![Chapitre 1 — support 2025-2026, diapo 48 : Gaz de Van der Waals](papier/ch1/p48.jpg){ loading=lazy .papier }](papier/ch1/p48.jpg)
    <p class="papier-legende">Gaz de Van der Waals · Chapitre 1 — support 2025-2026, diapo 48</p>

    [![Chapitre 1 — support 2025-2026, diapo 49 : Equation d’état des gaz réels](papier/ch1/p49.jpg){ loading=lazy .papier }](papier/ch1/p49.jpg)
    <p class="papier-legende">Equation d’état des gaz réels · Chapitre 1 — support 2025-2026, diapo 49</p>

    [![Chapitre 1 — support 2025-2026, diapo 50 : SP402 - Chapter 1 : foundations of thermodynamics](papier/ch1/p50.jpg){ loading=lazy .papier }](papier/ch1/p50.jpg)
    <p class="papier-legende">SP402 - Chapter 1 : foundations of thermodynamics · Chapitre 1 — support 2025-2026, diapo 50</p>

    [![Chapitre 1 — support 2025-2026, diapo 51 : SAVOIR FAIRE DU CHAPITRE](papier/ch1/p51.jpg){ loading=lazy .papier }](papier/ch1/p51.jpg)
    <p class="papier-legende">SAVOIR FAIRE DU CHAPITRE · Chapitre 1 — support 2025-2026, diapo 51</p>

    [![Chapitre 1 — support 2025-2026, diapo 52 : Corrigé des exercices de cours (1/3)](papier/ch1/p52.jpg){ loading=lazy .papier }](papier/ch1/p52.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (1/3) · Chapitre 1 — support 2025-2026, diapo 52</p>

    [![Chapitre 1 — support 2025-2026, diapo 53 : Corrigé des exercices de cours (2/3)](papier/ch1/p53.jpg){ loading=lazy .papier }](papier/ch1/p53.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (2/3) · Chapitre 1 — support 2025-2026, diapo 53</p>

    [![Chapitre 1 — support 2025-2026, diapo 54 : Corrigé des exercices de cours (3/3)](papier/ch1/p54.jpg){ loading=lazy .papier }](papier/ch1/p54.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (3/3) · Chapitre 1 — support 2025-2026, diapo 54</p>

    <!-- /papier -->
