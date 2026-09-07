import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectModal from "./ProjectModal";

const { highlightsMock } = vi.hoisted(() => ({
  highlightsMock: { value: ["Highlight 1", "Highlight 2"] },
}));

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({
    t: (key, opts) => {
      if (opts?.returnObjects) return highlightsMock.value;
      return key;
    },
  }),
}));

const baseProps = {
  title: "projects.project.title",
  description: "projects.project.description",
  highlightsKey: "projects.project.highlights",
  company: "Acme Corp",
  skills: [{ name: "React" }, { name: "Next.js" }],
  onClose: () => undefined,
};

describe("ProjectModal", () => {
  beforeEach(() => {
    highlightsMock.value = ["Highlight 1", "Highlight 2"];
  });

  describe("rendering", () => {
    test("renders translated title", () => {
      render(<ProjectModal {...baseProps} />);
      expect(screen.getByText("projects.project.title")).toBeInTheDocument();
    });

    test("renders translated description", () => {
      render(<ProjectModal {...baseProps} />);
      expect(screen.getByText("projects.project.description")).toBeInTheDocument();
    });

    test("renders company name", () => {
      render(<ProjectModal {...baseProps} />);
      expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    });

    test("renders company icon", () => {
      const { container } = render(<ProjectModal {...baseProps} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("highlights", () => {
    test("renders each highlight from array", () => {
      highlightsMock.value = ["Highlight 1", "Highlight 2", "Highlight 3"];
      render(<ProjectModal {...baseProps} />);
      expect(screen.getByText("Highlight 1")).toBeInTheDocument();
      expect(screen.getByText("Highlight 2")).toBeInTheDocument();
      expect(screen.getByText("Highlight 3")).toBeInTheDocument();
    });

    test("renders list role when highlights present", () => {
      render(<ProjectModal {...baseProps} />);
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    test("does not render list when highlights is empty array", () => {
      highlightsMock.value = [];
      render(<ProjectModal {...baseProps} />);
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    test("does not render list when highlights is not an array", () => {
      highlightsMock.value = "not-an-array";
      render(<ProjectModal {...baseProps} />);
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("skills", () => {
    test("renders a pill for each skill", () => {
      render(<ProjectModal {...baseProps} />);
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Next.js")).toBeInTheDocument();
    });

    test("does not render pills when skills is undefined", () => {
      const { skills, ...propsWithoutSkills } = baseProps;
      render(<ProjectModal {...propsWithoutSkills} />);
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    test("does not render pills when skills is empty array", () => {
      render(<ProjectModal {...baseProps} skills={[]} />);
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });
  });

  describe("onClose", () => {
    test("calls onClose when close button clicked", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      render(<ProjectModal {...baseProps} onClose={onClose} />);
      await user.click(screen.getByRole("button", { name: "Close" }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("does not crash when onClose not provided", async () => {
      const user = userEvent.setup();
      render(<ProjectModal {...baseProps} onClose={undefined} />);
      await user.click(screen.getByRole("button", { name: "Close" }));
    });
  });
});