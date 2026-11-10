import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WHATSAPP_BOOKING_MESSAGE } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = !["/privacy", "/terms"].includes(pathname);
  const solid = scrolled || open || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-border bg-background/95 backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="container-k flex h-16 items-center justify-between gap-6">
        <Logo tone={solid ? "dark" : "light"} />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className={cn(
                "text-sm transition-colors",
                solid
                  ? "text-muted-foreground hover:text-foreground data-[status=active]:text-foreground"
                  : "text-ink-muted hover:text-ink-foreground data-[status=active]:text-ink-foreground",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/contact"
            className={cn(
              "text-sm",
              solid ? "text-muted-foreground hover:text-foreground" : "text-ink-muted hover:text-ink-foreground",
            )}
          >
            Contact
          </Link>
          <WhatsAppButton
            message={WHATSAPP_BOOKING_MESSAGE}
            label="Book a Consultation"
            variant={solid ? "default" : "light"}
            size="sm"
            className="h-9 px-4"
          />
        </div>

        <button
          type="button"
          className={cn("md:hidden -mr-2 p-2", solid ? "text-foreground" : "text-ink-foreground")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background md:hidden">
          <div className="container-k flex flex-col py-4">
            {[...NAV, { to: "/contact", label: "Contact" } as const].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                className="border-b border-border py-3.5 text-base text-foreground last:border-0 data-[status=active]:text-brand"
              >
                {n.label}
              </Link>
            ))}
            <WhatsAppButton
              message={WHATSAPP_BOOKING_MESSAGE}
              label="Book a Consultation"
              size="xl"
              className="mt-4"
            />
          </div>
        </nav>
      )}
    </header>
  );
}
