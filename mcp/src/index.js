// Serveur MCP du site « Révisions EFREI — P2-PLUS » (Cloudflare Worker).
//
// Donne aux assistants (Claude, ChatGPT, Cursor…) un accès en lecture au site :
//   chercher                 recherche d'une notion dans toutes les pages publiques
//   lire_page                contenu d'une page (source Markdown, formules en LaTeX)
//   matieres                 matières, sections (cours, TD, fiches…) et leurs pages
//   prochaines_evaluations   prochains CE / DE, avec le temps restant
//
// Tout est lu sur le site publié (search_index.json, data/calendrier.json) et sur
// la source GitHub : rien à mettre à jour ici quand le site change. Les TP
// chiffrés ne sont pas dans l'index de recherche et restent donc inaccessibles.
//
// Transport : MCP « Streamable HTTP » sans session (POST JSON-RPC sur /mcp,
// réponse JSON). Lecture seule, aucune donnée sur les utilisateurs.

const VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const SERVEUR = { name: "p2-plus", title: "Révisions EFREI — P2-PLUS", version: "1.0.0" };
const CACHE_MS = 5 * 60 * 1000;
const MAX_PAGE = 60000; // caractères renvoyés au plus par lire_page

const INSTRUCTIONS = `Site de révisions de la promo P2-PLUS (EFREI) : cours, corrections de TD,
fiches et annales, par matière. Utilise « chercher » pour trouver une notion, puis
« lire_page » pour le contenu complet avant de répondre ; cite l'adresse de la page.
« prochaines_evaluations » donne les dates des contrôles (CE) et devoirs (DE).`;

// ---------- Données du site (mises en cache quelques minutes) ----------

const cache = new Map();

async function telecharger(url, type) {
  const deja = cache.get(url);
  if (deja && Date.now() - deja.t < CACHE_MS) return deja.valeur;
  const reponse = await fetch(url, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!reponse.ok) throw new Error(`${url} : HTTP ${reponse.status}`);
  const valeur = type === "json" ? await reponse.json() : await reponse.text();
  cache.set(url, { t: Date.now(), valeur });
  return valeur;
}

const siteUrl = (env) => (env.SITE_URL || "https://yarushimow.github.io/P2-PLUS/").replace(/\/?$/, "/");
const sourceUrl = (env) => (env.SOURCE_URL || "https://raw.githubusercontent.com/Yarushimow/P2-PLUS/main/docs/").replace(/\/?$/, "/");

async function index(env) {
  const brut = await telecharger(`${siteUrl(env)}search/search_index.json`, "json");
  return brut.docs;
}
const calendrier = (env) => telecharger(`${siteUrl(env)}data/calendrier.json`, "json");

// ---------- Outils de texte ----------

const sansHtml = (html) => String(html)
  .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, " ").trim();

// Minuscules sans accents, pour comparer « Équation » et « equation »
const plier = (texte) => String(texte).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const mots = (texte) => plier(texte).split(/[^a-z0-9]+/).filter((m) => m.length > 1);

// « https://…/P2-PLUS/maths/probabilites/#loi » ou « /maths/probabilites » → « maths/probabilites/ »
function cheminPage(env, entree) {
  let chemin = String(entree || "").trim();
  const base = siteUrl(env);
  if (chemin.startsWith(base)) chemin = chemin.slice(base.length);
  else if (/^https?:\/\//.test(chemin)) {
    const u = new URL(chemin);
    chemin = u.pathname.replace(new URL(base).pathname, "");
  }
  chemin = chemin.split("#")[0].split("?")[0].replace(/^\/+/, "").replace(/index\.(md|html)$/, "").replace(/\.md$/, "/");
  if (chemin && !chemin.endsWith("/")) chemin += "/";
  return chemin;
}

const lienPage = (env, location) => siteUrl(env) + location;

// Titre de chaque page (entrée sans « # » dans l'index)
function titres(docs) {
  const t = new Map();
  for (const d of docs) if (!d.location.includes("#")) t.set(d.location, d.title);
  return t;
}

// ---------- Les outils MCP ----------

