---
title: "Fiche — Fondamentaux et modèles réseau"
---

# Fiche — Fondamentaux et modèles réseau

!!! abstract "L'essentiel en 30 secondes"
    - Réseau = infrastructure, protocole = convention. LAN (bâtiment), WAN (Internet).
    - Topologie réelle : **étoile commutée**. Hub = couche 1 (répète tout), switch = couche 2 (lit la MAC).
    - **Débit ≠ propagation** : doubler le débit ne fait pas arriver le premier bit plus tôt.
    - OSI 7 couches (théorique), TCP/IP 4 couches (réel). Encapsulation : données → segment → paquet → trame → bits.
    - **L'IP vise la destination finale, la MAC vise le prochain équipement.**
    - Le switch découpe les domaines de **collision**, le routeur les domaines de **diffusion**.

## Les couches

| OSI | TCP/IP | PDU | Adresse | Équipement | Protocoles |
|-----|--------|-----|---------|------------|------------|
| 7 Application · 6 Présentation · 5 Session | Application | données | — | — | HTTP, DNS, DHCP, FTP, SMTP |
| 4 Transport | Transport | **segment** (TCP) / datagramme (UDP) | **port** | — | TCP, UDP |
| 3 Réseau | Internet | **paquet** | **IP** | **routeur** | IP, ICMP, ARP |
| 2 Liaison | Accès réseau | **trame** | **MAC** | **switch**, carte réseau | Ethernet, Wi-Fi |
| 1 Physique | Accès réseau | **bit** | — | hub, câbles, répéteurs | — |

Mnémo (7 → 1) : « **A**pprentissage **P**ar **S**urprise, **T**oujours **R**éussir, **L**ors **D**es **P**ratiques ».

## Définitions

!!! definition "Domaine de diffusion"
    Ensemble des équipements qu'un broadcast (`FF:FF:FF:FF:FF:FF`) atteint = « un réseau local ».
    Le **routeur** l'arrête ; le switch, non.

!!! definition "ARP"
    IP connue, MAC inconnue → requête **broadcast** « qui a 192.168.1.10 ? », réponse **unicast**
    avec la MAC, mise en **cache ARP**.

!!! definition "CRC"
    Reste d'une division binaire calculé par l'émetteur et refait par le récepteur. **Détecte,
    ne corrige pas** : la trame abîmée est jetée.

## Méthodes

!!! methode "Table MAC du switch"
    1. Trame reçue → il apprend **MAC source ↔ port d'arrivée**.
    2. MAC destination connue → ce seul port ; inconnue → **inondation** (sauf port d'arrivée).

!!! methode "Temps de propagation"
    $t = d / v$, avec $v \approx 2\times10^8$ m/s dans la fibre. Paris–Sydney 17 000 km : 85 ms
    (RTT 170 ms). Paris–New York 6 000 km : 30 ms (RTT 60 ms). Transmission : taille / débit.

!!! methode "Consommation"
    Puissance × durée : 25 W × 8 760 h = 219 kWh/an. Ne dépend presque **pas du trafic**
    (défaut de proportionnalité) → levier = moins d'équipements allumés.

## Câbles

| Liaison | Câble (Packet Tracer) |
|---------|-----------------------|
| PC ↔ switch, routeur ↔ switch | **droit** (natures différentes) |
| PC ↔ PC, PC ↔ routeur, routeur ↔ routeur, switch ↔ switch | **croisé** (même nature) |

Cat 6a = choix par défaut d'un LAN neuf (10 Gbit/s sur 100 m). 100 m max en cuivre.
Multimode ~2 km (dispersion modale), monomode ~60 km. T568A/B : paires verte et orange permutées.

## Pièges classiques

!!! piege "Bande passante (Hz) ≠ débit (bit/s)"
    Et débit ≠ vitesse de propagation.

!!! piege "« Switch de 10 machines : la trame va à toutes »"
    Faux : ça dépend de la table MAC (inondation seulement si la destination est inconnue).
    Un broadcast, lui, va bien à tout le monde.

!!! piege "MAC de destination d'un paquet vers Internet"
    C'est la MAC de **ta passerelle**, jamais celle du serveur distant.

## Auto-test

??? question "Un hub de 8 ports : combien de domaines de collision ? Un switch de 8 ports ?"
    Hub : **1** (tout le hub). Switch : **8** (un par port). Domaines de diffusion : 1 dans les deux cas.

??? question "Quelle couche ajoute les adresses MAC ? Les ports ?"
    MAC : couche **2** (liaison). Ports : couche **4** (transport).

??? question "Tu passes d'une fibre à 1 Gbit/s à 10 Gbit/s sur 3 000 km. Le RTT change-t-il ?"
    **Non** : RTT = 2 × 3×10⁶ / 2×10⁸ = 30 ms dans les deux cas. Seul le temps de transmission baisse.

??? question "Pourquoi une trame unicast d'un voisin n'apparaît pas dans ton Wireshark ?"
    Le switch ne l'envoie que sur le port du destinataire. Tu ne vois que ton trafic + broadcast/multicast.
