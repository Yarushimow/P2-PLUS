// Assistant de révision IA : envoie la question à l'API du projet IA-Assistant-Revision
// et affiche la réponse. Emplacement reconnu : la page assistant.md (#assistant-question).
(() => {
  const API = "http://127.0.0.1:8000";   // locale pour l'instant ; l'adresse en ligne viendra à la mise en ligne

  async function poser() {
    const champ = document.getElementById("assistant-question");
    const zone = document.getElementById("assistant-resultat");
    const q = champ.value.trim();
    if (!q) return;                                       // question vide : on ne fait rien

    zone.innerHTML = "<p>⏳ Recherche dans tes fiches…</p>";

    try {
      // 1. Appeler l'API
      const reponse = await fetch(`${API}/question?q=${encodeURIComponent(q)}`);
      const data = await reponse.json();

      // 2. Erreur renvoyée par l'API (400, 503…)
      if (!reponse.ok) {
        zone.innerHTML = `<p class="assistant-erreur">⚠️ ${data.detail}</p>`;
        return;
      }

      // 3. La réponse Markdown → HTML (les tableaux prennent le style du site)
      let html = marked.parse(data.reponse);

      // 4. Les sources, sauf si l'assistant n'a rien trouvé
      if (!data.reponse.startsWith("Je ne trouve pas")) {
        html += "<p class='assistant-sources'><b>Sources :</b></p><ul class='assistant-sources'>";
        for (const s of data.sources) {
          html += `<li>${s.fiche} › ${s.section}</li>`;
        }
        html += "</ul>";
      }
      zone.innerHTML = html;

    } catch (erreur) {
      zone.innerHTML = "<p class='assistant-erreur'>⚠️ Impossible de joindre l'assistant. L'API est-elle lancée ?</p>";
    }
  }

  // Appelée à CHAQUE affichage de page (navigation.instant)
  function initialiser() {
    const champ = document.getElementById("assistant-question");
    if (!champ) return;                                       // on n'est pas sur la page de l'assistant

    document.getElementById("assistant-bouton").addEventListener("click", poser);
    champ.addEventListener("keydown", (e) => {
      if (e.key === "Enter") poser();
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(initialiser);
  else document.addEventListener("DOMContentLoaded", initialiser);
})();