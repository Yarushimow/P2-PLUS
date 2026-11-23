---
title: Projet
---

# Projet — Traitement d'automates finis

=== "Version simplifiée"

    !!! definition "Le sujet 2025-2026"
        Écrire en **C ou Python** un programme qui, pour un automate lu dans un fichier `.txt` :

        1. l'**affiche** (table de transitions, entrées, sorties) ;
        2. dit s'il est **déterministe**, **standard**, **complet** (en donnant les raisons quand ce n'est pas le cas) ;
        3. le **standardise** si l'utilisateur le demande ;
        4. construit l'automate **déterministe complet** (AFDC) équivalent ;
        5. le **minimise** en affichant les partitions successives ;
        6. **reconnaît** des mots tapés au clavier ;
        7. construit l'automate du **langage complémentaire**.

        Le tout dans une **boucle** qui permet de traiter plusieurs automates sans relancer le programme.

    | Étape | Date (2025-2026) |
    |---|---|
    | Équipes de 3 à 5 (8 max par groupe) | 1er mars |
    | Automates de test distribués | 9 mars |
    | Dépôt sur Moodle : code commenté, fichiers `.txt` des automates, une **trace d'exécution** par automate | 29 mars, minuit |
    | Soutenance : 5 min de démonstration sur **ton** ordinateur, 25 min de questions à n'importe quel membre | ensuite |

    Le projet compte pour **40 %** de la note. La note de soutenance est collective : tout le monde doit comprendre tout le code.

    ## Format du fichier (proposé par le sujet)

    ```text
    2          ← nombre de symboles (a, b)
    5          ← nombre d'états (0 à 4)
    1 0        ← nombre d'états initiaux, puis leurs numéros
    1 4        ← nombre d'états terminaux, puis leurs numéros
    6          ← nombre de transitions
    0a0        ← une transition par ligne : départ, lettre, arrivée
    0b0
    0a1
    1b2
    2a3
    3a4
    ```

    !!! piege "Numéros à plusieurs chiffres"
        « 12a3 » doit se lire $12 \xrightarrow{a} 3$ : repère la **lettre** pour couper la chaîne, ne lis pas caractère par caractère.
        Pour les automates asynchrones de test, prévois un symbole pour ε (par exemple `*`).

    ## Choisir ses structures de données

    - **Alphabet** : les `n` premières lettres (`a`, `b`, …).
    - **Transitions** : un dictionnaire `(état, lettre) → ensemble d'états` (en C : un tableau `[état][lettre]` de listes).
      Un ensemble par case gère naturellement le non-déterminisme.
    - **États composés** (déterminisation) : des **ensembles** d'états d'origine (`frozenset` en Python), affichés avec un séparateur
      (`0.1.3`) pour ne pas confondre $\{1, 2, 3\}$ avec $\{12, 3\}$, comme l'exige le sujet.

    ## Pseudo-code de chaque étape

    !!! methode "Tests"
        - **Déterministe** : une seule entrée **et** au plus une cible par case. Sinon, afficher **pourquoi** (« 2 entrées », « 2 transitions en a depuis 0 »).
        - **Complet** (sur un automate déterministe) : aucune case vide. Sinon, lister les cases vides.
        - **Standard** : une seule entrée et aucune transition dont la cible est cette entrée.

    !!! methode "Standardisation"
        Nouvel état `i`, seule entrée. Pour chaque lettre, `trans[i, a]` = union des `trans[e, a]` pour les anciennes entrées `e`.
        `i` est terminal si une ancienne entrée était terminale. Le reste est copié.

    !!! methode "Déterminisation + complétion (en une seule passe)"
        ```text
        départ ← ensemble des entrées
        file ← [départ] ; connus ← {départ}
        tant que file non vide :
            S ← défiler
            pour chaque lettre a :
                T ← union des trans[e, a] pour e dans S        (T peut être vide = poubelle)
                trans_det[S, a] ← T
                si T pas dans connus : l'ajouter à connus et à la file
        terminaux_det ← les S qui contiennent un terminal d'origine
        ```
        L'ensemble vide joue le rôle de l'**état poubelle** : la déterminisation produit directement un automate complet.
        Si l'automate était déjà déterministe mais incomplet, on fait seulement la **complétion** (ajout de P) : le sujet impose
        de ne pas « déterminiser » un automate déjà déterministe.

    !!! methode "Minimisation (Moore)"
        ```text
        groupe[e] ← "T" ou "NT"
        répéter :
            afficher la partition (numérotée)
            motif[e] ← (groupe[e], groupe[cible(e, a1)], groupe[cible(e, a2)], …)
            nouveau_groupe[e] ← un numéro par motif différent
            si le nombre de groupes n'a pas changé : arrêter
            groupe ← nouveau_groupe
        ```
        Mettre `groupe[e]` dans le motif garantit qu'on ne fusionne jamais deux groupes déjà séparés.
        Afficher ensuite la **table de correspondance** (état minimal → états de l'AFDC), et le message « déjà minimal »
        si le nombre d'états n'a pas diminué.

    !!! methode "Reconnaissance et complémentaire"
        - Lire le mot **en entier** sur une ligne, puis suivre les transitions de l'AFDC (ou de l'AFDCM) depuis l'entrée :
          « oui » si l'état final est terminal. Une lettre hors alphabet → « non ». Penser au **mot vide** (ligne vide ou symbole choisi).
        - Complémentaire : sur l'AFDC ou l'AFDCM (le dire à l'écran), échanger terminaux et non terminaux.

    ## Tester sérieusement

    - Pour chaque automate de test, écrire à la main **quelques mots reconnus et non reconnus** avant de lancer le programme.
    - Vérifications croisées : l'automate de départ, l'AFDC et l'AFDCM doivent donner les **mêmes** réponses sur tous les mots courts
      (en Python, une boucle sur `itertools.product(alphabet, repeat=k)` pour $k \le 6$) ; le complémentaire doit donner **l'inverse**.
    - Cas limites présents dans les automates de test : aucune transition (automate n°01), aucun terminal, tous terminaux, plusieurs entrées,
      ε-transitions, états inaccessibles.
    - Garder la **numérotation des états** du sujet, et générer une trace d'exécution par automate (redirection `> trace_12.txt`).

=== "Version papier"

    Le sujet du projet, puis les automates de test.

    <!-- papier: pdf/SM402P/projet.pdf | Sujet du projet 2025-2026 | sujet | page -->

    [![Sujet du projet 2025-2026, page 1 : Traitement d’automate fini](papier/sujet/p01.jpg){ loading=lazy .papier }](papier/sujet/p01.jpg)
    <p class="papier-legende">Traitement d’automate fini · Sujet du projet 2025-2026, page 1</p>

    [![Sujet du projet 2025-2026, page 2 : (Attention, la lisibilité de la table est capitale : les colonnes doivent être bien](papier/sujet/p02.jpg){ loading=lazy .papier }](papier/sujet/p02.jpg)
    <p class="papier-legende">(Attention, la lisibilité de la table est capitale : les colonnes doivent être bien · Sujet du projet 2025-2026, page 2</p>

    [![Sujet du projet 2025-2026, page 3 : Le résultat du test est affiché. Si l’automate est non déterministe, votre](papier/sujet/p03.jpg){ loading=lazy .papier }](papier/sujet/p03.jpg)
    <p class="papier-legende">Le résultat du test est affiché. Si l’automate est non déterministe, votre · Sujet du projet 2025-2026, page 3</p>

    [![Sujet du projet 2025-2026, page 4 : Pseudo-code :](papier/sujet/p04.jpg){ loading=lazy .papier }](papier/sujet/p04.jpg)
    <p class="papier-legende">Pseudo-code : · Sujet du projet 2025-2026, page 4</p>

    [![Sujet du projet 2025-2026, page 5 : lire_mot ( mot )](papier/sujet/p05.jpg){ loading=lazy .papier }](papier/sujet/p05.jpg)
    <p class="papier-legende">lire_mot ( mot ) · Sujet du projet 2025-2026, page 5</p>

    [![Sujet du projet 2025-2026, page 6 : AUTOMATES A PRENDRE EN COMPTE](papier/sujet/p06.jpg){ loading=lazy .papier }](papier/sujet/p06.jpg)
    <p class="papier-legende">AUTOMATES A PRENDRE EN COMPTE · Sujet du projet 2025-2026, page 6</p>

    [![Sujet du projet 2025-2026, page 7 : Par exemple :](papier/sujet/p07.jpg){ loading=lazy .papier }](papier/sujet/p07.jpg)
    <p class="papier-legende">Par exemple : · Sujet du projet 2025-2026, page 7</p>

    [![Sujet du projet 2025-2026, page 8 : Remise de votre travail](papier/sujet/p08.jpg){ loading=lazy .papier }](papier/sujet/p08.jpg)
    <p class="papier-legende">Remise de votre travail · Sujet du projet 2025-2026, page 8</p>

    [![Sujet du projet 2025-2026, page 9 : avoir préparé votre ordinateur, y avoir inclus tous vos programmes et fichiers](papier/sujet/p09.jpg){ loading=lazy .papier }](papier/sujet/p09.jpg)
    <p class="papier-legende">avoir préparé votre ordinateur, y avoir inclus tous vos programmes et fichiers · Sujet du projet 2025-2026, page 9</p>

    <!-- /papier -->

    <!-- papier: pdf/SM402P/projet-tests.pdf | Automates de test | tests | page -->

    [![Automates de test, page 1 : Automates Finis et Expressions Rationnelles - Projet](papier/tests/p01.jpg){ loading=lazy .papier }](papier/tests/p01.jpg)
    <p class="papier-legende">Automates Finis et Expressions Rationnelles - Projet · Automates de test, page 1</p>

    [![Automates de test, page 2](papier/tests/p02.jpg){ loading=lazy .papier }](papier/tests/p02.jpg)
    <p class="papier-legende">Automates de test, page 2</p>

    [![Automates de test, page 3](papier/tests/p03.jpg){ loading=lazy .papier }](papier/tests/p03.jpg)
    <p class="papier-legende">Automates de test, page 3</p>

    [![Automates de test, page 4](papier/tests/p04.jpg){ loading=lazy .papier }](papier/tests/p04.jpg)
    <p class="papier-legende">Automates de test, page 4</p>

    [![Automates de test, page 5](papier/tests/p05.jpg){ loading=lazy .papier }](papier/tests/p05.jpg)
    <p class="papier-legende">Automates de test, page 5</p>

    [![Automates de test, page 6](papier/tests/p06.jpg){ loading=lazy .papier }](papier/tests/p06.jpg)
    <p class="papier-legende">Automates de test, page 6</p>

    [![Automates de test, page 7](papier/tests/p07.jpg){ loading=lazy .papier }](papier/tests/p07.jpg)
    <p class="papier-legende">Automates de test, page 7</p>

    [![Automates de test, page 8](papier/tests/p08.jpg){ loading=lazy .papier }](papier/tests/p08.jpg)
    <p class="papier-legende">Automates de test, page 8</p>

    [![Automates de test, page 9](papier/tests/p09.jpg){ loading=lazy .papier }](papier/tests/p09.jpg)
    <p class="papier-legende">Automates de test, page 9</p>

    [![Automates de test, page 10](papier/tests/p10.jpg){ loading=lazy .papier }](papier/tests/p10.jpg)
    <p class="papier-legende">Automates de test, page 10</p>

    [![Automates de test, page 11](papier/tests/p11.jpg){ loading=lazy .papier }](papier/tests/p11.jpg)
    <p class="papier-legende">Automates de test, page 11</p>

    [![Automates de test, page 12](papier/tests/p12.jpg){ loading=lazy .papier }](papier/tests/p12.jpg)
    <p class="papier-legende">Automates de test, page 12</p>

    [![Automates de test, page 13](papier/tests/p13.jpg){ loading=lazy .papier }](papier/tests/p13.jpg)
    <p class="papier-legende">Automates de test, page 13</p>

    [![Automates de test, page 14](papier/tests/p14.jpg){ loading=lazy .papier }](papier/tests/p14.jpg)
    <p class="papier-legende">Automates de test, page 14</p>

    [![Automates de test, page 15](papier/tests/p15.jpg){ loading=lazy .papier }](papier/tests/p15.jpg)
    <p class="papier-legende">Automates de test, page 15</p>

    [![Automates de test, page 16](papier/tests/p16.jpg){ loading=lazy .papier }](papier/tests/p16.jpg)
    <p class="papier-legende">Automates de test, page 16</p>

    [![Automates de test, page 17](papier/tests/p17.jpg){ loading=lazy .papier }](papier/tests/p17.jpg)
    <p class="papier-legende">Automates de test, page 17</p>

    [![Automates de test, page 18](papier/tests/p18.jpg){ loading=lazy .papier }](papier/tests/p18.jpg)
    <p class="papier-legende">Automates de test, page 18</p>

    <!-- /papier -->
