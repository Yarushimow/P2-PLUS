---
title: "Formulaire — Probabilités"
---

# Formulaire — Probabilités

Uniquement les formules, dans l'ordre du poly. Les explications sont dans la
[fiche CE](fiche-ce-chapitres-1-3.md) et les [notes de cours](../cours/index.md).

## Chapitre 1 — Espace probabilisé

| | Formule |
|---|---|
| Complémentaire | $P(\overline{A}) = 1 - P(A)$ |
| Impossible, certain | $P(\emptyset) = 0$, $\quad P(\Omega) = 1$, $\quad 0 \le P(A) \le 1$ |
| Inclusion | $A \subset B \Rightarrow P(A) \le P(B)$ |
| Réunion | $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ |
| Incompatibles ($A \cap B = \emptyset$) | $P(A \cup B) = P(A) + P(B)$ |
| « $A$ mais pas $B$ » | $P(A \cap \overline{B}) = P(A) - P(A \cap B)$ |
| Exactement un des deux | $P\big((A \cap \overline{B}) \cup (\overline{A} \cap B)\big) = P(A) + P(B) - 2P(A \cap B)$ |
| De Morgan | $\overline{A \cup B} = \overline{A} \cap \overline{B}$, $\quad \overline{A \cap B} = \overline{A} \cup \overline{B}$ |
| Ni $A$ ni $B$ | $P(\overline{A} \cap \overline{B}) = 1 - P(A \cup B)$ |
| Uniforme ($\Omega$ fini) | $P(A) = \dfrac{\operatorname{card} A}{\operatorname{card} \Omega}$ |
| Boole | $P\big(\bigcup_{i=1}^n A_i\big) \le \sum_{i=1}^n P(A_i)$ |
| Bonferroni | $P(A \cap B) \ge P(A) + P(B) - 1$ |
| Encadrement | $\max\big(0,\, P(A) + P(B) - 1\big) \le P(A \cap B) \le \min\big(P(A), P(B)\big)$ |

**Poincaré, 3 évènements**

$$
P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)
$$

**Poincaré, $n$ évènements**

$$
P\Big(\bigcup_{i=1}^n A_i\Big) = \sum_{k=1}^n (-1)^{k+1} \sum_{1 \le i_1 < \dots < i_k \le n} P(A_{i_1} \cap \dots \cap A_{i_k})
$$

**Système complet d'évènements** $(A_1, \dots, A_n)$ : $\;\bigcup_i A_i = \Omega\;$ et $\;A_i \cap A_j = \emptyset$ pour $i \ne j$.

**Dénombrement utile**

| | Formule |
|---|---|
| Combinaisons | $\dbinom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$ |
| Arrangements | $A_n^k = \dfrac{n!}{(n-k)!}$ |
| Permutations | $n!$ |
| Binôme de Newton | $(a + b)^n = \sum_{k=0}^n \dbinom{n}{k} a^k b^{n-k}$ |

## Chapitre 2 — Probabilités conditionnelles

| | Formule |
|---|---|
| Définition ($P(F) > 0$) | $P(E \mid F) = \dfrac{P(E \cap F)}{P(F)}$ |
| Contraire | $P(\overline{E} \mid F) = 1 - P(E \mid F)$ |
| Multiplication | $P(E \cap F) = P(F)\,P(E \mid F) = P(E)\,P(F \mid E)$ |
| Multiplication, 3 évènements | $P(E_1 \cap E_2 \cap E_3) = P(E_1)\,P(E_2 \mid E_1)\,P(E_3 \mid E_1 \cap E_2)$ |
| Indépendance | $P(E \cap F) = P(E)\,P(F)$ $\iff$ $P(E \mid F) = P(E)$ |
| Indépendance et contraires | $E, F$ indép. $\iff$ $E, \overline{F}$ indép. $\iff$ $\overline{E}, \overline{F}$ indép. |
| Indépendance (tableau) | $P(E \cap F)\,P(\overline{E} \cap \overline{F}) = P(E \cap \overline{F})\,P(\overline{E} \cap F)$ |

**Trois évènements indépendants** : les 3 couples ET le triplet.

$$
P(E \cap F) = P(E)P(F),\quad P(E \cap G) = P(E)P(G),\quad P(F \cap G) = P(F)P(G),\quad P(E \cap F \cap G) = P(E)P(F)P(G)
$$

