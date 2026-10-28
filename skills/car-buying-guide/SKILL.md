---
name: car-buying-guide
description: Guide a complete car purchase in Israel, resume a saved buying journey, or select the next buying step.
---

# Car Buying Guide

## Shared contract

Find the repository root containing `app/model.mjs` and read `docs/evidence.md` there before giving recommendations. Repository paths below are relative to that root, even when this skill is loaded through a discovery directory. Read `my-car/session.md` if it exists. Use Hebrew for questions and outputs. Save private work only under `my-car/`; use fictional data in public contributions. Ask for missing decision inputs as explicit questions. Conclude with recommendation, evidence, tradeoff, and one next action. Record the current stage and unresolved blockers in the session. Do not contact anyone or spend money without explicit authorization.

## Agent-led delivery

Read `docs/agent-workflow.md`. The conversation is the main interface; the website summarizes your work. Complete an initial research pass and update the summary automatically within the user's scope. Do not stop after proposing a workflow, require another request for each stage, or ask the buyer to fill JSON or operate the app.

Build the private comparison file yourself, including summary.stage, recommendation, rationale, tradeoff, next_action, updated_at and coverage. Missing evidence permits a partial research summary, not a final buy recommendation. Validate and publish locally using `node tools/save-comparison.mjs my-car/comparison-draft.json`. Launch `python3 tools/serve.py` if a summary view is useful and not already running. It reads my-car/comparison.json automatically; do not require import/export in the normal flow.

Keep a private research log with queries, opened pages, dates, candidate counts and access gaps. Retain source artifacts under my-car/evidence. Never treat search snippets as examined vehicles. Distinguish candidate for research, candidate for inspection, and readiness to consider buying.

When requirements change, record the revision and refresh affected evidence, rankings and estimates; retain unaffected work and old records. Follow the change matrix in docs/agent-workflow.md. Mark affected scores or resale estimates unknown until refreshed instead of silently relabelling stale results.

## Route the journey

If this is a new journey, ask whether the buyer already has a specific car or offer. Read `templates/session.md` and create `my-car/session.md` from it. Never overwrite an existing session. Ask only the next 2-4 relevant questions; do not force buyers who have an offer through all earlier steps again.

Load the corresponding skill from `skills/<name>/SKILL.md`:

| Need | Skill | Deliverable |
|---|---|---|
| Define use and hard constraints | car-needs | Buyer brief |
| Budget and total cost | car-budget | Cost scenarios |
| Choose exact variants | car-models | Evidence-backed shortlist |
| Collect or refresh ads | car-listings | Candidate records |
| Verify identity, history and recall | car-history | Evidence and gaps |
| Visit, drive and interpret inspection | car-inspection | Inspection questions and blockers |
| New/zero-km offer or warranty | car-offer-review | Comparable written terms |
| Loan or balloon proposal | car-finance | Payments, interest, balance at sale |
| Compare finalists in the app | car-compare | Updated JSON and decision |
| Negotiate | car-negotiation | Conditional offer draft |
| Compare insurance | car-insurance | Coverage comparison |
| Payment, title and delivery | car-handover | Closing checklist |

For new cars, prioritise written specifications, order terms, delivery date and handover. For zero-km, also verify first registration, recorded ownership and warranty start. For used cars, prioritise history and an independent inspection. Never assume these labels guarantee a vehicle's condition.

Finish each session with a short state update: decisions confirmed by the buyer, supporting sources, changed assumptions, next task and blockers. A good numerical score cannot override unresolved identity, title or safety concerns. Do not declare a purchase complete without the buyer confirming it.
