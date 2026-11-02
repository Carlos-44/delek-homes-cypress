# Delek Homes — Cypress E2E & API Tests

> Cypress test suite for [Delek Homes](https://dev.delekhomes.com), a real estate listings demo app, covering login, registration, creating listings through the UI and the API, and listing search.

## Tech Stack
- **Language:** JavaScript (Node.js)
- **Framework:** Cypress 13
- **Design:** Page Object Model (`cypress/pageObjects/`), custom commands (`loginViaUI`, `uploadImage`), JSON fixtures
- **Test data:** Faker for generated listing data, `cypress-file-upload` for listing photos

## What's Tested
16 tests in 6 specs, grouped by feature:

| Area | Spec | Covers |
|---|---|---|
| Auth | `auth/login.cy.js` | Logging in with an existing account, logging out |
| Auth | `auth/registration.cy.js` | Registering a new account, rejecting an existing email, required-field errors |
| Listings | `listings/createListing.cy.js` | Creating a listing through the UI with a photo upload, after UI login and after API login |
| Listings | `listings/createListingApi.cy.js` | Creating and deleting a listing through the API |
| Search | `search/homePageSearch.cy.js` | Home page search by keyword, bedrooms, city and price |
| Search | `search/listingPageSearch.cy.js` | Featured listings search and filter by keyword, bedrooms, city and price |

## Getting Started

### Prerequisites
- Node.js v18+
- A Delek Homes account (the tests log in and create listings)

### Install
```bash
npm install
```

### Credentials
No emails, names or passwords are committed. Every test user detail comes from environment variables, read in `cypress/support/users.js`. Copy the example file and fill in your own test accounts:
```bash
cp cypress.env.example.json cypress.env.json
```
`cypress.env.json` is listed in `.gitignore`. In CI, set the same values as `CYPRESS_ADMIN_EMAIL`, `CYPRESS_USER_EMAIL`, and so on.

### Run Tests
```bash
# Headless
npm test

# Interactive runner
npm run test:open
```

> These tests run against a live demo site and create real listings there, so results depend on the site being available.

## Author
Carlos Ozoria — [LinkedIn](https://www.linkedin.com/in/carlos-ozoria-0a292030b)