const OUTILS = [
  {
    name: "chercher",
    title: "Chercher une notion",
    description: "Recherche une notion, un mot-clé ou une formule dans toutes les pages publiques "
      + "du site (cours, TD corrigés, fiches, annales). Renvoie les sections les plus pertinentes "
      + "avec un extrait et l'adresse de la page. Ensuite, utilise lire_page pour le contenu complet.",
    inputSchema: {
      type: "object",
      properties: {
        requete: { type: "string", description: "Ce qu'on cherche, ex. « loi de Poisson », « matrice hessienne », « AVL rotation »." },
        limite: { type: "integer", minimum: 1, maximum: 20, default: 8, description: "Nombre de résultats (8 par défaut)." },
      },
      required: ["requete"],
      additionalProperties: false,
    },
  },
  {
    name: "lire_page",
    title: "Lire une page",
    description: "Renvoie le contenu complet d'une page du site, en Markdown (formules en LaTeX). "
      + "Accepte l'adresse complète de la page ou son chemin, ex. « maths/probabilites/cours/ ».",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "string", description: "Adresse ou chemin de la page (tel que renvoyé par chercher ou matieres)." },
      },
      required: ["page"],
      additionalProperties: false,
    },
  },
  {
    name: "matieres",
    title: "Lister les matières",
    description: "Liste les matières du semestre (code, nom, adresse) avec leurs sections "
      + "(cours, TD, fiches, entraînement, TP) et les pages de chaque section.",
    inputSchema: {
      type: "object",
      properties: {
        matiere: { type: "string", description: "Facultatif : code (ex. SM301P) ou nom d'une matière pour ne détailler qu'elle." },
      },
      additionalProperties: false,
    },
  },
  {
    name: "prochaines_evaluations",
    title: "Prochaines évaluations",
    description: "Donne les prochains contrôles (CE) et devoirs écrits (DE) : matière, date et heure "
      + "(heure de Paris), temps restant, supports autorisés et page de révision.",
    inputSchema: {
      type: "object",
      properties: {
        matiere: { type: "string", description: "Facultatif : code (ex. TE302P) ou nom d'une matière." },
        limite: { type: "integer", minimum: 1, maximum: 30, default: 6, description: "Nombre d'évaluations (6 par défaut)." },
      },
      additionalProperties: false,
    },
  },
].map((outil) => ({ ...outil, annotations: { readOnlyHint: true, openWorldHint: false } }));

async function chercher(env, { requete, limite = 8 }) {
  const termes = mots(requete);
  if (!termes.length) return "Requête vide : indique un mot ou une notion à chercher.";
  const docs = await index(env);
  const titresPages = titres(docs);
  const phrase = plier(requete).trim();

  const resultats = [];
  for (const d of docs) {
    const texte = sansHtml(d.text);
    if (!texte && !d.title) continue;
    const titre = plier(d.title), corps = plier(texte);
    let score = 0, trouves = 0;
    for (const t of termes) {
      const dansTitre = titre.includes(t), n = corps.split(t).length - 1;
      if (dansTitre || n) trouves++;
      score += (dansTitre ? 6 : 0) + Math.min(n, 5);
    }
    if (!trouves) continue;
    score *= trouves / termes.length;              // tous les mots présents : bonus
    if (phrase.length > 3 && (titre.includes(phrase) || corps.includes(phrase))) score += 10;
    resultats.push({ d, texte, score });
  }
  resultats.sort((a, b) => b.score - a.score);
  const garde = resultats.slice(0, Math.min(Math.max(limite, 1), 20));
  if (!garde.length) return `Aucun résultat pour « ${requete} ». Essaie un autre mot, ou « matieres » pour parcourir le site.`;

  const lignes = garde.map(({ d, texte }, i) => {
    const page = d.location.split("#")[0];
    const titrePage = titresPages.get(page);
    const ou = titrePage && titrePage !== d.title ? `${titrePage} › ${d.title}` : d.title;
    // Extrait centré sur le premier mot trouvé
    const pos = Math.max(0, termes.map((t) => plier(texte).indexOf(t)).filter((p) => p >= 0).sort((a, b) => a - b)[0] ?? 0);
    const debut = Math.max(0, pos - 80);
    const extrait = (debut ? "…" : "") + texte.slice(debut, debut + 280) + (texte.length > debut + 280 ? "…" : "");
    return `${i + 1}. **${ou}**\n   ${lienPage(env, d.location)}\n   ${extrait || "(titre de section)"}`;
  });
  return `Résultats pour « ${requete} » :\n\n${lignes.join("\n\n")}`;
}

