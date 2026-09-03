import { describe, test, expect, vi, beforeEach } from "vitest";

const mockSendEmail = vi.hoisted(() => vi.fn());

vi.mock("@/services/send-email", () => ({
  sendEmail: mockSendEmail,
}));

import handler from "./contact";

const createMockReq = (method = "POST", body = {}) => ({
  method,
  body,
});

const createMockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validBody = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    message: "Test message",
  };

  describe("method validation", () => {
    test("returns 405 for GET requests", async () => {
      const req = createMockReq("GET");
      const res = createMockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
    });

    test("returns 405 for PUT requests", async () => {
      const req = createMockReq("PUT");
      const res = createMockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
    });

    test("returns 405 for DELETE requests", async () => {
      const req = createMockReq("DELETE");
      const res = createMockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
    });
  });

  describe("successful submission", () => {
    test("returns 200 on successful email send", async () => {
      mockSendEmail.mockResolvedValue({ success: true, message: "Email sent successfully!" });
      const req = createMockReq("POST", validBody);
      const res = createMockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("returns success message from sendEmail", async () => {
      mockSendEmail.mockResolvedValue({ success: true, message: "Email sent successfully!" });
      const req = createMockReq("POST", validBody);
      const res = createMockRes();

      await handler(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: "Email sent successfully!" });
    });

    test("calls sendEmail with correct data", async () => {
      mockSendEmail.mockResolvedValue({ success: true, message: "Email sent successfully!" });
      const req = createMockReq("POST", validBody);
      const res = createMockRes();

      await handler(req, res);

      expect(mockSendEmail).toHaveBeenCalledWith(validBody);
    });
  });

  describe("failed submission", () => {
    test("returns 500 when sendEmail fails", async () => {
      mockSendEmail.mockResolvedValue({ success: false, message: "Failed to send email. Please try again later." });
      const req = createMockReq("POST", validBody);
      const res = createMockRes();

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });

    test("returns error message from sendEmail", async () => {
      mockSendEmail.mockResolvedValue({ success: false, message: "Failed to send email. Please try again later." });
      const req = createMockReq("POST", validBody);
      const res = createMockRes();

      await handler(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: "Failed to send email. Please try again later." });
    });
  });

  describe("edge cases", () => {
    test("handles missing body fields gracefully", async () => {
      mockSendEmail.mockResolvedValue({ success: true, message: "Email sent successfully!" });
      const req = createMockReq("POST", {});
      const res = createMockRes();

      await handler(req, res);

      expect(mockSendEmail).toHaveBeenCalledWith({});
    });

    test("calls sendEmail exactly once", async () => {
      mockSendEmail.mockResolvedValue({ success: true, message: "Email sent successfully!" });
      const req = createMockReq("POST", validBody);
      const res = createMockRes();

      await handler(req, res);

      expect(mockSendEmail).toHaveBeenCalledTimes(1);
    });
  });
});
