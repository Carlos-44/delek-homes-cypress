import { Before, After, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import CreateListingPage from "../../pages/createListingPage";
import HomePage from "../../pages/homePage";
import { accountFor } from "../users";

// Per-scenario state
let listing;
let token;
let listingId;
let deleted;

Before(() => {
  listing = undefined;
  token = undefined;
  listingId = undefined;
  deleted = false;
});

function loginThroughApi() {
  const admin = accountFor("admin");
  return cy.request("POST", "/api/users/login", { email: admin.email, password: admin.password }).then((response) => {
    expect(response.status).to.eq(201);
    token = response.body.accessToken;
    cy.setCookie("auth_token", token);
    window.localStorage.setItem("accessToken", token);
  });
}

Given("I am signed in as the admin through the {word}", (method) => {
  if (method === "UI") {
    const admin = accountFor("admin");
    cy.loginViaUI(admin.email, admin.password);
  } else if (method === "API") {
    loginThroughApi();
  } else {
    throw new Error(`Unknown sign-in method "${method}". Use UI or API.`);
  }
  cy.visit("/dashboard/real-estate/new");
  cy.url().should("include", "/real-estate/new");
});

When("I publish a new listing with random property details and a photo", () => {
  listing = {
    title: `Listing ${faker.location.street()} ${Date.now()}`,
    price: faker.commerce.price({ min: 500000, max: 10000000, dec: 0 }),
    description: faker.lorem.sentence(),
    city: faker.location.city(),
    address: faker.location.streetAddress(),
    zipCode: faker.location.zipCode().slice(0, 5),
    state: "Florida",
    bedrooms: faker.number.int({ min: 1, max: 10 }),
    bathrooms: faker.number.int({ min: 1, max: 5 }),
    garage: faker.number.int({ min: 0, max: 3 }),
    sqft: faker.number.int({ min: 500, max: 5000 }),
    lotSize: faker.number.int({ min: 1000, max: 10000 }),
  };
  CreateListingPage.listingTitleInput().type(listing.title);
  CreateListingPage.listingPriceInput().type(listing.price);
  CreateListingPage.descriptionInput().type(listing.description);
  CreateListingPage.cityInput().type(listing.city);
  CreateListingPage.addressInput().type(listing.address);
  CreateListingPage.zipCodeInput().type(listing.zipCode);
  CreateListingPage.selectStateOption(listing.state);
  CreateListingPage.bedroomsInput().type(String(listing.bedrooms));
  CreateListingPage.bathroomsInput().type(String(listing.bathrooms));
  CreateListingPage.garageInput().type(String(listing.garage));
  CreateListingPage.sqftInput().type(String(listing.sqft));
  CreateListingPage.lotSizeInput().type(String(listing.lotSize));
  cy.uploadImage("downloadhomepicture.jpeg");
  CreateListingPage.clickPublishSwitch();
  CreateListingPage.clickSubmitButton();
});

Then("I should be taken to the listings dashboard", () => {
  CreateListingPage.verifyUrlContains("/dashboard/real-estate/list");
});

Then("I can find the listing through the home page search", () => {
  cy.visit("/");
  HomePage.typeSearchBar(listing.title);
  HomePage.clickSearchButton();
  cy.contains(listing.title).click();
});

Then("the listing page shows its square footage, bedrooms, bathrooms and garage", () => {
  cy.get("div.MuiGrid-root").contains(listing.sqft).should("exist");
  cy.get("div.MuiGrid-root").contains(`${listing.bedrooms}`).should("exist");
  cy.get("div.MuiGrid-root").contains("Bedrooms").should("exist");
  cy.get("div.MuiGrid-root").contains(`${listing.bathrooms}`).should("exist");
  cy.get("div.MuiGrid-root").contains("Bathrooms").should("exist");
  cy.get("div.MuiGrid-root").contains(`${listing.garage}`).should("exist");
  cy.get("div.MuiGrid-root").contains("Garage").should("exist");
});

Given("I have an admin API token", () => {
  loginThroughApi();
});

When("I create a listing through the API from the {string} fixture", (fixtureName) => {
  cy.fixture(fixtureName).then((data) => {
    cy.fixture(data.imagePath, "base64").then((image) => {
      const formData = new FormData();
      formData.append("images", Cypress.Blob.base64StringToBlob(image, "image/jpeg"));
      ["lotSize", "sqft", "garage", "bathrooms", "bedrooms", "price", "zipCode", "state", "city", "address",
        "description", "title", "isPublished"].forEach((field) => formData.append(field, data[field]));

      cy.request({
        method: "POST",
        url: "/api/estate-objects",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        listingId = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(response.body))).id;
      });
    });
  });
});

Then("the API should return the new listing's ID", () => {
  cy.then(() => expect(listingId, "listing ID returned by the API").to.exist);
});

Then("I can delete that listing through the API", () => {
  cy.request({
    method: "DELETE",
    url: `/api/estate-objects/${listingId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    expect(response.status).to.eq(200);
    deleted = true;
  });
});

// Clean up a listing the API created if the scenario failed before deleting it
After(() => {
  if (listingId && !deleted && token) {
    cy.request({
      method: "DELETE",
      url: `/api/estate-objects/${listingId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
  }
});
