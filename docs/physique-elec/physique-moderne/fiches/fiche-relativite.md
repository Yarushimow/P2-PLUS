---
title: "Fiche CE — Relativité (ch. 1 à 3)"
---

# Fiche CE — Relativité (chapitres 1 à 3)

!!! abstract "L'essentiel en 30 secondes"
    - $v \leq 0{,}1\,c$ → **Galilée** (classique). $v > 0{,}1\,c$ → **Lorentz** (relativité restreinte).
    - Tout tourne autour de $\gamma = \dfrac{1}{\sqrt{1 - v^2/c^2}} \geq 1$.
    - **Longueurs contractées** $L = L_0/\gamma$, **durées dilatées** $T = \gamma\,T_0$. L'indice 0 = grandeur **propre** (mesurée au repos).
    - $E = \gamma m_0 c^2 = T + m_0 c^2$ et $E^2 = p^2c^2 + m_0^2c^4$.

Format du CE (sujet 2022) : **55 min, calculatrice autorisée, pas de documents**,
5 questions courtes. [Annale corrigée](../annales/annale-ce-2022.md).

## Chapitre 1 — Galilée

S′ se déplace à la vitesse $v$ selon $x$ par rapport à S, origines confondues à $t = t' = 0$.

| Position | Vitesse | Accélération | Temps |
|----------|---------|--------------|-------|
| $x' = x - vt$ | $v'_x = v_x - v$ | $a' = a$ | $t' = t$ (absolu) |

!!! theoreme "Invariance de la 2e loi de Newton"
    $v$ est constante et $t' = t$, donc $a' = \dfrac{d(v_x - v)}{dt} = a$ et
    $\sum \vec F = m\vec a = m\vec a\,'$ : les lois de la mécanique sont les mêmes
    dans tous les référentiels galiléens.

!!! methode "Équation du mouvement dans deux référentiels"
    1. Écrire le mouvement dans le référentiel où il est simple (ex. : le train, le bateau).
    2. Passer à l'autre avec $x = x' + vt$, $y = y'$.

    Exemple (CE 2022) : bateau à 15 m/s, ballon lancé verticalement à 10 m/s depuis une hauteur $h$ :
    $x = 15\,t$, $\quad y = h + 10\,t - \tfrac{1}{2} g t^2$ (parabole dans le port).

!!! definition "Choc élastique"
    Conservation de la **quantité de mouvement** et de l'**énergie cinétique**. À une
    dimension : $v_{1f} = \dfrac{(m_1 - m_2)\,v_1 + 2 m_2 v_2}{m_1 + m_2}$.

**Culture :** l'éther, l'aberration stellaire (angle $\tan\alpha = v/c$), Michelson-Morley
(1887) → $c$ est la même dans toutes les directions : Galilée ne marche pas pour la lumière.

## Chapitre 2 — Relativité restreinte

!!! definition "Postulats d'Einstein"
    1. Les lois de la physique sont les mêmes dans tous les référentiels inertiels.
    2. La vitesse de la lumière dans le vide, $c$, est la même dans tous les référentiels inertiels.

!!! theoreme "Transformation de Lorentz (S → S′)"
    $$
    x' = \gamma\,(x - vt), \qquad y' = y, \qquad z' = z, \qquad
    t' = \gamma\left(t - \frac{v\,x}{c^2}\right)
    $$
    Inverse (S′ → S) : on change $v$ en $-v$.

!!! theoreme "Composition des vitesses"
    $$
    u'_x = \frac{u_x - v}{1 - \dfrac{v\,u_x}{c^2}}
    \qquad\qquad
    u_x = \frac{u'_x + v}{1 + \dfrac{v\,u'_x}{c^2}}
    $$
    Vérification : si $u_x = c$, on trouve $u'_x = c$. On ne dépasse jamais $c$.

| Effet | Formule | Grandeur propre = … |
|-------|---------|---------------------|
| Contraction des longueurs | $L = \dfrac{L_0}{\gamma}$ | longueur mesurée dans le référentiel où l'objet est **au repos** |
| Dilatation du temps | $T = \gamma\,T_0$ | durée entre 2 événements **au même endroit** (horloge liée) |

