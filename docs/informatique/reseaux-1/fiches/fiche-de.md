---
title: "Fiche CE / DE — Tout le module"
---

# Fiche CE / DE — Tout le module en une page

**CE le samedi 5 décembre** (55 min) et **DE le vendredi 18 décembre** (1 h 50) : périmètre =
les **4 CM, les TP et les fiches techniques**. Le prof l'a dit : *entraînez-vous à la main*, et
ce qui est noté c'est **la règle appliquée et la vérification**, pas la réponse seule.

!!! abstract "Les 8 réflexes"
    1. Une adresse **avec son préfixe**, toujours. ET logique / méthode du pas.
    2. $2^h$ adresses, $2^h - 2$ hôtes ; **+1 passerelle** par service ; **/30** par liaison.
    3. VLSM : **décroissant**, bloc de $2^n$ aligné sur un multiple de $2^n$, puis **5 contrôles écrits**.
    4. **IP = destination finale, MAC = prochain saut.** À chaque routeur : MAC réécrites, TTL −1, checksum IP recalculée.
    5. Table de routage : connectés (liens compris) → routes (prochain saut = **voisin**, interface = **la sienne**) → défaut.
    6. **Préfixe le plus long** d'abord, la métrique ensuite.
    7. Panne : **du bas vers le haut**, sans oublier la **route de retour**.
    8. TCP/UDP : « que coûte une perte ? ». Énergie : P × 8 760, + une **limite** assumée.

## Les questions qui tombent (d'après les « Vérifions » et les TP)

| Question | Réponse en une ligne |
|----------|----------------------|
| On double le débit : le 1er bit arrive plus tôt ? | **Non**, seul le temps de transmission change |
| Switch, PC1 → PC2 : combien reçoivent ? | **Ça dépend** de la table MAC |
| Que fait le switch d'une trame vers une MAC inconnue ? | **Inondation** (sauf port d'arrivée) ; il apprend toujours la MAC **source** |
| Hub vs switch vs routeur | couche 1 (1 domaine de collision) / couche 2 (1 par port) / couche 3 (sépare les diffusions) |
| MAC de destination d'un ping vers 1.1.1.1 | celle de la **passerelle** |
| Pourquoi la 1re ligne d'un ping échoue ? | résolution **ARP** en cours |
| Masque déductible d'une capture ? | **Non** (au mieux encadré par le comportement) |
| Où une capture a-t-elle été prise ? | **TTL** (64 = pas encore routé) + MAC présentes |
| Même paquet vu à deux endroits ? | même **identifiant IP**, même checksum UDP |
| Pourquoi la checksum UDP ne change pas ? | le routeur ne touche à rien de ce qu'elle couvre |
| Plan d'IA avec un /25 en .96 | faux : un /25 commence en .0 ou .128 (**alignement**) |
| Paquet pour 10.1.2.50 : /8 (m 1), /16 (m 5), /24 (m 10) ? | **/24** |
| Visio en UDP, pourquoi ? | une image retransmise arrive trop tard |
| DHCP : premier message et sa portée ? | **DISCOVER en broadcast**, ne sort pas du LAN |
| PC en 169.254.x.x ? | **APIPA** : aucun DHCP n'a répondu |

## Les calculs à savoir refaire sans calculatrice

| Calcul | Exemple | Résultat |
|--------|---------|----------|
| Bloc d'une adresse | 172.16.132.70/20 | réseau .128.0, diffusion .143.255, 4 094 hôtes |
| Même réseau ? | 10.1.200.15 / 10.1.210.240 en /21 | .200.0 ≠ .208.0 → **non** |
| Masque à partir de réseau + diffusion | 10.60.8.0 → 10.60.11.255 | /22 |
| N sous-réseaux | 192.168.10.0/24 en 8 | /27, 30 hôtes, pas 32 |
| N hôtes | 50 hôtes | /26 (62) |
| VLSM | 100, 50, 20, 2 dans 192.168.10.0/24 | .0/25, .128/26, .192/27, .224/30 |
| Propagation | 6 000 km de fibre | 30 ms (RTT 60) |
| Débit sans fenêtre | 1 500 o, RTT 170 ms | ≈ 70 kbit/s |
| Énergie | 105 W | 920 kWh/an |

## Fiches par chapitre

- [Fondamentaux et modèles](fiche-modeles.md) · [Adressage et VLSM](fiche-adressage.md) ·
  [Routage et NAT](fiche-routage.md) · [Services et estimation](fiche-services.md)
- Corrigés : [TP 1](../td/tp-1-capture-trames.md) · [TP 2](../td/tp-2-packet-tracer.md) ·
  [devoir](../td/devoir-maison-calcul-ip.md) · [TP 3.1](../td/tp-3-1-plan-adressage.md) ·
  [TP 3.2](../td/tp-3-2-construire-plan.md)
- [Entraînement interactif](../entrainement/index.md) : calcul de blocs, même réseau, VLSM, routage, IPv6.
