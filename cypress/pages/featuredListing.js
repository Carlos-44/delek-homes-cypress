class FeaturedListingPage {
    // Method to get the search bar element on the featured listing page
    getSearchBar() {
        return cy.contains('label', 'Search').parent().find('input');
    }

    // Method to type text into the search bar
    typeSearchBarFL(text) {
        this.getSearchBar().type(text); // Types the provided text into the search bar
    }

    // Method to get the bedroom filter dropdown element
    getBedroomFilter() {
        return cy.get('[id=":r2:"]'); // Select the first dropdown element
    }

    // Method to select '3+' bedrooms option from the dropdown
    selectBedroomOption3Plus() {
        this.getBedroomFilter().click(); // Click the dropdown to open it
        cy.contains('3+').click(); // Select the '3+' option from the dropdown
    }

    // Method to get the city input element
    getCityInput() {
        return cy.get('[id=":r4:"]'); // Selector for the city input field
    }

    // Method to type a city name into the city input
    typeCityInput(city) {
        this.getCityInput().type(city); // Types the provided city name into the input field
    }

    // Method to get the search button element
    getSearchButton() {
        return cy.contains('button', 'Start Search'); // Locate by button text
    }

    // Method to click the search button
    clickSearchButton() {
        this.getSearchButton().click(); // Clicks the search button
    }

    // Method to set the price range using the slider
    setPriceRange(minPrice, maxPrice) {
        cy.get('span.MuiSlider-thumb')
            .first()
            .focus()
            .invoke('attr', 'style', `left: ${minPrice}%`)
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', { clientX: minPrice })
            .trigger('mouseup', { force: true });

        cy.get('span.MuiSlider-thumb')
            .last()
            .focus()
            .invoke('attr', 'style', `left: ${maxPrice}%`)
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', { clientX: maxPrice })
            .trigger('mouseup', { force: true });
    }

    // Additional method to get the price filter elements (if applicable)
    getPriceFilter() {
        return cy.get('.MuiSlider-root'); // Selector for the price slider element
    }
}

export default new FeaturedListingPage();
