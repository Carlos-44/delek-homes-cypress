# Test cases: traceability

One manual test-case file per scenario run: 16 runs, from 15 scenario definitions plus the create-listing outline running twice. The 6 public scenarios are automated and passed locally. The 10 account runs (`@requires-account`) are Manual only, because they need account credentials. In CI they run only on manual (`workflow_dispatch`) runs.

| TC ID | Feature | Status | Automation file — test name | Manual file |
|---|---|---|---|---|
| TC-001 | [F-01](../features/F-01-sign-in-out.md) | Manual only | `cypress/e2e/features/auth/login.feature` — [TC-001] User signs in with an existing account | [TC-001-user-signs-in-with-an-existing.md](TC-001-user-signs-in-with-an-existing.md) |
| TC-002 | [F-01](../features/F-01-sign-in-out.md) | Manual only | `cypress/e2e/features/auth/login.feature` — [TC-002] User signs out | [TC-002-user-signs-out.md](TC-002-user-signs-out.md) |
| TC-003 | [F-02](../features/F-02-registration.md) | Automated | `cypress/e2e/features/auth/registration.feature` — [TC-003] New visitor registers an account | [TC-003-new-visitor-registers-an-account.md](TC-003-new-visitor-registers-an-account.md) |
| TC-004 | [F-02](../features/F-02-registration.md) | Manual only | `cypress/e2e/features/auth/registration.feature` — [TC-004] Registration is rejected for an email that already exists | [TC-004-registration-rejects-an-existing-email.md](TC-004-registration-rejects-an-existing-email.md) |
| TC-005 | [F-02](../features/F-02-registration.md) | Automated | `cypress/e2e/features/auth/registration.feature` — [TC-005] Registration requires every field | [TC-005-registration-requires-every-field.md](TC-005-registration-requires-every-field.md) |
| TC-006 | [F-03](../features/F-03-listings.md) | Manual only | `cypress/e2e/features/listings/createListing.feature` — [TC-006/TC-007] Admin publishes a listing after signing in through the <method> (UI) | [TC-006-admin-publishes-a-listing-after-ui.md](TC-006-admin-publishes-a-listing-after-ui.md) |
| TC-007 | [F-03](../features/F-03-listings.md) | Manual only | `cypress/e2e/features/listings/createListing.feature` — [TC-006/TC-007] Admin publishes a listing after signing in through the <method> (API) | [TC-007-admin-publishes-a-listing-after-api.md](TC-007-admin-publishes-a-listing-after-api.md) |
| TC-008 | [F-03](../features/F-03-listings.md) | Manual only | `cypress/e2e/features/listings/listingApi.feature` — [TC-008]  | [TC-008-admin-creates-and-deletes-a-listing.md](TC-008-admin-creates-and-deletes-a-listing.md) |
| TC-009 | [F-04](../features/F-04-home-search.md) | Automated | `cypress/e2e/features/search/homePageSearch.feature` — [TC-009] Search by keyword | [TC-009-home-page-search-by-keyword.md](TC-009-home-page-search-by-keyword.md) |
| TC-010 | [F-04](../features/F-04-home-search.md) | Automated | `cypress/e2e/features/search/homePageSearch.feature` — [TC-010] Search by number of bedrooms | [TC-010-home-page-search-by-bedrooms.md](TC-010-home-page-search-by-bedrooms.md) |
| TC-011 | [F-04](../features/F-04-home-search.md) | Automated | `cypress/e2e/features/search/homePageSearch.feature` — [TC-011] Search by city | [TC-011-home-page-search-by-city.md](TC-011-home-page-search-by-city.md) |
| TC-012 | [F-04](../features/F-04-home-search.md) | Automated | `cypress/e2e/features/search/homePageSearch.feature` — [TC-012] Search by price range | [TC-012-home-page-search-by-price-range.md](TC-012-home-page-search-by-price-range.md) |
| TC-013 | [F-05](../features/F-05-featured-search.md) | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` — [TC-013] Search featured listings by keyword | [TC-013-featured-listings-filtered-by-keyword.md](TC-013-featured-listings-filtered-by-keyword.md) |
| TC-014 | [F-05](../features/F-05-featured-search.md) | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` — [TC-014] Filter featured listings by bedrooms | [TC-014-featured-listings-filtered-by-bedrooms.md](TC-014-featured-listings-filtered-by-bedrooms.md) |
| TC-015 | [F-05](../features/F-05-featured-search.md) | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` — [TC-015] Filter featured listings by city | [TC-015-featured-listings-filtered-by-city.md](TC-015-featured-listings-filtered-by-city.md) |
| TC-016 | [F-05](../features/F-05-featured-search.md) | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` — [TC-016] Filter featured listings by price range | [TC-016-featured-listings-filtered-by-price-range.md](TC-016-featured-listings-filtered-by-price-range.md) |

Totals: 16 test cases — 6 Automated, 10 Manual only, 0 Not started.
