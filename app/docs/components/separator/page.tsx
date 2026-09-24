import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SeparatorDemo,
  SeparatorListDemo,
  SeparatorMenuDemo,
  SeparatorVerticalDemo,
} from "@/components/examples/separator-examples"

import { separatorPropRows } from "./separator-table-data"

const description = "Visually or semantically separates content."

export const metadata: Metadata = {
  title: "Separator",
  description,
}

const usageImport = `import { Separator } from "@/components/cubix/separator"`

const usageSnippet = `<Separator />`

const demoSnippet = `<div>
  <div className="space-y-1">
    <h4 className="text-sm leading-none font-medium">Cubix</h4>
    <p className="text-sm text-muted-foreground">
      Beautifully designed components you can copy and paste into your apps.
    </p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>`

const verticalSnippet = `<div className="flex h-5 items-center gap-4 text-sm">
  <div>Blog</div>
  <Separator orientation="vertical" />
  <div>Docs</div>
  <Separator orientation="vertical" />
  <div>Source</div>
</div>`

const menuSnippet = `<div className="flex items-center gap-2 text-sm md:gap-4">
  <div className="flex flex-col gap-1">
    <span className="font-medium">Settings</span>
    <span className="text-xs text-muted-foreground">
      Manage preferences
    </span>
  </div>
  <Separator orientation="vertical" />
  <div className="flex flex-col gap-1">
    <span className="font-medium">Account</span>
    <span className="text-xs text-muted-foreground">
      Profile & security
    </span>
  </div>
  <Separator orientation="vertical" />
  <div className="flex flex-col gap-1">
    <span className="font-medium">Help</span>
    <span className="text-xs text-muted-foreground">Support & docs</span>
  </div>
</div>`

const listSnippet = `<div className="flex flex-col gap-2 text-sm">
  <dl className="flex items-center justify-between">
    <dt>Item 1</dt>
    <dd className="text-muted-foreground">Value 1</dd>
  </dl>
  <Separator />
  <dl className="flex items-center justify-between">
    <dt>Item 2</dt>
    <dd className="text-muted-foreground">Value 2</dd>
  </dl>
  <Separator />
  <dl className="flex items-center justify-between">
    <dt>Item 3</dt>
    <dd className="text-muted-foreground">Value 3</dd>
  </dl>
</div>`

export default function SeparatorDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Separator"
        description={description}
        slug="separator"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-48">
        <SeparatorDemo />
      </ComponentPreview>

      <ComponentInstall name="separator" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Vertical</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">orientation=&quot;vertical&quot;</code>{" "}
          for a vertical separator.
        </p>
        <ComponentPreview code={verticalSnippet} previewClassName="min-h-32">
          <SeparatorVerticalDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Menu</h2>
        <p className="leading-relaxed text-muted-foreground">
          Vertical separators between menu items with descriptions.
        </p>
        <ComponentPreview code={menuSnippet} previewClassName="min-h-40">
          <SeparatorMenuDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">List</h2>
        <p className="leading-relaxed text-muted-foreground">
          Horizontal separators between list items.
        </p>
        <ComponentPreview code={listSnippet} previewClassName="min-h-40">
          <SeparatorListDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Separator documentation for primitive props.
        </p>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Separator
          </h3>
          <PropsTable data={separatorPropRows} />
        </div>
      </section>
    </article>
  )
}
