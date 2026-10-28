---
name: car-budget
description: Estimate and compare car ownership costs through resale, including cash flow and uncertainty.
---

# Car Budget

## Shared contract

Find the repository root containing `app/model.mjs` and read `docs/evidence.md` there before giving recommendations. Repository paths below are relative to that root, even when this skill is loaded through a discovery directory. Read `my-car/session.md` if it exists. Use Hebrew for questions and outputs. Save private work only under `my-car/`; use fictional data in public contributions. Ask for missing decision inputs as explicit questions. Conclude with recommendation, evidence, tradeoff, and one next action. Record the current stage and unresolved blockers in the session. Do not contact anyone or spend money without explicit authorization.

## Calculate the ownership horizon

Read `docs/calculations.md`. Use `node tools/calculate.mjs my-car/comparison.json` or the comparison app; do not replace the shared formula with mental arithmetic. Start from `examples/comparison.json` only as a schema example and replace every fictional value before a real recommendation.

Default to 36 months unless the buyer chose another horizon. Set costs.horizon_months to the horizon actually used to estimate resale. Re-estimate resale when the horizon changes; do not merely edit the tag.

Collect purchase price, expected resale at the chosen horizon, annual fuel/charging, insurance, licensing, scheduled service, wear/repairs and other costs, plus one-time inspection, transfer, accessories or charging installation. Mark included and excluded categories explicitly. Unknown is null; zero means confirmed zero or intentionally excluded with an explanation.

Separate economic cost (depreciation plus operating and financing costs) from cash required at purchase and cash outflow before sale. Never add the full purchase price to depreciation or loan principal to economic cost. If financed, use car-finance for the loan terms.

Show a resale sensitivity interval and explain that it varies resale only. If repair costs, energy or interest are uncertain, create separate complete scenarios with those inputs changed. Do not invent failure probabilities. Optional opportunity cost belongs in a separate, labelled scenario, not a hidden default.

Report the main uncertainty and the price or cost threshold at which the decision flips. Rounded totals must not imply certainty beyond the inputs.
