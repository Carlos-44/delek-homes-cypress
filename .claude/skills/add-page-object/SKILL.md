---
name: add-page-object
description: Use when a step needs an element or action that no page object has yet, when adding a page object for a new Delek Homes page, or when replacing a brittle selector - covers file/class/method naming, selector rules for this third-party MUI app, and the existing examples.
---

# Add a page object (Delek Homes)

## Pattern

- One file per page in `cypress/pages/`, named `<name>Page.js`; class `<Name>Page`; export a singleton:
  `export default new <Name>Page();`
- Parts used by several pages live in `cypress/pages/components/`:
  - `searchForm.js` exports the **class** `SearchForm`; `HomePage` and `FeaturedListingsPage` `extend` it.
  - `formField.js` exports a singleton with `error(fieldName)` for MUI helper text.
- Methods:
  - getters are nouns and return the chain: `submitButton() { return cy.get('button[type="submit"]'); }`
  - actions are verbs and don't return assertions: `submit()`, `typeSearch(text)`, `selectBedrooms("3+")`,
    `signIn(email, password)`, `fill(listing)`, `visit()`.
  - no `get`/`click` prefixes, no abbreviations (`Btn`), no assertions in page objects.
- `visit()` uses a path, never an absolute URL: `cy.visit("/featured-listings")` (baseUrl is in cypress.config.js).
- Type passwords with `{ log: false }`.
- Every method must be used by a step or another method; delete what nothing calls.

## Selector rules

The app is someone else's React + MUI build, so there are no test ids.

1. `name` attribute: `input[name="email"]`, `textarea[name="description"]`, `[name="isPublished"]`
2. role / aria: `[role="alert"]`, `[role="menuitem"]`, `li[role="option"]`, `[aria-haspopup="listbox"]`
3. visible label/text: `cy.contains("label", "City").parent().find("input")`, `cy.contains("button", "Start Search")`
4. `href`: `a[href^="/featured-listings/"]`
5. stable MUI component classes: `.MuiCard-root`, `.MuiFormControl-root`, `.MuiSlider-root`, `.MuiAvatar-root`
6. tag + scope: `cy.get("header").find(".MuiAvatar-root").closest("button")`

Never: `[id=":r5:"]` (React useId, changes with render order), `css-xxxxx` emotion classes,
`[class="..."]` full class strings, positional `.eq(3)` chains, or text that comes from live data.

Verify on the live public pages (home, `/featured-listings`, `/featured-listings/<id>`, `/auth/login`,
`/auth/register`) before using a selector. For screens behind login, read the app bundle
(`static/js/main.*.js`) and mark the selector unverified until a `@requires-account` run passes.

## Example: `cypress/pages/featuredListingsPage.js`

```js
import SearchForm from "./components/searchForm";

class FeaturedListingsPage extends SearchForm {
  visit() {
    cy.visit("/featured-listings");
  }

  // Each result is a MUI card holding a "More Info" link to the listing detail page
  listingCards() {
    return cy.get('.MuiCard-root:has(a[href^="/featured-listings/"])');
  }

  listingTitles() {
    return this.listingCards().find("h5");
  }

  // Shown in place of the cards when a search matches nothing
  emptyState() {
    return cy.contains("No Data");
  }

  openListing(title) { /* clicks the More Info link of the card with that title */ }
}

export default new FeaturedListingsPage();
```

MUI select pattern (hidden named input next to the clickable trigger), from `createListingPage.js`:

```js
stateSelect() {
  return cy.get('input[name="state"]').parent().find('[aria-haspopup="listbox"]');
}

selectState(state) {
  this.stateSelect().click();
  cy.contains('li[role="option"]', state).click();
}
```

## After adding

Import it in the steps file (`import ListingDetailPage from "../../pages/listingDetailPage";`), run the
spec that uses it with `--config retries=0`, and list it under "Structure" in CLAUDE.md if it is a new page.
