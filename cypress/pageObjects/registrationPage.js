class RegistrationPage {
    // Method to get the first name input element
    firstNameInput() {
        return cy.get('[name="firstName"]');
    }

    // Method to get the last name input element
    lastNameInput() {
        return cy.get('[name="lastName"]');
    }

    // Method to get the email input element
    emailInput() {
        return cy.get('[name="email"]');
    }

    // Method to get the password input element
    passwordInput() {
        return cy.get('[name="password"]');
    }

    // Method to get the submit button element
    submitBtn() {
        return cy.get('[type="submit"]');
    }

    // Method to get the first name error message element
    firstNameError() {
        return cy.get('[id=":r5:-helper-text"]');
    }

    // Method to get the last name error message element
    lastNameError() {
        return cy.get('[id=":r6:-helper-text"]');
    }

    // Method to get the email error message element
    emailError() {
        return cy.get('[id=":r7:-helper-text"]');
    }

    // Method to get the password error message element
    passwordError() {
        return cy.get('[id=":r8:-helper-text"]');
    }

    // Method to get the general error message for invalid data
    errorMessageInvalidData() {
        return cy.get('[class="MuiAlert-message css-2shwac"]');
    }

    // Method to type the first name into the first name input
    typeFirstName(firstName) {
        this.firstNameInput().type(firstName);
    }

    // Method to type the last name into the last name input
    typeLastName(lastName) {
        this.lastNameInput().type(lastName);
    }

    // Method to type the email into the email input
    typeEmail(email) {
        this.emailInput().type(email);
    }

    // Method to type the password into the password input
    typePassword(password) {
        this.passwordInput().type(password);
    }

    // Method to click the submit button
    clickSubmitBtn() {
        this.submitBtn().click();
    }

    // Method to assert that the first name error message matches the expected text
    assertFirstNameError(text) {
        this.firstNameError().should('have.text', text);
    }

    // Method to assert that the last name error message matches the expected text
    assertLastNameError(text) {
        this.lastNameError().should('have.text', text);
    }

    // Method to assert that the email error message matches the expected text
    assertEmailError(text) {
        this.emailError().should('have.text', text);
    }

    // Method to assert that the password error message matches the expected text
    assertPasswordError(text) {
        this.passwordError().should('have.text', text);
    }

    // Method to assert that the general error message for invalid data matches the expected text
    assertErrorMessageInvalidData(text) {
        this.errorMessageInvalidData().should('have.text', text);
    }
}

export default new RegistrationPage();