async function lirePage(env, { page }) {
  const chemin = cheminPage(env, page);
  const docs = await index(env);
  const titresPages = titres(docs);
  if (!titresPages.has(chemin)) {
    return { erreur: true, texte: `Page introuvable : « ${page} ». Utilise chercher ou matieres pour obtenir une adresse valide.` };
  }
  const titre = titresPages.get(chemin);
  const entete = `# ${titre}\nAdresse : ${lienPage(env, chemin)}\n\n`;

  // Source Markdown sur GitHub : « x/ » vient de « x/index.md » ou de « x.md »
  const candidats = chemin ? [`${chemin}index.md`, `${chemin.slice(0, -1)}.md`] : ["index.md"];
  for (const fichier of candidats) {
    try {
      const md = await telecharger(sourceUrl(env) + fichier, "texte");
      if (md.includes('class="coffre"')) {
        return { texte: `${entete}Cette page est protégée par mot de passe : son contenu n'est pas accessible.` };
      }
      const corps = md.replace(/^---\n[\s\S]*?\n---\n/, ""); // en-tête YAML
      const coupe = corps.length > MAX_PAGE;
      return { texte: entete + corps.slice(0, MAX_PAGE) + (coupe ? "\n\n[… page tronquée, trop longue]" : "") };
    } catch { /* fichier suivant */ }
  }

  // Repli : texte de l'index de recherche, section par section
  const sections = docs.filter((d) => d.location.split("#")[0] === chemin && d.text);
  const texte = sections.map((d) => (d.location.includes("#") ? `## ${d.title}\n` : "") + sansHtml(d.text)).join("\n\n");
  return { texte: entete + texte.slice(0, MAX_PAGE) };
}

function trouverModule(cal, critere) {
  if (!critere) return null;
  const c = plier(critere).trim();
  return Object.entries(cal.modules).find(([code, m]) =>
    plier(code) === c || plier(m.titre).includes(c) || c.includes(plier(m.titre)))?.[0] ?? "inconnu";
}

async function matieres(env, { matiere } = {}) {
  const [cal, docs] = await Promise.all([calendrier(env), index(env)]);
  const titresPages = titres(docs);
  const code = trouverModule(cal, matiere);
  if (code === "inconnu") {
    return `Matière inconnue : « ${matiere} ». Matières : ${Object.entries(cal.modules).map(([c, m]) => `${c} (${m.titre})`).join(", ")}.`;
  }
  const choisis = Object.entries(cal.modules).filter(([c]) => !code || c === code);
  const blocs = choisis.map(([c, m]) => {
    const racine = m.page;
    const pages = [...titresPages.keys()].filter((l) => l.startsWith(racine) && l !== racine);
    // Sections : sous-dossiers directs (cours/, td/…), puis leurs pages
    const sections = pages.filter((l) => l.slice(racine.length).split("/").filter(Boolean).length === 1);
    const lignes = sections.map((s) => {
      const enfants = pages.filter((l) => l.startsWith(s) && l !== s);
      const detail = code ? enfants.map((e) => `    - ${titresPages.get(e)} : ${lienPage(env, e)}`).join("\n") : "";
      return `  - ${titresPages.get(s)} (${enfants.length} page${enfants.length > 1 ? "s" : ""}) : ${lienPage(env, s)}${detail ? `\n${detail}` : ""}`;
    });
    return `- **${m.titre}** (${c}) : ${lienPage(env, racine)}${lignes.length ? `\n${lignes.join("\n")}` : ""}`;
  });
  const fin = code ? "" : "\n\nPour le détail des pages d'une matière, appelle matieres avec son code.";
  return `Matières du site :\n\n${blocs.join("\n")}${fin}`;
}

const formatDate = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long",
  year: "numeric", hour: "2-digit", minute: "2-digit",
});

function tempsRestant(ms) {
  const min = Math.max(0, Math.round(ms / 60000));
  const j = Math.floor(min / 1440), h = Math.floor((min % 1440) / 60), m = min % 60;
  return [j && `${j} j`, (j || h) && `${h} h`, `${m} min`].filter(Boolean).join(" ");
}

async function prochainesEvaluations(env, { matiere, limite = 6 } = {}) {
  const cal = await calendrier(env);
  const code = trouverModule(cal, matiere);
  if (code === "inconnu") {
    return `Matière inconnue : « ${matiere} ». Matières : ${Object.entries(cal.modules).map(([c, m]) => `${c} (${m.titre})`).join(", ")}.`;
  }
  const maintenant = Date.now();
  const evals = cal.seances
    .filter((s) => (s.type === "CE" || s.type === "DE") && Date.parse(s.debut) > maintenant)
    .filter((s) => !code || s.module === code)
    .sort((a, b) => Date.parse(a.debut) - Date.parse(b.debut))
    .slice(0, Math.min(Math.max(limite, 1), 30));
  const maj = cal.maj ? ` (agenda mis à jour le ${formatDate.format(new Date(cal.maj))})` : "";
  if (!evals.length) return `Aucune évaluation à venir${code ? ` en ${cal.modules[code].titre}` : ""}${maj}.`;
  const lignes = evals.map((s) => {
    const nom = s.type === "CE" ? "Contrôle (CE)" : "Devoir écrit (DE)";
    const page = cal.modules[s.module]?.page;
    return `- **${nom} — ${s.titre}** (${s.module})\n  ${formatDate.format(new Date(s.debut))}, dans ${tempsRestant(Date.parse(s.debut) - maintenant)}`
      + (s.supports ? `\n  Supports : ${s.supports}` : "")
      + (page ? `\n  Révisions : ${lienPage(env, page)}` : "");
  });
  return `Prochaines évaluations${maj} :\n\n${lignes.join("\n")}`;
}

