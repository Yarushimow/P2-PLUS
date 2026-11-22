---
title: "TP 1 — Capture et analyse de trames"
---

# TP 1 — Capture et analyse de trames (Wireshark)

=== "Version simplifiée"

    Énoncé, feuille de réponses et fiche Wireshark dans l'onglet **Version papier**.
    Rappels : [chapitre 1](../cours/chapitre-1-fondamentaux-modeles.md) (MAC, ARP, encapsulation)
    et [chapitre 3](../cours/chapitre-3-routage.md#ce-qui-change-a-chaque-saut) (ce qui change à
    chaque saut). Les valeurs des parties 2 à 4 ont été relues trame par trame dans les captures.

    !!! theoreme "Les 4 règles de lecture d'une trame (à appliquer seul en partie 3)"
        1. **La direction se lit dans le temps** : dans un échange client-serveur, le client parle le premier.
        2. **Chaque couche répond à une question différente** : Ethernet = entre quelles
           **interfaces**, sur ce réseau local ; IP = entre quelles **machines**, de bout en bout ;
           UDP = entre quels **programmes**.
        3. **Le port du serveur ne change pas, celui du client change à chaque fois** : c'est ce
           qui permet de les reconnaître et d'apparier une réponse à sa question.
        4. **Une trame ne porte pas tout** (le masque, les tables de routage…). Savoir quoi fait
           partie du métier.

    ## Partie 1 — Prédire, puis vérifier (sur ta machine)

    Les valeurs dépendent de ton poste ; voici la démarche, avec ce que donnait le réseau Wi-Fi
    de l'école chez moi.

    **Étape 1.** `ipconfig /all` (Linux : `ip a` + `ip route`) : IPv4 `10.3.228.190`, masque
    `255.255.0.0`, passerelle `10.3.0.1`, MAC de la carte Wi-Fi.

    **Étape 2.** Masque 255.255.0.0 : on recopie les deux premiers octets, on met 0 aux deux
    autres → réseau **10.3.0.0/16** (plage 10.3.0.1 → 10.3.255.254). La passerelle 10.3.0.1 est
    dans ce réseau, en **première** adresse utilisable : l'école applique l'autre convention que
    celle du module (le module prend la **dernière**).

    **Étape 3 (prédictions).**

    | | ping vers la passerelle | ping vers 1.1.1.1 |
    |---|---|---|
    | IP source | ma machine (10.3.228.190) | ma machine |
    | IP destination | 10.3.0.1 | **1.1.1.1** (l'IP vise toujours la vraie cible) |

    Ce que je sais déjà : ma MAC (`ipconfig /all`), mon IP, l'IP de la passerelle, mon adresse
    réseau (calcul de l'étape 2). Ce que je ne sais **pas** encore : la MAC de la passerelle (je
    la découvrirai dans la capture). Protocoles attendus : **ARP** (trouver la MAC de la
    passerelle, si elle n'est pas en cache) puis **ICMP** (echo request / echo reply).

    **Étape 4.** Filtre d'affichage `arp || icmp`. Trois choses normales : sommes de contrôle en
    rouge sur **mes** trames (calculées par la carte après Wireshark : *checksum offloading*),
    passerelle qui ne répond pas forcément au ping, requêtes ARP des voisins.

    ### Étape 6 — Les quatre questions qui comptent

    1. **MAC de destination** des deux pings : **la même**, celle de la **passerelle**
       (`00:09:0f:09:00:26` chez moi). Les IP de destination diffèrent (10.3.0.1 et 1.1.1.1),
       mais 1.1.1.1 n'est pas sur mon réseau : ma machine envoie la trame au **prochain
       équipement**, la passerelle. *L'IP vise la destination finale, la MAC le prochain saut.*
    2. **MAC de 1.1.1.1** : **introuvable**, et c'est normal. Une MAC ne sort jamais du réseau
       local ; chaque routeur réécrit la trame. On ne voit que les MAC de son propre lien.
    3. **ARP des voisins visibles, pas leurs pages web** : les requêtes ARP sont en **broadcast**
       (`ff:ff:ff:ff:ff:ff`) donc envoyées à tout le monde ; le trafic web est en **unicast**, le
       commutateur (ou le point d'accès) ne l'envoie qu'au destinataire. En Wi-Fi, en plus,
       l'unicast est chiffré avec la clé **propre à chaque station** alors que le broadcast l'est
       avec une **clé commune** : je peux déchiffrer le second, pas le premier.
    4. **TTL de la réponse de 1.1.1.1** : il ne vaut pas 64 (typiquement entre 50 et 60 depuis un
       réseau français). En supposant un TTL initial de 64 : **routeurs traversés = 64 − TTL
       reçu** (ex. TTL 56 → 8 routeurs). La capture ne permet **pas** de vérifier que le TTL de
       départ valait 64 : c'est une hypothèse.

    ## Partie 2 — Lire une trame, la méthode

    Réglage préalable : *Vue > Résolution des noms* > décocher **Résoudre les adresses réseau**.

    ### capt1 — PC1 interroge le serveur PCS (même réseau)

    | Trame | Ethernet | IP | UDP | Données |
    |:-----:|----------|----|-----|---------|
    | 1 | `ea:48:d3:74:1e:dd` → `ff:ff:ff:ff:ff:ff` | ARP : qui a 140.77.16.15 ? dit 140.77.16.64 | | |
    | 2 | `72:99:80:ee:d5:4f` → `ea:48:d3:74:1e:dd` | ARP : 140.77.16.15 est à `72:99:80:ee:d5:4f` | | |
    | 3 | `ea:48:…:1e:dd` → `72:99:…:d5:4f` | 140.77.16.64 → 140.77.16.15, TTL 64 | 56461 → **1800** | « Quelle heure est-il ? » |
    | 4 | `72:99:…:d5:4f` → `ea:48:…:1e:dd` | 140.77.16.15 → 140.77.16.64, TTL 64 | **1800** → 56461 | « Il est l'heure du cours de Reseaux » |

    1. Trame 3 : Ethernet donne 2 MAC, IP 2 adresses IP, UDP 2 ports, puis les données.
    2. Le client parle le premier : **PC1 = 140.77.16.64** (MAC `ea:48:d3:74:1e:dd`), **PCS =
       140.77.16.15** (MAC `72:99:80:ee:d5:4f`).
    3. Trame 4 : **tout est inversé** (MAC, IP, ports) ; le protocole et le fait d'être sur le
       même lien restent identiques.
    4. Réponse en clair : « Il est l'heure du cours de Reseaux ».
    5. Le serveur écoute sur **1800** ; le client a utilisé **56461**. Seul **1800** est « le port
       du service » : il est fixe et connu à l'avance, alors que 56461 est un port dynamique
       choisi au hasard par le client pour cette conversation.
    6. Trames 1 et 2 : **ARP**. PC1 connaît l'IP du serveur mais pas sa MAC : requête en
       **broadcast** (`ff:ff:ff:ff:ff:ff`), réponse en **unicast**.
    7. **Non, le masque n'est pas déductible** : aucun champ ne le porte. On sait seulement que
       PC1 considère 140.77.16.15 sur son réseau (il fait un ARP direct dessus), ce qui donne au
       mieux une borne, jamais la valeur.

    ### capt2 — deux clients sur PC1

    | Trame | Sens | Ports | Données |
    |:-----:|------|-------|---------|
    | 1 | PC1 → PCS | **57521** → 1800 | « Quel temps fait-il ? » |
    | 2 | PC1 → PCS | **42043** → 1800 | « Quelle heure est-il ? » |
    | 3 | PCS → PC1 | 1800 → **42043** | « Il est l'heure du cours de Reseaux » |
    | 4 | PCS → PC1 | 1800 → **57521** | « Il neige » |

    1. Mêmes MAC, mêmes IP : le serveur distingue les deux clients par leur **port source**
       (57521 et 42043).
    2. Les réponses reviennent **dans l'ordre inverse** des questions. On apparie avec le **port
       client** (question 57521 ↔ réponse vers 57521 = « Il neige »), pas avec l'ordre d'arrivée,
       ni avec les adresses (identiques).
    3. Fonction illustrée : le **multiplexage / démultiplexage** de la couche transport (les
       ports désignent les applications sur une même machine).

    ## Partie 3 — L'enquête

    ### Premier terrain : capt3 et capt4 (PC2, un routeur)

    | Trame | capt3 | capt4 |
    |:-----:|-------|-------|
    | 1 | ARP : `5e:8e:4d:73:e2:94` demande « qui a 140.77.16.15 ? dit **140.77.16.1** » | ARP : `56:3a:b4:38:95:90` demande « qui a **13.15.24.1** ? dit 13.15.24.15 » |
    | 2 | réponse de `72:99:80:ee:d5:4f` (PCS) | réponse de `be:c1:20:3e:06:17` : 13.15.24.1 est à moi |
    | 3 | `5e:8e:…:94` → `72:99:…:4f`, 13.15.24.15 → 140.77.16.15, **TTL 63**, id 9892, chk IP 0x539f | `56:3a:…:90` → `be:c1:…:17`, 13.15.24.15 → 140.77.16.15, **TTL 64**, id 9892, chk IP 0x529f |
    | 4 | `72:99:…:4f` → `5e:8e:…:94`, réponse TTL 64, id 27527 | `be:c1:…:17` → `56:3a:…:90`, réponse **TTL 63**, id 27527 |

    **Q1.** PC2 = **13.15.24.15** (IP source de la question, trame 3 des deux captures).

    **Q2.**

    | Couche | Identique dans les deux | Différent |
    |--------|-------------------------|-----------|
    | Ethernet | — (type IPv4) | **les deux MAC** : capt4 PC2 ↔ R1 (`56:3a:…:90` / `be:c1:…:17`), capt3 R1 ↔ PCS (`5e:8e:…:94` / `72:99:…:4f`) |
    | IP | IP source et destination (13.15.24.15 ↔ 140.77.16.15), identifiant, protocole | **TTL** (64 / 63) et **somme de contrôle d'en-tête** |
    | UDP | ports 45328 ↔ 1800, longueur, **somme de contrôle UDP** | rien |
    | Données | « Quel temps fait-il ? » / « Il neige » | rien |

    **Q3. Table des adresses**

    | Machine | Adresse IP | Adresse MAC | Lue où |
    |---------|------------|-------------|--------|
    | PC1 | 140.77.16.64 | `ea:48:d3:74:1e:dd` | capt1, trame 3 |
    | PC2 | 13.15.24.15 | `56:3a:b4:38:95:90` | capt4, trame 3 |
    | PCS (serveur) | 140.77.16.15 | `72:99:80:ee:d5:4f` | capt1 et capt3 |
    | R1 — interface réseau du haut | 140.77.16.1 | `5e:8e:4d:73:e2:94` | capt3, trames 1-3 |
    | R1 — interface réseau du milieu | 13.15.24.1 | `be:c1:20:3e:06:17` | capt4, trames 2-4 |

    **Q4.** Dans capt3, R1 envoie la requête ARP : il y écrit **sa propre IP d'émetteur**,
    **140.77.16.1** (côté haut). Dans capt4, PC2 demande « qui a 13.15.24.1 ? » (sa passerelle) et
    c'est `be:c1:20:3e:06:17`, la MAC de R1, qui répond : **13.15.24.1** est l'IP de R1 côté milieu.
    (Dans un ARP, l'IP de l'émetteur est celle de l'interface qui émet.)

    **Q5.** **capt4 = réseau du milieu**, **capt3 = réseau du haut**. Champ invoqué : le **TTL**
    de la question de PC2. capt4 : **64** (le paquet n'a encore traversé aucun routeur) ; capt3 :
    **63** (il vient de traverser R1). Vérification avec la réponse : 64 dans capt3 (elle part de
    PCS), 63 dans capt4.

    **Q6.** Même **paquet** (pas seulement même échange) : l'**identifiant IP** est le même
    (**9892** pour la question, **27527** pour la réponse) et la **somme de contrôle UDP** aussi
    (**0xc1a7** pour la question). Un nouveau paquet aurait un autre identifiant.

    **Q7.** Le **TTL** a changé (64 → 63), et par conséquence la **somme de contrôle de l'en-tête
    IP** (0x529f → 0x539f) : elle est calculée sur tout l'en-tête, TTL compris, donc le routeur doit
    la **recalculer** dès qu'il décrémente le TTL.

    **Q8.** C'est la somme **IP** qui est recalculée ; la somme **UDP** ne l'est jamais. Elle
    couvre l'en-tête UDP, les données et un pseudo-en-tête (IP source et destination, protocole,
    longueur), et **rien de tout cela ne change** dans un routeur : il travaille en couche 3 et ne
    touche pas à la couche 4.

    ### Le super détective : capt51, capt52, capt53 (PC3, deux routeurs)

    | Capture | Trame 3 (question de PC3) | Trame 4 (réponse) | ARP |
    |---------|---------------------------|-------------------|-----|
    | capt51 | `1e:cc:84:96:6c:a1` → `be:c1:20:3e:06:17`, **TTL 63** | `be:c1:…:17` → `1e:cc:…:a1`, **TTL 63** | R2 (13.15.24.2) demande 13.15.24.1 |
    | capt52 | `ba:31:b9:d4:19:d0` → `e2:68:2c:69:60:40`, **TTL 64** | `e2:68:…:40` → `ba:31:…:d0`, **TTL 62** | PC3 (154.15.25.17) demande 154.15.25.1 |
    | capt53 | `5e:8e:4d:73:e2:94` → `72:99:80:ee:d5:4f`, **TTL 62** | `72:99:…:4f` → `5e:8e:…:94`, **TTL 64** | **aucun** (2 trames seulement) |

    Dans les trois : 154.15.25.17 → 140.77.16.15, ports 52279 → 1800, identifiants 13156 / 39324.

    **Q9.**

    | | Adresse IP | Adresse MAC |
    |---|---|---|
    | PC3 | **154.15.25.17** | `ba:31:b9:d4:19:d0` |
    | R2 — interface réseau du milieu | **13.15.24.2** | `1e:cc:84:96:6c:a1` |
    | R2 — interface réseau du bas | **154.15.25.1** | `e2:68:2c:69:60:40` |

    (R2 côté milieu : IP d'émetteur de son ARP dans capt51. R2 côté bas : c'est lui qui répond à
    PC3 « 154.15.25.1 est à `e2:68:2c:69:60:40` » dans capt52.)

    **Q10.** **capt52 = bas** (TTL de la question 64 : pas encore routé ; MAC de PC3 présente).
    **capt51 = milieu** (TTL 63 : un routeur traversé, R2 ; trame entre R2 et R1).
    **capt53 = haut** (TTL 62 : deux routeurs traversés ; MAC de PCS présente).

    **Q11.**

    | Capture | TTL aller | TTL retour | Somme |
    |---------|:---------:|:----------:|:-----:|
    | capt52 (bas) | 64 | 62 | 126 |
    | capt51 (milieu) | 63 | 63 | 126 |
    | capt53 (haut) | 62 | 64 | 126 |

    L'aller perd 1 à chaque routeur en montant, le retour perd 1 à chaque routeur en descendant :
    sur un réseau donné, (routeurs déjà traversés à l'aller) + (routeurs déjà traversés au retour)
    = 2, donc la somme vaut toujours 64 + 64 − 2 = **126**. Cela confirme l'ordre bas → milieu →
    haut et le fait que **deux** routeurs séparent PC3 de PCS.

    **Q12.** Il manque l'**échange ARP**. Sur le réseau du haut, R1 avait déjà la MAC de PCS en
    **cache ARP** (et PCS celle de R1) : ils l'avaient apprise pendant l'échange de capt3, environ
    9 minutes plus tôt (16 h 32 contre 16 h 40). On ne fait un ARP que si l'adresse n'est pas
    déjà en cache.

    **Q13. Topologie** (huit interfaces)

    ```text
     Réseau du haut 140.77.16.0
       PC1  140.77.16.64  ea:48:d3:74:1e:dd
       PCS  140.77.16.15  72:99:80:ee:d5:4f
       R1   140.77.16.1   5e:8e:4d:73:e2:94
                │
               [R1]
                │
     Réseau du milieu 13.15.24.0
       R1   13.15.24.1    be:c1:20:3e:06:17
       PC2  13.15.24.15   56:3a:b4:38:95:90
       R2   13.15.24.2    1e:cc:84:96:6c:a1
                │
               [R2]
                │
     Réseau du bas 154.15.25.0
       R2   154.15.25.1   e2:68:2c:69:60:40
       PC3  154.15.25.17  ba:31:b9:d4:19:d0
    ```

    (Adresses de réseau écrites en supposant des /24 : les masques ne sont pas connus, voir Q14.)

    **Q14. Ce qu'on n'a pas pu déterminer, et ce qu'il aurait fallu**

    - **Les masques** : aucune trame ne les porte → `ipconfig` / `ip a` sur les machines.
    - **Les tables de routage et passerelles** (celle de PC1, qui ne sort jamais de son réseau) → `route print`, `ip route`, `show ip route`.
    - **Le TTL de départ réel** (on suppose 64) → la configuration du système.
    - **Les commutateurs** : invisibles dans les trames → accès aux équipements, `show mac address-table`.
    - **Les noms des machines et du programme serveur** (port 1800) → accès aux machines.
    - **Les machines silencieuses** pendant les captures.

    ## Partie 4 — Pour les cracks : l'audit Verlaine

    Quatre captures, 91 trames. Résultats relus dans `audit1` à `audit4`.

    ### Épreuve 1 — La cartographie

    **1.1** **6 interfaces** distinctes, pour **5 machines** : le routeur en a deux, et ses MAC
    se suivent (`00:1b:0c:3f:91:a0` et `…:a1`, même constructeur, numéros consécutifs).
    **3 réseaux** vus : 10.20.4.0 (postes), 10.20.200.0 (serveurs), 10.21.x (où est 10.21.0.9).
    Plus loin : la réponse de **10.21.0.9 arrive avec TTL 61** ; avec un départ à 64, elle a
    traversé **3 routeurs**. Le premier est le routeur du cabinet, il y en a donc deux autres, et
    entre trois routeurs en série il y a **au moins 2 réseaux** dont on ne voit aucune adresse →
    **au moins 5 réseaux** en tout.

    **1.2 Inventaire**

    | Machine (rôle) | IP | MAC | Captures |
    |----------------|----|-----|----------|
    | Poste de J. Renard | 10.20.4.21 | `d4:be:d9:1a:4c:07` | audit1, audit4 |
    | Poste compta (M. Ferrand) | 10.20.4.37 | `d4:be:d9:1a:52:b1` | audit1, audit2 |
    | Poste de l'atelier (mal configuré) | 10.20.4.150 | `3c:d9:2b:7e:08:44` | audit1 |
    | Routeur, côté postes | 10.20.4.1 | `00:1b:0c:3f:91:a0` | audit1, audit2, audit4 |
    | Routeur, côté serveurs | 10.20.200.1 | `00:1b:0c:3f:91:a1` | audit3 |
    | Serveur intranet | 10.20.200.10 | `00:50:56:9b:2d:17` | audit3 |

    **1.3** **audit1, audit2, audit4 = réseau des postes** : on y voit les MAC des postes et la
    patte `…:a0` du routeur, et les paquets des postes ont **TTL 128** (pas encore routés) tandis
    que ceux du serveur arrivent en **63**. **audit3 = réseau des serveurs** : MAC du serveur et de
    la patte `…:a1`, paquets du poste en **TTL 127** (routés une fois), serveur en **64**.
    audit3 montre d'ailleurs la même session que audit1 (mêmes ports, mêmes identifiants IP), vue
    de l'autre côté du routeur.

    **1.4** Dans audit1 : filtre `arp` → **11** paquets ; filtre `icmp` → **8** ; requêtes ARP
    **sans réponse : 5** (les cinq « qui a 10.20.200.10 ? » de 10.20.4.150).

    ### Épreuve 2 — La fuite

    1. **audit2**. Pour la trouver sans tout ouvrir : fusionner les quatre fichiers
       (*Fichier > Fusionner*, ou `mergecap`) et filtrer `http.request.method == "POST"`, ou
       chercher la chaîne `motdepasse` (*Édition > Rechercher un paquet*, type « Chaîne »).
       (audit1/audit3 contiennent aussi une connexion, réussie du premier coup.)
    2. Compte **m.ferrand** (page d'accueil : « Bonjour Marie FERRAND »), sur
       **intranet.cabinet-verlaine.lan** (en-tête `Host`), via *Suivre > Flux TCP*.
    3. Deux `POST /login`. **Le premier échoue** : le serveur renvoie `200 OK` avec la page de
       login et « Identifiants incorrects. Il vous reste 2 tentatives. ». **Le second réussit** :
       indice 1, le serveur répond `302 Found` avec `Location: /accueil` et un `Set-Cookie: sid=…` ;
       indice 2, juste après, le client fait `GET /accueil` avec ce cookie et reçoit la page d'accueil.

        ??? warning "Spoiler : les deux mots de passe et le jeton"
            Mots de passe essayés : `Printemps2026` (refusé) puis `Imprimante2024!` (accepté,
            transmis encodé `Imprimante2024%21`). Jeton dans un commentaire HTML de la page
            d'accueil : `TI305{TOUT_PASSE_EN_CLAIR}`.

    4. Voir le spoiler ci-dessus.
    5. **En HTTPS**, disparaîtraient : l'URL et les en-têtes (`Host`, `Cookie`), le formulaire et
       les mots de passe, les codes de réponse, le contenu des pages. **Resteraient** : les MAC,
       les IP, les ports (443), la poignée de main TCP, la négociation TLS (dont le **nom du
       serveur** en clair dans le *ClientHello*, le SNI, et son certificat), les **tailles** et les
       **horaires** des échanges, et les requêtes DNS. On sait toujours *qui parle à qui, quand et
       combien* ; on ne sait plus *quoi*.

    ### Épreuve 3 — L'audit

    1. La machine fautive est **10.20.4.150** (poste de l'atelier).
    2. Elle croit que **10.20.200.10 (le serveur) est sur son propre réseau** : elle le demande
       directement en ARP au lieu de passer par le routeur. Pour 10.21.0.9, elle passe bien par
       la passerelle 10.20.4.1.
    3. Le masque se déduit par encadrement :
        - **Borne haute** : elle croit 10.20.200.10 local, donc les bits réseau couvrent une
          partie commune à 10.20.**4**.150 et 10.20.**200**.10. Or 4 = `00000100` et
          200 = `11001000` diffèrent dès le **premier bit** du 3e octet → préfixe **≤ /16**.
        - **Borne basse** : elle envoie 10.21.0.9 à la passerelle, donc 10.21.0.9 n'est pas local.
          10.**20** = `00010100` et 10.**21** = `00010101` diffèrent au **dernier bit** du 2e octet
          → préfixe **≥ /16**.
        - Donc exactement **/16 = 255.255.0.0** (au lieu du /24 du plan).
    4. Conséquence : pour joindre l'intranet, elle envoie des **requêtes ARP « qui a
       10.20.200.10 ? » en broadcast sur le réseau des postes** ; le serveur est sur un autre
       réseau, le routeur arrête le broadcast, **personne ne répond jamais**, aucune trame IP ne
       part : l'intranet est inaccessible.
    5. Ce qui marche encore : les échanges avec les autres postes de 10.20.4.0 (vraiment locaux)
       et **tout ce qui est hors de 10.20.0.0/16** (10.21.0.9, Internet), envoyé correctement à la
       passerelle. Une panne **partielle**, donc trompeuse.

    ### Épreuve 4 — Ce qu'on ne peut pas savoir

    1. **On ne peut pas le savoir.** audit4 vient de 10.20.4.21 (le poste où j.renard s'est
       connecté dans audit1), mais la session y est identifiée par le cookie `sid=2b9e07fa`, qui
       **n'est pas** celui de j.renard (`sid=8f2ac41e`) : aucune trame n'associe ce cookie à un
       compte. Il faudrait les **journaux du serveur** (table des sessions) ou une capture du login.
    2. audit2 ne contient **que** du trafic vers ou depuis 10.20.4.37 : cela **penche** pour une
       capture sur la machine elle-même. Mais ce n'est qu'une **présomption** : sur un réseau
       commuté, une capture sur le port de cette machine (ou un port miroir) verrait exactement
       la même chose. Pour trancher, il faudrait savoir comment la capture a été faite.

    ## Fiche technique Wireshark — l'essentiel

    | Filtre de **capture** | Filtre d'**affichage** |
    |-----------------------|------------------------|
    | décide ce qui est **enregistré** | décide ce qui est **montré** |
    | avant de démarrer, non modifiable | à tout moment |
    | *Capture > Options*, syntaxe tcpdump : `tcp port 80` | barre du haut, syntaxe Wireshark : `tcp.port == 80` |

    Capture large, filtre à l'affichage. Filtres utiles : `arp`, `icmp`, `udp`, `tcp`, `dns`,
    `http`, `arp || icmp`, `ip.addr == …`, `ip.src == …`, `eth.addr == …`, `udp.port == 1800`,
    `ip.ttl < 64` (paquets déjà routés), `frame.number == 3`.

    !!! piege "Deux pièges documentés"
        - `ip.addr != X` **n'exclut pas** X (le champ existe en source et en destination) :
          écrire `!(ip.addr == X)`. Idem pour `eth.addr`, `tcp.port`, `udp.port`.
        - Sommes de contrôle en rouge sur **tes** trames émises : *checksum offloading*, pas une
          panne. Sur les trames **reçues**, c'est un vrai signal.

    Ce qu'une capture ne dira jamais : le **masque**, la **table de routage** d'un routeur, le
    **contenu chiffré**, et ce qui **ne passe pas par toi** (sur un réseau commuté, le mode
    *promiscuous* ne montre pas le trafic des autres). Wireshark **n'émet rien** (sauf les
    requêtes DNS de la résolution de noms, qu'on désactive).

=== "Version papier"

    Énoncé du TP 1, feuille de réponses de la partie 3, puis la fiche technique Wireshark.

    [![TP 1 — Capture et analyse de trames, p. 1 : TP1 — Capture et analyse de trames réseau](papier/tp1/p01.jpg){ loading=lazy .papier }](papier/tp1/p01.jpg)
    <p class="papier-legende">TP1 — Capture et analyse de trames réseau · TP 1 — Capture et analyse de trames, p. 1</p>

    [![TP 1 — Capture et analyse de trames, p. 2](papier/tp1/p02.jpg){ loading=lazy .papier }](papier/tp1/p02.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 2</p>

    [![TP 1 — Capture et analyse de trames, p. 3](papier/tp1/p03.jpg){ loading=lazy .papier }](papier/tp1/p03.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 3</p>

    [![TP 1 — Capture et analyse de trames, p. 4](papier/tp1/p04.jpg){ loading=lazy .papier }](papier/tp1/p04.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 4</p>

    [![TP 1 — Capture et analyse de trames, p. 5](papier/tp1/p05.jpg){ loading=lazy .papier }](papier/tp1/p05.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 5</p>

    [![TP 1 — Capture et analyse de trames, p. 6](papier/tp1/p06.jpg){ loading=lazy .papier }](papier/tp1/p06.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 6</p>

    [![TP 1 — Capture et analyse de trames, p. 7](papier/tp1/p07.jpg){ loading=lazy .papier }](papier/tp1/p07.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 7</p>

    [![TP 1 — Capture et analyse de trames, p. 8](papier/tp1/p08.jpg){ loading=lazy .papier }](papier/tp1/p08.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 8</p>

    [![TP 1 — Capture et analyse de trames, p. 9](papier/tp1/p09.jpg){ loading=lazy .papier }](papier/tp1/p09.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 9</p>

    [![TP 1 — Capture et analyse de trames, p. 10](papier/tp1/p10.jpg){ loading=lazy .papier }](papier/tp1/p10.jpg)
    <p class="papier-legende">TP 1 — Capture et analyse de trames, p. 10</p>

    [![TP 1 — Feuille de réponses, partie 3, p. 1 : Feuille de réponses — Partie 3](papier/tp1-feuille/p01.jpg){ loading=lazy .papier }](papier/tp1-feuille/p01.jpg)
    <p class="papier-legende">Feuille de réponses — Partie 3 · TP 1 — Feuille de réponses, partie 3, p. 1</p>

    [![TP 1 — Feuille de réponses, partie 3, p. 2](papier/tp1-feuille/p02.jpg){ loading=lazy .papier }](papier/tp1-feuille/p02.jpg)
    <p class="papier-legende">TP 1 — Feuille de réponses, partie 3, p. 2</p>

    [![TP 1 — Feuille de réponses, partie 3, p. 3](papier/tp1-feuille/p03.jpg){ loading=lazy .papier }](papier/tp1-feuille/p03.jpg)
    <p class="papier-legende">TP 1 — Feuille de réponses, partie 3, p. 3</p>

    [![TP 1 — Feuille de réponses, partie 3, p. 4](papier/tp1-feuille/p04.jpg){ loading=lazy .papier }](papier/tp1-feuille/p04.jpg)
    <p class="papier-legende">TP 1 — Feuille de réponses, partie 3, p. 4</p>

    [![TP 1 — Feuille de réponses, partie 3, p. 5](papier/tp1-feuille/p05.jpg){ loading=lazy .papier }](papier/tp1-feuille/p05.jpg)
    <p class="papier-legende">TP 1 — Feuille de réponses, partie 3, p. 5</p>

    [![TP 1 — Feuille de réponses, partie 3, p. 6](papier/tp1-feuille/p06.jpg){ loading=lazy .papier }](papier/tp1-feuille/p06.jpg)
    <p class="papier-legende">TP 1 — Feuille de réponses, partie 3, p. 6</p>

    [![Fiche technique Wireshark, p. 1 : Wireshark](papier/wireshark/p01.jpg){ loading=lazy .papier }](papier/wireshark/p01.jpg)
    <p class="papier-legende">Wireshark · Fiche technique Wireshark, p. 1</p>

    [![Fiche technique Wireshark, p. 2](papier/wireshark/p02.jpg){ loading=lazy .papier }](papier/wireshark/p02.jpg)
    <p class="papier-legende">Fiche technique Wireshark, p. 2</p>

    [![Fiche technique Wireshark, p. 3](papier/wireshark/p03.jpg){ loading=lazy .papier }](papier/wireshark/p03.jpg)
    <p class="papier-legende">Fiche technique Wireshark, p. 3</p>

    [![Fiche technique Wireshark, p. 4](papier/wireshark/p04.jpg){ loading=lazy .papier }](papier/wireshark/p04.jpg)
    <p class="papier-legende">Fiche technique Wireshark, p. 4</p>
