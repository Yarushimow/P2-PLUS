window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
  },
};

// Chargement à la demande : MathJax (~260 Ko) et le simulateur de probas ne sont
// téléchargés que sur les pages qui en ont besoin, une seule fois par visite.
(() => {
  const MATHJAX = "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js";
  const ici = document.currentScript?.src || location.href;
  const charges = new Set();

  function charger(src) {
    if (charges.has(src)) return false;
    charges.add(src);
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
    return true;
  }

  function surPage() {
    // Le simulateur génère ses formules lui-même : il a besoin de MathJax aussi
    if (document.getElementById("simulateur-proba")) {
      charger(new URL("simulateur-proba.js", ici).href);
    }
    if (!document.querySelector(".arithmatex, #simulateur-proba")) return;

    // Premier chargement : MathJax met en forme la page tout seul au démarrage
    if (charger(MATHJAX)) return;

    // Pages suivantes (navigation.instant) : re-rendre les formules
    const mj = window.MathJax;
    if (!mj?.startup?.promise) return; // encore en train de charger : il traitera la page à son démarrage
    mj.startup.promise.then(() => {
      mj.startup.output.clearCache();
      mj.typesetClear();
      mj.texReset();
      return mj.typesetPromise();
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(surPage);
  else document.addEventListener("DOMContentLoaded", surPage);
})();
