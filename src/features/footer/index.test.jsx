import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./index";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/icons/Github", () => ({ default: () => null }));
vi.mock("@/components/icons/Linkedin", () => ({ default: () => null }));
vi.mock("@/components/icons/Mail", () => ({ default: () => null }));
vi.mock("@/components/icons/Phone", () => ({ default: () => null }));

const personalInfo = {
  linkedinUrl: "https://linkedin.com/in/ernesto",
  githubUrl: "https://github.com/ernesto",
  mail: "ernesto@example.com",
  phone: "+54 11 1234 5678",
};

describe("Footer", () => {
  test("renders the email", () => {
    render(<Footer personalInfo={personalInfo} />);
    expect(screen.getByText("ernesto@example.com")).toBeInTheDocument();
  });

  test("renders the phone", () => {
    render(<Footer personalInfo={personalInfo} />);
    expect(screen.getByText("+54 11 1234 5678")).toBeInTheDocument();
  });

  test("renders the LinkedIn link in a new tab", () => {
    render(<Footer personalInfo={personalInfo} />);
    const linkedin = screen.getByRole("link", { name: "footer.linkedinProfile" });
    expect(linkedin).toHaveAttribute("href", "https://linkedin.com/in/ernesto");
    expect(linkedin).toHaveAttribute("target", "_blank");
  });

  test("renders the GitHub link in a new tab", () => {
    render(<Footer personalInfo={personalInfo} />);
    const github = screen.getByRole("link", { name: "footer.githubProfile" });
    expect(github).toHaveAttribute("href", "https://github.com/ernesto");
    expect(github).toHaveAttribute("target", "_blank");
  });
});