import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/services-infrastructure.jpg";
import { CtaBanner, ImageHero, InlineCta, Section } from "@/components/site/blocks";
import { SERVICES } from "@/lib/site-content";

const TITLE = "Services — Custom AI Agents & Business Automation | Haki Systems";
const DESC =
  "AI readiness assessments, custom AI agent development, intelligent workflow automation and managed engineering — built within your own cloud environment.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ServicesPage,
});

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 bg-brand" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      <ImageHero
        image={heroImg}
        alt="Corridor of server racks in a modern data centre"
        eyebrow="Services"
        title="Engineering intelligent systems for modern organisations."
        intro={
          <p>
            From AI strategy and infrastructure assessment to custom agents and workflow automation,
            we help businesses implement technology that serves a real operational purpose.
          </p>
        }
      />
      {SERVICES.map((s, idx) => (
        <Section key={s.slug} id={s.slug} tone={idx % 2 ? "surface" : "light"} className="scroll-mt-16">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow text-brand">Service {s.num}</p>
              <h2 className="heading mt-4 text-3xl md:text-4xl">{s.title}</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">{s.summary}</p>
              <div className="mt-8 border-l-2 border-brand pl-5">
                <p className="eyebrow text-muted-foreground">The business problem</p>
                <p className="mt-3 leading-relaxed">{s.problem}</p>
              </div>
              <div className="mt-10">
                <InlineCta />
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
              <List title="What we assess" items={s.assess} />
              <List title="What we build" items={s.build} />
              <List title="Expected deliverables" items={s.deliverables} />
              <div>
                <p className="eyebrow text-muted-foreground">Relevant technologies</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.tech.map((t) => (
                    <li key={t} className="rounded-sm border border-border bg-background px-2.5 py-1 text-xs">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Technology choices depend on each project's requirements.
                </p>
              </div>
            </div>
          </div>
        </Section>
      ))}
      <CtaBanner />
    </>
  );
}
