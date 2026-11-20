import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PolymerCodeChip from "./PolymerCodeChip";

vi.mock("next/image", () => ({
    default: ({ src, alt, className }) => (
        <div data-testid="polymercode-logo" src={src} alt={alt} className={className} />
    ),
}));

const defaultProps = {
    url: "https://polymercode.com",
    ariaLabel: "PolymerCode website",
};

describe("PolymerCodeChip", () => {
    test("opens the site in a new tab safely", () => {
        render(<PolymerCodeChip {...defaultProps} />);
        const link = screen.getByRole("link", { name: "PolymerCode website" });
        expect(link).toHaveAttribute("href", "https://polymercode.com");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("keeps a light background in both themes", () => {
        render(<PolymerCodeChip {...defaultProps} />);
        const link = screen.getByRole("link", { name: "PolymerCode website" });
        expect(link.className).toContain("bg-white");
        expect(link.className).toContain("dark:bg-gray-100");
        expect(link.className).toContain("hover:bg-gray-100");
        expect(link.className).toContain("dark:hover:bg-gray-200");
    });

    test("renders a visible arrow stroked with a dark theme color", () => {
        const { container } = render(<PolymerCodeChip {...defaultProps} />);
        const arrow = container.querySelector("svg");
        expect(arrow).toBeInTheDocument();
        expect(arrow).toHaveClass("stroke-pill-bg");
    });
});
