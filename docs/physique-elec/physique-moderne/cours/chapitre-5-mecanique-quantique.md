---
title: "Ch. 5 — Mécanique quantique"
---

# Chapitre 5 — Introduction à la mécanique quantique

=== "Version simplifiée"

    ## Le paquet d'ondes

    Une onde simple $y = A\sin(kx - \omega t)$ n'est pas localisée, et sa vitesse de phase
    $v_{\varphi} = \omega/k = c^2/v$ dépasse $c$ pour une particule matérielle. Elle ne peut donc pas
    représenter une particule.

    **Solution** : on superpose des ondes de nombres d'onde voisins ($k_0 \pm \Delta k$). Leur somme
    forme un **paquet d'ondes**, localisé, qui se déplace à la **vitesse de groupe**

    $$
    v_g = \frac{d\omega}{dk} = v \quad \text{(la vitesse de la particule)}
    $$

    Plus on veut localiser la particule, plus il faut une large gamme $\Delta k$.

    ## La fonction d'onde

    !!! definition "Fonction d'onde Ψ"
        L'état d'une particule est décrit par $\Psi(x, y, z, t)$, complexe et sans sens
        physique direct. Ce qui a un sens, c'est la **densité de probabilité** :
        $|\Psi(x)|^2\,dx = \Psi^*\Psi\,dx$ est la probabilité de trouver la particule entre $x$ et $x + dx$.

    La mécanique quantique est **probabiliste** (on ne parle plus de trajectoire),
    la mécanique classique est déterministe.

    !!! definition "Conditions sur Ψ"
        - Ψ et sa dérivée sont **continues** ;
        - Ψ s'annule à l'infini ;
        - **normalisation** : $\displaystyle\int_{-\infty}^{+\infty} |\Psi(x)|^2\,dx = 1$ (la particule est forcément quelque part).

    ## Principe d'incertitude de Heisenberg

    !!! theoreme
        $$
        \Delta x\,\Delta p_x \ge \frac{\hbar}{2} \qquad \hbar = \frac{h}{2\pi}
        $$
        On ne peut pas connaître simultanément et exactement la position et l'impulsion
        d'une particule. Ce n'est pas une limite des instruments : c'est une propriété de la nature.

    ## Opérateurs

    Chaque grandeur mesurable (**observable**) est associée à un opérateur.

    | Grandeur | Opérateur (1D) |
    |----------|----------------|
    | Position | $\hat x\,\Psi = x\,\Psi$ |
    | Impulsion | $\hat p_x = -i\hbar\,\dfrac{d}{dx}$ |
    | Énergie cinétique | $\hat E_c = \dfrac{\hat p^2}{2m} = -\dfrac{\hbar^2}{2m}\dfrac{d^2}{dx^2}$ |
    | Énergie totale | $\hat E = i\hbar\,\dfrac{\partial}{\partial t}$ |
    | Hamiltonien | $\hat H = \hat E_c + \hat V$ |

    !!! definition "Valeur moyenne"
        $$
        \langle A \rangle = \int \Psi^*\,\hat A\,\Psi\,dx \quad \text{(Ψ normalisée)}
        $$

    ## Équation de Schrödinger

    Indépendante du temps (état stationnaire, $V$ indépendant de $t$) :

    !!! theoreme
        $$
        \hat H\,\Psi = E\,\Psi
        \quad\Longleftrightarrow\quad
        -\frac{\hbar^2}{2m}\frac{d^2\Psi}{dx^2} + V(x)\,\Psi = E\,\Psi
        $$
        C'est une équation **aux valeurs propres** : seules certaines énergies $E$ donnent une
        solution acceptable, donc **l'énergie est quantifiée** dès que la particule est confinée.

    ## Potentiel constant V₀ : les 3 cas

    On écrit $\Psi'' + \dfrac{2m(E - V_0)}{\hbar^2}\,\Psi = 0$.

    | Cas | On pose | Solution |
    |-----|---------|----------|
    | Particule libre ($V_0 = 0$) | $k = \dfrac{\sqrt{2mE}}{\hbar}$ | $\Psi = A e^{ikx} + B e^{-ikx}$, ou $A\sin kx + B\cos kx$ |
    | $E > V_0$ | $k = \dfrac{\sqrt{2m(E - V_0)}}{\hbar}$ | oscillante : $A e^{ikx} + B e^{-ikx}$ |
    | $E < V_0$ | $k = \dfrac{\sqrt{2m(V_0 - E)}}{\hbar}$ | exponentielle : $A e^{kx} + B e^{-kx}$ |

    Le 3e cas est **interdit en classique** mais possible en quantique : c'est l'**effet tunnel**.

    Application complète (puits infini, effet tunnel) : [TD 5](../td/td-5-quantique.md).

