---
title: "Ch. 4 — Champ magnétique, Liénard et Biot-Savart"
---

# Chapitre 4 — Origines du champ magnétique, formule de Liénard, loi de Biot-Savart

=== "Version simplifiée"

    !!! abstract "Le fil du chapitre"
        On ouvre la **partie B : magnétostatique**. Les **charges en mouvement** (les courants)
        créent un champ magnétique $\vec B$. On décrit d'abord comment un courant se répartit
        (**distributions de courant**), puis on calcule $\vec B$ de façon **directe** : formule de
        **Liénard** pour une charge mobile, loi de **Biot-Savart** pour un fil. On finit par la
        **structure** du champ (lignes fermées, symétries), qui prépare le théorème d'Ampère du
        [chapitre 5](chapitre-5-ampere.md). C'est le pendant de la loi de Coulomb du
        [chapitre 1](chapitre-1-electrostatique.md).

    ## 1. Historique et sources

    - **Antiquité** : la **magnétite** (roche trouvée près de Magnésie) attire certains métaux ; les
      Chinois utilisent le champ terrestre pour faire des **boussoles** (il y a ~2500 ans).
    - **XVIIIe siècle** : Franklin remarque que les orages perturbent les boussoles → on soupçonne
      un lien électricité / magnétisme, qui aboutira aux **équations de Maxwell**.

    !!! definition "Expérience d'Oersted (1820)"
        Un fil parcouru par un courant fait **dévier** une boussole placée à côté :

        1. sans courant, l'aiguille reste vers le nord ;
        2. plus le courant est fort, plus elle dévie ;
        3. si on inverse le courant, la déviation s'inverse ;
        4. la force n'est **pas radiale** (pas dirigée vers le fil).

        Conclusion : **un courant crée un champ magnétique**, dont la norme dépend de $I$ et le sens
        du signe de $I$.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/oersted.svg"

    **Biot et Savart** précisent ensuite : les lignes de champ **s'enroulent autour du fil**, dans
    des plans perpendiculaires au fil ; $B$ est **proportionnel à $I$** et **inversement
    proportionnel à la distance** au fil.

    !!! definition "Les sources de champ magnétique"
        1. **Charges en mouvement** (électron, proton, ion…).
        2. **Électrons** à l'échelle atomique : moment magnétique **orbital** et de **spin**.
        3. **Aimants permanents** : roches dont les spins des atomes sont alignés.
        4. **Bobines / électro-aimants** : fil enroulé parcouru par un courant, souvent autour d'un
           matériau ferromagnétique.

    Unité : le **tesla** (T). On rencontre aussi le gauss : $1\ \text{G} = 10^{-4}$ T.

    ## 2. Distributions de courant

    Une charge isolée qui se déplace crée un courant le long de sa trajectoire : la **ligne de
    courant** (1D) joue en magnétostatique le rôle de la **charge ponctuelle** (0D) en
    électrostatique. Dans un vrai conducteur, ce sont des milliards de charges qui avancent en
    moyenne à la **vitesse de dérive** $\vec v_d$ (quelques dixièmes de mm/s dans le cuivre) : le
    courant est **réparti**, exactement comme la charge l'était au
    [chapitre 2](chapitre-2-coordonnees-distributions.md).

    | Distribution | Quand ? | Grandeur | Unité | Intensité totale |
    |--------------|---------|----------|-------|------------------|
    | **Linéique** | 2 dimensions négligeables (fil, spire) | $I = \dfrac{\mathrm dq}{\mathrm dt}$ | A | — |
    | **Surfacique** | 1 dimension négligeable (nappe) | $\vec j_s = \sigma\,\vec v_d$ | A/m | $I = \displaystyle\int_{\mathcal L} \vec j_s\cdot\vec n\,\mathrm dl$ |
    | **Volumique** | conducteur épais | $\vec j = \rho\,\vec v_d$ | A/m² | $I = \displaystyle\iint_{\mathcal S} \vec j\cdot\mathrm d\vec S$ |

    La ligne $\mathcal L$ (ou la surface $\mathcal S$) est prise **orthogonale au courant** : on compte
    ce qui la traverse. Un fil fermé s'appelle une **spire**, un fil ouvert un **fil conducteur**.

    !!! example "Distributions uniformes"
        - Nappe carrée de côté $L$, $\vec j_s = j_s\vec e_x$ uniforme :
          $I = \int_0^L j_s\,\mathrm dy = j_s L$. Vérif des unités : (A/m)·m = A.
        - Cylindre de rayon $R$, $\vec j = j_0\vec e_z$ uniforme :
          $I = j_0\iint\mathrm dS = j_0\,\pi R^2$.

        En résumé, pour une densité **uniforme** : $I = j_s L$ (surfacique) et $I = j_0 S$
        (volumique, $S$ = section).

    !!! analogie "Le débit d'une rivière"
        $\vec j$, c'est la « vitesse de l'eau × sa densité » en chaque point ; $I$, c'est le débit total
        qui passe sous un pont. Pour avoir le débit, on additionne ce qui traverse la section du
        pont : c'est le **flux** de $\vec j$. Une nappe de courant, c'est une rivière très plate : on
        mesure alors le débit par mètre de largeur ($j_s$ en A/m).

    ## 3. Champ d'une charge mobile : formule de Liénard

    !!! theoreme "Formule de Liénard(-Wiechert)"
        Une charge $q$ placée en $P$, de vitesse $\vec v$, crée en $M$ :

        $$
        \vec B(M) = \frac{\mu_0}{4\pi}\,\frac{q\,\vec v\wedge\overrightarrow{PM}}{PM^3}
        $$

        $\mu_0 = 4\pi\times 10^{-7}$ H/m est la **perméabilité magnétique du vide** ;
        $\overrightarrow{PM}$ va de la charge vers le point d'observation.

    !!! methode "Règle des trois doigts de la main droite"
        **Pouce** = $\vec v$ ; **index** = $\overrightarrow{PM}$ (vers $M$) ; **majeur** = $\vec B$.
        $\vec B$ est perpendiculaire **à la fois** à $\vec v$ et à $\overrightarrow{PM}$.

    !!! example "Charge en mouvement rectiligne uniforme"
        $\vec v = v_0\vec e_z$, charge en $P$ avec $\overrightarrow{OP} = z\vec e_z$, point $M$ avec
        $\overrightarrow{OM} = r\vec e_r$ (cylindriques). Alors
        $\overrightarrow{PM} = -z\vec e_z + r\vec e_r$ et $PM = \sqrt{r^2 + z^2}$.

        Comme $\vec e_z\wedge\vec e_z = \vec 0$ et $\vec e_z\wedge\vec e_r = \vec e_\theta$ :

        $$
        \vec B(M) = \frac{\mu_0\,q\,r\,v_0}{4\pi\,(r^2 + z^2)^{3/2}}\,\vec e_\theta
        $$

        Le champ **tourne** autour de la trajectoire ($\vec e_\theta$) : déjà l'image du fil.

    ## 4. Courant stationnaire : loi de Biot-Savart

    On découpe un fil (courant $I$ constant) en petits morceaux $\mathrm d\vec l$ autour d'un point
    $P$. Chaque morceau porte une charge $\mathrm dq$ qui avance à $\vec v_d = \dfrac{\mathrm d\vec l}{\mathrm dt}$,
    donc $\mathrm dq\,\vec v_d = \dfrac{\mathrm dq}{\mathrm dt}\mathrm d\vec l = I\,\mathrm d\vec l$. On remplace
    $q\vec v$ par $I\,\mathrm d\vec l$ dans Liénard :

    !!! theoreme "Loi de Biot-Savart"
        $$
        \mathrm d\vec B_P(M) = \frac{\mu_0}{4\pi}\,\frac{I\,\mathrm d\vec l\wedge\overrightarrow{PM}}{PM^3}
        \qquad\text{puis}\qquad
        \vec B(M) = \int_{\text{fil}} \mathrm d\vec B_P(M)
        $$

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/biot-savart.svg"

    !!! tip "Raccourci utile"
        Si $M$ est **sur le prolongement** d'une portion rectiligne, alors
        $\mathrm d\vec l \parallel \overrightarrow{PM}$ : cette portion ne crée **aucun** champ en $M$.

    !!! example "Fil rectiligne infini"
        1. **Direction et sens** : main droite, $\vec B$ selon $\vec e_\theta$.
        2. **Module** : $\|\mathrm d\vec z\wedge\overrightarrow{PM}\| = \mathrm dz\cdot PM\sin\alpha$, donc
           $\mathrm dB = \dfrac{\mu_0 I}{4\pi}\dfrac{\mathrm dz\sin\alpha}{PM^2}$.
        3. **Changement de variable** par l'angle $\theta$ vu depuis $M$ :
           $\cos\theta = \sin\alpha$, $PM = \dfrac{r}{\cos\theta}$, $z = r\tan\theta$,
           $\mathrm dz = \dfrac{r}{\cos^2\theta}\mathrm d\theta$, d'où
           $\mathrm dB = \dfrac{\mu_0 I}{4\pi r}\cos\theta\,\mathrm d\theta$.
        4. On intègre de $-\pi/2$ à $\pi/2$ ($\int\cos\theta\,\mathrm d\theta = 2$) :

        $$
        \vec B_{fil}(M) = \frac{\mu_0 I}{2\pi r}\,\vec e_\theta
        $$

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/fil-lignes.svg"

    Propriétés du champ du fil :

    1. champ **orthoradial** : les lignes de champ sont des **cercles** de rayon $r$ ;
    2. surfaces iso-$B$ : des **cylindres** d'axe $Oz$ ;
    3. $B \propto I$ et $B \propto 1/r$ ;
    4. le sens s'inverse avec le courant.

    !!! analogie "Le tire-bouchon"
        Visse un tire-bouchon en le faisant avancer dans le sens du courant : le sens dans lequel tu le
        tournes est le sens de $\vec B$. Version main droite : **pouce = courant**, les **doigts
        repliés** donnent le sens de rotation des lignes de champ.

    !!! example "Spire circulaire, sur son axe (démo en TD)"
        Spire de rayon $R$, courant $I$, dans un plan orthogonal à $Oz$ ; point $M$ sur l'axe à la
        cote $z$ :

        $$
        \vec B_{spire}(M) = \frac{\mu_0 I R^2}{2\,(R^2 + z^2)^{3/2}}\,\vec e_z
        $$

        - Champ **axial** (les composantes perpendiculaires s'annulent par symétrie).
        - Maximal au centre : $B(O) = \dfrac{\mu_0 I}{2R}$.
        - Proportionnel à $I$, change de sens avec $I$.

    !!! methode "Champ d'un arc au centre (très utile en TD)"
        Arc de rayon $R$ et d'angle $\theta_0$ : en tout point, $\mathrm d\vec l\perp\overrightarrow{PO}$
        et $PO = R$, donc
        $B(O) = \dfrac{\mu_0 I}{4\pi R^2}\displaystyle\int_0^{\theta_0} R\,\mathrm d\theta = \dfrac{\mu_0 I\,\theta_0}{4\pi R}$.
        Spire entière ($2\pi$) : $\dfrac{\mu_0 I}{2R}$ ; demi-spire ($\pi$) : $\dfrac{\mu_0 I}{4R}$.

    ## 5. Structure du champ magnétique

    !!! tip "Simulation animée"
        Boussoles qui s'alignent sur $\vec B$, lignes de champ circulaires autour d'un fil, bobine en coupe. [:material-play-circle: Ouvrir la simulation](../simulations/simulations-champs.html#ampere){ target="_blank" }

    ### Pôles magnétiques et lignes de champ

    1. Deux pôles de **même nature se repoussent**, de natures différentes s'attirent.
    2. Un aimant **coupé en deux** donne deux aimants complets (nord + sud) : pas de pôle isolé.
    3. Les lignes de champ sont des **boucles fermées**.
    4. Elles **sOrtent par le pôle nOrd** (et rentrent par le sud, à l'extérieur de l'aimant).
    5. Dans un **solénoïde**, le champ est quasi **uniforme**, orienté par la règle du tire-bouchon.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/aimant-solenoide.svg"

    !!! analogie "E jaillit, B tourne"
        Le champ électrique ressemble à l'eau d'une **source** : ses lignes partent des charges $+$ et
        finissent dans les charges $-$. Le champ magnétique ressemble à un **tourbillon** autour d'une
        bonde : ses lignes tournent en boucle autour des courants, sans début ni fin.

    ### Symétries des distributions de courant

    !!! theoreme "Plans de symétrie et d'antisymétrie"
        Pour une distribution de courant qui crée $\vec B(M)$ :

        1. si $\Pi$ est un **plan de symétrie** contenant $M$, alors $\vec B(M)$ est
           **orthogonal** à $\Pi$ ;
        2. si $\Pi^*$ est un **plan d'antisymétrie** contenant $M$, alors $\vec B(M)$ est
           **contenu** dans $\Pi^*$.

    !!! piege "C'est l'inverse de $\vec E$ !"
        Au [chapitre 3](chapitre-3-gauss.md), $\vec E$ était **contenu** dans les plans de symétrie.
        $\vec B$, lui, leur est **perpendiculaire** (c'est un produit vectoriel, un « pseudo-vecteur »).
        Exemple : un fil (ou un cylindre) d'axe $Oz$ parcouru par $\vec j = j_0\vec e_z$. Le plan
        $(M;\vec e_r,\vec e_z)$ contient le fil : c'est un plan de **symétrie**, donc
        $\vec B \perp$ ce plan :

        $$
        \vec B(M) = B(r)\,\vec e_\theta
        $$

    ## 6. Électrostatique et magnétostatique

    | | Électrostatique | Magnétostatique |
    |-|-----------------|-----------------|
    | Sources | charges immobiles | courants (charges en mouvement) |
    | Source « ponctuelle » | charge $q$ (0D) | élément de courant $I\,\mathrm d\vec l$ (1D) |
    | Loi élémentaire | Coulomb : $\dfrac{1}{4\pi\varepsilon_0}\dfrac{q\,\overrightarrow{PM}}{PM^3}$ | Liénard / Biot-Savart : $\dfrac{\mu_0}{4\pi}\dfrac{I\,\mathrm d\vec l\wedge\overrightarrow{PM}}{PM^3}$ |
    | Constante | $\varepsilon_0$ | $\mu_0 = 4\pi\times 10^{-7}$ H/m |
    | Densités | $\lambda$, $\sigma$, $\rho$ | $I$, $\vec j_s$, $\vec j$ |
    | Lignes de champ | ouvertes (de + vers −) | **fermées** |
    | Plan de symétrie | $\vec E$ **dans** le plan | $\vec B$ **perpendiculaire** au plan |
    | Fil infini | $\dfrac{\lambda}{2\pi\varepsilon_0 r}\vec e_r$ (radial) | $\dfrac{\mu_0 I}{2\pi r}\vec e_\theta$ (orthoradial) |

    ## Pièges classiques

    !!! piege "Le sens de $\overrightarrow{PM}$"
        $\overrightarrow{PM}$ va **de la source vers le point où on calcule**. L'inverser change le signe
        du produit vectoriel, donc le sens de $\vec B$.

    !!! piege "$\vec B$ ne pointe jamais vers le fil"
        $\vec B$ est perpendiculaire au courant **et** à $\overrightarrow{PM}$ : autour d'un fil, il
        tourne, il n'est jamais dirigé vers le fil (contrairement à $\vec E$ d'une charge).

=== "Version papier"

    Les diapos du chapitre 4 telles que le prof les projette (support 2026-2027).

    [![Chapitre 4 — support 2026-2027, diapo 1 : Page de titre](papier/ch4/p01.jpg){ loading=lazy .papier }](papier/ch4/p01.jpg)
    <p class="papier-legende">Page de titre · Chapitre 4 — support 2026-2027, diapo 1</p>

    [![Chapitre 4 — support 2026-2027, diapo 2 : Partie B — Chapitre 4 : origines du champ, Liénard, Biot-Savart](papier/ch4/p02.jpg){ loading=lazy .papier }](papier/ch4/p02.jpg)
    <p class="papier-legende">Partie B — Chapitre 4 : origines du champ, Liénard, Biot-Savart · Chapitre 4 — support 2026-2027, diapo 2</p>

    [![Chapitre 4 — support 2026-2027, diapo 3 : Introduction](papier/ch4/p03.jpg){ loading=lazy .papier }](papier/ch4/p03.jpg)
    <p class="papier-legende">Introduction · Chapitre 4 — support 2026-2027, diapo 3</p>

    [![Chapitre 4 — support 2026-2027, diapo 4 : Rapide historique](papier/ch4/p04.jpg){ loading=lazy .papier }](papier/ch4/p04.jpg)
    <p class="papier-legende">Rapide historique · Chapitre 4 — support 2026-2027, diapo 4</p>

    [![Chapitre 4 — support 2026-2027, diapo 5 : L'expérience d'Oersted](papier/ch4/p05.jpg){ loading=lazy .papier }](papier/ch4/p05.jpg)
    <p class="papier-legende">L'expérience d'Oersted · Chapitre 4 — support 2026-2027, diapo 5</p>

    [![Chapitre 4 — support 2026-2027, diapo 6 : Les expériences de Biot-et-Savart](papier/ch4/p06.jpg){ loading=lazy .papier }](papier/ch4/p06.jpg)
    <p class="papier-legende">Les expériences de Biot-et-Savart · Chapitre 4 — support 2026-2027, diapo 6</p>

    [![Chapitre 4 — support 2026-2027, diapo 7 : Sources de champ magnétique](papier/ch4/p07.jpg){ loading=lazy .papier }](papier/ch4/p07.jpg)
    <p class="papier-legende">Sources de champ magnétique · Chapitre 4 — support 2026-2027, diapo 7</p>

    [![Chapitre 4 — support 2026-2027, diapo 8 : Objectifs de cette partie B](papier/ch4/p08.jpg){ loading=lazy .papier }](papier/ch4/p08.jpg)
    <p class="papier-legende">Objectifs de cette partie B · Chapitre 4 — support 2026-2027, diapo 8</p>

    [![Chapitre 4 — support 2026-2027, diapo 9 : Distributions de courant](papier/ch4/p09.jpg){ loading=lazy .papier }](papier/ch4/p09.jpg)
    <p class="papier-legende">Distributions de courant · Chapitre 4 — support 2026-2027, diapo 9</p>

    [![Chapitre 4 — support 2026-2027, diapo 10 : Problématique](papier/ch4/p10.jpg){ loading=lazy .papier }](papier/ch4/p10.jpg)
    <p class="papier-legende">Problématique · Chapitre 4 — support 2026-2027, diapo 10</p>

    [![Chapitre 4 — support 2026-2027, diapo 11 : Distribution LINEIQUE de courant](papier/ch4/p11.jpg){ loading=lazy .papier }](papier/ch4/p11.jpg)
    <p class="papier-legende">Distribution LINEIQUE de courant · Chapitre 4 — support 2026-2027, diapo 11</p>

    [![Chapitre 4 — support 2026-2027, diapo 12 : Distribution SURFACIQUE de courant](papier/ch4/p12.jpg){ loading=lazy .papier }](papier/ch4/p12.jpg)
    <p class="papier-legende">Distribution SURFACIQUE de courant · Chapitre 4 — support 2026-2027, diapo 12</p>

    [![Chapitre 4 — support 2026-2027, diapo 13 : Distribution SURFACIQUE de courant](papier/ch4/p13.jpg){ loading=lazy .papier }](papier/ch4/p13.jpg)
    <p class="papier-legende">Distribution SURFACIQUE de courant · Chapitre 4 — support 2026-2027, diapo 13</p>

    [![Chapitre 4 — support 2026-2027, diapo 14 : Distribution VOLUMIQUE de courant](papier/ch4/p14.jpg){ loading=lazy .papier }](papier/ch4/p14.jpg)
    <p class="papier-legende">Distribution VOLUMIQUE de courant · Chapitre 4 — support 2026-2027, diapo 14</p>

    [![Chapitre 4 — support 2026-2027, diapo 15 : Cas particuliers : distributions uniformes](papier/ch4/p15.jpg){ loading=lazy .papier }](papier/ch4/p15.jpg)
    <p class="papier-legende">Cas particuliers : distributions uniformes · Chapitre 4 — support 2026-2027, diapo 15</p>

    [![Chapitre 4 — support 2026-2027, diapo 16 : Champ magnétique d'une charge mobile](papier/ch4/p16.jpg){ loading=lazy .papier }](papier/ch4/p16.jpg)
    <p class="papier-legende">Champ magnétique d'une charge mobile · Chapitre 4 — support 2026-2027, diapo 16</p>

    [![Chapitre 4 — support 2026-2027, diapo 17 : Charge ponctuelle : Formule de Liénard-Wiechert](papier/ch4/p17.jpg){ loading=lazy .papier }](papier/ch4/p17.jpg)
    <p class="papier-legende">Charge ponctuelle : Formule de Liénard-Wiechert · Chapitre 4 — support 2026-2027, diapo 17</p>

    [![Chapitre 4 — support 2026-2027, diapo 18 : Charge ponctuelle : Formule de Liénard-Wiechert](papier/ch4/p18.jpg){ loading=lazy .papier }](papier/ch4/p18.jpg)
    <p class="papier-legende">Charge ponctuelle : Formule de Liénard-Wiechert · Chapitre 4 — support 2026-2027, diapo 18</p>

    [![Chapitre 4 — support 2026-2027, diapo 19 : Exemple : champ magnétique d'une charge en mouvement uniforme](papier/ch4/p19.jpg){ loading=lazy .papier }](papier/ch4/p19.jpg)
    <p class="papier-legende">Exemple : champ magnétique d'une charge en mouvement uniforme · Chapitre 4 — support 2026-2027, diapo 19</p>

    [![Chapitre 4 — support 2026-2027, diapo 20 : Courant stationnaire : loi de Biot-et-Savart](papier/ch4/p20.jpg){ loading=lazy .papier }](papier/ch4/p20.jpg)
    <p class="papier-legende">Courant stationnaire : loi de Biot-et-Savart · Chapitre 4 — support 2026-2027, diapo 20</p>

    [![Chapitre 4 — support 2026-2027, diapo 21 : Exemple : fil rectiligne infini](papier/ch4/p21.jpg){ loading=lazy .papier }](papier/ch4/p21.jpg)
    <p class="papier-legende">Exemple : fil rectiligne infini · Chapitre 4 — support 2026-2027, diapo 21</p>

    [![Chapitre 4 — support 2026-2027, diapo 22 : Exemple : fil rectiligne infini](papier/ch4/p22.jpg){ loading=lazy .papier }](papier/ch4/p22.jpg)
    <p class="papier-legende">Exemple : fil rectiligne infini · Chapitre 4 — support 2026-2027, diapo 22</p>

    [![Chapitre 4 — support 2026-2027, diapo 23 : Exemple : spire de courant](papier/ch4/p23.jpg){ loading=lazy .papier }](papier/ch4/p23.jpg)
    <p class="papier-legende">Exemple : spire de courant · Chapitre 4 — support 2026-2027, diapo 23</p>

    [![Chapitre 4 — support 2026-2027, diapo 24 : Structure du champ magnétique](papier/ch4/p24.jpg){ loading=lazy .papier }](papier/ch4/p24.jpg)
    <p class="papier-legende">Structure du champ magnétique · Chapitre 4 — support 2026-2027, diapo 24</p>

    [![Chapitre 4 — support 2026-2027, diapo 25 : Pôles magnétiques des (électro)aimants](papier/ch4/p25.jpg){ loading=lazy .papier }](papier/ch4/p25.jpg)
    <p class="papier-legende">Pôles magnétiques des (électro)aimants · Chapitre 4 — support 2026-2027, diapo 25</p>

    [![Chapitre 4 — support 2026-2027, diapo 26 : Symétries des distributions de courants](papier/ch4/p26.jpg){ loading=lazy .papier }](papier/ch4/p26.jpg)
    <p class="papier-legende">Symétries des distributions de courants · Chapitre 4 — support 2026-2027, diapo 26</p>

