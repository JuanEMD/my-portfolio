import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Home from "./index";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("next-i18next/pages/serverSideTranslations", () => ({
  serverSideTranslations: vi.fn().mockResolvedValue({}),
}));

vi.mock("@/layouts", () => ({
  default: ({ children }) => <>{children}</>,
}));

vi.mock("@/features/personalinfo", () => ({ default: () => null }));
vi.mock("@/features/skills", () => ({ default: () => null }));
vi.mock("@/features/projects", () => ({ default: () => null }));
vi.mock("@/features/experiences", () => ({ default: () => null }));
vi.mock("@/features/education", () => ({ default: () => null }));
vi.mock("@/features/contact", () => ({ default: () => null }));

const sectionIds = ["skills", "projects", "experiences", "education", "contact"];

describe("Home", () => {
  test("renders a section-title heading for every section header", () => {
    const { container } = render(<Home />);
    sectionIds.forEach((section) => {
      expect(container.querySelector(`#${section}-section-title`)).toBeInTheDocument();
    });
  });

  test("starts each section title in the hidden reveal state", () => {
    const { container } = render(<Home />);
    sectionIds.forEach((section) => {
      expect(container.querySelector(`#${section}-section-title`).className).toContain("opacity-0");
    });
  });

  test("does not render a section title for personal-info", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("#personal-info-section-title")).not.toBeInTheDocument();
  });
});