---
title: "Ch. 1 — Fondamentaux et modèles réseau"
---

# Chapitre 1 — Fondamentaux et modèles réseau

=== "Version simplifiée"

    Le CM 1 pose tout le vocabulaire du module : ce qu'est un réseau, les supports
    (couche 1), ce que fait un commutateur (couche 2), les modèles OSI et TCP/IP,
    l'encapsulation, et une première estimation de consommation.

    !!! info "La règle IA du module"
        L'IA générative est **autorisée**, y compris pour les calculs d'adressage. Mais ce
        qui est noté, c'est **la vérification** : la règle appliquée, le calcul refait, le
        résultat contrôlé. *Un plan d'adressage rendu sans vérification écrite vaut zéro,
        qu'il soit juste ou faux.*

    ## 1. Concepts de base

    !!! definition "Réseau, protocole, communication"
        - **Réseau** : ensemble de machines interconnectées qui échangent des données ou
          partagent des ressources (imprimantes, serveurs, fichiers).
        - **Protocole** : ensemble de **règles** d'échange (TCP/IP, HTTP, FTP…).
        - **Communication de données** : émission et réception d'informations entre deux
          dispositifs.

    Le réseau est **l'infrastructure**, le protocole est **la convention**. Deux machines
    reliées par un câble mais sans protocole commun ne communiquent pas.

    | Objectifs d'un réseau | Composants clés (et le CM qui en parle) |
    |-----------------------|------------------------------------------|
    | Partager (fichiers, imprimantes) | Supports de transmission : câbles, Wi-Fi (CM 1) |
    | Communiquer (mail, messagerie, visio) | Adressage des équipements (CM 2) |
    | Centraliser (stockage, gestion) | Équipements d'interconnexion : switch, routeur (CM 3) |
    | Collaborer | Protocoles et services (CM 4) |

    ### Types de réseaux

    | Type | Étendue | Technos / exemples |
    |------|---------|--------------------|
    | **LAN** (*Local Area Network*) | un bâtiment, un campus | Ethernet, Wi-Fi ; réseau d'entreprise ou domestique |
    | **WAN** (*Wide Area Network*) | un pays, des continents | MPLS, satellites, fibres sous-marines ; **Internet** est le plus grand WAN |
    | PAN (hors programme) | ~10 m | montre ↔ smartphone |
    | MAN (hors programme) | une ville | plusieurs LAN interconnectés |

    ### Topologies

    La **topologie** décrit l'organisation physique et logique des nœuds et des liens.
    Deux modes de propagation :

    - **Diffusion** : un seul support partagé, tout le monde voit le message et regarde
      s'il lui est destiné (→ le **concentrateur**).
    - **Point à point** : un lien ne relie qu'une paire de nœuds ; on passe par des
      intermédiaires (→ le **commutateur**).

    | Topologie | Principe | Point faible |
    |-----------|----------|--------------|
    | Bus | un câble partagé par tous | une coupure du câble coupe tout |
    | Anneau | chaque nœud relié à 2 voisins, le signal tourne | une rupture peut bloquer l'anneau |
    | **Étoile** | tout relié à un équipement central (switch) | si le centre tombe, tout tombe |
    | Maillée | chacun relié à tous | très robuste mais très coûteuse |

    !!! tip "En pratique"
        Tous les réseaux du module (et ceux que tu administreras) sont des **étoiles
        commutées**, éventuellement combinées en topologie hybride. Bus et anneau sont
        historiques.

    ## 2. Les supports de transmission

    Un support conduit un signal de la source à la destination avec le moins
    d'affaiblissement, de dispersion et de distorsion possible.

    | Filaires | Sans fil |
    |----------|----------|
    | câble coaxial (historique, plus utilisé) | ondes radio (dont le Wi-Fi) |
    | **paires torsadées** (RJ45) | infrarouge (rare : vue directe, ne traverse pas les murs) |
    | **fibre optique** | laser |

    ### Paires torsadées

    - **8 fils torsadés deux à deux** : la torsade limite les perturbations
      électromagnétiques. Embout **RJ45**. C'est le câble des LAN.
    - **Catégories** (Cat 5e, 6, 6a, 7, 8) : plus la catégorie est haute, plus la **bande
      passante** admissible est grande.
    - **Blindages** : UTP (aucun), FTP (feuille globale), STP (par paire), S/FTP (les deux).
      Plus c'est blindé, plus c'est cher et rigide.
    - Détail des catégories et blindages : [fiche technique en bas de page](#fiche-technique-cables-et-connectique).

    !!! piege "Bande passante ≠ débit"
        **Bande passante** = largeur de bande de fréquences, en **hertz** (propriété du câble).
        **Débit** = volume transmis par seconde, en **bit/s** (ce qu'on arrive à y faire passer).

    ### Câble droit ou croisé (sertissage)

    Le **sertissage** relie le connecteur au câble selon un code couleur normalisé
    (**T568A** ou **T568B**). Fils **1-2 = émission**, **3-6 = réception**.

    - **Câble droit** : même norme aux deux bouts → équipements **de nature différente**
      (PC ↔ switch, routeur ↔ switch).
    - **Câble croisé** : T568A d'un côté, T568B de l'autre → équipements **de même nature**
      (PC ↔ PC, PC ↔ routeur, routeur ↔ routeur, switch ↔ switch).

    !!! piege "Packet Tracer"
        Le matériel récent s'adapte tout seul (**auto-MDI-X**) : le droit marche partout.
        **Pas dans Packet Tracer** : là, le tableau s'applique à la lettre. Lien rouge entre
        deux équipements de même nature → change le câble avant de chercher ailleurs.
        (PC ↔ routeur compte comme « même nature » : ce sont deux terminaux qui émettent sur 1-2.)

    ### Fibre optique

    Impulsions **lumineuses** dans le cœur de la fibre : très rapide, **insensible aux
    interférences électromagnétiques**.

    | | Multimode | Monomode |
    |---|-----------|----------|
    | Cœur | large, 50 à 62,5 µm | très fin, ~9 µm |
    | Propagation | plusieurs trajets (modes) de longueurs différentes → **dispersion modale** | un seul mode |
    | Portée | ~2 km | ~60 km sans répéteur (jusqu'à 8 000 km avec) |
    | Usage | réseaux locaux ou urbains | longue distance, câbles transatlantiques |

    ### Sans fil

    Ondes électromagnétiques ; les bits sont codés par **modulation** (on fait varier
    amplitude, fréquence ou phase). Ondes radio de 9 kHz à 300 GHz, dont les micro-ondes
    (300 MHz – 300 GHz) : le **Wi-Fi à 2,4 et 5 GHz**.
    Limites : atténuation avec la distance, obstacles, moins fiable que le filaire, et
    **support partagé** par tous les équipements de la cellule.

    ### Débit et temps de propagation

    Deux grandeurs **différentes**, souvent confondues :

    $$
    t_{\text{transmission}} = \frac{\text{taille}}{\text{débit}}
    \qquad\qquad
    t_{\text{propagation}} = \frac{\text{distance}}{\text{vitesse dans le support}}
    $$

    Dans une fibre, $v \approx c/1{,}5 \approx 2\times10^8$ m/s.

    !!! example "Paris → Sydney (17 000 km) et Paris → New York (6 000 km)"
        - Sydney : $t = \dfrac{17\times10^6}{2\times10^8} = 85$ ms, soit **170 ms aller-retour**
          avant le moindre octet utile.
        - New York : $t = \dfrac{6\times10^6}{2\times10^8} = 30$ ms, soit **60 ms aller-retour**
          (2,8 fois moins : le temps de propagation est proportionnel à la distance).

    Le temps d'un aller-retour s'appelle le **RTT** (*round-trip time*). RTT + temps de
    transmission + attentes dans les équipements = la **latence**.

    ??? question "Vérifions : tu doubles le débit Paris–Sydney. Le premier bit arrive…"
        **C — exactement au même moment.** Le temps de propagation ne dépend que de la
        distance et de la vitesse dans le support. Doubler le débit raccourcit le temps de
        transmission **du reste du fichier**, pas l'arrivée du premier bit.
        Le piège A (« débit = vitesse ») est l'erreur la plus répandue.

    ## 3. Les modèles réseau

    Problème : un réseau est trop complexe pour être conçu d'un bloc. Solution : le
    **découper en couches**. Chaque couche a un rôle précis, rend un service à celle du
    dessus et utilise celle du dessous. L'idée centrale est **l'indépendance des couches** :
    remplacer le Wi-Fi par un câble change les couches 1 et 2 **sans toucher une ligne du
    navigateur**.

    ### Le modèle OSI (ISO, années 1980) — 7 couches

    On compte **de bas en haut** : la 1 est la plus proche du câble, la 7 la plus proche de
    l'utilisateur.

    | N° | Couche | Rôle | Unité (PDU) | Équipements / protocoles |
    |:--:|--------|------|-------------|--------------------------|
    | 7 | **Application** | services réseau aux applications | données | HTTP, FTP, SMTP, DNS |
    | 6 | **Présentation** | format, compression, chiffrement | données | (TLS, MIME : CM 4) |
    | 5 | **Session** | établir, maintenir, terminer un dialogue | données | |
    | 4 | **Transport** | bout en bout, entre **applications** (ports) | **segments** | TCP, UDP |
    | 3 | **Réseau** | routage **entre réseaux**, adresses **IP** | **paquets** | routeur ; IP, ICMP, ARP |
    | 2 | **Liaison** | transfert sur **un lien**, adresses **MAC**, CRC | **trames** | commutateur, carte réseau ; Ethernet, Wi-Fi |
    | 1 | **Physique** | bits → signaux électriques, optiques, radio | **bits** | concentrateur, câbles, répéteurs |

    !!! tip "Mnémotechnique du cours (de 7 à 1)"
        « **A**pprentissage **P**ar **S**urprise, **T**oujours **R**éussir, **L**ors **D**es
        **P**ratiques » → **A**pplication, **P**résentation, **S**ession, **T**ransport,
        **R**éseau, **L**iaison **D**e données, **P**hysique.

    ### Couche 2 : la liaison de données

    - **Adresse MAC** (`AA:BB:CC:DD:EE:FF`, 48 bits) : inscrite dans la carte réseau, elle
      identifie une **interface** et **ne sort jamais du réseau local**.
    - En-tête ajouté : **MAC source et MAC destination**.
    - **CRC** : l'émetteur traite la trame comme un grand nombre binaire, le divise par un
      diviseur fixé par la norme et envoie le **reste**. Le récepteur refait le calcul ;
      reste différent → trame abîmée.

    !!! piege "Le CRC détecte, il ne corrige pas"
        La trame abîmée est **jetée**, pas réparée. Une éventuelle retransmission est le
        travail des couches supérieures (TCP).

    #### Unicast, broadcast, multicast

    | Mode | Destinataires | MAC de destination |
    |------|---------------|--------------------|
    | **Unicast** | une seule interface | MAC de cette interface |
    | **Broadcast** (diffusion) | **tout le réseau local** | `FF:FF:FF:FF:FF:FF` |
    | **Multicast** | un groupe d'abonnés | adresse de groupe |

    !!! definition "Domaine de diffusion"
        Ensemble des équipements qu'un **broadcast** atteint. C'est lui qui délimite « un
        réseau local », et c'est le **routeur** qui l'arrête (CM 3).
        Le broadcast n'est pas un défaut : c'est le seul moyen de parler à une machine dont on
        ignore la MAC (→ ARP).

    #### Du concentrateur au commutateur

    | | Concentrateur (*hub*) | Commutateur (*switch*) |
    |---|------------------------|------------------------|
    | Couche | **1** — il ne lit rien | **2** — il lit la MAC de destination |
    | Ce qu'il fait | répète tout signal sur **tous** les ports | n'envoie la trame que sur **le port concerné** |
    | Collisions | tout le hub = **un seul domaine de collision**, débit partagé | **chaque port** = un domaine de collision ; échanges simultanés à plein débit |
    | Broadcast | répété partout | **répété partout aussi** |

    !!! piege "Collision ≠ diffusion"
        Le switch découpe les **domaines de collision**, **pas le domaine de diffusion**.
        Séparer les domaines de diffusion, c'est le travail du **routeur**.

    #### Comment le switch apprend : la table MAC

    Il tient une table **port ↔ adresses MAC vues derrière**. Deux règles :

    1. Pour **toute trame reçue**, il note la **MAC source** et le port d'arrivée.
    2. Pour émettre : si la **MAC destination** est dans la table → ce seul port ; sinon →
       **inondation** sur tous les ports sauf celui d'arrivée.

    | Trame (table vide au départ) | Ce qu'il apprend | Où il envoie |
    |------------------------------|------------------|--------------|
    | A → B | A : port 1 | B inconnue → **inondation** |
    | B → A | B : port 2 | A connue → port 1 seul |
    | C → A | C : port 3 | port 1 seul |
    | D → B | **D : port 4** | B connue → **port 2 seul**, pas d'inondation |

    La table se **construit sur la source** et **sert sur la destination** : c'est ce décalage
    qui surprend.

    ??? question "Vérifions : 10 machines sur un switch, PC1 → PC2. Combien la reçoivent ?"
        **D — ça dépend de ce que le switch a déjà appris.** Si la MAC de PC2 est dans la
        table, un seul port ; sinon la trame est inondée sur les 9 autres. Le piège C
        (« 10, c'est un réseau local ») confond concentrateur et commutateur.

    ### Couche 3 : le réseau

    Routage des **paquets entre réseaux**, adresses **IP** (IPv4 `192.168.1.10` sur 32 bits ;
    IPv6 `2001:0db8::1` sur 128 bits). Équipement : **routeur**. Protocoles : IP, ICMP, ARP.

    !!! definition "ARP (*Address Resolution Protocol*)"
        Pour fabriquer une trame il faut la **MAC** du destinataire, mais on ne connaît que son
        **IP**. La machine envoie une requête **en broadcast** : « qui a 192.168.1.10 ? ». La
        machine concernée répond **en unicast** avec sa MAC. Le résultat est gardé dans le
        **cache ARP**.

    ### Couches hautes

    - **Transport (4)** : communication de bout en bout. **TCP** = fiable, avec connexion,
      contrôle d'erreurs, remise en ordre (web, mail, fichiers). **UDP** = rapide, sans
      connexion, sans garantie (streaming, VoIP, DNS). Les **ports** désignent l'application
      (HTTP 80, HTTPS 443) : c'est grâce à eux que deux onglets du même navigateur reçoivent
      chacun leur réponse. Approfondi au [chapitre 4](chapitre-4-services.md).
    - **Session (5)** : établir, maintenir, terminer une session.
    - **Présentation (6)** : traduire les formats, compresser, chiffrer.
    - **Application (7)** : services réseau aux applications (HTTP, FTP, SMTP, DNS).

    ### OSI et TCP/IP

    **OSI** = modèle **théorique**, vocabulaire de référence (« panne de couche 2 »).
    **TCP/IP** = modèle **pratique** en 4 couches, celui qu'Internet implémente.

    | TCP/IP | Rôle | OSI | Protocoles |
    |--------|------|:---:|------------|
    | **Application** | web, mail, fichiers, noms | 5, 6, 7 | HTTP, DNS, DHCP, FTP |
    | **Transport** | fiabilité, flux, ports | 4 | TCP, UDP |
    | **Internet** | adressage logique, acheminement entre réseaux | 3 | IPv4, IPv6, ICMP |
    | **Accès réseau** | trame, adressage physique, signaux | 1 et 2 | Ethernet, Wi-Fi |

    Session et présentation **n'existent pas séparément** dans TCP/IP : elles sont absorbées
    par la couche Application.

    ### Encapsulation et décapsulation

    À l'émission, le message descend de la couche 7 à la 1 et **chaque couche ajoute son
    en-tête** : c'est l'**encapsulation**. À la réception, chaque couche retire le sien dans
    l'ordre inverse : la **décapsulation**.

    | Couche | Ce qui est ajouté (visite de `http://example.com`) | Élément transmis |
    |:------:|-----------------------------------------------------|------------------|
    | 7·6·5 | requête HTTP `GET /` | données |
    | 4 | ports `52341 → 80` | segment |
    | 3 | IP `192.168.1.10 → 93.184.216.34` | paquet |
    | 2 | MAC : **ta MAC → MAC de ton routeur** | trame |
    | 1 | bits sur le câble | bits |

    !!! theoreme "La phrase la plus importante du module"
        **L'adresse IP vise la destination finale ; l'adresse MAC ne vise que le prochain
        équipement.** La MAC de destination n'est pas celle du serveur, c'est celle de ton
        routeur. (Observé au [TP 1](../td/tp-1-capture-trames.md), expliqué au
        [chapitre 3](chapitre-3-routage.md).)

    ## 4. Ce que tout cela consomme

    **Méthode : puissance × durée.** Un commutateur 24 ports ≈ 25 W, allumé en permanence :

    $$
    0{,}025\ \text{kW} \times 24\ \text{h} \times 365\ \text{j} = 219\ \text{kWh/an}
    $$

    Pour 20 commutateurs : ≈ 4 400 kWh/an, l'ordre de grandeur d'un logement, pour le seul
    réseau local.

    !!! piege "Ça ne dépend PAS du trafic"
        Un équipement réseau consomme **presque autant à vide qu'en pleine charge** : c'est le
        **défaut de proportionnalité énergétique**. La consommation suit le **nombre
        d'équipements allumés**, pas le volume transporté. Le levier n'est donc pas
        « transmettre moins » mais **allumer moins d'équipements, les mutualiser, les faire
        durer**. Suite au [chapitre 4](chapitre-4-services.md#3-ce-que-coute-un-service).

    ## Fiche technique : câbles et connectique { #fiche-technique-cables-et-connectique }

    Annexe du CM 1, **au programme** (peut tomber au contrôle continu).

    | Catégorie | Débit max | Bande passante | Usage |
    |-----------|-----------|:--------------:|-------|
    | Cat 5e | 1 Gbit/s | 100 MHz | LAN, Internet domestique et bureau |
    | Cat 6 | 10 Gbit/s (sur **55 m**) | 250 MHz | entreprise, câblage moyen |
    | Cat 6a | 10 Gbit/s (sur **100 m**) | 500 MHz | pro très haut débit — **choix par défaut** d'un LAN neuf |
    | Cat 7 | 10 Gbit/s | 600 MHz | environnements perturbés |
    | Cat 8 | 40 Gbit/s | 2 000 MHz | centres de données |

    Cat 6 et 6a ont le même débit avec des bandes passantes différentes : la 6a le **tient
    sur 100 m**, la 6 seulement sur 55 m.

    | Blindage | Description | + | − |
    |----------|-------------|---|---|
    | UTP | non blindé | souple, économique | sensible aux interférences |
    | FTP | feuille autour de l'ensemble | bonne protection, souple | pas de blindage par paire |
    | STP | chaque paire blindée | bonne protection EMI/RFI | rigide, cher |
    | S/FTP | par paire + global | protection maximale | coûteux, peu souple |

    En bureau, l'UTP suffit. Le blindage sert près de moteurs, ascenseurs, éclairages
    industriels. **Un blindage non relié à la terre protège moins bien qu'un câble non blindé.**

    | Broche | T568A | T568B |
    |:------:|-------|-------|
    | 1 | blanc/vert | blanc/orange |
    | 2 | vert | orange |
    | 3 | blanc/orange | blanc/vert |
    | 4 | bleu | bleu |
    | 5 | blanc/bleu | blanc/bleu |
    | 6 | orange | vert |
    | 7 | blanc/marron | blanc/marron |
    | 8 | marron | marron |

    Les deux normes ne diffèrent que par la **permutation des paires verte et orange** ;
    T568B est la plus répandue. En 10/100 Mbit/s, seules les broches 1-2 (TX) et 3-6 (RX)
    servent ; en Gigabit, les 4 paires émettent et reçoivent simultanément.

    !!! methode "Lien qui ne monte pas : dans l'ordre"
        1. Bon type de câble (droit / croisé) ?
        2. Voyants des deux interfaces allumés ?
        3. Interface **administrativement active** ? (désactivée par défaut sur un routeur Cisco → `no shutdown`)
        4. Longueur ≤ **100 m** pour du cuivre (toutes catégories) ?
        5. Source d'interférences à proximité ?

        Seulement ensuite on regarde l'adressage : *une panne de couche 1 ne se diagnostique pas en couche 3.*

=== "Version papier"

    Support du CM 1 2026-2027 (Y. Soglo), puis la fiche technique *Câbles et connectique*.

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 1 : Fondamentaux et modèles](papier/cm1/p01.jpg){ loading=lazy .papier }](papier/cm1/p01.jpg)
    <p class="papier-legende">Fondamentaux et modèles · CM 1 — Fondamentaux et modèles réseaux, diapo 1</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 2 : Objectifs](papier/cm1/p02.jpg){ loading=lazy .papier }](papier/cm1/p02.jpg)
    <p class="papier-legende">Objectifs · CM 1 — Fondamentaux et modèles réseaux, diapo 2</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 3 : Une règle pour ce module : l'usage de l'IA](papier/cm1/p03.jpg){ loading=lazy .papier }](papier/cm1/p03.jpg)
    <p class="papier-legende">Une règle pour ce module : l'usage de l'IA · CM 1 — Fondamentaux et modèles réseaux, diapo 3</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 4 : Partie 1 : Concepts de base](papier/cm1/p04.jpg){ loading=lazy .papier }](papier/cm1/p04.jpg)
    <p class="papier-legende">Partie 1 : Concepts de base · CM 1 — Fondamentaux et modèles réseaux, diapo 4</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 5 : Définitions et concepts de base](papier/cm1/p05.jpg){ loading=lazy .papier }](papier/cm1/p05.jpg)
    <p class="papier-legende">Définitions et concepts de base · CM 1 — Fondamentaux et modèles réseaux, diapo 5</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 6 : Réseaux informatiques](papier/cm1/p06.jpg){ loading=lazy .papier }](papier/cm1/p06.jpg)
    <p class="papier-legende">Réseaux informatiques · CM 1 — Fondamentaux et modèles réseaux, diapo 6</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 7 : Les types de réseaux](papier/cm1/p07.jpg){ loading=lazy .papier }](papier/cm1/p07.jpg)
    <p class="papier-legende">Les types de réseaux · CM 1 — Fondamentaux et modèles réseaux, diapo 7</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 8 : Topologies réseau](papier/cm1/p08.jpg){ loading=lazy .papier }](papier/cm1/p08.jpg)
    <p class="papier-legende">Topologies réseau · CM 1 — Fondamentaux et modèles réseaux, diapo 8</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 9 : Topologies réseau : les principales](papier/cm1/p09.jpg){ loading=lazy .papier }](papier/cm1/p09.jpg)
    <p class="papier-legende">Topologies réseau : les principales · CM 1 — Fondamentaux et modèles réseaux, diapo 9</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 10 : Partie 2 : Les supports de transmission](papier/cm1/p10.jpg){ loading=lazy .papier }](papier/cm1/p10.jpg)
    <p class="papier-legende">Partie 2 : Les supports de transmission · CM 1 — Fondamentaux et modèles réseaux, diapo 10</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 11 : Les supports de transmission](papier/cm1/p11.jpg){ loading=lazy .papier }](papier/cm1/p11.jpg)
    <p class="papier-legende">Les supports de transmission · CM 1 — Fondamentaux et modèles réseaux, diapo 11</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 12 : Médias câblés : paires torsadées](papier/cm1/p12.jpg){ loading=lazy .papier }](papier/cm1/p12.jpg)
    <p class="papier-legende">Médias câblés : paires torsadées · CM 1 — Fondamentaux et modèles réseaux, diapo 12</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 13 : Le sertissage : câble droit ou câble croisé ?](papier/cm1/p13.jpg){ loading=lazy .papier }](papier/cm1/p13.jpg)
    <p class="papier-legende">Le sertissage : câble droit ou câble croisé ? · CM 1 — Fondamentaux et modèles réseaux, diapo 13</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 14 : Médias câblés : la fibre optique](papier/cm1/p14.jpg){ loading=lazy .papier }](papier/cm1/p14.jpg)
    <p class="papier-legende">Médias câblés : la fibre optique · CM 1 — Fondamentaux et modèles réseaux, diapo 14</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 15 : Les médias sans fil](papier/cm1/p15.jpg){ loading=lazy .papier }](papier/cm1/p15.jpg)
    <p class="papier-legende">Les médias sans fil · CM 1 — Fondamentaux et modèles réseaux, diapo 15</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 16 : Débit et temps de propagation](papier/cm1/p16.jpg){ loading=lazy .papier }](papier/cm1/p16.jpg)
    <p class="papier-legende">Débit et temps de propagation · CM 1 — Fondamentaux et modèles réseaux, diapo 16</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 17 : Vérifions : Vous doublez le débit de la ligne Paris–Sydney](papier/cm1/p17.jpg){ loading=lazy .papier }](papier/cm1/p17.jpg)
    <p class="papier-legende">Vérifions : Vous doublez le débit de la ligne Paris–Sydney · CM 1 — Fondamentaux et modèles réseaux, diapo 17</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 18 : Partie 3 : Modèles réseau](papier/cm1/p18.jpg){ loading=lazy .papier }](papier/cm1/p18.jpg)
    <p class="papier-legende">Partie 3 : Modèles réseau · CM 1 — Fondamentaux et modèles réseaux, diapo 18</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 19 : Pourquoi des modèles réseaux ?](papier/cm1/p19.jpg){ loading=lazy .papier }](papier/cm1/p19.jpg)
    <p class="papier-legende">Pourquoi des modèles réseaux ? · CM 1 — Fondamentaux et modèles réseaux, diapo 19</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 20 : Les 7 couches du modèle OSI](papier/cm1/p20.jpg){ loading=lazy .papier }](papier/cm1/p20.jpg)
    <p class="papier-legende">Les 7 couches du modèle OSI · CM 1 — Fondamentaux et modèles réseaux, diapo 20</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 21 : Les couches basses — Couche physique](papier/cm1/p21.jpg){ loading=lazy .papier }](papier/cm1/p21.jpg)
    <p class="papier-legende">Les couches basses — Couche physique · CM 1 — Fondamentaux et modèles réseaux, diapo 21</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 22 : Les couches basses — Couche liaison de données](papier/cm1/p22.jpg){ loading=lazy .papier }](papier/cm1/p22.jpg)
    <p class="papier-legende">Les couches basses — Couche liaison de données · CM 1 — Fondamentaux et modèles réseaux, diapo 22</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 23 : Dans un réseau local : à qui s'adresse-t-on ?](papier/cm1/p23.jpg){ loading=lazy .papier }](papier/cm1/p23.jpg)
    <p class="papier-legende">Dans un réseau local : à qui s'adresse-t-on ? · CM 1 — Fondamentaux et modèles réseaux, diapo 23</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 24 : Du concentrateur au commutateur](papier/cm1/p24.jpg){ loading=lazy .papier }](papier/cm1/p24.jpg)
    <p class="papier-legende">Du concentrateur au commutateur · CM 1 — Fondamentaux et modèles réseaux, diapo 24</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 25 : Comment le commutateur apprend-il qui est où ?](papier/cm1/p25.jpg){ loading=lazy .papier }](papier/cm1/p25.jpg)
    <p class="papier-legende">Comment le commutateur apprend-il qui est où ? · CM 1 — Fondamentaux et modèles réseaux, diapo 25</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 26 : Vérifions : Dix machines reliées à un commutateur](papier/cm1/p26.jpg){ loading=lazy .papier }](papier/cm1/p26.jpg)
    <p class="papier-legende">Vérifions : Dix machines reliées à un commutateur · CM 1 — Fondamentaux et modèles réseaux, diapo 26</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 27 : Les couches basses — Couche réseau](papier/cm1/p27.jpg){ loading=lazy .papier }](papier/cm1/p27.jpg)
    <p class="papier-legende">Les couches basses — Couche réseau · CM 1 — Fondamentaux et modèles réseaux, diapo 27</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 28 : Les couches hautes — Couche transport](papier/cm1/p28.jpg){ loading=lazy .papier }](papier/cm1/p28.jpg)
    <p class="papier-legende">Les couches hautes — Couche transport · CM 1 — Fondamentaux et modèles réseaux, diapo 28</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 29 : Les couches hautes — Session et Présentation](papier/cm1/p29.jpg){ loading=lazy .papier }](papier/cm1/p29.jpg)
    <p class="papier-legende">Les couches hautes — Session et Présentation · CM 1 — Fondamentaux et modèles réseaux, diapo 29</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 30 : Les couches hautes — Couche application](papier/cm1/p30.jpg){ loading=lazy .papier }](papier/cm1/p30.jpg)
    <p class="papier-legende">Les couches hautes — Couche application · CM 1 — Fondamentaux et modèles réseaux, diapo 30</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 31 : OSI et TCP/IP](papier/cm1/p31.jpg){ loading=lazy .papier }](papier/cm1/p31.jpg)
    <p class="papier-legende">OSI et TCP/IP · CM 1 — Fondamentaux et modèles réseaux, diapo 31</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 32 : Le modèle TCP/IP : les quatre couches](papier/cm1/p32.jpg){ loading=lazy .papier }](papier/cm1/p32.jpg)
    <p class="papier-legende">Le modèle TCP/IP : les quatre couches · CM 1 — Fondamentaux et modèles réseaux, diapo 32</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 33 : Encapsulation et décapsulation](papier/cm1/p33.jpg){ loading=lazy .papier }](papier/cm1/p33.jpg)
    <p class="papier-legende">Encapsulation et décapsulation · CM 1 — Fondamentaux et modèles réseaux, diapo 33</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 34 : Encapsulation : exemple](papier/cm1/p34.jpg){ loading=lazy .papier }](papier/cm1/p34.jpg)
    <p class="papier-legende">Encapsulation : exemple · CM 1 — Fondamentaux et modèles réseaux, diapo 34</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 35 : Partie 4 : Ce que tout cela consomme](papier/cm1/p35.jpg){ loading=lazy .papier }](papier/cm1/p35.jpg)
    <p class="papier-legende">Partie 4 : Ce que tout cela consomme · CM 1 — Fondamentaux et modèles réseaux, diapo 35</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 36 : Ce que consomme un équipement réseau](papier/cm1/p36.jpg){ loading=lazy .papier }](papier/cm1/p36.jpg)
    <p class="papier-legende">Ce que consomme un équipement réseau · CM 1 — Fondamentaux et modèles réseaux, diapo 36</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 37 : De quoi cette consommation dépend-elle ?](papier/cm1/p37.jpg){ loading=lazy .papier }](papier/cm1/p37.jpg)
    <p class="papier-legende">De quoi cette consommation dépend-elle ? · CM 1 — Fondamentaux et modèles réseaux, diapo 37</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 38 : Partie 5 : Conclusion](papier/cm1/p38.jpg){ loading=lazy .papier }](papier/cm1/p38.jpg)
    <p class="papier-legende">Partie 5 : Conclusion · CM 1 — Fondamentaux et modèles réseaux, diapo 38</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 39 : Conclusion](papier/cm1/p39.jpg){ loading=lazy .papier }](papier/cm1/p39.jpg)
    <p class="papier-legende">Conclusion · CM 1 — Fondamentaux et modèles réseaux, diapo 39</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 40 : Pour la prochaine séance](papier/cm1/p40.jpg){ loading=lazy .papier }](papier/cm1/p40.jpg)
    <p class="papier-legende">Pour la prochaine séance · CM 1 — Fondamentaux et modèles réseaux, diapo 40</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 41 : Merci de votre attention](papier/cm1/p41.jpg){ loading=lazy .papier }](papier/cm1/p41.jpg)
    <p class="papier-legende">Merci de votre attention · CM 1 — Fondamentaux et modèles réseaux, diapo 41</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 42 : Annexe — corrigés des activités (1/2)](papier/cm1/p42.jpg){ loading=lazy .papier }](papier/cm1/p42.jpg)
    <p class="papier-legende">Annexe — corrigés des activités (1/2) · CM 1 — Fondamentaux et modèles réseaux, diapo 42</p>

    [![CM 1 — Fondamentaux et modèles réseaux, diapo 43 : Annexe — corrigés des activités (2/2)](papier/cm1/p43.jpg){ loading=lazy .papier }](papier/cm1/p43.jpg)
    <p class="papier-legende">Annexe — corrigés des activités (2/2) · CM 1 — Fondamentaux et modèles réseaux, diapo 43</p>

    [![Fiche technique Câbles et connectique, p. 1 : Câbles et connectique](papier/ft1/p01.jpg){ loading=lazy .papier }](papier/ft1/p01.jpg)
    <p class="papier-legende">Câbles et connectique · Fiche technique Câbles et connectique, p. 1</p>

    [![Fiche technique Câbles et connectique, p. 2](papier/ft1/p02.jpg){ loading=lazy .papier }](papier/ft1/p02.jpg)
    <p class="papier-legende">Fiche technique Câbles et connectique, p. 2</p>

    [![Fiche technique Câbles et connectique, p. 3](papier/ft1/p03.jpg){ loading=lazy .papier }](papier/ft1/p03.jpg)
    <p class="papier-legende">Fiche technique Câbles et connectique, p. 3</p>
