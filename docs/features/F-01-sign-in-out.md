# F-01: Sign in and sign out
Status: Draft

## Summary (2 to 3 sentences)
Registered users sign in from the home page and land on a dashboard that shows their role. They can sign out from the profile menu.

## User story
As a registered user, I want to sign in and out, so that I can manage my account securely.

## Preconditions
- dev.delekhomes.com is reachable.
- A user test account exists (supplied at runtime, never committed).

## Functional requirements (FR-NN)
- FR-01: Signing in with valid credentials opens the dashboard showing "role: user".
- FR-02: Signing out from the profile menu shows "Sign in to Delek Homes".

## Acceptance criteria (AC-NN, each one testable)
- AC-01: Signing in as the user account shows the dashboard with "role: user".
- AC-02: Signing out shows the heading "Sign in to Delek Homes".

## Out of scope
- Password reset.
- Social login.

## Open questions
- Open question: Is there a negative sign-in case (a wrong password) worth adding?

## Source files this feature touches
- cypress/e2e/features/auth/login.feature
- cypress/support/step_definitions/auth.steps.js
- cypress/pages/loginPage.js
- cypress/pages/dashboardPage.js
- cypress/support/users.js
