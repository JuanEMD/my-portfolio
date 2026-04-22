export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formValidations = (formData) => {
  const errors = {};

  if (!formData?.firstName) {
    errors.firstName = "contact.form.validation.firstNameRequired";
  }

  if (!formData?.lastName) {
    errors.lastName = "contact.form.validation.lastNameRequired";
  }

  if (!formData?.email) {
    errors.email = "contact.form.validation.emailRequired";
  } else if (!validateEmail(formData.email)) {
    errors.email = "contact.form.validation.emailInvalid";
  }

  if (!formData?.message) {
    errors.message = "contact.form.validation.messageRequired";
  }

  return errors;
};
