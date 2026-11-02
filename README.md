# Delek Homes — Cypress E2E & API Tests

> Cypress test suite for [Delek Homes](https://dev.delekhomes.com), a real estate listings demo app, covering login, registration, creating listings through the UI and the API, and listing search.

## Tech Stack
- **Language:** JavaScript (Node.js)
- **Framework:** Cypress 13
- **Design:** Page Object Model (`cypress/pageObjects/`), custom commands (`loginViaUI`, `uploadImage`), JSON fixtures
- **Test data:** Faker for generated listing data, `cypress-file-upload` for listing photos

## What's Tested
| Spec | Covers |
|---|---|
| `login.spec.cy.js` | Valid login and the dashboard redirect |
| `registeration.spec.cy.js` | Registration form, including signing up with an email that already exists |
| `createListing.spec.cy.js`, `createListing2.spec.cy.js` | Creating a listing through the UI: details, price, address, rooms, photo upload |
| `createListingAPI.spec.cy.js` | Creating a listing through the API |
| `searchHomePage.postive.cy.js` | Searching listings from the home page |
| `searchListingPage.postive.cy.js` | Searching and filtering on the listings page |

## Getting Started

### Prerequisites
- Node.js v18+
- A Delek Homes account (the tests log in and create listings)

### Install
```bash
npm install
```

### Credentials
Credentials are not committed. Create these two files from the examples and fill in your own accounts:
```bash
cp cypress/fixtures/userCredentials.example.json cypress/fixtures/userCredentials.json
cp cypress.env.example.json cypress.env.json
```
Both real files are listed in `.gitignore`.

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
