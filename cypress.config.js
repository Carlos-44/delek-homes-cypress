const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev.delekhomes.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    // Retry once in CI to absorb flakiness from the live demo site
    retries: { runMode: 1, openMode: 0 },
    video: false,
    screenshotOnRunFailure: true,
  },
});
