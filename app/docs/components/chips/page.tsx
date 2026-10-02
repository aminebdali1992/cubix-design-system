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
import { chipPropRows, chipsKeyboardRows, chipsPropRows } from "./chips-table-data"
import { ChipsAvatarDemo } from "./examples/chips-avatar-demo"
import { ChipsControlledDemo } from "./examples/chips-controlled-demo"
import { ChipsDemo } from "./examples/chips-demo"
import { ChipsDisabledDemo } from "./examples/chips-disabled-demo"
import { ChipsDisabledItemDemo } from "./examples/chips-disabled-item-demo"
import { ChipsIconDemo } from "./examples/chips-icon-demo"
import { ChipsMultipleDemo } from "./examples/chips-multiple-demo"
import { ChipsRemovableDemo } from "./examples/chips-removable-demo"
import { ChipsSizesDemo } from "./examples/chips-sizes-demo"
import { ChipsVariantsDemo } from "./examples/chips-variants-demo"

const description =
  "A row of selectable pills for filtering, tagging, or picking one or more options."

export const metadata: Metadata = {
  title: "Chips",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/chips"
const EXAMPLES_DIR = "app/docs/components/chips/examples"

function loadChipsExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Chips
└── Chip
    ├── icon | avatar
    └── remove button (with onRemove)`

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

export default function ChipsPage() {
  const demoSource = loadChipsExample("chips-demo.tsx")
  const multipleSource = loadChipsExample("chips-multiple-demo.tsx")
  const controlledSource = loadChipsExample("chips-controlled-demo.tsx")
  const variantsSource = loadChipsExample("chips-variants-demo.tsx")
  const sizesSource = loadChipsExample("chips-sizes-demo.tsx")
  const iconSource = loadChipsExample("chips-icon-demo.tsx")
  const removableSource = loadChipsExample("chips-removable-demo.tsx")
  const avatarSource = loadChipsExample("chips-avatar-demo.tsx")
  const disabledItemSource = loadChipsExample("chips-disabled-item-demo.tsx")
  const disabledSource = loadChipsExample("chips-disabled-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Chips" description={description} slug="chips" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <ChipsDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="chips" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Every <Code>Chip</Code> is a toggle inside a <Code>Chips</Code> group. Selection is
          tracked by <Code>value</Code>, the same string each chip passes. Pass <Code>icon</Code> or{" "}
          <Code>avatar</Code> for a leading visual, and <Code>onRemove</Code> for a remove button.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each chip is a toggle button that reports its state with <Code>aria-pressed</Code>. The
          group is a single tab stop; arrow keys move between chips and follow the reading
          direction, so they are mirrored in RTL. Removable chips are removed with Backspace or
          Delete, and focus moves to the neighboring chip. Give the remove button a specific name
          with <Code>removeLabel</Code>.
        </p>
        <KeyboardTable data={chipsKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Multiple"
          description={
            <>
              Set <Code>multiple</Code> to select any number of chips. Pass every selected value to{" "}
              <Code>defaultValue</Code>.
            </>
          }
          code={multipleSource}
        >
          <ChipsMultipleDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>value</Code> and <Code>onValueChange</Code> to own the selected chips, for
              example to read or set the selection from outside.
            </>
          }
          code={controlledSource}
        >
          <ChipsControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Variants"
          description={
            <>
              Set <Code>variant</Code> on a <Code>Chip</Code> to pick how it looks when selected,
              using the same colors as Button. Unselected chips stay outlined.
            </>
          }
          code={variantsSource}
        >
          <ChipsVariantsDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Set <Code>size</Code> on a <Code>Chip</Code> to use the same heights as Button. The
              default is <Code>sm</Code>.
            </>
          }
          code={sizesSource}
        >
          <ChipsSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="With icon"
          description={
            <>
              Pass <Code>icon</Code> to show an icon at the inline start, hidden from assistive
              technology.
            </>
          }
          code={iconSource}
        >
          <ChipsIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Removable"
          description={
            <>
              Pass <Code>onRemove</Code> to show a remove button. Remove the chip from your list and
              from the selection in the same handler.
            </>
          }
          code={removableSource}
        >
          <ChipsRemovableDemo />
        </ExampleSection>

        <ExampleSection
          title="Avatar"
          description={
            <>
              Pass an <Code>Avatar</Code> to <Code>avatar</Code> to show it in place of the icon. It
              scales with <Code>size</Code>.
            </>
          }
          code={avatarSource}
        >
          <ChipsAvatarDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled item"
          description={
            <>
              Set <Code>disabled</Code> on a <Code>Chip</Code> to keep it visible but locked. Arrow
              key navigation skips it.
            </>
          }
          code={disabledItemSource}
        >
          <ChipsDisabledItemDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on <Code>Chips</Code> to lock every chip in its current
              state.
            </>
          }
          code={disabledSource}
        >
          <ChipsDisabledDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>chips</Code>, <Code>chip</Code>, <Code>chip-root</Code>,{" "}
            <Code>chip-icon</Code>, <Code>chip-avatar</Code>, <Code>chip-remove</Code>) for
            targeting in tests and parent selectors. Use the same props on Base UI, React Aria, and
            Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Chips</h3>
        <PropsTable data={chipsPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Chip</h3>
        <PropsTable data={chipPropRows} />
      </section>
    </article>
  )
}
