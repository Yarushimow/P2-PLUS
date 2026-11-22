---
title: "Ch. 3 — CSS"
---

# Chapitre 3 — CSS : mettre en forme

=== "Version simplifiée"

    **CSS** (Cascading Style Sheets) décrit la **présentation**. Trois façons de
    l'ajouter : fichier externe `<link rel="stylesheet">` (**à privilégier**),
    balise `<style>` dans le `head`, attribut `style="…"` (à éviter).

    ```css
    sélecteur {
        propriété: valeur;
    }
    h1 { color: #2e7d32; font-size: 2rem; }
    ```

    ## Les sélecteurs

    | Sélecteur | Cible |
    |---|---|
    | `p` | toutes les balises `p` |
    | `.carte` | les éléments de classe `carte` |
    | `#menu` | l'élément d'id `menu` |
    | `[type="email"]` | les éléments avec cet attribut |
    | `nav a` | les `a` **descendants** de `nav` |
    | `ul > li` | les `li` **enfants directs** de `ul` |
    | `h2 + p` | le `p` **juste après** un `h2` ; `h2 ~ p` : tous les frères suivants |
    | `a:hover`, `li:first-child`, `p::first-line` | pseudo-classes et pseudo-éléments |

    ## Boîte, cascade, spécificité, héritage

    Chaque élément est une **boîte** : contenu → `padding` → `border` → `margin`.
    `box-sizing: border-box` inclut padding et bordure dans la largeur.

    !!! theoreme "Quelle règle gagne ?"
        1. `!important` (à éviter).
        2. La **spécificité** : style en ligne > `#id` > `.classe`, `[attribut]`, `:pseudo-classe` > balise.
        3. À spécificité égale, la règle écrite **en dernier** (la **cascade**).

        Certaines propriétés s'**héritent** du parent (`color`, `font-*`) ; d'autres
        non (`margin`, `border`, `background`).

    ## Responsive design

    !!! methode "Les étapes"
        1. **Viewport** dans le `head` : `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
        2. Des tailles **relatives** (`%`, `rem`, `vw`) et des limites (`max-width`).
        3. Des **media queries** pour changer la mise en page selon la largeur :

    ```css
    .conteneur { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between; }
    .carte { flex: 1 1 300px; }

    @media (max-width: 768px) {
        .conteneur { flex-direction: column; }
        nav ul { display: none; }
    }
    ```

    **Flexbox** : `display: flex` sur le parent, puis `flex-direction`,
    `justify-content` (axe principal), `align-items` (axe secondaire), `flex-wrap`, `gap`.

=== "Version papier"

    Les diapos du chapitre CSS telles que projetées en cours (M. Hamidi, 2025-2026).

    <!-- papier: pdf/TI402P/4-css-partie2.pdf | CSS — support 2025-2026 | ch3 | diapo -->

    [![CSS — support 2025-2026, diapo 1 : Programmation Web](papier/ch3/p01.jpg){ loading=lazy .papier }](papier/ch3/p01.jpg)
    <p class="papier-legende">Programmation Web · CSS — support 2025-2026, diapo 1</p>

    [![CSS — support 2025-2026, diapo 2 : Les sélecteurs](papier/ch3/p02.jpg){ loading=lazy .papier }](papier/ch3/p02.jpg)
    <p class="papier-legende">Les sélecteurs · CSS — support 2025-2026, diapo 2</p>

    [![CSS — support 2025-2026, diapo 3 : Cascading Style Sheet](papier/ch3/p03.jpg){ loading=lazy .papier }](papier/ch3/p03.jpg)
    <p class="papier-legende">Cascading Style Sheet · CSS — support 2025-2026, diapo 3</p>

    [![CSS — support 2025-2026, diapo 4 : Cascading Style Sheet](papier/ch3/p04.jpg){ loading=lazy .papier }](papier/ch3/p04.jpg)
    <p class="papier-legende">Cascading Style Sheet · CSS — support 2025-2026, diapo 4</p>

    [![CSS — support 2025-2026, diapo 5 : OU ajouter du style ?](papier/ch3/p05.jpg){ loading=lazy .papier }](papier/ch3/p05.jpg)
    <p class="papier-legende">OU ajouter du style ? · CSS — support 2025-2026, diapo 5</p>

    [![CSS — support 2025-2026, diapo 6 : CSS : exemple](papier/ch3/p06.jpg){ loading=lazy .papier }](papier/ch3/p06.jpg)
    <p class="papier-legende">CSS : exemple · CSS — support 2025-2026, diapo 6</p>

    [![CSS — support 2025-2026, diapo 7 : La syntaxe CSS](papier/ch3/p07.jpg){ loading=lazy .papier }](papier/ch3/p07.jpg)
    <p class="papier-legende">La syntaxe CSS · CSS — support 2025-2026, diapo 7</p>

    [![CSS — support 2025-2026, diapo 8 : La syntaxe CSS](papier/ch3/p08.jpg){ loading=lazy .papier }](papier/ch3/p08.jpg)
    <p class="papier-legende">La syntaxe CSS · CSS — support 2025-2026, diapo 8</p>

    [![CSS — support 2025-2026, diapo 9 : La syntaxe CSS](papier/ch3/p09.jpg){ loading=lazy .papier }](papier/ch3/p09.jpg)
    <p class="papier-legende">La syntaxe CSS · CSS — support 2025-2026, diapo 9</p>

    [![CSS — support 2025-2026, diapo 10 : Quelques propriétés CSS](papier/ch3/p10.jpg){ loading=lazy .papier }](papier/ch3/p10.jpg)
    <p class="papier-legende">Quelques propriétés CSS · CSS — support 2025-2026, diapo 10</p>

    [![CSS — support 2025-2026, diapo 11 : Marges, bordures, padding](papier/ch3/p11.jpg){ loading=lazy .papier }](papier/ch3/p11.jpg)
    <p class="papier-legende">Marges, bordures, padding · CSS — support 2025-2026, diapo 11</p>

    [![CSS — support 2025-2026, diapo 12 : CSS : les sélecteurs](papier/ch3/p12.jpg){ loading=lazy .papier }](papier/ch3/p12.jpg)
    <p class="papier-legende">CSS : les sélecteurs · CSS — support 2025-2026, diapo 12</p>

    [![CSS — support 2025-2026, diapo 13 : CSS : les sélecteurs](papier/ch3/p13.jpg){ loading=lazy .papier }](papier/ch3/p13.jpg)
    <p class="papier-legende">CSS : les sélecteurs · CSS — support 2025-2026, diapo 13</p>

    [![CSS — support 2025-2026, diapo 14 : Les sélecteurs](papier/ch3/p14.jpg){ loading=lazy .papier }](papier/ch3/p14.jpg)
    <p class="papier-legende">Les sélecteurs · CSS — support 2025-2026, diapo 14</p>

    [![CSS — support 2025-2026, diapo 15 : Sélecteurs avec Combinateur frère](papier/ch3/p15.jpg){ loading=lazy .papier }](papier/ch3/p15.jpg)
    <p class="papier-legende">Sélecteurs avec Combinateur frère · CSS — support 2025-2026, diapo 15</p>

    [![CSS — support 2025-2026, diapo 16 : Sélecteurs avec Combinateur frère](papier/ch3/p16.jpg){ loading=lazy .papier }](papier/ch3/p16.jpg)
    <p class="papier-legende">Sélecteurs avec Combinateur frère · CSS — support 2025-2026, diapo 16</p>

    [![CSS — support 2025-2026, diapo 17 : Sélecteurs avec Combinateur enfant](papier/ch3/p17.jpg){ loading=lazy .papier }](papier/ch3/p17.jpg)
    <p class="papier-legende">Sélecteurs avec Combinateur enfant · CSS — support 2025-2026, diapo 17</p>

    [![CSS — support 2025-2026, diapo 18 : Sélecteur descendant](papier/ch3/p18.jpg){ loading=lazy .papier }](papier/ch3/p18.jpg)
    <p class="papier-legende">Sélecteur descendant · CSS — support 2025-2026, diapo 18</p>

    [![CSS — support 2025-2026, diapo 19 : CSS : Cascade, spécificité et héritage](papier/ch3/p19.jpg){ loading=lazy .papier }](papier/ch3/p19.jpg)
    <p class="papier-legende">CSS : Cascade, spécificité et héritage · CSS — support 2025-2026, diapo 19</p>

    [![CSS — support 2025-2026, diapo 20 : La cascade](papier/ch3/p20.jpg){ loading=lazy .papier }](papier/ch3/p20.jpg)
    <p class="papier-legende">La cascade · CSS — support 2025-2026, diapo 20</p>

    [![CSS — support 2025-2026, diapo 21 : La spécificité mesure combien la sélection est précise :](papier/ch3/p21.jpg){ loading=lazy .papier }](papier/ch3/p21.jpg)
    <p class="papier-legende">La spécificité mesure combien la sélection est précise : · CSS — support 2025-2026, diapo 21</p>

    [![CSS — support 2025-2026, diapo 22 : Certaines valeurs pour une propriété CSS se transmettent des éléments](papier/ch3/p22.jpg){ loading=lazy .papier }](papier/ch3/p22.jpg)
    <p class="papier-legende">Certaines valeurs pour une propriété CSS se transmettent des éléments · CSS — support 2025-2026, diapo 22</p>

    [![CSS — support 2025-2026, diapo 23 : Vue adaptative : la responsivité](papier/ch3/p23.jpg){ loading=lazy .papier }](papier/ch3/p23.jpg)
    <p class="papier-legende">Vue adaptative : la responsivité · CSS — support 2025-2026, diapo 23</p>

    [![CSS — support 2025-2026, diapo 24 : La responsivité : les étapes clés](papier/ch3/p24.jpg){ loading=lazy .papier }](papier/ch3/p24.jpg)
    <p class="papier-legende">La responsivité : les étapes clés · CSS — support 2025-2026, diapo 24</p>

    [![CSS — support 2025-2026, diapo 25 : Etape 1 : le Viewport](papier/ch3/p25.jpg){ loading=lazy .papier }](papier/ch3/p25.jpg)
    <p class="papier-legende">Etape 1 : le Viewport · CSS — support 2025-2026, diapo 25</p>

    [![CSS — support 2025-2026, diapo 26 : Etape 2 : définir les dimensions et fixer les limites](papier/ch3/p26.jpg){ loading=lazy .papier }](papier/ch3/p26.jpg)
    <p class="papier-legende">Etape 2 : définir les dimensions et fixer les limites · CSS — support 2025-2026, diapo 26</p>

    [![CSS — support 2025-2026, diapo 27 : Les média-queries](papier/ch3/p27.jpg){ loading=lazy .papier }](papier/ch3/p27.jpg)
    <p class="papier-legende">Les média-queries · CSS — support 2025-2026, diapo 27</p>

    [![CSS — support 2025-2026, diapo 28 : Les flexbox](papier/ch3/p28.jpg){ loading=lazy .papier }](papier/ch3/p28.jpg)
    <p class="papier-legende">Les flexbox · CSS — support 2025-2026, diapo 28</p>

    [![CSS — support 2025-2026, diapo 29 : Les flexbox](papier/ch3/p29.jpg){ loading=lazy .papier }](papier/ch3/p29.jpg)
    <p class="papier-legende">Les flexbox · CSS — support 2025-2026, diapo 29</p>

    [![CSS — support 2025-2026, diapo 30 : Les flexbox](papier/ch3/p30.jpg){ loading=lazy .papier }](papier/ch3/p30.jpg)
    <p class="papier-legende">Les flexbox · CSS — support 2025-2026, diapo 30</p>

    [![CSS — support 2025-2026, diapo 31 : Lectures obligatoires](papier/ch3/p31.jpg){ loading=lazy .papier }](papier/ch3/p31.jpg)
    <p class="papier-legende">Lectures obligatoires · CSS — support 2025-2026, diapo 31</p>

    [![CSS — support 2025-2026, diapo 32 : Codepen : Exemple complet du cours](papier/ch3/p32.jpg){ loading=lazy .papier }](papier/ch3/p32.jpg)
    <p class="papier-legende">Codepen : Exemple complet du cours · CSS — support 2025-2026, diapo 32</p>

    [![CSS — support 2025-2026, diapo 33 : Atelier – Partie 2](papier/ch3/p33.jpg){ loading=lazy .papier }](papier/ch3/p33.jpg)
    <p class="papier-legende">Atelier – Partie 2 · CSS — support 2025-2026, diapo 33</p>

    [![CSS — support 2025-2026, diapo 34 : Dark Vador a aussi joué le jeu !](papier/ch3/p34.jpg){ loading=lazy .papier }](papier/ch3/p34.jpg)
    <p class="papier-legende">Dark Vador a aussi joué le jeu ! · CSS — support 2025-2026, diapo 34</p>

    <!-- /papier -->
