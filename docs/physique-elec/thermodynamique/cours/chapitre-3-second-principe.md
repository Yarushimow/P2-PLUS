---
title: "Ch. 3 — Second principe"
---

# Chapitre 3 — Le second principe

=== "Version simplifiée"

    Le premier principe dit que l'énergie se conserve, mais pas **dans quel sens**
    les transformations se font : un café chaud refroidit, il ne se réchauffe
    jamais tout seul. Le second principe introduit cette **flèche du temps**.

    ## Réversible ou irréversible ?

    Une transformation est **réversible** si on peut la parcourir en sens inverse
    en repassant par les mêmes états. C'est un cas idéal (quasi-statique, sans
    frottements, sans écart de température fini).

    !!! methode "Causes d'irréversibilité à reconnaître"
        Frottements, **effet Joule**, transfert thermique entre corps à des
        températures **différentes**, détente libre (dans le vide), mélange
        spontané, réaction chimique, transformation brutale.

    ## L'entropie

    !!! definition "Entropie (Clausius)"
        $S$ est une **fonction d'état extensive** (J/K). Pour une transformation réversible :

        $$
        dS = \frac{\delta Q_{rév}}{T}
        $$

        Interprétation statistique (Boltzmann) : $S = k_B\ln\Omega$ mesure le
        **désordre**, le nombre d'états microscopiques compatibles avec l'état macroscopique.

    ## Énoncé et bilan d'entropie

    !!! theoreme "Second principe"

        $$
        \Delta S = S_{éch} + S_{c}
        \qquad
        S_{éch} = \sum_i \frac{Q_i}{T_i}\ (\text{températures des sources}),
        \qquad
        S_c \ge 0
        $$

        $S_c = 0$ si et seulement si la transformation est réversible.
        Système isolé : $\Delta S = S_c \ge 0$, l'entropie ne peut qu'augmenter.

    Énoncés historiques équivalents : **Kelvin-Planck** (impossible de produire du
    travail avec une seule source de chaleur sur un cycle) et **Clausius** (la
    chaleur ne passe pas spontanément du froid vers le chaud).

    !!! methode "Faire un bilan d'entropie"
        1. Calculer $\Delta S$ du système avec une **formule de fonction d'état**
           (chemin réversible fictif entre les mêmes états).
        2. Calculer $S_{éch} = Q/T_{source}$ avec les **vraies** chaleurs échangées.
        3. En déduire $S_c = \Delta S - S_{éch}$ et vérifier $S_c \ge 0$.

    ## Variations d'entropie à connaître

    !!! theoreme "Identités thermodynamiques et formules"
        $dU = T\,dS - p\,dV$ et $dH = T\,dS + V\,dp$, d'où :

        - **Gaz parfait** :

            $$
            \Delta S = C_V\ln\frac{T_f}{T_i} + nR\ln\frac{V_f}{V_i}
            = C_p\ln\frac{T_f}{T_i} - nR\ln\frac{p_f}{p_i}
            $$

        - **Phase condensée** : $\Delta S = C\ln\dfrac{T_f}{T_i}$.
        - **Changement d'état** à $T$ fixe : $\Delta S = \dfrac{mL}{T}$.
        - **Thermostat** à $T_0$ recevant $Q$ : $\Delta S_{thermostat} = Q/T_0$.

    Une adiabatique **réversible** est **isentropique** ($\Delta S = 0$) : on
    retrouve les lois de Laplace.

    !!! example "Contact entre deux corps (capacités $C_1$, $C_2$, isolés de l'extérieur)"
        $T_f = \dfrac{C_1T_1 + C_2T_2}{C_1 + C_2}$, puis
        $S_c = \Delta S = C_1\ln\dfrac{T_f}{T_1} + C_2\ln\dfrac{T_f}{T_2} > 0$ :
        l'écart de température rend l'échange irréversible.

    ## Troisième principe

    L'entropie d'un corps pur cristallisé parfait tend vers 0 quand $T \to 0$ K.

