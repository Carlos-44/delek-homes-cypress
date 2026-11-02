class DashboardPage {
    roleLabel() {
      return cy.get('[class="MuiTypography-root MuiTypography-body2 MuiTypography-noWrap css-10n697b"]');
    }
  
    profileBtn() {
      return cy.get('[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-w5qhhs"]');
    }
  
    logoutBtn() {
      return cy.get('[class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-p9n58v"]');
    }
  
    clickProfileBtn() {
      this.profileBtn().click();
    }
  
    clickLogoutBtn() {
      this.logoutBtn().click();
    }
  
    assertRoleLabel(text) {
      this.roleLabel().should('have.text', text);
    }
  }
  
  export default new DashboardPage();
  