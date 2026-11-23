# TC-016: Featured listings filtered by price range

- **Priority:** P3
- **Type:** boundary
- **Linked criteria:** F-05 AC-04
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/search/featuredListingsSearch.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- Signed in, viewing featured listings.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Search for prices from 1,000,000 to 10,000,000. | The price filter shows dollar amounts. |

**Pass criteria:** The price filter shows dollar amounts.
