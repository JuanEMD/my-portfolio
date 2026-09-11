import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Education from "./index";

vi.mock("@/components/carousel", () => ({
  default: ({ className, style }) => <div data-testid="carousel" className={className} style={style} />,
}));

vi.mock("./EducationCard", () => ({
  default: ({ className, style }) => <div data-testid="education-card" className={className} style={style} />,
}));

const education = [
  { title: "education.cs", institution: "Tech University" },
  { title: "education.master", institution: "Business School" },
];

describe("Education", () => {
  test("renders one card per education entry", () => {
    render(<Education education={education} certificates={[]} />);
    expect(screen.getAllByTestId("education-card")).toHaveLength(2);
  });

  test("applies the reveal class and a staggered delay to each card", () => {
    render(<Education education={education} certificates={[]} />);
    const cards = screen.getAllByTestId("education-card");
    cards.forEach((card, index) => {
      expect(card.className).toContain("education-card");
      expect(card.className).toContain("opacity-0");
      expect(card.style.animationDelay).toBe(`${(index + 3) * 75}ms`);
    });
  });

  test("renders the certificates carousel", () => {
    render(<Education education={[]} certificates={[{ title: "Cert" }]} />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  test("applies the reveal class and a staggered delay to the carousel", () => {
    render(<Education education={education} certificates={[{ title: "Cert" }]} />);
    const carousel = screen.getByTestId("carousel");
    expect(carousel.className).toContain("carousel");
    expect(carousel.className).toContain("opacity-0");
    expect(carousel.style.animationDelay).toBe(`${3 * 75}ms`);
  });

  test("does not crash when education is undefined", () => {
    render(<Education certificates={[]} />);
    expect(screen.queryByTestId("education-card")).not.toBeInTheDocument();
  });

  test("does not crash when certificates is undefined", () => {
    render(<Education education={[]} />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });
});