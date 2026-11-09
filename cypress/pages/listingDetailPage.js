// /featured-listings/<id>: one listing with its title in an h3 and each feature on its own
// line, e.g. "Bedrooms: 3"
class ListingDetailPage {
  title() {
    return cy.get("h3");
  }

  // The element whose whole text is "<label>: <value>", e.g. featureLine("Garage")
  featureLine(label) {
    return cy.contains("div", new RegExp(`^\\s*${label}:\\s*\\S+\\s*$`));
  }
}

export default new ListingDetailPage();
