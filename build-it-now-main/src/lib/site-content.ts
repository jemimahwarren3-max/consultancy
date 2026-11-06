export type Service = {
  num: string;
  slug: string;
  title: string;
  summary: string;
  capabilities: string[];
  problem: string;
  assess: string[];
  build: string[];
  tech: string[];
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    num: "01",
    slug: "assessment",
    title: "AI Infrastructure & Readiness Assessment",
    summary:
      "We assess your existing technology environment and identify where artificial intelligence can create practical business value.",
    capabilities: [
      "AI readiness assessment",
      "Infrastructure assessment",
      "Workflow analysis",
      "Integration planning",
      "Security and architecture recommendations",
    ],
    problem:
      "Many organisations know AI could help but are unsure where to start, what their current systems can support, or which risks need to be addressed first.",
    assess: [
      "Current applications, data sources and cloud environment",
      "Business processes suitable for automation or AI support",
      "Security, access and compliance requirements",
      "Integration constraints and dependencies",
    ],
    build: [
      "A clear view of where AI can and cannot add value",
      "Recommended architecture and implementation approach",
      "A prioritised roadmap for engineering work",
    ],
    tech: ["Google Cloud", "Vertex AI", "Microsoft 365", "Google Workspace", "REST APIs"],
    deliverables: [
      "Readiness assessment report",
      "Proposed solution architecture",
      "Integration and security recommendations",
      "Scoped implementation plan",
    ],
  },
  {
    num: "02",
    slug: "agents",
    title: "Custom AI Agent Development",
    summary:
      "We design and build intelligent agents that work with your organisation's data, systems and business processes.",
    capabilities: [
      "Custom AI agents",
      "Multi-agent workflows",
      "Internal business assistants",
      "Document intelligence",
      "Information extraction",
      "AI-powered business processes",
    ],
    problem:
      "Teams spend significant time searching for information, processing documents and handling repetitive requests that follow predictable patterns.",
    assess: [
      "The tasks and decisions an agent should support",
      "The data and systems the agent needs to access",
      "Human review points and escalation paths",
      "Accuracy, privacy and permission requirements",
    ],
    build: [
      "Agents connected to your approved data sources",
      "Multi-step workflows across tools and systems",
      "Document processing and information extraction pipelines",
      "Internal assistants for staff",
    ],
    tech: ["Google ADK", "Vertex AI", "Gemini", "Python", "REST APIs"],
    deliverables: [
      "Deployed agent within your environment",
      "Technical documentation",
      "Testing and acceptance results",
      "Handover to your internal team",
    ],
  },
  {
    num: "03",
    slug: "automation",
    title: "Intelligent Automation & Managed Engineering",
    summary:
      "We build connected workflows and provide ongoing technical support for deployed systems.",
    capabilities: [
      "Business process automation",
      "Google Workspace integrations",
      "Microsoft 365 integrations",
      "API integrations",
      "Automated reporting",
      "System maintenance and improvements",
    ],
    problem:
      "Information is often re-entered across disconnected applications, reports are compiled manually and processes depend on individuals remembering each step.",
    assess: [
      "Manual steps and hand-offs within existing processes",
      "Applications that need to exchange information",
      "Reporting requirements and data quality",
      "Ongoing support and maintenance needs",
    ],
    build: [
      "Automated workflows between business applications",
      "Google Workspace and Microsoft 365 integrations",
      "Scheduled and automated reporting",
      "Agreed ongoing maintenance and improvements",
    ],
    tech: ["Google Workspace", "Microsoft 365", "Python", "REST APIs", "Workflow automation platforms"],
    deliverables: [
      "Deployed and documented workflows",
      "Integration configuration",
      "Support agreement defining scope and response",
      "Change request process",
    ],
  },
];

export const INDUSTRIES = [
  ["Financial services & insurance", "Document review, claims intake, internal knowledge assistants."],
  ["Retail & ecommerce", "Order workflows, catalogue data, customer enquiry handling."],
  ["Logistics & supply chain", "Shipment documents, status reporting, system integrations."],
  ["Healthcare administration", "Administrative workflows, scheduling, records processing."],
  ["Professional services", "Proposal preparation, research support, client reporting."],
  ["Manufacturing", "Operational reporting, quality documentation, procurement workflows."],
  ["Education", "Administrative processes, enquiries, information management."],
] as const;