!!! piege "Contraction : seulement dans le sens du mouvement"
    Les longueurs **perpendiculaires** à $\vec v$ ne changent pas. Pour la statue de la
    Liberté (TD 2, ex. 4) : si le vaisseau file horizontalement, la hauteur reste 93 m.

!!! methode "Simultanéité : existe-t-il un référentiel où A et B sont simultanés ?"
    On veut $\Delta t' = \gamma\left(\Delta t - \dfrac{v\,\Delta x}{c^2}\right) = 0$, soit
    $v = \dfrac{c^2\,\Delta t}{\Delta x}$. Possible seulement si $v < c$, c'est-à-dire
    $c\,\Delta t < \Delta x$.

## Chapitre 3 — Dynamique relativiste

| Grandeur | Formule |
|----------|---------|
| Masse relativiste | $m = \gamma\,m_0$ |
| Quantité de mouvement | $p = \gamma\,m_0\,v$ |
| Énergie totale | $E = \gamma\,m_0 c^2 = mc^2$ |
| Énergie au repos | $E_0 = m_0 c^2$ |
| Énergie cinétique | $T = E - E_0 = (\gamma - 1)\,m_0 c^2$ |
| Relation énergie-impulsion | $E^2 = p^2 c^2 + m_0^2 c^4$ |
| Vitesse à partir de $E$ et $p$ | $\beta = \dfrac{v}{c} = \dfrac{pc}{E}$ |

Unités : $1\ \text{eV} = 1{,}6 \times 10^{-19}$ J, $\ 1\ u = 931{,}5\ \text{MeV}/c^2$,
$\ m_e c^2 = 0{,}511$ MeV. Une impulsion s'exprime en MeV/$c$.

!!! methode "Réflexes de calcul"
    - $E = 2E_0$ ⟹ $\gamma = 2$ ⟹ $\beta = \dfrac{\sqrt 3}{2}$, $v = 0{,}866\,c$.
    - À partir de $\gamma$ : $\beta = \sqrt{1 - 1/\gamma^2}$.
    - Travailler en **MeV** et **MeV/$c$** : $pc$ et $E$ sont alors dans la même unité.
    - Retour aux kg·m/s : $p = \dfrac{(pc\ \text{en eV}) \times 1{,}6\times10^{-19}}{c}$.

!!! piege "L'énergie cinétique n'est plus $\tfrac12 m v^2$"
    En relativité, $T = (\gamma - 1)\,m_0c^2$. La formule classique ne redevient
    valable que pour $v \ll c$.

## Valeurs de γ à connaître

| $\beta = v/c$ | 0,1 | 0,3 | 0,6 | 0,8 | 0,85 | 0,866 | 0,9 | 0,99 |
|---------------|:---:|:---:|:---:|:---:|:----:|:-----:|:---:|:----:|
| $\gamma$ | 1,005 | 1,048 | **1,25** | **5/3** | 1,898 | **2** | 2,294 | 7,09 |

## Auto-test

??? question "Deux électrons partent en sens opposés à 0,6c et 0,7c. Vitesse de l'un par rapport à l'autre ?"
    $u = \dfrac{0{,}6 + 0{,}7}{1 + 0{,}6 \times 0{,}7}\,c = \dfrac{1{,}3}{1{,}42}\,c = 0{,}916\,c$
    (et pas 1,3c comme en classique).

??? question "γ = 1,25 : vitesse ?"
    $\beta = \sqrt{1 - 1/1{,}5625} = 0{,}6$, donc $v = 1{,}8 \times 10^8$ m/s.

??? question "E = 6 GeV et p = 3 GeV/c : masse au repos ?"
    $m_0 c^2 = \sqrt{36 - 9} = 5{,}20$ GeV, soit $5{,}20 / 0{,}9315 = 5{,}58\ u$.

??? question "Un électron parcourt 25 cm en 2 ns. γ ?"
    $v = 1{,}25 \times 10^8$ m/s, $\beta = 0{,}417$, $\gamma = 1{,}100$.

??? question "Durée propre d'un muon 1,5 s, mesurée 7 s au labo : γ ?"
    $\gamma = 7 / 1{,}5 = 4{,}67$ (la durée propre est la plus courte).
