Feature: Update Order Status

  Scenario: Successfully create an order and update its status
    Given the order data is ready update
    When I make a POST request to "/api/order" with the order data for update
    Then the response should be successful for update
    And the response payment is true
    And I update the order status to "PENDING"
    Then the update response should be successful
    And the order status should be "PENDING"
    And delete created order
