---
title: "Annale — CE 2025-2026"
---

# Annale — CE du 23 octobre 2025

**55 minutes**, calculatrice autorisée, aucun document. 4 exercices sur 5 points. Sujet et corrigé officiels : [onglet Annales](index.md).

!!! tip "Comment l'utiliser"
    Fais chaque exercice sur papier avant d'ouvrir le corrigé, en visant environ 13 minutes par exercice. Les corrigés reprennent ceux du département, avec les étapes intermédiaires en plus.

## Exercice 1 — Intégrale double en polaires (5 pts)

Tracer $\Delta = \{(x, y) \in \mathbb{R}^2 \mid x \geq 0,\ 0 \leq y \leq x,\ 1 \leq x^2 + y^2 \leq 9\}$, puis calculer

$$
I = \iint_\Delta \frac{x^2 y}{x^2 + y^2}\,dx\,dy.
$$

??? success "Corrigé"
    **Dessin.** Les cercles de centre $O$ et de rayons 1 et 3, la droite $y = x$. On garde le morceau de couronne situé entre l'axe $Ox$ ($y = 0$) et la droite $y = x$, côté $x \geq 0$ : une part de $45°$.

    **Bornes.** $1 \leq x^2 + y^2 \leq 9$ donne $1 \leq r \leq 3$. La condition $y \geq 0$ donne $\theta \geq 0$, et $y \leq x$ (sous la droite $y = x$) donne $\theta \leq \frac\pi4$.

    **Calcul.** Avec $dx\,dy = r\,dr\,d\theta$ :

    $$
    I = \int_1^3\int_0^{\pi/4}\frac{r^2\cos^2\theta\cdot r\sin\theta}{r^2}\,r\,d\theta\,dr
      = \int_1^3 r^2\,dr\times\int_0^{\pi/4}\cos^2\theta\sin\theta\,d\theta.
    $$

    - $\displaystyle\int_1^3 r^2\,dr = \Big[\frac{r^3}{3}\Big]_1^3 = \frac{26}{3}$.
    - $\displaystyle\int_0^{\pi/4}\cos^2\theta\sin\theta\,d\theta = \Big[-\frac{\cos^3\theta}{3}\Big]_0^{\pi/4} = \frac13\Big(1 - \big(\tfrac{\sqrt2}{2}\big)^3\Big) = \frac13\Big(1 - \frac{\sqrt2}{4}\Big)$ (forme $u^2u'$ avec $u = \cos\theta$).

    $$
    \boxed{I = \frac{26}{9} - \frac{13\sqrt2}{18} \approx 1{,}87}
    $$

## Exercice 2 — EDP par changement de variables (5 pts)

Déterminer toutes les fonctions $f : \mathbb{R}^2 \to \mathbb{R}$ de classe $C^1$ vérifiant

$$
\frac{\partial f}{\partial x} - \frac{\partial f}{\partial y} = 4x,
$$

en utilisant le changement de variables $u = x + y$, $v = x - y$.

??? success "Corrigé"
    On pose $f(x, y) = g(u, v)$. On a $u_x = 1$, $u_y = 1$, $v_x = 1$, $v_y = -1$, donc par la règle de la chaîne :

    $$
    f_x = g_u u_x + g_v v_x = g_u + g_v, \qquad f_y = g_u u_y + g_v v_y = g_u - g_v.
    $$

    D'où $f_x - f_y = 2g_v$. Second membre : $u + v = 2x$, donc $4x = 2(u + v)$. L'équation devient

    $$
    2g_v = 2(u + v) \iff g_v = u + v.
    $$

    On primitive en $v$ ($u$ est une constante) : $g(u, v) = uv + \dfrac{v^2}{2} + h(u)$. On revient en $(x, y)$ :

    $$
    \boxed{f(x, y) = (x + y)(x - y) + \frac{(x - y)^2}{2} + h(x + y)}, \quad h \in C^1(\mathbb{R}) \text{ quelconque.}
    $$

    Réciproquement, une telle fonction est solution : $f_x - f_y = \big(2x + (x - y)\big) - \big(-2y - (x - y)\big) = 4x$.

## Exercice 3 — Limite avec paramètres (5 pts)

Soient $\alpha, \beta > 0$ et $f(x, y) = \dfrac{x^\alpha y^\beta}{x^2 + y^2}$ sur son domaine. Pour quelles valeurs de $\alpha$ et $\beta$ la fonction $f$ admet-elle $0$ comme limite en $(0, 0)$ ?

*Indication : $\lvert x\rvert \leq \sqrt{x^2 + y^2}$ et $\lvert y\rvert \leq \sqrt{x^2 + y^2}$.*

??? success "Corrigé"
    **Si $\alpha + \beta > 2$.** Avec l'indication :

    $$
    0 \leq \lvert f(x, y)\rvert \leq \frac{\big(\sqrt{x^2 + y^2}\big)^{\alpha + \beta}}{x^2 + y^2} = (x^2 + y^2)^{\frac{\alpha + \beta}{2} - 1}.
    $$

    L'exposant $\frac{\alpha + \beta}{2} - 1$ est $> 0$, donc ce majorant tend vers 0 : **$f \to 0$**. (En polaires, c'est $\lvert f\rvert \leq r^{\alpha + \beta - 2}$.)

    **Si $\alpha + \beta \leq 2$.** Sur le chemin $y = x$, $x > 0$ : $f(x, x) = \dfrac{x^{\alpha + \beta}}{2x^2} = \dfrac12 x^{\alpha + \beta - 2}$.
    Cela tend vers $\frac12$ si $\alpha + \beta = 2$ et vers $+\infty$ si $\alpha + \beta < 2$ : dans les deux cas, pas vers 0.

    $$
    \boxed{f \xrightarrow[(0,0)]{} 0 \iff \alpha + \beta > 2}
    $$

