---
title: "Ch. 1 — MCD et normalisation"
---

# Chapitre 1 — Le MCD (entité/association) et les formes normales

=== "Version simplifiée"

    Le **MCD** (modèle conceptuel de données) traduit les besoins en un schéma
    **entité/association** (E/A), indépendant de tout logiciel.

    ## Entités, attributs, identifiants

    !!! definition "Vocabulaire"
        - **Entité** : objet du domaine (Élève, Cours…), décrite par des **attributs**.
        - **Identifiant** : attribut (ou groupe) qui distingue chaque occurrence ;
          souligné. Un **identifiant secondaire** est unique sans être l'identifiant.
        - **Association** : lien sémantique entre entités (« s'inscrit à »), qui peut
          **porter des attributs** (date d'inscription, note, quantité…).

    ## Cardinalités

    Pour chaque entité, on note `(min, max)` : combien de fois une occurrence
    participe **au minimum** et **au maximum** à l'association.

    | Notation | Sens |
    |---|---|
    | `0,1` | au plus une fois (facultatif) |
    | `1,1` | exactement une fois |
    | `0,n` | autant qu'on veut, éventuellement aucune |
    | `1,n` | au moins une fois |

    !!! example "Un élève s'inscrit à des cours"
        Élève `(0,n)` — *s'inscrit* (date) — `(0,n)` Cours : un élève peut suivre
        plusieurs cours, un cours accueille plusieurs élèves. La date dépend du
        **couple** (élève, cours) : elle va **sur l'association**.

    ## Cas particuliers

    - **Association n-aire** : relie 3 entités ou plus (un étudiant parle une langue avec un niveau).
    - **Association réflexive** : relie une entité à elle-même, avec des **rôles**
      (un employé *manage* d'autres employés).
    - **Entité faible** : n'existe pas sans une entité forte, et son identifiant
      est relatif à celle-ci (un exemplaire d'un livre, une séance d'un cours).
      Elle est liée par une cardinalité `(1,1)` notée entre parenthèses.

    !!! methode "Construire un MCD"
        1. Repérer les **noms** (entités, attributs) et les **verbes** (associations).
        2. Choisir un identifiant pour chaque entité.
        3. Placer chaque attribut là où il dépend **de tout l'identifiant et rien que de lui**.
        4. Fixer les cardinalités en lisant chaque phrase dans les deux sens.
        5. Vérifier : noms normalisés (au singulier, sans ambiguïté), pas de chemin
           redondant entre deux entités, fusions et suppressions possibles.

    ## Normalisation

    Mélanger les informations de plusieurs entités crée des **anomalies**
    (de mise à jour, d'insertion, de suppression).

    !!! definition "Dépendance fonctionnelle (DF)"
        $A \to B$ : connaître $A$ détermine une seule valeur de $B$
        (n° élève → nom de l'élève).

    !!! theoreme "Les trois formes normales"
        - **1FN** : chaque attribut est **atomique** (une seule valeur, pas de liste) et il y a un identifiant.
        - **2FN** : 1FN + chaque attribut non clé dépend de **toute** la clé (pas d'une partie seulement).
        - **3FN** : 2FN + aucun attribut non clé ne dépend d'un **autre attribut non clé** (pas de DF transitive).

    !!! piege "Signes qu'un modèle n'est pas normalisé"
        Une liste dans une case (`"Laptop, Souris"`) → pas 1FN. Un attribut qui ne
        dépend que d'une partie d'une clé composée → pas 2FN. Une information
        répétée sur plusieurs lignes (la devise d'une maison recopiée pour chaque
        élève) → pas 3FN : il faut une nouvelle entité.

=== "Version papier"

    Les diapos du chapitre telles que projetées en cours (L. Trébaul, 2025-2026).

    <!-- papier: pdf/TI404P/1-mcd.pdf | Chapitre 1 MCD — support 2025-2026 | ch1 | diapo -->

    [![Chapitre 1 MCD — support 2025-2026, diapo 1 : CHAPITRE 1 :](papier/ch1/p01.jpg){ loading=lazy .papier }](papier/ch1/p01.jpg)
    <p class="papier-legende">CHAPITRE 1 : · Chapitre 1 MCD — support 2025-2026, diapo 1</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 2 : Plan : la méthode MERISE](papier/ch1/p02.jpg){ loading=lazy .papier }](papier/ch1/p02.jpg)
    <p class="papier-legende">Plan : la méthode MERISE · Chapitre 1 MCD — support 2025-2026, diapo 2</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 3 : Partie 1 : Le MCD](papier/ch1/p03.jpg){ loading=lazy .papier }](papier/ch1/p03.jpg)
    <p class="papier-legende">Partie 1 : Le MCD · Chapitre 1 MCD — support 2025-2026, diapo 3</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 4 : De l’analyse des besoins à un modèle](papier/ch1/p04.jpg){ loading=lazy .papier }](papier/ch1/p04.jpg)
    <p class="papier-legende">De l’analyse des besoins à un modèle · Chapitre 1 MCD — support 2025-2026, diapo 4</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 5 : MCD = ModèleEntité/Association(E/A)](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">MCD = ModèleEntité/Association(E/A) · Chapitre 1 MCD — support 2025-2026, diapo 5</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 6 : Du besoinaumodèleEntité/Association](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">Du besoinaumodèleEntité/Association · Chapitre 1 MCD — support 2025-2026, diapo 6</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 7 : Du besoinaumodèleEntité/Association](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">Du besoinaumodèleEntité/Association · Chapitre 1 MCD — support 2025-2026, diapo 7</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 8](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">Chapitre 1 MCD — support 2025-2026, diapo 8</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 9 : Entité et attributs](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">Entité et attributs · Chapitre 1 MCD — support 2025-2026, diapo 9</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 10 : Entité et attributs](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">Entité et attributs · Chapitre 1 MCD — support 2025-2026, diapo 10</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 11 : ➢ Identifiant : Soit E un type d’entité, A l’ensemble de ses attributs, un identifiant de …](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">➢ Identifiant : Soit E un type d’entité, A l’ensemble de ses attributs, un identifiant de … · Chapitre 1 MCD — support 2025-2026, diapo 11</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 12 : Identifiant secondaire (unique)](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">Identifiant secondaire (unique) · Chapitre 1 MCD — support 2025-2026, diapo 12</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 13 : ➢ Une association (appelée aussi parfois relation) représente les liens sémantiques qui](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">➢ Une association (appelée aussi parfois relation) représente les liens sémantiques qui · Chapitre 1 MCD — support 2025-2026, diapo 13</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 14 : Association porteuse d’attributs](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">Association porteuse d’attributs · Chapitre 1 MCD — support 2025-2026, diapo 14</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 15 : ➢ Cardinalité : Soit une association (E1, E2) entre deux types d’entités. La cardinalité d…](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">➢ Cardinalité : Soit une association (E1, E2) entre deux types d’entités. La cardinalité d… · Chapitre 1 MCD — support 2025-2026, diapo 15</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 16 : Récapitulatif sur le modèle E/A](papier/ch1/p16.jpg){ loading=lazy .papier }](papier/ch1/p16.jpg)
    <p class="papier-legende">Récapitulatif sur le modèle E/A · Chapitre 1 MCD — support 2025-2026, diapo 16</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 17 : ➢ Normalisation des noms : Le nom donné à une entité, une association ou un attribut doit](papier/ch1/p17.jpg){ loading=lazy .papier }](papier/ch1/p17.jpg)
    <p class="papier-legende">➢ Normalisation des noms : Le nom donné à une entité, une association ou un attribut doit · Chapitre 1 MCD — support 2025-2026, diapo 17</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 18 : ➢ Faire des fusions quand c’est possible](papier/ch1/p18.jpg){ loading=lazy .papier }](papier/ch1/p18.jpg)
    <p class="papier-legende">➢ Faire des fusions quand c’est possible · Chapitre 1 MCD — support 2025-2026, diapo 18</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 19 : ➢ Faire des suppressions quand c’est possible](papier/ch1/p19.jpg){ loading=lazy .papier }](papier/ch1/p19.jpg)
    <p class="papier-legende">➢ Faire des suppressions quand c’est possible · Chapitre 1 MCD — support 2025-2026, diapo 19</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 20 : ➢ S’il existe deux chemins pour se rendre d’une entité à une autre, alors ces deux](papier/ch1/p20.jpg){ loading=lazy .papier }](papier/ch1/p20.jpg)
    <p class="papier-legende">➢ S’il existe deux chemins pour se rendre d’une entité à une autre, alors ces deux · Chapitre 1 MCD — support 2025-2026, diapo 20</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 21 : Partie 1 : Le MCD](papier/ch1/p21.jpg){ loading=lazy .papier }](papier/ch1/p21.jpg)
    <p class="papier-legende">Partie 1 : Le MCD · Chapitre 1 MCD — support 2025-2026, diapo 21</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 22 : Association n - aire](papier/ch1/p22.jpg){ loading=lazy .papier }](papier/ch1/p22.jpg)
    <p class="papier-legende">Association n - aire · Chapitre 1 MCD — support 2025-2026, diapo 22</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 23 : D’une association n - aire vers un type d’entité](papier/ch1/p23.jpg){ loading=lazy .papier }](papier/ch1/p23.jpg)
    <p class="papier-legende">D’une association n - aire vers un type d’entité · Chapitre 1 MCD — support 2025-2026, diapo 23</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 24 : Association réflexive/récursive et rôle](papier/ch1/p24.jpg){ loading=lazy .papier }](papier/ch1/p24.jpg)
    <p class="papier-legende">Association réflexive/récursive et rôle · Chapitre 1 MCD — support 2025-2026, diapo 24</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 25 : Entité faible/forte](papier/ch1/p25.jpg){ loading=lazy .papier }](papier/ch1/p25.jpg)
    <p class="papier-legende">Entité faible/forte · Chapitre 1 MCD — support 2025-2026, diapo 25</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 26 : Partie 2 :](papier/ch1/p26.jpg){ loading=lazy .papier }](papier/ch1/p26.jpg)
    <p class="papier-legende">Partie 2 : · Chapitre 1 MCD — support 2025-2026, diapo 26</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 27 : Problème : Mélanger des informations relatives à plusieurs entités entraîne des](papier/ch1/p27.jpg){ loading=lazy .papier }](papier/ch1/p27.jpg)
    <p class="papier-legende">Problème : Mélanger des informations relatives à plusieurs entités entraîne des · Chapitre 1 MCD — support 2025-2026, diapo 27</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 28 : Normalisation et formes normales](papier/ch1/p28.jpg){ loading=lazy .papier }](papier/ch1/p28.jpg)
    <p class="papier-legende">Normalisation et formes normales · Chapitre 1 MCD — support 2025-2026, diapo 28</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 29 : Normalisation : 1FN](papier/ch1/p29.jpg){ loading=lazy .papier }](papier/ch1/p29.jpg)
    <p class="papier-legende">Normalisation : 1FN · Chapitre 1 MCD — support 2025-2026, diapo 29</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 30 : Normalisation : 1FN](papier/ch1/p30.jpg){ loading=lazy .papier }](papier/ch1/p30.jpg)
    <p class="papier-legende">Normalisation : 1FN · Chapitre 1 MCD — support 2025-2026, diapo 30</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 31 : Dépendances fonctionnelles](papier/ch1/p31.jpg){ loading=lazy .papier }](papier/ch1/p31.jpg)
    <p class="papier-legende">Dépendances fonctionnelles · Chapitre 1 MCD — support 2025-2026, diapo 31</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 32 : Normalisation : 2FN](papier/ch1/p32.jpg){ loading=lazy .papier }](papier/ch1/p32.jpg)
    <p class="papier-legende">Normalisation : 2FN · Chapitre 1 MCD — support 2025-2026, diapo 32</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 33 : Normalisation : 3FN](papier/ch1/p33.jpg){ loading=lazy .papier }](papier/ch1/p33.jpg)
    <p class="papier-legende">Normalisation : 3FN · Chapitre 1 MCD — support 2025-2026, diapo 33</p>

    [![Chapitre 1 MCD — support 2025-2026, diapo 34 : Prochain Chapitre](papier/ch1/p34.jpg){ loading=lazy .papier }](papier/ch1/p34.jpg)
    <p class="papier-legende">Prochain Chapitre · Chapitre 1 MCD — support 2025-2026, diapo 34</p>

    <!-- /papier -->
