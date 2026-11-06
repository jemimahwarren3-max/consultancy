import { createFileRoute } from "@tanstack/react-router";
import { processEnquiry, type EmailSender } from "@/lib/enquiry";

// Best-effort per-isolate rate limit (5 submissions / 10 min / IP).
// For stronger guarantees add a Cloudflare Rate Limiting rule or binding (see DEPLOYMENT.md).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

type CfEnv = {
  EMAIL?: { send: (m: Record<string, unknown>) => Promise<unknown> };
  KAVIRA_INBOX_EMAIL?: string;
  KAVIRA_FROM_EMAIL?: string;
};

async function getCfEnv(): Promise<CfEnv> {
  try {
    const mod = "cloudflare:workers";
    const cf = (await import(/* @vite-ignore */ mod)) as { env?: CfEnv };
    return cf.env ?? {};
  } catch {
    return {};
  }
}

export const Route = createFileRoute("/api/submit-enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = (status: number, body: unknown) =>
          new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
          });

        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
        if (rateLimited(ip)) {
          return json(429, { ok: false, error: "Too many submissions. Please wait a few minutes and try again." });
        }
        if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
          return json(400, { ok: false, error: "Invalid request." });
        }
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json(400, { ok: false, error: "Invalid request." });
        }

        const env = await getCfEnv();
        const inbox = env.KAVIRA_INBOX_EMAIL ?? process.env.KAVIRA_INBOX_EMAIL;
        const from = env.KAVIRA_FROM_EMAIL ?? process.env.KAVIRA_FROM_EMAIL;
        const send: EmailSender | undefined = env.EMAIL
          ? async (m) => {
              await env.EMAIL!.send({
                to: m.to,
                from: { email: m.from, name: "Kavira Systems" },
                subject: m.subject,
                html: m.html,
                text: m.text,
                ...(m.replyTo ? { replyTo: m.replyTo } : {}),
              });
            }
          : undefined;

        if (!send) console.error("[enquiry] EMAIL binding missing — Cloudflare Email Service not configured");
        const result = await processEnquiry(raw, { inbox, from, send });
        if (result.status >= 500) console.error("[enquiry] failed", result.status);
        return json(result.status, result.body);
      },
    },
  },
});
