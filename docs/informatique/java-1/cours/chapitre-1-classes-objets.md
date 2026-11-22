---
title: "Ch. 1 — Classes et objets"
---

# Chapitre 1 — Classes, objets et constructeurs

=== "Version simplifiée"

    !!! definition "Classe et instance"
        Une **classe** est un modèle (un type) qui décrit des **attributs** (l'état)
        et des **méthodes** (le comportement). Un **objet** (instance) est un
        exemplaire concret créé avec `new`. La variable ne contient pas l'objet
        mais une **référence** vers lui.

    ```java
    public class Point {
        double x;                       // attributs
        double y;

        Point() { }                     // constructeur par défaut
        Point(double x, double y) {     // constructeur d'initialisation
            this.x = x;
            this.y = y;
        }
        Point(Point p) {                // constructeur de copie
            this(p.x, p.y);             // appelle l'autre constructeur
        }

        double distance(Point p) {      // méthode
            return Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
        }
    }

    Point a = new Point(1.2, 2.3);
    Point b = new Point(a);
    a.x = 5;                            // accès à un attribut
    ```

    ## Valeurs par défaut et constructeurs

    - Attributs non initialisés : `0` (nombres), `false`, `null` (objets, `String`).
    - Si on n'écrit **aucun** constructeur, Java fournit un constructeur par défaut vide.
    - Dès qu'on écrit un constructeur, ce constructeur par défaut **disparaît** :
      `new Point()` ne compile plus si on ne l'a pas réécrit.
    - On peut avoir plusieurs constructeurs (**surcharge**) tant que leurs paramètres diffèrent.

    !!! definition "Le mot-clé `this`"
        - `this.x` désigne l'attribut quand un paramètre porte le même nom.
        - `this(…)` appelle un autre constructeur de la même classe ; c'est
          obligatoirement la **première instruction**.

    !!! piege "`x = x;`"
        Dans `Point(double x, double y) { x = x; }`, le paramètre se recopie
        dans lui-même : l'attribut reste à 0. Il faut `this.x = x;`.

    !!! piege "Copier une référence n'est pas copier l'objet"
        `Point c = a;` fait pointer `c` sur **le même objet** que `a` : modifier
        `c.x` modifie `a.x`. Pour une vraie copie : `new Point(a)`.

    Une classe par fichier `NomDeLaClasse.java` (nom en **PascalCase**, attributs et
    méthodes en **camelCase**).

=== "Version papier"

    Les diapos du CM1 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/TI403P/cm1.pdf | CM1 — support 2025-2026 | cm1 | diapo -->

    [![CM1 — support 2025-2026, diapo 1 : Java1: Fondamentaux de la POO](papier/cm1/p01.jpg){ loading=lazy .papier }](papier/cm1/p01.jpg)
    <p class="papier-legende">Java1: Fondamentaux de la POO · CM1 — support 2025-2026, diapo 1</p>

    [![CM1 — support 2025-2026, diapo 2 : La Programmation](papier/cm1/p02.jpg){ loading=lazy .papier }](papier/cm1/p02.jpg)
    <p class="papier-legende">La Programmation · CM1 — support 2025-2026, diapo 2</p>

    [![CM1 — support 2025-2026, diapo 3 : Programmation Orientée Objet](papier/cm1/p03.jpg){ loading=lazy .papier }](papier/cm1/p03.jpg)
    <p class="papier-legende">Programmation Orientée Objet · CM1 — support 2025-2026, diapo 3</p>

    [![CM1 — support 2025-2026, diapo 4 : Programmation Orientée Objet](papier/cm1/p04.jpg){ loading=lazy .papier }](papier/cm1/p04.jpg)
    <p class="papier-legende">Programmation Orientée Objet · CM1 — support 2025-2026, diapo 4</p>

    [![CM1 — support 2025-2026, diapo 5 : Programmation Orientée Objet](papier/cm1/p05.jpg){ loading=lazy .papier }](papier/cm1/p05.jpg)
    <p class="papier-legende">Programmation Orientée Objet · CM1 — support 2025-2026, diapo 5</p>

    [![CM1 — support 2025-2026, diapo 6 : Programmation Orientée Objet](papier/cm1/p06.jpg){ loading=lazy .papier }](papier/cm1/p06.jpg)
    <p class="papier-legende">Programmation Orientée Objet · CM1 — support 2025-2026, diapo 6</p>

    [![CM1 — support 2025-2026, diapo 7 : Programmation Orientée Objet](papier/cm1/p07.jpg){ loading=lazy .papier }](papier/cm1/p07.jpg)
    <p class="papier-legende">Programmation Orientée Objet · CM1 — support 2025-2026, diapo 7</p>

    [![CM1 — support 2025-2026, diapo 8 : Programmation Orientée Objet](papier/cm1/p08.jpg){ loading=lazy .papier }](papier/cm1/p08.jpg)
    <p class="papier-legende">Programmation Orientée Objet · CM1 — support 2025-2026, diapo 8</p>

    [![CM1 — support 2025-2026, diapo 9 : Classe et instance, type et variable](papier/cm1/p09.jpg){ loading=lazy .papier }](papier/cm1/p09.jpg)
    <p class="papier-legende">Classe et instance, type et variable · CM1 — support 2025-2026, diapo 9</p>

    [![CM1 — support 2025-2026, diapo 10 : La POO en Java](papier/cm1/p10.jpg){ loading=lazy .papier }](papier/cm1/p10.jpg)
    <p class="papier-legende">La POO en Java · CM1 — support 2025-2026, diapo 10</p>

    [![CM1 — support 2025-2026, diapo 11 : La classe](papier/cm1/p11.jpg){ loading=lazy .papier }](papier/cm1/p11.jpg)
    <p class="papier-legende">La classe · CM1 — support 2025-2026, diapo 11</p>

    [![CM1 — support 2025-2026, diapo 12 : Où déclarer les classes ?](papier/cm1/p12.jpg){ loading=lazy .papier }](papier/cm1/p12.jpg)
    <p class="papier-legende">Où déclarer les classes ? · CM1 — support 2025-2026, diapo 12</p>

    [![CM1 — support 2025-2026, diapo 13 : Structure générale d’un programme Java](papier/cm1/p13.jpg){ loading=lazy .papier }](papier/cm1/p13.jpg)
    <p class="papier-legende">Structure générale d’un programme Java · CM1 — support 2025-2026, diapo 13</p>

    [![CM1 — support 2025-2026, diapo 14 : Les éléments d’une classe](papier/cm1/p14.jpg){ loading=lazy .papier }](papier/cm1/p14.jpg)
    <p class="papier-legende">Les éléments d’une classe · CM1 — support 2025-2026, diapo 14</p>

    [![CM1 — support 2025-2026, diapo 15 : Les attributs](papier/cm1/p15.jpg){ loading=lazy .papier }](papier/cm1/p15.jpg)
    <p class="papier-legende">Les attributs · CM1 — support 2025-2026, diapo 15</p>

    [![CM1 — support 2025-2026, diapo 16 : Le constructeur](papier/cm1/p16.jpg){ loading=lazy .papier }](papier/cm1/p16.jpg)
    <p class="papier-legende">Le constructeur · CM1 — support 2025-2026, diapo 16</p>

    [![CM1 — support 2025-2026, diapo 17 : Instanciation d’un objet](papier/cm1/p17.jpg){ loading=lazy .papier }](papier/cm1/p17.jpg)
    <p class="papier-legende">Instanciation d’un objet · CM1 — support 2025-2026, diapo 17</p>

    [![CM1 — support 2025-2026, diapo 18 : Instanciation d’un objet](papier/cm1/p18.jpg){ loading=lazy .papier }](papier/cm1/p18.jpg)
    <p class="papier-legende">Instanciation d’un objet · CM1 — support 2025-2026, diapo 18</p>

    [![CM1 — support 2025-2026, diapo 19 : Accès à un attribut](papier/cm1/p19.jpg){ loading=lazy .papier }](papier/cm1/p19.jpg)
    <p class="papier-legende">Accès à un attribut · CM1 — support 2025-2026, diapo 19</p>

    [![CM1 — support 2025-2026, diapo 20 : Accès à un attribut](papier/cm1/p20.jpg){ loading=lazy .papier }](papier/cm1/p20.jpg)
    <p class="papier-legende">Accès à un attribut · CM1 — support 2025-2026, diapo 20</p>

    [![CM1 — support 2025-2026, diapo 21 : Accès à un attribut](papier/cm1/p21.jpg){ loading=lazy .papier }](papier/cm1/p21.jpg)
    <p class="papier-legende">Accès à un attribut · CM1 — support 2025-2026, diapo 21</p>

    [![CM1 — support 2025-2026, diapo 22 : Les valeurs par défaut des attributs](papier/cm1/p22.jpg){ loading=lazy .papier }](papier/cm1/p22.jpg)
    <p class="papier-legende">Les valeurs par défaut des attributs · CM1 — support 2025-2026, diapo 22</p>

    [![CM1 — support 2025-2026, diapo 23 : Les valeurs par défaut des attributs](papier/cm1/p23.jpg){ loading=lazy .papier }](papier/cm1/p23.jpg)
    <p class="papier-legende">Les valeurs par défaut des attributs · CM1 — support 2025-2026, diapo 23</p>

    [![CM1 — support 2025-2026, diapo 24](papier/cm1/p24.jpg){ loading=lazy .papier }](papier/cm1/p24.jpg)
    <p class="papier-legende">CM1 — support 2025-2026, diapo 24</p>

    [![CM1 — support 2025-2026, diapo 25 : Le constructeur par défaut](papier/cm1/p25.jpg){ loading=lazy .papier }](papier/cm1/p25.jpg)
    <p class="papier-legende">Le constructeur par défaut · CM1 — support 2025-2026, diapo 25</p>

    [![CM1 — support 2025-2026, diapo 26 : Le constructeur par défaut](papier/cm1/p26.jpg){ loading=lazy .papier }](papier/cm1/p26.jpg)
    <p class="papier-legende">Le constructeur par défaut · CM1 — support 2025-2026, diapo 26</p>

    [![CM1 — support 2025-2026, diapo 27 : Le constructeur d’initialisation](papier/cm1/p27.jpg){ loading=lazy .papier }](papier/cm1/p27.jpg)
    <p class="papier-legende">Le constructeur d’initialisation · CM1 — support 2025-2026, diapo 27</p>

    [![CM1 — support 2025-2026, diapo 28 : Le constructeur d’initialisation : Conflit](papier/cm1/p28.jpg){ loading=lazy .papier }](papier/cm1/p28.jpg)
    <p class="papier-legende">Le constructeur d’initialisation : Conflit · CM1 — support 2025-2026, diapo 28</p>

    [![CM1 — support 2025-2026, diapo 29 : Le constructeur d’initialisation : Conflit](papier/cm1/p29.jpg){ loading=lazy .papier }](papier/cm1/p29.jpg)
    <p class="papier-legende">Le constructeur d’initialisation : Conflit · CM1 — support 2025-2026, diapo 29</p>

    [![CM1 — support 2025-2026, diapo 30 : Le constructeur d’initialisation : Solution au conflit](papier/cm1/p30.jpg){ loading=lazy .papier }](papier/cm1/p30.jpg)
    <p class="papier-legende">Le constructeur d’initialisation : Solution au conflit · CM1 — support 2025-2026, diapo 30</p>

    [![CM1 — support 2025-2026, diapo 31 : La surcharge de constructeur](papier/cm1/p31.jpg){ loading=lazy .papier }](papier/cm1/p31.jpg)
    <p class="papier-legende">La surcharge de constructeur · CM1 — support 2025-2026, diapo 31</p>

    [![CM1 — support 2025-2026, diapo 32 : La surcharge de constructeur](papier/cm1/p32.jpg){ loading=lazy .papier }](papier/cm1/p32.jpg)
    <p class="papier-legende">La surcharge de constructeur · CM1 — support 2025-2026, diapo 32</p>

    [![CM1 — support 2025-2026, diapo 33 : Modification des valeurs par défaut](papier/cm1/p33.jpg){ loading=lazy .papier }](papier/cm1/p33.jpg)
    <p class="papier-legende">Modification des valeurs par défaut · CM1 — support 2025-2026, diapo 33</p>

    [![CM1 — support 2025-2026, diapo 34 : Constructeur de copie](papier/cm1/p34.jpg){ loading=lazy .papier }](papier/cm1/p34.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 34</p>

    [![CM1 — support 2025-2026, diapo 35 : Constructeur de copie](papier/cm1/p35.jpg){ loading=lazy .papier }](papier/cm1/p35.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 35</p>

    [![CM1 — support 2025-2026, diapo 36 : Constructeur de copie](papier/cm1/p36.jpg){ loading=lazy .papier }](papier/cm1/p36.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 36</p>

    [![CM1 — support 2025-2026, diapo 37 : Constructeur de copie](papier/cm1/p37.jpg){ loading=lazy .papier }](papier/cm1/p37.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 37</p>

    [![CM1 — support 2025-2026, diapo 38 : Constructeur de copie](papier/cm1/p38.jpg){ loading=lazy .papier }](papier/cm1/p38.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 38</p>

    [![CM1 — support 2025-2026, diapo 39 : Constructeur de copie](papier/cm1/p39.jpg){ loading=lazy .papier }](papier/cm1/p39.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 39</p>

    [![CM1 — support 2025-2026, diapo 40 : Constructeur de copie](papier/cm1/p40.jpg){ loading=lazy .papier }](papier/cm1/p40.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 40</p>

    [![CM1 — support 2025-2026, diapo 41 : Constructeur de copie](papier/cm1/p41.jpg){ loading=lazy .papier }](papier/cm1/p41.jpg)
    <p class="papier-legende">Constructeur de copie · CM1 — support 2025-2026, diapo 41</p>

    [![CM1 — support 2025-2026, diapo 42 : Le mot clé « this »](papier/cm1/p42.jpg){ loading=lazy .papier }](papier/cm1/p42.jpg)
    <p class="papier-legende">Le mot clé « this » · CM1 — support 2025-2026, diapo 42</p>

    [![CM1 — support 2025-2026, diapo 43 : Le mot clé « this »](papier/cm1/p43.jpg){ loading=lazy .papier }](papier/cm1/p43.jpg)
    <p class="papier-legende">Le mot clé « this » · CM1 — support 2025-2026, diapo 43</p>

    [![CM1 — support 2025-2026, diapo 44 : Méthodes de classe](papier/cm1/p44.jpg){ loading=lazy .papier }](papier/cm1/p44.jpg)
    <p class="papier-legende">Méthodes de classe · CM1 — support 2025-2026, diapo 44</p>

    [![CM1 — support 2025-2026, diapo 45 : Les méthodes de classe](papier/cm1/p45.jpg){ loading=lazy .papier }](papier/cm1/p45.jpg)
    <p class="papier-legende">Les méthodes de classe · CM1 — support 2025-2026, diapo 45</p>

    [![CM1 — support 2025-2026, diapo 46 : Les méthodes de classe](papier/cm1/p46.jpg){ loading=lazy .papier }](papier/cm1/p46.jpg)
    <p class="papier-legende">Les méthodes de classe · CM1 — support 2025-2026, diapo 46</p>

    [![CM1 — support 2025-2026, diapo 47 : Les méthodes de classe](papier/cm1/p47.jpg){ loading=lazy .papier }](papier/cm1/p47.jpg)
    <p class="papier-legende">Les méthodes de classe · CM1 — support 2025-2026, diapo 47</p>

    [![CM1 — support 2025-2026, diapo 48 : Les méthodes de classe](papier/cm1/p48.jpg){ loading=lazy .papier }](papier/cm1/p48.jpg)
    <p class="papier-legende">Les méthodes de classe · CM1 — support 2025-2026, diapo 48</p>

    [![CM1 — support 2025-2026, diapo 49 : Faire l&#x27;exercice 1 du TD1.](papier/cm1/p49.jpg){ loading=lazy .papier }](papier/cm1/p49.jpg)
    <p class="papier-legende">Faire l&#x27;exercice 1 du TD1. · CM1 — support 2025-2026, diapo 49</p>

    <!-- /papier -->
