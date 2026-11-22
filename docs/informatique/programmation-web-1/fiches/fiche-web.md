---
title: "Fiche — Programmation Web"
---

# Fiche — Programmation Web

## HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>…</title>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/script.js" defer></script>
</head>
<body> <header><nav></nav></header> <main><section></section></main> <footer></footer> </body>
</html>
```

`a[href]`, `img[src][alt]`, `ul/ol > li`, `table > thead/tbody > tr > th/td`,
`form > fieldset > legend, label[for], input[type][name], select > option, textarea, button`.

## CSS

| Sélecteur | Cible |
|---|---|
| `p`, `.c`, `#i`, `[type="x"]` | balise, classe, id, attribut |
| `A B` / `A > B` | descendant / enfant direct |
| `A + B` / `A ~ B` | frère suivant immédiat / tous les frères suivants |
| `:hover`, `:first-child`, `::before` | pseudo-classes, pseudo-éléments |

Priorité : `!important` > style en ligne > id > classe/attribut/pseudo-classe > balise ; à égalité, la dernière règle.

```css
.parent { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; }
@media (max-width: 768px) { .parent { flex-direction: column; } }
```

## JavaScript

```js
let x = 1; const Y = 2;                    // pas de var
if (a === b) {}                            // === et !==
const f = (n) => n * 2;
const el = document.querySelector("#id");  // getElementById, querySelectorAll
el.textContent = "…"; el.classList.add("on"); el.style.color = "red";
const li = document.createElement("li"); parent.appendChild(li);
el.addEventListener("click", (e) => { e.preventDefault(); });
setTimeout(fn, 1000); setInterval(fn, 1000);
fetch("data.json").then((r) => r.json()).then((d) => {…}).catch(console.error);
JSON.stringify(obj); JSON.parse(texte);
localStorage.setItem("k", JSON.stringify(v)); JSON.parse(localStorage.getItem("k"));
tab.map(f); tab.filter(f); tab.find(f); tab.forEach(f);
```
