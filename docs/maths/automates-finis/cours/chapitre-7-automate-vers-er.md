---
title: "Ch. 7 — Automate → expression rationnelle"
---

# Chapitre 7 — Trouver l'expression rationnelle d'un automate

=== "Version simplifiée"

    Deux méthodes algorithmiques. Elles peuvent donner des ER d'aspect différent, mais **équivalentes**.
    Pour vérifier que deux ER sont équivalentes : construire leurs automates, déterminiser, minimiser, et comparer.

    ## Méthode de l'arrivée (système d'équations)

    Pour chaque état $q$, on note $X_q$ le langage des mots qui **arrivent** en $q$ depuis une entrée.

    !!! methode "Écrire les équations"
        - Pour chaque flèche $p \xrightarrow{a} q$, $X_q$ contient $X_pa$ (la lettre est à **droite**).
        - Si $q$ est une **entrée**, $X_q$ contient $\varepsilon$.
        - $X_q$ est la **somme** de tous ces termes.
        - Le langage de l'automate est la **somme** des $X_t$ pour les états terminaux $t$.

    !!! theoreme "Lemme d'Arden"
        Si $\varepsilon \notin Y$, l'équation $X = XY + Z$ a pour unique solution $X = ZY^*$.

        (Dans la méthode de l'arrivée, l'inconnue est à **gauche** du facteur : $X = XY + Z$ donne $ZY^*$, et non $Y^*Z$.)

    **Exemple du cours** : $1 \xrightarrow{b} 1$, $1 \xrightarrow{a} 2$, $2 \xrightarrow{a} 2$, $2 \xrightarrow{b} 3$, $3 \xrightarrow{b} 1$, entrée 1, sortie 3.

    $$
    \begin{cases} X_1 = X_1b + X_3b + \varepsilon \\ X_2 = X_1a + X_2a \\ X_3 = X_2b \end{cases}
    $$

    Arden sur la 2e : $X_2 = X_1aa^*$. Donc $X_3 = X_1aa^*b$ et $X_1 = X_1(b + aa^*bb) + \varepsilon$, d'où $X_1 = (b + aa^*bb)^*$ et

    $$
    L = X_3 = (b + aa^*bb)^*aa^*b.
    $$

    !!! piege "Ne jamais mélanger avec la méthode du départ"
        Il existe une méthode « du départ » (langages des mots qui **partent** d'un état), où les lettres sont à gauche.
        Les deux marchent, mais mélanger les conventions donne des résultats faux. Le cours utilise la méthode de l'arrivée.

    ## Méthode d'élimination d'états

    On travaille sur un **automate généralisé** dont les flèches portent des ER.

    !!! methode "Algorithme"
        1. Ajouter un état $i$ avec $i \xrightarrow{\varepsilon}$ chaque entrée, et un état $t$ avec chaque sortie $\xrightarrow{\varepsilon} t$.
        2. Éliminer les autres états **un par un** (dans n'importe quel ordre). Pour éliminer $G$ avec une boucle $Z$ :
           chaque chemin $A \xrightarrow{X} G \xrightarrow{Y} B$ devient $A \xrightarrow{XZ^*Y} B$.
        3. Deux flèches parallèles $A \xrightarrow{U} B$ et $A \xrightarrow{V} B$ fusionnent en $A \xrightarrow{U + V} B$.
        4. À la fin, l'ER sur la flèche $i \to t$ est le langage.

    Sur l'exemple : éliminer 3, puis 2, puis 1 redonne $(b + aa^*bb)^*aa^*b$.

=== "Version papier"

    Les diapos du CTD 7.

    <!-- papier: pdf/SM402P/ctd7.pdf | CTD 7 — Automate fini vers ER | ctd7 | diapo -->

    [![CTD 7 — Automate fini vers ER, diapo 1 : Automate fini ER](papier/ctd7/p01.jpg){ loading=lazy .papier }](papier/ctd7/p01.jpg)
    <p class="papier-legende">Automate fini ER · CTD 7 — Automate fini vers ER, diapo 1</p>

    [![CTD 7 — Automate fini vers ER, diapo 2 : Automate fini  Expression rationnelle](papier/ctd7/p02.jpg){ loading=lazy .papier }](papier/ctd7/p02.jpg)
    <p class="papier-legende">Automate fini  Expression rationnelle · CTD 7 — Automate fini vers ER, diapo 2</p>

    [![CTD 7 — Automate fini vers ER, diapo 3 : Méthode de l’arrivée](papier/ctd7/p03.jpg){ loading=lazy .papier }](papier/ctd7/p03.jpg)
    <p class="papier-legende">Méthode de l’arrivée · CTD 7 — Automate fini vers ER, diapo 3</p>

    [![CTD 7 — Automate fini vers ER, diapo 4 : Le langage de l’automate est la somme des langages de ses états terminaux.](papier/ctd7/p04.jpg){ loading=lazy .papier }](papier/ctd7/p04.jpg)
    <p class="papier-legende">Le langage de l’automate est la somme des langages de ses états terminaux. · CTD 7 — Automate fini vers ER, diapo 4</p>

    [![CTD 7 — Automate fini vers ER, diapo 5 : Lemme d&#x27;Arden, sans démonstration](papier/ctd7/p05.jpg){ loading=lazy .papier }](papier/ctd7/p05.jpg)
    <p class="papier-legende">Lemme d&#x27;Arden, sans démonstration · CTD 7 — Automate fini vers ER, diapo 5</p>

    [![CTD 7 — Automate fini vers ER, diapo 6 : Interprétation: si vous avez une équation où l’inconnue X figure et à gauche et](papier/ctd7/p06.jpg){ loading=lazy .papier }](papier/ctd7/p06.jpg)
    <p class="papier-legende">Interprétation: si vous avez une équation où l’inconnue X figure et à gauche et · CTD 7 — Automate fini vers ER, diapo 6</p>

    [![CTD 7 — Automate fini vers ER, diapo 7 : En appliquant les règles formulées tout à l’heure, on obtient un système](papier/ctd7/p07.jpg){ loading=lazy .papier }](papier/ctd7/p07.jpg)
    <p class="papier-legende">En appliquant les règles formulées tout à l’heure, on obtient un système · CTD 7 — Automate fini vers ER, diapo 7</p>

    [![CTD 7 — Automate fini vers ER, diapo 8 : Exemple 1 (cont.)](papier/ctd7/p08.jpg){ loading=lazy .papier }](papier/ctd7/p08.jpg)
    <p class="papier-legende">Exemple 1 (cont.) · CTD 7 — Automate fini vers ER, diapo 8</p>

    [![CTD 7 — Automate fini vers ER, diapo 9 : Exemple 1 (cont.)](papier/ctd7/p09.jpg){ loading=lazy .papier }](papier/ctd7/p09.jpg)
    <p class="papier-legende">Exemple 1 (cont.) · CTD 7 — Automate fini vers ER, diapo 9</p>

    [![CTD 7 — Automate fini vers ER, diapo 10 : Exemple 2](papier/ctd7/p10.jpg){ loading=lazy .papier }](papier/ctd7/p10.jpg)
    <p class="papier-legende">Exemple 2 · CTD 7 — Automate fini vers ER, diapo 10</p>

    [![CTD 7 — Automate fini vers ER, diapo 11 : Il peut facilement arriver qu’en résolvant un système d’équations concernant](papier/ctd7/p11.jpg){ loading=lazy .papier }](papier/ctd7/p11.jpg)
    <p class="papier-legende">Il peut facilement arriver qu’en résolvant un système d’équations concernant · CTD 7 — Automate fini vers ER, diapo 11</p>

    [![CTD 7 — Automate fini vers ER, diapo 12 : Méthode d’élimination d’états](papier/ctd7/p12.jpg){ loading=lazy .papier }](papier/ctd7/p12.jpg)
    <p class="papier-legende">Méthode d’élimination d’états · CTD 7 — Automate fini vers ER, diapo 12</p>

    [![CTD 7 — Automate fini vers ER, diapo 13 : Les itérations:](papier/ctd7/p13.jpg){ loading=lazy .papier }](papier/ctd7/p13.jpg)
    <p class="papier-legende">Les itérations: · CTD 7 — Automate fini vers ER, diapo 13</p>

    [![CTD 7 — Automate fini vers ER, diapo 14 : (on n’a pas dessiné les états B et C et leurs](papier/ctd7/p14.jpg){ loading=lazy .papier }](papier/ctd7/p14.jpg)
    <p class="papier-legende">(on n’a pas dessiné les états B et C et leurs · CTD 7 — Automate fini vers ER, diapo 14</p>

    [![CTD 7 — Automate fini vers ER, diapo 15 : Exemple 1 :](papier/ctd7/p15.jpg){ loading=lazy .papier }](papier/ctd7/p15.jpg)
    <p class="papier-legende">Exemple 1 : · CTD 7 — Automate fini vers ER, diapo 15</p>

    [![CTD 7 — Automate fini vers ER, diapo 16 : Exemple 1 (cont. )](papier/ctd7/p16.jpg){ loading=lazy .papier }](papier/ctd7/p16.jpg)
    <p class="papier-legende">Exemple 1 (cont. ) · CTD 7 — Automate fini vers ER, diapo 16</p>

    [![CTD 7 — Automate fini vers ER, diapo 17 : Exemple 2](papier/ctd7/p17.jpg){ loading=lazy .papier }](papier/ctd7/p17.jpg)
    <p class="papier-legende">Exemple 2 · CTD 7 — Automate fini vers ER, diapo 17</p>

    [![CTD 7 — Automate fini vers ER, diapo 18 : Exemple 2 (cont.)](papier/ctd7/p18.jpg){ loading=lazy .papier }](papier/ctd7/p18.jpg)
    <p class="papier-legende">Exemple 2 (cont.) · CTD 7 — Automate fini vers ER, diapo 18</p>

    [![CTD 7 — Automate fini vers ER, diapo 19 : Attention !](papier/ctd7/p19.jpg){ loading=lazy .papier }](papier/ctd7/p19.jpg)
    <p class="papier-legende">Attention ! · CTD 7 — Automate fini vers ER, diapo 19</p>

    <!-- /papier -->
