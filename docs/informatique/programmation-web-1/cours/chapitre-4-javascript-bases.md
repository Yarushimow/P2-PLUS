---
title: "Ch. 4 — JavaScript : bases et DOM"
---

# Chapitre 4 — JavaScript : les bases, les événements et le DOM

=== "Version simplifiée"

    **JavaScript** rend la page **interactive** ; il s'exécute dans le navigateur.
    On le place dans un fichier externe, inclus en fin de `body` (ou avec `defer`
    dans le `head`) pour que le HTML soit chargé avant.

    ## Syntaxe de base

    ```js
    let age = 20;            // variable (portée de bloc)
    const PI = 3.14;         // constante
    // var : ancienne déclaration (portée de fonction), à éviter

    console.log("Bonjour " + nom);          // affichage dans la console (F12)
    console.log(`Bonjour ${nom}`);          // gabarit de chaîne
    alert("Bienvenue !");                    // pop-up

    if (age >= 18) { … } else { … }
    for (let i = 0; i < 5; i++) { … }
    for (const fruit of fruits) { … }        // parcourir un tableau
    while (condition) { … }

    const fruits = ["pomme", "kiwi"];
    fruits.push("mangue"); fruits.length;
    ```

    !!! piege "`==` contre `===`"
        `==` convertit les types (`"5" == 5` est vrai) ; `===` compare aussi le type
        (`"5" === 5` est faux). Utiliser **`===` et `!==`**.

    ## Fonctions

    ```js
    function carre(x) { return x * x; }            // déclaration
    const cube = function (x) { return x ** 3; };  // fonction anonyme
    const double = (x) => 2 * x;                   // fonction fléchée
    ```

    ## Le DOM

    Le **DOM** (Document Object Model) représente la page comme un **arbre**
    d'objets que JavaScript peut lire et modifier.

    ```js
    const titre = document.getElementById("titre");
    const btn = document.querySelector("#valider");       // premier élément correspondant
    const items = document.querySelectorAll(".item");     // tous

    titre.textContent = "Nouveau titre";
    titre.innerHTML = "<em>Titre</em>";
    titre.style.color = "green";
    titre.classList.add("actif");
    const valeur = document.getElementById("nom").value;  // contenu d'un champ

    const li = document.createElement("li");
    li.textContent = "Nouvel élément";
    document.querySelector("ul").appendChild(li);
    ```

    ## Les événements

    ```js
    btn.addEventListener("click", () => {
        alert("Cliqué !");
    });
    document.getElementById("formulaire").addEventListener("submit", (e) => {
        e.preventDefault();          // empêche le rechargement de la page
        // vérifier les réponses du quiz…
    });
    ```

    Événements courants : `click`, `dblclick`, `mouseover`, `mouseout`, `keydown`,
    `input`, `change`, `submit`, `load` / `DOMContentLoaded`.

