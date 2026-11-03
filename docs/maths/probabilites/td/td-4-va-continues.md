---
title: "TD 4 — Variables aléatoires continues"
---

# TD 4 — Variables aléatoires continues

=== "Version simplifiée"

    Exercices de la section 4.6 du poly (sélection des ♦ qui n'ont pas besoin de figure).
    Rappels : [chapitre 4](../cours/chapitre-4-va-continues.md).

    ## QCM — Faire le point

    $Z \sim \mathcal{N}(0, 1)$ et $X$ continue quelconque.

    | | Énoncé |
    |:-:|--------|
    | A | $V(X) = E(X^2) - E(X)^2$ ne s'applique pas aux variables continues |
    | B | Si $f$ est la densité de $X$, alors $f$ est la dérivée de $F$ |
    | C | $E(X) = \sum_{-\infty}^{+\infty} x f(x)\,dx$ |
    | D | La loi $\mathcal{U}([a, b])$ a pour espérance $b - a$ |
    | E | La loi exponentielle est « sans mémoire » |
    | F | $P(Z = 0) = \frac{1}{\sqrt{2\pi}}$ |
    | G | $P(Z < 1{,}26)$ est proche de $0{,}896$ |
    | H | La valeur $a$ telle que $P(Z < a) = 0{,}367$ est plus petite que $-0{,}3$ |

    ??? success "Correction"
        **Vraies : B, E, G, H.**
        A : faux, même formule. C : c'est une intégrale. D : $\frac{a+b}{2}$.
        F : $P(Z = 0) = 0$ (c'est $f(0)$ qui vaut $\frac{1}{\sqrt{2\pi}}$).
        H : $\Phi(a) = 0{,}367$ donne $\Phi(-a) = 0{,}633$, soit $-a \approx 0{,}34$ et $a \approx -0{,}34 < -0{,}3$.

    ## ♦ Exercice 4.2

    $f(x) = \frac{k}{x}$ sur $[1, 4]$.

    ??? success "Correction"
        a) $\int_1^4 \frac{k}{x}dx = k\ln 4 = 1$, donc $k = \frac{1}{\ln 4}$.

        b) $P(1 \le X \le 2 \mid 1 \le X \le 3) = \dfrac{k\ln 2}{k \ln 3} = \dfrac{\ln 2}{\ln 3} \approx 0{,}63$.

        c) $E(X) = \int_1^4 k\,dx = \frac{3}{\ln 4} \approx 2{,}16$ ;
        $E(X^2) = \int_1^4 kx\,dx = \frac{15}{2\ln 4}$ ;
        $V(X) = \frac{15}{2\ln 4} - \frac{9}{(\ln 4)^2} \approx 0{,}73$.

    ## ♦ Exercice 4.5

    $f_Z(z) = \frac{3}{8z^4}$ si $|z| \ge 1$, $\frac38$ si $|z| < 1$.

    ??? success "Correction"
        a) $\int_{-1}^1 \frac38 = \frac34$ et $2\int_1^{+\infty} \frac{3}{8z^4}dz = 2 \times \frac18 = \frac14$ : total 1.

        b) $P(0 \le Z \le 4) = \frac38 + \left[-\frac{1}{8z^3}\right]_1^4 = \frac38 + \frac18\left(1 - \frac{1}{64}\right) = \frac{255}{512} \approx 0{,}498$.

        c) $f_Z$ est paire et $\int z f_Z$ converge, donc $E(Z) = 0$.
        $V(Z) = E(Z^2) = 2\left(\int_0^1 \frac38 z^2 dz + \int_1^{+\infty} \frac{3}{8z^2}dz\right) = 2\left(\frac18 + \frac38\right) = 1$.

        d) $F_Z(z) = -\frac{1}{8z^3}$ si $z \le -1$ ; $\frac12 + \frac{3z}{8}$ si $-1 < z < 1$ ;
        $1 - \frac{1}{8z^3}$ si $z \ge 1$.

    ## ♦ Exercice 4.6

    $f(x) = k|x|$ sur $[-\frac12, 1]$.

    ??? success "Correction"
        a) $k\left(\frac18 + \frac12\right) = 1$, donc $k = \frac85$.

        b) $Y = \sqrt{|X|} \in [0, 1]$, et $Y \le a \iff -a^2 \le X \le a^2$. Deux cas, car $X \ge -\frac12$ :

        - si $a^2 \le \frac12$ : $F_Y(a) = \int_{-a^2}^{a^2} k|x|dx = k a^4 = \frac85 a^4$ ;
        - si $a^2 > \frac12$ : $F_Y(a) = \int_{-1/2}^{a^2} k|x|dx = \frac15 + \frac45 a^4$.

        $$
        f_Y(y) = \begin{cases} \frac{32}{5}y^3 & 0 \le y \le \frac{1}{\sqrt2} \\ \frac{16}{5}y^3 & \frac{1}{\sqrt 2} < y \le 1 \\ 0 & \text{sinon} \end{cases}
        $$

    ## ♦ Exercice 4.15 — Un fait surprenant

    ??? success "Correction"
        a) $X \sim \mathcal{U}([0, 1])$, $Y = \sqrt X$ : $F_Y(y) = P(X \le y^2) = y^2$, donc $f_Y(y) = 2y$ sur $[0, 1]$.

        b) $Z = \max(X_1, X_2) \le z \iff X_1 \le z$ **et** $X_2 \le z$ :
        $F_Z(z) = z \times z = z^2$ (indépendance), donc $f_Z(z) = 2z$.

        c) Même loi : les deux manipulations sont équivalentes.

    ## ♦ Exercice 4.17 — Deux guichets

    $T_1 \sim \mathcal{E}(\frac15)$, $T_2 \sim \mathcal{E}(\frac18)$ indépendantes.

    ??? success "Correction"
        a) $P(Z > t) = P(T_1 > t)P(T_2 > t)$, donc $F_Z = 1 - (1 - F_1)(1 - F_2)$.

        b) $P(Z > t) = e^{-t/5}e^{-t/8} = e^{-13t/40}$ : $Z \sim \mathcal{E}(\frac{13}{40})$.

        c) $\delta T = E(Z) = \frac{40}{13} \approx 3{,}08$ min.
        $\Delta T = E(\max) = E(T_1) + E(T_2) - E(\min) = 5 + 8 - \frac{40}{13} \approx 9{,}92$ min.

    ## ♦ Exercice 4.19

    $X \sim \mathcal{U}([0, 1])$, $Y = -\ln X$.

    ??? success "Correction"
        Pour $y \ge 0$ : $P(Y \le y) = P(\ln X \ge -y) = P(X \ge e^{-y}) = 1 - e^{-y}$.
        C'est la fonction de répartition de $\mathcal{E}(1)$.

    ## ♦ Exercice 4.21

    $X \sim \mathcal{N}(10, 4)$, donc $\sigma = 2$.

    ??? success "Correction"
        a) $P(X \le 15) = \Phi(2{,}5) \approx 0{,}9938$.

        b) $P(|X| \le 8) = P(-8 \le X \le 8) = \Phi(-1) - \Phi(-9) \approx 1 - \Phi(1) \approx 0{,}1587$.

        c) $P(8 \le X \le 15) = \Phi(2{,}5) - \Phi(-1) = 0{,}9938 - 0{,}1587 \approx 0{,}8351$.

    ## ♦ Exercice 4.23 — Score de Maddrey

    $X \sim \mathcal{N}(54, 14^2)$ (atteinte sévère), $Y \sim \mathcal{N}(20, 6^2)$ (atteinte minime).

    ??? success "Correction"
        a) $P(X < 68) = \Phi(1) \approx 0{,}841$. b) $P(Y < 8) = \Phi(-2) \approx 0{,}023$.

        c) $P(X > s) = 0{,}95 \iff \Phi\left(\frac{54 - s}{14}\right) = 0{,}95 \iff \frac{54 - s}{14} = 1{,}645$, donc $s \approx 30{,}97$.

        d) $\frac{s - 20}{6} = 1{,}2816$, donc $s \approx 27{,}7$.

        e) $P(X < 32) = \Phi(-1{,}57) \approx 0{,}058$. f) $P(Y > 32) = 1 - \Phi(2) \approx 0{,}023$.

        g) Erreurs sur 100 patients : $100(0{,}3 \times 0{,}058 + 0{,}7 \times 0{,}023) \approx 3{,}3$.

    ## ♦ Exercice 4.24 (début) — Retraits au distributeur

    $X \sim \mathcal{N}(650, 150^2)$.

    ??? success "Correction"
        a) $P(X > 750) = 1 - \Phi(0{,}67) \approx 0{,}25$.

        b) Total de 4 personnes indépendantes : $S \sim \mathcal{N}(2600, 4 \times 150^2)$, $\sigma_S = 300$.
        $P(S > 3500) = 1 - \Phi(3) \approx 0{,}0013$.

