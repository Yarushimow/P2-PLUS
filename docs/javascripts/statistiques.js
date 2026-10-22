// Mesure d'audience avec GoatCounter : sans cookies, sans identifier personne.
// Envoie trois choses :
//  - chaque page vue (y compris lors de la navigation instantanée) ;
//  - le temps *actif* passé sur la page, par tranches (« 1–3 min »…) : onglet
//    visible et interaction (souris, clavier, défilement) il y a moins de 30 s ;
//  - les clics importants : cartes, agenda, onglets, menu, Précédent / Suivant,
//    téléchargements, liens externes, logo du pied de page, exports PDF / .md,
//    bouton des particules.
// Le script GoatCounter est ajouté par overrides/main.html quand
// `extra.goatcounter` est rempli dans mkdocs.yml ; il ignore localhost.
(() => {
  // ---------- Envoi (GoatCounter se charge en asynchrone, ou est bloqué) ----------
  const enAttente = [];
  function envoyer(donnees) {
    const gc = window.goatcounter;
    if (gc && typeof gc.count === "function") gc.count(donnees);
    else if (enAttente.length < 50) enAttente.push(donnees);
  }
  (function vider(essais) {
    const gc = window.goatcounter;
    if (gc && typeof gc.count === "function") {
      enAttente.splice(0).forEach((d) => gc.count(d));
    } else if (essais > 0) {
      setTimeout(() => vider(essais - 1), 500);
    }
  })(40);

  // ---------- Temps actif sur la page ----------
  const INACTIF_APRES = 30000;
  let page = null, actifMs = 0, dernierTic = Date.now(), derniereAction = Date.now();

  const action = () => { derniereAction = Date.now(); };
  ["pointermove", "pointerdown", "keydown", "scroll", "wheel", "touchstart"]
    .forEach((t) => window.addEventListener(t, action, { passive: true }));

  function tic() {
    const maintenant = Date.now();
    if (document.visibilityState === "visible" && maintenant - derniereAction < INACTIF_APRES) {
      actifMs += Math.min(maintenant - dernierTic, 6000);
    }
    dernierTic = maintenant;
  }
  setInterval(tic, 5000);

  function tranche(ms) {
    const s = ms / 1000;
    if (s < 10) return "moins de 10 s";
    if (s < 30) return "10–30 s";
    if (s < 60) return "30 s – 1 min";
    if (s < 180) return "1–3 min";
    if (s < 600) return "3–10 min";
    return "plus de 10 min";
  }

  function commencer() {
    page = location.pathname;
    actifMs = 0;
    dernierTic = derniereAction = Date.now();
  }
  function terminer() {
    if (!page) return;
    tic();
    envoyer({ path: `temps-actif/${tranche(actifMs)}`, title: page, event: true });
    page = null;
  }

  // Onglet quitté ou fermé : on envoie le temps ; au retour, nouvelle séquence
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") terminer();
    else if (!page) commencer();
  });

  // ---------- Pages vues ----------
  function nouvellePage() {
    terminer();
    commencer();
    envoyer({ path: page, title: document.title });
  }

  // ---------- Clics ----------
  const texte = (el) => (el?.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);

  function decrire(cible) {
    const carte = cible.closest(".grid.cards > ul > li, .grid > .card");
    if (carte) return `carte/${texte(carte.querySelector("strong") || carte)}`;
    if (cible.closest(".export-pdf")) return "export/pdf";
    if (cible.closest(".export-md")) return "export/markdown";
    if (cible.closest(".particules-bouton")) return "bouton-particules";
    const a = cible.closest("a[href]");
    if (!a) return null;
    if (a.matches(".agenda-carte")) return `agenda/${texte(a.querySelector("strong"))}`;
    if (a.closest(".md-tabs")) return `onglet/${texte(a)}`;
    if (a.matches(".md-footer__link--prev")) return "precedent";
    if (a.matches(".md-footer__link--next")) return "suivant";
    const url = new URL(a.href, location.href);
    if (/\.(pdf|ms14|zip|png|jpe?g)$/i.test(url.pathname)) {
      return `telechargement/${decodeURIComponent(url.pathname.split("/").pop())}`;
    }
    if (url.host !== location.host) return `lien-externe/${url.host}`;
    if (a.closest(".md-sidebar--primary")) return `menu/${texte(a)}`;
    return null;
  }

  // Phase de capture : le clic est noté avant que la page ne change
  document.addEventListener("click", (ev) => {
    const nom = ev.target instanceof Element && decrire(ev.target);
    if (nom) envoyer({ path: `clic/${nom}`, title: location.pathname, event: true });
  }, true);

  if (typeof document$ !== "undefined") document$.subscribe(nouvellePage);
  else document.addEventListener("DOMContentLoaded", nouvellePage);
})();
