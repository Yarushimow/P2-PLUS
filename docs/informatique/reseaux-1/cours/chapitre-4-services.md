---
title: "Ch. 4 — Les services réseau"
---

# Chapitre 4 — Les services réseau

=== "Version simplifiée"

    Les couches hautes : ports et sockets, TCP contre UDP (handshake, fenêtre glissante),
    session et présentation (TLS), trois services du quotidien (DNS, HTTP, DHCP), puis ce que
    coûte un service et comment arbitrer entre deux architectures.

    ## 1. Atteindre un service

    | Couche OSI | Rôle |
    |------------|------|
    | Application (7) | protocoles d'accès aux services : fichiers, courrier, noms |
    | Présentation (6) | formats, chiffrement, compression |
    | Session (5) | établir, maintenir, terminer les connexions entre applications |
    | Transport (4) | transmission entre hôtes : fiable (TCP) ou rapide (UDP), flux, erreurs |

    Dans TCP/IP ces 4 couches n'en font que **2** : Transport, et Application (qui absorbe 5, 6, 7).

    ### La couche transport

    Elle **segmente** les données, les transmet et les **réassemble**.

    !!! theoreme "Réseau vs transport, en une phrase"
        La couche **réseau** achemine un paquet **d'une machine à une autre** ; la couche
        **transport** le remet **à la bonne application** sur cette machine. D'où le changement
        de nom : le paquet devient un **segment**.

    ### Les numéros de port

    | Plage | Nom | Usage |
    |-------|-----|-------|
    | 0 – 1023 | ports **connus** | services standards : HTTP 80, HTTPS 443, FTP 21, SMTP 25, DNS 53 |
    | 1024 – 49151 | ports **enregistrés** | applications attribuées par l'IANA |
    | 49152 – 65535 | ports **dynamiques** | ports **sources** temporaires des connexions sortantes |

    !!! definition "Socket et connexion"
        **Socket** = couple **adresse IP + port** : une extrémité de communication.
        Une **connexion** est identifiée par **4 valeurs** : IP source, port source, IP
        destination, port destination. Deux onglets du même navigateur (même IP) reçoivent
        chacun leur réponse parce que **leurs ports sources diffèrent**.

    ### TCP : orienté connexion et fiable

    - **Connexion** établie avant tout transfert.
    - **Fiabilité** : chaque segment reçu est acquitté (**ACK**) ; perdu ou corrompu → **retransmis**.
    - **Détection d'erreurs** : somme de contrôle dans l'en-tête ; un segment abîmé est rejeté
      puis retransmis (comme le CRC : elle **détecte**, elle ne répare pas).
    - **Ordre** : remise en ordre garantie.
    - **Contrôle de flux** : la **fenêtre glissante** évite de saturer le récepteur.
    - Usages : web (HTTP), fichiers (FTP), courrier (SMTP), accès distant (Telnet, SSH).

    #### Le *three-way handshake*

    ```mermaid
    sequenceDiagram
        participant C as Client
        participant S as Serveur
        C->>S: SYN (« je veux ouvrir une connexion »)
        S->>C: SYN-ACK (« d'accord, et moi aussi »)
        C->>S: ACK (« bien reçu »)
        Note over C,S: connexion établie, les données peuvent circuler
    ```

    Les deux parties sont prêtes et d'accord sur leurs **numéros de séquence** de départ.
    **Ouvrir une connexion TCP coûte un aller-retour complet** (trois trames avant le moindre
    octet utile, visibles dans les captures du TP 1).

    #### La fenêtre glissante

    Si TCP attendait l'ACK de chaque segment avant d'envoyer le suivant, il paierait un RTT
    par segment. Avec la **fenêtre**, l'émetteur envoie **plusieurs segments sans attendre** et
    ne s'arrête que quand la fenêtre est pleine ; chaque ACK la fait **glisser**.

    !!! example "Pourquoi elle est indispensable : Paris–Sydney (RTT 170 ms)"
        Segment par segment, le débit utile plafonne à

        $$
        \frac{1\,500\ \text{octets}}{\text{RTT}} = \frac{12\,000\ \text{bits}}{0{,}170\ \text{s}} \approx 70\ \text{kbit/s}
        $$

        **quelle que soit la capacité du lien.** Inversement, pour saturer un lien il faut une
        fenêtre égale au **produit débit-délai** = débit × RTT : sur 1 Gbit/s et 170 ms,
        $10^9 \times 0{,}170 = 1{,}7\times10^8$ bits ≈ **21 Mo**.

    ### UDP : rapide et sans garantie

    Non orienté connexion : envoie des **datagrammes** directement. Pas d'accusé, pas de
    retransmission, pas de remise en ordre, pas de contrôle de flux.
    **Ce n'est pas un défaut, c'est un choix** : en direct (appel, vidéo), un paquet
    retransmis arriverait trop tard pour servir. Usages : streaming, jeux en ligne, VoIP, **DNS**.

    | | TCP | UDP |
    |---|-----|-----|
    | Connexion | établie avant (handshake) | aucune |
    | Fiabilité | ACK + retransmission | aucune garantie |
    | Ordre | remise en ordre | aucune |
    | Contrôle de flux | fenêtre glissante | aucun |
    | Coût de démarrage | un aller-retour | nul |
    | Unité | **segment** | **datagramme** |
    | Usages | web, courrier, fichiers | voix, vidéo en direct, jeux, DNS |

    !!! methode "La question à se poser : « que coûte une perte ? »"
        Donnée perdue qui **doit** être récupérée → **TCP**. Donnée **périmée** avant d'avoir
        pu être retransmise → **UDP**.

    ??? question "Vérifions : la visio utilise UDP. Pourquoi pas TCP ?"
        **B** : TCP retransmet ce qui est perdu, et une retransmission coûte au moins un
        aller-retour (170 ms sur une liaison longue) ; l'image rejouée arriverait après celles
        qui la suivent. En direct, une image manquante coûte moins cher qu'une image en retard.

        - A est faux : TCP n'est pas « lent », il est **fiable**, et c'est la fiabilité qui coûte du temps.
        - C est faux : TCP transporte des octets quelconques, binaire compris.
        - D est marginalement vrai (8 octets d'en-tête contre 20) mais ce n'est pas la raison.

    ### Session et présentation

    **Session** : un chef d'orchestre. **Établissement** (les deux parties prêtes, paramètres
    fixés), **maintien** (*keep-alive* qui garde la connexion pendant les silences, ex. un SSH
    ouvert sans rien taper, et détecte une rupture), **terminaison** propre.

    !!! note "Honnêteté de modèle"
        Dans TCP/IP cette couche n'existe pas en tant que telle : la reprise d'un téléchargement
        est faite par le protocole applicatif lui-même (commande `REST` de FTP, en-tête `Range`
        de HTTP). OSI nomme une fonction ; les implémentations la placent où elles veulent.

    **Présentation** : rendre les données interprétables quelles que soient les machines
    (formats, jeux de caractères, **compression**, **chiffrement**). Deux protocoles associés :
    **TLS** (canal sécurisé) et **MIME** (transporter des fichiers de toute nature dans des
    messages texte : les pièces jointes).

    !!! definition "TLS, HTTPS et le port 443"
        **TLS** (*Transport Layer Security*, successeur de SSL) assure **confidentialité**,
        **intégrité** et **authentification du serveur**. **HTTPS = HTTP dans un canal TLS**,
        d'où le port **443** au lieu de 80.
        Où le ranger ? En OSI, couche présentation (il chiffre). En pratique il s'intercale
        entre transport et application : il utilise TCP et sert HTTP. Le modèle à 7 couches ne
        range pas toujours la réalité.

    ## 2. Trois services que tu utilises sans les voir

    ### DNS : une base de données distribuée

    Le DNS convertit les **noms** en **adresses IP**, mais surtout c'est une base
    **hiérarchique et distribuée** : aucun serveur ne détient tous les noms.

    ```text
    .  (racine)
    └── fr          (domaine de 1er niveau)
        └── efrei
            └── www
    ```

    1. Le résolveur demande à un serveur **racine** : « qui gère `.fr` ? »
    2. Il demande au serveur de `.fr` : « qui gère `efrei.fr` ? »
    3. Il demande au serveur d'`efrei.fr` : « quelle est l'adresse de `www` ? »
    4. Il **met le résultat en cache** pour la durée fixée par l'enregistrement.

    Enregistrements : **A** (nom → IPv4), **AAAA** (IPv6), **MX** (courrier), **CNAME** (alias).
    Le **cache** rend le DNS rapide (la 1re visite est plus lente que les suivantes) et explique
    qu'un changement d'adresse mette des heures à se propager. **Port 53, surtout en UDP.**

    ### HTTP : demander une ressource

    Requête / réponse. **Requête** = méthode (**GET** obtenir, **POST** envoyer) + chemin +
    en-têtes. **Réponse** = code de statut + en-têtes + contenu.

    | Code | Sens |
    |------|------|
    | 200 | tout va bien |
    | 301 / 302 | la ressource a déménagé |
    | 404 | la ressource n'existe pas |
    | 500 | le serveur a échoué |

    HTTP est **sans état** : chaque requête est indépendante, d'où les **cookies** et **jetons**
    pour te reconnaître.

    ### DHCP : obtenir une configuration automatiquement

    Sans DHCP : adresse, masque, passerelle, DNS à la main sur chaque machine. DHCP les
    attribue en **4 messages** (« **DORA** ») :

    1. **DISCOVER** : le client (sans adresse) émet **en diffusion** : « y a-t-il un serveur DHCP ? »
    2. **OFFER** : un serveur propose une configuration.
    3. **REQUEST** : le client demande officiellement celle qu'il retient.
    4. **ACK** : le serveur confirme, le **bail** commence.

    !!! piege "Le DISCOVER est un broadcast"
        Il ne sort donc **pas du domaine de diffusion** : le serveur DHCP doit être dans le même
        réseau local que ses clients, ou atteint par un **relais**. Si personne ne répond →
        adresse **APIPA 169.254.x.x** : symptôme d'un DHCP injoignable, jamais une config valide.

    ### Les protocoles applicatifs à connaître

    | Protocole | Rôle | Transport | Port |
    |-----------|------|-----------|------|
    | HTTP / HTTPS | pages et ressources web | TCP | 80 / 443 |
    | DNS | noms → adresses IP | UDP (TCP pour les gros transferts) | 53 |
    | DHCP | configuration IP automatique | UDP | 67 (serveur) / 68 (client) |
    | FTP / SFTP | transfert de fichiers | TCP | 21 / 22 |
    | SMTP | envoi de courrier vers les serveurs | TCP | 25 |
    | POP3 / IMAP | relève du courrier | TCP | 110 / 143 |
    | Telnet / SSH | connexion distante | TCP | 23 / 22 |

    Presque tout est en TCP. Les exceptions (DNS, DHCP) sont des **échanges courts**, où
    établir une connexion coûterait plus cher que l'échange lui-même.

    ## 3. Ce que coûte un service

    Une requête (page, vidéo, IA générative) finit sur une **machine physique dans un centre de
    données** : elle a un coût matériel et énergétique invisible depuis le navigateur.

    | Poste | Poids |
    |-------|-------|
    | **Terminaux** (PC, téléphones, box) | le plus lourd ; la **fabrication** compte souvent plus que l'usage |
    | **Réseau** (accès, transport, liens) | consommation largement **indépendante du trafic** |
    | **Centres de données** | serveurs, stockage, et le **refroidissement** |

    **Leviers, par ordre d'effet** : 1. allonger la durée de vie des terminaux ; 2. allumer
    moins d'équipements et les mutualiser ; 3. refroidir moins cher (climat froid, immersion,
    récupération de chaleur) ; 4. énergies renouvelables (changent le contenu carbone, pas la
    consommation).

    !!! piege "Le « Wh par Go » est contesté"
        Il divise une consommation **largement fixe** par un volume **variable** : l'indicateur
        baisse quand le trafic augmente, sans que le trafic soit gratuit. « Regarder moins de
        vidéo » ne réduit pas la consommation du réseau dans les proportions annoncées : les
        équipements restent allumés.

    !!! methode "Lire un chiffre d'impact : 3 questions"
        1. **Quelle source ?** un organisme, une étude, une méthode publiée, pas « on estime que ».
        2. **Quel millésime ?** un chiffre de 2018 ne décrit pas 2026.
        3. **Quel périmètre ?** usage seul ou fabrication comprise ? réseau seul ou terminaux ? pays ou monde ?

        Où chercher : **ADEME** et **Arcep** (France, évaluation annuelle ; Base Empreinte pour les
        facteurs d'émission), **AIE** (demande mondiale des centres de données). La même règle vaut
        pour une réponse d'**IA** : chiffres plausibles, bien formés… et sans source.

    ### Estimer et arbitrer

    !!! methode "Chaîne de calcul"
        | Étape | Formule | Unité |
        |-------|---------|-------|
        | 1. Puissance totale | somme des puissances des équipements | W |
        | 2. Énergie annuelle | $E = P\ (\text{kW}) \times 8\,760$ h | kWh/an |
        | 3. Coût | $E \times$ tarif | €/an |
        | 4. Émissions | $E \times$ facteur d'émission | kgCO₂e/an |

        Toujours **dater** le tarif (€/kWh) et le facteur d'émission (gCO₂e/kWh). Puissances
        indicatives : switch 24 ports ≈ 25 W, 48 ports ≈ 45 W, routeur d'entrée de gamme ≈ 30 W,
        point d'accès Wi-Fi ≈ 10 W. **Attention au PoE** : un switch qui alimente téléphones ou
        bornes consomme bien plus (vérifier « système » ou « système + PoE »).

    !!! example "Yaovi & Fils : 3 étages, 45 postes, même service"
        - **A** : un switch 24 ports par étage → 3 × 24 ports + 1 routeur.
        - **B** : un switch 48 ports mutualisé au local technique + câblage vertical + 1 routeur.

        | | A | B |
        |---|---|---|
        | Puissance | 3 × 25 + 30 = **105 W** | 45 + 30 = **75 W** |
        | kWh/an | 0,105 × 8 760 = **920** | 0,075 × 8 760 = **657** |
        | €/an (0,20 €/kWh) | **184 €** | **131 €** |
        | kgCO₂e/an (60 g/kWh) | **55** | **39** |

        B consomme **29 % de moins** ($1 - 75/105$). **La décision n'est pas prise pour autant** :
        le calcul ignore la **fabrication** (souvent dominante), le **câblage supplémentaire**
        de B (cuivre, installation), la **résilience** (en B, un switch tombe et les 3 étages
        tombent) et la durée de vie / facilité de remplacement.

    Ce qu'on attend (exercice type, une demi-page) : **un chiffre, la méthode qui l'a produit,
    et une limite assumée.** Un arbitrage d'ingénieur n'est pas « le plus vert gagne ».

    ## Fiche technique : services et estimation { #fiche-technique-services-et-estimation }

    Tout son contenu est repris ci-dessus (tables des ports et protocoles, TCP/UDP, DNS/HTTP/
    DHCP, chaîne de calcul, ordres de grandeur, trois questions). Version d'origine dans
    l'onglet **Version papier**.

=== "Version papier"

    Support du CM 4 2026-2027 (Y. Soglo), puis la fiche technique *Services réseau et
    estimation d'impact*.

    [![CM 4 — Les services réseau, diapo 1 : Les services réseau](papier/cm4/p01.jpg){ loading=lazy .papier }](papier/cm4/p01.jpg)
    <p class="papier-legende">Les services réseau · CM 4 — Les services réseau, diapo 1</p>

    [![CM 4 — Les services réseau, diapo 2 : Acquis d'apprentissage](papier/cm4/p02.jpg){ loading=lazy .papier }](papier/cm4/p02.jpg)
    <p class="papier-legende">Acquis d'apprentissage · CM 4 — Les services réseau, diapo 2</p>

    [![CM 4 — Les services réseau, diapo 3 : Partie 1 : Atteindre un service](papier/cm4/p03.jpg){ loading=lazy .papier }](papier/cm4/p03.jpg)
    <p class="papier-legende">Partie 1 : Atteindre un service · CM 4 — Les services réseau, diapo 3</p>

    [![CM 4 — Les services réseau, diapo 4 : Les couches hautes : de quoi parle-t-on ?](papier/cm4/p04.jpg){ loading=lazy .papier }](papier/cm4/p04.jpg)
    <p class="papier-legende">Les couches hautes : de quoi parle-t-on ? · CM 4 — Les services réseau, diapo 4</p>

    [![CM 4 — Les services réseau, diapo 5 : La couche transport](papier/cm4/p05.jpg){ loading=lazy .papier }](papier/cm4/p05.jpg)
    <p class="papier-legende">La couche transport · CM 4 — Les services réseau, diapo 5</p>

    [![CM 4 — Les services réseau, diapo 6 : Les numéros de port](papier/cm4/p06.jpg){ loading=lazy .papier }](papier/cm4/p06.jpg)
    <p class="papier-legende">Les numéros de port · CM 4 — Les services réseau, diapo 6</p>

    [![CM 4 — Les services réseau, diapo 7 : TCP : orienté connexion et fiable](papier/cm4/p07.jpg){ loading=lazy .papier }](papier/cm4/p07.jpg)
    <p class="papier-legende">TCP : orienté connexion et fiable · CM 4 — Les services réseau, diapo 7</p>

    [![CM 4 — Les services réseau, diapo 8 : L'établissement d'une connexion : le three-way handshake](papier/cm4/p08.jpg){ loading=lazy .papier }](papier/cm4/p08.jpg)
    <p class="papier-legende">L'établissement d'une connexion : le three-way handshake · CM 4 — Les services réseau, diapo 8</p>

    [![CM 4 — Les services réseau, diapo 9 : La fenêtre glissante : envoyer sans attendre](papier/cm4/p09.jpg){ loading=lazy .papier }](papier/cm4/p09.jpg)
    <p class="papier-legende">La fenêtre glissante : envoyer sans attendre · CM 4 — Les services réseau, diapo 9</p>

    [![CM 4 — Les services réseau, diapo 10 : UDP : rapide et sans garantie](papier/cm4/p10.jpg){ loading=lazy .papier }](papier/cm4/p10.jpg)
    <p class="papier-legende">UDP : rapide et sans garantie · CM 4 — Les services réseau, diapo 10</p>

    [![CM 4 — Les services réseau, diapo 11 : TCP ou UDP ?](papier/cm4/p11.jpg){ loading=lazy .papier }](papier/cm4/p11.jpg)
    <p class="papier-legende">TCP ou UDP ? · CM 4 — Les services réseau, diapo 11</p>

    [![CM 4 — Les services réseau, diapo 12 : Vérifions : La visioconférence utilise UDP. Pourquoi pas TCP ?](papier/cm4/p12.jpg){ loading=lazy .papier }](papier/cm4/p12.jpg)
    <p class="papier-legende">Vérifions : La visioconférence utilise UDP. Pourquoi pas TCP ? · CM 4 — Les services réseau, diapo 12</p>

    [![CM 4 — Les services réseau, diapo 13 : La couche session](papier/cm4/p13.jpg){ loading=lazy .papier }](papier/cm4/p13.jpg)
    <p class="papier-legende">La couche session · CM 4 — Les services réseau, diapo 13</p>

    [![CM 4 — Les services réseau, diapo 14 : La couche présentation](papier/cm4/p14.jpg){ loading=lazy .papier }](papier/cm4/p14.jpg)
    <p class="papier-legende">La couche présentation · CM 4 — Les services réseau, diapo 14</p>

    [![CM 4 — Les services réseau, diapo 15 : TLS, HTTPS, et le port 443](papier/cm4/p15.jpg){ loading=lazy .papier }](papier/cm4/p15.jpg)
    <p class="papier-legende">TLS, HTTPS, et le port 443 · CM 4 — Les services réseau, diapo 15</p>

    [![CM 4 — Les services réseau, diapo 16 : Partie 2 : Trois services que vous utilisez sans les voir](papier/cm4/p16.jpg){ loading=lazy .papier }](papier/cm4/p16.jpg)
    <p class="papier-legende">Partie 2 : Trois services que vous utilisez sans les voir · CM 4 — Les services réseau, diapo 16</p>

    [![CM 4 — Les services réseau, diapo 17 : DNS : une base de données distribuée](papier/cm4/p17.jpg){ loading=lazy .papier }](papier/cm4/p17.jpg)
    <p class="papier-legende">DNS : une base de données distribuée · CM 4 — Les services réseau, diapo 17</p>

    [![CM 4 — Les services réseau, diapo 18 : HTTP : demander une ressource](papier/cm4/p18.jpg){ loading=lazy .papier }](papier/cm4/p18.jpg)
    <p class="papier-legende">HTTP : demander une ressource · CM 4 — Les services réseau, diapo 18</p>

    [![CM 4 — Les services réseau, diapo 19 : DHCP : obtenir une configuration automatiquement](papier/cm4/p19.jpg){ loading=lazy .papier }](papier/cm4/p19.jpg)
    <p class="papier-legende">DHCP : obtenir une configuration automatiquement · CM 4 — Les services réseau, diapo 19</p>

    [![CM 4 — Les services réseau, diapo 20 : Les autres protocoles applicatifs](papier/cm4/p20.jpg){ loading=lazy .papier }](papier/cm4/p20.jpg)
    <p class="papier-legende">Les autres protocoles applicatifs · CM 4 — Les services réseau, diapo 20</p>

    [![CM 4 — Les services réseau, diapo 21 : Où ce service s'exécute-t-il, en réalité ?](papier/cm4/p21.jpg){ loading=lazy .papier }](papier/cm4/p21.jpg)
    <p class="papier-legende">Où ce service s'exécute-t-il, en réalité ? · CM 4 — Les services réseau, diapo 21</p>

    [![CM 4 — Les services réseau, diapo 22 : Partie 3 : Ce que coûte un service](papier/cm4/p22.jpg){ loading=lazy .papier }](papier/cm4/p22.jpg)
    <p class="papier-legende">Partie 3 : Ce que coûte un service · CM 4 — Les services réseau, diapo 22</p>

    [![CM 4 — Les services réseau, diapo 23 : Où se consomme l'énergie ?](papier/cm4/p23.jpg){ loading=lazy .papier }](papier/cm4/p23.jpg)
    <p class="papier-legende">Où se consomme l'énergie ? · CM 4 — Les services réseau, diapo 23</p>

    [![CM 4 — Les services réseau, diapo 24 : Ce que mesure un « Wh par Go », et pourquoi c'est contesté](papier/cm4/p24.jpg){ loading=lazy .papier }](papier/cm4/p24.jpg)
    <p class="papier-legende">Ce que mesure un « Wh par Go », et pourquoi c'est contesté · CM 4 — Les services réseau, diapo 24</p>

    [![CM 4 — Les services réseau, diapo 25 : Lire un chiffre d'impact : trois questions](papier/cm4/p25.jpg){ loading=lazy .papier }](papier/cm4/p25.jpg)
    <p class="papier-legende">Lire un chiffre d'impact : trois questions · CM 4 — Les services réseau, diapo 25</p>

    [![CM 4 — Les services réseau, diapo 26 : Arbitrage : deux architectures pour le même service](papier/cm4/p26.jpg){ loading=lazy .papier }](papier/cm4/p26.jpg)
    <p class="papier-legende">Arbitrage : deux architectures pour le même service · CM 4 — Les services réseau, diapo 26</p>

    [![CM 4 — Les services réseau, diapo 27 : Ce que le calcul ne dit pas](papier/cm4/p27.jpg){ loading=lazy .papier }](papier/cm4/p27.jpg)
    <p class="papier-legende">Ce que le calcul ne dit pas · CM 4 — Les services réseau, diapo 27</p>

    [![CM 4 — Les services réseau, diapo 28 : Partie 4 : Conclusion](papier/cm4/p28.jpg){ loading=lazy .papier }](papier/cm4/p28.jpg)
    <p class="papier-legende">Partie 4 : Conclusion · CM 4 — Les services réseau, diapo 28</p>

    [![CM 4 — Les services réseau, diapo 29 : Conclusion](papier/cm4/p29.jpg){ loading=lazy .papier }](papier/cm4/p29.jpg)
    <p class="papier-legende">Conclusion · CM 4 — Les services réseau, diapo 29</p>

    [![CM 4 — Les services réseau, diapo 30 : Merci de votre attention](papier/cm4/p30.jpg){ loading=lazy .papier }](papier/cm4/p30.jpg)
    <p class="papier-legende">Merci de votre attention · CM 4 — Les services réseau, diapo 30</p>

    [![CM 4 — Les services réseau, diapo 31 : Annexe — corrigé de l'activité](papier/cm4/p31.jpg){ loading=lazy .papier }](papier/cm4/p31.jpg)
    <p class="papier-legende">Annexe — corrigé de l'activité · CM 4 — Les services réseau, diapo 31</p>

    [![Fiche technique Services réseau et estimation d'impact, p. 1 : Services réseau et estimation d’impact](papier/ft4/p01.jpg){ loading=lazy .papier }](papier/ft4/p01.jpg)
    <p class="papier-legende">Services réseau et estimation d’impact · Fiche technique Services réseau et estimation d'impact, p. 1</p>

    [![Fiche technique Services réseau et estimation d'impact, p. 2](papier/ft4/p02.jpg){ loading=lazy .papier }](papier/ft4/p02.jpg)
    <p class="papier-legende">Fiche technique Services réseau et estimation d'impact, p. 2</p>

    [![Fiche technique Services réseau et estimation d'impact, p. 3](papier/ft4/p03.jpg){ loading=lazy .papier }](papier/ft4/p03.jpg)
    <p class="papier-legende">Fiche technique Services réseau et estimation d'impact, p. 3</p>
