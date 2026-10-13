// Simulateur d'exercices de probabilités (SM301P, chapitres 1 à 3) : 39 types, un par formule du cours.
//
// Emplacement dans une page Markdown :
//   <div id="simulateur-proba"></div>
//
// Chaque générateur renvoie un exercice aux valeurs aléatoires :
//   { titre, enonce, questions: [{ label, type: "num" | "choix", reponse, options? }], indice, correction }
// Les formules sont écrites en LaTeX et rendues par MathJax (classe .arithmatex).

(() => {
  "use strict";

  // ------------------------------------------------------------------
  // Outils
  // ------------------------------------------------------------------
  const T = String.raw;
  const m = (tex) => `<span class="arithmatex">\\(${tex}\\)</span>`;
  const M = (tex) => `<div class="arithmatex">\\[${tex}\\]</div>`;
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (liste) => liste[Math.floor(Math.random() * liste.length)];
  const melange = (liste) => {
    const l = [...liste];
    for (let i = l.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [l[i], l[j]] = [l[j], l[i]];
    }
    return l;
  };

  function pgcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a || 1;
  }

  class Fr {
    constructor(n, d = 1) {
      if (d < 0) { n = -n; d = -d; }
      const g = pgcd(n, d);
      this.n = n / g;
      this.d = d / g;
    }
    static of(x) { return x instanceof Fr ? x : new Fr(x, 1); }
    add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
    div(o) { o = Fr.of(o); return new Fr(this.n * o.d, this.d * o.n); }
    eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
    val() { return this.n / this.d; }
    tex() {
      if (this.d === 1) return String(this.n);
      return `${this.n < 0 ? "-" : ""}\\frac{${Math.abs(this.n)}}{${this.d}}`;
    }
  }
  const UN = new Fr(1);
  const somme = (liste) => liste.reduce((s, x) => s.add(x), new Fr(0));

  // Nombre décimal « à la française » pour LaTeX (0{,}375)
  function nb(x, k = 4) {
    if (!Number.isFinite(x)) return "?";
    if (x !== 0 && Math.abs(x) < 1e-3) {
      const [mant, exp] = x.toExponential(2).split("e");
      return `${String(Number(mant)).replace(".", "{,}")} \\times 10^{${Number(exp)}}`;
    }
    let r = Number(x.toFixed(k));
    if (Object.is(r, -0)) r = 0;
    return String(r).replace(".", "{,}");
  }
  const txt = (x, k = 4) => nb(x, k).replace("{,}", ",");

  function decimalesExactes(f) {
    let d = f.d;
    while (d % 2 === 0) d /= 2;
    while (d % 5 === 0) d /= 5;
    if (d !== 1) return Infinity;
    const s = String(Number(f.val().toFixed(8)));
    return (s.split(".")[1] || "").length;
  }
  // Valeur exacte d'une fraction, suivie de sa valeur décimale
  function vf(f) {
    if (f.d === 1) return String(f.n);
    const k = decimalesExactes(f);
    if (k <= 4) return `${f.tex()} = ${nb(f.val())}`;
    return `${f.tex()} \\approx ${nb(f.val())}`;
  }
  // Donnée de l'énoncé, écrite en décimal (valeurs exactes)
  const d = (f) => nb(Fr.of(f).val(), 6);

  function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
  function binom(n, k) {
    if (k < 0 || k > n) return 0;
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
    return Math.round(r);
  }

  // ------------------------------------------------------------------
  // Générateurs — chapitre 1
  // ------------------------------------------------------------------
  const GEN = [];
  const ajout = (chap, id, nom, f) => GEN.push({ chap, id, nom, f });

  ajout(1, "union", "Réunion, intersection, complémentaire", () => {
    let a, b, c;
    do { a = rnd(4, 14); b = rnd(4, 14); c = rnd(1, Math.min(a, b) - 1); } while (a + b - c > 19);
    const PA = new Fr(a, 20), PB = new Fr(b, 20), PAB = new Fr(c, 20);
    const PU = PA.add(PB).sub(PAB), PBb = UN.sub(PB);
    return {
      titre: "Réunion et intersection",
      enonce: `Soient ${m("A")} et ${m("B")} deux évènements tels que
        ${m(T`P(A) = ${d(PA)}`)}, ${m(T`P(\overline{B}) = ${d(PBb)}`)} et ${m(T`P(A \cup B) = ${d(PU)}`)}.`,
      questions: [
        { label: m(T`P(A \cap B)`), reponse: PAB.val() },
        { label: m(T`P(\overline{A} \cap \overline{B})`), reponse: UN.sub(PU).val() },
        { label: m(T`P(A \cap \overline{B})`), reponse: PA.sub(PAB).val() },
      ],
      indice: `Commence par ${m(T`P(B) = 1 - P(\overline{B})`)}. Ensuite :
        ${m(T`P(A \cup B) = P(A) + P(B) - P(A \cap B)`)}, puis De Morgan pour la 2e question.`,
      correction: `
        <p>${m(T`P(B) = 1 - ${d(PBb)} = ${d(PB)}`)}.</p>
        ${M(T`P(A \cap B) = P(A) + P(B) - P(A \cup B) = ${d(PA)} + ${d(PB)} - ${d(PU)} = ${d(PAB)}`)}
        ${M(T`P(\overline{A} \cap \overline{B}) = P(\overline{A \cup B}) = 1 - ${d(PU)} = ${d(UN.sub(PU))}`)}
        ${M(T`P(A \cap \overline{B}) = P(A) - P(A \cap B) = ${d(PA)} - ${d(PAB)} = ${d(PA.sub(PAB))}`)}
        <p>La dernière vient du découpage ${m(T`A = (A \cap B) \cup (A \cap \overline{B})`)} (union disjointe).</p>`,
    };
  });

  ajout(1, "poincare", "Formule de Poincaré (3 ensembles)", () => {
    const ctx = pick([
      { qui: "étudiants", noms: ["théâtre", "musique", "sport"], l: ["T", "M", "S"], verbe: "sont inscrits en" },
      { qui: "clients", noms: ["Netflix", "Spotify", "Deezer"], l: ["N", "S", "D"], verbe: "sont abonnés à" },
      { qui: "étudiants", noms: ["anglais", "espagnol", "chinois"], l: ["A", "E", "C"], verbe: "suivent l'option" },
    ]);
    const abc = rnd(2, 10);
    const ab = rnd(4, 25), ac = rnd(4, 25), bc = rnd(4, 25);
    const oa = rnd(15, 80), ob = rnd(15, 80), oc = rnd(10, 60);
    const aucun = rnd(20, 120);
    const N = abc + ab + ac + bc + oa + ob + oc + aucun;
    const [A, B, C] = ctx.l;
    const cA = oa + ab + ac + abc, cB = ob + ab + bc + abc, cC = oc + ac + bc + abc;
    const cAB = ab + abc, cAC = ac + abc, cBC = bc + abc;
    const union = cA + cB + cC - cAB - cAC - cBC + abc;
    const un = oa + ob + oc;
    return {
      titre: "Trois options (Poincaré)",
      enonce: `Sur ${N} ${ctx.qui} : ${cA} ${ctx.verbe} ${ctx.noms[0]} (${m(A)}), ${cB} en ${ctx.noms[1]} (${m(B)}),
        ${cC} en ${ctx.noms[2]} (${m(C)}) ; ${cAB} dans ${m(T`${A} \cap ${B}`)}, ${cAC} dans ${m(T`${A} \cap ${C}`)},
        ${cBC} dans ${m(T`${B} \cap ${C}`)} et ${abc} dans les trois. On en choisit un au hasard.`,
      questions: [
        { label: "Probabilité qu'il ne soit dans <strong>aucun</strong> des trois", reponse: aucun / N },
        { label: "Probabilité qu'il soit dans <strong>exactement un</strong>", reponse: un / N },
        { label: "Probabilité qu'il soit dans <strong>au moins deux</strong>", reponse: (union - un) / N },
      ],
      indice: `Poincaré donne le nombre dans ${m(T`${A} \cup ${B} \cup ${C}`)}. Pour « seulement ${A} » :
        ${m(T`|${A}| - |${A} \cap ${B}| - |${A} \cap ${C}| + |${A} \cap ${B} \cap ${C}|`)} (on a retiré deux fois le centre).`,
      correction: `
        ${M(T`|${A} \cup ${B} \cup ${C}| = ${cA} + ${cB} + ${cC} - ${cAB} - ${cAC} - ${cBC} + ${abc} = ${union}`)}
        <p>Aucun : ${m(T`\frac{${N} - ${union}}{${N}} = ${vf(new Fr(aucun, N))}`)}.</p>
        <p>Seulement ${A} : ${m(T`${cA} - ${cAB} - ${cAC} + ${abc} = ${oa}`)} ;
           seulement ${B} : ${m(T`${ob}`)} ; seulement ${C} : ${m(T`${oc}`)}.</p>
        <p>Exactement un : ${m(T`\frac{${un}}{${N}} = ${vf(new Fr(un, N))}`)}.</p>
        <p>Au moins deux = dans la réunion mais pas « exactement un » :
           ${m(T`\frac{${union} - ${un}}{${N}} = ${vf(new Fr(union - un, N))}`)}.</p>`,
    };
  });

  ajout(1, "effectifs", "Effectifs → probabilités", () => {
    const N = pick([500, 800, 1000, 1200, 2000]);
    const nL = Math.round(N * rnd(25, 60) / 100);
    const nG = Math.round(N * rnd(8, 20) / 100);
    const nLG = Math.random() < 0.15 ? 0 : rnd(1, Math.floor(Math.min(nL, nG) * 0.7));
    const union = nL + nG - nLG;
    return {
      titre: "Effectifs et probabilités",
      enonce: `Dans une population de ${N} personnes, ${nL} portent des lunettes (${m("L")}),
        ${nG} sont gauchères (${m("G")}) et ${nLG} sont gauchères et portent des lunettes.
        On choisit une personne au hasard.`,
      questions: [
        { label: m(T`P(L \cup G)`), reponse: union / N },
        { label: m(T`P(\overline{L} \cap \overline{G})`), reponse: 1 - union / N },
        { label: m(T`P(G \cap \overline{L})`), reponse: (nG - nLG) / N },
        { label: `${m("L")} et ${m("G")} sont-ils incompatibles ?`, type: "choix", options: ["Oui", "Non"], reponse: nLG === 0 ? "Oui" : "Non" },
      ],
      indice: `Les effectifs ne sont pas des probabilités : divise par ${N}. Un tableau
        ${m(T`L / \overline{L}`)} × ${m(T`G / \overline{G}`)} avec les totaux aide beaucoup.`,
      correction: `
        <table><thead><tr><th></th><th>${m("G")}</th><th>${m(T`\overline{G}`)}</th><th>Total</th></tr></thead><tbody>
        <tr><td>${m("L")}</td><td>${nLG}</td><td>${nL - nLG}</td><td>${nL}</td></tr>
        <tr><td>${m(T`\overline{L}`)}</td><td>${nG - nLG}</td><td>${N - nL - nG + nLG}</td><td>${N - nL}</td></tr>
        <tr><td>Total</td><td>${nG}</td><td>${N - nG}</td><td>${N}</td></tr></tbody></table>
        ${M(T`P(L \cup G) = \frac{${nL} + ${nG} - ${nLG}}{${N}} = ${vf(new Fr(union, N))}`)}
        ${M(T`P(\overline{L} \cap \overline{G}) = 1 - P(L \cup G) = ${vf(new Fr(N - union, N))}`)}
        ${M(T`P(G \cap \overline{L}) = \frac{${nG} - ${nLG}}{${N}} = ${vf(new Fr(nG - nLG, N))}`)}
        <p>${nLG === 0 ? "Aucune personne n'est dans les deux : <strong>incompatibles</strong>."
          : `${m(T`L \cap G`)} contient ${nLG} personnes, donc il n'est pas vide : <strong>compatibles</strong>.`}</p>`,
    };
  });

  ajout(1, "des", "Deux dés (dénombrement)", () => {
    const issues = [];
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) issues.push([i, j]);
    const s1 = rnd(3, 11), s2 = rnd(8, 11), k = rnd(2, 5);
    const pool = [
      { label: `la somme vaut ${s1}`, t: ([i, j]) => i + j === s1, expl: `couples ${issues.filter(([i, j]) => i + j === s1).map(([i, j]) => `(${i},${j})`).join(", ")}` },
      { label: `la somme est au moins ${s2}`, t: ([i, j]) => i + j >= s2, expl: `on compte les couples de somme ${s2} à 12` },
      { label: "au moins un des dés donne 6", t: ([i, j]) => i === 6 || j === 6, expl: T`complémentaire : $1 - \frac{25}{36}$, aucun 6 donne $5 \times 5$ couples` },
      { label: "les deux dés donnent le même résultat", t: ([i, j]) => i === j, expl: "les 6 doubles" },
      { label: `le plus grand des deux résultats est au plus ${k}`, t: ([i, j]) => Math.max(i, j) <= k, expl: `les deux dés sont ${T`$\le$`} ${k} : ${k} × ${k} couples` },
      { label: "le produit des deux résultats est pair", t: ([i, j]) => (i * j) % 2 === 0, expl: T`complémentaire : produit impair $\iff$ les deux impairs, $3 \times 3 = 9$ couples` },
    ];
    const choix = melange(pool).slice(0, 3);
    const nbs = choix.map((c) => issues.filter(c.t).length);
    const expl = (e) => e.replace(/\$([^$]+)\$/g, (_, t) => m(t));
    return {
      titre: "Deux dés équilibrés",
      enonce: `On lance deux dés équilibrés à six faces. L'univers est ${m(T`\Omega = \{1, \dots, 6\}^2`)}, muni de la probabilité uniforme.`,
      questions: choix.map((c, i) => ({ label: `Probabilité que ${c.label}`, reponse: nbs[i] / 36 })),
      indice: `${m(T`\operatorname{card}(\Omega) = 36`)} : les couples sont <strong>ordonnés</strong> ((1,2) et (2,1) sont différents).
        Cas favorables sur cas possibles, ou complémentaire pour « au moins ».`,
      correction: choix.map((c, i) => `<p>${c.label} : ${nbs[i]} cas favorables (${expl(c.expl)}),
        donc ${m(T`P = \frac{${nbs[i]}}{36} = ${vf(new Fr(nbs[i], 36))}`)}.</p>`).join(""),
    };
  });

  ajout(1, "aumoins", "« Au moins un » sur n essais", () => {
    const ctx = pick([
      { s: "un archer touche la cible", e: "tir" },
      { s: "une ampoule est défectueuse", e: "ampoule contrôlée" },
      { s: "un appel aboutit", e: "appel" },
      { s: "un ticket est gagnant", e: "ticket acheté" },
    ]);
    const p = pick([5, 10, 15, 20, 25, 30]) / 100;
    const n = rnd(3, 10);
    const seuil = pick([0.9, 0.95, 0.99]);
    let nmin = 1;
    while (1 - (1 - p) ** nmin < seuil) nmin++;
    return {
      titre: "Au moins un succès",
      enonce: `La probabilité qu'${ctx.s} vaut ${m(nb(p))}, indépendamment d'un ${ctx.e} à l'autre. On fait ${n} essais.`,
      questions: [
        { label: "Probabilité qu'aucun essai ne réussisse", reponse: (1 - p) ** n },
        { label: "Probabilité qu'au moins un essai réussisse", reponse: 1 - (1 - p) ** n },
        { label: `Nombre minimal d'essais pour que P(au moins un succès) ${"≥"} ${txt(seuil)}`, reponse: nmin, entier: true },
      ],
      indice: `« Au moins un » : passe par le complémentaire « aucun », qui est une intersection d'évènements indépendants.`,
      correction: `
        ${M(T`P(\text{aucun}) = (1 - ${nb(p)})^{${n}} = ${nb(1 - p)}^{${n}} \approx ${nb((1 - p) ** n)}`)}
        ${M(T`P(\text{au moins un}) = 1 - ${nb(1 - p)}^{${n}} \approx ${nb(1 - (1 - p) ** n)}`)}
        <p>On cherche le plus petit ${m("n")} tel que ${m(T`1 - ${nb(1 - p)}^n \ge ${nb(seuil)}`)}, soit
        ${m(T`n \ge \frac{\ln(${nb(1 - seuil)})}{\ln(${nb(1 - p)})} \approx ${nb(Math.log(1 - seuil) / Math.log(1 - p), 2)}`)}
        (on divise par un logarithme <strong>négatif</strong> : l'inégalité change de sens). Donc ${m(T`n = ${nmin}`)}.</p>`,
    };
  });

  // ------------------------------------------------------------------
  // Générateurs — chapitre 2
  // ------------------------------------------------------------------
  ajout(2, "diagnostic", "Bayes : test de dépistage", () => {
    const prev = pick([0.5, 1, 2, 5, 10]) / 100;
    const se = pick([90, 95, 98, 99]) / 100;
    const fp = pick([1, 2, 5, 10]) / 100;
    const pPos = se * prev + fp * (1 - prev);
    const pMpos = (se * prev) / pPos;
    const pMneg = ((1 - se) * prev) / (1 - pPos);
    return {
      titre: "Un test de dépistage",
      enonce: `Une maladie touche ${txt(prev * 100)} % de la population. Un test est positif chez
        ${txt(se * 100)} % des malades, et donne ${txt(fp * 100)} % de faux positifs chez les non-malades.
        On note ${m("M")} « être malade » et ${m("+")} « test positif ».`,
      questions: [
        { label: m(T`P(+)`), reponse: pPos },
        { label: m(T`P(M \mid +)`), reponse: pMpos },
        { label: m(T`P(M \mid -)`), reponse: pMneg },
      ],
      indice: `Arbre : 1er niveau ${m(T`M / \overline{M}`)}, 2e niveau ${m("+ / -")}. Le dénominateur de Bayes,
        c'est ${m(T`P(+)`)} par la formule des probabilités totales.`,
      correction: `
        <p>Données : ${m(T`P(M) = ${nb(prev)}`)}, ${m(T`P(+ \mid M) = ${nb(se)}`)}, ${m(T`P(+ \mid \overline{M}) = ${nb(fp)}`)}.</p>
        ${M(T`P(+) = P(+ \mid M)P(M) + P(+ \mid \overline{M})P(\overline{M}) = ${nb(se)} \times ${nb(prev)} + ${nb(fp)} \times ${nb(1 - prev)} = ${nb(pPos, 5)}`)}
        ${M(T`P(M \mid +) = \frac{P(+ \mid M)P(M)}{P(+)} = \frac{${nb(se * prev, 5)}}{${nb(pPos, 5)}} \approx ${nb(pMpos)}`)}
        ${M(T`P(M \mid -) = \frac{P(- \mid M)P(M)}{P(-)} = \frac{${nb(1 - se)} \times ${nb(prev)}}{1 - ${nb(pPos, 5)}} \approx ${nb(pMneg, 5)}`)}
        <p>${pMpos < 0.5 ? "Moins d'une chance sur deux d'être malade avec un test positif : la maladie est rare, les faux positifs dominent."
          : "Ici la maladie est assez fréquente pour qu'un test positif soit convaincant."}</p>`,
    };
  });

  ajout(2, "machines", "Probabilités totales : trois machines", () => {
    let p1, p2, p3;
    do { p1 = rnd(3, 12) * 5; p2 = rnd(3, 12) * 5; p3 = 100 - p1 - p2; } while (p3 < 15);
    const pr = [p1, p2, p3].map((x) => new Fr(x, 100));
    const def = [rnd(1, 8), rnd(1, 8), rnd(1, 8)].map((x) => new Fr(x, 100));
    const j = rnd(0, 2);
    const PD = somme(pr.map((p, i) => p.mul(def[i])));
    const inter = pr[j].mul(def[j]);
    return {
      titre: "Trois machines",
      enonce: `Une usine produit ${m("M_1")}, ${m("M_2")}, ${m("M_3")} : respectivement ${p1} %, ${p2} % et ${p3} %
        des pièces. Les taux de pièces défectueuses (${m("D")}) sont ${def.map((x) => `${x.n * (100 / x.d)} %`).join(", ")}.
        On prend une pièce au hasard.`,
      questions: [
        { label: m(T`P(D)`), reponse: PD.val() },
        { label: m(T`P(D \cap M_${j + 1})`), reponse: inter.val() },
        { label: m(T`P(M_${j + 1} \mid D)`), reponse: inter.div(PD).val() },
      ],
      indice: `${m(T`\{M_1, M_2, M_3\}`)} est un système complet d'évènements. Les taux de défaut sont des
        probabilités <strong>conditionnelles</strong> ${m(T`P(D \mid M_i)`)}.`,
      correction: `
        ${M(T`P(D) = \sum_i P(D \mid M_i)P(M_i) = ${pr.map((p, i) => `${d(def[i])} \\times ${d(p)}`).join(" + ")} = ${d(PD)}`)}
        ${M(T`P(D \cap M_${j + 1}) = P(D \mid M_${j + 1})P(M_${j + 1}) = ${d(def[j])} \times ${d(pr[j])} = ${d(inter)}`)}
        ${M(T`P(M_${j + 1} \mid D) = \frac{P(D \cap M_${j + 1})}{P(D)} = \frac{${d(inter)}}{${d(PD)}} = ${vf(inter.div(PD))}`)}`,
    };
  });

  ajout(2, "contingence", "Tableau de contingence et indépendance", () => {
    const ctx = pick([
      { A: "V", An: "a validé le CE", B: "R", Bn: "a fait les exercices de révision", qui: "étudiants" },
      { A: "D", An: "est défectueuse", B: "N", Bn: "a été produite de nuit", qui: "pièces" },
      { A: "C", An: "boit du café", B: "S", Bn: "fait du sport", qui: "salariés" },
    ]);
    let a, b, c, e;
    const indep = Math.random() < 0.4;
    if (indep) {
      const u = rnd(1, 5), v = rnd(1, 5), s = rnd(2, 8), t = rnd(2, 8), k = rnd(2, 4);
      [a, b, c, e] = [u * s * k, u * t * k, v * s * k, v * t * k];
    } else {
      do { [a, b, c, e] = [rnd(5, 45), rnd(5, 45), rnd(5, 45), rnd(5, 45)]; } while (a * e === b * c);
    }
    const N = a + b + c + e;
    const { A, B } = ctx;
    const pAB = new Fr(a, a + c), pBA = new Fr(a, a + b);
    const PAB = new Fr(a, N), PAPB = new Fr(a + b, N).mul(new Fr(a + c, N));
    return {
      titre: "Tableau de contingence",
      enonce: `Sur ${N} ${ctx.qui}, on note ${m(A)} « ${ctx.An} » et ${m(B)} « ${ctx.Bn} ». Effectifs :
        <table><thead><tr><th></th><th>${m(B)}</th><th>${m(T`\overline{${B}}`)}</th></tr></thead><tbody>
        <tr><td>${m(A)}</td><td>${a}</td><td>${b}</td></tr>
        <tr><td>${m(T`\overline{${A}}`)}</td><td>${c}</td><td>${e}</td></tr></tbody></table>`,
      questions: [
        { label: m(T`P(${A} \mid ${B})`), reponse: pAB.val() },
        { label: m(T`P(${B} \mid ${A})`), reponse: pBA.val() },
        { label: `${m(A)} et ${m(B)} sont-ils indépendants ?`, type: "choix", options: ["Oui", "Non"], reponse: indep ? "Oui" : "Non" },
      ],
      indice: `Ajoute la ligne et la colonne des totaux. ${m(T`P(${A} \mid ${B})`)} : on se restreint à la
        <strong>colonne</strong> ${m(B)}. Pour l'indépendance, compare ${m(T`P(${A} \cap ${B})`)} et ${m(T`P(${A})P(${B})`)}.`,
      correction: `
        <p>Totaux : ${m(T`|${A}| = ${a + b}`)}, ${m(T`|${B}| = ${a + c}`)}, ${m(T`N = ${N}`)}.</p>
        ${M(T`P(${A} \mid ${B}) = \frac{|${A} \cap ${B}|}{|${B}|} = \frac{${a}}{${a + c}} = ${vf(pAB)}`)}
        ${M(T`P(${B} \mid ${A}) = \frac{${a}}{${a + b}} = ${vf(pBA)}`)}
        ${M(T`P(${A} \cap ${B}) = ${vf(PAB)} \qquad P(${A})P(${B}) = \frac{${a + b}}{${N}} \times \frac{${a + c}}{${N}} = ${vf(PAPB)}`)}
        <p>${indep ? "Égalité : <strong>indépendants</strong> (les lignes du tableau sont proportionnelles)."
          : "Différents : <strong>pas indépendants</strong>."}</p>`,
    };
  });

  ajout(2, "urne", "Tirages sans remise (arbre)", () => {
    const b = rnd(2, 6), n = rnd(2, 6), N = b + n;
    const p11 = new Fr(b * (b - 1), N * (N - 1));
    const p2 = new Fr(b, N);
    const p1s2 = new Fr(b - 1, N - 1);
    return {
      titre: "Urne, tirages sans remise",
      enonce: `Une urne contient ${b} boules blanches et ${n} boules noires. On tire successivement
        <strong>sans remise</strong> deux boules. ${m("B_i")} : « la ${m("i")}-ème boule est blanche ».`,
      questions: [
        { label: m(T`P(B_1 \cap B_2)`), reponse: p11.val() },
        { label: m(T`P(B_2)`), reponse: p2.val() },
        { label: m(T`P(B_1 \mid B_2)`), reponse: p1s2.val() },
      ],
      indice: `Arbre à deux niveaux. Pour ${m(T`P(B_2)`)} : probabilités totales avec ${m(T`\{B_1, \overline{B_1}\}`)}.
        La dernière est un « retournement » : Bayes.`,
      correction: `
        ${M(T`P(B_1 \cap B_2) = P(B_1)P(B_2 \mid B_1) = \frac{${b}}{${N}} \times \frac{${b - 1}}{${N - 1}} = ${vf(p11)}`)}
        ${M(T`P(B_2) = \frac{${b}}{${N}} \times \frac{${b - 1}}{${N - 1}} + \frac{${n}}{${N}} \times \frac{${b}}{${N - 1}} = ${vf(p2)}`)}
        <p>Résultat remarquable : ${m(T`P(B_2) = P(B_1)`)}, l'ordre ne compte pas sans information.</p>
        ${M(T`P(B_1 \mid B_2) = \frac{P(B_1 \cap B_2)}{P(B_2)} = \frac{${p11.tex()}}{${p2.tex()}} = ${vf(p1s2)}`)}`,
    };
  });

  ajout(2, "independance", "Indépendance de deux évènements", () => {
    let a, b, PAB;
    const indep = Math.random() < 0.5;
    for (;;) {
      a = rnd(2, 8); b = rnd(2, 8);
      PAB = new Fr(a * b, 100);
      if (!indep) PAB = PAB.add(new Fr(pick([-10, -5, 5, 10]), 100));
      const PU = new Fr(a, 10).add(new Fr(b, 10)).sub(PAB);
      if (PAB.val() > 0 && PAB.val() < Math.min(a, b) / 10 && PU.val() <= 1) break;
    }
    const PA = new Fr(a, 10), PB = new Fr(b, 10), PU = PA.add(PB).sub(PAB);
    return {
      titre: "Indépendants ?",
      enonce: `${m(T`P(A) = ${d(PA)}`)}, ${m(T`P(B) = ${d(PB)}`)} et ${m(T`P(A \cup B) = ${d(PU)}`)}.`,
      questions: [
        { label: m(T`P(A \cap B)`), reponse: PAB.val() },
        { label: m(T`P(A \mid B)`), reponse: PAB.div(PB).val() },
        { label: `${m("A")} et ${m("B")} sont-ils indépendants ?`, type: "choix", options: ["Oui", "Non"], reponse: indep ? "Oui" : "Non" },
      ],
      indice: `Formule de la réunion pour ${m(T`P(A \cap B)`)}, puis compare avec ${m(T`P(A)P(B)`)}
        (ou ${m(T`P(A \mid B)`)} avec ${m(T`P(A)`)}).`,
      correction: `
        ${M(T`P(A \cap B) = ${d(PA)} + ${d(PB)} - ${d(PU)} = ${d(PAB)}`)}
        ${M(T`P(A \mid B) = \frac{${d(PAB)}}{${d(PB)}} = ${vf(PAB.div(PB))}`)}
        <p>${m(T`P(A)P(B) = ${d(PA.mul(PB))} ${indep ? "=" : "\\neq"} P(A \cap B)`)} :
          ${indep ? `<strong>indépendants</strong> (et en effet ${m(T`P(A \mid B) = P(A)`)}).`
            : "<strong>pas indépendants</strong>."}</p>`,
    };
  });

  // ------------------------------------------------------------------
  // Générateurs — chapitre 3
  // ------------------------------------------------------------------
  function partition(total, k) {
    // k entiers >= 1 de somme total
    const coupes = melange([...Array(total - 1).keys()].map((i) => i + 1)).slice(0, k - 1).sort((x, y) => x - y);
    const res = [];
    let prec = 0;
    for (const c of coupes) { res.push(c - prec); prec = c; }
    res.push(total - prec);
    return res;
  }
  const loiTable = (xs, ps, nomX = "x", nomP = "P(X = x)") =>
    `<div class="simu-tableau"><table><tbody><tr><th>${m(nomX)}</th>${xs.map((x) => `<td>${m(x)}</td>`).join("")}</tr>
     <tr><th>${m(nomP)}</th>${ps.map((p) => `<td>${p}</td>`).join("")}</tr></tbody></table></div>`;

  ajout(3, "loi", "Loi, espérance, variance", () => {
    const k = rnd(4, 5);
    const xs = melange([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]).slice(0, k).sort((x, y) => x - y);
    const ps = partition(20, k).map((v) => new Fr(v, 20));
    const cache = rnd(0, k - 1);
    const E = somme(xs.map((x, i) => ps[i].mul(x)));
    const E2 = somme(xs.map((x, i) => ps[i].mul(x * x)));
    const V = E2.sub(E.mul(E));
    return {
      titre: "Loi d'une variable discrète",
      enonce: `Une variable aléatoire ${m("X")} a la loi suivante (une case est inconnue) :
        ${loiTable(xs, ps.map((p, i) => (i === cache ? m("p") : m(d(p)))))}`,
      questions: [
        { label: `Valeur de ${m("p")}`, reponse: ps[cache].val() },
        { label: m(T`E(X)`), reponse: E.val() },
        { label: m(T`V(X)`), reponse: V.val() },
      ],
      indice: `La somme des probabilités vaut 1. Ensuite ${m(T`E(X) = \sum x\,P(X = x)`)} et
        ${m(T`V(X) = E(X^2) - E(X)^2`)} avec ${m(T`E(X^2) = \sum x^2 P(X = x)`)} (transfert).`,
      correction: `
        ${M(T`p = 1 - (${ps.filter((_, i) => i !== cache).map(d).join(" + ")}) = ${d(ps[cache])}`)}
        ${M(T`E(X) = ${xs.map((x, i) => `${x < 0 ? `(${x})` : x} \\times ${d(ps[i])}`).join(" + ")} = ${vf(E)}`)}
        ${M(T`E(X^2) = ${xs.map((x, i) => `${x * x} \\times ${d(ps[i])}`).join(" + ")} = ${vf(E2)}`)}
        ${M(T`V(X) = E(X^2) - E(X)^2 = ${nb(E2.val())} - ${nb(E.val())}^2 = ${vf(V)}`)}`,
    };
  });

  ajout(3, "repartition", "Fonction de répartition", () => {
    const n = rnd(4, 5);
    const xs = [...Array(n + 1).keys()];
    const ps = partition(20, n + 1).map((v) => new Fr(v, 20));
    const F = [];
    ps.reduce((s, p, i) => (F[i] = s.add(p)), new Fr(0));
    const k = rnd(1, n), j = rnd(1, n - 1);
    const E = somme(xs.map((x, i) => ps[i].mul(x)));
    return {
      titre: "Lire une fonction de répartition",
      enonce: `On donne la fonction de répartition ${m(T`F(x) = P(X \le x)`)} d'une variable ${m("X")} à valeurs dans ${m(T`\{0, \dots, ${n}\}`)} :
        ${loiTable(xs, F.map((f) => m(d(f))), "x", T`P(X \le x)`)}`,
      questions: [
        { label: m(T`P(X = ${k})`), reponse: ps[k].val() },
        { label: m(T`P(X > ${j})`), reponse: UN.sub(F[j]).val() },
        { label: m(T`E(X)`), reponse: E.val() },
      ],
      indice: `${m(T`P(X = k) = F(k) - F(k - 1)`)} : la hauteur de la marche. Et ${m(T`P(X > j) = 1 - F(j)`)}.`,
      correction: `
        ${M(T`P(X = ${k}) = F(${k}) - F(${k - 1}) = ${d(F[k])} - ${d(F[k - 1])} = ${d(ps[k])}`)}
        ${M(T`P(X > ${j}) = 1 - F(${j}) = 1 - ${d(F[j])} = ${d(UN.sub(F[j]))}`)}
        <p>Loi complète :</p>${loiTable(xs, ps.map((p) => m(d(p))))}
        ${M(T`E(X) = ${xs.map((x, i) => `${x} \\times ${d(ps[i])}`).join(" + ")} = ${vf(E)}`)}`,
    };
  });

  ajout(3, "conjointe", "Loi conjointe, covariance", () => {
    const xs = melange([-1, 0, 1, 2, 3]).slice(0, 3).sort((x, y) => x - y);
    const ys = pick([[0, 1], [1, 2]]);
    const indep = Math.random() < 0.4;
    let cel; // cel[i][j] : P(Y = ys[i], X = xs[j])
    if (indep) {
      const px = partition(10, 3).map((v) => new Fr(v, 10));
      const q = new Fr(pick([1, 2, 3, 4]), 5);
      const py = [q, UN.sub(q)];
      cel = py.map((qy) => px.map((p) => p.mul(qy)));
    } else {
      for (;;) {
        cel = [partition(20, 6)].map((l) => [l.slice(0, 3), l.slice(3)])[0].map((l) => l.map((v) => new Fr(v, 20)));
        const px = xs.map((_, j) => cel[0][j].add(cel[1][j]));
        const py = cel.map((l) => somme(l));
        if (!cel.every((l, i) => l.every((c, j) => c.eq(px[j].mul(py[i]))))) break;
      }
    }
    const px = xs.map((_, j) => cel[0][j].add(cel[1][j]));
    const py = cel.map((l) => somme(l));
    const EX = somme(xs.map((x, j) => px[j].mul(x)));
    const EY = somme(ys.map((y, i) => py[i].mul(y)));
    const EXY = somme(cel.flatMap((l, i) => l.map((c, j) => c.mul(xs[j] * ys[i]))));
    const cov = EXY.sub(EX.mul(EY));
    const j0 = rnd(0, 2);
    let preuve;
    if (indep) {
      preuve = "Chaque case est le produit de ses marges (lignes proportionnelles) : <strong>indépendantes</strong>.";
    } else {
      let bad = null;
      cel.forEach((l, i) => l.forEach((c, j) => { if (!bad && !c.eq(px[j].mul(py[i]))) bad = [i, j]; }));
      const [i, j] = bad;
      preuve = `${m(T`P(X = ${xs[j]}, Y = ${ys[i]}) = ${d(cel[i][j])}`)} mais
        ${m(T`P(X = ${xs[j]})P(Y = ${ys[i]}) = ${d(px[j])} \times ${d(py[i])} = ${d(px[j].mul(py[i]))}`)} :
        <strong>pas indépendantes</strong>${cov.n === 0 ? " (alors que la covariance est nulle !)" : ""}.`;
    }
    return {
      titre: "Couple de variables discrètes",
      enonce: `Loi conjointe du couple ${m("(X, Y)")} :
        <table><thead><tr><th></th>${xs.map((x) => `<th>${m(T`X = ${x}`)}</th>`).join("")}</tr></thead><tbody>
        ${cel.map((l, i) => `<tr><th>${m(T`Y = ${ys[i]}`)}</th>${l.map((c) => `<td>${m(d(c))}</td>`).join("")}</tr>`).join("")}
        </tbody></table>`,
      questions: [
        { label: m(T`P(X = ${xs[j0]})`), reponse: px[j0].val() },
        { label: m(T`E(XY)`), reponse: EXY.val() },
        { label: m(T`\mathrm{Cov}(X, Y)`), reponse: cov.val() },
        { label: `${m("X")} et ${m("Y")} sont-elles indépendantes ?`, type: "choix", options: ["Oui", "Non"], reponse: indep ? "Oui" : "Non" },
      ],
      indice: `Marges = sommes des colonnes (pour ${m("X")}) et des lignes (pour ${m("Y")}).
        ${m(T`E(XY) = \sum x\,y\,P(X = x, Y = y)`)} sur toutes les cases. Attention : ${m(T`\mathrm{Cov} = 0`)} ne prouve pas l'indépendance.`,
      correction: `
        <p>Loi de ${m("X")} : ${xs.map((x, j) => m(T`P(X = ${x}) = ${d(px[j])}`)).join(", ")}.
           Loi de ${m("Y")} : ${ys.map((y, i) => m(T`P(Y = ${y}) = ${d(py[i])}`)).join(", ")}.</p>
        ${M(T`E(X) = ${vf(EX)} \qquad E(Y) = ${vf(EY)}`)}
        ${M(T`E(XY) = ${cel.flatMap((l, i) => l.map((c, j) => [xs[j] * ys[i], c])).filter(([v]) => v !== 0).map(([v, c]) => `${v < 0 ? `(${v})` : v} \\times ${d(c)}`).join(" + ") || "0"} = ${vf(EXY)}`)}
        ${M(T`\mathrm{Cov}(X, Y) = E(XY) - E(X)E(Y) = ${nb(EXY.val())} - ${nb(EX.val())} \times ${nb(EY.val())} = ${vf(cov)}`)}
        <p>${preuve}</p>`,
    };
  });

  ajout(3, "binomiale", "Loi binomiale", () => {
    const ctx = pick([
      { s: "Un étudiant répond au hasard à un QCM de {n} questions à {c} choix (une seule bonne réponse)", x: "le nombre de bonnes réponses", p: null },
      { s: "Un technicien contrôle {n} pièces, chacune défectueuse avec probabilité {p}", x: "le nombre de pièces défectueuses", p: [0.05, 0.1, 0.2] },
      { s: "Une archère tire {n} flèches et touche la cible avec probabilité {p} à chaque tir", x: "le nombre de tirs réussis", p: [0.2, 0.3, 0.4, 0.6, 0.7] },
    ]);
    const n = rnd(5, 12);
    let p, c = 0;
    if (ctx.p) p = pick(ctx.p);
    else { c = pick([2, 4, 5]); p = 1 / c; }
    const k = rnd(1, Math.min(4, n));
    const pk = binom(n, k) * p ** k * (1 - p) ** (n - k);
    const phrase = ctx.s.replace("{n}", n).replace("{c}", c).replace("{p}", txt(p));
    return {
      titre: "Loi binomiale",
      enonce: `${phrase}. Les essais sont indépendants. On note ${m("X")} ${ctx.x}.`,
      questions: [
        { label: m(T`P(X = ${k})`), reponse: pk },
        { label: m(T`P(X \ge 1)`), reponse: 1 - (1 - p) ** n },
        { label: m(T`E(X)`), reponse: n * p },
        { label: m(T`V(X)`), reponse: n * p * (1 - p) },
      ],
      indice: `On compte des succès sur un nombre <strong>fixé</strong> d'essais indépendants :
        ${m(T`X \sim \mathcal{B}(n, p)`)}. Identifie ${m("n")} et ${m("p")}.`,
      correction: `
        <p>${m(T`X \sim \mathcal{B}(${n}, ${c ? `\\frac{1}{${c}}` : nb(p)})`)}.</p>
        ${M(T`P(X = ${k}) = \binom{${n}}{${k}} ${nb(p, 4)}^{${k}} \times ${nb(1 - p, 4)}^{${n - k}} = ${binom(n, k)} \times ${nb(p ** k, 6)} \times ${nb((1 - p) ** (n - k), 6)} \approx ${nb(pk)}`)}
        ${M(T`P(X \ge 1) = 1 - P(X = 0) = 1 - ${nb(1 - p, 4)}^{${n}} \approx ${nb(1 - (1 - p) ** n)}`)}
        ${M(T`E(X) = np = ${nb(n * p)} \qquad V(X) = np(1 - p) = ${nb(n * p * (1 - p))}`)}`,
    };
  });

  ajout(3, "poisson", "Loi de Poisson", () => {
    const deux = Math.random() < 0.4;
    const l1 = pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
    const l2 = pick([0.5, 1, 1.5, 2]);
    const lam = deux ? l1 + l2 : l1;
    const P = (k) => Math.exp(-lam) * lam ** k / fact(k);
    const ctx = pick([
      ["pannes d'un serveur par mois", "pannes matérielles", "pannes logicielles"],
      ["accidents à un carrefour par an", "accidents de voiture", "accidents de vélo"],
      ["coquilles par page", "coquilles de frappe", "fautes d'orthographe"],
    ]);
    const enonce = deux
      ? `On modélise les ${ctx[1]} par ${m(T`X \sim \mathcal{P}(${nb(l1)})`)} et les ${ctx[2]} par
         ${m(T`Y \sim \mathcal{P}(${nb(l2)})`)}, indépendantes (${ctx[0]}). On pose ${m("Z = X + Y")}.`
      : `Le nombre ${m("Z")} de ${ctx[0]} suit une loi de Poisson ${m(T`\mathcal{P}(${nb(l1)})`)}.`;
    return {
      titre: "Loi de Poisson",
      enonce,
      questions: [
        { label: m(T`E(Z)`), reponse: lam },
        { label: m(T`P(Z = 0)`), reponse: P(0) },
        { label: m(T`P(Z \le 2)`), reponse: P(0) + P(1) + P(2) },
        { label: m(T`P(Z \ge 2)`), reponse: 1 - P(0) - P(1) },
      ],
      indice: `${m(T`P(Z = k) = e^{-\lambda}\frac{\lambda^k}{k!}`)} et ${m(T`E(Z) = \lambda`)}.
        ${deux ? `Une somme de Poisson <strong>indépendantes</strong> est une Poisson : les paramètres s'ajoutent.` : ""}
        « Au moins 2 » : complémentaire.`,
      correction: `
        ${deux ? `<p>${m(T`Z = X + Y \sim \mathcal{P}(${nb(l1)} + ${nb(l2)}) = \mathcal{P}(${nb(lam)})`)}.</p>` : ""}
        ${M(T`E(Z) = \lambda = ${nb(lam)} \qquad P(Z = 0) = e^{-${nb(lam)}} \approx ${nb(P(0))}`)}
        ${M(T`P(Z \le 2) = e^{-${nb(lam)}}\left(1 + ${nb(lam)} + \frac{${nb(lam)}^2}{2}\right) \approx ${nb(P(0) + P(1) + P(2))}`)}
        ${M(T`P(Z \ge 2) = 1 - P(Z = 0) - P(Z = 1) = 1 - e^{-${nb(lam)}}(1 + ${nb(lam)}) \approx ${nb(1 - P(0) - P(1))}`)}`,
    };
  });

  ajout(3, "geometrique", "Loi géométrique / binomiale négative", () => {
    const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]);
    const r = pick([1, 1, 2, 3]);
    const j = r + rnd(1, 4);
    const pj = binom(j - 1, r - 1) * p ** r * (1 - p) ** (j - r);
    const ctx = pick([
      { qui: "Un joueur lance des fléchettes", succ: "toucher le centre" },
      { qui: "On lance un dé truqué", succ: "obtenir un 6" },
      { qui: "Un commercial appelle des prospects", succ: "décrocher un rendez-vous" },
    ]);
    const qs = [
      { label: m(T`P(X = ${j})`), reponse: pj },
      { label: m(T`E(X)`), reponse: r / p },
    ];
    if (r === 1) qs.splice(1, 0, { label: m(T`P(X > ${j - 1})`), reponse: (1 - p) ** (j - 1) });
    return {
      titre: r === 1 ? "Loi géométrique" : "Loi binomiale négative",
      enonce: `${ctx.qui} jusqu'à ${ctx.succ} ${r === 1 ? "pour la première fois" : `${r} fois`}.
        Chaque essai réussit avec probabilité ${m(nb(p))}, indépendamment des autres.
        ${m("X")} = nombre d'essais nécessaires${r > 1 ? ` pour obtenir ${r} succès` : ""}.`,
      questions: qs,
      indice: `Ici on fixe le nombre de succès et on compte les <strong>essais</strong> : ${m(T`X \sim \mathcal{BN}(${r}, ${nb(p)})`)}.
        ${r === 1 ? `${m(T`X > k`)} signifie : les ${m("k")} premiers essais échouent.` : `Le ${r}-ème succès arrive exactement au ${m("j")}-ème essai.`}`,
      correction: `
        <p>${m(T`X \sim \mathcal{BN}(${r}, ${nb(p)})`)}${r === 1 ? " (loi géométrique)" : ""}.</p>
        ${M(T`P(X = ${j}) = \binom{${j - 1}}{${r - 1}} ${nb(p)}^{${r}} \times ${nb(1 - p)}^{${j - r}} \approx ${nb(pj)}`)}
        ${r === 1 ? M(T`P(X > ${j - 1}) = ${nb(1 - p)}^{${j - 1}} \approx ${nb((1 - p) ** (j - 1))}`) : ""}
        ${M(T`E(X) = \frac{r}{p} = \frac{${r}}{${nb(p)}} = ${nb(r / p)}`)}`,
    };
  });

  ajout(3, "regles", "Règles de calcul sur E, V, Cov", () => {
    const EX = rnd(-3, 6), EY = rnd(-3, 6);
    const VX = rnd(1, 9), VY = rnd(1, 9);
    const cmax = Math.floor(Math.sqrt(VX * VY));
    const cov = rnd(-cmax, cmax);
    const a = pick([-3, -2, 2, 3, 4]), b = pick([-5, -2, 2, 3, 7]);
    const s = pick([1, -1]);
    const fmt = (x) => (x < 0 ? `(${x})` : String(x));
    const sg = (x) => (x < 0 ? "-" : "+");
    const lin = `${a}X ${sg(b)} ${Math.abs(b)}Y`;
    const aff = `${a}X ${sg(b)} ${Math.abs(b)}`;
    return {
      titre: "Règles de calcul",
      enonce: `${m(T`E(X) = ${EX}`)}, ${m(T`V(X) = ${VX}`)}, ${m(T`E(Y) = ${EY}`)}, ${m(T`V(Y) = ${VY}`)} et ${m(T`\mathrm{Cov}(X, Y) = ${cov}`)}.`,
      questions: [
        { label: m(T`E(${lin})`), reponse: a * EX + b * EY },
        { label: m(T`V(${aff})`), reponse: a * a * VX },
        { label: m(T`V(X ${sg(s)} Y)`), reponse: VX + VY + 2 * s * cov },
        { label: m(T`E(XY)`), reponse: cov + EX * EY },
      ],
      indice: `Linéarité de ${m("E")} ; ${m(T`V(aX + b) = a^2V(X)`)} ; ${m(T`V(X \pm Y) = V(X) + V(Y) \pm 2\mathrm{Cov}(X, Y)`)} ;
        ${m(T`\mathrm{Cov}(X, Y) = E(XY) - E(X)E(Y)`)}.`,
      correction: `
        ${M(T`E(${lin}) = ${a} \times ${fmt(EX)} ${sg(b)} ${Math.abs(b)} \times ${fmt(EY)} = ${a * EX + b * EY}`)}
        ${M(T`V(${aff}) = ${fmt(a)}^2 \times ${VX} = ${a * a * VX}`)}
        <p>La constante ajoutée ne change pas la dispersion.</p>
        ${M(T`V(X ${sg(s)} Y) = ${VX} + ${VY} ${sg(s)} 2 \times ${fmt(cov)} = ${VX + VY + 2 * s * cov}`)}
        ${s < 0 ? "<p>Les variances <strong>s'ajoutent</strong> même pour une différence ; seul le terme de covariance change de signe.</p>" : ""}
        ${M(T`E(XY) = \mathrm{Cov}(X, Y) + E(X)E(Y) = ${cov} + ${fmt(EX)} \times ${fmt(EY)} = ${cov + EX * EY}`)}`,
    };
  });

  // ------------------------------------------------------------------
  // Dessins SVG (arbres, diagrammes de Venn, circuits)
  // ------------------------------------------------------------------
  const ACC = "var(--md-accent-fg-color)";
  const BAR = "̅"; // surlignement combinant : "A" + BAR = Ā
  const ligne = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-opacity=".5" stroke-width="1.5"/>`;
  function svgTxt(x, y, s, o = {}) {
    const inconnu = s === "?";
    return `<text x="${x}" y="${y}" font-size="${o.size || 13}" text-anchor="${o.anchor || "middle"}"
      fill="${inconnu ? ACC : "currentColor"}" font-weight="${inconnu || o.gras ? 700 : 400}"
      ${o.halo === false ? "" : `stroke="var(--md-default-bg-color)" stroke-width="5" paint-order="stroke"`}>${s}</text>`;
  }
  const svg = (w, h, contenu, aria) =>
    `<svg class="simu-svg" viewBox="0 0 ${w} ${h}" style="max-width:${Math.round(w * 1.35)}px" role="img" aria-label="${aria}">${contenu}</svg>`;

  // br = [{ nom, p, fils: [{ nom, p }] }] ; p est un texte ("0,3", "?", "pₙ")
  function arbreSVG(br, racine = "") {
    const pas = 40, nf = br.reduce((s, b) => s + b.fils.length, 0);
    const H = nf * pas + 6, xr = 16, x1 = 140, x2 = 286, yr = H / 2;
    let y = pas / 2 + 3, out = `<circle cx="${xr}" cy="${yr}" r="3.5" fill="currentColor"/>`;
    if (racine) out += svgTxt(xr, yr - 10, racine, { size: 11, anchor: "start" });
    for (const b of br) {
      const ys = b.fils.map(() => { const v = y; y += pas; return v; });
      const yb = (ys[0] + ys[ys.length - 1]) / 2;
      out += ligne(xr, yr, x1 - 14, yb) + svgTxt((xr + x1 - 14) / 2, (yr + yb) / 2 + 4, b.p)
        + svgTxt(x1, yb + 5, b.nom, { gras: true, halo: false });
      b.fils.forEach((f, i) => {
        out += ligne(x1 + 16, yb, x2 - 14, ys[i]) + svgTxt((x1 + 16 + x2 - 14) / 2, (yb + ys[i]) / 2 + 4, f.p)
          + svgTxt(x2, ys[i] + 5, f.nom, { gras: true, halo: false });
      });
    }
    return svg(310, H, out, "Arbre pondéré");
  }

  // r = valeurs des 8 régions : a, b, c (seulement), ab, ac, bc (exactement ces deux), abc, hors
  function vennSVG(r) {
    const cercle = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="58" fill="none" stroke="currentColor" stroke-opacity=".6" stroke-width="1.5"/>`;
    const out = cercle(110, 88) + cercle(172, 88) + cercle(141, 140)
      + svgTxt(48, 38, "A", { gras: true, halo: false, size: 15 }) + svgTxt(234, 38, "B", { gras: true, halo: false, size: 15 })
      + svgTxt(214, 196, "C", { gras: true, halo: false, size: 15 })
      + svgTxt(76, 80, r.a) + svgTxt(206, 80, r.b) + svgTxt(141, 182, r.c)
      + svgTxt(141, 66, r.ab) + svgTxt(103, 134, r.ac) + svgTxt(179, 134, r.bc) + svgTxt(141, 112, r.abc)
      + svgTxt(4, 214, `Hors des trois : ${r.hors}`, { anchor: "start", size: 12 });
    return svg(282, 222, out, "Diagramme de Venn");
  }

  function circuitSVG(type) {
    const boite = (x, y, k) => `<rect x="${x}" y="${y}" width="44" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>`
      + svgTxt(x + 22, y + 18, `C${k}`, { halo: false, gras: true });
    const L = (...p) => ligne(...p);
    const plans = {
      serie: [300, 80, () => L(10, 40, 50, 40) + boite(50, 27, 1) + L(94, 40, 130, 40) + boite(130, 27, 2) + L(174, 40, 210, 40) + boite(210, 27, 3) + L(254, 40, 290, 40)],
      parallele: [300, 130, () => L(10, 65, 70, 65) + L(70, 26, 70, 104) + L(230, 26, 230, 104) + L(230, 65, 290, 65)
        + [26, 65, 104].map((yc, i) => L(70, yc, 128, yc) + boite(128, yc - 13, i + 1) + L(172, yc, 230, yc)).join("")],
      mixte: [300, 100, () => L(10, 50, 30, 50) + boite(30, 37, 1) + L(74, 50, 130, 50) + L(130, 25, 130, 75) + L(240, 25, 240, 75) + L(240, 50, 290, 50)
        + [25, 75].map((yc, i) => L(130, yc, 160, yc) + boite(160, yc - 13, i + 2) + L(204, yc, 240, yc)).join("")],
      mixte2: [300, 100, () => L(10, 50, 40, 50) + L(40, 25, 40, 75) + L(250, 25, 250, 75) + L(250, 50, 290, 50)
        + L(40, 25, 70, 25) + boite(70, 12, 1) + L(114, 25, 160, 25) + boite(160, 12, 2) + L(204, 25, 250, 25)
        + L(40, 75, 115, 75) + boite(115, 62, 3) + L(159, 75, 250, 75)],
    };
    const [w, h, f] = plans[type];
    return svg(w, h, f(), "Schéma du circuit");
  }

  // QCM vrai / faux tiré d'une banque d'affirmations { e, v, j }
  function vraiFaux(banque, n = 4) {
    const items = melange(banque).slice(0, n);
    return {
      titre: "Vrai ou faux ?",
      enonce: "Pour chaque affirmation, réponds <strong>Vrai</strong> ou <strong>Faux</strong>.",
      questions: items.map((it) => ({ label: it.e, type: "choix", options: ["Vrai", "Faux"], reponse: it.v ? "Vrai" : "Faux" })),
      indice: "Pour montrer qu'une affirmation est fausse, un seul contre-exemple suffit. Pour une vraie, cite la formule du cours.",
      correction: `<ol>${items.map((it) => `<li><strong>${it.v ? "Vrai" : "Faux"}.</strong> ${it.j}</li>`).join("")}</ol>`,
    };
  }
  // Question à choix : bonne réponse + 3 distracteurs, mélangés
  const choix4 = (label, bonne, autres) => ({
    label, type: "choix", reponse: bonne,
    options: melange([bonne, ...melange(autres.filter((o) => o !== bonne)).slice(0, 3)]),
  });

  // ------------------------------------------------------------------
  // Nouveaux générateurs — chapitre 1
  // ------------------------------------------------------------------
  const Ab = T`\overline{A}`, Bb = T`\overline{B}`, Cb = T`\overline{C}`;

  ajout(1, "demorgan", "De Morgan : traduire et calculer", () => {
    let a, b, c;
    do { a = rnd(4, 14); b = rnd(4, 14); c = rnd(1, Math.min(a, b) - 1); } while (a + b - c > 19);
    const PA = new Fr(a, 20), PB = new Fr(b, 20), PAB = new Fr(c, 20), PU = PA.add(PB).sub(PAB);
    const ecr = {
      ni: m(T`${Ab} \cap ${Bb}`), pasdeux: m(T`${Ab} \cup ${Bb}`), union: m(T`A \cup B`),
      exact: m(T`(A \cap ${Bb}) \cup (${Ab} \cap B)`), aseul: m(T`A \cap ${Bb}`), inter: m(T`A \cap B`),
    };
    const phrases = [
      { txt: "ni A ni B ne sont réalisés", e: "ni", p: UN.sub(PU), calc: T`P(${Ab} \cap ${Bb}) = P(\overline{A \cup B}) = 1 - P(A \cup B)`, val: T`1 - ${d(PU)}` },
      { txt: "A et B ne sont pas réalisés tous les deux", e: "pasdeux", p: UN.sub(PAB), calc: T`P(${Ab} \cup ${Bb}) = P(\overline{A \cap B}) = 1 - P(A \cap B)`, val: T`1 - ${d(PAB)}` },
      { txt: "au plus un des deux est réalisé", e: "pasdeux", p: UN.sub(PAB), calc: T`P(${Ab} \cup ${Bb}) = P(\overline{A \cap B}) = 1 - P(A \cap B)`, val: T`1 - ${d(PAB)}` },
      { txt: "au moins un des deux est réalisé", e: "union", p: PU, calc: T`P(A \cup B) = P(A) + P(B) - P(A \cap B)`, val: T`${d(PA)} + ${d(PB)} - ${d(PAB)}` },
      { txt: "exactement un des deux est réalisé", e: "exact", p: PA.add(PB).sub(PAB.mul(2)), calc: T`P(A) + P(B) - 2P(A \cap B)`, val: T`${d(PA)} + ${d(PB)} - 2 \times ${d(PAB)}` },
      { txt: "A est réalisé mais pas B", e: "aseul", p: PA.sub(PAB), calc: T`P(A \cap ${Bb}) = P(A) - P(A \cap B)`, val: T`${d(PA)} - ${d(PAB)}` },
    ];
    const ch = melange(phrases).filter((x, i, l) => l.findIndex((y) => y.e === x.e) === i).slice(0, 2);
    const donnee = pick(["inter", "union"]);
    return {
      titre: "Traduire avec De Morgan",
      enonce: `${m(T`P(A) = ${d(PA)}`)}, ${m(T`P(B) = ${d(PB)}`)} et
        ${donnee === "inter" ? m(T`P(A \cap B) = ${d(PAB)}`) : m(T`P(A \cup B) = ${d(PU)}`)}.`,
      questions: ch.flatMap((x) => [
        choix4(`« ${x.txt} » s'écrit :`, ecr[x.e], Object.values(ecr)),
        { label: `Probabilité de « ${x.txt} »`, reponse: x.p.val() },
      ]),
      indice: `De Morgan : ${m(T`\overline{A \cup B} = ${Ab} \cap ${Bb}`)} (« ni… ni ») et
        ${m(T`\overline{A \cap B} = ${Ab} \cup ${Bb}`)} (« pas les deux »). Le « ou » est inclusif.`,
      correction: `
        ${donnee === "union" ? M(T`P(A \cap B) = P(A) + P(B) - P(A \cup B) = ${d(PA)} + ${d(PB)} - ${d(PU)} = ${d(PAB)}`)
          : M(T`P(A \cup B) = ${d(PA)} + ${d(PB)} - ${d(PAB)} = ${d(PU)}`)}
        ${ch.map((x) => `<p>« ${x.txt} » s'écrit ${ecr[x.e]}.</p>${M(T`${x.calc} = ${x.val} = ${d(x.p)}`)}`).join("")}
        <p>Les deux lois de De Morgan : le contraire d'un « ou » est un « et » de contraires, et inversement.</p>`,
    };
  });

  ajout(1, "venn", "Distributivité, Venn à 3 évènements", () => {
    const v = partition(50, 8).map((x) => new Fr(x, 50));
    // régions : [dans A, dans B, dans C]
    const R = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 1, 1], [0, 0, 0]];
    const cles = ["a", "b", "c", "ab", "ac", "bc", "abc", "hors"];
    const noms = ["seulement A", "seulement B", "seulement C", T`A \cap B \cap ${Cb}`, T`A \cap ${Bb} \cap C`, T`${Ab} \cap B \cap C`, T`A \cap B \cap C`, T`${Ab} \cap ${Bb} \cap ${Cb}`];
    const pool = [
      { l: m(T`P\big((A \cup B) \cap C\big)`), t: ([a, b, c]) => (a || b) && c, n: T`(A \cup B) \cap C = (A \cap C) \cup (B \cap C)` },
      { l: m(T`P\big((A \cap B) \cup C\big)`), t: ([a, b, c]) => (a && b) || c, n: T`(A \cap B) \cup C = (A \cup C) \cap (B \cup C)` },
      { l: m(T`P(${Ab} \cap ${Bb} \cap ${Cb})`), t: ([a, b, c]) => !a && !b && !c, n: T`${Ab} \cap ${Bb} \cap ${Cb} = \overline{A \cup B \cup C}` },
      { l: m(T`P(A \cup B \cup C)`), t: ([a, b, c]) => a || b || c, n: T`\text{tout sauf la région extérieure}` },
      { l: m(T`P\big(A \cap (B \cup C)\big)`), t: ([a, b, c]) => a && (b || c), n: T`A \cap (B \cup C) = (A \cap B) \cup (A \cap C)` },
      { l: m(T`P\big((A \cup B) \cap ${Cb}\big)`), t: ([a, b, c]) => (a || b) && !c, n: T`(A \cup B) \cap ${Cb} = (A \cap ${Cb}) \cup (B \cap ${Cb})` },
      { l: m(T`P(${Ab} \cup ${Bb})`), t: ([a, b]) => !(a && b), n: T`${Ab} \cup ${Bb} = \overline{A \cap B}` },
      { l: "Probabilité d'être dans <strong>exactement deux</strong> des trois", t: (r) => r.filter(Boolean).length === 2, n: T`\text{les trois régions « deux à deux »}` },
      { l: "Probabilité d'être dans <strong>au moins deux</strong> des trois", t: (r) => r.filter(Boolean).length >= 2, n: T`(A \cap B) \cup (A \cap C) \cup (B \cap C)` },
      { l: "Probabilité d'être dans <strong>A seulement</strong>", t: ([a, b, c]) => a && !b && !c, n: T`A \cap ${Bb} \cap ${Cb}` },
    ];
    const qs = melange(pool).slice(0, 4);
    const calc = qs.map((q) => {
      const idx = R.map((r, i) => (q.t(r.map(Boolean)) ? i : -1)).filter((i) => i >= 0);
      return { idx, p: somme(idx.map((i) => v[i])) };
    });
    const vals = {};
    cles.forEach((k, i) => (vals[k] = txt(v[i].val())));
    return {
      titre: "Diagramme de Venn",
      enonce: `Le diagramme donne la probabilité de chacune des 8 régions (elles sont disjointes et leur somme vaut 1).
        ${vennSVG(vals)}`,
      questions: qs.map((q, i) => ({ label: q.l, reponse: calc[i].p.val() })),
      indice: `Réécris l'évènement (distributivité, De Morgan), repère les régions qu'il contient, puis additionne-les :
        les régions sont incompatibles deux à deux.`,
      correction: qs.map((q, i) => `<p>${q.l} : ${m(q.n)}.</p>
        ${M(T`${calc[i].idx.map((j) => d(v[j])).join(" + ")} = ${d(calc[i].p)}`)}
        <p class="simu-petit">Régions : ${calc[i].idx.map((j) => (j < 3 ? noms[j] : m(noms[j]))).join(", ")}.</p>`).join(""),
    };
  });

  ajout(1, "bornes", "Bornes : inclusion, Boole, Bonferroni", () => {
    const a = rnd(2, 8), b = rnd(2, 8);
    const PA = new Fr(a, 10), PB = new Fr(b, 10);
    const maxI = a < b ? PA : PB, minI = a + b > 10 ? new Fr(a + b - 10, 10) : new Fr(0);
    const minU = a > b ? PA : PB, maxU = a + b < 10 ? new Fr(a + b, 10) : UN;
    const incomp = a + b <= 10;
    return {
      titre: "Encadrer une probabilité",
      enonce: `${m(T`P(A) = ${d(PA)}`)} et ${m(T`P(B) = ${d(PB)}`)}. On ne sait rien d'autre sur ${m("A")} et ${m("B")}.`,
      questions: [
        { label: `Plus grande valeur possible de ${m(T`P(A \cap B)`)}`, reponse: maxI.val() },
        { label: `Plus petite valeur possible de ${m(T`P(A \cap B)`)}`, reponse: minI.val() },
        { label: `Plus petite valeur possible de ${m(T`P(A \cup B)`)}`, reponse: minU.val() },
        { label: `Plus grande valeur possible de ${m(T`P(A \cup B)`)}`, reponse: maxU.val() },
        { label: `${m("A")} et ${m("B")} peuvent-ils être incompatibles ?`, type: "choix", options: ["Oui", "Non"], reponse: incomp ? "Oui" : "Non" },
      ],
      indice: `${m(T`A \cap B \subset A`)} donc ${m(T`P(A \cap B) \le P(A)`)} ; ${m(T`P(A \cup B) \le 1`)} donne Bonferroni
        ${m(T`P(A \cap B) \ge P(A) + P(B) - 1`)} ; Boole : ${m(T`P(A \cup B) \le P(A) + P(B)`)}.`,
      correction: `
        ${M(T`P(A \cap B) \le \min\big(P(A), P(B)\big) = ${d(maxI)}`)}
        <p>(atteint quand le plus petit évènement est inclus dans l'autre).</p>
        ${M(T`P(A \cap B) = P(A) + P(B) - P(A \cup B) \ge ${d(PA)} + ${d(PB)} - 1 = ${nb((a + b - 10) / 10)}`)}
        <p>et une probabilité est ${m(T`\ge 0`)} : minimum ${m(d(minI))}.</p>
        ${M(T`P(A \cup B) \ge \max\big(P(A), P(B)\big) = ${d(minU)} \qquad P(A \cup B) \le \min\big(1, P(A) + P(B)\big) = ${d(maxU)}`)}
        <p>${incomp ? `${m(T`P(A) + P(B) \le 1`)} : on peut avoir ${m(T`P(A \cap B) = 0`)}, donc <strong>oui</strong>.`
          : `${m(T`P(A) + P(B) > 1`)} : forcément ${m(T`P(A \cap B) \ge ${d(minI)} > 0`)}, donc <strong>non</strong>.`}</p>`,
    };
  });

  ajout(1, "ordonne", "Tirages ordonnés sans répétition (anniversaires)", () => {
    const ctx = pick([
      { t: "de", N: 6, k: rnd(2, 5), enonce: (k) => `On lance ${k} dés équilibrés à six faces.`, ev: "tous les résultats sont différents", rep: "au moins deux dés donnent le même résultat" },
      { t: "code", N: 10, k: rnd(3, 5), enonce: (k) => `Un code de ${k} chiffres est tiré au hasard (chaque chiffre de 0 à 9, répétitions permises).`, ev: "tous les chiffres sont différents", rep: "au moins un chiffre se répète" },
      { t: "anniv", N: 365, k: pick([5, 10, 15, 20, 23, 25, 30]), enonce: (k) => `Un groupe compte ${k} personnes ; les anniversaires sont uniformes sur 365 jours (on ignore le 29 février).`, ev: "les anniversaires sont tous différents", rep: "au moins deux personnes ont le même anniversaire" },
    ]);
    const { N, k } = ctx;
    let p = 1;
    for (let i = 0; i < k; i++) p *= (N - i) / N;
    const qs = [
      { label: `Probabilité que ${ctx.ev}`, reponse: p },
      { label: `Probabilité qu'${ctx.rep}`, reponse: 1 - p },
    ];
    if (ctx.t !== "anniv") qs.unshift({ label: m(T`\operatorname{card}(\Omega)`), reponse: N ** k, entier: true });
    const prod = k <= 6 ? [...Array(k).keys()].map((i) => N - i).join(T` \times `) : T`${N} \times ${N - 1} \times \dots \times ${N - k + 1}`;
    return {
      titre: "Tous différents ?",
      enonce: ctx.enonce(k),
      questions: qs,
      indice: `${m(T`\Omega`)} = les ${m("k")}-uplets : ${m(T`\operatorname{card}(\Omega) = N^k`)}. « Tous différents » :
        ${m(T`N(N-1)\cdots(N-k+1)`)} cas (arrangements). « Au moins deux pareils » : complémentaire.`,
      correction: `
        <p>${m(T`\operatorname{card}(\Omega) = ${N}^{${k}}${ctx.t !== "anniv" ? ` = ${N ** k}` : ""}`)} (tirages ordonnés avec répétition, uniformes).</p>
        ${M(T`P(\text{tous différents}) = \frac{${prod}}{${N}^{${k}}} \approx ${nb(p)}`)}
        ${M(T`P(\text{au moins une répétition}) = 1 - ${nb(p)} \approx ${nb(1 - p)}`)}
        ${ctx.t === "anniv" ? "<p>Dès 23 personnes, une coïncidence est plus probable que l'inverse.</p>" : ""}`,
    };
  });

  ajout(1, "combinaisons", "Dénombrement : tirages simultanés (binomial)", () => {
    const r = rnd(3, 7), v = rnd(3, 8), N = r + v;
    const k = rnd(2, Math.min(4, v));
    const j = rnd(1, Math.min(k, r));
    const tot = binom(N, k);
    const fav = binom(r, j) * binom(v, k - j);
    const zero = binom(v, k);
    const ctx = pick([
      { qui: "Une urne", r: "boules rouges", v: "boules vertes", act: `On tire simultanément ${k} boules` },
      { qui: "Un groupe", r: "filles", v: "garçons", act: `On forme au hasard un comité de ${k} personnes` },
      { qui: "Un lot", r: "pièces défectueuses", v: "pièces conformes", act: `On prélève ${k} pièces au hasard, sans remise` },
    ]);
    return {
      titre: "Tirage simultané",
      enonce: `${ctx.qui} contient ${r} ${ctx.r} et ${v} ${ctx.v}. ${ctx.act}.`,
      questions: [
        { label: `Nombre de tirages possibles ${m(T`\operatorname{card}(\Omega)`)}`, reponse: tot, entier: true },
        { label: `Probabilité d'avoir exactement ${j} ${ctx.r}`, reponse: fav / tot },
        { label: `Probabilité de n'avoir aucune des ${ctx.r}`, reponse: zero / tot },
        { label: `Probabilité d'en avoir au moins une`, reponse: 1 - zero / tot },
      ],
      indice: `Sans ordre : ${m(T`\operatorname{card}(\Omega) = \binom{${N}}{${k}}`)}. Pour « exactement ${j} » : on choisit les ${j}
        parmi ${r}, <strong>et</strong> les ${k - j} autres parmi ${v} (produit).`,
      correction: `
        ${M(T`\operatorname{card}(\Omega) = \binom{${N}}{${k}} = \frac{${N}!}{${k}!\,${N - k}!} = ${tot}`)}
        ${M(T`P(\text{exactement } ${j}) = \frac{\binom{${r}}{${j}}\binom{${v}}{${k - j}}}{\binom{${N}}{${k}}} = \frac{${binom(r, j)} \times ${binom(v, k - j)}}{${tot}} = ${vf(new Fr(fav, tot))}`)}
        ${M(T`P(\text{aucune}) = \frac{\binom{${v}}{${k}}}{\binom{${N}}{${k}}} = \frac{${zero}}{${tot}} = ${vf(new Fr(zero, tot))}`)}
        ${M(T`P(\text{au moins une}) = 1 - P(\text{aucune}) = ${vf(new Fr(tot - zero, tot))}`)}`,
    };
  });

  ajout(1, "qcm1", "QCM de cours — chapitre 1", () => vraiFaux([
    { e: `Si ${m(T`A \subset B`)}, alors ${m(T`P(A) \le P(B)`)}.`, v: true, j: `${m(T`B = A \cup (B \cap ${Ab})`)}, union disjointe, donc ${m(T`P(B) = P(A) + P(B \cap ${Ab}) \ge P(A)`)}.` },
    { e: `Pour tous évènements, ${m(T`P(A \cup B) = P(A) + P(B)`)}.`, v: false, j: `Seulement si ${m("A")} et ${m("B")} sont incompatibles ; sinon on retire ${m(T`P(A \cap B)`)}.` },
    { e: `${m(T`P(A \cap B) \le \min\big(P(A), P(B)\big)`)}.`, v: true, j: `${m(T`A \cap B`)} est inclus dans ${m("A")} et dans ${m("B")}.` },
    { e: `Le contraire de ${m(T`A \cap B`)} est ${m(T`${Ab} \cap ${Bb}`)}.`, v: false, j: `De Morgan : ${m(T`\overline{A \cap B} = ${Ab} \cup ${Bb}`)} (« pas les deux »).` },
    { e: `Le contraire de « au moins un des deux » est « ni l'un ni l'autre ».`, v: true, j: `${m(T`\overline{A \cup B} = ${Ab} \cap ${Bb}`)}.` },
    { e: `Si ${m(T`P(A) = 0{,}7`)} et ${m(T`P(B) = 0{,}5`)}, ${m("A")} et ${m("B")} peuvent être incompatibles.`, v: false, j: `Bonferroni : ${m(T`P(A \cap B) \ge 0{,}7 + 0{,}5 - 1 = 0{,}2 > 0`)}.` },
    { e: `${m(T`P(A \cap ${Bb}) = P(A) - P(A \cap B)`)}.`, v: true, j: `${m(T`A = (A \cap B) \cup (A \cap ${Bb})`)}, union disjointe.` },
    { e: `${m(T`P(A \cap ${Bb}) = P(A) - P(B)`)} pour tous ${m("A")}, ${m("B")}.`, v: false, j: `Vrai seulement si ${m(T`B \subset A`)}. En général c'est ${m(T`P(A) - P(A \cap B)`)}.` },
    { e: `${m(T`P(A \cup B \cup C) \le P(A) + P(B) + P(C)`)}.`, v: true, j: `Inégalité de Boole (on retire des intersections positives dans Poincaré).` },
    { e: `${m(T`(A \cup B) \cap C = A \cup (B \cap C)`)}.`, v: false, j: `Distributivité : ${m(T`(A \cup B) \cap C = (A \cap C) \cup (B \cap C)`)}. Contre-exemple : ${m("A")} non vide et ${m(T`C = \emptyset`)}.` },
    { e: `${m(T`(A \cap B) \cup C = (A \cup C) \cap (B \cup C)`)}.`, v: true, j: `C'est l'autre loi de distributivité.` },
    { e: `${m("A")} et ${m(Ab)} forment un système complet d'évènements.`, v: true, j: `Incompatibles et de réunion ${m(T`\Omega`)}.` },
    { e: `Avec deux dés, (1, 2) et (2, 1) sont la même issue, donc ${m(T`\operatorname{card}(\Omega) = 21`)}.`, v: false, j: `Pour avoir l'équiprobabilité on distingue les dés : ${m(T`\operatorname{card}(\Omega) = 36`)}.` },
    { e: `Le nombre de façons de choisir 3 personnes parmi 10 (sans ordre) est ${m(T`10 \times 9 \times 8`)}.`, v: false, j: `Ça, c'est avec ordre. Sans ordre : ${m(T`\binom{10}{3} = 120`)}.` },
    { e: `La probabilité d'obtenir au moins un 6 en 4 lancers de dé est ${m(T`\frac{4}{6}`)}.`, v: false, j: `${m(T`1 - \left(\frac{5}{6}\right)^4 \approx 0{,}518`)} : on passe par « aucun 6 ».` },
    { e: `${m(T`P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)`)}.`, v: true, j: `Formule de Poincaré à 3 évènements.` },
    { e: `« Exactement un des deux » a pour probabilité ${m(T`P(A) + P(B) - P(A \cap B)`)}.`, v: false, j: `Ça, c'est « au moins un ». Exactement un : ${m(T`P(A) + P(B) - 2P(A \cap B)`)}.` },
  ]));

  // ------------------------------------------------------------------
  // Nouveaux générateurs — chapitre 2
  // ------------------------------------------------------------------
  ajout(2, "arbre", "Arbre pondéré : compléter et lire", () => {
    const k = pick([2, 2, 3]);
    let pa;
    if (k === 2) { const a = rnd(2, 8); pa = [new Fr(a, 10), new Fr(10 - a, 10)]; }
    else pa = partition(20, 3).map((x) => new Fr(x, 20));
    const pb = pa.map(() => new Fr(rnd(1, 19), 20));
    const noms = k === 2 ? ["A", "A" + BAR] : ["A₁", "A₂", "A₃"];
    const tx = k === 2 ? ["A", Ab] : ["A_1", "A_2", "A_3"];
    const h1 = rnd(0, k - 1), h2 = rnd(0, k - 1), h2b = rnd(0, 1);
    const br = pa.map((p, i) => ({
      nom: noms[i], p: i === h1 ? "?" : txt(p.val()),
      fils: [
        { nom: "B", p: i === h2 && h2b === 0 ? "?" : txt(pb[i].val()) },
        { nom: "B" + BAR, p: i === h2 && h2b === 1 ? "?" : txt(UN.sub(pb[i]).val()) },
      ],
    }));
    const i2 = rnd(0, k - 1), j = rnd(0, k - 1);
    const PB = somme(pa.map((p, i) => p.mul(pb[i])));
    const inter = pa[i2].mul(UN.sub(pb[i2]));
    const post = pa[j].mul(pb[j]).div(PB);
    const manque2 = h2b === 0 ? pb[h2] : UN.sub(pb[h2]);
    const B2 = h2b === 0 ? "B" : Bb;
    return {
      titre: "Arbre pondéré",
      enonce: `Deux étapes : d'abord ${k === 2 ? `${m("A")} ou ${m(Ab)}` : `${m("A_1")}, ${m("A_2")} ou ${m("A_3")}`},
        ensuite ${m("B")} ou ${m(Bb)}. Deux branches ont été effacées.${arbreSVG(br)}`,
      questions: [
        { label: `Branche effacée ${m(T`P(${tx[h1]})`)}`, reponse: pa[h1].val() },
        { label: `Branche effacée ${m(T`P(${B2} \mid ${tx[h2]})`)}`, reponse: manque2.val() },
        { label: m(T`P(${tx[i2]} \cap ${Bb})`), reponse: inter.val() },
        { label: m(T`P(B)`), reponse: PB.val() },
        { label: m(T`P(${tx[j]} \mid B)`), reponse: post.val() },
      ],
      indice: `Les branches issues d'un même nœud ont une somme égale à 1. Sur une branche du 2e niveau on lit une
        probabilité <strong>conditionnelle</strong>. Un chemin = un produit, ${m(T`P(B)`)} = somme des chemins qui mènent à ${m("B")}.`,
      correction: `
        ${M(T`P(${tx[h1]}) = 1 - ${pa.filter((_, i) => i !== h1).map(d).join(" - ")} = ${d(pa[h1])}`)}
        ${M(T`P(${B2} \mid ${tx[h2]}) = 1 - ${d(UN.sub(manque2))} = ${d(manque2)}`)}
        ${M(T`P(${tx[i2]} \cap ${Bb}) = P(${tx[i2]})\,P(${Bb} \mid ${tx[i2]}) = ${d(pa[i2])} \times ${d(UN.sub(pb[i2]))} = ${d(inter)}`)}
        ${M(T`P(B) = ${pa.map((_, i) => `P(${tx[i]})P(B \\mid ${tx[i]})`).join(" + ")} = ${pa.map((p, i) => `${d(p)} \\times ${d(pb[i])}`).join(" + ")} = ${d(PB)}`)}
        ${M(T`P(${tx[j]} \mid B) = \frac{P(${tx[j]})P(B \mid ${tx[j]})}{P(B)} = \frac{${d(pa[j].mul(pb[j]))}}{${d(PB)}} = ${vf(post)}`)}`,
    };
  });

  ajout(2, "composees", "Probabilités composées (3 tirages)", () => {
    const r = rnd(3, 6), v = rnd(2, 6), N = r + v;
    const den = N * (N - 1) * (N - 2);
    const RRR = new Fr(r * (r - 1) * (r - 2), den), RVR = new Fr(r * v * (r - 1), den);
    const deux = new Fr(3 * r * (r - 1) * v, den);
    return {
      titre: "Trois tirages sans remise",
      enonce: `Une urne contient ${r} boules rouges et ${v} vertes. On tire successivement trois boules <strong>sans remise</strong>.
        ${m("R_i")} : « la ${m("i")}-ème est rouge », ${m("V_i")} : « la ${m("i")}-ème est verte ».`,
      questions: [
        { label: m(T`P(R_1 \cap R_2 \cap R_3)`), reponse: RRR.val() },
        { label: m(T`P(R_1 \cap V_2 \cap R_3)`), reponse: RVR.val() },
        { label: "Probabilité d'avoir exactement deux rouges", reponse: deux.val() },
      ],
      indice: `Formule des probabilités composées : ${m(T`P(A \cap B \cap C) = P(A)\,P(B \mid A)\,P(C \mid A \cap B)`)}.
        Après chaque tirage, l'urne a une boule de moins.`,
      correction: `
        ${M(T`P(R_1 \cap R_2 \cap R_3) = P(R_1)P(R_2 \mid R_1)P(R_3 \mid R_1 \cap R_2) = \frac{${r}}{${N}} \times \frac{${r - 1}}{${N - 1}} \times \frac{${r - 2}}{${N - 2}} = ${vf(RRR)}`)}
        ${M(T`P(R_1 \cap V_2 \cap R_3) = \frac{${r}}{${N}} \times \frac{${v}}{${N - 1}} \times \frac{${r - 1}}{${N - 2}} = ${vf(RVR)}`)}
        <p>Exactement deux rouges : 3 positions possibles pour la verte (RRV, RVR, VRR), chacune de même probabilité
          (mêmes facteurs dans un autre ordre).</p>
        ${M(T`P = 3 \times ${RVR.tex()} = ${vf(deux)}`)}`,
    };
  });

  ajout(2, "circuit", "n évènements indépendants : circuits", () => {
    const type = pick(["serie", "parallele", "mixte", "mixte2"]);
    const p = [0, 1, 2].map(() => new Fr(rnd(12, 19), 20));
    const q = p.map((x) => UN.sub(x));
    const tous = p[0].mul(p[1]).mul(p[2]);
    const aucun = q[0].mul(q[1]).mul(q[2]);
    let F, form, detail;
    if (type === "serie") { F = tous; form = T`P(F_1 \cap F_2 \cap F_3) = p_1 p_2 p_3`; detail = `${d(p[0])} \\times ${d(p[1])} \\times ${d(p[2])}`; }
    else if (type === "parallele") { F = UN.sub(aucun); form = T`1 - P(\overline{F_1} \cap \overline{F_2} \cap \overline{F_3}) = 1 - (1 - p_1)(1 - p_2)(1 - p_3)`; detail = `1 - ${d(q[0])} \\times ${d(q[1])} \\times ${d(q[2])}`; }
    else if (type === "mixte") { F = p[0].mul(UN.sub(q[1].mul(q[2]))); form = T`p_1 \times \big(1 - (1 - p_2)(1 - p_3)\big)`; detail = `${d(p[0])} \\times (1 - ${d(q[1])} \\times ${d(q[2])})`; }
    else { F = UN.sub(UN.sub(p[0].mul(p[1])).mul(q[2])); form = T`1 - (1 - p_1 p_2)(1 - p_3)`; detail = `1 - (1 - ${d(p[0])} \\times ${d(p[1])}) \\times ${d(q[2])}`; }
    const desc = { serie: "trois composants en série", parallele: "trois composants en parallèle", mixte: "C1 en série avec le bloc (C2 ∥ C3)", mixte2: "la branche C1–C2 en parallèle avec C3" }[type];
    return {
      titre: "Fiabilité d'un circuit",
      enonce: `Un circuit est formé de ${desc}. Le courant passe par un composant s'il fonctionne. Les composants fonctionnent
        indépendamment, avec probabilités ${m(T`p_1 = ${d(p[0])}`)}, ${m(T`p_2 = ${d(p[1])}`)}, ${m(T`p_3 = ${d(p[2])}`)}.
        ${circuitSVG(type)}`,
      questions: [
        { label: "Probabilité que les trois fonctionnent", reponse: tous.val() },
        { label: "Probabilité qu'au moins un tombe en panne", reponse: UN.sub(tous).val() },
        { label: "Probabilité que le courant passe", reponse: F.val() },
      ],
      indice: `Indépendance mutuelle : la probabilité d'une intersection est le produit. En série il faut <strong>tous</strong>
        les composants ; en parallèle il en faut <strong>au moins un</strong> (passe par « aucun »).`,
      correction: `
        ${M(T`P(F_1 \cap F_2 \cap F_3) = ${d(p[0])} \times ${d(p[1])} \times ${d(p[2])} = ${d(tous)}`)}
        ${M(T`P(\text{au moins une panne}) = 1 - ${d(tous)} = ${d(UN.sub(tous))}`)}
        ${M(T`P(\text{passe}) = ${form} = ${detail} = ${d(F)}`)}`,
    };
  });

  ajout(2, "indepcompl", "Indépendance et complémentaires", () => {
    const a = new Fr(rnd(1, 9), 10), b = new Fr(rnd(1, 9), 10);
    const qa = UN.sub(a), qb = UN.sub(b);
    return {
      titre: "Évènements indépendants",
      enonce: `${m("A")} et ${m("B")} sont <strong>indépendants</strong>, avec ${m(T`P(A) = ${d(a)}`)} et ${m(T`P(B) = ${d(b)}`)}.`,
      questions: [
        { label: m(T`P(A \cap ${Bb})`), reponse: a.mul(qb).val() },
        { label: m(T`P(${Ab} \cap ${Bb})`), reponse: qa.mul(qb).val() },
        { label: m(T`P(A \cup B)`), reponse: UN.sub(qa.mul(qb)).val() },
        { label: m(T`P(A \mid ${Bb})`), reponse: a.val() },
        { label: `${m("A")} et ${m("B")} sont-ils incompatibles ?`, type: "choix", options: ["Oui", "Non"], reponse: "Non" },
      ],
      indice: `Si ${m("A")} et ${m("B")} sont indépendants, alors ${m(T`A, ${Bb}`)} et ${m(T`${Ab}, ${Bb}`)} le sont aussi.
        Pour la réunion, passe par « ni l'un ni l'autre ».`,
      correction: `
        ${M(T`P(A \cap ${Bb}) = P(A)P(${Bb}) = ${d(a)} \times ${d(qb)} = ${d(a.mul(qb))}`)}
        ${M(T`P(${Ab} \cap ${Bb}) = ${d(qa)} \times ${d(qb)} = ${d(qa.mul(qb))}`)}
        ${M(T`P(A \cup B) = 1 - P(${Ab} \cap ${Bb}) = ${d(UN.sub(qa.mul(qb)))}`)}
        ${M(T`P(A \mid ${Bb}) = \frac{P(A \cap ${Bb})}{P(${Bb})} = P(A) = ${d(a)}`)}
        <p>Incompatibles voudrait dire ${m(T`P(A \cap B) = 0`)}, or ${m(T`P(A \cap B) = ${d(a.mul(b))} \neq 0`)} : <strong>non</strong>.
          Deux évènements de probabilité non nulle ne peuvent pas être à la fois incompatibles et indépendants.</p>`,
    };
  });

  ajout(2, "avant", "« E avant F » et série géométrique", () => {
    if (Math.random() < 0.5) {
      let s1, s2;
      do { s1 = rnd(2, 12); s2 = rnd(2, 12); } while (s1 === s2);
      const pS = (s) => new Fr(6 - Math.abs(s - 7), 36);
      const pE = pS(s1), pF = pS(s2), r = UN.sub(pE).sub(pF);
      const res = pE.div(pE.add(pF));
      return {
        titre: "Qui sort en premier ?",
        enonce: `On lance deux dés de façon répétée jusqu'à obtenir une somme égale à ${s1} ou à ${s2}.
          ${m("E")} : « la somme ${s1} sort avant la somme ${s2} ».`,
        questions: [
          { label: `Probabilité d'obtenir ${s1} en un lancer`, reponse: pE.val() },
          { label: `Probabilité que le premier lancer ne donne ni ${s1} ni ${s2}`, reponse: r.val() },
          { label: m(T`P(E)`), reponse: res.val() },
        ],
        indice: `${m(T`P(S = s) = \frac{6 - |s - 7|}{36}`)}. ${m("E")} = réunion disjointe des évènements « rien pendant
          ${m(T`n - 1`)} lancers, puis ${s1} au ${m("n")}-ème ». Série géométrique.`,
        correction: `
          ${M(T`P(S = ${s1}) = ${vf(pE)} \qquad P(S = ${s2}) = ${vf(pF)} \qquad r = 1 - ${pE.tex()} - ${pF.tex()} = ${vf(r)}`)}
          ${M(T`P(E) = \sum_{n \ge 1} r^{n - 1}\,${pE.tex()} = \frac{${pE.tex()}}{1 - r} = \frac{P(S = ${s1})}{P(S = ${s1}) + P(S = ${s2})} = ${vf(res)}`)}
          <p>Retiens le raccourci : ${m(T`\frac{P(E)}{P(E) + P(F)}`)}, les lancers « neutres » ne comptent pas.</p>`,
      };
    }
    const p = new Fr(rnd(1, 6), 10), q = new Fr(rnd(1, 6), 10);
    const r = UN.sub(p).mul(UN.sub(q));
    const res = p.div(UN.sub(r));
    return {
      titre: "Tir alterné",
      enonce: `Alice et Bob tirent à tour de rôle sur une cible, Alice commence. Alice touche avec probabilité ${m(d(p))},
        Bob avec ${m(d(q))}, les tirs sont indépendants. Le premier qui touche gagne.`,
      questions: [
        { label: "Probabilité que personne ne touche lors du premier tour (Alice puis Bob)", reponse: r.val() },
        { label: "Probabilité qu'Alice gagne à son 2e tir", reponse: r.mul(p).val() },
        { label: "Probabilité qu'Alice gagne", reponse: res.val() },
      ],
      indice: `Alice gagne à son ${m("n")}-ème tir si les ${m(T`n - 1`)} premiers tours sont ratés par les deux,
        puis elle touche : ${m(T`r^{n-1} p`)}. Somme d'une série géométrique ${m(T`\sum_{n \ge 0} r^n = \frac{1}{1 - r}`)}.`,
      correction: `
        ${M(T`r = (1 - ${d(p)})(1 - ${d(q)}) = ${d(r)} \qquad P(\text{gagne au 2e tir}) = r \times ${d(p)} = ${d(r.mul(p))}`)}
        ${M(T`P(\text{Alice gagne}) = \sum_{n \ge 1} r^{n - 1} \times ${d(p)} = \frac{${d(p)}}{1 - ${d(r)}} = ${vf(res)}`)}`,
    };
  });

  ajout(2, "urnes", "Bayes : choix d'une urne au dé", () => {
    const k = rnd(1, 5);
    const b1 = rnd(1, 7), n1 = rnd(1, 7), b2 = rnd(1, 7), n2 = rnd(1, 7);
    const P1 = new Fr(k, 6), P2 = UN.sub(P1);
    const pb1 = new Fr(b1, b1 + n1), pb2 = new Fr(b2, b2 + n2);
    const PBl = P1.mul(pb1).add(P2.mul(pb2));
    const U1Bl = P1.mul(pb1).div(PBl);
    const U2N = P2.mul(UN.sub(pb2)).div(UN.sub(PBl));
    return {
      titre: "Deux urnes",
      enonce: `On lance un dé : s'il donne ${k === 1 ? "1" : `1 à ${k}`}, on pioche dans l'urne ${m("U_1")} (${b1} blanches, ${n1} noires),
        sinon dans ${m("U_2")} (${b2} blanches, ${n2} noires). On tire une boule.`,
      questions: [
        { label: "Probabilité de tirer une boule blanche", reponse: PBl.val() },
        { label: "Probabilité d'avoir pioché dans U₁ sachant que la boule est blanche", reponse: U1Bl.val() },
        { label: "Probabilité d'avoir pioché dans U₂ sachant que la boule est noire", reponse: U2N.val() },
      ],
      indice: `Système complet ${m(T`\{U_1, U_2\}`)} avec ${m(T`P(U_1) = \frac{${k}}{6}`)}. Probabilités totales pour la couleur, puis Bayes.`,
      correction: `
        ${M(T`P(\text{Bl}) = P(U_1)P(\text{Bl} \mid U_1) + P(U_2)P(\text{Bl} \mid U_2) = ${P1.tex()} \times ${pb1.tex()} + ${P2.tex()} \times ${pb2.tex()} = ${vf(PBl)}`)}
        ${M(T`P(U_1 \mid \text{Bl}) = \frac{${P1.tex()} \times ${pb1.tex()}}{${PBl.tex()}} = ${vf(U1Bl)}`)}
        ${M(T`P(U_2 \mid \text{N}) = \frac{P(U_2)P(\text{N} \mid U_2)}{1 - P(\text{Bl})} = \frac{${P2.tex()} \times ${UN.sub(pb2).tex()}}{${UN.sub(PBl).tex()}} = ${vf(U2N)}`)}`,
    };
  });

  ajout(2, "markov", "Suite récurrente (arbre de transition)", () => {
    const p = new Fr(rnd(5, 9), 10), q = new Fr(rnd(1, 4), 10);
    const a = p.sub(q);
    const p1 = p, p2 = a.mul(p).add(q), p3 = a.mul(p2).add(q);
    const l = q.div(UN.sub(a));
    const br = [
      { nom: "S", p: "pₙ", fils: [{ nom: "S", p: txt(p.val()) }, { nom: "P", p: txt(UN.sub(p).val()) }] },
      { nom: "P", p: "1 − pₙ", fils: [{ nom: "S", p: txt(q.val()) }, { nom: "P", p: txt(UN.sub(q).val()) }] },
    ];
    return {
      titre: "Soleil ou pluie",
      enonce: `S'il fait soleil (S) un jour, il fait soleil le lendemain avec probabilité ${m(d(p))} ; s'il pleut (P), il fait
        soleil le lendemain avec probabilité ${m(d(q))}. Aujourd'hui (jour 0) il fait soleil : ${m(T`p_0 = 1`)},
        où ${m("p_n")} = P(soleil au jour ${m("n")}).${arbreSVG(br)}`,
      questions: [
        { label: m("p_1"), reponse: p1.val() },
        { label: m("p_2"), reponse: p2.val() },
        { label: m("p_3"), reponse: p3.val() },
        { label: `Limite ${m(T`\ell = \lim p_n`)}`, reponse: l.val() },
      ],
      indice: `Probabilités totales avec le système complet (soleil / pluie au jour ${m("n")}) :
        ${m(T`p_{n+1} = ${d(p)}\,p_n + ${d(q)}\,(1 - p_n)`)}. Suite arithmético-géométrique : point fixe ${m(T`\ell = a\ell + b`)}.`,
      correction: `
        ${M(T`p_{n+1} = ${d(p)}\,p_n + ${d(q)}(1 - p_n) = ${d(a)}\,p_n + ${d(q)}`)}
        ${M(T`p_1 = ${d(p1)} \qquad p_2 = ${d(a)} \times ${d(p1)} + ${d(q)} = ${d(p2)} \qquad p_3 = ${d(a)} \times ${d(p2)} + ${d(q)} = ${d(p3)}`)}
        ${M(T`\ell = ${d(a)}\,\ell + ${d(q)} \iff \ell = \frac{${d(q)}}{1 - ${d(a)}} = ${vf(l)}`)}
        <p>Et ${m(T`p_n = \ell + ${d(a)}^n (p_0 - \ell) \to \ell`)} car ${m(T`|${d(a)}| < 1`)}.</p>`,
    };
  });

  ajout(2, "qcm2", "QCM de cours — chapitre 2", () => vraiFaux([
    { e: `Deux évènements incompatibles de probabilités non nulles sont indépendants.`, v: false, j: `${m(T`P(A \cap B) = 0 \neq P(A)P(B) > 0`)} : jamais indépendants.` },
    { e: `Si ${m("A")} et ${m("B")} sont indépendants, ${m(Ab)} et ${m(Bb)} le sont aussi.`, v: true, j: `${m(T`P(${Ab} \cap ${Bb}) = 1 - P(A \cup B) = (1 - P(A))(1 - P(B))`)}.` },
    { e: `${m(T`P(A \mid B) = P(B \mid A)`)} pour tous ${m("A")}, ${m("B")}.`, v: false, j: `${m(T`P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}`)} : égal seulement si ${m(T`P(A) = P(B)`)}.` },
    { e: `${m(T`P(${Ab} \mid B) = 1 - P(A \mid B)`)}.`, v: true, j: `${m(T`P(\cdot \mid B)`)} est une probabilité.` },
    { e: `${m(T`P(A \mid ${Bb}) = 1 - P(A \mid B)`)}.`, v: false, j: `On change la condition, pas l'évènement. Le bon complément est ${m(T`P(${Ab} \mid B)`)}.` },
    { e: `${m(T`P(A \cap B) = P(A)\,P(B \mid A)`)} quand ${m(T`P(A) > 0`)}.`, v: true, j: `C'est la définition de ${m(T`P(B \mid A)`)} réarrangée (produit le long d'une branche).` },
    { e: `Si ${m(T`P(A \mid B) = P(A)`)} (avec ${m(T`P(B) > 0`)}), alors ${m("A")} et ${m("B")} sont indépendants.`, v: true, j: `On multiplie par ${m(T`P(B)`)} : ${m(T`P(A \cap B) = P(A)P(B)`)}.` },
    { e: `Dans un arbre, les probabilités des branches issues d'un même nœud ont une somme égale à 1.`, v: true, j: `Elles forment une loi conditionnelle sachant le nœud.` },
    { e: `Trois évènements deux à deux indépendants sont mutuellement indépendants.`, v: false, j: `Contre-exemple classique : deux pièces, A = « 1re pile », B = « 2e pile », C = « mêmes faces » : ${m(T`P(A \cap B \cap C) = \frac14 \neq \frac18`)}.` },
    { e: `La formule des probabilités totales demande un système complet d'évènements.`, v: true, j: `Les ${m("A_i")} doivent être incompatibles deux à deux et de réunion ${m(T`\Omega`)}.` },
    { e: `${m(T`P(A \mid B)`)} peut être strictement supérieure à 1.`, v: false, j: `${m(T`A \cap B \subset B`)} donc ${m(T`P(A \cap B) \le P(B)`)}.` },
    { e: `Avec remise, les résultats des tirages successifs sont indépendants.`, v: true, j: `L'urne est remise dans le même état à chaque tirage.` },
    { e: `Sans remise, ${m(T`P(B_2) = P(B_1)`)} (2e boule blanche ou 1re boule blanche).`, v: true, j: `Par probabilités totales, l'ordre ne compte pas tant qu'on ne sait rien du 1er tirage.` },
    { e: `Si ${m(T`A \subset B`)} et ${m(T`P(B) > 0`)}, alors ${m(T`P(A \mid B) = \frac{P(A)}{P(B)}`)}.`, v: true, j: `${m(T`A \cap B = A`)}.` },
    { e: `${m(T`P(A \mid B) + P(A \mid ${Bb}) = 1`)}.`, v: false, j: `Ex. : si ${m(T`A = \Omega`)}, la somme vaut 2.` },
  ]));

  // ------------------------------------------------------------------
  // Nouveaux générateurs — chapitre 3
  // ------------------------------------------------------------------
  ajout(3, "transfert", "Loi de g(X) et théorème de transfert", () => {
    const gs = [
      { tex: "X^2", f: (x) => x * x },
      { tex: T`|X|`, f: (x) => Math.abs(x) },
      { tex: "(X - 1)^2", f: (x) => (x - 1) ** 2 },
    ];
    let g, xs, imgs;
    for (;;) {
      g = pick(gs);
      xs = melange([-2, -1, 0, 1, 2, 3]).slice(0, rnd(4, 5)).sort((x, y) => x - y);
      imgs = [...new Set(xs.map(g.f))].sort((x, y) => x - y);
      if (imgs.length < xs.length) break;
    }
    const ps = partition(20, xs.length).map((x) => new Fr(x, 20));
    const loiY = imgs.map((y) => somme(xs.map((x, i) => (g.f(x) === y ? ps[i] : new Fr(0)))));
    const vi = loiY.findIndex((_, k) => xs.filter((x) => g.f(x) === imgs[k]).length > 1);
    const EY = somme(xs.map((x, i) => ps[i].mul(g.f(x))));
    const pre = xs.filter((x) => g.f(x) === imgs[vi]);
    return {
      titre: "Fonction d'une variable",
      enonce: `${m("X")} a la loi ci-dessous, et on pose ${m(T`Y = ${g.tex}`)}.
        ${loiTable(xs, ps.map((p) => m(d(p))))}`,
      questions: [
        { label: `Nombre de valeurs distinctes prises par ${m("Y")}`, reponse: imgs.length, entier: true },
        { label: m(T`P(Y = ${imgs[vi]})`), reponse: loiY[vi].val() },
        { label: m(T`E(Y)`), reponse: EY.val() },
      ],
      indice: `Calcule ${m(T`g(x)`)} pour chaque valeur : les ${m("x")} qui donnent le même ${m("y")} se regroupent
        (on additionne leurs probabilités). Transfert : ${m(T`E(g(X)) = \sum_x g(x)P(X = x)`)}, inutile de passer par la loi de ${m("Y")}.`,
      correction: `
        <p>Valeurs : ${xs.map((x) => m(T`g(${x}) = ${g.f(x)}`)).join(", ")}.</p>
        ${loiTable(imgs, loiY.map((p) => m(d(p))), "y", "P(Y = y)")}
        ${M(T`P(Y = ${imgs[vi]}) = ${pre.map((x) => `P(X = ${x})`).join(" + ")} = ${d(loiY[vi])}`)}
        ${M(T`E(Y) = ${xs.map((x, i) => `${g.f(x)} \\times ${d(ps[i])}`).join(" + ")} = ${vf(EY)}`)}`,
    };
  });

  ajout(3, "somme", "Somme de deux variables indépendantes", () => {
    const px = partition(10, 3).map((x) => new Fr(x, 10));
    const q = new Fr(rnd(1, 9), 10), nq = UN.sub(q);
    const pS = [px[0].mul(nq), px[1].mul(nq).add(px[0].mul(q)), px[2].mul(nq).add(px[1].mul(q)), px[2].mul(q)];
    const EX = px[1].add(px[2].mul(2)), EX2 = px[1].add(px[2].mul(4));
    const VX = EX2.sub(EX.mul(EX));
    const ES = EX.add(q), VS = VX.add(q.mul(nq));
    const s = rnd(1, 2);
    const egal = px[0].mul(nq).add(px[1].mul(q));
    return {
      titre: "Loi d'une somme",
      enonce: `${m("X")} et ${m("Y")} sont indépendantes. ${m("X")} prend les valeurs 0, 1, 2 avec probabilités
        ${px.map((p) => m(d(p))).join(", ")} ; ${m(T`Y \sim \mathcal{B}(${d(q)})`)} (Bernoulli). On pose ${m("S = X + Y")}.`,
      questions: [
        { label: m(T`P(S = ${s})`), reponse: pS[s].val() },
        { label: m(T`P(X = Y)`), reponse: egal.val() },
        { label: m(T`E(S)`), reponse: ES.val() },
        { label: m(T`V(S)`), reponse: VS.val() },
      ],
      indice: `Liste les couples ${m("(x, y)")} qui donnent la valeur voulue et additionne ${m(T`P(X = x)P(Y = y)`)} (indépendance).
        ${m(T`E(X + Y) = E(X) + E(Y)`)} toujours ; ${m(T`V(X + Y) = V(X) + V(Y)`)} car indépendantes.`,
      correction: `
        ${M(T`P(S = ${s}) = P(X = ${s})P(Y = 0) + P(X = ${s - 1})P(Y = 1) = ${d(px[s])} \times ${d(nq)} + ${d(px[s - 1])} \times ${d(q)} = ${d(pS[s])}`)}
        ${M(T`P(X = Y) = P(X = 0)P(Y = 0) + P(X = 1)P(Y = 1) = ${d(egal)}`)}
        ${M(T`E(X) = ${d(EX)} \qquad E(X^2) = ${d(EX2)} \qquad V(X) = ${d(EX2)} - ${d(EX)}^2 = ${d(VX)}`)}
        ${M(T`E(S) = ${d(EX)} + ${d(q)} = ${d(ES)} \qquad V(S) = ${d(VX)} + ${d(q)} \times ${d(nq)} = ${d(VS)}`)}
        <p>Loi complète de ${m("S")} :</p>${loiTable([0, 1, 2, 3], pS.map((p) => m(d(p))), "s", "P(S = s)")}`,
    };
  });

  ajout(3, "correlation", "Écart-type, covariance, corrélation", () => {
    const sx = rnd(1, 5), sy = rnd(1, 5);
    const ex = rnd(-3, 5), ey = rnd(-3, 5);
    const rho = pick([-0.8, -0.6, -0.5, -0.25, 0, 0.25, 0.4, 0.5, 0.6, 0.75]);
    const cov = Math.round(rho * sx * sy * 100) / 100;
    const r = cov / (sx * sy);
    const a = pick([-3, -2, -1, 2, 3]), b = rnd(-5, 5);
    return {
      titre: "Covariance et corrélation",
      enonce: `On donne ${m(T`E(X) = ${ex}`)}, ${m(T`E(X^2) = ${sx * sx + ex * ex}`)}, ${m(T`E(Y) = ${ey}`)},
        ${m(T`E(Y^2) = ${sy * sy + ey * ey}`)} et ${m(T`E(XY) = ${nb(cov + ex * ey)}`)}.`,
      questions: [
        { label: m(T`\sigma(X)`), reponse: sx },
        { label: m(T`\mathrm{Cov}(X, Y)`), reponse: cov },
        { label: m(T`\rho(X, Y)`), reponse: r },
        { label: m(T`V(X - Y)`), reponse: sx * sx + sy * sy - 2 * cov },
        choix4(`${m(T`\rho(X, ${a}X ${b < 0 ? "-" : "+"} ${Math.abs(b)})`)} vaut :`, a < 0 ? "−1" : "1", ["−1", "0", "1", "ça dépend de la loi de X"]),
      ],
      indice: `${m(T`V(X) = E(X^2) - E(X)^2`)}, ${m(T`\sigma = \sqrt{V}`)}, ${m(T`\mathrm{Cov}(X, Y) = E(XY) - E(X)E(Y)`)},
        ${m(T`\rho = \frac{\mathrm{Cov}}{\sigma(X)\sigma(Y)}`)}. ${m(T`|\rho| = 1`)} exactement quand ${m("Y")} est une fonction affine de ${m("X")}.`,
      correction: `
        ${M(T`V(X) = ${sx * sx + ex * ex} - ${ex < 0 ? `(${ex})` : ex}^2 = ${sx * sx} \Rightarrow \sigma(X) = ${sx} \qquad V(Y) = ${sy * sy} \Rightarrow \sigma(Y) = ${sy}`)}
        ${M(T`\mathrm{Cov}(X, Y) = ${nb(cov + ex * ey)} - ${ex < 0 ? `(${ex})` : ex} \times ${ey < 0 ? `(${ey})` : ey} = ${nb(cov)}`)}
        ${M(T`\rho(X, Y) = \frac{${nb(cov)}}{${sx} \times ${sy}} = ${nb(r)}`)}
        ${M(T`V(X - Y) = V(X) + V(Y) - 2\,\mathrm{Cov}(X, Y) = ${sx * sx} + ${sy * sy} - 2 \times ${cov < 0 ? `(${nb(cov)})` : nb(cov)} = ${nb(sx * sx + sy * sy - 2 * cov)}`)}
        <p>${m(T`\mathrm{Cov}(X, aX + b) = a V(X)`)} et ${m(T`\sigma(aX + b) = |a|\sigma(X)`)} donc ${m(T`\rho = \frac{a}{|a|}`)} :
          ici ${m(T`a = ${a}`)}, ${m(T`\rho = ${a < 0 ? -1 : 1}`)}.</p>`,
    };
  });

  ajout(3, "moyenne", "Moyenne empirique", () => {
    const mu = rnd(2, 40), s = rnd(2, 12), n = pick([4, 9, 16, 25, 36, 49, 64, 100]);
    const cible = pick([0.5, 1, 1.5, 2]);
    const nmin = Math.ceil((s / cible) ** 2 - 1e-9);
    return {
      titre: "Moyenne de n mesures",
      enonce: `${m("X_1, \\dots, X_n")} sont indépendantes, de même loi, d'espérance ${m(T`\mu = ${mu}`)} et d'écart-type
        ${m(T`\sigma = ${s}`)}. On note ${m(T`\overline{X} = \frac{1}{n}\sum_{i=1}^n X_i`)}, ici avec ${m(T`n = ${n}`)}.`,
      questions: [
        { label: m(T`E(\overline{X})`), reponse: mu },
        { label: m(T`V(\overline{X})`), reponse: (s * s) / n },
        { label: m(T`\sigma(\overline{X})`), reponse: s / Math.sqrt(n) },
        { label: `Plus petit ${m("n")} tel que ${m(T`\sigma(\overline{X}) \le ${nb(cible)}`)}`, reponse: nmin, entier: true },
      ],
      indice: `${m(T`E(\overline{X}) = \mu`)} par linéarité. ${m(T`V\big(\sum X_i\big) = \sum V(X_i)`)} (indépendance) et ${m(T`V(aX) = a^2 V(X)`)}
        donnent ${m(T`V(\overline{X}) = \frac{\sigma^2}{n}`)}.`,
      correction: `
        ${M(T`E(\overline{X}) = \frac{1}{n} \sum E(X_i) = \mu = ${mu}`)}
        ${M(T`V(\overline{X}) = \frac{1}{n^2} \sum V(X_i) = \frac{\sigma^2}{n} = \frac{${s * s}}{${n}} = ${nb((s * s) / n)}`)}
        ${M(T`\sigma(\overline{X}) = \frac{\sigma}{\sqrt{n}} = \frac{${s}}{${Math.sqrt(n)}} = ${nb(s / Math.sqrt(n))}`)}
        ${M(T`\frac{${s}}{\sqrt{n}} \le ${nb(cible)} \iff n \ge \left(\frac{${s}}{${nb(cible)}}\right)^2 = ${nb((s / cible) ** 2)} \Rightarrow n = ${nmin}`)}`,
    };
  });

  ajout(3, "uniforme", "Loi uniforme discrète", () => {
    const n = pick([4, 6, 8, 10, 12, 20]), k = rnd(2, n - 1);
    const pairs = Math.floor(n / 2);
    return {
      titre: "Dé à n faces",
      enonce: `On lance un dé équilibré à ${n} faces numérotées de 1 à ${n}. ${m("X")} est le résultat : ${m(T`X \sim \mathcal{U}(\{1, \dots, ${n}\})`)}.`,
      questions: [
        { label: m(T`P(X \le ${k})`), reponse: k / n },
        { label: "Probabilité que X soit pair", reponse: pairs / n },
        { label: m(T`E(X)`), reponse: (n + 1) / 2 },
        { label: m(T`V(X)`), reponse: (n * n - 1) / 12 },
      ],
      indice: `${m(T`P(X = k) = \frac{1}{${n}}`)} pour chaque face. ${m(T`E(X) = \frac{n + 1}{2}`)} (loi symétrique autour du milieu)
        et ${m(T`V(X) = \frac{n^2 - 1}{12}`)}.`,
      correction: `
        ${M(T`P(X \le ${k}) = \frac{${k}}{${n}} = ${vf(new Fr(k, n))} \qquad P(X \text{ pair}) = \frac{${pairs}}{${n}} = ${vf(new Fr(pairs, n))}`)}
        ${M(T`E(X) = \frac{1}{${n}}\sum_{k=1}^{${n}} k = \frac{${n} + 1}{2} = ${nb((n + 1) / 2)}`)}
        ${M(T`E(X^2) = \frac{(${n} + 1)(2 \times ${n} + 1)}{6} \qquad V(X) = \frac{${n}^2 - 1}{12} = ${vf(new Fr(n * n - 1, 12))}`)}`,
    };
  });

  ajout(3, "indicatrice", "Variables indicatrices", () => {
    const p = [0, 1, 2].map(() => new Fr(rnd(2, 9), 10));
    const ctx = pick([
      { qui: "Un étudiant passe trois partiels", ev: "il valide le partiel", N: "le nombre de partiels validés" },
      { qui: "Trois clients entrent dans une boutique", ev: "le client achète", N: "le nombre d'acheteurs" },
      { qui: "Trois lampes sont allumées pour la nuit", ev: "la lampe grille", N: "le nombre de lampes grillées" },
    ]);
    const E = somme(p), V = somme(p.map((x) => x.mul(UN.sub(x))));
    const z = UN.sub(p[0]).mul(UN.sub(p[1])).mul(UN.sub(p[2]));
    return {
      titre: "Compter avec des indicatrices",
      enonce: `${ctx.qui}. Pour ${m(T`i = 1, 2, 3`)}, ${m("A_i")} : « ${ctx.ev} ${m("i")} », de probabilités
        ${p.map((x, i) => m(T`P(A_${i + 1}) = ${d(x)}`)).join(", ")}, indépendants. ${m("N")} est ${ctx.N} :
        ${m(T`N = \mathbb 1_{A_1} + \mathbb 1_{A_2} + \mathbb 1_{A_3}`)}.`,
      questions: [
        { label: m(T`E(N)`), reponse: E.val() },
        { label: m(T`V(N)`), reponse: V.val() },
        { label: m(T`P(N = 0)`), reponse: z.val() },
        { label: m(T`E(\mathbb 1_{A_1}\mathbb 1_{A_2})`), reponse: p[0].mul(p[1]).val() },
      ],
      indice: `${m(T`E(\mathbb 1_A) = P(A)`)}, ${m(T`V(\mathbb 1_A) = P(A)(1 - P(A))`)}, ${m(T`\mathbb 1_A \mathbb 1_B = \mathbb 1_{A \cap B}`)}.
        Indépendance : les variances s'additionnent. ${m("N")} n'est <strong>pas</strong> binomiale (probabilités différentes).`,
      correction: `
        ${M(T`E(N) = ${p.map(d).join(" + ")} = ${d(E)}`)}
        ${M(T`V(N) = ${p.map((x) => `${d(x)} \\times ${d(UN.sub(x))}`).join(" + ")} = ${d(V)}`)}
        ${M(T`P(N = 0) = P(\overline{A_1} \cap \overline{A_2} \cap \overline{A_3}) = ${p.map((x) => d(UN.sub(x))).join(T` \times `)} = ${d(z)}`)}
        ${M(T`E(\mathbb 1_{A_1}\mathbb 1_{A_2}) = E(\mathbb 1_{A_1 \cap A_2}) = P(A_1 \cap A_2) = ${d(p[0])} \times ${d(p[1])} = ${d(p[0].mul(p[1]))}`)}`,
    };
  });

  ajout(3, "constante", "Loi valide : trouver la constante", () => {
    const n = rnd(3, 6);
    const f = pick([
      { tex: "ck", w: (k) => k },
      { tex: `c(${n + 1} - k)`, w: (k) => n + 1 - k },
      { tex: "ck^2", w: (k) => k * k },
    ]);
    const ks = [...Array(n).keys()].map((i) => i + 1);
    const S = ks.reduce((s, k) => s + f.w(k), 0);
    const c = new Fr(1, S);
    const mm = rnd(2, n);
    const pge = new Fr(ks.filter((k) => k >= mm).reduce((s, k) => s + f.w(k), 0), S);
    const E = new Fr(ks.reduce((s, k) => s + k * f.w(k), 0), S);
    return {
      titre: "Trouver la constante",
      enonce: `${m("X")} prend les valeurs ${m(T`1, \dots, ${n}`)} avec ${m(T`P(X = k) = ${f.tex}`)}, où ${m("c")} est une constante.`,
      questions: [
        { label: `Valeur de ${m("c")}`, reponse: c.val() },
        { label: m(T`P(X \ge ${mm})`), reponse: pge.val() },
        { label: m(T`E(X)`), reponse: E.val() },
      ],
      indice: `Une loi est valide si ${m(T`p_k \ge 0`)} et ${m(T`\sum p_k = 1`)} : écris la somme, elle donne ${m("c")}.`,
      correction: `
        ${M(T`\sum_{k=1}^{${n}} P(X = k) = c\,(${ks.map(f.w).join(" + ")}) = ${S}c = 1 \Rightarrow c = ${c.tex()}`)}
        ${M(T`P(X \ge ${mm}) = \frac{${ks.filter((k) => k >= mm).map(f.w).join(" + ")}}{${S}} = ${vf(pge)}`)}
        ${M(T`E(X) = \frac{${ks.map((k) => `${k} \\times ${f.w(k)}`).join(" + ")}}{${S}} = ${vf(E)}`)}`,
    };
  });

  ajout(3, "qcm3", "QCM de cours — chapitre 3", () => vraiFaux([
    { e: `Si ${m(T`\mathrm{Cov}(X, Y) = 0`)}, alors ${m("X")} et ${m("Y")} sont indépendantes.`, v: false, j: `Réciproque fausse. Ex. : ${m(T`X`)} uniforme sur ${m(T`\{-1, 0, 1\}`)} et ${m(T`Y = X^2`)} : covariance nulle, mais ${m("Y")} dépend de ${m("X")}.` },
    { e: `Si ${m("X")} et ${m("Y")} sont indépendantes, alors ${m(T`\mathrm{Cov}(X, Y) = 0`)}.`, v: true, j: `${m(T`E(XY) = E(X)E(Y)`)} dans ce cas.` },
    { e: `${m(T`V(X - Y) = V(X) - V(Y)`)} pour ${m("X")}, ${m("Y")} indépendantes.`, v: false, j: `${m(T`V(X - Y) = V(X) + V(-Y) = V(X) + V(Y)`)} : les variances s'ajoutent.` },
    { e: `${m(T`V(2X) = 2V(X)`)}.`, v: false, j: `${m(T`V(aX) = a^2 V(X)`)}, donc ${m(T`4V(X)`)}.` },
    { e: `${m(T`V(X + 3) = V(X)`)}.`, v: true, j: `Décaler une variable ne change pas sa dispersion.` },
    { e: `${m(T`E(XY) = E(X)E(Y)`)} pour toutes variables ${m("X")}, ${m("Y")}.`, v: false, j: `La différence est justement ${m(T`\mathrm{Cov}(X, Y)`)}. Ex. : ${m(T`E(X \cdot X) = E(X^2) \neq E(X)^2`)} en général.` },
    { e: `${m(T`|\rho(X, Y)| \le 1`)}.`, v: true, j: `Inégalité de Cauchy-Schwarz.` },
    { e: `${m(T`\rho(X, Y) = -1`)} si et seulement si ${m(T`Y = aX + b`)} avec ${m(T`a < 0`)}.`, v: true, j: `Cas d'égalité de Cauchy-Schwarz.` },
    { e: `${m(T`\mathrm{Cov}(X, X) = V(X)`)}.`, v: true, j: `${m(T`E(X \cdot X) - E(X)^2`)}.` },
    { e: `${m(T`E(\mathbb 1_A) = P(A)`)}.`, v: true, j: `${m(T`\mathbb 1_A`)} vaut 1 avec probabilité ${m(T`P(A)`)}, 0 sinon.` },
    { e: `Si ${m(T`X \sim \mathcal{B}(n, p)`)}, alors ${m(T`V(X) = np`)}.`, v: false, j: `${m(T`V(X) = np(1 - p)`)}.` },
    { e: `Si ${m(T`X \sim \mathcal{P}(\lambda)`)}, alors ${m(T`E(X) = V(X) = \lambda`)}.`, v: true, j: `Propriété caractéristique de la loi de Poisson.` },
    { e: `Si ${m(T`X \sim \mathcal{G}(p)`)} (rang du 1er succès), ${m(T`E(X) = \frac{1}{p}`)}.`, v: true, j: `Cas ${m("r = 1")} de la binomiale négative : ${m(T`E = \frac{r}{p}`)}.` },
    { e: `Avec ${m("n")} variables indépendantes de même écart-type ${m(T`\sigma`)}, ${m(T`\sigma(\overline{X}) = \frac{\sigma}{n}`)}.`, v: false, j: `${m(T`V(\overline{X}) = \frac{\sigma^2}{n}`)} donc ${m(T`\sigma(\overline{X}) = \frac{\sigma}{\sqrt{n}}`)}.` },
    { e: `Si la loi de ${m("X")} est symétrique autour de ${m("c")}, alors ${m(T`E(X) = c`)}.`, v: true, j: `${m(T`X - c`)} et ${m(T`c - X`)} ont même loi, donc ${m(T`E(X - c) = 0`)}.` },
    { e: `${m(T`F(x) = P(X \le x)`)} est croissante et ${m(T`P(X = k) = F(k) - F(k - 1)`)} pour ${m("X")} à valeurs entières.`, v: true, j: `${m(T`\{X \le k\} = \{X \le k - 1\} \cup \{X = k\}`)}, union disjointe.` },
    { e: `Une variance peut être négative.`, v: false, j: `${m(T`V(X) = E\big((X - E(X))^2\big) \ge 0`)}.` },
  ]));

  // ------------------------------------------------------------------
  // Interface
  // ------------------------------------------------------------------
  const CHAPITRES = { 1: "Ch. 1 — Espace probabilisé", 2: "Ch. 2 — Conditionnement", 3: "Ch. 3 — Variables discrètes" };
  const CLE = "simulateur-proba-score";
  const CLE_TYPES = "simulateur-proba-types";

  function lireNombre(s) {
    s = String(s).trim().replace(/\s/g, "").replace(/,/g, ".").replace(/−/g, "-");
    if (!s) return NaN;
    let pct = false;
    if (s.endsWith("%")) { pct = true; s = s.slice(0, -1); }
    let v;
    const n = "[-+]?(?:\\d+\\.?\\d*|\\.\\d+)";
    if (new RegExp(`^${n}/${n}$`).test(s)) {
      const [a, b] = s.split("/");
      v = parseFloat(a) / parseFloat(b);
    } else if (new RegExp(`^${n}(?:e[-+]?\\d+)?$`, "i").test(s)) {
      v = parseFloat(s);
    } else return NaN;
    return pct ? v / 100 : v;
  }
  const proche = (u, a) => Math.abs(u - a) <= Math.max(6e-4, 5e-3 * Math.abs(a));

  function typeset(el) {
    const mj = window.MathJax;
    if (mj && mj.typesetPromise) {
      (mj.startup && mj.startup.promise ? mj.startup.promise : Promise.resolve())
        .then(() => mj.typesetPromise([el]))
        .catch(() => {});
    } else {
      setTimeout(() => typeset(el), 300);
    }
  }

  function monter(racine) {
    racine.dataset.monte = "1";
    const lire = (cle, def) => { try { return JSON.parse(localStorage.getItem(cle)) || def; } catch { return def; } };
    const ecrire = (cle, v) => { try { localStorage.setItem(cle, JSON.stringify(v)); } catch { /* stockage indisponible */ } };
    let score = lire(CLE, { ok: 0, total: 0, serie: 0 });
    let stats = lire(CLE_TYPES, {}); // id -> { ok, total } en exercices entièrement réussis
    const sauver = () => { ecrire(CLE, score); ecrire(CLE_TYPES, stats); };

    let chap = 0; // 0 = tous
    let type = ""; // "" = aléatoire, "__faibles" = points faibles, sinon un id
    let parcours = false;
    let file = []; // types restants du parcours
    let tailleParcours = 0;
    let courant = null;
    let num = 0;

    racine.innerHTML = `
      <div class="simu">
        <div class="simu-barre">
          <div class="simu-chips" role="group" aria-label="Chapitre">
            <button type="button" data-chap="0" class="actif">Tout</button>
            ${Object.entries(CHAPITRES).map(([k, v]) => `<button type="button" data-chap="${k}" title="${v}">Ch. ${k}</button>`).join("")}
          </div>
          <label class="simu-type-label">Formule
            <select class="simu-type"></select>
          </label>
          <label class="simu-parcours" title="Passe par chaque type d'exercice une fois, dans un ordre aléatoire">
            <input type="checkbox" class="simu-parcours-case"> Parcours complet
          </label>
          <div class="simu-score" aria-live="polite"></div>
        </div>
        <div class="simu-progres" hidden><div class="simu-progres-barre"></div><span></span></div>
        <div class="simu-carte"></div>
        <p class="simu-aide">Réponses acceptées : <code>0,375</code>, <code>0.375</code>, <code>3/8</code> ou <code>37,5 %</code>.
          Un arrondi à 3 décimales suffit. <kbd>Entrée</kbd> pour vérifier.</p>
      </div>`;

    const $ = (sel) => racine.querySelector(sel);
    const selType = $(".simu-type");
    const carte = $(".simu-carte");

    function majScore() {
      const pct = score.total ? Math.round((100 * score.ok) / score.total) : 0;
      const vus = GEN.filter((g) => stats[g.id] && stats[g.id].total).length;
      $(".simu-score").innerHTML = `<span><strong>${score.ok}</strong> / ${score.total} bonnes réponses${score.total ? ` (${pct} %)` : ""}</span>
        <span title="Types d'exercices déjà essayés">${vus} / ${GEN.length} types</span>
        <span class="simu-serie" title="Exercices réussis d'affilée">🔥 ${score.serie}</span>
        <button type="button" class="simu-raz" title="Remettre le score à zéro">↺</button>`;
      $(".simu-raz").onclick = () => {
        if (!confirm("Remettre à zéro le score et les statistiques par type ?")) return;
        score = { ok: 0, total: 0, serie: 0 }; stats = {}; sauver(); majScore(); majTypes();
      };
    }

    const faible = (g) => { const s = stats[g.id]; return !s || !s.total || s.ok / s.total < 0.75; };
    const etiquette = (g) => {
      const s = stats[g.id];
      const marque = !s || !s.total ? "○" : s.ok / s.total >= 0.75 ? "✓" : "✗";
      return `${marque} ${g.nom}${s && s.total ? ` (${s.ok}/${s.total})` : ""}`;
    };

    function majTypes() {
      const chaps = chap ? [chap] : [1, 2, 3];
      const nbFaibles = GEN.filter((g) => (!chap || g.chap === chap) && faible(g)).length;
      selType.innerHTML = `<option value="">Toutes (au hasard)</option>
        <option value="__faibles">À retravailler (${nbFaibles})</option>` +
        chaps.map((c) => `<optgroup label="${CHAPITRES[c]}">${GEN.filter((g) => g.chap === c)
          .map((g) => `<option value="${g.id}">${etiquette(g)}</option>`).join("")}</optgroup>`).join("");
      if (type && type !== "__faibles" && !GEN.some((g) => g.id === type && (!chap || g.chap === chap))) type = "";
      selType.value = type;
    }

    function candidats() {
      const l = GEN.filter((g) => !chap || g.chap === chap);
      if (type === "__faibles") { const f = l.filter(faible); return f.length ? f : l; }
      if (type) return l.filter((g) => g.id === type);
      return l;
    }

    function majProgres() {
      const barre = $(".simu-progres");
      barre.hidden = !parcours;
      if (!parcours) return;
      const fait = tailleParcours - file.length;
      barre.querySelector(".simu-progres-barre").style.width = `${(100 * fait) / tailleParcours}%`;
      barre.querySelector("span").textContent = `Parcours : ${fait} / ${tailleParcours}`;
    }

    function nouvel() {
      let g;
      if (parcours) {
        if (!file.length) {
          file = melange(candidats());
          tailleParcours = file.length;
        }
        g = file.shift();
      } else {
        const dispo = candidats();
        g = pick(dispo);
        if (dispo.length > 1 && courant && g.id === courant.gen.id) g = pick(dispo.filter((x) => x.id !== courant.gen.id));
      }
      courant = { gen: g, ex: g.f(), note: false };
      racine.exerciceCourant = courant.ex; // utilisé par les tests automatiques
      num++;
      afficher();
      majProgres();
    }

    function afficher() {
      const { gen, ex } = courant;
      const fin = parcours && !file.length;
      carte.innerHTML = `
        <div class="simu-entete">
          <span class="simu-tag">Ch. ${gen.chap} · ${gen.nom}</span>
          <span class="simu-num">Exercice ${num}</span>
        </div>
        <h3 class="simu-titre">${ex.titre}</h3>
        <div class="simu-enonce">${ex.enonce}</div>
        <ol class="simu-questions">
          ${ex.questions.map((q, i) => `
            <li data-i="${i}">
              <span class="simu-label">${q.label}</span>
              ${q.type === "choix"
                ? `<span class="simu-choix">${q.options.map((o, k) => `<label><input type="radio" name="q${num}-${i}" value="${k}"> ${o}</label>`).join("")}</span>`
                : `<input class="simu-input" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="Réponse ${i + 1}" placeholder="${q.entier ? "entier" : "réponse"}">`}
              <span class="simu-retour" aria-live="polite"></span>
            </li>`).join("")}
        </ol>
        <div class="simu-actions">
          <button type="button" class="md-button md-button--primary simu-verifier">Vérifier</button>
          <button type="button" class="md-button simu-btn-indice">Indice</button>
          <button type="button" class="md-button simu-btn-correction">Correction</button>
          <button type="button" class="md-button simu-suivant">${fin ? "Parcours terminé — recommencer ↻" : "Nouvel exercice →"}</button>
        </div>
        <div class="simu-panneau simu-indice" hidden><strong>Indice.</strong> ${ex.indice}</div>
        <div class="simu-panneau simu-correction" hidden><strong>Correction.</strong>${ex.correction}</div>`;

      carte.querySelector(".simu-verifier").onclick = verifier;
      carte.querySelector(".simu-suivant").onclick = nouvel;
      carte.querySelector(".simu-btn-indice").onclick = () => basculer(".simu-indice");
      carte.querySelector(".simu-btn-correction").onclick = () => {
        if (!courant.note) noter(courant.ex.questions.map(() => false));
        basculer(".simu-correction");
      };
      carte.querySelectorAll(".simu-input").forEach((inp) => {
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); verifier(); } });
      });
      typeset(carte);
      const premier = carte.querySelector(".simu-input");
      if (premier && racine.dataset.focus) premier.focus({ preventScroll: true });
    }

    function basculer(sel) {
      const p = carte.querySelector(sel);
      p.hidden = !p.hidden;
      if (!p.hidden) typeset(p);
    }

    function noter(resultats) {
      if (courant.note) return;
      courant.note = true;
      score.total += resultats.length;
      score.ok += resultats.filter(Boolean).length;
      const reussi = resultats.every(Boolean);
      score.serie = reussi ? score.serie + 1 : 0;
      const s = stats[courant.gen.id] || { ok: 0, total: 0 };
      s.total++; if (reussi) s.ok++;
      stats[courant.gen.id] = s;
      sauver();
      majScore();
      majTypes();
    }

    function verifier() {
      racine.dataset.focus = "1";
      const res = courant.ex.questions.map((q, i) => {
        const li = carte.querySelector(`li[data-i="${i}"]`);
        const retour = li.querySelector(".simu-retour");
        let bon, vide = false;
        if (q.type === "choix") {
          const coche = li.querySelector("input:checked");
          vide = !coche;
          bon = !!coche && q.options[Number(coche.value)] === q.reponse;
        } else {
          const brut = li.querySelector(".simu-input").value;
          const u = lireNombre(brut);
          vide = !brut.trim();
          bon = Number.isFinite(u) && (q.entier ? u === q.reponse : proche(u, q.reponse));
          if (!vide && !Number.isFinite(u)) {
            li.className = "simu-faux";
            retour.textContent = "Format non reconnu";
            return false;
          }
        }
        li.className = vide ? "" : bon ? "simu-bon" : "simu-faux";
        retour.textContent = vide ? "—" : bon ? "✓" : "✗";
        return bon;
      });
      // On ne note qu'une fois tout rempli, pour ne pas compter une vérification partielle
      const complet = courant.ex.questions.every((q, i) => {
        const li = carte.querySelector(`li[data-i="${i}"]`);
        return q.type === "choix" ? !!li.querySelector("input:checked") : !!li.querySelector(".simu-input").value.trim();
      });
      if (complet) noter(res);
      if (res.every(Boolean)) {
        carte.querySelector(".simu-verifier").textContent = "Bravo !";
        carte.querySelector(".simu-suivant").focus({ preventScroll: true });
      }
    }

    racine.querySelectorAll(".simu-chips button").forEach((b) => {
      b.onclick = () => {
        chap = Number(b.dataset.chap);
        racine.querySelectorAll(".simu-chips button").forEach((x) => x.classList.toggle("actif", x === b));
        file = []; tailleParcours = 0;
        majTypes();
        nouvel();
      };
    });
    selType.onchange = () => { type = selType.value; file = []; tailleParcours = 0; nouvel(); };
    $(".simu-parcours-case").onchange = (e) => {
      parcours = e.target.checked;
      file = []; tailleParcours = 0;
      if (parcours && type && type !== "__faibles") { type = ""; selType.value = ""; }
      nouvel();
    };

    majScore();
    majTypes();
    nouvel();
  }

  function init() {
    const racine = document.getElementById("simulateur-proba");
    if (racine && !racine.dataset.monte) monter(racine);
  }

  // Exposé pour les tests automatiques
  window.SimulateurProba = { GEN, lireNombre, proche };

  if (typeof document$ !== "undefined") document$.subscribe(init);
  else document.addEventListener("DOMContentLoaded", init);
})();
