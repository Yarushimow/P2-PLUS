---
title: "Ch. 6 — Minimisation"
---

# Chapitre 6 — Minimisation (algorithme de Moore)

=== "Version simplifiée"

    !!! theoreme "Automate minimal"
        Tout langage reconnaissable a un **unique** automate déterministe complet ayant le plus petit nombre d'états : son **automate minimal**.
        Deux automates reconnaissent le même langage si et seulement s'ils ont le même automate minimal (aux noms des états près).

    **Idée** : deux états sont **équivalents** si les mêmes suffixes mènent de chacun vers une sortie ; on peut alors les fusionner.
    Comme on ne sait pas les fusionner directement, on fait l'inverse : on **sépare** les états dès qu'un mot les distingue.

    !!! methode "Algorithme de Moore"
        **Préalable** : l'automate doit être **déterministe, complet** et sans état **inaccessible** (on supprime ceux-ci).

        1. **Partition initiale** $\Theta_0 = \{T, NT\}$ : terminaux d'un côté, non terminaux de l'autre (le mot vide les sépare).
        2. **Itération** : réécrire la table en remplaçant chaque cible par le **nom de son groupe**. Dans chaque groupe, les états
           qui ont le **même motif** (même suite de groupes cibles) restent ensemble ; des motifs différents séparent le groupe.
        3. **Arrêt** quand une itération ne sépare plus rien ($\Theta_{i+1} = \Theta_i$).
        4. **Construction** : les groupes finaux sont les états. Entrée = groupe qui contient l'entrée d'origine ;
           sorties = groupes de terminaux. Transitions : remplacer chaque état par son groupe et supprimer les lignes en double.

    ## Exemple du cours

    | | état | a | b | motif sous $\Theta_0$ | motif sous $\Theta_1$ |
    |---|---|---|---|---|---|
    | E/S | 1 | 2 | 6 | T NT | 12 36 |
    | S | 2 | 1 | 3 | T NT | 12 36 |
    | | 3 | 4 | 2 | NT T | 45 12 |
    | | 6 | 5 | 1 | NT T | 45 12 |
    | | 4 | 3 | 5 | NT NT | 36 45 |
    | | 5 | 6 | 4 | NT NT | 36 45 |

    $\Theta_0 = \{12, 3456\}$ → $\Theta_1 = \{12, 36, 45\}$ → $\Theta_2 = \Theta_1$ : fin. Automate minimal à 3 états :

    | | état | a | b |
    |---|---|---|---|
    | E/S | 12 | 12 | 36 |
    | | 36 | 45 | 12 |
    | | 45 | 36 | 45 |

    !!! piege "Pièges fréquents"
        - Il faut **compléter** avant de minimiser : l'état poubelle est un état non terminal comme les autres.
        - Un groupe d'un seul état ne peut plus être séparé : inutile de le recalculer.
        - Si tous les groupes finaux sont des singletons, l'automate était **déjà minimal** : le dire, sans rien construire.
        - L'entrée ne joue **aucun rôle** pendant les itérations, seulement à la fin.

    **Cas extrêmes** : aucun état terminal → automate minimal à un état non terminal (langage vide $\varnothing$) ;
    tous terminaux → un état terminal avec une boucle sur toutes les lettres (langage $A^*$).