=== "Version papier"

    Les énoncés de la section 4.6 « Exercices » du polycopié 2026-2027 (pages 122 à 133). ♦ = exercice obligatoire. Le cours est dans la [version papier du chapitre 4](../cours/chapitre-4-va-continues.md).

    [![Poly 2026-2027, p. 122 : Énoncés : QCM, exercice 4.1](papier/td4/p122.jpg){ loading=lazy .papier }](papier/td4/p122.jpg)
    <p class="papier-legende">Énoncés : QCM, exercice 4.1 · Poly 2026-2027, p. 122</p>

    [![Poly 2026-2027, p. 123 : Énoncés : exercices 4.2 à 4.4](papier/td4/p123.jpg){ loading=lazy .papier }](papier/td4/p123.jpg)
    <p class="papier-legende">Énoncés : exercices 4.2 à 4.4 · Poly 2026-2027, p. 123</p>

    [![Poly 2026-2027, p. 124 : Énoncés : exercices 4.5 à 4.7](papier/td4/p124.jpg){ loading=lazy .papier }](papier/td4/p124.jpg)
    <p class="papier-legende">Énoncés : exercices 4.5 à 4.7 · Poly 2026-2027, p. 124</p>

    [![Poly 2026-2027, p. 125 : Énoncés : exercices 4.8 à 4.11](papier/td4/p125.jpg){ loading=lazy .papier }](papier/td4/p125.jpg)
    <p class="papier-legende">Énoncés : exercices 4.8 à 4.11 · Poly 2026-2027, p. 125</p>

    [![Poly 2026-2027, p. 126 : Énoncés : exercices 4.12 et 4.13](papier/td4/p126.jpg){ loading=lazy .papier }](papier/td4/p126.jpg)
    <p class="papier-legende">Énoncés : exercices 4.12 et 4.13 · Poly 2026-2027, p. 126</p>

    [![Poly 2026-2027, p. 127 : Énoncés : exercices 4.14 à 4.17](papier/td4/p127.jpg){ loading=lazy .papier }](papier/td4/p127.jpg)
    <p class="papier-legende">Énoncés : exercices 4.14 à 4.17 · Poly 2026-2027, p. 127</p>

    [![Poly 2026-2027, p. 128 : Énoncés : exercices 4.18 et 4.19](papier/td4/p128.jpg){ loading=lazy .papier }](papier/td4/p128.jpg)
    <p class="papier-legende">Énoncés : exercices 4.18 et 4.19 · Poly 2026-2027, p. 128</p>

    [![Poly 2026-2027, p. 129 : Énoncés : exercices 4.20 à 4.23](papier/td4/p129.jpg){ loading=lazy .papier }](papier/td4/p129.jpg)
    <p class="papier-legende">Énoncés : exercices 4.20 à 4.23 · Poly 2026-2027, p. 129</p>

    [![Poly 2026-2027, p. 130 : Énoncés : exercices 4.24 à 4.26](papier/td4/p130.jpg){ loading=lazy .papier }](papier/td4/p130.jpg)
    <p class="papier-legende">Énoncés : exercices 4.24 à 4.26 · Poly 2026-2027, p. 130</p>

    [![Poly 2026-2027, p. 131 : Énoncés : exercices 4.27 et 4.28](papier/td4/p131.jpg){ loading=lazy .papier }](papier/td4/p131.jpg)
    <p class="papier-legende">Énoncés : exercices 4.27 et 4.28 · Poly 2026-2027, p. 131</p>

    [![Poly 2026-2027, p. 132 : Énoncés : exercices 4.29 et 4.30](papier/td4/p132.jpg){ loading=lazy .papier }](papier/td4/p132.jpg)
    <p class="papier-legende">Énoncés : exercices 4.29 et 4.30 · Poly 2026-2027, p. 132</p>

    [![Poly 2026-2027, p. 133 : Énoncés : exercice 4.31](papier/td4/p133.jpg){ loading=lazy .papier }](papier/td4/p133.jpg)
    <p class="papier-legende">Énoncés : exercice 4.31 · Poly 2026-2027, p. 133</p>
