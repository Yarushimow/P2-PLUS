---
title: "Ch. 2 — MLD (modèle relationnel)"
---

# Chapitre 2 — Du MCD au MLD : le modèle relationnel

=== "Version simplifiée"

    ## Le modèle relationnel

    !!! definition "Relation, attribut, domaine, clés"
        - Une **relation** est une table : un ensemble de **tuples** (lignes) ayant
          les mêmes **attributs** (colonnes), chacun pris dans un **domaine** (type).
        - **Clé primaire** (soulignée) : identifie chaque tuple, unique et non nulle.
        - **Clé étrangère** (précédée de `#`) : référence la clé primaire d'une autre relation.

    Notation : `Eleve = (id_eleve INT, nom VARCHAR(50), #id_maison INT)`.

    ## Les règles de transformation

    !!! methode "MCD → MLD"
        1. **Entité** → relation ; identifiant → clé primaire ; attributs → colonnes.
        2. **Association `(X,1)-(X,n)`** → la clé de l'entité côté `(X,n)` devient
           **clé étrangère** dans la relation côté `(X,1)`. Pas de nouvelle table.
        3. **Association `(X,n)-(X,n)`** → **nouvelle relation** dont la clé primaire
           est la concaténation des deux clés (qui sont aussi clés étrangères) ;
           les attributs de l'association y vont.
        4. **Association n-aire** (toutes cardinalités) → nouvelle relation, clé =
           concaténation des identifiants des entités participantes.
        5. **Association réflexive** : `(X,1)-(X,n)` → clé étrangère vers la même table
           (ex. `#id_manager`) ; `(X,n)-(X,n)` → nouvelle table avec deux clés étrangères
           vers la même table.
        6. **`(0,1)-(1,1)`** → la clé côté `(0,1)` devient clé étrangère côté `(1,1)`.

    !!! example "Commande et produits"
        Commande `(0,n)` — *contient* (quantité) — `(0,n)` Produit devient :
        `Commande = (id_commande, date)`, `Produit = (id_produit, nom, prix)`,
        `Contient = (#id_commande, #id_produit, quantite)`.

    !!! methode "MLD → MCD (sens inverse)"
        - Relation sans clé étrangère → **entité**.
        - Relation avec clé(s) étrangère(s) hors clé primaire → **entité** liée par une association `(X,1)-(X,n)`.
        - Relation dont la clé primaire est formée de plusieurs clés étrangères →
          **association** `(X,n)-(X,n)` ou n-aire (ses autres attributs sont portés par l'association).
        - Clé primaire = clé étrangère + attribut propre → **entité faible**.

=== "Version papier"

    Les diapos du chapitre telles que projetées en cours (L. Trébaul, 2025-2026).

    <!-- papier: pdf/TI404P/2-mld.pdf | Chapitre 2 MLD — support 2025-2026 | ch2 | diapo -->

    [![Chapitre 2 MLD — support 2025-2026, diapo 1 : CHAPITRE 2 :](papier/ch2/p01.jpg){ loading=lazy .papier }](papier/ch2/p01.jpg)
    <p class="papier-legende">CHAPITRE 2 : · Chapitre 2 MLD — support 2025-2026, diapo 1</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 2 : Vers un modèle de données](papier/ch2/p02.jpg){ loading=lazy .papier }](papier/ch2/p02.jpg)
    <p class="papier-legende">Vers un modèle de données · Chapitre 2 MLD — support 2025-2026, diapo 2</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 3 : Vers un modèle de données](papier/ch2/p03.jpg){ loading=lazy .papier }](papier/ch2/p03.jpg)
    <p class="papier-legende">Vers un modèle de données · Chapitre 2 MLD — support 2025-2026, diapo 3</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 4 : Partie 1 : Le Modèle](papier/ch2/p04.jpg){ loading=lazy .papier }](papier/ch2/p04.jpg)
    <p class="papier-legende">Partie 1 : Le Modèle · Chapitre 2 MLD — support 2025-2026, diapo 4</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 5 : Du modèle conceptuel au modèle logique](papier/ch2/p05.jpg){ loading=lazy .papier }](papier/ch2/p05.jpg)
    <p class="papier-legende">Du modèle conceptuel au modèle logique · Chapitre 2 MLD — support 2025-2026, diapo 5</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 6 : Le modèle relationnel](papier/ch2/p06.jpg){ loading=lazy .papier }](papier/ch2/p06.jpg)
    <p class="papier-legende">Le modèle relationnel · Chapitre 2 MLD — support 2025-2026, diapo 6</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 7 : Définition d’une relation](papier/ch2/p07.jpg){ loading=lazy .papier }](papier/ch2/p07.jpg)
    <p class="papier-legende">Définition d’une relation · Chapitre 2 MLD — support 2025-2026, diapo 7</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 8 : Exemple de définition d’une relation](papier/ch2/p08.jpg){ loading=lazy .papier }](papier/ch2/p08.jpg)
    <p class="papier-legende">Exemple de définition d’une relation · Chapitre 2 MLD — support 2025-2026, diapo 8</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 9 : 2ème exemple de BD avec plusieurs relations](papier/ch2/p09.jpg){ loading=lazy .papier }](papier/ch2/p09.jpg)
    <p class="papier-legende">2ème exemple de BD avec plusieurs relations · Chapitre 2 MLD — support 2025-2026, diapo 9</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 10 : Les clés](papier/ch2/p10.jpg){ loading=lazy .papier }](papier/ch2/p10.jpg)
    <p class="papier-legende">Les clés · Chapitre 2 MLD — support 2025-2026, diapo 10</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 11 : Partie 2 : Règles de](papier/ch2/p11.jpg){ loading=lazy .papier }](papier/ch2/p11.jpg)
    <p class="papier-legende">Partie 2 : Règles de · Chapitre 2 MLD — support 2025-2026, diapo 11</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 12 : 1ère Règle de transformation](papier/ch2/p12.jpg){ loading=lazy .papier }](papier/ch2/p12.jpg)
    <p class="papier-legende">1ère Règle de transformation · Chapitre 2 MLD — support 2025-2026, diapo 12</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 13 : 2ème règle de transformation](papier/ch2/p13.jpg){ loading=lazy .papier }](papier/ch2/p13.jpg)
    <p class="papier-legende">2ème règle de transformation · Chapitre 2 MLD — support 2025-2026, diapo 13</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 14 : 3ème règle de transformation](papier/ch2/p14.jpg){ loading=lazy .papier }](papier/ch2/p14.jpg)
    <p class="papier-legende">3ème règle de transformation · Chapitre 2 MLD — support 2025-2026, diapo 14</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 15 : 4ème règle de transformation](papier/ch2/p15.jpg){ loading=lazy .papier }](papier/ch2/p15.jpg)
    <p class="papier-legende">4ème règle de transformation · Chapitre 2 MLD — support 2025-2026, diapo 15</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 16 : 5ème règle de transformation](papier/ch2/p16.jpg){ loading=lazy .papier }](papier/ch2/p16.jpg)
    <p class="papier-legende">5ème règle de transformation · Chapitre 2 MLD — support 2025-2026, diapo 16</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 17 : 5ème règle de transformation](papier/ch2/p17.jpg){ loading=lazy .papier }](papier/ch2/p17.jpg)
    <p class="papier-legende">5ème règle de transformation · Chapitre 2 MLD — support 2025-2026, diapo 17</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 18 : 5ème règle de transformation](papier/ch2/p18.jpg){ loading=lazy .papier }](papier/ch2/p18.jpg)
    <p class="papier-legende">5ème règle de transformation · Chapitre 2 MLD — support 2025-2026, diapo 18</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 19 : Remarque : retour sur les associations n-aire](papier/ch2/p19.jpg){ loading=lazy .papier }](papier/ch2/p19.jpg)
    <p class="papier-legende">Remarque : retour sur les associations n-aire · Chapitre 2 MLD — support 2025-2026, diapo 19</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 20 : Etude de Cas](papier/ch2/p20.jpg){ loading=lazy .papier }](papier/ch2/p20.jpg)
    <p class="papier-legende">Etude de Cas · Chapitre 2 MLD — support 2025-2026, diapo 20</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 21 : 1. Etablir le MCD](papier/ch2/p21.jpg){ loading=lazy .papier }](papier/ch2/p21.jpg)
    <p class="papier-legende">1. Etablir le MCD · Chapitre 2 MLD — support 2025-2026, diapo 21</p>

    [![Chapitre 2 MLD — support 2025-2026, diapo 22 : Prochain chapitre](papier/ch2/p22.jpg){ loading=lazy .papier }](papier/ch2/p22.jpg)
    <p class="papier-legende">Prochain chapitre · Chapitre 2 MLD — support 2025-2026, diapo 22</p>

    <!-- /papier -->
