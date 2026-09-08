import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionContainer from "./index";

describe("SectionContainer", () => {
  test("renders a section element", () => {
    const { container } = render(<SectionContainer id="skills">Content</SectionContainer>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  test("sets id attribute on the section", () => {
    render(<SectionContainer id="skills">Content</SectionContainer>);
    expect(screen.getByText("Content").closest("section")).toHaveAttribute("id", "skills");
  });

  test("renders children", () => {
    render(<SectionContainer id="skills"><p>Content</p></SectionContainer>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<SectionContainer id="skills" className="pt-0!">Content</SectionContainer>);
    expect(screen.getByText("Content").closest("section")).toHaveClass("pt-0!");
  });

  test("has base layout classes", () => {
    render(<SectionContainer id="skills">Content</SectionContainer>);
    expect(screen.getByText("Content").closest("section")).toHaveClass("w-full", "pt-25");
  });

  test("does not add an undefined class when className is not provided", () => {
    render(<SectionContainer id="skills">Content</SectionContainer>);
    expect(screen.getByText("Content").closest("section").className).not.toContain("undefined");
  });
});