// Logo chauve-souris du pied de page : ouvre le GitHub de FireWall-code dans
// un nouvel onglet. C'est un bouton (pas un lien) pour que le navigateur
// n'affiche pas l'adresse en bas de la fenêtre au survol.
// Écoute sur le document : marche aussi après une navigation instantanée.
document.addEventListener("click", (ev) => {
  const bouton = ev.target.closest?.(".logo-pied[data-lien]");
  if (bouton) window.open(bouton.dataset.lien, "_blank", "noopener");
});
