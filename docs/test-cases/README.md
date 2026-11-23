# Test cases: traceability

One manual test-case file per scenario run: 16 runs, from 15 scenario definitions plus the create-listing outline running twice. The 6 public scenarios are automated and passed locally. The 10 account runs (`@requires-account`) are Manual only, because they need account credentials. In CI they run only on manual (`workflow_dispatch`) runs.

| TC ID | Status | Automation file | Manual file |
|---|---|---|---|
| TC-001 | Manual only | `cypress/e2e/features/auth/login.feature` | [TC-001-user-signs-in-with-an-existing.md](TC-001-user-signs-in-with-an-existing.md) |
| TC-002 | Manual only | `cypress/e2e/features/auth/login.feature` | [TC-002-user-signs-out.md](TC-002-user-signs-out.md) |
| TC-003 | Automated | `cypress/e2e/features/auth/registration.feature` | [TC-003-new-visitor-registers-an-account.md](TC-003-new-visitor-registers-an-account.md) |
| TC-004 | Manual only | `cypress/e2e/features/auth/registration.feature` | [TC-004-registration-rejects-an-existing-email.md](TC-004-registration-rejects-an-existing-email.md) |
| TC-005 | Automated | `cypress/e2e/features/auth/registration.feature` | [TC-005-registration-requires-every-field.md](TC-005-registration-requires-every-field.md) |
| TC-006 | Manual only | `cypress/e2e/features/listings/createListing.feature` | [TC-006-admin-publishes-a-listing-after-ui.md](TC-006-admin-publishes-a-listing-after-ui.md) |
| TC-007 | Manual only | `cypress/e2e/features/listings/createListing.feature` | [TC-007-admin-publishes-a-listing-after-api.md](TC-007-admin-publishes-a-listing-after-api.md) |
| TC-008 | Manual only | `cypress/e2e/features/listings/listingApi.feature` | [TC-008-admin-creates-and-deletes-a-listing.md](TC-008-admin-creates-and-deletes-a-listing.md) |
| TC-009 | Automated | `cypress/e2e/features/search/homePageSearch.feature` | [TC-009-home-page-search-by-keyword.md](TC-009-home-page-search-by-keyword.md) |
| TC-010 | Automated | `cypress/e2e/features/search/homePageSearch.feature` | [TC-010-home-page-search-by-bedrooms.md](TC-010-home-page-search-by-bedrooms.md) |
| TC-011 | Automated | `cypress/e2e/features/search/homePageSearch.feature` | [TC-011-home-page-search-by-city.md](TC-011-home-page-search-by-city.md) |
| TC-012 | Automated | `cypress/e2e/features/search/homePageSearch.feature` | [TC-012-home-page-search-by-price-range.md](TC-012-home-page-search-by-price-range.md) |
| TC-013 | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` | [TC-013-featured-listings-filtered-by-keyword.md](TC-013-featured-listings-filtered-by-keyword.md) |
| TC-014 | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` | [TC-014-featured-listings-filtered-by-bedrooms.md](TC-014-featured-listings-filtered-by-bedrooms.md) |
| TC-015 | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` | [TC-015-featured-listings-filtered-by-city.md](TC-015-featured-listings-filtered-by-city.md) |
| TC-016 | Manual only | `cypress/e2e/features/search/featuredListingsSearch.feature` | [TC-016-featured-listings-filtered-by-price-range.md](TC-016-featured-listings-filtered-by-price-range.md) |

Totals: 16 test cases — 6 Automated, 10 Manual only, 0 Not started.
