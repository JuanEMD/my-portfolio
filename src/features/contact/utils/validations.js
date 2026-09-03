import { validateEmail } from "../../../utils/validations";

export const formValidations = (formData) => {
  const errors = {};

  if (!formData?.firstName?.trim()) {
    errors.firstName = "contact.form.validation.firstNameRequired";
  }

  if (!formData?.lastName?.trim()) {
    errors.lastName = "contact.form.validation.lastNameRequired";
  }

  if (!formData?.email?.trim()) {
    errors.email = "contact.form.validation.emailRequired";
  } else if (!validateEmail(formData.email.trim())) {
    errors.email = "contact.form.validation.emailInvalid";
  }

  if (!formData?.message?.trim()) {
    errors.message = "contact.form.validation.messageRequired";
  }

  return errors;
};