=== "Version papier"

    La première partie des diapos JavaScript (bases, fonctions, événements, DOM) telles que projetées en cours.

    <!-- papier: pdf/TI402P/5-javascript.pdf | JavaScript — support 2025-2026 | ch4 | diapo | 1-24 -->

    [![JavaScript — support 2025-2026, diapo 1 : Programmation Web](papier/ch4/p01.jpg){ loading=lazy .papier }](papier/ch4/p01.jpg)
    <p class="papier-legende">Programmation Web · JavaScript — support 2025-2026, diapo 1</p>

    [![JavaScript — support 2025-2026, diapo 2 : Javascript : les bases](papier/ch4/p02.jpg){ loading=lazy .papier }](papier/ch4/p02.jpg)
    <p class="papier-legende">Javascript : les bases · JavaScript — support 2025-2026, diapo 2</p>

    [![JavaScript — support 2025-2026, diapo 3 : Javascript : les bases](papier/ch4/p03.jpg){ loading=lazy .papier }](papier/ch4/p03.jpg)
    <p class="papier-legende">Javascript : les bases · JavaScript — support 2025-2026, diapo 3</p>

    [![JavaScript — support 2025-2026, diapo 4 : Javascript : qu’est ce que c’est ?](papier/ch4/p04.jpg){ loading=lazy .papier }](papier/ch4/p04.jpg)
    <p class="papier-legende">Javascript : qu’est ce que c’est ? · JavaScript — support 2025-2026, diapo 4</p>

    [![JavaScript — support 2025-2026, diapo 5 : Avantages :](papier/ch4/p05.jpg){ loading=lazy .papier }](papier/ch4/p05.jpg)
    <p class="papier-legende">Avantages : · JavaScript — support 2025-2026, diapo 5</p>

    [![JavaScript — support 2025-2026, diapo 6 : Exécution de Javascript](papier/ch4/p06.jpg){ loading=lazy .papier }](papier/ch4/p06.jpg)
    <p class="papier-legende">Exécution de Javascript · JavaScript — support 2025-2026, diapo 6</p>

    [![JavaScript — support 2025-2026, diapo 7 : Où se trouve le Javascript ?](papier/ch4/p07.jpg){ loading=lazy .papier }](papier/ch4/p07.jpg)
    <p class="papier-legende">Où se trouve le Javascript ? · JavaScript — support 2025-2026, diapo 7</p>

    [![JavaScript — support 2025-2026, diapo 8 : Javascript : la syntaxe](papier/ch4/p08.jpg){ loading=lazy .papier }](papier/ch4/p08.jpg)
    <p class="papier-legende">Javascript : la syntaxe · JavaScript — support 2025-2026, diapo 8</p>

    [![JavaScript — support 2025-2026, diapo 9 : Javascript : Déclaration](papier/ch4/p09.jpg){ loading=lazy .papier }](papier/ch4/p09.jpg)
    <p class="papier-legende">Javascript : Déclaration · JavaScript — support 2025-2026, diapo 9</p>

    [![JavaScript — support 2025-2026, diapo 10 : let vs var](papier/ch4/p10.jpg){ loading=lazy .papier }](papier/ch4/p10.jpg)
    <p class="papier-legende">let vs var · JavaScript — support 2025-2026, diapo 10</p>

    [![JavaScript — support 2025-2026, diapo 11 : Opérateurs, concaténation et affichage](papier/ch4/p11.jpg){ loading=lazy .papier }](papier/ch4/p11.jpg)
    <p class="papier-legende">Opérateurs, concaténation et affichage · JavaScript — support 2025-2026, diapo 11</p>

    [![JavaScript — support 2025-2026, diapo 12 : Structures de contrôle et boucles](papier/ch4/p12.jpg){ loading=lazy .papier }](papier/ch4/p12.jpg)
    <p class="papier-legende">Structures de contrôle et boucles · JavaScript — support 2025-2026, diapo 12</p>

    [![JavaScript — support 2025-2026, diapo 13 : Opérateurs === et !==](papier/ch4/p13.jpg){ loading=lazy .papier }](papier/ch4/p13.jpg)
    <p class="papier-legende">Opérateurs === et !== · JavaScript — support 2025-2026, diapo 13</p>

    [![JavaScript — support 2025-2026, diapo 14 : Les tableaux sont les objets pour déﬁnir des listes](papier/ch4/p14.jpg){ loading=lazy .papier }](papier/ch4/p14.jpg)
    <p class="papier-legende">Les tableaux sont les objets pour déﬁnir des listes · JavaScript — support 2025-2026, diapo 14</p>

    [![JavaScript — support 2025-2026, diapo 15 : Les fonctions](papier/ch4/p15.jpg){ loading=lazy .papier }](papier/ch4/p15.jpg)
    <p class="papier-legende">Les fonctions · JavaScript — support 2025-2026, diapo 15</p>

    [![JavaScript — support 2025-2026, diapo 16 : Les événements](papier/ch4/p16.jpg){ loading=lazy .papier }](papier/ch4/p16.jpg)
    <p class="papier-legende">Les événements · JavaScript — support 2025-2026, diapo 16</p>

    [![JavaScript — support 2025-2026, diapo 17 : Les événements détectables](papier/ch4/p17.jpg){ loading=lazy .papier }](papier/ch4/p17.jpg)
    <p class="papier-legende">Les événements détectables · JavaScript — support 2025-2026, diapo 17</p>

    [![JavaScript — support 2025-2026, diapo 18 : Les fonctions associées à](papier/ch4/p18.jpg){ loading=lazy .papier }](papier/ch4/p18.jpg)
    <p class="papier-legende">Les fonctions associées à · JavaScript — support 2025-2026, diapo 18</p>

    [![JavaScript — support 2025-2026, diapo 19 : Document Object Model](papier/ch4/p19.jpg){ loading=lazy .papier }](papier/ch4/p19.jpg)
    <p class="papier-legende">Document Object Model · JavaScript — support 2025-2026, diapo 19</p>

    [![JavaScript — support 2025-2026, diapo 20 : DOM vu comme un arbre](papier/ch4/p20.jpg){ loading=lazy .papier }](papier/ch4/p20.jpg)
    <p class="papier-legende">DOM vu comme un arbre · JavaScript — support 2025-2026, diapo 20</p>

    [![JavaScript — support 2025-2026, diapo 21 : DOM : accès à un élément](papier/ch4/p21.jpg){ loading=lazy .papier }](papier/ch4/p21.jpg)
    <p class="papier-legende">DOM : accès à un élément · JavaScript — support 2025-2026, diapo 21</p>

    [![JavaScript — support 2025-2026, diapo 22 : Livecoding : Un message à Dark Vador](papier/ch4/p22.jpg){ loading=lazy .papier }](papier/ch4/p22.jpg)
    <p class="papier-legende">Livecoding : Un message à Dark Vador · JavaScript — support 2025-2026, diapo 22</p>

    [![JavaScript — support 2025-2026, diapo 23 : Exemple complet : CV de Dark Vador](papier/ch4/p23.jpg){ loading=lazy .papier }](papier/ch4/p23.jpg)
    <p class="papier-legende">Exemple complet : CV de Dark Vador · JavaScript — support 2025-2026, diapo 23</p>

    [![JavaScript — support 2025-2026, diapo 24 : Javascript : les bases](papier/ch4/p24.jpg){ loading=lazy .papier }](papier/ch4/p24.jpg)
    <p class="papier-legende">Javascript : les bases · JavaScript — support 2025-2026, diapo 24</p>

    <!-- /papier -->
