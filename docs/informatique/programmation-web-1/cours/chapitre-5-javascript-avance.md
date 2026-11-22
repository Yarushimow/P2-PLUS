---
title: "Ch. 5 — JavaScript avancé"
---

# Chapitre 5 — JavaScript avancé : asynchrone, objets, JSON

=== "Version simplifiée"

    ## Synchrone et asynchrone

    Le code JS s'exécute **ligne par ligne** (synchrone). Une opération longue
    (minuterie, requête réseau) est lancée **en asynchrone** : le reste du code
    continue, et une **fonction de rappel** (*callback*) est appelée quand
    l'opération se termine.

    ```js
    setTimeout(() => console.log("2 s plus tard"), 2000);
    const id = setInterval(() => console.log("toutes les secondes"), 1000);
    clearInterval(id);
    ```

    ## Promesses et fetch

    ```js
    fetch("intents.json")                       // renvoie une Promise
      .then((reponse) => reponse.json())        // convertit le corps en objet JS
      .then((donnees) => afficher(donnees))
      .catch((erreur) => console.error(erreur));

    // même chose avec async / await
    async function charger() {
        const reponse = await fetch("intents.json");
        const donnees = await reponse.json();
        afficher(donnees);
    }
    ```

    !!! piege "fetch et fichiers locaux"
        `fetch` ne fonctionne pas en ouvrant la page en `file://` : lancer un petit
        serveur (extension **Live Server** de VS Code).

    ## Les objets

    ```js
    const etudiant = {
        nom: "Ana",
        notes: [12, 15],
        moyenne() { return this.notes.reduce((a, b) => a + b) / this.notes.length; },
    };
    etudiant.age = 20;            // ajouter une propriété
    delete etudiant.age;          // la supprimer
    etudiant["nom"];              // accès par crochets

    class Personne {              // classes ES6
        constructor(nom) { this.nom = nom; }
        get initiale() { return this.nom[0]; }
        saluer() { return `Bonjour, je suis ${this.nom}`; }
    }
    ```

    Tableaux d'objets : `map`, `filter`, `find`, `forEach`, `reduce`, `sort`.

    ## JSON

    **JSON** (JavaScript Object Notation) est un **format texte** d'échange de
    données : objets `{ "clé": valeur }` et tableaux `[ … ]`, clés entre
    guillemets **doubles**, pas de fonctions ni de commentaires.

    ```js
    const texte = JSON.stringify(etudiant);   // objet → chaîne JSON
    const objet = JSON.parse(texte);          // chaîne JSON → objet
    ```

    ## Stockage dans le navigateur

    ```js
    localStorage.setItem("score", JSON.stringify(score));      // persiste après fermeture
    const score = JSON.parse(localStorage.getItem("score"));
    sessionStorage.setItem("etape", "2");                      // effacé à la fermeture de l'onglet
    ```

    Ces stockages ne contiennent que des **chaînes** : passer par `JSON.stringify` / `JSON.parse`.

