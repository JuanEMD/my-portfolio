import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./index";

describe("Button", () => {
  describe("rendering", () => {
    test("renders children", () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    test("defaults type to button", () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    test("accepts custom type", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    test("applies custom className", () => {
      render(<Button className="mt-4">Submit</Button>);
      expect(screen.getByRole("button")).toHaveClass("mt-4");
    });
  });

  describe("click", () => {
    test("calls onClick when clicked", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={onClick}>Submit</Button>);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test("does not crash when onClick not provided", async () => {
      const user = userEvent.setup();
      render(<Button>Submit</Button>);
      await user.click(screen.getByRole("button"));
    });
  });

  describe("disabled", () => {
    test("sets disabled attribute when disabled is true", () => {
      render(<Button disabled>Submit</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    test("applies disabled styles", () => {
      render(<Button disabled>Submit</Button>);
      expect(screen.getByRole("button")).toHaveClass("opacity-50");
      expect(screen.getByRole("button")).toHaveClass("cursor-not-allowed");
    });

    test("is enabled by default", () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole("button")).toBeEnabled();
    });

    test("does not call onClick when disabled", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button disabled onClick={onClick}>Submit</Button>);
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("styles", () => {
    test("has base button classes", () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-btn-bg");
      expect(screen.getByRole("button")).toHaveClass("rounded-lg");
      expect(screen.getByRole("button")).toHaveClass("h-10");
    });
  });
});