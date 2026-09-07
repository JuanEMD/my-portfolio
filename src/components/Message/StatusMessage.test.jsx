import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusMessage from "./StatusMessage";

describe("StatusMessage", () => {
  describe("rendering", () => {
    test("renders message text", () => {
      render(<StatusMessage message="Something went wrong" />);
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    test("renders small element", () => {
      render(<StatusMessage message="Error" />);
      expect(screen.getByText("Error").tagName).toBe("SMALL");
    });

    test("applies custom className", () => {
      render(<StatusMessage message="Error" className="mt-4" />);
      expect(screen.getByText("Error")).toHaveClass("mt-4");
    });

    test("renders empty when message is undefined", () => {
      const { container } = render(<StatusMessage message={undefined} />);
      expect(container.firstChild).toBeEmptyDOMElement();
    });

    test("renders empty when message is empty string", () => {
      const { container } = render(<StatusMessage message="" />);
      expect(container.firstChild).toBeEmptyDOMElement();
    });
  });

  describe("type error (default)", () => {
    test("has role alert", () => {
      render(<StatusMessage message="Error" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    test("has aria-live assertive", () => {
      render(<StatusMessage message="Error" />);
      expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
    });

    test("applies error text color", () => {
      render(<StatusMessage message="Error" />);
      expect(screen.getByText("Error")).toHaveClass("text-red-500");
    });

    test("is default type when type prop omitted", () => {
      render(<StatusMessage message="Error" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("type success", () => {
    test("has role status", () => {
      render(<StatusMessage message="Sent" type="success" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("has aria-live polite", () => {
      render(<StatusMessage message="Sent" type="success" />);
      expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    });

    test("applies success text color", () => {
      render(<StatusMessage message="Sent" type="success" />);
      expect(screen.getByText("Sent")).toHaveClass("text-green-500");
    });
  });

  describe("unknown type", () => {
    test("falls back to error color class", () => {
      render(<StatusMessage message="Warn" type="warning" />);
      expect(screen.getByText("Warn")).toHaveClass("text-red-500");
    });

    test("gets status role for non-error types", () => {
      render(<StatusMessage message="Warn" type="warning" />);
      expect(screen.getByText("Warn")).toHaveAttribute("role", "status");
    });
  });

  describe("id prop", () => {
    test("renders id on element", () => {
      render(<StatusMessage message="Error" id="my-error" />);
      expect(screen.getByText("Error")).toHaveAttribute("id", "my-error");
    });

    test("does not render id when not provided", () => {
      render(<StatusMessage message="Error" />);
      expect(screen.getByText("Error")).not.toHaveAttribute("id");
    });
  });

  describe("min height", () => {
    test("has min-h-5 class for layout stability", () => {
      render(<StatusMessage message="Error" />);
      expect(screen.getByText("Error")).toHaveClass("min-h-5");
    });
  });
});
