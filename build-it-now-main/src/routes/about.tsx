import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/approach-architecture.jpg";
import officeImg from "@/assets/about-office.jpg";
import { CtaBanner, ImageHero, Section, SectionHeading } from "@/components/site/blocks";
import { canonical } from "@/lib/seo";

const TITLE = "About Haki Systems — AI Engineering Consultancy";
const DESC =
  "Haki Systems is an AI engineering and intelligent automation consultancy helping organisations make practical use of artificial intelligence.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [canonical("/about")],
  }),
  component: About,
});

const PRINCIPLES = [
  ["Problem first", "Successful implementation starts with understanding the problem, not the tool."],
  ["Engineering discipline", "Software engineering, systems integration and testing applied to every engagement."],
  ["Client control", "Solutions run in your environment, under your accounts and your governance."],
  ["Honest scope", "Clear proposals, defined deliverables and transparent separation of costs."],
];

function About() {
  return (
    <>
      <ImageHero
        image={heroImg}
        alt="Light-filled minimalist atrium with a curved staircase"
        eyebrow="About"
        title="Engineering technology around real business needs."
      />
      <Section>
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="heading text-2xl leading-snug md:text-[2rem]">
              Haki Systems is an AI engineering and intelligent automation consultancy focused on
              helping organisations make practical use of artificial intelligence and modern
              software technologies.
            </p>
          </div>
          <div className="space-y-5 leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
            <p>We believe that successful technology implementation starts with understanding the problem.</p>
            <p>
              Our approach combines software engineering, intelligent automation, systems
              integration and thoughtful implementation.
            </p>
            <p>
              We work with organisations to design solutions around their existing systems,
              operational requirements and long-term objectives.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <img
            src={officeImg}
            alt="Team collaborating in a modern office"
            width={1600}
            height={1200}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-md object-cover md:col-span-6"
          />
          <div className="md:col-span-5 md:col-start-8">
            <SectionHeading eyebrow="Principles" title="How we think about the work." />
            <dl className="mt-10 border-t border-border">
              {PRINCIPLES.map(([t, d]) => (
                <div key={t} className="border-b border-border py-5">
                  <dt className="tracking-tight">{t}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
