---
title: "Questions de révision (CE)"
---

# Questions pour préparer les révisions

La liste de questions du module (document *SM301 — Questions pour préparer les révisions*),
avec les réponses. Clique sur une question **après** avoir répondu de tête.
Les numéros 24, 34 et 35 sont vides dans le document d'origine.

## Ensembles et formules de base

??? question "1. Lois de De Morgan"
    $\overline{E \cup F} = \overline{E} \cap \overline{F}$ et $\overline{E \cap F} = \overline{E} \cup \overline{F}$.

??? question "8. $(E \cap F) \cup G = \;?$"
    $(E \cup G) \cap (F \cup G)$ (distributivité de $\cup$ sur $\cap$).

??? question "9. $(E \cup F) \cap G = \;?$"
    $(E \cap G) \cup (F \cap G)$ (distributivité de $\cap$ sur $\cup$).

??? question "10. $P(\overline{E}) = \;?$"
    $1 - P(E)$.

??? question "11. $P(E \cup F) = \;?$"
    $P(E) + P(F) - P(E \cap F)$.

??? question "12. $P(E \cup F \cup G) = \;?$"
    $P(E) + P(F) + P(G) - P(E \cap F) - P(E \cap G) - P(F \cap G) + P(E \cap F \cap G)$.

??? question "13. $P(E \cup F \cup G \cup H) = \;?$"
    $$
    \begin{aligned}
    &P(E) + P(F) + P(G) + P(H) \\
    &- P(E \cap F) - P(E \cap G) - P(E \cap H) - P(F \cap G) - P(F \cap H) - P(G \cap H) \\
    &+ P(E \cap F \cap G) + P(E \cap F \cap H) + P(E \cap G \cap H) + P(F \cap G \cap H) \\
    &- P(E \cap F \cap G \cap H)
    \end{aligned}
    $$

??? question "14. Démontrer que $E \subset F \Rightarrow P(E) \le P(F)$"
    $F = E \cup (F \cap \overline{E})$, union disjointe. Donc
    $P(F) = P(E) + P(F \cap \overline{E}) \ge P(E)$ car une probabilité est positive.

??? question "15. $P(A \cap B) + P(A \cap \overline{B}) = \;?$"
    $P(A)$, car $A = (A \cap B) \cup (A \cap \overline{B})$ est une union disjointe.

??? question "31. $(A \cap B) \cup (A \cap \overline{B}) = \;?$"
    $A$.

