---
name: car-compare
description: Maintain the local comparison app, compare finalists and explain requirement fit, weighted ratings and ownership costs.
---

# Car Compare

## Shared contract

Find the repository root containing `app/model.mjs` and read `docs/evidence.md` there before giving recommendations. Repository paths below are relative to that root, even when this skill is loaded through a discovery directory. Read `my-car/session.md` if it exists. Use Hebrew for questions and outputs. Save private work only under `my-car/`; use fictional data in public contributions. Ask for missing decision inputs as explicit questions. Conclude with recommendation, evidence, tradeoff, and one next action. Record the current stage and unresolved blockers in the session. Do not contact anyone or spend money without explicit authorization.

## Update a portable comparison

Read `docs/data-format.md`, `docs/calculations.md`, and `docs/ai-scoring.md`. Read settings.usage, settings.must_haves and settings.top_priority before scoring. If they are empty, ask what matters to this buyer first. Default to a 36-month ownership horizon unless the buyer requests another. Use `my-car/comparison.json` as the canonical local summary. The buyer talks to the agent; do not ask them to fill fields or move JSON. Read the latest file before updating so you preserve existing notes, decisions and personal ratings.

Prepare `my-car/comparison-draft.json`, including the current summary and source coverage. Run `node tools/save-comparison.mjs my-car/comparison-draft.json` to validate and atomically publish it. The local website reads that file and refreshes automatically. Browser import/export is only a manual fallback; if the buyer used that fallback, reconcile their latest export before overwriting it.

Before producing AI scores, read or perform the exact model research using car-models and the specific vehicle research using car-history. Save both summaries and source links in model_research and vehicle_research. Set rating_origin to ai only for scores actually produced from that analysis, personal for manually entered judgments, and demo only for fictional examples. Do not relabel an existing personal rating as AI.

Use the anchored rubric in docs/ai-scoring.md. Each reason records model-level evidence, vehicle-level adjustments, sources, dates, confidence and remaining uncertainty. Do not apply mechanical numerical penalties without evidence. Missing decisive research should suppress the relevant dimension, not receive a neutral score.

Keep three independent layers:
1. Hard gates: failed, pending because data is missing, or satisfied within the configured gates.
2. Weighted evaluation: 1-10 for reliability, resale, space, safety, running cost, with a reason and sources for each score. Missing weighted dimensions suppress the overall score. Buyer-set weights are preferences, not objective probabilities.
3. Ownership cost in ILS: assumptions, incomplete categories and resale sensitivity.

Never auto-score from brand, gearbox type or cosmetic appearance. The user's 1-5 personal rating is separate from analytical scores. Do not alter personal ratings unless asked. Unknown safety or title details remain blockers even if the app has no corresponding hard gate.

Show which criterion changes the ranking, compare at most 3 finalists side-by-side, and recommend the next evidence-gathering action if the cost difference is inside uncertainty. Retain rejected/hidden candidates with reasons.
