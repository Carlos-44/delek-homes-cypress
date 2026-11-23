# TC-005: Registration requires every field

- **Priority:** P1
- **Type:** negative
- **Linked criteria:** F-02 AC-03
- **Status:** Automated
- **Automation:** cypress/e2e/features/auth/registration.feature — "Registration requires every field"

## Preconditions
- The registration form is open.

## Test data
- Search criteria as given in the steps.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Submit the form without filling it in. | "First name required", "Last name required", "Email is required" and "Password is required" all show. |

**Pass criteria:** "First name required", "Last name required", "Email is required" and "Password is required" all show.

## Notes
- Passed locally 2026-11-23 (Node 20.20.2, Cypress 13.13.2, Electron headless, `--env tags="not @requires-account"`): 6/6 public scenarios.