??? question "21. Refaire l'exercice 1.1"
    Voir la [correction du TD 1](td-1-espace-probabilise.md#exercice-11-traduire-en-ensembles).

??? question "22. $P(A) = \frac12$, $P(A \cup B) = \frac34$, $P(\overline{B}) = \frac58$"
    $P(A \cap B) = \frac18$, $P(\overline{A} \cap \overline{B}) = \frac14$,
    $P(\overline{A} \cup \overline{B}) = \frac78$, $P(B \cap \overline{A}) = \frac14$.
    Détails : [exercice 1.3](td-1-espace-probabilise.md#exercice-13).

??? question "23. Nouveau-nés (exercice 1.5)"
    $P(G) = 0{,}52$, $P(I \cup G) = 0{,}53$, $P(I \cap \overline{G}) = 0{,}01$, $P(G \cap \overline{I}) = 0{,}505$.
    Détails : [exercice 1.5](td-1-espace-probabilise.md#exercice-15-nouveau-nes).

??? question "25. Exprimer avec $A$, $B$, $C$ : aucun / exactement un / au plus deux / exactement deux"
    1. $\overline{A} \cap \overline{B} \cap \overline{C}$
    2. $(A \cap \overline{B} \cap \overline{C}) \cup (\overline{A} \cap B \cap \overline{C}) \cup (\overline{A} \cap \overline{B} \cap C)$
    3. $\overline{A \cap B \cap C}$
    4. $(A \cap B \cap \overline{C}) \cup (A \cap \overline{B} \cap C) \cup (\overline{A} \cap B \cap C)$

??? question "26. $G$ = « exactement un parmi $E$ et $F$ »"
    1. $G = (E \cap \overline{F}) \cup (\overline{E} \cap F)$.
    2. Union disjointe, et $P(E \cap \overline{F}) = P(E) - P(E \cap F)$, de même pour l'autre :
       $P(G) = P(E) + P(F) - 2P(E \cap F)$.
    3. $P(\overline{E} \cap \overline{F}) = 1 - P(E \cup F) = 1 - P(E) - P(F) + P(E \cap F)$.

## Systèmes complets, probabilités totales, Bayes

??? question "2. Formule de Bayes pour deux évènements"
    $$
    P(A \mid E) = \frac{P(E \mid A)P(A)}{P(E \mid A)P(A) + P(E \mid \overline{A})P(\overline{A})}
    $$

??? question "3. Formule de Bayes pour $n$ évènements"
    Si $\{A_1, \dots, A_n\}$ est un SCE :
    $\displaystyle P(A_j \mid E) = \frac{P(E \mid A_j)P(A_j)}{\sum_{i=1}^n P(E \mid A_i)P(A_i)}$.

??? question "4. Probabilités totales pour deux évènements complémentaires"
    $P(E) = P(E \mid A)P(A) + P(E \mid \overline{A})P(\overline{A})$.

??? question "5. Probabilités totales pour un SCE de $n$ évènements"
    $\displaystyle P(E) = \sum_{i=1}^n P(E \mid A_i)P(A_i)$.

??? question "6. Comment définir un système complet d'évènements ?"
    $\{A_1, \dots, A_n\}$ tels que $\bigcup A_i = \Omega$ (ils couvrent tous les cas) et
    $A_i \cap A_j = \emptyset$ pour $i \neq j$ (deux à deux incompatibles).

??? question "7. Quand doit-on vérifier qu'on a un SCE ?"
    Avant d'utiliser la **formule des probabilités totales** ou la **formule de Bayes**
    (et donc à chaque fois qu'on raisonne par cas). Sans SCE, la somme ne donne pas $P(E)$.

??? question "27. $P(E_1 \cap E_2)$ en fonction de $P(E_2 \mid E_1)$ et $P(E_1)$"
    $P(E_1 \cap E_2) = P(E_2 \mid E_1) \times P(E_1)$.

??? question "28. $P(E_1 \cap E_2 \cap E_3)$"
    $P(E_1) \times P(E_2 \mid E_1) \times P(E_3 \mid E_1 \cap E_2)$.

??? question "32. $P(A \mid B) + P(\overline{A} \mid B) = 1$ ?"
    **Vrai** : $P(\cdot \mid B)$ est une probabilité, et $A$, $\overline{A}$ sont complémentaires.

??? question "33. $P(A \mid B) + P(A \mid \overline{B}) = 1$ ?"
    **Faux** en général : on change de condition. Exemple : si $A = \Omega$, la somme vaut 2.

??? question "36. Exercice 2.9 (IRM)"
    $P(S) = \frac{20}{42}$, $P(N \mid S) = 0{,}2$, $P(A \mid S) = 0{,}8$, $P(S \mid A) = \frac89$.
    Détails : [exercice 2.9](td-2-probabilites-conditionnelles.md#exercice-29-irm-et-sequelles).

??? question "61. On connaît $P(A)$, $P(\overline{A})$, $P(B \mid A)$, $P(B \mid \overline{A})$. Exprimer $P(B)$, $P(A \mid B)$, $P(\overline{A} \mid B)$"
    - $P(B) = P(B \mid A)P(A) + P(B \mid \overline{A})P(\overline{A})$ (probabilités totales)
    - $P(A \mid B) = \dfrac{P(B \mid A)P(A)}{P(B)}$ (Bayes)
    - $P(\overline{A} \mid B) = \dfrac{P(B \mid \overline{A})P(\overline{A})}{P(B)} = 1 - P(A \mid B)$

??? question "62. Vérifier $P(S \mid \overline{V}) = \dfrac{P(S) - P(S \cap V)}{1 - P(V)}$"
    **Vrai** : $P(S \mid \overline{V}) = \dfrac{P(S \cap \overline{V})}{P(\overline{V})}$, et
    $P(S \cap \overline{V}) = P(S) - P(S \cap V)$, $P(\overline{V}) = 1 - P(V)$.

## Indépendance et incompatibilité

??? question "16. Carte : $A$ = « cœur », $B$ = « rouge »"
    **Compatibles** (le cœur est rouge). $P(A \cap B) = P(A) = \frac14$ mais $P(A)P(B) = \frac18$ :
    **pas indépendants** (savoir que c'est rouge double les chances d'un cœur).

??? question "17. Carte : $A$ = « figure », $B$ = « rouge »"
    **Compatibles**. $P(A) = \frac{12}{52} = \frac{3}{13}$, $P(B) = \frac12$, $P(A \cap B) = \frac{6}{52} = \frac{3}{26} = P(A)P(B)$ :
    **indépendants**.

??? question "18. Carte : $A$ = « noire », $B$ = « rouge »"
    **Incompatibles**, donc **pas indépendants** ($0 \neq \frac14$).

??? question "19. Deux évènements possibles et incompatibles ne peuvent pas être indépendants"
    $P(A \cap B) = P(\emptyset) = 0$ alors que $P(A)P(B) > 0$.

??? question "20. Mêmes situations avec un dé"
    - Comme 16 (compatibles, dépendants) : $A = \{2\}$, $B$ = « pair ».
    - Comme 17 (indépendants) : $A = \{1, 2\}$, $B$ = « pair » ($\frac16 = \frac13 \times \frac12$).
    - Comme 18 (incompatibles) : $A$ = « pair », $B$ = « impair ».

??? question "29. $E$, $F$ indépendants $\iff$ $E$, $\overline{F}$ indépendants : comment le démontrer ?"
    $P(E \cap \overline{F}) = P(E) - P(E \cap F) = P(E) - P(E)P(F) = P(E)P(\overline{F})$.
    La réciproque s'obtient en appliquant le même calcul à $E$ et $\overline{F}$.

??? question "30. Comment prouver que $A$, $B$, $C$ sont indépendants ?"
    Vérifier les **quatre** égalités : $P(A \cap B) = P(A)P(B)$, $P(A \cap C) = P(A)P(C)$,
    $P(B \cap C) = P(B)P(C)$ **et** $P(A \cap B \cap C) = P(A)P(B)P(C)$.

## Variables aléatoires discrètes

??? question "37. Comment calculer $E(X)$ ?"
    $E(X) = \sum_x x\,P(X = x)$.

??? question "38. Comment calculer $E(X^2)$ ?"
    Théorème du transfert : $E(X^2) = \sum_x x^2\,P(X = x)$.

??? question "39. Comment calculer $E(XY)$ ?"
    $E(XY) = \sum_{x,y} x\,y\,P(X = x, Y = y)$ : on parcourt **toutes les cases** du tableau conjoint.

??? question "40. Comment calculer $V(X)$ ? (deux formules)"
    $V(X) = E\big((X - E(X))^2\big) = E(X^2) - E(X)^2$.

??? question "41. Comment calculer $\sigma(X)$ ?"
    $\sigma(X) = \sqrt{V(X)}$.

??? question "42. Comment calculer $\mathrm{Cov}(X, Y)$ ?"
    $\mathrm{Cov}(X, Y) = E(XY) - E(X)E(Y)$.

??? question "43. Comment calculer $\rho(X, Y)$ ?"
    $\rho(X, Y) = \dfrac{\mathrm{Cov}(X, Y)}{\sigma(X)\sigma(Y)}$.

??? question "44. $E(aX + bY) = \;?$"
    $aE(X) + bE(Y)$, **toujours** (linéarité).

??? question "45. $V(aX + b) = \;?$"
    $a^2 V(X)$.

??? question "46. $V(X + Y) = V(X) + V(Y)$ ?"
    Pas en général : $V(X + Y) = V(X) + V(Y) + 2\mathrm{Cov}(X, Y)$.
    C'est vrai si $\mathrm{Cov}(X, Y) = 0$, en particulier si $X$ et $Y$ sont **indépendantes**.

??? question "47. $\mathrm{Cov}(X, Y) = 0 \Rightarrow X$, $Y$ indépendantes ?"
    **Faux** (contre-exemple : $X$ uniforme sur $\{-1, 0, 1\}$, $Y = X^2$).

??? question "48. $X$, $Y$ indépendantes $\Rightarrow \mathrm{Cov}(X, Y) = 0$ ?"
    **Vrai**.

??? question "49. $X$, $Y$ non indépendantes $\Rightarrow \mathrm{Cov}(X, Y) \neq 0$ ?"
    **Faux** (même contre-exemple que 47).

??? question "50. $\mathrm{Cov}(X, Y) \neq 0 \Rightarrow X$, $Y$ non indépendantes ?"
    **Vrai** (contraposée de 48).

??? question "51. $\mathrm{Cov}(\alpha X + \beta Y, Z) = \;?$"
    $\alpha\,\mathrm{Cov}(X, Z) + \beta\,\mathrm{Cov}(Y, Z)$.

??? question "52. $\mathrm{Cov}(X, \alpha Y + \beta Z) = \;?$"
    $\alpha\,\mathrm{Cov}(X, Y) + \beta\,\mathrm{Cov}(X, Z)$.

??? question "53. Définition d'une fonction de répartition"
    $F_X(x) = P(X \le x)$ pour tout réel $x$.

??? question "54. Comment vérifier une loi de probabilité ?"
    Toutes les probabilités sont **positives** (entre 0 et 1) et leur **somme vaut 1**.

??? question "55. Lois de $X$ et de $Y$ à partir du tableau conjoint"
    On **somme les lignes** et **les colonnes** : $P(X = x) = \sum_y P(X = x, Y = y)$
    (et de même pour $Y$). Ce sont les lois **marginales**.

??? question "56. $P(X = i, Y = j) = \frac19$ partout, $X \in \{1, 2, 3\}$, $Y \in \{-1, 2, 4\}$ : $P(X = 1 \mid Y = 2)$ ?"
    $P(X = 1 \mid Y = 2) = \dfrac{P(X = 1, Y = 2)}{P(Y = 2)} = \dfrac{1/9}{3/9} = \dfrac13$.

??? question "57. Même tableau : $P(X = 1 \mid Y \ge 2)$ ?"
    $\dfrac{P(X = 1, Y = 2) + P(X = 1, Y = 4)}{P(Y = 2) + P(Y = 4)} = \dfrac{2/9}{6/9} = \dfrac13$.

??? question "58. Démontrer $V(X + Y) = V(X) + V(Y) + 2\mathrm{Cov}(X, Y)$"
    Voir l'[exercice 3.6](td-3-va-discretes.md#exercice-36-demonstrations-theoreme-38-propositions-36-et-39) :
    on développe $E\big((X + Y)^2\big) - \big(E(X) + E(Y)\big)^2$.

??? question "59. Démontrer que $X$, $Y$ indépendantes $\Rightarrow \mathrm{Cov}(X, Y) = 0$"
    $E(XY) = \sum_{x,y} xy\,P(X = x)P(Y = y) = E(X)E(Y)$ en factorisant la double somme.

??? question "60. Exemple de $X$, $Y$ non indépendantes avec $\mathrm{Cov}(X, Y) = 0$"
    | | $X = -1$ | $X = 0$ | $X = 1$ |
    |-|:-:|:-:|:-:|
    | $Y = 0$ | $\frac13$ | 0 | $\frac13$ |
    | $Y = 1$ | 0 | $\frac13$ | 0 |

    $E(X) = 0$ et $XY = 0$ dans toutes les cases non nulles, donc $\mathrm{Cov} = 0$.
    Mais $P(X = 0, Y = 0) = 0 \neq \frac13 \times \frac23$.
