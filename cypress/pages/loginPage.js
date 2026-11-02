class LoginPage {
    // Method to get the email input element
    emailInput() {
        return cy.get('[id=":r5:"]'); // Updated to match the email input field
    }

    // Method to get the password input element
    passwordInput() {
        return cy.get('[id=":r6:"]'); // Updated to match the password input field
    }

    // Method to get the login button element
    loginBtn() {
        return cy.get('[id=":r7:"]'); // Updated to match the login button
    }

    // Method to get the login text element
    loginText() {
        return cy.get('h4'); // Assuming this is the correct selector for the login page header
    }

    // Method to type email into the email input
    typeEmail(email) {
        this.emailInput().type(email); // No change needed
    }

    // Method to type password into the password input
    typePassword(password) {
        this.passwordInput().type(password); // No change needed
    }

    // Method to click the login button
    clickLoginBtn() {
        this.loginBtn().click(); // No change needed
    }

    // Method to assert that the login text matches the expected text
    assertLoginText(text) {
        this.loginText().should('have.text', text); // No change needed
    }
}

export default new LoginPage();
