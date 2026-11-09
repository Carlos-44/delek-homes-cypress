# CLAUDE.md

Cypress 13 + Cucumber (Gherkin) end-to-end and API tests for **Delek Homes**, a real-estate demo app at
`https://dev.delekhomes.com` (set once as `baseUrl` in `cypress.config.js`). We do **not** own the app:
no `data-testid` can be added, the data on it changes all the time, and other people use it too.

## Structure

```
cypress/
  e2e/features/<area>/*.feature   Gherkin scenarios (auth/, listings/, search/)
  support/step_definitions/        auth.steps.js, listings.steps.js, search.steps.js,
                                   common.steps.js (steps used by more than one area)
  support/commands.js              loginViaUI, loginViaApi, createListingViaApi,
                                   deleteListingViaApi, uploadImage
  support/listingChecks.js         Shared listing-card and detail-page assertions
  support/users.js                 Test accounts from env vars: accountFor("user" | "admin")
  support/e2e.js                   Imports commands + reporter; one uncaught:exception handler
  pages/                           Page objects, one singleton per page (homePage.js, loginPage.js,
                                   registrationPage.js, dashboardPage.js, createListingPage.js,
                                   featuredListingsPage.js, listingDetailPage.js)
  pages/components/                Parts shared by pages: searchForm.js (base class), formField.js
  fixtures/                        listing1.json + downloadhomepicture.jpeg
.github/workflows/test.yml         CI pipeline
```

## Testing conventions

- **Layers:** Gherkin says *what* (business language, no selectors) → step definitions connect it to code
  → page objects hold every selector. Steps never call `cy.get` with a selector; add a page-object method.
- **Step wording:** `Given` = state ("I am signed in as the {string} account"), `When` = action
  ("I sign in as the {string} account"), `Then` = observable outcome. Reuse an existing step before adding one
  (`grep -rn "Given(\|When(\|Then(" cypress/support/step_definitions`).
- **Page-object naming:** files `<name>Page.js`, class `<Name>Page`, `export default new <Name>Page()`.
  Element getters are nouns (`searchInput()`, `submitButton()`), actions are verbs (`typeSearch(text)`,
  `selectBedrooms("3+")`, `submit()`, `signIn(email, password)`). No `get`/`click` prefixes, no `Btn`.
  Page objects don't assert; assertions live in steps (or `support/listingChecks.js`).
- **Tags** (feature or scenario level):
  - `@auth`, `@listings`, `@search`, `@api` - area.
  - `@requires-account` - signs in with a test account from env vars. Untagged scenarios must run with no setup.
  - `@creates-data` - writes real data to the live site (new registration account, listings).
  - `@smoke` - 1-2 fast, read-only, public scenarios (`npm run test:smoke`).
- **Test users:** only through `accountFor(role)` in `support/users.js`, which reads `ADMIN_*` / `USER_*`
  from `Cypress.env()` and throws a clear error when one is missing. Never hard-code or log an email/password
  (passwords are typed with `{ log: false }`).
- **Cleanup:** anything a scenario creates must be deleted. `listings.steps.js` stores `listingId`
  (captured from the create response or `cy.intercept` of `POST /api/estate-objects`) and an `After` hook
  deletes it through `cy.deleteListingViaApi`. Registration accounts can't be deleted through the API, which
  is why that scenario is `@creates-data`.
- **Generated data:** `@faker-js/faker` for names, emails, passwords and listing details; `Date.now()` in
  titles/keywords that must be unique. Live data is not stable: derive values from what is on the page
  (see "Search featured listings by keyword", which searches the longest title currently shown).

## Running

Local:

```bash
npm install
cp cypress.env.example.json cypress.env.json   # fill in dedicated test accounts (gitignored)
npm run test:smoke      # @smoke only
npm run test:public     # not @requires-account and not @creates-data (public, read-only)
npm test                # all scenarios (needs cypress.env.json)
npm run test:headed     # all, headed Chrome
npm run test:open       # interactive runner
npx cypress run --spec cypress/e2e/features/search/homePageSearch.feature
npx cypress run --env tags="not @requires-account and not @creates-data"   # read-only public set
```

Reports: `cypress/reports/html/index.html` (Mochawesome) and `cypress/reports/junit/*.xml`.
`retries` is `runMode: 1` for every `cypress run`, local too; add `--config retries=0` when checking a fix.

CI (`.github/workflows/test.yml`): runs on push and PR to `main` and on `workflow_dispatch`. Jobs:
`install` (npm ci, caches node_modules + Cypress binary) → `test` (Chrome; runs `npm test` when the
`CYPRESS_ADMIN_*`/`CYPRESS_USER_*` secrets exist, else `npm run test:public` with a warning; uploads
`junit-results`, `mochawesome-report`, `cypress-screenshots` artifacts) → `report` (dorny/test-reporter
publishes JUnit as a GitHub Check; this is what fails the run) → `notify` (step summary table).

## Selectors (the app is third-party MUI/React)

Priority: `name` attribute → role/aria (`[role="alert"]`, `[aria-haspopup="listbox"]`, `li[role="option"]`)
→ visible label or text (`cy.contains("label", "City")`, `cy.contains("button", "Start Search")`)
→ `href` → stable MUI component class (`.MuiCard-root`, `.MuiFormHelperText-root`) → structure.
Real examples in this repo:

```js
cy.get('input[name="email"]')                                             // loginPage.js
cy.contains("label", "Bedrooms").parent().find('[aria-haspopup="listbox"]') // components/searchForm.js
cy.get('input[name="state"]').parent().find('[aria-haspopup="listbox"]')    // createListingPage.js
cy.get('.MuiCard-root:has(a[href^="/featured-listings/"])')      // featuredListingsPage.js
cy.get(`input[name="${field}"]`).closest(".MuiFormControl-root").find(".MuiFormHelperText-root") // components/formField.js
cy.get('.MuiSlider-root input[type="range"]')                              // price slider thumbs
```

Check a new selector on the live public pages first; auth-only screens can be checked in the app bundle.

## Don't

- Don't use React `useId` ids like `[id=":r5:"]` - they change with render order (`:r1:` on direct load,
  `:r5:` after SPA navigation).
- Don't use emotion classes (`css-k4xr5o`) or full `class="Mui... css-..."` strings.
- Don't `cy.wait(<ms>)`. Wait on an alias (`cy.intercept(...).as("x"); cy.wait("@x")`) or a retrying assertion.
- Don't write assertions that can't fail: one that is already true before the action (old price-slider
  check for "$"), a substring like "no card contains 1", `.each` over a list that may be empty (use
  `everyListingCard`, which fails on zero cards), `cy.contains("2")` anywhere on the page, or
  `should("not.exist")` without first proving the page finished loading (see `no listings should be shown`).
- Don't write another login: use `cy.loginViaUI` / `cy.loginViaApi` (both go through one place).
- Don't patch DOM prototypes (`el.__proto__.setValue = ...`) to drive widgets; use real events
  (see `setPriceRange` in search.steps.js).
- Don't hard-code `https://dev.delekhomes.com` in tests; `cy.visit("/path")` uses `baseUrl`.
- Don't register `uncaught:exception` handlers in commands or steps; there is one in `support/e2e.js`.
- Don't do unrelated UI actions in a Background (the old night-mode toggle), leave commented-out code, or
  keep page-object methods nothing calls.
- Don't add `cypress-file-upload` back; `cy.selectFile` is built in.
- Don't read, print or commit `cypress.env.json` or `cypress/fixtures/userCredentials.json`.

## When you change scenarios

Run the spec you touched with `--config retries=0`, then update the scenario counts and table in README.md.
