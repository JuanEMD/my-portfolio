import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./index";

vi.mock("./useContactForm", () => ({
  useContactForm: () => ({ handleSubmit: vi.fn(), isPending: false, currentState: {} }),
}));

vi.mock("./ContactForm", () => ({
  default: ({ className }) => <form data-testid="contact-form" className={className} />,
}));

describe("Contact", () => {
  test("applies the reveal class to the contact form", () => {
    render(<Contact />);
    const form = screen.getByTestId("contact-form");
    expect(form.className).toContain("contact-form");
    expect(form.className).toContain("opacity-0");
  });
});