// Shared enquiry rules: used by the contact form (client) and /api/submit-enquiry (server).

export const COUNTRIES = ["Zimbabwe", "South Africa", "Other"] as const;
export const SERVICE_OPTIONS = [
  "AI Infrastructure Assessment",
  "Custom AI Agent Development",
  "Intelligent Workflow Automation",
  "Google Workspace Integration",
  "Microsoft 365 Integration",
  "Document Intelligence",
  "Custom Software Engineering",
  "Managed AI Engineering",
  "Not sure yet",
] as const;

export const CONSENT_TEXT =
  "I agree that Kavira Systems may use the information submitted here to respond to my enquiry.";

export type Enquiry = {
  fullName: string;
  company: string;
  email: string;
  country: string;
  service: string;
  challenge: string;
  consent: boolean;
  phone: string;
  industry: string;
  existingSystems: string;
  preferredTime: string;
  additionalInfo: string;
};

export const EMPTY_ENQUIRY: Enquiry = {
  fullName: "",
  company: "",
  email: "",
  country: "",
  service: "",
  challenge: "",
  consent: false,
  phone: "",
  industry: "",
  existingSystems: "",
  preferredTime: "",
  additionalInfo: "",
};

export const FIELD_LABELS: Record<keyof Enquiry, string> = {
  fullName: "Full name",
  company: "Company or organisation",
  email: "Business email",
  country: "Country",
  service: "Service of interest",
  challenge: "Business challenge",
  consent: "Consent to be contacted",
  phone: "Phone number",
  industry: "Industry",
  existingSystems: "Existing applications or software",
  preferredTime: "Preferred consultation time",
  additionalInfo: "Additional information",
};

