# TC-002: User signs out

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-01 AC-02 ([F-01](../features/F-01-sign-in-out.md))
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/auth/login.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- Signed in as the user account.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Open the profile menu. | The step completes without an error. [INFERRED] |
| 2 | Click sign out. | The heading "Sign in to Delek Homes" shows. |

**Pass criteria:** The heading "Sign in to Delek Homes" shows.
