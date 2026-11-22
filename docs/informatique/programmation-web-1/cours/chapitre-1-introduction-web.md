---
title: "Ch. 1 — Introduction au Web"
---

# Chapitre 1 — Introduction au Web

=== "Version simplifiée"

    ## Web et Internet

    **Internet** est le réseau mondial (infrastructure, protocole IP). Le **Web**
    (World Wide Web, Tim Berners-Lee, CERN, 1989) est **un service** qui tourne
    dessus : des pages reliées par des **liens hypertextes**, échangées en **HTTP**.
    Le Web 2.0 (années 2000) rend l'utilisateur **acteur** (réseaux sociaux, wikis).

    ## Architecture client / serveur

    ```mermaid
    sequenceDiagram
        participant C as Client (navigateur)
        participant S as Serveur web
        C->>S: Requête HTTP (GET /index.html)
        S-->>C: Réponse HTTP (HTML, CSS, JS, images)
        Note over C: le navigateur affiche la page et exécute le JS
    ```

    - **Serveur web** : logiciel qui répond aux requêtes (Apache, Nginx…).
    - **Client** : le navigateur (Chrome, Firefox, Safari…).
    - Ouvrir un fichier en local (`file://`) n'est pas la même chose que le
      demander à un serveur (`http://`) : certaines fonctions (comme `fetch`) ne
      marchent qu'avec un serveur.

    ## Statique ou dynamique

    | | Web statique | Web dynamique |
    |---|---|---|
    | Page | fichier HTML identique pour tous | **générée** par le serveur à chaque requête |
    | Technos | HTML, CSS, JS | + langage serveur (PHP, Python, Node.js…) et base de données |
    | Avantages | simple, rapide, peu coûteux, sûr | contenu personnalisé, mis à jour facilement |
    | Inconvénients | mise à jour manuelle, pas de personnalisation | plus complexe, plus lourd, plus de failles possibles |

    ## Front-end et back-end

    - **Front-end** (côté client) : ce que voit l'utilisateur — **HTML** (structure),
      **CSS** (présentation), **JavaScript** (comportement). C'est le sujet du module.
    - **Back-end** (côté serveur) : logique métier, base de données, API.

    Outils : éditeurs de code (VS Code, Sublime Text), environnements en ligne
    (CodePen), frameworks (React, Vue…) et CMS (WordPress) — ces derniers sont
    **interdits** dans le projet.

