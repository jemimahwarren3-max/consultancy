import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/home-hero.jpg";
import officeImg from "@/assets/about-office.jpg";
import { Button } from "@/components/ui/button";
import {
  CtaBanner,
  InfraDiagram,
  ImageHero,
  ProcessTimeline,
  Section,
  SectionHeading,
  TechGrid,
} from "@/components/site/blocks";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { INDUSTRIES, SERVICES } from "@/lib/site-content";

const TITLE = "Haki Systems — AI Engineering & Intelligent Automation Consultancy";
const DESC =
  "We design and implement custom AI agents, intelligent workflows and connected business systems for organisations in Zimbabwe, South Africa and internationally.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <ImageHero
        tall
        image={heroImg}
        alt="Glass office tower photographed from below at dusk"
        eyebrow="AI Engineering | Intelligent Automation"
        title={
          <>
            Enterprise AI Systems.
            <br />
            <span className="text-ink-muted">Engineered for Business.</span>
          </>
        }
        intro={
          <>
            <p>
              We design and implement intelligent AI agents, automated workflows and connected
              business systems that help organisations work smarter.
            </p>
            <p className="text-base">
              From business process automation to custom AI engineering, we build technology around
              the way your organisation operates.
            </p>
          </>
        }
      >
        <WhatsAppButton variant="light" size="xl" label="Discuss a Project" />
        <Button asChild variant="onDark" size="xl">
          <Link to="/services">Explore Our Services</Link>
        </Button>
      </ImageHero>

      {/* Introduction */}
      <Section>
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <SectionHeading eyebrow="Our perspective" title="Technology should solve real business problems." />
            <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-muted-foreground">
              <p>
                Artificial intelligence is changing how organisations operate, but meaningful
                implementation requires more than choosing a model or connecting an API.
              </p>
              <p>
                It requires understanding business processes, existing systems, security
                requirements and the outcomes an organisation wants to achieve.
              </p>
              <p className="text-foreground">
                At Haki Systems, we approach every engagement as an engineering problem first.
              </p>
            </div>
          </div>
          <div className="md:col-span-6">
            <img
              src={officeImg}
              alt="Professionals working together at a long table in a naturally lit office"
              width={1600}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-md object-cover md:aspect-[5/6]"
            />
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Services"
          title="What we engineer."
          intro="We work with organisations to identify opportunities, design intelligent systems and implement solutions that fit their operations."
        />
        <div className="mt-16 border-t border-border">
          {SERVICES.map((s) => (
            <article key={s.slug} className="grid gap-8 border-b border-border py-12 md:grid-cols-12">
              <p className="eyebrow text-brand md:col-span-1">{s.num}</p>
              <div className="md:col-span-5">
                <h3 className="heading text-2xl md:text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{s.summary}</p>
                <Link
                  to="/services"
                  hash={s.slug}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-brand"
                >
                  Learn more <ArrowRight className="size-4" />
                </Link>
              </div>
              <ul className="grid content-start gap-x-8 sm:grid-cols-2 md:col-span-6">
                {s.capabilities.map((c) => (
                  <li key={c} className="border-b border-border py-3 text-sm">
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Technology */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Technology" title="Engineered with modern technology." />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              We select technologies according to each organisation's requirements rather than
              forcing every business into the same technical solution.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Product names are trademarks of their respective owners. Listed technologies do not
              indicate a partnership or endorsement.
            </p>
          </div>
          <div className="md:col-span-8">
            <TechGrid />
          </div>
        </div>
      </Section>

      {/* Industries */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Industries"
          title="Designed around the realities of your industry."
          intro="These are examples of where intelligent systems can apply. Every solution is tailored to the organisation's own processes, systems and environment."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map(([name, ex]) => (
            <li key={name} className="bg-background p-6">
              <p className="tracking-tight">{name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ex}</p>
            </li>
          ))}
          <li className="flex items-end bg-ink p-6 text-ink-foreground">
            <a
              href={getWhatsAppUrl() ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-brand"
            >
              Discuss your sector <ArrowRight className="size-4" />
            </a>
          </li>
        </ul>
      </Section>

      {/* Process */}
      <Section>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="How we work" title="A clear path from challenge to implementation." />
          <Button asChild variant="outline" size="xl">
            <Link to="/how-we-work">
              Understand Our Approach <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-16">
          <ProcessTimeline />
        </div>
      </Section>

      {/* Infrastructure model */}
      <Section tone="dark">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading dark eyebrow="Client infrastructure model" title="Your infrastructure. Your control." />
            <div className="mt-8 space-y-4 leading-relaxed text-ink-muted">
              <p>Every organisation should retain control of its own technology environment.</p>
              <p>
                We implement solutions within each client's authorised cloud infrastructure and
                work alongside its internal IT or administrative teams.
              </p>
              <p>
                The client owns its cloud accounts, projects, subscriptions and billing
                arrangements. Third-party infrastructure and AI consumption costs are billed
                directly to the organisation by the relevant providers.
              </p>
              <p className="text-ink-foreground">
                Haki Systems charges separately for engineering, implementation and agreed
                support services.
              </p>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <InfraDiagram />
          </div>
        </div>
      </Section>

      <div className="h-px bg-ink-border" />
      <CtaBanner />
    </>
  );
}
