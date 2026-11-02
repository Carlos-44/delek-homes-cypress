import DashboardPage from "../../pages/dashboardPage";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import { getUsers } from "../../support/users";

const userCredentials = getUsers();

describe("Login Tests", () => {
  beforeEach(() => {
    cy.setViewport(); // Use the custom command to set the viewport size
    cy.visit("/");
  });

  it("login with existing account", () => {
    // Step 1: Click the login button on the homepage
    HomePage.clickLoginBtn();

    // Step 2: Enter valid credentials
    LoginPage.typeEmail(userCredentials.validUser.email);
    LoginPage.typePassword(userCredentials.validUser.password); // The corresponding password
    LoginPage.clickLoginBtn();

    // Step 3: Assert successful login by checking for the user's dashboard
    DashboardPage.assertRoleLabel("role: user");
  });

  it("should be able to log out", () => {
    // Step 1: Log in with existing account
    HomePage.clickLoginBtn();
    LoginPage.typeEmail(userCredentials.validUser.email);
    LoginPage.typePassword(userCredentials.validUser.password);
    LoginPage.clickLoginBtn();

    // Step 2: Click the profile button and then logout
    DashboardPage.clickProfileBtn();
    DashboardPage.clickLogoutBtn();

    // Step 3: Assert that the user is redirected to the login page
    LoginPage.assertLoginText("Sign in to Delek Homes");
  });
});
