import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CONSENT_TEXT,
  COUNTRIES,
  EMPTY_ENQUIRY,
  SERVICE_OPTIONS,
  validate,
  normalise,
  type Enquiry,
  type Errors,
} from "@/lib/enquiry";

const inputCls =
  "w-full rounded-md border border-input bg-background px-3.5 py-3 text-[0.95rem] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus-visible:outline-2 focus-visible:outline-brand aria-[invalid=true]:border-destructive";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm">
        {label}
        {required ? <span className="text-brand" aria-hidden="true"> *</span> : <span className="text-muted-foreground"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [v, setV] = useState<Enquiry>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [ackFailed, setAckFailed] = useState(false);
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Enquiry>(k: K, val: Enquiry[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const a = (k: keyof Enquiry) => ({
    id: k,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (inFlight.current) return;
    const errs = validate(normalise(v as unknown as Record<string, unknown>));
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Errors;
        acknowledgement?: string;
      };
      if (res.ok && data.ok) {
        setAckFailed(data.acknowledgement === "failed");
        setStatus("success");
        window.scrollTo({ top: document.getElementById("enquiry")?.offsetTop ?? 0 });
      } else {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setMessage("We couldn't reach our server. Check your connection — your details are kept — and try again.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-md border border-border bg-surface p-8 md:p-12">
        <CheckCircle2 className="size-8 text-brand" aria-hidden="true" />
        <h3 className="heading mt-6 text-2xl">Thank you — your enquiry has been submitted.</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
          Our team will review the information and get in touch to discuss the next steps.
          {ackFailed
            ? " We weren't able to send a confirmation email to your address, but your enquiry reached us."
            : " A confirmation email has been sent to the address you provided."}
        </p>
        <Button asChild variant="outline" size="xl" className="mt-8">
          <Link to="/how-we-work">
            Read about our approach <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Business enquiry" className="space-y-6">
      {/* Honeypot: hidden from people, visible to naive bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input {...a("fullName")} autoComplete="name" className={inputCls} value={v.fullName} onChange={(e) => set("fullName", e.target.value)} />
        </Field>
        <Field id="company" label="Company or organisation" required error={errors.company}>
          <input {...a("company")} autoComplete="organization" className={inputCls} value={v.company} onChange={(e) => set("company", e.target.value)} />
        </Field>
        <Field id="email" label="Business email" required error={errors.email}>
          <input {...a("email")} type="email" autoComplete="email" inputMode="email" className={inputCls} value={v.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field id="phone" label="Phone number" error={errors.phone}>
          <input {...a("phone")} type="tel" autoComplete="tel" className={inputCls} value={v.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field id="country" label="Country" required error={errors.country}>
          <select {...a("country")} className={inputCls} value={v.country} onChange={(e) => set("country", e.target.value)}>
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id="industry" label="Industry" error={errors.industry}>
          <input {...a("industry")} className={inputCls} value={v.industry} onChange={(e) => set("industry", e.target.value)} />
        </Field>
        <Field id="service" label="Service of interest" required error={errors.service} className="md:col-span-2">
          <select {...a("service")} className={inputCls} value={v.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="challenge" label="Business challenge" required error={errors.challenge} hint="What are you trying to achieve, and what's getting in the way?">
        <textarea {...a("challenge")} rows={7} className={cn(inputCls, "resize-y")} value={v.challenge} onChange={(e) => set("challenge", e.target.value)} />
      </Field>

      <Field id="existingSystems" label="Existing applications or software" error={errors.existingSystems} hint="e.g. Google Workspace, Microsoft 365, Sage, a custom CRM">
        <input {...a("existingSystems")} className={inputCls} value={v.existingSystems} onChange={(e) => set("existingSystems", e.target.value)} />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="preferredTime" label="Preferred consultation time" error={errors.preferredTime} hint="e.g. Weekday mornings, CAT">
          <input {...a("preferredTime")} className={inputCls} value={v.preferredTime} onChange={(e) => set("preferredTime", e.target.value)} />
        </Field>
      </div>

      <Field id="additionalInfo" label="Additional information" error={errors.additionalInfo}>
        <textarea {...a("additionalInfo")} rows={4} className={cn(inputCls, "resize-y")} value={v.additionalInfo} onChange={(e) => set("additionalInfo", e.target.value)} />
      </Field>

      <p className="rounded-md bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        Please do not include passwords, API keys, service account credentials, private keys or
        confidential documents. We will agree a secure access procedure if a project goes ahead.
      </p>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input
            {...a("consent")}
            type="checkbox"
            className="mt-1 size-4 accent-brand"
            checked={v.consent}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <span>
            {CONSENT_TEXT} <span className="text-brand" aria-hidden="true">*</span>{" "}
            <Link to="/privacy" className="underline underline-offset-4">Privacy Policy</Link>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-sm text-destructive">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-md border border-destructive/40 px-4 py-3 text-sm text-destructive">
          {message}
        </div>
      )}

      <Button type="submit" size="xl" disabled={submitting} aria-busy={submitting} className="w-full md:w-auto">
        {submitting ? (
          <>
            <Loader2 className="animate-spin" /> Sending enquiry…
          </>
        ) : status === "error" ? (
          <>Try again <ArrowRight /></>
        ) : (
          <>Submit enquiry <ArrowRight /></>
        )}
      </Button>
    </form>
  );
}
