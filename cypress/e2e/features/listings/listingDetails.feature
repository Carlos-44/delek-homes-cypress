@listings
Feature: Listing details
  As a visitor
  I want to open a listing from the featured listings
  So that I can see the full details of a home

  Scenario: Listing page matches the card it was opened from
    Given I am on the featured listings page
    When I open the first listing shown
    Then I should see the same title, square footage, bedrooms, bathrooms and garage as its card
