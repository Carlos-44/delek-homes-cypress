# TC-010: Home page search by bedrooms

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-04 AC-02 ([F-04](../features/F-04-home-search.md))
- **Status:** Automated
- **Automation:** cypress/e2e/features/search/homePageSearch.feature — "[TC-010] Search by number of bedrooms"

## Preconditions
- On the home page.

## Test data
- Search criteria as given in the steps.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Search for 3 or more bedrooms. | Every listing shown has at least 3 bedrooms. |

**Pass criteria:** Every listing shown has at least 3 bedrooms.

## Notes
- Passed locally 2026-11-23 (Node 20.20.2, Cypress 13.13.2, `--env tags="not @requires-account"`): 6/6 public scenarios, after the TC-ID renames.
