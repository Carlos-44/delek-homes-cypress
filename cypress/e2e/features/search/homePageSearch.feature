@search
Feature: Home page search
  As a visitor
  I want to search listings from the home page
  So that I can find homes that match what I need

  Background:
    Given I am on the Delek Homes home page

  Scenario: Search by keyword
    When I search the home page for the keyword "Your future house"
    Then I should be on the featured listings page
    And the search box should contain "Your future house"

  Scenario: Search by number of bedrooms
    When I search the home page for listings with 3 or more bedrooms
    Then every listing shown should have at least 3 bedrooms

  Scenario: Search by city
    When I search the home page for the city "Galewood"
    Then the results should be filtered by the city "Galewood"

  Scenario: Search by price range
    When I search the home page for prices from 1000000 to 10000000
    Then the price filter should show dollar amounts
