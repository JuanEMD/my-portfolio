import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LinkButtonWithIcon from "./LinkButtonWithIcon";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

describe("LinkButtonWithIcon", () => {
  test("renders a link with the url as href", () => {
    render(<LinkButtonWithIcon url="/linkedin" ariaLabel="LinkedIn"><svg /></LinkButtonWithIcon>);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "/linkedin");
  });

  test("renders children", () => {
    render(<LinkButtonWithIcon url="/github" ariaLabel="GitHub"><svg data-testid="icon" /></LinkButtonWithIcon>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("applies aria-label from ariaLabel prop", () => {
    render(<LinkButtonWithIcon url="/mail" ariaLabel="Send email">Icon</LinkButtonWithIcon>);
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Send email");
  });

  test("renders label text when label provided", () => {
    render(<LinkButtonWithIcon url="/mail" ariaLabel="Send email" label="Email">Icon</LinkButtonWithIcon>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("does not render label when label not provided", () => {
    render(<LinkButtonWithIcon url="/mail" ariaLabel="Send email">Icon</LinkButtonWithIcon>);
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
  });

  test("sets rel noopener noreferrer when target is _blank", () => {
    render(<LinkButtonWithIcon url="/linkedin" ariaLabel="LinkedIn" target="_blank">Icon</LinkButtonWithIcon>);
    expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("does not set rel when target is not _blank", () => {
    render(<LinkButtonWithIcon url="/mail" ariaLabel="Mail">Icon</LinkButtonWithIcon>);
    expect(screen.getByRole("link")).not.toHaveAttribute("rel");
  });

  test("applies target attribute", () => {
    render(<LinkButtonWithIcon url="/linkedin" ariaLabel="LinkedIn" target="_blank">Icon</LinkButtonWithIcon>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});