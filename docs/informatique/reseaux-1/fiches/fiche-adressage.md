---
title: "Fiche — Adressage IP et VLSM"
---

# Fiche — Adressage IP et VLSM

!!! abstract "L'essentiel en 30 secondes"
    - Adresse **ET** masque = adresse réseau. Une adresse sans préfixe ne veut rien dire.
    - **Pas** = 256 − octet coupé du masque ; réseau = octet − (octet mod pas).
    - $2^h$ adresses, $2^h - 2$ hôtes ($h = 32 - n$). Lien routeur–routeur : **/30**.
    - Par sous-réseaux : $S \le 2^n$ (bits empruntés). Par hôtes : $S \le 2^n - 2$ (bits laissés).
    - VLSM : **trier décroissant**, un bloc de $2^n$ commence à un **multiple de $2^n$**.
    - Privées : 10/8, 172.16/12, 192.168/16. APIPA 169.254/16 = DHCP injoignable.

## Méthode du pas

!!! methode "Réseau, diffusion, plage, hôtes"
    1. Octet coupé (ni 0 ni 255) → **pas = 256 − valeur**.
    2. **Réseau** : octet − (octet mod pas), octets suivants à **0**.
    3. **Diffusion** : réseau + pas − 1, octets suivants à **255**.
    4. **Plage** : réseau + 1 → diffusion − 1. **Hôtes** : $2^{32-n} - 2$.

### Exemple rédigé : 10.74.137.90 / 255.255.192.0

/18, 3e octet coupé, pas 64 : 137 − (137 mod 64) = 137 − 9 = 128 → réseau **10.74.128.0** ;
diffusion 128 + 63 = 191 → **10.74.191.255** ; plage 10.74.128.1 → 10.74.191.254 ;
$2^{14} - 2 = 16\,382$ hôtes.

## Masques

| /n | Masque | Bloc | Hôtes | | /n | Masque | Bloc | Hôtes |
|----|--------|-----:|------:|---|----|--------|-----:|------:|
| /16 | 255.255.0.0 | 65 536 | 65 534 | | /24 | 255.255.255.0 | 256 | 254 |
| /17 | 255.255.128.0 | 32 768 | 32 766 | | /25 | 255.255.255.128 | 128 | 126 |
| /18 | 255.255.192.0 | 16 384 | 16 382 | | /26 | 255.255.255.192 | 64 | 62 |
| /19 | 255.255.224.0 | 8 192 | 8 190 | | /27 | 255.255.255.224 | 32 | 30 |
| /20 | 255.255.240.0 | 4 096 | 4 094 | | /28 | 255.255.255.240 | 16 | 14 |
| /21 | 255.255.248.0 | 2 048 | 2 046 | | /29 | 255.255.255.248 | 8 | 6 |
| /22 | 255.255.252.0 | 1 024 | 1 022 | | /30 | 255.255.255.252 | 4 | 2 |
| /23 | 255.255.254.0 | 512 | 510 | | /8 | 255.0.0.0 | 16 777 216 | 16 777 214 |

Valeurs possibles d'un octet de masque : **0 · 128 · 192 · 224 · 240 · 248 · 252 · 254 · 255**.

## VLSM

!!! methode "En 4 temps"
    1. Lister les besoins (**+ 1 passerelle** par service, **/30** par liaison), **trier décroissant**.
    2. $n = \lceil \log_2(S + 2) \rceil$ → bloc $2^n$, masque /(32 − n).
    3. Placer à la première adresse libre (alignée d'office si trié).
    4. Avancer de $2^n$.

!!! methode "Vérifier un plan : 5 contrôles écrits"
    **Alignement** (début multiple de la taille) · **Capacité** ($2^n - 2 \ge S$, pas trop gros) ·
    **Chevauchement** · **Appartenance** (tout avant la diffusion d'origine) · **Liens** (/30 chacun).

### Exemple rédigé : 192.168.30.0/24, besoins 120, 60, 25, 12 (+ passerelle), liaison

| Service | Adresses | Bloc | Sous-réseau | Plage | Passerelle (dernière) |
|---------|:--------:|:----:|-------------|-------|-----------------------|
| Atelier | 121 | /25 | .0/25 | .1 – .126 | .126 |
| Bureaux | 61 | /26 | .128/26 | .129 – .190 | .190 |
| Accueil | 26 | /27 | .192/27 | .193 – .222 | .222 |
| Serveurs | 13 | /28 | .224/28 | .225 – .238 | .238 |
| Liaison | 2 | /30 | .240/30 | .241 – .242 | — |

## Adresses spéciales

| Adresse | Rôle |
|---------|------|
| 127.0.0.1 | bouclage |
| 255.255.255.255 | diffusion limitée |
| 169.254.0.0/16 | APIPA (aucun DHCP n'a répondu) |
| 224.0.0.0/4 | multicast |
| 0.0.0.0/0 | route par défaut |

**TTL** : compteur de **sauts** (−1 par routeur, ICMP à 0). **IPv6** : 128 bits, 8 groupes hexa,
zéros de tête supprimés, **un seul** `::`, minuscules ; pas de broadcast (multicast), anycast ;
sous-réseau standard **/64**.

## Pièges classiques

!!! piege "Oublier la passerelle"
    50 postes + passerelle = 51 > 30 → /26, pas /27.

!!! piege "« Elle finit par .0 donc c'est l'adresse réseau »"
    172.20.201.0/20 est une adresse d'hôte valide (réseau 172.20.192.0). Et 10.48.19.192/26 est
    une adresse **réseau**. Seule la position dans **son** bloc compte.

!!! piege "Bloc mal aligné"
    Un /25 ne commence qu'en .0 ou .128 ; un /26 en .0/.64/.128/.192.

## Auto-test

??? question "192.168.33.60 et 192.168.33.70 en /26 : même réseau ?"
    Non : .0/26 et .64/26.

??? question "Réseau 10.60.8.0, diffusion 10.60.11.255 : préfixe ?"
    4 × 256 = 1 024 = $2^{10}$ → **/22** (255.255.252.0), 1 022 hôtes.

??? question "Hôte 192.168.7.130, diffusion .191 : masque ?"
    Bloc aligné finissant en .191 et contenant .130 : seul 64 marche (début .128) → **/26**.

??? question "Combien de bits emprunter pour 6 sous-réseaux ? Pour 50 hôtes ?"
    6 ≤ 2³ → 3 bits (/27 depuis un /24). 50 ≤ 2⁶ − 2 → 6 bits d'hôte (/26).
