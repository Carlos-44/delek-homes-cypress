// The listing search widget shown on both the home page and the featured listings page.
// Fields are located through their visible MUI labels: the app's input ids are React
// useId values that change with render order, so they are not stable.
export default class SearchForm {
  searchInput() {
    return cy.contains("label", "Search").parent().find("input");
  }

  bedroomsSelect() {
    return cy.contains("label", "Bedrooms").parent().find('[aria-haspopup="listbox"]');
  }

  cityInput() {
    return cy.contains("label", "City").parent().find("input");
  }

  searchButton() {
    return cy.contains("button", "Start Search");
  }

  // The two hidden range inputs MUI renders inside the price slider thumbs (min, max)
  priceSliderInputs() {
    return cy.get('.MuiSlider-root input[type="range"]');
  }

  typeSearch(text) {
    this.searchInput().type(text, { parseSpecialCharSequences: false });
  }

  // option is the menu text, e.g. "3+"
  selectBedrooms(option) {
    this.bedroomsSelect().click();
    cy.contains('li[role="option"]', new RegExp(`^${Cypress._.escapeRegExp(option)}$`)).click();
  }

  typeCity(city) {
    this.cityInput().type(city);
  }

  search() {
    this.searchButton().click();
  }
}
