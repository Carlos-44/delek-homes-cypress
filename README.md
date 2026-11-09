# Delek Homes — Cypress BDD Tests

> Behavior-driven Cypress suite for [Delek Homes](https://dev.delekhomes.com), a real estate listings demo app. Scenarios are written in Gherkin and cover login, registration, creating listings through the UI and the API, and listing search.

![Cypress BDD Tests](https://github.com/Carlos-44/delek-homes-cypress/actions/workflows/test.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-13-17202C?logo=cypress)
![Cucumber](https://img.shields.io/badge/Cucumber-Gherkin-23D96C?logo=cucumber&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)

## Pipeline

| Stage | Job | What it does |
|---|---|---|
| Install | `install` | Installs dependencies and caches `node_modules` and the Cypress binary |
| Test | `test` | Runs the Cucumber scenarios in Chrome, with test accounts from GitHub Secrets |
| Report | `report` | Publishes the JUnit results as a GitHub Check through [dorny/test-reporter](https://github.com/dorny/test-reporter) |
| Notify | `notify` | Writes a table of stage results to the run page |

The workflow runs on every push and pull request to `main`. Any failing scenario fails the pipeline. The Mochawesome HTML report and failure screenshots are attached to each run as artifacts.

```mermaid
flowchart LR
    F["Feature files<br/>(Gherkin)"] --> S["Step definitions"]
    S --> P["Page objects"]
    P --> App["dev.delekhomes.com<br/>UI and API"]
    S --> U["users.js"]
    Sec["GitHub Secrets /<br/>cypress.env.json"] --> U
    App --> R["Mochawesome HTML<br/>+ JUnit XML"]
    R --> C["GitHub Checks"]
```

## What's Tested

24 tests from 23 scenarios in 8 feature files (the Scenario Outline runs once per Examples row). 18 need no account; 6 are tagged `@requires-account`.

| Area | Feature | Scenarios | Needs an account |
|---|---|---|---|
| Auth | `auth/login.feature` | Sign in, sign out, reject an unknown email and password, required-field errors, dashboard asks for sign-in | Only sign in and sign out |
| Auth | `auth/loginApi.feature` | Login API rejects unknown credentials (403) and missing fields (400) | No |
| Auth | `auth/registration.feature` | Register a new random account, reject an existing email, required-field errors (data table), reject an invalid email | Only the existing-email scenario |
| Listings | `listings/createListing.feature` | Publish a listing with a photo after signing in through the UI or the API (Scenario Outline, 2 tests) | Yes |
| Listings | `listings/listingApi.feature` | Create a listing through the API, delete it, confirm it is gone | Yes |
| Listings | `listings/listingDetails.feature` | A listing's page shows the same title and features as its card | No |
| Search | `search/homePageSearch.feature` | Search by keyword, a keyword with no matches, bedrooms, city and price range | No |
| Search | `search/featuredListingsSearch.feature` | Filter featured listings by keyword (taken from a listing on the page), bedrooms, city and price range | No |

Tags:

| Tag | Meaning |
|---|---|
| `@auth`, `@listings`, `@search`, `@api` | Feature area |
| `@requires-account` | Signs in with a test account from `cypress.env.json` or GitHub Secrets |
| `@creates-data` | Writes real data to the live site (a new registration account, listings that are then deleted) |
| `@smoke` | Two fast, read-only public scenarios: home page keyword search and registration required fields |

## Why BDD?

- **The scenarios read as requirements.** A product owner can read `createListing.feature` and confirm it describes the right behavior, without reading any JavaScript.
- **One step, many scenarios.** Steps like `I am signed in as the "user" account` are written once and reused across features, so the suite grows by writing Gherkin rather than duplicating code.
- **Scenario Outlines and data tables remove repetition.** The UI and API sign-in paths share one listing scenario, and the required-field checks are a single table instead of four tests.
- **Tags control what runs.** `@requires-account` separates scenarios that need test accounts from those that don't, so the suite can run anywhere, including pull requests from forks that can't see secrets.
- **Layers stay separate.** Gherkin describes behavior, step definitions connect it to code, and page objects hold the selectors. A UI change means editing one page object, not every scenario.

## Test Design

- **No personal data in the repo.** Every email, name and password comes from environment variables read in `cypress/support/users.js`, which fails with a clear message if one is missing.
- **Tests clean up after themselves.** Every listing a scenario creates (through the UI or the API) is deleted: the API scenario deletes its own, and an `After` hook deletes any listing left behind, using the ID captured from the create request.
- **Generated data.** Faker creates listing details and new registration accounts, so runs don't collide.
- **Retries for a live site.** `cypress run` (CI and local) retries a failed scenario once, since the tests run against a public demo site rather than a local copy.
- **No guessed live data.** Listings on the site change constantly, so the featured keyword search uses a title read from the page at run time.

## Tech Stack

- **Testing:** Cypress 13, [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor), esbuild
- **Design:** Page Object Model (`cypress/pages/`, shared parts in `cypress/pages/components/`), custom commands (`loginViaUI`, `loginViaApi`, `createListingViaApi`, `deleteListingViaApi`, `uploadImage`), JSON fixtures
- **Test data:** Faker, built-in `cy.selectFile` for listing photos
- **Reporting:** cypress-mochawesome-reporter, mocha-junit-reporter
- **CI/CD:** GitHub Actions, GitHub Secrets

## Run It Locally

Requires Node.js 20 or later (CI uses 22).

```bash
npm install

# Two fast read-only scenarios
npm run test:smoke

# Public, read-only scenarios (no account needed, nothing written to the site)
npm run test:public

# Every scenario (needs test accounts, see below)
npm test

# Headed in Chrome, or the interactive runner
npm run test:headed
npm run test:open
```

The HTML report is written to `cypress/reports/html/index.html`.

To run a single tag, pass it to Cypress:

```bash
npx cypress run --env tags="@search"

# Public and read-only (no account, nothing written to the site)
npx cypress run --env tags="not @requires-account and not @creates-data"
```

### Test accounts

Copy the example file and fill in a dedicated Delek Homes test account. Don't use a personal account.

```bash
cp cypress.env.example.json cypress.env.json
```

`cypress.env.json` is in `.gitignore`.

For CI, add these repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Used for |
|---|---|
| `CYPRESS_ADMIN_EMAIL`, `CYPRESS_ADMIN_PASSWORD` | The admin account that creates listings |
| `CYPRESS_ADMIN_FIRST_NAME`, `CYPRESS_ADMIN_LAST_NAME` | The admin account's registered name |
| `CYPRESS_USER_EMAIL`, `CYPRESS_USER_PASSWORD` | The standard user account |
| `CYPRESS_USER_FIRST_NAME`, `CYPRESS_USER_LAST_NAME` | The standard user's registered name |

Without these secrets, CI runs only the public read-only scenarios (`npm run test:public`: not `@requires-account`, not `@creates-data`) and shows a warning on the run.

> These tests run against a live demo site and create real listings there, so results depend on the site being available.

## Project Structure

```
cypress/
  e2e/features/             Gherkin feature files, by area
  support/step_definitions/ Step definitions
  support/users.js          Test accounts from environment variables
  support/commands.js       Custom commands (UI/API login, listing API, image upload)
  support/listingChecks.js  Shared listing card and detail page assertions
  pages/                    Page objects (one per page)
  pages/components/         Search form and form-field parts shared by pages
  fixtures/                 Listing data and image
.github/workflows/          CI pipeline
.claude/skills/             Guides for adding scenarios, page objects and assertions
CLAUDE.md                   Conventions for this repo
```

## Author

Carlos Ozoria — [LinkedIn](https://www.linkedin.com/in/carlos-ozoria-0a292030b)
