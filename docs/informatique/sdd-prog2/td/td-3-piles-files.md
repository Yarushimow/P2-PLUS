---
title: "TD 3 — Piles et files"
---

# TD 3 — Piles et files

Énoncé : `2627_FR_TD3-TI301.docx`. Rappels : [chapitre 3](../cours/chapitre-3-piles-files.md).

!!! tip "Exercices ciblés pour le CE du 3 octobre"
    L'exercice 2 (labyrinthe) et les implémentations de file (exercice 4).

## Thème 1 — Fonctions de la pile

### Exercice 1 — Complément de cours

**Partie I — Pile en liste chaînée** (`t_stacklist` = `t_std_list`).

??? success "Correction"
    **Q1 — `pop()`** (pile non vide) : on retire la cellule de **tête** en
    gardant sa valeur.

    ```c
    int pop(t_stacklist *p_stack)
    {
        t_cell *temp = p_stack->head;
        int val = temp->value;
        p_stack->head = temp->next;
        free(temp);
        return val;
    }
    ```

    **Q2 — `push()`** est l'**ajout en tête** de liste (`addCell` du TD 1) :
    une pile en liste empile et dépile au même endroit, la tête, qui est la
    seule extrémité accessible en $O(1)$ dans une liste simple.

**Partie II — Pile en tableau** (`t_stacktab` : `values[NBMAX]` et `nbElts`).

??? success "Correction"
    ```c
    int pop(t_stacktab *p_stack)               /* pile non vide */
    {
        p_stack->nbElts = p_stack->nbElts - 1;
        return p_stack->values[p_stack->nbElts];   /* dernière case utilisée */
    }

    void push(t_stacktab *p_stack, int val)    /* pile non pleine : nbElts < NBMAX */
    {
        p_stack->values[p_stack->nbElts] = val;    /* prochaine case libre */
        p_stack->nbElts = p_stack->nbElts + 1;
    }
    ```

### Exercice 2 — Retour arrière dans un labyrinthe

Pile `path` de `t_position` ; son sommet est la position actuelle. Fonctions
disponibles : `push()`, `pop()`, `top()`, `isEmptyStack()`, `createStack()`.

**Q1.** SDDCode propose `pop(&path);` sans stocker la valeur. Quelle note ?

