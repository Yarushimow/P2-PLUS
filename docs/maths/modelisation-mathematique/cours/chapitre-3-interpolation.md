---
title: "Ch. 3 — Interpolation polynomiale"
---

# Chapitre 3 — Interpolation polynomiale

=== "Version simplifiée"

    On connaît une fonction seulement en quelques points $(x_i, y_i)$ (des mesures, par exemple).
    On cherche un **polynôme qui passe exactement par ces points**, pour estimer $f$ ailleurs, la dériver ou l'intégrer.

    !!! theoreme "Existence et unicité"
        Par $n + 1$ points d'abscisses **distinctes**, il passe un **unique** polynôme de degré $\le n$.
        (Deux tels polynômes auraient une différence de degré $\le n$ avec $n + 1$ racines : elle est nulle.)

    Trois façons d'écrire **le même** polynôme :

    ## 1. Base canonique : la matrice de Vandermonde

    On écrit $p(x) = a_0 + a_1x + \dots + a_nx^n$ et on résout le système $p(x_i) = y_i$, de matrice $V = (x_i^j)$.
    Simple, mais coûteux (de l'ordre de $n^3$ opérations) et tout est à refaire si on ajoute un point.

    !!! tip "Évaluer un polynôme : Horner"
        $a_0 + x(a_1 + x(a_2 + \dots + x(a_{n-1} + a_nx)))$ ne demande que $2n$ opérations, au lieu d'environ $n^2/2$.

    ## 2. Base de Lagrange

    !!! theoreme "Polynôme de Lagrange"

        $$
        p(x) = \sum_{i=0}^n y_i\,\ell_i(x)
        \qquad
        \ell_i(x) = \prod_{j \ne i}\frac{x - x_j}{x_i - x_j}
        $$

        $\ell_i$ vaut 1 en $x_i$ et 0 aux autres nœuds : les coefficients sont directement les $y_i$.

    Exemple : points $(0, 1)$, $(1, 2)$, $(2, 5)$.
    $\ell_0 = \frac{(x - 1)(x - 2)}{2}$, $\ell_1 = -x(x - 2)$, $\ell_2 = \frac{x(x - 1)}{2}$, d'où $p = \ell_0 + 2\ell_1 + 5\ell_2 = x^2 + 1$.

    **Inconvénient** : ajouter un point oblige à recalculer **toute** la base.

    ## 3. Base de Newton (différences divisées)

    !!! definition "Différences divisées"
        $[x_i] = y_i$, puis $[x_i, x_{i+1}] = \dfrac{y_{i+1} - y_i}{x_{i+1} - x_i}$, et à l'ordre $k$ :

        $$
        [x_i, \dots, x_{i+k}] = \frac{[x_{i+1}, \dots, x_{i+k}] - [x_i, \dots, x_{i+k-1}]}{x_{i+k} - x_i}
        $$

        Elles ne dépendent pas de l'ordre des points.

    !!! theoreme "Polynôme de Newton"

        $$
        p(x) = [x_0] + [x_0, x_1](x - x_0) + [x_0, x_1, x_2](x - x_0)(x - x_1) + \dots + [x_0, \dots, x_n]\prod_{j<n}(x - x_j)
        $$

        Les coefficients sont la **première ligne** (ou diagonale) du tableau des différences divisées.

    !!! methode "Le tableau des différences divisées"
        Une colonne par ordre. Chaque case = (case du dessous à gauche − case à gauche) / (écart entre les abscisses extrêmes concernées).

        | $x_i$ | $y_i$ | ordre 1 | ordre 2 |
        |---|---|---|---|
        | 0 | **1** | **1** | **1** |
        | 1 | 2 | 3 | |
        | 2 | 5 | | |

        $p(x) = 1 + 1\cdot x + 1\cdot x(x - 1) = x^2 + 1$. **Ajouter un point** = ajouter une ligne et un terme, sans rien recalculer.

    ## Erreur d'interpolation

    !!! theoreme "Formule de l'erreur"
        Si $f \in C^{n+1}$, pour tout $x$ il existe $\xi$ (entre les nœuds et $x$) tel que

        $$
        E(x) = f(x) - p(x) = \frac{f^{(n+1)}(\xi)}{(n + 1)!}\,(x - x_0)(x - x_1)\cdots(x - x_n).
        $$

        Avec des nœuds équidistants de pas $h$ sur $[a, b]$ : $|E(x)| \le \dfrac{h^{n+1}}{4(n + 1)}\max|f^{(n+1)}|$.

    !!! methode "Majorer l'erreur"
        1. Majorer $|f^{(n+1)}|$ par $M$ sur l'intervalle.
        2. Trouver le maximum de $|\prod(x - x_i)|$ (en dérivant ce polynôme).
        3. $|E(x)| \le \frac{M}{(n+1)!}\max|\prod(x - x_i)|$.

        Pour les nœuds $0, 1, 2$ : $\max_{[0,2]}|x(x-1)(x-2)| = \frac{2}{3\sqrt3} \approx 0{,}385$, atteint en $x = 1 \pm \frac{1}{\sqrt3}$.

    !!! piege "Extrapoler"
        Un polynôme d'interpolation n'est fiable qu'**entre** ses nœuds. Hors de l'intervalle, l'erreur peut exploser.

    ## Phénomène de Runge

    Plus de points ne veut **pas** toujours dire meilleure approximation. Pour $f(x) = \dfrac{1}{1 + 25x^2}$ sur $[-1, 1]$ avec des nœuds
    **équidistants**, le polynôme oscille de plus en plus aux bords quand $n$ augmente, et l'erreur maximale tend vers l'infini.

    Le remède : les **nœuds de Tchebychev**, plus serrés près des bords, qui minimisent $\max|\prod(x - x_i)|$ :

    $$
    x_i = \cos\left(\frac{2i + 1}{2(n + 1)}\pi\right), \quad i = 0, \dots, n \quad (\text{sur } [-1, 1]).
    $$

=== "Version papier"

    Le chapitre 3 du polycopié 2025-2026 et son formulaire (le TD est dans le [TD 3](../td/td-3-interpolation.md)).

    <!-- papier: pdf/SM401P/poly.pdf | Poly 2025-2026 | ch3 | page | 49-68 -->

    [![Poly 2025-2026, page 49 : 3. Interpolation polynômiale](papier/ch3/p49.jpg){ loading=lazy .papier }](papier/ch3/p49.jpg)
    <p class="papier-legende">3. Interpolation polynômiale · Poly 2025-2026, page 49</p>

    [![Poly 2025-2026, page 50 : Chapitre 3. Interpolation polynômiale](papier/ch3/p50.jpg){ loading=lazy .papier }](papier/ch3/p50.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 50</p>

    [![Poly 2025-2026, page 51 : 3.2 Interpolation et matrice de Vandermonde](papier/ch3/p51.jpg){ loading=lazy .papier }](papier/ch3/p51.jpg)
    <p class="papier-legende">3.2 Interpolation et matrice de Vandermonde · Poly 2025-2026, page 51</p>

    [![Poly 2025-2026, page 52 : Chapitre 3. Interpolation polynômiale](papier/ch3/p52.jpg){ loading=lazy .papier }](papier/ch3/p52.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 52</p>

    [![Poly 2025-2026, page 53 : 3.3 Interpolation et base de Lagrange](papier/ch3/p53.jpg){ loading=lazy .papier }](papier/ch3/p53.jpg)
    <p class="papier-legende">3.3 Interpolation et base de Lagrange · Poly 2025-2026, page 53</p>

    [![Poly 2025-2026, page 54 : Chapitre 3. Interpolation polynômiale](papier/ch3/p54.jpg){ loading=lazy .papier }](papier/ch3/p54.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 54</p>

    [![Poly 2025-2026, page 55 : 3.3 Interpolation et base de Lagrange](papier/ch3/p55.jpg){ loading=lazy .papier }](papier/ch3/p55.jpg)
    <p class="papier-legende">3.3 Interpolation et base de Lagrange · Poly 2025-2026, page 55</p>

    [![Poly 2025-2026, page 56 : Chapitre 3. Interpolation polynômiale](papier/ch3/p56.jpg){ loading=lazy .papier }](papier/ch3/p56.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 56</p>

    [![Poly 2025-2026, page 57 : 3.3 Interpolation et base de Lagrange](papier/ch3/p57.jpg){ loading=lazy .papier }](papier/ch3/p57.jpg)
    <p class="papier-legende">3.3 Interpolation et base de Lagrange · Poly 2025-2026, page 57</p>

    [![Poly 2025-2026, page 58 : Chapitre 3. Interpolation polynômiale](papier/ch3/p58.jpg){ loading=lazy .papier }](papier/ch3/p58.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 58</p>

    [![Poly 2025-2026, page 59 : 3.4 Interpolation et base de Newton](papier/ch3/p59.jpg){ loading=lazy .papier }](papier/ch3/p59.jpg)
    <p class="papier-legende">3.4 Interpolation et base de Newton · Poly 2025-2026, page 59</p>

    [![Poly 2025-2026, page 60 : Chapitre 3. Interpolation polynômiale](papier/ch3/p60.jpg){ loading=lazy .papier }](papier/ch3/p60.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 60</p>

    [![Poly 2025-2026, page 61 : 3.4 Interpolation et base de Newton](papier/ch3/p61.jpg){ loading=lazy .papier }](papier/ch3/p61.jpg)
    <p class="papier-legende">3.4 Interpolation et base de Newton · Poly 2025-2026, page 61</p>

    [![Poly 2025-2026, page 62 : Chapitre 3. Interpolation polynômiale](papier/ch3/p62.jpg){ loading=lazy .papier }](papier/ch3/p62.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 62</p>

    [![Poly 2025-2026, page 63 : 3.4 Interpolation et base de Newton](papier/ch3/p63.jpg){ loading=lazy .papier }](papier/ch3/p63.jpg)
    <p class="papier-legende">3.4 Interpolation et base de Newton · Poly 2025-2026, page 63</p>

    [![Poly 2025-2026, page 64 : Chapitre 3. Interpolation polynômiale](papier/ch3/p64.jpg){ loading=lazy .papier }](papier/ch3/p64.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 64</p>

    [![Poly 2025-2026, page 65 : 3.6 Problème de stabilité...](papier/ch3/p65.jpg){ loading=lazy .papier }](papier/ch3/p65.jpg)
    <p class="papier-legende">3.6 Problème de stabilité... · Poly 2025-2026, page 65</p>

    [![Poly 2025-2026, page 66 : Chapitre 3. Interpolation polynômiale](papier/ch3/p66.jpg){ loading=lazy .papier }](papier/ch3/p66.jpg)
    <p class="papier-legende">Chapitre 3. Interpolation polynômiale · Poly 2025-2026, page 66</p>

    [![Poly 2025-2026, page 67 : 3.6 Problème de stabilité...](papier/ch3/p67.jpg){ loading=lazy .papier }](papier/ch3/p67.jpg)
    <p class="papier-legende">3.6 Problème de stabilité... · Poly 2025-2026, page 67</p>

    [![Poly 2025-2026, page 68 : Formulaire : Interpolation polynomiale](papier/ch3/p68.jpg){ loading=lazy .papier }](papier/ch3/p68.jpg)
    <p class="papier-legende">Formulaire : Interpolation polynomiale · Poly 2025-2026, page 68</p>

    <!-- /papier -->
