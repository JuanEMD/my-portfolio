import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonWithIcon from "./ButtonWithIcon";

describe("ButtonWithIcon", () => {
  test("renders as a button", () => {
    render(<ButtonWithIcon ariaLabel="mail">Icon</ButtonWithIcon>);
    expect(screen.getByRole("button", { name: "mail" })).toBeInTheDocument();
  });

  test("renders children", () => {
    render(<ButtonWithIcon ariaLabel="mail"><svg data-testid="icon" /></ButtonWithIcon>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<ButtonWithIcon ariaLabel="mail" onClick={onClick}>Icon</ButtonWithIcon>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("does not crash without onClick", async () => {
    const user = userEvent.setup();
    render(<ButtonWithIcon ariaLabel="mail">Icon</ButtonWithIcon>);
    await user.click(screen.getByRole("button"));
  });

  test("applies aria-label from ariaLabel prop", () => {
    render(<ButtonWithIcon ariaLabel="chat">Icon</ButtonWithIcon>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "chat");
  });

  test("renders label text when label provided", () => {
    render(<ButtonWithIcon ariaLabel="mail" label="Email">Icon</ButtonWithIcon>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("does not render label when label not provided", () => {
    render(<ButtonWithIcon ariaLabel="mail">Icon</ButtonWithIcon>);
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<ButtonWithIcon ariaLabel="mail" className="w-10 h-10">Icon</ButtonWithIcon>);
    expect(screen.getByRole("button")).toHaveClass("w-10", "h-10");
  });
});