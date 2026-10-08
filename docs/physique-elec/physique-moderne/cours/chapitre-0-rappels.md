---
title: "Ch. 0 — Rappels de mécanique"
---

# Chapitre 0 — Rappels de mécanique classique

=== "Version simplifiée"

    ## Unités

    | Préfixe | milli | micro | nano | pico | femto |
    |---------|:-----:|:-----:|:----:|:----:|:-----:|
    | Facteur | $10^{-3}$ | $10^{-6}$ | $10^{-9}$ | $10^{-12}$ | $10^{-15}$ |

    $1\ \text{Å} = 10^{-10}$ m, $\quad 1\ \text{eV} = 1{,}6\times10^{-19}$ J, $\quad 1\ \text{MeV} = 10^6$ eV.

    !!! methode "Conversions eV ↔ J"
        eV → J : multiplier par $1{,}6\times10^{-19}$. J → eV : diviser.
        Exemple : $35$ MeV $= 35\times10^6 \times 1{,}6\times10^{-19} \approx 5{,}6\times10^{-12}$ J.

    ## Projection d'un vecteur

    Si $\alpha$ est l'angle avec l'axe $Ox$ : $V_x = V\cos\alpha$ et $V_y = V\sin\alpha$.

    ## Lois de Newton

    !!! theoreme "Les trois lois"
        1. **Inertie** : dans un référentiel galiléen, un corps isolé ($\sum\vec F = \vec 0$) est au repos ou en mouvement rectiligne uniforme.
        2. **PFD** : $\sum\vec F_{ext} = m\vec a = \dfrac{d\vec p}{dt}$ avec $\vec p = m\vec v$.
        3. **Action-réaction** : $\vec F_{A/B} = -\vec F_{B/A}$.

    ## Équations horaires

    | Mouvement | $a$ | $v(t)$ | $x(t)$ |
    |-----------|-----|--------|--------|
    | MRU | 0 | $v_0$ | $v_0 t + x_0$ |
    | MRUV | $a_0$ | $a_0 t + v_0$ | $\tfrac12 a_0 t^2 + v_0 t + x_0$ |

    Relation indépendante du temps : $v_1^2 - v_0^2 = 2a\,(x_1 - x_0)$.

    Chute libre (axe vers le haut) : $y = -\tfrac12 g t^2 + v_0 t + y_0$.

    ## Choc élastique

    !!! definition
        Conservation de la **quantité de mouvement** et de l'**énergie cinétique** :
        $$
        m_1\vec v_{1,i} + m_2\vec v_{2,i} = m_1\vec v_{1,f} + m_2\vec v_{2,f}
        \qquad
        \tfrac12 m_1 v_{1,i}^2 + \tfrac12 m_2 v_{2,i}^2 = \tfrac12 m_1 v_{1,f}^2 + \tfrac12 m_2 v_{2,f}^2
        $$

    ## Ondes

    Une onde transporte de l'énergie sans transporter de matière.
    $\lambda = \dfrac{v}{f} = v\,T$ et $f = \dfrac1T$. Pour la lumière dans le vide, $v = c$.

    Exemple : son à 340 m/s, audible de 20 Hz à 20 kHz, donc $\lambda$ de 1,7 cm à 17 m.

