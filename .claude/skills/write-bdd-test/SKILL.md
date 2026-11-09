---
name: write-bdd-test
description: Use when adding or changing a Gherkin feature or scenario in this Delek Homes Cypress repo - writing the .feature text, reusing or adding step definitions, tagging it, running it, and updating the README counts.
---

# Write a BDD test (Delek Homes)

Flow: `cypress/e2e/features/<area>/<name>.feature` → `cypress/support/step_definitions/<area>.steps.js`
→ page objects in `cypress/pages/`. Step files are picked up by the glob in `package.json`
(`"stepDefinitions": "cypress/support/step_definitions/**/*.js"`), so no imports between step files.

## Checklist

1. **Pick the feature file** by area (`auth/`, `listings/`, `search/`). New file only for a new capability.
2. **Write the scenario in business language.** No selectors, URLs only when they are the behavior.
   `Given` = state, `When` = action, `Then` = observable outcome.
3. **Reuse steps first.** List them:
   `grep -rhn "Given(\|When(\|Then(" cypress/support/step_definitions`
   Cross-area steps (home page, sign in, dashboard, field errors) live in `common.steps.js`.
4. **New step?** Put it in the area's steps file. Call page-object methods for every element; put
   assertions in the step. Need a new element → add a getter to the page object (see `add-page-object`).
5. **Data:** faker for anything random; `accountFor("user" | "admin")` for test accounts; never inline
   credentials. Values from the live site change - derive them from the page when possible.
6. **Tag it:**
   - `@requires-account` if it signs in with a test account.
   - `@creates-data` if it writes to the live site; also add cleanup (an `After` hook that deletes it).
   - `@smoke` only for a fast, read-only, public scenario (keep it to 1-2 in the suite).
7. **Run only that file**, without retries so flakiness shows:
   `npx cypress run --config retries=0 --spec cypress/e2e/features/<area>/<name>.feature`
   (add `--env tags="not @requires-account and not @creates-data"` when you have no accounts or must not write data).
8. **Prove it can fail:** invert the expected value once locally and watch it go red.
9. **Update README.md** scenario counts and the "What's Tested" table.

## Worked example (from this repo)

`cypress/e2e/features/auth/login.feature`:

```gherkin
@auth
Feature: Login
  ...
  Background:
    Given I am on the sign-in page

  Scenario: Sign in is rejected for an unknown email and password
    When I sign in with an unknown email and password
    Then I should see the sign-in error "Wrong email or password"
    And I should see the sign-in heading "Sign in to Delek Homes"
```

`cypress/support/step_definitions/auth.steps.js`:

```js
Given("I am on the sign-in page", () => {
  LoginPage.visit();
});

When("I sign in with an unknown email and password", () => {
  const { email, password } = randomAccount();   // faker values
  LoginPage.signIn(email, password);
});

Then("I should see the sign-in error {string}", (message) => {
  LoginPage.errorAlert().should("contain.text", message);
});
```

Data tables (reused by sign-in and registration, in `common.steps.js`):

```gherkin
Then I should see these required-field errors:
  | field    | message              |
  | email    | Email is required    |
  | password | Password is required |
```

```js
Then("I should see these required-field errors:", (dataTable) => {
  dataTable.hashes().forEach(({ field, message }) => {
    FormField.error(field).should("have.text", message);
  });
});
```

Scenario Outline (one scenario, two executed tests - count each Examples row in README):

```gherkin
Scenario Outline: Admin publishes a listing after signing in through the <method>
  Given I am signed in as the "admin" account through the <method>
  ...
  Examples:
    | method |
    | UI     |
    | API    |
```

## Sharing state between steps

Use module-level `let` variables reset in a `Before` hook (see `listings.steps.js`: `listing`, `token`,
`listingId`, `deleted`), or a Cypress alias (`cy.request(...).as("apiResponse")` then
`cy.get("@apiResponse")` in auth.steps.js).
