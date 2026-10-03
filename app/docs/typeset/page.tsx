import type { Metadata } from "next";
import Link from "next/link";
import { BlocksIcon, PaletteIcon, SparklesIcon } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import {
  DocsNextSteps,
  DocsPageHeader,
  linkClassName,
  sectionHeadingClassName,
} from "../docs-shared";
import {
  docsProseSnippet,
  families,
  importSnippet,
  largeSnippet,
  measureRows,
  oneOffSnippet,
  optOutSnippet,
  overrideSnippet,
  persianFontSnippet,
  persianSnippet,
  presetsSnippet,
  rhythmControls,
  trackingRows,
  typeRoles,
  typeScale,
  typesetBaseSnippet,
  usageSnippet,
} from "./typeset-data";

export const metadata: Metadata = {
  title: "Typeset",
  description:
    "Cubix typesetting: semantic roles, a Tailwind type scale, fluid display type, reading measure, and rhythm presets you own in CSS.",
};

export default function TypesetPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Typeset"
        description="A complete typesetting system for product UI, docs, and streaming chat. Semantic roles for meaning, a numeric scale for fine control, fluid display type, a 65ch reading measure, and rhythm presets you own in CSS."
      />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Markdown and CMS HTML arrive unstyled: headings, paragraphs, lists,
          tables. You can chase sizes and spacing per surface - blog, docs, chat
          - or share one rhythm that follows Cubix theme tokens.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Cubix Typeset is that shared layer. Use semantic roles (
          <code className="font-mono text-sm">text-headline</code>,{" "}
          <code className="font-mono text-sm">text-body</code>) when the
          meaning is clear. Use the numeric scale (
          <code className="font-mono text-sm">text-sm</code>) for chrome.
          Wrap long-form HTML in{" "}
          <code className="font-mono text-sm">typeset</code> when you need
          measure, heading steps, and block rhythm. This docs site uses{" "}
          <code className="font-mono text-sm">docs-prose</code> as its
          preset.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Principles
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Rhythm stays on five controls. Heading steps, list indent, optical
          tracking, and space under a title derive from them:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Control</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Role</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rhythmControls.map((row) => (
                <tr key={row.name} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {row.role}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Readable by default</strong> -
            body stays at 16px with at least 1.5 line-height. Display type
            tracks tighter. Persian on{" "}
            <code className="font-mono text-sm">[lang=fa]</code> uses IRANSans XV
            with a baseline-corrected font face, 0 heading
            tracking, and tuned prose leading. Type sizes match the
            documented scale exactly - no locale size shrink.
          </li>
          <li>
            <strong className="text-foreground">Fits the container</strong> -
            relative sizing follows surrounding UI; chat bubbles stay compact,
            articles can open up.
          </li>
          <li>
            <strong className="text-foreground">Uses your theme</strong> -
            colors, radius, and fonts come from Cubix tokens. Dark mode flips
            with them.
          </li>
          <li>
            <strong className="text-foreground">Owned CSS</strong> - presets
            live in your project so you can edit them without a plugin API.
          </li>
          <li>
            <strong className="text-foreground">Streaming-friendly</strong> -
            prefer one-direction spacing so new blocks do not restyle earlier
            ones.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Font families
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix loads Geist for UI and headings, Geist Mono for code, and
          IRANSans XV for Persian. Variables are set on{" "}
          <code className="font-mono text-sm">&lt;html&gt;</code> via{" "}
          <code className="font-mono text-sm">next/font</code>.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Token</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Family</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Usage</th>
              </tr>
            </thead>
            <tbody>
              {families.map((f) => (
                <tr key={f.name} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-xs font-medium text-foreground">
                    {f.name}
                  </td>
                  <td className={`px-4 py-3 align-top text-xs ${f.className}`}>
                    {f.value} - The quick brown fox jumps over the lazy dog.
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">
                    {f.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Type scale
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Product UI uses the Tailwind-aligned scale from{" "}
          <code className="font-mono text-sm">@theme</code> in{" "}
          <code className="font-mono text-sm">app/globals.css</code>. Type
          tokens stay as live CSS variables so utilities always resolve the
          documented size. Prefer roles (
          <code className="font-mono text-sm">text-label</code>,{" "}
          <code className="font-mono text-sm">text-caption</code>) for meaning;
          use the numeric scale for chrome and one-offs. Pixel sizes assume a{" "}
          <code className="font-mono text-sm">16px</code> root:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Token</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Size</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">
                  Line height
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Usage</th>
              </tr>
            </thead>
            <tbody>
              {typeScale.map((s) => (
                <tr key={s.token} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                    {s.token}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {s.size}
                    <span className="text-border"> / </span>
                    {s.px}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {s.lh}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {s.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Type roles
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Prefer roles when the content has a job. Pair headings with{" "}
          <code className="font-mono text-sm">font-heading</code>. Display and
          headline are fluid from a 320px viewport to 1280px so marketing type
          scales without extra breakpoints. Caption, label, and description
          keep size and tracking; set weight with{" "}
          <code className="font-mono text-sm">font-medium</code> on controls.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Cubix primitives use these roles by default:{" "}
          <code className="font-mono text-sm">text-label</code> on field titles;{" "}
          <code className="font-mono text-sm">text-caption</code> on input hints,
          Badge, and Kbd;{" "}
          <code className="font-mono text-sm">text-description</code> on Button,
          Card copy, and dialog descriptions;{" "}
          <code className="font-mono text-sm">text-body</code> on Card and
          Dialog titles. Numeric utilities remain for code, charts, and
          one-off layout.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Role</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Size</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">
                  Line height
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">
                  Tracking
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Weight</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Usage</th>
              </tr>
            </thead>
            <tbody>
              {typeRoles.map((s) => (
                <tr key={s.token} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                    {s.token}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {s.px}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {s.lh}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {s.tracking}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {s.weight}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {s.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Measure
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Line length is a first-class token. Keep body copy near 65
          characters. Shorter for asides, never much past 75:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Token</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Value</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Usage</th>
              </tr>
            </thead>
            <tbody>
              {measureRows.map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                    {row.token}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.value}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {row.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Optical tracking
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Large type needs tighter letter-spacing; small labels need a little
          air. Persian and RTL headings reset tracking to 0 on{" "}
          <code className="font-mono text-sm">[lang=fa]</code>:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Token</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Value</th>
                <th className="whitespace-nowrap px-4 py-3 text-start font-semibold">Usage</th>
              </tr>
            </thead>
            <tbody>
              {trackingRows.map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-foreground">
                    {row.token}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.value}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {row.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Persian
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Locale metrics live in Typeset, not in each component. Set{" "}
          <code className="font-mono text-sm">lang=&quot;fa&quot;</code> on a
          root or subtree. Utilities such as{" "}
          <code className="font-mono text-sm">text-description</code> read{" "}
          <code className="font-mono text-sm">var(--text-description)</code>, so
          IRANSans XV, tuned prose leading, and heading flow all follow.
          Type sizes stay on the documented scale (12 / 13 / 14 / 16px and up).
          Title-to-description stack stays the same as English.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Vertical centering is solved once, in the font face. Geist places its
          baseline exactly half a cap-height below the middle of a{" "}
          <code className="font-mono text-sm">leading-none</code> line box, which
          is why Latin labels look centered in fixed-height controls. IRANSans XV
          does not, so Cubix corrects it with{" "}
          <code className="font-mono text-sm">ascent-override</code> /{" "}
          <code className="font-mono text-sm">descent-override</code> on the{" "}
          <code className="font-mono text-sm">@font-face</code> itself. The total
          stays at 150%, so only the baseline moves - prose leading is unchanged,
          and no component needs per-button padding, a label wrapper, or a
          translate offset.
        </p>
        <CodeBlock
          code={persianFontSnippet}
          title="app/fonts/iran-sans.ts"
          lang="tsx"
        />
        <CodeBlock code={persianSnippet} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Building a typeset
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Long-form HTML uses the shipped{" "}
          <code className="font-mono text-sm">.typeset</code> class. It reads
          the rhythm variables, Cubix font tokens, and a 65ch measure:
        </p>
        <CodeBlock
          code={typesetBaseSnippet}
          title="app/globals.css"
          lang="css"
          collapsible
        />
        <p className="leading-relaxed text-muted-foreground">
          Keep tokens and utilities in the same CSS entry you already use for
          Cubix:
        </p>
        <CodeBlock code={importSnippet} title="app/globals.css" lang="css" />
        <p className="leading-relaxed text-muted-foreground">
          This documentation shell already seeds rhythm on{" "}
          <code className="font-mono text-sm">.docs-prose</code>:
        </p>
        <CodeBlock code={docsProseSnippet} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Presets
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          A typeset is a small preset class. Keep more than one in the same app
          - tighter for chat, roomier for docs:
        </p>
        <CodeBlock code={presetsSnippet} title="app/globals.css" lang="css" />
        <CodeBlock code={usageSnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          For a one-off tweak, set a variable on the container:
        </p>
        <CodeBlock code={oneOffSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Accessibility and dark mode
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Offer a larger preset for readers who need more space. Dark mode
          already follows{" "}
          <Link href="/docs/theming" className={linkClassName}>
            Theming
          </Link>{" "}
          tokens; loosen leading on dark surfaces if copy feels tight:
        </p>
        <CodeBlock code={largeSnippet} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Overrides and opt-out
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Prefer low-specificity selectors so Tailwind utilities win without{" "}
          <code className="font-mono text-sm">!important</code>:
        </p>
        <CodeBlock code={overrideSnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          Keep interactive Cubix components out of prose styling with{" "}
          <code className="font-mono text-sm">not-typeset</code>:
        </p>
        <CodeBlock code={optOutSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          In practice
        </h2>
        <div className="space-y-6 rounded-xl border border-border p-6 sm:p-8">
          <p className="font-heading text-display">
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="font-heading text-headline">
            Headline for a product page
          </p>
          <p className="font-heading text-title">Section title</p>
          <p className="text-lead text-muted-foreground">
            Lead copy uses text-lead at 18px with relaxed leading so the first
            paragraph can carry the page.
          </p>
          <div className="typeset typeset-docs max-w-prose">
            <p>
              Body copy sits at 16px and 1.6 line-height, capped near 65
              characters. That is the reading column WCAG and classic print
              practice both point at.
            </p>
            <p>
              A second paragraph gets flow spacing from the typeset, not from
              ad-hoc margins on each tag.
            </p>
          </div>
          <p className="text-description text-muted-foreground">
            Supporting UI copy uses text-description.
          </p>
          <p className="text-label">Field label</p>
          <p className="text-caption text-muted-foreground">
            Hint under an input uses text-caption.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Theming",
              description: "Color tokens Typeset inherits for dark mode.",
              href: "/docs/theming",
              icon: PaletteIcon,
            },
            {
              title: "Skills",
              description:
                "Steer assistants toward Typeset presets for prose and chat.",
              href: "/docs/skills",
              icon: SparklesIcon,
            },
            {
              title: "Components",
              description: "Controls that already use type roles by default.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
