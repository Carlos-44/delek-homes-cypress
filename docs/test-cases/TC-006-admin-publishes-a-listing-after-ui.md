# TC-006: Admin publishes a listing after UI sign-in

- **Priority:** P1
- **Type:** functional
- **Linked criteria:** F-03 AC-01
- **Status:** Manual only
- **Automation:** Manual only: needs account credentials. Automated scenario exists in `cypress/e2e/features/listings/createListing.feature`, but it isn't run in PR or push CI or in this documentation work.

## Preconditions
- Admin test account available.

## Test data
- Test-account credentials, supplied at runtime from `cypress.env.json` or GitHub Secrets. Not reproduced here.

## Steps
| # | Action | Expected result |
|---|---|---|
| 1 | Sign in as the admin through the UI. | The step completes without an error. [INFERRED] |
| 2 | Publish a listing with random details and a photo. | The step completes without an error. [INFERRED] |
| 3 | Search for it from the home page. | The step completes without an error. [INFERRED] |
| 4 | Open the listing. | The listings dashboard opens, the listing is found, and its page shows sq ft, bedrooms, bathrooms and garage. |

**Pass criteria:** The listings dashboard opens, the listing is found, and its page shows sq ft, bedrooms, bathrooms and garage.

## Notes
- It also creates a listing on the third-party site and doesn't clean it up [INFERRED].
