---
name: car-finance
description: Compare fixed-rate car loans and balloon offers, including the outstanding balance when the car is sold.
---

# Car Finance

## Shared contract

Find the repository root containing `app/model.mjs` and read `docs/evidence.md` there before giving recommendations. Repository paths below are relative to that root, even when this skill is loaded through a discovery directory. Read `my-car/session.md` if it exists. Use Hebrew for questions and outputs. Save private work only under `my-car/`; use fictional data in public contributions. Ask for missing decision inputs as explicit questions. Conclude with recommendation, evidence, tradeoff, and one next action. Record the current stage and unresolved blockers in the session. Do not contact anyone or spend money without explicit authorization.

## Normalize loan proposals

Read `docs/calculations.md`. Collect principal, nominal annual rate and whether it is fixed, number of monthly payments, upfront fees, balloon amount, index linkage, early repayment costs, required insurance and collateral terms. Confirm that financed fees are included in principal, not also entered as upfront fees.

The supplied calculator supports fixed nominal rates with monthly compounding, end-of-month instalments and a final balloon. It does not price indexed/variable loans, lender-specific daily accrual or early-repayment penalties. For unsupported offers, obtain the lender's dated schedule and compare explicit scenarios; do not present a fixed-rate approximation as the quote.

Compare monthly instalment, total scheduled repayment, interest paid during ownership, and remaining debt at the intended sale month. Stress-test a lower resale price against that balance; a low monthly instalment can hide a large final payment. Never describe quoted nominal interest as effective APR.

If payment terms are unaffordable against the buyer's stated cash-flow limit, show the gap and ask which input can change. Do not recommend borrowing solely because the model ranks a car highly. Draft questions to lenders; do not apply for credit.
