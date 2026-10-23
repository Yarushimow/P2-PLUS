---
title: "Sujet blanc CE"
---

# Sujet blanc CE — Fonctions de plusieurs variables

Format du CE : **calculatrice autorisée, aucun support de cours**. Ce sujet est plus long qu'un vrai CE (55 minutes, 4 ou 5 exercices) : compte environ 1 h 30, ou fais seulement les exercices 2, 4 et 5 en 55 minutes. Barème sur 20, donné à titre indicatif. Le programme est celui du CE : chapitres 1 à 3 et intégrales doubles.

!!! tip "Comment l'utiliser"
    Fais-le sur papier, d'une traite, sans ouvrir le site. Les corrigés sont repliés sous chaque exercice : n'ouvre qu'après avoir rendu ta copie.

## Exercice 1 — Domaine et courbes de niveau (3 points)

1. Déterminer et représenter le domaine de définition de
   $$f(x, y) = \frac{\ln(y - x^2)}{\sqrt{2x - y}}.$$
2. Décrire les courbes de niveau de $g(x, y) = x^2 - 2x + y^2$ selon la valeur de $k$.

??? success "Corrigé"
    1. Il faut $y - x^2 > 0$ (argument du $\ln$) et $2x - y > 0$ (racine au dénominateur, strict).
       Donc $x^2 < y < 2x$ : la région **entre la parabole $y = x^2$ et la droite $y = 2x$**, bords exclus.
       Les deux courbes se coupent quand $x^2 = 2x$, soit en $(0, 0)$ et $(2, 4)$. Test : $(1, 1{,}5)$ vérifie $1 < 1{,}5 < 2$, il est dans le domaine.
       $$D_f = \{(x, y) \in \mathbb{R}^2 \mid x^2 < y < 2x\}.$$
    2. $g(x, y) = k \iff (x - 1)^2 + y^2 = k + 1$.
        - $k > -1$ : cercle de centre $(1, 0)$ et de rayon $\sqrt{k + 1}$ ;
        - $k = -1$ : le point $(1, 0)$ ;
        - $k < -1$ : ensemble vide.

## Exercice 2 — Limites (3 points)

Étudier les limites suivantes.

1. $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^3 + y^3}{x^2 + y^2}$
2. $\displaystyle\lim_{(x,y)\to(0,0)}\frac{2xy}{x^2 + 3y^2}$
3. $\displaystyle\lim_{(x,y)\to(1,-1)}\frac{(x - 1)^2(y + 1)}{(x - 1)^2 + (y + 1)^2}$

??? success "Corrigé"
    1. **Majoration.** $\lvert x\rvert^3 = \lvert x\rvert\,x^2 \leq \lvert x\rvert(x^2 + y^2)$, et de même pour $y$, donc
       $$\left\lvert\frac{x^3 + y^3}{x^2 + y^2}\right\rvert \leq \lvert x\rvert + \lvert y\rvert \xrightarrow[(x,y)\to(0,0)]{} 0.$$
       La limite existe et vaut **0**. (En polaires : $r(\cos^3\theta + \sin^3\theta) \to 0$, indépendant de $\theta$.)
    2. Sur $y = mx$ : $\dfrac{2m x^2}{x^2(1 + 3m^2)} = \dfrac{2m}{1 + 3m^2}$, qui dépend de $m$.
       $m = 0$ donne $0$, $m = 1$ donne $\frac12$. Deux chemins, deux valeurs : **la limite n'existe pas**.
    3. On recentre : $X = x - 1$, $Y = y + 1$, et $(X, Y) \to (0, 0)$.
       $\left\lvert\dfrac{X^2 Y}{X^2 + Y^2}\right\rvert \leq \lvert Y\rvert \to 0$ car $\frac{X^2}{X^2 + Y^2} \leq 1$.
       La limite vaut **0**.

## Exercice 3 — Continuité et différentiabilité (5 points)

Soit $f$ définie sur $\mathbb{R}^2$ par
$$
f(x, y) = \begin{cases}\dfrac{x^3 y}{x^2 + y^2} & \text{si } (x, y) \neq (0, 0)\\[2mm] 0 & \text{si } (x, y) = (0, 0).\end{cases}
$$

1. Montrer que $f$ est continue sur $\mathbb{R}^2$.
2. Calculer $f_x(x, y)$ et $f_y(x, y)$ pour $(x, y) \neq (0, 0)$, puis $f_x(0, 0)$ et $f_y(0, 0)$.
3. Les dérivées partielles sont-elles continues en $(0, 0)$ ? $f$ est-elle différentiable en $(0, 0)$ ?

??? success "Corrigé"
    1. Sur $\mathbb{R}^2 \setminus \{(0, 0)\}$, $f$ est un quotient de polynômes à dénominateur non nul : continue.
       En $(0, 0)$ : $\lvert f(x, y)\rvert = \dfrac{x^2}{x^2 + y^2}\,\lvert x y\rvert \leq \lvert xy\rvert \to 0 = f(0, 0)$.
       Donc $f$ est continue en $(0, 0)$, donc sur $\mathbb{R}^2$.
    2. Pour $(x, y) \neq (0, 0)$, règle du quotient :
       $$f_x = \frac{3x^2 y(x^2 + y^2) - 2x^4 y}{(x^2 + y^2)^2} = \frac{x^2 y\,(x^2 + 3y^2)}{(x^2 + y^2)^2},
       \qquad
       f_y = \frac{x^3(x^2 + y^2) - 2x^3 y^2}{(x^2 + y^2)^2} = \frac{x^3(x^2 - y^2)}{(x^2 + y^2)^2}.$$
       En $(0, 0)$, **définition** : $f(h, 0) = 0$ et $f(0, h) = 0$, donc
       $f_x(0, 0) = \lim\limits_{h\to0}\frac{f(h, 0) - f(0, 0)}{h} = 0$ et $f_y(0, 0) = 0$.
    3. $\lvert f_x\rvert = \dfrac{x^2}{x^2 + y^2}\cdot\dfrac{x^2 + 3y^2}{x^2 + y^2}\cdot\lvert y\rvert \leq 1 \times 3 \times \lvert y\rvert \to 0 = f_x(0, 0)$.
       $\lvert f_y\rvert = \lvert x\rvert\cdot\dfrac{x^2}{x^2 + y^2}\cdot\dfrac{\lvert x^2 - y^2\rvert}{x^2 + y^2} \leq \lvert x\rvert \to 0 = f_y(0, 0)$.
       Les deux dérivées partielles sont continues en $(0, 0)$, donc $f$ est $C^1$, donc **différentiable** en $(0, 0)$.

