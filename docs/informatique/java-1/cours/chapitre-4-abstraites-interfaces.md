---
title: "Ch. 4 — Classes abstraites et interfaces"
---

# Chapitre 4 — Classes abstraites et interfaces

=== "Version simplifiée"

    ## Classes abstraites

    !!! definition "`abstract`"
        Une **classe abstraite** ne peut pas être instanciée : elle sert de modèle
        commun. Une **méthode abstraite** n'a pas de corps ; toute classe fille
        **concrète** doit la redéfinir.

    ```java
    public abstract class Forme {
        protected Point position;              // attributs et constructeurs autorisés
        public Forme(Point p) { position = p; }
        public abstract double aire();         // pas de corps
        public String toString() { return getClass().getSimpleName() + " d'aire " + aire(); }
    }

    public class Cercle extends Forme {
        private double r;
        public Cercle(Point p, double r) { super(p); this.r = r; }
        @Override public double aire() { return Math.PI * r * r; }
    }
    ```

    - Une classe avec **au moins une** méthode abstraite doit être déclarée `abstract`.
    - Une classe abstraite **peut** n'avoir aucune méthode abstraite, et peut avoir
      des constructeurs (appelés par `super(…)`).
    - Une fille qui ne redéfinit pas tout doit elle-même être `abstract`.

    ## Interfaces

    !!! definition "`interface` / `implements`"
        Une **interface** est un contrat purement abstrait : une liste de méthodes
        que les classes s'engagent à fournir. Une classe peut **implémenter
        plusieurs interfaces** : c'est la solution de Java à l'héritage multiple.

    ```java
    public interface Nageur { void nager(); }
    public interface Volant { void voler(); }

    public class Canard extends Animal implements Nageur, Volant {
        public Canard(String nom) { super(nom); }
        @Override public void nager() { … }
        @Override public void voler() { … }
    }

    Nageur n = new Canard("Donald");   // une interface est un type
    ```

    | Dans une interface | |
    |---|---|
    | méthodes | `public abstract` implicitement ; `default` et `static` (avec corps) depuis Java 8 |
    | attributs | uniquement des constantes : `public static final` implicitement |
    | constructeurs, attributs d'instance | interdits |
    | héritage | une interface peut **étendre plusieurs** interfaces (`extends A, B`) |

    !!! methode "Classe abstraite ou interface ?"
        - Du **code et des attributs communs** à une famille de classes → classe abstraite.
        - Une **capacité** partagée par des classes sans lien de parenté
          (`Comparable`, `Nageur`) → interface.

    !!! piege "Appel d'une méthode redéfinie dans le constructeur de la mère"
        Si le constructeur de `A` appelle `print()` et que la fille `B` la
        redéfinit, c'est la version de `B` qui s'exécute, **avant** que les
        attributs de `B` soient initialisés : on voit `0` ou `null`.

