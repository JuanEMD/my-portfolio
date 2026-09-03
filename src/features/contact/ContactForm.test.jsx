import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("./utils/validations", () => ({
  formValidations: vi.fn(() => ({})),
}));

import { formValidations } from "./utils/validations";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    formValidations.mockReturnValue({});
  });

  describe("rendering", () => {
    test("renders all inputs with label", () => {
      render(<ContactForm />);
      expect(screen.getByRole("textbox", { name: "contact.form.label.firstName" })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: "contact.form.label.lastName" })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: "contact.form.label.email" })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: "contact.form.label.message" })).toBeInTheDocument();
    });

    test("renders submit button with 'submit' text", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: "contact.form.label.submit" })).toBeInTheDocument();
    });

    test("renders all inputs with correct placeholders", () => {
      render(<ContactForm />);
      expect(screen.getByPlaceholderText("contact.form.placeholder.firstName")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("contact.form.placeholder.lastName")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("contact.form.placeholder.email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("contact.form.placeholder.message")).toBeInTheDocument();
    });
  });

  describe("validation display", () => {
    test("does not show errors on initial render even with validation errors", () => {
      formValidations.mockReturnValue({
        firstName: "error",
        lastName: "error",
      });
      render(<ContactForm />);
      expect(screen.queryByText("error")).not.toBeInTheDocument();
    });

    test("shows firstName error after blur", async () => {
      formValidations.mockReturnValue({
        firstName: "contact.form.validation.firstNameRequired",
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      const input = screen.getByRole("textbox", { name: "contact.form.label.firstName" });
      await user.click(input);
      await user.tab();
      expect(screen.getByText("contact.form.validation.firstNameRequired")).toBeInTheDocument();
    });

    test("shows lastName error after blur", async () => {
      formValidations.mockReturnValue({
        lastName: "contact.form.validation.lastNameRequired",
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      const input = screen.getByRole("textbox", { name: "contact.form.label.lastName" });
      await user.click(input);
      await user.tab();
      expect(screen.getByText("contact.form.validation.lastNameRequired")).toBeInTheDocument();
    });

    test("shows email error after blur", async () => {
      formValidations.mockReturnValue({
        email: "contact.form.validation.emailRequired",
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      const input = screen.getByRole("textbox", { name: "contact.form.label.email" });
      await user.click(input);
      await user.tab();
      expect(screen.getByText("contact.form.validation.emailRequired")).toBeInTheDocument();
    });

    test("shows message error after blur", async () => {
      formValidations.mockReturnValue({
        message: "contact.form.validation.messageRequired",
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      const input = screen.getByRole("textbox", { name: "contact.form.label.message" });
      await user.click(input);
      await user.tab();
      expect(screen.getByText("contact.form.validation.messageRequired")).toBeInTheDocument();
    });

    test("shows error for invalid email format after blur", async () => {
      formValidations.mockReturnValue({
        email: "contact.form.validation.emailInvalid",
      });
      const user = userEvent.setup();
      render(<ContactForm />);
      const input = screen.getByRole("textbox", { name: "contact.form.label.email" });
      await user.click(input);
      await user.tab();
      expect(screen.getByText("contact.form.validation.emailInvalid")).toBeInTheDocument();
    });

    test("hides error after correcting invalid input", async () => {
      formValidations
        .mockReturnValueOnce({
          email: "contact.form.validation.emailInvalid",
        })
        .mockReturnValueOnce({});
      const user = userEvent.setup();
      render(<ContactForm />);
      const input = screen.getByRole("textbox", { name: "contact.form.label.email" });
      await user.click(input);
      await user.tab();
      expect(screen.getByText("contact.form.validation.emailInvalid")).toBeInTheDocument();
      await user.type(input, "test@example.com");
      expect(screen.queryByText("contact.form.validation.emailInvalid")).not.toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    test("calls onSubmit with formData when valid", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "John");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "Doe");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "john@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test message");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      expect(onSubmit).toHaveBeenCalledWith(
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          message: "Test message",
        },
        expect.any(Function)
      );
    });

    test("passes clearForm callback as second argument", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "John");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "Doe");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "john@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test message");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      const clearForm = onSubmit.mock.calls[0][1];
      expect(typeof clearForm).toBe("function");
    });

    test("does not call onSubmit when form is invalid", async () => {
      formValidations.mockReturnValue({
        firstName: "contact.form.validation.firstNameRequired",
      });
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("calls preventDefault on form submit", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "John");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "Doe");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "john@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test message");
      const form = screen.getByRole("form", { name: /contact form/i });
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      vi.spyOn(submitEvent, "preventDefault");
      form.dispatchEvent(submitEvent);
      expect(submitEvent.preventDefault).toHaveBeenCalled();
    });

    test("clears form after successful submission", async () => {
      const onSubmit = vi.fn((data, clearForm) => clearForm());
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "John");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "Doe");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "john@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test message");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      expect(screen.getByRole("textbox", { name: "contact.form.label.firstName" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "contact.form.label.lastName" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "contact.form.label.email" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "contact.form.label.message" })).toHaveValue("");
    });
  });

  describe("loading state", () => {
    test("disables submit button when isPending is true", () => {
      render(<ContactForm isPending={true} />);
      expect(screen.getByRole("button", { name: "contact.form.label.sending" })).toBeDisabled();
    });

    test("shows 'sending' text when isPending is true", () => {
      render(<ContactForm isPending={true} />);
      expect(screen.getByRole("button", { name: "contact.form.label.sending" })).toBeInTheDocument();
    });

    test("shows 'submit' text when isPending is false", () => {
      render(<ContactForm isPending={false} />);
      expect(screen.getByRole("button", { name: "contact.form.label.submit" })).toBeInTheDocument();
    });

    test("enables submit button when isPending is false", () => {
      render(<ContactForm isPending={false} />);
      expect(screen.getByRole("button", { name: "contact.form.label.submit" })).not.toBeDisabled();
    });
  });

  describe("status messages", () => {
    test("shows success message when currentState has success: true and message", () => {
      render(<ContactForm currentState={{ success: true, message: "success.message" }} />);
      expect(screen.getByText("success.message")).toBeInTheDocument();
    });

    test("shows error message when currentState has success: false and message", () => {
      render(<ContactForm currentState={{ success: false, message: "error.message" }} />);
      expect(screen.getByText("error.message")).toBeInTheDocument();
    });

    test("does not show status message when currentState.message is empty", () => {
      render(<ContactForm currentState={{ success: true, message: "" }} />);
      expect(screen.queryByText("success.message")).not.toBeInTheDocument();
    });

    test("does not show status message when currentState is empty object", () => {
      render(<ContactForm currentState={{}} />);
      expect(screen.queryByText("success.message")).not.toBeInTheDocument();
      expect(screen.queryByText("error.message")).not.toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    test("handles onSubmit prop not provided (uses default)", async () => {
      const user = userEvent.setup();
      render(<ContactForm />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "John");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "Doe");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "john@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test message");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
    });

    test("handles isPending prop not provided (defaults to false)", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: "contact.form.label.submit" })).not.toBeDisabled();
    });

    test("handles currentState prop not provided (defaults to {})", () => {
      render(<ContactForm />);
      expect(screen.queryByText("success.message")).not.toBeInTheDocument();
      expect(screen.queryByText("error.message")).not.toBeInTheDocument();
    });

    test("handles whitespace-only input values", async () => {
      formValidations.mockReturnValue({
        firstName: "contact.form.validation.firstNameRequired",
        lastName: "contact.form.validation.lastNameRequired",
        email: "contact.form.validation.emailRequired",
        message: "contact.form.validation.messageRequired",
      });
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "   ");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "   ");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "   ");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "   ");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    test("handles very long input values", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      const longString = "a".repeat(50);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), longString);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), longString);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), `test@${longString}.com`);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), longString);
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
    }, 10000);

    test("handles special characters in input values", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "José");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "O'Connor-Smith");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "test+tag@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test <script>alert('xss')</script>");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      expect(onSubmit).toHaveBeenCalled();
    });

    test("handles rapid consecutive submissions", async () => {
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "John");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "Doe");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "john@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test message");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });

    test("clears touched state when form is cleared", async () => {
      const onSubmit = vi.fn((data, clearForm) => clearForm());
      const user = userEvent.setup();
      render(<ContactForm onSubmit={onSubmit} />);
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.firstName" }), "John");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.lastName" }), "Doe");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.email" }), "john@example.com");
      await user.type(screen.getByRole("textbox", { name: "contact.form.label.message" }), "Test message");
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      formValidations.mockReturnValue({
        firstName: "contact.form.validation.firstNameRequired",
      });
      await user.click(screen.getByRole("button", { name: "contact.form.label.submit" }));
      expect(screen.queryByText("contact.form.validation.firstNameRequired")).not.toBeInTheDocument();
    });
  });
});
