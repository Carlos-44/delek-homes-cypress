class LoginPage {
  visit() {
    cy.visit("/auth/login");
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

  heading() {
    return cy.get("h4");
  }

  // Server-side sign-in errors are shown in an MUI Alert above the fields
  errorAlert() {
    return cy.get('[role="alert"]');
  }

  typeEmail(email) {
    this.emailInput().type(email);
  }

  typePassword(password) {
    this.passwordInput().type(password, { log: false });
  }

  submit() {
    this.submitButton().click();
  }

  signIn(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.submit();
  }
}

export default new LoginPage();
