---
title: "Fiche — Routage et NAT"
---

# Fiche — Routage et NAT

!!! abstract "L'essentiel en 30 secondes"
    - Même réseau (ET avec **son** masque) → routage **direct** ; sinon → **passerelle**, qui doit être dans le réseau de l'hôte.
    - Choix d'une route : **préfixe le plus long**, puis métrique. `0.0.0.0/0` = la plus courte, dernier recours.
    - `ip route <réseau> <masque> <prochain saut>` en **`Router(config)#`** ; les `show` en **`Router#`**.
    - À chaque saut : IP **inchangées**, MAC **réécrites**, TTL **−1**, checksum IP **recalculée**.
    - NAT : privée → publique sur le routeur de sortie ; **PAT** = une IP publique, les **ports** distinguent.
    - Un ping qui part et ne revient pas = **route de retour** manquante.

## Table de routage (format attendu)

| Destination | Masque | Prochain saut | Interface | Métrique |
|-------------|--------|---------------|-----------|:--------:|
| *réseaux connectés d'abord* | | **connecté** | interface locale | **0** |
| *routes apprises / statiques* | | IP du routeur voisin | interface **locale** de sortie | ≥ 1 |
| **0.0.0.0** | **0.0.0.0** | IP du routeur voisin | | ≥ 1 |

!!! methode "Construire la table d'un routeur à partir d'un schéma"
    1. Une ligne « connecté » par interface configurée, **liens /30 compris**.
    2. Une ligne par réseau **non** connecté : prochain saut = IP **du voisin** sur le lien commun.
    3. Si une seule sortie : on peut remplacer les lignes distantes par une route par défaut.

!!! methode "Une route correspond-elle ?"
    Destination ET masque de la route = réseau de la route ? Si oui, elle correspond.
    Parmi les correspondantes : le **préfixe le plus long** gagne.

## CLI Cisco

| Invite | Mode | Commandes |
|--------|------|-----------|
| `Router>` | utilisateur | `enable` |
| `Router#` | privilégié | `show …`, `ping`, `traceroute`, `copy running-config startup-config` |
| `Router(config)#` | configuration | `ip route`, `hostname`, `interface g0/0` |
| `Router(config-if)#` | interface | `ip address A M`, `no shutdown` |

`exit` = un niveau ; `end` = retour à `Router#`. `show ip route` : **C** connecté, **L** locale,
**S** statique, **S\*** défaut statique. Route absente = prochain saut injoignable (interface éteinte).

## Statique vs dynamique

| | Statique | Dynamique |
|---|---|---|
| Config | manuelle | protocoles (RIP, OSPF, EIGRP = IGP ; BGP = EGP) |
| Adaptation | aucune | automatique |
| Coût | nul en débit | CPU + débit |
| Sécurité | rien ne change seul | exposé aux erreurs de config, boucles |

Vecteur de distance (RIP, Bellman-Ford) : on annonce ce qu'on sait aux voisins.
État de lien (OSPF, **Dijkstra** = SPF) : carte complète puis plus courts chemins.

## NAT

| Forme | Correspondance | Usage |
|-------|----------------|-------|
| statique | 1 privée ↔ 1 publique | serveur joignable de l'extérieur |
| dynamique | réservoir de publiques | |
| **PAT** | n privées ↔ 1 publique, **par ports** | box internet |

## Dépannage (dans l'ordre)

1. `show ip interface brief` : up/up ? (câble, type, `no shutdown`)
2. Adresses : même sous-réseau sur un lien, pas de doublon.
3. Passerelle de l'hôte dans son sous-réseau ? (`ipconfig`)
4. `show ip route` sur chaque routeur du chemin.
5. **Route de retour** sur le routeur d'en face.

## Pièges classiques

!!! piege "La métrique ne décide pas"
    10.1.2.0/24 métrique 10 bat 10.0.0.0/8 métrique 1 pour 10.1.2.50.

!!! piege "Prochain saut = sa propre adresse"
    Interdit. Le prochain saut est l'IP du **voisin** ; l'interface est la **sienne**.

!!! piege "`show ip route` refusé"
    Tu es en `(config)#` : `end` d'abord.

## Auto-test

??? question "PC 192.168.10.5/24, passerelle 192.168.20.254. Que se passe-t-il ?"
    Passerelle hors sous-réseau : injoignable, aucune sortie possible (le local marche encore).

??? question "Paquet de 10.1.1.1 vers 8.8.8.8 traverse 3 routeurs. TTL de départ 64 : à l'arrivée ?"
    61. IP source/destination inchangées, MAC réécrites 3 fois (4 trames différentes).

??? question "Deux PC derrière une box choisissent le même port source vers le même site. Problème ?"
    Non : le PAT réécrit le port de l'un (ex. 51720 → 61001) et garde la correspondance pour le retour.

??? question "R1 connaît 192.168.10.0/24 (G0/0) et le lien 10.0.0.0/30 (S0/0/0, .1). R2 = 10.0.0.2 dessert 192.168.30.0/24. Route statique sur R1 ?"
    `ip route 192.168.30.0 255.255.255.0 10.0.0.2`, et sur R2 la route de retour vers 192.168.10.0 via 10.0.0.1.
