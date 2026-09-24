import type { Metadata } from "next";
import { CircleCheckIcon } from "lucide-react";

import { Checkbox } from "@/components/cubix/checkbox";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { propRows as checkboxPropRows, variantRows } from "./checkbox-table-data";

export const metadata: Metadata = {
  title: "Checkbox",
  description:
    "A control that allows the user to toggle between checked and unchecked states.",
};

const usageImport = `import { Checkbox } from "@/components/cubix/checkbox"`;

const usageSnippet = `<form>
  <fieldset>
    <legend>Choose your interests</legend>
    <div className="grid gap-2">
      <Checkbox id="ui" value="ui">UI</Checkbox>
      <Checkbox id="ux" value="ux">UX</Checkbox>
      <Checkbox id="uxresearch" value="uxresearch">UX Research</Checkbox>
    </div>
  </fieldset>
</form>`;

export default function CheckboxPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Checkbox"
        description="A control that allows the user to toggle between checked and unchecked states."
        slug="checkbox"
      />

      {/* Hero preview */}
      <ComponentPreview
        code={`<form>
  <fieldset>
    <legend>Choose your interests</legend>
    <div className="grid gap-2">
      <Checkbox id="ui" value="ui">UI</Checkbox>
      <Checkbox id="ux" value="ux">UX</Checkbox>
      <Checkbox id="uxresearch" value="uxresearch">UX Research</Checkbox>
    </div>
  </fieldset>
</form>`}
      >
        <form>
          <fieldset>
            <legend>Choose your interests</legend>
            <div className="grid gap-2">
              <Checkbox id="ui" value="ui">UI</Checkbox>
              <Checkbox id="ux" value="ux">UX</Checkbox>
              <Checkbox id="uxresearch" value="uxresearch">UX Research</Checkbox>
            </div>
          </fieldset>
        </form>
      </ComponentPreview>

      <ComponentInstall name="checkbox" />

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
            States
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use checked, indeterminate, and disabled states to communicate the
            current condition clearly.
          </p>
          <ComponentPreview
            code={`<fieldset className="grid gap-3">
  <Checkbox defaultChecked>Accepted</Checkbox>
  <Checkbox indeterminate>Partial selection</Checkbox>
  <Checkbox disabled>Unavailable</Checkbox>
</fieldset>`}
          >
            <fieldset className="grid gap-3">
              <Checkbox defaultChecked>Accepted</Checkbox>
              <Checkbox indeterminate>Partial selection</Checkbox>
              <Checkbox disabled>Unavailable</Checkbox>
            </fieldset>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With description
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose the Checkbox with a label and description to build settings
            rows and consent controls.
          </p>
          <ComponentPreview
            code={`<label className="flex items-start gap-3 rounded-lg border p-4">
  <Checkbox defaultChecked className="mt-0.5" />
  <span className="grid gap-1.5 leading-none">
    <span className="font-medium">Accept terms and conditions</span>
    <span className="text-sm text-muted-foreground">
      You agree to our Terms of Service and Privacy Policy.
    </span>
  </span>
</label>`}
          >
            <label className="flex w-full max-w-sm items-start gap-3 rounded-lg border p-4">
              <Checkbox defaultChecked className="mt-0.5" />
              <span className="grid gap-1.5 leading-none">
                <span className="font-medium">
                  Accept terms and conditions
                </span>
                <span className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </span>
              </span>
            </label>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Sizes
          </h3>
          <ComponentPreview
            code={`<div className="grid gap-3">
  <label className="flex items-center gap-2 text-sm">
    <Checkbox /> Default
  </label>
</div>`}
          >
            <div className="grid gap-3">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox /> Default
              </label>
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
        <PropsTable data={checkboxPropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Variants</h3>
        <PropsTable data={variantRows} />
      </section>
    </article>
  );
}
