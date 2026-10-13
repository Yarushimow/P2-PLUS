---
title: "Ch. 1 — Force, champ, potentiel, énergie"
---

# Chapitre 1 — Force, champ, potentiel et énergie électrostatiques

=== "Version simplifiée"

    !!! abstract "Le fil du chapitre"
        Une charge $q$ crée autour d'elle un **champ** $\vec E$ (vecteur) et un **potentiel** $V$
        (scalaire). Une autre charge $Q$ placée dans ce champ subit une **force** $\vec F = Q\vec E$
        et possède une **énergie potentielle** $E_p = QV$. Tout le chapitre tient dans ces quatre
        grandeurs et dans les liens entre elles.

    ## Cadre : l'électrostatique

    L'électrostatique étudie les interactions entre **charges immobiles**. On se place en régime
    **stationnaire** (rien ne dépend du temps) : on peut alors étudier séparément l'électricité
    (partie A) et le magnétisme (partie B). Le couplage des deux (ondes) est pour SP401.

    | Particule | Charge |
    |-----------|--------|
    | Électron | $-e = -1{,}602 \times 10^{-19}$ C |
    | Proton | $+e$ |
    | Neutron | 0 |

    Un corps est **électrisé** quand il a gagné (charge −) ou perdu (charge +) des électrons.

    **Les quatre interactions fondamentales** (intensité relative) : forte [1], électromagnétique
    [$10^{-2}$], faible [$10^{-5}$], gravitationnelle [$10^{-39}$]. L'électromagnétique et la
    gravitation ont une portée infinie et décroissent en $1/r^2$.

    ## 1. Force électrostatique : la loi de Coulomb

    !!! theoreme "Loi de Coulomb (1785)"
        Deux charges ponctuelles $q_1$ (en $M_1$) et $q_2$ (en $M_2$) séparées de $r = M_1M_2$ :

        $$
        \vec F_{1\to 2} = k_e\,\frac{q_1 q_2}{r^2}\,\vec u_{12} = -\vec F_{2\to 1}
        \qquad\text{avec}\qquad \vec u_{12} = \frac{\overrightarrow{M_1M_2}}{r},\quad
        k_e = \frac{1}{4\pi\varepsilon_0} \simeq 9 \times 10^{9}\ \text{SI}
        $$

        - **direction** : la droite $(M_1M_2)$ ;
        - **sens** : répulsive si $q_1q_2 > 0$, attractive si $q_1q_2 < 0$ ;
        - **norme** : $F = k_e \dfrac{|q_1 q_2|}{r^2}$, en newtons.

    $\varepsilon_0 \simeq 8{,}85 \times 10^{-12}$ F/m est la **permittivité du vide**.

    !!! example "Atome d'hydrogène : Coulomb contre gravitation"
        Proton et électron à $r = 53$ pm :
        $F_e = k_e \dfrac{e^2}{r^2} \simeq 8{,}2 \times 10^{-8}$ N, alors que
        $F_g = G\dfrac{m_e m_p}{r^2} \simeq 3{,}6 \times 10^{-47}$ N.
        La gravitation est **totalement négligeable** à l'échelle atomique.

    ### Principe de superposition

    La force subie par $q$ (en $M$) de la part de $N$ charges $q_k$ (en $P_k$) est la **somme
    vectorielle** des forces prises une par une :

    $$
    \vec F(M) = \sum_{k=1}^{N} k_e\,\frac{q_k\,q}{r_k^2}\,\vec u_k
    \qquad r_k = P_kM,\quad \vec u_k = \frac{\overrightarrow{P_kM}}{r_k}
    $$

    !!! example "Triangle de charges (diapo 13)"
        $q_1 = q_2 = -e$ en $A$ et $B$ ($AB = d$), $q = 2e$ en $C$, triangle équilatéral, $O$
        milieu de $[AB]$, $\vec e_z = \overrightarrow{OC}/OC$.
        Les composantes horizontales s'annulent par symétrie ; il reste
        $\vec F(C) = -4k_e\dfrac{e^2}{d^3}\,\overrightarrow{OC}$ avec $OC = \dfrac{\sqrt3}{2}d$, soit

        $$
        \vec F(C) = -2\sqrt3\,k_e\,\frac{e^2}{d^2}\,\vec e_z
        $$

        (attractive : dirigée de $C$ vers $O$).

    ## 2. Champ électrique

    !!! definition "Champ d'une charge ponctuelle"
        Une charge $q$ placée en $O$ crée en tout point $M$ (sans charge) le champ

        $$
        \vec E(M) = k_e\,\frac{q}{r^2}\,\vec u \qquad r = OM,\quad \vec u = \frac{\overrightarrow{OM}}{r}
        $$

        - dirigé selon $(OM)$ ;
        - **centrifuge** (de $O$ vers $M$) si $q > 0$, **centripète** (vers $O$) si $q < 0$ ;
        - norme $E = k_e\dfrac{|q|}{r^2}$, en **N/C** ou **V/m**.

    Le champ vérifie aussi le **principe de superposition** :
    $\vec E(M) = \sum_k k_e \dfrac{q_k}{r_k^2}\,\vec u_k$.

    ### Lien champ ↔ force

    !!! theoreme "Force subie dans un champ"
        Une charge $Q$ placée en $M$ dans un champ $\vec E(M)$ subit

        $$
        \vec F(M) = Q\,\vec E(M)
        $$

        Même sens que $\vec E$ si $Q > 0$, sens contraire si $Q < 0$.

    Le champ est donc « la force par unité de charge » : il ne dépend que des charges **sources**,
    pas de la charge qu'on place pour le tester.

    !!! example "Le dipôle électrostatique (diapos 17 et 19)"
        $-q$ en $A$, $+q$ en $B$, $AB = 2a$, $O$ milieu, axe $(Ox)$ de $A$ vers $B$.

        - **En $O$** : les deux champs pointent vers $A$ (on s'éloigne de $+q$, on va vers $-q$) :
          $\vec E(O) = -2k_e\dfrac{q}{a^2}\,\vec e_x$.
        - **Sur la médiatrice**, avec $\alpha = \widehat{OMB}$ et $d = AM = BM = a/\sin\alpha$ :
          $\vec E(M) = k_e\dfrac{q}{d^3}\,\overrightarrow{BA} = -2k_e\dfrac{q}{a^2}\sin^3\alpha\;\vec e_x$.
        - Force sur $Q$ en $y = 2a$ : $\sin\alpha = 1/\sqrt5$, donc
          $\vec F = Q\vec E = -\dfrac{2}{5\sqrt5}\,k_e\dfrac{qQ}{a^2}\,\vec e_x$.

    ### Lignes de champ

    !!! definition "Ligne de champ"
        Courbe orientée, **tangente** à $\vec E$ en chacun de ses points et de même sens.

    - charge ponctuelle : demi-droites qui **partent** de $q > 0$ (vers l'infini) ou **arrivent**
      sur $q < 0$ ;
    - dipôle : lignes qui partent de $+q$ et se referment sur $-q$ ;
    - elles **ne se croisent jamais** et sont **resserrées** là où le champ est intense.

    ### Le condensateur plan

    Deux armatures planes de surface $S$, distantes de $d$ (petit devant leurs dimensions),
    chargées $+Q$ et $-Q$ sous la tension $U$. Entre les armatures, le champ est **uniforme** :
    perpendiculaire aux armatures, dirigé du **+ vers le −**, de norme

    $$
    E = \frac{U}{d}
    $$

    !!! example "Électron dans un condensateur (diapos 23-24)"
        Armatures en $x = \pm a$ ($-Q$ à gauche, $+Q$ à droite) : $\vec E = -\dfrac{U}{2a}\vec e_x$.
        L'électron subit $\vec F = -e\vec E = \dfrac{eU}{2a}\vec e_x$ (vers l'armature +).
        Théorème de l'énergie cinétique du centre à l'armature :
        $E_c = \vec F\cdot\overrightarrow{OP} = \dfrac{eU}{2}$. Sous 2 V : **1 eV** $= 1{,}6 \times 10^{-19}$ J.

    ## 3. Potentiel électrique

    ### Travail et circulation

    Le travail de $\vec F = Q\vec E$ le long d'un trajet $AB$ est
    $W_{AB} = \int_A^B \vec F\cdot \mathrm d\vec l = Q\int_A^B \vec E\cdot\mathrm d\vec l$.

    !!! definition "Circulation du champ"
        $$
        \mathcal C_{AB}(\vec E) = \int_A^B \vec E\cdot\mathrm d\vec l
        $$

    Pour une charge ponctuelle, $\vec E\cdot\mathrm d\vec l = k_e\dfrac{q}{r^2}\,\mathrm dr$, donc
    $\mathcal C_{AB} = \dfrac{k_e q}{r_A} - \dfrac{k_e q}{r_B}$ : la circulation ne dépend **que des
    extrémités**, pas du chemin suivi. C'est ce qui permet de définir le potentiel.

    !!! definition "Potentiel d'une charge ponctuelle"
        $$
        V(M) = k_e\,\frac{q}{r} \qquad (r = OM), \quad \text{en volts}
        $$

        Pour $N$ charges : $V(M) = \sum_k k_e\dfrac{q_k}{r_k}$ (somme de **scalaires**, pas de vecteurs).

    !!! theoreme "Les cinq remarques à retenir (diapo 28)"
        1. $\mathcal C_{AB}(\vec E) = V(A) - V(B) = -\Delta V = U_{AB}$ (la **tension**).
        2. La circulation est **conservative** : elle ne dépend pas du chemin.
        3. Les **équipotentielles** d'une charge ponctuelle sont des sphères centrées sur la charge.
        4. Le potentiel vérifie le principe de superposition.
        5. $V$ est défini **à une constante près** (la « masse ») ; souvent $V(\infty) = 0$.

    !!! example "Potentiel du dipôle sur la médiatrice"
        $V(M) = k_e q\left(\dfrac{1}{BM} - \dfrac{1}{AM}\right) = 0$ car $AM = BM$ : la médiatrice est
        une équipotentielle $V = 0$… alors que le champ n'y est **pas** nul.

    ### Relation champ-potentiel

    En partant de $\vec E\cdot\mathrm d\vec l = -\mathrm dV$ et en identifiant les coefficients de
    $\mathrm dx$, $\mathrm dy$, $\mathrm dz$ :

    !!! theoreme "Relation potentiel-champ"
        $$
        \vec E = -\overrightarrow{\mathrm{grad}}\,V
        \qquad\Longleftrightarrow\qquad
        E_x = -\frac{\partial V}{\partial x},\quad E_y = -\frac{\partial V}{\partial y},\quad E_z = -\frac{\partial V}{\partial z}
        $$

    | Coordonnées | $\overrightarrow{\mathrm{grad}}\,V$ |
    |-------------|------------------------------|
    | Cartésiennes $(x, y, z)$ | $\dfrac{\partial V}{\partial x}\vec e_x + \dfrac{\partial V}{\partial y}\vec e_y + \dfrac{\partial V}{\partial z}\vec e_z$ |
    | Polaires $(r, \theta)$ | $\dfrac{\partial V}{\partial r}\vec e_r + \dfrac{1}{r}\dfrac{\partial V}{\partial \theta}\vec e_\theta$ |
    | Cylindriques $(r, \theta, z)$ | $\dfrac{\partial V}{\partial r}\vec e_r + \dfrac{1}{r}\dfrac{\partial V}{\partial \theta}\vec e_\theta + \dfrac{\partial V}{\partial z}\vec e_z$ |
    | Sphériques $(r, \theta, \varphi)$ | $\dfrac{\partial V}{\partial r}\vec e_r + \dfrac{1}{r}\dfrac{\partial V}{\partial \theta}\vec e_\theta + \dfrac{1}{r\sin\theta}\dfrac{\partial V}{\partial \varphi}\vec e_\varphi$ |

    Conséquences : $\vec E$ est **perpendiculaire aux équipotentielles** et pointe vers les
    **potentiels décroissants**.

    !!! example "Potentiel dans le condensateur plan (diapo 32)"
        On ne peut pas utiliser $V = k_e q/r$ : la distribution n'est pas ponctuelle. Avec
        $E_x = U/d = -\mathrm dV/\mathrm dx$ : $V(x) = -\dfrac{U}{d}x + V_0$. En prenant $V = 0$ sur
        l'armature − ($x = d/2$) : $V(x) = \dfrac{d - 2x}{2d}\,U$ et $V(-d/2) = U$.
        Équipotentielles : plans parallèles aux armatures.

    !!! example "Champ du dipôle par le gradient (diapos 33-34)"
        $V(r, \theta) = 2k_e\dfrac{aq\cos\theta}{r^2}$, donc

        $$
        \vec E = -\frac{\partial V}{\partial r}\vec e_r - \frac{1}{r}\frac{\partial V}{\partial \theta}\vec e_\theta
        = 4k_e\frac{aq\cos\theta}{r^3}\,\vec e_r + 2k_e\frac{aq\sin\theta}{r^3}\,\vec e_\theta
        $$

        Sur $(Ox)$, $x > 0$ : $\vec E = \dfrac{4k_e aq}{x^3}\vec e_x$. Sur $(Oy)$, $y > 0$ ($\vec e_\theta = -\vec e_x$) :
        $\vec E = -\dfrac{2k_e aq}{y^3}\vec e_x$. Le champ du dipôle décroît en $1/r^3$.

    ## 4. Énergie potentielle électrique

    Amener $Q$ de l'infini jusqu'en $M$ contre la force électrique demande un travail, stocké sous
    forme d'énergie potentielle (comme un ressort qu'on comprime) :
    $E_p(M) - E_p(\infty) = -W_{\infty\to M}(\vec F_{élec}) = Q\,[V(M) - V(\infty)]$.

    !!! theoreme "Énergie potentielle électrique"
        Avec $E_p$ et $V$ nuls à l'infini :

        $$
        E_p = Q\,V \qquad \text{(en joules)}
        $$

    !!! example "Énergie de l'électron de l'atome d'hydrogène (diapos 37-38)"
        1. $V_+ = k_e\dfrac{e}{r}$ donc $E_p = -eV_+ = -k_e\dfrac{e^2}{r}$.
        2. PFD (mouvement circulaire) : $k_e\dfrac{e^2}{r^2} = m_e\dfrac{v^2}{r}$, d'où
           $v = \sqrt{\dfrac{k_e e^2}{m_e r}} \simeq 2{,}19 \times 10^6$ m/s $< 0{,}1c$ (mécanique classique
           justifiée) et $E_c = \dfrac{k_e e^2}{2r}$.
        3. $E_m = E_p + E_c = -\dfrac{k_e e^2}{2r} < 0$ : l'électron est **lié**. Pour l'arracher il faut
           fournir au moins $|E_m|$ (énergie d'ionisation).

    ## 5. Distributions continues de charges

    Quand les charges sont trop nombreuses pour être comptées une à une, on découpe l'objet en
    morceaux infinitésimaux de charge $\mathrm dQ$.

    | Distribution | Exemples | Densité | $\mathrm dQ$ | Charge totale |
    |--------------|----------|---------|--------------|---------------|
    | Linéique | fil, anneau | $\lambda$ (C/m) | $\lambda\,\mathrm dl$ | $Q = \int_L \lambda\,\mathrm dl$ |
    | Surfacique | disque, plaque, coque | $\sigma$ (C/m²) | $\sigma\,\mathrm dS$ | $Q = \iint_S \sigma\,\mathrm dS$ |
    | Volumique | boule, cylindre plein | $\rho$ (C/m³) | $\rho\,\mathrm d\tau$ | $Q = \iiint_V \rho\,\mathrm d\tau$ |

    Chaque $\mathrm dQ$ se comporte comme une charge ponctuelle :
    $\mathrm d\vec E = k_e\dfrac{\mathrm dQ}{r^2}\vec u$ et $\mathrm dV = k_e\dfrac{\mathrm dQ}{r}$, puis on intègre.

    !!! methode "Calculer une charge totale"
        1. Choisir le système de coordonnées adapté à la forme (voir [chapitre 2](chapitre-2-coordonnees-gauss.md)).
        2. Écrire l'élément $\mathrm dl$, $\mathrm dS$ ou $\mathrm d\tau$ correspondant.
        3. Remplacer la densité par son expression (elle peut dépendre de $r$, $\theta$…).
        4. Séparer les intégrales et poser les bornes (demi-sphère : $\theta \in [0, \pi/2]$).

    !!! example "Anneau chargé (support 2024, diapo 28)"
        Anneau de rayon $R$, densité $\lambda$ uniforme, point $M$ sur l'axe à la cote $z$.
        Par symétrie, $\vec E$ est porté par $(Oz)$ : seules les composantes $\mathrm dE_z$ s'ajoutent.
        Chaque $\mathrm dQ = \lambda R\,\mathrm d\theta$ est à la distance $\sqrt{R^2 + z^2}$, et
        $\mathrm dE_z = k_e\dfrac{\mathrm dQ}{R^2 + z^2}\cos\beta$ avec $\cos\beta = \dfrac{z}{\sqrt{R^2+z^2}}$ :

        $$
        E_z = \frac{k_e\,\lambda\,2\pi R\,z}{(R^2 + z^2)^{3/2}},
        \qquad
        V(z) = \frac{k_e\,\lambda\,2\pi R}{\sqrt{R^2 + z^2}}
        $$

        Vérification : $E_z = -\mathrm dV/\mathrm dz$ ✓, et loin de l'anneau on retrouve $k_eQ/z^2$.

    ## Pièges classiques

    !!! piege "Vecteur ou scalaire ?"
        Le champ et la force s'additionnent **vectoriellement** (attention aux compensations par
        symétrie). Le potentiel et l'énergie s'additionnent **algébriquement** (avec le signe des
        charges). Un champ nul n'implique pas un potentiel nul, et inversement.

    !!! piege "Le sens de $\vec u$"
        Dans $k_e\dfrac{q}{r^2}\vec u$, le vecteur $\vec u$ va **de la source vers le point**
        d'observation. C'est le signe de $q$ qui retourne le champ, pas le choix de $\vec u$.

