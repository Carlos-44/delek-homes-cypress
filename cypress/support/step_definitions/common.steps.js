import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import DashboardPage from "../../pages/dashboardPage";
import { accountFor } from "../users";

Given("I am on the Delek Homes home page", () => {
  cy.setViewport();
  cy.visit("/");
});

Given("I sign in as the {string} account", (role) => {
  const account = accountFor(role);
  HomePage.clickLoginBtn();
  LoginPage.typeEmail(account.email);
  LoginPage.typePassword(account.password);
  LoginPage.clickLoginBtn();
});

Then("I should see my dashboard with the role {string}", (role) => {
  DashboardPage.assertRoleLabel(role);
});
