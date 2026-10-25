import type { Metadata } from "next";
import { TypeIcon } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  sectionHeadingClassName,
} from "../docs-shared";
import { radiusBaseRem, radiusScale, radiusSnippet } from "../theming/theming-data";

export const metadata: Metadata = {
  title: "Radius",
  description: "Corner radius in Cubix comes from one variable. Change it and every size updates.",
};

export default function RadiusPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Radius"
        description="All corner radii come from one variable. Change it once and every size updates."
      />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          <InlineCode>--radius</InlineCode> is the base corner radius (default{" "}
          <InlineCode>{radiusBaseRem}rem</InlineCode>). The other sizes are
          calculated from it:
        </p>
        <CodeBlock code={radiusSnippet} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Scale</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">Token</th>
                <th className="px-4 py-3 text-start font-semibold">Value</th>
                <th className="px-4 py-3 text-start font-semibold">Preview</th>
              </tr>
            </thead>
            <tbody>
              {radiusScale.map((row) => (
                <tr key={row.name} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">
                    --{row.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.value}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      aria-hidden
                      className="inline-block size-8 border border-border bg-muted"
                      style={{ borderRadius: `var(--${row.name})` }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Typography",
              description: "Text styles for interfaces, docs and chat.",
              href: "/docs/typeset",
              icon: TypeIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
