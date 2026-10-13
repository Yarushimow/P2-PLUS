---
title: "TD 1 — Espace probabilisé"
---

# TD 1 — Espace probabilisé

=== "Version simplifiée"

    Exercices de la section 1.6 du poly. Rappels : [chapitre 1](../cours/chapitre-1-espace-probabilise.md).
    Chaque exercice a un **indice** puis une **correction** repliés : cherche d'abord !
    ♦ = exercice obligatoire.

    ## QCM — Faire le point

    Soient $A$, $B$, $C$ trois évènements. Lesquelles sont vraies ?

    | | Énoncé |
    |:-:|--------|
    | A | $P(\Omega) = 1$ |
    | B | $P(\overline{A}) < P(A)$ |
    | C | Si $A \subset B$ alors $P(A) \le P(B)$ |
    | D | Si $A \subset B$ alors $A \cup B = B$ |
    | E | $A \cup B \neq B \cup A$ |
    | F | $P(A \cup B) \le P(A) + P(B)$ |
    | G | $P(A \cup B) = P(A) + P(B)$ quand $A \cap B = \emptyset$ |
    | H | $P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B \cap C)$ |
    | I | $P(\overline{A} \cup B) + P(A \cup B) = P(A)$ |
    | J | $P(\overline{A} \cap B) + P(A \cap B) - P(B) = 0$ |
    | K | $(A \cup B) \cup C \neq A \cup (B \cup C)$ |

    ??? success "Correction"
        **Vraies : A, C, D, F, G, J.**

        - B : faux (si $P(A) = 0{,}2$, $P(\overline{A}) = 0{,}8$).
        - E et K : faux, $\cup$ est commutative et associative.
        - F : vrai car $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ et $P(A \cap B) \ge 0$.
        - H : faux, il manque les intersections deux à deux (Poincaré).
        - I : faux. $(\overline{A} \cup B) \cup (A \cup B) = \Omega$ et $(\overline{A} \cup B) \cap (A \cup B) = B$,
          donc la somme vaut $P(\Omega) + P(B) = 1 + P(B)$, pas $P(A)$ (contre-exemple : $A = \emptyset$ donne $1 + P(B) \neq 0$).
        - J : vrai, $B = (A \cap B) \cup (\overline{A} \cap B)$ (union disjointe).

    ## ♦ Exercice 1.1 — Traduire en ensembles

    $E$, $F$, $G$ trois évènements. Exprimer :

    a) seulement $E$ ; b) $E$ et $G$ mais pas $F$ ; c) au moins un des trois ;
    d) au moins deux ; e) les trois ; f) aucun ; g) au plus un ; h) au plus deux ;
    i) au plus trois ; j) exactement deux.

    ??? tip "Indice"
        « Au plus » et « aucun » se traitent souvent par le complémentaire.
        « Exactement deux » = réunion de trois cas incompatibles.

    ??? success "Correction"
        | | Évènement |
        |-|-----------|
        | a | $E \cap \overline{F} \cap \overline{G}$ |
        | b | $E \cap \overline{F} \cap G$ |
        | c | $E \cup F \cup G$ |
        | d | $(E \cap F) \cup (E \cap G) \cup (F \cap G)$ |
        | e | $E \cap F \cap G$ |
        | f | $\overline{E} \cap \overline{F} \cap \overline{G} = \overline{E \cup F \cup G}$ |
        | g | $(\overline{E} \cap \overline{F}) \cup (\overline{E} \cap \overline{G}) \cup (\overline{F} \cap \overline{G})$ (au moins deux ne se réalisent pas) |
        | h | $\overline{E \cap F \cap G} = \overline{E} \cup \overline{F} \cup \overline{G}$ |
        | i | $\Omega$ (toujours vrai) |
        | j | $(E \cap F \cap \overline{G}) \cup (E \cap \overline{F} \cap G) \cup (\overline{E} \cap F \cap G)$ |

    ## Exercice 1.2 — La différence symétrique

    Sur $\mathcal{P}(\Omega)$, $\cup$ et $\cap$ ressemblent à $+$ et $\times$ (avec $\emptyset$ et $\Omega$
    dans les rôles de $0$ et $1$), mais aucun $A \neq \emptyset$ n'a d'« opposé » pour $\cup$ :
    il n'existe pas de $B$ tel que $A \cup B = \emptyset$. On définit donc la **différence symétrique**

    $$
    A \triangle B = (A \cap \overline{B}) \cup (B \cap \overline{A}),
    $$

    ensemble des éléments de $A \cup B$ qui ne sont pas dans $A \cap B$.

    a) Hachurer $A \triangle B$ sur un diagramme de Venn à deux ensembles.

    b) $\Omega = \{1, \dots, 10\}$, $A = \{1, 2, 3, 4, 6, 7\}$, $B = \{1, 5, 6, 7, 9\}$ : déterminer $A \triangle B$.

    c) $\Omega = \mathbb{R}$, $A = ]-\infty, 2]$, $B = ]1, +\infty[$ : déterminer $A \triangle B$.

    d) Prouver que $\triangle$ est commutative et associative.

    e) Hachurer $A \triangle B \triangle C$ sur un diagramme de Venn à trois ensembles.

    f) Prouver que $\emptyset$ est l'élément neutre de $\triangle$.

    g) Prouver que tout $A \in \mathcal{P}(\Omega)$ admet un opposé : $\exists B \in \mathcal{P}(\Omega),\ A \triangle B = \emptyset$.

    h) $\triangle$ admet-elle un élément absorbant ?

    i) Prouver que $\cap$ est distributive sur $\triangle$, mais que l'inverse n'est pas vrai.

    j) Prouver que $\cup$ n'est pas distributive sur $\triangle$.

    Conclusion : $(\mathcal{P}(\Omega), \triangle, \cap)$ est un anneau commutatif, comme $(\mathbb{Z}, +, \times)$.

    ??? tip "Indice"
        Clé de tout l'exercice : $x \in A \triangle B$ ⟺ $x$ appartient à **exactement un** des deux ensembles.
        Pour l'associativité, compte à combien d'ensembles parmi $A$, $B$, $C$ appartient $x$ (parité).
        Pour les contre-exemples, essaie $\emptyset$ et $\Omega$.

    ??? success "Correction"
        a) On hachure les deux « croissants » : $A$ privé de $A \cap B$, et $B$ privé de $A \cap B$.
        La lentille centrale $A \cap B$ et l'extérieur $\overline{A \cup B}$ restent blancs.

        b) $A \cap B = \{1, 6, 7\}$, donc $A \cap \overline{B} = \{2, 3, 4\}$ et $B \cap \overline{A} = \{5, 9\}$ :
        $A \triangle B = \{2, 3, 4, 5, 9\}$.

        c) $A \cap \overline{B} = ]-\infty, 2] \cap ]-\infty, 1] = ]-\infty, 1]$ et
        $B \cap \overline{A} = ]1, +\infty[ \cap ]2, +\infty[ = ]2, +\infty[$, donc
        $A \triangle B = ]-\infty, 1] \cup ]2, +\infty[$ (c'est $\mathbb{R}$ privé de $A \cap B = ]1, 2]$).

        d) **Commutativité** : la définition est symétrique en $A$ et $B$ (on échange les deux termes
        de la réunion, et $\cup$ est commutative), donc $A \triangle B = B \triangle A$.

        **Associativité** : $x \in X \triangle Y$ ⟺ $x$ est dans exactement un des deux ⟺
        le nombre d'ensembles parmi $X, Y$ contenant $x$ est **impair**. Notons $n_A(x) = 1$ si $x \in A$, $0$ sinon.
        Alors $x \in X \triangle Y$ ⟺ $n_X(x) + n_Y(x)$ impair. Donc

        - $x \in (A \triangle B) \triangle C$ ⟺ $n_{A \triangle B}(x) + n_C(x)$ impair ⟺ $n_A(x) + n_B(x) + n_C(x)$ impair
          (car $n_{A \triangle B}(x)$ a la même parité que $n_A(x) + n_B(x)$) ;
        - $x \in A \triangle (B \triangle C)$ ⟺ $n_A(x) + n_B(x) + n_C(x)$ impair, de même.

        Les deux ensembles ont les mêmes éléments : $(A \triangle B) \triangle C = A \triangle (B \triangle C)$.

        e) D'après d), $A \triangle B \triangle C$ = éléments appartenant à un nombre **impair** (1 ou 3) des ensembles.
        On hachure : $A$ seul ($A \cap \overline{B} \cap \overline{C}$), $B$ seul, $C$ seul, **et** la zone
        centrale $A \cap B \cap C$. Restent blanches les trois zones « exactement deux » et l'extérieur.

        f) $A \triangle \emptyset = (A \cap \overline{\emptyset}) \cup (\emptyset \cap \overline{A}) = (A \cap \Omega) \cup \emptyset = A$,
        et $\emptyset \triangle A = A$ par commutativité : $\emptyset$ est neutre.

        g) $A \triangle A = (A \cap \overline{A}) \cup (A \cap \overline{A}) = \emptyset$ : l'opposé de $A$ est **$A$ lui-même**.

        h) **Non** (dès que $\Omega \neq \emptyset$). Supposons $Z$ absorbant : $A \triangle Z = Z$ pour tout $A$.
        En appliquant $\triangle Z$ des deux côtés et en utilisant d), f), g) :
        $A = A \triangle (Z \triangle Z) = (A \triangle Z) \triangle Z = Z \triangle Z = \emptyset$ pour **tout** $A$.
        C'est faux pour $A = \Omega \neq \emptyset$. (Autre façon : $\Omega \triangle Z = \overline{Z} \neq Z$.)

        i) **$\cap$ est distributive sur $\triangle$** : montrons $A \cap (B \triangle C) = (A \cap B) \triangle (A \cap C)$.
        Par De Morgan, $(A \cap B) \cap \overline{A \cap C} = (A \cap B) \cap (\overline{A} \cup \overline{C})
        = (A \cap B \cap \overline{A}) \cup (A \cap B \cap \overline{C}) = A \cap B \cap \overline{C}$.
        De même $(A \cap C) \cap \overline{A \cap B} = A \cap C \cap \overline{B}$. Donc

        $$
        (A \cap B) \triangle (A \cap C) = (A \cap B \cap \overline{C}) \cup (A \cap C \cap \overline{B})
        = A \cap \big[(B \cap \overline{C}) \cup (C \cap \overline{B})\big] = A \cap (B \triangle C).
        $$

        (À droite, $(B \triangle C) \cap A$ s'en déduit par commutativité de $\cap$.)

        **$\triangle$ n'est pas distributive sur $\cap$** : on aurait $A \triangle (B \cap C) = (A \triangle B) \cap (A \triangle C)$.
        Contre-exemple avec $\Omega \neq \emptyset$, $A = \Omega$, $B = \emptyset$, $C = \Omega$ :
        $A \triangle (B \cap C) = \Omega \triangle \emptyset = \Omega$, mais
        $(A \triangle B) \cap (A \triangle C) = \Omega \cap (\Omega \triangle \Omega) = \Omega \cap \emptyset = \emptyset$.

        j) On aurait $A \cup (B \triangle C) = (A \cup B) \triangle (A \cup C)$. Contre-exemple : $A = \Omega \neq \emptyset$, $B = C = \emptyset$ :
        $\Omega \cup (\emptyset \triangle \emptyset) = \Omega$, mais $(\Omega \cup \emptyset) \triangle (\Omega \cup \emptyset) = \Omega \triangle \Omega = \emptyset$.

    ## ♦ Exercice 1.3

    $P(A) = \frac12$, $P(A \cup B) = \frac34$, $P(\overline{B}) = \frac58$.
    Calculer $P(A \cap B)$, $P(\overline{A} \cap \overline{B})$, $P(\overline{A} \cup \overline{B})$, $P(B \cap \overline{A})$.

    ??? tip "Indice"
        Commence par $P(B)$. Puis De Morgan pour les deux complémentaires.

    ??? success "Correction"
        - $P(B) = 1 - \frac58 = \frac38$.
        - $P(A \cap B) = P(A) + P(B) - P(A \cup B) = \frac12 + \frac38 - \frac34 = \frac18$.
        - $P(\overline{A} \cap \overline{B}) = P(\overline{A \cup B}) = 1 - \frac34 = \frac14$.
        - $P(\overline{A} \cup \overline{B}) = P(\overline{A \cap B}) = 1 - \frac18 = \frac78$.
        - $P(B \cap \overline{A}) = P(B) - P(A \cap B) = \frac38 - \frac18 = \frac14$.

    ## Exercice 1.4 — Bagues et colliers

    60 % ne portent ni bague ni collier, 20 % une bague, 30 % un collier.
    Probabilité de porter a) une bague **ou** un collier ; b) une bague **et** un collier.

    ??? success "Correction"
        a) « Ni l'un ni l'autre » est le complémentaire de « l'un ou l'autre » :
        $P(B \cup C) = 1 - 0{,}6 = 0{,}4$.

        b) $P(B \cap C) = P(B) + P(C) - P(B \cup C) = 0{,}2 + 0{,}3 - 0{,}4 = 0{,}1$.

    ## Exercice 1.5 — Nouveau-nés

    2000 nouveau-nés : 1040 garçons, 50 avec un ictère, 30 garçons avec un ictère.
    On note $G$ = « être un garçon » et $I$ = « présenter un ictère ».

    a) Calculer $P(G)$, $P(I \cup G)$, $P(I \cap \overline{G})$, $P(G \cap \overline{I})$.

    b) Probabilité de ne pas être un garçon et de ne pas présenter d'ictère ?

    c) Les évènements $I$ et $G$ sont-ils compatibles ?

    ??? tip "Indice"
        Effectifs → probabilités : on **divise par 2000**. Un tableau de contingence aide :
        remplis d'abord les effectifs, puis divise.

    ??? success "Correction"
        | | $I$ | $\overline{I}$ | Total |
        |-|:---:|:---:|:---:|
        | $G$ | 30 | 1010 | 1040 |
        | $\overline{G}$ | 20 | 940 | 960 |
        | Total | 50 | 1950 | 2000 |

        a) $P(G) = \frac{1040}{2000} = 0{,}52$ ;
        $P(I \cup G) = \frac{50 + 1040 - 30}{2000} = 0{,}53$ ;
        $P(I \cap \overline{G}) = \frac{20}{2000} = 0{,}01$ ;
        $P(G \cap \overline{I}) = \frac{1010}{2000} = 0{,}505$.

        b) $P(\overline{G} \cap \overline{I}) = 1 - P(G \cup I) = 0{,}47$.

        c) $P(I \cap G) = 0{,}015 \neq 0$ : $I$ et $G$ sont **compatibles**.

    ## Exercice 1.6 — Encadrements

    $P(E) = \frac34$, $P(F) = \frac58$. Encadrer $P(E \cap F)$ et $P(E \cup F)$.

    ??? success "Correction"
        - $E \cap F \subset F$ donc $P(E \cap F) \le \min\left(\frac34, \frac58\right) = \frac58$.
        - $P(E \cup F) \le 1$ donne $P(E \cap F) = P(E) + P(F) - P(E \cup F) \ge \frac34 + \frac58 - 1 = \frac38$.
        - Donc $\frac38 \le P(E \cap F) \le \frac58$, et $P(E \cup F) = \frac{11}{8} - P(E \cap F)$
          donne $\frac34 \le P(E \cup F) \le 1$.

    ## Exercice 1.7 — Inégalité de Bonferroni

    a) Soient $E$, $F$ deux évènements. Démontrer que $P(E \cap F) \ge P(E) + P(F) - 1$.

    b) Pour $n \in \mathbb{N}^*$ et $A_1, \dots, A_n$ des évènements, démontrer par récurrence que

    $$
    P\Big(\bigcap_{i=1}^n A_i\Big) \ge \sum_{i=1}^n P(A_i) - (n - 1).
    $$

    ??? tip "Indice"
        a) Formule $P(E \cup F) = P(E) + P(F) - P(E \cap F)$ et $P(E \cup F) \le 1$.
        b) Pour l'hérédité, applique a) à $E = A_1 \cap \dots \cap A_n$ et $F = A_{n+1}$.

    ??? success "Correction"
        a) $P(E \cap F) = P(E) + P(F) - P(E \cup F)$ et $P(E \cup F) \le 1$, donc $P(E \cap F) \ge P(E) + P(F) - 1$.

        b) Notons $\mathcal{H}_n$ l'inégalité à démontrer.

        - **Initialisation** ($n = 1$) : $P(A_1) \ge P(A_1) - 0$, vrai.
        - **Hérédité** : supposons $\mathcal{H}_n$ vraie pour toute famille de $n$ évènements, et soient $A_1, \dots, A_{n+1}$.
          On pose $E = \bigcap_{i=1}^n A_i$, de sorte que $\bigcap_{i=1}^{n+1} A_i = E \cap A_{n+1}$. Par a) puis $\mathcal{H}_n$ :

        $$
        P\Big(\bigcap_{i=1}^{n+1} A_i\Big) \ge P(E) + P(A_{n+1}) - 1
        \ge \sum_{i=1}^n P(A_i) - (n - 1) + P(A_{n+1}) - 1 = \sum_{i=1}^{n+1} P(A_i) - n.
        $$

        C'est $\mathcal{H}_{n+1}$. Conclusion : l'inégalité est vraie pour tout $n \in \mathbb{N}^*$.

    ## Exercice 1.8 — Inégalité de Boole

    Pour $n \in \mathbb{N}^*$ et $A_1, \dots, A_n$ des évènements, démontrer par récurrence que

    $$
    P\Big(\bigcup_{i=1}^n A_i\Big) \le \sum_{i=1}^n P(A_i).
    $$

    ??? tip "Indice"
        Cas $n = 2$ : $P(E \cup F) = P(E) + P(F) - P(E \cap F) \le P(E) + P(F)$.
        Pour l'hérédité, écris $\bigcup_{i=1}^{n+1} A_i = \Big(\bigcup_{i=1}^{n} A_i\Big) \cup A_{n+1}$.

    ??? success "Correction"
        - **Initialisation** ($n = 1$) : $P(A_1) \le P(A_1)$, vrai.
        - **Hérédité** : supposons l'inégalité vraie au rang $n$. Avec $U = \bigcup_{i=1}^n A_i$,
          et comme $P(U \cap A_{n+1}) \ge 0$ :

        $$
        P\Big(\bigcup_{i=1}^{n+1} A_i\Big) = P(U) + P(A_{n+1}) - P(U \cap A_{n+1})
        \le P(U) + P(A_{n+1}) \le \sum_{i=1}^n P(A_i) + P(A_{n+1}) = \sum_{i=1}^{n+1} P(A_i).
        $$

        L'inégalité est vraie au rang $n + 1$, donc pour tout $n \in \mathbb{N}^*$.
        (C'est l'item F du QCM généralisé à $n$ évènements.)

    ## Exercice 1.9 — Formule de Poincaré

    $(\Omega, \mathcal{P}(\Omega), P)$ espace probabilisé fini, $(A_i)_{1 \le i \le n}$ une famille d'évènements.
    Montrer par récurrence que

    $$
    P\Big(\bigcup_{i=1}^n A_i\Big) = \sum_{k=1}^n \Bigg( (-1)^{k+1} \sum_{1 \le i_1 < \dots < i_k \le n} P(A_{i_1} \cap \dots \cap A_{i_k}) \Bigg).
    $$

    ??? tip "Indice"
        Même découpage que pour Boole : $P(U \cup A_{n+1}) = P(U) + P(A_{n+1}) - P(U \cap A_{n+1})$
        avec $U = \bigcup_{i=1}^n A_i$. Puis remarque que $U \cap A_{n+1} = \bigcup_{i=1}^n (A_i \cap A_{n+1})$ :
        c'est encore une réunion de $n$ évènements, on peut lui appliquer l'hypothèse de récurrence.

    ??? success "Correction"
        Notons $S_k(A_1, \dots, A_n) = \sum_{1 \le i_1 < \dots < i_k \le n} P(A_{i_1} \cap \dots \cap A_{i_k})$
        (somme sur toutes les parties $\{i_1, \dots, i_k\}$ à $k$ éléments de $\{1, \dots, n\}$).
        La formule s'écrit $P\big(\bigcup_{i=1}^n A_i\big) = \sum_{k=1}^n (-1)^{k+1} S_k$.

        - **Initialisation** ($n = 1$) : $P(A_1) = (-1)^2 S_1 = P(A_1)$. (Le cas $n = 2$ est la formule du cours.)
        - **Hérédité** : supposons la formule vraie pour **toute** famille de $n$ évènements, et soient
          $A_1, \dots, A_{n+1}$. Avec $U = \bigcup_{i=1}^n A_i$ et $B_i = A_i \cap A_{n+1}$ :

        $$
        P\Big(\bigcup_{i=1}^{n+1} A_i\Big) = P(U) + P(A_{n+1}) - P\Big(\bigcup_{i=1}^{n} B_i\Big).
        $$

        On applique l'hypothèse de récurrence à $(A_1, \dots, A_n)$ et à $(B_1, \dots, B_n)$ ; comme
        $B_{i_1} \cap \dots \cap B_{i_j} = A_{i_1} \cap \dots \cap A_{i_j} \cap A_{n+1}$ :

        $$
        P\Big(\bigcup_{i=1}^{n+1} A_i\Big) = \underbrace{\sum_{k=1}^{n} (-1)^{k+1} S_k(A_1, \dots, A_n)}_{(1)}
        + \underbrace{P(A_{n+1})}_{(2)}
        + \underbrace{\sum_{j=1}^{n} (-1)^{j+2} \sum_{1 \le i_1 < \dots < i_j \le n} P(A_{i_1} \cap \dots \cap A_{i_j} \cap A_{n+1})}_{(3)}.
        $$

        Classons les parties $I \subset \{1, \dots, n+1\}$ à $k$ éléments, qui indexent les termes de la formule au rang $n + 1$ :

        - celles **sans** $n + 1$ : ce sont exactement les termes de (1), avec le signe $(-1)^{k+1}$ ;
        - $I = \{n + 1\}$ ($k = 1$) : c'est le terme (2), signe $(-1)^{2} = +1$ ;
        - $I = \{i_1, \dots, i_j, n + 1\}$ avec $j \ge 1$, donc $k = j + 1$ : termes de (3), de signe
          $(-1)^{j+2} = (-1)^{k+1}$.

        Chaque partie apparaît une fois et une seule, avec le bon signe : la somme vaut
        $\sum_{k=1}^{n+1} (-1)^{k+1} S_k(A_1, \dots, A_{n+1})$. C'est la formule au rang $n + 1$, d'où le résultat pour tout $n$.

    ## ♦ Exercice 1.10 — Exactement un des deux

    $G$ = « exactement un parmi $E$ et $F$ se réalise ». Montrer :
    a) $P(G) = P(E) + P(F) - 2P(E \cap F)$ ; b) $P(\overline{E} \cap \overline{F}) = 1 - P(E) - P(F) + P(E \cap F)$.

    ??? success "Correction"
        a) $G = (E \cap \overline{F}) \cup (\overline{E} \cap F)$, union **disjointe**. Or
        $P(E \cap \overline{F}) = P(E) - P(E \cap F)$ et $P(\overline{E} \cap F) = P(F) - P(E \cap F)$.
        On additionne.

        b) De Morgan : $\overline{E} \cap \overline{F} = \overline{E \cup F}$, donc
        $P = 1 - P(E \cup F) = 1 - P(E) - P(F) + P(E \cap F)$.

    ## Exercice 1.11 — Univers dénombrable

    $\Omega$ est infini dénombrable et $P$ est une probabilité sur $\Omega$.

    a) Prouver que les éléments de $\Omega$ ne peuvent pas être tous équiprobables.
    b) Est-il possible que tous les éléments aient une probabilité non nulle ?

    ??? tip "Indice"
        Numérote $\Omega = \{\omega_1, \omega_2, \dots\}$ et écris $1 = P(\Omega) = \sum_{n \ge 1} P(\{\omega_n\})$
        (additivité pour une famille dénombrable d'évènements deux à deux incompatibles).
        b) Pense à une série géométrique.

    ??? success "Correction"
        Comme $\Omega$ est dénombrable, $\Omega = \{\omega_1, \omega_2, \dots\}$ et $\Omega = \bigcup_{n \ge 1} \{\omega_n\}$
        (singletons deux à deux incompatibles), donc $\sum_{n=1}^{+\infty} P(\{\omega_n\}) = P(\Omega) = 1$.

        a) Supposons $P(\{\omega_n\}) = p$ pour tout $n$.
        Si $p = 0$, la somme vaut $0 \neq 1$. Si $p > 0$, $\sum_{n=1}^{N} p = Np \to +\infty$, la série diverge.
        Contradiction dans les deux cas : **pas d'équiprobabilité possible** sur un univers infini dénombrable.

        b) **Oui.** Par exemple $P(\{\omega_n\}) = \dfrac{1}{2^n} > 0$ pour tout $n \ge 1$ : ce sont des réels de $[0, 1]$ et
        $\sum_{n=1}^{+\infty} \dfrac{1}{2^n} = \dfrac{1/2}{1 - 1/2} = 1$. On définit alors $P(E) = \sum_{\omega_n \in E} \dfrac{1}{2^n}$.
        Les probabilités sont toutes non nulles, mais forcément **pas égales** (elles tendent vers $0$).

    ## Exercice 1.12 — Cours optionnels (Poincaré)

    400 étudiants ; $A$ : 112, $B$ : 104, $C$ : 64, $A \cap B$ : 48, $A \cap C$ : 16,
    $B \cap C$ : 24, $A \cap B \cap C$ : 8. Probabilité qu'un étudiant au hasard
    a) ne suive aucun cours ; b) suive exactement un cours.

    ??? tip "Indice"
        a) Poincaré à trois évènements, puis complémentaire.
        b) « Seulement $A$ » = $A$ moins ce qui est partagé : attention à ne pas retirer deux fois $A \cap B \cap C$.

    ??? success "Correction"
        a) $\operatorname{card}(A \cup B \cup C) = 112 + 104 + 64 - 48 - 16 - 24 + 8 = 200$,
        donc $P(\text{aucun}) = \frac{400 - 200}{400} = \frac12$.

        b) Seulement $A$ : $112 - 48 - 16 + 8 = 56$ ; seulement $B$ : $104 - 48 - 24 + 8 = 40$ ;
        seulement $C$ : $64 - 16 - 24 + 8 = 32$. Total $128$, donc $P = \frac{128}{400} = 0{,}32$.

    ## Exercice 1.13 — Le problème des anniversaires

    $n \ge 2$ personnes, 365 jours équiprobables (on exclut le 29 février). $E$ = « au moins deux personnes ont le même anniversaire ».

    ??? tip "Indice"
        Calcule $P(\overline{E})$ : toutes les dates différentes. Cas favorables :
        $365 \times 364 \times \dots \times (365 - n + 1)$, cas possibles : $365^n$.

    ??? success "Correction"
        a) $P(E) = 1 - \dfrac{365 \times 364 \times \cdots \times (365 - n + 1)}{365^n}$.

        b) $P(E)$ croît avec $n$ ; $n = 22$ donne $P \approx 0{,}476$ et $n = 23$ donne $P \approx 0{,}507$ :
        la taille minimale est $n = 23$.

        c) Pour $n = 50$ : $P(E) \approx 0{,}970$. Résultat très contre-intuitif !

    ## Exercice 1.14 — Une expérience surprenante

    (D'après S. Ross, *A first course in Probability*.) Une urne infinie, des balles numérotées $1, 2, 3, \dots$
    À $1$ minute avant minuit, on place les balles 1 à 10 dans l'urne puis on retire la balle 10 ;
    à $\frac12$ minute avant minuit, on place les balles 11 à 20 puis on retire la 20 ;
    à $\frac14$ minute, les balles 21 à 30, on retire la 30 ; à $\frac18$ minute, 31 à 40, on retire la 40 ; etc.
    (étape $k$ : à $\frac{1}{2^{k-1}}$ minute avant minuit, on place les balles $10k - 9$ à $10k$ puis on en retire une).

    a) Les balles 1 à 9, puis 11 à 19, etc. ont-elles une chance d'être enlevées ? Combien de balles dans l'urne à minuit ?

    b) On retire maintenant la balle 1, puis la 2, puis la 3, la 4, ... (au lieu de 10, 20, 30, ...).

    i) Puisqu'à chaque étape on ajoute plus de balles qu'on n'en enlève, combien de balles diriez-vous qu'il y a à minuit ?

    ii) Y aura-t-il une balle qui ne sera pas enlevée lorsqu'on s'approche suffisamment de minuit ?

    iii) Ainsi, à minuit pile, combien de balles dans l'urne ?

    c) À chaque étape, la balle retirée est maintenant choisie **au hasard** parmi celles de l'urne.

    i) Pour une balle $n$ donnée, calculer la probabilité $P_k(n)$ qu'elle soit encore dans l'urne à l'étape $k$.

    ii) Calculer $\lim_{k \to +\infty} P_k(n)$.

    iii) Ainsi, à minuit pile, combien de balles y a-t-il dans l'urne ?

    ??? tip "Indice"
        Les étapes ont lieu à $1, \frac12, \frac14, \dots$ minute avant minuit : il y en a une **infinité** avant minuit.
        Une balle est dans l'urne à minuit si et seulement si elle y est entrée et n'en est **jamais** sortie.
        c) Avant le tirage de l'étape $j$, l'urne contient $10j - (j - 1) = 9j + 1$ balles.

    ??? success "Correction"
        a) À l'étape $k$ on ne retire que la balle $10k$ : une balle dont le numéro n'est pas multiple de 10
        n'est **jamais** retirée. Après l'étape $k$ l'urne contient $9k$ balles, et à minuit elle contient toutes les balles
        non multiples de 10 : **une infinité**.

        b) i) Intuitivement, après l'étape $k$ il reste $9k$ balles, $9k \to +\infty$ : on aurait envie de dire « une infinité ».

        ii) **Non.** La balle $n$ est placée à l'étape $\lceil n/10 \rceil \le n$ et retirée à l'étape $n$,
        c'est-à-dire $\frac{1}{2^{n-1}}$ minute avant minuit. Toute balle finit donc par être enlevée avant minuit.

        iii) Aucune balle n'est dans l'urne à minuit : l'urne est **vide**. Le nombre de balles tend vers l'infini,
        mais l'ensemble des balles présentes à minuit est vide : ce qui compte, c'est *quelles* balles sont retirées, pas combien.

        c) i) La balle $n$ entre à l'étape $i = \lceil n/10 \rceil$. Au tirage de l'étape $j \ge i$, l'urne contient
        $9j + 1$ balles ; si la balle $n$ y est encore, elle **n'est pas** retirée avec probabilité $\frac{9j}{9j+1}$.
        Les tirages successifs donnent (probabilités composées) :

        $$
        P_k(n) = \prod_{j=i}^{k} \frac{9j}{9j + 1} \qquad (k \ge i = \lceil n/10 \rceil),
        $$

        et $P_k(n) = 0$ pour $k < i$ (balle pas encore placée). Exemple : $P_3(1) = \frac{9}{10} \cdot \frac{18}{19} \cdot \frac{27}{28} = \frac{2187}{2660} \approx 0{,}822$.

        ii) $\dfrac{1}{P_k(n)} = \prod_{j=i}^{k} \Big(1 + \dfrac{1}{9j}\Big) \ge 1 + \sum_{j=i}^{k} \dfrac{1}{9j}$
        (on développe le produit, tous les termes sont positifs). La série harmonique diverge, donc
        $\frac{1}{P_k(n)} \to +\infty$ et $\displaystyle\lim_{k \to +\infty} P_k(n) = 0$.
        (La convergence est très lente : $P_{1000}(1) \approx 0{,}44$.)

        iii) Soit $F_n$ = « la balle $n$ est dans l'urne à minuit ». $F_n$ est inclus dans « la balle $n$ est encore là après l'étape $k$ »
        pour tout $k$, donc $P(F_n) \le P_k(n)$ pour tout $k$, d'où $P(F_n) = 0$. Par l'inégalité de Boole (exercice 1.8,
        étendue à une famille dénombrable) :

        $$
        P(\text{urne non vide à minuit}) = P\Big(\bigcup_{n \ge 1} F_n\Big) \le \sum_{n \ge 1} P(F_n) = 0.
        $$

        À minuit, l'urne est **vide avec probabilité 1**.

