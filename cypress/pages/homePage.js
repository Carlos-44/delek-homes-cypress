class HomePage {
  // Method to get the element for navigating to the login button
  navigateToLoginBtn() {
    return cy.get('a[href="/auth/login"]'); // Updated to use the correct locator for the login button
  }

  // Method to navigate to the Featured Listings page
  navigateToFeaturedListings() {
    return cy.get('a[href="/featured-listings"]').click(); // Updated to use the correct locator for the Featured Listings link
  }

  // Method to get the night mode switch element
  nightModeSwitch() {
    return cy.get('input[type="checkbox"]'); // Locator remains the same
  }

  navigateToFeaturedListings() {
    cy.visit("https://dev.delekhomes.com/featured-listings"); // Directly navigate to the featured listings page
  }

  // Method to get the search bar input element
  searchBarInput() {
    return cy.get('[id=":r1:"]'); // Updated to match the search bar element
  }

  // Method to get the start search button element
  startSearchButton() {
    return cy.get(
      '[class="MuiButton-startIcon MuiButton-iconSizeLarge css-coclz"]'
    ); // Assuming this is the start search button
  }

  bedroomFilterDropDown() {
    return cy.get('[id=":r2:"]'); // Updated to match the dropdown element with the id ":r1:"
  }

  bedroomOption3Plus() {
    return cy.contains("li", "3+"); // Update to correctly locate the 3+ option
  }

  // Method to get the city dropdown element
  cityInput() {
    return cy.get('[id=":r4:"]'); // Locator for the dropdown (you may need to adjust this based on actual HTML structure)
  }

  // Method to select a city from the dropdown
  selectCity(city) {
    this.cityDropdown().click(); // Open the dropdown
    cy.contains("li.MuiButtonBase-root", city).click(); // Select the city from the dropdown list
  }

  // Method to get the email input element
  emailInput() {
    return cy.get('[id=":r5:"]'); // Updated to match the email input element
  }

  // Method to get the password input element
  passwordInput() {
    return cy.get('[id=":r6:"]'); // Updated to match the password input element
  }

  // Method to click the login button
  clickLoginBtn() {
    this.navigateToLoginBtn().click(); // No change needed
  }

  // Method to click the night mode switch
  clickNightMode() {
    this.nightModeSwitch().click(); // No change needed
  }

  // Method to get the element for navigating to the register button
  getRegisterBtn() {
    return cy.contains("a", "Register"); // Uses 'contains' to locate the "Register" button
  }

  // Method to click the register button
  clickRegisterBtn() {
    this.getRegisterBtn().click(); // Clicks the "Register" button
  }

  // Method to type text into the search bar
  typeSearchBar(text) {
    this.searchBarInput().type(text); // No change needed
  }

  // Method to click the search button
  clickSearchButton() {
    this.startSearchButton().click(); // No change needed
  }

  // Method to click the bedroom filter dropdown
  clickBedroomFilter() {
    this.bedroomFilterDropDown().click(); // No change needed
  }

  // Method to select the 3+ bedroom option from the dropdown
  selectBedroomOption3Plus() {
    this.bedroomOption3Plus().click(); // No change needed
  }

  // Method to type the email into the email input field
  typeEmail(email) {
    this.emailInput().type(email); // No change needed
  }

  // Method to type the password into the password input field
  typePassword(password) {
    this.passwordInput().type(password); // No change needed
  }

  // Method to click the submit button after entering login credentials
  clickSubmitBtn() {
    cy.get('[id=":r7:"]').click(); // Updated to use the correct locator for the submit button
  }

  // Method to type a city name into the city input
  typeCityInput(city) {
    this.cityInput().type(city); // No change needed
  }
}

export default new HomePage();
