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
  comboboxKeyboardRows,
  comboboxPropRows,
  contentPropRows,
  inputPropRows,
  itemPropRows,
} from "./combobox-table-data"
import { ComboboxAutoHighlightDemo } from "./examples/combobox-auto-highlight-demo"
import { ComboboxClearDemo } from "./examples/combobox-clear-demo"
import { ComboboxCustomDemo } from "./examples/combobox-custom-demo"
import { ComboboxCustomStylingDemo } from "./examples/combobox-custom-styling-demo"
import { ComboboxDemo } from "./examples/combobox-demo"
import { ComboboxDisabledDemo } from "./examples/combobox-disabled-demo"
import { ComboboxDisabledItemsDemo } from "./examples/combobox-disabled-items-demo"
import { ComboboxGroupsDemo } from "./examples/combobox-groups-demo"
import { ComboboxInputGroupDemo } from "./examples/combobox-input-group-demo"
import { ComboboxInvalidDemo } from "./examples/combobox-invalid-demo"
import { ComboboxMultipleDemo } from "./examples/combobox-multiple-demo"
import { ComboboxPopupDemo } from "./examples/combobox-popup-demo"
import { ComboboxSizesDemo } from "./examples/combobox-sizes-demo"

const description = "Autocomplete input and command palette with a list of suggestions."

