import './commands';

console.log('e2e.js loaded'); // Verify that the file is loaded

// Call the error handler custom command inside a before hook
before(() => {
  cy.errorHandler();
});
