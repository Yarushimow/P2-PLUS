---
title: "Ch. 2 — Coordonnées et distributions de charges"
---

# Chapitre 2 — Systèmes de coordonnées et charges distribuées

=== "Version simplifiée"

    !!! abstract "Le fil du chapitre"
        Au chapitre 1, les charges étaient **ponctuelles**. En vrai, elles sont souvent **étalées**
        sur un fil, une plaque ou une boule. Pour les compter il faut découper l'objet en petits
        morceaux ($\mathrm dl$, $\mathrm dS$, $\mathrm dV$) et **intégrer**. Ce chapitre donne les
        outils pour ça : les trois bases de l'espace, leurs « métriques élémentaires », puis le
        calcul de longueurs, d'aires, de volumes et de **charges totales**. C'est la boîte à outils
        du chapitre 3 (théorème de Gauss).

    ## 1. Les bases canoniques de l'espace

    Le choix de la base dépend de la **forme** de l'objet étudié :

    | Forme | Base | Coordonnées | Exemples |
    |-------|------|-------------|----------|
    | « Boîte » | cartésienne | $(x, y, z)$ | plaque rectangulaire, plan infini, pavé |
    | Un axe | cylindrique | $(r, \theta, z)$ | fil, câble, cylindre |
    | Un centre | sphérique | $(r, \theta, \varphi)$ | charge ponctuelle, sphère, boule |

    !!! analogie "Donner une adresse"
        Un système de coordonnées, c'est une façon de donner l'adresse d'un point :

        - **cartésiennes** : un plan de ville en damier (« 3 rues vers l'est, 2 vers le nord, 5ᵉ étage ») ;
        - **cylindriques** : un escalier en colimaçon autour d'un poteau (distance au poteau $r$, angle
          $\theta$ autour, hauteur $z$) ;
        - **sphériques** : le GPS sur la Terre (distance au centre $r$, et deux angles : $\theta$ comme
          la latitude mais compté depuis le pôle nord, $\varphi$ comme la longitude).

        On choisit celle qui colle à la forme de l'objet : les calculs deviennent beaucoup plus simples.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/coordonnees.svg"

    === "Cartésienne"

        Base orthonormée directe $(\vec e_x, \vec e_y, \vec e_z)$, **la même partout** (elle ne dépend pas
        du point). $x$ = abscisse, $y$ = ordonnée, $z$ = cote.

        $$
        \overrightarrow{OM} = x\,\vec e_x + y\,\vec e_y + z\,\vec e_z
        $$

        Surfaces « coordonnée constante » : $x = x_0$, $y = y_0$, $z = z_0$ sont des **plans**.

    === "Polaire (plan)"

        Base $(\vec e_r, \vec e_\theta)$ du plan, qui **tourne avec le point**.

        $$
        r = OM = \sqrt{x^2 + y^2},\qquad \vec e_r = \frac{\overrightarrow{OM}}{r},\qquad
        \cos\theta = \frac{x}{r},\ \sin\theta = \frac{y}{r},\qquad \overrightarrow{OM} = r\,\vec e_r
        $$

        $r = r_0$ : **cercles** de centre $O$ ; $\theta = \theta_0$ : **demi-droites** partant de $O$.

    === "Cylindrique"

        Base $(\vec e_r, \vec e_\theta, \vec e_z)$ : la base polaire + l'axe $Oz$. On note $H$ le projeté
        de $M$ sur le plan $(Oxy)$.

        $$
        r = \sqrt{x^2 + y^2} = \text{distance à l'axe } Oz,\qquad
        x = r\cos\theta,\ y = r\sin\theta,\qquad \overrightarrow{OM} = r\,\vec e_r + z\,\vec e_z
        $$

        | Coordonnée fixée | Surface obtenue |
        |------------------|-----------------|
        | $r = r_0$ | **cylindre** d'axe $Oz$ |
        | $\theta = \theta_0$ | **demi-plan** appuyé sur $Oz$ |
        | $z = z_0$ | **plan** $\perp$ à $Oz$ |

    === "Sphérique"

        Base $(\vec e_r, \vec e_\theta, \vec e_\varphi)$. $\theta = (\vec e_z, \overrightarrow{OM})$ est la
        **colatitude** ($0 \le \theta \le \pi$), $\varphi = (\vec e_x, \overrightarrow{OH})$ l'**azimut**
        ($0 \le \varphi \le 2\pi$).

        $$
        r = \sqrt{x^2 + y^2 + z^2} = \text{distance à } O,\qquad
        \begin{cases} x = r\sin\theta\cos\varphi\\ y = r\sin\theta\sin\varphi\\ z = r\cos\theta\end{cases}
        \qquad \overrightarrow{OM} = r\,\vec e_r
        $$

        | Coordonnée fixée | Surface obtenue |
        |------------------|-----------------|
        | $r = r_0$ | **sphère** de centre $O$ |
        | $\theta = \theta_0$ | **cône** de sommet $O$ et d'axe $Oz$ |
        | $\varphi = \varphi_0$ | **demi-plan** appuyé sur $Oz$ |

    !!! piege "Le $r$ n'est pas le même"
        En **cylindriques**, $r$ est la distance à l'**axe** $Oz$ ($\sqrt{x^2+y^2}$). En **sphériques**,
        $r$ est la distance au **centre** $O$ ($\sqrt{x^2+y^2+z^2}$). Même lettre, deux grandeurs différentes.

    ## 2. Les métriques élémentaires

    !!! definition "Le principe"
        On déplace le point $M$ d'un tout petit peu dans les trois directions de la base :
        $\mathrm d\vec l = \mathrm dx_1\,\vec e_1 + \mathrm dx_2\,\vec e_2 + \mathrm dx_3\,\vec e_3$.
        Ce déplacement balaie une petite **boîte** d'arêtes $\mathrm dx_1$, $\mathrm dx_2$, $\mathrm dx_3$ :

        - son **volume** : $\mathrm dV = \mathrm dx_1\,\mathrm dx_2\,\mathrm dx_3$ ;
        - ses 6 faces, égales deux à deux : $\mathrm dS_k = \mathrm dx_i\,\mathrm dx_j$ (les deux arêtes
          **autres** que celle de la direction $k$).

        Attention : les « arêtes » sont des **longueurs**. Une variation d'angle $\mathrm d\theta$ n'est pas
        une longueur, c'est $r\,\mathrm d\theta$ qui en est une.

    | | Cartésiennes | Cylindriques | Sphériques |
    |-|--------------|--------------|------------|
    | $\mathrm d\vec l$ | $\mathrm dx\,\vec e_x + \mathrm dy\,\vec e_y + \mathrm dz\,\vec e_z$ | $\mathrm dr\,\vec e_r + r\,\mathrm d\theta\,\vec e_\theta + \mathrm dz\,\vec e_z$ | $\mathrm dr\,\vec e_r + r\,\mathrm d\theta\,\vec e_\theta + r\sin\theta\,\mathrm d\varphi\,\vec e_\varphi$ |
    | $\mathrm dV$ | $\mathrm dx\,\mathrm dy\,\mathrm dz$ | $r\,\mathrm dr\,\mathrm d\theta\,\mathrm dz$ | $r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\varphi$ |
    | $\mathrm dS$ selon $\vec e_1$ | $\mathrm dS_x = \mathrm dy\,\mathrm dz$ | $\mathrm dS_r = r\,\mathrm d\theta\,\mathrm dz$ (cylindre) | $\mathrm dS_r = r^2\sin\theta\,\mathrm d\theta\,\mathrm d\varphi$ (sphère) |
    | $\mathrm dS$ selon $\vec e_2$ | $\mathrm dS_y = \mathrm dx\,\mathrm dz$ | $\mathrm dS_\theta = \mathrm dr\,\mathrm dz$ (demi-plan) | $\mathrm dS_\theta = r\sin\theta\,\mathrm dr\,\mathrm d\varphi$ (cône) |
    | $\mathrm dS$ selon $\vec e_3$ | $\mathrm dS_z = \mathrm dx\,\mathrm dy$ | $\mathrm dS_z = r\,\mathrm dr\,\mathrm d\theta$ (disque) | $\mathrm dS_\varphi = r\,\mathrm dr\,\mathrm d\theta$ (demi-plan) |

    !!! methode "Tout se retrouve à partir de $\mathrm d\vec l$"
        Il suffit de retenir les trois $\mathrm d\vec l$. Ensuite :

        - $\mathrm dV$ = **produit des trois** composantes de $\mathrm d\vec l$ ;
        - $\mathrm dS_k$ = produit des **deux composantes autres que** celle selon $\vec e_k$.

        Exemple : en sphériques, $\mathrm dS_r$ = (composante $\theta$) × (composante $\varphi$)
        $= r\,\mathrm d\theta \times r\sin\theta\,\mathrm d\varphi = r^2\sin\theta\,\mathrm d\theta\,\mathrm d\varphi$.

    ## 3. Calculer des longueurs, des aires, des volumes

    !!! definition "Somme continue"
        On découpe l'objet en morceaux élémentaires et on les additionne :

        $$
        L = \int_A^B \mathrm dl \qquad A = \iint_{\mathcal S} \mathrm dS \qquad V = \iiint_{\mathcal V} \mathrm dV
        $$

    !!! methode "Les trois étapes"
        1. Choisir la base adaptée à la forme.
        2. Décrire l'objet par les **bornes** de chaque coordonnée (ex. disque : $0 \le r \le R$,
           $0 \le \theta \le 2\pi$).
        3. Écrire l'élément ($\mathrm dS$ ou $\mathrm dV$) et intégrer. Quand les bornes sont des
           constantes, l'intégrale **se sépare** en produit d'intégrales simples.

    | Objet | Description | Calcul | Résultat |
    |-------|-------------|--------|----------|
    | Pavé $L \times \ell \times h$ | $0\le x\le L$, $0\le y\le\ell$, $0\le z\le h$ | $\int_0^L\!\mathrm dx\int_0^\ell\!\mathrm dy\int_0^h\!\mathrm dz$ | $L\ell h$ |
    | Disque de rayon $R$ | $0\le r\le R$, $0\le\theta\le 2\pi$ | $\int_0^R r\,\mathrm dr\int_0^{2\pi}\mathrm d\theta = \dfrac{R^2}{2}\times 2\pi$ | $\pi R^2$ |
    | Cylindre $R$, $h$ | $+\ 0\le z\le h$ | $\pi R^2 \times \int_0^h \mathrm dz$ | $\pi R^2 h$ |
    | Sphère de rayon $R$ | $r = R$, $0\le\theta\le\pi$, $0\le\varphi\le2\pi$ | $R^2\int_0^\pi\sin\theta\,\mathrm d\theta\int_0^{2\pi}\mathrm d\varphi = R^2\times 2\times 2\pi$ | $4\pi R^2$ |
    | Boule de rayon $R$ | $0\le r\le R$, $\theta$, $\varphi$ complets | $\int_0^R r^2\,\mathrm dr \times 4\pi = \dfrac{R^3}{3}\times 4\pi$ | $\dfrac43\pi R^3$ |

    !!! tip "Deux intégrales qui reviennent tout le temps"
        $\displaystyle\int_0^\pi \sin\theta\,\mathrm d\theta = \big[-\cos\theta\big]_0^\pi = 2$ et
        $\displaystyle\int_0^\pi\!\!\int_0^{2\pi} \sin\theta\,\mathrm d\theta\,\mathrm d\varphi = 4\pi$
        (l'« angle solide » total).

    ## 4. Charges distribuées dans l'espace

    !!! analogie "La confiture sur la tartine"
        La densité de charge, c'est comme la **quantité de confiture par cm²** sur une tartine. Si elle est
        étalée uniformément, la quantité totale = densité × surface. Si elle est plus épaisse au milieu,
        il faut découper la tartine en petits carrés, multiplier chaque carré par **son** épaisseur
        locale, et tout additionner : c'est exactement $Q = \iint \sigma\,\mathrm dS$.

    Trois façons d'étaler une charge, selon la dimension de l'objet :

    | Objet chargé | Densité locale | Moyenne | Unité | Charge élémentaire |
    |--------------|----------------|---------|-------|--------------------|
    | Ligne (fil, cercle, courbe) | $\lambda(P) = \dfrac{\mathrm dq}{\mathrm dl}$ | $\lambda_m = \dfrac{Q}{L}$ | C/m | $\mathrm dq = \lambda\,\mathrm dl$ |
    | Surface (plaque, sphère creuse) | $\sigma(P) = \dfrac{\mathrm dq}{\mathrm dS}$ | $\sigma_m = \dfrac{Q}{S}$ | C/m² | $\mathrm dq = \sigma\,\mathrm dS$ |
    | Volume (boule, cylindre plein) | $\rho(P) = \dfrac{\mathrm dq}{\mathrm dV}$ | $\rho_m = \dfrac{Q}{V}$ | C/m³ | $\mathrm dq = \rho\,\mathrm dV$ |

    !!! theoreme "Charge totale"
        On additionne toutes les charges élémentaires :

        $$
        Q = \int_{\mathcal L} \lambda(P)\,\mathrm dl \qquad
        Q = \iint_{\mathcal S} \sigma(P)\,\mathrm dS \qquad
        Q = \iiint_{\mathcal V} \rho(P)\,\mathrm dV
        $$

        Si la densité est **uniforme**, elle sort de l'intégrale : $Q = \lambda L = \sigma S = \rho V$.
        Sinon, elle reste **dans** l'intégrale, avec ses variables.

    !!! methode "Calculer une charge totale (le schéma des exos du prof)"
        1. Choisir la base adaptée et faire un **schéma**.
        2. Donner l'**unité** de la constante ($\lambda_0$ en C/m, $\sigma_0$ en C/m², $\rho_0$ en C/m³) et
           tracer l'allure de la densité.
        3. Écrire $\mathrm dq$ = densité × élément ($\mathrm dl$, $\mathrm dS$ ou $\mathrm dV$) **dans la base choisie**.
        4. Intégrer sur tout l'objet → $Q$.
        5. Moyenne : $Q$ divisé par la longueur / l'aire / le volume total.

    ### Les quatre exemples du cours

    !!! example "Demi-cercle, $\lambda(\theta) = \lambda_0\cos\dfrac{\theta}{2}$ (diapo 24)"
        Demi-cercle de centre $O$, de rayon $R$, dans $y \ge 0$ : $0 \le \theta \le \pi$. Sur un cercle,
        $\mathrm dl = R\,\mathrm d\theta$, donc $\mathrm dq = \lambda_0 R\cos\dfrac\theta2\,\mathrm d\theta$.

        $$
        Q = \int_0^\pi \lambda_0 R\cos\frac\theta2\,\mathrm d\theta = \lambda_0 R\Big[2\sin\frac\theta2\Big]_0^\pi = 2\lambda_0 R
        \qquad
        \lambda_m = \frac{Q}{\pi R} = \frac{2}{\pi}\lambda_0
        $$

    !!! example "Plaque rectangulaire $2a \times 2b$, $\sigma = \sigma_0$ uniforme (diapo 25)"
        Cartésiennes, $-a \le x \le a$, $-b \le y \le b$, $\mathrm dq = \sigma_0\,\mathrm dx\,\mathrm dy$ :

        $$
        Q = \int_{-a}^{a}\!\!\int_{-b}^{b} \sigma_0\,\mathrm dx\,\mathrm dy = 4ab\,\sigma_0
        \qquad \sigma_m = \frac{Q}{4ab} = \sigma_0
        $$

        Logique : densité uniforme → la moyenne est la densité elle-même.

    !!! example "Cylindre creux, $\sigma(z) = \sigma_0\Big(1 - \dfrac{z^2}{L^2}\Big)$ (diapo 26)"
        Cylindriques, surface latérale $r = R$, $0 \le \theta \le 2\pi$, $0 \le z \le L$ :
        $\mathrm dS_r = R\,\mathrm d\theta\,\mathrm dz$.

        $$
        Q = \int_0^{2\pi}\!\!\int_0^L \sigma_0\Big(1 - \frac{z^2}{L^2}\Big)R\,\mathrm d\theta\,\mathrm dz
          = 2\pi R\sigma_0\Big[z - \frac{z^3}{3L^2}\Big]_0^L = \frac43\pi RL\,\sigma_0
        \qquad \sigma_m = \frac{Q}{2\pi RL} = \frac23\sigma_0
        $$

    !!! example "Boule, $\rho(r) = \rho_0\dfrac{R}{r}$ (diapo 27)"
        Sphériques, $\mathrm dV = r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\varphi$. Le $\dfrac1r$ de la
        densité « mange » un $r$ de $r^2$ :

        $$
        Q = \int_0^R\!\!\int_0^\pi\!\!\int_0^{2\pi} \rho_0\frac{R}{r}\,r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\varphi
          = \rho_0 R\int_0^R r\,\mathrm dr\times 4\pi = 2\pi R^3\rho_0
        \qquad \rho_m = \frac{Q}{\frac43\pi R^3} = \frac32\rho_0
        $$

    ## Pièges classiques

    !!! piege "Oublier le facteur $r$ (ou $r^2\sin\theta$)"
        $\mathrm dS = \mathrm dr\,\mathrm d\theta$ pour un disque est **faux** : c'est $r\,\mathrm dr\,\mathrm d\theta$.
        Vérification rapide : un $\mathrm dS$ doit être en m², un $\mathrm dV$ en m³. $\mathrm d\theta$ n'a pas
        d'unité, donc il faut un $r$ devant pour en faire une longueur.

    !!! piege "Densité non uniforme : elle reste dans l'intégrale"
        $Q = \sigma S$ ne marche **que** si $\sigma$ est constante. Si $\sigma$ dépend de $z$ (ou $\rho$ de $r$),
        on intègre $\sigma(z)\,\mathrm dS$ en gardant la dépendance.

    !!! piege "Les bornes de $\theta$ en sphériques"
        $\theta$ va de $0$ à $\pi$ (pas $2\pi$) : c'est $\varphi$ qui fait le tour complet. Avec $0$ à $2\pi$
        pour $\theta$, on trouve $\int\sin\theta = 0$ et une sphère d'aire nulle.

=== "Version papier"

    Les diapos du chapitre 2 telles que le prof les projette (support 2026-2027).

    [![Chapitre 2 — support 2026-2027, diapo 1 : Page de titre](papier/ch2/p01.jpg){ loading=lazy .papier }](papier/ch2/p01.jpg)
    <p class="papier-legende">Page de titre · Chapitre 2 — support 2026-2027, diapo 1</p>

    [![Chapitre 2 — support 2026-2027, diapo 2 : Partie A — Chapitre 2 : plan](papier/ch2/p02.jpg){ loading=lazy .papier }](papier/ch2/p02.jpg)
    <p class="papier-legende">Partie A — Chapitre 2 : plan · Chapitre 2 — support 2026-2027, diapo 2</p>

    [![Chapitre 2 — support 2026-2027, diapo 3 : Bases canoniques de l'espace](papier/ch2/p03.jpg){ loading=lazy .papier }](papier/ch2/p03.jpg)
    <p class="papier-legende">Bases canoniques de l'espace · Chapitre 2 — support 2026-2027, diapo 3</p>

    [![Chapitre 2 — support 2026-2027, diapo 4 : Base cartésienne](papier/ch2/p04.jpg){ loading=lazy .papier }](papier/ch2/p04.jpg)
    <p class="papier-legende">Base cartésienne · Chapitre 2 — support 2026-2027, diapo 4</p>

    [![Chapitre 2 — support 2026-2027, diapo 5 : Base polaire (du plan)](papier/ch2/p05.jpg){ loading=lazy .papier }](papier/ch2/p05.jpg)
    <p class="papier-legende">Base polaire (du plan) · Chapitre 2 — support 2026-2027, diapo 5</p>

    [![Chapitre 2 — support 2026-2027, diapo 6 : Base cylindrique](papier/ch2/p06.jpg){ loading=lazy .papier }](papier/ch2/p06.jpg)
    <p class="papier-legende">Base cylindrique · Chapitre 2 — support 2026-2027, diapo 6</p>

    [![Chapitre 2 — support 2026-2027, diapo 7 : Base sphérique](papier/ch2/p07.jpg){ loading=lazy .papier }](papier/ch2/p07.jpg)
    <p class="papier-legende">Base sphérique · Chapitre 2 — support 2026-2027, diapo 7</p>

    [![Chapitre 2 — support 2026-2027, diapo 8 : Métriques élémentaires de l'espace](papier/ch2/p08.jpg){ loading=lazy .papier }](papier/ch2/p08.jpg)
    <p class="papier-legende">Métriques élémentaires de l'espace · Chapitre 2 — support 2026-2027, diapo 8</p>

    [![Chapitre 2 — support 2026-2027, diapo 9 : Principe des métriques élémentaires](papier/ch2/p09.jpg){ loading=lazy .papier }](papier/ch2/p09.jpg)
    <p class="papier-legende">Principe des métriques élémentaires · Chapitre 2 — support 2026-2027, diapo 9</p>

    [![Chapitre 2 — support 2026-2027, diapo 10 : Métriques cartésiennes](papier/ch2/p10.jpg){ loading=lazy .papier }](papier/ch2/p10.jpg)
    <p class="papier-legende">Métriques cartésiennes · Chapitre 2 — support 2026-2027, diapo 10</p>

    [![Chapitre 2 — support 2026-2027, diapo 11 : Métriques cylindriques](papier/ch2/p11.jpg){ loading=lazy .papier }](papier/ch2/p11.jpg)
    <p class="papier-legende">Métriques cylindriques · Chapitre 2 — support 2026-2027, diapo 11</p>

    [![Chapitre 2 — support 2026-2027, diapo 12 : Métriques sphériques](papier/ch2/p12.jpg){ loading=lazy .papier }](papier/ch2/p12.jpg)
    <p class="papier-legende">Métriques sphériques · Chapitre 2 — support 2026-2027, diapo 12</p>

    [![Chapitre 2 — support 2026-2027, diapo 13 : Calculs de surfaces et de volumes](papier/ch2/p13.jpg){ loading=lazy .papier }](papier/ch2/p13.jpg)
    <p class="papier-legende">Calculs de surfaces et de volumes · Chapitre 2 — support 2026-2027, diapo 13</p>

    [![Chapitre 2 — support 2026-2027, diapo 14 : Principe du calcul](papier/ch2/p14.jpg){ loading=lazy .papier }](papier/ch2/p14.jpg)
    <p class="papier-legende">Principe du calcul · Chapitre 2 — support 2026-2027, diapo 14</p>

    [![Chapitre 2 — support 2026-2027, diapo 15 : Volume d'un parallélépipède](papier/ch2/p15.jpg){ loading=lazy .papier }](papier/ch2/p15.jpg)
    <p class="papier-legende">Volume d'un parallélépipède · Chapitre 2 — support 2026-2027, diapo 15</p>

    [![Chapitre 2 — support 2026-2027, diapo 16 : Surface d'un disque](papier/ch2/p16.jpg){ loading=lazy .papier }](papier/ch2/p16.jpg)
    <p class="papier-legende">Surface d'un disque · Chapitre 2 — support 2026-2027, diapo 16</p>

    [![Chapitre 2 — support 2026-2027, diapo 17 : Volume d'un cylindre](papier/ch2/p17.jpg){ loading=lazy .papier }](papier/ch2/p17.jpg)
    <p class="papier-legende">Volume d'un cylindre · Chapitre 2 — support 2026-2027, diapo 17</p>

    [![Chapitre 2 — support 2026-2027, diapo 18 : Surface d'une sphère](papier/ch2/p18.jpg){ loading=lazy .papier }](papier/ch2/p18.jpg)
    <p class="papier-legende">Surface d'une sphère · Chapitre 2 — support 2026-2027, diapo 18</p>

    [![Chapitre 2 — support 2026-2027, diapo 19 : Volume d'une boule](papier/ch2/p19.jpg){ loading=lazy .papier }](papier/ch2/p19.jpg)
    <p class="papier-legende">Volume d'une boule · Chapitre 2 — support 2026-2027, diapo 19</p>

    [![Chapitre 2 — support 2026-2027, diapo 20 : Calculs de charges distribuées dans l'espace](papier/ch2/p20.jpg){ loading=lazy .papier }](papier/ch2/p20.jpg)
    <p class="papier-legende">Calculs de charges distribuées dans l'espace · Chapitre 2 — support 2026-2027, diapo 20</p>

    [![Chapitre 2 — support 2026-2027, diapo 21 : Densité linéique de charge](papier/ch2/p21.jpg){ loading=lazy .papier }](papier/ch2/p21.jpg)
    <p class="papier-legende">Densité linéique de charge · Chapitre 2 — support 2026-2027, diapo 21</p>

    [![Chapitre 2 — support 2026-2027, diapo 22 : Densité surfacique de charge](papier/ch2/p22.jpg){ loading=lazy .papier }](papier/ch2/p22.jpg)
    <p class="papier-legende">Densité surfacique de charge · Chapitre 2 — support 2026-2027, diapo 22</p>

    [![Chapitre 2 — support 2026-2027, diapo 23 : Densité volumique de charge](papier/ch2/p23.jpg){ loading=lazy .papier }](papier/ch2/p23.jpg)
    <p class="papier-legende">Densité volumique de charge · Chapitre 2 — support 2026-2027, diapo 23</p>

    [![Chapitre 2 — support 2026-2027, diapo 24 : Calcul de charges totales (demi-cercle)](papier/ch2/p24.jpg){ loading=lazy .papier }](papier/ch2/p24.jpg)
    <p class="papier-legende">Calcul de charges totales (demi-cercle) · Chapitre 2 — support 2026-2027, diapo 24</p>

    [![Chapitre 2 — support 2026-2027, diapo 25 : Exemple : plaque rectangulaire](papier/ch2/p25.jpg){ loading=lazy .papier }](papier/ch2/p25.jpg)
    <p class="papier-legende">Exemple : plaque rectangulaire · Chapitre 2 — support 2026-2027, diapo 25</p>

    [![Chapitre 2 — support 2026-2027, diapo 26 : Exemple : cylindre creux](papier/ch2/p26.jpg){ loading=lazy .papier }](papier/ch2/p26.jpg)
    <p class="papier-legende">Exemple : cylindre creux · Chapitre 2 — support 2026-2027, diapo 26</p>

    [![Chapitre 2 — support 2026-2027, diapo 27 : Exemple : boule pleine](papier/ch2/p27.jpg){ loading=lazy .papier }](papier/ch2/p27.jpg)
    <p class="papier-legende">Exemple : boule pleine · Chapitre 2 — support 2026-2027, diapo 27</p>
