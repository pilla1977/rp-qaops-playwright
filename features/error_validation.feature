Feature: E-commerce Validation
  @Error_Validation
  Scenario: Validate user not able to login on providing incorrect login credentials
    Given a user is logged in to e-commerce application using "cetc.midnight1@gmail.com" and "VZcom2014$"
    Then Incorrect login message should be displayed