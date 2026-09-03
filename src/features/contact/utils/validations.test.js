import { describe, test, expect } from "vitest";
import { formValidations } from "./validations";

describe("formValidations", () => {
  test("should return error for firstName with only spaces", () => {
    const errors = formValidations({
      firstName: " ",
      lastName: "Doe",
      email: "test@test.com",
      message: "Message"
    });
    expect(errors).toHaveProperty("firstName");
  });

  test("should return error for email with only spaces", () => {
    const errors = formValidations({
      firstName: "John",
      lastName: "Doe",
      email: "   ",
      message: "Message"
    });
    expect(errors).toHaveProperty("email");
  });

  test("should return errors for all fields with multiple spaces", () => {
    const errors = formValidations({
      firstName: "   ",
      lastName: "   ",
      email: "   ",
      message: "   "
    });
    expect(Object.keys(errors)).toHaveLength(4);
  });

  test("should return exact error messages for empty fields", () => {
    const errors = formValidations({});
    expect(errors.firstName).toBe("contact.form.validation.firstNameRequired");
    expect(errors.lastName).toBe("contact.form.validation.lastNameRequired");
    expect(errors.email).toBe("contact.form.validation.emailRequired");
    expect(errors.message).toBe("contact.form.validation.messageRequired");
  });

  test("should handle null/undefined formData", () => {
    const errors = formValidations(null);
    expect(errors).toHaveProperty("firstName");
    expect(errors).toHaveProperty("lastName");
    expect(errors).toHaveProperty("email");
    expect(errors).toHaveProperty("message");
  });

  test("should return error for individual missing fields", () => {
    const errors1 = formValidations({
      lastName: "Doe",
      email: "test@test.com",
      message: "msg"
    });
    expect(errors1).toHaveProperty("firstName");
    expect(Object.keys(errors1)).toHaveLength(1);
  });

  test("should ignore extra properties in formData", () => {
    const errors = formValidations({
      firstName: "John",
      lastName: "Doe",
      email: "test@test.com",
      message: "Message",
      extraField: "should be ignored",
      anotherExtra: 123
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  test("should return multiple errors for multiple invalid fields", () => {
    const errors = formValidations({
      firstName: "",
      lastName: "",
      email: "invalid",
      message: ""
    });
    expect(Object.keys(errors)).toHaveLength(4);
  });

  test("should return errors for empty form", () => {
    const errors = formValidations({});
    expect(errors).toHaveProperty("firstName");
    expect(errors).toHaveProperty("lastName");
    expect(errors).toHaveProperty("email");
    expect(errors).toHaveProperty("message");
  });

  test("should return empty object for valid form", () => {
    const formData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      message: "Test message",
    };
    const errors = formValidations(formData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  test("should return email error for invalid email", () => {
    const formData = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      message: "Test message",
    };
    const errors = formValidations(formData);
    expect(errors).toHaveProperty("email");
  });
});
