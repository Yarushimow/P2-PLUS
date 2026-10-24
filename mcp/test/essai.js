// Essai du serveur sans Cloudflare : appelle le Worker directement avec Node
// (lit le vrai site). Usage : npm test
import worker from "../src/index.js";

let id = 0;
async function rpc(method, params) {
  const reponse = await worker.fetch(new Request("http://localhost/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }),
  }), {});
  return reponse.json();
}
const outil = async (name, args) => (await rpc("tools/call", { name, arguments: args })).result;
const verifier = (condition, message) => {
  console.log(`${condition ? "OK " : "ÉCHEC"}  ${message}`);
  if (!condition) process.exitCode = 1;
};

const init = await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "essai", version: "1" } });
verifier(init.result?.protocolVersion === "2025-06-18", "initialize");

const liste = await rpc("tools/list");
verifier(liste.result?.tools?.length === 4, `tools/list : ${liste.result?.tools?.map((t) => t.name).join(", ")}`);

const recherche = await outil("chercher", { requete: "loi de Poisson", limite: 3 });
verifier(!recherche.isError && /yarushimow\.github\.io/.test(recherche.content[0].text), "chercher « loi de Poisson »");
console.log(recherche.content[0].text.slice(0, 600), "\n");

const page = await outil("lire_page", { page: "maths/probabilites/" });
verifier(!page.isError && page.content[0].text.startsWith("# Probabilités"), "lire_page maths/probabilites/");

const tp = await outil("lire_page", { page: "physique-elec/systemes-numeriques/tp/tp-3-compteurs/" });
verifier(tp.isError || /protégée/.test(tp.content[0].text), "lire_page refuse le TP chiffré");

const mat = await outil("matieres", {});
verifier(/SM301P/.test(mat.content[0].text), "matieres");
console.log(mat.content[0].text.slice(0, 500), "\n");

const evals = await outil("prochaines_evaluations", { limite: 3 });
verifier(!evals.isError, "prochaines_evaluations");
console.log(evals.content[0].text, "\n");

const inconnu = await rpc("tools/call", { name: "nexiste_pas", arguments: {} });
verifier(inconnu.error?.code === -32602, "outil inconnu → erreur JSON-RPC");
