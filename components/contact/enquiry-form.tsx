"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  enquirySchema,
  EVENT_TYPES,
  type EnquiryInput,
} from "@/components/contact/enquiry-schema";

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { eventType: "Wedding" },
  });

  const onSubmit = async (data: EnquiryInput) => {
    setStatus("submitting");
    setErrMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? `HTTP ${res.status}`);
      }
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrMsg(e instanceof Error ? e.message : "Unknown error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-gold/40 bg-ink-warm p-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold">Thank you</p>
        <p className="mt-4 font-display text-2xl italic text-cream">
          Spencer will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Name" fieldId="field-name" error={errors.name?.message}>
          <Input
            id="field-name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "field-name-error" : undefined}
            {...register("name")}
            className="border-gold/30 bg-ink text-cream placeholder:text-cream/30"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" fieldId="field-email" error={errors.email?.message}>
          <Input
            id="field-email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "field-email-error" : undefined}
            {...register("email")}
            className="border-gold/30 bg-ink text-cream placeholder:text-cream/30"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Event date" fieldId="field-event-date" error={errors.eventDate?.message}>
          <Input
            id="field-event-date"
            type="date"
            aria-invalid={!!errors.eventDate}
            aria-describedby={errors.eventDate ? "field-event-date-error" : undefined}
            {...register("eventDate")}
            className="border-gold/30 bg-ink text-cream"
          />
        </Field>
        <Field label="Event type" fieldId="field-event-type" error={errors.eventType?.message}>
          <Select
            onValueChange={(v) => setValue("eventType", v as EnquiryInput["eventType"])}
            defaultValue="Wedding"
          >
            <SelectTrigger
              id="field-event-type"
              aria-invalid={!!errors.eventType}
              aria-describedby={errors.eventType ? "field-event-type-error" : undefined}
              className="border-gold/30 bg-ink text-cream"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Location" fieldId="field-location" error={errors.location?.message} className="md:col-span-2">
          <Input
            id="field-location"
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "field-location-error" : undefined}
            {...register("location")}
            className="border-gold/30 bg-ink text-cream placeholder:text-cream/30"
            placeholder="City / venue"
          />
        </Field>
        <Field label="Message" fieldId="field-message" error={errors.message?.message} className="md:col-span-2">
          <Textarea
            id="field-message"
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "field-message-error" : undefined}
            {...register("message")}
            className="border-gold/30 bg-ink text-cream placeholder:text-cream/30"
            placeholder="Tell Spencer about the event…"
          />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-cream/40">
          {status === "error" && <span className="text-red-logo">Could not send: {errMsg}</span>}
        </p>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="border border-gold bg-gold/15 px-8 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-gold hover:bg-gold/25"
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  fieldId,
  error,
  children,
  className,
}: {
  label: string;
  fieldId: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={fieldId} className="font-mono text-[10px] uppercase tracking-eyebrow text-cream/70">
        {label}
      </Label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1 text-xs text-red-logo">
          {error}
        </p>
      ) : null}
    </div>
  );
}
