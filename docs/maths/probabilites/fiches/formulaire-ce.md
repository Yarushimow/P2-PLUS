---
title: "Formulaire CE — 14 octobre"
---

# Formulaire CE — 14 octobre

Seulement les formules qui servent dans les exercices du programme du CE :
**chapitre 1 en entier, chapitre 2 en entier, exercices 3.1 à 3.15** (poly 2026-2027).
La colonne « Sert dans » donne les exercices où on l'utilise, les plus fréquentes en premier.
Formulaire complet : [ici](formulaire.md).

## Chapitre 1 — Calculer une probabilité

| Formule | Sert dans |
|---|---|
| $P(\overline{A}) = 1 - P(A)$ | QCM, 1.3, 1.4, 1.5, 1.10, 1.12, 1.13, 2.5, 2.17, 2.21, 3.3 |
| Incompatibles 2 à 2 : $P\big(\bigcup A_i\big) = \sum P(A_i)$ (somme de cases d'un tableau) | QCM, 1.10, 1.11, 1.12, 2.4 à 2.8, 2.16, 3.7, 3.9, 3.13 |
| Uniforme : $P(A) = \dfrac{\operatorname{card} A}{\operatorname{card} \Omega} = \dfrac{\text{effectif}}{\text{total}}$ | 1.5, 1.12, 1.13, 2.1, 2.9, 2.10, 2.21, 2.22, 3.4, 3.8 |
| $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ | QCM, 1.3 à 1.10 |
| De Morgan : $\overline{A \cup B} = \overline{A} \cap \overline{B}$, $\quad \overline{A \cap B} = \overline{A} \cup \overline{B}$ | 1.1, 1.2, 1.3, 1.5, 1.10, 1.12, 2.5, 2.21 |
| $P(A \cap \overline{B}) = P(A) - P(A \cap B)$ | QCM, 1.3, 1.5, 1.10, 1.12, 2.3, 2.4 |
| $P(\text{au moins un}) = 1 - P(\text{aucun})$, $\quad \text{aucun} = \overline{A} \cap \overline{B} \cap \overline{C}$ | 1.1, 1.4, 1.5, 1.12, 1.13, 2.5, 2.11, 2.21 |
| $0 \le P(A) \le 1$, $\quad P(\Omega) = 1$ | QCM, 1.6, 1.7, 1.11, 2.2 |
| $A \subset B \Rightarrow P(A) \le P(B)$, $\quad P(A \cap B) \le \min\big(P(A), P(B)\big)$ | QCM, 1.6, 1.14, 2.2 |
| Exactement un : $P(A) + P(B) - 2P(A \cap B)$ | 1.1, 1.2, 1.10, 1.12 |
| Boole : $P\big(\bigcup_{i=1}^n A_i\big) \le \sum_{i=1}^n P(A_i)$ | QCM, 1.8, 1.14 |
| Bonferroni : $P(A \cap B) \ge P(A) + P(B) - 1$, $\quad P\big(\bigcap_{i=1}^n A_i\big) \ge \sum P(A_i) - (n - 1)$ | 1.6, 1.7 |
| Distributivité : $(A \cup B) \cap C = (A \cap C) \cup (B \cap C)$, $\quad (A \cap B) \cup C = (A \cup C) \cap (B \cup C)$ | 1.2, 2.2 |

**Poincaré, 3 évènements** · QCM, 1.12

$$
P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)
$$

**Poincaré, $n$ évènements** · 1.9, 2.21

$$
P\Big(\bigcup_{i=1}^n A_i\Big) = \sum_{k=1}^n (-1)^{k+1} \sum_{1 \le i_1 < \dots < i_k \le n} P(A_{i_1} \cap \dots \cap A_{i_k})
$$

**Traduire l'énoncé** · 1.1, 1.12, 3.3

| Phrase | Écriture |
|---|---|
| Seulement $E$ | $E \cap \overline{F} \cap \overline{G}$ |
| Au moins deux | $(E \cap F) \cup (E \cap G) \cup (F \cap G)$ |
| Exactement deux | $(E \cap F \cap \overline{G}) \cup (E \cap \overline{F} \cap G) \cup (\overline{E} \cap F \cap G)$ |
| Au plus $k$ | contraire de « au moins $k + 1$ » |
| Différence symétrique (1.2) | $A \triangle B = (A \cap \overline{B}) \cup (B \cap \overline{A})$ |

## Chapitre 2 — Conditionner

