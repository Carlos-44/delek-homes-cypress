@listings @api @requires-account
Feature: Listings API
  As a Delek Homes admin
  I want to manage listings through the API
  So that listings can be created and removed without the UI

  Scenario: Admin creates and then deletes a listing through the API
    Given I have an admin API token
    When I create a listing through the API from the "listing1" fixture
    Then the API should return the new listing's ID
    And I can delete that listing through the API
