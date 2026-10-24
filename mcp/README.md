# Serveur MCP du site

Permet à un assistant IA (Claude, ChatGPT, Cursor…) de consulter le site
**Révisions EFREI — P2-PLUS** : il cherche dans nos cours, fiches et TD corrigés
au lieu d'inventer, et cite la page.

| Outil | Rôle |
|---|---|
| `chercher` | Chercher une notion dans toutes les pages publiques |
| `lire_page` | Lire une page en entier (Markdown, formules en LaTeX) |
| `matieres` | Matières, sections (cours, TD, fiches…) et leurs pages |
| `prochaines_evaluations` | Prochains CE / DE, date, temps restant, supports autorisés |

Le serveur lit le site publié (`search/search_index.json`, `data/calendrier.json`)
et la source Markdown sur GitHub : il est toujours à jour, sans rien redéployer.
Lecture seule ; les TP protégés par mot de passe restent inaccessibles.

## Ajouter le serveur à son assistant

Adresse : `https://p2-plus-mcp.<sous-domaine>.workers.dev/mcp`
(remplacer par l'adresse affichée au déploiement).

- **Claude (claude.ai ou application)** : Paramètres → Connecteurs →
  « Ajouter un connecteur personnalisé » → coller l'adresse.
- **Claude Code** :
  ```bash
  claude mcp add --transport http p2-plus https://p2-plus-mcp.<sous-domaine>.workers.dev/mcp
  ```
- **Autres clients** (Cursor, VS Code, ChatGPT en mode développeur…) : ajouter un
  serveur MCP de type « HTTP » / « Streamable HTTP » avec la même adresse.

Exemples de questions : « Explique-moi la loi de Poisson d'après nos fiches »,
« C'est quand le prochain CE et qu'est-ce qu'il faut réviser ? »,
« Donne-moi les pièges du DE de Linux ».

## Déployer (une seule fois)

Hébergement gratuit sur Cloudflare Workers.

```bash
cd mcp
npm install
npx wrangler login     # ouvre le navigateur : se connecter à Cloudflare
npm run deploy         # affiche l'adresse https://p2-plus-mcp.<…>.workers.dev
```

Il n'y a à redéployer que si on modifie `src/index.js`.

## Développer

```bash
npm test        # essaie les 4 outils sur le vrai site, sans Cloudflare
npm run dev     # serveur local sur http://127.0.0.1:8787/mcp
```

Le serveur suit le transport MCP « Streamable HTTP » sans session : chaque requête
est un `POST /mcp` JSON-RPC, la réponse est en JSON.
