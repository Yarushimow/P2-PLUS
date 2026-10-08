---
title: "Ch. 2 — Listes avancées"
---

# Chapitre 2 — Listes avancées

=== "Version simplifiée"

    Trois variantes de la liste simple, chacune pour un besoin précis :

    | Variante | Ce qu'elle ajoute | Avantage | Coût |
    |----------|-------------------|----------|------|
    | Liste **ht** (*head and tail*) | un pointeur `tail` sur la dernière cellule | ajout en fin en $O(1)$ | un pointeur de plus à tenir à jour |
    | Liste **circulaire** | la dernière cellule pointe sur la première | représenter des phénomènes cycliques | plus de `NULL` pour détecter la fin |
    | Liste **doublement chaînée** | chaque cellule pointe aussi sur la précédente | parcours dans les deux sens | un pointeur de plus par cellule |

    ## Liste avec tête et queue : `t_ht_list`

    ```c
    typedef struct s_ht_list
    {
        t_cell *head;   /* adresse de la première cellule */
        t_cell *tail;   /* adresse de la dernière cellule */
    } t_ht_list;
    ```

    ```text
     myhtlist
    ┌──────┬──────┐
    │ head │ tail │
    └──┬───┴───┬──┘
       │       └──────────────────────────────┐
       ▼                                      ▼
     [ 1 | @ ]──▶ [ 6 | @ ]──▶ [ 9 | @ ]──▶ [ 12 | NULL ]
    ```

    - **Liste vide** : `head` **et** `tail` valent `NULL`. On l'obtient avec
      `t_ht_list createHtList();` utilisée ainsi : `myhtlist = createHtList();`.
    - **Parcours** : uniquement à partir de `head`, et dans un seul sens.
    - **Chaînages** : en tête (comme une liste simple) **et** en queue, via `tail`.

    !!! theoreme "Quand `head` et `tail` changent-ils ?"
        | Opération | `head` | `tail` |
        |-----------|:------:|:------:|
        | Ajout en tête, liste **vide** | oui | **oui** (la nouvelle est aussi la dernière) |
        | Ajout en tête, liste non vide | oui | non |
        | Ajout en queue, liste **vide** | **oui** | oui |
        | Ajout en queue, liste non vide | non | oui |
        | Suppression de la dernière cellule | non (sauf si c'était l'unique) | oui |
        | Suppression de l'unique cellule | oui → `NULL` | oui → `NULL` |

        Dans tous les cas, le paramètre est un `t_ht_list *`.

    ### Insertion dans une liste ht triée

    On veut insérer une valeur en gardant la liste triée par ordre croissant. Trois
    cas : liste vide ; insertion avant la fin ; insertion à la fin. On parcourt avec
    **deux pointeurs** : `temp` (cellule courante) et `prev` (la précédente), car on
    insère **avant** `temp` et on ne peut pas revenir en arrière dans une liste
    simplement chaînée.

    ```text
     insérer 4 (newcell) :

     avant :  [ 1 ]──▶[ 6 ]──▶[ 9 ]──▶ NULL
                ▲       ▲
               prev    temp            (on s'arrête : 6 n'est pas < 4)

     après :  [ 1 ]──▶[ 4 ]──▶[ 6 ]──▶[ 9 ]──▶ NULL
                    prev->next = newcell;   newcell->next = temp;
    ```

    ```c
    void insertOrderedHtList(t_ht_list *ptr_list, int val)
    {
        t_cell *newcell, *prev, *temp;
        newcell = createCell(val);

        if (isEmptyHtList(*ptr_list) == 1)          /* cas 1 : liste vide */
        {
            ptr_list->head = newcell;
            ptr_list->tail = newcell;
        }
        else
        {
            temp = ptr_list->head;
            prev = temp;
            while ((temp != NULL) && (temp->value < newcell->value))
            {
                prev = temp;                         /* on « sauvegarde » temp */
                temp = temp->next;                   /* avant de le déplacer */
            }
            if (temp == ptr_list->head)              /* cas particulier : insertion en tête */
            {                                        /* (temp n'a pas bougé : prev == temp) */
                newcell->next = ptr_list->head;
                ptr_list->head = newcell;
            }
            else                                     /* au milieu ou à la fin */
            {
                prev->next = newcell;
                newcell->next = temp;
                if (temp == NULL)                    /* on a inséré à la fin */
                {
                    ptr_list->tail = newcell;
                }
            }
        }
    }
    ```

    !!! piege "Le cas « insertion en tête » oublié"
        Si la valeur est plus petite que la première (ex. $-3$), la boucle ne
        tourne pas : `prev == temp == head`. Sans le test, on écrirait
        `prev->next = newcell` puis `newcell->next = temp`, c'est-à-dire une
        boucle `head → newcell → head` et `head` qui ne change pas. On détecte ce
        cas par `temp == ptr_list->head` (ou `prev == temp`).

    ## Listes circulaires

    La dernière cellule pointe sur **la première** au lieu de `NULL`.

    ```c
    typedef t_ht_list t_circ_list;   /* même structure que la liste ht */
    ```

    ```text
                ┌────────────────────────────────────┐
                ▼                                    │
     head ──▶ [ 4 | @ ]──▶ [ 7 | @ ]──▶ [ 1 | @ ]────┘
                                           ▲
     tail ─────────────────────────────────┘
    ```

    - **Vide** : `head == NULL` (et `tail == NULL`).
    - **Une seule cellule** : `head == tail`, et la cellule pointe **sur elle-même**.

    !!! definition "Pourquoi garder `tail` alors que la dernière pointe déjà sur la première ?"
        Pour l'ajout en tête. La première cellule change, donc la dernière doit
        être mise à jour pour pointer sur la nouvelle première. Sans `tail`, il
        faudrait **parcourir toute la liste** ($O(N)$, imaginer 50 000 cellules)
        pour la trouver. Avec `tail`, c'est $O(1)$.

    !!! theoreme "La nouvelle condition de fin"
        Une liste circulaire n'a pas de fin : le test `temp == NULL` n'a plus de
        sens. Il devient, dans la plupart des cas :

        ```c
        temp->next == mycirclist.head    /* la suivante est la première */
        /* ou, de façon équivalente : temp == mycirclist.tail */
        ```

    ### Chaînage en tête

    === "Liste non vide"

        ```c
        newcell->next = mycirclist.head;   /* la suivante de la nouvelle = l'ancienne première */
        mycirclist.head = newcell;         /* la nouvelle devient la première */
        mycirclist.tail->next = newcell;   /* la dernière pointe sur la nouvelle première */
        ```

    === "Liste vide"

        ```c
        newcell->next = newcell;           /* elle est première ET dernière : elle pointe sur elle-même */
        mycirclist.head = newcell;
        mycirclist.tail = newcell;
        ```

    Le chaînage en queue suit le même principe (traité en
    [TD 2](../td/td-2-listes-avancees.md)) : la différence avec l'ajout en tête est
    qu'on déplace `tail` au lieu de `head`.

    ### Supprimer une cellule

    Si la liste est vide, on ne fait rien. Sinon on cherche la cellule avec `temp`
    et `prev` ; si elle n'existe pas, on ne fait rien. Si elle existe :

    | Cas | Actions |
    |-----|---------|
    | **Unique cellule** (`head == tail`) | on la libère, `head` et `tail` repassent à `NULL` |
    | **En tête** | la nouvelle première est la suivante de l'ancienne ; `tail->next` pointe sur cette nouvelle première |
    | **Au milieu** | `prev->next = temp->next` |
    | **En dernier** | `prev->next = temp->next` **et** `tail = prev` |

    !!! piege "La méthode « en tête » ne marche pas pour une seule cellule"
        La suivante de l'unique cellule est elle-même : « la nouvelle première est
        la suivante » ne change rien, et libérer la cellule laisse `head` et `tail`
        pointer sur une zone libérée. D'où le cas à part, détecté par
        `head == tail`.

    ## Listes doublement chaînées

    Chaque cellule pointe sur la suivante **et** sur la précédente : c'est un
    nouveau type de cellule.

    ```c
    struct s_dcell
    {
        struct s_dcell *prec;
        int value;
        struct s_dcell *next;
    };
    typedef struct s_dcell t_dcell;

    struct s_dbl_list
    {
        t_dcell *head;
    };
    typedef struct s_dbl_list t_dbl_list;
    ```

    ```text
     head ──▶ [ NULL | 1 | @ ] ⇄ [ @ | 2 | @ ] ⇄ [ @ | 3 | NULL ]
                prec  value next

     ⇄ : next pointe vers la droite, prec vers la gauche
    ```

    `createDCell(val)` crée une cellule dont `prec` et `next` valent `NULL`.

    ### Insertion en tête

    ```c
    newdcell->next = myDlist.head;        /* la suivante de la nouvelle = l'actuelle première */
    myDlist.head->prec = newdcell;        /* la précédente de l'actuelle première = la nouvelle */
    myDlist.head = newdcell;              /* la nouvelle devient la tête */
    ```

    La 2ᵉ ligne plante si la liste est vide (`myDlist.head` vaut `NULL`) : la
    version complète est en [TD 2](../td/td-2-listes-avancees.md#exercice-7-addheaddouble).

    ### Plus besoin de `prev`

    Dans une liste double, `temp->prec` **joue le rôle de `prev`**.

    === "Suppression (cas général)"

        ```c
        temp->prec->next = temp->next;   /* chaînage avant  : la précédente saute temp */
        temp->next->prec = temp->prec;   /* chaînage arrière : la suivante remonte sur la précédente */
        free(temp);
        ```
        Valable seulement si `temp->prec != NULL` (pas en tête) et
        `temp->next != NULL` (pas en fin).

    === "Insertion avant `temp` (cas général)"

        ```c
        temp->prec->next = newdcell;     /* la précédente de temp pointe sur la nouvelle */
        newdcell->prec = temp->prec;     /* la nouvelle remonte sur la précédente de temp */
        newdcell->next = temp;           /* la nouvelle pointe sur temp */
        temp->prec = newdcell;           /* temp remonte sur la nouvelle (EN DERNIER) */
        ```

    !!! piege "Quatre pointeurs à raccrocher"
        Une insertion modifie **4** pointeurs, une suppression **2**. Faire un
        schéma avec les flèches à modifier dans une autre couleur, et vérifier que
        `temp->prec` n'est pas écrasé avant d'avoir été utilisé.

    ### Et si on bouclait ?

    Liste **doublement chaînée circulaire** : la suivante de la dernière est la
    première, la précédente de la première est la dernière.

    - Pas besoin de `tail` : la dernière est `head->prec`.
    - Insertions en tête et en queue en $O(1)$, parcours dans les deux sens.
    - Mais chaque cellule stocke 2 pointeurs : ≈ 12 octets au lieu de 8 (valeur
      4 octets + pointeurs de 4 octets dans l'exemple du cours).

    ## Récapitulatif des complexités

    | Opération | Liste simple | Liste ht | Circulaire (avec `tail`) | Double |
    |-----------|:------------:|:--------:|:------------------------:|:------:|
    | Ajout en tête | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
    | Ajout en fin | $O(N)$ | $O(1)$ | $O(1)$ | $O(N)$ ($O(1)$ si circulaire) |
    | Suppression en tête | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
    | Suppression en fin | $O(N)$ | $O(N)$ (il faut l'avant-dernière) | $O(N)$ | $O(N)$ ($O(1)$ si circulaire) |
    | Recherche, insertion triée | $O(N)$ | $O(N)$ | $O(N)$ | $O(N)$ |

=== "Version papier"

    CM 2 du support 2023-2024 (N. Flasque). Le contenu 2026-2027 est le même (listes ht, circulaires, doublement chaînées).

    [![CM 2 — Listes avancées, diapo 1 : Page de titre](papier/ch2/p01.jpg){ loading=lazy .papier }](papier/ch2/p01.jpg)
    <p class="papier-legende">Page de titre · CM 2 — Listes avancées, diapo 1</p>

    [![CM 2 — Listes avancées, diapo 2 : Objectifs](papier/ch2/p02.jpg){ loading=lazy .papier }](papier/ch2/p02.jpg)
    <p class="papier-legende">Objectifs · CM 2 — Listes avancées, diapo 2</p>

    [![CM 2 — Listes avancées, diapo 3 : Autres types de liste](papier/ch2/p03.jpg){ loading=lazy .papier }](papier/ch2/p03.jpg)
    <p class="papier-legende">Autres types de liste · CM 2 — Listes avancées, diapo 3</p>

    [![CM 2 — Listes avancées, diapo 4 : Liste avec un pointeur repérant la première et la dernière cellule](papier/ch2/p04.jpg){ loading=lazy .papier }](papier/ch2/p04.jpg)
    <p class="papier-legende">Liste avec un pointeur repérant la première et la dernière cellule · CM 2 — Listes avancées, diapo 4</p>

    [![CM 2 — Listes avancées, diapo 5 : Visualisation et initialisation](papier/ch2/p05.jpg){ loading=lazy .papier }](papier/ch2/p05.jpg)
    <p class="papier-legende">Visualisation et initialisation · CM 2 — Listes avancées, diapo 5</p>

    [![CM 2 — Listes avancées, diapo 6 : Parcours, chaînage, insertion, suppression](papier/ch2/p06.jpg){ loading=lazy .papier }](papier/ch2/p06.jpg)
    <p class="papier-legende">Parcours, chaînage, insertion, suppression · CM 2 — Listes avancées, diapo 6</p>

    [![CM 2 — Listes avancées, diapo 7 : Insertion dans une t_ht_list](papier/ch2/p07.jpg){ loading=lazy .papier }](papier/ch2/p07.jpg)
    <p class="papier-legende">Insertion dans une t_ht_list · CM 2 — Listes avancées, diapo 7</p>

    [![CM 2 — Listes avancées, diapo 8 : Insertion dans une t_ht_list (2)](papier/ch2/p08.jpg){ loading=lazy .papier }](papier/ch2/p08.jpg)
    <p class="papier-legende">Insertion dans une t_ht_list (2) · CM 2 — Listes avancées, diapo 8</p>

    [![CM 2 — Listes avancées, diapo 9 : Illustration](papier/ch2/p09.jpg){ loading=lazy .papier }](papier/ch2/p09.jpg)
    <p class="papier-legende">Illustration · CM 2 — Listes avancées, diapo 9</p>

    [![CM 2 — Listes avancées, diapo 10 : Illustration - 2](papier/ch2/p10.jpg){ loading=lazy .papier }](papier/ch2/p10.jpg)
    <p class="papier-legende">Illustration - 2 · CM 2 — Listes avancées, diapo 10</p>

    [![CM 2 — Listes avancées, diapo 11 : Illustration - 3](papier/ch2/p11.jpg){ loading=lazy .papier }](papier/ch2/p11.jpg)
    <p class="papier-legende">Illustration - 3 · CM 2 — Listes avancées, diapo 11</p>

    [![CM 2 — Listes avancées, diapo 12 : Illustration - 4](papier/ch2/p12.jpg){ loading=lazy .papier }](papier/ch2/p12.jpg)
    <p class="papier-legende">Illustration - 4 · CM 2 — Listes avancées, diapo 12</p>

    [![CM 2 — Listes avancées, diapo 13 : Synthèse dans une fonction](papier/ch2/p13.jpg){ loading=lazy .papier }](papier/ch2/p13.jpg)
    <p class="papier-legende">Synthèse dans une fonction · CM 2 — Listes avancées, diapo 13</p>

    [![CM 2 — Listes avancées, diapo 14 : Synthèse dans une fonction (2)](papier/ch2/p14.jpg){ loading=lazy .papier }](papier/ch2/p14.jpg)
    <p class="papier-legende">Synthèse dans une fonction (2) · CM 2 — Listes avancées, diapo 14</p>

    [![CM 2 — Listes avancées, diapo 15 : Synthèse dans une fonction (3)](papier/ch2/p15.jpg){ loading=lazy .papier }](papier/ch2/p15.jpg)
    <p class="papier-legende">Synthèse dans une fonction (3) · CM 2 — Listes avancées, diapo 15</p>

    [![CM 2 — Listes avancées, diapo 16 : Synthèse dans une fonction (4)](papier/ch2/p16.jpg){ loading=lazy .papier }](papier/ch2/p16.jpg)
    <p class="papier-legende">Synthèse dans une fonction (4) · CM 2 — Listes avancées, diapo 16</p>

    [![CM 2 — Listes avancées, diapo 17 : Synthèse dans une fonction (5)](papier/ch2/p17.jpg){ loading=lazy .papier }](papier/ch2/p17.jpg)
    <p class="papier-legende">Synthèse dans une fonction (5) · CM 2 — Listes avancées, diapo 17</p>

    [![CM 2 — Listes avancées, diapo 18 : Visualisation avec C Tutor](papier/ch2/p18.jpg){ loading=lazy .papier }](papier/ch2/p18.jpg)
    <p class="papier-legende">Visualisation avec C Tutor · CM 2 — Listes avancées, diapo 18</p>

    [![CM 2 — Listes avancées, diapo 19 : Les listes chaînées circulaires](papier/ch2/p19.jpg){ loading=lazy .papier }](papier/ch2/p19.jpg)
    <p class="papier-legende">Les listes chaînées circulaires · CM 2 — Listes avancées, diapo 19</p>

    [![CM 2 — Listes avancées, diapo 20 : Définition de la structure](papier/ch2/p20.jpg){ loading=lazy .papier }](papier/ch2/p20.jpg)
    <p class="papier-legende">Définition de la structure · CM 2 — Listes avancées, diapo 20</p>

    [![CM 2 — Listes avancées, diapo 21 : Une liste simple ne suffirait pas ?](papier/ch2/p21.jpg){ loading=lazy .papier }](papier/ch2/p21.jpg)
    <p class="papier-legende">Une liste simple ne suffirait pas ? · CM 2 — Listes avancées, diapo 21</p>

    [![CM 2 — Listes avancées, diapo 22 : Illustration (2)](papier/ch2/p22.jpg){ loading=lazy .papier }](papier/ch2/p22.jpg)
    <p class="papier-legende">Illustration (2) · CM 2 — Listes avancées, diapo 22</p>

    [![CM 2 — Listes avancées, diapo 23 : Illustration (3)](papier/ch2/p23.jpg){ loading=lazy .papier }](papier/ch2/p23.jpg)
    <p class="papier-legende">Illustration (3) · CM 2 — Listes avancées, diapo 23</p>

    [![CM 2 — Listes avancées, diapo 24 : Chaînage en tête](papier/ch2/p24.jpg){ loading=lazy .papier }](papier/ch2/p24.jpg)
    <p class="papier-legende">Chaînage en tête · CM 2 — Listes avancées, diapo 24</p>

    [![CM 2 — Listes avancées, diapo 25 : Cas d'une liste non vide](papier/ch2/p25.jpg){ loading=lazy .papier }](papier/ch2/p25.jpg)
    <p class="papier-legende">Cas d'une liste non vide · CM 2 — Listes avancées, diapo 25</p>

    [![CM 2 — Listes avancées, diapo 26 : Cas d'une liste vide](papier/ch2/p26.jpg){ loading=lazy .papier }](papier/ch2/p26.jpg)
    <p class="papier-legende">Cas d'une liste vide · CM 2 — Listes avancées, diapo 26</p>

    [![CM 2 — Listes avancées, diapo 27 : Chaînage en queue](papier/ch2/p27.jpg){ loading=lazy .papier }](papier/ch2/p27.jpg)
    <p class="papier-legende">Chaînage en queue · CM 2 — Listes avancées, diapo 27</p>

    [![CM 2 — Listes avancées, diapo 28 : Supprimer une cellule dans une liste circulaire](papier/ch2/p28.jpg){ loading=lazy .papier }](papier/ch2/p28.jpg)
    <p class="papier-legende">Supprimer une cellule dans une liste circulaire · CM 2 — Listes avancées, diapo 28</p>

    [![CM 2 — Listes avancées, diapo 29 : Supprimer une cellule dans une liste circulaire (2)](papier/ch2/p29.jpg){ loading=lazy .papier }](papier/ch2/p29.jpg)
    <p class="papier-legende">Supprimer une cellule dans une liste circulaire (2) · CM 2 — Listes avancées, diapo 29</p>

    [![CM 2 — Listes avancées, diapo 30 : Supprimer une cellule dans une liste circulaire (3)](papier/ch2/p30.jpg){ loading=lazy .papier }](papier/ch2/p30.jpg)
    <p class="papier-legende">Supprimer une cellule dans une liste circulaire (3) · CM 2 — Listes avancées, diapo 30</p>

    [![CM 2 — Listes avancées, diapo 31 : Supprimer l'unique cellule d'une liste circulaire](papier/ch2/p31.jpg){ loading=lazy .papier }](papier/ch2/p31.jpg)
    <p class="papier-legende">Supprimer l'unique cellule d'une liste circulaire · CM 2 — Listes avancées, diapo 31</p>

    [![CM 2 — Listes avancées, diapo 32 : Supprimer une autre cellule de la liste](papier/ch2/p32.jpg){ loading=lazy .papier }](papier/ch2/p32.jpg)
    <p class="papier-legende">Supprimer une autre cellule de la liste · CM 2 — Listes avancées, diapo 32</p>

    [![CM 2 — Listes avancées, diapo 33 : Supprimer la dernière cellule](papier/ch2/p33.jpg){ loading=lazy .papier }](papier/ch2/p33.jpg)
    <p class="papier-legende">Supprimer la dernière cellule · CM 2 — Listes avancées, diapo 33</p>

    [![CM 2 — Listes avancées, diapo 34 : Les listes doublement chaînées](papier/ch2/p34.jpg){ loading=lazy .papier }](papier/ch2/p34.jpg)
    <p class="papier-legende">Les listes doublement chaînées · CM 2 — Listes avancées, diapo 34</p>

    [![CM 2 — Listes avancées, diapo 35 : La structure de liste associée](papier/ch2/p35.jpg){ loading=lazy .papier }](papier/ch2/p35.jpg)
    <p class="papier-legende">La structure de liste associée · CM 2 — Listes avancées, diapo 35</p>

    [![CM 2 — Listes avancées, diapo 36 : Création d'une cellule 'double'](papier/ch2/p36.jpg){ loading=lazy .papier }](papier/ch2/p36.jpg)
    <p class="papier-legende">Création d'une cellule 'double' · CM 2 — Listes avancées, diapo 36</p>

    [![CM 2 — Listes avancées, diapo 37 : Insertion d'une cellule double en tête de liste](papier/ch2/p37.jpg){ loading=lazy .papier }](papier/ch2/p37.jpg)
    <p class="papier-legende">Insertion d'une cellule double en tête de liste · CM 2 — Listes avancées, diapo 37</p>

    [![CM 2 — Listes avancées, diapo 38 : Suite](papier/ch2/p38.jpg){ loading=lazy .papier }](papier/ch2/p38.jpg)
    <p class="papier-legende">Suite · CM 2 — Listes avancées, diapo 38</p>

    [![CM 2 — Listes avancées, diapo 39 : Insertion et suppression dans une liste double](papier/ch2/p39.jpg){ loading=lazy .papier }](papier/ch2/p39.jpg)
    <p class="papier-legende">Insertion et suppression dans une liste double · CM 2 — Listes avancées, diapo 39</p>

    [![CM 2 — Listes avancées, diapo 40 : Schéma : cas général de suppression](papier/ch2/p40.jpg){ loading=lazy .papier }](papier/ch2/p40.jpg)
    <p class="papier-legende">Schéma : cas général de suppression · CM 2 — Listes avancées, diapo 40</p>

    [![CM 2 — Listes avancées, diapo 41 : Suppression en tête et en queue](papier/ch2/p41.jpg){ loading=lazy .papier }](papier/ch2/p41.jpg)
    <p class="papier-legende">Suppression en tête et en queue · CM 2 — Listes avancées, diapo 41</p>

    [![CM 2 — Listes avancées, diapo 42 : Schéma : cas général d'insertion](papier/ch2/p42.jpg){ loading=lazy .papier }](papier/ch2/p42.jpg)
    <p class="papier-legende">Schéma : cas général d'insertion · CM 2 — Listes avancées, diapo 42</p>

    [![CM 2 — Listes avancées, diapo 43 : Insertion (2)](papier/ch2/p43.jpg){ loading=lazy .papier }](papier/ch2/p43.jpg)
    <p class="papier-legende">Insertion (2) · CM 2 — Listes avancées, diapo 43</p>

    [![CM 2 — Listes avancées, diapo 44 : Insertion (3)](papier/ch2/p44.jpg){ loading=lazy .papier }](papier/ch2/p44.jpg)
    <p class="papier-legende">Insertion (3) · CM 2 — Listes avancées, diapo 44</p>

    [![CM 2 — Listes avancées, diapo 45 : Insertion en tête et en queue](papier/ch2/p45.jpg){ loading=lazy .papier }](papier/ch2/p45.jpg)
    <p class="papier-legende">Insertion en tête et en queue · CM 2 — Listes avancées, diapo 45</p>
