import 'cypress-file-upload';

// Custom command for handling uncaught exceptions
Cypress.Commands.add('errorHandler', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Prevent Cypress from failing the test if there are uncaught exceptions
        return false;
    });
});

// Custom command for UI login
Cypress.Commands.add("loginViaUI", (email, password) => {
    cy.visit('/auth/login'); // Navigate to the login page

    cy.get('input[name="email"]').type(email); // Enter the email
    cy.get('input[name="password"]').type(password); // Enter the password

    cy.get('button[type="submit"]').click(); // Click the login button

    // Verify if redirected to the dashboard or desired page
    cy.url().should('include', '/dashboard'); 
});

// Custom command for uploading an image using UI
Cypress.Commands.add('uploadImage', (filePath) => {
    cy.get('input[type="file"]').attachFile(filePath);
    // Optional: Verify the file upload if necessary
    // cy.get('input[type="file"]').should('have.value', filePath.split('/').pop());
});

Cypress.Commands.add("setViewport", (width = 1920, height = 1080) => {
    cy.viewport(width, height);
  });
  

/*
  ==== Commented Section ====

  If you prefer using API-based login instead of UI-based login, 
  uncomment the section below and comment out or remove the UI-based login command.

Cypress.Commands.add('loginViaAPI', (email, password) => {
    cy.request('POST', '/api/users/login', {
        email,
        password
    }).then((response) => {
        expect(response.status).to.eq(201);  // Ensure the status code matches the API response
        const token = response.body.accessToken;   // Extract the token from the response
        cy.setCookie('auth_token', token);   // Set the cookie with the correct name and value
        Cypress.env('auth_token', token);    // Store the token in Cypress environment 
    });
});
*/

/*
  ==== Example Usage ====

  // UI-based Login Usage:
  describe("Login Test", () => {
      it("should log in successfully via UI", () => {
          cy.loginViaUI(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));
          // Further test steps after successful login
      });
  });

  // API-based Login Usage:
  describe("Login Test", () => {
      it("should log in successfully via API", () => {
          cy.loginViaAPI(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD')).then(() => {
              cy.visit('/dashboard'); // Visit the dashboard directly after API login
          });
          // Further test steps after successful login
      });
  });
*/

