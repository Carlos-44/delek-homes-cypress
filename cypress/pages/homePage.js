import SearchForm from "./components/searchForm";

class HomePage extends SearchForm {
  visit() {
    cy.visit("/");
  }

  registerLink() {
    return cy.contains("a", "Register");
  }

  openRegistration() {
    this.registerLink().click();
  }
}

export default new HomePage();
