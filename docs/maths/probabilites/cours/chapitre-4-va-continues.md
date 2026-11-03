---
title: "Ch. 4 — Variables aléatoires continues"
---

# Chapitre 4 — Variables aléatoires continues

=== "Version simplifiée"

    Quand une variable peut prendre **n'importe quelle valeur d'un intervalle** (un temps,
    une taille, une position), on remplace les sommes par des **intégrales** et la
    probabilité en un point par une **densité**.

    !!! tip "Aide-mémoire discret → continu"
        $x_i \to x$, $\quad P(X = x_i) \to f(x)\,dx$, $\quad \sum \to \int$.

    ## 4.1 Définitions de base

    !!! definition "Densité de probabilité"
        $X$ est continue s'il existe $f \ge 0$ telle que, pour tout $B \subset \mathbb{R}$,

        $$
        P(X \in B) = \int_B f(x)\,dx
        \qquad\text{avec}\qquad
        \int_{-\infty}^{+\infty} f(x)\,dx = 1
        $$

    !!! piege "Une densité n'est pas une probabilité"
        - $f$ peut dépasser 1 : c'est l'**aire sous la courbe** qui est une probabilité.
        - $P(X = a) = 0$ pour tout $a$. Donc $P(X < a) = P(X \le a)$ : les inégalités
          strictes ou larges ne changent rien.

    !!! definition "Fonction de répartition"
        $$
        F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt
        $$

        $F$ est **continue**, **croissante**, tend vers 0 en $-\infty$ et vers 1 en $+\infty$,
        et $P(a \le X \le b) = F(b) - F(a)$. Inversement, $f = F'$.

    !!! methode "Fiche méthode #3 — Densité de $Y = g(X)$"
        1. Trouver le **support** $Y(\Omega)$.
        2. Écrire l'évènement $\{Y \le a\}$ en fonction de $X$ (attention au signe et aux cas).
        3. En déduire $F_Y(a)$ avec $F_X$ ou une intégrale de $f_X$.
        4. **Dériver** : $f_Y = F_Y'$. Vérifier que $\int f_Y = 1$.

        Exemple : $X \sim \mathcal{U}([0, 2])$ et $Y = X^2$. Pour $a \in [0, 4]$,
        $F_Y(a) = P(X \le \sqrt a) = \sqrt a / 2$, donc $f_Y(y) = \dfrac{1}{4\sqrt y}$ sur $[0, 4]$.

    ## 4.2 Couples de variables continues

    !!! definition "Densité conjointe"
        $(X, Y)$ est conjointement continu s'il existe $f_{X,Y} \ge 0$ avec
        $P\big((X, Y) \in C\big) = \iint_C f_{X,Y}(x, y)\,dx\,dy$.

    !!! theoreme "Densités marginales"
        $$
        f_X(x) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y)\,dy
        \qquad
        f_Y(y) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y)\,dx
        $$

    !!! definition "Indépendance"
        $X$ et $Y$ sont indépendantes si $f_{X,Y}(x, y) = f_X(x)\,f_Y(y)$ pour tous $x, y$
        (de façon équivalente, $F_{X,Y} = F_X F_Y$).
        Exemple : un point uniforme dans un **disque** donne $X$ et $Y$ **non** indépendantes
        (le domaine n'est pas un rectangle).

    ## 4.3 Espérance, variance

    !!! definition "Espérance et variance"
        $$
        E(X) = \int_{-\infty}^{+\infty} x\,f(x)\,dx
        \qquad
        V(X) = E(X^2) - E(X)^2
        $$

        Transfert : $E\big(g(X)\big) = \int g(x)\,f(x)\,dx$.
        Mêmes règles qu'en discret : linéarité de $E$, $V(aX + b) = a^2 V(X)$.
        L'espérance peut ne pas exister (loi de Cauchy, $f(x) = \frac{1}{\pi(1 + x^2)}$).

    ## 4.4 Lois usuelles

    | Loi | Densité | $E(X)$ | $V(X)$ | Usage |
    |-----|---------|:------:|:------:|-------|
    | Uniforme $\mathcal{U}([a, b])$ | $\dfrac{1}{b - a}$ sur $[a, b]$ | $\dfrac{a + b}{2}$ | $\dfrac{(b - a)^2}{12}$ | instant d'arrivée « au hasard » |
    | Exponentielle $\mathcal{E}(\lambda)$ | $\lambda e^{-\lambda x}$ pour $x \ge 0$ | $\dfrac1\lambda$ | $\dfrac{1}{\lambda^2}$ | durées de vie, attentes |
    | Normale $\mathcal{N}(\mu, \sigma^2)$ | $\dfrac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x - \mu)^2}{2\sigma^2}}$ | $\mu$ | $\sigma^2$ | mesures, sommes de nombreux effets |

    !!! theoreme "Exponentielle : $F(x) = 1 - e^{-\lambda x}$ et absence de mémoire"
        $P(T \ge t + s \mid T \ge t) = P(T \ge s)$ : un composant qui a déjà tenu $t$ heures
        n'est pas « usé ». C'est la **seule** loi continue sans mémoire.

    !!! piege "Paramètre de l'exponentielle"
        Une durée **moyenne** de 5 minutes correspond à $\lambda = 1/5$, pas à $\lambda = 5$.

    ### La loi normale en pratique

    !!! definition "Fonction $\Phi$"
        $\Phi(x) = P(Z \le x)$ pour $Z \sim \mathcal{N}(0, 1)$, lue dans la **table**.

        - $P(a \le Z \le b) = \Phi(b) - \Phi(a)$
        - $P(Z \ge a) = 1 - \Phi(a)$
        - $\Phi(-a) = 1 - \Phi(a)$ (symétrie)

    !!! methode "Fiche méthode #4 — Calculer avec $X \sim \mathcal{N}(\mu, \sigma^2)$"
        1. **Centrer-réduire** : $Z = \dfrac{X - \mu}{\sigma} \sim \mathcal{N}(0, 1)$ (attention : on divise par $\sigma$, pas par $\sigma^2$).
        2. Traduire chaque évènement sur $X$ en évènement sur $Z$.
        3. Exprimer avec $\Phi$ (et $\Phi(-a) = 1 - \Phi(a)$ pour les valeurs négatives).
        4. Lire la table.

        Exemple : $X \sim \mathcal{N}(10, 4)$, donc $\sigma = 2$ :
        $P(X \le 15) = \Phi\left(\frac{15 - 10}{2}\right) = \Phi(2{,}5) \approx 0{,}9938$.

    !!! theoreme "Combinaisons linéaires de normales"
        Si $X \sim \mathcal{N}(\mu_1, \sigma_1^2)$ et $Y \sim \mathcal{N}(\mu_2, \sigma_2^2)$ sont
        **indépendantes** :

        $$
        aX + bY \sim \mathcal{N}\left(a\mu_1 + b\mu_2,\ a^2\sigma_1^2 + b^2\sigma_2^2\right)
        $$

        Exemple classique : $Y - X$ a pour variance $\sigma_1^2 + \sigma_2^2$ (les variances **s'ajoutent** même pour une différence).

    !!! theoreme "Binomiale → normale et théorème central limite"
        - Si $X_n \sim \mathcal{B}(n, p)$, alors $\dfrac{X_n - np}{\sqrt{np(1-p)}}$ tend vers $\mathcal{N}(0, 1)$.
        - **TCL** : la moyenne $M_n$ de $n$ variables indépendantes de même loi (moyenne $\mu$,
          écart-type $\sigma$) vérifie $\dfrac{M_n - \mu}{\sigma / \sqrt n} \to \mathcal{N}(0, 1)$.

    ## Acquis d'apprentissage

    - [ ] Reconnaître une densité et calculer $P(X \in B)$.
    - [ ] Calculer la fonction de répartition, la densité de $Y = g(X)$.
    - [ ] Calculer $E$, $V$, $\sigma$ d'une variable continue.
    - [ ] Densité conjointe, marginales, indépendance.
    - [ ] Connaître les lois uniforme, exponentielle et normale.
    - [ ] Utiliser la table de $\Phi$.

=== "Version papier"

    Les pages du chapitre 4 du polycopié *Probabilités* 2026-2027 (pages 95 à 121). Les exercices du chapitre sont dans la [version papier du TD 4](../td/td-4-va-continues.md).

    [![Poly 2026-2027, p. 95 : 4. Variables aléatoires continues — 4.1 Définitions de base](papier/ch4/p095.jpg){ loading=lazy .papier }](papier/ch4/p095.jpg)
    <p class="papier-legende">4. Variables aléatoires continues — 4.1 Définitions de base · Poly 2026-2027, p. 95</p>

    [![Poly 2026-2027, p. 96 : 4.1 Définitions de base](papier/ch4/p096.jpg){ loading=lazy .papier }](papier/ch4/p096.jpg)
    <p class="papier-legende">4.1 Définitions de base · Poly 2026-2027, p. 96</p>

    [![Poly 2026-2027, p. 97 : 4.1 Définitions de base](papier/ch4/p097.jpg){ loading=lazy .papier }](papier/ch4/p097.jpg)
    <p class="papier-legende">4.1 Définitions de base · Poly 2026-2027, p. 97</p>

    [![Poly 2026-2027, p. 98 : 4.1 Définitions de base](papier/ch4/p098.jpg){ loading=lazy .papier }](papier/ch4/p098.jpg)
    <p class="papier-legende">4.1 Définitions de base · Poly 2026-2027, p. 98</p>

    [![Poly 2026-2027, p. 99 : 4.1 Définitions de base](papier/ch4/p099.jpg){ loading=lazy .papier }](papier/ch4/p099.jpg)
    <p class="papier-legende">4.1 Définitions de base · Poly 2026-2027, p. 99</p>

    [![Poly 2026-2027, p. 100 : 4.1 Définitions de base](papier/ch4/p100.jpg){ loading=lazy .papier }](papier/ch4/p100.jpg)
    <p class="papier-legende">4.1 Définitions de base · Poly 2026-2027, p. 100</p>

    [![Poly 2026-2027, p. 101 : 4.2 Couples de variables aléatoires continues](papier/ch4/p101.jpg){ loading=lazy .papier }](papier/ch4/p101.jpg)
    <p class="papier-legende">4.2 Couples de variables aléatoires continues · Poly 2026-2027, p. 101</p>

    [![Poly 2026-2027, p. 102 : 4.2 Couples de variables aléatoires continues](papier/ch4/p102.jpg){ loading=lazy .papier }](papier/ch4/p102.jpg)
    <p class="papier-legende">4.2 Couples de variables aléatoires continues · Poly 2026-2027, p. 102</p>

    [![Poly 2026-2027, p. 103 : 4.2 Couples de variables aléatoires continues](papier/ch4/p103.jpg){ loading=lazy .papier }](papier/ch4/p103.jpg)
    <p class="papier-legende">4.2 Couples de variables aléatoires continues · Poly 2026-2027, p. 103</p>

    [![Poly 2026-2027, p. 104 : 4.3 Espérance, Variance, Écart-type](papier/ch4/p104.jpg){ loading=lazy .papier }](papier/ch4/p104.jpg)
    <p class="papier-legende">4.3 Espérance, Variance, Écart-type · Poly 2026-2027, p. 104</p>

    [![Poly 2026-2027, p. 105 : 4.3 Espérance, Variance, Écart-type](papier/ch4/p105.jpg){ loading=lazy .papier }](papier/ch4/p105.jpg)
    <p class="papier-legende">4.3 Espérance, Variance, Écart-type · Poly 2026-2027, p. 105</p>

    [![Poly 2026-2027, p. 106 : 4.3 Espérance, Variance, Écart-type](papier/ch4/p106.jpg){ loading=lazy .papier }](papier/ch4/p106.jpg)
    <p class="papier-legende">4.3 Espérance, Variance, Écart-type · Poly 2026-2027, p. 106</p>

    [![Poly 2026-2027, p. 107 : 4.3 Espérance, Variance, Écart-type](papier/ch4/p107.jpg){ loading=lazy .papier }](papier/ch4/p107.jpg)
    <p class="papier-legende">4.3 Espérance, Variance, Écart-type · Poly 2026-2027, p. 107</p>

    [![Poly 2026-2027, p. 108 : 4.3 Espérance, Variance, Écart-type](papier/ch4/p108.jpg){ loading=lazy .papier }](papier/ch4/p108.jpg)
    <p class="papier-legende">4.3 Espérance, Variance, Écart-type · Poly 2026-2027, p. 108</p>

    [![Poly 2026-2027, p. 109 : 4.4 Lois usuelles](papier/ch4/p109.jpg){ loading=lazy .papier }](papier/ch4/p109.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 109</p>

    [![Poly 2026-2027, p. 110 : 4.4 Lois usuelles](papier/ch4/p110.jpg){ loading=lazy .papier }](papier/ch4/p110.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 110</p>

    [![Poly 2026-2027, p. 111 : 4.4 Lois usuelles](papier/ch4/p111.jpg){ loading=lazy .papier }](papier/ch4/p111.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 111</p>

    [![Poly 2026-2027, p. 112 : 4.4 Lois usuelles](papier/ch4/p112.jpg){ loading=lazy .papier }](papier/ch4/p112.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 112</p>

    [![Poly 2026-2027, p. 113 : 4.4 Lois usuelles](papier/ch4/p113.jpg){ loading=lazy .papier }](papier/ch4/p113.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 113</p>

    [![Poly 2026-2027, p. 114 : 4.4 Lois usuelles](papier/ch4/p114.jpg){ loading=lazy .papier }](papier/ch4/p114.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 114</p>

    [![Poly 2026-2027, p. 115 : 4.4 Lois usuelles](papier/ch4/p115.jpg){ loading=lazy .papier }](papier/ch4/p115.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 115</p>

    [![Poly 2026-2027, p. 116 : 4.4 Lois usuelles](papier/ch4/p116.jpg){ loading=lazy .papier }](papier/ch4/p116.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 116</p>

    [![Poly 2026-2027, p. 117 : 4.4 Lois usuelles](papier/ch4/p117.jpg){ loading=lazy .papier }](papier/ch4/p117.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 117</p>

    [![Poly 2026-2027, p. 118 : 4.4 Lois usuelles](papier/ch4/p118.jpg){ loading=lazy .papier }](papier/ch4/p118.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 118</p>

    [![Poly 2026-2027, p. 119 : 4.4 Lois usuelles](papier/ch4/p119.jpg){ loading=lazy .papier }](papier/ch4/p119.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 119</p>

    [![Poly 2026-2027, p. 120 : 4.4 Lois usuelles](papier/ch4/p120.jpg){ loading=lazy .papier }](papier/ch4/p120.jpg)
    <p class="papier-legende">4.4 Lois usuelles · Poly 2026-2027, p. 120</p>

    [![Poly 2026-2027, p. 121 : 4.5 Acquis d’apprentissage](papier/ch4/p121.jpg){ loading=lazy .papier }](papier/ch4/p121.jpg)
    <p class="papier-legende">4.5 Acquis d’apprentissage · Poly 2026-2027, p. 121</p>
