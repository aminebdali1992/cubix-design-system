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
import {
  checkboxItemPropRows,
  contentPropRows,
  contextMenuKeyboardRows,
  contextMenuPropRows,
  itemPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  triggerPropRows,
} from "./context-menu-table-data"
import { ContextMenuBasicDemo } from "./examples/context-menu-basic-demo"
import { ContextMenuCheckboxDemo } from "./examples/context-menu-checkbox-demo"
import { ContextMenuCheckboxIconsDemo } from "./examples/context-menu-checkbox-icons-demo"
import { ContextMenuDemo } from "./examples/context-menu-demo"
import { ContextMenuDestructiveDemo } from "./examples/context-menu-destructive-demo"
import { ContextMenuIconsDemo } from "./examples/context-menu-icons-demo"
import { ContextMenuIndicatorDemo } from "./examples/context-menu-indicator-demo"
import { ContextMenuRadioDemo } from "./examples/context-menu-radio-demo"
import { ContextMenuSubmenuDemo } from "./examples/context-menu-submenu-demo"

const description =
  "Displays a menu of actions at the pointer, opened with a right click or long press."

export const metadata: Metadata = {
  title: "Context Menu",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/context-menu"
const EXAMPLES_DIR = "app/docs/components/context-menu/examples"

function loadContextMenuExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuItem
    ├── ContextMenuSeparator
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioGroup
    │   └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
            └── ContextMenuItem`

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
      <ComponentPreview code={code} previewClassName="min-h-40">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ContextMenuPage() {
  const demoSource = loadContextMenuExample("context-menu-demo.tsx")
  const basicSource = loadContextMenuExample("context-menu-basic-demo.tsx")
  const iconsSource = loadContextMenuExample("context-menu-icons-demo.tsx")
  const submenuSource = loadContextMenuExample("context-menu-submenu-demo.tsx")
  const checkboxSource = loadContextMenuExample("context-menu-checkbox-demo.tsx")
  const checkboxIconsSource = loadContextMenuExample("context-menu-checkbox-icons-demo.tsx")
  const radioSource = loadContextMenuExample("context-menu-radio-demo.tsx")
  const indicatorSource = loadContextMenuExample("context-menu-indicator-demo.tsx")
  const destructiveSource = loadContextMenuExample("context-menu-destructive-demo.tsx")
  const usageImport = extractDemoImports(basicSource)
  const usageSnippet = extractDemoJsx(basicSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Context Menu" description={description} slug="context-menu" />

      <ComponentPreview code={demoSource} previewClassName="min-h-48">
        <PreviewShell>
          <ContextMenuDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="context-menu" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          The menu reads <Code>dir</Code> and <Code>lang</Code> from the closest ancestor and
          carries them into the portaled content. Right click, long press, Shift+F10, or the
          ContextMenu key opens it at the pointer.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The trigger is focusable. The content is a <Code>menu</Code>, and checkbox and radio items
          announce their checked state. Focus moves into the menu when it opens and returns to the
          trigger when it closes.
        </p>
        <KeyboardTable data={contextMenuKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Basic"
          description={
            <>
              Right click the trigger area, long press it on touch screens, or focus it and press
              Shift+F10 or the menu key. Set <Code>disabled</Code> on an item to lock it.
            </>
          }
          code={basicSource}
        >
          <ContextMenuBasicDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place an icon before the label inside <Code>ContextMenuItem</Code> or{" "}
              <Code>ContextMenuSubTrigger</Code>. It sits at the start of the item (the right side
              in RTL).
            </>
          }
          code={iconsSource}
        >
          <ContextMenuIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Submenu"
          description={
            <>
              Nest menus with <Code>ContextMenuSub</Code>, <Code>ContextMenuSubTrigger</Code>, and{" "}
              <Code>ContextMenuSubContent</Code>. In RTL the submenu opens to the left and ArrowLeft
              opens it from the keyboard.
            </>
          }
          code={submenuSource}
        >
          <ContextMenuSubmenuDemo />
        </ExampleSection>

        <ExampleSection
          title="Checkboxes"
          description={
            <>
              Use <Code>ContextMenuCheckboxItem</Code> for options that turn on and off. The menu
              stays open while toggling.
            </>
          }
          code={checkboxSource}
        >
          <ContextMenuCheckboxDemo />
        </ExampleSection>

        <ExampleSection
          title="Checkboxes with icons"
          description={
            <>Icons sit before the label; the checkbox control stays at the end of the item.</>
          }
          code={checkboxIconsSource}
        >
          <ContextMenuCheckboxIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Radio"
          description={
            <>
              Use <Code>ContextMenuRadioGroup</Code> with <Code>ContextMenuRadioItem</Code> for
              exclusive choices.
            </>
          }
          code={radioSource}
        >
          <ContextMenuRadioDemo />
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
          <ContextMenuIndicatorDemo />
        </ExampleSection>

        <ExampleSection
          title="Destructive"
          description={
            <>
              Use <Code>variant=&quot;destructive&quot;</Code> on <Code>ContextMenuItem</Code> for
              irreversible actions such as delete.
            </>
          }
          code={destructiveSource}
        >
          <ContextMenuDestructiveDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">context-menu-trigger</code>,{" "}
            <code className="font-mono">context-menu-content</code>,{" "}
            <code className="font-mono">context-menu-item</code>,{" "}
            <code className="font-mono">context-menu-checkbox-item</code>,{" "}
            <code className="font-mono">context-menu-radio-group</code>,{" "}
            <code className="font-mono">context-menu-radio-item</code>,{" "}
            <code className="font-mono">context-menu-separator</code>,{" "}
            <code className="font-mono">context-menu-sub-trigger</code>,{" "}
            <code className="font-mono">context-menu-sub-content</code>) for targeting in tests and
            parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">ContextMenu</h3>
        <PropsTable data={contextMenuPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ContextMenuTrigger</h3>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ContextMenuContent</h3>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ContextMenuItem</h3>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ContextMenuCheckboxItem</h3>
        <PropsTable data={checkboxItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ContextMenuRadioGroup</h3>
        <PropsTable data={radioGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ContextMenuRadioItem</h3>
        <PropsTable data={radioItemPropRows} />
      </section>
    </article>
  )
}
