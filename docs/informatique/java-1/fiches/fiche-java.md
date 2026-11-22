---
title: "Fiche — Java et POO"
---

# Fiche — Java et POO

## Squelette d'une classe

```java
public class Point {
    private double x, y;                          // attributs privés
    private static int nb = 0;                    // partagé par toutes les instances

    public Point() { this(0, 0); }                // constructeur par défaut
    public Point(double x, double y) { this.x = x; this.y = y; nb++; }
    public Point(Point p) { this(p.x, p.y); }     // copie

    public double getX() { return x; }            // getter
    public void setX(double x) { this.x = x; }    // setter

    @Override public String toString() { return "(" + x + ", " + y + ")"; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }
}
```

## À retenir

| Notion | Règle |
|---|---|
| Constructeur par défaut | disparaît dès qu'on écrit un autre constructeur |
| `this(…)` / `super(…)` | première instruction du constructeur |
| `==` | compare les références ; `equals` compare le contenu |
| `Point b = a;` | même objet (pas une copie) |
| Visibilité | `private` < *package* < `protected` < `public` |
| `static` | une seule valeur pour la classe ; pas de `this` dans une méthode `static` |
| Surcharge | même nom, paramètres différents |
| Redéfinition | même signature dans la fille, `@Override` |

## Héritage, abstraction, interfaces

```java
public abstract class Forme { public abstract double aire(); }
public class Cercle extends Forme implements Comparable<Cercle> {
    private double r;
    public Cercle(double r) { super(); this.r = r; }
    @Override public double aire() { return Math.PI * r * r; }
    @Override public int compareTo(Cercle c) { return Double.compare(r, c.r); }
}

Forme f = new Cercle(2);              // upcast implicite
f.aire();                             // version de Cercle (liaison dynamique)
if (f instanceof Cercle) { Cercle c = (Cercle) f; }   // downcast vérifié
```

- Une seule classe mère (`extends`), plusieurs interfaces (`implements A, B`).
- Classe abstraite : pas de `new`, peut avoir constructeurs et attributs.
- Interface : méthodes `public abstract` (+ `default`/`static`), attributs `public static final`.
- Ordre des constructeurs : mère → fille.
