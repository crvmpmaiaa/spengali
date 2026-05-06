import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/components/contact/enquiry-schema";
import { env } from "@/lib/env";

export const runtime = "nodejs"; // Resend SDK uses Node APIs

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.format() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const subject = `[Spencer Lynch] New enquiry · ${data.eventType} · ${data.eventDate}`;
  const html = `
    <h2>New enquiry from spencerlynch.co.uk</h2>
    <p><strong>${escapeHtml(data.name)}</strong> &lt;${escapeHtml(data.email)}&gt;</p>
    <ul>
      <li><strong>Event type:</strong> ${escapeHtml(data.eventType)}</li>
      <li><strong>Date:</strong> ${escapeHtml(data.eventDate)}</li>
      <li><strong>Location:</strong> ${escapeHtml(data.location)}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
  `;

  // Use Resend's pre-verified test domain until our own domain is verified.
  // Swap to e.g. "Spencer Lynch <bookings@spencerlynch.co.uk>" once Resend
  // domain verification is set up (Plan 7 / production deploy).
  const FROM = "Spencer Lynch Site <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from: FROM,
      to: env.ENQUIRY_TO_EMAIL,
      replyTo: data.email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend send failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not deliver enquiry" },
      { status: 502 },
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
