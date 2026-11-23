# F-04: Home page search
Status: Draft

## Summary (2 to 3 sentences)
Visitors search listings from the home page by keyword, minimum bedrooms, city or price range, and land on the featured listings page with the filter applied.

## User story
As a visitor, I want to search from the home page, so that I can find homes that match my needs.

## Preconditions
- dev.delekhomes.com is reachable.
- Signed out (no account needed).

## Functional requirements (FR-NN)
- FR-01: A keyword search opens the featured listings page with the keyword in the search box.
- FR-02: A bedrooms (3+) search shows only listings with at least 3 bedrooms.
- FR-03: A city search filters results by that city.
- FR-04: A price range search shows the price filter in dollars.

## Acceptance criteria (AC-NN, each one testable)
- AC-01: Searching "Your future house" opens the featured listings page, and the search box contains that text.
- AC-02: Searching 3+ bedrooms shows only listings with at least 3 bedrooms.
- AC-03: Searching the city "Galewood" filters results by "Galewood".
- AC-04: Searching prices from 1,000,000 to 10,000,000 shows the price filter in dollar amounts.

## Out of scope
- Sorting results.

## Open questions
- Open question: Should the price test check that the results fall in the range (gap G-2)?

## Source files this feature touches
- cypress/e2e/features/search/homePageSearch.feature
- cypress/support/step_definitions/search.steps.js
- cypress/pages/homePage.js