**Probabilités totales** ($A_1, \dots, A_n$ système complet)

$$
P(E) = \sum_{i=1}^n P(E \mid A_i)\,P(A_i)
\qquad\text{cas de 2 :}\qquad
P(E) = P(E \mid A)P(A) + P(E \mid \overline{A})P(\overline{A})
$$

**Bayes**

$$
P(A_j \mid E) = \frac{P(E \mid A_j)\,P(A_j)}{\sum_{i=1}^n P(E \mid A_i)\,P(A_i)}
\qquad\text{cas de 2 :}\qquad
P(A \mid E) = \frac{P(E \mid A)P(A)}{P(E \mid A)P(A) + P(E \mid \overline{A})P(\overline{A})}
$$

**Tableau de contingence** (effectifs) : $P(A) = \dfrac{n_A}{n}$, $\quad P(A \cap B) = \dfrac{n_{A \cap B}}{n}$, $\quad P(A \mid B) = \dfrac{n_{A \cap B}}{n_B}$.

**Série géométrique** (jeux « jusqu'à ce que ») : $\displaystyle\sum_{k=0}^{+\infty} q^k = \frac{1}{1 - q}$ pour $|q| < 1$.

## Chapitre 3 — Variables aléatoires discrètes

### Loi et fonction de répartition

| | Formule |
|---|---|
| Loi | $p_i = P(X = x_i)$, $\quad \sum_i p_i = 1$ |
| Fonction de répartition | $F(x) = P(X \le x) = \sum_{x_i \le x} P(X = x_i)$ |
| Loi depuis $F$ (valeurs entières) | $P(X = k) = F(k) - F(k - 1)$ |
| Intervalle | $P(x_i \le X \le x_j) = \sum_{k=i}^{j} p_k$ |
| $Y = g(X)$ | $P(Y = y) = \sum_{x \,:\, g(x) = y} P(X = x)$ |

### Espérance, variance, écart-type

| | Formule |
|---|---|
| Espérance | $E(X) = \sum_x x\,P(X = x)$ |
| Transfert | $E\big(g(X)\big) = \sum_x g(x)\,P(X = x)$ |
| Linéarité | $E(aX + bY) = aE(X) + bE(Y)$, $\quad E(b) = b$ |
| Variance | $V(X) = E\big((X - E(X))^2\big) = E(X^2) - E(X)^2$ |
| Variance affine | $V(aX + b) = a^2\,V(X)$ |
| Écart-type | $\sigma(X) = \sqrt{V(X)}$, $\quad \sigma(aX + b) = \lvert a \rvert\,\sigma(X)$ |
| Centrée réduite | $Z = \dfrac{X - E(X)}{\sigma(X)}$ : $\; E(Z) = 0$, $V(Z) = 1$ |
| Moments | $m_n = E(X^n)$, $\quad \mu_n = E\big((X - E(X))^n\big)$ |

### Couples de variables

| | Formule |
|---|---|
| Loi conjointe | $P(X = x, Y = y)$, $\quad \sum_{x, y} P(X = x, Y = y) = 1$ |
| Lois marginales | $P(X = x) = \sum_y P(X = x, Y = y)$, $\quad P(Y = y) = \sum_x P(X = x, Y = y)$ |
| Loi conditionnelle | $P(X = x \mid Y = y) = \dfrac{P(X = x, Y = y)}{P(Y = y)}$ |
| Indépendance | $P(X = x, Y = y) = P(X = x)\,P(Y = y)$ pour **tous** $(x, y)$ |
| Transfert (couple) | $E\big(g(X, Y)\big) = \sum_{x, y} g(x, y)\,P(X = x, Y = y)$ |
| $E(XY)$ | $E(XY) = \sum_{x, y} xy\,P(X = x, Y = y)$ |
| Indépendantes | $E(XY) = E(X)\,E(Y)$ |

### Covariance et corrélation

| | Formule |
|---|---|
| Covariance | $\operatorname{Cov}(X, Y) = E(XY) - E(X)\,E(Y)$ |
| Avec soi-même | $\operatorname{Cov}(X, X) = V(X)$ |
| Symétrie | $\operatorname{Cov}(X, Y) = \operatorname{Cov}(Y, X)$ |
| Bilinéarité | $\operatorname{Cov}(aX + bY, Z) = a\operatorname{Cov}(X, Z) + b\operatorname{Cov}(Y, Z)$ |
| Constante | $\operatorname{Cov}(X, b) = 0$ |
| Variance d'une somme | $V(X + Y) = V(X) + V(Y) + 2\operatorname{Cov}(X, Y)$ |
| Variance d'une différence | $V(X - Y) = V(X) + V(Y) - 2\operatorname{Cov}(X, Y)$ |
| Combinaison | $V(aX + bY) = a^2V(X) + b^2V(Y) + 2ab\operatorname{Cov}(X, Y)$ |
| Indépendantes | $\operatorname{Cov}(X, Y) = 0$ et $V(X + Y) = V(X) + V(Y)$ |
| Corrélation | $\rho(X, Y) = \dfrac{\operatorname{Cov}(X, Y)}{\sigma(X)\,\sigma(Y)}$, $\quad -1 \le \rho \le 1$ |
| $\lvert\rho\rvert = 1$ | $Y = aX + b$ ($\rho = 1$ si $a > 0$, $\rho = -1$ si $a < 0$) |
| Indicatrices | $\operatorname{Cov}(\mathbb 1_A, \mathbb 1_B) = P(A \cap B) - P(A)P(B)$ |

!!! piege "Sens unique"
    $X, Y$ indépendantes $\Rightarrow \operatorname{Cov}(X, Y) = 0$. La réciproque est **fausse**.
    $\operatorname{Cov}(X, Y) \ne 0 \Rightarrow$ pas indépendantes.

### Moyenne empirique

$X_1, \dots, X_n$ indépendantes, même loi, d'espérance $\mu$ et d'écart-type $\sigma$ ; $\;\overline{X}_n = \dfrac{1}{n}\sum_{i=1}^n X_i$.

$$
E(\overline{X}_n) = \mu
\qquad
V(\overline{X}_n) = \frac{\sigma^2}{n}
\qquad
\sigma(\overline{X}_n) = \frac{\sigma}{\sqrt{n}}
\qquad
\operatorname{Cov}(\overline{X}_n, X_k) = \frac{\sigma^2}{n}
$$

### Lois usuelles (hors CE, pour le DE)

| Loi | $X(\Omega)$ | $P(X = k)$ | $E(X)$ | $V(X)$ |
|---|---|---|---|---|
| Uniforme $\mathcal U([\![1, n]\!])$ | $[\![1, n]\!]$ | $\dfrac{1}{n}$ | $\dfrac{n + 1}{2}$ | $\dfrac{n^2 - 1}{12}$ |
| Bernoulli $\mathcal B(p)$ | $\{0, 1\}$ | $P(X = 1) = p$ | $p$ | $p(1 - p)$ |
| Binomiale $\mathcal B(n, p)$ | $[\![0, n]\!]$ | $\dbinom{n}{k} p^k (1 - p)^{n - k}$ | $np$ | $np(1 - p)$ |
| Binomiale négative $\mathcal{BN}(r, p)$ | $[\![r, +\infty[\![$ | $\dbinom{k - 1}{r - 1} p^r (1 - p)^{k - r}$ | $\dfrac{r}{p}$ | $\dfrac{r(1 - p)}{p^2}$ |
| Géométrique ($r = 1$) | $\mathbb N^*$ | $(1 - p)^{k - 1} p$ | $\dfrac{1}{p}$ | $\dfrac{1 - p}{p^2}$ |
| Poisson $\mathcal P(\lambda)$ | $\mathbb N$ | $e^{-\lambda} \dfrac{\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |

| Propriété | Formule |
|---|---|
| Somme de binomiales indépendantes | $\mathcal B(n, p) + \mathcal B(m, p) = \mathcal B(n + m, p)$ |
| Somme de Poisson indépendantes | $\mathcal P(\lambda) + \mathcal P(\theta) = \mathcal P(\lambda + \theta)$ |
| Approximation | $\mathcal B(n, p) \approx \mathcal P(np)$ si $n$ grand, $p$ petit |
| Géométrique | $P(X > k) = (1 - p)^k$ |

**Sommes utiles**

$$
\sum_{k=1}^n k = \frac{n(n + 1)}{2}
\qquad
\sum_{k=1}^n k^2 = \frac{n(n + 1)(2n + 1)}{6}
\qquad
\sum_{k=0}^{+\infty} \frac{\lambda^k}{k!} = e^{\lambda}
$$
