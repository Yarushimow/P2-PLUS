---
title: "Ch. 2 — Relativité restreinte"
---

# Chapitre 2 — Théorie de la relativité restreinte

=== "Version simplifiée"

    ## Les postulats d'Einstein (1905)

    !!! definition "Postulat I — Principe de relativité"
        Toutes les lois de la physique (mécanique **et** électromagnétisme) sont les mêmes
        dans tous les référentiels inertiels.

    !!! definition "Postulat II — Constance de la vitesse de la lumière"
        La vitesse de la lumière dans le vide est la même dans tous les référentiels
        inertiels, quel que soit le mouvement de la source ou de l'observateur.

    ## Transformation de Lorentz

    Un éclair part de l'origine commune à $t = t' = 0$. D'après le postulat II,
    $x^2 + y^2 + z^2 = c^2t^2$ dans S **et** $x'^2 + y'^2 + z'^2 = c^2t'^2$ dans S′.
    On cherche une transformation linéaire qui respecte ces deux égalités, et on trouve :

    !!! theoreme "Transformation de Lorentz"
        $$
        \gamma = \frac{1}{\sqrt{1 - \dfrac{v^2}{c^2}}}
        \qquad
        \begin{cases}
        x' = \gamma\,(x - vt) \\ y' = y,\quad z' = z \\ t' = \gamma\left(t - \dfrac{vx}{c^2}\right)
        \end{cases}
        \qquad
        \begin{cases}
        x = \gamma\,(x' + vt') \\ y = y',\quad z = z' \\ t = \gamma\left(t' + \dfrac{vx'}{c^2}\right)
        \end{cases}
        $$
        Pour $v \ll c$, $\gamma \to 1$ et on retrouve Galilée.

    !!! theoreme "Transformation des vitesses"
        $$
        u'_x = \frac{u_x - v}{1 - \dfrac{v\,u_x}{c^2}}
        \qquad
        u'_y = \frac{u_y}{\gamma\left(1 - \dfrac{v\,u_x}{c^2}\right)}
        $$

    ## Contraction des longueurs

    On mesure les deux extrémités d'une tige **au même instant** dans S ($t_1 = t_2$) :
    $L_0 = x'_2 - x'_1 = \gamma\,(x_2 - x_1) = \gamma L$.

    !!! theoreme
        $$L = \frac{L_0}{\gamma} < L_0$$
        $L_0$ est la **longueur propre**, mesurée dans le référentiel où l'objet est au repos.
        Seules les longueurs **parallèles** au mouvement sont contractées. L'effet est réciproque.

    ## Dilatation du temps

    Deux événements au **même endroit** dans S′ ($\Delta x' = 0$) :
    $\Delta t = \gamma\left(\Delta t' + \dfrac{v\,\Delta x'}{c^2}\right) = \gamma\,\Delta t'$.

    !!! theoreme
        $$T = \gamma\,T_0 > T_0$$
        $T_0$ est le **temps propre** : la durée mesurée par une horloge présente aux deux
        événements. C'est la durée la plus courte.

    ## Simultanéité

    En classique, le temps est absolu : deux événements simultanés le sont pour tous.
    En relativité, deux événements simultanés dans S ($\Delta t = 0$) mais séparés de
    $\Delta x$ ne le sont plus dans S′ : $\Delta t' = -\gamma\,\dfrac{v\,\Delta x}{c^2} \neq 0$.

    !!! piege "Classique ou relativiste ?"
        $v \le 0{,}1\,c$ : lois de Newton. $\ v > 0{,}1\,c$ : relativité restreinte.

    Exercices : [TD 2](../td/td-2-lorentz.md) · Synthèse : [fiche CE](../fiches/fiche-relativite.md).

