import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/approach-architecture.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBanner, ImageHero, InfraDiagram, Section, SectionHeading } from "@/components/site/blocks";
import { canonical } from "@/lib/seo";

const TITLE = "How We Work — Client-Owned Infrastructure Model | Haki Systems";
const DESC =
  "Our engagement process from discovery to support, and our client-owned infrastructure model: you own your cloud and pay providers directly; we charge for engineering.";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [canonical("/how-we-work")],
  }),
  component: HowWeWork,
});

const STEPS: { title: string; body: string; list?: string[]; note?: string }[] = [
  {
    title: "Discovery",
    body: "A business contacts us and explains its requirements. We arrange a consultation to understand:",
    list: ["Business processes", "Existing applications", "Operational challenges", "Integration requirements", "Security and access requirements", "Desired outcomes"],
  },
  {
    title: "Assessment and proposal",
    body: "We review the requirements and determine whether an AI or automation solution is appropriate. We prepare:",
    list: ["Proposed architecture", "Project scope", "Deliverables", "Timeline", "Engineering fee", "Estimated third-party infrastructure requirements", "Support options"],
  },
  {
    title: "Client infrastructure",
    body: "The client owns and controls its cloud environment. For Google Cloud projects:",
    list: [
      "The client owns the Google Cloud organisation or account",
      "The client owns the project",
      "The client owns the billing account",
      "The client attaches its own corporate payment method",
      "The client authorises appropriate engineering access",
      "The client's IT administrator can participate in the process",
    ],
    note: "We use least-privilege permissions and approved access procedures. We will never ask you to send passwords or service account private keys over WhatsApp or ordinary email.",
  },
  {
    title: "Engineering",
    body: "We implement the agreed solution in the client's authorised environment. Possible technologies include:",
    list: ["Google ADK", "Vertex AI", "Gemini", "Python", "APIs", "Microsoft 365", "Google Workspace", "Suitable automation platforms"],
    note: "Technology choices depend on the project.",
  },
  {
    title: "Testing and deployment",
    body: "We validate:",
    list: ["Functionality", "Security controls", "Permissions", "Integrations", "Error handling", "Performance", "Agreed acceptance criteria"],
    note: "We deploy the solution after the agreed testing process.",
  },
  {
    title: "Support and maintenance",
    body: "We provide support according to a separately agreed arrangement, which defines:",
    list: ["Support availability", "Response times", "Included maintenance", "Bug-fix responsibilities", "Monitoring responsibilities", "Additional development charges", "Change request procedures"],
    note: "Support is always scoped — we do not offer unlimited support.",
  },
];

const COMMERCIAL = [
  ["Engineering and implementation", "Paid to Haki Systems", "The client pays Haki Systems for agreed engineering, development, integration and deployment work. Fees are quoted according to scope and complexity."],
  ["Third-party infrastructure", "Paid directly to providers", "The client pays Google Cloud, Microsoft, AI providers and other third-party vendors directly. These costs are not included in our engineering invoice unless explicitly agreed otherwise. Infrastructure and API usage is not free."],
  ["Ongoing support", "Quoted separately", "Maintenance and support are quoted separately. The service agreement defines what is included and what counts as additional development."],
];

const FAQ = [
  ["Do you host our systems on your own cloud account?", "No. We do not place clients on a shared cloud billing account. Each client owns its infrastructure and pays its own usage costs."],
  ["Who pays for AI model usage and cloud resources?", "Your organisation pays providers such as Google Cloud or Microsoft directly, under your own billing account. We estimate expected infrastructure requirements in our proposal."],
  ["How are your fees structured?", "Engineering work is quoted per engagement according to scope and complexity. Ongoing support is quoted separately. We don't publish fixed prices because every engagement is individually assessed."],
  ["How do you get access to our environment?", "Your administrator grants least-privilege access through an agreed, approved procedure. We never request passwords or private keys by email or through our website."],
  ["Can our internal IT team be involved?", "Yes. We work alongside internal IT or administrative teams throughout the engagement."],
];

function HowWeWork() {
  return (
    <>
      <ImageHero
        image={heroImg}
        alt="Minimalist architectural interior with natural light"
        eyebrow="How we work"
        title="A clear engagement model, from first conversation to ongoing support."
        intro={<p>We follow a client-owned infrastructure model. Your organisation keeps ownership of its cloud environment and billing; we provide the engineering.</p>}
      />

      <Section>
        <SectionHeading eyebrow="Process" title="Six steps. No surprises." />
        <ol className="mt-16 border-t border-border">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-6 border-b border-border py-12 md:grid-cols-12">
              <p className="eyebrow text-brand md:col-span-2">Step {i + 1}</p>
              <div className="md:col-span-4">
                <h3 className="heading text-2xl">{s.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
              <div className="md:col-span-5 md:col-start-8">
                {s.list && (
                  <ul className="grid gap-x-6 sm:grid-cols-2">
                    {s.list.map((l) => (
                      <li key={l} className="border-b border-border py-2.5 text-sm">{l}</li>
                    ))}
                  </ul>
                )}
                {s.note && <p className="mt-5 text-sm leading-relaxed text-foreground">{s.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading dark eyebrow="Commercial model" title="Transparent engineering. Independent infrastructure." intro="Three separate financial components, so you always know who you are paying and for what." />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <InfraDiagram />
          </div>
        </div>
        <div className="mt-16 grid gap-px bg-ink-border md:grid-cols-3">
          {COMMERCIAL.map(([t, who, d], i) => (
            <div key={t} className="bg-ink p-8">
              <p className="eyebrow text-ink-muted">0{i + 1}</p>
              <h3 className="mt-4 text-xl tracking-tight">{t}</h3>
              <p className="mt-1 text-sm text-brand">{who}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Common questions." />
          </div>
          <Accordion type="single" collapsible className="md:col-span-7 md:col-start-6">
            {FAQ.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
