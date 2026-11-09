import LoginPage from "../pages/loginPage";

// Sign in through the login form and confirm the app redirected to the dashboard
Cypress.Commands.add("loginViaUI", (email, password) => {
  LoginPage.visit();
  LoginPage.signIn(email, password);
  cy.url().should("include", "/dashboard");
});

// Get an API token (yields it). With signInBrowser, the token is also stored in the app's
// localStorage (the AUT window, not the spec window) so the UI treats the user as signed in.
Cypress.Commands.add("loginViaApi", (email, password, { signInBrowser = true } = {}) => {
  return cy
    .request({ method: "POST", url: "/api/users/login", body: { email, password }, log: false })
    .then((response) => {
      expect(response.status, "API login status").to.eq(201);
      const token = response.body.accessToken;
      if (signInBrowser) {
        cy.setCookie("auth_token", token, { log: false });
        cy.visit("/", {
          onBeforeLoad(win) {
            win.localStorage.setItem("accessToken", token);
          },
        });
      }
      return cy.wrap(token, { log: false });
    });
});

// Create a listing from a fixture through the API (multipart, with the fixture's image). Yields the new ID.
Cypress.Commands.add("createListingViaApi", (fixtureName, token) => {
  return cy.fixture(fixtureName).then((data) => {
    return cy.fixture(data.imagePath, "base64").then((image) => {
      const formData = new FormData();
      formData.append("images", Cypress.Blob.base64StringToBlob(image, "image/jpeg"));
      ["lotSize", "sqft", "garage", "bathrooms", "bedrooms", "price", "zipCode", "state", "city", "address",
        "description", "title", "isPublished"].forEach((field) => formData.append(field, data[field]));

      return cy
        .request({
          method: "POST",
          url: "/api/estate-objects",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // A FormData request yields the body as an ArrayBuffer
          const body = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(response.body)));
          return body.id;
        });
    });
  });
});

// Delete a listing through the API. Yields the response (never fails on status, so cleanup can't throw).
Cypress.Commands.add("deleteListingViaApi", (id, token) => {
  return cy.request({
    method: "DELETE",
    url: `/api/estate-objects/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  });
});

// Attach a fixture image to the page's file input (built-in cy.selectFile)
Cypress.Commands.add("uploadImage", (fileName) => {
  cy.get('input[type="file"]').selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