=== "Version papier"

    La présentation du module puis les diapos de l'introduction au Web (M. Hamidi, 2025-2026).

    <!-- papier: pdf/TI402P/pre-pa-plus-presentation.pdf | Présentation du module | presentation | diapo -->

    [![Présentation du module, diapo 1 : Programmation Web](papier/presentation/p01.jpg){ loading=lazy .papier }](papier/presentation/p01.jpg)
    <p class="papier-legende">Programmation Web · Présentation du module, diapo 1</p>

    [![Présentation du module, diapo 2 : Objectifs du cours](papier/presentation/p02.jpg){ loading=lazy .papier }](papier/presentation/p02.jpg)
    <p class="papier-legende">Objectifs du cours · Présentation du module, diapo 2</p>

    [![Présentation du module, diapo 3 : Acquis d’apprentissage](papier/presentation/p03.jpg){ loading=lazy .papier }](papier/presentation/p03.jpg)
    <p class="papier-legende">Acquis d’apprentissage · Présentation du module, diapo 3</p>

    [![Présentation du module, diapo 4 : Nombre de séances](papier/presentation/p04.jpg){ loading=lazy .papier }](papier/presentation/p04.jpg)
    <p class="papier-legende">Nombre de séances · Présentation du module, diapo 4</p>

    [![Présentation du module, diapo 5 : CM Group 1](papier/presentation/p05.jpg){ loading=lazy .papier }](papier/presentation/p05.jpg)
    <p class="papier-legende">CM Group 1 · Présentation du module, diapo 5</p>

    [![Présentation du module, diapo 6 : Déroulement des TPS et du CE](papier/presentation/p06.jpg){ loading=lazy .papier }](papier/presentation/p06.jpg)
    <p class="papier-legende">Déroulement des TPS et du CE · Présentation du module, diapo 6</p>

    [![Présentation du module, diapo 7 : Le projet](papier/presentation/p07.jpg){ loading=lazy .papier }](papier/presentation/p07.jpg)
    <p class="papier-legende">Le projet · Présentation du module, diapo 7</p>

    [![Présentation du module, diapo 8 : Outils pédagogiques](papier/presentation/p08.jpg){ loading=lazy .papier }](papier/presentation/p08.jpg)
    <p class="papier-legende">Outils pédagogiques · Présentation du module, diapo 8</p>

    <!-- /papier -->

    <!-- papier: pdf/TI402P/2-introduction-au-web.pdf | Introduction au Web — support 2025-2026 | ch1 | diapo -->

    [![Introduction au Web — support 2025-2026, diapo 1 : Programmation Web](papier/ch1/p01.jpg){ loading=lazy .papier }](papier/ch1/p01.jpg)
    <p class="papier-legende">Programmation Web · Introduction au Web — support 2025-2026, diapo 1</p>

    [![Introduction au Web — support 2025-2026, diapo 2 : Histoire du WEB](papier/ch1/p02.jpg){ loading=lazy .papier }](papier/ch1/p02.jpg)
    <p class="papier-legende">Histoire du WEB · Introduction au Web — support 2025-2026, diapo 2</p>

    [![Introduction au Web — support 2025-2026, diapo 3 : Web et Internet](papier/ch1/p03.jpg){ loading=lazy .papier }](papier/ch1/p03.jpg)
    <p class="papier-legende">Web et Internet · Introduction au Web — support 2025-2026, diapo 3</p>

    [![Introduction au Web — support 2025-2026, diapo 4 : Un peu d’histoire ...](papier/ch1/p04.jpg){ loading=lazy .papier }](papier/ch1/p04.jpg)
    <p class="papier-legende">Un peu d’histoire ... · Introduction au Web — support 2025-2026, diapo 4</p>

    [![Introduction au Web — support 2025-2026, diapo 5 : Généalogie du WEB et des réseaux sociaux depuis ARPANET](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">Généalogie du WEB et des réseaux sociaux depuis ARPANET · Introduction au Web — support 2025-2026, diapo 5</p>

    [![Introduction au Web — support 2025-2026, diapo 6 : World Wide Web (WWW)](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">World Wide Web (WWW) · Introduction au Web — support 2025-2026, diapo 6</p>

    [![Introduction au Web — support 2025-2026, diapo 7 : Web 2.0 : une](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">Web 2.0 : une · Introduction au Web — support 2025-2026, diapo 7</p>

    [![Introduction au Web — support 2025-2026, diapo 8 : Architecture Client/serveur](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">Architecture Client/serveur · Introduction au Web — support 2025-2026, diapo 8</p>

    [![Introduction au Web — support 2025-2026, diapo 9 : Serveur Web](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">Serveur Web · Introduction au Web — support 2025-2026, diapo 9</p>

    [![Introduction au Web — support 2025-2026, diapo 10 : Les serveurs Web](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">Les serveurs Web · Introduction au Web — support 2025-2026, diapo 10</p>

    [![Introduction au Web — support 2025-2026, diapo 11 : Les clients Web](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">Les clients Web · Introduction au Web — support 2025-2026, diapo 11</p>

    [![Introduction au Web — support 2025-2026, diapo 12 : Client / Serveur](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">Client / Serveur · Introduction au Web — support 2025-2026, diapo 12</p>

    [![Introduction au Web — support 2025-2026, diapo 13 : Client / Serveur](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">Client / Serveur · Introduction au Web — support 2025-2026, diapo 13</p>

    [![Introduction au Web — support 2025-2026, diapo 14 : Client / Serveur](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">Client / Serveur · Introduction au Web — support 2025-2026, diapo 14</p>

    [![Introduction au Web — support 2025-2026, diapo 15 : WEB STATIQUE](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">WEB STATIQUE · Introduction au Web — support 2025-2026, diapo 15</p>

    [![Introduction au Web — support 2025-2026, diapo 16 : WEB STATIQUE](papier/ch1/p16.jpg){ loading=lazy .papier }](papier/ch1/p16.jpg)
    <p class="papier-legende">WEB STATIQUE · Introduction au Web — support 2025-2026, diapo 16</p>

    [![Introduction au Web — support 2025-2026, diapo 17 : Une page WEB statique](papier/ch1/p17.jpg){ loading=lazy .papier }](papier/ch1/p17.jpg)
    <p class="papier-legende">Une page WEB statique · Introduction au Web — support 2025-2026, diapo 17</p>

    [![Introduction au Web — support 2025-2026, diapo 18 : WEB statique](papier/ch1/p18.jpg){ loading=lazy .papier }](papier/ch1/p18.jpg)
    <p class="papier-legende">WEB statique · Introduction au Web — support 2025-2026, diapo 18</p>

    [![Introduction au Web — support 2025-2026, diapo 19 : Composition d’une page web](papier/ch1/p19.jpg){ loading=lazy .papier }](papier/ch1/p19.jpg)
    <p class="papier-legende">Composition d’une page web · Introduction au Web — support 2025-2026, diapo 19</p>

    [![Introduction au Web — support 2025-2026, diapo 20 : Composition d’une page web](papier/ch1/p20.jpg){ loading=lazy .papier }](papier/ch1/p20.jpg)
    <p class="papier-legende">Composition d’une page web · Introduction au Web — support 2025-2026, diapo 20</p>

    [![Introduction au Web — support 2025-2026, diapo 21 : EXEMPLE DE PAGE WEB](papier/ch1/p21.jpg){ loading=lazy .papier }](papier/ch1/p21.jpg)
    <p class="papier-legende">EXEMPLE DE PAGE WEB · Introduction au Web — support 2025-2026, diapo 21</p>

    [![Introduction au Web — support 2025-2026, diapo 22 : Exemple de page web](papier/ch1/p22.jpg){ loading=lazy .papier }](papier/ch1/p22.jpg)
    <p class="papier-legende">Exemple de page web · Introduction au Web — support 2025-2026, diapo 22</p>

    [![Introduction au Web — support 2025-2026, diapo 23 : Web statique : avantages et inconvénients](papier/ch1/p23.jpg){ loading=lazy .papier }](papier/ch1/p23.jpg)
    <p class="papier-legende">Web statique : avantages et inconvénients · Introduction au Web — support 2025-2026, diapo 23</p>

    [![Introduction au Web — support 2025-2026, diapo 24 : WEB DYNAMIQUE](papier/ch1/p24.jpg){ loading=lazy .papier }](papier/ch1/p24.jpg)
    <p class="papier-legende">WEB DYNAMIQUE · Introduction au Web — support 2025-2026, diapo 24</p>

    [![Introduction au Web — support 2025-2026, diapo 25 : Une page Web dynamique](papier/ch1/p25.jpg){ loading=lazy .papier }](papier/ch1/p25.jpg)
    <p class="papier-legende">Une page Web dynamique · Introduction au Web — support 2025-2026, diapo 25</p>

    [![Introduction au Web — support 2025-2026, diapo 26 : WEB Dynamique](papier/ch1/p26.jpg){ loading=lazy .papier }](papier/ch1/p26.jpg)
    <p class="papier-legende">WEB Dynamique · Introduction au Web — support 2025-2026, diapo 26</p>

    [![Introduction au Web — support 2025-2026, diapo 27 : Site Web dynamique : avantages](papier/ch1/p27.jpg){ loading=lazy .papier }](papier/ch1/p27.jpg)
    <p class="papier-legende">Site Web dynamique : avantages · Introduction au Web — support 2025-2026, diapo 27</p>

    [![Introduction au Web — support 2025-2026, diapo 28 : Site Web dynamique : Inconvénients](papier/ch1/p28.jpg){ loading=lazy .papier }](papier/ch1/p28.jpg)
    <p class="papier-legende">Site Web dynamique : Inconvénients · Introduction au Web — support 2025-2026, diapo 28</p>

    [![Introduction au Web — support 2025-2026, diapo 29 : File vs HTTP](papier/ch1/p29.jpg){ loading=lazy .papier }](papier/ch1/p29.jpg)
    <p class="papier-legende">File vs HTTP · Introduction au Web — support 2025-2026, diapo 29</p>

    [![Introduction au Web — support 2025-2026, diapo 30 : Front-End VS Back-End](papier/ch1/p30.jpg){ loading=lazy .papier }](papier/ch1/p30.jpg)
    <p class="papier-legende">Front-End VS Back-End · Introduction au Web — support 2025-2026, diapo 30</p>

    [![Introduction au Web — support 2025-2026, diapo 31 : Editeurs de sites web](papier/ch1/p31.jpg){ loading=lazy .papier }](papier/ch1/p31.jpg)
    <p class="papier-legende">Editeurs de sites web · Introduction au Web — support 2025-2026, diapo 31</p>

    [![Introduction au Web — support 2025-2026, diapo 32 : Éditeurs de sites web (quelques exemples)](papier/ch1/p32.jpg){ loading=lazy .papier }](papier/ch1/p32.jpg)
    <p class="papier-legende">Éditeurs de sites web (quelques exemples) · Introduction au Web — support 2025-2026, diapo 32</p>

    [![Introduction au Web — support 2025-2026, diapo 33 : Éditeurs de sites web (quelques exemples)](papier/ch1/p33.jpg){ loading=lazy .papier }](papier/ch1/p33.jpg)
    <p class="papier-legende">Éditeurs de sites web (quelques exemples) · Introduction au Web — support 2025-2026, diapo 33</p>

    <!-- /papier -->
