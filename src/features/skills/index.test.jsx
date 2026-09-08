import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Skills from "./index";

const { mainStackMock } = vi.hoisted(() => ({
  mainStackMock: [
    { name: "React", color: "#61dafb", letter: "R" },
    { name: "Next.js", color: "#000000", letter: "N" },
  ],
}));

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("../../constants/data", () => ({
  mainStack: mainStackMock,
}));

vi.mock("./StackCard", () => ({
  default: () => <div data-testid="stack-card" />,
}));

vi.mock("./SkillsModal", () => ({
  default: ({ onClose }) => (
    <div data-testid="mock-skills-modal">
      <button onClick={onClose}>close</button>
    </div>
  ),
}));

vi.mock("../../components/icons/PlusCircle", () => ({ default: () => null }));

const skills = {
  frontend: [{ name: "skills.react" }, { name: "skills.nextjs" }],
  backend: [{ name: "skills.nodejs" }],
};

describe("Skills", () => {
  test("renders one StackCard per main stack item", () => {
    render(<Skills skills={skills} />);
    expect(screen.getAllByTestId("stack-card")).toHaveLength(2);
  });

  test("renders the all skills button", () => {
    render(<Skills skills={skills} />);
    expect(screen.getByRole("button", { name: /skills.allSkills/ })).toBeInTheDocument();
  });

  test("shows the total skills count in the badge", () => {
    render(<Skills skills={skills} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("does not render the modal initially", () => {
    render(<Skills skills={skills} />);
    expect(screen.queryByTestId("mock-skills-modal")).not.toBeInTheDocument();
  });

  test("opens the modal when the all skills button is clicked", async () => {
    const user = userEvent.setup();
    render(<Skills skills={skills} />);
    await user.click(screen.getByRole("button", { name: /skills.allSkills/ }));
    expect(screen.getByTestId("mock-skills-modal")).toBeInTheDocument();
  });

  test("closes the modal when onClose is called", async () => {
    const user = userEvent.setup();
    render(<Skills skills={skills} />);
    await user.click(screen.getByRole("button", { name: /skills.allSkills/ }));
    await user.click(screen.getByRole("button", { name: "close" }));
    expect(screen.queryByTestId("mock-skills-modal")).not.toBeInTheDocument();
  });
});