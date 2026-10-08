---
title: "Ch. 3 — Piles et files"
---

# Chapitre 3 — Piles et files

=== "Version simplifiée"

    On définit d'abord pile et file comme des **types abstraits** (des
    comportements, sans implémentation), puis on les implémente avec ce qu'on sait
    déjà faire : tableaux, listes simples, listes ht.

    | | Pile (*stack*) | File (*queue*) |
    |---|----------------|----------------|
    | Principe | **LIFO** : *Last In, First Out* | **FIFO** : *First In, First Out* |
    | Image | pile d'assiettes : on dépose et on retire **au-dessus** | file d'attente : on arrive **à la fin**, on repart **au début** |
    | Ajouter | empiler, `push()` | enfiler, `enqueue()` |
    | Retirer | dépiler, `pop()` | défiler, `dequeue()` |
    | Consulter le prochain | `top()` | `top()` (ou `peek`) |
    | Vide ? / créer / afficher | `isEmptyStack()`, `createStack()`, `displayStack()` | `isEmptyQueue()`, `createQueue()`, `displayQueue()` |

    !!! piege "Ne pas inverser"
        **Pile = LIFO** (même extrémité pour entrer et sortir).
        **File = FIFO** (on entre d'un côté, on sort de l'autre).

    ## Du type abstrait au prototype

    Pour chaque opération, on remplit le tableau « a besoin de / modifie l'état ? /
    valeur attendue ? » ; il donne directement le prototype.

    | Opération | A besoin de | Modifie l'état ? | Valeur attendue | Prototype (pile de `int`) |
    |-----------|-------------|:----------------:|-----------------|---------------------------|
    | `isEmptyStack` | pile | non | vrai / faux | `int isEmptyStack(t_stack);` |
    | `displayStack` | pile | non | rien | `void displayStack(t_stack);` |
    | `push` | pile, valeur | **oui** | rien | `void push(t_stack *, int);` |
    | `pop` | pile | **oui** | valeur dépilée | `int pop(t_stack *);` |
    | `top` | pile | non | valeur consultée | `int top(t_stack);` |
    | `createStack` | rien | — | pile | `t_stack createStack(void);` |

    !!! methode "Lire un prototype"
        - « Modifie l'état » → paramètre **pointeur**.
        - Le **type de retour** de `pop` / `top` / `dequeue` est le type des éléments
          stockés : `int pop(t_stack *)` pour des entiers, `char pop(t_stack *)`
          pour des caractères. Le choix de `int` dans le cours n'a aucune importance
          sur l'algorithme.

    ## Les piles

    On empile et dépile **à la même extrémité**. Deux structures s'y prêtent :

    - la **liste chaînée**, en travaillant **au début** (tête) ;
    - le **tableau**, en travaillant **à la fin** (dernière case utilisée).

    ### Pile avec une liste chaînée

    ```c
    typedef t_list t_stacklist;   /* une pile EST une liste simple : on ne stocke que head */
    ```

    | Opération pile | Opération liste | Complexité |
    |----------------|-----------------|:----------:|
    | pile vide ? | liste vide ? (`head == NULL`) | $O(1)$ |
    | pile pleine ? | **jamais** (seule limite : la mémoire) | — |
    | `push` | ajout en tête (`addCell`) | $O(1)$ |
    | `pop` | retrait en tête + on garde la valeur | $O(1)$ |
    | `top` | valeur de la tête | $O(1)$ |

    ```c
    int pop(t_stacklist *p_stack)      /* la pile doit être non vide */
    {
        t_cell *temp = p_stack->head;
        int val = temp->value;          /* on garde la valeur... */
        p_stack->head = temp->next;     /* ...on décroche la tête... */
        free(temp);                     /* ...et on libère la cellule */
        return val;
    }
    ```

    ### Pile avec un tableau

    ```c
    #define NBMAX 50

    struct s_stacktab
    {
        int values[NBMAX];   /* int ou n'importe quel autre type */
        int nbElts;          /* taille logique = nombre de cases utilisées */
    };
    typedef struct s_stacktab t_stacktab;
    ```

    ```text
     values : [ 8 | 3 | 1 | ? | ? | … | ? ]      nbElts = 3
                0   1   2   3                    push écrit en values[nbElts]   (case 3)
                        ▲                        pop lit     values[nbElts-1] (case 2)
                  sommet de pile
    ```

    | Opération | Indice | Condition | Complexité |
    |-----------|--------|-----------|:----------:|
    | `push` | écrit dans `values[nbElts]` puis `nbElts++` | pile **non pleine** : `nbElts < NBMAX` | $O(1)$ |
    | `pop` | lit `values[nbElts - 1]` puis `nbElts--` | pile **non vide** : `nbElts > 0` | $O(1)$ |

    ```c
    int isEmptyStack(t_stacktab s)          /* ne modifie pas : par valeur */
    {
        return (s.nbElts == 0);
    }

    int pop(t_stacktab *p_stack)            /* modifie nbElts : pointeur */
    {
        int val, position;
        assert(p_stack->nbElts > 0);        /* exige une pile non vide */
        position = p_stack->nbElts;
        val = p_stack->values[position - 1];
        p_stack->nbElts = position - 1;
        return val;
    }
    ```

    Après un `pop`, la valeur est **toujours dans le tableau** : seule la taille
    logique a diminué, la case sera simplement réécrite au prochain `push`.

    ### Pile vide, pile pleine : qui vérifie ?

    `pop` sur une pile vide ou `push` sur une pile pleine n'ont pas de sens. Deux
    stratégies :

    === "Conseillée : vérifier avant l'appel"

        `pop()` **exige** une pile non vide (`assert` : erreur à l'exécution sinon).
        C'est à l'appelant de vérifier :

        ```c
        if (isEmptyStack(S))
        {
            /* pile vide : agir en conséquence */
        }
        else
        {
            int value = pop(&S);   /* pop() en toute sécurité */
        }
        ```

    === "Alternative : pop() vérifie et le dit"

        Retourner une valeur « spéciale » est un **piège** (impossible de la
        distinguer d'une vraie valeur de la pile). On retourne plutôt un booléen de
        succès, et la valeur par un paramètre pointeur :

        ```c
        int pop(t_stacktab *p_stack, int *p_val)
        {
            if (isEmptyStack(*p_stack))
            {
                return 0;                  /* rien à dépiler */
            }
            p_stack->nbElts = p_stack->nbElts - 1;
            *p_val = p_stack->values[p_stack->nbElts];
            return 1;                      /* une valeur a été récupérée */
        }
        ```

    ## Les files

    On ajoute à une extrémité et on retire à l'autre. Deux structures s'y prêtent :
    la **liste ht** et le **tableau avec deux indices**.

    ### File avec une liste ht

    Deux choix possibles :

    | Choix | Enfiler | Défiler | Verdict |
    |-------|---------|---------|---------|
    | 1. ajouter en tête, retirer en queue | $O(1)$ | $O(N)$ : il faut l'**avant-dernière** pour mettre à jour `tail` | à éviter |
    | 2. **ajouter en queue, retirer en tête** | $O(1)$ via `tail` | $O(1)$ | **le bon** |

    ```c
    typedef t_ht_list t_queue;
    ```

    - File vide = liste ht vide ; une file en liste n'est **jamais pleine**.
    - `enqueue` = ajout en queue de liste ht ; `dequeue` = retrait en tête (en
      remettant `tail` à `NULL` si la file devient vide) ; `top` = valeur de la tête.

    ### File avec un tableau : le buffer circulaire

    ```c
    #define NBMAX 50

    struct s_queuetab
    {
        int values[NBMAX];
        int first, last;   /* first : où défiler ; last : où enfiler */
    };
    typedef struct s_queuetab t_queuetab;
    ```

    - **File vide à la création** : `first = last = 0`.
    - **Enfiler** : on écrit dans la case `last`, puis `last++`.
    - **Défiler** : on lit la case `first`, puis `first++`.

    ```text
     enfiler 4, 8, 7 :     [ 4 | 8 | 7 | . | . ]     first = 0, last = 3
     défiler (→ 4) :       [ . | 8 | 7 | . | . ]     first = 1, last = 3
    ```

    !!! definition "Vide et pleine"
        - **Vide** : `first == last` (pas forcément 0 : après 5 enfilements et 5
          défilements, `first = last = 5`).
        - **Pleine** : `last - first == NBMAX` (c'est le **nombre d'éléments**, pas
          `last == NBMAX`).

    !!! piege "Le paradoxe de la file vide inutilisable"
        Avec `first = last = 50` et `NBMAX = 50`, la file est **vide**, mais on ne
        peut plus enfiler sans sortir du tableau. Solution : le **buffer
        circulaire**. `first` et `last` augmentent indéfiniment, et on accède aux
        cases **modulo la taille** :

        | | Indice réel |
        |---|---|
        | enfiler | `last % NBMAX` |
        | défiler | `first % NBMAX` |

        `last` compte les éléments enfilés depuis le début, `first` les éléments
        défilés ; `last - first` est donc le nombre d'éléments présents. Les
        conditions vide / pleine restent les mêmes.

    ```c
    void enqueue(t_queuetab *p_q, int val)   /* file non pleine */
    {
        p_q->values[p_q->last % NBMAX] = val;
        p_q->last = p_q->last + 1;
    }

    int dequeue(t_queuetab *p_q)             /* file non vide */
    {
        int val = p_q->values[p_q->first % NBMAX];
        p_q->first = p_q->first + 1;
        return val;
    }
    ```

    ## Tableau ou liste chaînée ?

    | Opération / caractéristique | Tableau | Liste simplement chaînée |
    |-----------------------------|---------|--------------------------|
    | Taille | fixe, limitée | virtuellement illimitée |
    | Mémoire | une partie non utilisée | juste le nécessaire |
    | Accéder à un élément | $O(1)$ | $O(N)$ |
    | Insérer au début | $O(N)$ (décaler) | $O(1)$ |
    | Insérer à la fin | $O(1)$ | $O(1)$ avec `tail` |
    | Insérer ailleurs (garder trié) | $O(N)$ | $O(N)$ |
    | Supprimer au début | $O(N)$ | $O(1)$ |
    | Supprimer à la fin | $O(1)$ | $O(N)$ |
    | Supprimer ailleurs | $O(N)$ | $O(N)$ |

    D'où les bons choix :

    | | Avec un tableau | Avec une liste |
    |---|-----------------|----------------|
    | **Pile** | travailler **à la fin** (`nbElts`) | travailler **en tête** (liste simple) |
    | **File** | **deux indices** `first` / `last` + modulo | **liste ht** : enfiler en queue, défiler en tête |

    Toutes ces opérations sont en $O(1)$.

=== "Version papier"

    CM 3 du support 2023-2024 (N. Flasque). Différences avec 2026-2027 : l'exemple de file stocke des `t_customer`, le buffer circulaire était laissé au TD, et la partie complexité (tri à bulles, O(N²)…) est à la fin de ce CM.

    [![CM 3 — Piles et files, diapo 1 : Page de titre](papier/ch3/p01.jpg){ loading=lazy .papier }](papier/ch3/p01.jpg)
    <p class="papier-legende">Page de titre · CM 3 — Piles et files, diapo 1</p>

    [![CM 3 — Piles et files, diapo 2 : Prérequis et objectifs](papier/ch3/p02.jpg){ loading=lazy .papier }](papier/ch3/p02.jpg)
    <p class="papier-legende">Prérequis et objectifs · CM 3 — Piles et files, diapo 2</p>

    [![CM 3 — Piles et files, diapo 3 : Piles : présentation](papier/ch3/p03.jpg){ loading=lazy .papier }](papier/ch3/p03.jpg)
    <p class="papier-legende">Piles : présentation · CM 3 — Piles et files, diapo 3</p>

    [![CM 3 — Piles et files, diapo 4 : Files : présentation](papier/ch3/p04.jpg){ loading=lazy .papier }](papier/ch3/p04.jpg)
    <p class="papier-legende">Files : présentation · CM 3 — Piles et files, diapo 4</p>

    [![CM 3 — Piles et files, diapo 5 : Piles et files : types abstraits](papier/ch3/p05.jpg){ loading=lazy .papier }](papier/ch3/p05.jpg)
    <p class="papier-legende">Piles et files : types abstraits · CM 3 — Piles et files, diapo 5</p>

    [![CM 3 — Piles et files, diapo 6 : Exemple pour une pile : comportements](papier/ch3/p06.jpg){ loading=lazy .papier }](papier/ch3/p06.jpg)
    <p class="papier-legende">Exemple pour une pile : comportements · CM 3 — Piles et files, diapo 6</p>

    [![CM 3 — Piles et files, diapo 7 : Étape suivante : des comportements aux prototypes](papier/ch3/p07.jpg){ loading=lazy .papier }](papier/ch3/p07.jpg)
    <p class="papier-legende">Étape suivante : des comportements aux prototypes · CM 3 — Piles et files, diapo 7</p>

    [![CM 3 — Piles et files, diapo 8 : Un prototype en algo, puis en C](papier/ch3/p08.jpg){ loading=lazy .papier }](papier/ch3/p08.jpg)
    <p class="papier-legende">Un prototype en algo, puis en C · CM 3 — Piles et files, diapo 8</p>

    [![CM 3 — Piles et files, diapo 9 : Pour aller plus loin : choisissons un type](papier/ch3/p09.jpg){ loading=lazy .papier }](papier/ch3/p09.jpg)
    <p class="papier-legende">Pour aller plus loin : choisissons un type · CM 3 — Piles et files, diapo 9</p>

    [![CM 3 — Piles et files, diapo 10 : Pour aller plus loin : choisissons un type (2)](papier/ch3/p10.jpg){ loading=lazy .papier }](papier/ch3/p10.jpg)
    <p class="papier-legende">Pour aller plus loin : choisissons un type (2) · CM 3 — Piles et files, diapo 10</p>

    [![CM 3 — Piles et files, diapo 11 : Piles : rappel](papier/ch3/p11.jpg){ loading=lazy .papier }](papier/ch3/p11.jpg)
    <p class="papier-legende">Piles : rappel · CM 3 — Piles et files, diapo 11</p>

    [![CM 3 — Piles et files, diapo 12 : Piles : travail à partir du schéma](papier/ch3/p12.jpg){ loading=lazy .papier }](papier/ch3/p12.jpg)
    <p class="papier-legende">Piles : travail à partir du schéma · CM 3 — Piles et files, diapo 12</p>

    [![CM 3 — Piles et files, diapo 13 : Piles : travail à partir du schéma (2)](papier/ch3/p13.jpg){ loading=lazy .papier }](papier/ch3/p13.jpg)
    <p class="papier-legende">Piles : travail à partir du schéma (2) · CM 3 — Piles et files, diapo 13</p>

    [![CM 3 — Piles et files, diapo 14 : Pile : rappel](papier/ch3/p14.jpg){ loading=lazy .papier }](papier/ch3/p14.jpg)
    <p class="papier-legende">Pile : rappel · CM 3 — Piles et files, diapo 14</p>

    [![CM 3 — Piles et files, diapo 15 : Pile et listes](papier/ch3/p15.jpg){ loading=lazy .papier }](papier/ch3/p15.jpg)
    <p class="papier-legende">Pile et listes · CM 3 — Piles et files, diapo 15</p>

    [![CM 3 — Piles et files, diapo 16 : Piles et listes](papier/ch3/p16.jpg){ loading=lazy .papier }](papier/ch3/p16.jpg)
    <p class="papier-legende">Piles et listes · CM 3 — Piles et files, diapo 16</p>

    [![CM 3 — Piles et files, diapo 17 : Piles et listes (2)](papier/ch3/p17.jpg){ loading=lazy .papier }](papier/ch3/p17.jpg)
    <p class="papier-legende">Piles et listes (2) · CM 3 — Piles et files, diapo 17</p>

    [![CM 3 — Piles et files, diapo 18 : Pile et tableaux](papier/ch3/p18.jpg){ loading=lazy .papier }](papier/ch3/p18.jpg)
    <p class="papier-legende">Pile et tableaux · CM 3 — Piles et files, diapo 18</p>

    [![CM 3 — Piles et files, diapo 19 : Pile et tableaux : illustration](papier/ch3/p19.jpg){ loading=lazy .papier }](papier/ch3/p19.jpg)
    <p class="papier-legende">Pile et tableaux : illustration · CM 3 — Piles et files, diapo 19</p>

    [![CM 3 — Piles et files, diapo 20 : Pile et tableaux : illustration (2)](papier/ch3/p20.jpg){ loading=lazy .papier }](papier/ch3/p20.jpg)
    <p class="papier-legende">Pile et tableaux : illustration (2) · CM 3 — Piles et files, diapo 20</p>

    [![CM 3 — Piles et files, diapo 21 : Pile et tableaux : illustration (3)](papier/ch3/p21.jpg){ loading=lazy .papier }](papier/ch3/p21.jpg)
    <p class="papier-legende">Pile et tableaux : illustration (3) · CM 3 — Piles et files, diapo 21</p>

    [![CM 3 — Piles et files, diapo 22 : Pile et tableaux : illustration (4)](papier/ch3/p22.jpg){ loading=lazy .papier }](papier/ch3/p22.jpg)
    <p class="papier-legende">Pile et tableaux : illustration (4) · CM 3 — Piles et files, diapo 22</p>

    [![CM 3 — Piles et files, diapo 23 : Pile : résumé](papier/ch3/p23.jpg){ loading=lazy .papier }](papier/ch3/p23.jpg)
    <p class="papier-legende">Pile : résumé · CM 3 — Piles et files, diapo 23</p>

    [![CM 3 — Piles et files, diapo 24 : Pile et tableau : éléments d'implémentation](papier/ch3/p24.jpg){ loading=lazy .papier }](papier/ch3/p24.jpg)
    <p class="papier-legende">Pile et tableau : éléments d'implémentation · CM 3 — Piles et files, diapo 24</p>

    [![CM 3 — Piles et files, diapo 25 : Pile et tableau : représentation du type](papier/ch3/p25.jpg){ loading=lazy .papier }](papier/ch3/p25.jpg)
    <p class="papier-legende">Pile et tableau : représentation du type · CM 3 — Piles et files, diapo 25</p>

    [![CM 3 — Piles et files, diapo 26 : isEmptyStack() et isFullStack()](papier/ch3/p26.jpg){ loading=lazy .papier }](papier/ch3/p26.jpg)
    <p class="papier-legende">isEmptyStack() et isFullStack() · CM 3 — Piles et files, diapo 26</p>

    [![CM 3 — Piles et files, diapo 27 : Fonction isEmptyStack()](papier/ch3/p27.jpg){ loading=lazy .papier }](papier/ch3/p27.jpg)
    <p class="papier-legende">Fonction isEmptyStack() · CM 3 — Piles et files, diapo 27</p>

    [![CM 3 — Piles et files, diapo 28 : Fonction isEmptyStack() (2)](papier/ch3/p28.jpg){ loading=lazy .papier }](papier/ch3/p28.jpg)
    <p class="papier-legende">Fonction isEmptyStack() (2) · CM 3 — Piles et files, diapo 28</p>

    [![CM 3 — Piles et files, diapo 29 : Fonction Dépiler – unstack()](papier/ch3/p29.jpg){ loading=lazy .papier }](papier/ch3/p29.jpg)
    <p class="papier-legende">Fonction Dépiler – unstack() · CM 3 — Piles et files, diapo 29</p>

    [![CM 3 — Piles et files, diapo 30 : Fonction Dépiler – unstack() - illustration](papier/ch3/p30.jpg){ loading=lazy .papier }](papier/ch3/p30.jpg)
    <p class="papier-legende">Fonction Dépiler – unstack() - illustration · CM 3 — Piles et files, diapo 30</p>

    [![CM 3 — Piles et files, diapo 31 : Fonction unstack()](papier/ch3/p31.jpg){ loading=lazy .papier }](papier/ch3/p31.jpg)
    <p class="papier-legende">Fonction unstack() · CM 3 — Piles et files, diapo 31</p>

    [![CM 3 — Piles et files, diapo 32 : Fonction unstack() (2)](papier/ch3/p32.jpg){ loading=lazy .papier }](papier/ch3/p32.jpg)
    <p class="papier-legende">Fonction unstack() (2) · CM 3 — Piles et files, diapo 32</p>

    [![CM 3 — Piles et files, diapo 33 : Implémentation](papier/ch3/p33.jpg){ loading=lazy .papier }](papier/ch3/p33.jpg)
    <p class="papier-legende">Implémentation · CM 3 — Piles et files, diapo 33</p>

    [![CM 3 — Piles et files, diapo 34 : A traiter en TD / TP](papier/ch3/p34.jpg){ loading=lazy .papier }](papier/ch3/p34.jpg)
    <p class="papier-legende">A traiter en TD / TP · CM 3 — Piles et files, diapo 34</p>

    [![CM 3 — Piles et files, diapo 35 : Files : rappel](papier/ch3/p35.jpg){ loading=lazy .papier }](papier/ch3/p35.jpg)
    <p class="papier-legende">Files : rappel · CM 3 — Piles et files, diapo 35</p>

    [![CM 3 — Piles et files, diapo 36 : Files](papier/ch3/p36.jpg){ loading=lazy .papier }](papier/ch3/p36.jpg)
    <p class="papier-legende">Files · CM 3 — Piles et files, diapo 36</p>

    [![CM 3 — Piles et files, diapo 37 : Exemple : file d'attente dans un magasin](papier/ch3/p37.jpg){ loading=lazy .papier }](papier/ch3/p37.jpg)
    <p class="papier-legende">Exemple : file d'attente dans un magasin · CM 3 — Piles et files, diapo 37</p>

    [![CM 3 — Piles et files, diapo 38 : Définition du type t_customer](papier/ch3/p38.jpg){ loading=lazy .papier }](papier/ch3/p38.jpg)
    <p class="papier-legende">Définition du type t_customer · CM 3 — Piles et files, diapo 38</p>

    [![CM 3 — Piles et files, diapo 39 : Représentation](papier/ch3/p39.jpg){ loading=lazy .papier }](papier/ch3/p39.jpg)
    <p class="papier-legende">Représentation · CM 3 — Piles et files, diapo 39</p>

    [![CM 3 — Piles et files, diapo 40 : Type t_cell](papier/ch3/p40.jpg){ loading=lazy .papier }](papier/ch3/p40.jpg)
    <p class="papier-legende">Type t_cell · CM 3 — Piles et files, diapo 40</p>

    [![CM 3 — Piles et files, diapo 41 : Type t_cell_cust](papier/ch3/p41.jpg){ loading=lazy .papier }](papier/ch3/p41.jpg)
    <p class="papier-legende">Type t_cell_cust · CM 3 — Piles et files, diapo 41</p>

    [![CM 3 — Piles et files, diapo 42 : Listes stockant des t_customer](papier/ch3/p42.jpg){ loading=lazy .papier }](papier/ch3/p42.jpg)
    <p class="papier-legende">Listes stockant des t_customer · CM 3 — Piles et files, diapo 42</p>

    [![CM 3 — Piles et files, diapo 43 : File stockant des t_customer](papier/ch3/p43.jpg){ loading=lazy .papier }](papier/ch3/p43.jpg)
    <p class="papier-legende">File stockant des t_customer · CM 3 — Piles et files, diapo 43</p>

    [![CM 3 — Piles et files, diapo 44 : Retour sur les t_ht_list](papier/ch3/p44.jpg){ loading=lazy .papier }](papier/ch3/p44.jpg)
    <p class="papier-legende">Retour sur les t_ht_list · CM 3 — Piles et files, diapo 44</p>

    [![CM 3 — Piles et files, diapo 45 : Option 1 : j'ajoute au début (head), je retire à la fin (tail)](papier/ch3/p45.jpg){ loading=lazy .papier }](papier/ch3/p45.jpg)
    <p class="papier-legende">Option 1 : j'ajoute au début (head), je retire à la fin (tail) · CM 3 — Piles et files, diapo 45</p>

    [![CM 3 — Piles et files, diapo 46 : Option 2 : j'ajoute à la fin (tail), je retire au début (head)](papier/ch3/p46.jpg){ loading=lazy .papier }](papier/ch3/p46.jpg)
    <p class="papier-legende">Option 2 : j'ajoute à la fin (tail), je retire au début (head) · CM 3 — Piles et files, diapo 46</p>

    [![CM 3 — Piles et files, diapo 47 : Files et listes](papier/ch3/p47.jpg){ loading=lazy .papier }](papier/ch3/p47.jpg)
    <p class="papier-legende">Files et listes · CM 3 — Piles et files, diapo 47</p>

    [![CM 3 — Piles et files, diapo 48 : Tableau stockant des t_customer](papier/ch3/p48.jpg){ loading=lazy .papier }](papier/ch3/p48.jpg)
    <p class="papier-legende">Tableau stockant des t_customer · CM 3 — Piles et files, diapo 48</p>

    [![CM 3 — Piles et files, diapo 49 : Pile stockant des t_customer](papier/ch3/p49.jpg){ loading=lazy .papier }](papier/ch3/p49.jpg)
    <p class="papier-legende">Pile stockant des t_customer · CM 3 — Piles et files, diapo 49</p>

    [![CM 3 — Piles et files, diapo 50 : File et tableau : représentation du type](papier/ch3/p50.jpg){ loading=lazy .papier }](papier/ch3/p50.jpg)
    <p class="papier-legende">File et tableau : représentation du type · CM 3 — Piles et files, diapo 50</p>

    [![CM 3 — Piles et files, diapo 51 : Créer une file vide](papier/ch3/p51.jpg){ loading=lazy .papier }](papier/ch3/p51.jpg)
    <p class="papier-legende">Créer une file vide · CM 3 — Piles et files, diapo 51</p>

    [![CM 3 — Piles et files, diapo 52 : Enfiler (ajouter) le premier élément](papier/ch3/p52.jpg){ loading=lazy .papier }](papier/ch3/p52.jpg)
    <p class="papier-legende">Enfiler (ajouter) le premier élément · CM 3 — Piles et files, diapo 52</p>

    [![CM 3 — Piles et files, diapo 53 : Illustration : enfilage](papier/ch3/p53.jpg){ loading=lazy .papier }](papier/ch3/p53.jpg)
    <p class="papier-legende">Illustration : enfilage · CM 3 — Piles et files, diapo 53</p>

    [![CM 3 — Piles et files, diapo 54 : Défiler (enlever l'élément mis en premier)](papier/ch3/p54.jpg){ loading=lazy .papier }](papier/ch3/p54.jpg)
    <p class="papier-legende">Défiler (enlever l'élément mis en premier) · CM 3 — Piles et files, diapo 54</p>

    [![CM 3 — Piles et files, diapo 55 : Illustration : défilage](papier/ch3/p55.jpg){ loading=lazy .papier }](papier/ch3/p55.jpg)
    <p class="papier-legende">Illustration : défilage · CM 3 — Piles et files, diapo 55</p>

    [![CM 3 — Piles et files, diapo 56 : Constat](papier/ch3/p56.jpg){ loading=lazy .papier }](papier/ch3/p56.jpg)
    <p class="papier-legende">Constat · CM 3 — Piles et files, diapo 56</p>

    [![CM 3 — Piles et files, diapo 57 : Pile vide avec un tableau](papier/ch3/p57.jpg){ loading=lazy .papier }](papier/ch3/p57.jpg)
    <p class="papier-legende">Pile vide avec un tableau · CM 3 — Piles et files, diapo 57</p>

    [![CM 3 — Piles et files, diapo 58 : Visualisation](papier/ch3/p58.jpg){ loading=lazy .papier }](papier/ch3/p58.jpg)
    <p class="papier-legende">Visualisation · CM 3 — Piles et files, diapo 58</p>

    [![CM 3 — Piles et files, diapo 59 : Un paradoxe apparent](papier/ch3/p59.jpg){ loading=lazy .papier }](papier/ch3/p59.jpg)
    <p class="papier-legende">Un paradoxe apparent · CM 3 — Piles et files, diapo 59</p>

    [![CM 3 — Piles et files, diapo 60 : Comment lever ce paradoxe ?](papier/ch3/p60.jpg){ loading=lazy .papier }](papier/ch3/p60.jpg)
    <p class="papier-legende">Comment lever ce paradoxe ? · CM 3 — Piles et files, diapo 60</p>

    [![CM 3 — Piles et files, diapo 61 : Complexité des opérations](papier/ch3/p61.jpg){ loading=lazy .papier }](papier/ch3/p61.jpg)
    <p class="papier-legende">Complexité des opérations · CM 3 — Piles et files, diapo 61</p>

    [![CM 3 — Piles et files, diapo 62 : Complexité des opérations : suite](papier/ch3/p62.jpg){ loading=lazy .papier }](papier/ch3/p62.jpg)
    <p class="papier-legende">Complexité des opérations : suite · CM 3 — Piles et files, diapo 62</p>

    [![CM 3 — Piles et files, diapo 63 : Complexité des opérations de tri](papier/ch3/p63.jpg){ loading=lazy .papier }](papier/ch3/p63.jpg)
    <p class="papier-legende">Complexité des opérations de tri · CM 3 — Piles et files, diapo 63</p>

    [![CM 3 — Piles et files, diapo 64 : Tri à bulles : suite](papier/ch3/p64.jpg){ loading=lazy .papier }](papier/ch3/p64.jpg)
    <p class="papier-legende">Tri à bulles : suite · CM 3 — Piles et files, diapo 64</p>

    [![CM 3 — Piles et files, diapo 65 : Complexité du tri à bulles](papier/ch3/p65.jpg){ loading=lazy .papier }](papier/ch3/p65.jpg)
    <p class="papier-legende">Complexité du tri à bulles · CM 3 — Piles et files, diapo 65</p>

    [![CM 3 — Piles et files, diapo 66 : Complexités usuelles](papier/ch3/p66.jpg){ loading=lazy .papier }](papier/ch3/p66.jpg)
    <p class="papier-legende">Complexités usuelles · CM 3 — Piles et files, diapo 66</p>

    [![CM 3 — Piles et files, diapo 67 : Complexités usuelles (2)](papier/ch3/p67.jpg){ loading=lazy .papier }](papier/ch3/p67.jpg)
    <p class="papier-legende">Complexités usuelles (2) · CM 3 — Piles et files, diapo 67</p>

    [![CM 3 — Piles et files, diapo 68 : Optimisation des algorithmes](papier/ch3/p68.jpg){ loading=lazy .papier }](papier/ch3/p68.jpg)
    <p class="papier-legende">Optimisation des algorithmes · CM 3 — Piles et files, diapo 68</p>

    [![CM 3 — Piles et files, diapo 69 : Implémentation : tableaux vs LSC](papier/ch3/p69.jpg){ loading=lazy .papier }](papier/ch3/p69.jpg)
    <p class="papier-legende">Implémentation : tableaux vs LSC · CM 3 — Piles et files, diapo 69</p>
