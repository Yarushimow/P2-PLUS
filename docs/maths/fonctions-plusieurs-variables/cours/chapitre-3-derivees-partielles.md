---
title: "Ch. 3 — Dérivées partielles et différentiabilité"
---

# Chapitre 3 — Dérivées partielles et différentiabilité

=== "Version simplifiée"

    En une variable, $f'(a)$ est la pente de la courbe en $a$. Sur une surface, la pente
    dépend de la **direction** dans laquelle on avance : un randonneur qui suit la courbe
    de niveau a une pente nulle, celui qui monte tout droit a la pente maximale. On
    commence par les deux directions des axes. Dans tout le chapitre, $\Omega$ est un ouvert de $\mathbb{R}^2$.

    ## Dérivées partielles premières

    !!! definition "Dérivées partielles en $(a_1, a_2)$"
        $$
        \frac{\partial f}{\partial x}(a_1, a_2) = \lim_{h\to 0} \frac{f(a_1 + h, a_2) - f(a_1, a_2)}{h}
        \qquad
        \frac{\partial f}{\partial y}(a_1, a_2) = \lim_{h\to 0} \frac{f(a_1, a_2 + h) - f(a_1, a_2)}{h}
        $$

        si ces limites existent. Notations : $\dfrac{\partial f}{\partial x} = f_x = D_1 f = D_x f$.

    **Interprétation** : $\frac{\partial f}{\partial x}(a_1, a_2)$ est la dérivée classique de
    l'application partielle $x \mapsto f(x, a_2)$ en $a_1$, donc la pente de la surface dans
    la direction des $x$, en restant à $y = a_2$.

    !!! methode "Calcul pratique"
        - Pour $\dfrac{\partial f}{\partial x}$ : **$y$ est une constante**, on dérive par rapport à $x$.
        - Pour $\dfrac{\partial f}{\partial y}$ : **$x$ est une constante**, on dérive par rapport à $y$.

        Toutes les règles habituelles (somme, produit, quotient, composée) s'appliquent.

    **Exemples**

    1. $f = 3x^2 + 3xy^2 + 5x - 1$ : $f_x = 6x + 3y^2 + 5$, $f_y = 6xy$. En $(-5, 4)$ : $f_x = 23$, $f_y = -120$.
    2. $f = x \sin(xy)$ : $f_x = \sin(xy) + xy\cos(xy)$, $f_y = x^2 \cos(xy)$.
    3. $f = \dfrac{2x}{x + \cos y}$ : $f_x = \dfrac{2\cos y}{(x + \cos y)^2}$, $f_y = \dfrac{2x\sin y}{(x + \cos y)^2}$.
    4. Paraboloïde $f = x^2 + y^2$, coupé par le plan $x = 1$ : la pente en $(1 ; 2{,}5)$ est $f_y(1 ; 2{,}5) = 2 \times 2{,}5 = 5$.
    5. Fonctions telles que $f_x = 2x + y$ : on primitive en $x$, $f = x^2 + xy + g(y)$ où $g$ est **n'importe quelle fonction de $y$**.

    En trois variables, on fixe toutes les variables sauf une. Exemple : $f = e^{xz}\ln y$
    donne $f_x = z e^{xz}\ln y$, $f_y = \dfrac{e^{xz}}{y}$, $f_z = x e^{xz}\ln y$.

    ## Dérivées d'ordre supérieur

    On redérive les dérivées premières. Pour deux variables il y en a quatre :

    $$
    \frac{\partial^2 f}{\partial x^2}, \qquad \frac{\partial^2 f}{\partial y^2}, \qquad
    \frac{\partial^2 f}{\partial y\,\partial x} = \frac{\partial}{\partial y}\Big(\frac{\partial f}{\partial x}\Big), \qquad
    \frac{\partial^2 f}{\partial x\,\partial y} = \frac{\partial}{\partial x}\Big(\frac{\partial f}{\partial y}\Big)
    $$

    Les deux dernières sont les dérivées **mixtes**.

    !!! theoreme "Théorème de Schwarz"
        Si $f$ et toutes ses dérivées partielles secondes existent et sont **continues** sur un ouvert, alors

        $$
        \frac{\partial^2 f}{\partial x\,\partial y} = \frac{\partial^2 f}{\partial y\,\partial x}
        $$

        Même chose en trois variables : l'ordre de dérivation n'a pas d'importance.

    Exemple : $f = x^3 + xy^4 - 3y^2$. $f_x = 3x^2 + y^4$, $f_y = 4xy^3 - 6y$,
    $f_{xx} = 6x$, $f_{yy} = 12xy^2 - 6$, $f_{xy} = f_{yx} = 4y^3$.

    ## Règle de la chaîne

    !!! theoreme "Dérivée d'une composée"
        Si $f$ a des dérivées partielles continues et si $x$ et $y$ dépendent de $t$ :

        $$
        \frac{df}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}
        $$

        Si $x$ et $y$ dépendent de deux variables $u$ et $v$ :

        $$
        \frac{\partial f}{\partial u} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial u} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial u},
        \qquad
        \frac{\partial f}{\partial v} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial v} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial v}
        $$

    Moyen mnémotechnique : on passe par **chaque** variable intermédiaire et on additionne.

    **$d$ ou $\partial$ ?** La température $T(x, y, z, t)$ mesurée par un ballon qui se
    déplace selon $x(t), y(t), z(t)$ ne dépend plus que de $t$ : on écrit $\dfrac{dT}{dt}$, qui
    vaut $T_x x' + T_y y' + T_z z' + T_t$.

    ## Différentiabilité

    En une variable, être dérivable garantit la continuité et une tangente. En deux
    variables, l'équivalent est le **plan tangent**, et il faut plus que l'existence des
    dérivées partielles pour l'avoir : c'est la **différentiabilité**.

    !!! theoreme "Critère de différentiabilité"
        Si $f_x$ et $f_y$ **existent et sont continues** au voisinage de $(a_1, a_2)$, alors
        $f$ est différentiable en $(a_1, a_2)$.

        On dit que $f$ est **$C^1$** sur $\Omega$ si $f_x$ et $f_y$ existent et sont continues sur $\Omega$.
        Une fonction $C^1$ est différentiable.

    !!! theoreme "Fonctions différentiables usuelles"
        Polynômes, fractions rationnelles (là où le dénominateur ne s'annule pas), fonctions
        trigonométriques sont $C^1$. Somme, produit, quotient et composée de fonctions
        différentiables sont différentiables.

    !!! methode "Montrer qu'une fonction en deux morceaux est différentiable en $(0, 0)$"
        1. Calculer $f_x$ et $f_y$ **hors** de $(0, 0)$ avec les règles de calcul.
        2. Calculer $f_x(0, 0)$ et $f_y(0, 0)$ **avec la définition** (limite en $h$).
        3. Montrer que $f_x(x, y) \to f_x(0, 0)$ et $f_y(x, y) \to f_y(0, 0)$ (limites du chapitre 2).
        4. Les deux sont continues en $(0, 0)$, donc $f$ est différentiable en $(0, 0)$.

    !!! piege "Les implications à connaître"
        - $C^1 \Rightarrow$ différentiable $\Rightarrow$ continue.
        - Dérivées partielles existent $\not\Rightarrow$ continue. Exemple : $\dfrac{2xy}{x^2 + y^2}$ (prolongée par 0) a $f_x(0,0) = f_y(0,0) = 0$ mais n'est pas continue.
        - Continue $\not\Rightarrow$ dérivées partielles existent. Exemple : $\sqrt{x^2 + y^2}$ en $(0, 0)$.
        - Différentiable $\not\Rightarrow$ dérivées partielles continues.

    ## Gradient et dérivée directionnelle

    !!! definition "Gradient"
        $$
        \nabla f(a_1, a_2) = \overrightarrow{\text{grad}}\, f(a_1, a_2) = \Big(\frac{\partial f}{\partial x}(a_1, a_2),\; \frac{\partial f}{\partial y}(a_1, a_2)\Big)
        $$

    Propriétés (aux points réguliers) :

    - $\nabla f$ indique la direction de **plus forte montée** ; $-\nabla f$ celle de plus forte descente ;
    - $\nabla f$ est **perpendiculaire aux courbes de niveau** ;
    - $\lVert \nabla f \rVert$ est la pente maximale ;
    - la fonction ne varie pas dans les directions perpendiculaires au gradient.

    !!! definition "Dérivée directionnelle"
        Pour un vecteur **unitaire** $\vec u$ : $D_{\vec u} f(a) = \lim\limits_{h\to 0}\dfrac{f(a + h\vec u) - f(a)}{h}$.

        Si $f$ est différentiable : $D_{\vec u} f(a) = \nabla f(a) \cdot \vec u$.
        Les dérivées partielles sont les cas $\vec u = (1, 0)$ et $\vec u = (0, 1)$.

    **Exemple 3.8** : $f = xe^y + \cos(xy)$ en $(2, 0)$, direction $(3, -4)$.
    $f_x = e^y - y\sin(xy) = 1$, $f_y = xe^y - x\sin(xy) = 2$, donc $\nabla f = (1, 2)$.
    $\lVert(3, -4)\rVert = 5$, donc $\vec u = (\tfrac35, -\tfrac45)$ et $D_{\vec u} f = \tfrac35 - \tfrac85 = -1$.

    **Exemple 3.9** : $f = \tfrac{x^2}{2} + \tfrac{y^2}{2}$ en $(1, 1)$ : $\nabla f = (1, 1)$.
    Croissance la plus rapide selon $(1, 1)$, décroissance selon $(-1, -1)$, aucune variation
    selon $(1, -1)$ et $(-1, 1)$.

    ## Équations aux dérivées partielles (EDP)

    Une EDP relie une fonction de plusieurs variables à ses dérivées partielles. Exemples
    classiques : transport $f_t + c f_x = 0$, Laplace $f_{xx} + f_{yy} = 0$ (solutions dites
    **harmoniques**), ondes $f_{tt} - c^2 f_{xx} = 0$, chaleur $f_t = \alpha f_{xx}$.

    !!! methode "Résoudre en primitivant"
        Quand on primitive par rapport à $x$, la « constante » devient **une fonction des autres variables**.

        - $f_x = 0 \Rightarrow f(x, y) = g(y)$.
        - $f_{xy} = \frac{\partial}{\partial x}(f_y) = 0 \Rightarrow f_y = g(y)$ ne dépend pas de $x$, donc $f(x, y) = G(y) + h(x)$ avec $G$ une primitive de $g$.
        - $f_{yx^2} = 1$ (DE blanc) : $f_{xx} = y + a(x)$, puis $f_x = xy + A_1(x) + b(y)$, puis $f = \dfrac{x^2 y}{2} + A_2(x) + x\,b(y) + c(y)$.

    !!! methode "Résoudre par changement de variables"
        1. Poser $f(x, y) = g(u, v)$ avec le changement donné.
        2. Exprimer $f_x$ et $f_y$ (voire $f_{xx}$…) en fonction de $g_u$ et $g_v$ par la règle de la chaîne.
        3. Remplacer dans l'équation : elle doit devenir simple, du type $g_u = 0$.
        4. Résoudre, puis revenir à $x$ et $y$.

        Exemple : $f_x - 3f_y = 0$ avec $u = 2x + y$, $v = 3x + y$.
        $f_x = 2g_u + 3g_v$ et $f_y = g_u + g_v$, donc l'équation devient $-g_u = 0$, d'où
        $f(x, y) = g(v) = \varphi(3x + y)$ avec $\varphi$ quelconque de classe $C^1$.

    !!! tip "Vérifier qu'une fonction est solution"
        $g = e^x \sin y$ : $g_{xx} = e^x\sin y$ et $g_{yy} = -e^x \sin y$, la somme est nulle, donc $g$ est harmonique.
        $g = \sin(x - ct)$ : $g_{tt} = -c^2 \sin(x - ct) = c^2 g_{xx}$, solution de l'équation des ondes.

=== "Version papier"

    Les pages du poly pour le chapitre 3 (cours d'Elie Chahine, 2022-2023). Les exercices sont dans la [version papier du TD 3](../td/td-3-derivees-partielles.md).

    [![Chapitre 3, page 29 : Introduction](papier/ch3/p29.jpg){ loading=lazy .papier }](papier/ch3/p29.jpg)
    <p class="papier-legende">Introduction · Chapitre 3, p. 29</p>

    [![Chapitre 3, page 30 : Dérivées partielles · Dérivées partielles premières](papier/ch3/p30.jpg){ loading=lazy .papier }](papier/ch3/p30.jpg)
    <p class="papier-legende">Dérivées partielles · Dérivées partielles premières · Chapitre 3, p. 30</p>

    [![Chapitre 3, page 31 : Dérivées partielles](papier/ch3/p31.jpg){ loading=lazy .papier }](papier/ch3/p31.jpg)
    <p class="papier-legende">Dérivées partielles · Chapitre 3, p. 31</p>

    [![Chapitre 3, page 32 : Dérivées d’ordre supérieur](papier/ch3/p32.jpg){ loading=lazy .papier }](papier/ch3/p32.jpg)
    <p class="papier-legende">Dérivées d’ordre supérieur · Chapitre 3, p. 32</p>

    [![Chapitre 3, page 33 : Dérivées partielles · Règle de la chaîne](papier/ch3/p33.jpg){ loading=lazy .papier }](papier/ch3/p33.jpg)
    <p class="papier-legende">Dérivées partielles · Règle de la chaîne · Chapitre 3, p. 33</p>

    [![Chapitre 3, page 34 : Différentiabilité · Dérivée directionnelle](papier/ch3/p34.jpg){ loading=lazy .papier }](papier/ch3/p34.jpg)
    <p class="papier-legende">Différentiabilité · Dérivée directionnelle · Chapitre 3, p. 34</p>

    [![Chapitre 3, page 35 : Différentiabilité](papier/ch3/p35.jpg){ loading=lazy .papier }](papier/ch3/p35.jpg)
    <p class="papier-legende">Différentiabilité · Chapitre 3, p. 35</p>

    [![Chapitre 3, page 36 : Gradient](papier/ch3/p36.jpg){ loading=lazy .papier }](papier/ch3/p36.jpg)
    <p class="papier-legende">Gradient · Chapitre 3, p. 36</p>

    [![Chapitre 3, page 37 : Application : Équations aux dérivées partielles · Pourquoi des EDP](papier/ch3/p37.jpg){ loading=lazy .papier }](papier/ch3/p37.jpg)
    <p class="papier-legende">Application : Équations aux dérivées partielles · Pourquoi des EDP · Chapitre 3, p. 37</p>

    [![Chapitre 3, page 38 : Quelques exemples](papier/ch3/p38.jpg){ loading=lazy .papier }](papier/ch3/p38.jpg)
    <p class="papier-legende">Quelques exemples · Chapitre 3, p. 38</p>

    [![Chapitre 3, page 39 : Application : Équations aux dérivées partielles · Recherche de solutions de quelques EDP](papier/ch3/p39.jpg){ loading=lazy .papier }](papier/ch3/p39.jpg)
    <p class="papier-legende">Application : Équations aux dérivées partielles · Recherche de solutions de quelques EDP · Chapitre 3, p. 39</p>

    ### Annexe du chapitre 3

    [![Annexe du chapitre 3, page 1](papier/ch3/annexe-01.jpg){ loading=lazy .papier }](papier/ch3/annexe-01.jpg)
    <p class="papier-legende">Annexe du chapitre 3, page 1/7</p>

    [![Annexe du chapitre 3, page 2](papier/ch3/annexe-02.jpg){ loading=lazy .papier }](papier/ch3/annexe-02.jpg)
    <p class="papier-legende">Annexe du chapitre 3, page 2/7</p>

    [![Annexe du chapitre 3, page 3](papier/ch3/annexe-03.jpg){ loading=lazy .papier }](papier/ch3/annexe-03.jpg)
    <p class="papier-legende">Annexe du chapitre 3, page 3/7</p>

    [![Annexe du chapitre 3, page 4](papier/ch3/annexe-04.jpg){ loading=lazy .papier }](papier/ch3/annexe-04.jpg)
    <p class="papier-legende">Annexe du chapitre 3, page 4/7</p>

    [![Annexe du chapitre 3, page 5](papier/ch3/annexe-05.jpg){ loading=lazy .papier }](papier/ch3/annexe-05.jpg)
    <p class="papier-legende">Annexe du chapitre 3, page 5/7</p>

    [![Annexe du chapitre 3, page 6](papier/ch3/annexe-06.jpg){ loading=lazy .papier }](papier/ch3/annexe-06.jpg)
    <p class="papier-legende">Annexe du chapitre 3, page 6/7</p>

    [![Annexe du chapitre 3, page 7](papier/ch3/annexe-07.jpg){ loading=lazy .papier }](papier/ch3/annexe-07.jpg)
    <p class="papier-legende">Annexe du chapitre 3, page 7/7</p>

    ### Corrigés des exemples du cours (en anglais)

    [![Corrigés des exemples du chapitre 3, page 1](papier/ch3/corrige-01.jpg){ loading=lazy .papier }](papier/ch3/corrige-01.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 3, page 1/5</p>

    [![Corrigés des exemples du chapitre 3, page 2](papier/ch3/corrige-02.jpg){ loading=lazy .papier }](papier/ch3/corrige-02.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 3, page 2/5</p>

    [![Corrigés des exemples du chapitre 3, page 3](papier/ch3/corrige-03.jpg){ loading=lazy .papier }](papier/ch3/corrige-03.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 3, page 3/5</p>

    [![Corrigés des exemples du chapitre 3, page 4](papier/ch3/corrige-04.jpg){ loading=lazy .papier }](papier/ch3/corrige-04.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 3, page 4/5</p>

    [![Corrigés des exemples du chapitre 3, page 5](papier/ch3/corrige-05.jpg){ loading=lazy .papier }](papier/ch3/corrige-05.jpg)
    <p class="papier-legende">Corrigés des exemples du chapitre 3, page 5/5</p>
