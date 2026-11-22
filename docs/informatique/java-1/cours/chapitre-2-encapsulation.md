---
title: "Ch. 2 — Encapsulation"
---

# Chapitre 2 — Encapsulation, toString, equals, static

=== "Version simplifiée"

    !!! definition "Encapsulation"
        Regrouper données et méthodes dans l'objet et **cacher l'état interne** :
        les attributs sont `private`, on y accède par des méthodes `public`.
        L'utilisateur de la classe voit **ce qu'elle fait**, pas **comment** (abstraction).

    | Visibilité | Accessible depuis |
    |---|---|
    | `private` | la classe elle-même |
    | (rien) *package* | les classes du même package |
    | `protected` | le package + les classes filles |
    | `public` | partout |

    ## Getters et setters

    ```java
    public class Point {
        private double x, y;

        public Point(double x, double y) { this.x = x; this.y = y; }
        public Point() { this(0, 0); }

        public double getX() { return x; }               // accesseur
        public void setX(double x) { this.x = x; }       // mutateur (peut valider)

        @Override
        public String toString() { return "P(" + x + " , " + y + ")"; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Point)) return false;
            Point p = (Point) o;
            return x == p.x && y == p.y;
        }
    }
    ```

    ## Afficher et comparer

    - `System.out.println(p)` appelle automatiquement `p.toString()`. Sans
      redéfinition, on obtient `Point@1b6d3586` (nom de classe + adresse).
    - `p == q` compare les **références** (même objet ?), `p.equals(q)` compare
      le **contenu** (si `equals` est redéfinie).

    !!! piege "Comparer des String"
        Toujours `s1.equals(s2)`, jamais `s1 == s2`.

    ## Membres statiques

    !!! definition "`static`"
        Un attribut `static` est **partagé par toutes les instances** (un seul
        exemplaire pour la classe) ; une méthode `static` s'appelle sur la classe
        (`Math.sqrt(2)`) et ne peut pas utiliser `this` ni les attributs d'instance.

    ```java
    public class Compte {
        private static int nbComptes = 0;    // compteur commun
        private final int numero;
        public Compte() { numero = ++nbComptes; }
        public static int getNbComptes() { return nbComptes; }
    }
    ```

    **Surcharge** (*overload*) : même nom, paramètres différents, dans la même
    classe. À ne pas confondre avec la **redéfinition** (*override*, chapitre 3).

