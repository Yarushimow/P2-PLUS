---
title: "Fiche — Coordonnées et Gauss"
---

# Fiche — Coordonnées et théorème de Gauss

!!! abstract "L'essentiel en 30 secondes"
    - Symétrie plane → cartésiennes ; un axe → cylindriques ; un centre → sphériques.
    - $\mathrm d\tau$ : $\mathrm dx\,\mathrm dy\,\mathrm dz$ ; $r\,\mathrm dr\,\mathrm d\theta\,\mathrm dz$ ; $r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\varphi$.
    - Gauss : $\oint\!\!\oint \vec E\cdot\mathrm d\vec S = \dfrac{Q_{int}}{\varepsilon_0}$ sur une surface **fermée**.
    - Méthode : symétries → direction ; invariances → variable ; surface de Gauss ; flux ; $Q_{int}$ par région.

## Éléments différentiels

| | Cartésiennes | Cylindriques $(r, \theta, z)$ | Sphériques $(r, \theta, \varphi)$ |
|-|--------------|-------------------------------|-----------------------------------|
| $\mathrm d\vec l$ | $\mathrm dx, \mathrm dy, \mathrm dz$ | $\mathrm dr,\ r\,\mathrm d\theta,\ \mathrm dz$ | $\mathrm dr,\ r\,\mathrm d\theta,\ r\sin\theta\,\mathrm d\varphi$ |
| $\mathrm dS$ utile | $\mathrm dx\,\mathrm dy$ | latérale $r\,\mathrm d\theta\,\mathrm dz$ ; disque $r\,\mathrm dr\,\mathrm d\theta$ | sphère $r^2\sin\theta\,\mathrm d\theta\,\mathrm d\varphi$ |
| $\mathrm d\tau$ | $\mathrm dx\,\mathrm dy\,\mathrm dz$ | $r\,\mathrm dr\,\mathrm d\theta\,\mathrm dz$ | $r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\varphi$ |
| Bornes | — | $\theta \in [0, 2\pi]$ | $\theta \in [0, \pi]$, $\varphi \in [0, 2\pi]$ |

Intégrales qui reviennent : $\int_0^\pi\sin\theta\,\mathrm d\theta = 2$ ;
$\int_0^{\pi/2}\sin\theta\,\mathrm d\theta = 1$ (demi-sphère) ;
$\int_0^\pi\sin^2\theta\,\mathrm d\theta = \dfrac\pi2$ ; $\int_0^{2\pi}\sin\theta\,\mathrm d\theta = 0$.

## Le théorème

!!! theoreme "Gauss"
    $$
    \Phi(\vec E) = \oint\!\!\!\oint_{S_g}\vec E\cdot\mathrm d\vec S = \frac{Q_{int}}{\varepsilon_0}
    $$

    $\mathrm d\vec S$ orienté vers l'**extérieur**. Seules les charges **à l'intérieur** comptent.

!!! methode "Les six étapes"
    1. Symétries (plans contenant $M$) → **direction** de $\vec E$.
    2. Invariances (translations, rotations) → **variable** de $E$.
    3. Surface de Gauss **fermée** passant par $M$, adaptée à la symétrie.
    4. Flux : $E \times$ aire des faces où $\vec E \parallel \mathrm d\vec S$ (les autres donnent 0).
    5. $Q_{int}$ **région par région**.
    6. Égaler, isoler $E$, écrire en vecteur. Potentiel : $V = -\int E\,\mathrm dr$, puis $V(\infty) = 0$ et continuité.

## Les cas types

| Distribution | Surface de Gauss | Flux | Champ |
|--------------|------------------|------|-------|
| Boule $R$, $\rho$ uniforme | sphère $r$ | $4\pi r^2 E$ | $\dfrac{\rho r}{3\varepsilon_0}$ ($r < R$) ; $\dfrac{Q}{4\pi\varepsilon_0 r^2}$ ($r > R$) |
| Coque sphérique $R$, charge $Q$ | sphère $r$ | $4\pi r^2 E$ | 0 dedans ; $\dfrac{Q}{4\pi\varepsilon_0 r^2}$ dehors |
| Fil infini $\lambda$ | cylindre $r$, $H$ | $2\pi rHE$ | $\dfrac{\lambda}{2\pi\varepsilon_0 r}$ |
| Cylindre creux $R$, $\sigma$ | cylindre $r$, $H$ | $2\pi rHE$ | 0 dedans ; $\dfrac{\sigma R}{\varepsilon_0 r}$ dehors |
| Plan infini $\sigma$ | cylindre traversant, section $S$ | $2ES$ | $\dfrac{\sigma}{2\varepsilon_0}$, sortant des deux côtés |
| Deux plans $\pm\sigma$ | (superposition) | — | $\dfrac{\sigma}{\varepsilon_0}$ entre, 0 dehors |

## Capacités

$C = \dfrac{Q}{V_1 - V_2}$ : plan $\dfrac{\varepsilon_0 S}{e}$ ; sphérique
$\dfrac{4\pi\varepsilon_0R_1R_2}{R_2 - R_1}$ ; cylindrique $\dfrac{2\pi\varepsilon_0 h}{\ln(R_2/R_1)}$.
Elle ne dépend que de la géométrie et du milieu.

## Pièges classiques

!!! piege "Erreurs fréquentes"
    - Oublier le $r$ dans $r\,\mathrm d\theta$ ou le $\sin\theta$ dans $\mathrm d\tau$.
    - Prendre $\theta \in [0, 2\pi]$ en sphériques (c'est $[0, \pi]$).
    - Calculer $Q_{int}$ jusqu'à $R$ alors que $M$ est **dans** la zone chargée (il faut aller
      jusqu'à $r$).
    - Conclure « flux nul donc champ nul » sans argument de symétrie.
    - Plan infini : compter une seule base ($ES$ au lieu de $2ES$).

## Auto-test

??? question "Charge d'une boule de rayon $R$ avec $\rho = \rho_0 r/R$ ?"
    $Q = \dfrac{4\pi\rho_0}{R}\int_0^R r^3\,\mathrm dr = \pi\rho_0R^3$.

??? question "Surface de Gauss pour un fil infini ? Quelles faces comptent ?"
    Un cylindre coaxial de rayon $r$ et hauteur $H$. Seule la face **latérale** compte (flux nul
    sur les bases car $\vec E \perp \mathrm d\vec S$).

??? question "Dans une coque sphérique chargée (vide à l'intérieur), que vaut $E$ ?"
    $Q_{int} = 0$ et par symétrie $E$ est constant sur la sphère de Gauss, donc $E = 0$.

??? question "Champ d'un plan infini $\sigma$ à 1 m et à 10 m ?"
    Le même : $\dfrac{\sigma}{2\varepsilon_0}$, il ne dépend pas de la distance.
