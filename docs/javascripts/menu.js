// Allège le menu de gauche : retire les préfixes répétitifs ("Fiche — ", "TD 2 — "…)
// déjà donnés par la section parente. Le titre complet reste dans l'info-bulle.
(() => {
  const PREFIXES = [/^Fiche(?: CE)?\s*[—–-]\s*/i, /^(TD\s*\d+)\s*[—–-]\s*/i, /^(Ch\.\s*\d+)\s*[—–-]\s*/i];

  function alleger() {
    document.querySelectorAll(".md-sidebar--primary .md-nav__link .md-ellipsis").forEach((el) => {
      if (el.dataset.allege) return;
      const texte = el.textContent.trim();
      let court = texte;
      for (const re of PREFIXES) {
        const m = texte.match(re);
        if (m) {
          // "TD 2 — Lorentz" → "TD 2 · Lorentz" ; "Fiche — Bascules" → "Bascules"
          court = m[1] ? `${m[1]} · ${texte.slice(m[0].length)}` : texte.slice(m[0].length);
          break;
        }
      }
      if (court !== texte) {
        el.textContent = court;
        el.closest(".md-nav__link")?.setAttribute("title", texte);
      }
      el.dataset.allege = "1";
    });
  }

  // Matières : "Physique moderne (SP303P)" → nom + code en badge.
  // Sections : data-section="cours|td|fiches|entrainement" pour l'icône.
  const SECTIONS = { cours: "cours", td: "td", fiches: "fiches", "entraînement": "entrainement", entrainement: "entrainement", annales: "annales" };

  const SECTIONS_PROTEGEES = ["systemes-numeriques/tp/"];

  function structurer() {
    document.querySelectorAll('.md-nav[data-md-level="1"] > .md-nav__list > .md-nav__item').forEach((item) => {
      const el = item.querySelector(":scope > .md-nav__link .md-ellipsis, :scope > .md-nav__container > .md-nav__link:first-child .md-ellipsis");
      if (!el || el.querySelector(".nav-matiere")) return;
      const m = el.textContent.trim().match(/^(.*?)\s*\(([A-Z]{2}\d{3}[A-Z]?)\)$/);
      if (!m) return;
      el.innerHTML = `<span class="nav-matiere"><span class="nav-matiere__nom"></span><span class="nav-matiere__code"></span></span>`;
      el.querySelector(".nav-matiere__nom").textContent = m[1];
      el.querySelector(".nav-matiere__code").textContent = m[2];
    });
    document.querySelectorAll('.md-nav[data-md-level="2"] > .md-nav__list > .md-nav__item').forEach((item) => {
      const el = item.querySelector(":scope > .md-nav__link, :scope > .md-nav__container > .md-nav__link:first-child");
      const cle = SECTIONS[el?.textContent.trim().toLowerCase()];
      if (cle) item.dataset.section = cle;
      // Sections protégées par mot de passe (outils/coffre.py) : cadenas
      // (liens relatifs dans le menu : on compare les URL absolues)
      const liens = [...item.querySelectorAll("a[href]")].map((a) => a.href);
      if (liens.some((url) => SECTIONS_PROTEGEES.some((chemin) => url.includes(chemin)))) {
        item.dataset.section = "protegee";
      }
    });
  }

  function initialiser() { alleger(); structurer(); }

  if (typeof document$ !== "undefined") document$.subscribe(initialiser);
  else document.addEventListener("DOMContentLoaded", initialiser);
})();
