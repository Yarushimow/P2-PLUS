---
title: "Fiche — Canaux de transmission"
---

# Fiche — Canaux de transmission

## Ligne et propagation

| Grandeur | Formule |
|---|---|
| Vitesse | $v = c/\sqrt{\varepsilon_r\mu_r}$ |
| Temps de propagation | $\tau = L_0/v$ |
| Impédance caractéristique (sans pertes) | $R_c = \sqrt{L/C}$ |
| Constante de propagation | $\gamma = \sqrt{(R+jL\omega)(G+jC\omega)} = \alpha + j\beta$ |
| Impédance caractéristique (avec pertes) | $Z_c = \sqrt{(R+jL\omega)/(G+jC\omega)}$ |
| Np → dB | 1 Np = 8,686 dB |

## Réflexions

$$
\Gamma_t = \frac{Z_t - R_c}{Z_t + R_c}
\qquad
\Gamma(\ell) = \Gamma_t\,e^{-2\gamma\ell}
\qquad
Z(\ell) = R_c\,\frac{1+\Gamma(\ell)}{1-\Gamma(\ell)}
\qquad
\rho = \frac{1+|\Gamma|}{1-|\Gamma|}
$$

!!! methode "Échelon (graphe des réflexions)"
    $U^+ = \Delta E_g\,\frac{R_c}{R_c+R_g}$ ; saut en bout de ligne = onde × $(1+\Gamma)$ ;
    on ajoute le continu ; on vérifie avec $U(\infty) = E_g\,\frac{R_t}{R_t+R_g}$.

## Ligne sans pertes

$$
Z(\ell) = R_c\,\frac{Z_t + jR_c\tan\beta\ell}{R_c + jZ_t\tan\beta\ell}
$$

| Cas | Résultat |
|---|---|
| $\ell = \lambda/4$ | $Z = R_c^2/Z_t$ |
| $\ell = \lambda/2$ | $Z = Z_t$ |
| Court-circuit | $Z = jR_c\tan\beta\ell$ |
| Circuit ouvert | $Z = -jR_c\cot\beta\ell$ |
| Max / min de tension | $Z = R_c\,\rho$ / $Z = R_c/\rho$ |

## Abaque de Smith

- Tour complet = $\lambda/2$ ; **vers le générateur = sens horaire**.
- Centre : adapté ; gauche : court-circuit ; droite : circuit ouvert ; haut : inductif.
- $y$ = point diamétralement opposé à $z$.
- Quart d'onde : aller sur l'axe réel, puis $R_{c0} = \sqrt{R_B R_c}$.
- Stub : aller sur le cercle $r = 1$ (ou $g = 1$), puis annuler la partie imaginaire.

## Fibres optiques

$$
ON = \sqrt{n_c^2 - n_g^2}
\qquad
V = \frac{2\pi a}{\lambda}ON
\qquad
M_{saut} = \frac{V^2}{2},\ M_{parab} = \frac{V^2}{4}
\qquad
\text{monomode si } V < 2{,}405
$$

- Dispersion intermodale : $\Delta\tau = \dfrac{n_c\Delta}{c}L$ ; chromatique : $\Delta\tau = D\,\Delta\lambda\,L$.
- Bilan : $P_r = P_e - aL$ (en dBm et dB).
