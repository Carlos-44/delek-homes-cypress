import './commands';
import 'cypress-mochawesome-reporter/register';

// Call the error handler custom command inside a before hook
before(() => {
  cy.errorHandler();
});
