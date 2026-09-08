import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./index";

const { useThemeMock } = vi.hoisted(() => ({
  useThemeMock: vi.fn().mockReturnValue({ theme: "dark", toggleTheme: vi.fn() }),
}));

vi.mock("@/context/ThemeContext", () => ({
  useTheme: useThemeMock,
}));

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

vi.mock("@/components/icons/Sun", () => ({
  default: () => <div data-testid="icon-sun" />,
}));

vi.mock("@/components/icons/Moon", () => ({
  default: () => <div data-testid="icon-moon" />,
}));

vi.mock("../icons/Desktop", () => ({
  default: () => <div data-testid="icon-desktop" />,
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    useThemeMock.mockReset();
    useThemeMock.mockReturnValue({ theme: "dark", toggleTheme: vi.fn() });
  });

  test("renders Moon icon when theme is dark", () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-sun")).not.toBeInTheDocument();
  });

  test("renders switch-to-light label when theme is dark", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "theme.switchToLight" })).toBeInTheDocument();
  });

  test("renders Sun icon when theme is light", () => {
    useThemeMock.mockReturnValue({ theme: "light", toggleTheme: vi.fn() });
    render(<ThemeToggle />);
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-moon")).not.toBeInTheDocument();
  });

  test("renders switch-to-system label when theme is light", () => {
    useThemeMock.mockReturnValue({ theme: "light", toggleTheme: vi.fn() });
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "theme.switchToSystem" })).toBeInTheDocument();
  });

  test("renders Desktop icon when theme is system", () => {
    useThemeMock.mockReturnValue({ theme: "system", toggleTheme: vi.fn() });
    render(<ThemeToggle />);
    expect(screen.getByTestId("icon-desktop")).toBeInTheDocument();
  });

  test("renders switch-to-dark label when theme is system", () => {
    useThemeMock.mockReturnValue({ theme: "system", toggleTheme: vi.fn() });
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "theme.switchToDark" })).toBeInTheDocument();
  });

  test("calls toggleTheme when clicked", async () => {
    const toggleTheme = vi.fn();
    useThemeMock.mockReturnValue({ theme: "dark", toggleTheme });
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button"));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});