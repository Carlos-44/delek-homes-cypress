@auth
Feature: Login
  As a registered Delek Homes user
  I want to sign in and out
  So that I can manage my account securely

  Background:
    Given I am on the sign-in page

  @requires-account
  Scenario: User signs in with an existing account
    When I sign in as the "user" account
    Then I should see my dashboard with the role "role: user"

  @requires-account
  Scenario: User signs out
    Given I am signed in as the "user" account
    When I sign out from the profile menu
    Then I should see the sign-in heading "Sign in to Delek Homes"

  Scenario: Sign in is rejected for an unknown email and password
    When I sign in with an unknown email and password
    Then I should see the sign-in error "Wrong email or password"
    And I should see the sign-in heading "Sign in to Delek Homes"

  Scenario: Sign in requires an email and password
    When I submit the sign-in form without filling it in
    Then I should see these required-field errors:
      | field    | message              |
      | email    | Email is required    |
      | password | Password is required |

  Scenario: Visitor must sign in to open the dashboard
    When I open the dashboard without signing in
    Then I should be asked to sign in instead of seeing the dashboard
