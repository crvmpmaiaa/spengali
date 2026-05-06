import { z } from "zod";

const schema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  ENQUIRY_TO_EMAIL: z.string().email("ENQUIRY_TO_EMAIL must be a valid email"),
});

export function getEnv() {
  return schema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ENQUIRY_TO_EMAIL: process.env.ENQUIRY_TO_EMAIL,
  });
}
