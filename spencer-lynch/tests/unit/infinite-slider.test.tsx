// spencer-lynch/tests/unit/infinite-slider.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

describe("InfiniteSlider", () => {
  it("renders its children", () => {
    render(
      <InfiniteSlider>
        <span>Alpha</span>
        <span>Beta</span>
      </InfiniteSlider>,
    );
    // Each child appears at least once (twice in DOM due to duplication)
    expect(screen.getAllByText("Alpha").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Beta").length).toBeGreaterThanOrEqual(1);
  });

  it("duplicates children for seamless loop", () => {
    render(
      <InfiniteSlider>
        <span>Solo</span>
      </InfiniteSlider>,
    );
    // The seamless-loop requires the children to be rendered exactly twice
    expect(screen.getAllByText("Solo").length).toBe(2);
  });

  it("hides the duplicate set from assistive tech", () => {
    const { container } = render(
      <InfiniteSlider>
        <span>Solo</span>
      </InfiniteSlider>,
    );
    // The aria-hidden duplicate must exist and contain the same children
    const ariaHidden = container.querySelector('[aria-hidden="true"]');
    expect(ariaHidden).not.toBeNull();
    expect(ariaHidden!.textContent).toContain("Solo");
  });

  it("applies a custom duration via CSS custom property", () => {
    const { container } = render(
      <InfiniteSlider duration={20}>
        <span>X</span>
      </InfiniteSlider>,
    );
    const track = container.querySelector(".animate-marquee") as HTMLElement;
    expect(track.style.getPropertyValue("--marquee-duration")).toBe("20s");
  });
});
