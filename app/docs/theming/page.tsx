import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/docs/code-block";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import {
  addTokenSnippet,
  addTokenUsageSnippet,
  conventionSnippet,
  conventionUsageSnippet,
  cubixJsonSnippet,
  customizeCss,
  defaultThemeCss,
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

const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

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
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Theming
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Cubix is themed with CSS variables and semantic tokens. Override those
          tokens in your CSS to restyle the product without rewriting component
          classes.
        </p>
      </header>

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Components consume tokens like{" "}
          <code className="font-mono text-sm">background</code>,{" "}
          <code className="font-mono text-sm">foreground</code>, and{" "}
          <code className="font-mono text-sm">primary</code>. Tailwind maps them
          to utilities such as{" "}
          <code className="font-mono text-sm">bg-background</code> and{" "}
          <code className="font-mono text-sm">text-foreground</code>:
        </p>
        <CodeBlock code={utilitySnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          CSS variables are enabled by default in{" "}
          <code className="font-mono text-sm">cubix.json</code>:
        </p>
        <CodeBlock code={cubixJsonSnippet} title="cubix.json" lang="json" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Token convention
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix uses semantic background and foreground pairs. The base token
          sets the surface color; the{" "}
          <code className="font-mono text-sm">-foreground</code> token sets text
          and icons on that surface. The background suffix is omitted on the
          surface token - for example{" "}
          <code className="font-mono text-sm">primary</code> pairs with{" "}
          <code className="font-mono text-sm">primary-foreground</code>.
        </p>
        <CodeBlock code={conventionSnippet} title="app/globals.css" lang="css" />
        <p className="leading-relaxed text-muted-foreground">
          That maps to:
        </p>
        <CodeBlock code={conventionUsageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Color palette
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Defaults live under{" "}
          <code className="font-mono text-sm">:root</code> and{" "}
          <code className="font-mono text-sm">.dark</code> in{" "}
          <code className="font-mono text-sm">app/globals.css</code>. Preview
          chips use the live CSS variables, so they follow the current theme.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Token</th>
                <th className="px-4 py-3 text-left font-semibold">Preview</th>
                <th className="px-4 py-3 text-left font-semibold">Light</th>
                <th className="px-4 py-3 text-left font-semibold">Dark</th>
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Theme tokens
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          What each token controls, and where it shows up in Cubix components:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Token</th>
                <th className="px-4 py-3 text-left font-semibold">Controls</th>
                <th className="px-4 py-3 text-left font-semibold">Used by</th>
              </tr>
            </thead>
            <tbody>
              {tokenDocs.map((t) => (
                <tr key={t.name} className="border-b last:border-0">
                  <td className="px-4 py-3 align-top font-mono text-xs font-medium text-foreground">
                    {t.name}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                    {t.controls}
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                    {t.usedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Radius scale
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          <code className="font-mono text-sm">--radius</code> is the base
          corner radius (default{" "}
          <code className="font-mono text-sm">0.625rem</code>). Tailwind utilities
          derive from it so one change updates the whole scale:
        </p>
        <CodeBlock code={radiusSnippet} title="app/globals.css" lang="css" />
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-semibold">Token</th>
                <th className="px-4 py-3 text-left font-semibold">Value</th>
                <th className="px-4 py-3 text-left font-semibold">Preview</th>
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
                      style={{
                        borderRadius: `var(--${row.name})`,
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Dark mode</h2>
        <p className="leading-relaxed text-muted-foreground">
          Dark mode is class-based. The same token names are overridden under{" "}
          <code className="font-mono text-sm">.dark</code>. This docs site uses{" "}
          <code className="font-mono text-sm">next-themes</code> with{" "}
          <code className="font-mono text-sm">attribute=&quot;class&quot;</code>{" "}
          on <code className="font-mono text-sm">&lt;html&gt;</code>. Toggle the
          sun / moon control in the header to try it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Customize</h2>
        <p className="leading-relaxed text-muted-foreground">
          Re-brand Cubix by overriding variables in{" "}
          <code className="font-mono text-sm">app/globals.css</code>. Everything
          built on those tokens updates automatically:
        </p>
        <CodeBlock code={customizeCss} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Adding new tokens
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Define the variable under{" "}
          <code className="font-mono text-sm">:root</code> and{" "}
          <code className="font-mono text-sm">.dark</code>, then expose it to
          Tailwind with <code className="font-mono text-sm">@theme inline</code>:
        </p>
        <CodeBlock code={addTokenSnippet} title="app/globals.css" lang="css" />
        <p className="leading-relaxed text-muted-foreground">
          Then use the utilities in your UI:
        </p>
        <CodeBlock code={addTokenUsageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Default theme CSS
        </h2>
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
        <p className="leading-relaxed text-muted-foreground">
          Next:{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>
          ,{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>
          , or browse{" "}
          <Link href="/docs/components" className={linkClassName}>
            Components
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
