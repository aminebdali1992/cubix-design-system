import type { Metadata } from "next";
import Link from "next/link";

import { DocsPageHeader, InlineCode, sectionHeadingClassName } from "../docs-shared";
import { swatches, tokenDocs } from "../theming/theming-data";

export const metadata: Metadata = {
  title: "Color Usage",
  description: "Cubix color system breakdown with best practices for text, backgrounds, borders and states.",
};

type Item = { name: string; variable: string; note?: string };

const textColors: Item[] = [
  { name: "text-foreground", variable: "--foreground", note: "Default text, headings, icons." },
  { name: "text-muted-foreground", variable: "--muted-foreground", note: "Descriptions, placeholders, secondary text." },
  { name: "text-primary", variable: "--primary", note: "Links and branded labels." },
  { name: "text-destructive", variable: "--destructive", note: "Errors and destructive actions." },
  { name: "text-success-text", variable: "--success-text", note: "Success messages." },
  { name: "text-warning-text", variable: "--warning-text", note: "Warning messages." },
  { name: "text-info-text", variable: "--info-text", note: "Informational text." },
];

const backgroundColors: Item[] = [
  { name: "bg-background", variable: "--background", note: "Page background." },
  { name: "bg-card", variable: "--card", note: "Cards and panels." },
  { name: "bg-popover", variable: "--popover", note: "Menus, popovers, tooltips content." },
  { name: "bg-muted", variable: "--muted", note: "Subtle fills, hover rows, skeletons." },
  { name: "bg-secondary", variable: "--secondary", note: "Secondary buttons." },
  { name: "bg-accent", variable: "--accent", note: "Hover and active surfaces." },
  { name: "bg-sidebar", variable: "--sidebar", note: "Sidebar surface." },
];

const borderColors: Item[] = [
  { name: "border-border", variable: "--border", note: "Cards, tables, separators." },
  { name: "border-input", variable: "--input", note: "Inputs and outline controls." },
  { name: "ring-ring", variable: "--ring", note: "Focus rings." },
  { name: "border-sidebar-border", variable: "--sidebar-border", note: "Sidebar dividers." },
];

const accentColors: Item[] = [
  { name: "bg-primary", variable: "--primary", note: "Primary buttons, selected controls." },
  { name: "bg-destructive", variable: "--destructive", note: "Destructive buttons, invalid states." },
  { name: "bg-overlay", variable: "--overlay", note: "Light scrim." },
  { name: "bg-overlay-strong", variable: "--overlay-strong", note: "Dialog, Sheet and Drawer scrim." },
];

const statusColors: Item[] = [
  { name: "bg-success", variable: "--success", note: "Success messages, completed states." },
  { name: "bg-warning", variable: "--warning", note: "Warnings that need attention." },
  { name: "bg-info", variable: "--info", note: "Neutral information and tips." },
  { name: "bg-destructive", variable: "--destructive", note: "Errors and destructive actions." },
];


const usageGuide = [
  { situation: "Body text, headings, icons", classes: "text-foreground" },
  { situation: "Descriptions, hints, placeholders", classes: "text-muted-foreground" },
  { situation: "Links", classes: "text-primary" },
  { situation: "Field error message", classes: "text-destructive" },
  { situation: "Success, warning or info message on the page", classes: "text-success-text, text-warning-text, text-info-text" },
  { situation: "Page background", classes: "bg-background" },
  { situation: "Card or panel", classes: "bg-card text-card-foreground border-border" },
  { situation: "Menu, popover, dropdown", classes: "bg-popover text-popover-foreground" },
  { situation: "Hover or selected row", classes: "bg-accent text-accent-foreground" },
  { situation: "Subtle fill, skeleton", classes: "bg-muted" },
  { situation: "Primary button", classes: "bg-primary text-primary-foreground" },
  { situation: "Secondary button", classes: "bg-secondary text-secondary-foreground" },
  { situation: "Delete button", classes: "bg-destructive text-destructive-foreground" },
  { situation: "Status badge or filled alert", classes: "bg-success text-success-foreground (same for warning, info)" },
  { situation: "Input border", classes: "border-input" },
  { situation: "Focus outline", classes: "ring-ring" },
  { situation: "Dialog, Sheet or Drawer backdrop", classes: "bg-overlay-strong" },
];


const pClass = "leading-relaxed text-muted-foreground";

function TextGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-4 rounded-xl border p-4">
          <span className="text-2xl font-normal" style={{ color: `var(${item.variable})` }}>
            Aa
          </span>
          <div className="min-w-0 space-y-1">
            <p className="font-mono text-xs text-foreground">{item.name}</p>
            {item.note ? <p className="text-xs text-muted-foreground">{item.note}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function SurfaceGrid({
  items,
  kind = "fill",
  outline = true,
}: {
  items: Item[];
  kind?: "fill" | "border";
  /** Outline fills only when they are close to the page background. */
  outline?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.name} className="overflow-hidden rounded-xl border">
          <div className="flex h-24 items-center justify-center bg-muted/30 p-4">
            {kind === "fill" ? (
              <span
                aria-hidden
                className={`size-full rounded-lg${outline ? " border border-border" : ""}`}
                style={{ backgroundColor: `var(${item.variable})` }}
              />
            ) : (
              <span
                aria-hidden
                className="size-full rounded-lg border-2 bg-background"
                style={{ borderColor: `var(${item.variable})` }}
              />
            )}
          </div>
          <div className="space-y-1 border-t p-3">
            <p className="font-mono text-xs text-foreground">{item.name}</p>
            {item.note ? <p className="text-xs text-muted-foreground">{item.note}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Outline a swatch only when its lightness is close to the white page background. */
function isNearBackground(value: string) {
  const match = value.match(/oklch\(\s*([\d.]+)/);
  return match ? Number(match[1]) >= 0.9 : false;
}

export default function ColorUsagePage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Color Usage"
        description="Colors system breakdown with best practices. Use these semantic utilities whenever possible so text stays readable and fills stay balanced in light and dark mode."
      />

      <section className="space-y-4">
        <p className={pClass}>
          Every swatch on this page reads the live CSS variable, so it follows the current theme. Toggle
          dark mode in the header to compare. To change the values themselves, see{" "}
          <Link href="/docs/theming" className="text-foreground underline underline-offset-4">
            Theming
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Which color should I use?</h2>
        <p className={pClass}>
          Start here. Find what you are building in the left column and use the classes on the right. If
          nothing fits, use <InlineCode>text-foreground</InlineCode> on <InlineCode>bg-background</InlineCode>.
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">I am building</th>
                <th className="px-4 py-3 text-start font-semibold">Use</th>
              </tr>
            </thead>
            <tbody>
              {usageGuide.map((row) => (
                <tr key={row.situation} className="border-b last:border-0">
                  <td className="px-4 py-3 align-top text-xs text-foreground">{row.situation}</td>
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">{row.classes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Text</h2>
        <p className={pClass}>
          Use <InlineCode>text-foreground</InlineCode> for most text and{" "}
          <InlineCode>text-muted-foreground</InlineCode> for supporting text. Use accent text colors such as{" "}
          <InlineCode>text-destructive</InlineCode> sparingly to avoid visual overload.
        </p>
        <TextGrid items={textColors} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Background</h2>
        <p className={pClass}>
          Surfaces stack from <InlineCode>bg-background</InlineCode> up to cards and popovers. Use{" "}
          <InlineCode>bg-muted</InlineCode> and <InlineCode>bg-accent</InlineCode> for subtle fills and hover states.
        </p>
        <SurfaceGrid items={backgroundColors} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Border</h2>
        <p className={pClass}>
          Use <InlineCode>border-border</InlineCode> for layout dividers and <InlineCode>border-input</InlineCode>{" "}
          for form controls. Focus states always use <InlineCode>ring-ring</InlineCode>.
        </p>
        <SurfaceGrid items={borderColors} kind="border" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Other colors</h2>
        <p className={pClass}>
          Each fill pairs with a <InlineCode>-foreground</InlineCode> token for the text on top of it, for example{" "}
          <InlineCode>bg-primary text-primary-foreground</InlineCode>.
        </p>
        <SurfaceGrid items={accentColors} outline={false} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Status</h2>
        <p className={pClass}>
          Use status colors only to communicate state, never for decoration. Pair each fill with its{" "}
          <InlineCode>-foreground</InlineCode> token, for example <InlineCode>bg-success text-success-foreground</InlineCode>. For status text on the page background use the <InlineCode>-text</InlineCode> tokens, for example <InlineCode>text-success-text</InlineCode>.
        </p>
        <SurfaceGrid items={statusColors} outline={false} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Color palette</h2>
        <p className={pClass}>
          Every color token and its exact value from <InlineCode>app/globals.css</InlineCode>. Use it as a lookup; to choose a color, start with the guide at the top of this page.
        </p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">Token</th>
                <th className="px-4 py-3 text-start font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              {swatches.filter((row) => !row.token.startsWith("chart")).map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">--{row.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`size-3.5 shrink-0 rounded-[4px]${isNearBackground(row.light) ? " ring-1 ring-foreground/15" : ""}`}
                        style={{ background: row.light }}
                      />
                      {row.light}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Token reference</h2>
        <p className={pClass}>What each token controls, and where it shows up in Cubix components.</p>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-start font-semibold">Token</th>
                <th className="px-4 py-3 text-start font-semibold">Controls</th>
                <th className="px-4 py-3 text-start font-semibold">Used by</th>
              </tr>
            </thead>
            <tbody>
              {tokenDocs.filter((token) => !token.name.startsWith("chart")).map((token) => (
                <tr key={token.name} className="border-b last:border-0">
                  <td className="px-4 py-3 align-top font-mono text-xs text-foreground">{token.name}</td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">{token.controls}</td>
                  <td className="px-4 py-3 align-top text-xs text-muted-foreground">{token.usedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
