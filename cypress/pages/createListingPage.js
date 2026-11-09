class CreateListingPage {
  visit() {
    cy.visit("/dashboard/real-estate/new");
  }

  titleInput() {
    return cy.get('input[name="title"]');
  }

  priceInput() {
    return cy.get('input[name="price"]');
  }

  descriptionInput() {
    return cy.get('textarea[name="description"]');
  }

  cityInput() {
    return cy.get('input[name="city"]');
  }

  addressInput() {
    return cy.get('input[name="address"]');
  }

  zipCodeInput() {
    return cy.get('input[name="zipCode"]');
  }

  // MUI select: the named hidden input sits next to the clickable listbox trigger
  stateSelect() {
    return cy.get('input[name="state"]').parent().find('[aria-haspopup="listbox"]');
  }

  bedroomsInput() {
    return cy.get('input[name="bedrooms"]');
  }

  bathroomsInput() {
    return cy.get('input[name="bathrooms"]');
  }

  garageInput() {
    return cy.get('input[name="garage"]');
  }

  sqftInput() {
    return cy.get('input[name="sqft"]');
  }

  lotSizeInput() {
    return cy.get('input[name="lotSize"]');
  }

  publishedSwitch() {
    return cy.get('[name="isPublished"]');
  }

  submitButton() {
    return cy.get('button[type="submit"]');
  }

  selectState(state) {
    this.stateSelect().click();
    cy.contains('li[role="option"]', state).click();
  }

  togglePublished() {
    this.publishedSwitch().click();
  }

  submit() {
    this.submitButton().click();
  }

  // Fills every text field and the state select from a listing object (numbers are typed as text)
  fill(listing) {
    this.titleInput().type(listing.title);
    this.priceInput().type(String(listing.price));
    this.descriptionInput().type(listing.description);
    this.cityInput().type(listing.city);
    this.addressInput().type(listing.address);
    this.zipCodeInput().type(listing.zipCode);
    this.selectState(listing.state);
    this.bedroomsInput().type(String(listing.bedrooms));
    this.bathroomsInput().type(String(listing.bathrooms));
    this.garageInput().type(String(listing.garage));
    this.sqftInput().type(String(listing.sqft));
    this.lotSizeInput().type(String(listing.lotSize));
  }
}

export default new CreateListingPage();
