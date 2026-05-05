import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";

// Mock the Resend module BEFORE the route module loads.
// vi.mock is hoisted by Vitest so this works regardless of import order below.
const sendMock = vi.fn().mockResolvedValue({ id: "test_id" });
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  eventDate: "2026-07-15",
  eventType: "Wedding",
  location: "Liverpool",
  message: "Looking for close-up at our reception, ~80 guests.",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Lazy-bound POST handler — imported AFTER env is stubbed.
let POST: (req: Request) => Promise<Response>;

beforeAll(async () => {
  // env.ts calls schema.parse() at module load — set the env vars before importing.
  vi.stubEnv("RESEND_API_KEY", "test_key");
  vi.stubEnv("ENQUIRY_TO_EMAIL", "spencer@example.com");
  const mod = await import("@/app/api/enquiry/route");
  POST = mod.POST;
});

beforeEach(() => sendMock.mockClear());

describe("POST /api/enquiry", () => {
  it("returns 400 on invalid payload", async () => {
    const res = await POST(makeRequest({ ...validBody, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 400 on non-JSON body", async () => {
    const req = new Request("http://localhost/api/enquiry", {
      method: "POST",
      body: "this is not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("calls Resend and returns 200 on valid payload", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock.mock.calls[0][0].to).toBe("spencer@example.com");
    expect(sendMock.mock.calls[0][0].replyTo).toBe(validBody.email);
  });
});
