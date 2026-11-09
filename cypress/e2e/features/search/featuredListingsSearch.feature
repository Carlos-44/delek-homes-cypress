@search
Feature: Featured listings search
  As a visitor
  I want to filter the featured listings
  So that I only see homes that match my criteria

  Background:
    Given I am on the featured listings page

  Scenario: Search featured listings by keyword
    When I search the featured listings for the longest listing title shown
    Then every listing title should contain the searched title

  Scenario: Filter featured listings by bedrooms
    When I filter the featured listings to 3 or more bedrooms
    Then every listing shown should have at least 3 bedrooms

  Scenario: Filter featured listings by city
    When I search the featured listings for the city "Galewood"
    Then every listing should show the city "Galewood"

  Scenario: Filter featured listings by price range
    When I search the featured listings for prices from 1000000 to 10000000
    Then the results should be filtered by prices from 1000000 to 10000000
