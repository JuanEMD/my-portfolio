import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import IconWithContainer from "./index";

vi.mock("next/image", () => ({
  default: (props) => <div data-testid="mock-image" {...props} />,
}));

describe("IconWithContainer", () => {
  test("renders image with icon src when icon provided", () => {
    render(<IconWithContainer icon="icons/foo.svg" name="Foo" />);
    expect(screen.getByTestId("mock-image")).toHaveAttribute("src", "icons/foo.svg");
  });

  test("renders image with name as alt", () => {
    render(<IconWithContainer icon="icons/foo.svg" name="Foo" />);
    expect(screen.getByTestId("mock-image")).toHaveAttribute("alt", "Foo");
  });

  test("applies custom iconWidth and iconHeight", () => {
    render(<IconWithContainer icon="icons/foo.svg" name="Foo" iconWidth={40} iconHeight={40} />);
    expect(screen.getByTestId("mock-image")).toHaveAttribute("width", "40");
    expect(screen.getByTestId("mock-image")).toHaveAttribute("height", "40");
  });

  test("uses default icon sizes when not provided", () => {
    render(<IconWithContainer icon="icons/foo.svg" name="Foo" />);
    expect(screen.getByTestId("mock-image")).toHaveAttribute("width", "20");
    expect(screen.getByTestId("mock-image")).toHaveAttribute("height", "20");
  });

  test("renders fallback div when icon not provided", () => {
    const { container } = render(<IconWithContainer name="Foo" />);
    expect(screen.queryByTestId("mock-image")).not.toBeInTheDocument();
    expect(container.querySelector(".w-20")).toBeInTheDocument();
  });
});