import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pages/homePage";
import FeaturedListingsPage from "../../pages/featuredListingsPage";
import { everyListingCard, eachListingValue } from "../listingChecks";

// Keyword typed by a generated-keyword When step, read back by its Then step
let searchedKeyword;

// The MUI price slider has no text input; each thumb holds a hidden <input type="range">.
// Setting the value through the native setter and firing "input" is what React listens to,
// so the slider state (and the price filter sent on search) really changes.
function setPriceRange(page, minPrice, maxPrice) {
  page.priceSliderInputs()
    .should("have.length", 2)
    .then(($inputs) => {
      [minPrice, maxPrice].forEach((value, index) => {
        const input = $inputs[index];
        const win = input.ownerDocument.defaultView;
        const setValue = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value").set;
        setValue.call(input, String(value));
        input.dispatchEvent(new win.Event("input", { bubbles: true }));
        input.dispatchEvent(new win.Event("change", { bubbles: true }));
      });
    });
  page.priceSliderInputs().first().should("have.attr", "aria-valuenow", String(minPrice));
  page.priceSliderInputs().last().should("have.attr", "aria-valuenow", String(maxPrice));
  page.search();
}

function expectEveryListingInCity(city) {
  eachListingValue("City", (value, index) => {
    expect(value, `listing ${index + 1} city`).to.contain(city);
  });
}

// The app writes the search filters to the query string, e.g. ?keyword=...&city=...
function expectQueryParam(name, value) {
  cy.location("search").should((search) => {
    expect(new URLSearchParams(search).get(name), `"${name}" in the URL`).to.eq(value);
  });
}

// ---------- Home page search ----------

When("I search the home page for the keyword {string}", (keyword) => {
  HomePage.typeSearch(keyword);
  HomePage.search();
});

When("I search the home page for a keyword that matches no listing", () => {
  searchedKeyword = `zzq-no-match-${Date.now()}`;
  HomePage.typeSearch(searchedKeyword);
  HomePage.search();
});

When("I search the home page for listings with 3 or more bedrooms", () => {
  HomePage.selectBedrooms("3+");
  HomePage.search();
});

When("I search the home page for the city {string}", (city) => {
  HomePage.typeCity(city);
  HomePage.search();
});

When("I search the home page for prices from {int} to {int}", (minPrice, maxPrice) => {
  setPriceRange(HomePage, minPrice, maxPrice);
});

Then("I should be on the featured listings page", () => {
  cy.url().should("include", "featured-listings");
});

Then("the search box should contain {string}", (keyword) => {
  FeaturedListingsPage.searchInput().should("have.value", keyword);
});

Then("no listings should be shown", () => {
  expectQueryParam("keyword", searchedKeyword);
  FeaturedListingsPage.emptyState().should("be.visible");
  FeaturedListingsPage.listingCards().should("not.exist");
});

Then("every listing shown should have at least {int} bedrooms", (minimum) => {
  eachListingValue("Bedrooms", (value, index) => {
    expect(parseInt(value, 10), `listing ${index + 1} bedrooms`).to.be.gte(minimum);
  });
});

Then("the results should be filtered by the city {string}", (city) => {
  cy.url().should("include", `city=${city}`);
  expectEveryListingInCity(city);
});

Then("the results should be filtered by prices from {int} to {int}", (minPrice, maxPrice) => {
  cy.url().should("include", `price=${minPrice}-${maxPrice}`);
  everyListingCard((text, index) => {
    const match = text.match(/\$\s*([\d,]+)/);
    expect(match, `listing ${index + 1} shows a price`).to.not.equal(null);
    const price = parseInt(match[1].replace(/,/g, ""), 10);
    expect(price, `listing ${index + 1} price`).to.be.within(minPrice, maxPrice);
  });
});

// ---------- Featured listings search ----------

// Listings on the live site change all the time, so the keyword is taken from a card that is
// on the page right now. The longest title is used because the search also matches descriptions:
// a long, specific title is unlikely to appear in another listing's description.
When("I search the featured listings for the longest listing title shown", () => {
  FeaturedListingsPage.listingTitles()
    .should("have.length.greaterThan", 0)
    .then(($titles) => {
      const titles = [...$titles].map((title) => title.textContent.trim());
      searchedKeyword = titles.reduce((longest, title) => (title.length > longest.length ? title : longest));
      FeaturedListingsPage.typeSearch(searchedKeyword);
      FeaturedListingsPage.search();
    });
});

When("I filter the featured listings to 3 or more bedrooms", () => {
  FeaturedListingsPage.selectBedrooms("3+");
  FeaturedListingsPage.search();
});

When("I search the featured listings for the city {string}", (city) => {
  FeaturedListingsPage.typeCity(city);
  FeaturedListingsPage.search();
});

When("I search the featured listings for prices from {int} to {int}", (minPrice, maxPrice) => {
  setPriceRange(FeaturedListingsPage, minPrice, maxPrice);
});

Then("every listing title should contain the searched title", () => {
  expectQueryParam("keyword", searchedKeyword);
  FeaturedListingsPage.listingTitles().should(($titles) => {
    expect($titles.length, "number of listings shown").to.be.greaterThan(0);
    $titles.each((index, title) => {
      expect(title.textContent.toLowerCase(), `listing ${index + 1} title`).to.contain(searchedKeyword.toLowerCase());
    });
  });
});

Then("every listing should show the city {string}", (city) => {
  expectQueryParam("city", city);
  expectEveryListingInCity(city);
});
