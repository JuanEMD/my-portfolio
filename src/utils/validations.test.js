import { describe, test, expect } from "vitest";
import { validateEmail, formValidations } from "./validations";

describe("validateEmail", () => {
  test("should return true for valid emails", () => {
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("e.mail@example.com")).toBe(true);
    expect(validateEmail("user.mail@domain.com.do")).toBe(true);
  });

  test("should return false for invalid emails", () => {
    expect(validateEmail("email.com")).toBe(false);
    expect(validateEmail("email@com")).toBe(false);
    expect(validateEmail("email@.com")).toBe(false);
    expect(validateEmail("email@domain..com")).toBe(false);
    expect(validateEmail("email@domain...com")).toBe(false);
  });
});
