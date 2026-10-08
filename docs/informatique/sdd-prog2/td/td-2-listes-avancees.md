---
title: "TD 2 — Listes avancées"
---

# TD 2 — Listes avancées (file d'attente d'un manège)

Énoncé : `2627_FR_TD2-TI301.docx`. Rappels : [chapitre 2](../cours/chapitre-2-listes-avancees.md).
Chaque cellule représente un groupe de visiteurs dans la file d'un manège.

```c
typedef struct s_ht_list { t_cell *head; t_cell *tail; } t_ht_list;
```

## Thème 1 — File principale avec `head` et `tail`

### Exercice 1

**Q1.** Condition « file vide » ?

??? success "Correction"
    `myhtlist.head == NULL` (et alors `myhtlist.tail == NULL` aussi, si la liste
    est bien gérée). On peut l'écrire dans `int isEmptyHtList(t_ht_list l)`.

**Q2–Q3.** Premier groupe de 5 dans une file vide.

??? success "Correction"
    ```text
     myhtlist
    ┌──────┬──────┐
    │ head │ tail │
    └──┬───┴──┬───┘
       ▼      ▼
      [ 5 | NULL ]        head et tail pointent sur la MÊME cellule
    ```

    ```c
    t_ht_list myhtlist;
    t_cell *newcell;
    myhtlist = createHtList();      /* head = tail = NULL */
    newcell = createCell(5);
    myhtlist.head = newcell;
    myhtlist.tail = newcell;
    ```

**Q4–Q7.** Groupe prioritaire (valeur 2) ajouté **en tête**.

??? success "Correction"
    ```text
     head ──▶ [ 2 | @ ]──▶ [ 5 | NULL ] ◀── tail
    ```

    - **Différence avec la file vide** : la nouvelle cellule se raccroche
      devant l'ancienne première (`newcell->next = head`), et seule `head`
      change.
    - **Et `tail` ?** Elle **ne bouge pas** : le dernier groupe reste le même.
      Elle ne change que si la file était vide.

    ```c
    void addHeadHt(t_ht_list *p_list, int val)
    {
        t_cell *newcell = createCell(val);
        newcell->next = p_list->head;
        p_list->head = newcell;
        if (p_list->tail == NULL)        /* file vide : c'est aussi la dernière */
        {
            p_list->tail = newcell;
        }
    }
    ```

**Q8–Q9.** Ajout **en fin** d'un groupe de 7 : `AddTailHt()`.

??? success "Correction"
    ```text
     head ──▶ [ 2 | @ ]──▶ [ 5 | @ ]──▶ [ 7 | NULL ] ◀── tail
    ```

    La liste **peut être modifiée** : si elle est vide, `head` change ; et dans
    tous les cas `tail` change. Paramètre pointeur.

    ```c
    void addTailHt(t_ht_list *p_list, int val)
    {
        t_cell *newcell = createCell(val);
        if (p_list->tail == NULL)            /* file vide */
        {
            p_list->head = newcell;
            p_list->tail = newcell;
        }
        else
        {
            p_list->tail->next = newcell;    /* l'ancienne dernière pointe sur la nouvelle */
            p_list->tail = newcell;          /* la nouvelle devient la dernière */
        }
    }
    ```

    $O(1)$ grâce à `tail` : pas de parcours. C'est exactement l'erreur du
    [CC1 2023, Q9](annales-cc-2023.md#cc1-10-octobre-2023) : sans le test, la
    ligne `p_list->tail->next = …` plante sur une liste vide.

### Exercice 2 — Supprimer un groupe : `removeFromHt`

Le début est donné : `curr` et `prev` partent tous deux de `head`, et on avance
tant que `curr != NULL` et `curr->value != val`.

??? success "Correction"
    - **Q1** — Absent : `curr == NULL` à la sortie de la boucle.
    - **Q2.a** — Premier groupe : `curr == p_list->head` (on n'a pas bougé,
      `prev == curr`). On fait `p_list->head = curr->next`.
    - **Q2.b** — Premier **et** dernier : `curr == p_list->tail` aussi. La file
      devient vide : `p_list->tail = NULL` (et `head` vaut déjà `NULL`).
    - **Q3.a** — Sinon, la boucle a fait au moins un tour : à chaque tour,
      `prev` reçoit l'ancienne valeur de `curr` avant que `curr` avance, donc
      `prev` est bien la cellule juste avant `curr`.
    - **Q3.b** — On décroche : `prev->next = curr->next`.
    - **Q3.c** — Si c'était le dernier (`curr == p_list->tail`), la nouvelle
      dernière est `prev` : `p_list->tail = prev`.

    ```c
    void removeFromHt(t_ht_list *p_list, int val)
    {
        t_cell *curr, *prev;
        if (p_list->head != NULL)                    /* liste non vide */
        {
            curr = p_list->head;
            prev = curr;
            while ((curr != NULL) && (curr->value != val))
            {
                prev = curr;
                curr = curr->next;
            }
            if (curr == NULL)                        /* Q1 : absent */
            {
                return;
            }
            if (curr == p_list->head)                /* Q2.a : premier */
            {
                p_list->head = curr->next;
                if (p_list->tail == curr)            /* Q2.b : aussi le dernier */
                {
                    p_list->tail = NULL;
                }
            }
            else
            {
                prev->next = curr->next;             /* Q3.b */
                if (curr == p_list->tail)            /* Q3.c : c'était le dernier */
                {
                    p_list->tail = prev;
                }
            }
            free(curr);
        }
    }
    ```

## Thème 2 — Listes circulaires

### Exercices 3 et 4

??? success "Correction"
    Trois groupes 4, 7, 1 :

    ```text
                ┌─────────────────────────────────────┐
                ▼                                     │
     head ──▶ [ 4 | @ ]──▶ [ 7 | @ ]──▶ [ 1 | @ ]─────┘
                                           ▲
     tail ─────────────────────────────────┘
    ```

    **Exercice 4** — Dans une liste **vide**, la nouvelle cellule est première
    **et** dernière : elle doit pointer **sur elle-même**, et `head` **et**
    `tail` la désignent. Dans une liste non vide, elle pointe sur l'ancienne
    première, seule `head` change, et il faut mettre à jour `tail->next` (la
    dernière doit pointer sur la nouvelle première). Le code n'est pas le même,
    et le cas vide planterait sur `tail->next` (`tail` vaut `NULL`).

### Exercice 5 — `displayCircList()`

??? success "Correction"
    **Q1** — Vide : `clist.head == NULL`.

    **Q2** —

    ```c
    void displayCircList(t_circ_list clist)
    {
        t_cell *temp;
        temp = clist.head;
        if (clist.head != NULL)
        {
            while (temp != clist.tail)        /* ou : temp->next != clist.head */
            {
                printf("%d ", temp->value);
                temp = temp->next;
            }
            printf("%d\n", temp->value);      /* la dernière cellule */
        }
    }
    ```

    **Q3** — Si on voulait traiter la dernière dans la boucle, on s'arrêterait
    « de retour à la première » : `while (temp != clist.head)`. Mais **avant**
    le premier test, `temp` vaut justement `clist.head` (3.2) : la condition est
    fausse d'entrée et la boucle ne s'exécute **jamais** (3.3). D'où la forme
    « boucle jusqu'à la dernière, puis traiter la dernière à part ». (Une boucle
    `do … while (temp != clist.head)` résoudrait aussi le problème.)

