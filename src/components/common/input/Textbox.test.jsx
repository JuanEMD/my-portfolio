import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Textbox from "./Textbox";

describe("Textbox", () => {
  describe("rendering", () => {
    test("renders label text", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByText("Message")).toBeInTheDocument();
    });

    test("renders label as <label> element", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByText("Message").tagName).toBe("LABEL");
    });

    test("renders textarea element", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("textarea does not have type attribute", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByRole("textbox")).not.toHaveAttribute("type");
    });

    test("applies placeholder", () => {
      render(<Textbox label="Message" placeholder="Enter message" />);
      expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument();
    });

    test("renders with value", () => {
      render(<Textbox label="Message" value="Hello" />);
      expect(screen.getByRole("textbox")).toHaveValue("Hello");
    });
  });

  describe("htmlFor / id association", () => {
    test("label htmlFor matches textarea id", () => {
      render(<Textbox label="Message" id="home-message" />);
      expect(screen.getByText("Message")).toHaveAttribute("for", "home-message");
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "home-message");
    });

    test("falls back to name when id is not provided", () => {
      render(<Textbox label="Message" name="message" />);
      expect(screen.getByText("Message")).toHaveAttribute("for", "message");
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "message");
    });

    test("id takes precedence over name", () => {
      render(<Textbox label="Message" id="custom-id" name="message" />);
      expect(screen.getByText("Message")).toHaveAttribute("for", "custom-id");
    });
  });

  describe("callbacks", () => {
    test("calls onChange with textarea value", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Textbox label="Message" onChange={onChange} />);
      await user.type(screen.getByRole("textbox"), "Hello");
      expect(onChange).toHaveBeenCalledWith("Hello");
    });

    test("calls onBlur with textarea value", async () => {
      const onBlur = vi.fn();
      const user = userEvent.setup();
      render(<Textbox label="Message" value="Hi" onBlur={onBlur} />);
      await user.click(screen.getByRole("textbox"));
      await user.tab();
      expect(onBlur).toHaveBeenCalledWith("Hi");
    });

    test("does not crash when onChange not provided", async () => {
      const user = userEvent.setup();
      render(<Textbox label="Message" />);
      await user.type(screen.getByRole("textbox"), "A");
    });

    test("does not crash when onBlur not provided", async () => {
      const user = userEvent.setup();
      render(<Textbox label="Message" />);
      await user.click(screen.getByRole("textbox"));
      await user.tab();
    });
  });

  describe("required", () => {
    test("shows * indicator", () => {
      render(<Textbox label="Message" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    test("* has aria-hidden", () => {
      render(<Textbox label="Message" required />);
      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    });

    test("sets required attribute on textarea", () => {
      render(<Textbox label="Message" required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });

    test("sets aria-required on textarea", () => {
      render(<Textbox label="Message" required />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-required", "true");
    });

    test("does not show * when required is false", () => {
      render(<Textbox label="Message" />);
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    test("sets aria-invalid to true when error present", () => {
      render(<Textbox label="Message" error="Required" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    test("sets aria-describedby to errorId", () => {
      render(<Textbox label="Message" error="Required" errorId="message-error" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-describedby", "message-error");
    });

    test("aria-invalid is false when no error", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
    });

    test("no aria-describedby when no error", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("styles", () => {
    test("label has block display class", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByText("Message")).toHaveClass("block");
    });

    test("textarea has block display class", () => {
      render(<Textbox label="Message" />);
      expect(screen.getByRole("textbox")).toHaveClass("block");
    });
  });
});