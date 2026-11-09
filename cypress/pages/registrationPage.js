class RegistrationPage {
  firstNameInput() {
    return cy.get('input[name="firstName"]');
  }

  lastNameInput() {
    return cy.get('input[name="lastName"]');
  }

  emailInput() {
    return cy.get('input[name="email"]');
  }

  passwordInput() {
    return cy.get('input[name="password"]');
  }

  submitButton() {
    return cy.get('button[type="submit"]');
  }

  // Server-side registration errors are shown in an MUI Alert above the fields
  errorAlert() {
    return cy.get('[role="alert"]');
  }

  submit() {
    this.submitButton().click();
  }

  register({ firstName, lastName, email, password }) {
    this.firstNameInput().type(firstName);
    this.lastNameInput().type(lastName);
    this.emailInput().type(email);
    this.passwordInput().type(password, { log: false });
    this.submit();
  }
}

export default new RegistrationPage();
