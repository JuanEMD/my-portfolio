import { describe, test, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./index";

vi.mock("next-i18next/pages", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("next/image", () => ({
  default: () => null,
}));

vi.mock("@/components/ThemeToggle.jsx", () => ({
  default: () => <button data-testid="theme-toggle">Theme</button>,
}));

const items = [
  { title: "skills", label: "nav.skills", href: "#skills" },
  { title: "projects", label: "nav.projects", href: "#projects" },
];

const homeLink = { title: "Home", label: "nav.home", href: "#home" };

describe("Navbar", () => {

  describe("desktop rendering", () => {
    test("renders all item links", () => {
      render(<Navbar items={items} />);
      expect(screen.getByRole("link", { name: "nav.skills" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "nav.projects" })).toBeInTheDocument();
    });

    test("renders home link when homeLink provided", () => {
      render(<Navbar homeLink={homeLink} items={items} />);
      expect(screen.getByRole("link", { name: "nav.home" })).toBeInTheDocument();
    });

    test("does not render home link when homeLink is null", () => {
      render(<Navbar items={items} />);
      expect(screen.queryByRole("link", { name: "nav.home" })).not.toBeInTheDocument();
    });

    test("renders language button", () => {
      render(<Navbar items={items} />);
      expect(screen.getByRole("button", { name: "nav.switchLanguage" })).toBeInTheDocument();
    });

    test("renders theme toggle", () => {
      render(<Navbar items={items} />);
      expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    });
  });

  describe("scroll reveal animations", () => {
    test("adds reveal class to the desktop home link", () => {
      const { container } = render(<Navbar homeLink={homeLink} items={items} />);
      const homeLinkEl = container.querySelector(".navbar-home-link");
      expect(homeLinkEl.className).toContain("opacity-0");
    });

    test("adds reveal class and staggered delays to desktop nav links", () => {
      const { container } = render(<Navbar items={items} />);
      const links = container.querySelectorAll(".navbar-nav-link");
      expect(links.length).toBe(2);
      links.forEach((link, index) => {
        expect(link.className).toContain("opacity-0");
        expect(link.style.animationDelay).toBe(`${index * 75}ms`);
      });
    });

    test("does not animate mobile nav links", () => {
      const { container } = render(<Navbar items={items} />);
      const mobileItems = container.querySelectorAll("#mobile-menu .navbar-nav-link");
      expect(mobileItems.length).toBe(0);
    });

    test("adds reveal class to the language button", () => {
      const { container } = render(<Navbar items={items} />);
      const langButton = container.querySelector(".navbar-lang-button");
      expect(langButton.className).toContain("opacity-0");
    });

    test("adds reveal class to the theme toggle", () => {
      const { container } = render(<Navbar items={items} />);
      const themeToggle = container.querySelector(".navbar-theme-toggle");
      expect(themeToggle.className).toContain("opacity-0");
    });
  });

  describe("mobile menu", () => {
    test("is hidden by default", () => {
      render(<Navbar items={items} />);
      expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    });

    test("opens when toggle clicked", async () => {
      const user = userEvent.setup();
      render(<Navbar items={items} />);
      await user.click(screen.getByRole("button", { name: "nav.openMenu" }));
      expect(document.getElementById("mobile-menu")).toBeInTheDocument();
    });

    test("sets aria-expanded true when open", async () => {
      const user = userEvent.setup();
      render(<Navbar items={items} />);
      await user.click(screen.getByRole("button", { name: "nav.openMenu" }));
      expect(screen.getByRole("button", { name: "nav.closeMenu" })).toHaveAttribute("aria-expanded", "true");
    });

    test("sets aria-controls to mobile-menu", () => {
      render(<Navbar items={items} />);
      expect(screen.getByRole("button", { name: "nav.openMenu" })).toHaveAttribute("aria-controls", "mobile-menu");
    });

    test("closes when toggle clicked again", async () => {
      const user = userEvent.setup();
      render(<Navbar items={items} />);
      await user.click(screen.getByRole("button", { name: "nav.openMenu" }));
      await user.click(screen.getByRole("button", { name: "nav.closeMenu" }));
      expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    });

    test("closes after clicking a mobile link", async () => {
      const user = userEvent.setup();
      render(<Navbar items={items} />);
      await user.click(screen.getByRole("button", { name: "nav.openMenu" }));
      const mobileMenu = document.getElementById("mobile-menu");
      await user.click(within(mobileMenu).getByRole("link", { name: "nav.skills" }));
      expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    });

    test("renders mobile item links", async () => {
      const user = userEvent.setup();
      render(<Navbar items={items} />);
      await user.click(screen.getByRole("button", { name: "nav.openMenu" }));
      const mobileMenu = document.getElementById("mobile-menu");
      expect(within(mobileMenu).getByRole("link", { name: "nav.skills" })).toBeInTheDocument();
      expect(within(mobileMenu).getByRole("link", { name: "nav.projects" })).toBeInTheDocument();
    });
  });

  describe("language button", () => {
    test("calls onLanguageChange when clicked", async () => {
      const onLanguageChange = vi.fn();
      const user = userEvent.setup();
      render(<Navbar items={items} onLanguageChange={onLanguageChange} />);
      await user.click(screen.getByRole("button", { name: "nav.switchLanguage" }));
      expect(onLanguageChange).toHaveBeenCalledTimes(1);
    });

    test("does not crash without onLanguageChange", async () => {
      const user = userEvent.setup();
      render(<Navbar items={items} />);
      await user.click(screen.getByRole("button", { name: "nav.switchLanguage" }));
    });
  });

  describe("edge cases", () => {
    test("does not crash with empty items", () => {
      render(<Navbar />);
      expect(screen.getByRole("button", { name: "nav.openMenu" })).toBeInTheDocument();
    });
  });
});