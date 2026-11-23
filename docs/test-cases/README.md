# Test cases: traceability

New IDs start at TC-001. Each acceptance criterion in `docs/features/` has at least one test case. Test cases map one to one to the existing Cucumber scenarios (the create-listing outline counts as two, for UI and API).

| Requirement | Test cases | Automated |
|---|---|---|
| F-01 AC-01 | [TC-001](TC-001.md) | No |
| F-01 AC-02 | [TC-002](TC-002.md) | No |
| F-02 AC-01 | [TC-003](TC-003.md) | No |
| F-02 AC-02 | [TC-004](TC-004.md) | No |
| F-02 AC-03 | [TC-005](TC-005.md) | No |
| F-03 AC-01 | [TC-006](TC-006.md) | No |
| F-03 AC-02 | [TC-007](TC-007.md) | No |
| F-03 AC-03 | [TC-008](TC-008.md) | No |
| F-04 AC-01 | [TC-009](TC-009.md) | No |
| F-04 AC-02 | [TC-010](TC-010.md) | No |
| F-04 AC-03 | [TC-011](TC-011.md) | No |
| F-04 AC-04 | [TC-012](TC-012.md) | No |
| F-05 AC-01 | [TC-013](TC-013.md) | No |
| F-05 AC-02 | [TC-014](TC-014.md) | No |
| F-05 AC-03 | [TC-015](TC-015.md) | No |
| F-05 AC-04 | [TC-016](TC-016.md) | No |

Totals: 16 test cases. 16 have an existing automated test, and 0 have none. None are marked Automated yet; statuses are set after a recorded test run.

Notes:
- **Not automated: account scenarios (10 runs: TC-001, TC-002, TC-004, TC-006, TC-007, TC-008, TC-013, TC-014, TC-015, TC-016).** They need test-account credentials (`@requires-account`), so they are documented but deliberately not run in this documentation work.
- **Public scenarios (6: TC-003, TC-005, TC-009 to TC-012)** run with `npm run test:public`. TC-003 creates a real account on the third-party dev site.
