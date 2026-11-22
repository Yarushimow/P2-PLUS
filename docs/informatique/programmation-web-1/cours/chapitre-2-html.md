---
title: "Ch. 2 — HTML"
---

# Chapitre 2 — HTML : structurer une page

=== "Version simplifiée"

    **HTML** (HyperText Markup Language) décrit la **structure et le sens** du
    contenu avec des **balises**. La mise en forme est le rôle du CSS. Standard du **W3C**, version actuelle **HTML5**.

    ## Squelette d'une page

    ```html
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Green IT</title>
        <link rel="stylesheet" href="../css/styles.css">
    </head>
    <body>
        <header><nav>…</nav></header>
        <main>
            <section><h1>Titre</h1><p>Paragraphe</p></section>
        </main>
        <footer>…</footer>
        <script src="../js/script.js"></script>
    </body>
    </html>
    ```

    Une balise **s'ouvre et se ferme** (`<p>…</p>`) ou est **orpheline** (`<img>`,
    `<br>`, `<input>`). Les **attributs** précisent la balise : `<a href="…">`,
    `<img src="…" alt="…">`. `id` est unique dans la page, `class` est réutilisable.

    ## Balises essentielles

    | Rôle | Balises |
    |---|---|
    | Titres, texte | `h1`…`h6`, `p`, `strong`, `em`, `br`, `span` |
    | Liens, images | `<a href="page.html">`, `<img src="…" alt="description">` |
    | Listes | `ul` / `ol` + `li` ; `dl`, `dt`, `dd` |
    | Tableaux | `table`, `caption`, `thead`, `tbody`, `tr`, `th`, `td` (+ `colspan`, `rowspan`) |
    | Sémantique HTML5 | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` |
    | Multimédia | `audio`, `video` (+ `controls`), `iframe` |
    | Bloc générique | `div` (bloc), `span` (en ligne) |

    ## Formulaires

    ```html
    <form action="#" method="post">
      <fieldset>
        <legend>Quiz</legend>
        <label for="nom">Nom</label>
        <input type="text" id="nom" name="nom" required>
        <input type="email" name="mail">
        <input type="radio" name="q1" value="a" id="q1a"><label for="q1a">Réponse A</label>
        <input type="checkbox" name="opt">
        <select name="choix"><option value="1">Un</option></select>
        <textarea name="avis"></textarea>
        <button type="submit">Envoyer</button>
      </fieldset>
    </form>
    ```

    !!! methode "Bonnes pratiques"
        - Arborescence propre : dossiers `html/`, `css/`, `js/`, `images/`, chemins **relatifs**.
        - Une seule balise `h1` par page, des titres dans l'ordre.
        - Toujours un `alt` sur les images (accessibilité).
        - Utiliser les balises **sémantiques** plutôt que des `div` partout.
        - Valider ses pages avec le **validateur du W3C** (exigé pour le projet).

=== "Version papier"

    Les diapos du chapitre HTML telles que projetées en cours (M. Hamidi, 2025-2026).

    <!-- papier: pdf/TI402P/3-html.pdf | HTML — support 2025-2026 | ch2 | diapo -->

    [![HTML — support 2025-2026, diapo 1 : Programmation Web](papier/ch2/p01.jpg){ loading=lazy .papier }](papier/ch2/p01.jpg)
    <p class="papier-legende">Programmation Web · HTML — support 2025-2026, diapo 1</p>

    [![HTML — support 2025-2026, diapo 2 : HTML :](papier/ch2/p02.jpg){ loading=lazy .papier }](papier/ch2/p02.jpg)
    <p class="papier-legende">HTML : · HTML — support 2025-2026, diapo 2</p>

    [![HTML — support 2025-2026, diapo 3 : Langages pour les pages web](papier/ch2/p03.jpg){ loading=lazy .papier }](papier/ch2/p03.jpg)
    <p class="papier-legende">Langages pour les pages web · HTML — support 2025-2026, diapo 3</p>

    [![HTML — support 2025-2026, diapo 4 : Le W3C ! (World Wide Web Consortium)](papier/ch2/p04.jpg){ loading=lazy .papier }](papier/ch2/p04.jpg)
    <p class="papier-legende">Le W3C ! (World Wide Web Consortium) · HTML — support 2025-2026, diapo 4</p>

    [![HTML — support 2025-2026, diapo 5 : HTML : ses versions](papier/ch2/p05.jpg){ loading=lazy .papier }](papier/ch2/p05.jpg)
    <p class="papier-legende">HTML : ses versions · HTML — support 2025-2026, diapo 5</p>

    [![HTML — support 2025-2026, diapo 6 : HTML : les bases](papier/ch2/p06.jpg){ loading=lazy .papier }](papier/ch2/p06.jpg)
    <p class="papier-legende">HTML : les bases · HTML — support 2025-2026, diapo 6</p>

    [![HTML — support 2025-2026, diapo 7 : Règles de bonne organisation du projet de site web](papier/ch2/p07.jpg){ loading=lazy .papier }](papier/ch2/p07.jpg)
    <p class="papier-legende">Règles de bonne organisation du projet de site web · HTML — support 2025-2026, diapo 7</p>

    [![HTML — support 2025-2026, diapo 8 : Conseils de structuration](papier/ch2/p08.jpg){ loading=lazy .papier }](papier/ch2/p08.jpg)
    <p class="papier-legende">Conseils de structuration · HTML — support 2025-2026, diapo 8</p>

    [![HTML — support 2025-2026, diapo 9 : Généralité sur les fichiers HTML](papier/ch2/p09.jpg){ loading=lazy .papier }](papier/ch2/p09.jpg)
    <p class="papier-legende">Généralité sur les fichiers HTML · HTML — support 2025-2026, diapo 9</p>

    [![HTML — support 2025-2026, diapo 10 : HTML : le Doctype](papier/ch2/p10.jpg){ loading=lazy .papier }](papier/ch2/p10.jpg)
    <p class="papier-legende">HTML : le Doctype · HTML — support 2025-2026, diapo 10</p>

    [![HTML — support 2025-2026, diapo 11 : HTML : Pas à pas !!!](papier/ch2/p11.jpg){ loading=lazy .papier }](papier/ch2/p11.jpg)
    <p class="papier-legende">HTML : Pas à pas !!! · HTML — support 2025-2026, diapo 11</p>

    [![HTML — support 2025-2026, diapo 12 : HTML : les bases](papier/ch2/p12.jpg){ loading=lazy .papier }](papier/ch2/p12.jpg)
    <p class="papier-legende">HTML : les bases · HTML — support 2025-2026, diapo 12</p>

    [![HTML — support 2025-2026, diapo 13 : Exemples de balises](papier/ch2/p13.jpg){ loading=lazy .papier }](papier/ch2/p13.jpg)
    <p class="papier-legende">Exemples de balises · HTML — support 2025-2026, diapo 13</p>

    [![HTML — support 2025-2026, diapo 14 : Attributs d’une balise](papier/ch2/p14.jpg){ loading=lazy .papier }](papier/ch2/p14.jpg)
    <p class="papier-legende">Attributs d’une balise · HTML — support 2025-2026, diapo 14</p>

    [![HTML — support 2025-2026, diapo 15 : HTML : Les attributs](papier/ch2/p15.jpg){ loading=lazy .papier }](papier/ch2/p15.jpg)
    <p class="papier-legende">HTML : Les attributs · HTML — support 2025-2026, diapo 15</p>

    [![HTML — support 2025-2026, diapo 16 : Exemple : les images](papier/ch2/p16.jpg){ loading=lazy .papier }](papier/ch2/p16.jpg)
    <p class="papier-legende">Exemple : les images · HTML — support 2025-2026, diapo 16</p>

    [![HTML — support 2025-2026, diapo 17 : Les listes et les liens](papier/ch2/p17.jpg){ loading=lazy .papier }](papier/ch2/p17.jpg)
    <p class="papier-legende">Les listes et les liens · HTML — support 2025-2026, diapo 17</p>

    [![HTML — support 2025-2026, diapo 18 : Les tableaux](papier/ch2/p18.jpg){ loading=lazy .papier }](papier/ch2/p18.jpg)
    <p class="papier-legende">Les tableaux · HTML — support 2025-2026, diapo 18</p>

    [![HTML — support 2025-2026, diapo 19 : Les balises header et footer](papier/ch2/p19.jpg){ loading=lazy .papier }](papier/ch2/p19.jpg)
    <p class="papier-legende">Les balises header et footer · HTML — support 2025-2026, diapo 19</p>

    [![HTML — support 2025-2026, diapo 20 : Les balises « article » , « section » et « nav »](papier/ch2/p20.jpg){ loading=lazy .papier }](papier/ch2/p20.jpg)
    <p class="papier-legende">Les balises « article » , « section » et « nav » · HTML — support 2025-2026, diapo 20</p>

    [![HTML — support 2025-2026, diapo 21 : Les balises multimédia](papier/ch2/p21.jpg){ loading=lazy .papier }](papier/ch2/p21.jpg)
    <p class="papier-legende">Les balises multimédia · HTML — support 2025-2026, diapo 21</p>

    [![HTML — support 2025-2026, diapo 22 : La balise &lt;div&gt;](papier/ch2/p22.jpg){ loading=lazy .papier }](papier/ch2/p22.jpg)
    <p class="papier-legende">La balise &lt;div&gt; · HTML — support 2025-2026, diapo 22</p>

    [![HTML — support 2025-2026, diapo 23 : Les formulaires](papier/ch2/p23.jpg){ loading=lazy .papier }](papier/ch2/p23.jpg)
    <p class="papier-legende">Les formulaires · HTML — support 2025-2026, diapo 23</p>

    [![HTML — support 2025-2026, diapo 24 : Les formulaires : exemple](papier/ch2/p24.jpg){ loading=lazy .papier }](papier/ch2/p24.jpg)
    <p class="papier-legende">Les formulaires : exemple · HTML — support 2025-2026, diapo 24</p>

    [![HTML — support 2025-2026, diapo 25 : Regroupement des éléments : fieldset](papier/ch2/p25.jpg){ loading=lazy .papier }](papier/ch2/p25.jpg)
    <p class="papier-legende">Regroupement des éléments : fieldset · HTML — support 2025-2026, diapo 25</p>

    [![HTML — support 2025-2026, diapo 26 : HTML5 : encore plus d ’éléments …](papier/ch2/p26.jpg){ loading=lazy .papier }](papier/ch2/p26.jpg)
    <p class="papier-legende">HTML5 : encore plus d ’éléments … · HTML — support 2025-2026, diapo 26</p>

    [![HTML — support 2025-2026, diapo 27 : Lectures obligatoires pour le TP1 !!!](papier/ch2/p27.jpg){ loading=lazy .papier }](papier/ch2/p27.jpg)
    <p class="papier-legende">Lectures obligatoires pour le TP1 !!! · HTML — support 2025-2026, diapo 27</p>

    [![HTML — support 2025-2026, diapo 28 : Atelier – Partie 1](papier/ch2/p28.jpg){ loading=lazy .papier }](papier/ch2/p28.jpg)
    <p class="papier-legende">Atelier – Partie 1 · HTML — support 2025-2026, diapo 28</p>

    <!-- /papier -->
