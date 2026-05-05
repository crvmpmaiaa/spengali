import { describe, it, expect } from "vitest";
import { enquirySchema } from "@/components/contact/enquiry-schema";

describe("enquirySchema", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@example.com",
    eventDate: "2026-07-15",
    eventType: "Wedding" as const,
    location: "Liverpool",
    message: "Looking for close-up at our reception, ~80 guests.",
  };

  it("accepts a valid enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const r = enquirySchema.safeParse({ ...valid, email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("rejects an unknown eventType", () => {
    const r = enquirySchema.safeParse({ ...valid, eventType: "Funeral" });
    expect(r.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const r = enquirySchema.safeParse({ ...valid, name: "" });
    expect(r.success).toBe(false);
  });

  it("requires message of at least 10 characters", () => {
    const r = enquirySchema.safeParse({ ...valid, message: "hey" });
    expect(r.success).toBe(false);
  });
});