=== "Version papier"

    Les diapos du chapitre 1 telles que le prof les projette (support 2026-2027).

    [![Chapitre 1 — support 2026-2027, diapo 1 : Page de titre](papier/ch1/p01.jpg){ loading=lazy .papier }](papier/ch1/p01.jpg)
    <p class="papier-legende">Page de titre · Chapitre 1 — support 2026-2027, diapo 1</p>

    [![Chapitre 1 — support 2026-2027, diapo 2 : Partie A — Chapitre 1](papier/ch1/p02.jpg){ loading=lazy .papier }](papier/ch1/p02.jpg)
    <p class="papier-legende">Partie A — Chapitre 1 · Chapitre 1 — support 2026-2027, diapo 2</p>

    [![Chapitre 1 — support 2026-2027, diapo 3 : Introduction](papier/ch1/p03.jpg){ loading=lazy .papier }](papier/ch1/p03.jpg)
    <p class="papier-legende">Introduction · Chapitre 1 — support 2026-2027, diapo 3</p>

    [![Chapitre 1 — support 2026-2027, diapo 4 : Les constituants de la matière](papier/ch1/p04.jpg){ loading=lazy .papier }](papier/ch1/p04.jpg)
    <p class="papier-legende">Les constituants de la matière · Chapitre 1 — support 2026-2027, diapo 4</p>

    [![Chapitre 1 — support 2026-2027, diapo 5 : Les interactions fondamentales](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">Les interactions fondamentales · Chapitre 1 — support 2026-2027, diapo 5</p>

    [![Chapitre 1 — support 2026-2027, diapo 6 : Électrostatique](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">Électrostatique · Chapitre 1 — support 2026-2027, diapo 6</p>

    [![Chapitre 1 — support 2026-2027, diapo 7 : Avertissement d'appellation](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">Avertissement d'appellation · Chapitre 1 — support 2026-2027, diapo 7</p>

    [![Chapitre 1 — support 2026-2027, diapo 8 : Force électrostatique](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">Force électrostatique · Chapitre 1 — support 2026-2027, diapo 8</p>

    [![Chapitre 1 — support 2026-2027, diapo 9 : Force électrostatique d'une charge ponctuelle](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">Force électrostatique d'une charge ponctuelle · Chapitre 1 — support 2026-2027, diapo 9</p>

    [![Chapitre 1 — support 2026-2027, diapo 10 : Loi de Coulomb](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">Loi de Coulomb · Chapitre 1 — support 2026-2027, diapo 10</p>

    [![Chapitre 1 — support 2026-2027, diapo 11 : Application : l'atome d'hydrogène](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">Application : l'atome d'hydrogène · Chapitre 1 — support 2026-2027, diapo 11</p>

    [![Chapitre 1 — support 2026-2027, diapo 12 : Principe de superposition](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">Principe de superposition · Chapitre 1 — support 2026-2027, diapo 12</p>

    [![Chapitre 1 — support 2026-2027, diapo 13 : Application : triangle de charges](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">Application : triangle de charges · Chapitre 1 — support 2026-2027, diapo 13</p>

    [![Chapitre 1 — support 2026-2027, diapo 14 : Champ électrique](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">Champ électrique · Chapitre 1 — support 2026-2027, diapo 14</p>

    [![Chapitre 1 — support 2026-2027, diapo 15 : Analogie avec l'interaction gravitationnelle](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">Analogie avec l'interaction gravitationnelle · Chapitre 1 — support 2026-2027, diapo 15</p>

    [![Chapitre 1 — support 2026-2027, diapo 16 : Champ électrique d'une charge ponctuelle](papier/ch1/p16.jpg){ loading=lazy .papier }](papier/ch1/p16.jpg)
    <p class="papier-legende">Champ électrique d'une charge ponctuelle · Chapitre 1 — support 2026-2027, diapo 16</p>

    [![Chapitre 1 — support 2026-2027, diapo 17 : Application : le dipôle électrostatique](papier/ch1/p17.jpg){ loading=lazy .papier }](papier/ch1/p17.jpg)
    <p class="papier-legende">Application : le dipôle électrostatique · Chapitre 1 — support 2026-2027, diapo 17</p>

    [![Chapitre 1 — support 2026-2027, diapo 18 : Lien entre champ et force](papier/ch1/p18.jpg){ loading=lazy .papier }](papier/ch1/p18.jpg)
    <p class="papier-legende">Lien entre champ et force · Chapitre 1 — support 2026-2027, diapo 18</p>

    [![Chapitre 1 — support 2026-2027, diapo 19 : Application : le dipôle électrostatique (force)](papier/ch1/p19.jpg){ loading=lazy .papier }](papier/ch1/p19.jpg)
    <p class="papier-legende">Application : le dipôle électrostatique (force) · Chapitre 1 — support 2026-2027, diapo 19</p>

    [![Chapitre 1 — support 2026-2027, diapo 20 : Structure spatiale du champ électrique](papier/ch1/p20.jpg){ loading=lazy .papier }](papier/ch1/p20.jpg)
    <p class="papier-legende">Structure spatiale du champ électrique · Chapitre 1 — support 2026-2027, diapo 20</p>

    [![Chapitre 1 — support 2026-2027, diapo 21 : Lignes de champ](papier/ch1/p21.jpg){ loading=lazy .papier }](papier/ch1/p21.jpg)
    <p class="papier-legende">Lignes de champ · Chapitre 1 — support 2026-2027, diapo 21</p>

    [![Chapitre 1 — support 2026-2027, diapo 22 : Application : le condensateur plan](papier/ch1/p22.jpg){ loading=lazy .papier }](papier/ch1/p22.jpg)
    <p class="papier-legende">Application : le condensateur plan · Chapitre 1 — support 2026-2027, diapo 22</p>

    [![Chapitre 1 — support 2026-2027, diapo 23 : Application : le condensateur plan (énoncé)](papier/ch1/p23.jpg){ loading=lazy .papier }](papier/ch1/p23.jpg)
    <p class="papier-legende">Application : le condensateur plan (énoncé) · Chapitre 1 — support 2026-2027, diapo 23</p>

    [![Chapitre 1 — support 2026-2027, diapo 24 : Application : le condensateur plan (réponses)](papier/ch1/p24.jpg){ loading=lazy .papier }](papier/ch1/p24.jpg)
    <p class="papier-legende">Application : le condensateur plan (réponses) · Chapitre 1 — support 2026-2027, diapo 24</p>

    [![Chapitre 1 — support 2026-2027, diapo 25 : Potentiel électrique](papier/ch1/p25.jpg){ loading=lazy .papier }](papier/ch1/p25.jpg)
    <p class="papier-legende">Potentiel électrique · Chapitre 1 — support 2026-2027, diapo 25</p>

    [![Chapitre 1 — support 2026-2027, diapo 26 : Travail de la force de Coulomb](papier/ch1/p26.jpg){ loading=lazy .papier }](papier/ch1/p26.jpg)
    <p class="papier-legende">Travail de la force de Coulomb · Chapitre 1 — support 2026-2027, diapo 26</p>

    [![Chapitre 1 — support 2026-2027, diapo 27 : Circulation du champ d'une charge ponctuelle](papier/ch1/p27.jpg){ loading=lazy .papier }](papier/ch1/p27.jpg)
    <p class="papier-legende">Circulation du champ d'une charge ponctuelle · Chapitre 1 — support 2026-2027, diapo 27</p>

    [![Chapitre 1 — support 2026-2027, diapo 28 : Potentiel créé par une charge ponctuelle](papier/ch1/p28.jpg){ loading=lazy .papier }](papier/ch1/p28.jpg)
    <p class="papier-legende">Potentiel créé par une charge ponctuelle · Chapitre 1 — support 2026-2027, diapo 28</p>

    [![Chapitre 1 — support 2026-2027, diapo 29 : Application : potentiel du dipôle](papier/ch1/p29.jpg){ loading=lazy .papier }](papier/ch1/p29.jpg)
    <p class="papier-legende">Application : potentiel du dipôle · Chapitre 1 — support 2026-2027, diapo 29</p>

    [![Chapitre 1 — support 2026-2027, diapo 30 : Relation potentiel-champ](papier/ch1/p30.jpg){ loading=lazy .papier }](papier/ch1/p30.jpg)
    <p class="papier-legende">Relation potentiel-champ · Chapitre 1 — support 2026-2027, diapo 30</p>

    [![Chapitre 1 — support 2026-2027, diapo 31 : Relation potentiel-champ (gradient)](papier/ch1/p31.jpg){ loading=lazy .papier }](papier/ch1/p31.jpg)
    <p class="papier-legende">Relation potentiel-champ (gradient) · Chapitre 1 — support 2026-2027, diapo 31</p>

    [![Chapitre 1 — support 2026-2027, diapo 32 : Application : potentiel du condensateur plan](papier/ch1/p32.jpg){ loading=lazy .papier }](papier/ch1/p32.jpg)
    <p class="papier-legende">Application : potentiel du condensateur plan · Chapitre 1 — support 2026-2027, diapo 32</p>

    [![Chapitre 1 — support 2026-2027, diapo 33 : Application : champ du dipôle par le gradient (énoncé)](papier/ch1/p33.jpg){ loading=lazy .papier }](papier/ch1/p33.jpg)
    <p class="papier-legende">Application : champ du dipôle par le gradient (énoncé) · Chapitre 1 — support 2026-2027, diapo 33</p>

    [![Chapitre 1 — support 2026-2027, diapo 34 : Application : champ du dipôle par le gradient (réponses)](papier/ch1/p34.jpg){ loading=lazy .papier }](papier/ch1/p34.jpg)
    <p class="papier-legende">Application : champ du dipôle par le gradient (réponses) · Chapitre 1 — support 2026-2027, diapo 34</p>

    [![Chapitre 1 — support 2026-2027, diapo 35 : Énergie potentielle électrique](papier/ch1/p35.jpg){ loading=lazy .papier }](papier/ch1/p35.jpg)
    <p class="papier-legende">Énergie potentielle électrique · Chapitre 1 — support 2026-2027, diapo 35</p>

    [![Chapitre 1 — support 2026-2027, diapo 36 : Définition de l'énergie potentielle électrique](papier/ch1/p36.jpg){ loading=lazy .papier }](papier/ch1/p36.jpg)
    <p class="papier-legende">Définition de l'énergie potentielle électrique · Chapitre 1 — support 2026-2027, diapo 36</p>

    [![Chapitre 1 — support 2026-2027, diapo 37 : Application : énergie de l'atome d'hydrogène (énoncé)](papier/ch1/p37.jpg){ loading=lazy .papier }](papier/ch1/p37.jpg)
    <p class="papier-legende">Application : énergie de l'atome d'hydrogène (énoncé) · Chapitre 1 — support 2026-2027, diapo 37</p>

    [![Chapitre 1 — support 2026-2027, diapo 38 : Application : énergie de l'atome d'hydrogène (réponses)](papier/ch1/p38.jpg){ loading=lazy .papier }](papier/ch1/p38.jpg)
    <p class="papier-legende">Application : énergie de l'atome d'hydrogène (réponses) · Chapitre 1 — support 2026-2027, diapo 38</p>

    ### Compléments du support 2024-2025

    Le support 2026-2027 s'arrête à l'énergie potentielle : les distributions continues et le
    tableau des gradients viennent du support de l'an dernier.

    [![Chapitre 1 — support 2024-2025, diapo 21 : Le gradient dans les différents systèmes de coordonnées](papier/ch1-2024/p21.jpg){ loading=lazy .papier }](papier/ch1-2024/p21.jpg)
    <p class="papier-legende">Le gradient dans les différents systèmes de coordonnées · Chapitre 1 — support 2024-2025, diapo 21</p>

    [![Chapitre 1 — support 2024-2025, diapo 25 : Distributions continues : linéique, surfacique, volumique](papier/ch1-2024/p25.jpg){ loading=lazy .papier }](papier/ch1-2024/p25.jpg)
    <p class="papier-legende">Distributions continues : linéique, surfacique, volumique · Chapitre 1 — support 2024-2025, diapo 25</p>

    [![Chapitre 1 — support 2024-2025, diapo 26 : Charge totale d'une distribution continue](papier/ch1-2024/p26.jpg){ loading=lazy .papier }](papier/ch1-2024/p26.jpg)
    <p class="papier-legende">Charge totale d'une distribution continue · Chapitre 1 — support 2024-2025, diapo 26</p>

    [![Chapitre 1 — support 2024-2025, diapo 27 : Champ créé par une distribution continue](papier/ch1-2024/p27.jpg){ loading=lazy .papier }](papier/ch1-2024/p27.jpg)
    <p class="papier-legende">Champ créé par une distribution continue · Chapitre 1 — support 2024-2025, diapo 27</p>

    [![Chapitre 1 — support 2024-2025, diapo 28 : Application : anneau chargé](papier/ch1-2024/p28.jpg){ loading=lazy .papier }](papier/ch1-2024/p28.jpg)
    <p class="papier-legende">Application : anneau chargé · Chapitre 1 — support 2024-2025, diapo 28</p>
