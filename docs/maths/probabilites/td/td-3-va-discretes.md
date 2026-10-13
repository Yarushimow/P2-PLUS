---
title: "TD 3 — Variables aléatoires discrètes"
---

# TD 3 — Variables aléatoires discrètes

=== "Version simplifiée"

    Exercices de la section 3.7 du poly. Rappels : [chapitre 3](../cours/chapitre-3-va-discretes.md).
    ♦ = exercice obligatoire.

    ## QCM — Faire le point

    | | Énoncé |
    |:-:|--------|
    | A | Si $X \sim \mathcal{U}([\![1, n]\!])$ alors $P(X = k) = \frac{1}{n^2}$ |
    | B | $E(X^2) \le E(X)^2$ |
    | C | Si $X(\Omega) = [\![1, n]\!]$ alors $E(e^X) = \sum_{k=1}^n e^k P(X = k)$ |
    | D | Si $X \sim \mathcal{B}(p)$ alors $E(X) = \frac1p$ |
    | E | Si $X \sim \mathcal{B}(n, p)$ alors $E(X) = np$ |
    | F | Si $X \sim \mathcal{BN}(r, p)$ alors $X(\Omega) = [\![1, r]\!]$ |
    | G | Si $X \sim \mathcal{B}(n, p)$ alors $P(X = 0) = (1-p)^n$ |
    | H | Pour que $X$ et $Y$ ne soient pas indépendantes, il suffit que $\mathrm{Cov}(X, Y) \neq 0$ |
    | I | $X$, $Y$ indépendantes si $P(X = x, Y = y) = P(X = x)P(Y = y)$ pour tous $x, y$ |

    ??? success "Correction"
        **Vraies : C, E, G, H, I.**
        A : c'est $\frac1n$. B : c'est l'inverse, $E(X^2) \ge E(X)^2$ car $V(X) \ge 0$.
        D : $E(X) = p$. F : $X(\Omega) = [\![r, +\infty[\![$ (il faut au moins $r$ essais).

    ## ♦ Exercice 3.1 — Familles de trois enfants

    ??? success "Correction"
        $X \sim \mathcal{B}(3, \frac12)$ : $P(X = k) = \binom3k \frac18$.

        | $k$ | 0 | 1 | 2 | 3 |
        |:-:|:-:|:-:|:-:|:-:|
        | $P(X = k)$ | $\frac18$ | $\frac38$ | $\frac38$ | $\frac18$ |

    ## ♦ Exercice 3.2 — Trois pièces, $X = N_F - N_P$

    ??? success "Correction"
        $N_P = 3 - N_F$, donc $X = 2N_F - 3$ avec $N_F \sim \mathcal{B}(3, \frac12)$.

        | $x$ | $-3$ | $-1$ | $1$ | $3$ |
        |:-:|:-:|:-:|:-:|:-:|
        | $P(X = x)$ | $\frac18$ | $\frac38$ | $\frac38$ | $\frac18$ |

    ## ♦ Exercice 3.3 — Appels téléphoniques

    | $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
    |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
    | $P(X \le x)$ | 0,05 | 0,15 | 0,3 | 0,5 | 0,7 | 0,85 | 0,95 | 1 |

    ??? tip "Indice"
        C'est la **fonction de répartition** : $P(X = x) = F(x) - F(x - 1)$.

    ??? success "Correction"
        a)

        | $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
        | $P(X = x)$ | 0,05 | 0,1 | 0,15 | 0,2 | 0,2 | 0,15 | 0,1 | 0,05 |

        b) $E(X) = 3{,}5$ (la loi est symétrique autour de 3,5) ; $E(X^2) = 15{,}5$, donc $V(X) = 15{,}5 - 12{,}25 = 3{,}25$.

        c) $P(X \le 2) = 0{,}3$ (lecture directe).

        d) Minutes indépendantes : $0{,}2^{10} \approx 1{,}02 \times 10^{-7}$.

        e) $P(X = 7 \mid X > 4) = \frac{0{,}05}{1 - 0{,}7} = \frac16$.

        f) $Y = X_1 + \dots + X_{60}$ (60 minutes supposées indépendantes) :
        $E(Y) = 60 \times 3{,}5 = 210$ et $V(Y) = 60 \times 3{,}25 = 195$.

    ## ♦ Exercice 3.4 — Les autocars du WEI

    Bus de 40, 33, 25 et 50 étudiants (148 au total). $X$ : taille du bus d'un étudiant tiré
    au hasard ; $Y$ : taille du bus d'un conducteur tiré au hasard.

    ??? success "Correction"
        $P(Y = b) = \frac14$ pour chaque bus, mais $P(X = b) = \frac{b}{148}$ : un étudiant a plus
        de chances d'être dans un **gros** bus, donc on s'attend à $E(X) > E(Y)$.

        - $E(Y) = \frac{40 + 33 + 25 + 50}{4} = 37$, $V(Y) = 84{,}5$.
        - $E(X) = \frac{40^2 + 33^2 + 25^2 + 50^2}{148} = \frac{5814}{148} \approx 39{,}28$,
          $V(X) \approx 82{,}2$.

    ## Exercice 3.5 — Le rang d'un enfant

    30 familles à 1 enfant, 50 à 2, 20 à 3.

    ??? success "Correction"
        a) Famille puis enfant (probabilités totales) :
        $P(R = 1) = 0{,}3 + 0{,}5 \times \frac12 + 0{,}2 \times \frac13 = \frac{37}{60}$,
        $P(R = 2) = \frac{19}{60}$, $P(R = 3) = \frac{4}{60}$.
        $E(R) = 1{,}45$, $\sigma(R) \approx 0{,}62$.

        b) Il y a 190 enfants : 100 aînés, 70 cadets, 20 troisièmes.
        $P(R = 1) = \frac{10}{19}$, $P(R = 2) = \frac{7}{19}$, $P(R = 3) = \frac{2}{19}$.
        $E(R) = \frac{30}{19} \approx 1{,}58$, $\sigma(R) \approx 0{,}67$.

    ## Exercice 3.6 — Démonstrations (à savoir refaire)

    ??? success "Correction"
        a) $V(X + Y) = E\big((X + Y)^2\big) - \big(E(X) + E(Y)\big)^2$. On développe :
        $E(X^2) + 2E(XY) + E(Y^2) - E(X)^2 - 2E(X)E(Y) - E(Y)^2 = V(X) + V(Y) + 2\mathrm{Cov}(X, Y)$.

        b) Si $X$, $Y$ indépendantes :
        $E(XY) = \sum_{x,y} xy\,P(X = x)P(Y = y) = \left(\sum_x x P(X = x)\right)\left(\sum_y y P(Y = y)\right) = E(X)E(Y)$,
        donc $\mathrm{Cov}(X, Y) = 0$.

    ## ♦ Exercice 3.7 — Constante d'une loi conjointe

    | | $Y = 2$ | $Y = 4$ | $Y = 5$ |
    |-|:-:|:-:|:-:|
    | $X = 1$ | $2c$ | $c$ | $c$ |
    | $X = 2$ | $4c$ | $2c$ | $3c$ |
    | $X = 3$ | $6c$ | $3c$ | $2c$ |

    ??? success "Correction"
        a) Somme $= 24c = 1$, donc $c = \frac{1}{24}$.

        b) $P(X \le 2, Y \le 4) = (2 + 1 + 4 + 2)c = \frac{9}{24} = \frac38$.

        c) $P(Y = 2 \mid X = 1) = \frac{2c}{4c} = \frac12$.

        d) $P(X = 2, Y = 5) = \frac{3}{24} = 0{,}125$ mais $P(X = 2)P(Y = 5) = \frac{9}{24} \times \frac{6}{24} \approx 0{,}094$ :
        **pas indépendantes** (les lignes ne sont pas proportionnelles).

    ## ♦ Exercice 3.8 — Les anagrammes de RBV

    $X$ = rang de la boule blanche, $Y$ = rang de la rouge.

    ??? success "Correction"
        a) $\operatorname{card}(\Omega) = 3! = 6$.

        b) $X$ et $Y$ ne peuvent pas être égaux :

        | | $X = 1$ | $X = 2$ | $X = 3$ |
        |-|:-:|:-:|:-:|
        | $Y = 1$ | 0 | $\frac16$ | $\frac16$ |
        | $Y = 2$ | $\frac16$ | 0 | $\frac16$ |
        | $Y = 3$ | $\frac16$ | $\frac16$ | 0 |

        c) $X$ et $Y$ sont uniformes sur $\{1, 2, 3\}$. Pas indépendantes : $P(X = 1, Y = 1) = 0 \neq \frac19$.

        d) $E(X) = E(Y) = 2$, $V(X) = V(Y) = \frac{14}{3} - 4 = \frac23$.

        e) $E(XY) = \frac16(2 + 3 + 2 + 6 + 3 + 6) = \frac{11}{3}$,
        $\mathrm{Cov}(X, Y) = \frac{11}{3} - 4 = -\frac13$, $\rho = \frac{-1/3}{2/3} = -\frac12$.

    ## ♦ Exercice 3.9 — Couple $(\Theta, \phi)$

    ??? success "Correction"
        a) $P(\Theta = -2) = 0{,}3$. $P(\Theta = -2 \mid \phi \ge 3) = \frac{0{,}12 + 0{,}06 + 0{,}03}{0{,}4 + 0{,}2 + 0{,}1} = 0{,}3$.

        b) $P(\Theta = 0) = 0{,}1$, $P(\Theta = 2) = 0{,}6$, donc $E(\Theta) = -0{,}6 + 1{,}2 = 0{,}6$.
        $\phi$ : $0{,}1 ; 0{,}2 ; 0{,}4 ; 0{,}2 ; 0{,}1$, symétrique : $E(\phi) = 3$.

        c) Les lignes sont toutes proportionnelles à $(3, 1, 6)$ : $\Theta$ et $\phi$ sont
        **indépendantes**, donc $\mathrm{Cov}(\Theta, \phi) = 0$.

    ## ♦ Exercice 3.10 — Changements de variable

    | | $Y = 0$ | $Y = 1$ | $Y = 2$ | $Y = 3$ |
    |-|:-:|:-:|:-:|:-:|
    | $X = 1$ | 0,1 | 0,05 | 0 | 0,05 |
    | $X = 2$ | 0,2 | 0,1 | 0,1 | 0,2 |
    | $X = 3$ | 0,1 | 0 | 0,05 | 0,05 |

    ??? success "Correction"
        a) Somme $= 1$ et tout est positif.

        b) $X$ : $0{,}2 ; 0{,}6 ; 0{,}2$. $Y$ : $0{,}4 ; 0{,}15 ; 0{,}15 ; 0{,}3$.
        $P(X = 1, Y = 2) = 0 \neq 0{,}2 \times 0{,}15$ : pas indépendantes.

        c) $E(X) = 2$, $V(X) = 0{,}4$ ; $E(Y) = 1{,}35$, $V(Y) = 3{,}45 - 1{,}8225 = 1{,}6275$.

        d) $E(XY) = 2{,}75$, donc $\mathrm{Cov}(X, Y) = 2{,}75 - 2 \times 1{,}35 = 0{,}05$.

        e) $W = X^2$ : $P(W = 1) = 0{,}2$, $P(W = 4) = 0{,}6$, $P(W = 9) = 0{,}2$.

        f) $Z = (X - 2)^2$ : $P(Z = 0) = 0{,}6$, $P(Z = 1) = 0{,}4$.

        g) $U = XY$ :

        | $u$ | 0 | 1 | 2 | 3 | 4 | 6 | 9 |
        |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
        | $P$ | 0,4 | 0,05 | 0,1 | 0,05 | 0,1 | 0,25 | 0,05 |

        h) $V = \min(X, Y)$ : $P(V = 0) = 0{,}4$, $P(V = 1) = 0{,}2$, $P(V = 2) = 0{,}35$, $P(V = 3) = 0{,}05$.

        i) Chaque valeur de $U$ détermine $V$ : $(0,0)$ : 0,4 ; $(1,1)$ : 0,05 ; $(2,1)$ : 0,1 ;
        $(3,1)$ : 0,05 ; $(4,2)$ : 0,1 ; $(6,2)$ : 0,25 ; $(9,3)$ : 0,05 ; toutes les autres cases valent 0.

    ## ♦ Exercice 3.12 — Corrélation sans calcul

    ??? success "Correction"
        a) $Y = 3 - X$ : relation affine décroissante, $\rho = -1$.

        b) Deux familles différentes : $X$ et $Y$ indépendantes, donc $\rho = 0$.

    ## ♦ Exercice 3.13 — 3 ou 5 exercices ?

    En forme : réussite d'un exercice $0{,}8$ ; pas en forme : $0{,}4$ ; $P(\text{pas en forme}) = \frac23$.
    Il faut réussir **plus de la moitié** des exercices.

    ??? tip "Indice"
        Sachant l'état de forme, le nombre d'exercices réussis suit une binomiale. Puis
        probabilités totales sur l'état de forme.

    ??? success "Correction"
        - 3 exercices (au moins 2) : en forme $0{,}896$, pas en forme $0{,}352$,
          donc $P = \frac13 \times 0{,}896 + \frac23 \times 0{,}352 \approx 0{,}533$.
        - 5 exercices (au moins 3) : en forme $0{,}942$, pas en forme $0{,}317$,
          donc $P \approx 0{,}526$.

        Il vaut (un peu) mieux **3 exercices**.

    ## ♦ Exercice 3.14 — Deux tireurs

    $A$ touche avec $\frac14$, $B$ avec $\frac13$, tirs indépendants.

    ??? success "Correction"
        a) $N_A \sim \mathcal{B}(3, \frac14)$, $N_B \sim \mathcal{B}(3, \frac13)$, on veut $N_A + N_B = 2$ :
        $P = \sum_{i=0}^2 P(N_A = i)P(N_B = 2 - i) = \frac{31}{96} \approx 0{,}323$.

        b) $P(A \text{ touche} \mid \text{une seule touche}) = \dfrac{\frac14 \times \frac23}{\frac14 \times \frac23 + \frac34 \times \frac13} = \dfrac25$.

    ## ♦ Exercice 3.15 — Méningocoques

    1,5 cas pour 100 000 habitants par an.

    ??? success "Correction"
        a) $n = 50\,000$ grand, $p$ petit : Poisson $\lambda = 50\,000 \times 1{,}5 \times 10^{-5} = 0{,}75$.
        $P(X > 2) = 1 - e^{-0{,}75}(1 + 0{,}75 + \frac{0{,}75^2}{2}) \approx 0{,}041$.

        b) Bayes : $P(\text{IIM} \mid < 25) = \frac{0{,}8 \times 1{,}5 \times 10^{-5}}{0{,}31} \approx 3{,}87 \times 10^{-5}$.

        c) $310\,000$ moins de 25 ans, $\lambda = 310\,000 \times 3{,}87 \times 10^{-5} = 12$.
        $P(X < 2) = e^{-12}(1 + 12) \approx 8 \times 10^{-5}$.

    ## Exercice 3.20 — Ruptures de stock

    $X \sim \mathcal{P}(3)$, $Y \sim \mathcal{P}(2)$ indépendantes, $Z = X + Y \sim \mathcal{P}(5)$.

    ??? success "Correction"
        a) $P(X > 1) = 1 - e^{-3}(1 + 3) \approx 0{,}801$.
        b) $P(Z = 0) = e^{-5} \approx 0{,}0067$.
        c) $P(Z \ge 2) = 1 - e^{-5}(1 + 5) \approx 0{,}960$.

    ## Exercice 3.21 — Pannes de Vélib'

    $W \sim \mathcal{P}(2)$, $X \sim \mathcal{P}(3)$, $Y \sim \mathcal{P}(1)$ indépendantes.

    ??? success "Correction"
        a) $1 - e^{-2} \approx 0{,}865$. b) $e^{-3} \approx 0{,}050$. c) $e^{-2}\frac{2^2}{2!} \approx 0{,}271$.
        d) $Z = W + X + Y \sim \mathcal{P}(6)$, $E(Z) = 6$.
        e) $P(Z \le 2) = e^{-6}(1 + 6 + 18) \approx 0{,}062$.

    ## ♦ Exercice 3.22 — Les coquilles de Russell (DE 2023-2024)

    200 pages de philosophie ($X_P \sim \mathcal{P}(\frac{1}{30})$), 120 de maths ($X_M \sim \mathcal{P}(\frac{1}{10})$).

    ??? success "Correction"
        a) $P(X_M \ge 1) = 1 - e^{-0{,}1} \approx 0{,}095$.

        b) $P(X_P \le 2) = e^{-1/30}\left(1 + \frac{1}{30} + \frac{1}{1800}\right) \approx 0{,}99999$.

        c) Bayes avec $P(M) = \frac{120}{320}$ :
        $P(M \mid 1) = \dfrac{\frac{120}{320} \times 0{,}1e^{-0{,}1}}{\frac{120}{320} \times 0{,}1e^{-0{,}1} + \frac{200}{320} \times \frac{1}{30}e^{-1/30}} \approx 0{,}627$.

        d) Somme de Poisson indépendantes : $X \sim \mathcal{P}\left(120 \times \frac{1}{10} + 200 \times \frac{1}{30}\right) = \mathcal{P}\left(\frac{56}{3}\right)$,
        donc $E(X) = V(X) = \frac{56}{3} \approx 18{,}7$.

    ## Exercice 3.23 — Le serrurier

    10 clés, une seule bonne.

    ??? success "Correction"
        **À jeun** (sans remise) : $P(X = k) = \frac{9}{10} \times \frac89 \times \dots \times \frac{1}{11 - k} = \frac{1}{10}$ :
        loi **uniforme** sur $[\![1, 10]\!]$. $E(X) = 5{,}5$, $V(X) = \frac{100 - 1}{12} = 8{,}25$.

        **Ivre** (avec remise) : $Y \sim \mathcal{G}(\frac{1}{10})$ (géométrique).
        d) $0{,}1$ ; e) $0{,}9^4 \times 0{,}1 \approx 0{,}066$ ; f) $P(Y = k) = 0{,}9^{k-1} \times 0{,}1$ ;
        g) $P(Y \ge 100) = 0{,}9^{99} \approx 3 \times 10^{-5}$ ; h) $P(\text{jamais}) = \lim 0{,}9^n = 0$.

    ## Exercice 3.24 — Surréservation

    52 billets pour 50 places, chaque passager vient avec probabilité $0{,}95$.

    ??? success "Correction"
        $N \sim \mathcal{B}(52;\ 0{,}95)$ passagers présents.
        $P(N \le 50) = 1 - 0{,}95^{52} - 52 \times 0{,}95^{51} \times 0{,}05 \approx 0{,}741$.

    ## ♦ Exercice 3.25 — Coraux et réchauffement

    Chaque décennie : $+0{,}2\ °\mathrm{C}$ avec probabilité $0{,}6$. Les coraux disparaissent à $+0{,}6\ °\mathrm{C}$, donc à la **3e hausse**.

    ??? tip "Indice"
        On compte le nombre de décennies pour obtenir 3 « succès » : binomiale négative.

    ??? success "Correction"
        $X \sim \mathcal{BN}(3;\ 0{,}6)$ = décennie où les coraux disparaissent.

        a) Encore là dans 50 ans $\iff$ au plus 2 hausses en 5 décennies :
        $P(X > 5) = \sum_{k=0}^2 \binom5k 0{,}6^k 0{,}4^{5-k} \approx 0{,}317$.

        b) $P(X = 7) = \binom62 0{,}6^3 \times 0{,}4^4 \approx 0{,}083$.

        c) $E(X) = \frac{3}{0{,}6} = 5$ décennies, soit 50 ans.

    ## ♦ Exercice 3.27

    $X_1$, $X_2$ indépendantes de loi $\mathcal{BN}(1, p)$, $U = X_1 + X_2$, $V = X_1 - X_2$.

    ??? success "Correction"
        a) Bilinéarité : $\mathrm{Cov}(U, V) = V(X_1) - \mathrm{Cov}(X_1, X_2) + \mathrm{Cov}(X_2, X_1) - V(X_2) = 0$.

        b) Pourtant pas indépendantes : $P(U = 2) = p^2 > 0$ et $P(V = 1) > 0$, mais
        $U = 2$ impose $X_1 = X_2 = 1$ donc $P(U = 2, V = 1) = 0$. Encore un exemple de covariance
        nulle sans indépendance.

    ## Exercices pour aller plus loin

    3.11, 3.16 à 3.19, 3.26, 3.28 à 3.31 : [**] et [***]. Les preuves 3.29 à 3.31
    correspondent aux propositions du cours (espérance de la binomiale négative,
    $|\rho| \le 1$, somme de Poisson).

