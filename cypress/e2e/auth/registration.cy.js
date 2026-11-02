import DashboardPage from "../../pages/dashboardPage";
import HomePage from "../../pages/homePage";
import RegistrationPage from "../../pages/registrationPage";
import { faker } from "@faker-js/faker";
import { getUsers } from "../../support/users";

const userCredentials = getUsers();
import verificationTexts from "../../fixtures/verificationTexts.json";

describe("Register Tests", () => {
  let email;
  let password;

  beforeEach(() => {
    cy.setViewport(); // Use the custom command to set the viewport size
    cy.visit("/");
    cy.errorHandler(); // Use custom error handler

    // Generate unique email and password for each test run
    email = faker.internet.email();
    password = faker.internet.password();
  });

  it("should register a new account", () => {
    HomePage.clickRegisterBtn();
    RegistrationPage.typeFirstName(faker.name.firstName());
    RegistrationPage.typeLastName(faker.name.lastName());
    RegistrationPage.typeEmail(email);
    RegistrationPage.typePassword(password);
    RegistrationPage.clickSubmitBtn();

    // Assertion to check if the registration was successful
    cy.url().should("include", "/dashboard");
    DashboardPage.roleLabel().should("have.text", "role: user");
  });

  it("should not register with an already existing account", () => {
    HomePage.clickRegisterBtn();
    RegistrationPage.typeFirstName(userCredentials.validUser.firstName);
    RegistrationPage.typeLastName(userCredentials.validUser.lastName);
    RegistrationPage.typeEmail(userCredentials.validUser.email); // Existing email
    RegistrationPage.typePassword(userCredentials.validUser.password);
    RegistrationPage.clickSubmitBtn();

    RegistrationPage.errorMessageInvalidData().should(
      "have.text",
      verificationTexts.errors.inputDataValidationFailed
    ); // Adjust based on actual error message
  });

  it("should not register without filling in required fields", () => {
    HomePage.clickRegisterBtn();
    RegistrationPage.clickSubmitBtn();

    // Assertions to check the presence of error messages
    RegistrationPage.firstNameError().should(
      "have.text",
      verificationTexts.errors.firstNameRequired
    );
    RegistrationPage.lastNameError().should(
      "have.text",
      verificationTexts.errors.lastNameRequired
    );
    RegistrationPage.emailError().should(
      "have.text",
      verificationTexts.errors.emailRequired
    );
    RegistrationPage.passwordError().should(
      "have.text",
      verificationTexts.errors.passwordRequired
    );
  });
});
