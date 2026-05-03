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
    watch,
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
        <p className="font-mono text-[10px] uppercase tracking-eyebrow-wide text-gold">— Thank you —</p>
        <p className="mt-4 font-display text-2xl italic text-cream">
          Spencer will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input
            {...register("name")}
            className="border-gold/30 bg-ink text-cream placeholder:text-cream/30"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            {...register("email")}
            className="border-gold/30 bg-ink text-cream placeholder:text-cream/30"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Event date" error={errors.eventDate?.message}>
          <Input
            type="date"
            {...register("eventDate")}
            className="border-gold/30 bg-ink text-cream"
          />
        </Field>
        <Field label="Event type" error={errors.eventType?.message}>
          <Select
            onValueChange={(v) => setValue("eventType", v as EnquiryInput["eventType"])}
            defaultValue={watch("eventType")}
          >
            <SelectTrigger className="border-gold/30 bg-ink text-cream">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Location" error={errors.location?.message} className="md:col-span-2">
          <Input
            {...register("location")}
            className="border-gold/30 bg-ink text-cream placeholder:text-cream/30"
            placeholder="City / venue"
          />
        </Field>
        <Field label="Message" error={errors.message?.message} className="md:col-span-2">
          <Textarea
            rows={6}
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
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="font-mono text-[10px] uppercase tracking-eyebrow text-cream/70">
        {label}
      </Label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-1 text-xs text-red-logo">{error}</p> : null}
    </div>
  );
}