=== "Version papier"

    Les diapos du CM2 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/TI403P/cm2.pdf | CM2 — support 2025-2026 | cm2 | diapo -->

    [![CM2 — support 2025-2026, diapo 1 : Java1: Fondamentaux de la POO](papier/cm2/p01.jpg){ loading=lazy .papier }](papier/cm2/p01.jpg)
    <p class="papier-legende">Java1: Fondamentaux de la POO · CM2 — support 2025-2026, diapo 1</p>

    [![CM2 — support 2025-2026, diapo 2 : Programmation Orientée Objet](papier/cm2/p02.jpg){ loading=lazy .papier }](papier/cm2/p02.jpg)
    <p class="papier-legende">Programmation Orientée Objet · CM2 — support 2025-2026, diapo 2</p>

    [![CM2 — support 2025-2026, diapo 3](papier/cm2/p03.jpg){ loading=lazy .papier }](papier/cm2/p03.jpg)
    <p class="papier-legende">CM2 — support 2025-2026, diapo 3</p>

    [![CM2 — support 2025-2026, diapo 4 : Le principe d’encapsulation consiste à regrouper dans le même objet informatique les](papier/cm2/p04.jpg){ loading=lazy .papier }](papier/cm2/p04.jpg)
    <p class="papier-legende">Le principe d’encapsulation consiste à regrouper dans le même objet informatique les · CM2 — support 2025-2026, diapo 4</p>

    [![CM2 — support 2025-2026, diapo 5 : Notion d’abstraction](papier/cm2/p05.jpg){ loading=lazy .papier }](papier/cm2/p05.jpg)
    <p class="papier-legende">Notion d’abstraction · CM2 — support 2025-2026, diapo 5</p>

    [![CM2 — support 2025-2026, diapo 6 : Notion d’abstraction](papier/cm2/p06.jpg){ loading=lazy .papier }](papier/cm2/p06.jpg)
    <p class="papier-legende">Notion d’abstraction · CM2 — support 2025-2026, diapo 6</p>

    [![CM2 — support 2025-2026, diapo 7 : Notion d’abstraction](papier/cm2/p07.jpg){ loading=lazy .papier }](papier/cm2/p07.jpg)
    <p class="papier-legende">Notion d’abstraction · CM2 — support 2025-2026, diapo 7</p>

    [![CM2 — support 2025-2026, diapo 8 : Abstraction et encapsulation](papier/cm2/p08.jpg){ loading=lazy .papier }](papier/cm2/p08.jpg)
    <p class="papier-legende">Abstraction et encapsulation · CM2 — support 2025-2026, diapo 8</p>

    [![CM2 — support 2025-2026, diapo 9 : Abstraction et encapsulation](papier/cm2/p09.jpg){ loading=lazy .papier }](papier/cm2/p09.jpg)
    <p class="papier-legende">Abstraction et encapsulation · CM2 — support 2025-2026, diapo 9</p>

    [![CM2 — support 2025-2026, diapo 10 : Comment encapsuler ?](papier/cm2/p10.jpg){ loading=lazy .papier }](papier/cm2/p10.jpg)
    <p class="papier-legende">Comment encapsuler ? · CM2 — support 2025-2026, diapo 10</p>

    [![CM2 — support 2025-2026, diapo 11 : Comment décider de la visibilité ?](papier/cm2/p11.jpg){ loading=lazy .papier }](papier/cm2/p11.jpg)
    <p class="papier-legende">Comment décider de la visibilité ? · CM2 — support 2025-2026, diapo 11</p>

    [![CM2 — support 2025-2026, diapo 12 : L’accès public](papier/cm2/p12.jpg){ loading=lazy .papier }](papier/cm2/p12.jpg)
    <p class="papier-legende">L’accès public · CM2 — support 2025-2026, diapo 12</p>

    [![CM2 — support 2025-2026, diapo 13 : L’accès privé](papier/cm2/p13.jpg){ loading=lazy .papier }](papier/cm2/p13.jpg)
    <p class="papier-legende">L’accès privé · CM2 — support 2025-2026, diapo 13</p>

    [![CM2 — support 2025-2026, diapo 14 : L’accès privé](papier/cm2/p14.jpg){ loading=lazy .papier }](papier/cm2/p14.jpg)
    <p class="papier-legende">L’accès privé · CM2 — support 2025-2026, diapo 14</p>

    [![CM2 — support 2025-2026, diapo 15 : Getters/ Setters](papier/cm2/p15.jpg){ loading=lazy .papier }](papier/cm2/p15.jpg)
    <p class="papier-legende">Getters/ Setters · CM2 — support 2025-2026, diapo 15</p>

    [![CM2 — support 2025-2026, diapo 16 : Accesseurs / Mutateurs](papier/cm2/p16.jpg){ loading=lazy .papier }](papier/cm2/p16.jpg)
    <p class="papier-legende">Accesseurs / Mutateurs · CM2 — support 2025-2026, diapo 16</p>

    [![CM2 — support 2025-2026, diapo 17 : Accesseurs / Mutateurs](papier/cm2/p17.jpg){ loading=lazy .papier }](papier/cm2/p17.jpg)
    <p class="papier-legende">Accesseurs / Mutateurs · CM2 — support 2025-2026, diapo 17</p>

    [![CM2 — support 2025-2026, diapo 18 : Accesseurs / Mutateurs](papier/cm2/p18.jpg){ loading=lazy .papier }](papier/cm2/p18.jpg)
    <p class="papier-legende">Accesseurs / Mutateurs · CM2 — support 2025-2026, diapo 18</p>

    [![CM2 — support 2025-2026, diapo 19 : Accesseurs / Mutateurs](papier/cm2/p19.jpg){ loading=lazy .papier }](papier/cm2/p19.jpg)
    <p class="papier-legende">Accesseurs / Mutateurs · CM2 — support 2025-2026, diapo 19</p>

    [![CM2 — support 2025-2026, diapo 20 : Affichage d’un objet](papier/cm2/p20.jpg){ loading=lazy .papier }](papier/cm2/p20.jpg)
    <p class="papier-legende">Affichage d’un objet · CM2 — support 2025-2026, diapo 20</p>

    [![CM2 — support 2025-2026, diapo 21 : Affichage d’un objet](papier/cm2/p21.jpg){ loading=lazy .papier }](papier/cm2/p21.jpg)
    <p class="papier-legende">Affichage d’un objet · CM2 — support 2025-2026, diapo 21</p>

    [![CM2 — support 2025-2026, diapo 22 : Affichage d’un objet](papier/cm2/p22.jpg){ loading=lazy .papier }](papier/cm2/p22.jpg)
    <p class="papier-legende">Affichage d’un objet · CM2 — support 2025-2026, diapo 22</p>

    [![CM2 — support 2025-2026, diapo 23 : Affichage d’un objet](papier/cm2/p23.jpg){ loading=lazy .papier }](papier/cm2/p23.jpg)
    <p class="papier-legende">Affichage d’un objet · CM2 — support 2025-2026, diapo 23</p>

    [![CM2 — support 2025-2026, diapo 24 : Affichage d’un objet](papier/cm2/p24.jpg){ loading=lazy .papier }](papier/cm2/p24.jpg)
    <p class="papier-legende">Affichage d’un objet · CM2 — support 2025-2026, diapo 24</p>

    [![CM2 — support 2025-2026, diapo 25 : Affichage d’un objet](papier/cm2/p25.jpg){ loading=lazy .papier }](papier/cm2/p25.jpg)
    <p class="papier-legende">Affichage d’un objet · CM2 — support 2025-2026, diapo 25</p>

    [![CM2 — support 2025-2026, diapo 26 : Affichage d’un objet](papier/cm2/p26.jpg){ loading=lazy .papier }](papier/cm2/p26.jpg)
    <p class="papier-legende">Affichage d’un objet · CM2 — support 2025-2026, diapo 26</p>

    [![CM2 — support 2025-2026, diapo 27 : Comparaison d’objets](papier/cm2/p27.jpg){ loading=lazy .papier }](papier/cm2/p27.jpg)
    <p class="papier-legende">Comparaison d’objets · CM2 — support 2025-2026, diapo 27</p>

    [![CM2 — support 2025-2026, diapo 28 : Comparaison d’objets](papier/cm2/p28.jpg){ loading=lazy .papier }](papier/cm2/p28.jpg)
    <p class="papier-legende">Comparaison d’objets · CM2 — support 2025-2026, diapo 28</p>

    [![CM2 — support 2025-2026, diapo 29 : Comparaison d’objets](papier/cm2/p29.jpg){ loading=lazy .papier }](papier/cm2/p29.jpg)
    <p class="papier-legende">Comparaison d’objets · CM2 — support 2025-2026, diapo 29</p>

    [![CM2 — support 2025-2026, diapo 30 : Comparaison d’objets](papier/cm2/p30.jpg){ loading=lazy .papier }](papier/cm2/p30.jpg)
    <p class="papier-legende">Comparaison d’objets · CM2 — support 2025-2026, diapo 30</p>

    [![CM2 — support 2025-2026, diapo 31 : Comparaison d’objets](papier/cm2/p31.jpg){ loading=lazy .papier }](papier/cm2/p31.jpg)
    <p class="papier-legende">Comparaison d’objets · CM2 — support 2025-2026, diapo 31</p>

    [![CM2 — support 2025-2026, diapo 32 : Attributs et méthodes](papier/cm2/p32.jpg){ loading=lazy .papier }](papier/cm2/p32.jpg)
    <p class="papier-legende">Attributs et méthodes · CM2 — support 2025-2026, diapo 32</p>

    [![CM2 — support 2025-2026, diapo 33 : Attributs et Méthodes Statiques](papier/cm2/p33.jpg){ loading=lazy .papier }](papier/cm2/p33.jpg)
    <p class="papier-legende">Attributs et Méthodes Statiques · CM2 — support 2025-2026, diapo 33</p>

    [![CM2 — support 2025-2026, diapo 34 : Attributs et Méthodes Statiques](papier/cm2/p34.jpg){ loading=lazy .papier }](papier/cm2/p34.jpg)
    <p class="papier-legende">Attributs et Méthodes Statiques · CM2 — support 2025-2026, diapo 34</p>

    [![CM2 — support 2025-2026, diapo 35 : Attributs et Méthodes Statiques](papier/cm2/p35.jpg){ loading=lazy .papier }](papier/cm2/p35.jpg)
    <p class="papier-legende">Attributs et Méthodes Statiques · CM2 — support 2025-2026, diapo 35</p>

    [![CM2 — support 2025-2026, diapo 36 : Recommandations pour des Applications Vertes](papier/cm2/p36.jpg){ loading=lazy .papier }](papier/cm2/p36.jpg)
    <p class="papier-legende">Recommandations pour des Applications Vertes · CM2 — support 2025-2026, diapo 36</p>

    [![CM2 — support 2025-2026, diapo 37 : 1. Créez une classe Personne avec les attributs nom et age.](papier/cm2/p37.jpg){ loading=lazy .papier }](papier/cm2/p37.jpg)
    <p class="papier-legende">1. Créez une classe Personne avec les attributs nom et age. · CM2 — support 2025-2026, diapo 37</p>

    <!-- /papier -->
