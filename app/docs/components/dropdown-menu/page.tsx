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
  dropdownMenuKeyboardRows,
  dropdownMenuPropRows,
  itemPropRows,
  labelPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  shortcutPropRows,
  subContentPropRows,
  subTriggerPropRows,
  triggerPropRows,
} from "./dropdown-menu-table-data"
import { DropdownMenuBasicDemo } from "./examples/dropdown-menu-basic-demo"
import { DropdownMenuCheckboxesDemo } from "./examples/dropdown-menu-checkboxes-demo"
import { DropdownMenuDemo } from "./examples/dropdown-menu-demo"
import { DropdownMenuDestructiveDemo } from "./examples/dropdown-menu-destructive-demo"
import { DropdownMenuIndicatorDemo } from "./examples/dropdown-menu-indicator-demo"
import { DropdownMenuRadioDemo } from "./examples/dropdown-menu-radio-demo"
import { DropdownMenuSubmenuDemo } from "./examples/dropdown-menu-submenu-demo"

const description = "Displays a menu of actions or options to the user, triggered by a button."

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/dropdown-menu"
const EXAMPLES_DIR = "app/docs/components/dropdown-menu/examples"

function loadDropdownMenuExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   └── DropdownMenuItem
    │       └── DropdownMenuShortcut
    ├── DropdownMenuSeparator
    ├── DropdownMenuCheckboxItem
    ├── DropdownMenuRadioGroup
    │   └── DropdownMenuRadioItem
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent`

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

export default function DropdownMenuPage() {
  const demoSource = loadDropdownMenuExample("dropdown-menu-demo.tsx")
  const basicSource = loadDropdownMenuExample("dropdown-menu-basic-demo.tsx")
  const submenuSource = loadDropdownMenuExample("dropdown-menu-submenu-demo.tsx")
  const checkboxesSource = loadDropdownMenuExample("dropdown-menu-checkboxes-demo.tsx")
  const radioSource = loadDropdownMenuExample("dropdown-menu-radio-demo.tsx")
  const indicatorSource = loadDropdownMenuExample("dropdown-menu-indicator-demo.tsx")
  const destructiveSource = loadDropdownMenuExample("dropdown-menu-destructive-demo.tsx")
  const usageImport = extractDemoImports(basicSource)
  const usageSnippet = extractDemoJsx(basicSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Dropdown Menu" description={description} slug="dropdown-menu" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <DropdownMenuDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="dropdown-menu" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Pass <Code>render=&#123;&lt;Button /&gt;&#125;</Code> to style the trigger as a Cubix
          Button. The menu reads <Code>dir</Code> and <Code>lang</Code> from the closest element on
          the page and carries them into the portaled content, so it opens aligned to the start edge
          of the trigger (the right edge in RTL).
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The trigger exposes <Code>aria-haspopup</Code> and <Code>aria-expanded</Code>, the content
          is a <Code>menu</Code>, and checkbox and radio items announce their checked state. Focus
          moves into the menu when it opens and returns to the trigger when it closes. Give
          icon-only triggers an <Code>aria-label</Code>.
        </p>
        <KeyboardTable data={dropdownMenuKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Basic"
          description={
            <>
              Group related items under a <Code>DropdownMenuLabel</Code> and split sections with{" "}
              <Code>DropdownMenuSeparator</Code>. Set <Code>disabled</Code> on an item to lock it.
            </>
          }
          code={basicSource}
        >
          <DropdownMenuBasicDemo />
        </ExampleSection>

        <ExampleSection
          title="Submenu"
          description={
            <>
              Nest menus with <Code>DropdownMenuSub</Code>, <Code>DropdownMenuSubTrigger</Code> and{" "}
              <Code>DropdownMenuSubContent</Code>. In RTL the submenu opens to the left and
              ArrowLeft opens it from the keyboard.
            </>
          }
          code={submenuSource}
        >
          <DropdownMenuSubmenuDemo />
        </ExampleSection>

        <ExampleSection
          title="Checkboxes"
          description={
            <>
              Use <Code>DropdownMenuCheckboxItem</Code> for options that turn on and off. The menu
              stays open while toggling, and without <Code>checked</Code> the state is kept when the
              menu closes and opens again.
            </>
          }
          code={checkboxesSource}
        >
          <DropdownMenuCheckboxesDemo />
        </ExampleSection>

        <ExampleSection
          title="Radio group"
          description={
            <>
              Use <Code>DropdownMenuRadioGroup</Code> with <Code>DropdownMenuRadioItem</Code> when
              only one option can be selected. Here the trigger shows the current choice.
            </>
          }
          code={radioSource}
        >
          <DropdownMenuRadioDemo />
        </ExampleSection>

        <ExampleSection
          title="Tick indicator"
          description={
            <>
              Set <Code>indicator=&quot;check&quot;</Code> to show a plain tick instead of the Cubix
              Checkbox or Radio. On a radio group it applies to every item in the group.
            </>
          }
          code={indicatorSource}
        >
          <DropdownMenuIndicatorDemo />
        </ExampleSection>

        <ExampleSection
          title="Destructive"
          description={
            <>
              Use <Code>variant=&quot;destructive&quot;</Code> on <Code>DropdownMenuItem</Code> for
              irreversible actions such as delete. The icon-only trigger is named with{" "}
              <Code>aria-label</Code>.
            </>
          }
          code={destructiveSource}
        >
          <DropdownMenuDestructiveDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>dropdown-menu-trigger</Code>, <Code>dropdown-menu-content</Code>,{" "}
            <Code>dropdown-menu-group</Code>, <Code>dropdown-menu-label</Code>,{" "}
            <Code>dropdown-menu-item</Code>, <Code>dropdown-menu-checkbox-item</Code>,{" "}
            <Code>dropdown-menu-radio-group</Code>, <Code>dropdown-menu-radio-item</Code>,{" "}
            <Code>dropdown-menu-separator</Code>, <Code>dropdown-menu-shortcut</Code>,{" "}
            <Code>dropdown-menu-sub-trigger</Code>, <Code>dropdown-menu-sub-content</Code>) for
            targeting in tests and parent selectors. Use the same props on Base UI, React Aria, and
            Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenu</h3>
        <PropsTable data={dropdownMenuPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuTrigger</h3>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuContent</h3>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuItem</h3>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuLabel</h3>
        <PropsTable data={labelPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuCheckboxItem</h3>
        <PropsTable data={checkboxItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuRadioGroup</h3>
        <PropsTable data={radioGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuRadioItem</h3>
        <PropsTable data={radioItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuShortcut</h3>
        <PropsTable data={shortcutPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuSubTrigger</h3>
        <PropsTable data={subTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuSubContent</h3>
        <PropsTable data={subContentPropRows} />

        <p className="leading-relaxed text-muted-foreground">
          <Code>DropdownMenuGroup</Code> takes <Code>className</Code> and <Code>children</Code>,{" "}
          <Code>DropdownMenuSeparator</Code> takes <Code>className</Code>, and{" "}
          <Code>DropdownMenuSub</Code> takes a <Code>DropdownMenuSubTrigger</Code> followed by a{" "}
          <Code>DropdownMenuSubContent</Code>.
        </p>
      </section>
    </article>
  )
}
