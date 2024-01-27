Feature: Order Search with Filters

Scenario: Searching orders with a specific filter
  Given the order list is available
  When I make a filtered request to "/api/order" with "status=READY"
  Then the result should return success
  And the response body should contain only orders with status "READY"
