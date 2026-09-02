import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContactForm } from "./useContactForm";

describe("useContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    test("initializes with isPending false and empty currentState", () => {
      const { result } = renderHook(() => useContactForm());
      expect(result.current.isPending).toBe(false);
      expect(result.current.currentState).toEqual({});
    });
  });

  describe("successful submission", () => {
    test("calls API with correct data", async () => {
      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({ ok: true });
      const { result } = renderHook(() => useContactForm());

      const formData = { firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" };

      await act(async () => {
        await result.current.handleSubmit(formData);
      });

      expect(fetchSpy).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    });

    test("sets success state on 200 response", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({ ok: true });
      const { result } = renderHook(() => useContactForm());

      await act(async () => {
        await result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" });
      });

      expect(result.current.currentState.success).toBe(true);
      expect(result.current.currentState.message).toBe("contact.form.api.success");
    });

    test("calls onSuccess callback", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({ ok: true });
      const { result } = renderHook(() => useContactForm());
      const onSuccess = vi.fn();

      await act(async () => {
        await result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" }, onSuccess);
      });

      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe("failed submission", () => {
    test("sets error state on non-ok response", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({ ok: false });
      const { result } = renderHook(() => useContactForm());

      await act(async () => {
        await result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" });
      });

      expect(result.current.currentState.success).toBe(false);
      expect(result.current.currentState.message).toBe("contact.form.api.error");
    });

    test("does not call onSuccess on failure", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({ ok: false });
      const { result } = renderHook(() => useContactForm());
      const onSuccess = vi.fn();

      await act(async () => {
        await result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" }, onSuccess);
      });

      expect(onSuccess).not.toHaveBeenCalled();
    });
  });

  describe("network error", () => {
    test("handles network errors gracefully", async () => {
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));
      const { result } = renderHook(() => useContactForm());

      await act(async () => {
        await result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" });
      });

      expect(result.current.currentState.success).toBe(false);
      expect(result.current.currentState.message).toBe("contact.form.api.error");
    });
  });

  describe("loading state", () => {
    test("sets isPending to true during request", async () => {
      let resolveFetch;
      const fetchPromise = new Promise((resolve) => {
        resolveFetch = resolve;
      });
      vi.spyOn(global, "fetch").mockReturnValue(fetchPromise);
      const { result } = renderHook(() => useContactForm());

      let handleSubmitPromise;
      act(() => {
        handleSubmitPromise = result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" });
      });

      expect(result.current.isPending).toBe(true);

      await act(async () => {
        resolveFetch({ ok: true });
        await handleSubmitPromise;
      });

      expect(result.current.isPending).toBe(false);
    });

    test("sets isPending to false after request completes", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({ ok: true });
      const { result } = renderHook(() => useContactForm());

      await act(async () => {
        await result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" });
      });

      expect(result.current.isPending).toBe(false);
    });

    test("sets isPending to false even on error", async () => {
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));
      const { result } = renderHook(() => useContactForm());

      await act(async () => {
        await result.current.handleSubmit({ firstName: "John", lastName: "Doe", email: "john@example.com", message: "Test" });
      });

      expect(result.current.isPending).toBe(false);
    });
  });
});
