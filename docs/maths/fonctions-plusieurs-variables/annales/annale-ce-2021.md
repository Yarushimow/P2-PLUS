---
title: "Annale — CE 2021-2022"
---

# Annale — CE d'octobre 2021

**1 heure**, 3 exercices. Sujet et corrigé officiels : [onglet Annales](index.md).

## Exercice 1 — Dérivées partielles

Calculer $\dfrac{\partial f_i}{\partial x}$ et $\dfrac{\partial f_i}{\partial y}$ en tout point de $\mathbb{R}^2$ :

1. $f_1(x, y) = x^2 + xy + y^2$
2. $f_2(x, y) = \cos(x + y) + \sin(x - y)$
3. $f_3(x, y) = xy\ln(x^2 + y^2 + 1)$

??? success "Corrigé"
    1. $\dfrac{\partial f_1}{\partial x} = 2x + y$ et, par symétrie, $\dfrac{\partial f_1}{\partial y} = x + 2y$.
    2. $\dfrac{\partial f_2}{\partial x} = -\sin(x + y) + \cos(x - y)$ et $\dfrac{\partial f_2}{\partial y} = -\sin(x + y) - \cos(x - y)$ (la dérivée de $x - y$ en $y$ vaut $-1$).
    3. Produit $(xy)\times\ln(\dots)$, avec $(\ln u)' = \frac{u'}{u}$ et $u$ **entier** au dénominateur :

        $$
        \frac{\partial f_3}{\partial x} = y\ln(x^2 + y^2 + 1) + \frac{2x^2y}{x^2 + y^2 + 1}, \qquad
        \frac{\partial f_3}{\partial y} = x\ln(x^2 + y^2 + 1) + \frac{2xy^2}{x^2 + y^2 + 1}.
        $$

## Exercice 2 — Continuité et classe $C^1$

$$
f(x, y) = \begin{cases}\dfrac{3x^2y^2}{x^2 + y^2} & \text{si } (x, y) \neq (0, 0)\\[2mm] 0 & \text{si } (x, y) = (0, 0).\end{cases}
$$

1. Étudier la continuité de $f$ en $(0, 0)$.
2. Calculer $f_x$ et $f_y$ pour $(x, y) \neq (0, 0)$.
3. Montrer que $f$ admet des dérivées partielles en $(0, 0)$ et les calculer.
4. Les dérivées partielles sont-elles continues en $(0, 0)$ ?

??? success "Corrigé"
    **1.** $\lvert f\rvert = 3y^2\cdot\dfrac{x^2}{x^2 + y^2} \leq 3y^2 \to 0 = f(0, 0)$. **$f$ est continue en $(0, 0)$.**

    **2.** Règle du quotient (valable hors de l'origine) :
    $f_x = \dfrac{6xy^2(x^2 + y^2) - 3x^2y^2\cdot 2x}{(x^2 + y^2)^2} = \dfrac{6xy^4}{(x^2 + y^2)^2}$ et, par symétrie, $f_y = \dfrac{6x^4y}{(x^2 + y^2)^2}$.

    **3. Définition** : $f(h, 0) = 0$, donc $f_x(0, 0) = \lim\limits_{h\to0}\dfrac{0 - 0}{h} = 0$. De même $f_y(0, 0) = 0$.

    **4.** $\lvert f_x\rvert = 6\lvert x\rvert\Big(\dfrac{y^2}{x^2 + y^2}\Big)^2 \leq 6\lvert x\rvert \to 0 = f_x(0, 0)$ (en polaires : $6r\cos\theta\sin^4\theta$). De même $\lvert f_y\rvert \leq 6\lvert y\rvert \to 0$.
    **Les dérivées partielles sont continues : $f$ est $C^1$, donc différentiable, en $(0, 0)$.**

## Exercice 3 — EDP par primitivation

$f$ de classe $C^1$ vérifie $\dfrac{\partial f}{\partial x} = x^2y^3$ (1) et $\dfrac{\partial f}{\partial y} = x^3y^2$ (2).

1. Avec (1), donner une expression de $f$ faisant intervenir une fonction de $y$.
2. Avec (2), déterminer $f$ à une constante près.

??? success "Corrigé"
    1. On primitive (1) en $x$ : $f(x, y) = \dfrac{x^3y^3}{3} + g(y)$, avec $g$ de classe $C^1$.
    2. On **dérive** en $y$ : $f_y = x^3y^2 + g'(y)$. Avec (2) : $g'(y) = 0$, donc $g = C$ constante et

        $$
        \boxed{f(x, y) = \frac{x^3y^3}{3} + C, \quad C \in \mathbb{R}.}
        $$
