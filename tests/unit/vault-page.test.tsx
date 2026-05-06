import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VaultContent } from "@/components/vault/vault-content";

beforeEach(() => {
  localStorage.clear();
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, "location", {
    value: { href: "http://localhost:3000/the-vault" },
    writable: true,
    configurable: true,
  });
});

describe("VaultContent — localStorage gate", () => {
  it("shows decoy ? when sl-vault-unlocked key is absent", async () => {
    render(<VaultContent />);
    await waitFor(() => expect(screen.getByText("?")).toBeInTheDocument());
    expect(screen.queryByRole("heading", { name: /the vault/i })).toBeNull();
  });

  it("shows full vault content when sl-vault-unlocked key is present", async () => {
    localStorage.setItem("sl-vault-unlocked", "1");
    render(<VaultContent />);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /the vault/i })).toBeInTheDocument(),
    );
    expect(screen.queryByText("?")).toBeNull();
  });
});

describe("VaultContent — clipboard", () => {
  it("copy button calls clipboard.writeText with the current URL and shows Copied!", async () => {
    localStorage.setItem("sl-vault-unlocked", "1");
    render(<VaultContent />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "http://localhost:3000/the-vault",
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument(),
    );
  });
});
