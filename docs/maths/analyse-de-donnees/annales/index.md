---
title: Annales
---

# Annales

=== "Version simplifiée"

    Les deux épreuves de 2025-2026 : le **CE** (55 min, mars) et le **DE** (1 h 50, juin), avec mes
    corrections. Les tables statistiques sont fournies en annexe du sujet (elles sont aussi dans la
    [fiche](../fiches/fiche-analyse-donnees.md#tables-statistiques)). Deux autres exercices de DE sont dans le poly :
    l'exercice 21 (DE 2025, [TD 3](../td/td-3-tests.md)) et l'exercice 26 (DE 2024, [TD 4](../td/td-4-acp.md)).

    !!! methode "Ce qui tombe"
        - **CE** : régression après changement de variable, paramètres d'une variable ($Me$, mode, étendue, $S_k$), intervalle de pari.
        - **DE** : un test de moyenne (avec la nuance $\sigma$ connu / estimé), une ACP à la main sur $2 \times 2$, un $\chi^2$ d'indépendance,
          et une question de cours plus théorique (une démonstration).

    ## CE 2025-2026

    ### Exercice 1 — Bille dans un fluide (12 points)

    $v(t) = v_\infty\tanh(at + b)$, mesures $v = 0;\ 3{,}6;\ 5{,}7;\ 6{,}9;\ 7{,}6$ m/s pour $t = 0$ à 4 s.

    ??? success "Correction"
        1- La vitesse augmente vite puis de moins en moins : elle tend vers une **vitesse limite** (vers 9 m/s). Pas d'ajustement affine.

        2- $n_i = \text{arctanh}(v_i/9)$ :

        | $t_i$ | 0 | 1 | 2 | 3 | 4 |
        |---|---|---|---|---|---|
        | $n_i$ | 0 | 0,42 | 0,75 | 1,01 | 1,24 |

        3- Ce nuage est presque aligné : on peut faire une régression linéaire de $n$ en $t$.

        4- $\bar t = 2$, $\overline{t^2} = 6$, $\bar n \approx 0{,}684$, $\overline{tn} \approx 1{,}980$, donc
        $k = \frac{\overline{tn} - \bar t\,\bar n}{\overline{t^2} - \bar t^2} \approx 0{,}306$ et $n_0 = \bar n - k\bar t \approx 0{,}072$ : $\;n \approx 0{,}306\,t + 0{,}072$.

        5- $v(t) \approx 9\tanh(0{,}306\,t + 0{,}072)$ m/s.

        6- Le 9 est la **vitesse limite** $v_\infty$ : $\tanh \to 1$ quand $t \to +\infty$.

        7- Développements limités : $e^x - e^{-x} = 2x + O(x^3)$ et $e^x + e^{-x} = 2 + O(x^2)$, donc $\tanh x = x + O(x^3)$.
        Aux premières secondes : $v(t) \approx 9(0{,}306\,t + 0{,}072) \approx 2{,}75\,t + 0{,}64$ m/s.

        !!! note "Écart avec le corrigé officiel"
            Le corrigé donne $n \approx 0{,}304\,t + 0{,}074$ : il utilise $n_4 = 1{,}22$ dans les calculs alors que son tableau indique 1,24
            (la bonne valeur : $\text{arctanh}(7{,}6/9) \approx 1{,}236$). L'écart est minime.

    ### Exercice 2 — Quatre individus, trois variables (4 points)

    ??? success "Correction"
        1- $M = \begin{pmatrix} 15 & 12 & 17 \\ 10 & 7 & 13 \\ 8 & 3 & 10 \\ 15 & 8 & 15 \end{pmatrix}$.

        2- $X_1$ classée : 8, 10, 15, 15 → médiane $\frac{10 + 15}{2} = 12{,}5$, mode 15, étendue 7.

        3- $\bar x_1 = 12$ ; écarts $3, -2, -4, 3$ ; $\sigma^2 = \frac{9 + 4 + 16 + 9}{4} = 9{,}5$ ; $\sum(x_i - \bar x)^3 = 27 - 8 - 64 + 27 = -18$.
        $S_k = \frac{-18/4}{9{,}5^{3/2}} \approx -0{,}154$ : distribution légèrement **étalée à gauche** (la valeur 8 tire vers le bas).

    ### Exercice 3 — Intervalle de pari d'une proportion (4 points)

    ??? success "Correction"
        $p = 0{,}35$, $n = 200$ : $n \ge 30$, $np = 70 \ge 5$, $n(1-p) = 130 \ge 5$. Au risque 1 %, $z = 2{,}576$ :

        $$
        I = 0{,}35 \pm 2{,}576\sqrt{\frac{0{,}35 \times 0{,}65}{200}} \approx [0{,}263;\ 0{,}437].
        $$

    ## DE 2025-2026

    ### Exercice 1 — Autour de la variance et du risque (6 points)

    $\mu = 100\ \Omega$ annoncé, $n = 40$, $\bar x = 99{,}1\ \Omega$, test « inférieur » à 5 %.

    ??? success "Correction"
        1- $H_0 : m = 100$ ; $H_1 : m < 100$ (unilatéral à gauche).

        2- **Cas A, $\sigma = 3$ connu** : $n \ge 30$ et $\sigma$ connu → loi normale. $z = \frac{99{,}1 - 100}{3/\sqrt{40}} \approx -1{,}90$.
        Seuil unilatéral : $-1{,}645$. $-1{,}90 < -1{,}645$ : on **rejette** $H_0$.

        3- **Cas B, $\sigma$ observé = 3** :

        - (a) On estime $\sigma_e = 3\sqrt{\frac{40}{39}} \approx 3{,}04$ → loi de Student à 39 ddl.
        - (b) Seuil $t_{39;\,5\%\text{ unilatéral}} \approx 1{,}684$ (plus grand que 1,645 : la loi de Student a des queues plus épaisses).
          $t = \frac{-0{,}9}{3{,}04/\sqrt{40}} \approx -1{,}87 < -1{,}684$ : on **rejette** encore $H_0$.
        - (c) $|t| = 1{,}87$ est entre 1,684 (5 %) et 2,021 (2,5 %) dans la table à 40 ddl : la conclusion bascule pour un risque
          $\alpha_c$ entre 2,5 % et 5 % (le calcul exact donne 3,4 %). C'est la **p-valeur**.
        - (d) On cherche $n$ tel que $\frac{0{,}9}{3{,}04/\sqrt n} = 1{,}684$, soit $\sqrt n \approx 5{,}69$ et $n_c \approx 32{,}3$.
          $n$ est entier : à partir de **33** composants on rejette $H_0$, avec 32 ou moins on ne la rejette pas.

    ### Exercice 2 — Un peu d'ACP (5 points)

    ??? success "Correction"
        1- (a) $\det(R - \lambda I) = (1 - \lambda)^2 - \rho^2 = 0$ → $\lambda_1 = 1 + \rho$, $\lambda_2 = 1 - \rho$.
        (b) $\text{qge}(1) = \frac{1 + \rho}{2}$, $\text{qge}(2) = \frac{1 - \rho}{2}$.
        (c) $\text{qge}(1) = 100\,\%$ pour $\rho = 1$ : les points centrés réduits sont **alignés** sur la droite $y = x$.

        2- (a) $Ru = (1 + \rho)u$ donne $a = b$, d'où $u_1 = \frac{1}{\sqrt2}(1, 1)$ ; $\lambda_2$ donne $a = -b$, d'où $u_2 = \frac{1}{\sqrt2}(-1, 1)$.
        (b) ${}^tP\,P = I$, donc ${}^tP = P^{-1}$. $P = \begin{pmatrix} \cos\frac\pi4 & -\sin\frac\pi4 \\ \sin\frac\pi4 & \cos\frac\pi4 \end{pmatrix}$ : c'est la **rotation d'angle 45°**.

        3- $F = M_sP$ donc $M_s = F\,{}^tP$ :

        $$
        M_s = \begin{pmatrix} 2 & 0 \\ -1 & 1 \\ 0 & -2 \end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix} 1 & 1 \\ -1 & 1 \end{pmatrix}
        = \begin{pmatrix} \sqrt2 & \sqrt2 \\ -\sqrt2 & 0 \\ \sqrt2 & -\sqrt2 \end{pmatrix}.
        $$

        4- $S = PD^{1/2} = \begin{pmatrix} \sqrt{\frac{1 + \rho}{2}} & -\sqrt{\frac{1 - \rho}{2}} \\ \sqrt{\frac{1 + \rho}{2}} & \sqrt{\frac{1 - \rho}{2}} \end{pmatrix}$.

    ### Exercice 3 — Formation et réussite (5 points)

    ??? success "Correction"
        1- $H_0$ : formation et réussite sont **indépendantes** ; $H_1$ : elles sont dépendantes.

        2- Marges : lignes 80, 60, 60 ; colonnes 110 (réussi), 90 (échoué) ; $n = 200$.

        | | Réussi | Échoué |
        |---|---|---|
        | Présentiel | 44 | 36 |
        | Distanciel | 33 | 27 |
        | Hybride | 33 | 27 |

        $n = 200 \ge 50$ et tous les effectifs théoriques $\ge 5$ : le test est valide.

        3- $(3 - 1)(2 - 1) = 2$ ddl.

        4- $\chi^2 = \frac{16}{44} + \frac{16}{36} + \frac{144}{33} + \frac{144}{27} + \frac{64}{33} + \frac{64}{27} \approx 14{,}81$.

        5- Seuil à 2 ddl et 5 % : 5,99. $14{,}81 > 5{,}99$ : on **rejette** l'indépendance. La méthode de révision est associée
        à la réussite (le distanciel seul réussit le moins bien, l'hybride le mieux). Association ne veut pas dire causalité.

        !!! note "Arrondi du corrigé officiel"
            Le corrigé trouve 14,96 parce qu'il a additionné des termes arrondis ($4{,}364 + 5{,}333 + \dots$). La somme exacte vaut 14,81 :
            la conclusion est la même.

    ### Exercice 4 — Test de proportion et $\chi^2$ (4 points)

    ??? success "Correction"
        Avec $o_1$ succès sur $n$, $n_1 = np$ et $n_2 = n(1 - p)$. Comme $o_2 - n_2 = (n - o_1) - n(1-p) = -(o_1 - np)$ :

        $$
        \chi^2 = \frac{(o_1 - np)^2}{np} + \frac{(o_1 - np)^2}{n(1 - p)} = \frac{(o_1 - np)^2}{np(1 - p)}
        \qquad
        z = \frac{o_1/n - p}{\sqrt{p(1 - p)/n}} = \frac{o_1 - np}{\sqrt{np(1 - p)}}.
        $$

        Donc $z^2 = \chi^2$. Le test bilatéral ne rejette pas $H_0$ si $|z| \le z_\alpha$, c'est-à-dire $\chi^2 = z^2 \le z_\alpha^2$ ;
        le test du $\chi^2$ ne la rejette pas si $\chi^2 \le \chi^2_{1,\alpha}$. Les deux tests sont identiques, donc $z_\alpha^2 = \chi^2_{1,\alpha}$
        (par exemple $1{,}96^2 = 3{,}84$ à 5 %).

=== "Version papier"

    Le CE 2025-2026 et sa correction, puis le DE 2025-2026 et sa correction (sans les pages de tables, qui sont dans la fiche).

    <!-- papier: pdf/SM403P/ce.pdf | CE 2025-2026 — sujet | ce2526 | page | 1-6 -->

    [![CE 2025-2026 — sujet, page 1 : Ne rien inscrire dans ce cadre](papier/ce2526/p01.jpg){ loading=lazy .papier }](papier/ce2526/p01.jpg)
    <p class="papier-legende">Ne rien inscrire dans ce cadre · CE 2025-2026 — sujet, page 1</p>

    [![CE 2025-2026 — sujet, page 2 : INSTRUCTIONS :](papier/ce2526/p02.jpg){ loading=lazy .papier }](papier/ce2526/p02.jpg)
    <p class="papier-legende">INSTRUCTIONS : · CE 2025-2026 — sujet, page 2</p>

    [![CE 2025-2026 — sujet, page 3 : 3- Tracez le nuage de points (ti , ni ). Que pouvez-vous en déduire ?](papier/ce2526/p03.jpg){ loading=lazy .papier }](papier/ce2526/p03.jpg)
    <p class="papier-legende">3- Tracez le nuage de points (ti , ni ). Que pouvez-vous en déduire ? · CE 2025-2026 — sujet, page 3</p>

    [![CE 2025-2026 — sujet, page 4 : 5- En déduire une expression approchée de v(t).](papier/ce2526/p04.jpg){ loading=lazy .papier }](papier/ce2526/p04.jpg)
    <p class="papier-legende">5- En déduire une expression approchée de v(t). · CE 2025-2026 — sujet, page 4</p>

    [![CE 2025-2026 — sujet, page 5 : Exercice 2 : comprendre des données (4 points)](papier/ce2526/p05.jpg){ loading=lazy .papier }](papier/ce2526/p05.jpg)
    <p class="papier-legende">Exercice 2 : comprendre des données (4 points) · CE 2025-2026 — sujet, page 5</p>

    [![CE 2025-2026 — sujet, page 6 : Exercice 3 : Estimation d’une proportion (4 points)](papier/ce2526/p06.jpg){ loading=lazy .papier }](papier/ce2526/p06.jpg)
    <p class="papier-legende">Exercice 3 : Estimation d’une proportion (4 points) · CE 2025-2026 — sujet, page 6</p>

    <!-- /papier -->

    <!-- papier: pdf/SM403P/ce-3.pdf | CE 2025-2026 — correction | ce2526-corr | page -->

    [![CE 2025-2026 — correction, page 1 : Eléments de correction du CE d’Analyse de données](papier/ce2526-corr/p01.jpg){ loading=lazy .papier }](papier/ce2526-corr/p01.jpg)
    <p class="papier-legende">Eléments de correction du CE d’Analyse de données · CE 2025-2026 — correction, page 1</p>

    [![CE 2025-2026 — correction, page 2 : Corrigé :](papier/ce2526-corr/p02.jpg){ loading=lazy .papier }](papier/ce2526-corr/p02.jpg)
    <p class="papier-legende">Corrigé : · CE 2025-2026 — correction, page 2</p>

    [![CE 2025-2026 — correction, page 3 : tanh(x) =](papier/ce2526-corr/p03.jpg){ loading=lazy .papier }](papier/ce2526-corr/p03.jpg)
    <p class="papier-legende">tanh(x) = · CE 2025-2026 — correction, page 3</p>

    [![CE 2025-2026 — correction, page 4 : Corrigé : n ≥ 30, np ≥ 5 et n(1 − p) ≥ 5, ainsi l’intervalle de pari à 99% pour la proport…](papier/ce2526-corr/p04.jpg){ loading=lazy .papier }](papier/ce2526-corr/p04.jpg)
    <p class="papier-legende">Corrigé : n ≥ 30, np ≥ 5 et n(1 − p) ≥ 5, ainsi l’intervalle de pari à 99% pour la proport… · CE 2025-2026 — correction, page 4</p>

    <!-- /papier -->

    <!-- papier: pdf/SM403P/de-2026.pdf | DE 2025-2026 — sujet | de2526 | page | 1-10 -->

    [![DE 2025-2026 — sujet, page 1 : Ne rien inscrire dans ce cadre](papier/de2526/p01.jpg){ loading=lazy .papier }](papier/de2526/p01.jpg)
    <p class="papier-legende">Ne rien inscrire dans ce cadre · DE 2025-2026 — sujet, page 1</p>

    [![DE 2025-2026 — sujet, page 2 : INSTRUCTIONS :](papier/de2526/p02.jpg){ loading=lazy .papier }](papier/de2526/p02.jpg)
    <p class="papier-legende">INSTRUCTIONS : · DE 2025-2026 — sujet, page 2</p>

    [![DE 2025-2026 — sujet, page 3 : 3- Cas B : On suppose dorénavant que l’on ne connaît plus σ, mais que l’écart-type est obs…](papier/de2526/p03.jpg){ loading=lazy .papier }](papier/de2526/p03.jpg)
    <p class="papier-legende">3- Cas B : On suppose dorénavant que l’on ne connaît plus σ, mais que l’écart-type est obs… · DE 2025-2026 — sujet, page 3</p>

    [![DE 2025-2026 — sujet, page 4 : (c) Si maintenant on bouge la valeur du risque, quelle valeur critique αc du risque fait b…](papier/de2526/p04.jpg){ loading=lazy .papier }](papier/de2526/p04.jpg)
    <p class="papier-legende">(c) Si maintenant on bouge la valeur du risque, quelle valeur critique αc du risque fait b… · DE 2025-2026 — sujet, page 4</p>

    [![DE 2025-2026 — sujet, page 5 : (b) Calculer la qge (qualité globale d’explication) de chaque axe propre en fonction de ρ.](papier/de2526/p05.jpg){ loading=lazy .papier }](papier/de2526/p05.jpg)
    <p class="papier-legende">(b) Calculer la qge (qualité globale d’explication) de chaque axe propre en fonction de ρ. · DE 2025-2026 — sujet, page 5</p>

    [![DE 2025-2026 — sujet, page 6 : (b) Justifier que P est une matrice orthogonale, c’est-à-dire que sa transposée P t (parfo…](papier/de2526/p06.jpg){ loading=lazy .papier }](papier/de2526/p06.jpg)
    <p class="papier-legende">(b) Justifier que P est une matrice orthogonale, c’est-à-dire que sa transposée P t (parfo… · DE 2025-2026 — sujet, page 6</p>

    [![DE 2025-2026 — sujet, page 7 : 3- Soit F la matrice des données pour trois individus, dans la base propre (nouvelle base)…](papier/de2526/p07.jpg){ loading=lazy .papier }](papier/de2526/p07.jpg)
    <p class="papier-legende">3- Soit F la matrice des données pour trois individus, dans la base propre (nouvelle base)… · DE 2025-2026 — sujet, page 7</p>

    [![DE 2025-2026 — sujet, page 8 : Exercice 3 : Une étude sur la formation (5 points)](papier/de2526/p08.jpg){ loading=lazy .papier }](papier/de2526/p08.jpg)
    <p class="papier-legende">Exercice 3 : Une étude sur la formation (5 points) · DE 2025-2026 — sujet, page 8</p>

    [![DE 2025-2026 — sujet, page 9 : 3- Calculer le nombre de degrés de liberté (ddl) associés à ce problème.](papier/de2526/p09.jpg){ loading=lazy .papier }](papier/de2526/p09.jpg)
    <p class="papier-legende">3- Calculer le nombre de degrés de liberté (ddl) associés à ce problème. · DE 2025-2026 — sujet, page 9</p>

    [![DE 2025-2026 — sujet, page 10 : 4- Calculer la valeur du critère du test χ2 .](papier/de2526/p10.jpg){ loading=lazy .papier }](papier/de2526/p10.jpg)
    <p class="papier-legende">4- Calculer la valeur du critère du test χ2 . · DE 2025-2026 — sujet, page 10</p>

    <!-- /papier -->

    <!-- papier: pdf/SM403P/de-2026-corrige.pdf | DE 2025-2026 — correction | de2526-corr | page | 1-5 -->

    [![DE 2025-2026 — correction, page 1 : Eléments de correction du DE d’Analyse de données](papier/de2526-corr/p01.jpg){ loading=lazy .papier }](papier/de2526-corr/p01.jpg)
    <p class="papier-legende">Eléments de correction du DE d’Analyse de données · DE 2025-2026 — correction, page 1</p>

    [![DE 2025-2026 — correction, page 2 : Exercice 2 : Un peu d’ACP (5 points)](papier/de2526-corr/p02.jpg){ loading=lazy .papier }](papier/de2526-corr/p02.jpg)
    <p class="papier-legende">Exercice 2 : Un peu d’ACP (5 points) · DE 2025-2026 — correction, page 2</p>

    [![DE 2025-2026 — correction, page 3 : 3- On a F = Ms P , d’où F P −1 = Ms . Comme P −1 = P t , on obtient la formule de reconstr…](papier/de2526-corr/p03.jpg){ loading=lazy .papier }](papier/de2526-corr/p03.jpg)
    <p class="papier-legende">3- On a F = Ms P , d’où F P −1 = Ms . Comme P −1 = P t , on obtient la formule de reconstr… · DE 2025-2026 — correction, page 3</p>

    [![DE 2025-2026 — correction, page 4 : 2- Pour calculer les effectifs théoriques, nous devons d’abord déterminer les effectifs ma…](papier/de2526-corr/p04.jpg){ loading=lazy .papier }](papier/de2526-corr/p04.jpg)
    <p class="papier-legende">2- Pour calculer les effectifs théoriques, nous devons d’abord déterminer les effectifs ma… · DE 2025-2026 — correction, page 4</p>

    [![DE 2025-2026 — correction, page 5 : Exercice 4 : Un lien entre le test de proportion et le χ2 (4 points)](papier/de2526-corr/p05.jpg){ loading=lazy .papier }](papier/de2526-corr/p05.jpg)
    <p class="papier-legende">Exercice 4 : Un lien entre le test de proportion et le χ2 (4 points) · DE 2025-2026 — correction, page 5</p>

    <!-- /papier -->
