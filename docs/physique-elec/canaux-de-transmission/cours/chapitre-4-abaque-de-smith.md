---
title: "Ch. 4 — Abaque de Smith"
---

# Chapitre 4 — L'abaque de Smith

=== "Version simplifiée"

    ## Ce que représente l'abaque

    L'abaque de Smith est le **plan complexe du coefficient de réflexion**
    $\Gamma$, en coordonnées polaires, sur lequel on a tracé la grille des
    **impédances réduites** $z = Z/R_c$ :

    $$
    \Gamma = \frac{z - 1}{z + 1}
    \qquad\Longleftrightarrow\qquad
    z = \frac{1 + \Gamma}{1 - \Gamma}
    $$

    Comme $z$ est **réduite**, l'abaque est le même pour toutes les lignes.

    | Point remarquable | $\Gamma$ | $z$ |
    |---|---|---|
    | Centre | 0 | 1 (charge adaptée) |
    | Bord gauche | −1 | 0 (court-circuit) |
    | Bord droit | +1 | ∞ (circuit ouvert) |
    | Moitié haute | | inductif ($x > 0$) |
    | Moitié basse | | capacitif ($x < 0$) |

    Une charge passive donne toujours $|\Gamma| \le 1$ : on reste **dans le disque**.

    ## Se déplacer le long d'une ligne sans pertes

    $\Gamma(\ell) = \Gamma_t\,e^{-2j\beta\ell}$ : le module ne change pas, seule la
    phase tourne. On se déplace donc sur un **cercle centré au centre de l'abaque**
    (à tracer au compas).

    !!! definition "Angle électrique $\eta$ (graduation extérieure, en longueurs d'onde)"
        - Un tour complet = $\lambda/2$ ; l'origine $\eta = 0$ est au court-circuit.
        - **Vers le générateur** : sens **horaire** ; **vers la charge** : sens anti-horaire.
        - Se déplacer de $\Delta\ell$ revient à tourner de $\Delta\eta = \dfrac{\Delta\ell}{\lambda}$ (modulo 0,5).

    ## Méthode : impédance ramenée à une distance $\ell$

    !!! methode "Impédance vue à l'abscisse $\ell_1$"
        1. Calculer $z_t = Z_t / R_c$ et le placer (intersection cercle $r$ / arc $x$).
        2. Tracer le cercle centré passant par $z_t$.
        3. Lire l'angle électrique $\eta_0$ de $z_t$ sur la graduation « vers le générateur ».
        4. Tourner de $\Delta\eta = \ell_1/\lambda$ (modulo 0,5) **vers le générateur**.
        5. Lire $z(\ell_1)$ au point d'arrivée, puis $Z = z\,R_c$.

    !!! methode "Lectures rapides"
        - $|\Gamma|$ = rayon du cercle / rayon de l'abaque.
        - **TOS** $\rho$ = valeur de $r$ là où le cercle coupe l'axe réel à droite du centre.
        - **Maximum de tension** : intersection avec l'axe réel à droite ($z = \rho$) ;
          **minimum** : à gauche ($z = 1/\rho$). Deux extrema successifs sont à $\lambda/4$.
        - **Admittance** : $y = 1/z$ est le point **diamétralement opposé** à $z$
          sur le cercle. Pour des éléments **en parallèle**, travailler en admittances.

    !!! piege "Sens de rotation"
        On s'éloigne de la charge = on va vers le générateur = sens horaire. Se
        tromper de sens donne le symétrique de la bonne réponse par rapport à l'axe réel.

