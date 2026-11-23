---
title: "Ch. 3 — Automate complémentaire"
---

# Chapitre 3 — Automate reconnaissant le langage complémentaire

=== "Version simplifiée"

    Reconnaître « tous les mots **sauf** ceux qui contiennent $aba$ » semble difficile. En fait, c'est presque gratuit :
    on construit l'automate du langage $L$, puis on le transforme pour reconnaître $\overline L = A^* \setminus L$.

    !!! methode "Algorithme du complémentaire"
        1. Partir d'un automate de $L$, le **déterminiser** s'il ne l'est pas.
        2. Le **compléter** (état poubelle) s'il ne l'est pas.
        3. **Échanger** terminaux et non terminaux : chaque S disparaît, chaque état sans S en reçoit un (la poubelle comprise).

    !!! piege "Les deux étapes préalables sont obligatoires"
        - Sur un automate **non complet**, un mot qui « tombe » faute de transition ne serait reconnu par aucun des deux automates.
          C'est l'état poubelle qui, en devenant terminal, récupère ces mots.
        - Sur un automate **non déterministe**, un mot peut avoir un chemin réussi et un chemin raté : échanger les sorties ne donne pas le complémentaire.

    ## Exemple : les mots sans le facteur $aba$

    Automate des mots **contenant** $aba$ : $0 \xrightarrow{a,b} 0$, $0 \xrightarrow{a} 1 \xrightarrow{b} 2 \xrightarrow{a} 3$, $3 \xrightarrow{a,b} 3$, sortie 3.
    Sa déterminisation est déjà complète :

    | Contient $aba$ | état | a | b | | Sans $aba$ | état | a | b |
    |---|---|---|---|---|---|---|---|---|
    | E | 0 | 01 | 0 | | E/S | 0 | 01 | 0 |
    | | 01 | 01 | 02 | | S | 01 | 01 | 02 |
    | | 02 | 013 | 0 | | S | 02 | 013 | 0 |
    | S | 013 | 013 | 023 | | | 013 | 013 | 023 |
    | S | 023 | 013 | 03 | | | 023 | 013 | 03 |
    | S | 03 | 013 | 03 | | | 03 | 013 | 03 |

    La complémentation se fait **directement sur la table**, sans rien dessiner.

=== "Version papier"

    Les diapos du CTD 3.

    <!-- papier: pdf/SM402P/ctd3.pdf | CTD 3 — Automates complémentaires | ctd3 | diapo -->

    [![CTD 3 — Automates complémentaires, diapo 1](papier/ctd3/p01.jpg){ loading=lazy .papier }](papier/ctd3/p01.jpg)
    <p class="papier-legende">CTD 3 — Automates complémentaires, diapo 1</p>

    [![CTD 3 — Automates complémentaires, diapo 2](papier/ctd3/p02.jpg){ loading=lazy .papier }](papier/ctd3/p02.jpg)
    <p class="papier-legende">CTD 3 — Automates complémentaires, diapo 2</p>

    [![CTD 3 — Automates complémentaires, diapo 3 : (construction d’un AF reconnaissant le langage complémentaire](papier/ctd3/p03.jpg){ loading=lazy .papier }](papier/ctd3/p03.jpg)
    <p class="papier-legende">(construction d’un AF reconnaissant le langage complémentaire · CTD 3 — Automates complémentaires, diapo 3</p>

    [![CTD 3 — Automates complémentaires, diapo 4 : (construction d’un AF reconnaissant le langage complémentaire](papier/ctd3/p04.jpg){ loading=lazy .papier }](papier/ctd3/p04.jpg)
    <p class="papier-legende">(construction d’un AF reconnaissant le langage complémentaire · CTD 3 — Automates complémentaires, diapo 4</p>

    [![CTD 3 — Automates complémentaires, diapo 5 : (construction d’un AF reconnaissant le langage complémentaire](papier/ctd3/p05.jpg){ loading=lazy .papier }](papier/ctd3/p05.jpg)
    <p class="papier-legende">(construction d’un AF reconnaissant le langage complémentaire · CTD 3 — Automates complémentaires, diapo 5</p>

    [![CTD 3 — Automates complémentaires, diapo 6 : Exemple :](papier/ctd3/p06.jpg){ loading=lazy .papier }](papier/ctd3/p06.jpg)
    <p class="papier-legende">Exemple : · CTD 3 — Automates complémentaires, diapo 6</p>

    [![CTD 3 — Automates complémentaires, diapo 7 : Déterminisons cet automate:](papier/ctd3/p07.jpg){ loading=lazy .papier }](papier/ctd3/p07.jpg)
    <p class="papier-legende">Déterminisons cet automate: · CTD 3 — Automates complémentaires, diapo 7</p>

    [![CTD 3 — Automates complémentaires, diapo 8](papier/ctd3/p08.jpg){ loading=lazy .papier }](papier/ctd3/p08.jpg)
    <p class="papier-legende">CTD 3 — Automates complémentaires, diapo 8</p>

    [![CTD 3 — Automates complémentaires, diapo 9 : Rappel très important :](papier/ctd3/p09.jpg){ loading=lazy .papier }](papier/ctd3/p09.jpg)
    <p class="papier-legende">Rappel très important : · CTD 3 — Automates complémentaires, diapo 9</p>

    [![CTD 3 — Automates complémentaires, diapo 10 : La complémentarisation peut très bien être effectuée sans rien dessiner.](papier/ctd3/p10.jpg){ loading=lazy .papier }](papier/ctd3/p10.jpg)
    <p class="papier-legende">La complémentarisation peut très bien être effectuée sans rien dessiner. · CTD 3 — Automates complémentaires, diapo 10</p>

    <!-- /papier -->
