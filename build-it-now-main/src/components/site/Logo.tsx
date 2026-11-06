import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <rect width="32" height="32" rx="6" className="fill-current" />
      <path d="M10 8v16" className="stroke-background" strokeWidth="2.6" strokeLinecap="square" />
      <path d="M22 8l-8 8 8 8" fill="none" className="stroke-background" strokeWidth="2.6" strokeLinecap="square" />
      <rect x="21" y="14.5" width="3" height="3" className="fill-brand" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      to="/"
      aria-label="Kavira Systems — home"
      className={cn(
        "flex items-center gap-2.5",
        tone === "light" ? "text-ink-foreground" : "text-ink",
      )}
    >
      <BrandMark className={tone === "light" ? "[&_.stroke-background]:stroke-ink" : ""} />
      <span className="text-[1.02rem] font-medium tracking-tight">
        Kavira <span className="text-muted-foreground font-normal">Systems</span>
      </span>
    </Link>
  );
}