=== "Version papier"

    Les énoncés de la section 1.6 « Exercices » du polycopié 2026-2027 (pages 25 à 30). ♦ = exercice obligatoire. Le cours est dans la [version papier du chapitre 1](../cours/chapitre-1-espace-probabilise.md).

    [![Poly 2026-2027, p. 25 : Énoncés : QCM, exercice 1.1](papier/td1/p025.jpg){ loading=lazy .papier }](papier/td1/p025.jpg)
    <p class="papier-legende">Énoncés : QCM, exercice 1.1 · Poly 2026-2027, p. 25</p>

    [![Poly 2026-2027, p. 26 : Énoncés : exercice 1.2](papier/td1/p026.jpg){ loading=lazy .papier }](papier/td1/p026.jpg)
    <p class="papier-legende">Énoncés : exercice 1.2 · Poly 2026-2027, p. 26</p>

    [![Poly 2026-2027, p. 27 : Énoncés : exercices 1.3 à 1.6](papier/td1/p027.jpg){ loading=lazy .papier }](papier/td1/p027.jpg)
    <p class="papier-legende">Énoncés : exercices 1.3 à 1.6 · Poly 2026-2027, p. 27</p>

    [![Poly 2026-2027, p. 28 : Énoncés : exercices 1.7 à 1.11](papier/td1/p028.jpg){ loading=lazy .papier }](papier/td1/p028.jpg)
    <p class="papier-legende">Énoncés : exercices 1.7 à 1.11 · Poly 2026-2027, p. 28</p>

    [![Poly 2026-2027, p. 29 : Énoncés : exercices 1.12 à 1.14](papier/td1/p029.jpg){ loading=lazy .papier }](papier/td1/p029.jpg)
    <p class="papier-legende">Énoncés : exercices 1.12 à 1.14 · Poly 2026-2027, p. 29</p>

    [![Poly 2026-2027, p. 30 : Suite de l'exercice précédent](papier/td1/p030.jpg){ loading=lazy .papier }](papier/td1/p030.jpg)
    <p class="papier-legende">Suite de l'exercice précédent · Poly 2026-2027, p. 30</p>
