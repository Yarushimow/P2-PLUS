---
title: "Ch. 5 — Adaptation d'impédance"
---

# Chapitre 5 — Adaptation d'impédance avec l'abaque de Smith

=== "Version simplifiée"

    **Adapter** une charge $Z_t \ne R_c$, c'est ajouter un dispositif sans pertes
    pour que la ligne voie $R_c$ en un point A : $\Gamma(A) = 0$, toute la
    puissance active incidente va dans la charge.

    ## a) Transformateur quart d'onde

    Un tronçon de longueur $\lambda/4$ et d'impédance caractéristique $R_{c0}$
    ramène $Z = R_{c0}^2 / Z_1$.

    !!! methode "Adaptation par quart d'onde"
        1. Placer $z_t$, tracer son cercle.
        2. Tourner vers le générateur jusqu'à l'**axe réel** : on obtient
           $z(\ell_1) = r_B$ réel (deux solutions : $r_B = \rho$ à droite ou $1/\rho$ à gauche).
        3. Distance : $\ell_1 = (\eta_1 - \eta_0)\,\lambda$ (+ $k\lambda/2$).
        4. Insérer le quart d'onde à cette distance avec $R_{c0} = \sqrt{R_B\,R_c}$, où $R_B = r_B R_c$.

    !!! example "Exemple du cours : $Z_t = 10 + 20j$, $R_c = 50\ \Omega$"
        $z_t = 0{,}2 + 0{,}4j$, $\eta_0 = 0{,}062$.
        Solution 1 : $\Delta\eta = 0{,}188$, $r_B = 6$, $R_B = 300\ \Omega$, $R_{c0} = \sqrt{50\cdot300} \approx 123\ \Omega$.
        Solution 2 : $\Delta\eta = 0{,}438$, $r_B = 0{,}17$, $R_B = 8{,}5\ \Omega$, $R_{c0} \approx 20\ \Omega$.

    ## b) Stubs

    !!! definition "Stub"
        Tronçon de ligne terminé par un **court-circuit** ou un **circuit ouvert**.
        Son impédance est purement imaginaire (on se déplace sur le bord de l'abaque, $r = 0$) :

        $$
        Z_{cc}(d) = jR_{c0}\tan\beta d \qquad Z_{co}(d) = -jR_{c0}\cot\beta d
        $$

    !!! methode "Stub série"
        1. Tourner vers le générateur depuis $z_t$ jusqu'au cercle **$r = 1$** :
           $z(\ell_1) = 1 + jx$ → position $\ell_1$.
        2. Le stub doit ramener la réactance opposée : $X_{stub} = -x\,R_c$.
        3. Réduire par l'impédance du stub ($x_{stub} = X_{stub}/R_{c0}$), placer ce
           point sur le bord, et lire sa longueur depuis le court-circuit
           ($\eta = 0$) ou le circuit ouvert ($\eta = 0{,}25$).

    !!! methode "Stub parallèle (le plus courant)"
        Même démarche **en admittances** : placer $y_t = 1/z_t$ (point opposé), tourner
        jusqu'au cercle $g = 1$ ($y = 1 + jb$), puis choisir le stub qui ramène
        la susceptance $-jb$. En admittance, le court-circuit est à droite ($y = \infty$),
        le circuit ouvert à gauche ($y = 0$).

    !!! piege "Deux solutions"
        Le cercle de $z_t$ coupe l'axe réel (ou le cercle $r = 1$) en **deux points** :
        il y a toujours deux distances possibles. On donne les deux, ou la plus
        courte si l'énoncé le demande.

    ## c) Adaptation de la source

    Même principe côté générateur : on veut que le générateur voie une impédance
    adaptée à son impédance interne pour lui faire fournir le maximum de puissance.

=== "Version papier"

    Les diapos du chapitre telles que projetées en cours (C. Maréchal).

    <!-- papier: pdf/TE403P/2024-03-ct-lt-c3-adaptationimpedance.pdf | Adaptation d'impédance — support 2024 | ch5 | diapo -->

    [![Adaptation d&#x27;impédance — support 2024, diapo 1 : CANAUX DE TRANSMISSION](papier/ch5/p01.jpg){ loading=lazy .papier }](papier/ch5/p01.jpg)
    <p class="papier-legende">CANAUX DE TRANSMISSION · Adaptation d&#x27;impédance — support 2024, diapo 1</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 2 : Adaptation d’impédance](papier/ch5/p02.jpg){ loading=lazy .papier }](papier/ch5/p02.jpg)
    <p class="papier-legende">Adaptation d’impédance · Adaptation d&#x27;impédance — support 2024, diapo 2</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 3 : Adaptation d’impédance](papier/ch5/p03.jpg){ loading=lazy .papier }](papier/ch5/p03.jpg)
    <p class="papier-legende">Adaptation d’impédance · Adaptation d&#x27;impédance — support 2024, diapo 3</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 4 : Application à l’adaptation d’ impédance](papier/ch5/p04.jpg){ loading=lazy .papier }](papier/ch5/p04.jpg)
    <p class="papier-legende">Application à l’adaptation d’ impédance · Adaptation d&#x27;impédance — support 2024, diapo 4</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 5 : 1) On calcule l’impédance réduite zt Rc =](papier/ch5/p05.jpg){ loading=lazy .papier }](papier/ch5/p05.jpg)
    <p class="papier-legende">1) On calcule l’impédance réduite zt Rc = · Adaptation d&#x27;impédance — support 2024, diapo 5</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 6 : 4) Se déplacer sur l’abaque jusqu’à avoir](papier/ch5/p06.jpg){ loading=lazy .papier }](papier/ch5/p06.jpg)
    <p class="papier-legende">4) Se déplacer sur l’abaque jusqu’à avoir · Adaptation d&#x27;impédance — support 2024, diapo 6</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 7 : 4) Se déplacer sur l’abaque jusqu’à avoir](papier/ch5/p07.jpg){ loading=lazy .papier }](papier/ch5/p07.jpg)
    <p class="papier-legende">4) Se déplacer sur l’abaque jusqu’à avoir · Adaptation d&#x27;impédance — support 2024, diapo 7</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 8 : Adaptation d’impédance](papier/ch5/p08.jpg){ loading=lazy .papier }](papier/ch5/p08.jpg)
    <p class="papier-legende">Adaptation d’impédance · Adaptation d&#x27;impédance — support 2024, diapo 8</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 9 : Filtre passe bande à stub](papier/ch5/p09.jpg){ loading=lazy .papier }](papier/ch5/p09.jpg)
    <p class="papier-legende">Filtre passe bande à stub · Adaptation d&#x27;impédance — support 2024, diapo 9</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 10 : Zt + jRc 0 tan(d )](papier/ch5/p10.jpg){ loading=lazy .papier }](papier/ch5/p10.jpg)
    <p class="papier-legende">Zt + jRc 0 tan(d ) · Adaptation d&#x27;impédance — support 2024, diapo 10</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 11 : Z ramenée (d )](papier/ch5/p11.jpg){ loading=lazy .papier }](papier/ch5/p11.jpg)
    <p class="papier-legende">Z ramenée (d ) · Adaptation d&#x27;impédance — support 2024, diapo 11</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 12 : 1) On calcule l’impédance réduite zt Rc =](papier/ch5/p12.jpg){ loading=lazy .papier }](papier/ch5/p12.jpg)
    <p class="papier-legende">1) On calcule l’impédance réduite zt Rc = · Adaptation d&#x27;impédance — support 2024, diapo 12</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 13 : 4) Se déplacer sur l’abaque jusqu’à avoir](papier/ch5/p13.jpg){ loading=lazy .papier }](papier/ch5/p13.jpg)
    <p class="papier-legende">4) Se déplacer sur l’abaque jusqu’à avoir · Adaptation d&#x27;impédance — support 2024, diapo 13</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 14 : du court-circuit](papier/ch5/p14.jpg){ loading=lazy .papier }](papier/ch5/p14.jpg)
    <p class="papier-legende">du court-circuit · Adaptation d&#x27;impédance — support 2024, diapo 14</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 15 : Calcul de la longueur du stub](papier/ch5/p15.jpg){ loading=lazy .papier }](papier/ch5/p15.jpg)
    <p class="papier-legende">Calcul de la longueur du stub · Adaptation d&#x27;impédance — support 2024, diapo 15</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 16 : Exemple d’adaptation par un stub série en circuit-ouvert :](papier/ch5/p16.jpg){ loading=lazy .papier }](papier/ch5/p16.jpg)
    <p class="papier-legende">Exemple d’adaptation par un stub série en circuit-ouvert : · Adaptation d&#x27;impédance — support 2024, diapo 16</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 17 : 3) On trace le cercle de centre (0,0)](papier/ch5/p17.jpg){ loading=lazy .papier }](papier/ch5/p17.jpg)
    <p class="papier-legende">3) On trace le cercle de centre (0,0) · Adaptation d&#x27;impédance — support 2024, diapo 17</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 18 : Calcul de la longueur du stub](papier/ch5/p18.jpg){ loading=lazy .papier }](papier/ch5/p18.jpg)
    <p class="papier-legende">Calcul de la longueur du stub · Adaptation d&#x27;impédance — support 2024, diapo 18</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 19 : 4) Se déplacer sur l’abaque jusqu’à avoir](papier/ch5/p19.jpg){ loading=lazy .papier }](papier/ch5/p19.jpg)
    <p class="papier-legende">4) Se déplacer sur l’abaque jusqu’à avoir · Adaptation d&#x27;impédance — support 2024, diapo 19</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 20 : du circuit-ouvert](papier/ch5/p20.jpg){ loading=lazy .papier }](papier/ch5/p20.jpg)
    <p class="papier-legende">du circuit-ouvert · Adaptation d&#x27;impédance — support 2024, diapo 20</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 21 : On utilise l’abaque de Smith](papier/ch5/p21.jpg){ loading=lazy .papier }](papier/ch5/p21.jpg)
    <p class="papier-legende">On utilise l’abaque de Smith · Adaptation d&#x27;impédance — support 2024, diapo 21</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 22 : On utilise l’abaque en travaillant en admittance réduite.](papier/ch5/p22.jpg){ loading=lazy .papier }](papier/ch5/p22.jpg)
    <p class="papier-legende">On utilise l’abaque en travaillant en admittance réduite. · Adaptation d&#x27;impédance — support 2024, diapo 22</p>

    [![Adaptation d&#x27;impédance — support 2024, diapo 23 : 2. Adaptation de la source](papier/ch5/p23.jpg){ loading=lazy .papier }](papier/ch5/p23.jpg)
    <p class="papier-legende">2. Adaptation de la source · Adaptation d&#x27;impédance — support 2024, diapo 23</p>

    <!-- /papier -->
