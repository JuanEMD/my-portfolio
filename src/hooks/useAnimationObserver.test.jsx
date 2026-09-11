import { describe, test, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { useAnimationObserver } from "./useAnimationObserver";

let observerInstances = [];

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observed = [];
    this.unobserved = [];
    observerInstances.push(this);
  }

  observe(element) {
    this.observed.push(element);
  }

  unobserve(element) {
    this.unobserved.push(element);
  }

  disconnect() {}

  trigger(entries) {
    this.callback(entries, this);
  }
}

const Harness = ({ targets, children }) => {
  useAnimationObserver(targets);
  return children;
};

const lastObserver = () => observerInstances[observerInstances.length - 1];

beforeEach(() => {
  observerInstances = [];
  global.IntersectionObserver = MockIntersectionObserver;
});

describe("useAnimationObserver", () => {
  test("creates an IntersectionObserver with the given options", () => {
    render(
      <Harness
        targets={{ targetElements: [{ element: "card", identificatorType: "class" }], options: { rootMargin: "50px" } }}
      >
        <div className="card" />
      </Harness>
    );

    expect(lastObserver().options).toEqual({ rootMargin: "50px" });
  });

  test("observes every element matching the given class", () => {
    render(
      <Harness targets={{ targetElements: [{ element: "card", identificatorType: "class" }] }}>
        <div className="card">A</div>
        <div className="card">B</div>
        <div className="card">C</div>
      </Harness>
    );

    expect(lastObserver().observed.map((el) => el.textContent)).toEqual(["A", "B", "C"]);
  });

  test("observes a single element matching the given id", () => {
    render(
      <Harness targets={{ targetElements: [{ element: "hero", identificatorType: "id" }] }}>
        <div id="hero" />
        <div id="other" />
      </Harness>
    );

    expect(lastObserver().observed.map((el) => el.id)).toEqual(["hero"]);
  });

  test("adds the default animation class when a target intersects", () => {
    render(
      <Harness targets={{ targetElements: [{ element: "card", identificatorType: "class" }] }}>
        <div className="card" data-testid="card" />
      </Harness>
    );

    const target = lastObserver().observed[0];
    lastObserver().trigger([{ target, intersectionRatio: 0.5 }]);

    expect(target.classList.contains("animate-fade-up")).toBe(true);
  });

  test("adds the configured animation class for the matching target", () => {
    render(
      <Harness
        targets={{
          targetElements: [
            { element: "description", identificatorType: "id", animation: "animate-fade-right" },
            { element: "name", identificatorType: "id" },
          ],
        }}
      >
        <div id="description" data-testid="description" />
        <div id="name" data-testid="name" />
      </Harness>
    );

    lastObserver().trigger([{ target: document.getElementById("description"), intersectionRatio: 0.5 }]);
    lastObserver().trigger([{ target: document.getElementById("name"), intersectionRatio: 0.5 }]);

    expect(document.getElementById("description").classList.contains("animate-fade-right")).toBe(true);
    expect(document.getElementById("name").classList.contains("animate-fade-up")).toBe(true);
  });

  test("uses the configured animation for class targets", () => {
    render(
      <Harness
        targets={{
          targetElements: [{ element: "stack-skill-card", identificatorType: "class", animation: "animate-scale-in" }],
        }}
      >
        <div className="stack-skill-card" data-testid="card" />
      </Harness>
    );

    lastObserver().trigger([{ target: lastObserver().observed[0], intersectionRatio: 1 }]);

    expect(lastObserver().observed[0].classList.contains("animate-scale-in")).toBe(true);
  });

  test("unobserves the target after it animates", () => {
    render(
      <Harness targets={{ targetElements: [{ element: "card", identificatorType: "class" }] }}>
        <div className="card" />
      </Harness>
    );

    const target = lastObserver().observed[0];
    lastObserver().trigger([{ target, intersectionRatio: 0.5 }]);

    expect(lastObserver().unobserved).toContain(target);
  });

  test("does not animate targets that are not intersecting", () => {
    render(
      <Harness targets={{ targetElements: [{ element: "card", identificatorType: "class" }] }}>
        <div className="card" data-testid="card" />
      </Harness>
    );

    const target = lastObserver().observed[0];
    lastObserver().trigger([{ target, intersectionRatio: 0 }]);

    expect(target.classList.contains("animate-fade-up")).toBe(false);
    expect(lastObserver().unobserved).not.toContain(target);
  });
});