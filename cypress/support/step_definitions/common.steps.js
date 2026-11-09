// Steps used by more than one feature area
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pages/homePage";
import FeaturedListingsPage from "../../pages/featuredListingsPage";
import DashboardPage from "../../pages/dashboardPage";
import FormField from "../../pages/components/formField";
import { accountFor } from "../users";

function signInAs(role) {
  const account = accountFor(role);
  cy.loginViaUI(account.email, account.password);
}

Given("I am on the Delek Homes home page", () => {
  HomePage.visit();
});

Given("I am on the featured listings page", () => {
  FeaturedListingsPage.visit();
  cy.url().should("include", "/featured-listings");
});

// Precondition form ("Given I am signed in ...") and action form ("When I sign in ...")
Given("I am signed in as the {string} account", (role) => {
  signInAs(role);
});

When("I sign in as the {string} account", (role) => {
  signInAs(role);
});

Then("I should be taken to the dashboard", () => {
  cy.url().should("include", "/dashboard");
});

Then("I should see my dashboard with the role {string}", (role) => {
  DashboardPage.roleLabel().should("have.text", role);
});

// Works on any form built from named MUI text fields (sign-in, registration)
Then("I should see these required-field errors:", (dataTable) => {
  dataTable.hashes().forEach(({ field, message }) => {
    FormField.error(field).should("have.text", message);
  });
});

Then("the {string} field should show the error {string}", (field, message) => {
  FormField.error(field).should("have.text", message);
});
