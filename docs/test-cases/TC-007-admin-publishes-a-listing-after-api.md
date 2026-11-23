# TC-007: Admin publishes a listing after API sign-in

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-03 AC-02
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/listings/createListing.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- Admin test account available.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Sign in as the admin through the API. | The step completes without an error. [INFERRED] |
| 2 | Publish a listing with random details and a photo. | The step completes without an error. [INFERRED] |
| 3 | Search for it and open it. | The same result as TC-006. |

**Pass criteria:** The same result as TC-006.
