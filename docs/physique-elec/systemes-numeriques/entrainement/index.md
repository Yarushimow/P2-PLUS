---
title: Entraînement — bascules
hide:
  - toc
---

# Entraînement aux bascules

Exercices tirés au hasard, corrigés et expliqués ligne par ligne. Six modes :

- **Chronogramme** : bascule RS, D ou JK sur front montant ou descendant. Place Q en haut ou en bas après chaque front, puis donne la fonction (M, S, R, T, C, NU).
- **Table de transition** : on te donne l'évolution de Q à obtenir, tu trouves les entrées D, J/K ou J = K (avec X).
- **Table des états** : séquence de compteur aléatoire. Nombre de bascules, états suivants, puis entrées de chaque bascule.
- **Compteurs async** : lis le schéma (D ou JK, front, CLKi = Qi−1 ou Q̄i−1), trace Q0…Qn−1, puis fonction, modulo, fréquence et retard max N·tp.
- **Registres** : décalage, rotation, Johnson, anneau ou chargement série/parallèle. Trace les sorties et trouve la fonction.
- **QCM** : 48 questions sur le programme du CE (bascules, registres, compteurs asynchrones), tirées au hasard, une seule bonne réponse.

La case **Entrées prioritaires ~PR / ~CLR** les ajoute dans tous les modes (compteur modulo M par remise à zéro, RAZ du registre).

<iframe src="entrainement-bascules.html" title="Entraînement aux bascules" loading="lazy" style="width:100%;height:1500px;border:0;border-radius:8px;"></iframe>

[:material-open-in-new: Ouvrir en plein écran](entrainement-bascules.html){ .md-button }

!!! tip "Programme"
    Le CE s'arrête aux compteurs asynchrones : la **table des états** (synthèse de compteur
    synchrone) sert surtout pour le DE.
