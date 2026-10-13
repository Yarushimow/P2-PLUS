---
title: "Fiche — Champ magnétique"
---

# Fiche — Champ magnétique

!!! abstract "L'essentiel en 30 secondes"
    - Sources : courants (et aimants). $\mu_0 = 4\pi\times10^{-7}$ H/m, $B$ en tesla.
    - Biot-Savart : $\mathrm d\vec B = \dfrac{\mu_0}{4\pi}\dfrac{I\,\mathrm d\vec l\wedge\overrightarrow{PM}}{PM^3}$.
    - Lignes de champ **fermées**, flux à travers une surface fermée **nul**.
    - Ampère : $\oint\vec B\cdot\mathrm d\vec l = \mu_0\sum I_{enl}$ (somme **algébrique**).

## Lois

| Loi | Formule |
|-----|---------|
| Charge mobile | $\vec B = \dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\wedge\overrightarrow{PM}}{PM^3}$ |
| Biot et Savart | $\vec B = \dfrac{\mu_0}{4\pi}\displaystyle\oint\dfrac{I\,\mathrm d\vec l\wedge\overrightarrow{PM}}{PM^3}$ |
| Flux conservatif | $\oint\!\!\oint \vec B\cdot\mathrm d\vec S = 0$ |
| Ampère | $\oint \vec B\cdot\mathrm d\vec l = \mu_0\sum I_{enl}$ |

Sens : règle de la **main droite** (pouce = $I$, index vers $M$, majeur = $\vec B$) ou
**tire-bouchon**.

## Résultats à connaître

| Distribution | $B$ |
|--------------|-----|
| Fil infini | $\dfrac{\mu_0 I}{2\pi r}$, orthoradial ($\vec e_\theta$) |
| Spire, au centre | $\dfrac{\mu_0 I}{2R}$ |
| Spire, sur l'axe | $\dfrac{\mu_0 IR^2}{2(R^2 + z^2)^{3/2}} = \dfrac{\mu_0 I}{2R}\sin^3\alpha$ |
| Arc d'angle $\theta_0$, au centre | $\dfrac{\mu_0 I\theta_0}{4\pi R}$ (demi-spire : $\dfrac{\mu_0I}{4R}$) |
| Cylindre plein $R$ | $\dfrac{\mu_0 Ir}{2\pi R^2}$ dedans ; $\dfrac{\mu_0 I}{2\pi r}$ dehors |
| Cylindre creux ($J_s$) | 0 dedans ; $\dfrac{\mu_0 I}{2\pi r} = \dfrac{\mu_0 J_s R}{r}$ dehors |
| Câble coaxial | 0 à l'extérieur |
| Solénoïde infini | $\mu_0 nI$ dedans, 0 dehors |

!!! methode "Biot et Savart : décomposer le circuit"
    - Portion rectiligne **alignée avec $M$** : contribution nulle ($\mathrm d\vec l\parallel\overrightarrow{PM}$).
    - Arc de cercle centré en $M$ : $\mathrm d\vec l\perp\overrightarrow{PM}$, $PM = R$ constant → intégrale immédiate.
    - On additionne les morceaux en vérifiant le **sens** de chacun.

!!! methode "Ampère : les cinq étapes"
    1. Symétries/invariances : $\vec B = B(r)\,\vec e_\theta$ (problème à axe).
    2. Contour : cercle de rayon $r$ centré sur l'axe.
    3. Circulation : $2\pi r\,B(r)$.
    4. Courant enlacé région par région ($I\cdot\dfrac{\text{section enlacée}}{\text{section totale}}$ si uniforme).
    5. $B(r) = \dfrac{\mu_0 I_{enl}}{2\pi r}$.

## Densités de courant

- Volumique $j$ (A/m²) : $I = \iint\vec j\cdot\mathrm d\vec S$ ; uniforme : $j = \dfrac{I}{\text{section}}$.
- Surfacique $J_s$ (A/m) : $I = J_s \times$ (longueur perpendiculaire au courant), ex. $2\pi R$.

## Électrostatique ↔ magnétostatique

| | $\vec E$ | $\vec B$ |
|-|----------|----------|
| Source | charges | courants |
| Lignes | ouvertes | fermées |
| Flux fermé | $Q_{int}/\varepsilon_0$ | 0 |
| Théorème | Gauss (surface fermée) | Ampère (contour fermé) |
| Fil infini | radial, $\propto 1/r$ | orthoradial, $\propto 1/r$ |

## Pièges classiques

!!! piege "Erreurs fréquentes"
    - Donner à $\vec B$ la direction du fil vers $M$ : il est **perpendiculaire** à $\overrightarrow{PM}$.
    - Oublier que des courants **opposés** se retranchent dans Ampère.
    - Pour deux fils de courants opposés, au **milieu** les champs **s'ajoutent** (et se
      compensent pour des courants de même sens).
    - Écrire $I_{enl} = I$ alors que le point est **dans** le conducteur.

## Auto-test

??? question "Champ à 5 cm d'un fil parcouru par 10 A ?"
    $B = \dfrac{4\pi\times10^{-7}\times10}{2\pi\times0{,}05} = 4\times10^{-5}$ T $= 40$ µT
    (proche du champ terrestre).

??? question "Pourquoi le flux de $\vec B$ à travers une surface fermée est-il nul ?"
    Les lignes de champ sont fermées : tout ce qui entre ressort. On ne peut pas isoler un pôle.

??? question "Champ au centre d'une demi-spire de rayon $R$ ?"
    $\dfrac{\mu_0 I}{4R}$ : la moitié de celui d'une spire entière.

??? question "Champ à l'extérieur d'un câble coaxial ?"
    Nul : le courant enlacé vaut $I - I = 0$.
