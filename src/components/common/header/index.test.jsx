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
});