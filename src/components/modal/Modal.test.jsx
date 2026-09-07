import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./index";

describe("Modal", () => {
  describe("rendering", () => {
    test("renders title", () => {
      render(<Modal title="Project Title">content</Modal>);
      expect(screen.getByText("Project Title")).toBeInTheDocument();
    });

    test("renders children", () => {
      render(
        <Modal title="Title">
          <p>Child content</p>
        </Modal>
      );
      expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    test("has role dialog", () => {
      render(<Modal title="Title">content</Modal>);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    test("has aria-modal true", () => {
      render(<Modal title="Title">content</Modal>);
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });

    test("aria-label matches title", () => {
      render(<Modal title="My Project">content</Modal>);
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "My Project");
    });
  });

  describe("close button", () => {
    test("renders close button with aria-label Close", () => {
      render(<Modal title="Title">content</Modal>);
      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });

    test("calls onClose when close button clicked", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      render(
        <Modal title="Title" onClose={onClose}>
          content
        </Modal>
      );
      await user.click(screen.getByRole("button", { name: "Close" }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("backdrop click", () => {
    test("calls onClose when backdrop clicked", () => {
      const onClose = vi.fn();
      render(
        <Modal title="Title" onClose={onClose}>
          content
        </Modal>
      );
      fireEvent.click(screen.getByRole("dialog"));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("does not call onClose when clicking inside panel", () => {
      const onClose = vi.fn();
      render(
        <Modal title="Title" onClose={onClose}>
          content
        </Modal>
      );
      const panel = screen.getByRole("dialog").firstChild;
      fireEvent.click(panel);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("escape key", () => {
    test("calls onClose when Escape is pressed", () => {
      const onClose = vi.fn();
      render(
        <Modal title="Title" onClose={onClose}>
          content
        </Modal>
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("does not call onClose for other keys", () => {
      const onClose = vi.fn();
      render(
        <Modal title="Title" onClose={onClose}>
          content
        </Modal>
      );
      fireEvent.keyDown(document, { key: "Enter" });
      expect(onClose).not.toHaveBeenCalled();
    });

    test("removes keydown listener on unmount", () => {
      const onClose = vi.fn();
      const { unmount } = render(
        <Modal title="Title" onClose={onClose}>
          content
        </Modal>
      );
      unmount();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("styles", () => {
    test("overlay is fixed and inset-0", () => {
      render(<Modal title="Title">content</Modal>);
      expect(screen.getByRole("dialog")).toHaveClass("fixed", "inset-0");
    });

    test("panel has rounded-2xl", () => {
      render(<Modal title="Title">content</Modal>);
      expect(screen.getByRole("dialog").firstChild).toHaveClass("rounded-2xl");
    });
  });

  describe("focus trap", () => {
    test("moves focus to close button when opened", () => {
      render(
        <Modal title="Title">
          <button>Inside</button>
        </Modal>
      );
      expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close" }));
    });

    test("moves focus to an element inside the dialog", () => {
      render(
        <Modal title="Title">
          <a href="#x">Link</a>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog.contains(document.activeElement)).toBe(true);
    });

    test("restores focus to previously focused element on unmount", () => {
      const opener = document.createElement("button");
      document.body.appendChild(opener);
      opener.focus();
      const { unmount } = render(<Modal title="Title">content</Modal>);
      unmount();
      expect(document.activeElement).toBe(opener);
      opener.remove();
    });

    test("wraps focus to first element when Tab pressed on last element", () => {
      render(
        <Modal title="Title">
          <button>First</button>
          <button>Last</button>
        </Modal>
      );
      const closeBtn = screen.getByRole("button", { name: "Close" });
      const lastBtn = screen.getByRole("button", { name: "Last" });
      lastBtn.focus();
      fireEvent.keyDown(document, { key: "Tab" });
      expect(document.activeElement).toBe(closeBtn);
    });

    test("wraps focus to last element when Shift+Tab pressed on first element", () => {
      render(
        <Modal title="Title">
          <button>First</button>
          <button>Last</button>
        </Modal>
      );
      const lastBtn = screen.getByRole("button", { name: "Last" });
      const closeBtn = screen.getByRole("button", { name: "Close" });
      closeBtn.focus();
      fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
      expect(document.activeElement).toBe(lastBtn);
    });

    test("does not trap Tab when focus is not on a boundary", () => {
      render(
        <Modal title="Title">
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </Modal>
      );
      const secondBtn = screen.getByRole("button", { name: "Second" });
      secondBtn.focus();
      fireEvent.keyDown(document, { key: "Tab" });
      expect(document.activeElement).toBe(secondBtn);
    });
  });
});