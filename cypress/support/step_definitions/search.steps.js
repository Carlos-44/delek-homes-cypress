import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pages/homePage";
import FeaturedListingPage from "../../pages/featuredListing";
import { accountFor } from "../users";

// The price slider is a MUI component, so the range is set directly on it
function setPriceRange(minPrice, maxPrice) {
  cy.window().then((win) => {
    const slider = win.document.querySelector(".MuiSlider-root");
    if (slider) {
      slider.__proto__.setValue = function (value) {
        this.value = value;
        this.dispatchEvent(new Event("change"));
      };
      slider.setValue([minPrice, maxPrice]);
    }
  });
  HomePage.clickSearchButton();
}

// ---------- Home page search ----------

When("I search the home page for the keyword {string}", (keyword) => {
  HomePage.typeSearchBar(keyword);
  HomePage.clickSearchButton();
});

When("I search the home page for listings with 3 or more bedrooms", () => {
  HomePage.clickBedroomFilter();
  HomePage.selectBedroomOption3Plus();
  HomePage.clickSearchButton();
});

When("I search the home page for the city {string}", (city) => {
  HomePage.typeCityInput(city);
  HomePage.clickSearchButton();
});

When("I search the home page for prices from {int} to {int}", (minPrice, maxPrice) => {
  setPriceRange(minPrice, maxPrice);
});

Then("I should be on the featured listings page", () => {
  cy.url().should("include", "featured-listings");
});

Then("the search box should contain {string}", (keyword) => {
  cy.get('[id=":r5:"]').should("have.value", keyword);
});

Then("every listing shown should have at least 3 bedrooms", () => {
  cy.get('[viewBox="0 0 2048 1280"]').each(($icon) => {
    cy.wrap($icon)
      .parent()
      .should("contain.text", "Bedrooms:")
      .and(($label) => {
        const bedrooms = parseInt($label.text().match(/\d+/)[0], 10);
        expect(bedrooms).to.be.gte(3);
      });
  });
});

Then("the results should be filtered by the city {string}", (city) => {
  cy.url().should("include", `city=${city}`);
  cy.get(`[value="${city}"]`).should("exist");
});

Then("the price filter should show dollar amounts", () => {
  cy.get(".MuiSlider-root.MuiSlider-colorPrimary.MuiSlider-sizeSmall.css-k4xr5o").each(($el) => {
    cy.wrap($el).should("contain.text", "$");
  });
});

// ---------- Featured listings search ----------

Given("I am signed in as the {string} account and viewing the featured listings", (role) => {
  const account = accountFor(role);
  cy.visit("/");
  HomePage.clickLoginBtn();
  HomePage.typeEmail(account.email);
  HomePage.typePassword(account.password);
  HomePage.clickSubmitBtn();
  HomePage.clickNightMode();
  HomePage.navigateToFeaturedListings();
  cy.errorHandler();
});

When("I search the featured listings for the keyword {string}", (keyword) => {
  FeaturedListingPage.typeSearchBarFL(keyword);
  FeaturedListingPage.clickSearchButton();
});

When("I filter the featured listings to 3 or more bedrooms", () => {
  FeaturedListingPage.selectBedroomOption3Plus();
  FeaturedListingPage.clickSearchButton();
});

When("I search the featured listings for the city {string}", (city) => {
  FeaturedListingPage.typeCityInput(city);
  FeaturedListingPage.clickSearchButton();
});

When("I search the featured listings for prices from {int} to {int}", (minPrice, maxPrice) => {
  setPriceRange(minPrice, maxPrice);
});

Then("every listing title should contain {string}", (keyword) => {
  FeaturedListingPage.getSearchBar().should("have.value", keyword);
  cy.get(".MuiTypography-root.MuiTypography-h5.css-ijss57", { timeout: 10000 })
    .should("have.length.greaterThan", 0)
    .each(($title, index) => {
      const text = Cypress.$($title).text().toLowerCase();
      expect(text, `listing ${index + 1} title`).to.contain(keyword.toLowerCase());
    });
});

Then("no listing should show only 1 bedroom", () => {
  cy.get(".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3").each(($listing) => {
    cy.wrap($listing).find(".MuiGrid-root.MuiGrid-item").should("not.contain.text", "1");
  });
});

Then("every listing should show the city {string}", (city) => {
  cy.get(".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3").each(($listing) => {
    cy.wrap($listing).within(() => {
      cy.contains("City").should("contain.text", city);
    });
  });
});
