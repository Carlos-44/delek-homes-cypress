@auth @requires-account
Feature: Login
  As a registered Delek Homes user
  I want to sign in and out
  So that I can manage my account securely

  Background:
    Given I am on the Delek Homes home page

  Scenario: User signs in with an existing account
    When I sign in as the "user" account
    Then I should see my dashboard with the role "role: user"

  Scenario: User signs out
    Given I sign in as the "user" account
    When I sign out from the profile menu
    Then I should see the sign-in heading "Sign in to Delek Homes"
