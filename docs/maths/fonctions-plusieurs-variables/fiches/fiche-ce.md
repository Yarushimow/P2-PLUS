---
title: "Fiche CE — Chapitres 1 à 3 et intégrales doubles"
---

# Fiche CE — Chapitres 1 à 3 + intégrales doubles

CE du **samedi 24 octobre** (semaine 43). Calculatrice autorisée ; **aucun support de cours**, ni papier ni PDF.
Format des CE précédents : **55 minutes**, 4 ou 5 exercices d'environ 5 points.

!!! tip "Ce qui tombe vraiment (CE 2024-2025 et 2025-2026)"
    | Type d'exercice | Corrigés |
    |-----------------|----------|
    | **Intégrale double en polaires** sur un morceau de couronne : « tracer Δ puis calculer » | [CE 2025 ex. 1](../annales/annale-ce-2025.md#exercice-1-integrale-double-en-polaires-5-pts) · [CE 2024 ex. 4](../annales/annale-ce-2024.md#exercice-4-integrale-double-en-polaires-4-pts) |
    | **EDP** $f_x - f_y = \dots$ avec $u = x + y$, $v = x - y$ | [CE 2025 ex. 2](../annales/annale-ce-2025.md#exercice-2-edp-par-changement-de-variables-5-pts) · [CE 2024 ex. 3](../annales/annale-ce-2024.md#exercice-3-edp-par-changement-de-variables-8-pts) |
    | **Limite en $(0, 0)$** : droites puis parabole, ou « pour quels $\alpha, \beta$ » | [CE 2025 ex. 3](../annales/annale-ce-2025.md#exercice-3-limite-avec-parametres-5-pts) · [CE 2024 ex. 1](../annales/annale-ce-2024.md#exercice-1-les-droites-ne-suffisent-pas-4-pts) |
    | **Dérivées partielles** : calcul, plan tangent, fonction homogène | [CE 2025 ex. 4](../annales/annale-ce-2025.md#exercice-4-plan-tangent-et-surfaces-5-pts) · [CE 2024 ex. 2 et 5](../annales/annale-ce-2024.md) |

    Plus anciens : [CE 2021-2022](../annales/annale-ce-2021.md) (continuité, $C^1$, EDP par primitives) et [CE 2020-2021](../annales/annale-ce-2020.md).

!!! abstract "Programme du CE"
    - **Chapitres 1 à 3** : domaines et courbes de niveau, limites et continuité, dérivées partielles, différentiabilité, gradient, EDP.
    - **Chapitre 4, intégrales doubles uniquement** : Fubini, domaines bornés, polaires, changement de variables $(u, v)$.
    - **Hors CE** : intégrales triples, cylindriques et sphériques, convexité, extrema, hessienne, Lagrange.

## Les réflexes qui rapportent des points

!!! abstract "L'essentiel en 30 secondes"
    - **Domaine** : dessiner, tester $(0, 0)$ pour savoir de quel côté on est, bords exclus en pointillés.
    - **Limite** : remplacer ; si $\frac00$, chemins $y = mx$ pour réfuter, **majoration ou polaires** pour prouver.
    - **Continuité** : limite **puis comparer à la valeur imposée** au point.
    - **Dérivées** : au point problématique, **définition avec $h$** ; $C^1$ ⇒ différentiable.
    - **EDP** : primitiver (constante = fonction de l'autre variable) ou changement de variables + règle de la chaîne.
    - **Intégrale double** : dessiner le domaine, bornes extérieures = nombres, bornes intérieures = fonctions ; disque ou $x^2 + y^2$ ⇒ polaires et **$r\,dr\,d\theta$**.

## Chapitre 1 — Domaines et courbes de niveau

!!! methode "Domaine de définition"
    1. Dénominateur $\neq 0$ ; sous une racine $\geq 0$ ; dans un $\ln$ $> 0$ ; $\frac{1}{\sqrt{A}}$ ⇒ $A > 0$ strict.
    2. Réécrire chaque condition comme une courbe connue, puis dessiner l'intersection.

| Équation | Courbe |
|----------|--------|
| $(x - x_0)^2 + (y - y_0)^2 = R^2$ | cercle |
| $y = a(x - x_0)^2 + y_0$ / $x = a(y - y_0)^2 + x_0$ | parabole verticale / couchée |
| $\frac{(x - x_0)^2}{a^2} + \frac{(y - y_0)^2}{b^2} = 1$ | ellipse |
| $\frac{x^2}{a^2} - \frac{y^2}{b^2} = \pm 1$, $xy = k$ | hyperbole |

!!! methode "Courbes de niveau"
    $f(x, y) = k$, isoler, reconnaître la courbe, **discuter selon $k$** : courbe, point, ou ensemble vide.
    Exemple : $9 - x^2 - y^2 = k$ donne un cercle de rayon $\sqrt{9 - k}$ si $k < 9$, le point $O$ si $k = 9$, rien si $k > 9$.

## Chapitre 2 — Limites et continuité

!!! methode "Limite en un point"
    1. **Remplacer.** Nombre : fini. $\frac{c}{0}$, $c \neq 0$ : pas de limite finie. $\frac00$ : suite.
    2. **Recentrer** si le point n'est pas l'origine : $X = x - a$, $Y = y - b$.
    3. **Chemins** : $y = mx$. S'il reste du $m$ : prendre $m = 0$ et $m = 1$, deux valeurs ⇒ **pas de limite**.
    4. **Preuve** si tous les chemins donnent $\ell$ :
        - **majoration** : $\lvert f - \ell\rvert \leq g \to 0$ ;
        - **polaires** : du $r$ en facteur × un terme borné en $\theta$ ⇒ limite ; il reste du $\theta$ sans $r$ ⇒ pas de limite.

| Outil | Formule |
|-------|---------|
| de base | $\frac{x^2}{x^2 + y^2} \leq 1$, $\frac{y^2}{x^2 + y^2} \leq 1$ |
| racine | $\lvert x\rvert \leq \sqrt{x^2 + y^2}$ |
| produit | $2\lvert xy\rvert \leq x^2 + y^2$ |
| trigonométrie | $\lvert\sin\rvert \leq 1$, $\lvert\cos\rvert \leq 1$ |

!!! methode "Quel outil choisir ? Regarder le dénominateur"
    - **Dénominateur rond** ($x^2 + y^2$, $(x^2 + y^2)^k$, $\sqrt{x^2 + y^2}$) : comparer les degrés.
        - haut **>** bas : la limite vaut 0, à prouver en **polaires** ;
        - haut **=** bas : pas de limite, $y = mx$ donne une valeur qui dépend de $m$.
    - **Dénominateur tordu** ($x^2 + y^4$, $x^4 + y^2$) : pas d'astuce des degrés. $y = mx$ d'abord ; si toutes les droites donnent 0, prendre la **parabole qui égalise le dénominateur** ($x = y^2$ pour $x^2 + y^4$, $y = x^2$ pour $x^4 + y^2$). Pour prouver une limite : **majoration**.

| Après polaires et simplification | Conclusion |
|----------------------------------|------------|
| $r^k \times$ (borné en $\theta$), $k > 0$ | limite $= 0$ |
| sans $r$, constante $c$ | limite $= c$ |
| sans $r$, dépend de $\theta$ | pas de limite (deux angles = deux chemins) |
| autre chose | changer d'outil |

!!! example "Le cas avec paramètres (CE 2025)"
    $\dfrac{x^\alpha y^\beta}{x^2 + y^2}$ : $\lvert f\rvert \leq r^{\alpha + \beta - 2}$, donc limite 0 si $\alpha + \beta > 2$. Si $\alpha + \beta \leq 2$, le chemin $y = x$ donne $\frac12 x^{\alpha + \beta - 2}$, qui ne tend pas vers 0.

!!! methode "Continuité d'une fonction en deux morceaux"
    1. Hors du point : continue (quotient de fonctions continues, dénominateur non nul).
    2. Au point : limite du morceau du haut.
    3. **La comparer à la valeur donnée.** Égales : continue. Sinon : non.
    4. Prolongement par continuité : la limite existe et vaut $\ell$ ⇒ on pose $\tilde f = \ell$ au point. **Pas de limite ⇒ pas de prolongement.**

| Limite en $(0, 0)$ | Comparée à $f(0, 0)$ | Conclusion |
|--------------------|----------------------|------------|
| existe, vaut $\ell$ | $\ell = f(0, 0)$ | continue |
| existe, vaut $\ell$ | $\ell \neq f(0, 0)$ | discontinue, prolongeable en posant $f(0, 0) = \ell$ |
| n'existe pas | — | discontinue, non prolongeable |

!!! piege "Deux pièges de rédaction"
    - Toutes les droites donnent 0 **ne prouve rien** : $\frac{x^2 y}{x^4 + y^2}$ vaut $\frac12$ sur $y = x^2$.
    - Écrire $(x, y) \neq (0, 1)$ et non « $x \neq 0$ et $y \neq 1$ » pour le domaine d'un quotient dont le dénominateur est $x^2 + (y - 1)^2$.

## Chapitre 3 — Dérivées partielles, différentiabilité, EDP

!!! methode "Dérivées partielles"
    - $f_x$ : $y$ constante ; $f_y$ : $x$ constante. Schwarz : $f_{xy} = f_{yx}$ si les dérivées secondes sont continues.
    - **Point problématique** : $f_x(a, b) = \lim\limits_{h \to 0}\frac{f(a + h, b) - f(a, b)}{h}$, et de même pour $f_y$.
    - **Différentiabilité en $(0, 0)$** : calculer $f_x$, $f_y$ hors de l'origine, puis la limite de chacune en $(0, 0)$ ; si elle égale la valeur obtenue par la définition, $f$ est $C^1$ donc différentiable.

| Notion | Formule |
|--------|---------|
| chaîne, 1 variable | $\frac{df}{dt} = f_x\,x'(t) + f_y\,y'(t)$ |
| chaîne, 2 variables ($f(x, y) = g(u, v)$) | $f_x = g_u\,u_x + g_v\,v_x$, $\quad f_y = g_u\,u_y + g_v\,v_y$ |
| plan tangent en $(a, b)$ | $z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$ ; horizontal ⇔ $f_x = f_y = 0$ |
| homogène de degré $r$ | dériver $f(tx, ty) = t^r f(x, y)$ en $x$ : $t\,f_x(tx, ty) = t^r f_x(x, y)$ |
| gradient | $\nabla f = (f_x, f_y)$ : plus forte montée, $\perp$ aux niveaux |
| dérivée directionnelle | $D_{\vec u} f = \nabla f \cdot \vec u$, avec $\lVert\vec u\rVert = 1$ |

!!! methode "EDP"
    - **Primitiver** : $f_x = 2x + y \Rightarrow f = x^2 + xy + g(y)$ ; $f_{xy} = 0 \Rightarrow f = G(x) + H(y)$.
    - **Changement de variables**, en 5 étapes :
        1. poser $f(x, y) = g(u, v)$ ;
        2. calculer $u_x, u_y, v_x, v_y$ puis $f_x = g_u u_x + g_v v_x$ et $f_y = g_u u_y + g_v v_y$ ($g_u$ et $g_v$ **restent des lettres**) ;
        3. remplacer dans l'équation : il ne reste qu'**une seule** dérivée ; traduire aussi le second membre en $u, v$ ;
        4. primitiver : la « constante » est une fonction de l'autre variable ;
        5. revenir en $(x, y)$, en gardant la fonction arbitraire $h$.

!!! example "Le type CE : $u = x + y$, $v = x - y$"
    $u_x = u_y = v_x = 1$ et **$v_y = -1$**, donc $f_x = g_u + g_v$, $f_y = g_u - g_v$.

    - $f_x - f_y = 2g_v$ et $f_x + f_y = 2g_u$.
    - Second membre : $u + v = 2x$ et $u - v = 2y$, donc $x = \frac{u + v}{2}$, $y = \frac{u - v}{2}$.
    - $f_x - f_y = 4x$ : $2g_v = 2(u + v)$, $g = uv + \frac{v^2}{2} + h(u)$, $f = (x + y)(x - y) + \frac{(x - y)^2}{2} + h(x + y)$.

!!! piege "Les pièges"
    - $(\ln u)' = \frac{u'}{u}$ et $(\sqrt u)' = \frac{u'}{2\sqrt u}$ : **$u$ reste entier** au dénominateur. $\frac{\partial}{\partial x}\ln(x^2 + 3y^2) = \frac{2x}{x^2 + 3y^2}$, pas $\frac{2x}{x^2}$.
    - Les dérivées partielles existent **sans** que $f$ soit continue (cas $\frac{2xy}{x^2 + y^2}$).
    - Direction $(3, -4)$ : diviser par $5$ avant le produit scalaire.
    - Au point problématique, la formule du quotient n'a plus de sens : définition obligatoire.

## Chapitre 4 — Intégrales doubles (seulement)

!!! methode "Domaine borné"
    1. Dessiner, calculer les intersections des courbes.
    2. Tranches verticales : $a \leq x \leq b$ (**nombres**), $\varphi_1(x) \leq y \leq \varphi_2(x)$ (**fonctions**, bas puis haut).
    3. Si la courbe du haut ou du bas change, **couper** le domaine.
    4. Primitive qui bloque ou domaine mal découpé : **inverser l'ordre** (tranches horizontales).

!!! methode "Polaires"
    $x = r\cos\theta$, $y = r\sin\theta$, $dx\,dy = r\,dr\,d\theta$. Domaine circulaire : $r$ entre les rayons, $\theta$ entre les droites qui le bornent.

    1. **Dessiner** : cercles, droites, zone hachurée.
    2. **Bornes** : traduire **chaque condition séparément** ($x \geq 0$, $y \geq 0$, $y \leq x$…) puis prendre l'**intersection** des intervalles en $\theta$. Petite borne en bas.
    3. **Remplacer** $x$ et $y$, simplifier.
    4. **Multiplier par $r$.**
    5. **Séparer** $\int dr \times \int d\theta$ et calculer **jusqu'au nombre final** (vérification à la calculatrice).

| Domaine | $r$ | $\theta$ |
|---------|-----|----------|
| disque $x^2 + y^2 \leq R^2$ | $[0, R]$ | $[0, 2\pi]$ |
| demi-disque $x \geq 0$ | $[0, R]$ | $\left[-\frac\pi2, \frac\pi2\right]$ |
| demi-disque $y \geq 0$ | $[0, R]$ | $[0, \pi]$ |
| quart de disque $x, y \geq 0$ | $[0, R]$ | $\left[0, \frac\pi2\right]$ |
| couronne $r_1^2 \leq x^2 + y^2 \leq r_2^2$ | $[r_1, r_2]$ | selon les droites |

| Condition ou droite | Angle |
|---------------------|-------|
| $y \geq 0$ / $y \leq 0$ | $[0, \pi]$ / $[-\pi, 0]$ |
| $y \leq x$ avec $0 \leq y$ | $\left[0, \frac\pi4\right]$ |
| $y = mx$ | $\tan\theta = m$ |
| $y = x$ ($x > 0$) | $\frac\pi4$ |
| axe $Oy$ ($y > 0$) | $\frac\pi2$ |
| $y = -x$ ($y > 0$) | $\frac{3\pi}{4}$ |
| $y = -x$ ($y < 0$) | $-\frac\pi4$ |

!!! methode "Changement de variables $(u, v)$"
    $x = x(u, v)$, $y = y(u, v)$, jacobien $J = \begin{vmatrix} x_u & x_v \\ y_u & y_v \end{vmatrix}$, on intègre $\lvert J\rvert$. **Transformer chaque bord** du domaine.

| Résultat utile | Valeur |
|----------------|--------|
| $\int_0^{2\pi}\cos^2\theta\,d\theta$ | $\pi$ |
| $\int_0^{\pi}\sin^2\theta\,d\theta$ | $\frac\pi2$ |
| $\int_{\mathbb{R}}e^{-u^2}du$ | $\sqrt\pi$ |
| $\iint_D dx\,dy$ | aire de $D$ |

!!! piege "Trois pièges"
    - **Le $r$ oublié** : $\iint_{r \leq 1}dx\,dy = \int_0^{2\pi}\int_0^1 r\,dr\,d\theta = \pi$, pas $2\pi$.
    - **$\theta$ du demi-disque $x \geq 0$** : $\left[-\frac\pi2, \frac\pi2\right]$. Écrire $[0, \pi]$ donne un demi-disque $y \geq 0$, et un mauvais résultat dès que la fonction n'est pas radiale.
    - **Degrés mélangés** (ex. $x^3 y + y^3$) : séparer les termes avant d'intégrer en $r$.

## À savoir par cœur (cours interdit)

- Les équations de cercle, parabole, ellipse, hyperbole.
- Les trois approches de limite : chemins, majoration, polaires.
- La définition de $f_x(a, b)$ avec $h$, et le théorème « $C^1 \Rightarrow$ différentiable ».
- La règle de la chaîne à deux variables, et $u + v = 2x$, $u - v = 2y$ pour $u = x + y$, $v = x - y$.
- L'équation du plan tangent.
- Le jacobien polaire $= r$ et les bornes de $\theta$ du tableau.

## Veille et jour J

| Quand | Quoi |
|-------|------|
| Vendredi 23 | Refaire **à la main** l'EDP du [CE 2025](../annales/annale-ce-2025.md#exercice-2-edp-par-changement-de-variables-5-pts) et l'intégrale du [CE 2024](../annales/annale-ce-2024.md#exercice-4-integrale-double-en-polaires-4-pts), sans regarder le corrigé ; relire cette fiche. Le soir : un CE blanc en 55 minutes. |
| Samedi 24, pendant le CE | Environ 13 minutes par exercice. Commencer par les points sûrs (polaires et EDP, toujours la même méthode), puis la limite, puis le reste. |
| Avant de rendre | Chaque résultat encadré, chaque limite conclue par une phrase, la fonction $h$ présente dans l'EDP, le $r$ présent dans l'intégrale. |

## Auto-test

??? question "Domaine de $\ln(9 - x^2 - 9y^2)$ ?"
    $\frac{x^2}{9} + y^2 < 1$ : intérieur de l'ellipse de demi-axes 3 et 1, bord exclu.

??? question "$\lim_{(0,0)}\frac{3x^2 y}{x^2 + y^2}$ ?"
    $\lvert f\rvert \leq 3\lvert y\rvert \to 0$ : la limite vaut 0.

??? question "$\lim_{(0,0)}\frac{x^2 + y^2 + 3xy}{x^2 + y^2}$ ?"
    Sur $y = mx$ : $\frac{1 + m^2 + 3m}{1 + m^2}$. $m = 0$ donne 1, $m = 1$ donne $\frac52$ : pas de limite.

??? question "$f_x(0, 0)$ pour $\frac{2x^3 - y^3}{x^2 + 3y^2}$ prolongée par 0 ?"
    $f(h, 0) = 2h$, donc $f_x(0, 0) = 2$.

??? question "Plan tangent à $z = x^2 + xy - y^2$ en $(1, 1)$ ?"
    $f(1, 1) = 1$, $f_x = 2x + y = 3$, $f_y = x - 2y = -1$, donc $z = 1 + 3(x - 1) - (y - 1) = 3x - y - 1$.

??? question "Solutions de $f_x - f_y = 2y$ avec $u = x + y$, $v = x - y$ ?"
    $2g_v = u - v$, donc $g = \frac{uv}{2} - \frac{v^2}{4} + h(u)$ et $f = \frac{(x + y)(x - y)}{2} - \frac{(x - y)^2}{4} + h(x + y)$.

??? question "$\iint (x^2 + y^2)\,dx\,dy$ sur $\{x, y \geq 0,\ 1 \leq x^2 + y^2 \leq 4\}$ ?"
    $\int_1^2 r^3\,dr \times \int_0^{\pi/2}d\theta = \frac{15}{4} \times \frac\pi2 = \frac{15\pi}{8}$.

??? question "Solutions de $f_{xy} = 0$ ?"
    $f(x, y) = G(x) + H(y)$.

??? question "$\iint_{x^2 + y^2 \leq 1}\frac{dx\,dy}{1 + x^2 + y^2}$ ?"
    $2\pi\int_0^1\frac{r}{1 + r^2}dr = \pi\ln 2$.

??? question "$\iint_D (x + y)\,dx\,dy$ avec $D$ délimité par $y = x$ et $y = x^2$ ?"
    $\int_0^1\int_{x^2}^{x}(x + y)\,dy\,dx = \frac{3}{20}$.

[:material-clipboard-text: Faire le sujet blanc](../entrainement/sujet-blanc-ce.md){ .md-button .md-button--primary }