=== "Version papier"

    Les diapos du CM4 telles que projetées en cours (2025-2026).

    <!-- papier: pdf/TI403P/cm4.pdf | CM4 — support 2025-2026 | cm4 | diapo -->

    [![CM4 — support 2025-2026, diapo 1 : Classes Abstraites et Interfaces](papier/cm4/p01.jpg){ loading=lazy .papier }](papier/cm4/p01.jpg)
    <p class="papier-legende">Classes Abstraites et Interfaces · CM4 — support 2025-2026, diapo 1</p>

    [![CM4 — support 2025-2026, diapo 2 : Classes abstraites](papier/cm4/p02.jpg){ loading=lazy .papier }](papier/cm4/p02.jpg)
    <p class="papier-legende">Classes abstraites · CM4 — support 2025-2026, diapo 2</p>

    [![CM4 — support 2025-2026, diapo 3 : Classes Abstraites](papier/cm4/p03.jpg){ loading=lazy .papier }](papier/cm4/p03.jpg)
    <p class="papier-legende">Classes Abstraites · CM4 — support 2025-2026, diapo 3</p>

    [![CM4 — support 2025-2026, diapo 4 : Classes Abstraites](papier/cm4/p04.jpg){ loading=lazy .papier }](papier/cm4/p04.jpg)
    <p class="papier-legende">Classes Abstraites · CM4 — support 2025-2026, diapo 4</p>

    [![CM4 — support 2025-2026, diapo 5 : Classes Abstraites](papier/cm4/p05.jpg){ loading=lazy .papier }](papier/cm4/p05.jpg)
    <p class="papier-legende">Classes Abstraites · CM4 — support 2025-2026, diapo 5</p>

    [![CM4 — support 2025-2026, diapo 6 : Classes Abstraites](papier/cm4/p06.jpg){ loading=lazy .papier }](papier/cm4/p06.jpg)
    <p class="papier-legende">Classes Abstraites · CM4 — support 2025-2026, diapo 6</p>

    [![CM4 — support 2025-2026, diapo 7 : Classes Abstraites](papier/cm4/p07.jpg){ loading=lazy .papier }](papier/cm4/p07.jpg)
    <p class="papier-legende">Classes Abstraites · CM4 — support 2025-2026, diapo 7</p>

    [![CM4 — support 2025-2026, diapo 8 : Classes Abstraites](papier/cm4/p08.jpg){ loading=lazy .papier }](papier/cm4/p08.jpg)
    <p class="papier-legende">Classes Abstraites · CM4 — support 2025-2026, diapo 8</p>

    [![CM4 — support 2025-2026, diapo 9 : Classes Abstraites](papier/cm4/p09.jpg){ loading=lazy .papier }](papier/cm4/p09.jpg)
    <p class="papier-legende">Classes Abstraites · CM4 — support 2025-2026, diapo 9</p>

    [![CM4 — support 2025-2026, diapo 10](papier/cm4/p10.jpg){ loading=lazy .papier }](papier/cm4/p10.jpg)
    <p class="papier-legende">CM4 — support 2025-2026, diapo 10</p>

    [![CM4 — support 2025-2026, diapo 11 : Une classe concrète définit un contrat concret:](papier/cm4/p11.jpg){ loading=lazy .papier }](papier/cm4/p11.jpg)
    <p class="papier-legende">Une classe concrète définit un contrat concret: · CM4 — support 2025-2026, diapo 11</p>

    [![CM4 — support 2025-2026, diapo 12 : Une interface définir un contrat purement abstrait.](papier/cm4/p12.jpg){ loading=lazy .papier }](papier/cm4/p12.jpg)
    <p class="papier-legende">Une interface définir un contrat purement abstrait. · CM4 — support 2025-2026, diapo 12</p>

    [![CM4 — support 2025-2026, diapo 13 : Grâce au mot clef Interface, on indique bien qu’on crée](papier/cm4/p13.jpg){ loading=lazy .papier }](papier/cm4/p13.jpg)
    <p class="papier-legende">Grâce au mot clef Interface, on indique bien qu’on crée · CM4 — support 2025-2026, diapo 13</p>

    [![CM4 — support 2025-2026, diapo 14 : Implémentation d’une interface](papier/cm4/p14.jpg){ loading=lazy .papier }](papier/cm4/p14.jpg)
    <p class="papier-legende">Implémentation d’une interface · CM4 — support 2025-2026, diapo 14</p>

    [![CM4 — support 2025-2026, diapo 15 : Implémentation d’une interface](papier/cm4/p15.jpg){ loading=lazy .papier }](papier/cm4/p15.jpg)
    <p class="papier-legende">Implémentation d’une interface · CM4 — support 2025-2026, diapo 15</p>

    [![CM4 — support 2025-2026, diapo 16 : L’implementation de la classe](papier/cm4/p16.jpg){ loading=lazy .papier }](papier/cm4/p16.jpg)
    <p class="papier-legende">L’implementation de la classe · CM4 — support 2025-2026, diapo 16</p>

    [![CM4 — support 2025-2026, diapo 17 : La médiathèque est representée par une](papier/cm4/p17.jpg){ loading=lazy .papier }](papier/cm4/p17.jpg)
    <p class="papier-legende">La médiathèque est representée par une · CM4 — support 2025-2026, diapo 17</p>

    [![CM4 — support 2025-2026, diapo 18 : La médiathèque est representee](papier/cm4/p18.jpg){ loading=lazy .papier }](papier/cm4/p18.jpg)
    <p class="papier-legende">La médiathèque est representee · CM4 — support 2025-2026, diapo 18</p>

    [![CM4 — support 2025-2026, diapo 19 : import java.util.ArrayList;](papier/cm4/p19.jpg){ loading=lazy .papier }](papier/cm4/p19.jpg)
    <p class="papier-legende">import java.util.ArrayList; · CM4 — support 2025-2026, diapo 19</p>

    [![CM4 — support 2025-2026, diapo 20 : Implémentation de plusieurs interfaces](papier/cm4/p20.jpg){ loading=lazy .papier }](papier/cm4/p20.jpg)
    <p class="papier-legende">Implémentation de plusieurs interfaces · CM4 — support 2025-2026, diapo 20</p>

    [![CM4 — support 2025-2026, diapo 21 : public interface ObjetGraphique {](papier/cm4/p21.jpg){ loading=lazy .papier }](papier/cm4/p21.jpg)
    <p class="papier-legende">public interface ObjetGraphique { · CM4 — support 2025-2026, diapo 21</p>

    [![CM4 — support 2025-2026, diapo 22 : Mixer héritage et implémentation](papier/cm4/p22.jpg){ loading=lazy .papier }](papier/cm4/p22.jpg)
    <p class="papier-legende">Mixer héritage et implémentation · CM4 — support 2025-2026, diapo 22</p>

    [![CM4 — support 2025-2026, diapo 23 : Interface : type abstrait](papier/cm4/p23.jpg){ loading=lazy .papier }](papier/cm4/p23.jpg)
    <p class="papier-legende">Interface : type abstrait · CM4 — support 2025-2026, diapo 23</p>

    [![CM4 — support 2025-2026, diapo 24 : Exemple (1)](papier/cm4/p24.jpg){ loading=lazy .papier }](papier/cm4/p24.jpg)
    <p class="papier-legende">Exemple (1) · CM4 — support 2025-2026, diapo 24</p>

    [![CM4 — support 2025-2026, diapo 25 : Exemple (2)](papier/cm4/p25.jpg){ loading=lazy .papier }](papier/cm4/p25.jpg)
    <p class="papier-legende">Exemple (2) · CM4 — support 2025-2026, diapo 25</p>

    [![CM4 — support 2025-2026, diapo 26 : Solution au problème d’héritage multiple](papier/cm4/p26.jpg){ loading=lazy .papier }](papier/cm4/p26.jpg)
    <p class="papier-legende">Solution au problème d’héritage multiple · CM4 — support 2025-2026, diapo 26</p>

    [![CM4 — support 2025-2026, diapo 27 : public class MammifereMarin extends Mammifere implements](papier/cm4/p27.jpg){ loading=lazy .papier }](papier/cm4/p27.jpg)
    <p class="papier-legende">public class MammifereMarin extends Mammifere implements · CM4 — support 2025-2026, diapo 27</p>

    [![CM4 — support 2025-2026, diapo 28 : public class TraiteMammiferes {](papier/cm4/p28.jpg){ loading=lazy .papier }](papier/cm4/p28.jpg)
    <p class="papier-legende">public class TraiteMammiferes { · CM4 — support 2025-2026, diapo 28</p>

    [![CM4 — support 2025-2026, diapo 29 : Héritage Multiple entre Interfaces](papier/cm4/p29.jpg){ loading=lazy .papier }](papier/cm4/p29.jpg)
    <p class="papier-legende">Héritage Multiple entre Interfaces · CM4 — support 2025-2026, diapo 29</p>

    [![CM4 — support 2025-2026, diapo 30 : Interfaces – Depuis Java 8](papier/cm4/p30.jpg){ loading=lazy .papier }](papier/cm4/p30.jpg)
    <p class="papier-legende">Interfaces – Depuis Java 8 · CM4 — support 2025-2026, diapo 30</p>

    [![CM4 — support 2025-2026, diapo 31 : Interfaces – Depuis Java 8](papier/cm4/p31.jpg){ loading=lazy .papier }](papier/cm4/p31.jpg)
    <p class="papier-legende">Interfaces – Depuis Java 8 · CM4 — support 2025-2026, diapo 31</p>

    [![CM4 — support 2025-2026, diapo 32 : Recommandations pour des Applications Vertes](papier/cm4/p32.jpg){ loading=lazy .papier }](papier/cm4/p32.jpg)
    <p class="papier-legende">Recommandations pour des Applications Vertes · CM4 — support 2025-2026, diapo 32</p>

    [![CM4 — support 2025-2026, diapo 33 : Étudiez la hiérarchie de classes suivante et](papier/cm4/p33.jpg){ loading=lazy .papier }](papier/cm4/p33.jpg)
    <p class="papier-legende">Étudiez la hiérarchie de classes suivante et · CM4 — support 2025-2026, diapo 33</p>

    <!-- /papier -->
