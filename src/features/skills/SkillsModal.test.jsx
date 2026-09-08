import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SkillsModal from "./SkillsModal";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../components/modal", () => ({
  default: ({ title, children }) => <div role="dialog" aria-label={title}>{children}</div>,
}));

const skills = {
  frontend: [{ name: "skills.react" }, { name: "skills.nextjs" }],
  backend: [{ name: "skills.nodejs" }],
};

describe("SkillsModal", () => {
  test("renders a dialog with the all skills title", () => {
    render(<SkillsModal skills={skills} onClose={() => {}} />);
    expect(screen.getByRole("dialog", { name: "skills.allSkills" })).toBeInTheDocument();
  });

  test("renders each category label", () => {
    render(<SkillsModal skills={skills} onClose={() => {}} />);
    expect(screen.getByText("skills.categories.frontend")).toBeInTheDocument();
    expect(screen.getByText("skills.categories.backend")).toBeInTheDocument();
  });

  test("renders each skill name", () => {
    render(<SkillsModal skills={skills} onClose={() => {}} />);
    expect(screen.getByText("skills.react")).toBeInTheDocument();
    expect(screen.getByText("skills.nextjs")).toBeInTheDocument();
    expect(screen.getByText("skills.nodejs")).toBeInTheDocument();
  });

  test("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<SkillsModal skills={skills} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("does not call onClose for other keys", () => {
    const onClose = vi.fn();
    render(<SkillsModal skills={skills} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
  });

  test("removes the keydown listener on unmount", () => {
    const onClose = vi.fn();
    const { unmount } = render(<SkillsModal skills={skills} onClose={onClose} />);
    unmount();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});