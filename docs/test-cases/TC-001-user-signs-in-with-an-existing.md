# TC-001: User signs in with an existing account

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-01 AC-01
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/auth/login.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- On the home page.
- User test account available.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Sign in as the "user" account. | The dashboard shows "role: user". |

**Pass criteria:** The dashboard shows "role: user".
