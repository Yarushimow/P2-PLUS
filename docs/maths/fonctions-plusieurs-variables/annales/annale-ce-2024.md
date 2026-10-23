---
title: "Annale — CE 2024-2025"
---

# Annale — CE du 26 octobre 2024

**55 minutes**, calculatrice autorisée, aucun document. 5 exercices, 22 points au barème indicatif. Sujet et corrigé officiels : [onglet Annales](index.md).

!!! tip "Comment l'utiliser"
    Fais chaque exercice sur papier avant d'ouvrir le corrigé. L'exercice 3 (8 points) est le même type que l'exercice 2 du [CE 2025-2026](annale-ce-2025.md) : c'est l'exercice à ne pas rater.

## Exercice 1 — Les droites ne suffisent pas (4 pts)

$$
f(x, y) = \begin{cases}\dfrac{x^4}{y(y - x^2)} & \text{si } y(y - x^2) \neq 0\\[2mm] 0 & \text{sinon.}\end{cases}
$$

1. Calculer la limite de $f$ en $(0, 0)$ sur chaque droite $y = \lambda x$, $\lambda \in \mathbb{R}$. La restriction de $f$ à toute droite est-elle continue en $(0, 0)$ ?
2. $f$ est-elle continue en $(0, 0)$ ?

??? success "Corrigé"
    1. Pour $\lambda \neq 0$ : $f(x, \lambda x) = \dfrac{x^4}{\lambda x(\lambda x - x^2)} = \dfrac{x^2}{\lambda(\lambda - x)} \xrightarrow[x\to0]{} 0 = f(0, 0)$.
       Pour $\lambda = 0$ : sur $y = 0$, $f = 0$ par définition.
       **La restriction de $f$ à toute droite est continue en $(0, 0)$.**
    2. On prend une parabole entre $y = 0$ et $y = x^2$ où le dénominateur ne s'annule pas, par exemple $y = 2x^2$ :

        $$
        f(x, 2x^2) = \frac{x^4}{2x^2(2x^2 - x^2)} = \frac{x^4}{2x^4} = \frac12 \neq 0 = f(0, 0).
        $$

        **$f$ n'est pas continue en $(0, 0)$.** Conclusion de l'exercice : la continuité sur toutes les droites ne suffit pas.

## Exercice 2 — Dérivées partielles (3 pts)

Calculer les dérivées partielles premières de $f(x, y) = \sqrt{1 + x^2y^2}$.

??? success "Corrigé"
    Avec $(\sqrt{u})' = \dfrac{u'}{2\sqrt u}$ et $u = 1 + x^2y^2$ (gardé **en entier** sous la racine) :

    $$
    \frac{\partial f}{\partial x} = \frac{2xy^2}{2\sqrt{1 + x^2y^2}} = \frac{xy^2}{\sqrt{1 + x^2y^2}}, \qquad
    \frac{\partial f}{\partial y} = \frac{x^2y}{\sqrt{1 + x^2y^2}}.
    $$

## Exercice 3 — EDP par changement de variables (8 pts)

Déterminer toutes les fonctions $f$ de classe $C^1$ sur $\mathbb{R}^2$ vérifiant $\dfrac{\partial f}{\partial x} - \dfrac{\partial f}{\partial y} = 3$, avec $u = x + y$ et $v = x - y$.

??? success "Corrigé"
    On pose $f(x, y) = g(u, v)$. Chaîne, avec $u_x = u_y = 1$, $v_x = 1$, $v_y = -1$ :

    $$
    f_x = g_u + g_v, \qquad f_y = g_u - g_v, \qquad f_x - f_y = 2g_v.
    $$

    L'équation devient $2g_v = 3$, donc $g(u, v) = \dfrac32 v + h(u)$ et

    $$
    \boxed{f(x, y) = \frac32(x - y) + h(x + y)}, \quad h \in C^1(\mathbb{R}) \text{ quelconque.}
    $$

    Réciproquement : $f_x - f_y = \big(\frac32 + h'\big) - \big(-\frac32 + h'\big) = 3$.

## Exercice 4 — Intégrale double en polaires (4 pts)

Tracer $\Delta = \{(x, y) \mid x \geq 0,\ y \geq 0,\ 1 \leq x^2 + y^2 \leq 4\}$ et calculer $\displaystyle\iint_\Delta \frac{xy}{x^2 + y^2}\,dx\,dy$.

??? success "Corrigé"
    **Dessin** : quart de couronne entre les cercles de rayons 1 et 2, dans le quart de plan $x, y \geq 0$. **Bornes** : $1 \leq r \leq 2$, $0 \leq \theta \leq \frac\pi2$.

    $$
    I = \int_1^2\int_0^{\pi/2}\frac{r^2\cos\theta\sin\theta}{r^2}\,r\,d\theta\,dr = \int_1^2 r\,dr\times\int_0^{\pi/2}\cos\theta\sin\theta\,d\theta = \frac32\times\frac12 = \boxed{\frac34}.
    $$

    ($\int_0^{\pi/2}\cos\theta\sin\theta\,d\theta = \big[\frac{\sin^2\theta}{2}\big]_0^{\pi/2} = \frac12$.)

## Exercice 5 — Fonctions homogènes (3 pts)

$f$ de classe $C^1$ sur $\mathbb{R}^2$ est homogène de degré $r$ si $f(tx, ty) = t^r f(x, y)$ pour tout $(x, y)$ et tout $t > 0$. Montrer que ses dérivées partielles sont homogènes de degré $r - 1$.

??? success "Corrigé"
    On fixe $t > 0$ et on dérive l'égalité $f(tx, ty) = t^r f(x, y)$ **par rapport à $x$** :

    - à gauche, par la règle de la chaîne (la dérivée de $tx$ en $x$ vaut $t$) : $t\,\dfrac{\partial f}{\partial x}(tx, ty)$ ;
    - à droite : $t^r\,\dfrac{\partial f}{\partial x}(x, y)$.

    Donc $t\,f_x(tx, ty) = t^r f_x(x, y)$, soit $f_x(tx, ty) = t^{r - 1}f_x(x, y)$ : **$f_x$ est homogène de degré $r - 1$**. Même calcul en dérivant par rapport à $y$ pour $f_y$.
