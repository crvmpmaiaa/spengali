import { z } from "zod";

export const EVENT_TYPES = [
  "Wedding",
  "Corporate",
  "Hospitality",
  "Private",
  "Other",
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name"),
  email: z.string().trim().email("Please enter a valid email"),
  eventDate: z.string().min(1, "Please choose a date"), // ISO YYYY-MM-DD; client uses <input type="date">
  eventType: z.enum(EVENT_TYPES),
  location: z.string().trim().min(1, "Please tell us where"),
  message: z.string().trim().min(10, "A few more words help Spencer reply usefully"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
