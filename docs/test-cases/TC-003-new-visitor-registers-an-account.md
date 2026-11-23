# TC-003: New visitor registers an account

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-02 AC-01 ([F-02](../features/F-02-registration.md))
- **Status:** Automated
- **Automation:** cypress/e2e/features/auth/registration.feature — "[TC-003] New visitor registers an account"

## Preconditions
- On the home page, with the registration form open.

## Test data
- A new random user generated with faker at run time.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Register with new random details (faker). | The dashboard opens and shows "role: user". |

**Pass criteria:** The dashboard opens and shows "role: user".

## Notes
- Passed locally 2026-11-23 (Node 20.20.2, Cypress 13.13.2, `--env tags="not @requires-account"`): 6/6 public scenarios, after the TC-ID renames.
- Public scenario, but it **creates a real account on the third-party dev site** every run (baseline gap G-1).
