import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="container-k pb-24 pt-32 md:pt-40">
      <div className="max-w-2xl">
        <p className="eyebrow text-muted-foreground">Legal</p>
        <h1 className="display mt-4 text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="mt-12 space-y-5 leading-relaxed text-muted-foreground [&_h2]:heading [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_mark]:bg-secondary [&_mark]:px-1 [&_mark]:text-foreground [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}
