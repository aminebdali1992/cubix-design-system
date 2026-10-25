import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { KeyboardTable } from "@/components/docs/keyboard-table"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { DropdownDemo } from "./examples/dropdown-demo"
import { DropdownDescriptionDemo } from "./examples/dropdown-description-demo"
import { DropdownDisabledDemo } from "./examples/dropdown-disabled-demo"
import { DropdownInvalidDemo } from "./examples/dropdown-invalid-demo"
import { DropdownSizesDemo } from "./examples/dropdown-sizes-demo"
import {
  dropdownColorRows,
  dropdownContentPropRows,
  dropdownFieldPartPropRows,
  dropdownFieldPropRows,
  dropdownItemPropRows,
  dropdownKeyboardRows,
  dropdownTriggerPropRows,
  dropdownTypographyRows,
} from "./dropdown-table-data"

const description =
  "A form field that opens a menu of options and shows the selected value, with the same label, helper text, sizes and states as Text Field."

export const metadata: Metadata = {
  title: "Dropdown",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/dropdown-menu"
const EXAMPLES_DIR = "app/docs/components/dropdown/examples"

function loadDropdownExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `TextField
├── TextFieldLabel
├── DropdownMenu
│   ├── DropdownMenuTrigger (textFieldInputVariants + ChevronDownIcon)
│   └── DropdownMenuContent
│       └── DropdownMenuItem
└── TextFieldDescription / TextFieldError`

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

export default function DropdownPage() {
  const demoSource = loadDropdownExample("dropdown-demo.tsx")
  const sizesSource = loadDropdownExample("dropdown-sizes-demo.tsx")
  const descriptionSource = loadDropdownExample("dropdown-description-demo.tsx")
  const invalidSource = loadDropdownExample("dropdown-invalid-demo.tsx")
  const disabledSource = loadDropdownExample("dropdown-disabled-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Dropdown" description={description} slug="dropdown" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <DropdownDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="dropdown-menu" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <p className="leading-relaxed text-muted-foreground">
          Dropdown follows the <Code>TextField</Code> structure: a <Code>TextFieldLabel</Code> above,
          a <Code>DropdownMenu</Code> whose trigger uses <Code>textFieldInputVariants</Code>, and a{" "}
          <Code>TextFieldDescription</Code> or <Code>TextFieldError</Code> below. The trigger shows
          the selected value with a chevron at the end.
        </p>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The trigger is a native <Code>button</Code> that exposes <Code>aria-haspopup</Code> and{" "}
          <Code>aria-expanded</Code>, the content is a <Code>menu</Code>, and each option is a
          <Code>menuitem</Code>. Choosing one closes the menu. Focus moves into the menu when it opens and returns to the trigger when
          it closes. In the error state set <Code>aria-invalid</Code> on the trigger, and in the
          disabled state set <Code>disabled</Code> so it leaves the tab order.
        </p>
        <KeyboardTable data={dropdownKeyboardRows} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Default"
          description="A label above the trigger. The trigger shows the selected option."
          code={demoSource}
        >
          <DropdownDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Pass the same <Code>size</Code> to <Code>TextField</Code> and{" "}
              <Code>textFieldInputVariants</Code>. Heights match Text Field: default 40px, lg 48px.
            </>
          }
          code={sizesSource}
        >
          <DropdownSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="With helper text"
          description={
            <>
              Add <Code>TextFieldDescription</Code> below the menu for supporting text.
            </>
          }
          code={descriptionSource}
        >
          <DropdownDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Error"
          description={
            <>
              Set <Code>invalid</Code> on <Code>TextField</Code> and <Code>aria-invalid</Code> on the
              trigger, then show the message with <Code>TextFieldError</Code>.
            </>
          }
          code={invalidSource}
        >
          <DropdownInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on both <Code>TextField</Code> and the trigger button.
            </>
          }
          code={disabledSource}
        >
          <DropdownDisabledDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>text-field</Code>, <Code>text-field-label</Code>,{" "}
            <Code>dropdown-menu-trigger</Code>, <Code>dropdown-menu-content</Code>,{" "}
            <Code>dropdown-menu-item</Code>,{" "}
            <Code>text-field-description</Code>, <Code>text-field-error</Code>) for targeting in tests
            and parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">TextField</h3>
        <PropsTable data={dropdownFieldPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuTrigger</h3>
        <PropsTable data={dropdownTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuContent</h3>
        <PropsTable data={dropdownContentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenuItem</h3>
        <PropsTable data={dropdownItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          TextFieldLabel / Description / Error
        </h3>
        <PropsTable data={dropdownFieldPartPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={dropdownTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={dropdownColorRows} />
      </section>
    </article>
  )
}
