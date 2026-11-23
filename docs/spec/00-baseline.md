# 00 Baseline spec: Delek Homes (dev site)

Status: Draft
Date: 2026-11-23
Source: read from the feature files in `cypress/e2e/features/`, step definitions, page objects in `cypress/pages/`, `cypress.config.js`, `.github/workflows/test.yml` and README.md. Items marked [INFERRED] were deduced, not read from a written spec.

## Purpose
This repo tests **Delek Homes**, a third-party real-estate listings web app, on its **dev environment** at https://dev.delekhomes.com. Visitors search listings, users register and sign in, and admins publish listings with photos through the UI or API. The repo contains no application code of its own.

## User roles
| Role | Can do |
|---|---|
| Visitor | Search listings from the home page (keyword, bedrooms, city, price), and register |
| User | Sign in and out, see a dashboard with "role: user", filter featured listings |
| Admin | Everything a user can do, plus publish listings (UI or API) and delete listings (API) [INFERRED: from the admin steps] |

The test accounts (one user, one admin) are supplied at runtime through `Cypress.env()`: locally from a gitignored `cypress.env.json`, and in CI from GitHub Secrets (`CYPRESS_ADMIN_*`, `CYPRESS_USER_*`). **No account details are committed.**

## Main flows
1. **Register:** the home page's registration form (first name, last name, email, password) leads to the dashboard.
2. **Sign in and out:** sign in leads to the dashboard showing the role. Signing out from the profile menu leads to "Sign in to Delek Homes".
3. **Publish a listing (admin):** sign in through the UI or the API, fill in the listing form with a photo, then the listing appears on the listings dashboard, can be found through home page search, and its page shows square footage, bedrooms, bathrooms and garage.
4. **Listings API (admin):** get a token, create a listing from a fixture, get its id back, then delete it.
5. **Home page search:** keyword, bedrooms (3+), city or price range leads to the featured listings page with filters applied.
6. **Featured listings search (signed in):** the same filters, on the featured listings page.

## Data
- **Inputs:** registration fields (generated with faker), listing details (random values plus fixtures `listing1.json` and `listing2.json`), a photo upload, and search criteria.
- **Errors:** required-field messages ("First name required", "Last name required", "Email is required", "Password is required"), and "Input data validation failed" for a duplicate email.

## Integrations
- **External dependency:** dev.delekhomes.com (third-party, internet access required). Its API is used for admin sign-in and listing create and delete [INFERRED: the endpoint paths are in the step definitions].
- **CI:** GitHub Actions (`test.yml`) on push and PR to main, plus manual runs. When the account secrets are set it runs every scenario; otherwise it runs only `test:public`.

## Existing tests
- 6 feature files, 15 scenario definitions (16 runs, because the create-listing outline runs twice).
- **9 scenario definitions (10 runs) need an account. 6 are public.**

## Known gaps
- **G-1:** the tests write to a third-party dev site (registration creates real accounts, and publishing creates listings). Only the API scenario cleans up after itself [INFERRED].
- **G-2:** the price-range scenarios only check that the filter shows dollar amounts, not that the results fall within the range.
- **G-3:** "Filter by bedrooms" on featured listings only asserts that no listing shows 1 bedroom, which is a weak check.
