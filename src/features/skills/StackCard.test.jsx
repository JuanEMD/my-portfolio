import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StackCard from "./StackCard";

describe("StackCard", () => {
  test("renders the tech name", () => {
    render(<StackCard name="React" color="#61dafb" letter="R" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("renders the letter", () => {
    render(<StackCard name="React" color="#61dafb" letter="R" />);
    expect(screen.getByText("R")).toBeInTheDocument();
  });

  test("applies the accent color as a CSS variable", () => {
    const { container } = render(<StackCard name="React" color="#61dafb" letter="R" />);
    expect(container.firstChild.getAttribute("style")).toContain("--accent: #61dafb");
  });

  test("applies the animation delay", () => {
    const { container } = render(<StackCard name="React" color="#61dafb" letter="R" style={{ animationDelay: "75ms" }} />);
    expect(container.firstChild.getAttribute("style")).toContain("animation-delay: 75ms");
  });
});