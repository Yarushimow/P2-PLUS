---
title: "Ch. 1 — Statistique descriptive"
---

# Chapitre 1 — Éléments de statistique descriptive

=== "Version simplifiée"

    En probabilités, on connaît la loi et on calcule ce qui va se passer. En analyse de données,
    c'est l'inverse : on a des **données** (un nombre fini d'observations) et on veut en tirer
    des informations. Ce chapitre apprend à les **résumer** par quelques nombres.

    ## Vocabulaire

    !!! definition "Population, échantillon, données"
        - La **population** est l'ensemble des individus étudiés. Quand elle est trop grande, on travaille sur un
          **échantillon** de $n$ individus, tirés **au hasard** pour qu'il soit représentatif.
        - Une **réalisation de l'échantillon** est le $n$-uplet $(x_1, \dots, x_n)$ des valeurs observées.
        - Données **qualitatives** (catégorielles) : couleur des yeux, moyen de transport… Les valeurs possibles sont les **modalités**.
          Si elles ont un ordre naturel (« passable, bien, très bien »), la variable est **qualitative ordinale**.
        - Données **quantitatives** : des nombres, discrets ou continus (taille, note…).

    ## Une variable : tendance centrale

    | Paramètre | Définition |
    |---|---|
    | Moyenne empirique | $\bar x = \dfrac1n\displaystyle\sum_{i=1}^n x_i$ |
    | Médiane $Me$ | sépare la moitié inférieure de la moitié supérieure des valeurs **classées** |
    | Quartiles $Q_1$, $Q_3$ | séparent le quart inférieur (resp. les trois quarts inférieurs) |
    | Mode $Mo$ | la valeur la plus fréquente |
    | Fréquence | $f_i = n_i / n$ ($n_i$ = nombre d'apparitions de la valeur) |

    !!! methode "Médiane et quartiles (méthode du poly)"
        On **classe** d'abord les valeurs.

        - **Médiane** : $n$ impair → valeur de rang $\frac{n+1}{2}$ ; $n$ pair → moyenne des rangs $\frac n2$ et $\frac n2 + 1$.
        - **Quartiles** : si $n$ est multiple de 4, $Q_1$ = moyenne des rangs $\frac n4$ et $\frac n4 + 1$, et $Q_3$ = moyenne des rangs $\frac{3n}4$ et $\frac{3n}4 + 1$.
          Sinon, $Q_1$ est au rang $E\left(\frac n4\right) + 1$ et $Q_3$ au rang $E\left(\frac{3n}4\right) + 1$ ($E$ = partie entière).

        Exemple : 1, 4, 5, 7, 10, 12, 12, 20 ($n = 8$) → $Me = \frac{7 + 10}{2} = 8{,}5$, $Q_1 = \frac{4 + 5}2 = 4{,}5$, $Q_3 = 12$.

    !!! tip "Moyenne ou médiane ?"
        La médiane est **insensible aux valeurs extrêmes**. 39 salaires à 2500 € et un à un million :
        la moyenne vaut environ 27 438 € (elle ne décrit personne), la médiane vaut 2500 €.

    ## Une variable : dispersion

    !!! definition "Variance et écart-type observés"

        $$
        \sigma^2 = \frac1n\sum_{i=1}^n (x_i - \bar x)^2 = \overline{x^2} - \bar x^2
        \qquad \sigma = \sqrt{\sigma^2}
        $$

        $\sigma$ a la même unité que les $x_i$. Plus il est petit, plus les valeurs sont concentrées autour de $\bar x$.

    - **Changement affine** : $\overline{\alpha x + \beta} = \alpha\bar x + \beta$ et $\sigma^2_{\alpha x + \beta} = \alpha^2\sigma_x^2$ (le décalage $\beta$ ne change pas la dispersion).
    - **Étendue** : $\max - \min$.
    - **Variable centrée réduite** : $z_i = \dfrac{x_i - \bar x}{\sigma_x}$, de moyenne 0 et d'écart-type 1, sans unité. Elle permet de comparer des variables d'échelles différentes.

    !!! definition "Forme de la distribution"

        $$
        S_k = \frac{1}{\sigma^3}\cdot\frac1n\sum_{i=1}^n (x_i - \bar x)^3
        \qquad
        K = \frac{1}{\sigma^4}\cdot\frac1n\sum_{i=1}^n (x_i - \bar x)^4
        $$

        - **Asymétrie** $S_k$ : nulle pour une distribution symétrique ; $S_k > 0$ si elle est **étalée à droite** (longue queue vers les grandes valeurs), $S_k < 0$ si elle est étalée à gauche.
        - **Aplatissement** $K$ : vaut 3 pour une loi normale.

    ## Deux variables

    On observe deux valeurs $(x_i, y_i)$ par individu : on obtient un **nuage de points**, de
    **centre de gravité** $G(\bar x, \bar y)$.

    !!! definition "Covariance et corrélation"

        $$
        \sigma_{xy} = \frac1n\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y) = \overline{xy} - \bar x\,\bar y
        \qquad
        \rho_{xy} = \frac{\sigma_{xy}}{\sigma_x\sigma_y} \in [-1, 1]
        $$

        $|\rho| = 1$ si et seulement si les points sont exactement alignés (relation affine). $\sigma_{xx} = \sigma_x^2$.

    !!! piege "Corrélation n'est pas causalité"
        La pointure et le niveau en maths des collégiens sont corrélés (les deux augmentent avec l'âge) ;
        le chocolat et les prix Nobel aussi (les deux augmentent avec le PIB). Une troisième variable explique le lien.
        Et un $\rho$ proche de 0 n'exclut pas un lien **non linéaire** (un nuage en forme de parabole symétrique, par exemple).

    !!! theoreme "Droite de régression (moindres carrés)"

        $$
        y = ax + b \qquad a = \frac{\sigma_{xy}}{\sigma_x^2} \qquad b = \bar y - a\bar x
        $$

        C'est la droite qui minimise $E(a, b) = \sum_i \big(y_i - (ax_i + b)\big)^2$ (les écarts **verticaux**).
        Elle passe par $G$. On l'obtient en annulant $\partial E/\partial a$ et $\partial E/\partial b$.

    !!! methode "Ajustement non affin"
        Si le nuage n'est pas allongé selon une droite, on cherche un **changement de variable** qui le redresse,
        par exemple $n_i = \ln(v_i - 15)$ pour une décroissance exponentielle vers 15. On fait la régression sur
        $(t_i, n_i)$, puis on revient à $v$ en appliquant la fonction réciproque ([TD 1, exercice 6](../td/td-1-statistique-descriptive.md)).

    ## $p$ variables : les matrices de données

    On range les données dans une matrice $M$ de taille $n \times p$ : une **ligne par individu**, une **colonne par variable**.

    | Matrice | Définition | Taille |
    |---|---|---|
    | Centrée $M_c$ | $(x_{ij} - \bar x_j)$ | $n \times p$ |
    | Centrée réduite $M_s$ | $\left(\dfrac{x_{ij} - \bar x_j}{\sigma_j}\right)$ | $n \times p$ |
    | Variance-covariance $\Sigma$ | $\dfrac1n\,{}^tM_c\,M_c$ | $p \times p$ |
    | Corrélations $R$ | $\dfrac1n\,{}^tM_s\,M_s$ | $p \times p$ |

    $\Sigma$ et $R$ sont symétriques. $\Sigma$ a les **variances** sur la diagonale et les covariances ailleurs ;
    $R$ a des **1** sur la diagonale et les coefficients de corrélation ailleurs.

    !!! piege "Coquille dans le poly"
        La proposition 1.7 du poly inverse $R$ et $\Sigma$ dans sa phrase. La bonne version est celle ci-dessus
        (et celle des matrices écrites juste avant dans le poly).

    **Distance euclidienne** entre deux individus : $d(x_i, x_k) = \sqrt{\sum_{j=1}^p (x_{ij} - x_{kj})^2}$.

=== "Version papier"

    Le chapitre 1 du polycopié 2025-2026 (les exercices sont dans le [TD 1](../td/td-1-statistique-descriptive.md)).

    <!-- papier: pdf/SM403P/poly.pdf | Poly 2025-2026 | ch1 | page | 4-22 -->

    [![Poly 2025-2026, page 4 : Chapitre 1](papier/ch1/p04.jpg){ loading=lazy .papier }](papier/ch1/p04.jpg)
    <p class="papier-legende">Chapitre 1 · Poly 2025-2026, page 4</p>

    [![Poly 2025-2026, page 5 : 1.2. LES DONNÉES](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">1.2. LES DONNÉES · Poly 2025-2026, page 5</p>

    [![Poly 2025-2026, page 6 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 6</p>

    [![Poly 2025-2026, page 7 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 7</p>

    [![Poly 2025-2026, page 8 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 8</p>

    [![Poly 2025-2026, page 9 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 9</p>

    [![Poly 2025-2026, page 10 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 10</p>

    [![Poly 2025-2026, page 11 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 11</p>

    [![Poly 2025-2026, page 12 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 12</p>

    [![Poly 2025-2026, page 13 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 13</p>

    [![Poly 2025-2026, page 14 : 1.3. STATISTIQUES À UNE VARIABLE](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">1.3. STATISTIQUES À UNE VARIABLE · Poly 2025-2026, page 14</p>

    [![Poly 2025-2026, page 15 : 1.4. STATISTIQUES À DEUX VARIABLES](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">1.4. STATISTIQUES À DEUX VARIABLES · Poly 2025-2026, page 15</p>

    [![Poly 2025-2026, page 16 : 1.4. STATISTIQUES À DEUX VARIABLES](papier/ch1/p16.jpg){ loading=lazy .papier }](papier/ch1/p16.jpg)
    <p class="papier-legende">1.4. STATISTIQUES À DEUX VARIABLES · Poly 2025-2026, page 16</p>

    [![Poly 2025-2026, page 17 : 1.4. STATISTIQUES À DEUX VARIABLES](papier/ch1/p17.jpg){ loading=lazy .papier }](papier/ch1/p17.jpg)
    <p class="papier-legende">1.4. STATISTIQUES À DEUX VARIABLES · Poly 2025-2026, page 17</p>

    [![Poly 2025-2026, page 18 : 1.4. STATISTIQUES À DEUX VARIABLES](papier/ch1/p18.jpg){ loading=lazy .papier }](papier/ch1/p18.jpg)
    <p class="papier-legende">1.4. STATISTIQUES À DEUX VARIABLES · Poly 2025-2026, page 18</p>

    [![Poly 2025-2026, page 19 : 1.4. STATISTIQUES À DEUX VARIABLES](papier/ch1/p19.jpg){ loading=lazy .papier }](papier/ch1/p19.jpg)
    <p class="papier-legende">1.4. STATISTIQUES À DEUX VARIABLES · Poly 2025-2026, page 19</p>

    [![Poly 2025-2026, page 20 : 1.5. STATISTIQUES À p VARIABLES](papier/ch1/p20.jpg){ loading=lazy .papier }](papier/ch1/p20.jpg)
    <p class="papier-legende">1.5. STATISTIQUES À p VARIABLES · Poly 2025-2026, page 20</p>

    [![Poly 2025-2026, page 21 : 1.5. STATISTIQUES À p VARIABLES](papier/ch1/p21.jpg){ loading=lazy .papier }](papier/ch1/p21.jpg)
    <p class="papier-legende">1.5. STATISTIQUES À p VARIABLES · Poly 2025-2026, page 21</p>

    [![Poly 2025-2026, page 22 : 1.5. STATISTIQUES À p VARIABLES](papier/ch1/p22.jpg){ loading=lazy .papier }](papier/ch1/p22.jpg)
    <p class="papier-legende">1.5. STATISTIQUES À p VARIABLES · Poly 2025-2026, page 22</p>

    <!-- /papier -->
