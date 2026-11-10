import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const TITLE = "Privacy Policy | Haki Systems";
const DESC = "How Haki Systems collects, uses and retains information submitted through our enquiry form.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const lastUpdated = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LegalPage title="Privacy Policy" updated={lastUpdated}>
      <p>
        This policy explains how Haki Systems collects, stores and uses information submitted
        through this website when you contact us or request further information about our services.
      </p>
      <h2>Information we collect</h2>
      <p>When you submit an enquiry, we may collect the information you choose to provide:</p>
      <ul>
        <li>Full name, company or organisation, business email and, where relevant, phone number</li>
        <li>Country and, where relevant, industry</li>
        <li>Service of interest, business challenge, existing systems, preferred consultation time and any additional context you provide</li>
        <li>Your consent to be contacted and the time of submission</li>
      </ul>
      <p>
        We also process your IP address temporarily to protect the form against abuse. We do not
        ask for, and you should not submit, passwords, API keys, credentials, private keys or
        confidential documents.
      </p>
      <h2>Why we collect it and how we use it</h2>
      <p>
        We use enquiry information to respond to your message, arrange a consultation and, where
        appropriate, prepare a proposal or scope for a project. We do not sell your information or
        use it for unrelated marketing purposes.
      </p>
      <h2>Service providers</h2>
      <ul>
        <li>Website hosting and technical infrastructure providers used to deliver and secure this site</li>
        <li>Email service providers used to receive and route business enquiries</li>
      </ul>
      <h2>Retention</h2>
      <p>
        We retain enquiry correspondence for up to 24 months after our last meaningful contact,
        unless a longer retention period is required for an ongoing engagement or by law.
      </p>
      <h2>Your rights and contacting us</h2>
      <p>
        You may ask us to access, correct or delete the information you have provided. You can
        request this through our <Link to="/contact" className="underline">contact page</Link> or
        by using the contact details shown on the site.
      </p>
    </LegalPage>
  );
}
