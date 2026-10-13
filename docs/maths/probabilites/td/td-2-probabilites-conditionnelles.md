---
title: "TD 2 — Probabilités conditionnelles"
---

# TD 2 — Probabilités conditionnelles

=== "Version simplifiée"

    Exercices de la section 2.5 du poly. Rappels : [chapitre 2](../cours/chapitre-2-probabilites-conditionnelles.md).
    ♦ = exercice obligatoire.

    !!! methode "Réflexe pour tous les exercices de ce TD"
        1. **Nommer** les évènements avec des lettres.
        2. **Traduire** chaque donnée : « parmi les X, p % sont Y » = $P(Y \mid X) = p$ ;
           « p % sont X et Y » = $P(X \cap Y) = p$.
        3. Faire l'**arbre** (ou le tableau de contingence) avant de calculer.

    ## QCM — Faire le point

    | | Énoncé |
    |:-:|--------|
    | A | $P(B) > 0 \Rightarrow P(A \mid B) = P_B(A) = \frac{P(A \cap B)}{P(B)}$ |
    | B | ($A$, $B$ possibles) $P(A \mid B) = P(B \mid A)$ |
    | C | ($B$ possible) $P(A \mid B) + P(\overline{A} \mid B) = 1$ |
    | D | $A = (A \cap B) \cup (A \cap \overline{B})$ |
    | E | ($A$, $B$ possibles) $P(B \mid A) = \frac{P(B)P(A \mid B)}{P(B)P(A \mid B) + P(\overline{B})P(A \mid \overline{B})}$ |

    ??? success "Correction"
        **Vraies : A, C, D, E.** B est fausse en général (c'est exactement ce que corrige Bayes).
        E est la formule de Bayes avec le SCE $\{B, \overline{B}\}$.

    ## ♦ Exercice 2.1 — Indépendance vs incompatibilité

    Donner un exemple de deux évènements : a) compatibles et indépendants ; b) compatibles et
    non indépendants ; c) incompatibles et non indépendants. d) Prouver que deux évènements
    possibles et incompatibles ne peuvent pas être indépendants.

    ??? success "Correction"
        On lance un dé équilibré.

        a) Compatibles et indépendants : $A$ = « pair » $= \{2, 4, 6\}$, $B = \{1, 2\}$.
        $P(A \cap B) = \frac16 = \frac12 \times \frac13$.

        b) Compatibles, non indépendants : $A$ = « pair », $B = \{2\}$. $P(A \cap B) = \frac16 \neq \frac12 \times \frac16$.

        c) Incompatibles, non indépendants : $A = \{1\}$, $B = \{2\}$. $P(A \cap B) = 0 \neq \frac{1}{36}$.

        d) Si $P(A) > 0$, $P(B) > 0$ et $A \cap B = \emptyset$, alors
        $P(A \cap B) = 0 < P(A)P(B)$ : pas indépendants.

    ## Exercice 2.2 — Démonstration de la proposition 2.2

    Soient $(\Omega, P)$ un espace probabilisé et $F \subset \Omega$ (possible : $P(F) > 0$).
    Montrer que $P(\cdot \mid F) : \mathcal{P}(\Omega) \to \mathbb{R}$, $E \mapsto P(E \mid F)$
    est une fonction de probabilité sur $\Omega$.

    ??? tip "Indice"
        Vérifie un par un les trois points de la définition d'une probabilité (chapitre 1) :
        valeurs dans $[0, 1]$, $P(\Omega) = 1$, additivité. Pour l'additivité, remarque que
        les $E_i \cap F$ restent deux à deux incompatibles.

    ??? success "Correction"
        $P(F) > 0$, donc $P(E \mid F) = \frac{P(E \cap F)}{P(F)}$ est bien défini pour tout $E$.

        **1. Valeurs dans $[0, 1]$.** $E \cap F \subset F$, donc $0 \le P(E \cap F) \le P(F)$.
        En divisant par $P(F) > 0$ : $0 \le P(E \mid F) \le 1$.

        **2. $P(\Omega \mid F) = 1$.** $\Omega \cap F = F$, donc $P(\Omega \mid F) = \frac{P(F)}{P(F)} = 1$.

        **3. Additivité.** Soient $E_1, \dots, E_n$ deux à deux incompatibles. Pour $i \neq j$,
        $(E_i \cap F) \cap (E_j \cap F) = (E_i \cap E_j) \cap F = \emptyset$ : les $E_i \cap F$
        sont deux à deux incompatibles. Par distributivité,
        $\left(\bigcup E_i\right) \cap F = \bigcup (E_i \cap F)$, donc par additivité de $P$ :

        $$
        P\left(\bigcup E_i \,\middle|\, F\right) = \frac{P\left(\bigcup (E_i \cap F)\right)}{P(F)}
        = \sum \frac{P(E_i \cap F)}{P(F)} = \sum P(E_i \mid F)
        $$

        Les trois axiomes sont vérifiés : $P(\cdot \mid F)$ est une probabilité sur $\Omega$.

    ## Exercice 2.3 — Démonstration de la proposition 2.4

    Démontrer : $E$ et $F$ indépendants $\iff$ $E$ et $\overline{F}$ indépendants.

    ??? tip "Indice"
        $E = (E \cap F) \cup (E \cap \overline{F})$ (union disjointe), donc
        $P(E \cap \overline{F}) = P(E) - P(E \cap F)$.

    ??? success "Correction"
        ($\Rightarrow$) Supposons $P(E \cap F) = P(E)P(F)$. Comme $E \cap F$ et $E \cap \overline{F}$
        sont incompatibles de réunion $E$ :

        $$
        P(E \cap \overline{F}) = P(E) - P(E \cap F) = P(E) - P(E)P(F) = P(E)\big(1 - P(F)\big) = P(E)P(\overline{F})
        $$

        donc $E$ et $\overline{F}$ sont indépendants.

        ($\Leftarrow$) On applique le sens direct au couple $(E, \overline{F})$ : comme
        $\overline{\overline{F}} = F$, on obtient que $E$ et $F$ sont indépendants.

    ## Exercice 2.4

    Démontrer : $E$ et $F$ indépendants $\iff$
    $P(E \cap F) \times P(\overline{E} \cap \overline{F}) = P(\overline{E} \cap F) \times P(E \cap \overline{F})$.

    ??? tip "Indice"
        Pose $x = P(E \cap F)$, $y = P(E \cap \overline{F})$, $z = P(\overline{E} \cap F)$,
        $w = P(\overline{E} \cap \overline{F})$ (les 4 cases du tableau de contingence) :
        $x + y + z + w = 1$. Développe $P(E)P(F)$.

    ??? success "Correction"
        Avec les notations de l'indice, $\{E \cap F, E \cap \overline{F}, \overline{E} \cap F, \overline{E} \cap \overline{F}\}$
        est un SCE, donc $x + y + z + w = 1$, et $P(E) = x + y$, $P(F) = x + z$. Alors

        $$
        P(E)P(F) = (x + y)(x + z) = x(x + y + z) + yz = x(1 - w) + yz = x - xw + yz
        $$

        Donc $P(E)P(F) - P(E \cap F) = yz - xw$, et

        $$
        E, F \text{ indépendants} \iff P(E \cap F) = P(E)P(F) \iff xw = yz
        $$

        c'est-à-dire $P(E \cap F)\,P(\overline{E} \cap \overline{F}) = P(\overline{E} \cap F)\,P(E \cap \overline{F})$.

    ## Exercice 2.5 — Indépendance

    $n$ lancers indépendants d'une pièce, probabilité de pile $p \in \left]0 ; 1\right[$, $q = 1 - p$.
    a) Probabilité d'obtenir au moins une fois pile ? b) Probabilité que face ne soit jamais suivie de pile ?

    ??? success "Correction"
        a) $P(\text{au moins un pile}) = 1 - P(\text{que des faces}) = 1 - q^n$ (indépendance).

        b) « Face n'est jamais suivie de pile » : la suite est de la forme
        $\underbrace{P \dots P}_{k}\underbrace{F \dots F}_{n-k}$, pour $k = 0, \dots, n$.
        Ces $n+1$ cas sont incompatibles :

        $$
        P = \sum_{k=0}^n p^k q^{n-k}
        = \frac{p^{n+1} - q^{n+1}}{p - q} \text{ si } p \neq \tfrac12,
        \qquad = \frac{n+1}{2^n} \text{ si } p = \tfrac12
        $$

    ## ♦ Exercice 2.6 — Le premier qui fait 7

    $A$ et $B$ lancent alternativement deux dés ; le premier qui obtient une somme de 7 gagne. $A$ commence.
    Calculer la probabilité que $A$ soit vainqueur, puis que $B$ soit vainqueur (commencer par un arbre).

    ??? tip "Indice"
        $P(\text{somme} = 7) = \frac{6}{36} = \frac16$. $A$ gagne au tour $1$, $3$, $5$…
        C'est une série géométrique.

    ??? success "Correction"
        $A$ gagne au $(2k+1)$-e lancer si les $2k$ premiers échouent : probabilité
        $\left(\frac56\right)^{2k}\frac16$.

        $$
        P(A) = \frac16 \sum_{k \ge 0} \left(\frac{25}{36}\right)^k = \frac16 \times \frac{1}{1 - \frac{25}{36}} = \frac{6}{11},
        \qquad P(B) = \frac{5}{11}
        $$

        (La partie s'arrête presque sûrement, donc $P(B) = 1 - P(A)$.)

    ## Exercice 2.7

    $E$, $F$ incompatibles, $P(E) = a$, $P(F) = b$, $a + b \neq 1$. On répète jusqu'à ce que $E$ ou $F$ se réalise.
    Probabilité que ce soit $E$ qui se réalise en premier ?

    ??? success "Correction"
        À chaque essai, rien ne se passe avec probabilité $1 - a - b$. Donc
        $P(E \text{ en premier}) = \sum_{k \ge 0} (1 - a - b)^k a = \dfrac{a}{a + b}$.

    ## Exercice 2.8 — Le jeu de craps

    Premier lancer de deux dés : somme 2, 3 ou 12 → perdu ; 7 ou 11 → gagné. Sinon on relance
    jusqu'à obtenir 7 (perdu) ou la somme du premier lancer (gagné). Probabilité de victoire ?

    ??? success "Correction"
        $P(\text{somme} = s) = \frac{6 - |s - 7|}{36}$. Victoire directe : 7 ou 11, soit $\frac{6 + 2}{36}$.
        Si le 1er lancer donne un « point » $s \in \{4, 5, 6, 8, 9, 10\}$, d'après l'exercice 2.7
        on gagne avec probabilité $\frac{P(s)}{P(s) + P(7)}$.

        $$
        P(\text{victoire}) = \frac{8}{36} + \sum_{s} P(s) \frac{P(s)}{P(s) + P(7)} = \frac{244}{495} \approx 0{,}493
        $$

        Légèrement défavorable au joueur.

    ## ♦ Exercice 2.9 — IRM et séquelles

    42 enfants ; 20 auront des séquelles ($S$). IRM anormale ($A$) chez 16 des 20 malades
    avec séquelles et chez 2 malades sans séquelle ($N$ : IRM normale).
    a) Remplir le tableau de contingence. b) Calculer $P(N \mid \overline{S})$, $P(A \mid S)$ et $P(S \mid A)$.
    c) $A$ et $S$ sont-ils indépendants ?

    ??? tip "Indice"
        Tableau d'**effectifs** d'abord, puis divise par le total de la ligne ou de la colonne
        qui correspond à la condition.

    ??? success "Correction"
        a)

        | | $S$ | $\overline{S}$ | Total |
        |-|:---:|:---:|:---:|
        | $A$ | 16 | 2 | 18 |
        | $N$ | 4 | 20 | 24 |
        | Total | 20 | 22 | 42 |

        b) $P(N \mid \overline{S}) = \frac{20}{22} = \frac{10}{11} \approx 0{,}91$ ; $P(A \mid S) = \frac{16}{20} = 0{,}8$ ;
        $P(S \mid A) = \frac{16}{18} = \frac89 \approx 0{,}89$.

        c) $P(A \cap S) = \frac{16}{42} = \frac{8}{21}$ et $P(A)P(S) = \frac{18}{42} \times \frac{20}{42} = \frac{10}{49}$ :
        différents, donc **pas indépendants**.

    ## Exercice 2.10 — Judo et échecs

    9 personnes ; $J$ = « pratique le judo », $E$ = « pratique les échecs ».
    Effectifs : $J \cap E$ : 1, $J \cap \overline{E}$ : 2, $\overline{J} \cap E$ : 2, $\overline{J} \cap \overline{E}$ : 4.
    a) Remplir le tableau des probabilités $P(J \cap E)$, $P(J \cap \overline{E})$, $P(\overline{J} \cap E)$, $P(\overline{J} \cap \overline{E})$.
    b) $J$ et $E$ sont-ils indépendants ?

    ??? success "Correction"
        a) On divise par 9 : $\frac19$, $\frac29$, $\frac29$, $\frac49$.

        b) $P(J) = \frac39$, $P(E) = \frac39$, et $P(J)P(E) = \frac19 = P(J \cap E)$.
        Il faut vérifier les autres cases… mais par la propriété « indépendance avec les
        complémentaires », une case suffit pour un tableau $2 \times 2$. **Indépendants.**

    ## Exercice 2.11 — Fumeurs et hypertension

    $P(F) = 0{,}6$, $P(H \mid F) = 0{,}75$, $P(H \mid \overline{F}) = 0{,}5$ ($F$ : fumeur, $H$ : hypertendu).
    Probabilité que le sujet soit a) hypertendu et fumeur ; b) hypertendu ; c) ni hypertendu ni fumeur ?
    d) Probabilité qu'un sujet hypertendu soit fumeur ?

    ??? success "Correction"
        a) $P(H \cap F) = 0{,}6 \times 0{,}75 = 0{,}45$.

        b) Probabilités totales : $P(H) = 0{,}45 + 0{,}4 \times 0{,}5 = 0{,}65$.

        c) $P(\overline{H} \cap \overline{F}) = 0{,}4 \times 0{,}5 = 0{,}2$.

        d) Bayes : $P(F \mid H) = \frac{0{,}45}{0{,}65} = \frac{9}{13} \approx 0{,}69$.

    ## Exercice 2.12 — Information d'un évènement sur un autre

    $E$, $F$ possibles. $F$ « possède une information négative » sur $E$, noté $F \searrow E$,
    si $P(E \mid F) \le P(E)$.
    a) Sur un dessin où $E$ est la moitié gauche de $\Omega$, tracer un $F$ tel que $F \searrow E$.
    Vrai ou faux ? b) $F \searrow E \Rightarrow E \searrow F$. c) $F \searrow E$ et $E \searrow G \Rightarrow F \searrow G$.
    d) $F \searrow E$ et $G \searrow E \Rightarrow F \cap G \searrow E$.
    Mêmes questions pour $F \nearrow E$ (« information positive »), défini par $P(E \mid F) \ge P(E)$.

    ??? tip "Indice"
        Multiplie par $P(F) > 0$ : $F \searrow E \iff P(E \cap F) \le P(E)P(F)$. Cette forme est
        **symétrique** en $E$ et $F$. Pour les « faux », un contre-exemple sur un dé ou deux
        pièces suffit.

    ??? success "Correction"
        **Reformulation.** Comme $P(F) > 0$ :
        $F \searrow E \iff P(E \cap F) \le P(E)P(F)$ et $F \nearrow E \iff P(E \cap F) \ge P(E)P(F)$.

        a) Il suffit que $F$ « morde peu » sur $E$ : par exemple $F$ = un rectangle dans la
        moitié droite (hors de $E$). Alors $P(E \mid F) = 0 \le P(E) = \frac12$.
        Plus généralement, tout $F$ dont au plus la moitié de l'aire est dans $E$ convient.

        **Relation $\searrow$**

        b) **Vrai.** $F \searrow E \iff P(E \cap F) \le P(E)P(F)$, inégalité symétrique ; en divisant
        par $P(E) > 0$ : $P(F \mid E) \le P(F)$, c'est-à-dire $E \searrow F$.

        c) **Faux.** Dé équilibré, $E = \{1, 2, 3\}$, $F = G = \{4, 5, 6\}$.
        $P(E \mid F) = 0 \le \frac12$ donc $F \searrow E$ ; $P(G \mid E) = 0 \le \frac12$ donc $E \searrow G$.
        Mais $P(G \mid F) = 1 > \frac12 = P(G)$ : $F \searrow G$ est faux.

        d) **Faux.** Deux lancers de pièce équilibrée, $F$ = « 1er pile », $G$ = « 2e pile »,
        $E$ = « les deux résultats sont identiques » $= \{PP, FF\}$.
        $P(E \mid F) = P(E \mid G) = \frac12 = P(E)$ donc $F \searrow E$ et $G \searrow E$.
        Mais $F \cap G = \{PP\} \subset E$ : $P(E \mid F \cap G) = 1 > \frac12$.

        **Relation $\nearrow$**

        b) **Vrai**, même preuve (inégalité $P(E \cap F) \ge P(E)P(F)$ symétrique).

        c) **Faux.** Dé, $F = \{1, 2\}$, $E = \{1, 2, 3, 4\}$, $G = \{3, 4\}$.
        $P(E \mid F) = 1 \ge \frac23$ ; $P(G \mid E) = \frac12 \ge \frac13$. Mais $P(G \mid F) = 0 < \frac13$.

        d) **Faux.** Mêmes $F$, $G$ qu'en d), avec $E$ = « résultats différents » $= \{PF, FP\}$.
        $P(E \mid F) = P(E \mid G) = \frac12 = P(E)$, mais $P(E \mid F \cap G) = P(E \mid \{PP\}) = 0 < \frac12$.

        À retenir : seule la **symétrie** est vraie ; « l'information » n'est ni transitive ni
        stable par intersection.

    ## Exercice 2.13 — Indicatrice d'Euler

    $n = p_1^{\alpha_1} \times \dots \times p_r^{\alpha_r}$ ($p_i$ premiers distincts) ; $\varphi(n)$ = nombre d'entiers
    de $1$ à $n$ premiers avec $n$. But : $\varphi(n) = n\left(1 - \frac{1}{p_1}\right) \times \dots \times \left(1 - \frac{1}{p_r}\right)$.
    $\Omega = [\![1 ; n]\!]$ muni de la probabilité uniforme.
    a) Pour $d$ diviseur de $n$, $D_d$ = ensemble des multiples de $d$ dans $\Omega$. Calculer $P(D_d)$.
    b) Montrer que $D_{p_1}, \dots, D_{p_r}$ sont mutuellement indépendants. c) En déduire $\varphi(n)$.

    ??? tip "Indice"
        b) Un entier est multiple de plusieurs premiers distincts $p_{i_1}, \dots, p_{i_k}$
        si et seulement s'il est multiple de leur produit. c) $k$ est premier avec $n$ si et
        seulement s'il n'est divisible par **aucun** $p_i$.

    ??? success "Correction"
        a) Les multiples de $d$ dans $[\![1 ; n]\!]$ sont $d, 2d, \dots, \frac{n}{d}\,d$ : il y en a
        $\frac{n}{d}$ (entier car $d \mid n$). Donc $P(D_d) = \dfrac{n/d}{n} = \dfrac{1}{d}$.

        b) Soit $\{i_1, \dots, i_k\} \subset \{1, \dots, r\}$. Les $p_{i_j}$ étant des premiers
        distincts, $m$ est multiple de chacun $\iff$ $m$ est multiple de $d = p_{i_1} \cdots p_{i_k}$.
        Donc $D_{p_{i_1}} \cap \dots \cap D_{p_{i_k}} = D_d$, et $d \mid n$, donc d'après a) :

        $$
        P\left(D_{p_{i_1}} \cap \dots \cap D_{p_{i_k}}\right) = \frac{1}{p_{i_1} \cdots p_{i_k}}
        = P(D_{p_{i_1}}) \times \dots \times P(D_{p_{i_k}})
        $$

        Vrai pour toute sous-famille : les $D_{p_i}$ sont **mutuellement indépendants**.

        c) Les diviseurs premiers de $k$ communs avec $n$ sont parmi les $p_i$, donc
        $k$ premier avec $n$ $\iff$ $k \in \overline{D_{p_1}} \cap \dots \cap \overline{D_{p_r}}$.
        Les complémentaires d'évènements mutuellement indépendants sont mutuellement indépendants, d'où

        $$
        \frac{\varphi(n)}{n} = P\left(\overline{D_{p_1}} \cap \dots \cap \overline{D_{p_r}}\right)
        = \prod_{i=1}^r \left(1 - \frac{1}{p_i}\right)
        \quad\Longrightarrow\quad \varphi(n) = n \prod_{i=1}^r \left(1 - \frac{1}{p_i}\right)
        $$

        Exemple : $\varphi(12) = 12 \times \frac12 \times \frac23 = 4$ ($1, 5, 7, 11$).

    ## ♦ Exercice 2.14 — Un problème de diagnostic

    Test : $P(+ \mid M) = 0{,}95$, faux positifs $P(+ \mid \overline{M}) = 0{,}01$, $P(M) = 0{,}0005$.
    Probabilité d'être porteur si le test est positif ?

    ??? tip "Indice"
        Bayes avec le SCE $\{M, \overline{M}\}$. Pose-toi la question : parmi tous les
        positifs, combien sont des vrais positifs ?

    ??? success "Correction"
        $$
        P(M \mid +) = \frac{0{,}95 \times 0{,}0005}{0{,}95 \times 0{,}0005 + 0{,}01 \times 0{,}9995} \approx 0{,}045
        $$

        Moins de 5 % ! La maladie est si rare que les faux positifs (1 % de presque toute
        la population) sont bien plus nombreux que les vrais positifs.

    ## Exercice 2.15 — Épidémie et vaccin

    $P(M \mid V) = 0{,}2$, $P(M \mid \overline{V}) = 0{,}6$, $P(V \mid M) = 0{,}1$.
    a) Proportion de malades ? b) Proportion de vaccinés ?

    ??? tip "Indice"
        Pose $v = P(V)$. Écris $P(M)$ avec les probabilités totales, puis $P(V \mid M)$ avec
        Bayes : tu obtiens une équation en $v$.

    ??? success "Correction"
        $P(M) = 0{,}2v + 0{,}6(1 - v) = 0{,}6 - 0{,}4v$ et
        $P(V \mid M) = \frac{0{,}2v}{0{,}6 - 0{,}4v} = 0{,}1$, donc $0{,}24v = 0{,}06$ et $v = 0{,}25$.

        a) $P(M) = 0{,}6 - 0{,}1 = 0{,}5$. b) $P(V) = 0{,}25$.

    ## Exercice 2.16 — Clinique

    60 % parlent tout de suite à un assistant ; les 40 % restants sont rappelés le jour même
    (75 %) ou le lendemain (25 %). Probabilité de venir : 0,8 / 0,6 / 0,4.
    a) Quel pourcentage des appelants se rend à la clinique ? b) Quel pourcentage des patients venus
    à la clinique ont dû être rappelés ?

    ??? success "Correction"
        SCE : $I$ (immédiat) : $0{,}6$ ; $J$ (jour même) : $0{,}4 \times 0{,}75 = 0{,}3$ ;
        $L$ (lendemain) : $0{,}4 \times 0{,}25 = 0{,}1$.

        a) $P(C) = 0{,}6 \times 0{,}8 + 0{,}3 \times 0{,}6 + 0{,}1 \times 0{,}4 = 0{,}7$, soit 70 %.

        b) $P(J \cup L \mid C) = \frac{0{,}18 + 0{,}04}{0{,}7} = \frac{11}{35} \approx 31{,}4\ \%$.

    ## ♦ Exercice 2.17 — Assurance automobile

    | Classe | Proportion | $P(\text{accident} \mid \text{classe})$ |
    |--------|:---:|:---:|
    | $< 25$ ans | 0,25 | 0,12 |
    | 25–50 ans | 0,53 | 0,06 |
    | $> 50$ ans | 0,22 | 0,09 |

    a) Probabilité qu'un assuré tiré au hasard ait déclaré au moins un accident ?
    b) Probabilité qu'un assuré ayant déclaré un accident ait moins de 25 ans (poly : « au plus 25 ans ») ?
    c) Probabilité qu'un assuré de 25 ans ou plus ait au moins un accident ?
    d) Probabilité qu'un assuré n'ayant déclaré aucun accident ait de 25 à 50 ans ?

    ??? success "Correction"
        a) $P(A) = 0{,}25 \times 0{,}12 + 0{,}53 \times 0{,}06 + 0{,}22 \times 0{,}09 = 0{,}0816$.

        b) $P(J \mid A) = \frac{0{,}03}{0{,}0816} \approx 0{,}368$.

        c) Ce n'est **pas** une formule de Bayes : on conditionne par « 25 ans ou plus » :
        $P(A \mid \overline{J}) = \frac{0{,}53 \times 0{,}06 + 0{,}22 \times 0{,}09}{0{,}75} = \frac{0{,}0516}{0{,}75} = 0{,}0688$.

        d) $P(M \mid \overline{A}) = \frac{0{,}53 \times 0{,}94}{1 - 0{,}0816} = \frac{0{,}4982}{0{,}9184} \approx 0{,}542$.

    ## Exercice 2.18 — Trois machines

    $M_1$, $M_2$, $M_3$ : 50 %, 30 %, 20 % de la production ; défauts 2 %, 3 %, 5 %.
    a) Probabilité qu'un composant soit défectueux ? b) Probabilité d'une pièce défectueuse **et** provenant de $M_1$ ?
    c) « Défectueuse » et « provient de $M_1$ » sont-ils indépendants ? d) Sachant la pièce défectueuse,
    probabilité qu'elle provienne de $M_1$ ?

    ??? success "Correction"
        a) $P(D) = 0{,}5 \times 0{,}02 + 0{,}3 \times 0{,}03 + 0{,}2 \times 0{,}05 = 0{,}029$.

        b) $P(D \cap M_1) = 0{,}5 \times 0{,}02 = 0{,}01$.

        c) $P(D)P(M_1) = 0{,}0145 \neq 0{,}01$ : **pas indépendants**.

        d) $P(M_1 \mid D) = \frac{0{,}01}{0{,}029} = \frac{10}{29} \approx 0{,}345$.

    ## Exercice 2.19 — Bien répondre à un QCM

    L'étudiant connaît la réponse avec probabilité $\frac12$, sinon répond au hasard parmi 5 (une seule bonne).
    Sachant qu'il a coché la bonne réponse, probabilité qu'il la connaissait ?

    ??? success "Correction"
        $$
        P(C \mid B) = \frac{1 \times \frac12}{1 \times \frac12 + \frac15 \times \frac12} = \frac56
        $$

    ## Exercice 2.20 — Un jeu de dés

    Dé $A$ : 4 faces rouges, 2 noires. Dé $B$ : 2 rouges, 4 noires. On lance une pièce au début :
    face → on lance le dé $A$ indéfiniment, pile → le dé $B$.
    a) Probabilité d'avoir rouge au $n$-ième jet ? b) Sachant rouge aux deux premiers coups,
    probabilité de rouge au troisième ? c) Sachant rouge aux $n$ premiers coups, probabilité de
    rouge au $(n+1)$-ième ? d) Sachant rouge aux $n$ premiers coups, probabilité d'avoir tiré face ?

    ??? tip "Indice"
        SCE $\{\text{Face}, \text{Pile}\}$ (= dé $A$ / dé $B$). **Sachant le dé**, les jets sont
        indépendants : $P(R_1 \cap \dots \cap R_n \mid \text{Face}) = \left(\frac23\right)^n$.
        Mais les $R_k$ ne sont **pas** indépendants entre eux sans conditionnement !

    ??? success "Correction"
        Notons $R_k$ = « rouge au $k$-ième jet », $\Phi$ = « face » (dé $A$), $P(\Phi) = \frac12$.
        Posons $S_n = R_1 \cap \dots \cap R_n$. Probabilités totales sur $\{\Phi, \overline{\Phi}\}$ :

        $$
        P(S_n) = \frac12\left(\frac23\right)^n + \frac12\left(\frac13\right)^n = \frac{2^n + 1}{2 \times 3^n}
        $$

        a) $P(R_n) = \frac12 \times \frac23 + \frac12 \times \frac13 = \frac12$.

        b) $P(R_3 \mid R_1 \cap R_2) = \dfrac{P(S_3)}{P(S_2)} = \dfrac{9/54}{5/18} = \dfrac{1/6}{5/18} = \dfrac35$.

        c) De même :

        $$
        P(R_{n+1} \mid S_n) = \frac{P(S_{n+1})}{P(S_n)} = \frac{2^{n+1} + 1}{2 \times 3^{n+1}} \times \frac{2 \times 3^n}{2^n + 1}
        = \frac{2^{n+1} + 1}{3\,(2^n + 1)}
        $$

        (on retrouve $\frac35$ pour $n = 2$ ; et $\to \frac23$ quand $n \to \infty$).

        d) Bayes :

        $$
        P(\Phi \mid S_n) = \frac{\frac12\left(\frac23\right)^n}{\frac12\left(\frac23\right)^n + \frac12\left(\frac13\right)^n} = \frac{2^n}{2^n + 1}
        $$

        Plus on voit de rouges, plus on est sûr d'avoir le dé $A$ : $P(\Phi \mid S_n) \to 1$.

    ## Exercice 2.21 — Le problème des rencontres

    $N$ personnes reprennent chacune un chapeau au hasard (permutation uniforme).
    a) Probabilité que tous reprennent leur propre chapeau ? b) Qu'au moins un ne reprenne pas
    le sien ? c) Qu'aucun ne reprenne le sien (formule de Poincaré) ? d) Limite quand $N \to \infty$ ?

    ??? tip "Indice"
        $A_i$ = « la personne $i$ reprend son chapeau ». Pour $i_1 < \dots < i_k$,
        $P(A_{i_1} \cap \dots \cap A_{i_k}) = \frac{(N-k)!}{N!}$ (les autres chapeaux sont permutés
        librement), et il y a $\binom{N}{k}$ tels choix.

    ??? success "Correction"
        $\Omega$ = ensemble des $N!$ permutations, probabilité uniforme.

        a) Une seule permutation convient (l'identité) : $\dfrac{1}{N!}$.

        b) C'est le contraire de a) : $1 - \dfrac{1}{N!}$.

        c) « Aucun » est le contraire de $A_1 \cup \dots \cup A_N$. Formule de Poincaré :

        $$
        P\left(\bigcup_{i=1}^N A_i\right) = \sum_{k=1}^N (-1)^{k+1} \binom{N}{k} \frac{(N-k)!}{N!}
        = \sum_{k=1}^N (-1)^{k+1} \frac{1}{k!}
        $$

        car $\binom{N}{k}\frac{(N-k)!}{N!} = \frac{N!}{k!\,(N-k)!} \cdot \frac{(N-k)!}{N!} = \frac{1}{k!}$. Donc

        $$
        P(\text{aucun}) = 1 - \sum_{k=1}^N \frac{(-1)^{k+1}}{k!} = \sum_{k=0}^N \frac{(-1)^k}{k!}
        $$

        Ex. : $N = 3$ : $1 - 1 + \frac12 - \frac16 = \frac13$ ; $N = 4$ : $\frac38$.

        d) On reconnaît la série de $e^x$ en $x = -1$ : $\displaystyle\lim_{N \to \infty} P(\text{aucun}) = e^{-1} \approx 0{,}368$.

    ## Exercice 2.22 — Les chats de Schrödinger

    20 chats dans 20 boîtes : 10 boîtes vides (survie 1), 5 avec 3 g d'arsenic (survie 0,6), 5 avec 10 g (survie 0,2).
    On choisit une boîte au hasard. a) Probabilité que le chat soit vivant au bout d'une heure ?
    b) Le chat est vivant : probabilité que la boîte ait été vide ?

    ??? success "Correction"
        a) $P(V) = \frac{10}{20} \times 1 + \frac{5}{20} \times 0{,}6 + \frac{5}{20} \times 0{,}2 = 0{,}7$.

        b) $P(\text{vide} \mid V) = \frac{0{,}5}{0{,}7} = \frac57 \approx 0{,}71$.

    ## Exercice 2.23 — Une machine sans mémoire

    Aux instants $0, \Delta t, 2\Delta t, \dots$ la machine est en panne ou en marche. Si elle marche,
    elle est en panne à l'instant suivant avec probabilité $a$ ($0 < a < 1$) ; si elle est en panne,
    elle marche à l'instant suivant avec probabilité $b$. Calculer la probabilité qu'elle marche
    à $n\Delta t$ et montrer qu'elle « oublie » son état de départ.

    ??? tip "Indice"
        $p_n = P(\text{marche à } n\Delta t)$. Probabilités totales sur l'état à $n\Delta t$ :
        on obtient une suite arithmético-géométrique $p_{n+1} = (1 - a - b)p_n + b$.

    ??? success "Correction"
        Notons $M_n$ = « marche à $n\Delta t$ », $p_n = P(M_n)$. SCE $\{M_n, \overline{M_n}\}$ :

        $$
        p_{n+1} = P(M_{n+1} \mid M_n)\,p_n + P(M_{n+1} \mid \overline{M_n})(1 - p_n) = (1 - a)p_n + b(1 - p_n) = (1 - a - b)\,p_n + b
        $$

        Point fixe : $\ell = (1 - a - b)\ell + b \iff \ell = \frac{b}{a + b}$ ($a + b > 0$).
        La suite $p_n - \ell$ est géométrique de raison $1 - a - b$ :

        $$
        p_n = \frac{b}{a + b} + (1 - a - b)^n \left(p_0 - \frac{b}{a + b}\right)
        $$

        Avec $0 < a < 1$ et $0 \le b \le 1$ : $0 < a + b < 2$, donc $|1 - a - b| < 1$ et
        $(1 - a - b)^n \to 0$. Ainsi $p_n \to \dfrac{b}{a + b}$, **quel que soit** $p_0$
        (machine partie en marche, $p_0 = 1$, ou en panne, $p_0 = 0$) : la machine « oublie »
        son état initial.

    ## Exercice 2.24 — Suites de probabilités

    Au départ, $A$, $B$, $C$ ont chacun un tiers du marché. Chaque année : les clients de $A$ se
    répartissent indifféremment entre $A$, $B$, $C$ ; ceux de $B$ restent chez $B$ ; ceux de $C$ vont
    chez $A$ avec probabilité $\frac{1}{12}$, chez $B$ avec $\frac{7}{12}$, restent chez $C$ avec $\frac13$.
    $a_n$, $b_n$, $c_n$ : probabilités d'être chez $A$, $B$, $C$ après $n$ années.
    a) Relations de récurrence. b) Expression de $a_n$, $b_n$, $c_n$ (récurrences linéaires d'ordre 2,
    équation caractéristique). c) Limites ? Monopole ?

    ??? tip "Indice"
        Probabilités totales sur l'opérateur de l'année $n$. Puis exprime $c_n$ à l'aide de
        $a_{n+1}$ et $a_n$ (1re relation) et reporte dans la 3e : récurrence d'ordre 2 sur $a_n$.

    ??? success "Correction"
        a) SCE $\{A_n, B_n, C_n\}$ (opérateur l'année $n$), $a_0 = b_0 = c_0 = \frac13$ :

        $$
        \begin{cases}
        a_{n+1} = \frac13 a_n + \frac{1}{12} c_n \\[2pt]
        b_{n+1} = \frac13 a_n + b_n + \frac{7}{12} c_n \\[2pt]
        c_{n+1} = \frac13 a_n + \frac13 c_n
        \end{cases}
        $$

        b) De la 1re : $c_n = 12a_{n+1} - 4a_n$, donc $c_{n+1} = 12a_{n+2} - 4a_{n+1}$. La 3e donne
        $12a_{n+2} - 4a_{n+1} = \frac13 a_n + 4a_{n+1} - \frac43 a_n$, soit

        $$
        a_{n+2} - \frac23 a_{n+1} + \frac{1}{12} a_n = 0
        $$

        Équation caractéristique $X^2 - \frac23 X + \frac{1}{12} = 0$ : $\Delta = \frac49 - \frac13 = \frac19$,
        racines $q_1 = \frac12$, $q_2 = \frac16$. Donc $a_n = \alpha\left(\frac12\right)^n + \beta\left(\frac16\right)^n$.

        Conditions initiales : $a_0 = \frac13$ et $a_1 = \frac13 \cdot \frac13 + \frac{1}{12} \cdot \frac13 = \frac{5}{36}$, d'où
        $\alpha + \beta = \frac13$ et $\frac{\alpha}{2} + \frac{\beta}{6} = \frac{5}{36}$, soit $\alpha = \frac14$, $\beta = \frac{1}{12}$.

        $$
        a_n = \frac14\left(\frac12\right)^n + \frac{1}{12}\left(\frac16\right)^n, \qquad
        c_n = 12a_{n+1} - 4a_n = \frac12\left(\frac12\right)^n - \frac16\left(\frac16\right)^n
        $$

        et, comme $a_n + b_n + c_n = 1$ :

        $$
        b_n = 1 - \frac34\left(\frac12\right)^n + \frac{1}{12}\left(\frac16\right)^n
        $$

        (Vérification $n = 0$ : $a_0 = c_0 = b_0 = \frac13$.)

        c) $\left(\frac12\right)^n \to 0$ et $\left(\frac16\right)^n \to 0$ : $a_n \to 0$, $c_n \to 0$, $b_n \to 1$.
        **Oui, $B$ tend vers le monopole** (logique : $B$ ne perd jamais de clients et en gagne chaque année).

    ## Exercice 2.25 — Matrices de probabilités

    Une particule se déplace chaque seconde sur les sommets du triangle $ABC$ : de $A$ elle va en $B$
    (prob. $0{,}75$) ou en $C$ ($0{,}25$) ; de $B$ elle va en $A$ ($0{,}75$) ou en $C$ ($0{,}25$) ; de $C$ elle va
    toujours en $B$. $a_n$, $b_n$, $c_n$ : probabilités d'être en $A$, $B$, $C$ à l'instant $n$.
    a) Relations de récurrence. b) Matrice $M$ telle que $X_{n+1} = MX_n$ avec $X_n = \begin{pmatrix} a_n \\ b_n \\ c_n \end{pmatrix}$.
    c) Montrer que $X_n = M^n X_0$. d) $P = \begin{pmatrix} 12 & 3 & 1 \\ 16 & -1 & -1 \\ 7 & -2 & 0 \end{pmatrix}$ est-elle inversible ?
    e) Calculer $P^{-1}MP$ ; que dire de $M$ ? f) Limites de $a_n$, $b_n$, $c_n$.

    ??? tip "Indice"
        Colonne $j$ de $M$ = où l'on va depuis le sommet $j$ (chaque colonne somme à 1).
        e) Vérifie que les colonnes de $P$ sont des vecteurs propres : $MP = PD$.

    ??? success "Correction"
        a) Probabilités totales sur la position à l'instant $n$ :

        $$
        a_{n+1} = \tfrac34 b_n, \qquad b_{n+1} = \tfrac34 a_n + c_n, \qquad c_{n+1} = \tfrac14 a_n + \tfrac14 b_n
        $$

        b) Les relations de a) s'écrivent $X_{n+1} = MX_n$ avec

        $$
        M = \begin{pmatrix} 0 & \frac34 & 0 \\ \frac34 & 0 & 1 \\ \frac14 & \frac14 & 0 \end{pmatrix}
        $$

        c) Récurrence : vrai pour $n = 0$ ($M^0 = I_3$) ; si $X_n = M^n X_0$, alors
        $X_{n+1} = MX_n = M \cdot M^n X_0 = M^{n+1} X_0$.

        d) Développement selon la 3e ligne :
        $\det P = 7\begin{vmatrix} 3 & 1 \\ -1 & -1 \end{vmatrix} - (-2)\begin{vmatrix} 12 & 1 \\ 16 & -1 \end{vmatrix} + 0
        = 7 \times (-2) + 2 \times (-28) = -70 \neq 0$ : $P$ est **inversible**, et

        $$
        P^{-1} = \begin{pmatrix} \frac{1}{35} & \frac{1}{35} & \frac{1}{35} \\[2pt] \frac{1}{10} & \frac{1}{10} & -\frac25 \\[2pt] \frac{5}{14} & -\frac{9}{14} & \frac67 \end{pmatrix}
        $$

        e) On vérifie colonne par colonne :
        $M\begin{pmatrix} 12 \\ 16 \\ 7 \end{pmatrix} = \begin{pmatrix} 12 \\ 16 \\ 7 \end{pmatrix}$,
        $M\begin{pmatrix} 3 \\ -1 \\ -2 \end{pmatrix} = \begin{pmatrix} -\frac34 \\ \frac14 \\ \frac12 \end{pmatrix} = -\frac14\begin{pmatrix} 3 \\ -1 \\ -2 \end{pmatrix}$,
        $M\begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix} = \begin{pmatrix} -\frac34 \\ \frac34 \\ 0 \end{pmatrix} = -\frac34\begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix}$.
        Donc $MP = PD$, soit

        $$
        P^{-1}MP = D = \begin{pmatrix} 1 & 0 & 0 \\ 0 & -\frac14 & 0 \\ 0 & 0 & -\frac34 \end{pmatrix}
        $$

        $M$ est **diagonalisable**, de valeurs propres $1$, $-\frac14$, $-\frac34$ (vecteurs propres : les colonnes de $P$).

        f) $M = PDP^{-1}$ donc $M^n = PD^nP^{-1}$ avec $D^n = \operatorname{diag}\left(1, \left(-\frac14\right)^n, \left(-\frac34\right)^n\right)
        \to \operatorname{diag}(1, 0, 0)$. Ainsi

        $$
        M^n \xrightarrow[n \to \infty]{} P\begin{pmatrix} 1 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}P^{-1}
        = \frac{1}{35}\begin{pmatrix} 12 & 12 & 12 \\ 16 & 16 & 16 \\ 7 & 7 & 7 \end{pmatrix}
        $$

        (1re colonne de $P$ fois 1re ligne de $P^{-1}$). Avec $a_0 + b_0 + c_0 = 1$ :

        $$
        \lim a_n = \frac{12}{35} \approx 0{,}343, \qquad \lim b_n = \frac{16}{35} \approx 0{,}457, \qquad \lim c_n = \frac{7}{35} = \frac15
        $$

        quelle que soit la position de départ (comme en 2.23, la particule « oublie » son point de départ).

