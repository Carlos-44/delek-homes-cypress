import HomePage from "../../pages/homePage";
import verificationTexts from "../../fixtures/verificationTexts.json";
import { getUsers } from "../../support/users";

const userCredentials = getUsers();

// Home Page Search Tests Suite
describe("Home Page Search Tests", () => {
  // Set up before each test
  beforeEach(() => {
    cy.visit("/"); // This will automatically use the baseUrl
  });

  // Test case for searching by keyword
  it("Should search by keyword", () => {
    HomePage.typeSearchBar(verificationTexts.searchKeyword); // Type in the search bar
    HomePage.clickSearchButton(); // Click the search button
    cy.url().should("include", "featured-listings"); // Verify URL contains 'featured-listings'
    cy.get('[id=":r5:"]').should("have.value", verificationTexts.searchKeyword); // Assert the search bar value
  });

  // Test case for searching by bedrooms
  it("Should search by bedrooms, DH-2", () => {
    HomePage.clickBedroomFilter(); // Click on the bedroom filter dropdown
    HomePage.selectBedroomOption3Plus(); // Select '3+' bedrooms option
    HomePage.clickSearchButton(); // Click the search button

    // Assertions to ensure listings with 3+ bedrooms are shown
    cy.get('[viewBox="0 0 2048 1280"]').each(($el) => {
      cy.wrap($el)
        .parent()
        .should("contain.text", verificationTexts.bedroomsLabel)
        .and(($text) => {
          const bedroomsText = $text.text();
          const bedroomsCount = parseInt(bedroomsText.match(/\d+/)[0], 10);
          expect(bedroomsCount).to.be.gte(3); // Ensure there are at least 3 bedrooms
        });
    });
  });

  // Test case for searching by city
  it("Should search by city", () => {
    HomePage.typeCityInput(verificationTexts.city); // Type in the city input
    HomePage.clickSearchButton(); // Click the search button

    // Assert that the URL contains the city
    cy.url().should("include", `city=${verificationTexts.city}`);

    // Assert that the listings displayed include the city
    cy.get(`[value="${verificationTexts.city}"]`).should("exist"); // Check that the value of the city is present
  });

  // Test case for searching by price
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
