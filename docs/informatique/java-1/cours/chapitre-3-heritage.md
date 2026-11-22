---
title: "Ch. 3 — Héritage et polymorphisme"
---

# Chapitre 3 — Héritage et polymorphisme

=== "Version simplifiée"

    !!! definition "Héritage (`extends`)"
        Une classe **fille** reprend les attributs et méthodes d'une classe **mère**
        et en ajoute ou en modifie. Relation « **est un** » : un `Chien` *est un*
        `Animal`. Java n'autorise qu'**une seule** classe mère ; toutes les classes
        héritent au final de `Object`.

    ```java
    public class Animal {
        protected String nom;
        public Animal(String nom) { this.nom = nom; }
        public void crier() { System.out.println("…"); }
    }

    public class Chien extends Animal {
        private String race;
        public Chien(String nom, String race) {
            super(nom);                 // constructeur de la mère : 1re instruction
            this.race = race;
        }
        @Override
        public void crier() { System.out.println(nom + " : Wouf"); }
    }
    ```

    - La fille **n'accède pas** aux membres `private` de la mère (utiliser les getters ou `protected`).
    - Si la mère n'a pas de constructeur sans paramètre, la fille **doit** appeler `super(…)`.
    - `super.methode()` appelle la version de la mère depuis la redéfinition.

    !!! definition "Redéfinition (*override*) vs surcharge (*overload*)"
        - **Redéfinition** : la fille réécrit une méthode de la mère avec la **même
          signature** (nom + paramètres) ; on l'annote `@Override`.
        - **Surcharge** : même nom, **paramètres différents** ; ce n'est pas un remplacement.

    ## Polymorphisme

    ```java
    Animal a = new Chien("Rex", "Berger");   // upcast implicite
    a.crier();                                 // "Rex : Wouf" : la méthode du Chien

    Animal[] zoo = { new Chien("Rex", "?"), new Chat("Tom") };
    for (Animal x : zoo) x.crier();            // chacun crie à sa façon
    ```

    !!! theoreme "Liaison dynamique"
        Le **type déclaré** (`Animal`) dit quelles méthodes on a le droit d'appeler ;
        le **type réel** de l'objet (`Chien`) dit **quelle version** s'exécute.

    ## Upcast et downcast

    - **Upcast** (fille → mère) : implicite et toujours sûr (`Animal a = chien;`).
    - **Downcast** (mère → fille) : explicite, à vérifier avec `instanceof` :

    ```java
    if (a instanceof Chien) {
        Chien c = (Chien) a;          // sinon ClassCastException à l'exécution
    }
    ```

    !!! piege "Ordre d'affichage des constructeurs"
        `new C(…)` avec `C extends B extends A` exécute d'abord le constructeur de
        `A`, puis `B`, puis `C` (chaque `super(…)` passe en premier).

