import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavLink from "./NavLink";

describe("NavLink", () => {
  describe("rendering", () => {
    test("renders children", () => {
      render(<NavLink href="#skills">Skills</NavLink>);
      expect(screen.getByRole("link", { name: "Skills" })).toBeInTheDocument();
    });

    test("renders anchor with href", () => {
      render(<NavLink href="#projects">Projects</NavLink>);
      expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
    });

    test("applies aria-label from label prop", () => {
      render(<NavLink href="#skills" label="nav.skills">Skills</NavLink>);
      expect(screen.getByRole("link", { name: "nav.skills" })).toBeInTheDocument();
    });

    test("applies custom className", () => {
      render(<NavLink href="#skills" className="w-full">Skills</NavLink>);
      expect(screen.getByRole("link", { name: "Skills" })).toHaveClass("w-full");
    });
  });

  describe("callbacks", () => {
    test("calls onClick when clicked", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<NavLink href="#skills" onClick={onClick}>Skills</NavLink>);
      await user.click(screen.getByRole("link", { name: "Skills" }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test("does not crash without onClick", async () => {
      const user = userEvent.setup();
      render(<NavLink href="#skills">Skills</NavLink>);
      await user.click(screen.getByRole("link", { name: "Skills" }));
    });
  });
});