import type { Metadata } from "next"
import type { ReactNode } from "react"

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
import { TooltipDelayDemo } from "./examples/tooltip-delay-demo"
import { TooltipDemo } from "./examples/tooltip-demo"
import { TooltipDisabledDemo } from "./examples/tooltip-disabled-demo"
import { TooltipIconDemo } from "./examples/tooltip-icon-demo"
import { TooltipKeyboardDemo } from "./examples/tooltip-keyboard-demo"
import { TooltipSidesDemo } from "./examples/tooltip-sides-demo"
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

const PUBLIC_IMPORT = "@/components/cubix/tooltip"
const EXAMPLES_DIR = "app/docs/components/tooltip/examples"

function loadTooltipExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const layoutSnippet = `import type { ReactNode } from "react"

import { TooltipProvider } from "@/components/cubix/tooltip"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}`

const compositionSnippet = `TooltipProvider (optional)
└── Tooltip
    ├── TooltipTrigger
    └── TooltipContent`

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

export default function TooltipPage() {
  const tooltipDemoSource = loadTooltipExample("tooltip-demo.tsx")
  const tooltipSidesSource = loadTooltipExample("tooltip-sides-demo.tsx")
  const tooltipIconSource = loadTooltipExample("tooltip-icon-demo.tsx")
  const tooltipKeyboardSource = loadTooltipExample("tooltip-keyboard-demo.tsx")
  const tooltipDisabledSource = loadTooltipExample("tooltip-disabled-demo.tsx")
  const tooltipDelaySource = loadTooltipExample("tooltip-delay-demo.tsx")
  const usageImport = extractDemoImports(tooltipDemoSource)
  const usageSnippet = extractDemoJsx(tooltipDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Tooltip" description={description} slug="tooltip" />

      <ComponentPreview code={tooltipDemoSource}>
        <PreviewShell>
          <TooltipDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="tooltip" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Add the Provider</h2>
        <p className="leading-relaxed text-muted-foreground">
          Place <Code>TooltipProvider</Code> near the root of your app so tooltips share one open
          delay. It is optional: without it every tooltip opens immediately.
        </p>
        <CodeBlock code={layoutSnippet} title="app/layout.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          The tooltip opens on hover and on keyboard focus, and closes on Escape. It starts
          right-to-left and follows the closest <Code>dir</Code> on the page; pass <Code>dir</Code>{" "}
          to <Code>Tooltip</Code> to override it.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Side"
          description={
            <>
              Use <Code>side</Code> to choose where the tooltip appears. Prefer the logical values{" "}
              <Code>inline-start</Code> and <Code>inline-end</Code>: in RTL,{" "}
              <Code>inline-start</Code> is the right side of the trigger.
            </>
          }
          code={tooltipSidesSource}
        >
          <TooltipSidesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icon button"
          description={
            <>
              Give an icon-only trigger an <Code>aria-label</Code> so it has an accessible name for
              screen readers.
            </>
          }
          code={tooltipIconSource}
        >
          <TooltipIconDemo />
        </ExampleSection>

        <ExampleSection
          title="With keyboard shortcut"
          description={
            <>
              Put a Cubix <Code>Kbd</Code> inside the content to show the shortcut for an action.
            </>
          }
          code={tooltipKeyboardSource}
        >
          <TooltipKeyboardDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled button"
          description={
            <>
              A disabled button can&apos;t be hovered or focused, so render the trigger as a{" "}
              <Code>span</Code> with <Code>tabIndex=&#123;0&#125;</Code>. The tooltip then opens on
              hover and on keyboard focus.
            </>
          }
          code={tooltipDisabledSource}
        >
          <TooltipDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Delay"
          description={
            <>
              Pass <Code>delay</Code> to a single <Code>Tooltip</Code>, or to{" "}
              <Code>TooltipProvider</Code> to set a shared open delay for the tree.
            </>
          }
          code={tooltipDelaySource}
        >
          <TooltipDelayDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">TooltipProvider</h3>
        <p className="leading-relaxed text-muted-foreground">
          Optional. Shares one open delay between every tooltip in the tree.
        </p>
        <PropsTable data={providerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Tooltip</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open state.
        </p>
        <PropsTable data={tooltipPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TooltipTrigger</h3>
        <p className="leading-relaxed text-muted-foreground">
          The element that opens the tooltip on hover and focus. Compose it with Cubix{" "}
          <Code>Button</Code> via <Code>render</Code>.
        </p>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TooltipContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The popup rendered in a portal, positioned relative to the trigger.
        </p>
        <PropsTable data={contentPropRows} />
      </section>
    </article>
  )
}
