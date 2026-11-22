---
title: "TP 1 — Classes, objets, méthodes"
---

# TP 1 — Introduction aux classes, objets et méthodes

=== "Version simplifiée"

    **Outil** : IntelliJ IDEA (licence étudiante via JetBrains, voir l'onglet papier).

    !!! warning "Désactiver l'IA et la complétion"
        Le TP demande de désactiver l'assistant IA et la complétion automatique
        d'IntelliJ : le but est d'apprendre la syntaxe, et les évaluations se font sans.

    Objectifs : distinguer classe et objet, écrire plusieurs constructeurs, lire
    les saisies au clavier avec `Scanner`, distinguer attributs **d'instance** et
    **de classe** (`static`), méthodes d'instance et méthodes statiques.

    !!! methode "Créer un projet IntelliJ"
        *New Project* → Java → décocher *Add sample code* → clic droit sur `src`
        → *New > Java Class*. Une classe par fichier, `main` dans une classe `Main`.

=== "Version papier"

    Sujet du TP 1, puis la procédure d'installation des outils JetBrains.

    <!-- papier: pdf/TI403P/tp1-ti403.pdf | TP 1 — sujet | tp1 | page -->

    [![TP 1 — sujet, page 1 : Travaux Pratiques N°1](papier/tp1/p01.jpg){ loading=lazy .papier }](papier/tp1/p01.jpg)
    <p class="papier-legende">Travaux Pratiques N°1 · TP 1 — sujet, page 1</p>

    [![TP 1 — sujet, page 2 : Création d’un nouveau projet IntelliJ](papier/tp1/p02.jpg){ loading=lazy .papier }](papier/tp1/p02.jpg)
    <p class="papier-legende">Création d’un nouveau projet IntelliJ · TP 1 — sujet, page 2</p>

    [![TP 1 — sujet, page 3 : 10. Entrer le nom de la classe (ex. : Main).](papier/tp1/p03.jpg){ loading=lazy .papier }](papier/tp1/p03.jpg)
    <p class="papier-legende">10. Entrer le nom de la classe (ex. : Main). · TP 1 — sujet, page 3</p>

    [![TP 1 — sujet, page 4 : 3. Cliquer sur Apply, puis OK.](papier/tp1/p04.jpg){ loading=lazy .papier }](papier/tp1/p04.jpg)
    <p class="papier-legende">3. Cliquer sur Apply, puis OK. · TP 1 — sujet, page 4</p>

    [![TP 1 — sujet, page 5 : public class NomClasse {](papier/tp1/p05.jpg){ loading=lazy .papier }](papier/tp1/p05.jpg)
    <p class="papier-legende">public class NomClasse { · TP 1 — sujet, page 5</p>

    [![TP 1 — sujet, page 6 : Exercice 1 : Création de votre première classe avec visibilité par défaut](papier/tp1/p06.jpg){ loading=lazy .papier }](papier/tp1/p06.jpg)
    <p class="papier-legende">Exercice 1 : Création de votre première classe avec visibilité par défaut · TP 1 — sujet, page 6</p>

    [![TP 1 — sujet, page 7 : Les Constructeurs en Java](papier/tp1/p07.jpg){ loading=lazy .papier }](papier/tp1/p07.jpg)
    <p class="papier-legende">Les Constructeurs en Java · TP 1 — sujet, page 7</p>

    [![TP 1 — sujet, page 8 : 2.3 Règles Importantes](papier/tp1/p08.jpg){ loading=lazy .papier }](papier/tp1/p08.jpg)
    <p class="papier-legende">2.3 Règles Importantes · TP 1 — sujet, page 8</p>

    [![TP 1 — sujet, page 9 : 4. Créez un objet p4 en copiant l’objet p2.](papier/tp1/p09.jpg){ loading=lazy .papier }](papier/tp1/p09.jpg)
    <p class="papier-legende">4. Créez un objet p4 en copiant l’objet p2. · TP 1 — sujet, page 9</p>

    [![TP 1 — sujet, page 10 : 4. Lancer le programme normalement.](papier/tp1/p10.jpg){ loading=lazy .papier }](papier/tp1/p10.jpg)
    <p class="papier-legende">4. Lancer le programme normalement. · TP 1 — sujet, page 10</p>

    [![TP 1 — sujet, page 11 : 4. Fermer le scanner à la fin de la saisie avec sc.close(); pour libérer les ressources.](papier/tp1/p11.jpg){ loading=lazy .papier }](papier/tp1/p11.jpg)
    <p class="papier-legende">4. Fermer le scanner à la fin de la saisie avec sc.close(); pour libérer les ressources. · TP 1 — sujet, page 11</p>

    [![TP 1 — sujet, page 12 : Constantes (PI, versions, configurations)](papier/tp1/p12.jpg){ loading=lazy .papier }](papier/tp1/p12.jpg)
    <p class="papier-legende">Constantes (PI, versions, configurations) · TP 1 — sujet, page 12</p>

    [![TP 1 — sujet, page 13 : Le compteur d’instance](papier/tp1/p13.jpg){ loading=lazy .papier }](papier/tp1/p13.jpg)
    <p class="papier-legende">Le compteur d’instance · TP 1 — sujet, page 13</p>

    [![TP 1 — sujet, page 14 : Ne peuvent pas utiliser this](papier/tp1/p14.jpg){ loading=lazy .papier }](papier/tp1/p14.jpg)
    <p class="papier-legende">Ne peuvent pas utiliser this · TP 1 — sujet, page 14</p>

    [![TP 1 — sujet, page 15 : public static boolean estEmailValide(String email) : retourne vrai si l’email](papier/tp1/p15.jpg){ loading=lazy .papier }](papier/tp1/p15.jpg)
    <p class="papier-legende">public static boolean estEmailValide(String email) : retourne vrai si l’email · TP 1 — sujet, page 15</p>

    [![TP 1 — sujet, page 16 : Compare les âges des deux personnes.](papier/tp1/p16.jpg){ loading=lazy .papier }](papier/tp1/p16.jpg)
    <p class="papier-legende">Compare les âges des deux personnes. · TP 1 — sujet, page 16</p>

    [![TP 1 — sujet, page 17 : 3. Écrivez une méthode static int saisirAge(Scanner scanner) qui :](papier/tp1/p17.jpg){ loading=lazy .papier }](papier/tp1/p17.jpg)
    <p class="papier-legende">3. Écrivez une méthode static int saisirAge(Scanner scanner) qui : · TP 1 — sujet, page 17</p>

    <!-- /papier -->

    <!-- papier: pdf/TI403P/tous-os-etape-1-proce-dure-inscription-jetbrains-efrei-net-et-te-le-chargement-outils.pdf | Procédure JetBrains | jetbrains | page -->

    [![Procédure JetBrains, page 1 : Procédure d’acquisition et de téléchargement des outils JetBrains](papier/jetbrains/p01.jpg){ loading=lazy .papier }](papier/jetbrains/p01.jpg)
    <p class="papier-legende">Procédure d’acquisition et de téléchargement des outils JetBrains · Procédure JetBrains, page 1</p>

    [![Procédure JetBrains, page 2 : Sélectionnez, si ce n’est pas déjà fait, l’onglet ‘For students and teachers’](papier/jetbrains/p02.jpg){ loading=lazy .papier }](papier/jetbrains/p02.jpg)
    <p class="papier-legende">Sélectionnez, si ce n’est pas déjà fait, l’onglet ‘For students and teachers’ · Procédure JetBrains, page 2</p>

    [![Procédure JetBrains, page 3 : Renseigner les informations de création de compte JetBrains](papier/jetbrains/p03.jpg){ loading=lazy .papier }](papier/jetbrains/p03.jpg)
    <p class="papier-legende">Renseigner les informations de création de compte JetBrains · Procédure JetBrains, page 3</p>

    [![Procédure JetBrains, page 4 : Validation du compte JetBrains](papier/jetbrains/p04.jpg){ loading=lazy .papier }](papier/jetbrains/p04.jpg)
    <p class="papier-legende">Validation du compte JetBrains · Procédure JetBrains, page 4</p>

    [![Procédure JetBrains, page 5 : La première page vous demande d’accepter les conditions d’inscription aux produits educati…](papier/jetbrains/p05.jpg){ loading=lazy .papier }](papier/jetbrains/p05.jpg)
    <p class="papier-legende">La première page vous demande d’accepter les conditions d’inscription aux produits educati… · Procédure JetBrains, page 5</p>

    [![Procédure JetBrains, page 6 : Choisissez enfin un nom d’utilisateur et le mot de passe de](papier/jetbrains/p06.jpg){ loading=lazy .papier }](papier/jetbrains/p06.jpg)
    <p class="papier-legende">Choisissez enfin un nom d’utilisateur et le mot de passe de · Procédure JetBrains, page 6</p>

    [![Procédure JetBrains, page 7 : Vous avez maintenant accès aux produits JetBrains, notez bien votre numéro de licence](papier/jetbrains/p07.jpg){ loading=lazy .papier }](papier/jetbrains/p07.jpg)
    <p class="papier-legende">Vous avez maintenant accès aux produits JetBrains, notez bien votre numéro de licence · Procédure JetBrains, page 7</p>

    <!-- /papier -->
