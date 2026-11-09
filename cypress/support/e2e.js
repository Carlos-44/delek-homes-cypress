import './commands';
import 'cypress-mochawesome-reporter/register';

// The app under test is a third-party demo app that throws its own uncaught errors;
// they are not what these tests check, so they must not fail the run.
Cypress.on('uncaught:exception', () => false);
