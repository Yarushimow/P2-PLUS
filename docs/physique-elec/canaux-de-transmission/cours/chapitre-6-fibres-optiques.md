---
title: "Ch. 6 — Fibres optiques"
---

# Chapitre 6 — Les fibres optiques

=== "Version simplifiée"

    ## Pourquoi la fibre ?

    Très faible atténuation, très grande bande passante, insensible aux parasites
    électromagnétiques, isolation électrique totale, légère et souple. Chaîne
    type : émetteur (**DEL** ou **diode laser**) → fibre (+ amplificateurs,
    multiplexage en longueur d'onde) → **photodiode**.

    ## Rappels d'optique

    - Indice d'un milieu : $n = c/v \ge 1$.
    - Réflexion : $\theta_r = \theta_i$. Réfraction (Snell-Descartes) : $n_1\sin\theta_1 = n_2\sin\theta_2$.

    ## Principe : réflexion totale

    Cœur d'indice $n_c$ entouré d'une gaine d'indice $n_g < n_c$. La lumière
    avance par **réflexions totales** sur la gaine si son angle d'incidence
    dépasse l'angle limite :

    $$
    \sin\theta_{1,lim} = \frac{n_g}{n_c}
    $$

    !!! definition "Ouverture numérique et cône d'acceptance"

        $$
        ON = n_0\sin\theta_{0,lim} = \sqrt{n_c^2 - n_g^2}
        \qquad
        \Delta = \frac{n_c - n_g}{n_c}\ \ (0{,}1\,\% \text{ à quelques } \%)
        $$

        Tout rayon entrant dans le cône de demi-angle $\theta_{0,lim}$ est guidé.
        « Fibre 50/125 » = cœur de 50 µm, gaine de 125 µm de diamètre.

    ## Multimode ou monomode

    !!! theoreme "Fréquence normalisée et nombre de modes"

        $$
        V = \frac{2\pi a}{\lambda_0}\,ON
        \qquad
        M \approx \frac{\alpha}{\alpha + 2}\cdot\frac{V^2}{2}
        $$

        ($a$ : rayon du cœur.) Saut d'indice ($\alpha \to \infty$) : $M = V^2/2$ ;
        gradient parabolique ($\alpha = 2$) : $M = V^2/4$.
        **Monomode** si $V < V_c = 2{,}405$.

    | Type | Source | Usage | Débit indicatif |
    |---|---|---|---|
    | Multimode à saut d'indice | DEL | courte distance (LAN) | ~100 Mbit/s |
    | Multimode à gradient d'indice | DEL / laser | moyenne distance | ~500 Mbit/s |
    | Monomode | laser | longue distance | ≥ 1 Gbit/s |

    Dans une fibre à gradient d'indice, $n(r) = n_{c0}\sqrt{1 - 2\Delta(r/a)^\alpha}$ :
    les rayons qui s'écartent de l'axe vont plus vite, ce qui compense leur
    trajet plus long et réduit la dispersion.

    ## Dispersion : l'impulsion s'étale

    !!! theoreme "Élargissement d'une impulsion"
        - **Intermodale** (multimode) : $D = \dfrac{n_c\,\Delta}{c}$ (s/m), $\Delta\tau = D\times L_0$.
        - **Chromatique** (subsiste en monomode, nulle vers 1310 nm dans la silice) :
          $\Delta\tau = D\,(\text{ps/(nm·km)}) \times \Delta\lambda \times L_0$.
        - De **polarisation** : seulement sur de très longues distances.

    ## Atténuation et bilan de liaison

    !!! methode "Bilan de liaison en dB"

        $$
        P_r\,(\text{dBm}) = P_e\,(\text{dBm}) - a\,(\text{dB/km}) \times L
        \qquad
        P\,(\text{dBm}) = 10\log\frac{P}{1\ \text{mW}}
        $$

        Portée maximale : $L_{max} = \dfrac{P_e - P_{r,min}}{a}$. Les fenêtres de
        transmission sont à 850, 1310 et 1550 nm (minimum d'atténuation vers 1550 nm).

=== "Version papier"

    Les diapos du chapitre telles que projetées en cours (C. Maréchal).

    <!-- papier: pdf/TE403P/2223-09-ct-fo.pdf | Fibres optiques — support | ch6 | diapo -->

    [![Fibres optiques — support, diapo 1 : Fibres optiques](papier/ch6/p01.jpg){ loading=lazy .papier }](papier/ch6/p01.jpg)
    <p class="papier-legende">Fibres optiques · Fibres optiques — support, diapo 1</p>

    [![Fibres optiques — support, diapo 2](papier/ch6/p02.jpg){ loading=lazy .papier }](papier/ch6/p02.jpg)
    <p class="papier-legende">Fibres optiques — support, diapo 2</p>

    [![Fibres optiques — support, diapo 3 : Dates clés](papier/ch6/p03.jpg){ loading=lazy .papier }](papier/ch6/p03.jpg)
    <p class="papier-legende">Dates clés · Fibres optiques — support, diapo 3</p>

    [![Fibres optiques — support, diapo 4 : Domaines d’utilisation](papier/ch6/p04.jpg){ loading=lazy .papier }](papier/ch6/p04.jpg)
    <p class="papier-legende">Domaines d’utilisation · Fibres optiques — support, diapo 4</p>

    [![Fibres optiques — support, diapo 5 : Fibres optiques](papier/ch6/p05.jpg){ loading=lazy .papier }](papier/ch6/p05.jpg)
    <p class="papier-legende">Fibres optiques · Fibres optiques — support, diapo 5</p>

    [![Fibres optiques — support, diapo 6 : 2.1. Loi de réflexion](papier/ch6/p06.jpg){ loading=lazy .papier }](papier/ch6/p06.jpg)
    <p class="papier-legende">2.1. Loi de réflexion · Fibres optiques — support, diapo 6</p>

    [![Fibres optiques — support, diapo 7 : 2.3. Loi de réfraction](papier/ch6/p07.jpg){ loading=lazy .papier }](papier/ch6/p07.jpg)
    <p class="papier-legende">2.3. Loi de réfraction · Fibres optiques — support, diapo 7</p>

    [![Fibres optiques — support, diapo 8 : 3.1. Constitution d’une fibre](papier/ch6/p08.jpg){ loading=lazy .papier }](papier/ch6/p08.jpg)
    <p class="papier-legende">3.1. Constitution d’une fibre · Fibres optiques — support, diapo 8</p>

    [![Fibres optiques — support, diapo 9 : 3.2. Principe de fonctionnement d’une fibre optique](papier/ch6/p09.jpg){ loading=lazy .papier }](papier/ch6/p09.jpg)
    <p class="papier-legende">3.2. Principe de fonctionnement d’une fibre optique · Fibres optiques — support, diapo 9</p>

    [![Fibres optiques — support, diapo 10 : dans la gaine mais transmise dans le cœur.](papier/ch6/p10.jpg){ loading=lazy .papier }](papier/ch6/p10.jpg)
    <p class="papier-legende">dans la gaine mais transmise dans le cœur. · Fibres optiques — support, diapo 10</p>

    [![Fibres optiques — support, diapo 11 : 3.3. Ouverture numérique](papier/ch6/p11.jpg){ loading=lazy .papier }](papier/ch6/p11.jpg)
    <p class="papier-legende">3.3. Ouverture numérique · Fibres optiques — support, diapo 11</p>

    [![Fibres optiques — support, diapo 12 : Fibres optiques](papier/ch6/p12.jpg){ loading=lazy .papier }](papier/ch6/p12.jpg)
    <p class="papier-legende">Fibres optiques · Fibres optiques — support, diapo 12</p>

    [![Fibres optiques — support, diapo 13 : 4.Fibres monomode et multimodes](papier/ch6/p13.jpg){ loading=lazy .papier }](papier/ch6/p13.jpg)
    <p class="papier-legende">4.Fibres monomode et multimodes · Fibres optiques — support, diapo 13</p>

    [![Fibres optiques — support, diapo 14 : a) Fibre optique multimode à saut d’indice](papier/ch6/p14.jpg){ loading=lazy .papier }](papier/ch6/p14.jpg)
    <p class="papier-legende">a) Fibre optique multimode à saut d’indice · Fibres optiques — support, diapo 14</p>

    [![Fibres optiques — support, diapo 15 : Utilisation des fibres multimodes à gradient d’indice](papier/ch6/p15.jpg){ loading=lazy .papier }](papier/ch6/p15.jpg)
    <p class="papier-legende">Utilisation des fibres multimodes à gradient d’indice · Fibres optiques — support, diapo 15</p>

    [![Fibres optiques — support, diapo 16 : 4.Fibres monomode et multimodes](papier/ch6/p16.jpg){ loading=lazy .papier }](papier/ch6/p16.jpg)
    <p class="papier-legende">4.Fibres monomode et multimodes · Fibres optiques — support, diapo 16</p>

    [![Fibres optiques — support, diapo 17 : Avec ON, l’ouverture numérique : ON =](papier/ch6/p17.jpg){ loading=lazy .papier }](papier/ch6/p17.jpg)
    <p class="papier-legende">Avec ON, l’ouverture numérique : ON = · Fibres optiques — support, diapo 17</p>

    [![Fibres optiques — support, diapo 18 : 5. Dispersion dans les fibres](papier/ch6/p18.jpg){ loading=lazy .papier }](papier/ch6/p18.jpg)
    <p class="papier-legende">5. Dispersion dans les fibres · Fibres optiques — support, diapo 18</p>

    [![Fibres optiques — support, diapo 19 : Conséquences de la dispersion](papier/ch6/p19.jpg){ loading=lazy .papier }](papier/ch6/p19.jpg)
    <p class="papier-legende">Conséquences de la dispersion · Fibres optiques — support, diapo 19</p>

    [![Fibres optiques — support, diapo 20 : Trajet direct le plus court:](papier/ch6/p20.jpg){ loading=lazy .papier }](papier/ch6/p20.jpg)
    <p class="papier-legende">Trajet direct le plus court: · Fibres optiques — support, diapo 20</p>

    [![Fibres optiques — support, diapo 21 : La dispersion chromatique est une donnée que l’on trouve dans les](papier/ch6/p21.jpg){ loading=lazy .papier }](papier/ch6/p21.jpg)
    <p class="papier-legende">La dispersion chromatique est une donnée que l’on trouve dans les · Fibres optiques — support, diapo 21</p>

    [![Fibres optiques — support, diapo 22 : 6. Atténuation dans les fibres](papier/ch6/p22.jpg){ loading=lazy .papier }](papier/ch6/p22.jpg)
    <p class="papier-legende">6. Atténuation dans les fibres · Fibres optiques — support, diapo 22</p>

    [![Fibres optiques — support, diapo 23 : ✓1ière fenêtre de 0,8 à 0,9µm](papier/ch6/p23.jpg){ loading=lazy .papier }](papier/ch6/p23.jpg)
    <p class="papier-legende">✓1ière fenêtre de 0,8 à 0,9µm · Fibres optiques — support, diapo 23</p>

    <!-- /papier -->
