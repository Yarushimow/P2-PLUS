---
title: "Annale — CE 2020-2021"
---

# Annale — CE d'octobre 2020 (sujet A)

**45 minutes**. Sujet et corrigé officiels : [onglet Annales](index.md). Le sujet B est identique aux coefficients près.

## Exercice 1 — Continuité (11 pts)

Les fonctions suivantes, prolongées par $0$ en $(0, 0)$, sont-elles continues en $(0, 0)$ ?

1. $f(x, y) = \dfrac{7xy}{x^2 + y^2}$
2. $g(x, y) = \dfrac{e^{2xy} - 1}{x^2 + y^2}$
3. $h(x, y) = \dfrac{2xy^2}{x^2 + y^4}$

??? success "Corrigé"
    Dans les trois cas, un seul chemin qui ne donne pas $0 = f(0, 0)$ suffit.

    1. Sur $y = x$ : $f(x, x) = \dfrac{7x^2}{2x^2} = \dfrac72 \neq 0$. **Non continue.**
    2. Sur $y = x$ : $g(x, x) = \dfrac{e^{2x^2} - 1}{2x^2} \to 1$, car $\dfrac{e^t - 1}{t} \to 1$ quand $t \to 0$. Comme $1 \neq 0$ : **non continue.**
    3. Dénominateur « tordu » : on prend $x = y^2$ pour que $x^2 = y^4$. $h(y^2, y) = \dfrac{2y^4}{2y^4} = 1 \neq 0$. **Non continue.**

## Exercice 2 — Classe $C^1$ (12 pts)

Les fonctions suivantes, prolongées par $0$ en $(0, 0)$, sont-elles de classe $C^1$ en $(0, 0)$ ?

1. $f(x, y) = \dfrac{3x^2y^2}{x^2 + y^2}$
2. $g(x, y) = \dfrac{\sin(x^3) + \sin(y^3)}{x^2 + y^2}$ (indication : $\lvert\sin x\rvert \leq \lvert x\rvert$)

??? success "Corrigé"
    1. C'est la fonction de l'exercice 2 du [CE 2021-2022](annale-ce-2021.md) : $f_x = \dfrac{6xy^4}{(x^2 + y^2)^2}$ hors de l'origine, $f_x(0, 0) = 0$, et en polaires $f_x = 6r\cos\theta\sin^4\theta \to 0$. Idem pour $f_y$. **$f$ est $C^1$.**
    2. **En $(0, 0)$, par la définition** : $g(h, 0) = \dfrac{\sin(h^3)}{h^2}$, donc $g_x(0, 0) = \lim\limits_{h\to0}\dfrac{\sin(h^3)}{h^3} = 1$ (de même $g_y(0, 0) = 1$).

        **Hors de $(0, 0)$** :

        $$
        g_x = \frac{3x^2\cos(x^3)(x^2 + y^2) - 2x\big(\sin(x^3) + \sin(y^3)\big)}{(x^2 + y^2)^2}.
        $$

        Sur le chemin $y = x$ : $g_x(x, x) = \dfrac{6x^4\cos(x^3) - 4x\sin(x^3)}{4x^4} \to \dfrac64 - 1 = \dfrac12$ (car $\sin(x^3) \sim x^3$).
        Comme $\frac12 \neq 1 = g_x(0, 0)$, $g_x$ n'est pas continue en $(0, 0)$ : **$g$ n'est pas $C^1$.**

        (On pouvait aussi prendre le chemin $x = 0$, où $g_x(0, y) = 0 \neq 1$.)
