Feature: HttpBin StatusCodes
As a web developer

  Scenario: Check status code for GET
    Given a request
    When it is processed
    Then it should response with correct status code
    And it should contain the original url