import { z } from "zod";

/** Pesan error berupa kunci; teks tampilan diambil dari messages/*.json. */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(100, "tooLong"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(200, "tooLong")
    .pipe(z.email("email")),
  message: z.string().trim().min(10, "tooShort").max(2000, "tooLong"),
  // Honeypot: manusia tidak melihat field ini, bot biasanya mengisinya.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrorKey = "required" | "email" | "tooShort" | "tooLong";
