import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const TITLE = "Terms of Service | Haki Systems";
const DESC = "Terms governing the use of the Haki Systems website.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Terms,
});

function Terms() {
  const lastUpdated = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LegalPage title="Terms of Service" updated={lastUpdated}>
      <p>
        These terms govern your use of this website, operated by Haki Systems. By using this
        website, you agree to the terms set out here and to the lawful use of the information and
        services described on the site.
      </p>
      <h2>Website information</h2>
      <p>
        Content on this website is general information about our services. It is not a proposal,
        quotation or professional advice. Engagements are individually assessed and governed by a
        separate written agreement.
      </p>
      <h2>Enquiries</h2>
      <p>
        Messaging us on WhatsApp does not create a contract or obligation for either party. Do not
        send passwords, credentials, private keys or confidential documents over WhatsApp or
        through this website.
      </p>
      <h2>Third-party services</h2>
      <p>
        Technologies named on this website are trademarks of their respective owners. Their mention
        does not imply partnership, certification or endorsement. Third-party infrastructure and
        usage costs for client projects are billed by those providers directly.
      </p>
      <h2>Intellectual property</h2>
      <p>The website design, text and brand marks are owned by Haki Systems unless stated otherwise.</p>
      <h2>Liability</h2>
      <p>
        To the extent permitted by law, we provide this website on an "as is" basis and are not
        liable for loss or damage arising from reliance on general website content or from the use
        of the website itself.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of South Africa, without prejudice to any mandatory
        consumer protections that may apply in the jurisdiction in which the relevant service is
        delivered.</p>
    </LegalPage>
  );
}
