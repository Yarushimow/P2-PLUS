// Bascule « Version simplifiée » ⇄ « Version papier » sans remonter en haut de la page.
//
// - Un bouton flottant (en bas au centre) change de version d'un clic, ou au clavier :
//   ← version simplifiée, → version papier, « v » pour alterner (↑ ↓ font défiler).
// - La position est mémorisée séparément pour chaque version : en revenant sur une
//   version, on retrouve l'endroit où on l'avait laissée (exemple 1.15, diapo 12…).
// - Ça marche aussi avec les onglets en haut de page, et la mémoire tient pendant
//   toute la session (changer de page puis revenir ne l'efface pas).
//
// La position est repérée par le bloc affiché en haut de l'écran (titre, paragraphe,
// encadré, diapo…) et son décalage, pas en pixels bruts : c'est plus fiable si la page
// se recalcule (formules, images).

(() => {
  const NOMS = { "version simplifiée": "simplifiee", "version papier": "papier" };
  const LIBELLES = { simplifiee: "Version simplifiée", papier: "Version papier" };

  let etat = null; // { set, inputs: {simplifiee, papier}, blocs: {…}, cle }
  let bouton = null;
  let enCours = false; // évite d'enregistrer pendant une restauration

  // ---------- Repérage des onglets de version ----------
  function trouverOnglets() {
    for (const set of document.querySelectorAll(".md-content .tabbed-set")) {
      const labels = [...set.querySelectorAll(":scope > .tabbed-labels > label")];
      const versions = labels.map((l) => NOMS[l.textContent.trim().toLowerCase()]);
      if (!versions.includes("simplifiee") || !versions.includes("papier")) continue;
      const inputs = {}, blocs = {};
      const tousInputs = [...set.querySelectorAll(":scope > input")];
      const tousBlocs = [...set.querySelectorAll(":scope > .tabbed-content > .tabbed-block")];
      versions.forEach((v, i) => {
        if (!v) return;
        inputs[v] = tousInputs[i];
        blocs[v] = tousBlocs[i];
      });
      return { set, inputs, blocs, cle: `versions:${location.pathname}` };
    }
    return null;
  }

  const active = () => (etat.inputs.papier.checked ? "papier" : "simplifiee");
  const autre = (v) => (v === "papier" ? "simplifiee" : "papier");

  function hauteurEnTete() {
    const h = document.querySelector(".md-header");
    const t = document.querySelector(".md-tabs");
    let haut = h ? h.getBoundingClientRect().bottom : 0;
    if (t && getComputedStyle(t).display !== "none" && t.getBoundingClientRect().bottom > haut) {
      haut = t.getBoundingClientRect().bottom;
    }
    return Math.max(0, haut) + 8;
  }

  // ---------- Mémoire (sessionStorage, avec repli en mémoire vive) ----------
  const memoireVive = {};
  function lire() {
    try { return JSON.parse(sessionStorage.getItem(etat.cle)) || {}; }
    catch { return memoireVive[etat.cle] || {}; }
  }
  function ecrire(donnees) {
    memoireVive[etat.cle] = donnees;
    try { sessionStorage.setItem(etat.cle, JSON.stringify(donnees)); } catch { /* navigation privée */ }
  }

  // Blocs « repères » d'une version : ses enfants directs (titres, paragraphes, encadrés, images…)
  const reperes = (v) => [...etat.blocs[v].children].filter((el) => el.offsetParent !== null || el.getClientRects().length);

  function enregistrer() {
    if (!etat || enCours) return;
    const v = active();
    const haut = hauteurEnTete();
    const liste = reperes(v);
    // Premier bloc dont le bas dépasse sous l'en-tête = celui qu'on est en train de lire
    let i = liste.findIndex((el) => el.getBoundingClientRect().bottom > haut);
    if (i < 0) i = liste.length - 1;
    const donnees = lire();
    if (i < 0) { delete donnees[v]; ecrire(donnees); return; }
    const debutVersion = etat.set.getBoundingClientRect().top;
    donnees[v] = {
      i,
      decalage: Math.round(liste[i].getBoundingClientRect().top - haut),
      // Encore au-dessus du début des onglets : on ne mémorise rien de particulier
      avantDebut: debutVersion > haut,
    };
    ecrire(donnees);
  }

  function restaurer(v) {
    const pos = lire()[v];
    const haut = hauteurEnTete();
    enCours = true;
    let cible;
    if (pos && !pos.avantDebut) {
      const liste = reperes(v);
      const el = liste[Math.min(pos.i, liste.length - 1)];
      if (el) {
        cible = window.scrollY + el.getBoundingClientRect().top - haut - pos.decalage;
        surligner(el);
      }
    }
    if (cible === undefined) {
      // Première visite de cette version : on se place au début des onglets,
      // sauf si on y est déjà (on ne bouge pas l'écran pour rien)
      const debut = etat.set.getBoundingClientRect().top;
      cible = debut < haut ? window.scrollY + debut - haut : window.scrollY;
    }
    window.scrollTo({ top: Math.max(0, cible), behavior: "instant" });
    // Les formules ou les images peuvent encore décaler la page : on recale une fois
    setTimeout(() => {
      if (pos && !pos.avantDebut) {
        const liste = reperes(v);
        const el = liste[Math.min(pos.i, liste.length - 1)];
        if (el) {
          const ecart = el.getBoundingClientRect().top - hauteurEnTete() - pos.decalage;
          if (Math.abs(ecart) > 4) window.scrollBy({ top: ecart, behavior: "instant" });
        }
      }
      enCours = false;
    }, 120);
  }

  function surligner(el) {
    el.classList.remove("version-retrouvee");
    void el.offsetWidth; // relance l'animation
    el.classList.add("version-retrouvee");
    setTimeout(() => el.classList.remove("version-retrouvee"), 1300);
  }

  // ---------- Changement de version ----------
  function basculer() {
    if (!etat) return;
    enregistrer();
    const cible = autre(active());
    etat.inputs[cible].checked = true;
    etat.inputs[cible].dispatchEvent(new Event("change", { bubbles: true }));
  }

  // Appelé à chaque changement d'onglet (bouton flottant OU clic sur les onglets du haut)
  function apresChangement() {
    majBouton();
    requestAnimationFrame(() => requestAnimationFrame(() => restaurer(active())));
  }

  // ---------- Bouton flottant ----------
  function creerBouton() {
    bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "versions-bascule";
    bouton.innerHTML = `
      <span class="versions-bascule__option" data-v="simplifiee">Simplifiée</span>
      <span class="versions-bascule__option" data-v="papier">Papier</span>
      <span class="versions-bascule__curseur" aria-hidden="true"></span>`;
    bouton.addEventListener("click", basculer);
    document.body.appendChild(bouton);
  }

  function majBouton() {
    if (!bouton) return;
    const v = active();
    bouton.dataset.active = v;
    bouton.setAttribute("aria-label", `Passer à la ${LIBELLES[autre(v)].toLowerCase()} (touches ← → ou V)`);
    bouton.title = `Passer à la ${LIBELLES[autre(v)].toLowerCase()} · touches ← → ou V`;
    bouton.querySelectorAll(".versions-bascule__option").forEach((o) => {
      o.classList.toggle("est-active", o.dataset.v === v);
    });
  }

  // ---------- Suivi ----------
  let minuterie = null;
  function surDefilement() {
    clearTimeout(minuterie);
    minuterie = setTimeout(enregistrer, 150);
  }

  function surTouche(e) {
    if (!etat || e.ctrlKey || e.metaKey || e.altKey) return;
    const cible = e.target;
    // Les onglets sont des boutons radio : après un clic sur un onglet, le navigateur
    // fait changer de version avec les 4 flèches. On garde ← → pour les versions
    // et on rend ↑ ↓ au défilement de la page.
    const surOnglet = Object.values(etat.inputs).includes(cible);
    const champ = !surOnglet && cible.closest("input, textarea, select, [contenteditable]");

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!surOnglet) return; // défilement normal du navigateur
      e.preventDefault();
      cible.blur(); // les flèches suivantes font défiler la page nativement
      window.scrollBy({ top: e.key === "ArrowDown" ? 40 : -40 });
      return;
    }
    if (champ) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const voulue = e.key === "ArrowLeft" ? "simplifiee" : "papier";
      if (active() !== voulue) basculer();
      return;
    }
    if (e.key === "v" || e.key === "V") {
      e.preventDefault();
      basculer();
    }
  }

  function initialiser() {
    // Nettoyage de la page précédente (navigation instantanée)
    window.removeEventListener("scroll", surDefilement);
    document.removeEventListener("keydown", surTouche);
    bouton?.remove();
    bouton = null;

    etat = trouverOnglets();
    if (!etat) return;

    creerBouton();
    majBouton();
    Object.values(etat.inputs).forEach((input) => input.addEventListener("change", apresChangement));
    // Clic sur les onglets du haut : on mémorise la position AVANT que la version change
    etat.set.querySelectorAll(":scope > .tabbed-labels > label").forEach((label) => {
      label.addEventListener("pointerdown", enregistrer);
      label.addEventListener("keydown", enregistrer);
    });
    window.addEventListener("scroll", surDefilement, { passive: true });
    document.addEventListener("keydown", surTouche);
  }

  if (typeof document$ !== "undefined") document$.subscribe(initialiser);
  else document.addEventListener("DOMContentLoaded", initialiser);
})();
