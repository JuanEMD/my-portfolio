import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Education from "./index";

vi.mock("@/components/carousel", () => ({
  default: () => <div data-testid="carousel" />,
}));

vi.mock("./EducationCard", () => ({
  default: () => <div data-testid="education-card" />,
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

  test("renders the certificates carousel", () => {
    render(<Education education={[]} certificates={[{ title: "Cert" }]} />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
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