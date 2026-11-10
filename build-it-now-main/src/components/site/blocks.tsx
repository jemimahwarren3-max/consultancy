import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "light",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "surface" | "dark";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32",
        tone === "surface" && "bg-surface",
        tone === "dark" && "bg-ink text-ink-foreground",
        className,
      )}
    >
      <div className="container-k">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5 flex items-center gap-3", dark ? "text-ink-muted" : "text-muted-foreground")}>
          <span className="h-px w-6 bg-brand" />
          {eyebrow}
        </p>
      )}
      <h2 className="heading text-3xl md:text-[2.75rem]">{title}</h2>
      {intro && (
        <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", dark ? "text-ink-muted" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function ImageHero({
  image,
  alt,
  eyebrow,
  title,
  intro,
  children,
  tall,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  tall?: boolean;
}) {
  return (
    <section className={cn("relative isolate flex items-end overflow-hidden bg-ink text-ink-foreground", tall ? "min-h-[92svh]" : "min-h-[72svh]")}>
      <img
        src={image}
        alt={alt}
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-overlay-dark" />
      <div className="absolute inset-0 -z-10 bg-overlay-bottom" />
      <div className="container-k pb-20 pt-36 md:pb-28">
        <div className="max-w-3xl fade-up">
          {eyebrow && <p className="eyebrow mb-7 text-ink-muted">{eyebrow}</p>}
          <h1 className={cn("display", tall ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl")}>{title}</h1>
          {intro && <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-ink-muted">{intro}</div>}
          {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner({
  title = "Let's engineer what's next.",
  body = (
    <>
      Have a business challenge that could benefit from intelligent automation or custom AI
      systems? Tell us what you are trying to achieve. Let's explore the possibilities.
    </>
  ),
  cta = "Start a Conversation",
}: {
  title?: string;
  body?: ReactNode;
  cta?: string;
}) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-k grid gap-10 py-24 md:grid-cols-12 md:items-end md:py-32">
        <h2 className="display text-4xl md:col-span-7 md:text-6xl">{title}</h2>
        <div className="md:col-span-5">
          <p className="text-lg leading-relaxed text-ink-muted">{body}</p>
          <WhatsAppButton variant="light" size="xl" label={cta} className="mt-8" />
        </div>
      </div>
    </section>
  );
}

export function InlineCta({ label = "Discuss this service" }: { label?: string }) {
  const url = getWhatsAppUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:text-brand"
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function TechGrid() {
  const items = [
    ["Google Cloud", "Cloud infrastructure"],
    ["Google ADK", "Agent development"],
    ["Vertex AI", "Model platform"],
    ["Gemini", "Foundation models"],
    ["Python", "Engineering"],
    ["REST APIs", "Integration"],
    ["Microsoft 365", "Productivity suite"],
    ["Google Workspace", "Productivity suite"],
    ["Workflow automation", "Orchestration platforms"],
  ];
  return (
    <ul className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([name, kind]) => (
        <li key={name} className="flex items-baseline justify-between gap-4 border-b border-r border-border bg-background px-6 py-7">
          <span className="text-lg tracking-tight">{name}</span>
          <span className="eyebrow text-muted-foreground">{kind}</span>
        </li>
      ))}
    </ul>
  );
}

export const STEPS = [
  ["Discover", "Understand the organisation and its challenges."],
  ["Assess", "Evaluate opportunities and design an appropriate solution."],
  ["Engineer", "Develop the agreed agents, integrations and workflows."],
  ["Deploy", "Test and deploy within the client's authorised environment."],
  ["Support", "Provide agreed ongoing maintenance and technical support."],
] as const;

export function ProcessTimeline() {
  return (
    <ol className="grid border-t border-border md:grid-cols-5">
      {STEPS.map(([t, d], i) => (
        <li key={t} className="relative border-b border-border py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
          <span className="absolute -top-[5px] left-0 size-2.5 bg-brand md:left-6 md:[li:first-child>&]:left-0" />
          <p className="eyebrow text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-xl tracking-tight">{t}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
        </li>
      ))}
    </ol>
  );
}

export function InfraDiagram() {
  const tiers = [
    ["Client-owned environment", "Google Cloud / Microsoft / Other platforms", "Owned and billed by your organisation"],
    ["Haki Systems engineering", "Agents / Integrations / Automation / Testing", "Engineering fee, quoted by scope"],
    ["Business operations", "Deployed systems / Workflow improvements / Ongoing support", "Your teams, your control"],
  ];
  return (
    <div className="flex flex-col" role="list" aria-label="Client infrastructure model">
      {tiers.map(([title, items, note], i) => (
        <div key={title} role="listitem">
          <div className={cn("border px-6 py-6 md:px-8", i === 1 ? "border-brand bg-ink-2" : "border-ink-border")}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="eyebrow text-ink-foreground">{title}</p>
              <p className="text-xs text-ink-muted">{note}</p>
            </div>
            <p className="mt-3 text-ink-muted">{items}</p>
          </div>
          {i < tiers.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden="true">
              <div className="h-8 w-px bg-ink-border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
