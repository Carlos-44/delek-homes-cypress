# TC-004: Registration rejects an existing email

- **Priority:** P2
- **Type:** negative
- **Linked criteria:** F-02 AC-02 ([F-02](../features/F-02-registration.md))
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/auth/registration.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- The registration form is open.
- User test account available.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Register with the existing "user" account's details. | The error "Input data validation failed" shows. |

**Pass criteria:** The error "Input data validation failed" shows.
