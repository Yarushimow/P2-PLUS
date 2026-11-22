# TP et devoir

Pas de TD dans ce module : tout passe par les **TP** (Wireshark, Packet Tracer) et un devoir de
calcul. Chaque page a deux onglets : **Version simplifiée** (corrigé et méthode) et **Version
papier** (les vraies pages des énoncés, à agrandir d'un clic).

| Séance | Contenu |
|--------|---------|
| [TP 1 — Capture et analyse de trames](tp-1-capture-trames.md) | Wireshark : prédire puis vérifier un ping, lire une trame couche par couche, l'enquête PC2 / PC3 (corrigé des 14 questions), l'audit Verlaine |
| [TP 2 — Réseau local dans Packet Tracer](tp-2-packet-tracer.md) | Maquette, plan d'adressage de l'accueil, ARP en mode simulation, `arp -a`, défis masque / cache ARP / table MAC / IPv6 |
| [Devoir maison — Calculer une adresse IP](devoir-maison-calcul-ip.md) | Réseau, diffusion, plage, hôtes ; même réseau ou pas ; retrouver le masque ; 8 sous-réseaux |
| [TP 3.1 — Concevoir un plan d'adressage](tp-3-1-plan-adressage.md) | Découpage à taille fixe, l'ordre croissant qui échoue, plan VLSM complet de Soglo & Fils, défis Verlaine et automates |
| [TP 3.2 — Construire le plan conçu](tp-3-2-construire-plan.md) | Configuration des 2911 en CLI, `show ip interface brief`, le ping qui s'arrête sur R1, défis IPv6 |

!!! tip "Méthode du module"
    Toujours **écrire le calcul et la vérification**, pas seulement le résultat : c'est ce qui
    est noté (y compris si tu t'aides d'une IA). Devant une panne, **du bas vers le haut** :
    lien, adresses, passerelle, route, route de retour.
