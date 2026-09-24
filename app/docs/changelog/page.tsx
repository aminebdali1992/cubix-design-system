import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/docs/code-block";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { changelogEntries } from "./changelog-data";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Latest Cubix updates and announcements - docs, agent UI, bases, and design system foundation.",
};

const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

export default function ChangelogPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Changelog
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Latest updates and announcements for Cubix - components, registry,
          CLI, and docs.
        </p>
      </header>

      <div className="space-y-16">
        {changelogEntries.map((entry) => (
          <section key={entry.id} className="space-y-6">
            <div className="space-y-2">
              <h2 className="scroll-m-20 font-semibold tracking-tight">
                {entry.date} - {entry.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {entry.summary}
              </p>
            </div>

            {entry.sections.map((section) => (
              <div key={section.heading} className="space-y-4">
                <h3 className="scroll-m-20 font-semibold tracking-tight">
                  {section.heading}
                </h3>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.code ? (
                  <CodeBlock
                    code={section.code.content}
                    title={section.code.title}
                    lang={section.code.lang}
                  />
                ) : null}
              </div>
            ))}
          </section>
        ))}
      </div>

      <section className="space-y-4 border-t border-border pt-10">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Stay current
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Install or update components with the{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>
          , follow{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>{" "}
          for new projects, and browse the{" "}
          <Link href="/docs/components" className={linkClassName}>
            Components
          </Link>{" "}
          catalog for what is available today.
        </p>
      </section>
    </article>
  );
}
