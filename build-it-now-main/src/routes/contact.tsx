import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/contact-skyline.jpg";
import { ImageHero, Section } from "@/components/site/blocks";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const TITLE = "Contact Haki Systems — Discuss an AI or Automation Project";
const DESC =
  "Message us on WhatsApp to tell us about your organisation and the challenge you want to solve. We'll arrange a consultation.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <ImageHero
        image={heroImg}
        alt="City skyline at blue hour"
        eyebrow="Contact"
        title="Tell us what you're looking to achieve."
        intro={
          <p>
            Message us on WhatsApp with a little about your organisation and the challenge you
            want to solve. Our team will review it and get in touch.
          </p>
        }
      />
      <Section>
        <div className="grid gap-14 md:grid-cols-12">
          <aside className="md:col-span-5">
            <p className="eyebrow text-muted-foreground">What happens next</p>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {[
                ["You message us on WhatsApp", "Tell us about your organisation and the challenge you want to solve."],
                ["We arrange a consultation", "A conversation about your processes, systems and goals."],
                ["We prepare a proposal", "If appropriate: scope, architecture, timeline and engineering fee."],
              ].map(([t, d]) => (
                <li key={t} className="relative">
                  <span className="absolute -left-[29px] top-1.5 size-2 bg-brand" />
                  <p className="tracking-tight">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-muted-foreground">
              We work with organisations in Zimbabwe, South Africa and internationally.
            </p>
          </aside>
          <div className="md:col-span-6 md:col-start-7">
            <div className="rounded-md border border-border bg-surface p-8 md:p-12">
              <p className="eyebrow text-muted-foreground">Start a conversation</p>
              <h2 className="heading mt-4 text-2xl md:text-3xl">Message us on WhatsApp.</h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                This is the fastest way to reach us. Open WhatsApp, tell us about your
                organisation and what you're trying to achieve, and we'll take it from there.
              </p>
              <WhatsAppButton size="xl" className="mt-8" />
              {WHATSAPP_NUMBER && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Or message us directly at +{WHATSAPP_NUMBER}.
                </p>
              )}
              <p className="mt-6 rounded-md bg-background px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                Please do not send passwords, API keys, service account credentials, private keys
                or confidential documents over WhatsApp. We will agree a secure access procedure
                if a project goes ahead.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
