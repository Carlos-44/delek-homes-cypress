# TC-011: Home page search by city

- **Priority:** P2
- **Type:** functional
- **Linked criteria:** F-04 AC-03 ([F-04](../features/F-04-home-search.md))
- **Status:** Automated
- **Automation:** cypress/e2e/features/search/homePageSearch.feature — "[TC-011] Search by city"

## Preconditions
- On the home page.

## Test data
- Search criteria as given in the steps.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Search for the city "Galewood". | Results are filtered by "Galewood". |

**Pass criteria:** Results are filtered by "Galewood".

## Notes
- Passed locally 2026-11-23 (Node 20.20.2, Cypress 13.13.2, `--env tags="not @requires-account"`): 6/6 public scenarios, after the TC-ID renames.
