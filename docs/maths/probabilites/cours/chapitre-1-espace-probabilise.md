---
title: "Ch. 1 — Espace probabilisé"
---

# Chapitre 1 — Espace probabilisé

=== "Version simplifiée"

    Le cadre de tout le cours : on décrit une expérience aléatoire par un **univers**
    $\Omega$, ses **évènements** (des sous-ensembles de $\Omega$) et une **fonction de
    probabilité** $P$ qui leur attribue un nombre entre 0 et 1.

    ## 1.1 Concepts de base

    !!! definition "Expérience aléatoire, univers"
        Une expérience est **aléatoire** si on ne peut pas prévoir son résultat avec
        certitude. Les résultats possibles s'appellent les **éventualités** (ou évènements
        élémentaires). L'ensemble de tous les résultats est l'**univers**, noté $\Omega$
        (toujours non vide).

    | Expérience | Univers |
    |------------|---------|
    | Lancer d'une pièce | $\Omega = \{P, F\}$ |
    | Lancer d'un dé | $\Omega = \{1, \dots, 6\}$ |
    | Lancer de deux dés | $\Omega = \{1, \dots, 6\}^2$ (couples ordonnés) |
    | Durée de vie d'un téléphone (en jours) | $\Omega = \mathbb{N}$ |
    | Attente d'un bus qui passe toutes les 12 min | $\Omega = [0, 12]$ |

    !!! definition "Évènements"
        - Un **évènement** est un sous-ensemble $E \subset \Omega$.
        - $\Omega$ est l'**évènement certain**, $\emptyset$ l'**évènement impossible**.

    Dans ce cours, $\Omega$ est toujours **fini ou dénombrable**, sauf mention contraire.

    ## 1.2 Rappels sur les ensembles

    | Logique | Ensembles | Ce qui se passe |
    |---------|-----------|-----------------|
    | ET | $E \cap F$ | les deux évènements se réalisent |
    | OU | $E \cup F$ | au moins un des deux se réalise |
    | NON | $\overline{E}$ | $E$ ne se réalise pas |
    | $\Rightarrow$ | $E \subset F$ | chaque fois que $E$ se réalise, $F$ aussi |

    !!! theoreme "Propriétés de $\cup$ et $\cap$"
        - **Commutativité** et **associativité** de $\cup$ et $\cap$.
        - **Idempotence** : $E \cup E = E = E \cap E$.
        - **Neutres** : $E \cup \emptyset = E$, $E \cap \Omega = E$.
        - **Absorbants** : $E \cup \Omega = \Omega$, $E \cap \emptyset = \emptyset$.
        - **Distributivité** (dans les deux sens) :

        $$
        (E \cap F) \cup G = (E \cup G) \cap (F \cup G), \qquad
        (E \cup F) \cap G = (E \cap G) \cup (F \cap G)
        $$

    !!! theoreme "Lois de De Morgan"
        $$
        \overline{E \cup F} = \overline{E} \cap \overline{F}
        \qquad\text{et}\qquad
        \overline{E \cap F} = \overline{E} \cup \overline{F}
        $$

        La négation d'un « et » est le « ou » des négations, et inversement.

    !!! definition "Évènements incompatibles"
        $E$ et $F$ sont **incompatibles** si leur réalisation conjointe est impossible :
        $E \cap F = \emptyset$.

    !!! definition "Système complet d'évènements (SCE)"
        $\{A_1, \dots, A_n\}$ est un système complet d'évènements si :

        1. $\displaystyle\bigcup_{i=1}^n A_i = \Omega$ (ils couvrent tous les cas) ;
        2. $A_i \cap A_j = \emptyset$ pour $i \neq j$ (deux à deux incompatibles).

        Exemple : pour une carte tirée dans un jeu de 52, « figure ou As », « entre 7 et 10 »,
        « entre 2 et 6 ». L'exemple le plus simple : $\{A, \overline{A}\}$.

    ## 1.3 Fonction de probabilité

    !!! definition "Fonction de probabilité"
        Une fonction $P : \mathcal{P}(\Omega) \to \mathbb{R}$ est une probabilité si :

        1. $\forall E \subset \Omega,\ 0 \le P(E) \le 1$ ;
        2. $P(\Omega) = 1$ ;
        3. **additivité** : si les $A_i$ sont deux à deux incompatibles,
           $P\left(\bigcup A_i\right) = \sum P(A_i)$.

        $(\Omega, P)$ est alors un **espace probabilisé**.

    !!! example "Les deux façons de construire une probabilité"
        - **Probabilité uniforme** ($\Omega$ fini, résultats équiprobables) :
          $P(E) = \dfrac{\operatorname{card}(E)}{\operatorname{card}(\Omega)}$, « cas favorables sur cas possibles ».
          Les calculs deviennent du dénombrement.
        - **Cas général** : il suffit de donner $p(\omega_i) \ge 0$ pour chaque éventualité,
          avec $\sum p(\omega_i) = 1$, puis $P(E) = \sum_{x \in E} p(x)$.

    !!! theoreme "Proposition 1.3 — Les règles de calcul"
        - $P(\emptyset) = 0$
        - $P(\overline{E}) = 1 - P(E)$
        - $E \subset F \Rightarrow P(E) \le P(F)$
        - $P(E \cup F) = P(E) + P(F) - P(E \cap F)$

    ??? note "Idée des démonstrations"
        On découpe en morceaux **disjoints** puis on applique l'additivité :

        - $E \cup \overline{E} = \Omega$ et $E \cap \overline{E} = \emptyset$, donc $P(E) + P(\overline{E}) = 1$.
        - Si $E \subset F$ : $F = E \cup (F \cap \overline{E})$ (disjoints), donc
          $P(F) = P(E) + P(F \cap \overline{E}) \ge P(E)$.
        - $E \cup F = E \cup (F \cap \overline{E})$ et $F = (E \cap F) \cup (F \cap \overline{E})$,
          on soustrait les deux égalités.

    !!! theoreme "Formule de Poincaré (crible)"
        $$
        P(E \cup F \cup G) = P(E) + P(F) + P(G)
        - P(E \cap F) - P(E \cap G) - P(F \cap G)
        + P(E \cap F \cap G)
        $$

        En général : on ajoute les probabilités seules, on retire les intersections de 2,
        on rajoute celles de 3, on retire celles de 4, etc. Avec 4 évènements :
        4 termes simples, 6 doubles, 4 triples, 1 quadruple.

    !!! methode "Fiche méthode #1 — Calculer $P(E)$ en trois étapes"
        1. **Identifier les évènements élémentaires** qui décrivent complètement l'expérience.
        2. **Écrire $E$** avec ces évènements et les opérations $\cap$, $\cup$, $\overline{\phantom{E}}$.
        3. **Appliquer les propriétés** de $P$ (additivité si incompatibles, Poincaré sinon,
           complémentaire si c'est plus simple).

    ### Exemple : le duel au poker

    Il reste 44 cartes possibles pour la dernière carte. Le joueur 2 gagne si elle est un 2,
    un valet ou un trèfle. On découpe en évènements **incompatibles** (les 2 et valets de
    trèfle sont déjà comptés dans « trèfle ») :

    $$
    P(V_2) = P(\text{Deux}) + P(\text{Valet}) + P(\text{Trèfle})
    = \frac{2}{44} + \frac{3}{44} + \frac{9}{44} = \frac{14}{44} \approx 0{,}32
    $$

    ## 1.4 Hors programme : univers indénombrables

    Pour $\Omega = [0,1]$ ou un carré, on ne peut pas définir une probabilité uniforme sur
    **tous** les sous-ensembles (ensembles de Vitali). On restreint alors les évènements à
    une **tribu** (en pratique : les intervalles et leurs réunions). C'est la définition de
    Kolmogorov : un espace probabilisé est un triplet $(\Omega, \mathcal{F}, P)$.
    À retenir seulement comme culture.

    ## Acquis d'apprentissage

    - [ ] Décrire les évènements élémentaires d'une expérience.
    - [ ] Écrire un évènement avec $\cap$, $\cup$ et le complémentaire.
    - [ ] Reconnaître deux évènements incompatibles.
    - [ ] Vérifier qu'une fonction est une probabilité.
    - [ ] Calculer une probabilité avec les propriétés de $P$.
    - [ ] Utiliser la formule de Poincaré pour trois évènements.

=== "Version papier"

    Les pages du chapitre 1 du polycopié *Probabilités* 2026-2027 (pages 6 à 24). Les exercices du chapitre sont dans la [version papier du TD 1](../td/td-1-espace-probabilise.md).

    [![Poly 2026-2027 : Page de titre du poly](papier/ch1/titre-01.jpg){ loading=lazy .papier }](papier/ch1/titre-01.jpg)
    <p class="papier-legende">Page de titre du poly · Poly 2026-2027</p>

    [![Poly 2026-2027, p. 6 : 1. Espace probabilisé — introduction et historique](papier/ch1/p006.jpg){ loading=lazy .papier }](papier/ch1/p006.jpg)
    <p class="papier-legende">1. Espace probabilisé — introduction et historique · Poly 2026-2027, p. 6</p>

    [![Poly 2026-2027, p. 7 : Historique — le problème des partis](papier/ch1/p007.jpg){ loading=lazy .papier }](papier/ch1/p007.jpg)
    <p class="papier-legende">Historique — le problème des partis · Poly 2026-2027, p. 7</p>

    [![Poly 2026-2027, p. 8 : Historique — vers Kolmogorov](papier/ch1/p008.jpg){ loading=lazy .papier }](papier/ch1/p008.jpg)
    <p class="papier-legende">Historique — vers Kolmogorov · Poly 2026-2027, p. 8</p>

    [![Poly 2026-2027, p. 9 : 1.1 Concepts de base](papier/ch1/p009.jpg){ loading=lazy .papier }](papier/ch1/p009.jpg)
    <p class="papier-legende">1.1 Concepts de base · Poly 2026-2027, p. 9</p>

    [![Poly 2026-2027, p. 10 : 1.2 Rappels sur la théorie des ensembles](papier/ch1/p010.jpg){ loading=lazy .papier }](papier/ch1/p010.jpg)
    <p class="papier-legende">1.2 Rappels sur la théorie des ensembles · Poly 2026-2027, p. 10</p>

    [![Poly 2026-2027, p. 11 : 1.2 Rappels sur la théorie des ensembles](papier/ch1/p011.jpg){ loading=lazy .papier }](papier/ch1/p011.jpg)
    <p class="papier-legende">1.2 Rappels sur la théorie des ensembles · Poly 2026-2027, p. 11</p>

    [![Poly 2026-2027, p. 12 : 1.2 Rappels sur la théorie des ensembles](papier/ch1/p012.jpg){ loading=lazy .papier }](papier/ch1/p012.jpg)
    <p class="papier-legende">1.2 Rappels sur la théorie des ensembles · Poly 2026-2027, p. 12</p>

    [![Poly 2026-2027, p. 13 : 1.2 Rappels sur la théorie des ensembles](papier/ch1/p013.jpg){ loading=lazy .papier }](papier/ch1/p013.jpg)
    <p class="papier-legende">1.2 Rappels sur la théorie des ensembles · Poly 2026-2027, p. 13</p>

    [![Poly 2026-2027, p. 14 : 1.3 Fonction de probabilité](papier/ch1/p014.jpg){ loading=lazy .papier }](papier/ch1/p014.jpg)
    <p class="papier-legende">1.3 Fonction de probabilité · Poly 2026-2027, p. 14</p>

    [![Poly 2026-2027, p. 15 : 1.3 Fonction de probabilité](papier/ch1/p015.jpg){ loading=lazy .papier }](papier/ch1/p015.jpg)
    <p class="papier-legende">1.3 Fonction de probabilité · Poly 2026-2027, p. 15</p>

    [![Poly 2026-2027, p. 16 : 1.3 Fonction de probabilité](papier/ch1/p016.jpg){ loading=lazy .papier }](papier/ch1/p016.jpg)
    <p class="papier-legende">1.3 Fonction de probabilité · Poly 2026-2027, p. 16</p>

    [![Poly 2026-2027, p. 17 : 1.3 Fonction de probabilité](papier/ch1/p017.jpg){ loading=lazy .papier }](papier/ch1/p017.jpg)
    <p class="papier-legende">1.3 Fonction de probabilité · Poly 2026-2027, p. 17</p>

    [![Poly 2026-2027, p. 18 : 1.3 Fonction de probabilité](papier/ch1/p018.jpg){ loading=lazy .papier }](papier/ch1/p018.jpg)
    <p class="papier-legende">1.3 Fonction de probabilité · Poly 2026-2027, p. 18</p>

    [![Poly 2026-2027, p. 19 : 1.4 [Hors programme] Les univers indénombrables](papier/ch1/p019.jpg){ loading=lazy .papier }](papier/ch1/p019.jpg)
    <p class="papier-legende">1.4 [Hors programme] Les univers indénombrables · Poly 2026-2027, p. 19</p>

    [![Poly 2026-2027, p. 20 : 1.4 [Hors programme] Les univers indénombrables](papier/ch1/p020.jpg){ loading=lazy .papier }](papier/ch1/p020.jpg)
    <p class="papier-legende">1.4 [Hors programme] Les univers indénombrables · Poly 2026-2027, p. 20</p>

    [![Poly 2026-2027, p. 21 : 1.4 [Hors programme] Les univers indénombrables](papier/ch1/p021.jpg){ loading=lazy .papier }](papier/ch1/p021.jpg)
    <p class="papier-legende">1.4 [Hors programme] Les univers indénombrables · Poly 2026-2027, p. 21</p>

    [![Poly 2026-2027, p. 22 : 1.4 [Hors programme] Les univers indénombrables](papier/ch1/p022.jpg){ loading=lazy .papier }](papier/ch1/p022.jpg)
    <p class="papier-legende">1.4 [Hors programme] Les univers indénombrables · Poly 2026-2027, p. 22</p>

    [![Poly 2026-2027, p. 23 : 1.4 [Hors programme] Les univers indénombrables](papier/ch1/p023.jpg){ loading=lazy .papier }](papier/ch1/p023.jpg)
    <p class="papier-legende">1.4 [Hors programme] Les univers indénombrables · Poly 2026-2027, p. 23</p>

    [![Poly 2026-2027, p. 24 : 1.5 Acquis d’apprentissage](papier/ch1/p024.jpg){ loading=lazy .papier }](papier/ch1/p024.jpg)
    <p class="papier-legende">1.5 Acquis d’apprentissage · Poly 2026-2027, p. 24</p>
