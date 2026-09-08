import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LinkButton from "./LinkButton";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

describe("LinkButton", () => {
  test("renders a link with the url as href", () => {
    render(<LinkButton url="/projects">Preview</LinkButton>);
    expect(screen.getByRole("link", { name: "Preview" })).toHaveAttribute("href", "/projects");
  });

  test("renders children", () => {
    render(<LinkButton url="/projects"><span>Icon</span></LinkButton>);
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("applies target attribute", () => {
    render(<LinkButton url="/projects" target="_blank">Preview</LinkButton>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  test("spreads the props object onto the link", () => {
    render(<LinkButton url="/projects" props={{ download: true }}>Preview</LinkButton>);
    expect(screen.getByRole("link")).toHaveAttribute("download");
  });

  test("has button styling classes", () => {
    render(<LinkButton url="/projects">Preview</LinkButton>);
    expect(screen.getByRole("link")).toHaveClass("bg-btn-bg");
    expect(screen.getByRole("link")).toHaveClass("rounded-lg");
  });
});