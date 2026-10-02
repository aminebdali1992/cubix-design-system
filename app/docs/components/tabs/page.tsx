import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { KeyboardTable } from "@/components/docs/keyboard-table"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { TabsControlledDemo } from "./examples/tabs-controlled-demo"
import { TabsCustomDemo } from "./examples/tabs-custom-demo"
import { TabsDemo } from "./examples/tabs-demo"
import { TabsDisabledDemo } from "./examples/tabs-disabled-demo"
import { TabsIconsDemo } from "./examples/tabs-icons-demo"
import { TabsRemovableDemo } from "./examples/tabs-removable-demo"
import { TabsVerticalDemo } from "./examples/tabs-vertical-demo"
import {
  tabsContentPropRows,
  tabsKeyboardRows,
  tabsListPropRows,
  tabsPropRows,
  tabsTriggerPropRows,
} from "./tabs-table-data"

const description =
  "A set of layered sections of content, known as tab panels, displayed one at a time."

export const metadata: Metadata = {
  title: "Tabs",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/tabs"
const EXAMPLES_DIR = "app/docs/components/tabs/examples"

function loadTabsExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Tabs
├── TabsList
│   └── TabsTrigger (value)
└── TabsContent (value)`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
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

export default function TabsPage() {
  const demoSource = loadTabsExample("tabs-demo.tsx")
  const iconsSource = loadTabsExample("tabs-icons-demo.tsx")
  const removableSource = loadTabsExample("tabs-removable-demo.tsx")
  const verticalSource = loadTabsExample("tabs-vertical-demo.tsx")
  const disabledSource = loadTabsExample("tabs-disabled-demo.tsx")
  const controlledSource = loadTabsExample("tabs-controlled-demo.tsx")
  const customSource = loadTabsExample("tabs-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Tabs" description={description} slug="tabs" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <TabsDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="tabs" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Every <Code>TabsTrigger</Code> is paired with a <Code>TabsContent</Code> that has the same{" "}
          <Code>value</Code>. Tabs start right-to-left and follow the closest <Code>dir</Code> on
          the page; pass <Code>dir</Code> to override it.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The list renders <Code>role=&quot;tablist&quot;</Code>, each trigger{" "}
          <Code>role=&quot;tab&quot;</Code> with <Code>aria-selected</Code>, and each panel{" "}
          <Code>role=&quot;tabpanel&quot;</Code> linked to its tab. Name the list with{" "}
          <Code>aria-label</Code>. The list is a single tab stop and arrow keys follow the reading
          direction. Removable tabs announce their Delete and Backspace shortcuts through{" "}
          <Code>aria-keyshortcuts</Code>.
        </p>
        <KeyboardTable data={tabsKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With icons"
          description={
            <>
              Put an icon inside the trigger and mark it with{" "}
              <Code>data-icon=&quot;inline-start&quot;</Code> so spacing follows the reading
              direction.
            </>
          }
          code={iconsSource}
        >
          <TabsIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Removable"
          description={
            <>
              Pass <Code>onRemove</Code> to a trigger to add a remove control at its end. When the
              active tab is removed, select its neighbor in the same handler.
            </>
          }
          code={removableSource}
        >
          <TabsRemovableDemo />
        </ExampleSection>

        <ExampleSection
          title="Vertical"
          description={
            <>
              Use <Code>orientation=&quot;vertical&quot;</Code> to stack the triggers. The list is
              placed at the inline start and ArrowUp / ArrowDown move between tabs.
            </>
          }
          code={verticalSource}
        >
          <TabsVerticalDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled tab"
          description="A disabled trigger cannot be selected, and arrow key navigation skips it."
          code={disabledSource}
        >
          <TabsDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>value</Code> and <Code>onValueChange</Code> to own the active tab, for
              example to drive it from step buttons.
            </>
          }
          code={controlledSource}
        >
          <TabsControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every base marks the active trigger with <Code>aria-selected=&quot;true&quot;</Code>,
              so one set of <Code>aria-selected:</Code> classes styles it on Base UI, React Aria,
              and Radix.
            </>
          }
          code={customSource}
        >
          <TabsCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>tabs</Code>, <Code>tabs-list</Code>, <Code>tabs-trigger</Code>,{" "}
            <Code>tabs-remove</Code>, <Code>tabs-content</Code>) for targeting in tests and parent
            selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Tabs</h3>
        <PropsTable data={tabsPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsList</h3>
        <PropsTable data={tabsListPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsTrigger</h3>
        <PropsTable data={tabsTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsContent</h3>
        <PropsTable data={tabsContentPropRows} />
      </section>
    </article>
  )
}
