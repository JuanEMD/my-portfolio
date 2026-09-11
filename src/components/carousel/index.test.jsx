import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Carousel from "./index";

vi.mock("next/image", () => ({
  default: (props) => <div data-testid="mock-image" {...props} />,
}));

const items = [
  { title: "Certificate A", url: "/images/cert-a.png" },
  { title: "Certificate B", url: "/images/cert-b.png" },
];

describe("Carousel", () => {
  test("renders each item twice for the infinite scroll", () => {
    render(<Carousel items={items} />);
    expect(screen.getAllByTestId("mock-image")).toHaveLength(4);
  });

  test("renders image alt from item title", () => {
    render(<Carousel items={items} />);
    const alts = screen.getAllByTestId("mock-image").map((el) => el.getAttribute("alt"));
    expect(alts).toEqual(["Certificate A", "Certificate B", "Certificate A", "Certificate B"]);
  });

  test("renders image src from item url", () => {
    render(<Carousel items={items} />);
    const srcs = screen.getAllByTestId("mock-image").map((el) => el.getAttribute("src"));
    expect(srcs.every((src) => src === "/images/cert-a.png" || src === "/images/cert-b.png")).toBe(true);
  });

  test("renders nothing when items is undefined", () => {
    render(<Carousel />);
    expect(screen.queryAllByTestId("mock-image")).toHaveLength(0);
  });

  test("renders nothing when items is empty", () => {
    render(<Carousel items={[]} />);
    expect(screen.queryAllByTestId("mock-image")).toHaveLength(0);
  });

  test("forwards className and style to the container", () => {
    const { container } = render(<Carousel items={items} className="opacity-0 carousel" style={{ animationDelay: "150ms" }} />);
    const wrapper = container.querySelector(".carousel");
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain("opacity-0");
    expect(wrapper.style.animationDelay).toBe("150ms");
  });
});