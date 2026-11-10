import { Link } from "@tanstack/react-router";
import { BrandMark } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-k grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <BrandMark className="text-ink-foreground [&_.stroke-background]:stroke-ink" />
            <span className="font-medium tracking-tight">Haki Systems</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            Intelligent systems. Engineered around your business. AI engineering and intelligent
            automation for organisations in Zimbabwe, South Africa and internationally.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-ink-muted">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-brand">Services</Link></li>
            <li><Link to="/how-we-work" className="hover:text-brand">How We Work</Link></li>
            <li><Link to="/about" className="hover:text-brand">About</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-ink-muted">Start a project</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Tell us what you are trying to achieve and we will arrange a consultation.
          </p>
          <Link to="/contact" hash="enquiry" className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-brand">
            Send an enquiry →
          </Link>
          <WhatsAppButton variant="onDark" size="sm" className="mt-4" />
        </div>
      </div>
      <div className="border-t border-ink-border">
        <div className="container-k flex flex-col gap-3 py-6 text-xs text-ink-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Haki Systems. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-ink-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ink-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
