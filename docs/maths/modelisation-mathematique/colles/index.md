---
title: Colles (oraux)
---

# Colles — les sujets d'oral

=== "Version simplifiée"

    32 sujets d'oral, 8 par chapitre. Chacun a une **partie mathématique** (théorème à rappeler, quelques itérations
    à la main) et une **partie MATLAB** (compléter ou corriger un code, tracer l'erreur). Pour la partie MATLAB, pars
    des codes de la page [MATLAB](../matlab/index.md) : ils couvrent toutes les méthodes demandées.

    Ci-dessous, les **résultats de la partie mathématique**, pour vérifier tes calculs (arrondis à $10^{-3}$ ou $10^{-6}$).

    !!! tip "Pour les tracés d'erreur"
        On stocke les itérés dans un vecteur, puis `semilogy(abs(diff(x)))` trace $|x_{n+1} - x_n|$ en échelle logarithmique.
        Une droite qui descend = convergence d'ordre 1 (point fixe, dichotomie) ; une courbe qui plonge de plus en plus vite = ordre 2 (Newton).

    ## Chapitre 1 — Équations non linéaires

    | Sujet | Résultats |
    |---|---|
    | 1. $x = \cos x$ | $g = \cos$ envoie $[0, 1]$ dans $[\cos 1, 1] \subset [0, 1]$, $\lvert g'\rvert = \lvert\sin x\rvert \le \sin 1 \approx 0{,}84 < 1$. $x_0 = 0{,}5$ : 0,877583 ; 0,639012 ; 0,802685 (point fixe 0,739085) |
    | 2. $x = \ln(2 + x)$ | $g([0, 2]) = [\ln 2, \ln 4] \subset [0, 2]$, $\lvert g'\rvert = \frac{1}{2 + x} \le \frac12$. $x_0 = 1$ : 1,098612 ; 1,130954 ; 1,141338 (point fixe 1,146193) |
    | 3. $g = \frac12(x + \cos x)$ | $g' = \frac12(1 - \sin x) \in [0{,}08;\ 0{,}5]$ : croissante, $g([0, 1]) = [0{,}5;\ 0{,}77]$, $k = \frac12$. $x_0 = 0{,}5$ : 0,688791 ; 0,730403 (point fixe 0,739085) |
    | 4. $x^3 + x - 1$, dichotomie | $f' = 3x^2 + 1 > 0$, $f(0) = -1$, $f(1) = 1$. $c_0 = 0{,}5$ ($f < 0$) → $[0{,}5;\ 1]$, $c_1 = 0{,}75$ ($f > 0$) → $[0{,}5;\ 0{,}75]$. $10^{-5}$ : $2^{n+1} \ge 10^5$, $n = 16$ (racine 0,682328) |
    | 5. $e^{-x} - x$, dichotomie | $f' < 0$, $f(0) = 1$, $f(1) \approx -0{,}63$. $c_0 = 0{,}5$ ($f > 0$) → $[0{,}5;\ 1]$, $c_1 = 0{,}75$ ($f < 0$) → $[0{,}5;\ 0{,}75]$. Erreur $\le 2^{-(n+1)}$ ; $10^{-6}$ : $n = 19$ (racine 0,567143) |
    | 6. $\cos x - x^3$, Newton | $f' = -\sin x - 3x^2 < 0$ sur $]0, 1]$, $f(0) = 1$, $f(1) < 0$. $x_0 = 0{,}5$ : 1,112142 ; 0,909673 ; 0,867264 (racine 0,865474). Si $x_0 = 0$ : $f'(0) = 0$, Newton n'est pas défini |
    | 7. $e^x - 3x$, Newton | $f' = e^x - 3 < 0$ sur $[0, 1]$, $f(0) = 1$, $f(1) \approx -0{,}28$. $x_0 = 0{,}5$ : 0,610060 ; 0,618997 ; 0,619061. Échec si $x_0 = \ln 3 \approx 1{,}099$ ($f' = 0$) ; au-delà, Newton part vers l'autre racine (1,512) |
    | 8. $x = e^{-x}$ | Point fixe : $x_1 = e^{-0{,}5} \approx 0{,}606531$ ; Newton sur $f = e^{-x} - x$ : $x_1 \approx 0{,}566311$ (racine 0,567143). Point fixe d'ordre 1 ($\lvert g'(\alpha)\rvert = \alpha \approx 0{,}57$), Newton d'ordre 2 |

    ## Chapitre 2 — Équations différentielles

    | Sujet | Résultats |
    |---|---|
    | 1. $x' = -2x$, $h = 1$ | Exact $e^{-2t}$ : 0,135 ; 0,018 ; 0,002. Euler explicite $x_{n+1} = -x_n$ : $-1$ ; 1 ; $-1$ (à la limite de stabilité : $\lvert 1 + h\lambda\rvert = 1$, la suite oscille sans décroître). Implicite $x_{n+1} = \frac{x_n}{3}$ : 0,333 ; 0,111 ; 0,037 (stable) |
    | 2. $y' = t - y$, $h = 0{,}25$ | Exact $y = t - 1 + 2e^{-t}$. Euler : 0,75 ; 0,625 ; 0,594. $y(0{,}75) \approx 0{,}695$, erreur 0,101 |
    | 3. $x' = t^2 + x + 1$, $x(1) = 1$ | $C = \frac7e$. Heun : 1,3255 ; 1,7082. Trapèze (implicite, $x$ isolé) : 1,3268 ; 1,7112. Exact : 1,3262 ; 1,7098. Code de Heun corrigé : `k2 = f(t(i)+h, x(i)+h*k1)`, `x(i+1) = x(i) + h/2*(k1+k2)` et ajouter `t(i+1) = t(i) + h` |
    | 4. $y' = -y + \sin t$ | $y_p = \frac12(\sin t - \cos t)$, $y = \frac32e^{-t} + \frac12(\sin t - \cos t)$. RK4, $h = 0{,}1$ : $y_1 \approx 0{,}909671$ (exact 0,909671). RK4 ordre 4, Euler ordre 1 |
    | 5. $x' = -2x + \cos t$ | $x = \frac35e^{-2t} + \frac25\cos t + \frac15\sin t$. Euler $h = 0{,}2$ : $x(0{,}4) \approx 0{,}676$, exact 0,716, erreur 0,040 |
    | 6. Stabilité, $x' = \lambda x$ | $x_n = (1 + h\lambda)^n$, stable ssi $\lvert 1 + h\lambda\rvert < 1$. $\lambda = -5$ : $h = 0{,}05$ donne $0{,}75^{20} \approx 0{,}0032$ ; $h = 0{,}25$ donne $(-0{,}25)^4 \approx 0{,}0039$ (stable mais **oscillant**). Exact $e^{-5} \approx 0{,}0067$. Instable dès $h > 0{,}4$ |
    | 7. $y' = t - y$, $h = 0{,}25$ | Euler : 0,75 ; Heun : 0,8125 ; exact 0,8076. Erreurs locales 0,058 et 0,005 |
    | 8. $y' = y - t^2 + 1$, $h = 0{,}2$ | Euler : 0,8 ; RK4 : 0,829293 ; exact 0,829299 |

    ## Chapitre 3 — Interpolation

    | Sujet | Résultats |
    |---|---|
    | 1. $\cos$ en $-1, 0, 1$ | $P(x) = 1 + (\cos 1 - 1)x^2$. $\max\lvert x(x^2 - 1)\rvert = \frac{2}{3\sqrt3}$, $\lvert f'''\rvert \le \sin 1$ : $\lvert E\rvert \le \frac{\sin 1}{6} \times 0{,}385 \approx 0{,}054$ |
    | 2. $(0,1), (1,2), (2,4), (4,16)$ | Coefficients 1 ; 1 ; $\frac12$ ; $\frac{5}{24}$ : $P = 1 + x + \frac12x(x - 1) + \frac{5}{24}x(x - 1)(x - 2)$. Avec $(3, 10)$ : on ajoute $-\frac{7}{24}x(x - 1)(x - 2)(x - 4)$ |
    | 3. $\cos(\pi x)$ | $n = 2$ : $P = 1 - 2x^2$. $n = 4$ (nœuds $-1, -\frac12, 0, \frac12, 1$) : coefficients de Newton $-1$ ; 2 ; 0 ; $-\frac83$ ; $\frac83$, soit $P = \frac83x^4 - \frac{14}{3}x^2 + 1$ |
    | 4. $\frac{1}{1 + x^2}$ en $-1, 0, 1$ | $P_2 = 1 - \frac{x^2}{2}$. $\max\lvert f'''\rvert \approx 4{,}67$ sur $[-1, 1]$ : $\lvert E\rvert \le \frac{4{,}67}{6} \times 0{,}385 \approx 0{,}30$ (borne large) |
    | 5. $(0,1), (1,3), (2,2), (4,5)$ | Coefficients 1 ; 2 ; $-\frac32$ ; $\frac{7}{12}$. Avec $(3, 4)$ : on ajoute $-\frac{5}{12}x(x - 1)(x - 2)(x - 4)$ |
    | 6. $\ln(1 + x)$ en $0, \frac12, 1$ | $P \approx -0{,}2356x^2 + 0{,}9287x$. $P(0{,}2) \approx 0{,}1763$, $\ln 1{,}2 \approx 0{,}1823$, erreur 0,0060. $\lvert f'''\rvert \le 2$ : $\lvert E\rvert \le \frac26 \times \frac{\sqrt3}{36} \approx 0{,}016$ |
    | 7. Runge, 3 nœuds | $P = 1 - \frac{25}{26}x^2$. Tchebychev : nœuds resserrés aux bords, plus d'oscillations |
    | 8. $e^x$ en $0, \frac12, 1$ | $P_2'(0{,}5) = \frac{f(1) - f(0)}{1} = e - 1 \approx 1{,}718$ (différence centrée), exact $e^{0{,}5} \approx 1{,}649$, erreur 0,070 |

    ## Chapitre 4 — Intégration

    | Sujet | Résultats |
    |---|---|
    | 1. $\int_0^5 e^{\sin x}dx$ | Trapèzes $n = 5$ : 7,115 ; $n = 10$ : 7,171 (réf. 7,189). $\lvert f''\rvert \le e$ : erreur $\le \frac{125e}{12n^2}$, et $< 0{,}01$ dès $n = 54$ |
    | 2. $\int_0^1\frac{dx}{1 + x} = \ln 2$ | $h = 0{,}2$ ($n = 5$) : trapèzes 0,69563, Simpson impossible ($n$ impair). $h = 0{,}25$ : trapèzes 0,69702, Simpson 0,69325 |
    | 3. Simpson sur données | 9 points équidistants : $n \in \{2, 4, 8\}$ (pair, et en sautant des points). $n = 8$, $h = 0{,}4$ : $I \approx 8{,}713$ |
    | 4. $\int_0^{60}2e^{-0{,}1t}dt$ | Exact $20(1 - e^{-6}) \approx 19{,}950$. Point milieu, 10 rectangles de 6 : 19,654, erreur 0,296 (borne $\frac{60 \times 6^2}{24} \times 0{,}02 = 1{,}8$ ✓) |
    | 5. $\int_0^{10}(-100t^2 + 20\,000)dt$ | Exact 166 666,67. Trapèzes $n = 5$ : 166 000. Erreur 666,67 = exactement $\frac{10 \times 2^2}{12} \times 200$ ($f''$ constante) |
    | 6. $\int_0^2\ln(1 + x)dx$ | Exact $3\ln 3 - 2 \approx 1{,}2958$. Trapèzes $n = 4$ : 1,2821 ; $n = 8$ : 1,2924. $\lvert f''\rvert \le 1$ : erreur $\le \frac{8}{12n^2}$, $< 10^{-3}$ dès $n = 26$ |
    | 7. $\int_0^\pi\sin x\,dx = 2$ | Simpson $n = 4$ : 2,00456 ; $n = 8$ : 2,00027. Code corrigé : $n$ **pair** (`n = 4`), et inverser les coefficients : `4*sum(y(2:2:end-1)) + 2*sum(y(3:2:end-2))` |
    | 8. $\int_0^1 e^{-x^2}dx$, $n = 4$ | Point milieu 0,74875 ; trapèzes 0,74298 ; Simpson 0,74686 ; référence 0,746824. Point milieu et trapèzes encadrent $I$ avec des erreurs de signes opposés |

=== "Version papier"

    Les 32 sujets d'oral 2025-2026.

    <!-- papier: pdf/SM401P/colles.pdf | Sujets d'oral 2025-2026 | sujets | page -->

    [![Sujets d&#x27;oral 2025-2026, page 1 : Chapitre 1 - Équations non linéaires](papier/sujets/p01.jpg){ loading=lazy .papier }](papier/sujets/p01.jpg)
    <p class="papier-legende">Chapitre 1 - Équations non linéaires · Sujets d&#x27;oral 2025-2026, page 1</p>

    [![Sujets d&#x27;oral 2025-2026, page 2 : Exercice 2 – Méthode du point fixe](papier/sujets/p02.jpg){ loading=lazy .papier }](papier/sujets/p02.jpg)
    <p class="papier-legende">Exercice 2 – Méthode du point fixe · Sujets d&#x27;oral 2025-2026, page 2</p>

    [![Sujets d&#x27;oral 2025-2026, page 3 : Exercice 3 – Méthode du point fixe](papier/sujets/p03.jpg){ loading=lazy .papier }](papier/sujets/p03.jpg)
    <p class="papier-legende">Exercice 3 – Méthode du point fixe · Sujets d&#x27;oral 2025-2026, page 3</p>

    [![Sujets d&#x27;oral 2025-2026, page 4 : Exercice 4 – Méthode de dichotomie](papier/sujets/p04.jpg){ loading=lazy .papier }](papier/sujets/p04.jpg)
    <p class="papier-legende">Exercice 4 – Méthode de dichotomie · Sujets d&#x27;oral 2025-2026, page 4</p>

    [![Sujets d&#x27;oral 2025-2026, page 5 : Exercice 5 – Méthode de dichotomie](papier/sujets/p05.jpg){ loading=lazy .papier }](papier/sujets/p05.jpg)
    <p class="papier-legende">Exercice 5 – Méthode de dichotomie · Sujets d&#x27;oral 2025-2026, page 5</p>

    [![Sujets d&#x27;oral 2025-2026, page 6 : Exercice 6 – Méthode de Newton](papier/sujets/p06.jpg){ loading=lazy .papier }](papier/sujets/p06.jpg)
    <p class="papier-legende">Exercice 6 – Méthode de Newton · Sujets d&#x27;oral 2025-2026, page 6</p>

    [![Sujets d&#x27;oral 2025-2026, page 7 : Exercice 7 – Méthode de Newton](papier/sujets/p07.jpg){ loading=lazy .papier }](papier/sujets/p07.jpg)
    <p class="papier-legende">Exercice 7 – Méthode de Newton · Sujets d&#x27;oral 2025-2026, page 7</p>

    [![Sujets d&#x27;oral 2025-2026, page 8 : Exercice 8 – Comparaison entre les méthodes du point fixe et de Newton](papier/sujets/p08.jpg){ loading=lazy .papier }](papier/sujets/p08.jpg)
    <p class="papier-legende">Exercice 8 – Comparaison entre les méthodes du point fixe et de Newton · Sujets d&#x27;oral 2025-2026, page 8</p>

    [![Sujets d&#x27;oral 2025-2026, page 9 : Chapitre 2 - Équations différentielles](papier/sujets/p09.jpg){ loading=lazy .papier }](papier/sujets/p09.jpg)
    <p class="papier-legende">Chapitre 2 - Équations différentielles · Sujets d&#x27;oral 2025-2026, page 9</p>

    [![Sujets d&#x27;oral 2025-2026, page 10 : Exercice 2 – Méthode d’Euler explicite](papier/sujets/p10.jpg){ loading=lazy .papier }](papier/sujets/p10.jpg)
    <p class="papier-legende">Exercice 2 – Méthode d’Euler explicite · Sujets d&#x27;oral 2025-2026, page 10</p>

    [![Sujets d&#x27;oral 2025-2026, page 11 : Exercice 3 – Méthodes de Heun et du trapèze](papier/sujets/p11.jpg){ loading=lazy .papier }](papier/sujets/p11.jpg)
    <p class="papier-legende">Exercice 3 – Méthodes de Heun et du trapèze · Sujets d&#x27;oral 2025-2026, page 11</p>

    [![Sujets d&#x27;oral 2025-2026, page 12 : Exercice 4 – Méthode RK4](papier/sujets/p12.jpg){ loading=lazy .papier }](papier/sujets/p12.jpg)
    <p class="papier-legende">Exercice 4 – Méthode RK4 · Sujets d&#x27;oral 2025-2026, page 12</p>

    [![Sujets d&#x27;oral 2025-2026, page 13 : Exercice 5 – Erreur d’Euler par rapport à la solution exacte](papier/sujets/p13.jpg){ loading=lazy .papier }](papier/sujets/p13.jpg)
    <p class="papier-legende">Exercice 5 – Erreur d’Euler par rapport à la solution exacte · Sujets d&#x27;oral 2025-2026, page 13</p>

    [![Sujets d&#x27;oral 2025-2026, page 14 : Exercice 6 – Stabilité de la méthode d’Euler](papier/sujets/p14.jpg){ loading=lazy .papier }](papier/sujets/p14.jpg)
    <p class="papier-legende">Exercice 6 – Stabilité de la méthode d’Euler · Sujets d&#x27;oral 2025-2026, page 14</p>

    [![Sujets d&#x27;oral 2025-2026, page 15 : Exercice 7 – Comparaison entre les méthodes d’Euler et de Heun](papier/sujets/p15.jpg){ loading=lazy .papier }](papier/sujets/p15.jpg)
    <p class="papier-legende">Exercice 7 – Comparaison entre les méthodes d’Euler et de Heun · Sujets d&#x27;oral 2025-2026, page 15</p>

    [![Sujets d&#x27;oral 2025-2026, page 16 : Exercice 8 – Comparaison entre les méthodes d’Euler et RK4](papier/sujets/p16.jpg){ loading=lazy .papier }](papier/sujets/p16.jpg)
    <p class="papier-legende">Exercice 8 – Comparaison entre les méthodes d’Euler et RK4 · Sujets d&#x27;oral 2025-2026, page 16</p>

    [![Sujets d&#x27;oral 2025-2026, page 17 : Chapitre 3 - Polynômes d’interpolation](papier/sujets/p17.jpg){ loading=lazy .papier }](papier/sujets/p17.jpg)
    <p class="papier-legende">Chapitre 3 - Polynômes d’interpolation · Sujets d&#x27;oral 2025-2026, page 17</p>

    [![Sujets d&#x27;oral 2025-2026, page 18 : Exercice 2 – Interpolation de Newton](papier/sujets/p18.jpg){ loading=lazy .papier }](papier/sujets/p18.jpg)
    <p class="papier-legende">Exercice 2 – Interpolation de Newton · Sujets d&#x27;oral 2025-2026, page 18</p>

    [![Sujets d&#x27;oral 2025-2026, page 19 : Exercice 3 – Comparaison des interpolations de Lagrange et de Newton](papier/sujets/p19.jpg){ loading=lazy .papier }](papier/sujets/p19.jpg)
    <p class="papier-legende">Exercice 3 – Comparaison des interpolations de Lagrange et de Newton · Sujets d&#x27;oral 2025-2026, page 19</p>

    [![Sujets d&#x27;oral 2025-2026, page 20 : Exercice 4 – Interpolation de Lagrange et estimation de l’erreur](papier/sujets/p20.jpg){ loading=lazy .papier }](papier/sujets/p20.jpg)
    <p class="papier-legende">Exercice 4 – Interpolation de Lagrange et estimation de l’erreur · Sujets d&#x27;oral 2025-2026, page 20</p>

    [![Sujets d&#x27;oral 2025-2026, page 21 : Exercice 5 – Interpolation de Newton et mise à jour des données](papier/sujets/p21.jpg){ loading=lazy .papier }](papier/sujets/p21.jpg)
    <p class="papier-legende">Exercice 5 – Interpolation de Newton et mise à jour des données · Sujets d&#x27;oral 2025-2026, page 21</p>

    [![Sujets d&#x27;oral 2025-2026, page 22 : Exercice 6 – Interpolation de ln(1 + x)](papier/sujets/p22.jpg){ loading=lazy .papier }](papier/sujets/p22.jpg)
    <p class="papier-legende">Exercice 6 – Interpolation de ln(1 + x) · Sujets d&#x27;oral 2025-2026, page 22</p>

    [![Sujets d&#x27;oral 2025-2026, page 23 : Exercice 7 – Phénomène de Runge et choix des nœuds](papier/sujets/p23.jpg){ loading=lazy .papier }](papier/sujets/p23.jpg)
    <p class="papier-legende">Exercice 7 – Phénomène de Runge et choix des nœuds · Sujets d&#x27;oral 2025-2026, page 23</p>

    [![Sujets d&#x27;oral 2025-2026, page 24 : Exercice 8 – Interpolation et dérivation numérique](papier/sujets/p24.jpg){ loading=lazy .papier }](papier/sujets/p24.jpg)
    <p class="papier-legende">Exercice 8 – Interpolation et dérivation numérique · Sujets d&#x27;oral 2025-2026, page 24</p>

    [![Sujets d&#x27;oral 2025-2026, page 25 : Chapitre 4 - Intégration numérique](papier/sujets/p25.jpg){ loading=lazy .papier }](papier/sujets/p25.jpg)
    <p class="papier-legende">Chapitre 4 - Intégration numérique · Sujets d&#x27;oral 2025-2026, page 25</p>

    [![Sujets d&#x27;oral 2025-2026, page 26 : Exercice 2 – Méthodes des trapèzes et de Simpson](papier/sujets/p26.jpg){ loading=lazy .papier }](papier/sujets/p26.jpg)
    <p class="papier-legende">Exercice 2 – Méthodes des trapèzes et de Simpson · Sujets d&#x27;oral 2025-2026, page 26</p>

    [![Sujets d&#x27;oral 2025-2026, page 27 : Exercice 3 – Méthode de Simpson sur un ensemble de points](papier/sujets/p27.jpg){ loading=lazy .papier }](papier/sujets/p27.jpg)
    <p class="papier-legende">Exercice 3 – Méthode de Simpson sur un ensemble de points · Sujets d&#x27;oral 2025-2026, page 27</p>

    [![Sujets d&#x27;oral 2025-2026, page 28 : Exercice 4 – Méthode du point milieu et valeur exacte](papier/sujets/p28.jpg){ loading=lazy .papier }](papier/sujets/p28.jpg)
    <p class="papier-legende">Exercice 4 – Méthode du point milieu et valeur exacte · Sujets d&#x27;oral 2025-2026, page 28</p>

    [![Sujets d&#x27;oral 2025-2026, page 29 : Exercice 5 – Méthode des trapèzes et intégrale exacte](papier/sujets/p29.jpg){ loading=lazy .papier }](papier/sujets/p29.jpg)
    <p class="papier-legende">Exercice 5 – Méthode des trapèzes et intégrale exacte · Sujets d&#x27;oral 2025-2026, page 29</p>

    [![Sujets d&#x27;oral 2025-2026, page 30 : Exercice 6 – Méthode des trapèzes](papier/sujets/p30.jpg){ loading=lazy .papier }](papier/sujets/p30.jpg)
    <p class="papier-legende">Exercice 6 – Méthode des trapèzes · Sujets d&#x27;oral 2025-2026, page 30</p>

    [![Sujets d&#x27;oral 2025-2026, page 31 : Exercice 7 – Méthode de Simpson](papier/sujets/p31.jpg){ loading=lazy .papier }](papier/sujets/p31.jpg)
    <p class="papier-legende">Exercice 7 – Méthode de Simpson · Sujets d&#x27;oral 2025-2026, page 31</p>

    [![Sujets d&#x27;oral 2025-2026, page 32 : Exercice 8 – Comparaison des méthodes du point milieu, des trapèzes et](papier/sujets/p32.jpg){ loading=lazy .papier }](papier/sujets/p32.jpg)
    <p class="papier-legende">Exercice 8 – Comparaison des méthodes du point milieu, des trapèzes et · Sujets d&#x27;oral 2025-2026, page 32</p>

    <!-- /papier -->
