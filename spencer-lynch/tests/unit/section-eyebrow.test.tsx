import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionEyebrow } from "@/components/credentials/section-eyebrow";

describe("SectionEyebrow", () => {
  it("formats the eyebrow with em-dashes around the label", () => {
    render(<SectionEyebrow numeral="01" label="The Stadium Years" />);
    expect(
      screen.getByText(/—\s*§\s*01\s*·\s*The Stadium Years\s*—/),
    ).toBeInTheDocument();
  });

  it("uses an <p> with mono / gold styling classes", () => {
    const { container } = render(
      <SectionEyebrow numeral="02" label="Boardrooms" />,
    );
    const p = container.querySelector("p");
    expect(p?.className).toMatch(/font-mono/);
    expect(p?.className).toMatch(/text-gold/);
  });
});