async function appelerOutil(env, nom, args = {}) {
  const texte = (t) => ({ content: [{ type: "text", text: t }] });
  const erreur = (t) => ({ content: [{ type: "text", text: t }], isError: true });
  const chaine = (v, max) => (typeof v === "string" && v.trim() && v.length <= max ? v : null);
  try {
    switch (nom) {
      case "chercher": {
        const requete = chaine(args.requete, 200);
        if (!requete) return erreur("Paramètre « requete » manquant ou trop long (200 caractères max).");
        return texte(await chercher(env, { requete, limite: Number(args.limite) || 8 }));
      }
      case "lire_page": {
        const page = chaine(args.page, 500);
        if (page === null && args.page !== "") return erreur("Paramètre « page » manquant.");
        const r = await lirePage(env, { page: page ?? "" });
        return r.erreur ? erreur(r.texte) : texte(r.texte);
      }
      case "matieres":
        return texte(await matieres(env, { matiere: chaine(args.matiere, 100) }));
      case "prochaines_evaluations":
        return texte(await prochainesEvaluations(env, { matiere: chaine(args.matiere, 100), limite: Number(args.limite) || 6 }));
      default:
        return null;
    }
  } catch (e) {
    return erreur(`Le site est momentanément injoignable (${e.message}). Réessaie dans un instant.`);
  }
}

// ---------- Protocole MCP (JSON-RPC 2.0) ----------

const reussite = (id, result) => ({ jsonrpc: "2.0", id, result });
const echec = (id, code, message) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

async function traiter(env, msg) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return echec(msg?.id, -32600, "Requête JSON-RPC invalide");
  }
  const notification = !("id" in msg);
  if (notification) return null; // notifications/initialized, notifications/cancelled…

  const { id, method, params = {} } = msg;
  switch (method) {
    case "initialize": {
      const demandee = params.protocolVersion;
      return reussite(id, {
        protocolVersion: VERSIONS.includes(demandee) ? demandee : VERSIONS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVEUR,
        instructions: INSTRUCTIONS,
      });
    }
    case "ping":
      return reussite(id, {});
    case "tools/list":
      return reussite(id, { tools: OUTILS });
    case "tools/call": {
      const resultat = await appelerOutil(env, params.name, params.arguments || {});
      return resultat ? reussite(id, resultat) : echec(id, -32602, `Outil inconnu : ${params.name}`);
    }
    default:
      return echec(id, -32601, `Méthode non prise en charge : ${method}`);
  }
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

const json = (corps, statut = 200) => new Response(JSON.stringify(corps), {
  status: statut, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
});

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    if (url.pathname !== "/mcp") {
      return new Response(
        `Serveur MCP « ${SERVEUR.title} ».\nAdresse à ajouter dans votre assistant : ${url.origin}/mcp\n`,
        { headers: { "Content-Type": "text/plain; charset=utf-8", ...CORS } },
      );
    }
    // Sans session ni notifications serveur : pas de flux SSE (GET) ni de fermeture (DELETE)
    if (request.method !== "POST") {
      return new Response("Méthode non autorisée", { status: 405, headers: { Allow: "POST, OPTIONS", ...CORS } });
    }

    let corps;
    try {
      corps = await request.json();
    } catch {
      return json(echec(null, -32700, "JSON invalide"), 400);
    }

    if (Array.isArray(corps)) {
      if (!corps.length) return json(echec(null, -32600, "Lot vide"), 400);
      const reponses = (await Promise.all(corps.map((m) => traiter(env, m)))).filter(Boolean);
      return reponses.length ? json(reponses) : new Response(null, { status: 202, headers: CORS });
    }
    const reponse = await traiter(env, corps);
    return reponse ? json(reponse) : new Response(null, { status: 202, headers: CORS });
  },
};
