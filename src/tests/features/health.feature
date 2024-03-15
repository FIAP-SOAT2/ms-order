Feature: Health Check API Endpoint

Scenario: The API should return a healthy status
    Given the server is running
    When I make a GET request to "/api/ms-order/health-check"
    Then the response status should be 200
    And the response should contain the text "OK"
    And the server stop