=== "Version papier"

    Les diapos du chapitre 0 « Mécanique classique » (support du Pr F. Kwabia Tchana), diapos 1 à 23, exemples corrigés compris. Ce support ne contient pas d'énoncés de TD.

    [![Cours chapitre 0 — Rappels, diapo 1 : Page de titre](papier/ch0/p01.jpg){ loading=lazy .papier }](papier/ch0/p01.jpg)
    <p class="papier-legende">Page de titre · Cours chapitre 0 — Rappels, diapo 1</p>

    [![Cours chapitre 0 — Rappels, diapo 2 : Plan](papier/ch0/p02.jpg){ loading=lazy .papier }](papier/ch0/p02.jpg)
    <p class="papier-legende">Plan · Cours chapitre 0 — Rappels, diapo 2</p>

    [![Cours chapitre 0 — Rappels, diapo 3 : Rappel : conversion des unités de mesure](papier/ch0/p03.jpg){ loading=lazy .papier }](papier/ch0/p03.jpg)
    <p class="papier-legende">Rappel : conversion des unités de mesure · Cours chapitre 0 — Rappels, diapo 3</p>

    [![Cours chapitre 0 — Rappels, diapo 4 : Application : exercice de conversion d'unités](papier/ch0/p04.jpg){ loading=lazy .papier }](papier/ch0/p04.jpg)
    <p class="papier-legende">Application : exercice de conversion d'unités · Cours chapitre 0 — Rappels, diapo 4</p>

    [![Cours chapitre 0 — Rappels, diapo 5 : Exercice de conversion d'unités — corrigé](papier/ch0/p05.jpg){ loading=lazy .papier }](papier/ch0/p05.jpg)
    <p class="papier-legende">Exercice de conversion d'unités — corrigé · Cours chapitre 0 — Rappels, diapo 5</p>

    [![Cours chapitre 0 — Rappels, diapo 6 : Projection d’un vecteur sur l’axe x’Ox et y’Oy](papier/ch0/p06.jpg){ loading=lazy .papier }](papier/ch0/p06.jpg)
    <p class="papier-legende">Projection d’un vecteur sur l’axe x’Ox et y’Oy · Cours chapitre 0 — Rappels, diapo 6</p>

    [![Cours chapitre 0 — Rappels, diapo 7 : Application 1 : composantes de deux vitesses](papier/ch0/p07.jpg){ loading=lazy .papier }](papier/ch0/p07.jpg)
    <p class="papier-legende">Application 1 : composantes de deux vitesses · Cours chapitre 0 — Rappels, diapo 7</p>

    [![Cours chapitre 0 — Rappels, diapo 8 : Application 2 : somme de deux vecteurs](papier/ch0/p08.jpg){ loading=lazy .papier }](papier/ch0/p08.jpg)
    <p class="papier-legende">Application 2 : somme de deux vecteurs · Cours chapitre 0 — Rappels, diapo 8</p>

    [![Cours chapitre 0 — Rappels, diapo 9 : Rappel : loi de Newton](papier/ch0/p09.jpg){ loading=lazy .papier }](papier/ch0/p09.jpg)
    <p class="papier-legende">Rappel : loi de Newton · Cours chapitre 0 — Rappels, diapo 9</p>

    [![Cours chapitre 0 — Rappels, diapo 10 : Principe d’inertie : 1ère loi de Newton](papier/ch0/p10.jpg){ loading=lazy .papier }](papier/ch0/p10.jpg)
    <p class="papier-legende">Principe d’inertie : 1ère loi de Newton · Cours chapitre 0 — Rappels, diapo 10</p>

    [![Cours chapitre 0 — Rappels, diapo 11 : Principe ou relation fondamental de la dynamique : 2ème loi de Newton](papier/ch0/p11.jpg){ loading=lazy .papier }](papier/ch0/p11.jpg)
    <p class="papier-legende">Principe ou relation fondamental de la dynamique : 2ème loi de Newton · Cours chapitre 0 — Rappels, diapo 11</p>

    [![Cours chapitre 0 — Rappels, diapo 12 : Principe de l’action et de la réaction : 3ème loi de Newton](papier/ch0/p12.jpg){ loading=lazy .papier }](papier/ch0/p12.jpg)
    <p class="papier-legende">Principe de l’action et de la réaction : 3ème loi de Newton · Cours chapitre 0 — Rappels, diapo 12</p>

    [![Cours chapitre 0 — Rappels, diapo 13 : Equation de mouvement : Mouvement Rectiligne Uniforme (MRU)](papier/ch0/p13.jpg){ loading=lazy .papier }](papier/ch0/p13.jpg)
    <p class="papier-legende">Equation de mouvement : Mouvement Rectiligne Uniforme (MRU) · Cours chapitre 0 — Rappels, diapo 13</p>

    [![Cours chapitre 0 — Rappels, diapo 14 : Equation de mouvement : Mouvement Rectiligne Uniformément Varié (MRUV)](papier/ch0/p14.jpg){ loading=lazy .papier }](papier/ch0/p14.jpg)
    <p class="papier-legende">Equation de mouvement : Mouvement Rectiligne Uniformément Varié (MRUV) · Cours chapitre 0 — Rappels, diapo 14</p>

    [![Cours chapitre 0 — Rappels, diapo 15 : Equation de mouvement : MRUV, représentation graphique](papier/ch0/p15.jpg){ loading=lazy .papier }](papier/ch0/p15.jpg)
    <p class="papier-legende">Equation de mouvement : MRUV, représentation graphique · Cours chapitre 0 — Rappels, diapo 15</p>

    [![Cours chapitre 0 — Rappels, diapo 16 : Exercice : vitesse et distance d’un véhicule en MRU (corrigé)](papier/ch0/p16.jpg){ loading=lazy .papier }](papier/ch0/p16.jpg)
    <p class="papier-legende">Exercice : vitesse et distance d’un véhicule en MRU (corrigé) · Cours chapitre 0 — Rappels, diapo 16</p>

    [![Cours chapitre 0 — Rappels, diapo 17 : Exercice : véhicule en MRUV et quantité de mouvement (corrigé)](papier/ch0/p17.jpg){ loading=lazy .papier }](papier/ch0/p17.jpg)
    <p class="papier-legende">Exercice : véhicule en MRUV et quantité de mouvement (corrigé) · Cours chapitre 0 — Rappels, diapo 17</p>

    [![Cours chapitre 0 — Rappels, diapo 18 : Exercice : chute libre d’une pièce (corrigé)](papier/ch0/p18.jpg){ loading=lazy .papier }](papier/ch0/p18.jpg)
    <p class="papier-legende">Exercice : chute libre d’une pièce (corrigé) · Cours chapitre 0 — Rappels, diapo 18</p>

    [![Cours chapitre 0 — Rappels, diapo 19 : Rappel : choc (mécanique) élastique](papier/ch0/p19.jpg){ loading=lazy .papier }](papier/ch0/p19.jpg)
    <p class="papier-legende">Rappel : choc (mécanique) élastique · Cours chapitre 0 — Rappels, diapo 19</p>

    [![Cours chapitre 0 — Rappels, diapo 20 : Rappel : choc (mécanique) élastique, conservations](papier/ch0/p20.jpg){ loading=lazy .papier }](papier/ch0/p20.jpg)
    <p class="papier-legende">Rappel : choc (mécanique) élastique, conservations · Cours chapitre 0 — Rappels, diapo 20</p>

    [![Cours chapitre 0 — Rappels, diapo 21 : Rappel : onde, fréquence et période](papier/ch0/p21.jpg){ loading=lazy .papier }](papier/ch0/p21.jpg)
    <p class="papier-legende">Rappel : onde, fréquence et période · Cours chapitre 0 — Rappels, diapo 21</p>

    [![Cours chapitre 0 — Rappels, diapo 22 : Rappel : onde, fréquence et période, relation λ = v/f](papier/ch0/p22.jpg){ loading=lazy .papier }](papier/ch0/p22.jpg)
    <p class="papier-legende">Rappel : onde, fréquence et période, relation λ = v/f · Cours chapitre 0 — Rappels, diapo 22</p>

    [![Cours chapitre 0 — Rappels, diapo 23 : Exercice : longueur d’onde des sons audibles (corrigé)](papier/ch0/p23.jpg){ loading=lazy .papier }](papier/ch0/p23.jpg)
    <p class="papier-legende">Exercice : longueur d’onde des sons audibles (corrigé) · Cours chapitre 0 — Rappels, diapo 23</p>
