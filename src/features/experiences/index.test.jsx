import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Experiences from "./index";

vi.mock("./ExperienceCard", () => ({
  default: () => <div data-testid="experience-card" />,
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

  test("does not crash when experiences is undefined", () => {
    render(<Experiences />);
    expect(screen.queryByTestId("experience-card")).not.toBeInTheDocument();
  });

  test("does not render cards when experiences is empty", () => {
    render(<Experiences experiences={[]} />);
    expect(screen.queryByTestId("experience-card")).not.toBeInTheDocument();
  });
});