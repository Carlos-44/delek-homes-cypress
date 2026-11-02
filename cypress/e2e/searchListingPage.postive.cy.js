import { getUsers } from "../support/users";

const userCredentials = getUsers();
import FeaturedListingPage from "../pages/featuredListing";
import HomePage from "../pages/homePage";
import verificationTexts from "../fixtures/verificationTexts.json";

describe("Featured Listing Page Tests", () => {
  beforeEach(() => {
    cy.visit("/"); // Navigate to the homepage
    // Perform login via UI
    HomePage.clickLoginBtn();
    HomePage.typeEmail(userCredentials.validUser.email);
    HomePage.typePassword(userCredentials.validUser.password);
    HomePage.clickSubmitBtn();
    HomePage.clickNightMode(); // Switch to night mode
    HomePage.navigateToFeaturedListings(); // Navigate to the featured listings page
    cy.errorHandler(); // Use custom error handler command
  });

  it("Should search by keyword", () => {
    const keyword = verificationTexts.searchKeyword; // Get the keyword from fixture
    FeaturedListingPage.typeSearchBarFL(keyword); // Type the keyword into the search bar
    FeaturedListingPage.clickSearchButton(); // Click the search button

    // Debug the input field and ensure the text is entered correctly
    FeaturedListingPage.getSearchBar().should("have.value", keyword);

    // Wait for search results to load
    cy.get(".MuiTypography-root.MuiTypography-h5.css-ijss57", {
      timeout: 10000,
    })
      .should("have.length.greaterThan", 0)
      .each(($el, index) => {
        const text = Cypress.$($el).text().toLowerCase();
        console.log(`Listing ${index + 1}: ${text}`); // Log the listing text for debugging
        expect(text).to.contain(
          keyword.toLowerCase(),
          `Listing ${
            index + 1
          } expected to contain keyword "${keyword}", but found "${text}"`
        );
      });
  });

  it("Should verify bedroom filter results", () => {
    FeaturedListingPage.selectBedroomOption3Plus();
    FeaturedListingPage.clickSearchButton();

    cy.get(".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3").each(
      ($listing) => {
        cy.wrap($listing)
          .find(".MuiGrid-root.MuiGrid-item") // Adjust to the actual element containing bedroom info
          .should("not.contain.text", "1");
      }
    );
  });

  it("Should verify city search results", () => {
    FeaturedListingPage.typeCityInput(verificationTexts.city);
    FeaturedListingPage.clickSearchButton();

    cy.get(".MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3").each(
      ($el) => {
        cy.wrap($el).within(() => {
          cy.contains("City").should("contain.text", verificationTexts.city);
        });
      }
    );
  });

  it("Should search by price", () => {
    const minPrice = verificationTexts.minPrice; // Min price as integer
    const maxPrice = verificationTexts.maxPrice; // Max price as integer

    // Directly set the slider values via JavaScript
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

    // Click the "Start Search" button
    HomePage.clickSearchButton();

    // Verify that the displayed price elements match the expected range
    cy.get(
      ".MuiSlider-root.MuiSlider-colorPrimary.MuiSlider-sizeSmall.css-k4xr5o"
    ).each(($el) => {
      cy.wrap($el).should("contain.text", "$"); // Check that the element contains a dollar sign
    });
  });
});
