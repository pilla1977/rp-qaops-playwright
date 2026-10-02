Feature: E-commerce Validation
  @E2E_Scenario
  Scenario: Place and Verify Order
    Given a user is logged in using "cetc.midnight1@gmail.com" and "VZcom2014$"
    When user adds and verify "ADIDAS ORIGINAL" in cart
    When enter valid details and place the Order
    Then Verify order is present in the Order History

  @Error_Validation
  Scenario: Validate user not able to login on providing incorrect login credentials
    Given a user is logged in to e-commerce application using "cetc.midnight1@gmail.com" and "VZcom2014$"
    Then Incorrect login message should be displayed