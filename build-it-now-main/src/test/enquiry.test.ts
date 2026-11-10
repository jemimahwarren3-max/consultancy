import { describe, expect, it, vi } from "vitest";
import { processEnquiry, type EmailMessage } from "@/lib/enquiry";

const valid = {
  fullName: "Tendai Moyo",
  company: "Acme <Holdings>",
  email: "tendai@acme.co.zw",
  country: "Zimbabwe",
  service: "Custom AI Agent Development",
  challenge: "We process hundreds of invoices manually every week.",
  consent: true,
  phone: "+263 77 000 0000",
  industry: "Logistics",
  existingSystems: "Google Workspace, Sage",
  preferredTime: "Weekday mornings",
  additionalInfo: "None",
};
const cfg = (send: (m: EmailMessage) => Promise<void>) => ({ inbox: "in@k.test", from: "noreply@k.test", send });

describe("enquiry processing", () => {
  it("rejects an invalid email", async () => {
    const r = await processEnquiry({ ...valid, email: "not-an-email" }, cfg(vi.fn()));
    expect(r.status).toBe(400);
    expect("fieldErrors" in r.body && r.body.fieldErrors?.email).toBeTruthy();
  });

  it("requires consent", async () => {
    const send = vi.fn();
    const r = await processEnquiry({ ...valid, consent: false }, cfg(send));
    expect(r.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("sends internal email with every field, then the acknowledgement", async () => {
    const sent: EmailMessage[] = [];
    const r = await processEnquiry(valid, cfg(async (m) => void sent.push(m)));
    expect(r.status).toBe(200);
    expect(sent[0].to).toBe("in@k.test");
    expect(sent[0].subject).toBe("New Business Enquiry | Acme <Holdings> | Tendai Moyo");
    for (const v of ["Tendai Moyo", "tendai@acme.co.zw", "Zimbabwe", "Custom AI Agent Development", "invoices manually", "+263 77 000 0000", "Logistics", "Google Workspace, Sage", "Weekday mornings"]) {
      expect(sent[0].text).toContain(v);
    }
    expect(sent[0].html).toContain("Acme &lt;Holdings&gt;");
    expect(sent[1].to).toBe("tendai@acme.co.zw");
    expect(sent[1].subject).toBe("We've received your enquiry | Haki Systems");
  });

  it("reports failure and skips the acknowledgement when the internal email fails", async () => {
    const send = vi.fn().mockRejectedValue(new Error("down"));
    const r = await processEnquiry(valid, cfg(send));
    expect(r.status).toBe(502);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("returns 503 when email is not configured", async () => {
    const r = await processEnquiry(valid, {});
    expect(r.status).toBe(503);
  });

  it("rejects honeypot submissions", async () => {
    const r = await processEnquiry({ ...valid, website: "spam.com" }, cfg(vi.fn()));
    expect(r.status).toBe(400);
  });
});
