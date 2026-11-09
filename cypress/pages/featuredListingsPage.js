import SearchForm from "./components/searchForm";

class FeaturedListingsPage extends SearchForm {
  visit() {
    cy.visit("/featured-listings");
  }

  // Each result is a MUI card holding a "More Info" link to the listing detail page.
  // One selector (not get + filter) so should("not.exist") works when there are no cards.
  listingCards() {
    return cy.get('.MuiCard-root:has(a[href^="/featured-listings/"])');
  }

  listingTitles() {
    return this.listingCards().find("h5");
  }

  // Shown in place of the cards when a search matches nothing
  emptyState() {
    return cy.contains("No Data");
  }

  // Opens the detail page of the first card whose text contains the title
  openListing(title) {
    this.listingCards()
      .filter((index, card) => card.textContent.includes(title))
      .first()
      .find('a[href^="/featured-listings/"]')
      .first()
      .click();
  }
}

export default new FeaturedListingsPage();
