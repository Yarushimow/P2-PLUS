---
title: "Ch. 4 — ACP"
---

# Chapitre 4 — Analyse en composantes principales (ACP)

=== "Version simplifiée"

    Avec beaucoup de variables, beaucoup sont **redondantes** (corrélées). L'ACP les remplace par
    de **nouvelles variables**, les axes principaux, choisies pour porter le plus d'information
    possible. C'est comme photographier un dromadaire : la vue de profil (l'axe où les points
    sont le plus étalés) en dit plus que la vue de face, et les deux ensemble suffisent presque.

    ## Le principe

    On travaille sur les données **centrées réduites** $M_s$ ($n$ individus, $p$ variables) et sur la
    matrice des corrélations $R = \frac1n\,{}^tM_s M_s$ ($p \times p$, symétrique, des 1 sur la diagonale).

    !!! theoreme "L'idée clé"
        On **diagonalise** $R$. Ses vecteurs propres sont les directions des nouveaux axes ; sa valeur propre $\lambda_j$
        est la **variance des données projetées** sur l'axe $j$, c'est-à-dire l'information qu'il porte.
        On classe les axes par $\lambda$ décroissante : l'axe 1 est celui où le nuage est le plus étalé.

    !!! methode "Diagonaliser $R$ (rappel d'algèbre linéaire)"
        1. Valeurs propres : racines de $\det(R - \lambda I) = 0$.
        2. Vecteurs propres : résoudre $Ru = \lambda u$, puis **normer** ($\|u\| = 1$).
        3. $R$ est symétrique réelle : ses vecteurs propres sont orthogonaux, donc $P^{-1} = {}^tP$.

        Cas $p = 2$ à connaître par cœur : $R = \begin{pmatrix} 1 & \rho \\ \rho & 1 \end{pmatrix}$ a pour valeurs propres
        $1 + \rho$ et $1 - \rho$, de vecteurs propres $\frac{1}{\sqrt2}(1, 1)$ et $\frac{1}{\sqrt2}(-1, 1)$.

    ## Les matrices de l'ACP

    | Objet | Formule | Ce qu'il dit |
    |---|---|---|
    | **qge** de l'axe $i$ | $\dfrac{\lambda_i}{p}$ (car $\sum\lambda_i = \text{tr}\,R = p$) | part de l'information totale portée par l'axe |
    | Matrice de passage $P$ | colonnes = vecteurs propres unitaires $u_1, \dots, u_p$ | la nouvelle base |
    | Matrice $F$ ($n \times p$) | $F = M_s\,P$ | coordonnées des **individus** sur les axes |
    | **qlt**(individu $i$, axe $j$) | $\dfrac{f_{ij}^2}{\sum_k f_{ik}^2}$ | qualité de représentation de l'individu par l'axe ($= \cos^2$ de l'angle) |
    | Saturations $S$ ($p \times p$) | $S = P\,D^{1/2}$, $D = \text{diag}(\lambda_1, \dots, \lambda_p)$ | corrélation entre l'ancienne variable $i$ et l'axe $j$ |

    !!! theoreme "Propriétés à vérifier"
        - $\sum_i \text{qge}(i) = 1$ et, pour chaque individu, $\sum_j \text{qlt}(i, j) = 1$.
        - Dans $S$ : la somme des carrés d'une **colonne** vaut $\lambda_j$, celle d'une **ligne** vaut 1.
        - Pour revenir aux données : $M_s = F\,{}^tP$.

    ## Exemple du cours ($n = 4$, $p = 2$)

    Points $(0, 0)$, $(1, 0)$, $(0, 1)$, $(2, 2)$ : $\rho = \frac{7}{11}$, donc $\lambda_1 = \frac{18}{11}$ et $\lambda_2 = \frac{4}{11}$,
    soit $\text{qge}(1) \approx 81{,}8\,\%$ (contre 50 % pour chacun des axes $x$ et $y$).
    L'individu 1 a pour coordonnées $\left(-\frac{6}{\sqrt{22}}, 0\right)$ : il est entièrement sur l'axe 1 (qlt = 100 %).
    $S \approx \begin{pmatrix} 0{,}90 & -0{,}43 \\ 0{,}90 & 0{,}43 \end{pmatrix}$ : $x$ et $y$ sont corrélées à 90 % avec l'axe 1.

    ## Interpréter une ACP

    !!! methode "Démarche d'une analyse complète"
        1. **Matrice $R$** : repérer les groupes de variables très corrélées (ou anti-corrélées) entre elles.
        2. **Valeurs propres** : garder les axes dont la qge cumulée est suffisante (souvent 70 à 80 %), ou ceux avec $\lambda > 1$
           (ils portent plus qu'une variable d'origine). Dire le pourcentage d'information perdue.
        3. **Saturations / cercle des corrélations** : chaque variable est un point $(s_{i,k_1}, s_{i,k_2})$ dans le disque de rayon 1.
           On n'interprète que les variables **proches du cercle** (bien représentées). Variables proches entre elles → corrélées ;
           opposées → anti-corrélées ; à angle droit → non corrélées.
        4. **Nommer les axes** d'après les variables qui leur sont le plus corrélées (« axe de la parité », « axe de la criminalité »…).
           Si toutes les variables sont du même signe sur l'axe 1, c'est un **effet taille** (un niveau global).
        5. **Individus** : retenir ceux qui ont une **grande qlt** et des **coordonnées extrêmes**, les placer dans le plan des axes, et conclure.

    L'exemple du poly (égalité homme-femme dans 20 pays de l'UE, 8 variables) garde 3 axes (qge 77 %) : axe 1 = parité et activité
    (pays du Nord d'un côté, du Sud et de l'Est de l'autre), axe 2 = diplômes, axe 3 = discriminations (rémunération, maternité).

=== "Version papier"

    Le chapitre 4 du polycopié 2025-2026 (les exercices sont dans le [TD 4](../td/td-4-acp.md)).

    <!-- papier: pdf/SM403P/poly.pdf | Poly 2025-2026 | ch4 | page | 61-78 -->

    [![Poly 2025-2026, page 61 : Chapitre 4](papier/ch4/p61.jpg){ loading=lazy .papier }](papier/ch4/p61.jpg)
    <p class="papier-legende">Chapitre 4 · Poly 2025-2026, page 61</p>

    [![Poly 2025-2026, page 62 : 4.2. LE PRINCIPE](papier/ch4/p62.jpg){ loading=lazy .papier }](papier/ch4/p62.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 62</p>

    [![Poly 2025-2026, page 63 : 4.2. LE PRINCIPE](papier/ch4/p63.jpg){ loading=lazy .papier }](papier/ch4/p63.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 63</p>

    [![Poly 2025-2026, page 64 : 4.2. LE PRINCIPE](papier/ch4/p64.jpg){ loading=lazy .papier }](papier/ch4/p64.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 64</p>

    [![Poly 2025-2026, page 65 : 4.2. LE PRINCIPE](papier/ch4/p65.jpg){ loading=lazy .papier }](papier/ch4/p65.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 65</p>

    [![Poly 2025-2026, page 66 : 4.2. LE PRINCIPE](papier/ch4/p66.jpg){ loading=lazy .papier }](papier/ch4/p66.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 66</p>

    [![Poly 2025-2026, page 67 : 4.2. LE PRINCIPE](papier/ch4/p67.jpg){ loading=lazy .papier }](papier/ch4/p67.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 67</p>

    [![Poly 2025-2026, page 68 : 4.2. LE PRINCIPE](papier/ch4/p68.jpg){ loading=lazy .papier }](papier/ch4/p68.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 68</p>

    [![Poly 2025-2026, page 69 : 4.2. LE PRINCIPE](papier/ch4/p69.jpg){ loading=lazy .papier }](papier/ch4/p69.jpg)
    <p class="papier-legende">4.2. LE PRINCIPE · Poly 2025-2026, page 69</p>

    [![Poly 2025-2026, page 70 : 4.3. L’OUTIL DE L’INTERPRÉTATION](papier/ch4/p70.jpg){ loading=lazy .papier }](papier/ch4/p70.jpg)
    <p class="papier-legende">4.3. L’OUTIL DE L’INTERPRÉTATION · Poly 2025-2026, page 70</p>

    [![Poly 2025-2026, page 71 : 4.3. L’OUTIL DE L’INTERPRÉTATION](papier/ch4/p71.jpg){ loading=lazy .papier }](papier/ch4/p71.jpg)
    <p class="papier-legende">4.3. L’OUTIL DE L’INTERPRÉTATION · Poly 2025-2026, page 71</p>

    [![Poly 2025-2026, page 72 : 4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS](papier/ch4/p72.jpg){ loading=lazy .papier }](papier/ch4/p72.jpg)
    <p class="papier-legende">4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS · Poly 2025-2026, page 72</p>

    [![Poly 2025-2026, page 73 : 4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS](papier/ch4/p73.jpg){ loading=lazy .papier }](papier/ch4/p73.jpg)
    <p class="papier-legende">4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS · Poly 2025-2026, page 73</p>

    [![Poly 2025-2026, page 74 : 4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS](papier/ch4/p74.jpg){ loading=lazy .papier }](papier/ch4/p74.jpg)
    <p class="papier-legende">4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS · Poly 2025-2026, page 74</p>

    [![Poly 2025-2026, page 75 : 4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS](papier/ch4/p75.jpg){ loading=lazy .papier }](papier/ch4/p75.jpg)
    <p class="papier-legende">4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS · Poly 2025-2026, page 75</p>

    [![Poly 2025-2026, page 76 : 4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS](papier/ch4/p76.jpg){ loading=lazy .papier }](papier/ch4/p76.jpg)
    <p class="papier-legende">4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS · Poly 2025-2026, page 76</p>

    [![Poly 2025-2026, page 77 : 4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS](papier/ch4/p77.jpg){ loading=lazy .papier }](papier/ch4/p77.jpg)
    <p class="papier-legende">4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS · Poly 2025-2026, page 77</p>

    [![Poly 2025-2026, page 78 : 4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS](papier/ch4/p78.jpg){ loading=lazy .papier }](papier/ch4/p78.jpg)
    <p class="papier-legende">4.4. EXEMPLE D’ANALYSE COMPLÈTE : L’ÉGALITÉ HOMME-FEMME DANS · Poly 2025-2026, page 78</p>

    <!-- /papier -->
