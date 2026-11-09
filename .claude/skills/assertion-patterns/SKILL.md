---
name: assertion-patterns
description: Use when writing or reviewing a Then step in this Delek Homes Cypress repo - URL/query checks, list checks that fail on an empty list, exact-value checks, empty-state checks, intercepted request checks and cy.request API response checks, with the idioms the codebase already uses.
---

# Assertion patterns (Delek Homes)

Rule: every `Then` must be able to fail. Before keeping an assertion, ask "would this pass if the
action did nothing?" If yes, it is not a test. Invert the expected value once locally to see it fail.

## URL and query string

```js
cy.url().should("include", "/dashboard");                              // common.steps.js
cy.location("pathname").should("match", /^\/featured-listings\/\d+$/); // listings.steps.js

// search.steps.js - exact query value, decoded, retried until the app updates the URL
function expectQueryParam(name, value) {
  cy.location("search").should((search) => {
    expect(new URLSearchParams(search).get(name), `"${name}" in the URL`).to.eq(value);
  });
}
```

## Lists of cards: fail on empty, retry on stale

Results from before a search stay on screen for a moment, and `.each` over zero elements passes.
`support/listingChecks.js` handles both: the check runs inside a retrying `.should(callback)` and starts
with a length guard.

```js
export function everyListingCard(check) {
  FeaturedListingsPage.listingCards().should(($cards) => {
    expect($cards.length, "number of listings shown").to.be.greaterThan(0);
    $cards.each((index, card) => check(Cypress.$(card).text(), index));
  });
}

// search.steps.js - parse the number, don't substring-match
eachListingValue("Bedrooms", (value, index) => {
  expect(parseInt(value, 10), `listing ${index + 1} bedrooms`).to.be.gte(minimum);
});
```

Give each `expect` a message (`listing 3 bedrooms`) so the failure says which card broke.

## Empty results: prove the page loaded first

`should("not.exist")` passes instantly while the page is still loading. Pair it with a positive signal:

```js
Then("no listings should be shown", () => {
  expectQueryParam("keyword", searchedKeyword);          // the search really ran
  FeaturedListingsPage.emptyState().should("be.visible"); // "No Data" rendered
  FeaturedListingsPage.listingCards().should("not.exist");
});
```

## Exact values

```js
DashboardPage.roleLabel().should("have.text", role);        // "role: user"
FormField.error(field).should("have.text", message);        // "Email is required"
FeaturedListingsPage.searchInput().should("have.value", keyword);

// listingChecks.js - the whole line must match, so "Bedrooms: 12" can't pass for 2
ListingDetailPage.featureLine(label).should(($line) => {
  expect($line.text().trim(), `${label} line`).to.match(new RegExp(`^${label}:\\s*${value}$`));
});
```

Use `contain.text` only where the app adds surrounding text (MUI Alert: `errorAlert().should("contain.text", message)`).

## Requests the UI makes (cy.intercept)

```js
// listings.steps.js - register before the click, wait on the alias, check status and keep the ID
cy.intercept("POST", /\/api\/+estate-objects$/).as("createListing");
CreateListingPage.submit();
cy.wait("@createListing").then(({ response }) => {
  expect(response.statusCode, "create listing status").to.be.within(200, 299);
  listingId = (typeof response.body === "string" ? JSON.parse(response.body) : response.body).id;
});
```

Never `cy.wait(2000)`.

## API responses (cy.request)

Success path - the request fails the test on a non-2xx by default, then assert the exact status:

```js
expect(response.status, "API login status").to.eq(201);   // commands.js loginViaApi
```

Negative path - `failOnStatusCode: false`, store as an alias, assert the exact status and messages:

```js
cy.request({ method: "POST", url: "/api/users/login", body, failOnStatusCode: false }).as("apiResponse");

cy.get("@apiResponse").its("status").should("eq", 403);
cy.get("@apiResponse").then(({ body }) => {
  // "message" is a string or a list of validation messages
  expect([].concat(body.message), "API error messages").to.have.members(expected);
});
```

Don't trust a status alone when the API is lax: DELETE of an unknown ID also returns 200, so the delete
step checks `response.body.affected === 1` and then that `GET /api/estate-objects/<id>` returns
`estateObject: null`.
