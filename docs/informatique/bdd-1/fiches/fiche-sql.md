---
title: "Fiche — Bases de données"
---

# Fiche — Bases de données

## MCD → MLD

| Association | Transformation |
|---|---|
| `(X,1)-(X,n)` | clé côté `(X,n)` → **clé étrangère** côté `(X,1)` |
| `(X,n)-(X,n)` | **nouvelle table**, clé = les deux clés (+ attributs de l'association) |
| n-aire | nouvelle table, clé = toutes les clés participantes |
| `(0,1)-(1,1)` | clé côté `(0,1)` → clé étrangère côté `(1,1)` |
| réflexive | clé étrangère vers la même table (ou table d'association si n,n) |

**1FN** valeurs atomiques · **2FN** dépend de toute la clé · **3FN** pas de DF entre attributs non clés.

## LDD / LMD

```sql
CREATE TABLE T (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(50) NOT NULL UNIQUE,
  prix DECIMAL(8,2) CHECK (prix >= 0),
  ref_id INT,
  FOREIGN KEY (ref_id) REFERENCES R(id) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE T ADD COLUMN c INT;      ALTER TABLE T DROP COLUMN c;
ALTER TABLE T ADD CONSTRAINT ck CHECK (prix < 1000);
DROP TABLE T;
INSERT INTO T (nom, prix) VALUES ('a', 1.5);
UPDATE T SET prix = prix * 1.1 WHERE id = 3;
DELETE FROM T WHERE prix = 0;
```

## SELECT

```sql
SELECT [DISTINCT] colonnes, AGG(x) AS a
FROM T1 [INNER|LEFT|RIGHT] JOIN T2 ON T1.k = T2.k
WHERE condition_sur_lignes          -- =, <>, IN, BETWEEN, LIKE 'A%', IS NULL
GROUP BY colonnes
HAVING condition_sur_groupes        -- avec COUNT, SUM, AVG, MIN, MAX
ORDER BY a DESC
LIMIT 5;
```

- Sous-requêtes : `IN`, `NOT IN`, `EXISTS`, `NOT EXISTS`, `> ALL (…)`, `> ANY (…)`.
- Ensembles : `UNION` (sans doublons), `UNION ALL`, `INTERSECT`, `EXCEPT`.

## Algèbre relationnelle

| Algèbre | SQL |
|---|---|
| $\pi_{A}(R)$ | `SELECT DISTINCT A FROM R` |
| $\sigma_{c}(R)$ | `WHERE c` |
| $R \times S$ | `FROM R, S` |
| $R \bowtie_{c} S$ | `R JOIN S ON c` |
| $\gamma_{A;\ f(B)}(R)$ | `GROUP BY A` + `f(B)` |
| $\tau_{A}(R)$ | `ORDER BY A` |
| $\cup$, $\cap$, $\setminus$ | `UNION`, `INTERSECT`, `EXCEPT` |

**Optimiser** : restrictions le plus tôt possible, projections avant les jointures.
