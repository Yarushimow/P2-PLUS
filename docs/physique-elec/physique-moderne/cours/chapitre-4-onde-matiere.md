---
title: "Ch. 4 — Onde et matière"
---

# Chapitre 4 — Onde et matière (bases expérimentales de la quantique)

=== "Version simplifiée"

    ## La lumière, onde électromagnétique

    $\nu = \dfrac{c}{\lambda}$ et l'énergie d'un photon vaut $E = h\nu = \dfrac{hc}{\lambda}$,
    avec $h = 6{,}63\times10^{-34}$ J·s.

    | Domaine | γ | X | UV | Visible | IR |
    |---------|---|---|----|---------|----|
    | λ | 0,001 – 0,01 nm | 0,01 – 10 nm | 10 – 400 nm | 400 – 800 nm | 800 nm – 1 mm |

    !!! definition "Quantification de Planck (1900)"
        Les échanges d'énergie entre matière et rayonnement se font par paquets
        $\Delta E = h\nu$ (le **quantum**). Les oscillateurs ne peuvent avoir que les énergies $E = n\,h\nu$.

    ## Quatre échecs de la physique classique

    ### 1. Spectres atomiques discrets

    La physique classique prévoit un spectre continu, mais on observe des **raies**. Les
    niveaux d'énergie de l'atome sont quantifiés (pour l'hydrogène : $E_n = -\dfrac{13{,}6}{n^2}$ eV).

    ### 2. Le corps noir

    !!! definition "Corps noir"
        Objet idéal qui absorbe tout rayonnement et dont le spectre émis ne dépend que de
        sa température. Modèle : une cavité percée d'un petit trou. Le Soleil ≈ un corps noir à environ 5800 K.

    !!! theoreme "Lois du corps noir"
        - **Wien** : $\lambda_{max}\,T = 2{,}898\times10^{-3}$ m·K. Plus c'est chaud, plus le pic se décale vers le bleu.
        - **Stefan** : $I = \varepsilon\,\sigma\,T^4$ (W/m²), avec $\sigma = 5{,}67\times10^{-8}$ W·m⁻²·K⁻⁴ et $\varepsilon = 1$ pour un corps noir. Puissance totale : $P = I \times S$.

    La théorie classique (Rayleigh-Jeans) colle aux grandes longueurs d'onde mais diverge
    aux courtes : c'est la **catastrophe ultraviolette**. Planck la résout en quantifiant l'énergie.

    ### 3. L'effet photoélectrique

    Une lumière qui frappe un métal peut en arracher des électrons (Hertz 1887, Einstein 1905,
    Millikan). On mesure le **potentiel d'arrêt** $V_0$ qui stoppe les électrons les plus rapides :
    $E_{c,max} = e\,V_0$.

    | Observation | Explication classique | Réalité |
    |-------------|-----------------------|---------|
    | $V_0$ ne dépend pas de l'intensité | Plus d'intensité → plus d'énergie par électron | ✗ |
    | $V_0$ dépend de la fréquence | Non prévu | ✓ |
    | Rien sous une fréquence seuil $\nu_0$ | Il suffirait d'augmenter l'intensité | ✗ |
    | Émission instantanée (< 1 ns) | Il faudrait un temps d'accumulation | ✗ |

    !!! theoreme "Équation d'Einstein"
        La lumière est faite de **photons** d'énergie $h\nu$. Un photon cède toute son énergie à un électron :
        $$
        h\nu = W_0 + E_{c,max} \qquad W_0 = h\nu_0 \qquad e\,V_0 = h\,(\nu - \nu_0)
        $$
        $W_0$ est le **travail d'extraction** du métal. L'intensité lumineuse change le
        **nombre** d'électrons (le courant), pas leur énergie.

    ### 4. L'effet Compton

    Un photon X diffusé par un électron (quasi libre, au repos) ressort avec une longueur
    d'onde **plus grande**. On traite la collision comme un choc élastique entre deux particules,
    le photon ayant une impulsion $p = \dfrac{h}{\lambda} = \dfrac{h\nu}{c} = \dfrac{E}{c}$.

    !!! theoreme "Décalage Compton"
        $$
        \lambda_f - \lambda_i = \frac{h}{m_e c}\,(1 - \cos\theta)
        \qquad \frac{h}{m_ec} \approx 2{,}43\ \text{pm}
        $$
        Le photon perd de l'énergie, mais va toujours à $c$ : c'est sa fréquence qui diminue.

    ## Dualité onde-corpuscule

    - **Onde** : interférences (fentes d'Young), propagation.
    - **Particule** : effet photoélectrique, effet Compton (échanges d'énergie).

    !!! theoreme "Relation de De Broglie (1923)"
        À toute particule d'impulsion $p$ est associée une onde de longueur d'onde
        $$
        \lambda = \frac{h}{p} = \frac{h}{mv}
        $$
        Les effets ondulatoires ne se voient qu'à l'échelle atomique.

    ## Le photon

    $m_0 = 0$, il se déplace à $c$ et n'est jamais au repos : $E = h\nu = pc$ et $p = \dfrac{h}{\lambda}$.

    Exercices : [TD 4](../td/td-4-onde-matiere.md) · Synthèse : [fiche quantique](../fiches/fiche-quantique.md).

=== "Version papier"

    Les diapos du chapitre 4 « Onde et matière » (support du Pr F. Kwabia Tchana), diapos 1 à 52. Ce support ne contient pas d'énoncés de TD.

    [![Cours chapitre 4, diapo 1 : Page de titre](papier/ch4/p01.jpg){ loading=lazy .papier }](papier/ch4/p01.jpg)
    <p class="papier-legende">Page de titre · Cours chapitre 4, diapo 1</p>

    [![Cours chapitre 4, diapo 2 : Plan](papier/ch4/p02.jpg){ loading=lazy .papier }](papier/ch4/p02.jpg)
    <p class="papier-legende">Plan · Cours chapitre 4, diapo 2</p>

    [![Cours chapitre 4, diapo 3 : I. Introduction : propriétés de la lumière (photons)](papier/ch4/p03.jpg){ loading=lazy .papier }](papier/ch4/p03.jpg)
    <p class="papier-legende">I. Introduction : propriétés de la lumière (photons) · Cours chapitre 4, diapo 3</p>

    [![Cours chapitre 4, diapo 4 : Propriétés de la lumière (photons) : longueur d’onde et fréquence](papier/ch4/p04.jpg){ loading=lazy .papier }](papier/ch4/p04.jpg)
    <p class="papier-legende">Propriétés de la lumière (photons) : longueur d’onde et fréquence · Cours chapitre 4, diapo 4</p>

    [![Cours chapitre 4, diapo 5 : Spectre électromagnétique](papier/ch4/p05.jpg){ loading=lazy .papier }](papier/ch4/p05.jpg)
    <p class="papier-legende">Spectre électromagnétique · Cours chapitre 4, diapo 5</p>

    [![Cours chapitre 4, diapo 6 : Spectre électromagnétique : quelques domaines à connaître](papier/ch4/p06.jpg){ loading=lazy .papier }](papier/ch4/p06.jpg)
    <p class="papier-legende">Spectre électromagnétique : quelques domaines à connaître · Cours chapitre 4, diapo 6</p>

    [![Cours chapitre 4, diapo 7 : Quantification de l'énergie par Planck (1900)](papier/ch4/p07.jpg){ loading=lazy .papier }](papier/ch4/p07.jpg)
    <p class="papier-legende">Quantification de l'énergie par Planck (1900) · Cours chapitre 4, diapo 7</p>

    [![Cours chapitre 4, diapo 8 : II. Échec de la physique classique](papier/ch4/p08.jpg){ loading=lazy .papier }](papier/ch4/p08.jpg)
    <p class="papier-legende">II. Échec de la physique classique · Cours chapitre 4, diapo 8</p>

    [![Cours chapitre 4, diapo 9 : 1- Spectres des atomes (spectres discrets)](papier/ch4/p09.jpg){ loading=lazy .papier }](papier/ch4/p09.jpg)
    <p class="papier-legende">1- Spectres des atomes (spectres discrets) · Cours chapitre 4, diapo 9</p>

    [![Cours chapitre 4, diapo 10 : 2- Corps noir](papier/ch4/p10.jpg){ loading=lazy .papier }](papier/ch4/p10.jpg)
    <p class="papier-legende">2- Corps noir · Cours chapitre 4, diapo 10</p>

    [![Cours chapitre 4, diapo 11 : 2 - Corps noir : représentation d’un corps noir](papier/ch4/p11.jpg){ loading=lazy .papier }](papier/ch4/p11.jpg)
    <p class="papier-legende">2 - Corps noir : représentation d’un corps noir · Cours chapitre 4, diapo 11</p>

    [![Cours chapitre 4, diapo 12 : 2 - Corps noir : rayonnement du corps noir, catastrophe de l’UV](papier/ch4/p12.jpg){ loading=lazy .papier }](papier/ch4/p12.jpg)
    <p class="papier-legende">2 - Corps noir : rayonnement du corps noir, catastrophe de l’UV · Cours chapitre 4, diapo 12</p>

    [![Cours chapitre 4, diapo 13 : 2 - Corps noir : rayonnement du corps noir, loi de Planck](papier/ch4/p13.jpg){ loading=lazy .papier }](papier/ch4/p13.jpg)
    <p class="papier-legende">2 - Corps noir : rayonnement du corps noir, loi de Planck · Cours chapitre 4, diapo 13</p>

    [![Cours chapitre 4, diapo 14 : 2 - Corps noir : exemple de corps noir, le soleil](papier/ch4/p14.jpg){ loading=lazy .papier }](papier/ch4/p14.jpg)
    <p class="papier-legende">2 - Corps noir : exemple de corps noir, le soleil · Cours chapitre 4, diapo 14</p>

    [![Cours chapitre 4, diapo 15 : 2 - Corps noir : première observation, loi du déplacement de Wien](papier/ch4/p15.jpg){ loading=lazy .papier }](papier/ch4/p15.jpg)
    <p class="papier-legende">2 - Corps noir : première observation, loi du déplacement de Wien · Cours chapitre 4, diapo 15</p>

    [![Cours chapitre 4, diapo 16 : 2 - Corps noir : deuxième observation, loi de Stefan](papier/ch4/p16.jpg){ loading=lazy .papier }](papier/ch4/p16.jpg)
    <p class="papier-legende">2 - Corps noir : deuxième observation, loi de Stefan · Cours chapitre 4, diapo 16</p>

    [![Cours chapitre 4, diapo 17 : 2 - Corps noir : interprétation classique](papier/ch4/p17.jpg){ loading=lazy .papier }](papier/ch4/p17.jpg)
    <p class="papier-legende">2 - Corps noir : interprétation classique · Cours chapitre 4, diapo 17</p>

    [![Cours chapitre 4, diapo 18 : 2 - Corps noir : interprétation quantique de Planck (1900)](papier/ch4/p18.jpg){ loading=lazy .papier }](papier/ch4/p18.jpg)
    <p class="papier-legende">2 - Corps noir : interprétation quantique de Planck (1900) · Cours chapitre 4, diapo 18</p>

    [![Cours chapitre 4, diapo 19 : 3 - Effet Photoélectrique](papier/ch4/p19.jpg){ loading=lazy .papier }](papier/ch4/p19.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique · Cours chapitre 4, diapo 19</p>

    [![Cours chapitre 4, diapo 20 : 3 - Effet Photoélectrique : la cellule photoélectrique](papier/ch4/p20.jpg){ loading=lazy .papier }](papier/ch4/p20.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : la cellule photoélectrique · Cours chapitre 4, diapo 20</p>

    [![Cours chapitre 4, diapo 21 : 3 - Effet Photoélectrique : potentiel d’arrêt](papier/ch4/p21.jpg){ loading=lazy .papier }](papier/ch4/p21.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : potentiel d’arrêt · Cours chapitre 4, diapo 21</p>

    [![Cours chapitre 4, diapo 22 : 3 - Effet Photoélectrique : résultat de l’expérience (1)](papier/ch4/p22.jpg){ loading=lazy .papier }](papier/ch4/p22.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : résultat de l’expérience (1) · Cours chapitre 4, diapo 22</p>

    [![Cours chapitre 4, diapo 23 : 3 - Effet Photoélectrique : Emax dépend de la fréquence (2)](papier/ch4/p23.jpg){ loading=lazy .papier }](papier/ch4/p23.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : Emax dépend de la fréquence (2) · Cours chapitre 4, diapo 23</p>

    [![Cours chapitre 4, diapo 24 : 3 - Effet Photoélectrique : fréquence seuil (3)](papier/ch4/p24.jpg){ loading=lazy .papier }](papier/ch4/p24.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : fréquence seuil (3) · Cours chapitre 4, diapo 24</p>

    [![Cours chapitre 4, diapo 25 : 3 - Effet Photoélectrique : courant et intensité lumineuse (4, 5)](papier/ch4/p25.jpg){ loading=lazy .papier }](papier/ch4/p25.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : courant et intensité lumineuse (4, 5) · Cours chapitre 4, diapo 25</p>

    [![Cours chapitre 4, diapo 26 : 3 - Effet Photoélectrique : interprétation classique, résultat 1](papier/ch4/p26.jpg){ loading=lazy .papier }](papier/ch4/p26.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : interprétation classique, résultat 1 · Cours chapitre 4, diapo 26</p>

    [![Cours chapitre 4, diapo 27 : 3 - Effet Photoélectrique : interprétation classique, résultat 2](papier/ch4/p27.jpg){ loading=lazy .papier }](papier/ch4/p27.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : interprétation classique, résultat 2 · Cours chapitre 4, diapo 27</p>

    [![Cours chapitre 4, diapo 28 : 3 - Effet Photoélectrique : interprétation classique, résultat 3](papier/ch4/p28.jpg){ loading=lazy .papier }](papier/ch4/p28.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : interprétation classique, résultat 3 · Cours chapitre 4, diapo 28</p>

    [![Cours chapitre 4, diapo 29 : 3 - Effet Photoélectrique : interprétation quantique](papier/ch4/p29.jpg){ loading=lazy .papier }](papier/ch4/p29.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : interprétation quantique · Cours chapitre 4, diapo 29</p>

    [![Cours chapitre 4, diapo 30 : 3 - Effet Photoélectrique : interprétation quantique, eV0 = hν − W0](papier/ch4/p30.jpg){ loading=lazy .papier }](papier/ch4/p30.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : interprétation quantique, eV0 = hν − W0 · Cours chapitre 4, diapo 30</p>

    [![Cours chapitre 4, diapo 31 : 3 - Effet Photoélectrique : interprétation quantique, fréquence seuil ν0](papier/ch4/p31.jpg){ loading=lazy .papier }](papier/ch4/p31.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : interprétation quantique, fréquence seuil ν0 · Cours chapitre 4, diapo 31</p>

    [![Cours chapitre 4, diapo 32 : 3 - Effet Photoélectrique : interprétation quantique, en résumé](papier/ch4/p32.jpg){ loading=lazy .papier }](papier/ch4/p32.jpg)
    <p class="papier-legende">3 - Effet Photoélectrique : interprétation quantique, en résumé · Cours chapitre 4, diapo 32</p>

    [![Cours chapitre 4, diapo 33 : 4 - Effet Compton](papier/ch4/p33.jpg){ loading=lazy .papier }](papier/ch4/p33.jpg)
    <p class="papier-legende">4 - Effet Compton · Cours chapitre 4, diapo 33</p>

    [![Cours chapitre 4, diapo 34 : 4 - Effet Compton : le photon traité comme une particule](papier/ch4/p34.jpg){ loading=lazy .papier }](papier/ch4/p34.jpg)
    <p class="papier-legende">4 - Effet Compton : le photon traité comme une particule · Cours chapitre 4, diapo 34</p>

    [![Cours chapitre 4, diapo 35 : 4 - Effet Compton : schéma du choc photon-électron](papier/ch4/p35.jpg){ loading=lazy .papier }](papier/ch4/p35.jpg)
    <p class="papier-legende">4 - Effet Compton : schéma du choc photon-électron · Cours chapitre 4, diapo 35</p>

    [![Cours chapitre 4, diapo 36 : 4 - Effet Compton : conservation de la quantité de mouvement et de l’énergie](papier/ch4/p36.jpg){ loading=lazy .papier }](papier/ch4/p36.jpg)
    <p class="papier-legende">4 - Effet Compton : conservation de la quantité de mouvement et de l’énergie · Cours chapitre 4, diapo 36</p>

    [![Cours chapitre 4, diapo 37 : 4 - Effet Compton : démonstration, relation (A)](papier/ch4/p37.jpg){ loading=lazy .papier }](papier/ch4/p37.jpg)
    <p class="papier-legende">4 - Effet Compton : démonstration, relation (A) · Cours chapitre 4, diapo 37</p>

    [![Cours chapitre 4, diapo 38 : 4 - Effet Compton : démonstration, relation (I)](papier/ch4/p38.jpg){ loading=lazy .papier }](papier/ch4/p38.jpg)
    <p class="papier-legende">4 - Effet Compton : démonstration, relation (I) · Cours chapitre 4, diapo 38</p>

    [![Cours chapitre 4, diapo 39 : 4 - Effet Compton : formule du décalage λ’ − λ](papier/ch4/p39.jpg){ loading=lazy .papier }](papier/ch4/p39.jpg)
    <p class="papier-legende">4 - Effet Compton : formule du décalage λ’ − λ · Cours chapitre 4, diapo 39</p>

    [![Cours chapitre 4, diapo 40 : 4 - Effet Compton : décalage de Compton et théorie des photons](papier/ch4/p40.jpg){ loading=lazy .papier }](papier/ch4/p40.jpg)
    <p class="papier-legende">4 - Effet Compton : décalage de Compton et théorie des photons · Cours chapitre 4, diapo 40</p>

    [![Cours chapitre 4, diapo 41 : 4 - Effet Compton : le photon perd de l’énergie, λ’ &gt; λ](papier/ch4/p41.jpg){ loading=lazy .papier }](papier/ch4/p41.jpg)
    <p class="papier-legende">4 - Effet Compton : le photon perd de l’énergie, λ’ &gt; λ · Cours chapitre 4, diapo 41</p>

    [![Cours chapitre 4, diapo 42 : 5 - Dualité onde-particule](papier/ch4/p42.jpg){ loading=lazy .papier }](papier/ch4/p42.jpg)
    <p class="papier-legende">5 - Dualité onde-particule · Cours chapitre 4, diapo 42</p>

    [![Cours chapitre 4, diapo 43 : 5 - Dualité onde-particule : aspect ondulatoire](papier/ch4/p43.jpg){ loading=lazy .papier }](papier/ch4/p43.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : aspect ondulatoire · Cours chapitre 4, diapo 43</p>

    [![Cours chapitre 4, diapo 44 : 5 - Dualité onde-particule : les photons sont-ils des particules ou des ondes ?](papier/ch4/p44.jpg){ loading=lazy .papier }](papier/ch4/p44.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : les photons sont-ils des particules ou des ondes ? · Cours chapitre 4, diapo 44</p>

    [![Cours chapitre 4, diapo 45 : 5 - Dualité onde-particule : nous les avons décrites comme des vagues jusqu'à présent](papier/ch4/p45.jpg){ loading=lazy .papier }](papier/ch4/p45.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : nous les avons décrites comme des vagues jusqu'à présent · Cours chapitre 4, diapo 45</p>

    [![Cours chapitre 4, diapo 46 : 5 - Dualité onde-particule : expérience de double fente de Thomas Young](papier/ch4/p46.jpg){ loading=lazy .papier }](papier/ch4/p46.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : expérience de double fente de Thomas Young · Cours chapitre 4, diapo 46</p>

    [![Cours chapitre 4, diapo 47 : 5 - Dualité onde-particule : l’effet photoélectrique, aspect corpusculaire ou particule](papier/ch4/p47.jpg){ loading=lazy .papier }](papier/ch4/p47.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : l’effet photoélectrique, aspect corpusculaire ou particule · Cours chapitre 4, diapo 47</p>

    [![Cours chapitre 4, diapo 48 : 5 - Dualité onde-particule : observation de l'effet photoélectrique… un phénomène quantique](papier/ch4/p48.jpg){ loading=lazy .papier }](papier/ch4/p48.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : observation de l'effet photoélectrique… un phénomène quantique · Cours chapitre 4, diapo 48</p>

    [![Cours chapitre 4, diapo 49 : 5 - Dualité onde-particule : effet Compton, aspect corpusculaire](papier/ch4/p49.jpg){ loading=lazy .papier }](papier/ch4/p49.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : effet Compton, aspect corpusculaire · Cours chapitre 4, diapo 49</p>

    [![Cours chapitre 4, diapo 50 : 5 - Dualité onde-particule : relation de Louis De Broglie](papier/ch4/p50.jpg){ loading=lazy .papier }](papier/ch4/p50.jpg)
    <p class="papier-legende">5 - Dualité onde-particule : relation de Louis De Broglie · Cours chapitre 4, diapo 50</p>

    [![Cours chapitre 4, diapo 51 : 6 - Photon](papier/ch4/p51.jpg){ loading=lazy .papier }](papier/ch4/p51.jpg)
    <p class="papier-legende">6 - Photon · Cours chapitre 4, diapo 51</p>

    [![Cours chapitre 4, diapo 52 : 6 - Photon : m0 = 0, E = hν = mc², p = hν/c](papier/ch4/p52.jpg){ loading=lazy .papier }](papier/ch4/p52.jpg)
    <p class="papier-legende">6 - Photon : m0 = 0, E = hν = mc², p = hν/c · Cours chapitre 4, diapo 52</p>
