# F-03: Publish and manage listings (admin)
Status: Draft

## Summary (2 to 3 sentences)
Admins publish property listings with photos through the UI after signing in through the UI or API, and can create and delete listings through the API.

## User story
As an admin, I want to publish and remove listings, so that buyers find current homes.

## Preconditions
- An admin test account exists (supplied at runtime, never committed).

## Functional requirements (FR-NN)
- FR-01: An admin signed in through the UI or the API can publish a listing with details and a photo.
- FR-02: A published listing appears on the listings dashboard and in home page search.
- FR-03: The listing page shows square footage, bedrooms, bathrooms and garage.
- FR-04: The API creates a listing from a fixture and returns its id, and can delete it.

## Acceptance criteria (AC-NN, each one testable)
- AC-01: After a UI sign-in, publishing a listing with a photo opens the listings dashboard, the listing is found through home page search, and its page shows sq ft, bedrooms, bathrooms and garage.
- AC-02: After an API sign-in, the same publish flow gives the same result.
- AC-03: Creating a listing through the API from `listing1` returns an id, and deleting it through the API succeeds.

## Out of scope
- Editing listings.

## Open questions
- Open question: UI-published listings aren't cleaned up (gap G-1).

## Source files this feature touches
- cypress/e2e/features/listings/createListing.feature
- cypress/e2e/features/listings/listingApi.feature
- cypress/support/step_definitions/listings.steps.js
- cypress/pages/createListingPage.js
- cypress/fixtures/listing1.json
- cypress/fixtures/listing2.json
