---
title: "Ch. 1 — Équations non linéaires"
---

# Chapitre 1 — Équations non linéaires

=== "Version simplifiée"

    ## Avant tout : les erreurs numériques

    Un calcul sur ordinateur n'est qu'une **approximation**. Trois sources d'erreur :

    - **modélisation** (ou discrétisation) : on simplifie le problème réel, par exemple $\sin\theta \approx \theta$ pour un pendule ;
    - **troncature** : une méthode itérative s'arrête après un nombre fini d'étapes ;
    - **arrondi** : un nombre réel est stocké avec un nombre fini de chiffres ($\frac13$ n'est pas représentable exactement).

    !!! definition "Erreur absolue, erreur relative"
        Si $\bar a$ approche la valeur exacte $a$ : erreur absolue $|\bar a - a|$, erreur relative $\dfrac{|\bar a - a|}{|a|}$.
        5 g d'erreur sur 2 kg de pommes, c'est 0,25 % ; sur 20 g d'or, c'est 25 % : seule l'erreur **relative** dit si c'est grave.

    Une **méthode itérative** construit une suite $x_{n+1} = \varphi(x_n)$ à partir de $x_0$, qui converge vers la solution.
    Sa convergence est **d'ordre $p$** si $\dfrac{|x_{n+1} - \ell|}{|x_n - \ell|^p} \to C \ne 0$ : à l'ordre 2, le nombre de bons chiffres double à chaque étape.

    ## Le problème

    Trouver $x \in [a, b]$ tel que $f(x) = 0$. Il faut d'abord **localiser** les racines.

    !!! theoreme "Théorème des valeurs intermédiaires"
        Si $f$ est continue sur $[a, b]$ et $f(a)f(b) < 0$, alors $f$ s'annule au moins une fois sur $]a, b[$.
        Si de plus $f$ est **strictement monotone**, la racine est **unique**.

    !!! methode "Montrer qu'une équation a exactement $k$ racines"
        Étudier $f'$, dresser le tableau de variations, puis appliquer le TVI sur chaque intervalle où $f$ est
        strictement monotone et change de signe. Penser à la **parité** : si $f$ est paire, ses racines vont par paires $\pm\alpha$.

    ## Méthode de la dichotomie (bissection)

    On coupe l'intervalle en deux et on garde la moitié où $f$ change de signe.

    !!! definition "Algorithme"
        $a_0 = a$, $b_0 = b$, avec $f(a)f(b) < 0$. À chaque étape, $c_n = \frac{a_n + b_n}{2}$ :

        - si $f(c_n) = 0$, c'est fini ;
        - si $f(a_n)f(c_n) < 0$, la racine est dans $[a_n, c_n]$ : $b_{n+1} = c_n$ ;
        - sinon elle est dans $[c_n, b_n]$ : $a_{n+1} = c_n$.

    !!! theoreme "Convergence"
        $b_n - a_n = \dfrac{b - a}{2^n}$ et $|r - c_n| \le \dfrac{b - a}{2^{n+1}}$.
        Pour une précision $\varepsilon$, il suffit que $\dfrac{b - a}{2^{n+1}} \le \varepsilon$, soit $n + 1 \ge \log_2\dfrac{b - a}{\varepsilon}$.

    - **+** converge toujours (si $f$ est continue et change de signe), et on connaît **à l'avance** le nombre d'itérations.
    - **−** lente (on gagne un chiffre tous les 3,3 pas), et ne marche pas pour une racine double (pas de changement de signe).

    ## Méthode de Newton-Raphson

    On remplace la courbe par sa **tangente** en $x_n$, et on prend son intersection avec l'axe des abscisses.

    !!! theoreme "Formule de Newton"

        $$
        x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
        $$

        Si $f'$ ne s'annule pas près de la racine $\bar x$ (racine **simple**) et si $x_0$ est **assez proche** de $\bar x$,
        la suite converge, à l'ordre **2** (convergence quadratique).

    !!! piege "Quand Newton échoue"
        - Si $f'(x_n) = 0$ (tangente horizontale), $x_{n+1}$ n'est pas défini.
        - Si $x_0$ est trop loin, la suite peut partir vers une **autre racine** ou diverger : choisis $x_0$ dans une zone
          où $f$ est monotone et garde le même sens de concavité jusqu'à la racine.

    **Racine de multiplicité $m$** ($f(\bar x) = \dots = f^{(m-1)}(\bar x) = 0$) : Newton ralentit (ordre 1). On retrouve l'ordre 2 avec

    $$
    x_{n+1} = x_n - m\,\frac{f(x_n)}{f'(x_n)}.
    $$

    Exemple du poly : pour $f(x) = x - \sin 2x - 0{,}5$, 16 itérations de dichotomie donnent une erreur de $10^{-4}$ ;
    Newton atteint $10^{-6}$ en 3 itérations.

    ## Méthode du point fixe

    $p$ est un **point fixe** de $g$ si $g(p) = p$. Chercher une racine de $f$ revient à chercher un point fixe de
    $g(x) = x - f(x)$, ou de toute fonction $g$ telle que $g(x) = x \iff f(x) = 0$.

    !!! theoreme "Théorème du point fixe"
        Si $g$ est continue, **$g([a, b]) \subset [a, b]$** et $|g'(x)| \le k < 1$ sur $[a, b]$ ($g$ **contractante**), alors :

        - $g$ a un **unique** point fixe $p$ dans $[a, b]$ ;
        - pour tout $p_0 \in [a, b]$, la suite $p_{n+1} = g(p_n)$ converge vers $p$ ;
        - erreur : $|p_n - p| \le k^n\max(p_0 - a, b - p_0)$ et $|p_n - p| \le \dfrac{k^n}{1 - k}|p_1 - p_0|$.

    !!! methode "Vérifier les hypothèses"
        1. $g([a, b]) \subset [a, b]$ : si $g$ est monotone, il suffit de regarder $g(a)$ et $g(b)$.
        2. $|g'| \le k < 1$ : majorer $|g'|$ sur $[a, b]$ (souvent avec la monotonie de $g'$).

        Plus $k$ est petit, plus la convergence est rapide. Si $|g'(p)| > 1$, la suite s'éloigne de $p$ :
        il faut choisir une autre fonction $g$ (exemple du poly : $x^3 + 4x^2 - 10 = 0$ a plusieurs réécritures, certaines divergent).

    ## Newton à deux variables

    Pour un système $f(x, y) = 0$, $g(x, y) = 0$, on note $F = (f, g)$ et $DF$ la **matrice jacobienne** :

    $$
    DF_{(x, y)} = \begin{pmatrix} \partial_x f & \partial_y f \\ \partial_x g & \partial_y g \end{pmatrix}
    \qquad
    \begin{pmatrix} x_{n+1} \\ y_{n+1} \end{pmatrix} = \begin{pmatrix} x_n \\ y_n \end{pmatrix} - DF^{-1}_{(x_n, y_n)}\begin{pmatrix} f(x_n, y_n) \\ g(x_n, y_n) \end{pmatrix}
    $$

    C'est la formule à une variable où $\frac{1}{f'}$ devient $DF^{-1}$. Elle est définie tant que $\det DF \ne 0$.
    En pratique (et sur MATLAB), on résout le système linéaire $DF\,\delta = -F$ plutôt que d'inverser la matrice.

=== "Version papier"

    L'introduction et le chapitre 1 du polycopié 2025-2026, avec le formulaire du chapitre (le TD est dans le [TD 1](../td/td-1-equations-non-lineaires.md)).

    <!-- papier: pdf/SM401P/poly.pdf | Poly 2025-2026 | ch1 | page | 5-24 -->

    [![Poly 2025-2026, page 5 : 0. Introduction - Erreurs numériques](papier/ch1/p05.jpg){ loading=lazy .papier }](papier/ch1/p05.jpg)
    <p class="papier-legende">0. Introduction - Erreurs numériques · Poly 2025-2026, page 5</p>

    [![Poly 2025-2026, page 6 : Le calcul d’une solution numérique engendre toujours des erreurs numériques qui s’ajoutent…](papier/ch1/p06.jpg){ loading=lazy .papier }](papier/ch1/p06.jpg)
    <p class="papier-legende">Le calcul d’une solution numérique engendre toujours des erreurs numériques qui s’ajoutent… · Poly 2025-2026, page 6</p>

    [![Poly 2025-2026, page 7 : 0.6 L’analyse numérique et les erreurs, ça ne rigole pas...](papier/ch1/p07.jpg){ loading=lazy .papier }](papier/ch1/p07.jpg)
    <p class="papier-legende">0.6 L’analyse numérique et les erreurs, ça ne rigole pas... · Poly 2025-2026, page 7</p>

    [![Poly 2025-2026, page 8 : 1098.811. Cette différence s’explique par le fait que toutes les erreurs d’arrondi étaient…](papier/ch1/p08.jpg){ loading=lazy .papier }](papier/ch1/p08.jpg)
    <p class="papier-legende">1098.811. Cette différence s’explique par le fait que toutes les erreurs d’arrondi étaient… · Poly 2025-2026, page 8</p>

    [![Poly 2025-2026, page 9 : 1. Equations non linéaires](papier/ch1/p09.jpg){ loading=lazy .papier }](papier/ch1/p09.jpg)
    <p class="papier-legende">1. Equations non linéaires · Poly 2025-2026, page 9</p>

    [![Poly 2025-2026, page 10 : Chapitre 1. Equations non linéaires](papier/ch1/p10.jpg){ loading=lazy .papier }](papier/ch1/p10.jpg)
    <p class="papier-legende">Chapitre 1. Equations non linéaires · Poly 2025-2026, page 10</p>

    [![Poly 2025-2026, page 11 : 1.2 Méthode de la dichotomie](papier/ch1/p11.jpg){ loading=lazy .papier }](papier/ch1/p11.jpg)
    <p class="papier-legende">1.2 Méthode de la dichotomie · Poly 2025-2026, page 11</p>

    [![Poly 2025-2026, page 12 : Chapitre 1. Equations non linéaires](papier/ch1/p12.jpg){ loading=lazy .papier }](papier/ch1/p12.jpg)
    <p class="papier-legende">Chapitre 1. Equations non linéaires · Poly 2025-2026, page 12</p>

    [![Poly 2025-2026, page 13 : 1.3 Méthode de Newton-Raphson](papier/ch1/p13.jpg){ loading=lazy .papier }](papier/ch1/p13.jpg)
    <p class="papier-legende">1.3 Méthode de Newton-Raphson · Poly 2025-2026, page 13</p>

    [![Poly 2025-2026, page 14 : Chapitre 1. Equations non linéaires](papier/ch1/p14.jpg){ loading=lazy .papier }](papier/ch1/p14.jpg)
    <p class="papier-legende">Chapitre 1. Equations non linéaires · Poly 2025-2026, page 14</p>

    [![Poly 2025-2026, page 15 : 1.4 Zéros multiples de la méthode de Newton](papier/ch1/p15.jpg){ loading=lazy .papier }](papier/ch1/p15.jpg)
    <p class="papier-legende">1.4 Zéros multiples de la méthode de Newton · Poly 2025-2026, page 15</p>

    [![Poly 2025-2026, page 16 : Chapitre 1. Equations non linéaires](papier/ch1/p16.jpg){ loading=lazy .papier }](papier/ch1/p16.jpg)
    <p class="papier-legende">Chapitre 1. Equations non linéaires · Poly 2025-2026, page 16</p>

    [![Poly 2025-2026, page 17 : 1.5 Méthode du Point Fixe](papier/ch1/p17.jpg){ loading=lazy .papier }](papier/ch1/p17.jpg)
    <p class="papier-legende">1.5 Méthode du Point Fixe · Poly 2025-2026, page 17</p>

    [![Poly 2025-2026, page 18 : Chapitre 1. Equations non linéaires](papier/ch1/p18.jpg){ loading=lazy .papier }](papier/ch1/p18.jpg)
    <p class="papier-legende">Chapitre 1. Equations non linéaires · Poly 2025-2026, page 18</p>

    [![Poly 2025-2026, page 19 : 1.5 Méthode du Point Fixe](papier/ch1/p19.jpg){ loading=lazy .papier }](papier/ch1/p19.jpg)
    <p class="papier-legende">1.5 Méthode du Point Fixe · Poly 2025-2026, page 19</p>

    [![Poly 2025-2026, page 20 : Chapitre 1. Equations non linéaires](papier/ch1/p20.jpg){ loading=lazy .papier }](papier/ch1/p20.jpg)
    <p class="papier-legende">Chapitre 1. Equations non linéaires · Poly 2025-2026, page 20</p>

    [![Poly 2025-2026, page 21 : 1.6 Méthode de Newton à deux variables](papier/ch1/p21.jpg){ loading=lazy .papier }](papier/ch1/p21.jpg)
    <p class="papier-legende">1.6 Méthode de Newton à deux variables · Poly 2025-2026, page 21</p>

    [![Poly 2025-2026, page 22 : Chapitre 1. Equations non linéaires](papier/ch1/p22.jpg){ loading=lazy .papier }](papier/ch1/p22.jpg)
    <p class="papier-legende">Chapitre 1. Equations non linéaires · Poly 2025-2026, page 22</p>

    [![Poly 2025-2026, page 23 : Formulaire : Equations non linéaires](papier/ch1/p23.jpg){ loading=lazy .papier }](papier/ch1/p23.jpg)
    <p class="papier-legende">Formulaire : Equations non linéaires · Poly 2025-2026, page 23</p>

    [![Poly 2025-2026, page 24 : Formulaire : Equations non linéaires](papier/ch1/p24.jpg){ loading=lazy .papier }](papier/ch1/p24.jpg)
    <p class="papier-legende">Formulaire : Equations non linéaires · Poly 2025-2026, page 24</p>

    <!-- /papier -->
