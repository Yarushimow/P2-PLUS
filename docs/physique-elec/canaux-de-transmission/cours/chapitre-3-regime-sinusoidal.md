---
title: "Ch. 3 — Régime sinusoïdal"
---

# Chapitre 3 — Lignes en régime sinusoïdal

=== "Version simplifiée"

    Avec un générateur sinusoïdal, on ne peut plus suivre un front d'onde : tout
    est sinusoïdal à la même fréquence, on passe en **notation complexe**
    ($R$, $jL\omega$, $\frac{1}{jC\omega}$).

    ## 1. Modèle d'un tronçon $d\ell$

    | Constante primaire | Effet physique |
    |---|---|
    | $R$ (Ω/m) | pertes Joule et rayonnement |
    | $L$ (H/m) | auto-induction des conducteurs |
    | $G$ (S/m) | fuite de courant dans l'isolant |
    | $C$ (F/m) | effet capacitif entre conducteurs |

    ## 2. Équations des télégraphistes

    $$
    \frac{\partial U}{\partial \ell} = (R + jL\omega)\,I,
    \qquad
    \frac{\partial I}{\partial \ell} = (G + jC\omega)\,U
    \quad\Rightarrow\quad
    \frac{\partial^2 U}{\partial \ell^2} = \gamma^2\,U
    $$

    (abscisse $\ell$ comptée **depuis la charge** vers le générateur.)

    !!! theoreme "Constantes secondaires"

        $$
        \gamma = \sqrt{(R + jL\omega)(G + jC\omega)} = \alpha + j\beta,
        \qquad
        Z_c = \sqrt{\frac{R + jL\omega}{G + jC\omega}}
        $$

        - $\alpha$ : **affaiblissement** (Np/m ; 1 Np = 8,686 dB)
        - $\beta = \dfrac{2\pi}{\lambda}$ : **constante de phase** (rad/m)

    ## 3. Solution : onde incidente + onde réfléchie

    $$
    U(\ell) = \underbrace{K_1 e^{+\gamma\ell}}_{\text{incidente}} + \underbrace{K_2 e^{-\gamma\ell}}_{\text{réfléchie}},
    \qquad
    I(\ell) = \frac{K_1 e^{+\gamma\ell} - K_2 e^{-\gamma\ell}}{Z_c}
    $$

    !!! definition "Coefficient de réflexion et impédance ramenée"

        $$
        \Gamma(\ell) = \frac{U^-(\ell)}{U^+(\ell)} = \Gamma_t\,e^{-2\gamma\ell},
        \qquad
        \Gamma_t = \frac{Z_t - Z_c}{Z_t + Z_c}
        $$

        $$
        Z(\ell) = \frac{U(\ell)}{I(\ell)} = Z_c\,\frac{1 + \Gamma(\ell)}{1 - \Gamma(\ell)}
        $$

    ## 4. Ligne sans pertes ($R = G = 0$)

    !!! theoreme "Cas sans pertes"

        $$
        \alpha = 0,\quad \beta = \omega\sqrt{LC},\quad R_c = \sqrt{\frac{L}{C}},\quad v = \frac{1}{\sqrt{LC}}
        $$

        $$
        Z(\ell) = R_c\,\frac{Z_t + jR_c\tan\beta\ell}{R_c + jZ_t\tan\beta\ell}
        $$

        - $|\Gamma|$ est **constant** le long de la ligne ; $\Gamma$ et $|U|$ sont
          périodiques de période $\lambda/2$.
        - **TOS** (taux d'ondes stationnaires) : $\rho = \dfrac{|U|_{max}}{|U|_{min}} = \dfrac{1 + |\Gamma|}{1 - |\Gamma|}$.
        - Aux maxima de tension, $Z = R_c\,\rho$ (réelle) ; aux minima, $Z = R_c/\rho$.

    !!! methode "Cas particuliers à connaître"
        - **Charge adaptée** $Z_t = R_c$ : $\Gamma = 0$, $\rho = 1$, $Z(\ell) = R_c$ partout.
        - **Court-circuit** : $\Gamma_t = -1$, $Z(\ell) = jR_c\tan\beta\ell$.
        - **Circuit ouvert** : $\Gamma_t = +1$, $Z(\ell) = -jR_c\cot\beta\ell$.
        - **Quart d'onde** ($\ell = \lambda/4$) : $Z(\lambda/4) = R_c^2 / Z_t$.
        - **Demi-onde** ($\ell = \lambda/2$) : $Z(\lambda/2) = Z_t$.

=== "Version papier"

    Les diapos du chapitre telles que projetées en cours (C. Maréchal, 2025-2026).

    <!-- papier: pdf/TE403P/2026-03-ct-lt-c-sinusoidal.pdf | Régime sinusoïdal — support 2025-2026 | ch3 | diapo -->

    [![Régime sinusoïdal — support 2025-2026, diapo 1 : Chapitre 2:](papier/ch3/p01.jpg){ loading=lazy .papier }](papier/ch3/p01.jpg)
    <p class="papier-legende">Chapitre 2: · Régime sinusoïdal — support 2025-2026, diapo 1</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 2 : Fronts d’onde sur la ligne](papier/ch3/p02.jpg){ loading=lazy .papier }](papier/ch3/p02.jpg)
    <p class="papier-legende">Fronts d’onde sur la ligne · Régime sinusoïdal — support 2025-2026, diapo 2</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 3 : Impédance linéaire](papier/ch3/p03.jpg){ loading=lazy .papier }](papier/ch3/p03.jpg)
    <p class="papier-legende">Impédance linéaire · Régime sinusoïdal — support 2025-2026, diapo 3</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 4 : Coefficient de réflexion](papier/ch3/p04.jpg){ loading=lazy .papier }](papier/ch3/p04.jpg)
    <p class="papier-legende">Coefficient de réflexion · Régime sinusoïdal — support 2025-2026, diapo 4</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 5 : Le régime est sinusoïdal, et le système est linéaire,](papier/ch3/p05.jpg){ loading=lazy .papier }](papier/ch3/p05.jpg)
    <p class="papier-legende">Le régime est sinusoïdal, et le système est linéaire, · Régime sinusoïdal — support 2025-2026, diapo 5</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 6 : Lignes de transmission en régime sinusoïdal](papier/ch3/p06.jpg){ loading=lazy .papier }](papier/ch3/p06.jpg)
    <p class="papier-legende">Lignes de transmission en régime sinusoïdal · Régime sinusoïdal — support 2025-2026, diapo 6</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 7 : 1. Modélisation d’une ligne](papier/ch3/p07.jpg){ loading=lazy .papier }](papier/ch3/p07.jpg)
    <p class="papier-legende">1. Modélisation d’une ligne · Régime sinusoïdal — support 2025-2026, diapo 7</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 8 : En tout point de la ligne.](papier/ch3/p08.jpg){ loading=lazy .papier }](papier/ch3/p08.jpg)
    <p class="papier-legende">En tout point de la ligne. · Régime sinusoïdal — support 2025-2026, diapo 8</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 9 : On arrive au schéma](papier/ch3/p09.jpg){ loading=lazy .papier }](papier/ch3/p09.jpg)
    <p class="papier-legende">On arrive au schéma · Régime sinusoïdal — support 2025-2026, diapo 9</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 10 : Lignes de transmission en régime sinusoïdal](papier/ch3/p10.jpg){ loading=lazy .papier }](papier/ch3/p10.jpg)
    <p class="papier-legende">Lignes de transmission en régime sinusoïdal · Régime sinusoïdal — support 2025-2026, diapo 10</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 11 : 2. Equation des télégraphistes](papier/ch3/p11.jpg){ loading=lazy .papier }](papier/ch3/p11.jpg)
    <p class="papier-legende">2. Equation des télégraphistes · Régime sinusoïdal — support 2025-2026, diapo 11</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 12](papier/ch3/p12.jpg){ loading=lazy .papier }](papier/ch3/p12.jpg)
    <p class="papier-legende">Régime sinusoïdal — support 2025-2026, diapo 12</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 13](papier/ch3/p13.jpg){ loading=lazy .papier }](papier/ch3/p13.jpg)
    <p class="papier-legende">Régime sinusoïdal — support 2025-2026, diapo 13</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 14 : Pour résumer, les équations des télégraphistes sont :](papier/ch3/p14.jpg){ loading=lazy .papier }](papier/ch3/p14.jpg)
    <p class="papier-legende">Pour résumer, les équations des télégraphistes sont : · Régime sinusoïdal — support 2025-2026, diapo 14</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 15 : Lignes de transmission en régime sinusoïdal](papier/ch3/p15.jpg){ loading=lazy .papier }](papier/ch3/p15.jpg)
    <p class="papier-legende">Lignes de transmission en régime sinusoïdal · Régime sinusoïdal — support 2025-2026, diapo 15</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 16 : 3.Résolution de l’équation des](papier/ch3/p16.jpg){ loading=lazy .papier }](papier/ch3/p16.jpg)
    <p class="papier-legende">3.Résolution de l’équation des · Régime sinusoïdal — support 2025-2026, diapo 16</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 17 : La solution de l’équation est de la forme :](papier/ch3/p17.jpg){ loading=lazy .papier }](papier/ch3/p17.jpg)
    <p class="papier-legende">La solution de l’équation est de la forme : · Régime sinusoïdal — support 2025-2026, diapo 17</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 18 : On sait que](papier/ch3/p18.jpg){ loading=lazy .papier }](papier/ch3/p18.jpg)
    <p class="papier-legende">On sait que · Régime sinusoïdal — support 2025-2026, diapo 18</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 19 : On notera](papier/ch3/p19.jpg){ loading=lazy .papier }](papier/ch3/p19.jpg)
    <p class="papier-legende">On notera · Régime sinusoïdal — support 2025-2026, diapo 19</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 20 : Unités ?](papier/ch3/p20.jpg){ loading=lazy .papier }](papier/ch3/p20.jpg)
    <p class="papier-legende">Unités ? · Régime sinusoïdal — support 2025-2026, diapo 20</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 21 : Lignes de transmission en régime sinusoïdal](papier/ch3/p21.jpg){ loading=lazy .papier }](papier/ch3/p21.jpg)
    <p class="papier-legende">Lignes de transmission en régime sinusoïdal · Régime sinusoïdal — support 2025-2026, diapo 21</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 22 : 4. Interprétation physique des](papier/ch3/p22.jpg){ loading=lazy .papier }](papier/ch3/p22.jpg)
    <p class="papier-legende">4. Interprétation physique des · Régime sinusoïdal — support 2025-2026, diapo 22</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 23 : L’onde se déplace donc dans le sens croissant de ℓ](papier/ch3/p23.jpg){ loading=lazy .papier }](papier/ch3/p23.jpg)
    <p class="papier-legende">L’onde se déplace donc dans le sens croissant de ℓ · Régime sinusoïdal — support 2025-2026, diapo 23</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 24 : Il vient](papier/ch3/p24.jpg){ loading=lazy .papier }](papier/ch3/p24.jpg)
    <p class="papier-legende">Il vient · Régime sinusoïdal — support 2025-2026, diapo 24</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 25 : PREMIER RÉSUMÉ](papier/ch3/p25.jpg){ loading=lazy .papier }](papier/ch3/p25.jpg)
    <p class="papier-legende">PREMIER RÉSUMÉ · Régime sinusoïdal — support 2025-2026, diapo 25</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 26 : Vers le générateur](papier/ch3/p26.jpg){ loading=lazy .papier }](papier/ch3/p26.jpg)
    <p class="papier-legende">Vers le générateur · Régime sinusoïdal — support 2025-2026, diapo 26</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 27 : Vers le générateur](papier/ch3/p27.jpg){ loading=lazy .papier }](papier/ch3/p27.jpg)
    <p class="papier-legende">Vers le générateur · Régime sinusoïdal — support 2025-2026, diapo 27</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 28 : L’amplitude de chaque onde (u+, u-, i+, i-) est divisée par e](papier/ch3/p28.jpg){ loading=lazy .papier }](papier/ch3/p28.jpg)
    <p class="papier-legende">L’amplitude de chaque onde (u+, u-, i+, i-) est divisée par e · Régime sinusoïdal — support 2025-2026, diapo 28</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 29 : Vers le générateur](papier/ch3/p29.jpg){ loading=lazy .papier }](papier/ch3/p29.jpg)
    <p class="papier-legende">Vers le générateur · Régime sinusoïdal — support 2025-2026, diapo 29</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 30 : Définition des différentes vitesses](papier/ch3/p30.jpg){ loading=lazy .papier }](papier/ch3/p30.jpg)
    <p class="papier-legende">Définition des différentes vitesses · Régime sinusoïdal — support 2025-2026, diapo 30</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 31 : d) Diagramme de dispersion :](papier/ch3/p31.jpg){ loading=lazy .papier }](papier/ch3/p31.jpg)
    <p class="papier-legende">d) Diagramme de dispersion : · Régime sinusoïdal — support 2025-2026, diapo 31</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 32 : Longueur d’onde  :](papier/ch3/p32.jpg){ loading=lazy .papier }](papier/ch3/p32.jpg)
    <p class="papier-legende">Longueur d’onde  : · Régime sinusoïdal — support 2025-2026, diapo 32</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 33 : Coefficient de réflexion en tension en un point de la ligne](papier/ch3/p33.jpg){ loading=lazy .papier }](papier/ch3/p33.jpg)
    <p class="papier-legende">Coefficient de réflexion en tension en un point de la ligne · Régime sinusoïdal — support 2025-2026, diapo 33</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 34 : Coefficient de réflexion en courant en un point de la ligne](papier/ch3/p34.jpg){ loading=lazy .papier }](papier/ch3/p34.jpg)
    <p class="papier-legende">Coefficient de réflexion en courant en un point de la ligne · Régime sinusoïdal — support 2025-2026, diapo 34</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 35 : Lignes de transmission en régime sinusoïdal](papier/ch3/p35.jpg){ loading=lazy .papier }](papier/ch3/p35.jpg)
    <p class="papier-legende">Lignes de transmission en régime sinusoïdal · Régime sinusoïdal — support 2025-2026, diapo 35</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 36 : 5. Cas des lignes sans pertes](papier/ch3/p36.jpg){ loading=lazy .papier }](papier/ch3/p36.jpg)
    <p class="papier-legende">5. Cas des lignes sans pertes · Régime sinusoïdal — support 2025-2026, diapo 36</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 37 : Cas des lignes sans perte, chargées](papier/ch3/p37.jpg){ loading=lazy .papier }](papier/ch3/p37.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 37</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 38 : Cas des lignes sans perte, chargées](papier/ch3/p38.jpg){ loading=lazy .papier }](papier/ch3/p38.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 38</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 39 : Cas des lignes sans perte, chargées](papier/ch3/p39.jpg){ loading=lazy .papier }](papier/ch3/p39.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 39</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 40 : Cas des lignes sans perte, chargées](papier/ch3/p40.jpg){ loading=lazy .papier }](papier/ch3/p40.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 40</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 41 : Cas des lignes sans perte, chargées](papier/ch3/p41.jpg){ loading=lazy .papier }](papier/ch3/p41.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 41</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 42 : Cas des lignes sans perte, chargées](papier/ch3/p42.jpg){ loading=lazy .papier }](papier/ch3/p42.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 42</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 43 : Cas des lignes sans perte, chargées](papier/ch3/p43.jpg){ loading=lazy .papier }](papier/ch3/p43.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 43</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 44 : Après calcul, on obtient :](papier/ch3/p44.jpg){ loading=lazy .papier }](papier/ch3/p44.jpg)
    <p class="papier-legende">Après calcul, on obtient : · Régime sinusoïdal — support 2025-2026, diapo 44</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 45 : Electronique HF / Electronique BF](papier/ch3/p45.jpg){ loading=lazy .papier }](papier/ch3/p45.jpg)
    <p class="papier-legende">Electronique HF / Electronique BF · Régime sinusoïdal — support 2025-2026, diapo 45</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 46 : Cas des lignes sans perte, chargées](papier/ch3/p46.jpg){ loading=lazy .papier }](papier/ch3/p46.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 46</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 47 : Cas des lignes sans perte, chargées](papier/ch3/p47.jpg){ loading=lazy .papier }](papier/ch3/p47.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 47</p>

    [![Régime sinusoïdal — support 2025-2026, diapo 48 : Cas des lignes sans perte, chargées](papier/ch3/p48.jpg){ loading=lazy .papier }](papier/ch3/p48.jpg)
    <p class="papier-legende">Cas des lignes sans perte, chargées · Régime sinusoïdal — support 2025-2026, diapo 48</p>

    <!-- /papier -->