=== "Version papier"

    Les diapos du chapitre telles que projetées en cours (C. Maréchal, 2025-2026), puis l'abaque vierge à imprimer pour les TD.

    <!-- papier: pdf/TE403P/2025-10-ct-lt-c2-abaquedesmith.pdf | Abaque de Smith — support 2025-2026 | ch4 | diapo -->

    [![Abaque de Smith — support 2025-2026, diapo 1 : Lignes de transmission :](papier/ch4/p01.jpg){ loading=lazy .papier }](papier/ch4/p01.jpg)
    <p class="papier-legende">Lignes de transmission : · Abaque de Smith — support 2025-2026, diapo 1</p>

    [![Abaque de Smith — support 2025-2026, diapo 2 : 4. Impédances ou admittances normalisées](papier/ch4/p02.jpg){ loading=lazy .papier }](papier/ch4/p02.jpg)
    <p class="papier-legende">4. Impédances ou admittances normalisées · Abaque de Smith — support 2025-2026, diapo 2</p>

    [![Abaque de Smith — support 2025-2026, diapo 3 : Allure générale de l’abaque](papier/ch4/p03.jpg){ loading=lazy .papier }](papier/ch4/p03.jpg)
    <p class="papier-legende">Allure générale de l’abaque · Abaque de Smith — support 2025-2026, diapo 3</p>

    [![Abaque de Smith — support 2025-2026, diapo 4 : Placement (ou lecture) d’un](papier/ch4/p04.jpg){ loading=lazy .papier }](papier/ch4/p04.jpg)
    <p class="papier-legende">Placement (ou lecture) d’un · Abaque de Smith — support 2025-2026, diapo 4</p>

    [![Abaque de Smith — support 2025-2026, diapo 5 : Lieu de tous les coefficients de](papier/ch4/p05.jpg){ loading=lazy .papier }](papier/ch4/p05.jpg)
    <p class="papier-legende">Lieu de tous les coefficients de · Abaque de Smith — support 2025-2026, diapo 5</p>

    [![Abaque de Smith — support 2025-2026, diapo 6 : Soit (0) coefficient de réflexion au point 0.](papier/ch4/p06.jpg){ loading=lazy .papier }](papier/ch4/p06.jpg)
    <p class="papier-legende">Soit (0) coefficient de réflexion au point 0. · Abaque de Smith — support 2025-2026, diapo 6</p>

    [![Abaque de Smith — support 2025-2026, diapo 7 : 4. Abaque de Smith et impédances ou admittances normalisées](papier/ch4/p07.jpg){ loading=lazy .papier }](papier/ch4/p07.jpg)
    <p class="papier-legende">4. Abaque de Smith et impédances ou admittances normalisées · Abaque de Smith — support 2025-2026, diapo 7</p>

    [![Abaque de Smith — support 2025-2026, diapo 8 : De quel angle électrique je me déplace sur l’abaque de Smith?](papier/ch4/p08.jpg){ loading=lazy .papier }](papier/ch4/p08.jpg)
    <p class="papier-legende">De quel angle électrique je me déplace sur l’abaque de Smith? · Abaque de Smith — support 2025-2026, diapo 8</p>

    [![Abaque de Smith — support 2025-2026, diapo 9 : Déplacement sur l’abaque](papier/ch4/p09.jpg){ loading=lazy .papier }](papier/ch4/p09.jpg)
    <p class="papier-legende">Déplacement sur l’abaque · Abaque de Smith — support 2025-2026, diapo 9</p>

    [![Abaque de Smith — support 2025-2026, diapo 10 : 4. Abaque de Smith et impédances ou admittances normalisées](papier/ch4/p10.jpg){ loading=lazy .papier }](papier/ch4/p10.jpg)
    <p class="papier-legende">4. Abaque de Smith et impédances ou admittances normalisées · Abaque de Smith — support 2025-2026, diapo 10</p>

    [![Abaque de Smith — support 2025-2026, diapo 11 : Intérêt de l’impédance réduite :](papier/ch4/p11.jpg){ loading=lazy .papier }](papier/ch4/p11.jpg)
    <p class="papier-legende">Intérêt de l’impédance réduite : · Abaque de Smith — support 2025-2026, diapo 11</p>

    [![Abaque de Smith — support 2025-2026, diapo 12 : En résumé :](papier/ch4/p12.jpg){ loading=lazy .papier }](papier/ch4/p12.jpg)
    <p class="papier-legende">En résumé : · Abaque de Smith — support 2025-2026, diapo 12</p>

    [![Abaque de Smith — support 2025-2026, diapo 13](papier/ch4/p13.jpg){ loading=lazy .papier }](papier/ch4/p13.jpg)
    <p class="papier-legende">Abaque de Smith — support 2025-2026, diapo 13</p>

    [![Abaque de Smith — support 2025-2026, diapo 14 : 4. Abaque de Smith et impédances ou admittances normalisées](papier/ch4/p14.jpg){ loading=lazy .papier }](papier/ch4/p14.jpg)
    <p class="papier-legende">4. Abaque de Smith et impédances ou admittances normalisées · Abaque de Smith — support 2025-2026, diapo 14</p>

    [![Abaque de Smith — support 2025-2026, diapo 15 : 1) On calcule l’impédance réduite zt =](papier/ch4/p15.jpg){ loading=lazy .papier }](papier/ch4/p15.jpg)
    <p class="papier-legende">1) On calcule l’impédance réduite zt = · Abaque de Smith — support 2025-2026, diapo 15</p>

    [![Abaque de Smith — support 2025-2026, diapo 16 : Hypothèses :](papier/ch4/p16.jpg){ loading=lazy .papier }](papier/ch4/p16.jpg)
    <p class="papier-legende">Hypothèses : · Abaque de Smith — support 2025-2026, diapo 16</p>

    [![Abaque de Smith — support 2025-2026, diapo 17 : Hypothèses :](papier/ch4/p17.jpg){ loading=lazy .papier }](papier/ch4/p17.jpg)
    <p class="papier-legende">Hypothèses : · Abaque de Smith — support 2025-2026, diapo 17</p>

    [![Abaque de Smith — support 2025-2026, diapo 18 : Hypothèses :](papier/ch4/p18.jpg){ loading=lazy .papier }](papier/ch4/p18.jpg)
    <p class="papier-legende">Hypothèses : · Abaque de Smith — support 2025-2026, diapo 18</p>

    <!-- /papier -->

    <!-- papier: pdf/TE403P/abaque-smith.pdf | Abaque de Smith vierge | vierge | page -->

    [![Abaque de Smith vierge, page 1 : Abaque de Smith](papier/vierge/p01.jpg){ loading=lazy .papier }](papier/vierge/p01.jpg)
    <p class="papier-legende">Abaque de Smith · Abaque de Smith vierge, page 1</p>

    <!-- /papier -->
