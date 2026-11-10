import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const TITLE = "Privacy Policy | Haki Systems";
const DESC = "How Haki Systems collects, uses and retains information you share with us on WhatsApp.";

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
        This website does not run a contact form and does not operate any account system. The
        only way to contact us through the site is via WhatsApp. This policy explains how Haki
        Systems handles information you choose to send us through that conversation.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you message us on WhatsApp, we see the information WhatsApp provides for that
        conversation (such as your phone number and display name) and whatever you choose to tell
        us, such as your name, organisation, role and the business challenge you want to discuss.
      </p>
      <p>
        We do not ask for, and you should not submit, passwords, API keys, credentials, private
        keys or confidential documents over WhatsApp.
      </p>
      <h2>Why we collect it and how we use it</h2>
      <p>
        We use the information from our WhatsApp conversation with you to respond, arrange a
        consultation and, where appropriate, prepare a proposal or scope for a project. We do not
        sell your information or use it for unrelated marketing purposes.
      </p>
      <h2>WhatsApp</h2>
      <p>
        WhatsApp is operated by WhatsApp LLC / Meta, not by Haki Systems. Messages you send us are
        also subject to WhatsApp's own privacy policy and terms, which govern how WhatsApp
        transmits and secures message content.
      </p>
      <h2>Retention</h2>
      <p>
        We retain WhatsApp correspondence for up to 24 months after our last meaningful contact,
        unless a longer retention period is required for an ongoing engagement or by law.
      </p>
      <h2>Your rights and contacting us</h2>
      <p>
        You may ask us to access, correct or delete the information you have shared with us by
        messaging us on <Link to="/contact" className="underline">WhatsApp</Link>.
      </p>
    </LegalPage>
  );
}
