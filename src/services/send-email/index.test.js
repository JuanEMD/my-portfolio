import { describe, test, expect, vi, beforeEach } from "vitest";

const mockSend = vi.hoisted(() => vi.fn());

vi.mock("resend", () => {
  return {
    Resend: vi.fn(() => ({
      emails: {
        send: mockSend,
      },
    })),
  };
});

import { sendEmail } from "./index";

describe("sendEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const testData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    message: "Test message content",
  };

  describe("successful send", () => {
    test("returns success object when email sends", async () => {
      mockSend.mockResolvedValue({ error: null });

      const result = await sendEmail(testData);

      expect(result).toEqual({
        success: true,
        message: "Email sent successfully!",
      });
    });

    test("includes correct subject line", async () => {
      mockSend.mockResolvedValue({ error: null });

      await sendEmail(testData);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: "New contact form submission from John Doe",
        })
      );
    });

    test("formats HTML body correctly", async () => {
      mockSend.mockResolvedValue({ error: null });

      await sendEmail(testData);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining("John Doe"),
        })
      );
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining("john@example.com"),
        })
      );
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining("Test message content"),
        })
      );
    });

    test("sends to correct recipient", async () => {
      mockSend.mockResolvedValue({ error: null });

      await sendEmail(testData);

      expect(mockSend).toHaveBeenCalledWith({
        from: "onboarding@resend.dev",
        to: "juanernestomarmolejosdanis@gmail.com",
        subject: "New contact form submission from John Doe",
        html: expect.any(String),
      });
    });
  });

  describe("failed send", () => {
    test("returns error object when Resend API fails", async () => {
      mockSend.mockResolvedValue({ error: new Error("API error") });

      const result = await sendEmail(testData);

      expect(result).toEqual({
        success: false,
        message: "Failed to send email. Please try again later.",
      });
    });

    test("handles unexpected exceptions", async () => {
      mockSend.mockRejectedValue(new Error("Network error"));

      const result = await sendEmail(testData);

      expect(result).toEqual({
        success: false,
        message: "An error occurred while sending the email. Please try again later.",
      });
    });
  });

  describe("required props validation", () => {
    test("throws when firstName is missing", async () => {
      await expect(
        sendEmail({ lastName: "Doe", email: "a@b.com", message: "hi" })
      ).rejects.toThrow("All fields are required");
    });

    test("throws when lastName is missing", async () => {
      await expect(
        sendEmail({ firstName: "John", email: "a@b.com", message: "hi" })
      ).rejects.toThrow("All fields are required");
    });

    test("throws when email is missing", async () => {
      await expect(
        sendEmail({ firstName: "John", lastName: "Doe", message: "hi" })
      ).rejects.toThrow("All fields are required");
    });

    test("throws when message is missing", async () => {
      await expect(
        sendEmail({ firstName: "John", lastName: "Doe", email: "a@b.com" })
      ).rejects.toThrow("All fields are required");
    });

    test("throws when all props are missing", async () => {
      await expect(sendEmail({})).rejects.toThrow("All fields are required");
    });
  });
});
