import type { Metadata } from "next";

import { Switch } from "@/components/cubix/switch";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { propRows, variantRows } from "./switch-table-data";

export const metadata: Metadata = {
  title: "Switch",
  description:
    "A control that allows the user to toggle between checked and not checked.",
};

const usageImport = `import { Switch } from "@/components/cubix/switch"`;

const usageSnippet = `<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode">Airplane Mode</label>
</div>`;

export default function SwitchPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Switch"
        description="A control that allows the user to toggle between checked and not checked."
        slug="switch"
      />

      {/* Hero preview */}
      <ComponentPreview code={usageSnippet}>
        <div className="flex items-center gap-2">
          <Switch id="airplane-mode" />
          <label htmlFor="airplane-mode" className="text-sm font-medium">
            Airplane Mode
          </label>
        </div>
      </ComponentPreview>

      <ComponentInstall name="switch" />

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      {/* Examples */}
      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With label
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass children to render a label next to the switch, or compose your
            own label with{" "}
            <code className="font-mono text-sm">htmlFor</code>.
          </p>
          <ComponentPreview
            code={`<div className="grid gap-3">
  <Switch defaultChecked>Notifications</Switch>
  <Switch>Marketing emails</Switch>
</div>`}
          >
            <div className="grid gap-3">
              <Switch defaultChecked>Notifications</Switch>
              <Switch>Marketing emails</Switch>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <ComponentPreview
            code={`<div className="grid gap-3">
  <Switch disabled>Unavailable</Switch>
  <Switch disabled defaultChecked>Locked on</Switch>
</div>`}
          >
            <div className="grid gap-3">
              <Switch disabled>Unavailable</Switch>
              <Switch disabled defaultChecked>
                Locked on
              </Switch>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Sizes
          </h3>
          <ComponentPreview
            code={`<div className="grid gap-3">
  <div className="flex items-center gap-2">
    <Switch size="sm" id="switch-sm" />
    <label htmlFor="switch-sm">Small</label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="switch-default" />
    <label htmlFor="switch-default">Default</label>
  </div>
</div>`}
          >
            <div className="grid gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Switch size="sm" id="switch-sm" />
                <label htmlFor="switch-sm">Small</label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Switch id="switch-default" />
                <label htmlFor="switch-default">Default</label>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Settings row
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Pair a switch with a title and description for preference panels.
          </p>
          <ComponentPreview
            code={`<div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-lg border p-4">
  <div className="grid gap-1">
    <span className="text-sm font-medium">Share analytics</span>
    <span className="text-sm text-muted-foreground">
      Help us improve Cubix by sending anonymous usage data.
    </span>
  </div>
  <Switch defaultChecked aria-label="Share analytics" />
</div>`}
          >
            <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-lg border p-4">
              <div className="grid gap-1">
                <span className="text-sm font-medium">Share analytics</span>
                <span className="text-sm text-muted-foreground">
                  Help us improve Cubix by sending anonymous usage data.
                </span>
              </div>
              <Switch defaultChecked aria-label="Share analytics" />
            </div>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={propRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Variants</h3>
        <PropsTable data={variantRows} />
      </section>
    </article>
  );
}
