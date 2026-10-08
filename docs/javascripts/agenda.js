// Comptes à rebours alimentés par docs/data/calendrier.json (voir outils/sync_calendrier.py).
//
// Emplacements reconnus dans les pages Markdown :
//   <div class="agenda-evaluations" data-limite="6"></div>   prochaines évaluations (CE / DE)
//   <div class="agenda-matiere" data-module="TE302P"></div>  résumé d'une matière
//   <div class="agenda-tableau"></div>                        tableau de toutes les matières

(() => {
  const EVALUATIONS = new Set(["CE", "DE"]);
  const LIBELLES = {
    CE: "Contrôle (CE)", DE: "Devoir écrit (DE)", CTD: "Cours-TD", CTP: "Cours-TP",
    TP: "TP", PRJ: "Projet", TD: "TD", CM: "Cours",
  };
  const formatDate = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long",
    hour: "2-digit", minute: "2-digit",
  });
  const formatJour = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris", day: "numeric", month: "long",
  });

  let donnees = null;
  let minuterie = null;

  function racineSite() {
    try {
      const config = JSON.parse(document.getElementById("__config").textContent);
      return new URL(config.base + "/", location.href);
    } catch {
      return new URL("/", location.href);
    }
  }

  async function charger() {
    if (donnees) return donnees;
    const reponse = await fetch(new URL("data/calendrier.json", racineSite()), { cache: "no-cache" });
    if (!reponse.ok) throw new Error(reponse.status);
    const brut = await reponse.json();
    brut.seances.forEach((s) => { s.t0 = Date.parse(s.debut); s.t1 = Date.parse(s.fin); });
    donnees = brut;
    return donnees;
  }

  const echapper = (texte) => String(texte).replace(/[&<>"]/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function lienMatiere(code) {
    const module = donnees.modules[code];
    return module ? new URL(module.page, racineSite()).href : null;
  }

  function compteARebours(cible, maintenant) {
    let reste = Math.max(0, Math.floor((cible - maintenant) / 1000));
    const j = Math.floor(reste / 86400); reste %= 86400;
    const h = Math.floor(reste / 3600); reste %= 3600;
    const m = Math.floor(reste / 60); const s = reste % 60;
    const deux = (n) => String(n).padStart(2, "0");
    return `${j > 0 ? `${j} j ` : ""}${deux(h)} h ${deux(m)} min ${deux(s)} s`;
  }

  function urgence(cible, maintenant) {
    const jours = (cible - maintenant) / 86400000;
    return jours < 2 ? "urgent" : jours < 7 ? "bientot" : "";
  }

  // Éléments <span data-cible="…"> mis à jour chaque seconde
  function horloge(s) {
    return `<span class="agenda-horloge" data-debut="${s.t0}" data-fin="${s.t1}"></span>`;
  }

  function actualiserHorloges() {
    const maintenant = Date.now();
    document.querySelectorAll(".agenda-horloge").forEach((el) => {
      const t0 = Number(el.dataset.debut); const t1 = Number(el.dataset.fin);
      const carte = el.closest(".agenda-carte");
      if (maintenant >= t1) { el.textContent = "terminé"; carte?.classList.add("passe"); return; }
      if (maintenant >= t0) { el.textContent = "en cours"; carte?.classList.add("urgent"); return; }
      el.textContent = compteARebours(t0, maintenant);
      if (carte) {
        carte.classList.remove("urgent", "bientot");
        const u = urgence(t0, maintenant);
        if (u) carte.classList.add(u);
      }
    });
  }

  function carteEvaluation(s) {
    const lien = lienMatiere(s.module);
    const supports = s.supports ? `<span class="agenda-supports">${echapper(s.supports)}</span>` : "";
    const contenu = `
      <div class="agenda-type agenda-${s.type}">${s.type}</div>
      <div class="agenda-infos">
        <strong>${echapper(s.titre)}</strong>
        <span>${formatDate.format(s.t0)}</span>${supports}
      </div>
      <div class="agenda-reste">${horloge(s)}</div>`;

    // Toute la carte est cliquable quand la matière a une page : on enveloppe
    // le contenu dans un <a> plutôt que de ne rendre que le titre cliquable.
    return lien
      ? `<a class="agenda-carte" href="${lien}">${contenu}</a>`
      : `<div class="agenda-carte">${contenu}</div>`;
  }

  function rendreEvaluations(el, maintenant) {
    const limite = Number(el.dataset.limite || 0);
    let a_venir = donnees.seances.filter((s) => EVALUATIONS.has(s.type) && s.t1 > maintenant);
    if (el.dataset.module) a_venir = a_venir.filter((s) => s.module === el.dataset.module);
    if (limite) a_venir = a_venir.slice(0, limite);
    el.innerHTML = a_venir.length
      ? a_venir.map(carteEvaluation).join("")
      : `<p class="agenda-vide">Aucune évaluation à venir dans l'agenda.</p>`;
  }

  function resume(code, maintenant) {
    const seances = donnees.seances.filter((s) => s.module === code);
    const cours = seances.filter((s) => !EVALUATIONS.has(s.type));
    const restants = cours.filter((s) => s.t1 > maintenant);
    const parType = {};
    restants.forEach((s) => { parType[s.type] = (parType[s.type] || 0) + 1; });
    const heures = restants.reduce((total, s) => total + (s.t1 - s.t0) / 3600000, 0);
    return {
      restants, parType, heures,
      prochaineEval: seances.find((s) => EVALUATIONS.has(s.type) && s.t1 > maintenant),
      prochainCours: restants[0],
      dernierCours: cours[cours.length - 1],
    };
  }

  const detailTypes = (parType) => Object.entries(parType)
    .map(([type, n]) => `${n} ${LIBELLES[type] || type}`).join(" · ");

  function rendreMatiere(el, maintenant) {
    const code = el.dataset.module;
    const r = resume(code, maintenant);
    const evaluation = r.prochaineEval
      ? carteEvaluation(r.prochaineEval)
      : `<p class="agenda-vide">Pas d'évaluation à venir dans l'agenda pour ${echapper(code)}.</p>`;
    const cours = r.restants.length
      ? `<p><strong>${r.restants.length} séance${r.restants.length > 1 ? "s" : ""} restante${r.restants.length > 1 ? "s" : ""}</strong>
           (${Math.round(r.heures)} h) : ${detailTypes(r.parType)}<br>
           Prochaine : ${formatDate.format(r.prochainCours.t0)} ·
           dernière : ${formatJour.format(r.dernierCours.t0)}</p>`
      : `<p>Plus aucune séance de cours prévue.</p>`;
    el.innerHTML = `<div class="admonition info agenda-bloc">
      <p class="admonition-title">Agenda ${echapper(code)}</p>${evaluation}${cours}</div>`;
  }

  function rendreTableau(el, maintenant) {
    const lignes = Object.keys(donnees.modules).map((code) => {
      const r = resume(code, maintenant);
      const lien = lienMatiere(code);
      const evalTxt = r.prochaineEval
        ? `${r.prochaineEval.type} · ${formatJour.format(r.prochaineEval.t0)}<br>${horloge(r.prochaineEval)}`
        : "—";
      return `<tr>
        <td><a href="${lien}">${echapper(donnees.modules[code].titre)}</a><br><code>${code}</code></td>
        <td>${evalTxt}</td>
        <td><strong>${r.restants.length}</strong> (${Math.round(r.heures)} h)<br><small>${detailTypes(r.parType)}</small></td>
        <td>${r.dernierCours ? formatJour.format(r.dernierCours.t0) : "—"}</td>
      </tr>`;
    }).join("");
    el.innerHTML = `<table><thead><tr><th>Matière</th><th>Prochaine évaluation</th>
      <th>Séances restantes</th><th>Dernier cours</th></tr></thead><tbody>${lignes}</tbody></table>`;
  }

  async function initialiser() {
    clearInterval(minuterie);
    const emplacements = document.querySelectorAll(".agenda-evaluations, .agenda-matiere, .agenda-tableau");
    if (!emplacements.length) return;
    try {
      await charger();
    } catch {
      emplacements.forEach((el) => { el.innerHTML = `<p class="agenda-vide">Agenda indisponible.</p>`; });
      return;
    }
    const maintenant = Date.now();
    document.querySelectorAll(".agenda-evaluations").forEach((el) => rendreEvaluations(el, maintenant));
    document.querySelectorAll(".agenda-matiere").forEach((el) => rendreMatiere(el, maintenant));
    document.querySelectorAll(".agenda-tableau").forEach((el) => rendreTableau(el, maintenant));
    document.querySelectorAll(".agenda-maj").forEach((el) => {
      el.textContent = formatDate.format(Date.parse(donnees.maj));
    });
    actualiserHorloges();
    minuterie = setInterval(actualiserHorloges, 1000);
  }

  // navigation.instant : les pages sont chargées sans rechargement complet
  if (typeof document$ !== "undefined") document$.subscribe(initialiser);
  else document.addEventListener("DOMContentLoaded", initialiser);
})();