| Formule | Sert dans |
|---|---|
| Probabilités totales : $P(E) = \sum_i P(E \mid A_i)\,P(A_i)$ ($A_i$ système complet) | 2.8, 2.11, 2.14 à 2.20, 2.22 à 2.25, 3.5, 3.14 |
| $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$ | QCM, 2.2, 2.9, 2.12, 2.15, 2.16, 2.17, 2.20, 3.3, 3.7, 3.9, 3.11 |
| Bayes : $P(A_j \mid E) = \dfrac{P(E \mid A_j)\,P(A_j)}{\sum_i P(E \mid A_i)\,P(A_i)}$ | QCM, 2.11, 2.14 à 2.20, 2.22 |
| Multiplication : $P(A \cap B) = P(A)\,P(B \mid A)$ (produit le long d'une branche d'arbre) | 1.14, 2.6, 2.11, 2.16, 2.17, 2.18, 3.11, 3.14 |
| Indépendance : $P(A \cap B) = P(A)\,P(B) \iff P(A \mid B) = P(A)$ | 2.1, 2.3, 2.4, 2.9, 2.10, 2.12, 2.18, 3.11 |
| $n$ essais indépendants : $P(A_1 \cap \dots \cap A_n) = P(A_1) \cdots P(A_n)$ (toute sous-famille) | 2.5, 2.6, 2.13, 2.20, 3.3 |
| $P(\overline{A} \mid B) = 1 - P(A \mid B)$ (branches d'un nœud : somme 1) | QCM, 2.11, 2.17, 2.23 |
| $E, F$ indép. $\iff E, \overline{F}$ indép. $\iff \overline{E}, \overline{F}$ indép. | 2.3, 2.10, 2.13 |
| Indépendance sur un tableau 2×2 : $P(E \cap F)\,P(\overline{E} \cap \overline{F}) = P(E \cap \overline{F})\,P(\overline{E} \cap F)$ | 2.4 |
| « $E$ avant $F$ » ($E$, $F$ incompatibles, essais répétés) : $\dfrac{P(E)}{P(E) + P(F)}$ | 2.7, 2.8 |
| Incompatibles et de proba $> 0$ $\Rightarrow$ **pas** indépendants | 2.1 |

**Bayes à deux causes**

$$
P(A \mid E) = \frac{P(E \mid A)\,P(A)}{P(E \mid A)\,P(A) + P(E \mid \overline{A})\,P(\overline{A})}
$$

**Tableau d'effectifs** · 2.9, 2.10 : $\;P(A \cap B) = \dfrac{n_{A \cap B}}{n}$, $\quad P(A \mid B) = \dfrac{n_{A \cap B}}{n_B}$ (on divise par l'effectif **de la condition**).

## Chapitre 3 — Variables discrètes (3.1 à 3.15)

| Formule | Sert dans |
|---|---|
| $E(X) = \sum_x x\,P(X = x)$ | 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 3.10, 3.13, 3.14 |
| $V(X) = E(X^2) - E(X)^2$ | QCM, 3.3, 3.4, 3.5, 3.6, 3.8, 3.10, 3.13, 3.14 |
| Transfert : $E\big(g(X)\big) = \sum_x g(x)\,P(X = x)$, en particulier $E(X^2) = \sum_x x^2 P(X = x)$ | QCM, 3.3, 3.4, 3.5, 3.6, 3.8, 3.13, 3.14 |
| $X$, $Y$ indép. $\iff P(X = x, Y = y) = P(X = x)\,P(Y = y)$ pour **tous** $(x, y)$ | QCM, 3.6 à 3.10, 3.13, 3.14 |
| Marginales : $P(X = x) = \sum_y P(X = x, Y = y)$ (sommes des lignes / colonnes) | 3.7, 3.8, 3.9, 3.10, 3.13, 3.14 |
| $\operatorname{Cov}(X, Y) = E(XY) - E(X)\,E(Y)$ | 3.6, 3.8, 3.10, 3.11, 3.13, 3.14 |
| Indép. $\Rightarrow \operatorname{Cov} = 0$ ; $\;\operatorname{Cov} \ne 0 \Rightarrow$ pas indép. ; réciproque **fausse** | QCM, 3.6, 3.9, 3.10, 3.12, 3.15 |
| $E(XY) = \sum_{x, y} xy\,P(X = x, Y = y)$ | 3.6, 3.8, 3.10, 3.13, 3.14 |
| $\sigma(X) = \sqrt{V(X)}$ | 3.5, 3.8, 3.10, 3.14, 3.15 |
| $P(X = k) = \dbinom{n}{k} p^k (1 - p)^{n - k}$, $\quad P(X = 0) = (1 - p)^n$ | QCM, 2.5, 3.1, 3.2, 3.10, 3.14 |
| $\rho(X, Y) = \dfrac{\operatorname{Cov}(X, Y)}{\sigma(X)\,\sigma(Y)}$ | 3.8, 3.10, 3.12, 3.14 |
| Équiprobable sur $n$ valeurs : $P(X = k) = \dfrac{1}{n}$ | QCM, 3.4, 3.8, 3.10 |
| $E(aX + bY) = aE(X) + bE(Y)$ | 3.3, 3.6, 3.15 |
| $V(X + Y) = V(X) + V(Y) + 2\operatorname{Cov}(X, Y)$ | 3.6, 3.14, 3.15 |
| Indép. $\iff$ lignes (ou colonnes) du tableau proportionnelles | 3.7, 3.9, 3.13 |
| Indépendantes : $V\big(\sum X_i\big) = \sum V(X_i)$ | 3.3, 3.15 |
| Loi valide : $p_i \ge 0$ et $\sum p_i = 1$ | 3.7, 3.13 |
| Loi de $g(X, Y)$ : additionner les cases qui donnent la même valeur | 3.2, 3.13 |
| Loi symétrique autour de $c$ $\Rightarrow E(X) = c$ | 3.3, 3.9 |
| $F(x) = P(X \le x)$, $\quad P(X = k) = F(k) - F(k - 1)$ | 3.3 |
| Indicatrice : $E(\mathbb 1_A) = P(A)$, $\quad \mathbb 1_A \mathbb 1_B = \mathbb 1_{A \cap B}$ | QCM, 3.11 |
| $\lvert \rho \rvert = 1 \iff Y = aX + b$ ; $\;\rho = 0 \not\Rightarrow$ indépendance | 3.10, 3.12 |
| $V(aX + b) = a^2 V(X)$, $\quad \operatorname{Cov}$ bilinéaire, $\operatorname{Cov}(X, X) = V(X)$ | 3.15 |
| Binomiale : $E = np$, $\quad V = np(1 - p)$ | QCM, 3.10 |

