import { describe, test, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "./ProjectCard";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@/components/icons/AppWindow", () => ({ default: () => null }));
vi.mock("../../components/icons/ArrowUpRight", () => ({ default: () => null }));

vi.mock("./ProjectModal", () => ({
  default: ({ title, onClose }) => (
    <div data-testid="mock-project-modal">
      <span>{title}</span>
      <button onClick={onClose}>close</button>
    </div>
  ),
}));

const project = {
  title: "projects.incident.title",
  description: "projects.incident.description",
  highlightsKey: "projects.incident.highlights",
  company: "Company Inc",
  skills: [{ name: "React" }, { name: "Next.js" }],
  imageUrl: null,
  projectUrl: "https://github.com/ernesto/incident",
};

describe("ProjectCard", () => {
  test("renders the project title", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("heading", { name: "projects.incident.title" })).toBeInTheDocument();
  });

  test("renders the project description", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText("projects.incident.description")).toBeInTheDocument();
  });

  test("renders the skills as pills", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  test("renders the preview link when projectUrl is present", () => {
    render(<ProjectCard project={project} />);
    const preview = screen.getByRole("link", { name: /Preview/ });
    expect(preview).toHaveAttribute("href", "https://github.com/ernesto/incident");
    expect(preview).toHaveAttribute("target", "_blank");
  });

  test("does not render the preview link when projectUrl is absent", () => {
    render(<ProjectCard project={{ ...project, projectUrl: null }} />);
    expect(screen.queryByRole("link", { name: /Preview/ })).not.toBeInTheDocument();
  });

  test("renders the view details button", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("button", { name: /projects.viewDetails/ })).toBeInTheDocument();
  });

  test("opens the modal when view details is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={project} />);
    await user.click(screen.getByRole("button", { name: /projects.viewDetails/ }));
    expect(screen.getByTestId("mock-project-modal")).toBeInTheDocument();
    expect(within(screen.getByTestId("mock-project-modal")).getByText("projects.incident.title")).toBeInTheDocument();
  });

  test("closes the modal when onClose is called", async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={project} />);
    await user.click(screen.getByRole("button", { name: /projects.viewDetails/ }));
    await user.click(screen.getByRole("button", { name: "close" }));
    expect(screen.queryByTestId("mock-project-modal")).not.toBeInTheDocument();
  });

  test("does not render the modal initially", () => {
    render(<ProjectCard project={project} />);
    expect(screen.queryByTestId("mock-project-modal")).not.toBeInTheDocument();
  });

  test("merges the provided className and style into the card", () => {
    const { container } = render(
      <ProjectCard project={project} className="opacity-0 project-card" style={{ animationDelay: "75ms" }} />
    );
    expect(container.firstChild).toHaveClass("opacity-0", "project-card");
    expect(container.firstChild).toHaveStyle({ animationDelay: "75ms" });
  });
});