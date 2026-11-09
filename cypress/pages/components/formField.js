// Shared by the sign-in and registration forms, which both use MUI text fields with a name attribute
class FormField {
  // Helper text MUI renders under a field, found from the field's name attribute
  error(fieldName) {
    return cy.get(`input[name="${fieldName}"]`).closest(".MuiFormControl-root").find(".MuiFormHelperText-root");
  }
}

export default new FormField();
