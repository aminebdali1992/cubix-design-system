import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { PopoverAlignDemo } from "./examples/popover-align-demo"
import { PopoverCloseDemo } from "./examples/popover-close-demo"
import { PopoverDemo } from "./examples/popover-demo"
import { PopoverFormDemo } from "./examples/popover-form-demo"
import { PopoverSidesDemo } from "./examples/popover-sides-demo"
import {
  contentPropRows,
  popoverPropRows,
  subcomponentRows,
  triggerClosePropRows,
} from "./popover-table-data"

export const metadata: Metadata = {
  title: "Popover",
  description: "Displays rich content in a portal, triggered by a button.",
}

const PUBLIC_IMPORT = "@/components/cubix/popover"
const EXAMPLES_DIR = "app/docs/components/popover/examples"

function loadPopoverExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

/*
  Persian trigger buttons need lang="fa" so .group/button:lang(fa)
  picks the "IRANSans Cubix Button D" face (with U+0020 + 103%/47%
  baseline). Without it the trigger falls back to the generic face
  and Geist sets the baseline, so Persian looks unloaded/misaligned.
  Docs chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex items-center justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function PopoverPage() {
  const popoverDemoSource = loadPopoverExample("popover-demo.tsx")
  const popoverSidesSource = loadPopoverExample("popover-sides-demo.tsx")
  const popoverAlignSource = loadPopoverExample("popover-align-demo.tsx")
  const popoverFormSource = loadPopoverExample("popover-form-demo.tsx")
  const popoverCloseSource = loadPopoverExample("popover-close-demo.tsx")
  const usageImport = extractDemoImports(popoverDemoSource)
  const usageSnippet = extractDemoJsx(popoverDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Popover"
        description="Displays rich content in a portal, triggered by a button."
        slug="popover"
      />

      <ComponentPreview code={popoverDemoSource}>
        <PreviewShell>
          <PopoverDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="popover" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Sides"
          description={
            <>
              Use <Code>side</Code> to place the popover relative to the trigger.
            </>
          }
          code={popoverSidesSource}
        >
          <PopoverSidesDemo />
        </ExampleSection>

        <ExampleSection
          title="Align"
          description={
            <>
              Use <Code>align</Code> for logical alignment (ابتدا / انتها in RTL).
            </>
          }
          code={popoverAlignSource}
        >
          <PopoverAlignDemo />
        </ExampleSection>

        <ExampleSection
          title="With form"
          description={
            <>
              Popovers can hold interactive Cubix fields and actions. Opening keeps focus on the
              trigger; Tab moves into the panel.
            </>
          }
          code={popoverFormSource}
        >
          <PopoverFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Close"
          description={
            <>
              Use <Code>PopoverClose</Code> with a Cubix <Code>Button</Code> to dismiss from inside
              the panel.
            </>
          }
          code={popoverCloseSource}
        >
          <PopoverCloseDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The popover is not modal. Escape and
            clicking outside close it, and focus returns to the trigger. Use <Code>Dialog</Code>{" "}
            when you need a focus-trapped overlay.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Popover</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open state.
        </p>
        <PropsTable data={popoverPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PopoverTrigger / PopoverClose</h3>
        <p className="leading-relaxed text-muted-foreground">
          The trigger toggles the popover. PopoverClose closes it from inside the panel. Compose
          both with Cubix <Code>Button</Code> via <Code>render</Code>.
        </p>
        <PropsTable data={triggerClosePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PopoverContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The panel rendered in a portal, positioned relative to the trigger.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PopoverHeader / PopoverTitle / PopoverDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Optional layout and text helpers for the popover panel.
        </p>
        <PropsTable data={subcomponentRows} />
      </section>
    </article>
  )
}
