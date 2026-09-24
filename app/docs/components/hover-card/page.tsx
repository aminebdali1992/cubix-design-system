import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  HoverCardDemo,
  HoverCardSidesDemo,
} from "@/components/examples/hover-card-examples"

import {
  contentPropRows,
  hoverCardPropRows,
  triggerPropRows,
} from "./hover-card-table-data"

const description =
  "For sighted users to preview content available behind a link."

export const metadata: Metadata = {
  title: "Hover Card",
  description,
}

const usageImport = `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/cubix/hover-card"`

const usageSnippet = `<HoverCard>
  <HoverCardTrigger render={<Button variant="link" />}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent>
    The React Framework - created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>`

const compositionSnippet = `HoverCard
├── HoverCardTrigger
└── HoverCardContent`

const delaySnippet = `<HoverCard>
  <HoverCardTrigger delay={100} closeDelay={200} render={<Button variant="link" />}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>`

const positioningSnippet = `<HoverCard>
  <HoverCardTrigger render={<Button variant="link" />}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    Content
  </HoverCardContent>
</HoverCard>`

const demoSnippet = `<HoverCard>
  <HoverCardTrigger
    delay={10}
    closeDelay={100}
    render={<Button variant="link" />}
  >
    Hover Here
  </HoverCardTrigger>
  <HoverCardContent className="flex w-64 flex-col gap-0.5">
    <div className="font-semibold">@nextjs</div>
    <div>The React Framework - created and maintained by @vercel.</div>
    <div className="mt-1 text-xs text-muted-foreground">
      Joined December 2021
    </div>
  </HoverCardContent>
</HoverCard>`

const sidesSnippet = `<HoverCard>
  <HoverCardTrigger
    delay={100}
    closeDelay={100}
    render={<Button variant="outline" className="capitalize" />}
  >
    top
  </HoverCardTrigger>
  <HoverCardContent side="top">
    <div className="flex flex-col gap-1">
      <h4 className="font-medium">Hover Card</h4>
      <p>This hover card appears on the top side of the trigger.</p>
    </div>
  </HoverCardContent>
</HoverCard>`

export default function HoverCardDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Hover Card"
        description={description}
        slug="hover-card"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-80">
        <HoverCardDemo />
      </ComponentPreview>

      <ComponentInstall name="hover-card" />

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
          <code className="font-mono text-sm">HoverCard</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Trigger Delays
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">delay</code> and{" "}
          <code className="font-mono text-sm">closeDelay</code> on the trigger to
          control when the card opens and closes. On Radix UI, set{" "}
          <code className="font-mono text-sm">openDelay</code> and{" "}
          <code className="font-mono text-sm">closeDelay</code> on{" "}
          <code className="font-mono text-sm">HoverCard</code> instead.
        </p>
        <CodeBlock code={delaySnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Positioning
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">side</code> and{" "}
          <code className="font-mono text-sm">align</code> props on{" "}
          <code className="font-mono text-sm">HoverCardContent</code> to control
          placement.
        </p>
        <CodeBlock code={positioningSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Basic</h2>
        <ComponentPreview code={demoSnippet} previewClassName="min-h-80">
          <HoverCardDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Sides</h2>
        <ComponentPreview
          code={sidesSnippet}
          previewClassName="min-h-[22rem]"
        >
          <HoverCardSidesDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            HoverCard
          </h3>
          <PropsTable data={hoverCardPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            HoverCardTrigger
          </h3>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            HoverCardContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>
      </section>
    </article>
  )
}
