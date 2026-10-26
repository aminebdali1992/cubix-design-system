import type { Metadata } from "next";
import { RulerIcon } from "lucide-react";

import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  sectionHeadingClassName,
} from "../docs-shared";

export const metadata: Metadata = {
  title: "Shadows",
  description: "Shadows used across Cubix components, from the base scale to component-specific elevations.",
};

type ShadowRowData = { name: string; value: string; usage: string };

const shadowScale: ShadowRowData[] = [
  { name: "shadow-none", value: "none", usage: "Removes elevation, for flat or inline surfaces." },
  { name: "shadow-xs", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)", usage: "Subtle depth for small controls." },
  { name: "shadow-sm", value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", usage: "Cards and resting surfaces." },
  { name: "shadow-md", value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", usage: "Dropdowns and popovers." },
  { name: "shadow-lg", value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", usage: "Menus and floating panels." },
  { name: "shadow-xl", value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", usage: "Dialogs and sheets." },
  { name: "shadow-2xl", value: "0 25px 50px -12px rgb(0 0 0 / 0.25)", usage: "Highest elevation, for overlays." },
];

const componentShadows: ShadowRowData[] = [
  {
    name: "Field",
    value: "shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] dark:shadow-[0_1px_3px_0_rgb(0_0_0/0.2)]",
    usage: "Text fields and icon boxes, such as the Page Header icon.",
  },
  {
    name: "Button",
    value:
      "shadow-[0_1px_3px_rgb(0_0_0/0.04),inset_0_1px_0_rgb(0_0_0/0.024)] dark:shadow-[0_1px_3px_rgb(0_0_0/0.2),inset_0_1px_0_rgb(255_255_255/0.04)]",
    usage: "Buttons, with a soft drop shadow and an inner highlight.",
  },
  {
    name: "Sidebar ring",
    value: "shadow-[0_0_0_1px_var(--sidebar-border)]",
    usage: "Outline ring for sidebar items.",
  },
  {
    name: "Sidebar ring (active)",
    value: "shadow-[0_0_0_1px_var(--sidebar-accent)]",
    usage: "Outline ring for the active sidebar item.",
  },
];

function ShadowTable({ rows, classFromName }: { rows: ShadowRowData[]; classFromName: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="w-44 px-4 py-3 text-start font-semibold">Token</th>
            <th className="px-4 py-3 text-start font-semibold">Value</th>
            <th className="px-4 py-3 text-start font-semibold">Usage</th>
            <th className="w-24 px-4 py-3 text-start font-semibold">Preview</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b last:border-0">
              <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{row.name}</td>
              <td className="px-4 py-3 font-mono text-xs break-all text-muted-foreground">{row.value}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.usage}</td>
              <td className="px-4 py-3">
                <span
                  aria-hidden
                  className={`inline-block size-8 rounded-md border border-border bg-background ${classFromName ? row.name : row.value}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ShadowPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Shadows"
        description="Shadows give surfaces depth. Use the base scale for general elevation and the component shadows for fields, buttons and the sidebar."
      />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Cubix uses the Tailwind shadow scale, such as <InlineCode>shadow-sm</InlineCode>, plus a few
          component-specific shadows that also adapt to dark mode.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Scale</h2>
        <ShadowTable rows={shadowScale} classFromName />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Component shadows</h2>
        <ShadowTable rows={componentShadows} classFromName={false} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Radius",
              description: "Corner radius scale for every component.",
              href: "/docs/radius",
              icon: RulerIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
