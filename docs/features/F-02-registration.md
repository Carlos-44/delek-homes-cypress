# F-02: Registration
Status: Draft

## Summary (2 to 3 sentences)
Visitors create an account with a first name, last name, email and password, and land on the dashboard. The form requires every field and rejects an email that already exists.

## User story
As a new visitor, I want to create an account, so that I can save and manage listings.

## Preconditions
- dev.delekhomes.com is reachable.
- The registration form is open.

## Functional requirements (FR-NN)
- FR-01: Valid new details create an account and open the dashboard with "role: user".
- FR-02: Each empty field shows its required-field message.
- FR-03: An email that already exists is rejected with "Input data validation failed".

## Acceptance criteria (AC-NN, each one testable)
- AC-01: Registering with new random details opens the dashboard showing "role: user".
- AC-02: Registering with an existing account's details shows "Input data validation failed".
- AC-03: Submitting the empty form shows "First name required", "Last name required", "Email is required" and "Password is required".

## Out of scope
- Email verification.

## Open questions
- Open question: The site creates a real account on every run (gap G-1). Is there a cleanup path?

## Source files this feature touches
- cypress/e2e/features/auth/registration.feature
- cypress/support/step_definitions/auth.steps.js
- cypress/pages/registrationPage.js
