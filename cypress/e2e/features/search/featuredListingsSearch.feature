@search @requires-account
Feature: Featured listings search
  As a signed-in user
  I want to filter the featured listings
  So that I only see homes that match my criteria

  Background:
    Given I am signed in as the "user" account and viewing the featured listings

  Scenario: Search featured listings by keyword
    When I search the featured listings for the keyword "Your future house"
    Then every listing title should contain "Your future house"

  Scenario: Filter featured listings by bedrooms
    When I filter the featured listings to 3 or more bedrooms
    Then no listing should show only 1 bedroom

  Scenario: Filter featured listings by city
    When I search the featured listings for the city "Galewood"
    Then every listing should show the city "Galewood"

  Scenario: Filter featured listings by price range
    When I search the featured listings for prices from 1000000 to 10000000
    Then the price filter should show dollar amounts