const MAX: Partial<Record<keyof Enquiry, number>> = {
  fullName: 120,
  company: 160,
  email: 254,
  phone: 40,
  industry: 120,
  existingSystems: 1000,
  preferredTime: 160,
  challenge: 5000,
  additionalInfo: 3000,
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export function isValidEmail(v: string) {
  return v.length <= 254 && EMAIL_RE.test(v);
}

/** Strip control characters and trim. HTML escaping happens separately when building email. */
export function clean(v: unknown, max = 2000): string {
  if (typeof v !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

export function normalise(raw: Record<string, unknown>): Enquiry {
  const out = { ...EMPTY_ENQUIRY };
  (Object.keys(EMPTY_ENQUIRY) as (keyof Enquiry)[]).forEach((k) => {
    if (k === "consent") out.consent = raw.consent === true || raw.consent === "true" || raw.consent === "on";
    else (out[k] as string) = clean(raw[k], MAX[k] ?? 2000);
  });
  out.email = out.email.toLowerCase();
  return out;
}

export type Errors = Partial<Record<keyof Enquiry, string>>;

export function validate(e: Enquiry): Errors {
  const err: Errors = {};
  if (!e.fullName) err.fullName = "Please enter your full name.";
  if (!e.company) err.company = "Please enter your company or organisation.";
  if (!e.email) err.email = "Please enter your business email.";
  else if (!isValidEmail(e.email)) err.email = "Please enter a valid email address, e.g. name@company.com.";
  if (!e.country) err.country = "Please select your country.";
  else if (!(COUNTRIES as readonly string[]).includes(e.country)) err.country = "Please select a country from the list.";
  if (!e.service) err.service = "Please select a service of interest.";
  else if (!(SERVICE_OPTIONS as readonly string[]).includes(e.service)) err.service = "Please select a service from the list.";
  if (!e.challenge) err.challenge = "Please describe the business challenge.";
  else if (e.challenge.length < 20) err.challenge = "Please add a little more detail (at least 20 characters).";
  if (!e.consent) err.consent = "Please confirm that we may use this information to respond.";
  return err;
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function oneLine(s: string) {
  return s.replace(/[\r\n]+/g, " ");
}

export function internalSubject(e: Enquiry) {
  return oneLine(`New Business Enquiry | ${e.company} | ${e.fullName}`).slice(0, 250);
}

export const ACK_SUBJECT = "We've received your enquiry | Kavira Systems";

const GROUPS: { title: string; fields: (keyof Enquiry)[] }[] = [
  { title: "Contact information", fields: ["fullName", "company", "email", "phone", "country", "industry"] },
  { title: "Project requirements", fields: ["service", "preferredTime"] },
  { title: "Business challenge", fields: ["challenge"] },
  { title: "Existing systems", fields: ["existingSystems"] },
  { title: "Additional information", fields: ["additionalInfo", "consent"] },
];

function display(e: Enquiry, k: keyof Enquiry) {
  if (k === "consent") return e.consent ? "Yes — " + CONSENT_TEXT : "No";
  return (e[k] as string) || "—";
}

export function internalEmail(e: Enquiry, submittedAt: string) {
  const text =
    GROUPS.map((g) => `${g.title.toUpperCase()}\n` + g.fields.map((k) => `${FIELD_LABELS[k]}: ${display(e, k)}`).join("\n")).join("\n\n") +
    `\n\nSubmitted: ${submittedAt}`;

  const html = `<!doctype html><html><body style="margin:0;background:#F8FAFC;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0B0F19">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border:1px solid #E5E7EB">
<tr><td style="background:#0B0F19;color:#FFFFFF;padding:24px 32px;font-size:16px;letter-spacing:-0.01em">Kavira Systems<span style="color:#2563EB"> ■</span><div style="font-size:12px;color:#94A3B8;margin-top:6px">New business enquiry</div></td></tr>
${GROUPS.map(
  (g) => `<tr><td style="padding:24px 32px 8px"><div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#64748B;border-bottom:1px solid #E5E7EB;padding-bottom:8px">${g.title}</div>
${g.fields
  .map(
    (k) => `<div style="margin-top:12px"><div style="font-size:12px;color:#64748B">${FIELD_LABELS[k]}</div><div style="font-size:14px;line-height:1.55;white-space:pre-wrap">${escapeHtml(display(e, k))}</div></div>`,
  )
  .join("")}</td></tr>`,
).join("")}
<tr><td style="padding:24px 32px;font-size:12px;color:#64748B">Submitted ${escapeHtml(submittedAt)}</td></tr>
</table></td></tr></table></body></html>`;
  return { html, text };
}

export function acknowledgementEmail(e: Enquiry) {
  const lines = [
    `Dear ${e.fullName},`,
    "Thank you for contacting Kavira Systems.",
    "We have received your enquiry and appreciate your interest in working with us.",
    "Our team will review the information and get in touch to discuss the next steps.",
    "We look forward to learning more about your organisation.",
  ];
  const text = lines.join("\n\n") + "\n\nKavira Systems\nIntelligent systems. Engineered around your business.";
  const html = `<!doctype html><html><body style="margin:0;background:#F8FAFC;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0B0F19">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid #E5E7EB">
<tr><td style="background:#0B0F19;color:#FFFFFF;padding:24px 32px;font-size:16px">Kavira Systems<span style="color:#2563EB"> ■</span></td></tr>
<tr><td style="padding:32px;font-size:15px;line-height:1.65">${lines.map((l) => `<p style="margin:0 0 16px">${escapeHtml(l)}</p>`).join("")}
<p style="margin:24px 0 0">Kavira Systems<br><span style="color:#64748B">Intelligent systems. Engineered around your business.</span></p></td></tr>
</table></td></tr></table></body></html>`;
  return { html, text };
}

// ---------- Server-side processing (pure; email sender injected for testability) ----------

export type EmailMessage = { to: string; from: string; subject: string; html: string; text: string; replyTo?: string };
export type EmailSender = (m: EmailMessage) => Promise<void>;

export type EnquiryResult =
  | { status: 200; body: { ok: true; acknowledgement: "sent" | "failed" } }
  | { status: 400; body: { ok: false; error: string; fieldErrors?: Errors } }
  | { status: 429 | 502 | 503; body: { ok: false; error: string } };

export type EnquiryConfig = { inbox?: string; from?: string; send?: EmailSender; now?: () => Date };

export async function processEnquiry(raw: unknown, cfg: EnquiryConfig): Promise<EnquiryResult> {
  if (!raw || typeof raw !== "object") return { status: 400, body: { ok: false, error: "Invalid request." } };
  const r = raw as Record<string, unknown>;
  // Spam protection: honeypot field and minimum completion time.
  if (typeof r.website === "string" && r.website.trim() !== "") {
    return { status: 400, body: { ok: false, error: "Submission rejected." } };
  }
  const started = Number(r.startedAt);
  if (Number.isFinite(started) && started > 0 && (cfg.now?.() ?? new Date()).getTime() - started < 3000) {
    return { status: 400, body: { ok: false, error: "Submission was too fast. Please try again." } };
  }

  const e = normalise(r);
  const fieldErrors = validate(e);
  if (Object.keys(fieldErrors).length) {
    return { status: 400, body: { ok: false, error: "Please correct the highlighted fields.", fieldErrors } };
  }

  if (!cfg.send || !cfg.inbox || !cfg.from) {
    return {
      status: 503,
      body: { ok: false, error: "Our enquiry service is not available right now. Please try again later." },
    };
  }

  const submittedAt = (cfg.now?.() ?? new Date()).toISOString();
  try {
    const m = internalEmail(e, submittedAt);
    await cfg.send({ to: cfg.inbox, from: cfg.from, subject: internalSubject(e), html: m.html, text: m.text, replyTo: e.email });
  } catch {
    return {
      status: 502,
      body: { ok: false, error: "We couldn't send your enquiry just now. Your details are kept — please try again." },
    };
  }

  // Acknowledgement only after the internal notification was accepted.
  let acknowledgement: "sent" | "failed" = "sent";
  try {
    const a = acknowledgementEmail(e);
    await cfg.send({ to: e.email, from: cfg.from, subject: ACK_SUBJECT, html: a.html, text: a.text });
  } catch {
    acknowledgement = "failed";
  }
  return { status: 200, body: { ok: true, acknowledgement } };
}
