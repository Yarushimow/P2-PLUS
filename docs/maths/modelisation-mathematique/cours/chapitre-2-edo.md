---
title: "Ch. 2 — Équations différentielles"
---

# Chapitre 2 — Équations différentielles ordinaires

=== "Version simplifiée"

    Très peu d'équations différentielles se résolvent à la main (les linéaires à coefficients constants,
    les équations à variables séparables…). Pour les autres, on calcule la solution **pas à pas**.

    ## Le problème de Cauchy

    $$
    y'(t) = f(t, y(t)), \qquad y(t_0) = y_0, \qquad t \in [t_0, t_0 + T]
    $$

    !!! theoreme "Cauchy-Lipschitz"
        Si $f$ est continue et **lipschitzienne en $y$** ($|f(t, y_1) - f(t, y_2)| \le L|y_1 - y_2|$), le problème a une **unique** solution.
        Il ne dit pas comment la calculer.

    Une équation d'ordre $n$ se ramène toujours à un **système d'ordre 1** en posant $Y = (y, y', \dots, y^{(n-1)})$.
    Géométriquement, $f(t, y)$ donne en chaque point la **pente** de la solution (champ de tangentes).

    ## Principe des méthodes pas à pas

    On découpe $[t_0, t_0 + T]$ avec un pas $h$ : $t_n = t_0 + nh$, et on cherche $y_n \approx y(t_n)$. En intégrant l'équation :

    $$
    y(t_{n+1}) = y(t_n) + \int_{t_n}^{t_{n+1}} f(t, y(t))\,dt
    $$

    Chaque méthode correspond à une **façon d'approcher cette intégrale** (rectangles, trapèzes, point milieu…).
    L'erreur vient de cette approximation **et** de l'accumulation des erreurs des pas précédents.

    ## Les schémas

    | Méthode | Formule | Intégrale approchée par | Ordre | Coût par pas |
    |---|---|---|---|---|
    | **Euler explicite** | $y_{n+1} = y_n + h\,f(t_n, y_n)$ | rectangle à gauche | 1 | 1 éval. |
    | **Euler implicite** | $y_{n+1} = y_n + h\,f(t_{n+1}, y_{n+1})$ | rectangle à droite | 1 | 1 éval. + une équation à résoudre |
    | **Crank-Nicolson** (trapèzes, implicite) | $y_{n+1} = y_n + \frac h2\big[f(t_n, y_n) + f(t_{n+1}, y_{n+1})\big]$ | trapèze | 2 | équation à résoudre |
    | **Heun** (trapèzes amélioré) | $y_{n+1} = y_n + \frac h2\big[f(t_n, y_n) + f\big(t_{n+1}, y_n + h f(t_n, y_n)\big)\big]$ | trapèze, $y_{n+1}$ prédit par Euler | 2 | 2 éval. |
    | **Euler amélioré** (point milieu) | $y_{n+1} = y_n + h\,f\big(t_n + \frac h2, y_n + \frac h2 f(t_n, y_n)\big)$ | point milieu | 2 | 2 éval. |
    | **Runge-Kutta 4** | voir ci-dessous | Simpson | 4 | 4 éval. |

    !!! theoreme "Runge-Kutta d'ordre 4 (RK4)"

        $$
        \begin{aligned}
        K_1 &= f(t_n, y_n) & K_2 &= f\left(t_n + \tfrac h2,\ y_n + \tfrac h2 K_1\right) \\
        K_3 &= f\left(t_n + \tfrac h2,\ y_n + \tfrac h2 K_2\right) & K_4 &= f(t_n + h,\ y_n + hK_3)
        \end{aligned}
        \qquad
        y_{n+1} = y_n + \frac h6\,(K_1 + 2K_2 + 2K_3 + K_4)
        $$

    !!! piege "Le $\frac h6$ et le $h$ de $K_4$"
        Erreurs classiques au DE : oublier le $\frac h6$, écrire $y_n + \frac h2 K_3$ dans $K_4$ (c'est $y_n + hK_3$), ou garder $t_n$ au lieu de $t_n + \frac h2$.
        Présente les calculs en tableau : $K_1$, $K_2$, $K_3$, $K_4$, puis $y_{n+1}$.

    !!! methode "Un pas d'Euler implicite"
        $y_{n+1}$ est des deux côtés. Pour une équation **linéaire** en $y$, on l'isole directement :
        pour $y' = -ay$, $y_{n+1} = y_n - ahy_{n+1}$ donne $y_{n+1} = \dfrac{y_n}{1 + ah}$.
        Sinon, il faut résoudre une équation à chaque pas (par Newton ou dichotomie).

    ## Stabilité

    Ordre et stabilité sont deux choses différentes : un schéma précis peut **exploser** si le pas est trop grand.

    !!! theoreme "Stabilité d'Euler explicite"
        Pour $y' = \lambda y$ ($\lambda < 0$), Euler donne $y_n = (1 + h\lambda)^n y_0$ : la suite reste bornée si et seulement si
        $|1 + h\lambda| < 1$, c'est-à-dire $h < \dfrac{2}{|\lambda|}$. En général : $\dfrac{\partial f}{\partial y} < 0$ et $h < \dfrac{2}{|\partial f/\partial y|}$.

        **Euler implicite** donne $y_n = \dfrac{y_0}{(1 - h\lambda)^n}$ : stable **pour tout $h$** si $\lambda < 0$ (inconditionnellement stable).

    Exemple : $y' = -y$, $y(0) = 1$, $h = 2$ → Euler explicite donne $y_n = (-1)^n$, qui oscille au lieu de décroître.
    Une équation **raide** (comme $y' = -1000(y - \sin t) + \cos t$) impose un pas minuscule en explicite : on préfère l'implicite.

    ## Systèmes et équations d'ordre 2

    Tout se généralise en remplaçant $y$ par un vecteur $Y$ : Euler s'écrit $Y_{n+1} = Y_n + h\,F(t_n, Y_n)$, composante par composante.

    !!! methode "Ramener une équation d'ordre 2 à un système"
        Pour $y'' = f(t, y, y')$, on pose $y_1 = y$ et $y_2 = y'$ :

        $$
        \begin{cases} y_1' = y_2 \\ y_2' = f(t, y_1, y_2) \end{cases}
        \qquad
        \begin{cases} y_1^{n+1} = y_1^n + h\,y_2^n \\ y_2^{n+1} = y_2^n + h\,f(t_n, y_1^n, y_2^n) \end{cases}
        $$

        Exemple : le pendule $y'' + \omega^2\sin y = 0$ devient $y_1' = y_2$, $y_2' = -\omega^2\sin y_1$.
        Tracer $y_2$ en fonction de $y_1$ donne le **portrait de phase**.

=== "Version papier"

    Le chapitre 2 du polycopié 2025-2026 et son formulaire (le TD est dans le [TD 2](../td/td-2-edo.md)).

    <!-- papier: pdf/SM401P/poly.pdf | Poly 2025-2026 | ch2 | page | 29-43 -->

    [![Poly 2025-2026, page 29 : 2. Equations différentielles ordinaires](papier/ch2/p29.jpg){ loading=lazy .papier }](papier/ch2/p29.jpg)
    <p class="papier-legende">2. Equations différentielles ordinaires · Poly 2025-2026, page 29</p>

    [![Poly 2025-2026, page 30 : Chapitre 2. Equations différentielles ordinaires](papier/ch2/p30.jpg){ loading=lazy .papier }](papier/ch2/p30.jpg)
    <p class="papier-legende">Chapitre 2. Equations différentielles ordinaires · Poly 2025-2026, page 30</p>

    [![Poly 2025-2026, page 31 : 2.2 Méthodes pas à pas](papier/ch2/p31.jpg){ loading=lazy .papier }](papier/ch2/p31.jpg)
    <p class="papier-legende">2.2 Méthodes pas à pas · Poly 2025-2026, page 31</p>

    [![Poly 2025-2026, page 32 : Chapitre 2. Equations différentielles ordinaires](papier/ch2/p32.jpg){ loading=lazy .papier }](papier/ch2/p32.jpg)
    <p class="papier-legende">Chapitre 2. Equations différentielles ordinaires · Poly 2025-2026, page 32</p>

    [![Poly 2025-2026, page 33 : 2.2 Méthodes pas à pas](papier/ch2/p33.jpg){ loading=lazy .papier }](papier/ch2/p33.jpg)
    <p class="papier-legende">2.2 Méthodes pas à pas · Poly 2025-2026, page 33</p>

    [![Poly 2025-2026, page 34 : Chapitre 2. Equations différentielles ordinaires](papier/ch2/p34.jpg){ loading=lazy .papier }](papier/ch2/p34.jpg)
    <p class="papier-legende">Chapitre 2. Equations différentielles ordinaires · Poly 2025-2026, page 34</p>

    [![Poly 2025-2026, page 35 : 2.2 Méthodes pas à pas](papier/ch2/p35.jpg){ loading=lazy .papier }](papier/ch2/p35.jpg)
    <p class="papier-legende">2.2 Méthodes pas à pas · Poly 2025-2026, page 35</p>

    [![Poly 2025-2026, page 36 : Chapitre 2. Equations différentielles ordinaires](papier/ch2/p36.jpg){ loading=lazy .papier }](papier/ch2/p36.jpg)
    <p class="papier-legende">Chapitre 2. Equations différentielles ordinaires · Poly 2025-2026, page 36</p>

    [![Poly 2025-2026, page 37 : 2.3 Méthode de Runge-Kutta d’ordre 4](papier/ch2/p37.jpg){ loading=lazy .papier }](papier/ch2/p37.jpg)
    <p class="papier-legende">2.3 Méthode de Runge-Kutta d’ordre 4 · Poly 2025-2026, page 37</p>

    [![Poly 2025-2026, page 38 : Chapitre 2. Equations différentielles ordinaires](papier/ch2/p38.jpg){ loading=lazy .papier }](papier/ch2/p38.jpg)
    <p class="papier-legende">Chapitre 2. Equations différentielles ordinaires · Poly 2025-2026, page 38</p>

    [![Poly 2025-2026, page 39 : 2.4 Systèmes différentiels du 1er ordre sur IRn](papier/ch2/p39.jpg){ loading=lazy .papier }](papier/ch2/p39.jpg)
    <p class="papier-legende">2.4 Systèmes différentiels du 1er ordre sur IRn · Poly 2025-2026, page 39</p>

    [![Poly 2025-2026, page 40 : Chapitre 2. Equations différentielles ordinaires](papier/ch2/p40.jpg){ loading=lazy .papier }](papier/ch2/p40.jpg)
    <p class="papier-legende">Chapitre 2. Equations différentielles ordinaires · Poly 2025-2026, page 40</p>

    [![Poly 2025-2026, page 41 : 2.4 Systèmes différentiels du 1er ordre sur IRn](papier/ch2/p41.jpg){ loading=lazy .papier }](papier/ch2/p41.jpg)
    <p class="papier-legende">2.4 Systèmes différentiels du 1er ordre sur IRn · Poly 2025-2026, page 41</p>

    [![Poly 2025-2026, page 42 : Formulaire : EDO](papier/ch2/p42.jpg){ loading=lazy .papier }](papier/ch2/p42.jpg)
    <p class="papier-legende">Formulaire : EDO · Poly 2025-2026, page 42</p>

    [![Poly 2025-2026, page 43 : Formulaire : EDO](papier/ch2/p43.jpg){ loading=lazy .papier }](papier/ch2/p43.jpg)
    <p class="papier-legende">Formulaire : EDO · Poly 2025-2026, page 43</p>

    <!-- /papier -->
