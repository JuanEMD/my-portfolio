import { describe, test, expect } from "vitest";
import { validateEmail } from "./validations";

describe("validateEmail", () => {
  test("should return true for valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("e.mail@example.com")).toBe(true);
    expect(validateEmail("user.mail@domain.com.do")).toBe(true);
    expect(validateEmail("user+tag@example.com")).toBe(true);
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

  test("should accept emails with numbers, hyphens, and underscores", () => {
    expect(validateEmail("user123@domain456.com")).toBe(true);
    expect(validateEmail("user-name@example.com")).toBe(true);
    expect(validateEmail("user_name@example.com")).toBe(true);
  });

  test("should accept emails with long TLDs", () => {
    expect(validateEmail("user@example.photography")).toBe(true);
    expect(validateEmail("user@example.international")).toBe(true);
  });

  test("should accept emails with multiple subdomains", () => {
    expect(validateEmail("user@sub.sub2.sub3.example.com")).toBe(true);
  });

  test("should reject emails with spaces", () => {
    expect(validateEmail(" user@example.com")).toBe(false);
    expect(validateEmail("user@example.com ")).toBe(false);
    expect(validateEmail("user @example.com")).toBe(false);
  });

  test("should reject emails with multiple @ symbols", () => {
    expect(validateEmail("user@@example.com")).toBe(false);
    expect(validateEmail("user@name@example.com")).toBe(false);
  });

  test("should reject emails with problematic dots", () => {
    expect(validateEmail("@example.com")).toBe(false);
    expect(validateEmail("user@")).toBe(false);
    expect(validateEmail("user@domain.com.")).toBe(false);
    expect(validateEmail(".user@example.com")).toBe(false);
    expect(validateEmail("user.@example.com")).toBe(false);
  });
});
