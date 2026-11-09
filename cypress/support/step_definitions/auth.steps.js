import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import DashboardPage from "../../pages/dashboardPage";
import RegistrationPage from "../../pages/registrationPage";
import { accountFor } from "../users";

function randomAccount(overrides = {}) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  };
}

// ---------- Sign in / sign out ----------

Given("I am on the sign-in page", () => {
  LoginPage.visit();
});

When("I sign in with an unknown email and password", () => {
  const { email, password } = randomAccount();
  LoginPage.signIn(email, password);
});

When("I submit the sign-in form without filling it in", () => {
  LoginPage.submit();
});

When("I open the dashboard without signing in", () => {
  cy.visit("/dashboard");
});

When("I sign out from the profile menu", () => {
  DashboardPage.signOut();
});

Then("I should see the sign-in heading {string}", (heading) => {
  LoginPage.heading().should("have.text", heading);
});

Then("I should see the sign-in error {string}", (message) => {
  LoginPage.errorAlert().should("contain.text", message);
});

// The app's auth guard renders the sign-in form in place of any protected page
Then("I should be asked to sign in instead of seeing the dashboard", () => {
  LoginPage.heading().should("have.text", "Sign in to Delek Homes");
  LoginPage.emailInput().should("be.visible");
  DashboardPage.roleLabel().should("not.exist");
});

// ---------- Registration ----------

Given("I open the registration form", () => {
  HomePage.openRegistration();
  cy.url().should("include", "/auth/register");
});

When("I register with a new randomly generated account", () => {
  RegistrationPage.register(randomAccount());
});

When("I register with the details of the existing {string} account", (role) => {
  RegistrationPage.register(accountFor(role));
});

When("I register with the email {string}", (email) => {
  RegistrationPage.register(randomAccount({ email }));
});

When("I submit the registration form without filling it in", () => {
  RegistrationPage.submit();
});

Then("I should see the registration error {string}", (message) => {
  RegistrationPage.errorAlert().should("contain.text", message);
});

// ---------- Login API ----------

function requestToken(body) {
  cy.request({ method: "POST", url: "/api/users/login", body, failOnStatusCode: false }).as("apiResponse");
}

When("I request an API token with an unknown email and password", () => {
  const { email, password } = randomAccount();
  requestToken({ email, password });
});

When("I request an API token without an email or password", () => {
  requestToken({});
});

Then("the API should respond with status {int}", (status) => {
  cy.get("@apiResponse").its("status").should("eq", status);
});

// The API returns "message" as a string or, for validation errors, a list of strings
Then("the API error messages should be:", (dataTable) => {
  const expected = dataTable.raw().map(([message]) => message);
  cy.get("@apiResponse").then(({ body }) => {
    expect([].concat(body.message), "API error messages").to.have.members(expected);
  });
});
