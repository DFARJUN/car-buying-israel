---
name: car-listings
description: Collect, deduplicate and refresh car listings or seller quotes into a traceable candidate comparison.
---

# Car Listings

## Shared contract

Find the repository root containing `app/model.mjs` and read `docs/evidence.md` there before giving recommendations. Repository paths below are relative to that root, even when this skill is loaded through a discovery directory. Read `my-car/session.md` if it exists. Use Hebrew for questions and outputs. Save private work only under `my-car/`; use fictional data in public contributions. Ask for missing decision inputs as explicit questions. Conclude with recommendation, evidence, tradeoff, and one next action. Record the current stage and unresolved blockers in the session. Do not contact anyone or spend money without explicit authorization.

## Intake without inventing listings

Use user-provided links or permitted live browsing. If blocked, ask for pasted content or screenshots; do not bypass access controls. Never treat a CAPTCHA or transient error as a sold vehicle. Record access failure and last successful check separately.

Use `templates/candidate.md` for source detail and the schema in `docs/data-format.md` for app records. Capture asking price versus negotiated price, year, trim, engine/gearbox, mileage and its date, seller type, previous use, source URL, check date and availability. Retain older observations when a value changes.

Deduplicate by listing identifier and, privately, registration/VIN if supplied. Similar trim and colour are not proof of identity. A seller's “one owner” may not explain previous registration type; record the claim until verified. Advertised price is not a completed transaction price.

Save candidates in `my-car/comparison.json`. Preserve notes, personal ratings and previous evidence on refresh. Mark unavailable candidates rather than deleting them. Do not copy seller contacts or photos into public examples.
