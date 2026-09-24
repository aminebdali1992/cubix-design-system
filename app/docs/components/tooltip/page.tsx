import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  TooltipDelayDemo,
  TooltipDemo,
  TooltipDisabledDemo,
  TooltipKeyboardDemo,
  TooltipRtlDemo,
  TooltipSidesDemo,
} from "@/components/examples/tooltip-examples"

import {
  contentPropRows,
  providerPropRows,
  tooltipPropRows,
  triggerPropRows,
} from "./tooltip-table-data"

const description =
  "A popup that displays information related to an element when it receives keyboard focus or hover."

export const metadata: Metadata = {
  title: "Tooltip",
  description,
}

const usageImport = `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/cubix/tooltip"`

const usageSnippet = `<Tooltip>
  <TooltipTrigger render={<Button variant="outline" />}>
    Hover
  </TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`

const layoutSnippet = `import { TooltipProvider } from "@/components/cubix/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}`

const compositionSnippet = `Tooltip
├── TooltipTrigger
└── TooltipContent`

const sidesSnippet = `<div className="flex flex-wrap gap-2">
  {(["left", "top", "bottom", "right"] as const).map((side) => (
    <Tooltip key={side}>
      <TooltipTrigger
        render={<Button variant="outline" className="w-fit capitalize" />}
      >
        {side}
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ))}
</div>`

const keyboardSnippet = `<Tooltip>
  <TooltipTrigger
    render={<Button variant="outline" size="icon-sm" aria-label="Save" />}
  >
    <SaveIcon />
  </TooltipTrigger>
  <TooltipContent>
    Save Changes <Kbd>S</Kbd>
  </TooltipContent>
</Tooltip>`

const disabledSnippet = `<Tooltip>
  <TooltipTrigger render={<span className="inline-block w-fit" />}>
    <Button variant="outline" disabled>
      Disabled
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>This feature is currently unavailable</p>
  </TooltipContent>
</Tooltip>`

const rtlSnippet = `<div dir="rtl" className="flex flex-wrap gap-2">
  {(["top", "bottom", "inline-start", "inline-end"] as const).map((side) => (
    <Tooltip key={side}>
      <TooltipTrigger render={<Button variant="outline" />}>
        {side}
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ))}
</div>`

export default function TooltipDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Tooltip"
        description={description}
        slug="tooltip"
      />

      <ComponentPreview code={usageSnippet} previewClassName="min-h-32">
        <TooltipDemo />
      </ComponentPreview>

      <ComponentInstall name="tooltip" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Add the Provider
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Place{" "}
          <code className="font-mono text-sm">TooltipProvider</code> near the
          root of your app so tooltips share delay and portal behavior.
        </p>
        <CodeBlock code={layoutSnippet} title="app/layout.tsx" />
      </section>

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
          <code className="font-mono text-sm">Tooltip</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Side</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="font-mono text-sm">side</code> prop to change the
          position of the tooltip.
        </p>
        <ComponentPreview code={sidesSnippet} previewClassName="min-h-32">
          <TooltipSidesDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Keyboard Shortcut
        </h2>
        <ComponentPreview code={keyboardSnippet} previewClassName="min-h-32">
          <TooltipKeyboardDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Disabled Button
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Show a tooltip on a disabled button by wrapping it with a{" "}
          <code className="font-mono text-sm">span</code>.
        </p>
        <ComponentPreview code={disabledSnippet} previewClassName="min-h-32">
          <TooltipDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Prefer logical sides like{" "}
          <code className="font-mono text-sm">inline-start</code> and{" "}
          <code className="font-mono text-sm">inline-end</code> when mirroring
          layout with{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code>.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-32">
          <TooltipRtlDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Delay</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap tooltips in{" "}
          <code className="font-mono text-sm">TooltipProvider</code> to share a
          custom open delay across a tree.
        </p>
        <ComponentPreview
          code={`<TooltipProvider delay={700}>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" />}>
      Slow open
    </TooltipTrigger>
    <TooltipContent>Opens after 700ms</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
          previewClassName="min-h-32"
        >
          <TooltipDelayDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Tooltip documentation for primitive props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            TooltipProvider
          </h3>
          <PropsTable data={providerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Tooltip</h3>
          <PropsTable data={tooltipPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            TooltipTrigger
          </h3>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            TooltipContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>
      </section>
    </article>
  )
}
