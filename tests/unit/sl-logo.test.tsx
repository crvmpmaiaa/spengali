// spencer-lynch/tests/unit/sl-logo.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SLLogo } from "@/components/brand/sl-logo";

describe("SLLogo", () => {
  it("renders the colour (on-dark PNG) variant by default", () => {
    render(<SLLogo />);
    const img = screen.getByRole("img", { name: /spencer lynch/i });
    expect(img).toHaveAttribute("src", expect.stringContaining("logo-on-dark.png"));
  });

  it("renders the no-pips (on-dark PNG) variant when requested", () => {
    render(<SLLogo variant="no-pips" />);
    const img = screen.getByRole("img", { name: /spencer lynch/i });
    expect(img).toHaveAttribute("src", expect.stringContaining("logo-no-pips-on-dark.png"));
  });

  it("renders the bw variant when requested", () => {
    render(<SLLogo variant="bw" />);
    const img = screen.getByRole("img", { name: /spencer lynch/i });
    expect(img).toHaveAttribute("src", expect.stringContaining("logo-bw.jpg"));
  });
});
