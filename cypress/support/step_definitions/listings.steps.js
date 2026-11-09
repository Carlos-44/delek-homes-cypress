import { Before, After, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import CreateListingPage from "../../pages/createListingPage";
import HomePage from "../../pages/homePage";
import FeaturedListingsPage from "../../pages/featuredListingsPage";
import { accountFor } from "../users";
import { cardValue, expectListingDetails } from "../listingChecks";

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

function getApiToken(role, options) {
  const account = accountFor(role);
  return cy.loginViaApi(account.email, account.password, options).then((apiToken) => {
    token = apiToken;
  });
}

// ---------- Create a listing (UI) ----------

Given("I am signed in as the {string} account through the {word}", (role, method) => {
  if (method === "UI") {
    const account = accountFor(role);
    cy.loginViaUI(account.email, account.password);
  } else if (method === "API") {
    getApiToken(role);
  } else {
    throw new Error(`Unknown sign-in method "${method}". Use UI or API.`);
  }
});

Given("I open the new listing form", () => {
  CreateListingPage.visit();
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
  CreateListingPage.fill(listing);
  cy.uploadImage("downloadhomepicture.jpeg");
  CreateListingPage.togglePublished();
  // The app posts to /api/estate-objects (axios baseURL "/api/"); capture the new ID for cleanup
  cy.intercept("POST", /\/api\/+estate-objects$/).as("createListing");
  CreateListingPage.submit();
  cy.wait("@createListing").then(({ response }) => {
    expect(response.statusCode, "create listing status").to.be.within(200, 299);
    const body = typeof response.body === "string" ? JSON.parse(response.body) : response.body;
    listingId = body.id;
  });
});

Then("I should be taken to the listings dashboard", () => {
  cy.url().should("include", "/dashboard/real-estate/list");
});

Then("I can find the listing through the home page search", () => {
  HomePage.visit();
  HomePage.typeSearch(listing.title);
  HomePage.search();
  FeaturedListingsPage.openListing(listing.title);
});

Then("the listing page shows its square footage, bedrooms, bathrooms and garage", () => {
  expectListingDetails(listing);
});

// ---------- Listing detail page (public) ----------

When("I open the first listing shown", () => {
  FeaturedListingsPage.listingCards()
    .should("have.length.greaterThan", 0)
    .first()
    .then(($card) => {
      const text = $card.text();
      listing = {
        title: $card.find("h5").text().trim(),
        sqft: cardValue(text, "Sqft"),
        bedrooms: cardValue(text, "Bedrooms"),
        bathrooms: cardValue(text, "Bathrooms"),
        garage: cardValue(text, "Garage"),
      };
      Object.entries(listing).forEach(([field, value]) => {
        expect(value, `first card ${field}`).to.be.a("string").and.not.be.empty;
      });
      FeaturedListingsPage.openListing(listing.title);
    });
});

Then("I should see the same title, square footage, bedrooms, bathrooms and garage as its card", () => {
  cy.location("pathname").should("match", /^\/featured-listings\/\d+$/);
  expectListingDetails(listing);
});

// ---------- Listings API ----------

Given("I have an admin API token", () => {
  getApiToken("admin", { signInBrowser: false });
});

When("I create a listing through the API from the {string} fixture", (fixtureName) => {
  cy.createListingViaApi(fixtureName, token).then((id) => {
    listingId = id;
  });
});

Then("the API should return the new listing's ID", () => {
  cy.then(() => expect(listingId, "listing ID returned by the API").to.be.a("number"));
});

// A DELETE for an unknown ID also returns 200, so check one row was affected and the listing is gone
Then("I can delete that listing through the API", () => {
  cy.deleteListingViaApi(listingId, token).then((response) => {
    expect(response.status, "delete status").to.eq(200);
    expect(response.body.affected, "rows deleted").to.eq(1);
    deleted = true;
  });
  cy.then(() => cy.request(`/api/estate-objects/${listingId}`))
    .its("body.estateObject")
    .should("be.null");
});

// Delete any listing a scenario created (UI or API) that it did not delete itself.
// UI sign-in leaves no token here, so one is fetched through the API first.
After(() => {
  if (!listingId || deleted) return;
  if (!token) getApiToken("admin", { signInBrowser: false });
  cy.then(() => cy.deleteListingViaApi(listingId, token));
});
