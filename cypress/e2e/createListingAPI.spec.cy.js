import "cypress-file-upload";
import { faker } from "@faker-js/faker";

describe("Create and Delete Listing via API using JSON Data", () => {
  let adminUser;
  let listingData;

  before(() => {
    // Load the fixture data for user credentials
    cy.fixture("userCredentials.json").then((credentials) => {
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
    });

    // Load listing data from listing1.json
    cy.fixture("listing1.json").then((data) => {
      listingData = data;
    });
  });

  it("should create a new listing via API", () => {
    cy.fixture(listingData.imagePath, "base64").then((image) => {
      const blob = Cypress.Blob.base64StringToBlob(image, "image/jpeg");

      const formData = new FormData();
      formData.append("images", blob); // Adding image binary data
      formData.append("lotSize", listingData.lotSize);
      formData.append("sqft", listingData.sqft);
      formData.append("garage", listingData.garage);
      formData.append("bathrooms", listingData.bathrooms);
      formData.append("bedrooms", listingData.bedrooms);
      formData.append("price", listingData.price);
      formData.append("zipCode", listingData.zipCode);
      formData.append("state", listingData.state);
      formData.append("city", listingData.city);
      formData.append("address", listingData.address);
      formData.append("description", listingData.description);
      formData.append("title", listingData.title);
      formData.append("isPublished", listingData.isPublished); // Ensure this is correctly set as a boolean or string

      // Send the request to create the listing
      cy.request({
        method: "POST",
        url: "https://dev.delekhomes.com/api/estate-objects",
        body: formData,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`, // Use accessToken from localStorage
        },
      }).then((response) => {
        // Parse the response body to extract the listing ID
        const listingId = JSON.parse(
          String.fromCharCode.apply(null, new Uint8Array(response.body))
        ).id;
        console.log("response", listingId); // Log the listingId

        if (listingId) {
          Cypress.env("listingId", listingId); // Store listingId in Cypress environment
          cy.wrap(listingId).as("listingId"); // Alias for later use
          cy.log("Created listingId:", listingId); // Log the listing ID to the console
        } else {
          cy.log("No listing ID returned by API.");
        }
      });
    });
  });

  after(() => {
    // Check if listingId is stored in Cypress environment
    const storedListingId = Cypress.env("listingId");
    cy.log("Stored Listing ID:", storedListingId);

    // Clean up: Delete the listing via API after the tests are done, if listingId is available
    if (storedListingId) {
      cy.request({
        method: "DELETE",
        url: `https://dev.delekhomes.com/api/estate-objects/${storedListingId}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("auth_token")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Assert the listing was deleted successfully
        cy.log("Deleted listing with ID:", storedListingId);
      });
    } else {
      cy.log("Skipping deletion since listingId is undefined.");
    }
  });
});
