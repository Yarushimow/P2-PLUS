// Boutons d'export en haut de chaque page (overrides/partials/actions.html) :
//  - PDF : ouvre l'impression du navigateur → « Enregistrer au format PDF » ;
//    les styles d'impression retirent l'en-tête, les menus et le fond animé ;
//  - Markdown : télécharge la source de la page depuis GitHub (dépôt public).
// Écoute sur le document : marche aussi après une navigation instantanée.
(() => {
  // Nom du fichier : dernier segment de l'adresse (« index » → dossier parent)
  function nomFichier(source) {
    const morceaux = new URL(source).pathname.split("/").filter(Boolean);
    let nom = morceaux.pop().replace(/\.md$/, "");
    if (nom === "index") nom = morceaux.pop() || "accueil";
    if (nom === "docs") nom = "accueil";
    return `${decodeURIComponent(nom)}.md`;
  }

  async function telechargerMarkdown(bouton) {
    if (bouton.getAttribute("aria-busy") === "true") return;
    bouton.setAttribute("aria-busy", "true");
    try {
      const reponse = await fetch(bouton.dataset.source, { cache: "no-store" });
      if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
      const blob = new Blob([await reponse.text()], { type: "text/markdown;charset=utf-8" });
      const lien = document.createElement("a");
      lien.href = URL.createObjectURL(blob);
      lien.download = nomFichier(bouton.dataset.source);
      document.body.append(lien);
      lien.click();
      lien.remove();
      setTimeout(() => URL.revokeObjectURL(lien.href), 1000);
    } catch {
      // GitHub injoignable : on ouvre la source dans un nouvel onglet
      window.open(bouton.dataset.source, "_blank", "noopener");
    } finally {
      bouton.removeAttribute("aria-busy");
    }
  }

  document.addEventListener("click", (ev) => {
    const bouton = ev.target.closest?.(".export-bouton");
    if (!bouton) return;
    if (bouton.classList.contains("export-pdf")) window.print();
    else if (bouton.classList.contains("export-md")) telechargerMarkdown(bouton);
  });
})();
