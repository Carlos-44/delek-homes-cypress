# TC-008: Admin creates and deletes a listing through the API

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-03 AC-03 ([F-03](../features/F-03-listings.md))
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/listings/listingApi.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- An admin API token.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Create a listing from the `listing1` fixture through the API. | The step completes without an error. [INFERRED] |
| 2 | Delete it through the API. | The create call returns an id, and the delete succeeds. |

**Pass criteria:** The create call returns an id, and the delete succeeds.
