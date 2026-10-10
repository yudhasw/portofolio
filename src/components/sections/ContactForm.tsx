"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/routing";
import { contactSchema, type ContactErrorKey } from "@/lib/validation/contact";

type Labels = {
  name: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  errors: Record<ContactErrorKey, string>;
};

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Labels;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, ContactErrorKey>>>(
    {},
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Partial<Record<Field, ContactErrorKey>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as Field;
        next[field] ??= issue.message as ContactErrorKey;
      }
      setErrors(next);
      setStatus("idle");
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const fieldProps = (field: Field) => ({
    id: `${uid}-${field}`,
    name: field,
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `${uid}-${field}-error` : undefined,
    className:
      "bg-bg text-fg border-fg-muted w-full rounded-sm border px-4 py-3 aria-[invalid=true]:border-2 aria-[invalid=true]:border-accent",
  });

  const row = (field: Field, label: string, control: "input" | "textarea") => (
    <div>
      <label
        htmlFor={`${uid}-${field}`}
        className="mb-1.5 block text-sm font-medium"
      >
        {label}
      </label>
      {control === "input" ? (
        <input
          {...fieldProps(field)}
          type={field === "email" ? "email" : "text"}
          autoComplete={field === "email" ? "email" : "name"}
          required
        />
      ) : (
        <textarea {...fieldProps(field)} rows={6} required />
      )}
      {errors[field] && (
        <p
          id={`${uid}-${field}-error`}
          className="mt-1.5 text-sm font-medium text-fg"
        >
          <span aria-hidden="true">⚠ </span>
          {labels.errors[errors[field]]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {row("name", labels.name, "input")}
      {row("email", labels.email, "input")}
      {row("message", labels.message, "textarea")}

      {/* Honeypot: tersembunyi untuk manusia dan pembaca layar. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? labels.sending : labels.submit}
      </Button>

      <p
        role="status"
        aria-live="polite"
        className="min-h-6 text-sm font-medium"
      >
        {status === "success" && labels.success}
        {status === "error" && labels.error}
      </p>
    </form>
  );
}
