import type { Metadata } from "next";

import { RadioGroup, RadioGroupItem } from "@/components/cubix/radio-group";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import {
  radioGroupPropRows,
  radioPropRows,
  variantRows,
} from "./radio-group-table-data";

export const metadata: Metadata = {
  title: "Radio Group",
  description:
    "A set of checkable buttons where only one can be checked at a time.",
};

const usageImport = `import { RadioGroup, RadioGroupItem } from "@/components/cubix/radio-group"`;

const usageSnippet = `<RadioGroup defaultValue="comfortable">
  <RadioGroupItem value="default">Default</RadioGroupItem>
  <RadioGroupItem value="comfortable">Comfortable</RadioGroupItem>
  <RadioGroupItem value="compact">Compact</RadioGroupItem>
</RadioGroup>`;

export default function RadioGroupPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Radio Group"
        description="A set of checkable buttons where only one can be checked at a time."
        slug="radio-group"
      />

      {/* Hero preview */}
      <ComponentPreview code={usageSnippet}>
        <RadioGroup defaultValue="comfortable">
          <RadioGroupItem value="default">Default</RadioGroupItem>
          <RadioGroupItem value="comfortable">Comfortable</RadioGroupItem>
          <RadioGroupItem value="compact">Compact</RadioGroupItem>
        </RadioGroup>
      </ComponentPreview>

      <ComponentInstall name="radio-group" />

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
            With description
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose each radio with a title and supporting text for settings
            and plan pickers.
          </p>
          <ComponentPreview
            code={`<RadioGroup defaultValue="pro" className="w-full max-w-sm">
  <label className="flex items-start gap-3 rounded-lg border p-4 has-checked:border-primary">
    <RadioGroupItem value="free" className="mt-0.5" />
    <span className="grid gap-1.5 leading-none">
      <span className="font-medium">Free</span>
      <span className="text-sm text-muted-foreground">
        For personal projects and experiments.
      </span>
    </span>
  </label>
  <label className="flex items-start gap-3 rounded-lg border p-4 has-checked:border-primary">
    <RadioGroupItem value="pro" className="mt-0.5" />
    <span className="grid gap-1.5 leading-none">
      <span className="font-medium">Pro</span>
      <span className="text-sm text-muted-foreground">
        For teams that need extra components and support.
      </span>
    </span>
  </label>
</RadioGroup>`}
          >
            <RadioGroup defaultValue="pro" className="w-full max-w-sm">
              <label className="flex items-start gap-3 rounded-lg border p-4 has-checked:border-primary">
                <RadioGroupItem value="free" className="mt-0.5" />
                <span className="grid gap-1.5 leading-none">
                  <span className="font-medium">Free</span>
                  <span className="text-sm text-muted-foreground">
                    For personal projects and experiments.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-lg border p-4 has-checked:border-primary">
                <RadioGroupItem value="pro" className="mt-0.5" />
                <span className="grid gap-1.5 leading-none">
                  <span className="font-medium">Pro</span>
                  <span className="text-sm text-muted-foreground">
                    For teams that need extra components and support.
                  </span>
                </span>
              </label>
            </RadioGroup>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the whole group, or a single option.
          </p>
          <ComponentPreview
            code={`<div className="grid gap-6">
  <RadioGroup defaultValue="one" disabled>
    <RadioGroupItem value="one">All options locked</RadioGroupItem>
    <RadioGroupItem value="two">Cannot change</RadioGroupItem>
  </RadioGroup>
  <RadioGroup defaultValue="email">
    <RadioGroupItem value="email">Email</RadioGroupItem>
    <RadioGroupItem value="sms" disabled>SMS (unavailable)</RadioGroupItem>
    <RadioGroupItem value="push">Push</RadioGroupItem>
  </RadioGroup>
</div>`}
          >
            <div className="grid gap-6">
              <RadioGroup defaultValue="one" disabled>
                <RadioGroupItem value="one">All options locked</RadioGroupItem>
                <RadioGroupItem value="two">Cannot change</RadioGroupItem>
              </RadioGroup>
              <RadioGroup defaultValue="email">
                <RadioGroupItem value="email">Email</RadioGroupItem>
                <RadioGroupItem value="sms" disabled>
                  SMS (unavailable)
                </RadioGroupItem>
                <RadioGroupItem value="push">Push</RadioGroupItem>
              </RadioGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Sizes
          </h3>
          <ComponentPreview
            code={`<div className="grid gap-6">
  <RadioGroup defaultValue="default">
    <RadioGroupItem value="default" />
  </RadioGroup>
</div>`}
          >
            <div className="grid gap-6">
              <RadioGroup defaultValue="default">
                <label className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value="default" />
                  Default
                </label>
              </RadioGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Horizontal
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="font-mono text-sm">className=&quot;flex flex-row&quot;</code>{" "}
            to place options in a row.
          </p>
          <ComponentPreview
            code={`<RadioGroup defaultValue="left" className="flex flex-row gap-4">
  <RadioGroupItem value="left" />
  <RadioGroupItem value="center" />
  <RadioGroupItem value="right" />
</RadioGroup>`}
          >
            <RadioGroup defaultValue="left" className="flex flex-row gap-4">
              <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="left" />
                Left
              </label>
              <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="center" />
                Center
              </label>
              <label className="flex items-center gap-2 text-sm">
                <RadioGroupItem value="right" />
                Right
              </label>
            </RadioGroup>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">RadioGroup</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that manages selection, the shared form name, and layout.
        </p>
        <PropsTable data={radioGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">RadioGroupItem</h3>
        <p className="leading-relaxed text-muted-foreground">
          A single option. Must be rendered inside{" "}
          <code className="font-mono text-sm">RadioGroup</code>. Pass children
          to render a label, or compose your own.
        </p>
        <PropsTable data={radioPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Variants</h3>
        <PropsTable data={variantRows} />
      </section>
    </article>
  );
}
