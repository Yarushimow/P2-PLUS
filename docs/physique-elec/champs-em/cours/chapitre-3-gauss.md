---
title: "Ch. 3 — Symétries, flux et théorème de Gauss"
---

# Chapitre 3 — Structure du champ, flux et théorème de Gauss

=== "Version simplifiée"

    !!! abstract "Le fil du chapitre"
        Pour une distribution **continue**, on sait calculer $\vec E$ en intégrant les champs
        élémentaires ([chapitre 1](chapitre-1-electrostatique.md)) : c'est exact, mais long et
        technique. Quand la distribution est **très symétrique** (plan, cylindre, sphère), on fait
        bien plus court : les **invariances** et les **symétries** donnent la forme du champ, puis
        le **théorème de Gauss** donne sa valeur en quelques lignes, grâce au **flux**.

    ## 1. Rappel : les deux façons « longues »

    | Distribution | Calcul de $\vec E$ |
    |--------------|--------------------|
    | Discrète ($N$ charges $q_k$ en $P_k$) | $\vec E = \displaystyle\sum_{k=1}^N \frac{1}{4\pi\varepsilon_0}\frac{q_k}{P_kM^3}\,\overrightarrow{P_kM}$, ou $\vec E = -\overrightarrow{\mathrm{grad}}\Big(\displaystyle\sum_k V_k\Big)$ |
    | Continue (densité $\rho$) | $\vec E = \dfrac{1}{4\pi\varepsilon_0}\displaystyle\iiint \frac{\rho(P)\,\mathrm dV}{PM^3}\,\overrightarrow{PM}$ |

    La version continue est **exacte** mais rarement faisable à la main (intégrale vectorielle,
    projections, changements de variable). D'où la méthode de ce chapitre.

    ## 2. La structure du champ : invariances et symétries

    En général, $\vec E$ a **trois composantes**, chacune fonction de **trois variables**. En
    cylindriques par exemple :

    $$
    \vec E = E_r(r,\theta,z)\,\vec e_r + E_\theta(r,\theta,z)\,\vec e_\theta + E_z(r,\theta,z)\,\vec e_z
    $$

    ($E_r$ radiale, $E_\theta$ orthoradiale, $E_z$ axiale ; en sphériques : radiale, zénithale,
    azimutale). Le but est de faire tomber un maximum de ces 9 inconnues **avant** de calculer.

    !!! theoreme "Principe d'invariance → les variables"
        Si la distribution est **invariante** par une transformation qui fait varier une coordonnée
        (translation selon $z$, rotation selon $\theta$…), alors $\vec E$ **ne dépend pas** de cette
        coordonnée.

    !!! theoreme "Principe de symétrie → la direction"
        Si $M$ est dans un **plan de symétrie** de la distribution, alors $\vec E(M)$ est **contenu
        dans ce plan**. Si $M$ est dans **deux** plans de symétrie non parallèles, $\vec E(M)$ est
        porté par leur **intersection** (une droite).

    !!! analogie "Le miroir"
        Pose un miroir sur un plan de symétrie : la distribution de charges se voit **identique** dans le
        miroir. Le champ en un point du miroir doit donc lui aussi être identique à son reflet. Une
        flèche qui « sortirait » du miroir aurait un reflet qui pointe dans l'autre sens : impossible.
        Elle est donc **couchée dans le miroir**. Avec deux miroirs qui se coupent, il ne lui reste que
        la ligne commune.

    | Distribution | Invariances → dépend de | Symétries → direction | Structure |
    |--------------|------------------------|-----------------------|-----------|
    | Plan infini $z = 0$ uniforme | translations selon $x$ et $y$ → $z$ seul | plans $(M,\vec e_x,\vec e_z)$ et $(M,\vec e_y,\vec e_z)$ → $\vec e_z$ | $\vec E = E(z)\,\vec e_z$ |
    | Cylindre infini d'axe $Oz$ uniforme | translation selon $z$, rotation selon $\theta$ → $r$ seul | plans $(M,\vec e_r,\vec e_z)$ et $(M,\vec e_r,\vec e_\theta)$ → $\vec e_r$ | $\vec E = E(r)\,\vec e_r$ |
    | Sphère / boule uniforme | toutes les rotations ($\theta$, $\varphi$) → $r$ seul | plans $(M,\vec e_r,\vec e_\theta)$ et $(M,\vec e_r,\vec e_\varphi)$ → $\vec e_r$ | $\vec E = E(r)\,\vec e_r$ |

    !!! methode "À retenir"
        **Invariances** = de **quelles variables** dépend $E$.
        **Symétries** = selon **quel vecteur** est dirigé $\vec E$.
        Les deux ensemble donnent la structure, par exemple $\vec E = E(r)\,\vec e_r$ : il ne reste plus
        qu'**une** fonction d'**une** variable à trouver.

    ## 3. Le flux d'un champ

    !!! tip "Simulation animée"
        Gonfle une surface de Gauss autour d'une boule, d'une sphère creuse ou d'un cylindre et regarde $E(r)$ se tracer. [:material-play-circle: Ouvrir la simulation](../simulations/simulations-champs.html#gauss){ target="_blank" }

    **D'où vient l'idée ?** Pour une charge ponctuelle $q$ en $O$,
    $E(r) = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}$. Sur une sphère de rayon $r$ centrée en $O$, le
    champ est **constant** en norme, **normal** à la sphère partout, et la sphère a une aire
    $S = 4\pi r^2$. On peut donc réécrire :

    $$
    S \times E(r) = 4\pi r^2 \times \frac{q}{4\pi\varepsilon_0 r^2} = \frac{q}{\varepsilon_0}
    $$

    Le membre de gauche, « surface × champ », s'appelle le **flux** : la quantité de champ qui
    traverse la surface.

    !!! definition "Flux d'un champ uniforme"
        Champ $\vec E$ uniforme, surface plane $S$ de vecteur normal unitaire $\vec n$,
        $\theta = (\vec E, \vec n)$ :

        $$
        \Phi_E = \vec E\cdot\vec S = \vec E\cdot(S\,\vec n) = E\,S\cos\theta
        $$

        - $\vec E \parallel \vec n$ ($\vec E$ perpendiculaire à la surface) : $\Phi = ES$, **maximum** ;
        - $\vec E \perp \vec n$ ($\vec E$ tangent à la surface) : $\Phi = 0$, rien ne traverse ;
        - entre les deux : seule la surface « vue depuis le champ », $S\cos\theta$, compte.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/flux.svg"

    !!! analogie "La pluie à travers une fenêtre"
        Le flux, c'est la quantité de pluie qui passe par une fenêtre ouverte. Fenêtre bien en face de la
        pluie : il en passe un maximum ($\Phi = E\,S$). Pluie qui tombe parallèlement à la vitre : il n'en
        passe pas une goutte ($\Phi = 0$). Entre les deux, seule la surface apparente $S\cos\theta$ compte.

    !!! definition "Flux : cas général"
        Champ non uniforme ou surface courbe : on découpe en surfaces élémentaires
        $\mathrm d\vec S = \mathrm dS\,\vec n$, sur lesquelles le champ est uniforme. Flux élémentaire
        $\mathrm d\Phi = \vec E\cdot\mathrm d\vec S$, et au total :

        $$
        \Phi_E = \iint_S \vec E\cdot\mathrm d\vec S
        $$

        Pour une surface **fermée**, $\vec n$ pointe **vers l'extérieur**. Unité : V·m.

    !!! example "Flux d'un champ radial à travers une sphère (diapo 15)"
        $\vec E = E(r)\,\vec e_r$, sphère de centre $O$ et de rayon $r$. Sur la sphère, $\vec n = \vec e_r$ et
        $\mathrm d\vec S = r^2\sin\theta\,\mathrm d\theta\,\mathrm d\varphi\;\vec e_r$ ([chapitre 2](chapitre-2-coordonnees-distributions.md)).
        Comme $\vec e_r\cdot\vec e_r = 1$ et que $E(r)$ est constant sur la sphère :

        $$
        \Phi_E = E(r)\int_0^\pi\!\!\int_0^{2\pi} r^2\sin\theta\,\mathrm d\theta\,\mathrm d\varphi = 4\pi r^2\,E(r)
        $$

        Retenir : **sur une surface où $\vec E$ est normal et de norme constante, $\Phi = E \times S$.**

    ## 4. Le théorème de Gauss

    !!! theoreme "Théorème de Gauss"
        Le flux du champ électrique à travers **toute surface fermée** $\mathcal S$ est égal à la charge
        contenue **à l'intérieur**, divisée par $\varepsilon_0$ :

        $$
        \oint\!\!\!\oint_{\mathcal S} \vec E\cdot\mathrm d\vec S = \frac{Q_{\text{int}}}{\varepsilon_0}
        $$

        - $\mathcal S$ = **surface de Gauss** : fermée, orientée vers l'extérieur, choisie d'après la
          structure du champ, et passant par le point $M$ où l'on cherche $\vec E$ ;
        - $Q_{\text{int}}$ = somme des charges **intérieures** à $\mathcal S$ ;
        - le rond sur l'intégrale signale une surface **fermée**.

    Les charges **extérieures** créent bien du champ sur la surface, mais leur flux total est nul :
    elles n'apparaissent pas dans $Q_{\text{int}}$.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/gauss-principe.svg"

    !!! analogie "Des robinets dans une bulle"
        Imagine que les charges $+$ sont des **robinets** qui crachent de l'eau, et les charges $-$ des
        **siphons** qui l'aspirent. Entoure une région d'une bulle fermée et mesure le débit d'eau qui en
        sort :

        - il ne dépend **que des robinets et siphons à l'intérieur** ($Q_{\text{int}}$) ;
        - un robinet placé dehors fait entrer de l'eau d'un côté… qui ressort de l'autre : débit net nul.

        Le flux de $\vec E$ est ce débit, et le théorème de Gauss dit : débit sortant $= Q_{\text{int}}/\varepsilon_0$.

    !!! methode "Appliquer le théorème de Gauss (les 6 étapes du prof)"
        1. **Schéma** de la distribution de charges.
        2. **Symétries et invariances** → structure du champ (variables et direction).
        3. **Surface de Gauss** : une surface fermée passant par $M$ sur laquelle $\vec E$ est
           constant et/ou tangent et/ou normal.
        4. **Flux** (membre de gauche). Il ne dépend que de la **forme** du champ, pas de la
           distribution : souvent $\Phi = E(r)\times(\text{aire utile})$.
        5. **Charges intérieures** (membre de droite) : somme discrète ou intégrale de la densité
           ([chapitre 2](chapitre-2-coordonnees-distributions.md)). Distinguer **plusieurs zones** si
           besoin.
        6. **Égaler** les deux, isoler $E$ et écrire le résultat en **vecteur**.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/surfaces-gauss.svg"

    | Distribution | Structure | Surface de Gauss | Flux |
    |--------------|-----------|------------------|------|
    | Sphère, boule (centre $O$) | $E(r)\,\vec e_r$ | sphère de rayon $r$ | $4\pi r^2\,E(r)$ |
    | Fil / cylindre infini (axe $Oz$) | $E(r)\,\vec e_r$ | cylindre de rayon $r$, hauteur $H$ | $2\pi rH\,E(r)$ (bases : 0) |
    | Plan infini ($z = 0$) | $E(z)\,\vec e_z$ | cylindre de section $S$ coupé par le plan | $2S\,E(z)$ (côté : 0) |

    ## 5. L'exemple du cours : la boule uniformément chargée

    !!! example "Boule de centre $O$, rayon $R$, $\rho = \rho_0$ uniforme (diapos 20-21)"
        **Étapes 1-2.** Distribution à symétrie sphérique : invariante par toutes les rotations
        ($E$ ne dépend que de $r$) et tous les plans contenant $(OM)$ sont de symétrie
        ($\vec E$ selon $\vec e_r$). Donc $\vec E(M) = E(r)\,\vec e_r$.

        **Étape 3.** Lignes de champ = demi-droites partant de $O$ ; surfaces où $E$ est constant =
        sphères. Surface de Gauss : la **sphère $\mathcal S(r)$ de rayon $r$**.

        **Étape 4.** $\mathrm d\vec S = \mathrm dS\,\vec e_r$ et $E(r)$ constant sur la sphère :

        $$
        \Phi_E = \oint\!\!\!\oint_{\mathcal S(r)} E(r)\,\vec e_r\cdot\vec e_r\,\mathrm dS = E(r)\times 4\pi r^2
        $$

        **Étape 5.** Deux zones :

        - $r \ge R$ (dehors) : la sphère contient toute la boule, $Q_{\text{int}} = \dfrac43\pi R^3\rho_0$ ;
        - $r < R$ (dedans) : seulement la boule de rayon $r$, $Q_{\text{int}} = \dfrac43\pi r^3\rho_0$.

        **Étape 6.** $4\pi r^2 E(r) = Q_{\text{int}}/\varepsilon_0$, d'où

        $$
        \vec E(M) = \begin{cases}
        \dfrac{\rho_0\,r}{3\varepsilon_0}\,\vec e_r & r < R \quad\text{(croît linéairement)}\\[2ex]
        \dfrac{\rho_0 R^3}{3\varepsilon_0 r^2}\,\vec e_r & r \ge R \quad\text{(décroît en } 1/r^2\text{)}
        \end{cases}
        $$

        En $r = R$, les deux donnent $\dfrac{\rho_0 R}{3\varepsilon_0}$ : le champ est **continu**. Dehors,
        avec $Q = \frac43\pi R^3\rho_0$, on retrouve $\dfrac{Q}{4\pi\varepsilon_0 r^2}$ : la boule agit comme une
        **charge ponctuelle** placée en son centre.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/courbe-boule.svg"

    ## 6. Autres résultats classiques (TD)

    Ces cas ne sont pas détaillés dans les diapos de cette année, mais ils tombent en TD et en DE :
    même méthode, autre surface de Gauss.

    !!! example "Fil infini (densité $\lambda$)"
        Cylindre de rayon $r$ et hauteur $H$ : flux nul sur les deux bases,
        $\Phi = E\cdot 2\pi rH$ sur la face latérale, $Q_{\text{int}} = \lambda H$ :

        $$
        \vec E = \frac{\lambda}{2\pi\varepsilon_0\,r}\,\vec e_r
        $$

    !!! example "Plan infini (densité $\sigma$)"
        Cylindre de section $S$ coupé en deux par le plan : flux nul sur la face latérale,
        $\Phi = 2ES$ sur les deux bases, $Q_{\text{int}} = \sigma S$ :

        $$
        \vec E = \frac{\sigma}{2\varepsilon_0}\,\vec e_z \ (z > 0),
        \qquad \vec E = -\frac{\sigma}{2\varepsilon_0}\,\vec e_z \ (z < 0)
        $$

        Le champ est **uniforme** de chaque côté et **change de sens** en traversant le plan.

    !!! example "Condensateur plan ($+\sigma$ et $-\sigma$, distance $e$)"
        Par superposition des deux plans : $E = \dfrac{\sigma}{\varepsilon_0}$ entre les armatures,
        **0 à l'extérieur**. Tension $U = \dfrac{\sigma e}{\varepsilon_0}$ et capacité
        $C = \dfrac{Q}{U} = \dfrac{\varepsilon_0 S}{e}$.

    --8<-- "docs/physique-elec/champs-em/cours/_schemas/condensateur-superposition.svg"

    !!! tip "Simulation animée"
        Champ uniforme $E = U/d$, équipotentielles planes, électron accéléré ou dévié. [:material-play-circle: Ouvrir la simulation](../simulations/simulations-champs.html#condo){ target="_blank" }

    ## Pièges classiques

    !!! piege "Flux nul ≠ champ nul"
        Si $Q_{\text{int}} = 0$, le **flux** est nul, mais le champ peut très bien exister sur la surface
        (des charges extérieures le créent). On ne conclut $E = 0$ que si la symétrie impose en plus
        que $E$ soit constant et de signe fixe sur la surface.

    !!! piege "La charge intérieure, zone par zone"
        Pour $r$ dans la zone chargée, $Q_{\text{int}}$ dépend de $r$ (on intègre jusqu'à $r$). Au-delà,
        $Q_{\text{int}}$ est la charge **totale**, constante. Écrire $Q_{\text{int}} = Q$ quand $M$ est à
        l'intérieur est faux.

    !!! piege "Gauss ne marche que si la symétrie est suffisante"
        Le théorème est toujours vrai, mais il ne **donne** $E$ que si la structure du champ permet de
        sortir $E$ de l'intégrale. Pour un anneau ou un disque, on revient à l'intégration de
        $\mathrm d\vec E$ ([chapitre 1](chapitre-1-electrostatique.md)).

    !!! piege "L'unité du flux électrique"
        Le flux de $\vec E$ se mesure en **V·m** (champ en V/m × surface en m²). Le **weber** (Wb), c'est
        l'unité du flux **magnétique** (T·m²) : la diapo 13 mélange les deux.

=== "Version papier"

    Les diapos du chapitre 3 telles que le prof les projette (support 2026-2027).

    [![Chapitre 3 — support 2026-2027, diapo 1 : Page de titre](papier/ch3/p01.jpg){ loading=lazy .papier }](papier/ch3/p01.jpg)
    <p class="papier-legende">Page de titre · Chapitre 3 — support 2026-2027, diapo 1</p>

    [![Chapitre 3 — support 2026-2027, diapo 2 : Partie A — Chapitre 3 : plan](papier/ch3/p02.jpg){ loading=lazy .papier }](papier/ch3/p02.jpg)
    <p class="papier-legende">Partie A — Chapitre 3 : plan · Chapitre 3 — support 2026-2027, diapo 2</p>

    [![Chapitre 3 — support 2026-2027, diapo 3 : Introduction](papier/ch3/p03.jpg){ loading=lazy .papier }](papier/ch3/p03.jpg)
    <p class="papier-legende">Introduction · Chapitre 3 — support 2026-2027, diapo 3</p>

    [![Chapitre 3 — support 2026-2027, diapo 4 : Objectifs du chapitre](papier/ch3/p04.jpg){ loading=lazy .papier }](papier/ch3/p04.jpg)
    <p class="papier-legende">Objectifs du chapitre · Chapitre 3 — support 2026-2027, diapo 4</p>

    [![Chapitre 3 — support 2026-2027, diapo 5 : Rappel : champ d'une distribution discrète](papier/ch3/p05.jpg){ loading=lazy .papier }](papier/ch3/p05.jpg)
    <p class="papier-legende">Rappel : champ d'une distribution discrète · Chapitre 3 — support 2026-2027, diapo 5</p>

    [![Chapitre 3 — support 2026-2027, diapo 6 : Champ d'une distribution continue](papier/ch3/p06.jpg){ loading=lazy .papier }](papier/ch3/p06.jpg)
    <p class="papier-legende">Champ d'une distribution continue · Chapitre 3 — support 2026-2027, diapo 6</p>

    [![Chapitre 3 — support 2026-2027, diapo 7 : Étude de la structure d'un champ électrique](papier/ch3/p07.jpg){ loading=lazy .papier }](papier/ch3/p07.jpg)
    <p class="papier-legende">Étude de la structure d'un champ électrique · Chapitre 3 — support 2026-2027, diapo 7</p>

    [![Chapitre 3 — support 2026-2027, diapo 8 : Position du problème](papier/ch3/p08.jpg){ loading=lazy .papier }](papier/ch3/p08.jpg)
    <p class="papier-legende">Position du problème · Chapitre 3 — support 2026-2027, diapo 8</p>

    [![Chapitre 3 — support 2026-2027, diapo 9 : Étude des invariances](papier/ch3/p09.jpg){ loading=lazy .papier }](papier/ch3/p09.jpg)
    <p class="papier-legende">Étude des invariances · Chapitre 3 — support 2026-2027, diapo 9</p>

    [![Chapitre 3 — support 2026-2027, diapo 10 : Étude des symétries](papier/ch3/p10.jpg){ loading=lazy .papier }](papier/ch3/p10.jpg)
    <p class="papier-legende">Étude des symétries · Chapitre 3 — support 2026-2027, diapo 10</p>

    [![Chapitre 3 — support 2026-2027, diapo 11 : Détermination de la structure complète](papier/ch3/p11.jpg){ loading=lazy .papier }](papier/ch3/p11.jpg)
    <p class="papier-legende">Détermination de la structure complète · Chapitre 3 — support 2026-2027, diapo 11</p>

    [![Chapitre 3 — support 2026-2027, diapo 12 : Notion de flux d'un champ de vecteur](papier/ch3/p12.jpg){ loading=lazy .papier }](papier/ch3/p12.jpg)
    <p class="papier-legende">Notion de flux d'un champ de vecteur · Chapitre 3 — support 2026-2027, diapo 12</p>

    [![Chapitre 3 — support 2026-2027, diapo 13 : Flux : approche par la charge ponctuelle](papier/ch3/p13.jpg){ loading=lazy .papier }](papier/ch3/p13.jpg)
    <p class="papier-legende">Flux : approche par la charge ponctuelle · Chapitre 3 — support 2026-2027, diapo 13</p>

    [![Chapitre 3 — support 2026-2027, diapo 14 : Flux d'un champ électrique uniforme](papier/ch3/p14.jpg){ loading=lazy .papier }](papier/ch3/p14.jpg)
    <p class="papier-legende">Flux d'un champ électrique uniforme · Chapitre 3 — support 2026-2027, diapo 14</p>

    [![Chapitre 3 — support 2026-2027, diapo 15 : Flux électrique : cas général](papier/ch3/p15.jpg){ loading=lazy .papier }](papier/ch3/p15.jpg)
    <p class="papier-legende">Flux électrique : cas général · Chapitre 3 — support 2026-2027, diapo 15</p>

    [![Chapitre 3 — support 2026-2027, diapo 16 : Théorème de Gauss](papier/ch3/p16.jpg){ loading=lazy .papier }](papier/ch3/p16.jpg)
    <p class="papier-legende">Théorème de Gauss · Chapitre 3 — support 2026-2027, diapo 16</p>

    [![Chapitre 3 — support 2026-2027, diapo 17 : Gauss : approche par la charge ponctuelle](papier/ch3/p17.jpg){ loading=lazy .papier }](papier/ch3/p17.jpg)
    <p class="papier-legende">Gauss : approche par la charge ponctuelle · Chapitre 3 — support 2026-2027, diapo 17</p>

    [![Chapitre 3 — support 2026-2027, diapo 18 : Théorème de Gauss : énoncé général](papier/ch3/p18.jpg){ loading=lazy .papier }](papier/ch3/p18.jpg)
    <p class="papier-legende">Théorème de Gauss : énoncé général · Chapitre 3 — support 2026-2027, diapo 18</p>

    [![Chapitre 3 — support 2026-2027, diapo 19 : Théorème de Gauss : méthode d'application](papier/ch3/p19.jpg){ loading=lazy .papier }](papier/ch3/p19.jpg)
    <p class="papier-legende">Théorème de Gauss : méthode d'application · Chapitre 3 — support 2026-2027, diapo 19</p>

    [![Chapitre 3 — support 2026-2027, diapo 20 : Exemple pas à pas (1/2)](papier/ch3/p20.jpg){ loading=lazy .papier }](papier/ch3/p20.jpg)
    <p class="papier-legende">Exemple pas à pas (1/2) · Chapitre 3 — support 2026-2027, diapo 20</p>

    [![Chapitre 3 — support 2026-2027, diapo 21 : Exemple pas à pas (2/2)](papier/ch3/p21.jpg){ loading=lazy .papier }](papier/ch3/p21.jpg)
    <p class="papier-legende">Exemple pas à pas (2/2) · Chapitre 3 — support 2026-2027, diapo 21</p>
