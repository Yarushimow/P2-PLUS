// Matières dont le DE est passé : nom barré et couleur atténuée, dans le menu
// de gauche et sur les cartes (accueil, pages de catégorie).
//
// Les dates viennent de docs/data/calendrier.json (outils/sync_calendrier.py,
// mis à jour chaque nuit). Une matière est « terminée » quand tous ses DE sont
// finis ; la comparaison se fait avec l'heure du visiteur, donc la matière
// bascule toute seule dès la fin de l'épreuve.

(() => {
  let terminees = null; // promesse : liste des chemins de pages (ex. "/P2-PLUS/informatique/linux/")

  function racineSite() {
    try {
      const config = JSON.parse(document.getElementById("__config").textContent);
      return new URL(config.base + "/", location.href);
    } catch {
      return new URL("/", location.href);
    }
  }

  function charger() {
    terminees ??= fetch(new URL("data/calendrier.json", racineSite()), { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : { modules: {}, seances: [] }))
      .then(({ modules, seances }) => {
        const maintenant = Date.now();
        const finDernierDE = {};
        for (const s of seances) {
          if (s.type !== "DE" || !modules[s.module]) continue;
          finDernierDE[s.module] = Math.max(finDernierDE[s.module] || 0, Date.parse(s.fin || s.debut));
        }
        return Object.entries(finDernierDE)
          .filter(([, fin]) => fin < maintenant)
          .map(([code]) => new URL(modules[code].page, racineSite()).pathname);
      })
      .catch(() => []);
    return terminees;
  }

  const chemin = (a) => {
    try { return new URL(a.getAttribute("href"), location.href).pathname.replace(/index\.html$/, ""); }
    catch { return ""; }
  };

  async function marquer() {
    const pages = await charger();
    if (!pages.length) return;
    const fini = (a) => a && pages.includes(chemin(a));

    // Menu de gauche (ordinateur et tiroir mobile) : entrée de la matière
    document.querySelectorAll(".md-nav__item").forEach((item) => {
      const lien = item.querySelector(":scope > .md-nav__link[href], :scope > .md-nav__container > .md-nav__link[href]");
      if (fini(lien)) item.classList.add("matiere-terminee");
    });

    // Cartes : celles dont le lien « Réviser » mène à la matière
    document.querySelectorAll(".md-typeset .grid.cards > ul > li").forEach((carte) => {
      if ([...carte.querySelectorAll("a[href]")].some(fini)) carte.classList.add("matiere-terminee");
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(marquer);
  else document.addEventListener("DOMContentLoaded", marquer);
})();
