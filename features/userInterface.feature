Feature: User Interface Test

	Scenario: Check card number
		Given I navigate to home page
		When I click the link to next page
		Then Card 1 is open
		When I input "Password123", "abcd", "gmail" and accept the terms of use and click next button
		Then Card 2 is open
		When I choose 2 random interests, upload image and click next button
		Then Card 3 is open

	Scenario: Hide help form
		Given I navigate to home page
		When I hide help form
		Then Form content is hidden

	Scenario: Accept cookies
		Given I navigate to home page
		When I accept cookies
		Then Form is closed

	Scenario: validate timer
		Given I navigate to home page
		Then Timer starts from 00:00:00