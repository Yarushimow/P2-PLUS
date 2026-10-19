// Accueil : fond de particules sur toute la page, qui réagit au curseur.
// Constellation à la particles.js (réglages du fond d'écran « Particles ») :
// points qui dérivent, reliés par des fils fins ; au survol, le curseur
// « attrape » les particules proches ; un clic dans le vide en ajoute 4.
// Sans JavaScript ou avec « réduire les animations », la page reste statique.
(() => {
  const reduire = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduire) return;

  const LIEN = 120;      // distance max. d'un fil entre deux particules
  const ATTRAPE = 140;   // distance max. d'un fil vers le curseur
  // Points : gris #606060 en sombre, indigo #4f46e5 en clair.
  // Fils : blancs en sombre, ardoise en clair.
  const TEINTES = {
    sombre: { point: "rgb(96, 96, 96)", fil: [255, 255, 255], force: 0.4 },
    clair: { point: "rgb(79, 70, 229)", fil: [30, 41, 59], force: 0.28 },
  };
  const teinte = () =>
    TEINTES[document.body.getAttribute("data-md-color-scheme") === "slate" ? "sombre" : "clair"];
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  // Le fond se calme quand la souris est sur un élément avec lequel on interagit
  const CALME = "a, button, input, label, .md-button, .grid.cards > ul > li, .grid > .card, "
    + ".agenda-carte, .md-header, .md-tabs";

  function particule(l, h, x, y) {
    const angle = Math.random() * Math.PI * 2, v = 0.15 + Math.random() * 0.45;
    return {
      x: x ?? Math.random() * l, y: y ?? Math.random() * h,
      vx: Math.cos(angle) * v, vy: Math.sin(angle) * v,
      r: 0.6 + Math.random() * 1.6,
    };
  }

  let arreter = null;

  function lancer() {
    const canvas = document.createElement("canvas");
    canvas.className = "fond-accueil";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    document.documentElement.classList.add("fond-actif");
    const ctx = canvas.getContext("2d");

    let l = 0, h = 0, pts = [], max = 0, image = 0;
    let t = teinte();
    const souris = { x: -1e4, y: -1e4, cx: -1e4, cy: -1e4, dedans: false, force: 0 };

    function redimensionner() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      l = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(l * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Densité de particles.js : 100 particules pour 1000 × 1000 px
      const n = Math.round(Math.min(220, (l * h) / 10000));
      pts = Array.from({ length: n }, () => particule(l, h));
      max = n + 40;
    }

    function bouger(ev) {
      souris.cx = ev.clientX;
      souris.cy = ev.clientY;
      souris.dedans = !ev.target.closest?.(CALME);
    }
    const sortir = () => { souris.dedans = false; };
    function cliquer(ev) {
      if (ev.target.closest?.(CALME)) return;
      for (let i = 0; i < 4; i++) pts.push(particule(l, h, ev.clientX, ev.clientY));
      if (pts.length > max) pts.splice(0, pts.length - max);
    }

    function dessiner() {
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        // Sortie d'un côté → retour de l'autre
        if (p.x < -10) p.x = l + 10; else if (p.x > l + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y;
          if (dx > LIEN || dx < -LIEN || dy > LIEN || dy < -LIEN) continue;
          const d = Math.hypot(dx, dy);
          if (d < LIEN) {
            ctx.strokeStyle = rgba(t.fil, t.force * (1 - d / LIEN));
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // Fils du curseur vers les particules proches
        if (souris.force > 0.01) {
          const d = Math.hypot(a.x - souris.x, a.y - souris.y);
          if (d < ATTRAPE) {
            ctx.strokeStyle = rgba(t.fil, Math.min(1, t.force * 2.2) * souris.force * (1 - d / ATTRAPE));
            ctx.beginPath(); ctx.moveTo(souris.x, souris.y); ctx.lineTo(a.x, a.y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = t.point;
      ctx.beginPath();
      for (const p of pts) {
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    function boucle() {
      image = requestAnimationFrame(boucle);
      if (document.hidden) return;
      // Curseur lissé ; la « force » monte doucement et retombe plus vite
      if (souris.x < -1e3) { souris.x = souris.cx; souris.y = souris.cy; }
      souris.x += (souris.cx - souris.x) * 0.18;
      souris.y += (souris.cy - souris.y) * 0.18;
      souris.force += ((souris.dedans ? 1 : 0) - souris.force) * (souris.dedans ? 0.06 : 0.12);
      ctx.clearRect(0, 0, l, h);
      dessiner();
    }

    const theme = new MutationObserver(() => { t = teinte(); });
    theme.observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });
    window.addEventListener("resize", redimensionner);
    window.addEventListener("pointermove", bouger, { passive: true });
    document.addEventListener("pointerleave", sortir);
    window.addEventListener("click", cliquer);

    redimensionner();
    image = requestAnimationFrame(boucle);

    return () => {
      cancelAnimationFrame(image);
      theme.disconnect();
      window.removeEventListener("resize", redimensionner);
      window.removeEventListener("pointermove", bouger);
      document.removeEventListener("pointerleave", sortir);
      window.removeEventListener("click", cliquer);
      document.documentElement.classList.remove("fond-actif");
      canvas.remove();
    };
  }

  function demarrer() {
    arreter?.();
    arreter = null;
    if (document.querySelector(".md-typeset .accueil-hero")) arreter = lancer();
  }

  if (typeof document$ !== "undefined") document$.subscribe(demarrer);
  else document.addEventListener("DOMContentLoaded", demarrer);
})();
