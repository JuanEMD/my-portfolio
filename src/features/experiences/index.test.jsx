import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Experiences from "./index";

vi.mock("./ExperienceCard", () => ({
  default: ({ className, style }) => <div data-testid="experience-card" className={className} style={style} />,
}));

const experiences = [
  { company: "Acme Inc", position: "experiences.frontend" },
  { company: "Globex", position: "experiences.fullstack" },
];

describe("Experiences", () => {
  test("renders one card per experience", () => {
    render(<Experiences experiences={experiences} />);
    expect(screen.getAllByTestId("experience-card")).toHaveLength(2);
  });

  test("applies the reveal class and a staggered delay to each card", () => {
    render(<Experiences experiences={experiences} />);
    const cards = screen.getAllByTestId("experience-card");
    cards.forEach((card, index) => {
      expect(card.className).toContain("experience-card");
      expect(card.className).toContain("opacity-0");
      expect(card.style.animationDelay).toBe(`${(index + 3) * 75}ms`);
    });
  });

  test("does not crash when experiences is undefined", () => {
    render(<Experiences />);
    expect(screen.queryByTestId("experience-card")).not.toBeInTheDocument();
  });

  test("does not render cards when experiences is empty", () => {
    render(<Experiences experiences={[]} />);
    expect(screen.queryByTestId("experience-card")).not.toBeInTheDocument();
  });
});