---
title: "Ch. 2 — Équations de Maxwell"
---

# Chapitre 2 — Équations locales de l'électromagnétisme

=== "Version simplifiée"

    Une **onde électromagnétique** est une oscillation couplée d'un champ électrique
    $\vec E$ et d'un champ magnétique $\vec B$, produite par des charges en mouvement.
    Elle se propage dans le vide comme dans la matière et transporte de l'énergie et
    de l'information (radio, téléphone, rayons X, laser…).

    ## Les quatre équations de Maxwell

    Elles sont **locales** : valables en tout point, à tout instant, dans n'importe quel milieu.

    !!! theoreme "Équations de Maxwell"

        | Nom | Équation | Forme intégrale (S3) |
        |---|---|---|
        | Maxwell-**Gauss** | $\text{div}\,\vec E = \dfrac{\rho}{\varepsilon}$ | théorème de Gauss |
        | Maxwell-**Thomson** (flux) | $\text{div}\,\vec B = 0$ | flux de $\vec B$ conservatif |
        | Maxwell-**Faraday** | $\overrightarrow{\text{rot}}\,\vec E = -\dfrac{\partial \vec B}{\partial t}$ | loi de Faraday |
        | Maxwell-**Ampère** | $\overrightarrow{\text{rot}}\,\vec B = \mu\vec J + \mu\varepsilon\dfrac{\partial \vec E}{\partial t}$ | théorème d'Ampère généralisé |

        Dans le vide : $\rho = 0$, $\vec J = \vec 0$, $\varepsilon = \varepsilon_0$, $\mu = \mu_0$.

    **Comment on les obtient** (exemple de Gauss) : $\oint\!\!\oint \vec E \cdot \overrightarrow{dS} = \frac{1}{\varepsilon}\iiint \rho\,d\tau$,
    puis Green-Ostrogradski transforme le flux en $\iiint \text{div}\,\vec E\,d\tau$. L'égalité vaut pour tout
    volume, donc les intégrandes sont égales : $\text{div}\,\vec E = \rho/\varepsilon$. Même idée pour
    Faraday et Ampère avec Stokes.

    !!! definition "Ce que chaque équation veut dire"
        - **Gauss** : les charges sont les **sources** de $\vec E$. Les lignes de champ partent des charges $+$ et convergent vers les charges $-$.
        - **Thomson** : $\vec B$ n'a **pas de source** : les lignes de champ se referment (elles vont d'un pôle à l'autre de l'aimant). Il **n'existe pas de monopôle magnétique** : un aimant cassé en deux donne deux aimants.
        - **Faraday** : un $\vec B$ **variable** crée un $\vec E$ qui « tourne » autour de lui : c'est l'induction.
        - **Ampère** : $\vec B$ tourne autour des courants **et** autour d'un $\vec E$ variable. Le terme $\mu\varepsilon\,\partial\vec E/\partial t$ (courant de déplacement) est l'ajout de Maxwell.

    !!! tip "Couplage = propagation"
        Faraday et Ampère couplent $\vec E$ et $\vec B$ : un $\vec E$ qui varie crée un $\vec B$ qui varie,
        qui recrée un $\vec E$… C'est ce va-et-vient qui fait **se propager** l'onde, même sans charge ni courant.

    ## Équations de propagation

    On prend le rotationnel de Maxwell-Faraday, puis on utilise
    $\overrightarrow{\text{rot}}(\overrightarrow{\text{rot}}\,\vec E) = \overrightarrow{\text{grad}}(\text{div}\,\vec E) - \Delta\vec E$ :

    $$
    \overrightarrow{\text{grad}}\left(\frac{\rho}{\varepsilon}\right) - \Delta\vec E
    = -\frac{\partial}{\partial t}\overrightarrow{\text{rot}}\,\vec B
    = -\mu\frac{\partial \vec J}{\partial t} - \mu\varepsilon\frac{\partial^2\vec E}{\partial t^2}
    $$

    !!! theoreme "Équation de propagation de $\vec E$ (milieu quelconque)"

        $$
        \Delta\vec E - \mu\varepsilon\frac{\partial^2\vec E}{\partial t^2} = \overrightarrow{\text{grad}}\left(\frac{\rho}{\varepsilon}\right) + \mu\frac{\partial\vec J}{\partial t}
        $$

        Dans le vide, le second membre est nul : $\Delta\vec E - \mu_0\varepsilon_0\dfrac{\partial^2\vec E}{\partial t^2} = \vec 0$, et pareil pour $\vec B$.

    $\mu_0\varepsilon_0$ s'exprime en s²/m² (on compare $\Delta \vec E$, en V/m³, à $\partial^2\vec E/\partial t^2$, en V/(m·s²)).
    $\dfrac{1}{\sqrt{\mu_0\varepsilon_0}}$ est donc une **vitesse** : c'est $c \approx 3\cdot10^8$ m/s.

    ## Induction électromagnétique

    !!! definition "Induction"
        Apparition d'un **courant induit** dans un circuit quand le flux de $\vec B$ à travers ce circuit varie :
        soit $\vec B$ varie (aimant qui bouge, courant variable), soit le circuit bouge ou se déforme dans un $\vec B$ fixe.

    !!! theoreme "Loi de Faraday"

        $$
        e = -\frac{d\Phi}{dt} \qquad \Phi = \iint_S \vec B \cdot \overrightarrow{dS} \ \ (\text{en Wb})
        $$

        $e$ est la **force électromotrice** induite (en V). Le circuit se comporte comme un générateur de fem $e$ :
        avec une résistance $R$, $i = e/R$.

    - La fem est la circulation du champ électromoteur : $e = \oint \vec E_m \cdot \overrightarrow{dl}$, c'est-à-dire le travail fourni par unité de charge.
    - **Loi de Lenz** (le signe $-$) : les effets de l'induction **s'opposent à leur cause**. Si le flux augmente, le courant induit crée un champ qui le fait diminuer.

    !!! methode "Calculer un courant induit"
        1. **Orienter** le circuit (sens de $i$ positif), ce qui fixe $\overrightarrow{dS}$ par la règle de la main droite.
        2. Calculer $\Phi(t) = \iint \vec B \cdot \overrightarrow{dS}$ (souvent $B\,S\cos\theta$ si $\vec B$ est uniforme).
        3. $e = -d\Phi/dt$, puis $i = e/R$ (ou avec l'inductance, voir ci-dessous).
        4. Vérifier le signe avec Lenz.

    ## Auto-induction

    Un circuit parcouru par un courant **variable** $i(t)$ crée un $\vec B$ variable, donc un flux
    variable à travers lui-même : il s'induit une fem qui s'oppose à la variation de $i$.

    $$
    \Phi_{propre} = L\,i \qquad e = -L\frac{di}{dt}
    $$

    $L$ est l'**inductance** (en henry, H). Elle ne dépend que de la géométrie du circuit.

=== "Version papier"

    Les diapos du chapitre 2 (support 2024-2025), puis la suite du chapitre sur l'induction.

    <!-- papier: pdf/SP401P/ch2.pdf | Chapitre 2 — équations de Maxwell | ch2 | diapo -->

    [![Chapitre 2 — équations de Maxwell, diapo 1 : Chapitre 2](papier/ch2/p01.jpg){ loading=lazy .papier }](papier/ch2/p01.jpg)
    <p class="papier-legende">Chapitre 2 · Chapitre 2 — équations de Maxwell, diapo 1</p>

    [![Chapitre 2 — équations de Maxwell, diapo 2](papier/ch2/p02.jpg){ loading=lazy .papier }](papier/ch2/p02.jpg)
    <p class="papier-legende">Chapitre 2 — équations de Maxwell, diapo 2</p>

    [![Chapitre 2 — équations de Maxwell, diapo 3 : I. Introduction](papier/ch2/p03.jpg){ loading=lazy .papier }](papier/ch2/p03.jpg)
    <p class="papier-legende">I. Introduction · Chapitre 2 — équations de Maxwell, diapo 3</p>

    [![Chapitre 2 — équations de Maxwell, diapo 4 : II. Equations de Maxwell](papier/ch2/p04.jpg){ loading=lazy .papier }](papier/ch2/p04.jpg)
    <p class="papier-legende">II. Equations de Maxwell · Chapitre 2 — équations de Maxwell, diapo 4</p>

    [![Chapitre 2 — équations de Maxwell, diapo 5 : II. 1 Première équation de Maxwell](papier/ch2/p05.jpg){ loading=lazy .papier }](papier/ch2/p05.jpg)
    <p class="papier-legende">II. 1 Première équation de Maxwell · Chapitre 2 — équations de Maxwell, diapo 5</p>

    [![Chapitre 2 — équations de Maxwell, diapo 6 : Divergence du champ électrique](papier/ch2/p06.jpg){ loading=lazy .papier }](papier/ch2/p06.jpg)
    <p class="papier-legende">Divergence du champ électrique · Chapitre 2 — équations de Maxwell, diapo 6</p>

    [![Chapitre 2 — équations de Maxwell, diapo 7 : II.2 Deuxième équation de](papier/ch2/p07.jpg){ loading=lazy .papier }](papier/ch2/p07.jpg)
    <p class="papier-legende">II.2 Deuxième équation de · Chapitre 2 — équations de Maxwell, diapo 7</p>

    [![Chapitre 2 — équations de Maxwell, diapo 8](papier/ch2/p08.jpg){ loading=lazy .papier }](papier/ch2/p08.jpg)
    <p class="papier-legende">Chapitre 2 — équations de Maxwell, diapo 8</p>

    [![Chapitre 2 — équations de Maxwell, diapo 9 : II.3 Troisième équation de Maxwell :](papier/ch2/p09.jpg){ loading=lazy .papier }](papier/ch2/p09.jpg)
    <p class="papier-legende">II.3 Troisième équation de Maxwell : · Chapitre 2 — équations de Maxwell, diapo 9</p>

    [![Chapitre 2 — équations de Maxwell, diapo 10 : Le déplacement de la plaque rend le flux qui la traverse variable,](papier/ch2/p10.jpg){ loading=lazy .papier }](papier/ch2/p10.jpg)
    <p class="papier-legende">Le déplacement de la plaque rend le flux qui la traverse variable, · Chapitre 2 — équations de Maxwell, diapo 10</p>

    [![Chapitre 2 — équations de Maxwell, diapo 11 : II.4 Quatrième équation de Maxwell](papier/ch2/p11.jpg){ loading=lazy .papier }](papier/ch2/p11.jpg)
    <p class="papier-legende">II.4 Quatrième équation de Maxwell · Chapitre 2 — équations de Maxwell, diapo 11</p>

    [![Chapitre 2 — équations de Maxwell, diapo 12 : signifie que :](papier/ch2/p12.jpg){ loading=lazy .papier }](papier/ch2/p12.jpg)
    <p class="papier-legende">signifie que : · Chapitre 2 — équations de Maxwell, diapo 12</p>

    [![Chapitre 2 — équations de Maxwell, diapo 13 : III. Equations de propagation.](papier/ch2/p13.jpg){ loading=lazy .papier }](papier/ch2/p13.jpg)
    <p class="papier-legende">III. Equations de propagation. · Chapitre 2 — équations de Maxwell, diapo 13</p>

    [![Chapitre 2 — équations de Maxwell, diapo 14](papier/ch2/p14.jpg){ loading=lazy .papier }](papier/ch2/p14.jpg)
    <p class="papier-legende">Chapitre 2 — équations de Maxwell, diapo 14</p>

    <!-- /papier -->

    <!-- papier: pdf/SP401P/ch2-suite.pdf | Chapitre 2 (suite) — induction | ch2-suite | diapo -->

    [![Chapitre 2 (suite) — induction, diapo 1 : Suite Chapitre 2:](papier/ch2-suite/p01.jpg){ loading=lazy .papier }](papier/ch2-suite/p01.jpg)
    <p class="papier-legende">Suite Chapitre 2: · Chapitre 2 (suite) — induction, diapo 1</p>

    [![Chapitre 2 (suite) — induction, diapo 2 : Plan du cours](papier/ch2-suite/p02.jpg){ loading=lazy .papier }](papier/ch2-suite/p02.jpg)
    <p class="papier-legende">Plan du cours · Chapitre 2 (suite) — induction, diapo 2</p>

    [![Chapitre 2 (suite) — induction, diapo 3 : 1. Induction électromagnétique: définition et création](papier/ch2-suite/p03.jpg){ loading=lazy .papier }](papier/ch2-suite/p03.jpg)
    <p class="papier-legende">1. Induction électromagnétique: définition et création · Chapitre 2 (suite) — induction, diapo 3</p>

    [![Chapitre 2 (suite) — induction, diapo 4 : 1. Induction électromagnétique: définition et création](papier/ch2-suite/p04.jpg){ loading=lazy .papier }](papier/ch2-suite/p04.jpg)
    <p class="papier-legende">1. Induction électromagnétique: définition et création · Chapitre 2 (suite) — induction, diapo 4</p>

    [![Chapitre 2 (suite) — induction, diapo 5 : 2.1. Enoncé de la loi de Faraday](papier/ch2-suite/p05.jpg){ loading=lazy .papier }](papier/ch2-suite/p05.jpg)
    <p class="papier-legende">2.1. Enoncé de la loi de Faraday · Chapitre 2 (suite) — induction, diapo 5</p>

    [![Chapitre 2 (suite) — induction, diapo 6 : 2.2. Force électromotrice induite](papier/ch2-suite/p06.jpg){ loading=lazy .papier }](papier/ch2-suite/p06.jpg)
    <p class="papier-legende">2.2. Force électromotrice induite · Chapitre 2 (suite) — induction, diapo 6</p>

    [![Chapitre 2 (suite) — induction, diapo 7 : 2.3. Loi de Lenz](papier/ch2-suite/p07.jpg){ loading=lazy .papier }](papier/ch2-suite/p07.jpg)
    <p class="papier-legende">2.3. Loi de Lenz · Chapitre 2 (suite) — induction, diapo 7</p>

    [![Chapitre 2 (suite) — induction, diapo 8 : 2.4. Circuit équivalent](papier/ch2-suite/p08.jpg){ loading=lazy .papier }](papier/ch2-suite/p08.jpg)
    <p class="papier-legende">2.4. Circuit équivalent · Chapitre 2 (suite) — induction, diapo 8</p>

    [![Chapitre 2 (suite) — induction, diapo 9 : 3. Auto-induction et inductance](papier/ch2-suite/p09.jpg){ loading=lazy .papier }](papier/ch2-suite/p09.jpg)
    <p class="papier-legende">3. Auto-induction et inductance · Chapitre 2 (suite) — induction, diapo 9</p>

    [![Chapitre 2 (suite) — induction, diapo 10 : 3. Auto-induction et inductance](papier/ch2-suite/p10.jpg){ loading=lazy .papier }](papier/ch2-suite/p10.jpg)
    <p class="papier-legende">3. Auto-induction et inductance · Chapitre 2 (suite) — induction, diapo 10</p>

    <!-- /papier -->
