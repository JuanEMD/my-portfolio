import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperienceCard from "./ExperienceCard";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const experience = {
  company: "Acme Inc",
  position: "experiences.frontend",
  startDate: "2020",
  endDate: "2022",
  description: "experiences.frontend.description",
};

describe("ExperienceCard", () => {
  test("renders the position", () => {
    render(<ExperienceCard experience={experience} />);
    expect(screen.getByText("experiences.frontend")).toBeInTheDocument();
  });

  test("renders the company", () => {
    render(<ExperienceCard experience={experience} />);
    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
  });

  test("renders the date range", () => {
    render(<ExperienceCard experience={experience} />);
    expect(screen.getByText("2020 - 2022")).toBeInTheDocument();
  });

  test("renders the description", () => {
    render(<ExperienceCard experience={experience} />);
    expect(screen.getByText("experiences.frontend.description")).toBeInTheDocument();
  });
});