// spencer-lynch/tests/unit/progressive-blur.test.tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

describe("ProgressiveBlur", () => {
  it("renders one element per side requested", () => {
    const { container } = render(<ProgressiveBlur side="left" />);
    expect(container.querySelectorAll('[data-progressive-blur]').length).toBe(1);
  });

  it("applies a left-aligned mask when side='left'", () => {
    const { container } = render(<ProgressiveBlur side="left" />);
    const el = container.querySelector('[data-progressive-blur]') as HTMLElement;
    expect(el.style.left).toBe("0px");
    expect(el.style.right).toBe("");
  });

  it("applies a right-aligned mask when side='right'", () => {
    const { container } = render(<ProgressiveBlur side="right" />);
    const el = container.querySelector('[data-progressive-blur]') as HTMLElement;
    expect(el.style.right).toBe("0px");
    expect(el.style.left).toBe("");
  });

  it("inverts the mask gradient direction between sides", () => {
    const { container, rerender } = render(<ProgressiveBlur side="left" />);
    let el = container.querySelector('[data-progressive-blur]') as HTMLElement;
    expect(el.style.maskImage).toContain("to right");

    rerender(<ProgressiveBlur side="right" />);
    el = container.querySelector('[data-progressive-blur]') as HTMLElement;
    expect(el.style.maskImage).toContain("to left");
  });
});
