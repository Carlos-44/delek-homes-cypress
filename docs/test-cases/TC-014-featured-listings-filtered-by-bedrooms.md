# TC-014: Featured listings filtered by bedrooms

- **Priority:** P3
- **Type:** functional
- **Linked criteria:** F-05 AC-02 ([F-05](../features/F-05-featured-search.md))
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/search/featuredListingsSearch.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- Signed in, viewing featured listings.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Filter to 3 or more bedrooms. | No listing shows only 1 bedroom. |

**Pass criteria:** No listing shows only 1 bedroom.

## Notes
- Weak assertion (gap G-3).
