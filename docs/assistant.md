---
title: Assistant IA
icon: material/robot-outline
hide:
  - toc
---

# :material-robot-outline: Pose ta question à tes fiches

L'assistant cherche les passages les plus proches dans tes fiches, puis rédige
une réponse **uniquement à partir d'eux**. S'il ne trouve rien, il le dit.

<div class="assistant">
  <div class="assistant-zone">
    <input id="assistant-question" type="text" placeholder="Ex : Qu'est-ce qu'une bascule JK ?">
    <button id="assistant-bouton" class="md-button md-button--primary">Demander</button>
  </div>
  <div id="assistant-resultat"></div>
</div>

!!! info "Pour l'instant, en local"
    L'assistant tourne sur ton PC : lance l'API (`uvicorn api:app --reload --app-dir src`
    dans le projet IA-Assistant-Revision) avant de poser une question.