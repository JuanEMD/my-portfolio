import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tooltip from "./index";

describe("Tooltip", () => {
  test("renders children", () => {
    render(<Tooltip text="Copy link"><button>Copy</button></Tooltip>);
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  test("renders tooltip text when provided", () => {
    render(<Tooltip text="Copy link"><button>Copy</button></Tooltip>);
    expect(screen.getByText("Copy link")).toBeInTheDocument();
  });

  test("does not render tooltip text when not provided", () => {
    render(<Tooltip><button>Copy</button></Tooltip>);
    expect(screen.queryByText("Copy link")).not.toBeInTheDocument();
  });

  test("has tooltip hover classes", () => {
    render(<Tooltip text="Copy link"><button>Copy</button></Tooltip>);
    expect(screen.getByText("Copy link")).toHaveClass("opacity-0");
    expect(screen.getByText("Copy link")).toHaveClass("group-hover:opacity-100");
  });
});