**Moyenne empirique** · 3.15 — $X_1, \dots, X_n$ indépendantes, même loi ($\mu$, $\sigma$), $\overline{X} = \frac1n \sum X_i$ :

$$
E(\overline{X}) = \mu
\qquad
V(\overline{X}) = \frac{\sigma^2}{n}
\qquad
\sigma(\overline{X}) = \frac{\sigma}{\sqrt n}
$$

## Outils de calcul

| Formule | Sert dans |
|---|---|
| Série géométrique : $\sum_{k \ge 0} q^k = \dfrac{1}{1 - q}$ ($\lvert q \rvert < 1$) | 1.11, 2.6, 2.7, 2.8 |
| $q^n \to 0$ si $\lvert q \rvert < 1$ | 2.20, 2.23, 2.24, 2.25 |
| $\dbinom{n}{k} = \dfrac{n!}{k!\,(n - k)!}$ | QCM, 2.21, 3.1, 3.14 |
| Permutations : $n!$ | 2.21, 3.8 |
| Somme de deux dés : $P(S = s) = \dfrac{6 - \lvert s - 7 \rvert}{36}$ ($s = 2, \dots, 12$) | 2.6, 2.8 |
| Tirages sans remise ordonnés : $\dfrac{n(n - 1)\cdots(n - k + 1)}{n^k}$ (anniversaires) | 1.13 |
| Somme géométrique finie : $\sum_{k=0}^n p^k q^{n - k} = \dfrac{p^{n+1} - q^{n+1}}{p - q}$ | 2.5 |
| $\sum_{k \ge 0} \dfrac{x^k}{k!} = e^x$ | 2.21 |
| $u_{n+1} = a u_n + b$ : point fixe $\ell = \frac{b}{1 - a}$, $\;u_n = \ell + a^n (u_0 - \ell)$ | 2.23 |
| $u_{n+2} + a u_{n+1} + b u_n = 0$ : racines $q_1 \ne q_2$ de $X^2 + aX + b$, $\;u_n = \alpha q_1^n + \beta q_2^n$ ; racine double : $u_n = (\alpha n + \beta) q^n$ | 2.24 |
| Matrices : $X_n = M^n X_0$, $\;P^{-1} M P = D \Rightarrow M^n = P D^n P^{-1}$ | 2.25 |
| Récurrence | 1.7, 1.8, 1.9, 2.25 |

!!! piege "Inutile pour ce CE"
    Loi géométrique, binomiale négative, Poisson (formules complètes), $E$ et $V$ de la loi
    uniforme, variable centrée réduite, moments : rien de tout ça ne sert dans 1.1 à 3.15.