### Exercice 6 — `removeCirc()`

??? success "Correction"
    **Q1** — La suppression peut modifier `head` (suppression en tête) ou
    `tail` (suppression en fin, ou de l'unique cellule) : il faut l'**adresse**
    de la liste.

    **Q2** — Une seule cellule : `p_list->head == p_list->tail` (liste non vide).

    **Q3** —

    ```c
    void removeCirc(t_circ_list *p_list, int val)
    {
        t_cell *curr, *prev;
        if (p_list->head != NULL)                              /* liste non vide */
        {
            if (p_list->head == p_list->tail)                  /* une seule cellule... */
            {
                if (p_list->head->value == val)                /* ...qui stocke val */
                {
                    free(p_list->head);
                    p_list->head = NULL;                       /* réinitialiser la liste */
                    p_list->tail = NULL;
                }
            }
            else
            {
                curr = p_list->head;                           /* on cherche la cellule */
                prev = curr;
                while ((curr != p_list->tail) && (curr->value != val))
                {
                    prev = curr;
                    curr = curr->next;
                }
                if (curr != p_list->tail)                      /* trouvée avant la fin */
                {
                    if (curr == p_list->head)                  /* c'est la première */
                    {
                        p_list->head = curr->next;
                        p_list->tail->next = p_list->head;
                    }
                    else
                    {
                        prev->next = curr->next;
                    }
                    free(curr);
                }
                else if (p_list->tail->value == val)           /* on vérifie la dernière */
                {
                    prev->next = curr->next;                   /* curr->next est head */
                    p_list->tail = prev;                       /* la nouvelle dernière */
                    free(curr);
                }
            }
        }
    }
    ```

    La boucle s'arrête **sur** la dernière sans tester sa valeur (condition
    `curr != tail`) : c'est pour ça qu'on la vérifie à part à la fin.

## Thème 3 — Listes doublement chaînées

### Exercice 7 — `addHeadDouble()`

??? success "Correction"
    **Q1** — Oui : `head` change, la liste est modifiée → pointeur.

    **Q2** — Non : les instructions du CM font `myDlist.head->prec = newdcell`,
    ce qui plante si la liste est vide (`head` vaut `NULL`).

    **Q3** —

    ```c
    void addHeadDouble(t_dbl_list *ptr_dlist, int val)
    {
        t_dcell *newdcell = createDCell(val);      /* prec = next = NULL */
        newdcell->next = ptr_dlist->head;
        if (ptr_dlist->head != NULL)               /* liste non vide */
        {
            ptr_dlist->head->prec = newdcell;
        }
        ptr_dlist->head = newdcell;
    }
    ```

### Exercice 8 — Suppressions et insertions aux extrémités

??? success "Correction"
    **Q1 — Suppression en tête** (liste non vide) :

    ```c
    t_dcell *temp = ptr_dlist->head;
    ptr_dlist->head = temp->next;            /* la 2e devient la tête */
    if (ptr_dlist->head != NULL)             /* il restait au moins une cellule */
    {
        ptr_dlist->head->prec = NULL;        /* elle n'a plus de précédente */
    }
    free(temp);
    ```

    **Q2 — Suppression en queue** (`temp` pointe sur la dernière) :

    ```c
    if (temp->prec != NULL)
    {
        temp->prec->next = NULL;             /* l'avant-dernière devient la dernière */
    }
    else
    {
        ptr_dlist->head = NULL;              /* c'était l'unique cellule */
    }
    free(temp);
    ```

    **Q3 — Insertion en tête d'une liste vide** :

    ```c
    newdcell->prec = NULL;
    newdcell->next = NULL;                   /* déjà fait par createDCell */
    ptr_dlist->head = newdcell;
    ```

    **Q4 — Insertion en tête d'une liste non vide** : c'est le cas général de
    `addHeadDouble()` (exercice 7) :

    ```c
    newdcell->next = ptr_dlist->head;
    ptr_dlist->head->prec = newdcell;
    ptr_dlist->head = newdcell;
    ```
