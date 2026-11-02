import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import DashboardPage from "../../pages/dashboardPage";
import RegistrationPage from "../../pages/registrationPage";
import { accountFor } from "../users";

When("I sign out from the profile menu", () => {
  DashboardPage.clickProfileBtn();
  DashboardPage.clickLogoutBtn();
});

Then("I should see the sign-in heading {string}", (heading) => {
  LoginPage.assertLoginText(heading);
});

Given("I open the registration form", () => {
  cy.errorHandler();
  HomePage.clickRegisterBtn();
});

function fillRegistration({ firstName, lastName, email, password }) {
  RegistrationPage.typeFirstName(firstName);
  RegistrationPage.typeLastName(lastName);
  RegistrationPage.typeEmail(email);
  RegistrationPage.typePassword(password);
  RegistrationPage.clickSubmitBtn();
}

When("I register with a new randomly generated account", () => {
  fillRegistration({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
});

When("I register with the details of the existing {string} account", (role) => {
  fillRegistration(accountFor(role));
});

When("I submit the registration form without filling it in", () => {
  RegistrationPage.clickSubmitBtn();
});

Then("I should be taken to the dashboard", () => {
  cy.url().should("include", "/dashboard");
});

Then("I should see the registration error {string}", (message) => {
  RegistrationPage.errorMessageInvalidData().should("have.text", message);
});

Then("I should see these required-field errors:", (dataTable) => {
  const errorFor = {
    firstName: () => RegistrationPage.firstNameError(),
    lastName: () => RegistrationPage.lastNameError(),
    email: () => RegistrationPage.emailError(),
    password: () => RegistrationPage.passwordError(),
  };
  dataTable.hashes().forEach(({ field, message }) => {
    errorFor[field]().should("have.text", message);
  });
});
