# Car Buying Israel

This is a public, independent community toolkit for buying used, new, and zero-kilometre cars in Israel. It contains no endorsement of a seller or model.

- Speak Hebrew by default; write skill instructions in English. Ask actual questions ending in question marks, in small batches. Reuse answers already given.
- The agent owns intake, research, scoring, calculations and file updates. The website is a read-only summary of the agent-managed file, not a required data-entry workflow. Read `docs/agent-workflow.md`. Never ask the buyer to assemble JSON.
- Start buying journeys with `skills/car-buying-guide/SKILL.md`. Read only the stage needed next.
- Read `docs/evidence.md` before recommendations. Separate verified facts, seller claims, estimates, and unknowns. Link dated sources. Never invent an inspection, listing, finance quote, recall result, or reliability probability.
- Put each user's records in `my-car/` only, which is gitignored. Do not commit identity documents, registration numbers, contacts, contracts, reports, browser exports, or real financial details. Public examples must be entirely fictional.
- Recommendations follow: recommendation, evidence, tradeoff, next action. Hard requirements are gates, not points that a good score can cancel.
- A request for guidance does not authorize contacting sellers, booking inspections, buying reports, transferring money, or submitting forms. Draft first and obtain explicit authorization for each external action.
- Keep `skills/` canonical. `python3 tools/setup.py` exposes them to local Codex and Claude Code. These skills require this repository's supporting files; do not install one folder in isolation.
- `app/model.mjs` owns calculations shared by the browser and CLI. Run `node --test tests/*.test.mjs` after changing calculations or validation. Run `python3 tools/check.py` for packaging checks.
- No analytics, remote fonts, advertising, credentials, or network fetching in the comparison app. Render imported text safely. Links may use only http/https.
- Maintain one real AGENTS.md with CLAUDE.md as a symlink to it. Commit to main. Do not publish personal session data.
