import { getUsers } from "../support/users";
import "cypress-file-upload";
import { faker } from "@faker-js/faker";
import CreateListingPage from "../pages/createListingPage";
import HomePage from "../pages/homePage";

describe("Create New Listing Tests", () => {
  let adminUser;

  before(() => {
    // Load credentials from the fixture
    cy.wrap(getUsers()).then((credentials) => {
      adminUser = credentials.adminUser;
    });
  });

  const listingTitle = `Listing ${faker.address.streetName()} ${Date.now()}`; // Ensure title is unique
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
  const state = "Florida"; // Example state

  it("should log in via UI and create a new listing with image upload via UI", () => {
    // Log in via UI using data from fixture
    cy.loginViaUI(adminUser.email, adminUser.password);
    cy.url().should("include", "/dashboard"); // Verify login successful

    // Navigate to the listing creation page
    cy.visit("/dashboard/real-estate/new");
    cy.url().should("include", "/real-estate/new"); // Verify navigation successful

    // Fill out the listing form
    CreateListingPage.listingTitleInput().type(listingTitle);
    CreateListingPage.listingPriceInput().type(listingPrice);
    CreateListingPage.descriptionInput().type(description);
    CreateListingPage.cityInput().type(city);
    CreateListingPage.addressInput().type(address);
    CreateListingPage.zipCodeInput().type(zipCode);
    CreateListingPage.selectStateOption(state); // Ensure the state dropdown is selected correctly

    CreateListingPage.bedroomsInput().type(bedrooms.toString());
    CreateListingPage.bathroomsInput().type(bathrooms.toString());
    CreateListingPage.garageInput().type(garage.toString());
    CreateListingPage.sqftInput().type(sqft.toString());
    CreateListingPage.lotSizeInput().type(lotSize.toString());

    // Step 7: Upload an image
    cy.uploadImage("downloadhomepicture.jpeg");

    // Toggle the publish switch and submit the form
    CreateListingPage.clickPublishSwitch();
    CreateListingPage.clickSubmitButton();

    // Assert that the listing was created and published
    CreateListingPage.verifyUrlContains("/dashboard/real-estate/list");

    // Verify that the new listing is searchable
    cy.visit("/");
    HomePage.typeSearchBar(listingTitle);
    HomePage.clickSearchButton();

    cy.contains(listingTitle).click();

    // Verify the listing details
    cy.get("div.MuiGrid-root").contains(sqft).should("exist");
    cy.get("div.MuiGrid-root").contains(`${bedrooms}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Bedrooms").should("exist");
    cy.get("div.MuiGrid-root").contains(`${bathrooms}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Bathrooms").should("exist");
    cy.get("div.MuiGrid-root").contains(`${garage}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Garage").should("exist");
  });

  it("should log in via API and create a new listing with image upload", () => {
    // Load credentials from the fixture
    cy.wrap(getUsers()).then((credentials) => {
      const adminUser = credentials.adminUser;

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

    // Fill out the listing form
    CreateListingPage.listingTitleInput().type(listingTitle);
    CreateListingPage.listingPriceInput().type(listingPrice);
    CreateListingPage.descriptionInput().type(description);
    CreateListingPage.cityInput().type(city);
    CreateListingPage.addressInput().type(address);
    CreateListingPage.zipCodeInput().type(zipCode);
    CreateListingPage.selectStateOption(state);

    CreateListingPage.bedroomsInput().type(bedrooms.toString());
    CreateListingPage.bathroomsInput().type(bathrooms.toString());
    CreateListingPage.garageInput().type(garage.toString());
    CreateListingPage.sqftInput().type(sqft.toString());
    CreateListingPage.lotSizeInput().type(lotSize.toString());

    // Upload an image
    cy.uploadImage("downloadhomepicture.jpeg");

    // Toggle the publish switch and submit the form
    CreateListingPage.clickPublishSwitch();
    CreateListingPage.clickSubmitButton();

    // Assert that the listing was created and published
    CreateListingPage.verifyUrlContains("/dashboard/real-estate/list");

    // Verify that the new listing is searchable
    cy.visit("/");
    HomePage.typeSearchBar(listingTitle);
    HomePage.clickSearchButton();

    cy.contains(listingTitle).click();

    // Verify the listing details
    cy.get("div.MuiGrid-root").contains(sqft).should("exist");
    cy.get("div.MuiGrid-root").contains(`${bedrooms}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Bedrooms").should("exist");
    cy.get("div.MuiGrid-root").contains(`${bathrooms}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Bathrooms").should("exist");
    cy.get("div.MuiGrid-root").contains(`${garage}`).should("exist");
    cy.get("div.MuiGrid-root").contains("Garage").should("exist");
  });
});
