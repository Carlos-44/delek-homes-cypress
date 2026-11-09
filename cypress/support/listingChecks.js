// Assertions on listing cards and the listing detail page, shared by search.steps.js and listings.steps.js
import FeaturedListingsPage from "../pages/featuredListingsPage";
import ListingDetailPage from "../pages/listingDetailPage";

// Reads "Label: value" from a listing card's text (the card text has no separators). Returns null if absent.
export function cardValue(cardText, label) {
  const pattern = new RegExp(`${label}:\\s*(.+?)(?=(Sqft|Garage|Bedrooms|Bathrooms|City|State|Zip/Code):|More Info|$)`);
  const match = cardText.match(pattern);
  return match ? match[1].trim() : null;
}

// Checks a value on every listing card, failing if no cards are shown. It runs inside a
// retrying .should() so results from before the search re-render are not judged too early.
export function everyListingCard(check) {
  FeaturedListingsPage.listingCards().should(($cards) => {
    expect($cards.length, "number of listings shown").to.be.greaterThan(0);
    $cards.each((index, card) => check(Cypress.$(card).text(), index));
  });
}

export function eachListingValue(label, check) {
  everyListingCard((text, index) => {
    const value = cardValue(text, label);
    expect(value, `listing ${index + 1} shows "${label}:"`).to.not.equal(null);
    check(value, index);
  });
}

// The detail page shows the title in an h3 and each feature as an exact "Label: value" line
export function expectListingDetails({ title, sqft, bedrooms, bathrooms, garage }) {
  ListingDetailPage.title().should("contain.text", title);
  const features = { "Square Feet": sqft, Bedrooms: bedrooms, Bathrooms: bathrooms, Garage: garage };
  Object.entries(features).forEach(([label, value]) => {
    ListingDetailPage.featureLine(label).should(($line) => {
      expect($line.text().trim(), `${label} line`).to.match(new RegExp(`^${label}:\\s*${value}$`));
    });
  });
}
