import { describe, test, expect } from "vitest";
import { validateEmail, formValidations } from "./validations";

describe("validateEmail", () => {
  test("should return true for valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("e.mail@example.com")).toBe(true);
    expect(validateEmail("user.mail@domain.com.do")).toBe(true);
    expect(validateEmail('user+tag@example.com')).toBe(true);

  });

  test("should return false for invalid emails", () => {
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("email.com")).toBe(false);
    expect(validateEmail("email@com")).toBe(false);
    expect(validateEmail("email@.com")).toBe(false);
    expect(validateEmail("email@domain..com")).toBe(false);
    expect(validateEmail("email@domain...com")).toBe(false);
    expect(validateEmail("email@domain .com")).toBe(false);
  });
});

describe("formValidations", () => {
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
