import type { Metadata } from "next";
import { BlocksIcon, PackageIcon, TypeIcon } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  sectionHeadingClassName,
} from "../docs-shared";
import {
  addTokenSnippet,
  addTokenUsageSnippet,
  conventionSnippet,
  conventionUsageSnippet,
  cubixJsonSnippet,
  customizeCss,
  defaultThemeCss,
  radiusBaseRem,
  radiusScale,
  radiusSnippet,
  swatches,
  tokenDocs,
  utilitySnippet,
} from "./theming-data";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Theme Cubix with CSS variables and oklch tokens. Override semantic colors, radius, and dark mode in app/globals.css.",
};

function Swatch({ variable }: { variable: string }) {
  return (
    <span
      aria-hidden
      className="inline-block size-5 shrink-0 rounded-md border border-border"
      style={{ backgroundColor: `var(${variable})` }}
    />
  );
}

export default function ThemingPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Theming"
        description="Cubix is themed with CSS variables and semantic tokens. Override those tokens in your CSS to restyle the product without rewriting component classes."
      />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Components consume tokens like <InlineCode>background</InlineCode>,{" "}
          <InlineCode>foreground</InlineCode>, and{" "}
          <InlineCode>primary</InlineCode>. Tailwind maps them to utilities
          such as <InlineCode>bg-background</InlineCode> and{" "}
          <InlineCode>text-foreground</InlineCode>:
        </p>
        <CodeBlock code={utilitySnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          CSS variables are enabled by default in{" "}
          <InlineCode>cubix.json</InlineCode>:
        </p>
        <CodeBlock code={cubixJsonSnippet} title="cubix.json" lang="json" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Token convention</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix uses semantic background and foreground pairs. The base token
          sets the surface color; the <InlineCode>-foreground</InlineCode>{" "}
          token sets text and icons on that surface. The background suffix is
          omitted on the surface token - for example{" "}
          <InlineCode>primary</InlineCode> pairs with{" "}
          <InlineCode>primary-foreground</InlineCode>.
        </p>
        <CodeBlock code={conventionSnippet} title="app/globals.css" lang="css" />
        <p className="leading-relaxed text-muted-foreground">That maps to:</p>
        <CodeBlock code={conventionUsageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Color palette</h2>
        <p className="leading-relaxed text-muted-foreground">
          Defaults live under <InlineCode>:root</InlineCode> and{" "}
          <InlineCode>.dark</InlineCode> in{" "}
          <InlineCode>app/globals.css</InlineCode>. Preview chips use the live
          CSS variables, so they follow the current theme.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">Token</th>
                <th className="px-4 py-3 text-start font-semibold">Preview</th>
                <th className="px-4 py-3 text-start font-semibold">Light</th>
                <th className="px-4 py-3 text-start font-semibold">Dark</th>
              </tr>
            </thead>
            <tbody>
              {swatches.map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">
                    --{row.token}
                  </td>
                  <td className="px-4 py-2">
                    <Swatch variable={row.variable} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.light}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.dark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Theme tokens</h2>
        <p className="leading-relaxed text-muted-foreground">
          What each token controls, and where it shows up in Cubix components:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">Token</th>
                <th className="px-4 py-3 text-start font-semibold">Controls</th>
                <th className="px-4 py-3 text-start font-semibold">Used by</th>
              </tr>
            </thead>
            <tbody>
              {tokenDocs.map((token) => (
                <tr key={token.name} className="border-b last:border-0">
                  <td className="px-4 py-3 align-top font-mono text-xs font-medium text-foreground">
                    {token.name}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                    {token.controls}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                    {token.usedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Radius scale</h2>
        <p className="leading-relaxed text-muted-foreground">
          <InlineCode>--radius</InlineCode> is the base corner radius (default{" "}
          <InlineCode>{radiusBaseRem}rem</InlineCode>). Tailwind utilities derive from it
          so one change updates the whole scale:
        </p>
        <CodeBlock code={radiusSnippet} title="app/globals.css" lang="css" />
        <div className="my-6 overflow-x-auto rounded-xl border">
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
        <h2 className={sectionHeadingClassName}>Dark mode</h2>
        <p className="leading-relaxed text-muted-foreground">
          Dark mode is class-based. The same token names are overridden under{" "}
          <InlineCode>.dark</InlineCode>. This docs site uses{" "}
          <InlineCode>next-themes</InlineCode> with{" "}
          <InlineCode>attribute=&quot;class&quot;</InlineCode> on{" "}
          <InlineCode>&lt;html&gt;</InlineCode>. Toggle the sun / moon control
          in the header to try it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Customize</h2>
        <p className="leading-relaxed text-muted-foreground">
          Re-brand Cubix by overriding variables in{" "}
          <InlineCode>app/globals.css</InlineCode>. Everything built on those
          tokens updates automatically:
        </p>
        <CodeBlock code={customizeCss} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Adding new tokens</h2>
        <p className="leading-relaxed text-muted-foreground">
          Define the variable under <InlineCode>:root</InlineCode> and{" "}
          <InlineCode>.dark</InlineCode>, then expose it to Tailwind with{" "}
          <InlineCode>@theme inline</InlineCode>:
        </p>
        <CodeBlock code={addTokenSnippet} title="app/globals.css" lang="css" />
        <p className="leading-relaxed text-muted-foreground">
          Then use the utilities in your UI:
        </p>
        <CodeBlock code={addTokenUsageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Default theme CSS</h2>
        <p className="leading-relaxed text-muted-foreground">
          Neutral defaults from this project. Copy into your global CSS and
          adjust as needed:
        </p>
        <CodeBlock
          code={defaultThemeCss}
          title="app/globals.css"
          lang="css"
          collapsible
        />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Installation",
              description: "Wire tokens into a new or existing project.",
              href: "/docs/installation",
              icon: PackageIcon,
            },
            {
              title: "Typeset",
              description:
                "Type roles, measure, and rhythm presets that use the same tokens.",
              href: "/docs/typeset",
              icon: TypeIcon,
            },
            {
              title: "Components",
              description: "Browse controls that already speak these tokens.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