=== "Version papier"

    Les diapos du CM3 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/TI403P/cm3.pdf | CM3 — support 2025-2026 | cm3 | diapo -->

    [![CM3 — support 2025-2026, diapo 1 : Héritage et Polymorphisme](papier/cm3/p01.jpg){ loading=lazy .papier }](papier/cm3/p01.jpg)
    <p class="papier-legende">Héritage et Polymorphisme · CM3 — support 2025-2026, diapo 1</p>

    [![CM3 — support 2025-2026, diapo 2](papier/cm3/p02.jpg){ loading=lazy .papier }](papier/cm3/p02.jpg)
    <p class="papier-legende">CM3 — support 2025-2026, diapo 2</p>

    [![CM3 — support 2025-2026, diapo 3 : L&#x27;héritage est le troisième principe de la programmation orientée objet, permettant de cré…](papier/cm3/p03.jpg){ loading=lazy .papier }](papier/cm3/p03.jpg)
    <p class="papier-legende">L&#x27;héritage est le troisième principe de la programmation orientée objet, permettant de cré… · CM3 — support 2025-2026, diapo 3</p>

    [![CM3 — support 2025-2026, diapo 4 : Exemple sans l’héritage:](papier/cm3/p04.jpg){ loading=lazy .papier }](papier/cm3/p04.jpg)
    <p class="papier-legende">Exemple sans l’héritage: · CM3 — support 2025-2026, diapo 4</p>

    [![CM3 — support 2025-2026, diapo 5 : Exemple avec l’héritage:](papier/cm3/p05.jpg){ loading=lazy .papier }](papier/cm3/p05.jpg)
    <p class="papier-legende">Exemple avec l’héritage: · CM3 — support 2025-2026, diapo 5</p>

    [![CM3 — support 2025-2026, diapo 6 : Héritage à tous les niveaux](papier/cm3/p06.jpg){ loading=lazy .papier }](papier/cm3/p06.jpg)
    <p class="papier-legende">Héritage à tous les niveaux · CM3 — support 2025-2026, diapo 6</p>

    [![CM3 — support 2025-2026, diapo 7 : Héritage à tous les niveaux, exemple:](papier/cm3/p07.jpg){ loading=lazy .papier }](papier/cm3/p07.jpg)
    <p class="papier-legende">Héritage à tous les niveaux, exemple: · CM3 — support 2025-2026, diapo 7</p>

    [![CM3 — support 2025-2026, diapo 8 : Une classe fille ne peut pas accéder aux attributs et aux méthodes « private » de](papier/cm3/p08.jpg){ loading=lazy .papier }](papier/cm3/p08.jpg)
    <p class="papier-legende">Une classe fille ne peut pas accéder aux attributs et aux méthodes « private » de · CM3 — support 2025-2026, diapo 8</p>

    [![CM3 — support 2025-2026, diapo 9 : Lorsque la classe fille définit une méthode dont le nom, le type de paramètres et le](papier/cm3/p09.jpg){ loading=lazy .papier }](papier/cm3/p09.jpg)
    <p class="papier-legende">Lorsque la classe fille définit une méthode dont le nom, le type de paramètres et le · CM3 — support 2025-2026, diapo 9</p>

    [![CM3 — support 2025-2026, diapo 10 : ATTENTION!!: A ne pas confondre avec la surcharge](papier/cm3/p10.jpg){ loading=lazy .papier }](papier/cm3/p10.jpg)
    <p class="papier-legende">ATTENTION!!: A ne pas confondre avec la surcharge · CM3 — support 2025-2026, diapo 10</p>

    [![CM3 — support 2025-2026, diapo 11 : public void afficher () {](papier/cm3/p11.jpg){ loading=lazy .papier }](papier/cm3/p11.jpg)
    <p class="papier-legende">public void afficher () { · CM3 — support 2025-2026, diapo 11</p>

    [![CM3 — support 2025-2026, diapo 12 : public void afficher () {](papier/cm3/p12.jpg){ loading=lazy .papier }](papier/cm3/p12.jpg)
    <p class="papier-legende">public void afficher () { · CM3 — support 2025-2026, diapo 12</p>

    [![CM3 — support 2025-2026, diapo 13 : public void afficher () {](papier/cm3/p13.jpg){ loading=lazy .papier }](papier/cm3/p13.jpg)
    <p class="papier-legende">public void afficher () { · CM3 — support 2025-2026, diapo 13</p>

    [![CM3 — support 2025-2026, diapo 14 : public void afficher () {](papier/cm3/p14.jpg){ loading=lazy .papier }](papier/cm3/p14.jpg)
    <p class="papier-legende">public void afficher () { · CM3 — support 2025-2026, diapo 14</p>

    [![CM3 — support 2025-2026, diapo 15 : public void afficher () {](papier/cm3/p15.jpg){ loading=lazy .papier }](papier/cm3/p15.jpg)
    <p class="papier-legende">public void afficher () { · CM3 — support 2025-2026, diapo 15</p>

    [![CM3 — support 2025-2026, diapo 16 : public void afficher () {](papier/cm3/p16.jpg){ loading=lazy .papier }](papier/cm3/p16.jpg)
    <p class="papier-legende">public void afficher () { · CM3 — support 2025-2026, diapo 16</p>

    [![CM3 — support 2025-2026, diapo 17 : Le constructeur de la classe fille doit appeler le constructeur de la classe mère](papier/cm3/p17.jpg){ loading=lazy .papier }](papier/cm3/p17.jpg)
    <p class="papier-legende">Le constructeur de la classe fille doit appeler le constructeur de la classe mère · CM3 — support 2025-2026, diapo 17</p>

    [![CM3 — support 2025-2026, diapo 18 : Constructeur par défaut](papier/cm3/p18.jpg){ loading=lazy .papier }](papier/cm3/p18.jpg)
    <p class="papier-legende">Constructeur par défaut · CM3 — support 2025-2026, diapo 18</p>

    [![CM3 — support 2025-2026, diapo 19 : Overriding, constructeur :](papier/cm3/p19.jpg){ loading=lazy .papier }](papier/cm3/p19.jpg)
    <p class="papier-legende">Overriding, constructeur : · CM3 — support 2025-2026, diapo 19</p>

    [![CM3 — support 2025-2026, diapo 20 : Avantage de l’héritage dans la programmation](papier/cm3/p20.jpg){ loading=lazy .papier }](papier/cm3/p20.jpg)
    <p class="papier-legende">Avantage de l’héritage dans la programmation · CM3 — support 2025-2026, diapo 20</p>

    [![CM3 — support 2025-2026, diapo 21](papier/cm3/p21.jpg){ loading=lazy .papier }](papier/cm3/p21.jpg)
    <p class="papier-legende">CM3 — support 2025-2026, diapo 21</p>

    [![CM3 — support 2025-2026, diapo 22 : C’est un concept puissant de la POO qui complète l’héritage.](papier/cm3/p22.jpg){ loading=lazy .papier }](papier/cm3/p22.jpg)
    <p class="papier-legende">C’est un concept puissant de la POO qui complète l’héritage. · CM3 — support 2025-2026, diapo 22</p>

    [![CM3 — support 2025-2026, diapo 23 : UpCast, définition:](papier/cm3/p23.jpg){ loading=lazy .papier }](papier/cm3/p23.jpg)
    <p class="papier-legende">UpCast, définition: · CM3 — support 2025-2026, diapo 23</p>

    [![CM3 — support 2025-2026, diapo 24 : UpCast, exemple:](papier/cm3/p24.jpg){ loading=lazy .papier }](papier/cm3/p24.jpg)
    <p class="papier-legende">UpCast, exemple: · CM3 — support 2025-2026, diapo 24</p>

    [![CM3 — support 2025-2026, diapo 25 : UpCast, exemple:](papier/cm3/p25.jpg){ loading=lazy .papier }](papier/cm3/p25.jpg)
    <p class="papier-legende">UpCast, exemple: · CM3 — support 2025-2026, diapo 25</p>

    [![CM3 — support 2025-2026, diapo 26 : UpCast, exemple:](papier/cm3/p26.jpg){ loading=lazy .papier }](papier/cm3/p26.jpg)
    <p class="papier-legende">UpCast, exemple: · CM3 — support 2025-2026, diapo 26</p>

    [![CM3 — support 2025-2026, diapo 27 : A quoi sert donc le UpCast!!!](papier/cm3/p27.jpg){ loading=lazy .papier }](papier/cm3/p27.jpg)
    <p class="papier-legende">A quoi sert donc le UpCast!!! · CM3 — support 2025-2026, diapo 27</p>

    [![CM3 — support 2025-2026, diapo 28 : A quoi sert donc le UpCast!!!](papier/cm3/p28.jpg){ loading=lazy .papier }](papier/cm3/p28.jpg)
    <p class="papier-legende">A quoi sert donc le UpCast!!! · CM3 — support 2025-2026, diapo 28</p>

    [![CM3 — support 2025-2026, diapo 29 : 1. Cherchez la classe mère de tous ces objets](papier/cm3/p29.jpg){ loading=lazy .papier }](papier/cm3/p29.jpg)
    <p class="papier-legende">1. Cherchez la classe mère de tous ces objets · CM3 — support 2025-2026, diapo 29</p>

    [![CM3 — support 2025-2026, diapo 30 : UpCast, exemple:](papier/cm3/p30.jpg){ loading=lazy .papier }](papier/cm3/p30.jpg)
    <p class="papier-legende">UpCast, exemple: · CM3 — support 2025-2026, diapo 30</p>

    [![CM3 — support 2025-2026, diapo 31 : UpCast, exemple:](papier/cm3/p31.jpg){ loading=lazy .papier }](papier/cm3/p31.jpg)
    <p class="papier-legende">UpCast, exemple: · CM3 — support 2025-2026, diapo 31</p>

    [![CM3 — support 2025-2026, diapo 32 : Un objet est considéré comme étant d’une classe fille de sa classe de](papier/cm3/p32.jpg){ loading=lazy .papier }](papier/cm3/p32.jpg)
    <p class="papier-legende">Un objet est considéré comme étant d’une classe fille de sa classe de · CM3 — support 2025-2026, diapo 32</p>

    [![CM3 — support 2025-2026, diapo 33 : DownCast, exemple:](papier/cm3/p33.jpg){ loading=lazy .papier }](papier/cm3/p33.jpg)
    <p class="papier-legende">DownCast, exemple: · CM3 — support 2025-2026, diapo 33</p>

    [![CM3 — support 2025-2026, diapo 34 : DownCast, exemple:](papier/cm3/p34.jpg){ loading=lazy .papier }](papier/cm3/p34.jpg)
    <p class="papier-legende">DownCast, exemple: · CM3 — support 2025-2026, diapo 34</p>

    [![CM3 — support 2025-2026, diapo 35 : Recommandations pour des Applications Vertes](papier/cm3/p35.jpg){ loading=lazy .papier }](papier/cm3/p35.jpg)
    <p class="papier-legende">Recommandations pour des Applications Vertes · CM3 — support 2025-2026, diapo 35</p>

    [![CM3 — support 2025-2026, diapo 36 : On souhaite développer une application Java permettant de gérer les animaux d’un zoo.](papier/cm3/p36.jpg){ loading=lazy .papier }](papier/cm3/p36.jpg)
    <p class="papier-legende">On souhaite développer une application Java permettant de gérer les animaux d’un zoo. · CM3 — support 2025-2026, diapo 36</p>

    <!-- /papier -->
