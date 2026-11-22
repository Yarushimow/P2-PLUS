---
title: "Fiche — Thermodynamique"
---

# Fiche — Thermodynamique

**Convention : reçu > 0.** Unités SI : Pa, m³, K, J.

## Gaz parfait

$$
pV = nRT \quad (R = 8{,}314) \qquad C_p - C_V = nR \qquad \gamma = \frac{C_p}{C_V}
\qquad C_V = \frac{nR}{\gamma - 1},\ C_p = \frac{\gamma nR}{\gamma - 1}
$$

Monoatomique $\gamma = 5/3$ ; diatomique $\gamma = 7/5$.
$\Delta U = C_V\Delta T$, $\Delta H = C_p\Delta T$ (toujours, pour un GP).

## Premier principe

$$
\Delta U = W + Q \qquad W = -\int p_{ext}\,dV
$$

| Transformation | $W$ | $Q$ |
|---|---|---|
| isochore | 0 | $C_V\Delta T$ |
| isobare | $-p\,\Delta V$ | $C_p\Delta T$ |
| isotherme (GP, réversible) | $-nRT\ln\frac{V_f}{V_i}$ | $-W$ |
| adiabatique (GP, réversible) | $C_V\Delta T = \frac{p_fV_f - p_iV_i}{\gamma - 1}$ | 0 |

Laplace (GP, adiabatique, réversible) : $pV^\gamma$, $TV^{\gamma-1}$, $T^\gamma p^{1-\gamma}$ constants.
Chaleurs : sensible $Q = mc\Delta T$, latente $Q = mL$.

## Second principe

$$
\Delta S = S_{éch} + S_c,\qquad S_{éch} = \sum\frac{Q_i}{T_i},\qquad S_c \ge 0
$$

| Système | $\Delta S$ |
|---|---|
| Gaz parfait | $C_V\ln\frac{T_f}{T_i} + nR\ln\frac{V_f}{V_i} = C_p\ln\frac{T_f}{T_i} - nR\ln\frac{p_f}{p_i}$ |
| Phase condensée | $C\ln\frac{T_f}{T_i}$ |
| Changement d'état | $\frac{mL}{T}$ |
| Thermostat $T_0$ | $\frac{Q_{reçue}}{T_0}$ |

Contact entre deux corps : $T_f = \frac{C_1T_1 + C_2T_2}{C_1 + C_2}$.

## Machines dithermes

$$
W + Q_C + Q_F = 0 \qquad \frac{Q_C}{T_C} + \frac{Q_F}{T_F} \le 0
$$

| Machine | Performance | Carnot (max) |
|---|---|---|
| Moteur | $\eta = -W/Q_C$ | $1 - T_F/T_C$ |
| Frigo / clim | $e = Q_F/W$ | $T_F/(T_C - T_F)$ |
| Pompe à chaleur | $e = -Q_C/W$ | $T_C/(T_C - T_F)$ |

Otto : $\eta = 1 - \alpha^{1-\gamma}$. Monotherme : impossible de fournir du travail.