??? success "Correction"
    **Environ 7/10.** C'est correct : en C on peut ignorer la valeur de retour
    d'une fonction, et dépiler revient bien à reculer d'une case dans le chemin.
    Mais il manque la précaution essentielle : `pop()` **exige une pile non
    vide**. Il faut vérifier `!isEmptyStack(path)` avant (sinon erreur à
    l'exécution, ou dépassement de tableau). Et si on veut savoir *d'où* on
    revient (pour marquer la case comme impasse), il faut garder la valeur.

**Q2.** Revenir en arrière jusqu'à une position avec un voisin non visité ;
retourner 1 si on en trouve une, 0 si la pile se vide.

??? success "Correction"
    ```c
    int backtrack(t_stack *p_path)
    {
        while (!isEmptyStack(*p_path))
        {
            if (hasUnvisitedNeighbour(top(*p_path)))
            {
                return 1;            /* on repart d'ici : la position reste au sommet */
            }
            pop(p_path);             /* impasse : on recule d'une case */
        }
        return 0;                    /* revenu avant l'entrée : pas de sortie */
    }
    ```

    On **consulte** avec `top()` avant de dépiler : la bonne position doit
    rester au sommet, puisque c'est la position actuelle.

**Q3.** Afficher le chemin, de la position actuelle jusqu'à l'entrée.

??? success "Correction"
    La fonction ne doit **pas** modifier la pile (au final). Mais pour lire une
    pile, on n'a que `top()` et `pop()` : on est obligé de la vider puis de la
    reconstruire, d'où le pointeur.

    === "Itérative (pile temporaire)"

        ```c
        void displayPath(t_stack *p_path)
        {
            t_stack temp = createStack();
            t_position pos;

            while (!isEmptyStack(*p_path))      /* sommet = position actuelle */
            {
                pos = pop(p_path);
                printf("(%d, %d) ", pos.x, pos.y);
                push(&temp, pos);               /* on garde de côté */
            }
            while (!isEmptyStack(temp))         /* on remet tout, dans le bon ordre */
            {
                push(p_path, pop(&temp));
            }
        }
        ```

    === "Récursive"

        ```c
        void displayPath(t_stack *p_path)
        {
            t_position pos;
            if (isEmptyStack(*p_path))
            {
                return;
            }
            pos = pop(p_path);
            printf("(%d, %d) ", pos.x, pos.y);   /* affiché AVANT l'appel : du sommet vers le fond */
            displayPath(p_path);
            push(p_path, pos);                   /* on rempile au retour : pile intacte */
        }
        ```
        La pile d'**appels** sert de pile temporaire.

    **Pourquoi un pointeur, pour les plus avancés ?** Si la pile est une
    **liste**, une copie de `t_stack` contient le même `head` : dépiler dans la
    copie ferait des `free()` sur les cellules de l'**original**, qui pointerait
    alors sur de la mémoire libérée. Avec un pointeur, on travaille sur la vraie
    pile et on la reconstruit proprement. Comme on ne sait pas quelle
    implémentation est utilisée, le pointeur est la seule solution sûre.

### Exercice 3 — Palindrome avec une pile

Mot `mycode` de taille logique `size`, sans `string.h`.

??? success "Correction"
    On empile toutes les lettres : en dépilant, on les relit **à l'envers**. Il
    suffit de comparer avec la lecture à l'endroit.

    ```c
    int isPalindrome(char *mycode, int size)
    {
        t_stack st = createStack();
        int i;
        for (i = 0; i < size; i++)
        {
            push(&st, mycode[i]);
        }
        for (i = 0; i < size; i++)
        {
            if (pop(&st) != mycode[i])
            {
                return 0;
            }
        }
        return 1;
    }
    ```

    Amélioration : n'empiler que la première moitié (`size / 2` lettres), puis
    comparer avec la seconde moitié en sautant la lettre du milieu si `size`
    est impair.

## Thème 2 — Fonctions sur les files

### Exercice 4 — Complément de cours

**Partie I — File en liste ht.**

??? success "Correction"
    **Q1** — Une file ajoute à un bout et retire à l'autre. Dans une liste
    simple, l'un des deux bouts (la fin) coûte $O(N)$. Avec `tail`, on ajoute
    en fin en $O(1)$ et on retire en tête en $O(1)$.

    **Q2–Q3** —

    ```c
    void enqueue(t_queue *p_queue, int val)    /* = ajout en fin de liste ht */
    {
        t_cell *newcell = createCell(val);
        if (p_queue->tail == NULL)
        {
            p_queue->head = newcell;
            p_queue->tail = newcell;
        }
        else
        {
            p_queue->tail->next = newcell;
            p_queue->tail = newcell;
        }
    }

    int dequeue(t_queue *p_queue)              /* file non vide ; retrait en tête */
    {
        t_cell *temp = p_queue->head;
        int val = temp->value;
        p_queue->head = temp->next;
        if (p_queue->head == NULL)             /* la file est devenue vide */
        {
            p_queue->tail = NULL;
        }
        free(temp);
        return val;
    }
    ```

    !!! piege "`tail` qui pend"
        Sans le test, après avoir défilé le dernier élément, `tail` pointe sur
        une cellule libérée, et le prochain `enqueue` écrit dedans.

**Partie II — File en tableau avec `first` et `last`.**

??? success "Correction"
    **Q1** — Hotline : enfiler 4, 8, 7, défiler, enfiler 9, défiler, enfiler 0
    (tableau de 5 cases pour le dessin).

    | Opération | `values` | `first` | `last` | Valeur défilée |
    |-----------|----------|:-------:|:------:|:--------------:|
    | départ | `. . . . .` | 0 | 0 | |
    | enfiler 4 | `4 . . . .` | 0 | 1 | |
    | enfiler 8 | `4 8 . . .` | 0 | 2 | |
    | enfiler 7 | `4 8 7 . .` | 0 | 3 | |
    | défiler | `. 8 7 . .` | 1 | 3 | 4 |
    | enfiler 9 | `. 8 7 9 .` | 1 | 4 | |
    | défiler | `. . 7 9 .` | 2 | 4 | 8 |
    | enfiler 0 | `. . 7 9 0` | 2 | 5 | |

    La file contient **7, 9, 0** (dans cet ordre de sortie). Les cases
    « défilées » contiennent encore 4 et 8, mais elles ne font plus partie de
    la file.

    **Q2** — Buffer circulaire de taille `NBMAX` :

    - **vide** : `first == last` ;
    - **pleine** : `last - first == NBMAX` ;
    - on accède aux cases par `last % NBMAX` (enfiler) et `first % NBMAX` (défiler).

    Si on enfile encore 6 puis 2 dans l'exemple, `last` vaut 7 : 6 va dans la
    case `5 % 5 = 0`, 2 dans la case `6 % 5 = 1`, et la file est pleine
    (`7 - 2 = 5`).

### Exercice 5 — Propagation de zone (*flood fill*) avec une file

??? success "Correction"
    On part de la case P, on la recolore, puis on enfile ses voisines qui ont
    encore l'ancienne couleur ; et ainsi de suite tant que la file n'est pas
    vide. La file fait avancer la zone « en vague » autour de P (c'est un
    parcours en largeur).

    ```c
    void FloodFill(t_pixel P, t_color newcolor)
    {
        t_queue pixqueue;
        t_pixel pixel, voisin;
        t_color oldcolor;
        t_pixel voisins[4];
        int k;

        pixqueue = emptyQueue();
        enqueue(&pixqueue, P);
        oldcolor = getColor(P);
        if (oldcolor == newcolor)              /* sinon boucle infinie */
        {
            return;
        }
        while (!isEmptyQueue(pixqueue))
        {
            pixel = dequeue(&pixqueue);
            if (getColor(pixel) == oldcolor)   /* une case peut avoir été enfilée deux fois */
            {
                setColor(&pixel, newcolor);
                voisins[0] = pixelUp(pixel);
                voisins[1] = pixelDown(pixel);
                voisins[2] = pixelLeft(pixel);
                voisins[3] = pixelRight(pixel);
                for (k = 0; k < 4; k++)
                {
                    voisin = voisins[k];
                    if (isInImage(voisin) && getColor(voisin) == oldcolor)
                    {
                        enqueue(&pixqueue, voisin);
                    }
                }
            }
        }
    }
    ```

    Points d'attention : tester `isInImage` **avant** `getColor` (bords de la
    carte) ; gérer le cas `oldcolor == newcolor` (les cases recolorées
    garderaient la « bonne » couleur et seraient réenfilées sans fin).