=== "Version papier"

    Les diapos du CTD 6.

    <!-- papier: pdf/SM402P/ctd6.pdf | CTD 6 — Minimisation | ctd6 | diapo -->

    [![CTD 6 — Minimisation, diapo 1 : Minimisation des](papier/ctd6/p01.jpg){ loading=lazy .papier }](papier/ctd6/p01.jpg)
    <p class="papier-legende">Minimisation des · CTD 6 — Minimisation, diapo 1</p>

    [![CTD 6 — Minimisation, diapo 2 : Pour tout langage reconnaissable il existe le plus petit](papier/ctd6/p02.jpg){ loading=lazy .papier }](papier/ctd6/p02.jpg)
    <p class="papier-legende">Pour tout langage reconnaissable il existe le plus petit · CTD 6 — Minimisation, diapo 2</p>

    [![CTD 6 — Minimisation, diapo 3 : Considérons un automate déterministe complet sans états non accessibles.](papier/ctd6/p03.jpg){ loading=lazy .papier }](papier/ctd6/p03.jpg)
    <p class="papier-legende">Considérons un automate déterministe complet sans états non accessibles. · CTD 6 — Minimisation, diapo 3</p>

    [![CTD 6 — Minimisation, diapo 4 : Dans le premier cas, il est évident que si on fusionne p1 et p2 dans un même](papier/ctd6/p04.jpg){ loading=lazy .papier }](papier/ctd6/p04.jpg)
    <p class="papier-legende">Dans le premier cas, il est évident que si on fusionne p1 et p2 dans un même · CTD 6 — Minimisation, diapo 4</p>

    [![CTD 6 — Minimisation, diapo 5 : Au départ, on sépare les états terminaux des autres :](papier/ctd6/p05.jpg){ loading=lazy .papier }](papier/ctd6/p05.jpg)
    <p class="papier-legende">Au départ, on sépare les états terminaux des autres : · CTD 6 — Minimisation, diapo 5</p>

    [![CTD 6 — Minimisation, diapo 6 : Pour simplifier le dessin, on considère juste les transitions marquées par ‘a’.](papier/ctd6/p06.jpg){ loading=lazy .papier }](papier/ctd6/p06.jpg)
    <p class="papier-legende">Pour simplifier le dessin, on considère juste les transitions marquées par ‘a’. · CTD 6 — Minimisation, diapo 6</p>

    [![CTD 6 — Minimisation, diapo 7 : Description du processus de partitionnement itératif](papier/ctd6/p07.jpg){ loading=lazy .papier }](papier/ctd6/p07.jpg)
    <p class="papier-legende">Description du processus de partitionnement itératif · CTD 6 — Minimisation, diapo 7</p>

    [![CTD 6 — Minimisation, diapo 8 : Méthode : nous allons l’illustrer sur des exemples, avant de](papier/ctd6/p08.jpg){ loading=lazy .papier }](papier/ctd6/p08.jpg)
    <p class="papier-legende">Méthode : nous allons l’illustrer sur des exemples, avant de · CTD 6 — Minimisation, diapo 8</p>

    [![CTD 6 — Minimisation, diapo 9 : Exemple 1. Minimisons l’automate déterministe complet suivant :](papier/ctd6/p09.jpg){ loading=lazy .papier }](papier/ctd6/p09.jpg)
    <p class="papier-legende">Exemple 1. Minimisons l’automate déterministe complet suivant : · CTD 6 — Minimisation, diapo 9</p>

    [![CTD 6 — Minimisation, diapo 10 : Nous réécrivons la table de](papier/ctd6/p10.jpg){ loading=lazy .papier }](papier/ctd6/p10.jpg)
    <p class="papier-legende">Nous réécrivons la table de · CTD 6 — Minimisation, diapo 10</p>

    [![CTD 6 — Minimisation, diapo 11 : 4. Itération 2 : Nous réécrivons la table de transitions séparée maintenant en trois group…](papier/ctd6/p11.jpg){ loading=lazy .papier }](papier/ctd6/p11.jpg)
    <p class="papier-legende">4. Itération 2 : Nous réécrivons la table de transitions séparée maintenant en trois group… · CTD 6 — Minimisation, diapo 11</p>

    [![CTD 6 — Minimisation, diapo 12 : 6. Transitions. On prend le tableau de transitions de l’automate d’origine et](papier/ctd6/p12.jpg){ loading=lazy .papier }](papier/ctd6/p12.jpg)
    <p class="papier-legende">6. Transitions. On prend le tableau de transitions de l’automate d’origine et · CTD 6 — Minimisation, diapo 12</p>

    [![CTD 6 — Minimisation, diapo 13 : Voici les itérations qu’on a effectuées :](papier/ctd6/p13.jpg){ loading=lazy .papier }](papier/ctd6/p13.jpg)
    <p class="papier-legende">Voici les itérations qu’on a effectuées : · CTD 6 — Minimisation, diapo 13</p>

    [![CTD 6 — Minimisation, diapo 14 : Description plus formelle de la méthode](papier/ctd6/p14.jpg){ loading=lazy .papier }](papier/ctd6/p14.jpg)
    <p class="papier-legende">Description plus formelle de la méthode · CTD 6 — Minimisation, diapo 14</p>

    [![CTD 6 — Minimisation, diapo 15 : Construction de l’automate minimal](papier/ctd6/p15.jpg){ loading=lazy .papier }](papier/ctd6/p15.jpg)
    <p class="papier-legende">Construction de l’automate minimal · CTD 6 — Minimisation, diapo 15</p>

    [![CTD 6 — Minimisation, diapo 16 : Exemple 2. Minimisons l’automate déterministe complet suivant :](papier/ctd6/p16.jpg){ loading=lazy .papier }](papier/ctd6/p16.jpg)
    <p class="papier-legende">Exemple 2. Minimisons l’automate déterministe complet suivant : · CTD 6 — Minimisation, diapo 16</p>

    [![CTD 6 — Minimisation, diapo 17 : 4. Itération 2: les groupes (3) et (4) sont des singletons (consistent en un seul état cha…](papier/ctd6/p17.jpg){ loading=lazy .papier }](papier/ctd6/p17.jpg)
    <p class="papier-legende">4. Itération 2: les groupes (3) et (4) sont des singletons (consistent en un seul état cha… · CTD 6 — Minimisation, diapo 17</p>

    [![CTD 6 — Minimisation, diapo 18 : Transitions: En remplaçant dans la table de transitions d’origine les états par](papier/ctd6/p18.jpg){ loading=lazy .papier }](papier/ctd6/p18.jpg)
    <p class="papier-legende">Transitions: En remplaçant dans la table de transitions d’origine les états par · CTD 6 — Minimisation, diapo 18</p>

    [![CTD 6 — Minimisation, diapo 19 : Remarques :](papier/ctd6/p19.jpg){ loading=lazy .papier }](papier/ctd6/p19.jpg)
    <p class="papier-legende">Remarques : · CTD 6 — Minimisation, diapo 19</p>

    [![CTD 6 — Minimisation, diapo 20 : Remarques (cont.) :](papier/ctd6/p20.jpg){ loading=lazy .papier }](papier/ctd6/p20.jpg)
    <p class="papier-legende">Remarques (cont.) : · CTD 6 — Minimisation, diapo 20</p>

    [![CTD 6 — Minimisation, diapo 21 : Remarques (cont.) :](papier/ctd6/p21.jpg){ loading=lazy .papier }](papier/ctd6/p21.jpg)
    <p class="papier-legende">Remarques (cont.) : · CTD 6 — Minimisation, diapo 21</p>

    <!-- /papier -->
