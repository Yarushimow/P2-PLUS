---
title: "Ch. 3 — Tests statistiques"
---

# Chapitre 3 — Statistiques inférentielles : les tests

=== "Version simplifiée"

    Une différence observée sur un échantillon peut venir du **hasard de l'échantillonnage**.
    Un test d'hypothèse dit, avec un risque d'erreur fixé à l'avance, si cette différence est
    **significative**. Ce cours ne traite que des tests **paramétriques** (on suppose une loi
    normale, ou approchable par une loi normale).

    ## Le principe

    !!! definition "Les deux hypothèses"
        - $H_0$, **hypothèse nulle** : « pas de différence » (les écarts viennent des fluctuations d'échantillonnage). C'est elle qu'on teste.
        - $H_1$, **hypothèse alternative** : ce qu'on soupçonne (« différent », « supérieur », « inférieur », « dépendant »).

        On **rejette** $H_0$ ou on **ne la rejette pas**. Ne pas rejeter $H_0$ ne prouve pas qu'elle est vraie,
        et la rejeter ne prouve pas $H_1$.

    | | $H_0$ vraie | $H_1$ vraie |
    |---|---|---|
    | On ne rejette pas $H_0$ | $1 - \alpha$ (**confiance**) | $\beta$ : erreur de 2e espèce (faux négatif) |
    | On rejette $H_0$ | $\alpha$ : erreur de 1re espèce (faux positif) | $1 - \beta$ (**puissance**) |

    Exemple médical : $H_0$ = « pas malade ». Un faux positif (non malade déclaré malade) est une erreur $\alpha$ ;
    un malade non détecté est une erreur $\beta$.

    !!! definition "Bilatéral ou unilatéral"
        - **Bilatéral** (« différent ») : zone de non-rejet $[-z_\alpha, z_\alpha]$, le risque est partagé des deux côtés.
        - **Unilatéral** (« supérieur » ou « inférieur ») : un seul **seuil**, tout le risque est d'un côté.
          On lit la table avec $2\alpha$ en bilatéral : à 5 % unilatéral, le seuil est **1,645** (et non 1,96).
          Pour « inférieur », le seuil est négatif : on rejette si le critère est **plus négatif** que $-1{,}645$.

    !!! methode "Les 5 étapes d'un test"
        1. Poser $H_0$ et $H_1$ (et choisir bilatéral ou unilatéral d'après la question).
        2. Donner la loi de la statistique sous $H_0$ **et vérifier les conditions de validité**.
        3. Pour le risque $\alpha$, trouver la région critique : intervalle (bilatéral) ou seuil (unilatéral).
        4. Calculer le **critère** à partir des données.
        5. Conclure par une phrase : « on rejette / on ne rejette pas $H_0$ au risque $\alpha$ », puis traduire en langage courant.

    ## Tests de conformité

    On compare un échantillon à une **valeur de référence** connue.

    !!! theoreme "Conformité d'une proportion"
        $H_0 : \pi = p$. Conditions : $n \ge 30$, $np \ge 5$, $n(1 - p) \ge 5$. Critère :

        $$
        z = \frac{p_0 - p}{\sqrt{\dfrac{p(1 - p)}{n}}} \quad \text{sous } H_0,\ z \sim \mathcal N(0, 1)
        $$

        Attention : au dénominateur, c'est le $p$ **de référence**, pas $p_0$.

    Exemple du poly : 80 % de passage dans la classe ($n = 40$) contre 70 % dans la promo. Est-ce significativement supérieur, à 5 % ?
    Unilatéral, seuil 1,645. $z = \frac{0{,}8 - 0{,}7}{\sqrt{0{,}7 \times 0{,}3/40}} \approx 1{,}38 < 1{,}645$ : on ne rejette pas $H_0$.

    !!! theoreme "Conformité d'une moyenne"
        $H_0 : m = \mu$. Condition : $n \ge 30$ (ou $X$ normale).

        $$
        t = \frac{\bar x - \mu}{\sigma_e/\sqrt n} \quad \text{sous } H_0,\ t \sim T(n - 1)
        $$

        Si $\sigma$ est **connu**, on le prend à la place de $\sigma_e$ et le critère suit $\mathcal N(0, 1)$.

    Exemple : classe de 40, moyenne 12,4 contre 13,1 pour la promo, variance estimée 0,8, bilatéral à 5 % :
    $t = \frac{12{,}4 - 13{,}1}{\sqrt{0{,}8/40}} \approx -4{,}95 \notin [-2{,}021;\ 2{,}021]$ → on rejette $H_0$ : la moyenne de la classe est significativement différente.

    ## Tests du $\chi^2$

    Ils comparent des **distributions** (plus de deux modalités, données qualitatives possibles). Ils sont toujours **unilatéraux** :
    on rejette $H_0$ si le critère **dépasse** le seuil de la table du $\chi^2$.

    !!! theoreme "$\chi^2$ de conformité (ajustement)"
        $H_0$ : les données suivent la loi $L$. Avec $k$ classes, des effectifs observés $o_i$ et des effectifs **théoriques** $n_i = n \cdot P(X \in \text{classe } i)$ :

        $$
        \chi^2 = \sum_{i=1}^k \frac{(o_i - n_i)^2}{n_i} \qquad \text{ddl} = k - 1
        $$

        Conditions : $n \ge 50$ et tous les $n_i \ge 5$.

    Exemple : 600 lancers de dé (89, 108, 105, 94, 95, 109), 100 attendus par face, $\chi^2 = 3{,}52$.
    Le seuil à 5 ddl et 5 % est 11,07 : on ne rejette pas « le dé est équilibré ».

    !!! piege "Erreur de calcul dans le poly"
        Le poly écrit le premier terme $(98 - 100)^2$ au lieu de $(89 - 100)^2$ et trouve $\chi^2 = 2{,}39$.
        Le bon calcul donne $\frac{121 + 64 + 25 + 36 + 25 + 81}{100} = 3{,}52$. La conclusion ne change pas.

    !!! theoreme "$\chi^2$ d'indépendance"
        $H_0$ : les variables $X$ ($k_1$ modalités) et $Y$ ($k_2$ modalités) sont indépendantes.
        Dans le tableau de contingence, on calcule les **effectifs marginaux** (totaux de ligne $o_{i\bullet}$ et de colonne $o_{\bullet j}$), puis :

        $$
        n_{ij} = \frac{o_{i\bullet} \times o_{\bullet j}}{n} \qquad
        \chi^2 = \sum_{i,j} \frac{(o_{ij} - n_{ij})^2}{n_{ij}} \qquad \text{ddl} = (k_1 - 1)(k_2 - 1)
        $$

        Conditions : $n \ge 50$ et tous les $n_{ij} \ge 5$.

    ## Résumé

    | Test | Loi sous $H_0$ | Critère | Conditions |
    |---|---|---|---|
    | Moyenne, $\sigma$ inconnu | Student $T(n-1)$ | $t = \frac{\bar x - \mu}{\sigma_e/\sqrt n}$ | $n \ge 30$ ou $X$ normale |
    | Moyenne, $\sigma$ connu | $\mathcal N(0, 1)$ | $z = \frac{\bar x - \mu}{\sigma/\sqrt n}$ | $n \ge 30$ ou $X$ normale |
    | Proportion | $\mathcal N(0, 1)$ | $z = \frac{p_0 - p}{\sqrt{p(1-p)/n}}$ | $n \ge 30$, $np \ge 5$, $n(1-p) \ge 5$ |
    | $\chi^2$ de conformité | $\chi^2(k - 1)$ | $\sum \frac{(o_i - n_i)^2}{n_i}$ | $n \ge 50$, $n_i \ge 5$ |
    | $\chi^2$ d'indépendance | $\chi^2((k_1-1)(k_2-1))$ | $\sum \frac{(o_{ij} - n_{ij})^2}{n_{ij}}$ | $n \ge 50$, $n_{ij} \ge 5$ |

    !!! tip "Deux résultats vus au DE 2026"
        - La **p-valeur** est le risque à partir duquel la conclusion bascule : on rejette $H_0$ dès que $\alpha$ dépasse la p-valeur.
        - Pour 2 modalités, le test de proportion bilatéral et le $\chi^2$ de conformité sont **le même test** : $z^2 = \chi^2$ et $z_\alpha^2 = \chi^2_{1,\alpha}$ (par exemple $1{,}96^2 = 3{,}84$).

=== "Version papier"

    Le chapitre 3 du polycopié 2025-2026 (les exercices sont dans le [TD 3](../td/td-3-tests.md)).

    <!-- papier: pdf/SM403P/poly.pdf | Poly 2025-2026 | ch3 | page | 41-56 -->

    [![Poly 2025-2026, page 41 : Chapitre 3](papier/ch3/p41.jpg){ loading=lazy .papier }](papier/ch3/p41.jpg)
    <p class="papier-legende">Chapitre 3 · Poly 2025-2026, page 41</p>

    [![Poly 2025-2026, page 42 : 3.2. LE PRINCIPE DES TESTS](papier/ch3/p42.jpg){ loading=lazy .papier }](papier/ch3/p42.jpg)
    <p class="papier-legende">3.2. LE PRINCIPE DES TESTS · Poly 2025-2026, page 42</p>

    [![Poly 2025-2026, page 43 : 3.2. LE PRINCIPE DES TESTS](papier/ch3/p43.jpg){ loading=lazy .papier }](papier/ch3/p43.jpg)
    <p class="papier-legende">3.2. LE PRINCIPE DES TESTS · Poly 2025-2026, page 43</p>

    [![Poly 2025-2026, page 44 : 3.2. LE PRINCIPE DES TESTS](papier/ch3/p44.jpg){ loading=lazy .papier }](papier/ch3/p44.jpg)
    <p class="papier-legende">3.2. LE PRINCIPE DES TESTS · Poly 2025-2026, page 44</p>

    [![Poly 2025-2026, page 45 : 3.2. LE PRINCIPE DES TESTS](papier/ch3/p45.jpg){ loading=lazy .papier }](papier/ch3/p45.jpg)
    <p class="papier-legende">3.2. LE PRINCIPE DES TESTS · Poly 2025-2026, page 45</p>

    [![Poly 2025-2026, page 46 : 3.2. LE PRINCIPE DES TESTS](papier/ch3/p46.jpg){ loading=lazy .papier }](papier/ch3/p46.jpg)
    <p class="papier-legende">3.2. LE PRINCIPE DES TESTS · Poly 2025-2026, page 46</p>

    [![Poly 2025-2026, page 47 : 3.3. UN PEU D’ÉPISTÉMOLOGIE : LA MÉTHODE SCIENTIFIQUE](papier/ch3/p47.jpg){ loading=lazy .papier }](papier/ch3/p47.jpg)
    <p class="papier-legende">3.3. UN PEU D’ÉPISTÉMOLOGIE : LA MÉTHODE SCIENTIFIQUE · Poly 2025-2026, page 47</p>

    [![Poly 2025-2026, page 48 : 3.4. LES TESTS](papier/ch3/p48.jpg){ loading=lazy .papier }](papier/ch3/p48.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 48</p>

    [![Poly 2025-2026, page 49 : 3.4. LES TESTS](papier/ch3/p49.jpg){ loading=lazy .papier }](papier/ch3/p49.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 49</p>

    [![Poly 2025-2026, page 50 : 3.4. LES TESTS](papier/ch3/p50.jpg){ loading=lazy .papier }](papier/ch3/p50.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 50</p>

    [![Poly 2025-2026, page 51 : 3.4. LES TESTS](papier/ch3/p51.jpg){ loading=lazy .papier }](papier/ch3/p51.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 51</p>

    [![Poly 2025-2026, page 52 : 3.4. LES TESTS](papier/ch3/p52.jpg){ loading=lazy .papier }](papier/ch3/p52.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 52</p>

    [![Poly 2025-2026, page 53 : 3.4. LES TESTS](papier/ch3/p53.jpg){ loading=lazy .papier }](papier/ch3/p53.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 53</p>

    [![Poly 2025-2026, page 54 : 3.4. LES TESTS](papier/ch3/p54.jpg){ loading=lazy .papier }](papier/ch3/p54.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 54</p>

    [![Poly 2025-2026, page 55 : 3.4. LES TESTS](papier/ch3/p55.jpg){ loading=lazy .papier }](papier/ch3/p55.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 55</p>

    [![Poly 2025-2026, page 56 : 3.4. LES TESTS](papier/ch3/p56.jpg){ loading=lazy .papier }](papier/ch3/p56.jpg)
    <p class="papier-legende">3.4. LES TESTS · Poly 2025-2026, page 56</p>

    <!-- /papier -->