## Thème 3 — Synthèse type DE : expressions bien parenthésées

Exemples : `(3+x)` correct ; `((2*5)+1` incorrect ; `(6*9)-)7+2(` incorrect
alors qu'il y a autant d'ouvrantes que de fermantes.

**Q1.** Version « simple », sans structure de données.

??? success "Correction"
    Un compteur suffit pour les parenthèses seules : $+1$ sur `(`, $-1$ sur `)`.
    Il ne doit **jamais devenir négatif** (une fermante sans ouvrante avant) et
    doit valoir 0 à la fin.

    ```c
    int checkParentheses(char *expr)
    {
        int cpt = 0, i = 0;
        while (expr[i] != '\0')
        {
            if (expr[i] == '(')
            {
                cpt++;
            }
            else if (expr[i] == ')')
            {
                cpt--;
                if (cpt < 0)
                {
                    return 0;          /* cas (6*9)-)7+2( */
                }
            }
            i++;
        }
        return (cpt == 0);             /* cas ((2*5)+1 : cpt vaut 1 */
    }
    ```

**Q2.** Même vérification avec une pile `t_stack` de caractères.

??? success "Correction"
    ```c
    int checkParenthesesStack(char *expr)
    {
        t_stack st = createStack();
        int size = strlen(expr);
        for (int i = 0; i < size; i++)
        {
            if (expr[i] == '(')
            {
                push(&st, '(');
            }
            else if (expr[i] == ')')
            {
                if (isEmptyStack(st))
                {
                    return 0;          /* fermante sans ouvrante */
                }
                pop(&st);
            }
        }
        return isEmptyStack(st);       /* une ouvrante non fermée → 0 */
    }
    ```

**Q3.** Ajouter les crochets `[` `]` avec **une seule** pile.

??? success "Correction"
    Un compteur ne suffit plus : dans `(5-z) * [(5+z²])`, il y a autant de `(`
    que de `)` et de `[` que de `]`, mais le `]` ferme un `(`. La pile retient
    **quel** symbole a été ouvert en dernier : une fermante doit correspondre au
    sommet.

    ```c
    int checkBrackets(char *expr)
    {
        t_stack st = createStack();
        int size = strlen(expr);
        char c, ouvrant;
        for (int i = 0; i < size; i++)
        {
            c = expr[i];
            if (c == '(' || c == '[')
            {
                push(&st, c);
            }
            else if (c == ')' || c == ']')
            {
                if (isEmptyStack(st))
                {
                    return 0;
                }
                ouvrant = pop(&st);
                if ((c == ')' && ouvrant != '(') || (c == ']' && ouvrant != '['))
                {
                    return 0;          /* mauvais symbole fermant */
                }
            }
        }
        return isEmptyStack(st);
    }
    ```

    Vérifié : `[(x*y)/(3+a)] – (x²+x-4)` → 1, `[[([0])]]` → 1,
    `(5-z) * [(5+z²])` → 0. Ce même exercice est tombé au
    [DE 2024](annale-de-2024.md#partie-2-piles-et-files).
