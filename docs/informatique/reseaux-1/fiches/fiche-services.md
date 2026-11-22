---
title: "Fiche — Services réseau et estimation"
---

# Fiche — Services réseau et estimation

!!! abstract "L'essentiel en 30 secondes"
    - Réseau : machine → machine. Transport : → **la bonne application** (ports).
    - Socket = IP + port ; connexion = **4 valeurs** (IP/port source, IP/port destination).
    - TCP : handshake (1 RTT), ACK, retransmission, ordre, **fenêtre glissante**. UDP : rien de tout ça.
    - Choix : **« que coûte une perte ? »** À récupérer → TCP ; périmée → UDP.
    - DNS distribué + cache (UDP 53) ; HTTP requête/réponse **sans état** ; DHCP **DORA**, DISCOVER en broadcast.
    - Énergie = P × 8 760 h ; suit le nombre d'équipements, pas le trafic. Un chiffre = source + millésime + périmètre.

## Ports

| Plage | Nom |
|-------|-----|
| 0 – 1023 | connus |
| 1024 – 49151 | enregistrés (IANA) |
| 49152 – 65535 | dynamiques (ports source sortants) |

| Protocole | Transport | Port |
|-----------|-----------|------|
| HTTP / HTTPS | TCP | 80 / 443 |
| DNS | UDP (TCP gros transferts) | 53 |
| DHCP | UDP | 67 serveur / 68 client |
| FTP / SFTP | TCP | 21 / 22 |
| SMTP | TCP | 25 |
| POP3 / IMAP | TCP | 110 / 143 |
| Telnet / SSH | TCP | 23 / 22 |

## TCP vs UDP

| | TCP | UDP |
|---|---|---|
| Connexion | SYN → SYN-ACK → ACK | aucune |
| Fiabilité | ACK + retransmission | aucune |
| Ordre | garanti | non |
| Flux | fenêtre glissante | aucun |
| Démarrage | 1 aller-retour | nul |
| Unité | segment | datagramme |
| Usages | web, mail, fichiers, SSH | voix, vidéo direct, jeux, DNS |

!!! methode "Pourquoi une fenêtre : débit max sans fenêtre = taille segment / RTT"
    1 500 octets = 12 000 bits ; RTT 170 ms → 12 000 / 0,17 ≈ **70 kbit/s**, quel que soit le lien.
    Fenêtre nécessaire pour saturer = **débit × RTT** (1 Gbit/s × 0,17 s ≈ 21 Mo).

## Services

- **DNS** : racine → `.fr` → `efrei.fr` → `www` ; cache selon la durée de l'enregistrement.
  Types : **A** (IPv4), **AAAA** (IPv6), **MX** (mail), **CNAME** (alias).
- **HTTP** : GET (obtenir), POST (envoyer) ; 200 OK, 301/302 déplacé, 404 absent, 500 erreur serveur ;
  sans état → cookies, jetons. HTTPS = HTTP dans **TLS** (confidentialité, intégrité, authentification), port 443.
- **DHCP** : DISCOVER (broadcast) → OFFER → REQUEST → ACK → bail. Serveur dans le même LAN ou **relais**.
- **TLS** rangé en présentation (OSI) mais s'intercale entre TCP et HTTP. **MIME** = pièces jointes.

## Estimation

!!! methode "Chaîne de calcul"
    $P$ (W) → $E = P(\text{kW}) \times 8\,760$ (kWh/an) → coût = $E \times$ tarif → émissions = $E \times$ facteur.
    Switch 24 p. ≈ 25 W, 48 p. ≈ 45 W, routeur ≈ 30 W, borne Wi-Fi ≈ 10 W (attention au PoE).

### Exemple rédigé

A = 3 switchs 24 p. + routeur = 105 W → 920 kWh/an → 184 €/an (0,20 €/kWh) → 55 kgCO₂e (60 g/kWh).
B = 1 switch 48 p. + routeur = 75 W → 657 kWh → 131 € → 39 kg. B : −29 %.
**Limites** : fabrication, câblage en plus pour B, résilience (un seul switch), durée de vie.

## Pièges classiques

!!! piege "« TCP est lent »"
    Il est **fiable**, et la fiabilité coûte du temps. La visio est en UDP parce qu'une image
    retransmise arrive trop tard, pas parce que TCP « ne sait pas » faire de la vidéo.

!!! piege "« Regarder moins de vidéo réduit d'autant la conso du réseau »"
    Non : consommation largement fixe ; le Wh/Go baisse quand le trafic monte.

!!! piege "DHCP derrière un routeur sans relais"
    Le DISCOVER (broadcast) ne traverse pas le routeur → APIPA 169.254.x.x.

## Auto-test

??? question "Deux onglets, même navigateur, même serveur : comment le PC sait à quel onglet rendre la réponse ?"
    Par le **port source** (différent pour chaque connexion) : la connexion est identifiée par 4 valeurs.

??? question "Pourquoi DNS en UDP ?"
    Échange court (une question, une réponse) : un handshake coûterait plus que l'échange.

??? question "Un PC obtient 169.254.12.7. Diagnostic ?"
    Aucun serveur DHCP n'a répondu (lien, serveur, ou pas de relais vers un autre réseau).

??? question "4 bornes Wi-Fi de 10 W allumées en permanence : énergie annuelle ?"
    40 W × 8 760 h = 350,4 kWh/an.