=== "Version papier"

    Les énoncés de la section 3.7 « Exercices » du polycopié 2026-2027 (pages 82 à 94). ♦ = exercice obligatoire. Le cours est dans la [version papier du chapitre 3](../cours/chapitre-3-va-discretes.md).

    [![Poly 2026-2027, p. 82 : Énoncés : QCM, exercices 3.1 à 3.3](papier/td3/p082.jpg){ loading=lazy .papier }](papier/td3/p082.jpg)
    <p class="papier-legende">Énoncés : QCM, exercices 3.1 à 3.3 · Poly 2026-2027, p. 82</p>

    [![Poly 2026-2027, p. 83 : Énoncés : exercices 3.4 à 3.6](papier/td3/p083.jpg){ loading=lazy .papier }](papier/td3/p083.jpg)
    <p class="papier-legende">Énoncés : exercices 3.4 à 3.6 · Poly 2026-2027, p. 83</p>

    [![Poly 2026-2027, p. 84 : Énoncés : exercices 3.7 et 3.8](papier/td3/p084.jpg){ loading=lazy .papier }](papier/td3/p084.jpg)
    <p class="papier-legende">Énoncés : exercices 3.7 et 3.8 · Poly 2026-2027, p. 84</p>

    [![Poly 2026-2027, p. 85 : Énoncés : exercices 3.9 à 3.11](papier/td3/p085.jpg){ loading=lazy .papier }](papier/td3/p085.jpg)
    <p class="papier-legende">Énoncés : exercices 3.9 à 3.11 · Poly 2026-2027, p. 85</p>

    [![Poly 2026-2027, p. 86 : Énoncés : exercices 3.12 à 3.14](papier/td3/p086.jpg){ loading=lazy .papier }](papier/td3/p086.jpg)
    <p class="papier-legende">Énoncés : exercices 3.12 à 3.14 · Poly 2026-2027, p. 86</p>

    [![Poly 2026-2027, p. 87 : Énoncés : exercices 3.15 et 3.16](papier/td3/p087.jpg){ loading=lazy .papier }](papier/td3/p087.jpg)
    <p class="papier-legende">Énoncés : exercices 3.15 et 3.16 · Poly 2026-2027, p. 87</p>

    [![Poly 2026-2027, p. 88 : Énoncés : exercices 3.17 à 3.20](papier/td3/p088.jpg){ loading=lazy .papier }](papier/td3/p088.jpg)
    <p class="papier-legende">Énoncés : exercices 3.17 à 3.20 · Poly 2026-2027, p. 88</p>

    [![Poly 2026-2027, p. 89 : Énoncés : exercices 3.21 et 3.22](papier/td3/p089.jpg){ loading=lazy .papier }](papier/td3/p089.jpg)
    <p class="papier-legende">Énoncés : exercices 3.21 et 3.22 · Poly 2026-2027, p. 89</p>

    [![Poly 2026-2027, p. 90 : Énoncés : exercices 3.23 à 3.25](papier/td3/p090.jpg){ loading=lazy .papier }](papier/td3/p090.jpg)
    <p class="papier-legende">Énoncés : exercices 3.23 à 3.25 · Poly 2026-2027, p. 90</p>

    [![Poly 2026-2027, p. 91 : Énoncés : exercices 3.26 et 3.27](papier/td3/p091.jpg){ loading=lazy .papier }](papier/td3/p091.jpg)
    <p class="papier-legende">Énoncés : exercices 3.26 et 3.27 · Poly 2026-2027, p. 91</p>

    [![Poly 2026-2027, p. 92 : Énoncés : exercices 3.28 et 3.29](papier/td3/p092.jpg){ loading=lazy .papier }](papier/td3/p092.jpg)
    <p class="papier-legende">Énoncés : exercices 3.28 et 3.29 · Poly 2026-2027, p. 92</p>

    [![Poly 2026-2027, p. 93 : Énoncés : exercices 3.30 à 3.33](papier/td3/p093.jpg){ loading=lazy .papier }](papier/td3/p093.jpg)
    <p class="papier-legende">Énoncés : exercices 3.30 à 3.33 · Poly 2026-2027, p. 93</p>

    [![Poly 2026-2027, p. 94 : Énoncés : exercices 3.34 à 3.36](papier/td3/p094.jpg){ loading=lazy .papier }](papier/td3/p094.jpg)
    <p class="papier-legende">Énoncés : exercices 3.34 à 3.36 · Poly 2026-2027, p. 94</p>
