import type { Metadata } from "next";
import {
  BlocksIcon,
  PackageIcon,
  TerminalIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import {
  DocsNextSteps,
  DocsPageHeader,
  sectionHeadingClassName,
} from "../docs-shared";
import { changelogEntries } from "./changelog-data";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Latest Cubix updates and announcements - docs, agent UI, bases, and design system foundation.",
};

export default function ChangelogPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Changelog"
        description="Latest updates and announcements for Cubix - components, registry, CLI, and docs."
      />

      <div className="space-y-16">
        {changelogEntries.map((entry) => (
          <section key={entry.id} className="space-y-6">
            <div className="space-y-2">
              <h2 className={sectionHeadingClassName}>
                {entry.date} - {entry.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {entry.summary}
              </p>
            </div>

            {entry.sections.map((section) => (
              <div key={section.heading} className="space-y-4">
                <h3 className={sectionHeadingClassName}>{section.heading}</h3>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
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
        <h2 className={sectionHeadingClassName}>Stay current</h2>
        <DocsNextSteps
          steps={[
            {
              title: "CLI",
              description: "Install or update components from the registry.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
            {
              title: "Installation",
              description: "Bootstrap Cubix in a new project.",
              href: "/docs/installation",
              icon: PackageIcon,
            },
            {
              title: "Components",
              description: "See what is available today.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
