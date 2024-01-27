Feature: Order Management

  Scenario: Retrieve all list orders
    Given initial all list order
    When I make a request to "/api/order"
    Then the result should return body success
    And the response body should return all orders available