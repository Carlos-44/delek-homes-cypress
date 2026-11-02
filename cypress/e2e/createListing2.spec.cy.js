import { getUsers } from "../support/users";
import "cypress-file-upload";
import { faker } from "@faker-js/faker";
import CreateListingPage from "../page_objects/createListingPage";
import HomePage from "../page_objects/homePage";

describe("Create New Listing", () => {
  // Load credentials from the fixture
  let adminUser;

  before(() => {
    // Load the fixture data
    cy.wrap(getUsers()).then((credentials) => {
      adminUser = credentials.adminUser;

      // Perform login via API using the fixture data
      cy.request("POST", "/api/users/login", {
        email: adminUser.email,
        password: adminUser.password,
      }).then((response) => {
        expect(response.status).to.eq(201); // Ensure the status code matches the API response
        const token = response.body.accessToken; // Extract the token from the response

        // Set token in both cookie and local storage
        cy.setCookie("auth_token", token); // Set the cookie with the correct name and value
        Cypress.env("auth_token", token); // Store the token in Cypress environment
        window.localStorage.setItem("accessToken", token); // Set the token in local storage
      });

      // Visit the protected page directly
      cy.visit("https://dev.delekhomes.com/dashboard/real-estate/new");
    });
  });

  it("should log in and create a new listing with image upload", () => {
    // Define test data using faker or static values
    const listingTitle = `Listing ${faker.address.streetName()}`;
    const listingPrice = faker.commerce.price(500000, 10000000, 0);
    const description = faker.lorem.sentence();
    const city = faker.address.city();
    const address = faker.address.streetAddress();
    const zipCode = faker.address.zipCode().slice(0, 5);
    const bedrooms = faker.datatype.number({ min: 1, max: 10 });
    const bathrooms = faker.datatype.number({ min: 1, max: 5 });
    const garage = faker.datatype.number({ min: 0, max: 3 });
    const sqft = faker.datatype.number({ min: 500, max: 5000 });
    const lotSize = faker.datatype.number({ min: 1000, max: 10000 });

    CreateListingPage.listingTitleInput().type(listingTitle);
    CreateListingPage.listingPriceInput().type(listingPrice);
    CreateListingPage.descriptionInput().type(description);
    CreateListingPage.cityInput().type(city);
    CreateListingPage.addressInput().type(address);
    CreateListingPage.zipCodeInput().type(zipCode);
    CreateListingPage.selectStateOption("Texas");

    CreateListingPage.bedroomsInput().type(bedrooms.toString());
    CreateListingPage.bathroomsInput().type(bathrooms.toString());
    CreateListingPage.garageInput().type(garage.toString());
    CreateListingPage.sqftInput().type(sqft.toString());
    CreateListingPage.lotSizeInput().type(lotSize.toString());

    // Step 7: Upload an image
    cy.uploadImage("downloadhomepicture.jpeg");

    // Step 8: Toggle the publish switch and submit the form
    CreateListingPage.clickPublishSwitch();
    CreateListingPage.clickSubmitButton();

    // Step 9: Assert that the listing was created and published
    CreateListingPage.verifyUrlContains("/dashboard/real-estate/list");

    // Verify that the new listing is searchable
    cy.visit("/");

    HomePage.typeSearchBar(listingTitle);
    HomePage.clickSearchButton();

    cy.contains(listingTitle).click();

    cy.get("div.MuiGrid-root").contains(sqft).should("exist");
    cy.get("div.MuiGrid-root").contains(`${bedrooms}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Bedrooms").should("exist");
    cy.get("div.MuiGrid-root").contains(`${bathrooms}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Bathrooms").should("exist");
    cy.get("div.MuiGrid-root").contains(`${garage}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Garage").should("exist");
  });
});
