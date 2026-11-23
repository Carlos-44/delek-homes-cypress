# TC-012: Home page search by price range

- **Priority:** P3
- **Type:** boundary
- **Linked criteria:** F-04 AC-04
- **Status:** Automated
- **Automation:** cypress/e2e/features/search/homePageSearch.feature — "Search by price range"

## Preconditions
- On the home page.

## Test data
- Search criteria as given in the steps.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Search for prices from 1,000,000 to 10,000,000. | The price filter shows dollar amounts. |

**Pass criteria:** The price filter shows dollar amounts.

## Notes
- Passed locally 2026-11-23 (Node 20.20.2, Cypress 13.13.2, Electron headless, `--env tags="not @requires-account"`): 6/6 public scenarios.
- It doesn't check that results fall within the range (gap G-2).
