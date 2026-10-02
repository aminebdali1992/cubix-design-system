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
import { MenubarBasicDemo } from "./examples/menubar-basic-demo"
import { MenubarCheckboxDemo } from "./examples/menubar-checkbox-demo"
import { MenubarCheckboxIconsDemo } from "./examples/menubar-checkbox-icons-demo"
import { MenubarDemo } from "./examples/menubar-demo"
import { MenubarIconsDemo } from "./examples/menubar-icons-demo"
import { MenubarIndicatorDemo } from "./examples/menubar-indicator-demo"
import { MenubarRadioDemo } from "./examples/menubar-radio-demo"
import { MenubarSidesDemo } from "./examples/menubar-sides-demo"
import { MenubarSubmenuDemo } from "./examples/menubar-submenu-demo"
import {
  checkboxItemPropRows,
  contentPropRows,
  itemPropRows,
  menubarKeyboardRows,
  menubarPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  triggerPropRows,
} from "./menubar-table-data"

const description = "A visually persistent menu common in desktop applications."

export const metadata: Metadata = {
  title: "Menubar",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/menubar"
const EXAMPLES_DIR = "app/docs/components/menubar/examples"

function loadMenubarExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Menubar
├── MenubarMenu
│   ├── MenubarTrigger
│   └── MenubarContent
│       ├── MenubarItem
│       ├── MenubarSeparator
│       ├── MenubarCheckboxItem
│       ├── MenubarRadioGroup
│       │   └── MenubarRadioItem
│       └── MenubarSub
│           ├── MenubarSubTrigger
│           └── MenubarSubContent
└── MenubarMenu
    ├── MenubarTrigger
    └── MenubarContent`

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
      <ComponentPreview code={code} previewClassName="min-h-48">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function MenubarPage() {
  const demoSource = loadMenubarExample("menubar-demo.tsx")
  const basicSource = loadMenubarExample("menubar-basic-demo.tsx")
  const iconsSource = loadMenubarExample("menubar-icons-demo.tsx")
  const submenuSource = loadMenubarExample("menubar-submenu-demo.tsx")
  const checkboxSource = loadMenubarExample("menubar-checkbox-demo.tsx")
  const checkboxIconsSource = loadMenubarExample("menubar-checkbox-icons-demo.tsx")
  const radioSource = loadMenubarExample("menubar-radio-demo.tsx")
  const indicatorSource = loadMenubarExample("menubar-indicator-demo.tsx")
  const sidesSource = loadMenubarExample("menubar-sides-demo.tsx")
  const usageImport = extractDemoImports(basicSource)
  const usageSnippet = extractDemoJsx(basicSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Menubar" description={description} slug="menubar" />

      <ComponentPreview code={demoSource} previewClassName="min-h-48">
        <PreviewShell>
          <MenubarDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="menubar" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each <Code>MenubarMenu</Code> pairs a trigger with its content. The bar reads{" "}
          <Code>dir</Code> and <Code>lang</Code> from the closest ancestor, lays out triggers from
          the start edge (the right in RTL), and carries the locale into the portaled menus.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The bar is a <Code>menubar</Code> with roving focus between triggers. Each trigger exposes{" "}
          <Code>aria-haspopup</Code> and <Code>aria-expanded</Code>, each content is a{" "}
          <Code>menu</Code>, and checkbox and radio items announce their checked state.
        </p>
        <KeyboardTable data={menubarKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Basic"
          description={
            <>
              Split sections with <Code>MenubarSeparator</Code>. Set <Code>disabled</Code> on an
              item to lock it.
            </>
          }
          code={basicSource}
        >
          <MenubarBasicDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place an icon before the label inside <Code>MenubarItem</Code> or{" "}
              <Code>MenubarSubTrigger</Code>. It sits at the start of the item (the right side in
              RTL).
            </>
          }
          code={iconsSource}
        >
          <MenubarIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Submenu"
          description={
            <>
              Nest menus with <Code>MenubarSub</Code>, <Code>MenubarSubTrigger</Code>, and{" "}
              <Code>MenubarSubContent</Code>. In RTL the submenu opens to the left and ArrowLeft
              opens it from the keyboard.
            </>
          }
          code={submenuSource}
        >
          <MenubarSubmenuDemo />
        </ExampleSection>

        <ExampleSection
          title="Checkboxes"
          description={
            <>
              Use <Code>MenubarCheckboxItem</Code> for options that turn on and off. The menu stays
              open while toggling.
            </>
          }
          code={checkboxSource}
        >
          <MenubarCheckboxDemo />
        </ExampleSection>

        <ExampleSection
          title="Checkboxes with icons"
          description={
            <>Icons sit before the label; the checkbox control stays at the end of the item.</>
          }
          code={checkboxIconsSource}
        >
          <MenubarCheckboxIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Radio"
          description={
            <>
              Use <Code>MenubarRadioGroup</Code> with <Code>MenubarRadioItem</Code> for exclusive
              choices.
            </>
          }
          code={radioSource}
        >
          <MenubarRadioDemo />
        </ExampleSection>

        <ExampleSection
          title="Tick indicator"
          description={
            <>
              Set <Code>indicator=&quot;check&quot;</Code> to show a plain tick instead of the Cubix
              Checkbox or Radio. The default is <Code>&quot;control&quot;</Code>. On a radio group
              it applies to every item in the group.
            </>
          }
          code={indicatorSource}
        >
          <MenubarIndicatorDemo />
        </ExampleSection>

        <ExampleSection
          title="Sides"
          description={
            <>
              Use the <Code>side</Code> prop on <Code>MenubarContent</Code> to control placement.
            </>
          }
          code={sidesSource}
        >
          <MenubarSidesDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">menubar</code>,{" "}
            <code className="font-mono">menubar-menu</code>,{" "}
            <code className="font-mono">menubar-trigger</code>,{" "}
            <code className="font-mono">menubar-content</code>,{" "}
            <code className="font-mono">menubar-item</code>,{" "}
            <code className="font-mono">menubar-checkbox-item</code>,{" "}
            <code className="font-mono">menubar-radio-group</code>,{" "}
            <code className="font-mono">menubar-radio-item</code>,{" "}
            <code className="font-mono">menubar-separator</code>,{" "}
            <code className="font-mono">menubar-sub-trigger</code>,{" "}
            <code className="font-mono">menubar-sub-content</code>) for targeting in tests and
            parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Menubar</h3>
        <PropsTable data={menubarPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MenubarTrigger</h3>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MenubarContent</h3>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MenubarItem</h3>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MenubarCheckboxItem</h3>
        <PropsTable data={checkboxItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MenubarRadioGroup</h3>
        <PropsTable data={radioGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MenubarRadioItem</h3>
        <PropsTable data={radioItemPropRows} />
      </section>
    </article>
  )
}
