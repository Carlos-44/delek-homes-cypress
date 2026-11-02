// Test user details come only from environment variables, never from committed files.
// Locally they're read from cypress.env.json (gitignored); in CI from GitHub Secrets
// exposed as CYPRESS_ADMIN_EMAIL, CYPRESS_USER_EMAIL, and so on.

const FIELDS = { email: "EMAIL", password: "PASSWORD", firstName: "FIRST_NAME", lastName: "LAST_NAME" };

function readUser(prefix) {
  const user = {};
  for (const [field, suffix] of Object.entries(FIELDS)) {
    const key = `${prefix}_${suffix}`;
    const value = Cypress.env(key);
    if (!value) {
      throw new Error(`Missing ${key}. Add it to cypress.env.json (see cypress.env.example.json) or set CYPRESS_${key}.`);
    }
    user[field] = value;
  }
  return user;
}

export function getUsers() {
  return { adminUser: readUser("ADMIN"), validUser: readUser("USER") };
}
