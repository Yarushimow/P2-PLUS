---
title: "Annale — CE 2022"
---

# Annale — CE du 3/12/2022

**55 min, calculatrice autorisée, sans documents.** Sujet : `pdf/sp303/CESP303_Sujet_anonyme.pdf`.
Corrigé rédigé par moi, à partir des formules de la [fiche CE](../fiches/fiche-relativite.md).

## 1. Vitesse d'une particule dont l'énergie vaut le double de son énergie au repos (5 pts)

$$
E = \gamma\,m_0c^2 = 2\,m_0c^2 \;\Rightarrow\; \gamma = 2
\;\Rightarrow\; 1 - \frac{v^2}{c^2} = \frac14
\;\Rightarrow\; v = \frac{\sqrt 3}{2}\,c \approx 0{,}866\,c \approx 2{,}60 \times 10^8\ \text{m/s}
$$

## 2. Invariance de la 2e loi de Newton par Galilée (2 pts)

On a $\vec v\,' = \vec v - \vec V$ avec $\vec V$ **constante** et $t' = t$. En dérivant :

$$
\vec a\,' = \frac{d\vec v\,'}{dt'} = \frac{d\vec v}{dt} - \underbrace{\frac{d\vec V}{dt}}_{=\,\vec 0} = \vec a
$$

La masse est la même dans les deux référentiels, donc $\sum\vec F = m\vec a = m\vec a\,'$ :
la 2e loi a la même forme dans O et O′.

## 3. Vitesse relativiste de A par rapport à B (5 pts)

A et B vont **dans le même sens**, à $0{,}75\,c$ et $0{,}9\,c$. On se place dans le
référentiel de B ($v = 0{,}9\,c$) et on transforme la vitesse de A ($u = 0{,}75\,c$) :

$$
v_{A/B} = \frac{u - v}{1 - \dfrac{u\,v}{c^2}} = \frac{0{,}75 - 0{,}9}{1 - 0{,}675}\,c
= \frac{-0{,}15}{0{,}325}\,c \approx -0{,}462\,c
$$

Soit $|v_{A/B}| \approx 0{,}46\,c \approx 1{,}38 \times 10^8$ m/s. Vu depuis B, A s'éloigne
vers l'arrière. Le signe dépend de l'orientation de l'axe : sur le schéma, les deux
vitesses sont vers les $x$ négatifs, ce qui donne $+0{,}46\,c$. Préciser la convention choisie.

!!! piege "Même sens → différence"
    En sens **opposés** : $\dfrac{u_1 + u_2}{1 + u_1u_2/c^2}$. Dans le **même sens** :
    $\dfrac{u_1 - u_2}{1 - u_1u_2/c^2}$. Le résultat classique serait $0{,}15\,c$ : il est très différent.

## 4. Ballon lancé depuis un navire (4 pts)

Dans le navire (R′) : $x' = 0$, $\ y' = h + 10\,t - \tfrac12 g t^2$.
Galilée, avec $v = 15$ m/s et $t = t'$ :

$$
x = x' + vt = 15\,t, \qquad y = y' = h + 10\,t - \tfrac12\,g\,t^2
$$

En éliminant $t = x/15$ : $\ y = h + \dfrac{2}{3}\,x - \dfrac{g}{450}\,x^2$, une **parabole** dans le port
(une droite verticale dans le navire).

## 5. Facteur γ d'un électron qui parcourt 25 cm en 2 ns (4 pts)

$$
v = \frac{0{,}25}{2 \times 10^{-9}} = 1{,}25 \times 10^8\ \text{m/s}, \qquad
\beta = 0{,}417, \qquad
\gamma = \frac{1}{\sqrt{1 - 0{,}417^2}} \approx 1{,}10
$$
