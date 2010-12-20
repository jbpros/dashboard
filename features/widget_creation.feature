Feature: I can create a widget with additional info
	As a team member
	I can create a widget
	In order to display additional information

	Scenario: As the system boots it loads the first widgets and shows its version
		Given the dashboard is set up
		When I write a widget package
		And the system boots
		Then I can see my widget version