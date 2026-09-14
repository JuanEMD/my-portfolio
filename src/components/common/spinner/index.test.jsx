import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "./index";

describe("Spinner", () => {
  test("renders a status element", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("applies the medium size by default", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner.className).toContain("w-8");
    expect(spinner.className).toContain("h-8");
  });

  test("applies a custom size", () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner.className).toContain("w-12");
    expect(spinner.className).toContain("border-4");
  });

  test("uses Loading as the default aria-label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  test("renders an accessible label", () => {
    render(<Spinner label="Loading content" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading content");
    expect(screen.getByText("Loading content")).toBeInTheDocument();
  });

  test("forwards className", () => {
    const { container } = render(<Spinner className="mx-auto" />);
    expect(container.querySelector('[role="status"]')).toHaveClass("mx-auto");
  });

  test("forwards style", () => {
    const { container } = render(<Spinner style={{ color: "red" }} />);
    expect(container.querySelector('[role="status"]')).toHaveStyle("color: red");
  });
});