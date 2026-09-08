import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "./index";

vi.mock("./ProjectCard", () => ({
  default: () => <div data-testid="project-card" />,
}));

const projects = [
  { title: "projects.portfolio.title" },
  { title: "projects.store.title" },
];

describe("Projects", () => {
  test("renders one card per project", () => {
    render(<Projects projects={projects} />);
    expect(screen.getAllByTestId("project-card")).toHaveLength(2);
  });

  test("does not crash when projects is undefined", () => {
    render(<Projects />);
    expect(screen.queryByTestId("project-card")).not.toBeInTheDocument();
  });

  test("does not render cards when projects is empty", () => {
    render(<Projects projects={[]} />);
    expect(screen.queryByTestId("project-card")).not.toBeInTheDocument();
  });
});