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
import { HoverCardDelayDemo } from "./examples/hover-card-delay-demo"
import { HoverCardDemo } from "./examples/hover-card-demo"
import { HoverCardSidesDemo } from "./examples/hover-card-sides-demo"
import { contentPropRows, hoverCardPropRows, triggerPropRows } from "./hover-card-table-data"

const description = "For sighted users to preview content available behind a link."

export const metadata: Metadata = {
  title: "HoverCard",
  description: "Displays rich content in a portal, triggered by a button.",
}

const PUBLIC_IMPORT = "@/components/cubix/hover-card"
const EXAMPLES_DIR = "app/docs/components/hover-card/examples"

function loadExample(fileName: string) {
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
      <ComponentPreview code={code} previewClassName="min-h-40">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function HoverCardPage() {
  const demoSource = loadExample("hover-card-demo.tsx")
  const sidesSource = loadExample("hover-card-sides-demo.tsx")
  const delaySource = loadExample("hover-card-delay-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Hover Card" description={description} slug="hover-card" />

      <ComponentPreview code={demoSource} previewClassName="min-h-40">
        <PreviewShell>
          <HoverCardDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="hover-card" />

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
              Use <Code>side</Code> on <Code>HoverCardContent</Code> to place the card on the top,
              right, bottom, or left of the trigger.
            </>
          }
          code={sidesSource}
        >
          <HoverCardSidesDemo />
        </ExampleSection>

        <ExampleSection
          title="Delay"
          description={
            <>
              Use <Code>openDelay</Code> and <Code>closeDelay</Code> on <Code>HoverCard</Code> to
              control how long the pointer must rest on, or leave, the trigger.
            </>
          }
          code={delaySource}
        >
          <HoverCardDelayDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Hover cards open on hover and
            keyboard focus only, not on touch. Do not put content there that users cannot reach
            another way. Use <Code>Popover</Code> for click-triggered panels.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">HoverCard</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open state and delays.
        </p>
        <PropsTable data={hoverCardPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">HoverCardTrigger</h3>
        <p className="leading-relaxed text-muted-foreground">
          The element that opens the card on hover or focus. Renders a link by default.
        </p>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">HoverCardContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The card rendered in a portal, positioned relative to the trigger.
        </p>
        <PropsTable data={contentPropRows} />
      </section>
    </article>
  )
}
