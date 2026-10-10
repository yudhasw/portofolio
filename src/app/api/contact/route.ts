import { Resend } from "resend";
import { contactSchema } from "@/lib/validation/contact";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 10_000;

// Rate limit sederhana per instance serverless (cukup sebagai rem untuk spam ringan).
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Cegah Map membesar tanpa batas.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

// Respons sengaja generik: detail error tidak boleh bocor ke klien.
const json = (ok: boolean, status: number) => Response.json({ ok }, { status });

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) return json(false, 429);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(false, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(false, 400);
  }

  // Honeypot terisi: pura-pura sukses supaya bot tidak mencoba lagi.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    body.website
  ) {
    return json(true, 200);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return json(false, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error(
      "[contact] RESEND_API_KEY atau CONTACT_TO_EMAIL belum diatur.",
    );
    return json(false, 503);
  }

  const { name, email, message } = parsed.data;
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Pesan portofolio dari ${name}`.slice(0, 150),
      text: `Nama: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error("[contact] Resend menolak permintaan:", error.name);
      return json(false, 502);
    }
  } catch (err) {
    console.error(
      "[contact] Gagal mengirim:",
      err instanceof Error ? err.message : "unknown",
    );
    return json(false, 502);
  }

  return json(true, 200);
}
