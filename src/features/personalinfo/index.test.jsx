import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PersonalInfo from "./index";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, width, height, className }) => (
    <div data-testid="mock-image" src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/icons/Linkedin", () => ({ default: () => null }));
vi.mock("@/components/icons/Mail", () => ({ default: () => null }));
vi.mock("@/components/icons/Github", () => ({ default: () => null }));

const info = {
  name: "Ernesto",
  role: "roles.software",
  descriptionPart1: "I build ",
  descriptionHighlight: "great",
  descriptionPart2: " software",
  mail: "ernesto@example.com",
  linkedinUrl: "https://linkedin.com/in/ernesto",
  githubUrl: "https://github.com/ernesto",
};

describe("PersonalInfo", () => {
  test("renders the name", () => {
    render(<PersonalInfo info={info} />);
    expect(screen.getByText("Ernesto")).toBeInTheDocument();
  });

  test("renders the role", () => {
    render(<PersonalInfo info={info} />);
    expect(screen.getByText("roles.software")).toBeInTheDocument();
  });

  test("renders the description parts", () => {
    render(<PersonalInfo info={info} />);
    const paragraph = screen.getByText((_, node) => node.tagName === "P");
    expect(paragraph).toHaveTextContent("I build");
    expect(paragraph).toHaveTextContent("great");
    expect(paragraph).toHaveTextContent("software");
  });

  test("renders the profile picture with alt text", () => {
    render(<PersonalInfo info={info} />);
    const image = screen.getByTestId("mock-image");
    expect(image).toHaveAttribute("alt", "Profile picture");
  });

  test("renders the LinkedIn link in a new tab", () => {
    render(<PersonalInfo info={info} />);
    const linkedin = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedin).toHaveAttribute("href", "https://linkedin.com/in/ernesto");
    expect(linkedin).toHaveAttribute("target", "_blank");
  });

  test("renders the GitHub link in a new tab", () => {
    render(<PersonalInfo info={info} />);
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/ernesto");
    expect(github).toHaveAttribute("target", "_blank");
  });

  test("applies custom className", () => {
    const { container } = render(<PersonalInfo info={info} className="mt-10" />);
    expect(container.querySelector("div").className).toContain("mt-10");
  });
});