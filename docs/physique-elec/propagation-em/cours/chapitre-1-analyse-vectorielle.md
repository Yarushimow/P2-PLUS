---
title: "Ch. 1 — Outils d'analyse vectorielle"
---

# Chapitre 1 — Outils mathématiques d'analyse vectorielle

=== "Version simplifiée"

    Ces outils servent à transformer les lois intégrales vues au S3 (Gauss, Ampère,
    Faraday) en **équations locales**, valables en tout point et à tout instant :
    ce sont les équations de Maxwell du [chapitre 2](chapitre-2-maxwell.md).

    ## L'opérateur nabla

    En coordonnées cartésiennes, $\nabla$ est un « vecteur de dérivées » :

    $$
    \nabla = \begin{pmatrix} \partial/\partial x \\ \partial/\partial y \\ \partial/\partial z \end{pmatrix}
    $$

    Les quatre opérateurs s'obtiennent en appliquant $\nabla$ de façons différentes.

    | Opérateur | Écriture | S'applique à | Donne |
    |---|---|---|---|
    | Gradient | $\overrightarrow{\text{grad}}\,f = \nabla f$ | un **scalaire** | un vecteur |
    | Divergence | $\text{div}\,\vec U = \nabla \cdot \vec U$ | un **vecteur** | un scalaire |
    | Rotationnel | $\overrightarrow{\text{rot}}\,\vec U = \nabla \wedge \vec U$ | un **vecteur** | un vecteur |
    | Laplacien | $\Delta f = \text{div}(\overrightarrow{\text{grad}}\,f)$ | scalaire **ou** vecteur | même nature |

    !!! piege "Vérifier que l'écriture a un sens"
        Avant de calculer, regarde la nature de ce qu'on dérive. $\overrightarrow{\text{grad}}(\vec F)$,
        $\text{div}(f)$ ou $\overrightarrow{\text{rot}}(f)$ avec $f$ scalaire **n'existent pas** dans ce cours.
        C'est une question classique de TD et de DE.

    ## Gradient

    !!! definition "Gradient"

        $$
        \overrightarrow{\text{grad}}\,f = \frac{\partial f}{\partial x}\vec u_x + \frac{\partial f}{\partial y}\vec u_y + \frac{\partial f}{\partial z}\vec u_z
        $$

    - Il indique la **direction de plus forte croissance** de $f$, et sa norme dit à quelle vitesse $f$ augmente.
    - Il est **perpendiculaire aux surfaces** où $f$ est constante (isothermes, équipotentielles).
    - Variation entre deux points proches : $df = \overrightarrow{\text{grad}}\,f \cdot \overrightarrow{dl}$.
    - En électrostatique : $\vec E = -\overrightarrow{\text{grad}}\,V$.

    ## Divergence

    !!! definition "Divergence"

        $$
        \text{div}\,\vec U = \frac{\partial U_x}{\partial x} + \frac{\partial U_y}{\partial y} + \frac{\partial U_z}{\partial z}
        $$

    Elle mesure si le champ « sort » d'un point (**source**, $\text{div} > 0$) ou s'y
    « engouffre » (**puits**, $\text{div} < 0$). Pour un fluide, $\text{div}\,\vec v = 0$
    veut dire incompressible : autant de matière entre que de matière sort.

    ## Rotationnel

    !!! definition "Rotationnel"

        $$
        \overrightarrow{\text{rot}}\,\vec U = \begin{pmatrix}
        \dfrac{\partial U_z}{\partial y} - \dfrac{\partial U_y}{\partial z} \\[6pt]
        \dfrac{\partial U_x}{\partial z} - \dfrac{\partial U_z}{\partial x} \\[6pt]
        \dfrac{\partial U_y}{\partial x} - \dfrac{\partial U_x}{\partial y}
        \end{pmatrix}
        $$

    Il mesure la tendance du champ à **tourner** autour d'un point, ou à cisailler.
    Une petite roue lâchée dans un écoulement tourne dans le sens trigonométrique si
    $\overrightarrow{\text{rot}}\,\vec v$ pointe vers les $z > 0$, et ne tourne pas si le rotationnel est nul.

    !!! methode "Retenir le rotationnel sans erreur"
        Composante $x$ : on dérive « $z$ par $y$ moins $y$ par $z$ ». Les deux autres s'obtiennent par
        **permutation circulaire** $x \to y \to z \to x$. Ou calcule le produit vectoriel
        $\nabla \wedge \vec U$ comme d'habitude.

    ## Laplacien

    $$
    \Delta f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}
    \qquad
    \Delta \vec U = \begin{pmatrix} \Delta U_x \\ \Delta U_y \\ \Delta U_z \end{pmatrix}
    $$

    Le laplacien apparaît dans **toutes les équations de propagation** d'ondes.

    !!! tip "Cylindriques et sphériques"
        Les expressions en coordonnées cylindriques et sphériques sont **données** dans les énoncés
        (voir le [formulaire](../fiches/fiche-propagation.md#formulaire-officiel)). Il faut seulement savoir
        les utiliser, par exemple $\text{div}\,\vec E = \frac1r\frac{\partial(rE_r)}{\partial r}$ pour un champ radial en cylindriques.

    ## Les deux théorèmes intégraux

    !!! theoreme "Green-Ostrogradski (théorème de la divergence)"
        Le flux sortant d'une surface **fermée** $S$ est égal à l'intégrale de la divergence sur le volume $V$ qu'elle délimite :

        $$
        \oint\!\!\!\oint_S \vec U \cdot \overrightarrow{dS} = \iiint_V \text{div}\,\vec U\, dV
        $$

    !!! theoreme "Stokes"
        La circulation sur un contour **fermé** $C$ est égale au flux du rotationnel à travers une surface $S$ (ouverte) qui s'appuie sur $C$ :

        $$
        \oint_C \vec U \cdot \overrightarrow{dl} = \iint_S \overrightarrow{\text{rot}}\,\vec U \cdot \overrightarrow{dS}
        $$

    Exemple : le théorème d'Ampère $\oint \vec B \cdot \overrightarrow{dl} = \mu_0 \iint \vec J \cdot \overrightarrow{dS}$
    devient, grâce à Stokes, $\overrightarrow{\text{rot}}\,\vec B = \mu_0 \vec J$ (forme locale).

    ## Identités à connaître

    | Identité | À quoi elle sert |
    |---|---|
    | $\text{div}(\overrightarrow{\text{rot}}\,\vec U) = 0$ | un champ de divergence nulle ($\vec B$) dérive d'un potentiel vecteur |
    | $\overrightarrow{\text{rot}}(\overrightarrow{\text{grad}}\,f) = \vec 0$ | une force de rotationnel nul est conservative |
    | $\Delta \vec U = \overrightarrow{\text{grad}}(\text{div}\,\vec U) - \overrightarrow{\text{rot}}(\overrightarrow{\text{rot}}\,\vec U)$ | **établir l'équation de propagation** (ch. 2) |
    | $\text{div}(\vec U_1 \wedge \vec U_2) = \vec U_2 \cdot \overrightarrow{\text{rot}}\,\vec U_1 - \vec U_1 \cdot \overrightarrow{\text{rot}}\,\vec U_2$ | **bilan d'énergie**, vecteur de Poynting (ch. 4) |
    | $\overrightarrow{\text{grad}}(fg) = f\,\overrightarrow{\text{grad}}\,g + g\,\overrightarrow{\text{grad}}\,f$ | |
    | $\text{div}(f\vec U) = f\,\text{div}\,\vec U + \overrightarrow{\text{grad}}\,f \cdot \vec U$ | |
    | $\overrightarrow{\text{rot}}(f\vec U) = f\,\overrightarrow{\text{rot}}\,\vec U + \overrightarrow{\text{grad}}\,f \wedge \vec U$ | |
    | $\Delta(fg) = f\Delta g + g\Delta f + 2\,\overrightarrow{\text{grad}}\,f \cdot \overrightarrow{\text{grad}}\,g$ | |

    ## Application du cours (diapo 19)

    $\vec E(x, y, t) = E_0\cos(ax + by - \omega t)\,\vec u_z$. On note $\varphi = ax + by - \omega t$.

    ??? success "Correction"
        - $\text{div}\,\vec E = \dfrac{\partial E_z}{\partial z} = 0$ ($E_z$ ne dépend pas de $z$).
        - $\overrightarrow{\text{rot}}\,\vec E = \left(\dfrac{\partial E_z}{\partial y},\ -\dfrac{\partial E_z}{\partial x},\ 0\right) = E_0\sin\varphi\,(-b\,\vec u_x + a\,\vec u_y)$.
        - $\dfrac{\partial^2 \vec E}{\partial t^2} = -\omega^2 E_0\cos\varphi\,\vec u_z = -\omega^2\vec E$.
        - $\Delta \vec E = \left(\dfrac{\partial^2 E_z}{\partial x^2} + \dfrac{\partial^2 E_z}{\partial y^2}\right)\vec u_z = -(a^2 + b^2)\,\vec E$.
        - $\overrightarrow{\text{grad}}\,\vec E$ n'a pas de sens (vecteur). On peut calculer le gradient de la composante $E_z$ :
          $\overrightarrow{\text{grad}}\,E_z = -E_0\sin\varphi\,(a\,\vec u_x + b\,\vec u_y)$.

=== "Version papier"

    Les diapos du chapitre 1 (support 2025-2026).

    <!-- papier: pdf/SP401P/ch1.pdf | Chapitre 1 — support 2025-2026 | ch1 | diapo -->

    [![Chapitre 1 — support 2025-2026, diapo 1 : Propagation Electromagnetique](papier/ch1/p01.jpg){ loading=lazy .papier }](papier/ch1/p01.jpg)
    <p class="papier-legende">Propagation Electromagnetique · Chapitre 1 — support 2025-2026, diapo 1</p>

    [![Chapitre 1 — support 2025-2026, diapo 2 : Volume horaire](papier/ch1/p02.jpg){ loading=lazy .papier }](papier/ch1/p02.jpg)
    <p class="papier-legende">Volume horaire · Chapitre 1 — support 2025-2026, diapo 2</p>

    [![Chapitre 1 — support 2025-2026, diapo 3 : 1. Outils mathématiques d’analyse vectorielle](papier/ch1/p03.jpg){ loading=lazy .papier }](papier/ch1/p03.jpg)
    <p class="papier-legende">1. Outils mathématiques d’analyse vectorielle · Chapitre 1 — support 2025-2026, diapo 3</p>

    [![Chapitre 1 — support 2025-2026, diapo 4 : Propagation électromagnétique](papier/ch1/p04.jpg){ loading=lazy .papier }](papier/ch1/p04.jpg)
    <p class="papier-legende">Propagation électromagnétique · Chapitre 1 — support 2025-2026, diapo 4</p>

    [![Chapitre 1 — support 2025-2026, diapo 5 : I. Introduction](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">I. Introduction · Chapitre 1 — support 2025-2026, diapo 5</p>

    [![Chapitre 1 — support 2025-2026, diapo 6 : I. Introduction](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">I. Introduction · Chapitre 1 — support 2025-2026, diapo 6</p>

    [![Chapitre 1 — support 2025-2026, diapo 7 : Champ de vecteurs](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">Champ de vecteurs · Chapitre 1 — support 2025-2026, diapo 7</p>

    [![Chapitre 1 — support 2025-2026, diapo 8 : II . Opérateurs](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">II . Opérateurs · Chapitre 1 — support 2025-2026, diapo 8</p>

    [![Chapitre 1 — support 2025-2026, diapo 9 : 1.2. Interprétation](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">1.2. Interprétation · Chapitre 1 — support 2025-2026, diapo 9</p>

    [![Chapitre 1 — support 2025-2026, diapo 10 : 2. Divergence Noté : div](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">2. Divergence Noté : div · Chapitre 1 — support 2025-2026, diapo 10</p>

    [![Chapitre 1 — support 2025-2026, diapo 11 : Vitesse des particules fluides](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">Vitesse des particules fluides · Chapitre 1 — support 2025-2026, diapo 11</p>

    [![Chapitre 1 — support 2025-2026, diapo 12 : 2. Divergence div](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">2. Divergence div · Chapitre 1 — support 2025-2026, diapo 12</p>

    [![Chapitre 1 — support 2025-2026, diapo 13 : 3.1 Définition](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">3.1 Définition · Chapitre 1 — support 2025-2026, diapo 13</p>

    [![Chapitre 1 — support 2025-2026, diapo 14 : Exemples sur l’opérateur rotationnel](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">Exemples sur l’opérateur rotationnel · Chapitre 1 — support 2025-2026, diapo 14</p>

    [![Chapitre 1 — support 2025-2026, diapo 15 : 4. Laplacien Noté : Δ](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">4. Laplacien Noté : Δ · Chapitre 1 — support 2025-2026, diapo 15</p>

    [![Chapitre 1 — support 2025-2026, diapo 16 : II. Formes intégrales des théorèmes d’analyse vectorielle](papier/ch1/p16.jpg){ loading=lazy .papier }](papier/ch1/p16.jpg)
    <p class="papier-legende">II. Formes intégrales des théorèmes d’analyse vectorielle · Chapitre 1 — support 2025-2026, diapo 16</p>

    [![Chapitre 1 — support 2025-2026, diapo 17 : 2. Théorème de Stokes](papier/ch1/p17.jpg){ loading=lazy .papier }](papier/ch1/p17.jpg)
    <p class="papier-legende">2. Théorème de Stokes · Chapitre 1 — support 2025-2026, diapo 17</p>

    [![Chapitre 1 — support 2025-2026, diapo 18 : III. Quelques identités remarquables d’analyse vectorielle](papier/ch1/p18.jpg){ loading=lazy .papier }](papier/ch1/p18.jpg)
    <p class="papier-legende">III. Quelques identités remarquables d’analyse vectorielle · Chapitre 1 — support 2025-2026, diapo 18</p>

    [![Chapitre 1 — support 2025-2026, diapo 19 : IV APPLICATIONS](papier/ch1/p19.jpg){ loading=lazy .papier }](papier/ch1/p19.jpg)
    <p class="papier-legende">IV APPLICATIONS · Chapitre 1 — support 2025-2026, diapo 19</p>

    <!-- /papier -->
