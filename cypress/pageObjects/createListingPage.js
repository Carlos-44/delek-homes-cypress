class CreateListingPage {
    listingTitleInput() {
        return cy.get('input[name="title"]');
    }

    listingPriceInput() {
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

    clickPublishSwitch() {
        return cy.get('[name="isPublished"]').click();
    }

    clickSubmitButton() {
        return cy.get('button[type="submit"]').click();
    }

    selectStateOption(state) {
        this.clickStateDropdown(); // Use 'this' to reference another method in the class
        cy.contains('li', state).click(); 
    }

    clickStateDropdown() {
        return cy.get('[id=":r6:"]').click(); // Ensure this method clicks the dropdown
    }

    verifyUrlContains(text) {
        cy.url().should('include', text);
    }
}

export default new CreateListingPage();
