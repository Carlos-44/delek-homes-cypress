class DashboardPage {
  // Sidebar account summary, rendered as "role: <role list>"
  roleLabel() {
    return cy.contains(/^role: /);
  }

  // The header's account button is the icon button wrapping the user's avatar
  profileButton() {
    return cy.get("header").find(".MuiAvatar-root").closest("button");
  }

  logoutMenuItem() {
    return cy.contains('[role="menuitem"]', "Logout");
  }

  signOut() {
    this.profileButton().click();
    this.logoutMenuItem().click();
  }
}

export default new DashboardPage();
