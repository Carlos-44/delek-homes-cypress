# TC-009: Home page search by keyword

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-04 AC-01
- **Status:** Automated
- **Automation:** cypress/e2e/features/search/homePageSearch.feature — "Search by keyword"

## Preconditions
- On the home page.

## Test data
- Search criteria as given in the steps.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Search for the keyword "Your future house". | The featured listings page opens, and the search box contains "Your future house". |

**Pass criteria:** The featured listings page opens, and the search box contains "Your future house".

## Notes
- Passed locally 2026-11-23 (Node 20.20.2, Cypress 13.13.2, Electron headless, `--env tags="not @requires-account"`): 6/6 public scenarios.
