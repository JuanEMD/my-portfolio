import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./index";

describe("Header", () => {
  test("renders a header element", () => {
    const { container } = render(<Header title="Skills" />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  test("renders title in an h2", () => {
    render(<Header title="Skills" />);
    expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toBeInTheDocument();
  });

  test("forwards className to the h2", () => {
    render(<Header title="Skills" className="opacity-0" />);
    expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toHaveClass("opacity-0");
  });

  test("forwards style to the h2", () => {
    render(<Header title="Skills" style={{ animationDelay: "150ms" }} />);
    expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toHaveStyle("animation-delay: 150ms");
  });

  test("forwards id to the h2", () => {
    render(<Header title="Skills" id="skills-section-title" />);
    expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toHaveAttribute("id", "skills-section-title");
  });
});