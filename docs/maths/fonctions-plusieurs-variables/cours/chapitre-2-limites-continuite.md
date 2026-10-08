---
title: "Ch. 2 — Limites et continuité"
---

# Chapitre 2 — Limites et continuité

=== "Version simplifiée"

    ## Distance et voisinages dans $\mathbb{R}^n$

    Pour parler de limite, il faut savoir quand deux points sont « proches ».

    !!! definition "Norme et distance euclidiennes"
        Pour $x = (x_1, \dots, x_n) \in \mathbb{R}^n$ :

        $$
        \lVert x \rVert = \sqrt{x_1^2 + \dots + x_n^2}, \qquad d(x, y) = \lVert x - y \rVert
        $$

        Exemple : $x = (1, 3, -2, 2)$, $y = (1, 2, -4, 0)$, $x - y = (0, 1, 2, 2)$ donc $d(x, y) = 3$.

    D'autres distances existent (distance de Manhattan, par exemple), mais le cours
    utilise la distance euclidienne.

    !!! definition "Boule ouverte, ouvert, fermé"
        - **Boule ouverte** de centre $a$ et de rayon $r > 0$ : $B(a, r) = \{x \;/\; d(x, a) < r\}$.
          Dans $\mathbb{R}$ c'est l'intervalle $]a - r, a + r[$, dans $\mathbb{R}^2$ un disque sans son bord.
        - $\Omega$ est un **ouvert** s'il contient une petite boule autour de chacun de ses points.
          Exemples : $\{y > 0\}$, $\{y \neq x\}$, $\mathbb{R}^n$, $\emptyset$.
        - $\Omega$ est un **fermé** si son complémentaire est ouvert. Exemples : $\{y \leq 0\}$, $[-6, 1]$.

    !!! definition "Point intérieur, point frontière"
        - $x$ est **intérieur** à $\Omega$ s'il existe une boule centrée en $x$ entièrement dans $\Omega$.
        - $x$ est un point **frontière** si toute boule centrée en $x$ contient des points de $\Omega$ **et** des points hors de $\Omega$.
          Un point frontière peut appartenir à $\Omega$ ou non.

        Exemple : $\Omega = [0, 10[ \cup \{15\}$ a pour points frontière $0$, $10$ et $15$.

    ## Limite

    !!! definition "Limite en $(a_1, a_2)$"
        $\displaystyle\lim_{(x,y)\to(a_1,a_2)} f(x, y) = \ell$ si, pour tout $\varepsilon > 0$,
        il existe $\delta > 0$ tel que

        $$
        0 < \sqrt{(x - a_1)^2 + (y - a_2)^2} < \delta \implies |f(x, y) - \ell| < \varepsilon
        $$

        Autrement dit : $f(x, y)$ est aussi proche qu'on veut de $\ell$ dès que $(x, y)$ est assez proche de $(a_1, a_2)$, **quel que soit le chemin** pour y arriver.

    En une variable, on arrive en $a$ par la gauche ou par la droite. En deux variables,
    on peut arriver en $(a_1, a_2)$ par une **infinité de chemins**. D'où les deux règles :

    !!! theoreme "Ce qu'on en déduit"
        - **Unicité** : si la limite existe, elle est unique.
        - Si **deux chemins** donnent deux limites différentes, **la limite n'existe pas**.
        - Pour montrer qu'elle **existe**, tester des chemins ne suffit jamais : il faut une preuve valable pour tous les chemins à la fois (majoration ou polaires).

    !!! theoreme "Opérations sur les limites"
        Si $f \to \ell$ et $g \to m$ en $(a_1, a_2)$, alors $f \pm g \to \ell \pm m$,
        $fg \to \ell m$, $f / g \to \ell / m$ (si $m \neq 0$) et $h \circ f \to h(\ell)$
        si $h$ est continue en $\ell$.

    ## Méthode complète

    !!! methode "Étudier $\lim_{(x,y)\to(a_1,a_2)} f(x,y)$"
        1. **Remplacer directement.** Un nombre : c'est la limite. $\frac{\text{nombre} \neq 0}{0}$ : pas de limite finie. $\frac{0}{0}$ : on continue.
        2. **Recentrer** si le point n'est pas $(0, 0)$ : $X = x - a_1$, $Y = y - a_2$.
        3. **Tester des chemins** qui passent par le point : $y = mx$ (toutes les droites d'un coup), $x = 0$, puis une parabole $y = x^2$ ou $x = y^2$.
            - S'il reste du $m$ après simplification, ou si deux chemins diffèrent : **pas de limite**.
            - Si tout donne la même valeur $\ell$ : on la **soupçonne**, il faut la prouver.
        4. **Prouver** que $|f(x, y) - \ell| \to 0$ :
            - par **majoration** : $|f - \ell| \leq g(x, y)$ avec $g \to 0$ ;
            - par les **coordonnées polaires**.

    ### Coordonnées polaires

    $$
    x = r\cos\theta, \qquad y = r\sin\theta, \qquad r^2 = x^2 + y^2
    $$

    $(x, y) \to (0, 0)$ revient à $r \to 0$, et $\theta$ est la direction d'arrivée.

    - Si $\lim_{r\to 0} f(r\cos\theta, r\sin\theta) = \ell$ **sans dépendre de $\theta$**, la limite existe et vaut $\ell$.
    - Si le résultat **dépend de $\theta$**, la limite n'existe pas.

    Pour bien rédiger, on majore la partie en $\theta$ avec $|\cos\theta| \leq 1$ et $|\sin\theta| \leq 1$.

    ### Les quatre exemples du cours (en $(0, 0)$)

    **Exemple 2.6** : $f = \dfrac{x^2 - y^2}{x^2 + y^2}$. Sur $y = 0$ : $f = 1$. Sur $x = 0$ : $f = -1$.
    **Pas de limite.** En polaires : $f = \cos^2\theta - \sin^2\theta = \cos 2\theta$, qui dépend de $\theta$.

    **Exemple 2.7** : $f = \dfrac{xy}{x^2 + y^2}$. Sur $y = mx$ : $f = \dfrac{m}{1 + m^2}$, qui dépend de $m$.
    **Pas de limite.** En polaires : $f = \cos\theta\sin\theta$.

    **Exemple 2.8** : $f = \dfrac{xy^2}{x^2 + y^4}$. Sur $y = mx$ : $f = \dfrac{m^2 x}{1 + m^4 x^2} \to 0$ pour toute droite.
    Mais sur $x = y^2$ : $f = \dfrac{y^4}{2y^4} = \dfrac{1}{2}$. **Pas de limite.**

    **Exemple 2.9** : $f = \dfrac{3x^2 y}{x^2 + y^2}$. Tous les chemins donnent 0. Preuve :

    $$
    |f(x, y)| = \underbrace{\frac{x^2}{x^2 + y^2}}_{\leq 1} \cdot 3|y| \leq 3|y| \xrightarrow[(x,y)\to(0,0)]{} 0
    $$

    **La limite existe et vaut 0.** En polaires : $f = 3r\cos^2\theta\sin\theta$ et $|f| \leq 3r \to 0$.

    !!! tip "Repère rapide : les degrés"
        Pour une fraction dont chaque étage est **homogène** (tous les termes du même degré),
        on compare le degré $p$ du numérateur et $q$ du dénominateur. En polaires,
        $f = r^{p-q} \times g(\theta)$.

        - $p > q$ : la limite vaut 0 (à prouver par majoration ou polaires) ;
        - $p = q$ : en général pas de limite (le résultat dépend de $\theta$) ;
        - $p < q$ : pas de limite finie.

        Si un étage mélange des degrés (comme $x^2 + y^4$), la règle ne s'applique pas :
        on choisit la parabole qui égalise les termes ($x = y^2$ ici).

    ## Continuité

    !!! definition "Continuité en un point"
        $f$ est continue en $(a_1, a_2) \in D_f$ si et seulement si

        $$
        \lim_{(x,y)\to(a_1,a_2)} f(x, y) = f(a_1, a_2)
        $$

        $f$ est continue sur $D_f$ si elle l'est en chaque point. Intuitivement : pas de saut.

    !!! theoreme "Fonctions continues usuelles"
        - Les polynômes $\sum a_{ij} x^i y^j$ sont continus sur $\mathbb{R}^2$.
        - Somme, produit, quotient (dénominateur non nul) et composée de fonctions continues sont continus.

        Exemple : $x^2 y + 5xy^3 - 3x + 6$ est continue, donc sa limite en $(1, -2)$ vaut sa valeur : $-2 - 40 - 3 + 6 = -39$.

    !!! methode "Continuité d'une fonction définie en deux morceaux"
        $$
        g(x, y) = \begin{cases} \text{expression} & \text{si } (x, y) \neq (0, 0) \\ c & \text{si } (x, y) = (0, 0) \end{cases}
        $$

        1. Hors de $(0, 0)$ : « quotient de fonctions continues, dénominateur non nul, donc continue ».
        2. En $(0, 0)$ : calculer la limite de l'expression.
        3. Comparer avec $c$ : continue si et seulement si la limite **existe et vaut $c$**.

    Exemples du cours :

    - $\dfrac{x^2 - y^2}{x^2 + y^2}$ prolongée par 0 : pas de limite, **pas continue** en $(0, 0)$.
    - $\dfrac{3x^2 y}{x^2 + y^2}$ prolongée par 0 : limite 0, **continue** sur $\mathbb{R}^2$.
    - $g = 0$ partout sauf $g(0, 0) = 1$ : limite 0 mais $g(0, 0) = 1$, **pas continue**.

    !!! definition "Prolongement par continuité"
        Si $f$ n'est pas définie en $(a_1, a_2)$ mais que $\lim f = \ell$ existe, on peut poser
        $\tilde f(a_1, a_2) = \ell$ : la fonction obtenue est continue en ce point.

    ## Applications partielles

    !!! definition "Applications partielles en $(a, b)$"
        $f_1 : x \mapsto f(x, b)$ (on fixe $y = b$) et $f_2 : y \mapsto f(a, y)$ (on fixe $x = a$).

        Ce sont les coupes de la surface par les plans verticaux $y = b$ et $x = a$.

        Exemple : $f(x, y) = \dfrac{x + y}{x - y}$ en $(1, 2)$ donne $f_1(x) = \dfrac{x + 2}{x - 2}$ et $f_2(y) = \dfrac{1 + y}{1 - y}$.

    !!! piege "Applications partielles continues ≠ fonction continue"
        Si $f$ a une limite en un point, ses applications partielles ont la même. **La réciproque est fausse** :
        $\dfrac{xy}{x^2 + y^2}$ (prolongée par 0) vaut 0 sur les deux axes, mais n'a pas de limite en $(0, 0)$.

=== "Version papier"

    Les pages du poly pour le chapitre 2 (cours d'Elie Chahine, 2022-2023). Les exercices sont dans la [version papier du TD 2](../td/td-2-limites-continuite.md).

    [![Chapitre 2, page 15 : Introduction](papier/ch2/p15.jpg){ loading=lazy .papier }](papier/ch2/p15.jpg)
    <p class="papier-legende">Introduction · Chapitre 2, p. 15</p>

    [![Chapitre 2, page 16 : L’espace euclidien ℝⁿ · Distance euclidienne et norme](papier/ch2/p16.jpg){ loading=lazy .papier }](papier/ch2/p16.jpg)
    <p class="papier-legende">L’espace euclidien ℝⁿ · Distance euclidienne et norme · Chapitre 2, p. 16</p>

    [![Chapitre 2, page 17 : L’espace euclidien ℝⁿ · Voisinage dans ℝⁿ](papier/ch2/p17.jpg){ loading=lazy .papier }](papier/ch2/p17.jpg)
    <p class="papier-legende">L’espace euclidien ℝⁿ · Voisinage dans ℝⁿ · Chapitre 2, p. 17</p>

    [![Chapitre 2, page 18 : Voisinage dans ℝⁿ (suite)](papier/ch2/p18.jpg){ loading=lazy .papier }](papier/ch2/p18.jpg)
    <p class="papier-legende">Voisinage dans ℝⁿ (suite) · Chapitre 2, p. 18</p>

    [![Chapitre 2, page 19 : Limites](papier/ch2/p19.jpg){ loading=lazy .papier }](papier/ch2/p19.jpg)
    <p class="papier-legende">Limites · Chapitre 2, p. 19</p>

    [![Chapitre 2, page 20 : Limites (suite)](papier/ch2/p20.jpg){ loading=lazy .papier }](papier/ch2/p20.jpg)
    <p class="papier-legende">Limites (suite) · Chapitre 2, p. 20</p>

    [![Chapitre 2, page 21 : Limites](papier/ch2/p21.jpg){ loading=lazy .papier }](papier/ch2/p21.jpg)
    <p class="papier-legende">Limites · Chapitre 2, p. 21</p>

    [![Chapitre 2, page 22 : Continuité](papier/ch2/p22.jpg){ loading=lazy .papier }](papier/ch2/p22.jpg)
    <p class="papier-legende">Continuité · Chapitre 2, p. 22</p>

    [![Chapitre 2, page 23 : Continuité](papier/ch2/p23.jpg){ loading=lazy .papier }](papier/ch2/p23.jpg)
    <p class="papier-legende">Continuité · Chapitre 2, p. 23</p>

    [![Chapitre 2, page 24 : Cas des fonctions sur ℝⁿ · Applications partielles](papier/ch2/p24.jpg){ loading=lazy .papier }](papier/ch2/p24.jpg)
    <p class="papier-legende">Cas des fonctions sur ℝⁿ · Applications partielles · Chapitre 2, p. 24</p>

    [![Chapitre 2, page 25 : Applications partielles](papier/ch2/p25.jpg){ loading=lazy .papier }](papier/ch2/p25.jpg)
    <p class="papier-legende">Applications partielles · Chapitre 2, p. 25</p>

    [![Chapitre 2, page 26 : Applications partielles (suite)](papier/ch2/p26.jpg){ loading=lazy .papier }](papier/ch2/p26.jpg)
    <p class="papier-legende">Applications partielles (suite) · Chapitre 2, p. 26</p>

    ### Annexe du chapitre 2

    [![Annexe du chapitre 2, page 1](papier/ch2/annexe-01.jpg){ loading=lazy .papier }](papier/ch2/annexe-01.jpg)
    <p class="papier-legende">Annexe du chapitre 2, page 1/3</p>

    [![Annexe du chapitre 2, page 2](papier/ch2/annexe-02.jpg){ loading=lazy .papier }](papier/ch2/annexe-02.jpg)
    <p class="papier-legende">Annexe du chapitre 2, page 2/3</p>

    [![Annexe du chapitre 2, page 3](papier/ch2/annexe-03.jpg){ loading=lazy .papier }](papier/ch2/annexe-03.jpg)
    <p class="papier-legende">Annexe du chapitre 2, page 3/3</p>

    ### Corrigés des exemples du cours (en anglais)

    [![Corrigés des exemples du chapitre 2, page 1](papier/ch2/corrige-01.jpg){ loading=lazy .papier }](papier/ch2/corrige-01.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 2, page 1/5</p>

    [![Corrigés des exemples du chapitre 2, page 2](papier/ch2/corrige-02.jpg){ loading=lazy .papier }](papier/ch2/corrige-02.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 2, page 2/5</p>

    [![Corrigés des exemples du chapitre 2, page 3](papier/ch2/corrige-03.jpg){ loading=lazy .papier }](papier/ch2/corrige-03.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 2, page 3/5</p>

    [![Corrigés des exemples du chapitre 2, page 4](papier/ch2/corrige-04.jpg){ loading=lazy .papier }](papier/ch2/corrige-04.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 2, page 4/5</p>

    [![Corrigés des exemples du chapitre 2, page 5](papier/ch2/corrige-05.jpg){ loading=lazy .papier }](papier/ch2/corrige-05.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 2, page 5/5</p>
