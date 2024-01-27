Feature: Create Order

  Scenario: Successfully create a new order
    Given the order data is ready
    When I make a POST request to "/api/order" with the order data
    Then the response should be successful
    And the response response payment is true
    And delete create order