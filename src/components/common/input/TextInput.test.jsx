import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput from "./TextInput";

describe("TextInput", () => {
  describe("rendering", () => {
    test("renders label text", () => {
      render(<TextInput label="First Name" />);
      expect(screen.getByText("First Name")).toBeInTheDocument();
    });

    test("renders label as <label> element", () => {
      render(<TextInput label="First Name" />);
      expect(screen.getByText("First Name").tagName).toBe("LABEL");
    });

    test("renders input element", () => {
      render(<TextInput label="Name" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("applies placeholder", () => {
      render(<TextInput label="Name" placeholder="Enter name" />);
      expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
    });

    test("renders with value", () => {
      render(<TextInput label="Name" value="John" />);
      expect(screen.getByRole("textbox")).toHaveValue("John");
    });

    test("defaults type to text", () => {
      render(<TextInput label="Name" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    test("accepts custom type", () => {
      render(<TextInput label="Email" type="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });
  });

  describe("htmlFor / id association", () => {
    test("label htmlFor matches input id", () => {
      render(<TextInput label="Name" id="first-name" />);
      expect(screen.getByText("Name")).toHaveAttribute("for", "first-name");
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "first-name");
    });

    test("falls back to name when id is not provided", () => {
      render(<TextInput label="Name" name="firstName" />);
      expect(screen.getByText("Name")).toHaveAttribute("for", "firstName");
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "firstName");
    });

    test("id takes precedence over name", () => {
      render(<TextInput label="Name" id="custom-id" name="firstName" />);
      expect(screen.getByText("Name")).toHaveAttribute("for", "custom-id");
    });
  });

  describe("callbacks", () => {
    test("calls onChange with input value", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<TextInput label="Name" onChange={onChange} />);
      await user.type(screen.getByRole("textbox"), "A");
      expect(onChange).toHaveBeenCalledWith("A");
    });

    test("calls onBlur with input value", async () => {
      const onBlur = vi.fn();
      const user = userEvent.setup();
      render(<TextInput label="Name" onBlur={onBlur} />);
      await user.click(screen.getByRole("textbox"));
      await user.tab();
      expect(onBlur).toHaveBeenCalledWith("");
    });

    test("does not crash when onChange not provided", async () => {
      const user = userEvent.setup();
      render(<TextInput label="Name" />);
      await user.type(screen.getByRole("textbox"), "A");
      expect(screen.getByRole("textbox")).toHaveValue("A");
    });

    test("does not crash when onBlur not provided", async () => {
      const user = userEvent.setup();
      render(<TextInput label="Name" />);
      await user.click(screen.getByRole("textbox"));
      await user.tab();
    });
  });

  describe("required", () => {
    test("shows * indicator", () => {
      render(<TextInput label="Name" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    test("* has aria-hidden", () => {
      render(<TextInput label="Name" required />);
      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    });

    test("sets required attribute on input", () => {
      render(<TextInput label="Name" required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });

    test("sets aria-required on input", () => {
      render(<TextInput label="Name" required />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-required", "true");
    });

    test("does not show * when required is false", () => {
      render(<TextInput label="Name" />);
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    test("sets aria-invalid to true when error present", () => {
      render(<TextInput label="Name" error="Required" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    test("sets aria-describedby to errorId", () => {
      render(<TextInput label="Name" error="Required" errorId="name-error" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-describedby", "name-error");
    });

    test("aria-invalid is false when no error", () => {
      render(<TextInput label="Name" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
    });

    test("no aria-describedby when no error", () => {
      render(<TextInput label="Name" />);
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("autoComplete", () => {
    test("propagates autoComplete to input", () => {
      render(<TextInput label="Email" autoComplete="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("autocomplete", "email");
    });
  });

  describe("styles", () => {
    test("label has block display class", () => {
      render(<TextInput label="Name" />);
      expect(screen.getByText("Name")).toHaveClass("block");
    });

    test("input has block display class", () => {
      render(<TextInput label="Name" />);
      expect(screen.getByRole("textbox")).toHaveClass("block");
    });
  });
});