## Exercice 4 — EDP (3 points)

1. Déterminer les fonctions $f$ de classe $C^2$ sur $\mathbb{R}^2$ telles que $\dfrac{\partial^2 f}{\partial x\,\partial y}(x, y) = x + y$.
2. Déterminer les fonctions $f$ de classe $C^1$ sur $\mathbb{R}^2$ telles que
   $$\frac{\partial f}{\partial x} + 2\,\frac{\partial f}{\partial y} = 0,$$
   en posant $u = 2x - y$ et $v = x$.

??? success "Corrigé"
    1. $\frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right) = x + y$, donc $\frac{\partial f}{\partial y} = \frac{x^2}{2} + xy + g(y)$ (constante en $x$ : fonction de $y$).
       Puis $f(x, y) = \dfrac{x^2 y}{2} + \dfrac{x y^2}{2} + G(y) + H(x)$, avec $G' = g$ et $H$ fonctions $C^2$ quelconques.
       Vérification : $f_{yx} = x + y$. ✓
    2. On écrit $f(x, y) = g(u, v)$. Chaîne :
       $f_x = g_u u_x + g_v v_x = 2g_u + g_v$ et $f_y = g_u u_y + g_v v_y = -g_u$.
       L'équation devient $(2g_u + g_v) + 2(-g_u) = g_v = 0$.
       Donc $g(u, v) = h(u)$, soit
       $$f(x, y) = h(2x - y), \qquad h \in C^1(\mathbb{R}).$$

## Exercice 5 — Intégrales doubles (6 points)

1. Calculer $I = \displaystyle\iint_D (x + 2y)\,dx\,dy$, où $D$ est le domaine délimité par les courbes $y = x^2$ et $y = 2x$.
2. Calculer $J = \displaystyle\iint_D y\,dx\,dy$, où $D = \{(x, y) \in \mathbb{R}^2 \mid 1 \leq x^2 + y^2 \leq 4,\ x \geq 0,\ y \geq x\}$.
3. Calculer $K = \displaystyle\int_0^1\int_{\sqrt{y}}^{1} e^{x^3}\,dx\,dy$ en inversant l'ordre d'intégration.

??? success "Corrigé"
    1. Intersections : $x^2 = 2x \iff x = 0$ ou $x = 2$. Pour $0 \leq x \leq 2$, $x^2 \leq y \leq 2x$.
       $$I = \int_0^2\int_{x^2}^{2x}(x + 2y)\,dy\,dx = \int_0^2\Big[xy + y^2\Big]_{x^2}^{2x}dx = \int_0^2 (6x^2 - x^3 - x^4)\,dx.$$
       $$I = \Big[2x^3 - \frac{x^4}{4} - \frac{x^5}{5}\Big]_0^2 = 16 - 4 - \frac{32}{5} = \frac{28}{5}.$$
    2. Couronne $1 \leq r \leq 2$. Les conditions $x \geq 0$ et $y \geq x$ donnent $\frac\pi4 \leq \theta \leq \frac\pi2$.
       $$J = \int_1^2\int_{\pi/4}^{\pi/2} r\sin\theta\cdot r\,d\theta\,dr = \int_1^2 r^2\,dr\times\int_{\pi/4}^{\pi/2}\sin\theta\,d\theta = \frac73\times\frac{\sqrt2}{2} = \frac{7\sqrt2}{6}.$$
    3. Domaine : $0 \leq y \leq 1$ et $\sqrt{y} \leq x \leq 1$, soit $0 \leq x \leq 1$ et $0 \leq y \leq x^2$.
       $$K = \int_0^1\int_0^{x^2}e^{x^3}\,dy\,dx = \int_0^1 x^2 e^{x^3}\,dx = \Big[\frac{e^{x^3}}{3}\Big]_0^1 = \frac{e - 1}{3}.$$
       Dans l'ordre d'origine, $e^{x^3}$ n'a pas de primitive usuelle en $x$ : c'est le signal pour inverser.

## Barème indicatif

| Exercice | 1 | 2 | 3 | 4 | 5 | Total |
|----------|:-:|:-:|:-:|:-:|:-:|:-----:|
| Points | 3 | 3 | 5 | 3 | 6 | 20 |

Pour t'entraîner davantage dans le périmètre : [DE blanc](../annales/annale-de-blanc.md) ex. 1, [DE 2023](../annales/annale-de-2023.md) ex. 2, 3, 4 et 6 (questions 1 à 3), [TD 4](../td/td-4-integrales-multiples.md) ex. 1 à 11.

[:material-card-text: Retour à la fiche CE](../fiches/fiche-ce.md){ .md-button }