=== "Version papier"

    Les diapos du chapitre 2 « Théorie de la relativité restreinte » (support du Pr F. Kwabia Tchana), diapos 1 à 21. Ce support ne contient pas d'énoncés de TD.

    [![Cours chapitre 2, diapo 1 : Page de titre](papier/ch2/p01.jpg){ loading=lazy .papier }](papier/ch2/p01.jpg)
    <p class="papier-legende">Page de titre · Cours chapitre 2, diapo 1</p>

    [![Cours chapitre 2, diapo 2 : Plan](papier/ch2/p02.jpg){ loading=lazy .papier }](papier/ch2/p02.jpg)
    <p class="papier-legende">Plan · Cours chapitre 2, diapo 2</p>

    [![Cours chapitre 2, diapo 3 : II.1 Les postulats d'Einstein : postulat I](papier/ch2/p03.jpg){ loading=lazy .papier }](papier/ch2/p03.jpg)
    <p class="papier-legende">II.1 Les postulats d'Einstein : postulat I · Cours chapitre 2, diapo 3</p>

    [![Cours chapitre 2, diapo 4 : II.1 Les postulats d'Einstein : postulat II](papier/ch2/p04.jpg){ loading=lazy .papier }](papier/ch2/p04.jpg)
    <p class="papier-legende">II.1 Les postulats d'Einstein : postulat II · Cours chapitre 2, diapo 4</p>

    [![Cours chapitre 2, diapo 5 : II.2 – Transformation des coordonnées de Lorentz](papier/ch2/p05.jpg){ loading=lazy .papier }](papier/ch2/p05.jpg)
    <p class="papier-legende">II.2 – Transformation des coordonnées de Lorentz · Cours chapitre 2, diapo 5</p>

    [![Cours chapitre 2, diapo 6 : II.2 – Transformation des coordonnées de Lorentz : l’éclair de lumière](papier/ch2/p06.jpg){ loading=lazy .papier }](papier/ch2/p06.jpg)
    <p class="papier-legende">II.2 – Transformation des coordonnées de Lorentz : l’éclair de lumière · Cours chapitre 2, diapo 6</p>

    [![Cours chapitre 2, diapo 7 : Selon le postulat II : r = ct et r’ = ct’](papier/ch2/p07.jpg){ loading=lazy .papier }](papier/ch2/p07.jpg)
    <p class="papier-legende">Selon le postulat II : r = ct et r’ = ct’ · Cours chapitre 2, diapo 7</p>

    [![Cours chapitre 2, diapo 8 : Démonstration : transformations linéaires x’ = a11 x + a12 t, t’ = a21 x + a22 t](papier/ch2/p08.jpg){ loading=lazy .papier }](papier/ch2/p08.jpg)
    <p class="papier-legende">Démonstration : transformations linéaires x’ = a11 x + a12 t, t’ = a21 x + a22 t · Cours chapitre 2, diapo 8</p>

    [![Cours chapitre 2, diapo 9 : Démonstration : cas x’ = 0 et identification des coefficients](papier/ch2/p09.jpg){ loading=lazy .papier }](papier/ch2/p09.jpg)
    <p class="papier-legende">Démonstration : cas x’ = 0 et identification des coefficients · Cours chapitre 2, diapo 9</p>

    [![Cours chapitre 2, diapo 10 : Démonstration : β = v/c et facteur relativiste γ](papier/ch2/p10.jpg){ loading=lazy .papier }](papier/ch2/p10.jpg)
    <p class="papier-legende">Démonstration : β = v/c et facteur relativiste γ · Cours chapitre 2, diapo 10</p>

    [![Cours chapitre 2, diapo 11 : Transformation des coordonnées de Lorentz](papier/ch2/p11.jpg){ loading=lazy .papier }](papier/ch2/p11.jpg)
    <p class="papier-legende">Transformation des coordonnées de Lorentz · Cours chapitre 2, diapo 11</p>

    [![Cours chapitre 2, diapo 12 : Transformation de vitesse de Lorentz : démonstration](papier/ch2/p12.jpg){ loading=lazy .papier }](papier/ch2/p12.jpg)
    <p class="papier-legende">Transformation de vitesse de Lorentz : démonstration · Cours chapitre 2, diapo 12</p>

    [![Cours chapitre 2, diapo 13 : Transformation de vitesse de Lorentz](papier/ch2/p13.jpg){ loading=lazy .papier }](papier/ch2/p13.jpg)
    <p class="papier-legende">Transformation de vitesse de Lorentz · Cours chapitre 2, diapo 13</p>

    [![Cours chapitre 2, diapo 14 : II.3 – a) La contraction des longueurs](papier/ch2/p14.jpg){ loading=lazy .papier }](papier/ch2/p14.jpg)
    <p class="papier-legende">II.3 – a) La contraction des longueurs · Cours chapitre 2, diapo 14</p>

    [![Cours chapitre 2, diapo 15 : Contraction des longueurs : démonstration, L = L0/γ](papier/ch2/p15.jpg){ loading=lazy .papier }](papier/ch2/p15.jpg)
    <p class="papier-legende">Contraction des longueurs : démonstration, L = L0/γ · Cours chapitre 2, diapo 15</p>

    [![Cours chapitre 2, diapo 16 : La contraction des longueurs : résumé](papier/ch2/p16.jpg){ loading=lazy .papier }](papier/ch2/p16.jpg)
    <p class="papier-legende">La contraction des longueurs : résumé · Cours chapitre 2, diapo 16</p>

    [![Cours chapitre 2, diapo 17 : II.3 – b) Dilatation du temps](papier/ch2/p17.jpg){ loading=lazy .papier }](papier/ch2/p17.jpg)
    <p class="papier-legende">II.3 – b) Dilatation du temps · Cours chapitre 2, diapo 17</p>

    [![Cours chapitre 2, diapo 18 : Dilatation du temps : T = γT’](papier/ch2/p18.jpg){ loading=lazy .papier }](papier/ch2/p18.jpg)
    <p class="papier-legende">Dilatation du temps : T = γT’ · Cours chapitre 2, diapo 18</p>

    [![Cours chapitre 2, diapo 19 : La dilatation du temps : résumé](papier/ch2/p19.jpg){ loading=lazy .papier }](papier/ch2/p19.jpg)
    <p class="papier-legende">La dilatation du temps : résumé · Cours chapitre 2, diapo 19</p>

    [![Cours chapitre 2, diapo 20 : Vitesse objet "relativiste"](papier/ch2/p20.jpg){ loading=lazy .papier }](papier/ch2/p20.jpg)
    <p class="papier-legende">Vitesse objet "relativiste" · Cours chapitre 2, diapo 20</p>

    [![Cours chapitre 2, diapo 21 : II.3 – c) Simultanéité](papier/ch2/p21.jpg){ loading=lazy .papier }](papier/ch2/p21.jpg)
    <p class="papier-legende">II.3 – c) Simultanéité · Cours chapitre 2, diapo 21</p>
