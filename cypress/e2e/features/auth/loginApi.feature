@auth @api
Feature: Login API
  As an API client
  I want clear errors when I cannot get a token
  So that bad credentials are never accepted

  Scenario: The login API rejects an unknown email and password
    When I request an API token with an unknown email and password
    Then the API should respond with status 403
    And the API error messages should be:
      | Wrong email or password |

  Scenario: The login API requires an email and password
    When I request an API token without an email or password
    Then the API should respond with status 400
    And the API error messages should be:
      | email should not be empty    |
      | password should not be empty |
