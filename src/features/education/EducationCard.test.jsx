import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EducationCard from "./EducationCard";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const education = {
  title: "education.cs",
  institution: "Tech University",
  startDate: "2015",
  endDate: "2019",
  countryName: "countries.argentina",
};

describe("EducationCard", () => {
  test("renders the education title", () => {
    render(<EducationCard education={education} />);
    expect(screen.getByText("education.cs")).toBeInTheDocument();
  });

  test("renders the institution", () => {
    render(<EducationCard education={education} />);
    expect(screen.getByText("Tech University")).toBeInTheDocument();
  });

  test("renders the date range", () => {
    render(<EducationCard education={education} />);
    expect(screen.getByText("2015 - 2019")).toBeInTheDocument();
  });

  test("renders the country name", () => {
    render(<EducationCard education={education} />);
    expect(screen.getByText("countries.argentina")).toBeInTheDocument();
  });

  test("merges the provided className and style into the card container", () => {
    const { container } = render(
      <EducationCard education={education} className="opacity-0 education-card" style={{ animationDelay: "75ms" }} />
    );
    expect(container.firstChild).toHaveClass("opacity-0", "education-card");
    expect(container.firstChild).toHaveStyle({ animationDelay: "75ms" });
  });
});