## Exercice 4 — Plan tangent et surfaces (5 pts)

$\Sigma = \{(x, y, z) \in \mathbb{R}^3 \mid z = x^2 - y^2\}$.

1. Déterminer le ou les points de $\Sigma$ où le plan tangent est horizontal.
2. Donner la position de $\Sigma$ par rapport au plan tangent en ce(s) point(s).
3. Soit $\Sigma' = \{(x, y, z) \mid z = x^2 + y^2 - 1\}$. Déterminer $\Sigma \cap \Sigma'$.

??? success "Corrigé"
    1. $\Sigma$ est le graphe de $f(x, y) = x^2 - y^2$. Le plan tangent est horizontal quand les deux pentes sont nulles : $f_x = 2x = 0$ et $f_y = -2y = 0$. **Seul point : $(0, 0, 0)$.**
    2. Le plan tangent en ce point est $z = 0$. On étudie le signe de $z - 0 = x^2 - y^2$ :
        - $> 0$ quand $\lvert x\rvert > \lvert y\rvert$ (par exemple sur l'axe $Ox$) : surface **au-dessus** du plan ;
        - $< 0$ quand $\lvert x\rvert < \lvert y\rvert$ (par exemple sur l'axe $Oy$) : surface **en dessous**.

        La surface traverse son plan tangent : $(0, 0, 0)$ est un **point selle**.
    3. On égalise les $z$ : $x^2 - y^2 = x^2 + y^2 - 1 \iff y^2 = \frac12 \iff y = \pm\frac{1}{\sqrt2}$. Puis $z = x^2 - \frac12$.
       L'intersection est formée de **deux paraboles**, dans les plans $y = \frac{1}{\sqrt2}$ et $y = -\frac{1}{\sqrt2}$ :

        $$
        \Big\{\big(x, \tfrac{1}{\sqrt2}, x^2 - \tfrac12\big) \mid x \in \mathbb{R}\Big\} \cup \Big\{\big(x, -\tfrac{1}{\sqrt2}, x^2 - \tfrac12\big) \mid x \in \mathbb{R}\Big\}.
        $$
