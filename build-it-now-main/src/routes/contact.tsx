import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/contact-skyline.jpg";
import { ImageHero, Section } from "@/components/site/blocks";
import { ContactForm } from "@/components/site/ContactForm";

const TITLE = "Contact Kavira Systems — Discuss an AI or Automation Project";
const DESC =
  "Tell us about your organisation and the challenge you want to solve. We'll review your enquiry and arrange a consultation.";

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
            Share a little about your organisation and the challenge you want to solve. Our team
            will review your enquiry and get in touch.
          </p>
        }
      />
      <Section id="enquiry" className="scroll-mt-16">
        <div className="grid gap-14 md:grid-cols-12">
          <aside className="md:col-span-4">
            <p className="eyebrow text-muted-foreground">What happens next</p>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {[
                ["We review your enquiry", "We read what you've shared to understand the context."],
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
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
