---
name: car-history
description: Check a specific Israeli vehicle’s registration, ownership history, mileage, recalls and title evidence before purchase.
---

# Car History

## Shared contract

Find the repository root containing `app/model.mjs` and read `docs/evidence.md` there before giving recommendations. Repository paths below are relative to that root, even when this skill is loaded through a discovery directory. Read `my-car/session.md` if it exists. Use Hebrew for questions and outputs. Save private work only under `my-car/`; use fictional data in public contributions. Ask for missing decision inputs as explicit questions. Conclude with recommendation, evidence, tradeoff, and one next action. Record the current stage and unresolved blockers in the session. Do not contact anyone or spend money without explicit authorization.

## Verify the specific vehicle

Read `docs/sources.md` and use `templates/vehicle-research.md`. Save the vehicle-specific summary, source dates and missing evidence in vehicle_research; keep the registration in plate only in the private comparison file. Ask for registration details only when needed, and keep identifiers private. Confirm the seller's authority and matching registration/VIN through documents the buyer can inspect. Explain that public model/ownership-type data does not identify the owner or prove title is clear.

Compare mileage across ad, latest test, service invoices and inspection, each with its date. Raise contradictions rather than silently replacing a figure. Distinguish an official record from a seller claim and a missing search result.

Check recall with official information and the importer for the exact vehicle. “No match” is not proof of no open recall. Keep source coverage, checked date and unresolved applicability in the record. Check relevant pledge/charge and transfer restrictions using current official services; do not imply that one registry or successful transfer clears every interest.

Read every available history, inspection and warranty document in full before a purchase recommendation. Record missing pages, illegible text or blocked access; a seller summary is not a substitute. A candidate may remain worth researching while purchase readiness is blocked.

Request service records, accident/repair evidence and warranty terms. Lack of an accident record does not prove accident-free history. An unexplained identity mismatch, title restriction or mileage contradiction blocks a buy recommendation until independently resolved.

Output an evidence table: claim, source, date, confirmed/claimed/conflicting/unknown, and next verification. Never label a car “clean” based solely on public lookups.
