---
title: "Fiche — Modélisation mathématique"
---

# Fiche — Modélisation mathématique

Erreur absolue $|\bar a - a|$, relative $\frac{|\bar a - a|}{|a|}$. Ordre $p$ : $|x_{n+1} - \ell| \approx C|x_n - \ell|^p$.

## Équations non linéaires $f(x) = 0$

| Méthode | Itération | Conditions | Ordre |
|---|---|---|---|
| Dichotomie | $c_n = \frac{a_n + b_n}{2}$, garder la moitié où $f$ change de signe | $f$ continue, $f(a)f(b) < 0$ | 1 ; $\lvert r - c_n\rvert \le \frac{b - a}{2^{n+1}}$ |
| Newton | $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$ | $f' \ne 0$, $x_0$ proche | 2 (racine simple) |
| Newton, racine d'ordre $m$ | $x_{n+1} = x_n - m\frac{f(x_n)}{f'(x_n)}$ | | 2 |
| Point fixe | $x_{n+1} = g(x_n)$ | $g([a,b]) \subset [a,b]$ et $\lvert g'\rvert \le k < 1$ | 1 ; $\lvert x_n - p\rvert \le \frac{k^n}{1-k}\lvert x_1 - x_0\rvert$ |
| Newton 2D | $X_{n+1} = X_n - DF^{-1}F(X_n)$ | $\det DF \ne 0$ | 2 |

Existence/unicité : TVI + stricte monotonie. Nombre d'itérations de dichotomie : $n + 1 \ge \log_2\frac{b - a}{\varepsilon}$.

## Équations différentielles $y' = f(t, y)$, pas $h$

| Schéma | Formule | Ordre |
|---|---|---|
| Euler explicite | $y_{n+1} = y_n + hf(t_n, y_n)$ | 1 |
| Euler implicite | $y_{n+1} = y_n + hf(t_{n+1}, y_{n+1})$ | 1 |
| Crank-Nicolson | $y_{n+1} = y_n + \frac h2[f(t_n, y_n) + f(t_{n+1}, y_{n+1})]$ | 2 |
| Heun | $y_{n+1} = y_n + \frac h2[f(t_n, y_n) + f(t_{n+1}, y_n + hf(t_n, y_n))]$ | 2 |
| Point milieu | $y_{n+1} = y_n + hf(t_n + \frac h2, y_n + \frac h2f(t_n, y_n))$ | 2 |
| RK4 | $y_{n+1} = y_n + \frac h6(K_1 + 2K_2 + 2K_3 + K_4)$ | 4 |

RK4 : $K_1 = f(t_n, y_n)$, $K_2 = f(t_n + \frac h2, y_n + \frac h2K_1)$, $K_3 = f(t_n + \frac h2, y_n + \frac h2K_2)$, $K_4 = f(t_n + h, y_n + hK_3)$.
**Stabilité** ($y' = \lambda y$, $\lambda < 0$) : Euler explicite si $\lvert 1 + h\lambda\rvert < 1$ ($h < \frac{2}{\lvert\lambda\rvert}$) ; Euler implicite toujours.
**Ordre 2 → système** : $y_1 = y$, $y_2 = y'$ ; $y_1' = y_2$, $y_2' = f(t, y_1, y_2)$.
**Solution exacte** : $y = y_h + y_p$ ; $y' = ay$ donne $Ce^{at}$ ; second membre $\sin$/$\cos$ → $y_p = A\cos t + B\sin t$ ; polynôme → polynôme de même degré.

## Interpolation ($n + 1$ points distincts → un unique polynôme de degré $\le n$)

- **Lagrange** : $p = \sum y_i\ell_i$, $\ell_i(x) = \prod_{j\ne i}\frac{x - x_j}{x_i - x_j}$.
- **Newton** : $p = \sum_k [x_0, \dots, x_k]\prod_{j<k}(x - x_j)$, avec $[x_i, \dots, x_{i+k}] = \frac{[x_{i+1}, \dots, x_{i+k}] - [x_i, \dots, x_{i+k-1}]}{x_{i+k} - x_i}$ ; ajouter un point = ajouter un terme.
- **Erreur** : $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod(x - x_i)$ ; équidistant : $\lvert E\rvert \le \frac{h^{n+1}}{4(n+1)}\max\lvert f^{(n+1)}\rvert$.
- $\max_{[0,2]}\lvert x(x-1)(x-2)\rvert = \max_{[-1,1]}\lvert x(x^2-1)\rvert = \frac{2}{3\sqrt3} \approx 0{,}385$.
- **Runge** : nœuds équidistants → oscillations aux bords ; **Tchebychev** $x_i = \cos\frac{(2i+1)\pi}{2(n+1)}$.

## Intégration, $h = \frac{b - a}{n}$

| Méthode | Formule composée | Erreur | Degré |
|---|---|---|---|
| Trapèzes | $\frac h2[f_0 + 2(f_1 + \dots + f_{n-1}) + f_n]$ | $\lvert E\rvert \le \frac{(b - a)^3}{12n^2}\sup\lvert f''\rvert$ | 1 |
| Simpson ($n$ pair) | $\frac h3[f_0 + 4(f_1 + f_3 + \dots) + 2(f_2 + f_4 + \dots) + f_n]$ | $\lvert E\rvert \le \frac{(b - a)^5}{180n^4}\sup\lvert f^{(4)}\rvert$ | 3 |
| Point milieu ($n$ pair, poly) | $\sum 2h\,f(x_{2k+1})$ | $\frac{b - a}{6}h^2\lvert f''(\xi)\rvert$ | 1 |

$h \to \frac h2$ : erreur divisée par 4 (trapèzes, point milieu), par 16 (Simpson). Simpson $= \frac{2M_h + T_{2h}}{3}$.
Règle des 3/8 (DE 2026) : $\int_0^1 f \approx \frac18[f(0) + 3f(\frac13) + 3f(\frac23) + f(1)]$.
