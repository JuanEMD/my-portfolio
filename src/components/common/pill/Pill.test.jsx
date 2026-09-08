import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Pill from "./Pill";

describe("Pill", () => {
  test("renders the text", () => {
    render(<Pill text="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Pill text="React" className="border-accent" />);
    expect(screen.getByText("React")).toHaveClass("border-accent");
  });

  test("has base pill classes", () => {
    render(<Pill text="React" />);
    expect(screen.getByText("React")).toHaveClass("bg-pill-bg");
    expect(screen.getByText("React")).toHaveClass("rounded-xl");
  });
});