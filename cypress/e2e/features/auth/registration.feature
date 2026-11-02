@auth
Feature: Registration
  As a new visitor
  I want to create a Delek Homes account
  So that I can save and manage listings

  Background:
    Given I am on the Delek Homes home page
    And I open the registration form

  Scenario: New visitor registers an account
    When I register with a new randomly generated account
    Then I should be taken to the dashboard
    And I should see my dashboard with the role "role: user"

  @requires-account
  Scenario: Registration is rejected for an email that already exists
    When I register with the details of the existing "user" account
    Then I should see the registration error "Input data validation failed"

  Scenario: Registration requires every field
    When I submit the registration form without filling it in
    Then I should see these required-field errors:
      | field     | message             |
      | firstName | First name required |
      | lastName  | Last name required  |
      | email     | Email is required   |
      | password  | Password is required |