=== "Version papier"

    La seconde partie des diapos JavaScript (asynchrone, événements avancés, objets, JSON).

    <!-- papier: pdf/TI402P/5-javascript.pdf | JavaScript — support 2025-2026 | ch5 | diapo | 25-59 -->

    [![JavaScript — support 2025-2026, diapo 25 : Synchrone Vs Asynchrone](papier/ch5/p25.jpg){ loading=lazy .papier }](papier/ch5/p25.jpg)
    <p class="papier-legende">Synchrone Vs Asynchrone · JavaScript — support 2025-2026, diapo 25</p>

    [![JavaScript — support 2025-2026, diapo 26 : L’asynchrone en Js](papier/ch5/p26.jpg){ loading=lazy .papier }](papier/ch5/p26.jpg)
    <p class="papier-legende">L’asynchrone en Js · JavaScript — support 2025-2026, diapo 26</p>

    [![JavaScript — support 2025-2026, diapo 27 : Exemple : setTimeout](papier/ch5/p27.jpg){ loading=lazy .papier }](papier/ch5/p27.jpg)
    <p class="papier-legende">Exemple : setTimeout · JavaScript — support 2025-2026, diapo 27</p>

    [![JavaScript — support 2025-2026, diapo 28 : Exemple : addEventListener()](papier/ch5/p28.jpg){ loading=lazy .papier }](papier/ch5/p28.jpg)
    <p class="papier-legende">Exemple : addEventListener() · JavaScript — support 2025-2026, diapo 28</p>

    [![JavaScript — support 2025-2026, diapo 29 : Les Callbacks](papier/ch5/p29.jpg){ loading=lazy .papier }](papier/ch5/p29.jpg)
    <p class="papier-legende">Les Callbacks · JavaScript — support 2025-2026, diapo 29</p>

    [![JavaScript — support 2025-2026, diapo 30 : L’API Fetch](papier/ch5/p30.jpg){ loading=lazy .papier }](papier/ch5/p30.jpg)
    <p class="papier-legende">L’API Fetch · JavaScript — support 2025-2026, diapo 30</p>

    [![JavaScript — support 2025-2026, diapo 31 : Les « Promise »](papier/ch5/p31.jpg){ loading=lazy .papier }](papier/ch5/p31.jpg)
    <p class="papier-legende">Les « Promise » · JavaScript — support 2025-2026, diapo 31</p>

    [![JavaScript — support 2025-2026, diapo 32 : Les évènements dans Javascript](papier/ch5/p32.jpg){ loading=lazy .papier }](papier/ch5/p32.jpg)
    <p class="papier-legende">Les évènements dans Javascript · JavaScript — support 2025-2026, diapo 32</p>

    [![JavaScript — support 2025-2026, diapo 33 : Exemples des évènements](papier/ch5/p33.jpg){ loading=lazy .papier }](papier/ch5/p33.jpg)
    <p class="papier-legende">Exemples des évènements · JavaScript — support 2025-2026, diapo 33</p>

    [![JavaScript — support 2025-2026, diapo 34 : Exemple d’évènement](papier/ch5/p34.jpg){ loading=lazy .papier }](papier/ch5/p34.jpg)
    <p class="papier-legende">Exemple d’évènement · JavaScript — support 2025-2026, diapo 34</p>

    [![JavaScript — support 2025-2026, diapo 35](papier/ch5/p35.jpg){ loading=lazy .papier }](papier/ch5/p35.jpg)
    <p class="papier-legende">JavaScript — support 2025-2026, diapo 35</p>

    [![JavaScript — support 2025-2026, diapo 36 : Récupérer des données utilisateur](papier/ch5/p36.jpg){ loading=lazy .papier }](papier/ch5/p36.jpg)
    <p class="papier-legende">Récupérer des données utilisateur · JavaScript — support 2025-2026, diapo 36</p>

    [![JavaScript — support 2025-2026, diapo 37 : Lire le contenu d’un champ de texte](papier/ch5/p37.jpg){ loading=lazy .papier }](papier/ch5/p37.jpg)
    <p class="papier-legende">Lire le contenu d’un champ de texte · JavaScript — support 2025-2026, diapo 37</p>

    [![JavaScript — support 2025-2026, diapo 38 : Récupérer n’importe quelle balise](papier/ch5/p38.jpg){ loading=lazy .papier }](papier/ch5/p38.jpg)
    <p class="papier-legende">Récupérer n’importe quelle balise · JavaScript — support 2025-2026, diapo 38</p>

    [![JavaScript — support 2025-2026, diapo 39 : Modifier un texte](papier/ch5/p39.jpg){ loading=lazy .papier }](papier/ch5/p39.jpg)
    <p class="papier-legende">Modifier un texte · JavaScript — support 2025-2026, diapo 39</p>

    [![JavaScript — support 2025-2026, diapo 40 : Les fonctions anonymes et les fonctions fléchées](papier/ch5/p40.jpg){ loading=lazy .papier }](papier/ch5/p40.jpg)
    <p class="papier-legende">Les fonctions anonymes et les fonctions fléchées · JavaScript — support 2025-2026, diapo 40</p>

    [![JavaScript — support 2025-2026, diapo 41 : Les fonctions de rappel : callbacks](papier/ch5/p41.jpg){ loading=lazy .papier }](papier/ch5/p41.jpg)
    <p class="papier-legende">Les fonctions de rappel : callbacks · JavaScript — support 2025-2026, diapo 41</p>

    [![JavaScript — support 2025-2026, diapo 42 : Exemple : callback](papier/ch5/p42.jpg){ loading=lazy .papier }](papier/ch5/p42.jpg)
    <p class="papier-legende">Exemple : callback · JavaScript — support 2025-2026, diapo 42</p>

    [![JavaScript — support 2025-2026, diapo 43 : Exemple :](papier/ch5/p43.jpg){ loading=lazy .papier }](papier/ch5/p43.jpg)
    <p class="papier-legende">Exemple : · JavaScript — support 2025-2026, diapo 43</p>

    [![JavaScript — support 2025-2026, diapo 44 : Les objets Javascript](papier/ch5/p44.jpg){ loading=lazy .papier }](papier/ch5/p44.jpg)
    <p class="papier-legende">Les objets Javascript · JavaScript — support 2025-2026, diapo 44</p>

    [![JavaScript — support 2025-2026, diapo 45 : Les Objets](papier/ch5/p45.jpg){ loading=lazy .papier }](papier/ch5/p45.jpg)
    <p class="papier-legende">Les Objets · JavaScript — support 2025-2026, diapo 45</p>

    [![JavaScript — support 2025-2026, diapo 46 : Ajout d’une fonction sur un objet](papier/ch5/p46.jpg){ loading=lazy .papier }](papier/ch5/p46.jpg)
    <p class="papier-legende">Ajout d’une fonction sur un objet · JavaScript — support 2025-2026, diapo 46</p>

    [![JavaScript — support 2025-2026, diapo 47 : Classes ES6](papier/ch5/p47.jpg){ loading=lazy .papier }](papier/ch5/p47.jpg)
    <p class="papier-legende">Classes ES6 · JavaScript — support 2025-2026, diapo 47</p>

    [![JavaScript — support 2025-2026, diapo 48 : L’objet itérable : Array](papier/ch5/p48.jpg){ loading=lazy .papier }](papier/ch5/p48.jpg)
    <p class="papier-legende">L’objet itérable : Array · JavaScript — support 2025-2026, diapo 48</p>

    [![JavaScript — support 2025-2026, diapo 49 : Créons nos propres objets](papier/ch5/p49.jpg){ loading=lazy .papier }](papier/ch5/p49.jpg)
    <p class="papier-legende">Créons nos propres objets · JavaScript — support 2025-2026, diapo 49</p>

    [![JavaScript — support 2025-2026, diapo 50 : Créons nos propres objets](papier/ch5/p50.jpg){ loading=lazy .papier }](papier/ch5/p50.jpg)
    <p class="papier-legende">Créons nos propres objets · JavaScript — support 2025-2026, diapo 50</p>

    [![JavaScript — support 2025-2026, diapo 51 : Créons nos propres objets](papier/ch5/p51.jpg){ loading=lazy .papier }](papier/ch5/p51.jpg)
    <p class="papier-legende">Créons nos propres objets · JavaScript — support 2025-2026, diapo 51</p>

    [![JavaScript — support 2025-2026, diapo 52 : Créons nos propres objets](papier/ch5/p52.jpg){ loading=lazy .papier }](papier/ch5/p52.jpg)
    <p class="papier-legende">Créons nos propres objets · JavaScript — support 2025-2026, diapo 52</p>

    [![JavaScript — support 2025-2026, diapo 53 : Ajouter/supprimer des propriétés](papier/ch5/p53.jpg){ loading=lazy .papier }](papier/ch5/p53.jpg)
    <p class="papier-legende">Ajouter/supprimer des propriétés · JavaScript — support 2025-2026, diapo 53</p>

    [![JavaScript — support 2025-2026, diapo 54 : Un accesseur (getter) est une](papier/ch5/p54.jpg){ loading=lazy .papier }](papier/ch5/p54.jpg)
    <p class="papier-legende">Un accesseur (getter) est une · JavaScript — support 2025-2026, diapo 54</p>

    [![JavaScript — support 2025-2026, diapo 55 : Toujours des objets !!!](papier/ch5/p55.jpg){ loading=lazy .papier }](papier/ch5/p55.jpg)
    <p class="papier-legende">Toujours des objets !!! · JavaScript — support 2025-2026, diapo 55</p>

    [![JavaScript — support 2025-2026, diapo 56 : Manipulation des données JSON](papier/ch5/p56.jpg){ loading=lazy .papier }](papier/ch5/p56.jpg)
    <p class="papier-legende">Manipulation des données JSON · JavaScript — support 2025-2026, diapo 56</p>

    [![JavaScript — support 2025-2026, diapo 57 : Exemple de fichier JSON](papier/ch5/p57.jpg){ loading=lazy .papier }](papier/ch5/p57.jpg)
    <p class="papier-legende">Exemple de fichier JSON · JavaScript — support 2025-2026, diapo 57</p>

    [![JavaScript — support 2025-2026, diapo 58 : L’objet JSON](papier/ch5/p58.jpg){ loading=lazy .papier }](papier/ch5/p58.jpg)
    <p class="papier-legende">L’objet JSON · JavaScript — support 2025-2026, diapo 58</p>

    [![JavaScript — support 2025-2026, diapo 59](papier/ch5/p59.jpg){ loading=lazy .papier }](papier/ch5/p59.jpg)
    <p class="papier-legende">JavaScript — support 2025-2026, diapo 59</p>

    <!-- /papier -->
