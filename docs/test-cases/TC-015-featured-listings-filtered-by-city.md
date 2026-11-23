# TC-015: Featured listings filtered by city

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-05 AC-03
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/search/featuredListingsSearch.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- Signed in, viewing featured listings.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Search for the city "Galewood". | Every listing shows the city "Galewood". |

**Pass criteria:** Every listing shows the city "Galewood".
