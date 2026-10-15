// Pages protégées par mot de passe (section TP de Systèmes numériques).
//
// Le contenu est chiffré dans le dépôt (outils/coffre.py) : AES-256-GCM, clé
// dérivée du mot de passe par PBKDF2-SHA256. Rien n'est lisible sans le mot de
// passe, qui n'est stocké nulle part : le déchiffrement se fait ici, dans le
// navigateur. Une fois la bonne clé trouvée, on la garde pour la session (ou sur
// l'appareil si « Se souvenir » est coché) pour ne pas la redemander à chaque page.

(() => {
  const CLE_STOCKAGE = "coffre-tp";
  const enc = new TextEncoder();
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const versB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

  const configs = {}; // url de coffre.json -> promesse de config

  function config(urlBin) {
    const url = new URL("coffre.json", urlBin).href;
    configs[url] ??= fetch(url).then((r) => r.json());
    return configs[url];
  }

  async function deriver(mdp, conf) {
    const base = await crypto.subtle.importKey("raw", enc.encode(mdp), "PBKDF2", false, ["deriveBits"]);
    return crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt: b64(conf.sel), iterations: conf.iterations },
      base, 256);
  }

  async function dechiffrer(brut, urlBin) {
    const r = await fetch(urlBin);
    if (!r.ok) throw new Error("introuvable");
    const blob = new Uint8Array(await r.arrayBuffer());
    const cle = await crypto.subtle.importKey("raw", brut, "AES-GCM", false, ["decrypt"]);
    return crypto.subtle.decrypt({ name: "AES-GCM", iv: blob.slice(4, 16) }, cle, blob.slice(16));
  }

  // ---------- Clé mémorisée ----------
  function lireCle(sel) {
    for (const stock of [sessionStorage, localStorage]) {
      try {
        const v = JSON.parse(stock.getItem(CLE_STOCKAGE));
        if (v && v.sel === sel) return b64(v.cle);
      } catch { /* stockage indisponible */ }
    }
    return null;
  }
  function garderCle(brut, sel, surAppareil) {
    const v = JSON.stringify({ sel, cle: versB64(brut) });
    try { sessionStorage.setItem(CLE_STOCKAGE, v); } catch { /* */ }
    try { if (surAppareil) localStorage.setItem(CLE_STOCKAGE, v); } catch { /* */ }
  }
  function oublierCle() {
    try { sessionStorage.removeItem(CLE_STOCKAGE); } catch { /* */ }
    try { localStorage.removeItem(CLE_STOCKAGE); } catch { /* */ }
  }

  // ---------- Affichage ----------
  function afficher(zone, page, brut) {
    zone.innerHTML = page.html;
    // Le titre de la page est déjà affiché par le thème au-dessus de la zone
    if (zone.closest("article")?.querySelector("h1:not(.coffre h1)")) zone.querySelector(":scope > h1")?.remove();
    zone.classList.add("coffre--ouvert");
    zone.dataset.ouvert = "1";
    const verrouiller = document.createElement("button");
    verrouiller.type = "button";
    verrouiller.className = "coffre-verrouiller";
    verrouiller.textContent = "🔒 Verrouiller";
    verrouiller.title = "Oublier le mot de passe sur cet appareil";
    verrouiller.onclick = () => { oublierCle(); location.reload(); };
    zone.appendChild(verrouiller);
    zone._cle = brut;
    // Formules éventuelles
    if (zone.querySelector(".arithmatex") && window.MathJax?.typesetPromise) {
      MathJax.typesetPromise([zone]).catch(() => {});
    }
  }

  function formulaire(zone, conf, urlBin) {
    zone.innerHTML = `
      <form class="coffre-form" autocomplete="off">
        <div class="coffre-icone" aria-hidden="true">🔒</div>
        <h2>Section protégée</h2>
        <p>Le contenu des TP est chiffré. Entre le mot de passe pour l'afficher.</p>
        <div class="coffre-ligne">
          <input type="password" class="coffre-mdp" placeholder="Mot de passe" aria-label="Mot de passe" required>
          <button type="submit" class="md-button md-button--primary">Déverrouiller</button>
        </div>
        <label class="coffre-souvenir"><input type="checkbox"> Se souvenir sur cet appareil</label>
        <p class="coffre-erreur" role="alert" hidden></p>
      </form>`;
    const form = zone.querySelector("form");
    const champ = zone.querySelector(".coffre-mdp");
    const erreur = zone.querySelector(".coffre-erreur");
    const bouton = form.querySelector("button");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      bouton.disabled = true;
      bouton.textContent = "Vérification…";
      erreur.hidden = true;
      try {
        const brut = await deriver(champ.value, conf);
        const page = JSON.parse(new TextDecoder().decode(await dechiffrer(brut, urlBin)));
        garderCle(brut, conf.sel, zone.querySelector(".coffre-souvenir input").checked);
        afficher(zone, page, brut);
      } catch {
        erreur.textContent = "Mot de passe incorrect.";
        erreur.hidden = false;
        form.classList.remove("coffre-secoue");
        void form.offsetWidth;
        form.classList.add("coffre-secoue");
        champ.select();
      } finally {
        bouton.disabled = false;
        bouton.textContent = "Déverrouiller";
      }
    });
    champ.focus({ preventScroll: true });
  }

  async function monter(zone) {
    if (zone.dataset.monte) return;
    zone.dataset.monte = "1";
    const urlBin = new URL(zone.dataset.coffre, location.href).href;
    if (!window.crypto?.subtle) {
      zone.innerHTML = "<p>Ce navigateur ne permet pas de déchiffrer la page (connexion HTTPS requise).</p>";
      return;
    }
    const conf = await config(urlBin);
    const brut = lireCle(conf.sel);
    if (brut) {
      try {
        const page = JSON.parse(new TextDecoder().decode(await dechiffrer(brut, urlBin)));
        afficher(zone, page, brut);
        return;
      } catch { oublierCle(); /* clé périmée (mot de passe changé) */ }
    }
    formulaire(zone, conf, urlBin);
  }

  // ---------- Fichiers joints chiffrés (PDF, Multisim…) ----------
  const TYPES = { pdf: "application/pdf" };

  document.addEventListener("click", async (e) => {
    const lien = e.target.closest("a[data-coffre]");
    if (!lien) return;
    e.preventDefault();
    e.stopPropagation();
    const zone = lien.closest(".coffre");
    if (!zone?._cle) return;
    // Ouvrir l'onglet tout de suite (sinon le navigateur bloque la fenêtre)
    const onglet = lien.dataset.ouvrir ? window.open("", "_blank") : null;
    lien.classList.add("coffre-chargement");
    try {
      const urlBin = new URL(lien.dataset.coffre, location.href).href;
      const donnees = await dechiffrer(zone._cle, urlBin);
      const ext = lien.dataset.nom.split(".").pop().toLowerCase();
      const url = URL.createObjectURL(new Blob([donnees], { type: TYPES[ext] || "application/octet-stream" }));
      if (onglet) {
        onglet.location.href = url;
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = lien.dataset.nom;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      onglet?.close();
      alert("Impossible d'ouvrir ce fichier.");
    } finally {
      lien.classList.remove("coffre-chargement");
    }
  }, true);

  function initialiser() {
    document.querySelectorAll(".coffre[data-coffre]").forEach(monter);
  }

  if (typeof document$ !== "undefined") document$.subscribe(initialiser);
  else document.addEventListener("DOMContentLoaded", initialiser);
})();