export const metadata: Metadata = {
  title: "Combobox",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/combobox"
const EXAMPLES_DIR = "app/docs/components/combobox/examples"

function loadComboboxExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const simpleComposition = `Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        └── ComboboxItem`

const chipsComposition = `Combobox
├── ComboboxChips
│   └── ComboboxValue
│       ├── ComboboxChip
│       └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        └── ComboboxItem`

const groupsComposition = `Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        └── ComboboxGroup
            ├── ComboboxLabel
            ├── ComboboxCollection
            │   └── ComboboxItem
            └── ComboboxSeparator`

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
      <ComponentPreview code={code} previewClassName="min-h-56">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ComboboxPage() {
  const demoSource = loadComboboxExample("combobox-demo.tsx")
  const sizesSource = loadComboboxExample("combobox-sizes-demo.tsx")
  const multipleSource = loadComboboxExample("combobox-multiple-demo.tsx")
  const clearSource = loadComboboxExample("combobox-clear-demo.tsx")
  const groupsSource = loadComboboxExample("combobox-groups-demo.tsx")
  const disabledItemsSource = loadComboboxExample("combobox-disabled-items-demo.tsx")
  const customSource = loadComboboxExample("combobox-custom-demo.tsx")
  const invalidSource = loadComboboxExample("combobox-invalid-demo.tsx")
  const disabledSource = loadComboboxExample("combobox-disabled-demo.tsx")
  const autoHighlightSource = loadComboboxExample("combobox-auto-highlight-demo.tsx")
  const popupSource = loadComboboxExample("combobox-popup-demo.tsx")
  const inputGroupSource = loadComboboxExample("combobox-input-group-demo.tsx")
  const customStylingSource = loadComboboxExample("combobox-custom-styling-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Combobox" description={description} slug="combobox" />

      <ComponentPreview code={demoSource} previewClassName="min-h-56">
        <PreviewShell>
          <ComboboxDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="combobox" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Simple</h3>
          <p className="leading-relaxed text-muted-foreground">
            A single-line input and a flat list. The popup reads <Code>dir</Code> and{" "}
            <Code>lang</Code> from the closest ancestor and aligns to the start edge of the input
            (the right edge in RTL).
          </p>
          <CodeBlock code={simpleComposition} title="Structure" />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">With chips</h3>
          <p className="leading-relaxed text-muted-foreground">
            Multi-select with <Code>multiple</Code>, chips, and a chips input.
          </p>
          <CodeBlock code={chipsComposition} title="Structure" />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">With groups</h3>
          <p className="leading-relaxed text-muted-foreground">
            Nested items per group using <Code>ComboboxCollection</Code> inside each{" "}
            <Code>ComboboxGroup</Code>.
          </p>
          <CodeBlock code={groupsComposition} title="Structure" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The input is a combobox with <Code>aria-expanded</Code>, <Code>aria-controls</Code>, and{" "}
          <Code>aria-autocomplete</Code>. The list is a listbox; selected items announce as
          selected. Give the field an accessible name through a label or <Code>aria-label</Code>.
        </p>
        <KeyboardTable data={comboboxKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Basic"
          description={
            <>
              Type to filter the list, or press ArrowDown to open it. The selected item shows a
              check at the end.
            </>
          }
          code={demoSource}
        >
          <ComboboxDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Set <Code>size</Code> to <Code>default</Code> (40px) or <Code>lg</Code> (48px),
              matching Text Field. <Code>ComboboxChips</Code> takes the same prop. The popup list is
              the same for both sizes.
            </>
          }
          code={sizesSource}
        >
          <ComboboxSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Multiple"
          description={
            <>
              Use <Code>multiple</Code> with <Code>ComboboxChips</Code> for multi-select. Pass the
              chips ref from <Code>useComboboxAnchor</Code> as the popup <Code>anchor</Code>.
            </>
          }
          code={multipleSource}
        >
          <ComboboxMultipleDemo />
        </ExampleSection>

        <ExampleSection
          title="Clear button"
          description={
            <>
              Set <Code>showClear</Code> to show a clear button while a value is selected. It takes
              the place of the chevron.
            </>
          }
          code={clearSource}
        >
          <ComboboxClearDemo />
        </ExampleSection>

        <ExampleSection
          title="Groups"
          description={
            <>
              Use <Code>ComboboxGroup</Code>, <Code>ComboboxLabel</Code> and{" "}
              <Code>ComboboxSeparator</Code> to group items.
            </>
          }
          code={groupsSource}
        >
          <ComboboxGroupsDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled items"
          description={
            <>
              Set <Code>disabled</Code> on a <Code>ComboboxItem</Code> to keep it visible but not
              selectable. Keyboard navigation skips it.
            </>
          }
          code={disabledItemsSource}
        >
          <ComboboxDisabledItemsDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom items"
          description={
            <>
              When items are objects, use <Code>itemToStringLabel</Code> to choose the text shown in
              the input and used for filtering, and render any content inside{" "}
              <Code>ComboboxItem</Code>.
            </>
          }
          code={customSource}
        >
          <ComboboxCustomDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>aria-invalid</Code> on <Code>ComboboxInput</Code> to mark the combobox as
              invalid.
            </>
          }
          code={invalidSource}
        >
          <ComboboxInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on <Code>Combobox</Code> to disable the input and its
              trigger.
            </>
          }
          code={disabledSource}
        >
          <ComboboxDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Auto highlight"
          description={
            <>
              Set <Code>autoHighlight</Code> to highlight the first match while typing, so Enter
              selects it.
            </>
          }
          code={autoHighlightSource}
        >
          <ComboboxAutoHighlightDemo />
        </ExampleSection>

        <ExampleSection
          title="Popup"
          description={
            <>
              Open the combobox from a button with <Code>ComboboxTrigger</Code> and move{" "}
              <Code>ComboboxInput</Code> inside <Code>ComboboxContent</Code>. The input there has no
              chevron.
            </>
          }
          code={popupSource}
        >
          <ComboboxPopupDemo />
        </ExampleSection>

        <ExampleSection
          title="Input group"
          description={
            <>
              Add an <Code>InputGroupAddon</Code> inside <Code>ComboboxInput</Code>. The whole group
              is the popup anchor.
            </>
          }
          code={inputGroupSource}
        >
          <ComboboxInputGroupDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every part accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. Here the field uses a filled surface instead of the default outline, and the
              popup and its items use larger rounding.
            </>
          }
          code={customStylingSource}
        >
          <ComboboxCustomStylingDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">combobox-trigger</code>,{" "}
            <code className="font-mono">combobox-content</code>,{" "}
            <code className="font-mono">combobox-list</code>,{" "}
            <code className="font-mono">combobox-item</code>,{" "}
            <code className="font-mono">combobox-group</code>,{" "}
            <code className="font-mono">combobox-label</code>,{" "}
            <code className="font-mono">combobox-empty</code>,{" "}
            <code className="font-mono">combobox-separator</code>,{" "}
            <code className="font-mono">combobox-clear</code>,{" "}
            <code className="font-mono">combobox-chips</code>,{" "}
            <code className="font-mono">combobox-chip</code>,{" "}
            <code className="font-mono">combobox-chip-remove</code>,{" "}
            <code className="font-mono">combobox-chip-input</code>) for targeting in tests and
            parent selectors. The field is an input group (
            <code className="font-mono">input-group</code>,{" "}
            <code className="font-mono">input-group-control</code>). Use the same props on Base UI,
            React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Combobox</h3>
        <PropsTable data={comboboxPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ComboboxInput</h3>
        <PropsTable data={inputPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ComboboxContent</h3>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ComboboxItem</h3>
        <PropsTable data={itemPropRows} />

        <p className="leading-relaxed text-muted-foreground">
          <Code>ComboboxList</Code>, <Code>ComboboxGroup</Code>, <Code>ComboboxLabel</Code>,{" "}
          <Code>ComboboxEmpty</Code> and <Code>ComboboxSeparator</Code> take <Code>className</Code>{" "}
          and <Code>children</Code> (<Code>ComboboxSeparator</Code> has no children).
        </p>
      </section>
    </article>
  )
}
