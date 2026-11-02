@listings @requires-account
Feature: Create a listing
  As a Delek Homes admin
  I want to publish property listings with photos
  So that buyers can find them through search

  Scenario Outline: Admin publishes a listing after signing in through the <method>
    Given I am signed in as the admin through the <method>
    When I publish a new listing with random property details and a photo
    Then I should be taken to the listings dashboard
    And I can find the listing through the home page search
    And the listing page shows its square footage, bedrooms, bathrooms and garage

    Examples:
      | method |
      | UI     |
      | API    |
