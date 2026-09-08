import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeLink from "./HomeLink";

describe("HomeLink", () => {
  test("renders children", () => {
    render(<HomeLink href="#home">Logo</HomeLink>);
    expect(screen.getByRole("link", { name: "Logo" })).toBeInTheDocument();
  });

  test("renders anchor with href", () => {
    render(<HomeLink href="#home">Logo</HomeLink>);
    expect(screen.getByRole("link", { name: "Logo" })).toHaveAttribute("href", "#home");
  });

  test("applies aria-label from label prop", () => {
    render(<HomeLink href="#home" label="nav.home">Logo</HomeLink>);
    expect(screen.getByRole("link", { name: "nav.home" })).toBeInTheDocument();
  });

  test("applies hover scale class", () => {
    render(<HomeLink href="#home">Logo</HomeLink>);
    expect(screen.getByRole("link", { name: "Logo" })).toHaveClass("hover:scale-110");
  });
});