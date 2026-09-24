import type { Metadata } from "next"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CollapsibleBasicDemo,
  CollapsibleDemo,
  CollapsibleFileTreeDemo,
  CollapsibleSettingsDemo,
} from "@/components/examples/collapsible-examples"
import {
  collapsiblePropRows,
  contentPropRows,
  triggerPropRows,
} from "./collapsible-table-data"

export const metadata: Metadata = {
  title: "Collapsible",
  description:
    "An interactive component which expands and collapses a panel.",
}

const usageImport = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/cubix/collapsible"`

const usageSnippet = `<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>`

const compositionSnippet = `Collapsible
├── CollapsibleTrigger
└── CollapsibleContent`

const controlledSnippet = `import * as React from "react"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}`

const demoSnippet = `<Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}
  className="flex w-full max-w-[350px] flex-col gap-2"
>
  <div className="flex items-center justify-between gap-4 px-4">
    <h4 className="text-sm font-semibold">Order #4189</h4>
    <CollapsibleTrigger
      render={<Button variant="ghost" size="icon" className="size-8" />}
    >
      <ChevronsUpDownIcon />
      <span className="sr-only">Toggle details</span>
    </CollapsibleTrigger>
  </div>
  <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
    <span className="text-muted-foreground">Status</span>
    <span className="font-medium">Shipped</span>
  </div>
  <CollapsibleContent className="flex flex-col gap-2">
    ...
  </CollapsibleContent>
</Collapsible>`

const basicSnippet = `<Collapsible className="rounded-md data-open:bg-muted">
  <CollapsibleTrigger
    render={<Button variant="ghost" className="w-full" />}
  >
    Product details
    <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
  </CollapsibleTrigger>
  <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
    This panel can be expanded or collapsed to reveal additional content.
  </CollapsibleContent>
</Collapsible>`

const settingsSnippet = `<Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}
  className="flex items-start gap-2"
>
  <div className="grid w-full grid-cols-2 gap-2">
    <Input placeholder="0" defaultValue={0} />
    <Input placeholder="0" defaultValue={0} />
    <CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
      <Input placeholder="0" defaultValue={0} />
      <Input placeholder="0" defaultValue={0} />
    </CollapsibleContent>
  </div>
  <CollapsibleTrigger render={<Button variant="outline" size="icon" />}>
    {isOpen ? <MinimizeIcon /> : <MaximizeIcon />}
  </CollapsibleTrigger>
</Collapsible>`

const fileTreeSnippet = `<Collapsible>
  <CollapsibleTrigger
    render={
      <Button
        variant="ghost"
        size="sm"
        className="group w-full justify-start"
      />
    }
  >
    <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" />
    <FolderIcon />
    components
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-1 ml-5">
    ...
  </CollapsibleContent>
</Collapsible>`

export default function CollapsibleDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Collapsible"
        description="An interactive component which expands and collapses a panel."
        slug="collapsible"
      />

      <ComponentPreview code={demoSnippet}>
        <CollapsibleDemo />
      </ComponentPreview>

      <ComponentInstall name="collapsible" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a{" "}
          <code className="font-mono text-sm">Collapsible</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Controlled State
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">open</code> and{" "}
          <code className="font-mono text-sm">onOpenChange</code> props to
          control the state.
        </p>
        <CodeBlock code={controlledSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <ComponentPreview code={basicSnippet}>
            <CollapsibleBasicDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Settings Panel
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use a trigger button to reveal additional settings.
          </p>
          <ComponentPreview code={settingsSnippet}>
            <CollapsibleSettingsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            File Tree
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use nested collapsibles to build a file tree.
          </p>
          <ComponentPreview code={fileTreeSnippet}>
            <CollapsibleFileTreeDemo />
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> See the Base UI
            or Radix UI Collapsible docs for the full primitive API.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Collapsible
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The root that manages open state and provides context to trigger
            and content.
          </p>
          <PropsTable data={collapsiblePropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            CollapsibleTrigger
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The control that toggles the panel. Compose it onto a{" "}
            <code className="font-mono text-sm">Button</code> when you need a
            styled trigger.
          </p>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            CollapsibleContent
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The panel that expands and collapses.
          </p>
          <PropsTable data={contentPropRows} />
        </div>
      </section>
    </article>
  )
}
