---
title: "Fiche — Automates finis"
---

# Fiche — Automates finis et expressions rationnelles

## Définitions

- Automate $(Q, I, T, E)$ sur $A$ ; mot reconnu = il existe un chemin étiqueté par le mot d'une entrée à une sortie.
- **Déterministe** : une seule entrée, au plus une flèche par lettre depuis chaque état. **Complet** : exactement une (déterministe).
- **Standard** : une seule entrée, aucune flèche n'y arrive. **Asynchrone** : contient des ε-transitions.
- **Accessible** (atteint depuis une entrée), **coaccessible** (mène à une sortie), **émondé** = les deux.
- Reconnaît $\varepsilon$ ⟺ une entrée est une sortie. ADC dont tous les états sont terminaux → $A^*$.

## Algorithmes

| Opération | Méthode |
|---|---|
| Déterminiser | états = ensembles ; départ = toutes les entrées ; cible = union des cibles ; terminal si contient un terminal |
| Asynchrone | même chose avec les **ε-clôtures** : départ = clôture des entrées, et clôture de chaque cible après une lettre |
| Compléter | ajouter P non terminal, remplacer les « – » par P, P boucle sur toutes les lettres |
| Complémentaire | **déterministe + complet**, puis échanger terminaux / non terminaux (P devient terminal) |
| Standardiser | nouvel $i$ seule entrée, copie des transitions sortant des entrées ; $i$ terminal ⟺ une entrée l'était |
| Retirer / ajouter $\varepsilon$ | standardiser, puis retirer / ajouter la sortie sur $i$ |
| Minimiser (Moore) | ADC sans inaccessibles ; $\Theta_0 = \{T, NT\}$ ; séparer selon les motifs de groupes cibles ; stop si stable |

## Expressions rationnelles

$X + Y$ (union), $XY$ (concaténation), $X^*$ ($\varepsilon \in X^*$). Priorité : $^*$ > concaténation > $+$.

$E^* = \varepsilon + EE^*$ · $(E^*)^* = E^*$ · $(E + F)^* = (E^*F)^*E^* = E^*(FE^*)^*$ · $(EF)^* = \varepsilon + E(FE)^*F$ · $EF \ne FE$.

**Kleene** : reconnaissable par automate fini ⟺ décrit par une ER.

**ER → automate** (une entrée, une sortie par module) : lettre = une flèche ; $X + Y$ = ε vers les deux modules et ε depuis leurs sorties ;
$XY$ = sortie de $X$ confondue avec l'entrée de $Y$ ; $X^*$ = deux nouveaux états, ε d'entrée, ε de sortie, ε retour, ε saut.

**Automate → ER** : méthode de l'arrivée ($X_q$ = mots arrivant en $q$ ; $p \xrightarrow{a} q$ donne $X_pa$ dans $X_q$ ; $+\varepsilon$ pour une entrée ;
$L = \sum_{t \in T} X_t$) et **lemme d'Arden** : $X = XY + Z \Rightarrow X = ZY^*$ (si $\varepsilon \notin Y$).
Ou élimination d'états : $A \xrightarrow{X} G \xrightarrow{Y} B$ avec boucle $Z$ sur $G$ devient $A \xrightarrow{XZ^*Y} B$.

**Équivalence de deux ER** : même automate minimal.

## Modèles utiles

- Finit par $w$ : $0 \xrightarrow{A} 0$ puis la chaîne des lettres de $w$ (non déterministe), puis déterminiser.
- Contient le facteur $w$ : idem avec une boucle sur toutes les lettres à la fin.
- Divisible par $n$ en base 2 : états $0, \dots, n - 1$, $r \xrightarrow{b} (2r + b) \bmod n$, entrée et sortie 0 (standardiser pour exclure $\varepsilon$).
- Compter (exactement $k$ fois une lettre, parité de la longueur) : un état par valeur du compteur, plus P.