=== "Version papier"

    Les énoncés de la section 2.5 « Exercices » du polycopié 2026-2027 (pages 44 à 52). ♦ = exercice obligatoire. Le cours est dans la [version papier du chapitre 2](../cours/chapitre-2-probabilites-conditionnelles.md).

    [![Poly 2026-2027, p. 44 : Énoncés : QCM, exercices 2.1 à 2.3](papier/td2/p044.jpg){ loading=lazy .papier }](papier/td2/p044.jpg)
    <p class="papier-legende">Énoncés : QCM, exercices 2.1 à 2.3 · Poly 2026-2027, p. 44</p>

    [![Poly 2026-2027, p. 45 : Énoncés : exercices 2.4 à 2.8](papier/td2/p045.jpg){ loading=lazy .papier }](papier/td2/p045.jpg)
    <p class="papier-legende">Énoncés : exercices 2.4 à 2.8 · Poly 2026-2027, p. 45</p>

    [![Poly 2026-2027, p. 46 : Énoncés : exercices 2.9 à 2.11](papier/td2/p046.jpg){ loading=lazy .papier }](papier/td2/p046.jpg)
    <p class="papier-legende">Énoncés : exercices 2.9 à 2.11 · Poly 2026-2027, p. 46</p>

    [![Poly 2026-2027, p. 47 : Énoncés : exercices 2.12 et 2.13](papier/td2/p047.jpg){ loading=lazy .papier }](papier/td2/p047.jpg)
    <p class="papier-legende">Énoncés : exercices 2.12 et 2.13 · Poly 2026-2027, p. 47</p>

    [![Poly 2026-2027, p. 48 : Énoncés : exercices 2.14 à 2.17](papier/td2/p048.jpg){ loading=lazy .papier }](papier/td2/p048.jpg)
    <p class="papier-legende">Énoncés : exercices 2.14 à 2.17 · Poly 2026-2027, p. 48</p>

    [![Poly 2026-2027, p. 49 : Énoncés : exercices 2.18 et 2.19](papier/td2/p049.jpg){ loading=lazy .papier }](papier/td2/p049.jpg)
    <p class="papier-legende">Énoncés : exercices 2.18 et 2.19 · Poly 2026-2027, p. 49</p>

    [![Poly 2026-2027, p. 50 : Énoncés : exercices 2.20 à 2.22](papier/td2/p050.jpg){ loading=lazy .papier }](papier/td2/p050.jpg)
    <p class="papier-legende">Énoncés : exercices 2.20 à 2.22 · Poly 2026-2027, p. 50</p>

    [![Poly 2026-2027, p. 51 : Énoncés : exercices 2.23 et 2.24](papier/td2/p051.jpg){ loading=lazy .papier }](papier/td2/p051.jpg)
    <p class="papier-legende">Énoncés : exercices 2.23 et 2.24 · Poly 2026-2027, p. 51</p>

    [![Poly 2026-2027, p. 52 : Énoncés : exercice 2.25](papier/td2/p052.jpg){ loading=lazy .papier }](papier/td2/p052.jpg)
    <p class="papier-legende">Énoncés : exercice 2.25 · Poly 2026-2027, p. 52</p>