=== "Version papier"

    Les diapos du chapitre 3 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/SP402P/2526sp402-chapitre3-secondprincipe.pdf | Chapitre 3 — support 2025-2026 | ch3 | diapo -->

    [![Chapitre 3 — support 2025-2026, diapo 1 : SP402 - Thermodynamique](papier/ch3/p01.jpg){ loading=lazy .papier }](papier/ch3/p01.jpg)
    <p class="papier-legende">SP402 - Thermodynamique · Chapitre 3 — support 2025-2026, diapo 1</p>

    [![Chapitre 3 — support 2025-2026, diapo 2 : Plan du cours](papier/ch3/p02.jpg){ loading=lazy .papier }](papier/ch3/p02.jpg)
    <p class="papier-legende">Plan du cours · Chapitre 3 — support 2025-2026, diapo 2</p>

    [![Chapitre 3 — support 2025-2026, diapo 3 : CHAPITRE 3](papier/ch3/p03.jpg){ loading=lazy .papier }](papier/ch3/p03.jpg)
    <p class="papier-legende">CHAPITRE 3 · Chapitre 3 — support 2025-2026, diapo 3</p>

    [![Chapitre 3 — support 2025-2026, diapo 4 : 1. Introduction :](papier/ch3/p04.jpg){ loading=lazy .papier }](papier/ch3/p04.jpg)
    <p class="papier-legende">1. Introduction : · Chapitre 3 — support 2025-2026, diapo 4</p>

    [![Chapitre 3 — support 2025-2026, diapo 5 : Rappel : le premier principe](papier/ch3/p05.jpg){ loading=lazy .papier }](papier/ch3/p05.jpg)
    <p class="papier-legende">Rappel : le premier principe · Chapitre 3 — support 2025-2026, diapo 5</p>

    [![Chapitre 3 — support 2025-2026, diapo 6 : La notion d’irréversibilité](papier/ch3/p06.jpg){ loading=lazy .papier }](papier/ch3/p06.jpg)
    <p class="papier-legende">La notion d’irréversibilité · Chapitre 3 — support 2025-2026, diapo 6</p>

    [![Chapitre 3 — support 2025-2026, diapo 7 : Exemples : réversible ou irréversible ?](papier/ch3/p07.jpg){ loading=lazy .papier }](papier/ch3/p07.jpg)
    <p class="papier-legende">Exemples : réversible ou irréversible ? · Chapitre 3 — support 2025-2026, diapo 7</p>

    [![Chapitre 3 — support 2025-2026, diapo 8 : 2. Le cycle de](papier/ch3/p08.jpg){ loading=lazy .papier }](papier/ch3/p08.jpg)
    <p class="papier-legende">2. Le cycle de · Chapitre 3 — support 2025-2026, diapo 8</p>

    [![Chapitre 3 — support 2025-2026, diapo 9 : Contexte historique du problème de Carnot](papier/ch3/p09.jpg){ loading=lazy .papier }](papier/ch3/p09.jpg)
    <p class="papier-legende">Contexte historique du problème de Carnot · Chapitre 3 — support 2025-2026, diapo 9</p>

    [![Chapitre 3 — support 2025-2026, diapo 10 : La machine de Carnot](papier/ch3/p10.jpg){ loading=lazy .papier }](papier/ch3/p10.jpg)
    <p class="papier-legende">La machine de Carnot · Chapitre 3 — support 2025-2026, diapo 10</p>

    [![Chapitre 3 — support 2025-2026, diapo 11 : Description du cycle de Carnot](papier/ch3/p11.jpg){ loading=lazy .papier }](papier/ch3/p11.jpg)
    <p class="papier-legende">Description du cycle de Carnot · Chapitre 3 — support 2025-2026, diapo 11</p>

    [![Chapitre 3 — support 2025-2026, diapo 12 : Résultat fondamental](papier/ch3/p12.jpg){ loading=lazy .papier }](papier/ch3/p12.jpg)
    <p class="papier-legende">Résultat fondamental · Chapitre 3 — support 2025-2026, diapo 12</p>

    [![Chapitre 3 — support 2025-2026, diapo 13 : Exercice d’application](papier/ch3/p13.jpg){ loading=lazy .papier }](papier/ch3/p13.jpg)
    <p class="papier-legende">Exercice d’application · Chapitre 3 — support 2025-2026, diapo 13</p>

    [![Chapitre 3 — support 2025-2026, diapo 14 : 3. Le concept](papier/ch3/p14.jpg){ loading=lazy .papier }](papier/ch3/p14.jpg)
    <p class="papier-legende">3. Le concept · Chapitre 3 — support 2025-2026, diapo 14</p>

    [![Chapitre 3 — support 2025-2026, diapo 15 : L’entropie de Clausius](papier/ch3/p15.jpg){ loading=lazy .papier }](papier/ch3/p15.jpg)
    <p class="papier-legende">L’entropie de Clausius · Chapitre 3 — support 2025-2026, diapo 15</p>

    [![Chapitre 3 — support 2025-2026, diapo 16 : Définition de l’entropie](papier/ch3/p16.jpg){ loading=lazy .papier }](papier/ch3/p16.jpg)
    <p class="papier-legende">Définition de l’entropie · Chapitre 3 — support 2025-2026, diapo 16</p>

    [![Chapitre 3 — support 2025-2026, diapo 17 : Interprétation physique](papier/ch3/p17.jpg){ loading=lazy .papier }](papier/ch3/p17.jpg)
    <p class="papier-legende">Interprétation physique · Chapitre 3 — support 2025-2026, diapo 17</p>

    [![Chapitre 3 — support 2025-2026, diapo 18 : Propriétés de l’entropie](papier/ch3/p18.jpg){ loading=lazy .papier }](papier/ch3/p18.jpg)
    <p class="papier-legende">Propriétés de l’entropie · Chapitre 3 — support 2025-2026, diapo 18</p>

    [![Chapitre 3 — support 2025-2026, diapo 19 : Exemple 1 : détente isotherme réversible d’un GP](papier/ch3/p19.jpg){ loading=lazy .papier }](papier/ch3/p19.jpg)
    <p class="papier-legende">Exemple 1 : détente isotherme réversible d’un GP · Chapitre 3 — support 2025-2026, diapo 19</p>

    [![Chapitre 3 — support 2025-2026, diapo 20 : Exemple 2 : mélange de deux GP](papier/ch3/p20.jpg){ loading=lazy .papier }](papier/ch3/p20.jpg)
    <p class="papier-legende">Exemple 2 : mélange de deux GP · Chapitre 3 — support 2025-2026, diapo 20</p>

    [![Chapitre 3 — support 2025-2026, diapo 21 : Exercice d’application](papier/ch3/p21.jpg){ loading=lazy .papier }](papier/ch3/p21.jpg)
    <p class="papier-legende">Exercice d’application · Chapitre 3 — support 2025-2026, diapo 21</p>

    [![Chapitre 3 — support 2025-2026, diapo 22 : 4. Énoncés du](papier/ch3/p22.jpg){ loading=lazy .papier }](papier/ch3/p22.jpg)
    <p class="papier-legende">4. Énoncés du · Chapitre 3 — support 2025-2026, diapo 22</p>

    [![Chapitre 3 — support 2025-2026, diapo 23 : Travail mécanique vs transfert thermique](papier/ch3/p23.jpg){ loading=lazy .papier }](papier/ch3/p23.jpg)
    <p class="papier-legende">Travail mécanique vs transfert thermique · Chapitre 3 — support 2025-2026, diapo 23</p>

    [![Chapitre 3 — support 2025-2026, diapo 24 : Enoncés de Kelvin-Planck et Clausius](papier/ch3/p24.jpg){ loading=lazy .papier }](papier/ch3/p24.jpg)
    <p class="papier-legende">Enoncés de Kelvin-Planck et Clausius · Chapitre 3 — support 2025-2026, diapo 24</p>

    [![Chapitre 3 — support 2025-2026, diapo 25 : Formulation moderne académique](papier/ch3/p25.jpg){ loading=lazy .papier }](papier/ch3/p25.jpg)
    <p class="papier-legende">Formulation moderne académique · Chapitre 3 — support 2025-2026, diapo 25</p>

    [![Chapitre 3 — support 2025-2026, diapo 26 : Conséquences du second principe](papier/ch3/p26.jpg){ loading=lazy .papier }](papier/ch3/p26.jpg)
    <p class="papier-legende">Conséquences du second principe · Chapitre 3 — support 2025-2026, diapo 26</p>

    [![Chapitre 3 — support 2025-2026, diapo 27 : Interprétation statistique](papier/ch3/p27.jpg){ loading=lazy .papier }](papier/ch3/p27.jpg)
    <p class="papier-legende">Interprétation statistique · Chapitre 3 — support 2025-2026, diapo 27</p>

    [![Chapitre 3 — support 2025-2026, diapo 28 : Interprétation statistique](papier/ch3/p28.jpg){ loading=lazy .papier }](papier/ch3/p28.jpg)
    <p class="papier-legende">Interprétation statistique · Chapitre 3 — support 2025-2026, diapo 28</p>

    [![Chapitre 3 — support 2025-2026, diapo 29 : Exercice d’application](papier/ch3/p29.jpg){ loading=lazy .papier }](papier/ch3/p29.jpg)
    <p class="papier-legende">Exercice d’application · Chapitre 3 — support 2025-2026, diapo 29</p>

    [![Chapitre 3 — support 2025-2026, diapo 30 : 5. Bilans](papier/ch3/p30.jpg){ loading=lazy .papier }](papier/ch3/p30.jpg)
    <p class="papier-legende">5. Bilans · Chapitre 3 — support 2025-2026, diapo 30</p>

    [![Chapitre 3 — support 2025-2026, diapo 31 : Principe du bilan d’entropie](papier/ch3/p31.jpg){ loading=lazy .papier }](papier/ch3/p31.jpg)
    <p class="papier-legende">Principe du bilan d’entropie · Chapitre 3 — support 2025-2026, diapo 31</p>

    [![Chapitre 3 — support 2025-2026, diapo 32 : Bilans d’entropie : cas particuliers](papier/ch3/p32.jpg){ loading=lazy .papier }](papier/ch3/p32.jpg)
    <p class="papier-legende">Bilans d’entropie : cas particuliers · Chapitre 3 — support 2025-2026, diapo 32</p>

    [![Chapitre 3 — support 2025-2026, diapo 33 : Exemple : contact thermique entre deux corps](papier/ch3/p33.jpg){ loading=lazy .papier }](papier/ch3/p33.jpg)
    <p class="papier-legende">Exemple : contact thermique entre deux corps · Chapitre 3 — support 2025-2026, diapo 33</p>

    [![Chapitre 3 — support 2025-2026, diapo 34 : Exemple : contact thermique entre deux corps](papier/ch3/p34.jpg){ loading=lazy .papier }](papier/ch3/p34.jpg)
    <p class="papier-legende">Exemple : contact thermique entre deux corps · Chapitre 3 — support 2025-2026, diapo 34</p>

    [![Chapitre 3 — support 2025-2026, diapo 35 : Echange d’entropie avec un thermostat](papier/ch3/p35.jpg){ loading=lazy .papier }](papier/ch3/p35.jpg)
    <p class="papier-legende">Echange d’entropie avec un thermostat · Chapitre 3 — support 2025-2026, diapo 35</p>

    [![Chapitre 3 — support 2025-2026, diapo 36 : 6. Identités](papier/ch3/p36.jpg){ loading=lazy .papier }](papier/ch3/p36.jpg)
    <p class="papier-legende">6. Identités · Chapitre 3 — support 2025-2026, diapo 36</p>

    [![Chapitre 3 — support 2025-2026, diapo 37 : 1ère identité thermodynamique](papier/ch3/p37.jpg){ loading=lazy .papier }](papier/ch3/p37.jpg)
    <p class="papier-legende">1ère identité thermodynamique · Chapitre 3 — support 2025-2026, diapo 37</p>

    [![Chapitre 3 — support 2025-2026, diapo 38 : Seconde identité thermodynamique](papier/ch3/p38.jpg){ loading=lazy .papier }](papier/ch3/p38.jpg)
    <p class="papier-legende">Seconde identité thermodynamique · Chapitre 3 — support 2025-2026, diapo 38</p>

    [![Chapitre 3 — support 2025-2026, diapo 39 : Variation d’entropie d’un gaz parfait (1/2)](papier/ch3/p39.jpg){ loading=lazy .papier }](papier/ch3/p39.jpg)
    <p class="papier-legende">Variation d’entropie d’un gaz parfait (1/2) · Chapitre 3 — support 2025-2026, diapo 39</p>

    [![Chapitre 3 — support 2025-2026, diapo 40 : Cas particuliers](papier/ch3/p40.jpg){ loading=lazy .papier }](papier/ch3/p40.jpg)
    <p class="papier-legende">Cas particuliers · Chapitre 3 — support 2025-2026, diapo 40</p>

    [![Chapitre 3 — support 2025-2026, diapo 41](papier/ch3/p41.jpg){ loading=lazy .papier }](papier/ch3/p41.jpg)
    <p class="papier-legende">Chapitre 3 — support 2025-2026, diapo 41</p>

    [![Chapitre 3 — support 2025-2026, diapo 42 : SAVOIR FAIRE DU CHAPITRE](papier/ch3/p42.jpg){ loading=lazy .papier }](papier/ch3/p42.jpg)
    <p class="papier-legende">SAVOIR FAIRE DU CHAPITRE · Chapitre 3 — support 2025-2026, diapo 42</p>

    [![Chapitre 3 — support 2025-2026, diapo 43 : Corrigé des exercices de cours (1/2)](papier/ch3/p43.jpg){ loading=lazy .papier }](papier/ch3/p43.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (1/2) · Chapitre 3 — support 2025-2026, diapo 43</p>

    [![Chapitre 3 — support 2025-2026, diapo 44 : Corrigé des exercices de cours (2/2)](papier/ch3/p44.jpg){ loading=lazy .papier }](papier/ch3/p44.jpg)
    <p class="papier-legende">Corrigé des exercices de cours (2/2) · Chapitre 3 — support 2025-2026, diapo 44</p>

    <!-- /papier -->
