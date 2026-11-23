# F-05: Featured listings search (signed in)
Status: Draft

## Summary (2 to 3 sentences)
Signed-in users filter the featured listings by keyword, bedrooms, city or price range.

## User story
As a signed-in user, I want to filter featured listings, so that I only see homes that match my criteria.

## Preconditions
- A user test account exists (supplied at runtime, never committed).
- Signed in and viewing featured listings.

## Functional requirements (FR-NN)
- FR-01: A keyword filter shows only listings whose titles contain the keyword.
- FR-02: A bedrooms filter (3+) excludes 1-bedroom listings.
- FR-03: A city filter shows only listings in that city.
- FR-04: A price range filter shows dollar amounts.

## Acceptance criteria (AC-NN, each one testable)
- AC-01: Filtering by "Your future house" shows only titles containing it.
- AC-02: Filtering to 3+ bedrooms shows no listing with only 1 bedroom.
- AC-03: Filtering by "Galewood" shows only listings in "Galewood".
- AC-04: Filtering prices from 1,000,000 to 10,000,000 shows the price filter in dollar amounts.

## Out of scope
- None.

## Open questions
- Open question: The bedroom check is weak (gap G-3).

## Source files this feature touches
- cypress/e2e/features/search/featuredListingsSearch.feature
- cypress/support/step_definitions/search.steps.js
- cypress/pages/featuredListing.js
