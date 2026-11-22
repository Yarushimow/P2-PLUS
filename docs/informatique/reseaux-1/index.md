---
title: Réseaux 1
---

# Réseaux 1 <small>`TI305P`</small>

Architecture réseau : supports et modèles OSI / TCP/IP, adressage IPv4 et VLSM, routage
statique et NAT, services (TCP, UDP, DNS, HTTP, DHCP) et coût énergétique. Le fil rouge du
module : **savoir calculer à la main et prouver sa vérification**, puis **lire ce qui passe
réellement sur le réseau** (Wireshark) et **le construire** (Packet Tracer).

<div class="agenda-matiere" data-module="TI305P"></div>

<div class="grid cards" markdown>

-   :material-school:{ .lg .middle } **Cours**

    ---

    Mes notes des 4 CM, avec les diapos et les fiches techniques du prof.

    [:octicons-arrow-right-24: Notes de cours](cours/index.md)

-   :material-lan:{ .lg .middle } **TP**

    ---

    Corrigés des TP 1, 2, 3.1, 3.2 (parties bonus comprises) et du devoir de calcul.

    [:octicons-arrow-right-24: TP et devoir](td/index.md)

-   :material-card-text:{ .lg .middle } **Fiches**

    ---

    Une fiche par chapitre et une fiche de synthèse pour le CE et le DE.

    [:octicons-arrow-right-24: Fiches](fiches/index.md)

-   :material-ip-network:{ .lg .middle } **Entraînement**

    ---

    Calcul de blocs, même réseau, plans VLSM, choix d'une route et IPv6, corrigés à la volée.

    [:octicons-arrow-right-24: S'entraîner](entrainement/index.md)

</div>

!!! tip "CE du samedi 5 décembre, DE du vendredi 18 décembre"
    Périmètre : les quatre CM, les TP et les fiches techniques. Pour réviser : la
    [fiche CE / DE](fiches/fiche-de.md), puis la [fiche adressage](fiches/fiche-adressage.md) et
    le [devoir corrigé](td/devoir-maison-calcul-ip.md), puis l'[entraînement](entrainement/index.md)
    jusqu'à ne plus faire d'erreur de pas ni d'alignement.

## Plan du cours

| Chapitre | Cours | TP | Fiche |
|----------|:-----:|:--:|:-----:|
| 1. Fondamentaux et modèles réseau | [:material-book-open-variant:](cours/chapitre-1-fondamentaux-modeles.md) | [TP 1](td/tp-1-capture-trames.md) · [TP 2](td/tp-2-packet-tracer.md) | [:material-card-text:](fiches/fiche-modeles.md) |
| 2. Adressage IP et subnetting | [:material-book-open-variant:](cours/chapitre-2-adressage-ip.md) | [Devoir](td/devoir-maison-calcul-ip.md) · [TP 3.1](td/tp-3-1-plan-adressage.md) | [:material-card-text:](fiches/fiche-adressage.md) |
| 3. Le routage | [:material-book-open-variant:](cours/chapitre-3-routage.md) | [TP 3.2](td/tp-3-2-construire-plan.md) | [:material-card-text:](fiches/fiche-routage.md) |
| 4. Les services réseau | [:material-book-open-variant:](cours/chapitre-4-services.md) | | [:material-card-text:](fiches/fiche-services.md) |
| Synthèse | | | [Fiche CE / DE](fiches/fiche-de.md) |

## Infos pratiques

- **Code** : `TI305P` · Architecture réseau (enseignant : Y. Soglo).
- **Organisation** : 4 CM de 2 h, des TP de 2 h (Wireshark, Cisco Packet Tracer), une permanence.
- **Évaluation** (présentation du cours 2024-2025, à confirmer) :

    | DE | CC | TP noté |
    |:--:|:--:|:-------:|
    | 60 % | 20 % | 20 % |

- **CE** : samedi 5 décembre (55 min). **DE** : vendredi 18 décembre (1 h 50). Voir l'agenda ci-dessus.
- **IA générative** : autorisée, y compris pour les calculs, mais **ce qui est noté est la
  vérification** (règle appliquée, calcul refait). *Un plan d'adressage sans vérification écrite
  vaut zéro, qu'il soit juste ou faux.*
- **Outils** : Wireshark (installer depuis wireshark.org), Cisco Packet Tracer (compte NetAcad).
- **Ressources officielles** : dans `pdf/ti305/` (local, non publié).
