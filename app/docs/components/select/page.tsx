import type { Metadata } from "next";
import { CircleAlertIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { selectPropRows } from "./select-table-data";

export const metadata: Metadata = {
  title: "Select",
  description: "Displays a native select control with Cubix styling.",
};

const usageImport = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select"`;

const usageSnippet = `<Select defaultValue="apple">
  <SelectTrigger className="w-full max-w-sm">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
  </SelectContent>
</Select>`;

export default function SelectPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Select"
        description="Displays a list of options for the user to pick from, triggered by a button."
        slug="select"
      />

      <ComponentPreview code={usageSnippet}>
        <Select defaultValue="apple">
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
          </SelectContent>
        </Select>
      </ComponentPreview>

      <ComponentInstall name="select" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With label and helper text
          </h3>
          <ComponentPreview
            code={`<div className="grid w-full max-w-sm gap-2">
  <label htmlFor="framework" className="text-sm font-medium">Framework</label>
  <Select defaultValue="next">
    <SelectTrigger id="framework" className="w-full">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="vite">Vite</SelectItem>
      <SelectItem value="astro">Astro</SelectItem>
    </SelectContent>
  </Select>
  <p className="text-sm text-muted-foreground">Choose the framework for your project.</p>
</div>`}
          >
            <div className="grid w-full max-w-sm gap-2">
              <label htmlFor="framework" className="text-sm font-medium">
                Framework
              </label>
              <Select defaultValue="next">
                <SelectTrigger id="framework" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="vite">Vite</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose the framework for your project.
              </p>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid state
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">aria-invalid</code> to
            switch to destructive border and ring styles.
          </p>
          <ComponentPreview
            code={`<Select defaultValue="admin">
  <SelectTrigger aria-invalid className="w-full max-w-sm">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="member">Member</SelectItem>
  </SelectContent>
</Select>`}
          >
            <Select defaultValue="admin">
              <SelectTrigger aria-invalid className="w-full max-w-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <ComponentPreview
            code={`<Select defaultValue="disabled" disabled>
  <SelectTrigger className="w-full max-w-sm">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="disabled">Disabled</SelectItem>
  </SelectContent>
</Select>`}
          >
            <Select defaultValue="disabled" disabled>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <ComponentPreview
            code={`<form className="grid w-full max-w-sm gap-3">
  <Select name="plan" defaultValue="pro">
    <SelectTrigger className="w-full">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="free">Free</SelectItem>
      <SelectItem value="pro">Pro</SelectItem>
      <SelectItem value="team">Team</SelectItem>
    </SelectContent>
  </Select>
  <Button type="submit">Save plan</Button>
</form>`}
          >
            <form className="grid w-full max-w-sm gap-3">
              <Select name="plan" defaultValue="pro">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">Save plan</Button>
            </form>
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The select is a
            composed control. Put items in{" "}
            <code className="font-mono">SelectContent</code> and size the
            trigger with <code className="font-mono">className</code>.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={selectPropRows} />
      </section>
    </article>
  );
}