=== "Version papier"

    Les diapos du chapitre 5 « Introduction à la mécanique quantique » (support du Pr F. Kwabia Tchana), diapos 1 à 36, puis le résumé du chapitre (19 diapos). Ces supports ne contiennent pas d'énoncés de TD.

    [![Cours chapitre 5, diapo 1 : Page de titre](papier/ch5/p01.jpg){ loading=lazy .papier }](papier/ch5/p01.jpg)
    <p class="papier-legende">Page de titre · Cours chapitre 5, diapo 1</p>

    [![Cours chapitre 5, diapo 2 : Plan](papier/ch5/p02.jpg){ loading=lazy .papier }](papier/ch5/p02.jpg)
    <p class="papier-legende">Plan · Cours chapitre 5, diapo 2</p>

    [![Cours chapitre 5, diapo 3 : 1- Description du paquet d'ondes](papier/ch5/p03.jpg){ loading=lazy .papier }](papier/ch5/p03.jpg)
    <p class="papier-legende">1- Description du paquet d'ondes · Cours chapitre 5, diapo 3</p>

    [![Cours chapitre 5, diapo 4 : Deux difficultés avec l’équation (5.1) : distinguer une onde d'une particule](papier/ch5/p04.jpg){ loading=lazy .papier }](papier/ch5/p04.jpg)
    <p class="papier-legende">Deux difficultés avec l’équation (5.1) : distinguer une onde d'une particule · Cours chapitre 5, diapo 4</p>

    [![Cours chapitre 5, diapo 5 : Vitesse de phase vph = c²/v (5.2)](papier/ch5/p05.jpg){ loading=lazy .papier }](papier/ch5/p05.jpg)
    <p class="papier-legende">Vitesse de phase vph = c²/v (5.2) · Cours chapitre 5, diapo 5</p>

    [![Cours chapitre 5, diapo 6 : La localisation : groupe d'ondes et paquet d'ondes](papier/ch5/p06.jpg){ loading=lazy .papier }](papier/ch5/p06.jpg)
    <p class="papier-legende">La localisation : groupe d'ondes et paquet d'ondes · Cours chapitre 5, diapo 6</p>

    [![Cours chapitre 5, diapo 7 : Fig (5.1) (a) : formation d'un paquet d'ondes](papier/ch5/p07.jpg){ loading=lazy .papier }](papier/ch5/p07.jpg)
    <p class="papier-legende">Fig (5.1) (a) : formation d'un paquet d'ondes · Cours chapitre 5, diapo 7</p>

    [![Cours chapitre 5, diapo 8 : Fig (5.1) (b) : déplacement du paquet d'ondes](papier/ch5/p08.jpg){ loading=lazy .papier }](papier/ch5/p08.jpg)
    <p class="papier-legende">Fig (5.1) (b) : déplacement du paquet d'ondes · Cours chapitre 5, diapo 8</p>

    [![Cours chapitre 5, diapo 9 : Vitesse de groupe : somme de deux ondes de fréquences voisines](papier/ch5/p09.jpg){ loading=lazy .papier }](papier/ch5/p09.jpg)
    <p class="papier-legende">Vitesse de groupe : somme de deux ondes de fréquences voisines · Cours chapitre 5, diapo 9</p>

    [![Cours chapitre 5, diapo 10 : Vitesse de groupe : onde à amplitude modulée](papier/ch5/p10.jpg){ loading=lazy .papier }](papier/ch5/p10.jpg)
    <p class="papier-legende">Vitesse de groupe : onde à amplitude modulée · Cours chapitre 5, diapo 10</p>

    [![Cours chapitre 5, diapo 11 : Fig (5.2) : enveloppe se déplaçant avec vg](papier/ch5/p11.jpg){ loading=lazy .papier }](papier/ch5/p11.jpg)
    <p class="papier-legende">Fig (5.2) : enveloppe se déplaçant avec vg · Cours chapitre 5, diapo 11</p>

    [![Cours chapitre 5, diapo 12 : Vitesse de groupe vg = dω/dk = dE/dp](papier/ch5/p12.jpg){ loading=lazy .papier }](papier/ch5/p12.jpg)
    <p class="papier-legende">Vitesse de groupe vg = dω/dk = dE/dp · Cours chapitre 5, diapo 12</p>

    [![Cours chapitre 5, diapo 13 : Vitesse de groupe égale à la vitesse de la particule, vg = v](papier/ch5/p13.jpg){ loading=lazy .papier }](papier/ch5/p13.jpg)
    <p class="papier-legende">Vitesse de groupe égale à la vitesse de la particule, vg = v · Cours chapitre 5, diapo 13</p>

    [![Cours chapitre 5, diapo 14 : 2- Interpretation de la fonction d’onde](papier/ch5/p14.jpg){ loading=lazy .papier }](papier/ch5/p14.jpg)
    <p class="papier-legende">2- Interpretation de la fonction d’onde · Cours chapitre 5, diapo 14</p>

    [![Cours chapitre 5, diapo 15 : Rayonnement électromagnétique et photons : I = Nhν, N ∝ ξ²](papier/ch5/p15.jpg){ loading=lazy .papier }](papier/ch5/p15.jpg)
    <p class="papier-legende">Rayonnement électromagnétique et photons : I = Nhν, N ∝ ξ² · Cours chapitre 5, diapo 15</p>

    [![Cours chapitre 5, diapo 16 : Distribution aléatoire des photons : concept de probabilité](papier/ch5/p16.jpg){ loading=lazy .papier }](papier/ch5/p16.jpg)
    <p class="papier-legende">Distribution aléatoire des photons : concept de probabilité · Cours chapitre 5, diapo 16</p>

    [![Cours chapitre 5, diapo 17 : ξ² ∝ probabilité d'observer un photon, étendu aux paquets d'ondes](papier/ch5/p17.jpg){ loading=lazy .papier }](papier/ch5/p17.jpg)
    <p class="papier-legende">ξ² ∝ probabilité d'observer un photon, étendu aux paquets d'ondes · Cours chapitre 5, diapo 17</p>

    [![Cours chapitre 5, diapo 18 : Système stationnaire : probabilité |ψ(x)|² dx](papier/ch5/p18.jpg){ loading=lazy .papier }](papier/ch5/p18.jpg)
    <p class="papier-legende">Système stationnaire : probabilité |ψ(x)|² dx · Cours chapitre 5, diapo 18</p>

    [![Cours chapitre 5, diapo 19 : 3 - Le principe d'incertitude de Heisenberg](papier/ch5/p19.jpg){ loading=lazy .papier }](papier/ch5/p19.jpg)
    <p class="papier-legende">3 - Le principe d'incertitude de Heisenberg · Cours chapitre 5, diapo 19</p>

    [![Cours chapitre 5, diapo 20 : Principe d'incertitude de Heisenberg : Δx Δp ≥ ħ/2](papier/ch5/p20.jpg){ loading=lazy .papier }](papier/ch5/p20.jpg)
    <p class="papier-legende">Principe d'incertitude de Heisenberg : Δx Δp ≥ ħ/2 · Cours chapitre 5, diapo 20</p>

    [![Cours chapitre 5, diapo 21 : Principe d'incertitude : interprétation](papier/ch5/p21.jpg){ loading=lazy .papier }](papier/ch5/p21.jpg)
    <p class="papier-legende">Principe d'incertitude : interprétation · Cours chapitre 5, diapo 21</p>

    [![Cours chapitre 5, diapo 22 : Principe d'incertitude dans le cas de trois dimensions](papier/ch5/p22.jpg){ loading=lazy .papier }](papier/ch5/p22.jpg)
    <p class="papier-legende">Principe d'incertitude dans le cas de trois dimensions · Cours chapitre 5, diapo 22</p>

    [![Cours chapitre 5, diapo 23 : 4- L'équation d'onde de Schrödinger](papier/ch5/p23.jpg){ loading=lazy .papier }](papier/ch5/p23.jpg)
    <p class="papier-legende">4- L'équation d'onde de Schrödinger · Cours chapitre 5, diapo 23</p>

    [![Cours chapitre 5, diapo 24 : Postulat I : Fonction d'onde pour décrire les systèmes physiques](papier/ch5/p24.jpg){ loading=lazy .papier }](papier/ch5/p24.jpg)
    <p class="papier-legende">Postulat I : Fonction d'onde pour décrire les systèmes physiques · Cours chapitre 5, diapo 24</p>

    [![Cours chapitre 5, diapo 25 : Condition de Born et condition de normalisation](papier/ch5/p25.jpg){ loading=lazy .papier }](papier/ch5/p25.jpg)
    <p class="papier-legende">Condition de Born et condition de normalisation · Cours chapitre 5, diapo 25</p>

    [![Cours chapitre 5, diapo 26 : En résumé : Qu’est ce qu’une fonction d’onde](papier/ch5/p26.jpg){ loading=lazy .papier }](papier/ch5/p26.jpg)
    <p class="papier-legende">En résumé : Qu’est ce qu’une fonction d’onde · Cours chapitre 5, diapo 26</p>

    [![Cours chapitre 5, diapo 27 : Postulat II : Opérateurs pour les quantités observables](papier/ch5/p27.jpg){ loading=lazy .papier }](papier/ch5/p27.jpg)
    <p class="papier-legende">Postulat II : Opérateurs pour les quantités observables · Cours chapitre 5, diapo 27</p>

    [![Cours chapitre 5, diapo 28 : Opérateurs mécaniques quantiques](papier/ch5/p28.jpg){ loading=lazy .papier }](papier/ch5/p28.jpg)
    <p class="papier-legende">Opérateurs mécaniques quantiques · Cours chapitre 5, diapo 28</p>

    [![Cours chapitre 5, diapo 29 : Postulat III : La valeur attendue (mesurée)](papier/ch5/p29.jpg){ loading=lazy .papier }](papier/ch5/p29.jpg)
    <p class="papier-legende">Postulat III : La valeur attendue (mesurée) · Cours chapitre 5, diapo 29</p>

    [![Cours chapitre 5, diapo 30 : L'équation d’onde de Schrödinger : énergie totale et opérateurs (5.4), (5.5)](papier/ch5/p30.jpg){ loading=lazy .papier }](papier/ch5/p30.jpg)
    <p class="papier-legende">L'équation d’onde de Schrödinger : énergie totale et opérateurs (5.4), (5.5) · Cours chapitre 5, diapo 30</p>

    [![Cours chapitre 5, diapo 31 : Équation d'onde de Schrödinger en fonction du temps (5.7)](papier/ch5/p31.jpg){ loading=lazy .papier }](papier/ch5/p31.jpg)
    <p class="papier-legende">Équation d'onde de Schrödinger en fonction du temps (5.7) · Cours chapitre 5, diapo 31</p>

    [![Cours chapitre 5, diapo 32 : Opérateur hamiltonien HΨ = EΨ](papier/ch5/p32.jpg){ loading=lazy .papier }](papier/ch5/p32.jpg)
    <p class="papier-legende">Opérateur hamiltonien HΨ = EΨ · Cours chapitre 5, diapo 32</p>

    [![Cours chapitre 5, diapo 33 : Séparation des variables (5.8), (5.9)](papier/ch5/p33.jpg){ loading=lazy .papier }](papier/ch5/p33.jpg)
    <p class="papier-legende">Séparation des variables (5.8), (5.9) · Cours chapitre 5, diapo 33</p>

    [![Cours chapitre 5, diapo 34 : Equation d'onde de Schrödinger indépendante du temps (5.11)](papier/ch5/p34.jpg){ loading=lazy .papier }](papier/ch5/p34.jpg)
    <p class="papier-legende">Equation d'onde de Schrödinger indépendante du temps (5.11) · Cours chapitre 5, diapo 34</p>

    [![Cours chapitre 5, diapo 35 : Cas à une dimension (5.12) et particule libre V0 = 0](papier/ch5/p35.jpg){ loading=lazy .papier }](papier/ch5/p35.jpg)
    <p class="papier-legende">Cas à une dimension (5.12) et particule libre V0 = 0 · Cours chapitre 5, diapo 35</p>

    [![Cours chapitre 5, diapo 36 : Potentiel constant V0 : cas E &gt; V0 et E &lt; V0](papier/ch5/p36.jpg){ loading=lazy .papier }](papier/ch5/p36.jpg)
    <p class="papier-legende">Potentiel constant V0 : cas E &gt; V0 et E &lt; V0 · Cours chapitre 5, diapo 36</p>

    #### Résumé du chapitre 5

    [![Résumé du chapitre 5, diapo 1 : Résumé chapitre introduction à la mécanique quantique (sommaire)](papier/ch5/resume-p01.jpg){ loading=lazy .papier }](papier/ch5/resume-p01.jpg)
    <p class="papier-legende">Résumé chapitre introduction à la mécanique quantique (sommaire) · Résumé du chapitre 5, diapo 1</p>

    [![Résumé du chapitre 5, diapo 2 : 1) Problématique](papier/ch5/resume-p02.jpg){ loading=lazy .papier }](papier/ch5/resume-p02.jpg)
    <p class="papier-legende">1) Problématique · Résumé du chapitre 5, diapo 2</p>

    [![Résumé du chapitre 5, diapo 3 : 2) Qu’est ce qu’une fonction d’onde de matière](papier/ch5/resume-p03.jpg){ loading=lazy .papier }](papier/ch5/resume-p03.jpg)
    <p class="papier-legende">2) Qu’est ce qu’une fonction d’onde de matière · Résumé du chapitre 5, diapo 3</p>

    [![Résumé du chapitre 5, diapo 4 : 2) Qu’est ce qu’une fonction d’onde de matière : densité de probabilité](papier/ch5/resume-p04.jpg){ loading=lazy .papier }](papier/ch5/resume-p04.jpg)
    <p class="papier-legende">2) Qu’est ce qu’une fonction d’onde de matière : densité de probabilité · Résumé du chapitre 5, diapo 4</p>

    [![Résumé du chapitre 5, diapo 5 : 3) Principe d’incertitude de Heisenberg](papier/ch5/resume-p05.jpg){ loading=lazy .papier }](papier/ch5/resume-p05.jpg)
    <p class="papier-legende">3) Principe d’incertitude de Heisenberg · Résumé du chapitre 5, diapo 5</p>

    [![Résumé du chapitre 5, diapo 6 : 4) L’équation d’onde de Schrödinger](papier/ch5/resume-p06.jpg){ loading=lazy .papier }](papier/ch5/resume-p06.jpg)
    <p class="papier-legende">4) L’équation d’onde de Schrödinger · Résumé du chapitre 5, diapo 6</p>

    [![Résumé du chapitre 5, diapo 7 : 4) L’équation d’onde de Schrödinger : normalisation et quantification de l’énergie](papier/ch5/resume-p07.jpg){ loading=lazy .papier }](papier/ch5/resume-p07.jpg)
    <p class="papier-legende">4) L’équation d’onde de Schrödinger : normalisation et quantification de l’énergie · Résumé du chapitre 5, diapo 7</p>

    [![Résumé du chapitre 5, diapo 8 : 5) Quelques opérateurs en mécanique quantique : rappels mathématiques](papier/ch5/resume-p08.jpg){ loading=lazy .papier }](papier/ch5/resume-p08.jpg)
    <p class="papier-legende">5) Quelques opérateurs en mécanique quantique : rappels mathématiques · Résumé du chapitre 5, diapo 8</p>

    [![Résumé du chapitre 5, diapo 9 : 5) Quelques opérateurs en mécanique quantique : impulsion et énergie](papier/ch5/resume-p09.jpg){ loading=lazy .papier }](papier/ch5/resume-p09.jpg)
    <p class="papier-legende">5) Quelques opérateurs en mécanique quantique : impulsion et énergie · Résumé du chapitre 5, diapo 9</p>

    [![Résumé du chapitre 5, diapo 10 : 6) Valeur moyenne d’un opérateur](papier/ch5/resume-p10.jpg){ loading=lazy .papier }](papier/ch5/resume-p10.jpg)
    <p class="papier-legende">6) Valeur moyenne d’un opérateur · Résumé du chapitre 5, diapo 10</p>

    [![Résumé du chapitre 5, diapo 11 : 7) Equation d’onde de Schrödinger à une dimension et indépendante du temps](papier/ch5/resume-p11.jpg){ loading=lazy .papier }](papier/ch5/resume-p11.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger à une dimension et indépendante du temps · Résumé du chapitre 5, diapo 11</p>

    [![Résumé du chapitre 5, diapo 12 : 7) Equation d’onde de Schrödinger 1D : équation différentielle à coefficients constants](papier/ch5/resume-p12.jpg){ loading=lazy .papier }](papier/ch5/resume-p12.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : équation différentielle à coefficients constants · Résumé du chapitre 5, diapo 12</p>

    [![Résumé du chapitre 5, diapo 13 : 7) Equation d’onde de Schrödinger 1D : cas 1, particule libre V0 = 0](papier/ch5/resume-p13.jpg){ loading=lazy .papier }](papier/ch5/resume-p13.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : cas 1, particule libre V0 = 0 · Résumé du chapitre 5, diapo 13</p>

    [![Résumé du chapitre 5, diapo 14 : 7) Equation d’onde de Schrödinger 1D : cas 1, solution Ψ(x) = A sin(kx) + B cos(kx)](papier/ch5/resume-p14.jpg){ loading=lazy .papier }](papier/ch5/resume-p14.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : cas 1, solution Ψ(x) = A sin(kx) + B cos(kx) · Résumé du chapitre 5, diapo 14</p>

    [![Résumé du chapitre 5, diapo 15 : 7) Equation d’onde de Schrödinger 1D : cas 2, E &gt; V0 avec V0 ≠ 0](papier/ch5/resume-p15.jpg){ loading=lazy .papier }](papier/ch5/resume-p15.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : cas 2, E &gt; V0 avec V0 ≠ 0 · Résumé du chapitre 5, diapo 15</p>

    [![Résumé du chapitre 5, diapo 16 : 7) Equation d’onde de Schrödinger 1D : cas 2, solutions](papier/ch5/resume-p16.jpg){ loading=lazy .papier }](papier/ch5/resume-p16.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : cas 2, solutions · Résumé du chapitre 5, diapo 16</p>

    [![Résumé du chapitre 5, diapo 17 : 7) Equation d’onde de Schrödinger 1D : cas 3, E &lt; V0 avec V0 ≠ 0](papier/ch5/resume-p17.jpg){ loading=lazy .papier }](papier/ch5/resume-p17.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : cas 3, E &lt; V0 avec V0 ≠ 0 · Résumé du chapitre 5, diapo 17</p>

    [![Résumé du chapitre 5, diapo 18 : 7) Equation d’onde de Schrödinger 1D : cas 3, équation d²Ψ/dx² − k²Ψ = 0](papier/ch5/resume-p18.jpg){ loading=lazy .papier }](papier/ch5/resume-p18.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : cas 3, équation d²Ψ/dx² − k²Ψ = 0 · Résumé du chapitre 5, diapo 18</p>

    [![Résumé du chapitre 5, diapo 19 : 7) Equation d’onde de Schrödinger 1D : cas 3, solutions](papier/ch5/resume-p19.jpg){ loading=lazy .papier }](papier/ch5/resume-p19.jpg)
    <p class="papier-legende">7) Equation d’onde de Schrödinger 1D : cas 3, solutions · Résumé du chapitre 5, diapo 19</p>
