import type { Metadata } from "next";
import { CircleAlertIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/cubix/input";
import { Button } from "@/components/cubix/button";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { inputPropRows } from "./input-table-data";

export const metadata: Metadata = {
  title: "Input",
  description:
    "Displays a form input field or a component that looks like an input field.",
};

const usageImport = `import { Input } from "@/components/cubix/input"`;

const usageSnippet = `<Input type="email" placeholder="Email" />`;

export default function InputPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Input"
        description="Displays a form input field or a component that looks like an input field."
        slug="input"
      />

      {/* Hero preview */}
      <ComponentPreview code={`<Input type="email" placeholder="Email" />`}>
        <Input type="email" placeholder="Email" className="max-w-sm" />
      </ComponentPreview>

      <ComponentInstall name="input" />

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Types
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Every native input type is supported - file inputs even get styled
            file-button treatment:
          </p>
          <ComponentPreview
            code={`<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="search" placeholder="Search..." />
<Input type="file" />`}
          >
            <div className="grid w-full max-w-sm gap-4">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Input type="search" placeholder="Search..." />
              <Input type="file" />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With icon
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose the Input with plain elements - icons are just siblings
            positioned with Tailwind:
          </p>
          <ComponentPreview
            code={`<div className="relative">
  <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-8" placeholder="Search..." />
</div>`}
          >
            <div className="relative w-full max-w-sm">
              <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search..." />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid state
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">aria-invalid</code> to
            switch to destructive border and ring styles - no extra prop
            needed:
          </p>
          <ComponentPreview
            code={`<Input type="email" placeholder="Email" aria-invalid />`}
          >
            <Input
              type="email"
              placeholder="Email"
              aria-invalid
              className="max-w-sm"
            />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <ComponentPreview code={`<Input disabled placeholder="Disabled" />`}>
            <Input disabled placeholder="Disabled" className="max-w-sm" />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Pair the Input with the Button to build native, accessible forms:
          </p>
          <ComponentPreview
            code={`<form className="flex w-full max-w-sm items-center gap-2">
  <Input type="email" placeholder="Email" />
  <Button type="submit">Subscribe</Button>
</form>`}
          >
            <form className="flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The input
            renders{" "}
            <code className="font-mono">data-slot=&quot;input&quot;</code> for
            targeting in tests and parent selectors, and switches to
            destructive styles automatically when{" "}
            <code className="font-mono">aria-invalid</code> is set.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={inputPropRows} />
      </section>
    </article>
  );
}
