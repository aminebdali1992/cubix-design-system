import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

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
import { VerifyCodeCustomDemo } from "./examples/verify-code-custom-demo"
import { VerifyCodeDemo } from "./examples/verify-code-demo"
import { VerifyCodeDisabledDemo } from "./examples/verify-code-disabled-demo"
import { VerifyCodeFilledDemo } from "./examples/verify-code-filled-demo"
import { VerifyCodeFormDemo } from "./examples/verify-code-form-demo"
import { VerifyCodeGroupsDemo } from "./examples/verify-code-groups-demo"
import { VerifyCodeInvalidDemo } from "./examples/verify-code-invalid-demo"
import { VerifyCodeLengthDemo } from "./examples/verify-code-length-demo"
import { VerifyCodeResendDemo } from "./examples/verify-code-resend-demo"
import { VerifyCodeSizesDemo } from "./examples/verify-code-sizes-demo"
import {
  verifyCodeControlPropRows,
  verifyCodeDigitPropRows,
  verifyCodePartPropRows,
  verifyCodePropRows,
  verifyCodeResendPropRows,
  verifyCodeSeparatorPropRows,
} from "./verify-code-table-data"

const description =
  "A one-time code field with digit boxes, optional groups, resend timer, description, and error. Values always display as Persian digits."

export const metadata: Metadata = {
  title: "Verify Code",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/verify-code"
const EXAMPLES_DIR = "app/docs/components/verify-code/examples"

function loadVerifyCodeExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `VerifyCode
├── VerifyCodeLabel
├── VerifyCodeControl
│   ├── VerifyCodeDigit
│   └── VerifyCodeSeparator
├── VerifyCodeResend
├── VerifyCodeDescription
└── VerifyCodeError`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full min-w-0 justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  previewClassName,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  previewClassName?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code} previewClassName={previewClassName}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function VerifyCodePage() {
  const demoSource = loadVerifyCodeExample("verify-code-demo.tsx")
  const lengthDemoSource = loadVerifyCodeExample("verify-code-length-demo.tsx")
  const groupsDemoSource = loadVerifyCodeExample("verify-code-groups-demo.tsx")
  const resendDemoSource = loadVerifyCodeExample("verify-code-resend-demo.tsx")
  const filledDemoSource = loadVerifyCodeExample("verify-code-filled-demo.tsx")
  const invalidDemoSource = loadVerifyCodeExample("verify-code-invalid-demo.tsx")
  const disabledDemoSource = loadVerifyCodeExample("verify-code-disabled-demo.tsx")
  const sizesDemoSource = loadVerifyCodeExample("verify-code-sizes-demo.tsx")
  const formDemoSource = loadVerifyCodeExample("verify-code-form-demo.tsx")
  const customDemoSource = loadVerifyCodeExample("verify-code-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Verify Code" description={description} slug="verify-code" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <VerifyCodeDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="verify-code" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          {"Compose label, control, resend, help text, and error under "}
          <Code>VerifyCode</Code>
          {". "}
          <Code>VerifyCodeControl</Code>
          {" renders digit boxes from "}
          <Code>length</Code>
          {" and optional "}
          <Code>groups</Code>
          {
            ". Digits always display in Persian. Filling a box moves focus forward; Backspace on an empty box moves back. Paste a full code to fill every box."
          }
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          {
            "Each digit box is named by position. Auto-advance and Backspace keep keyboard entry on one path. "
          }
          <Code>VerifyCodeResend</Code>
          {" exposes a clear countdown and becomes a button when ready. "}
          <Code>VerifyCodeDescription</Code>
          {" and "}
          <Code>VerifyCodeError</Code>
          {" are announced through "}
          <Code>aria-describedby</Code>
          {". Set "}
          <Code>name</Code>
          {" on the root to submit a single hidden value for the full code."}
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Length"
          description={
            <>
              {"Change how many digit boxes render with the "}
              <Code>length</Code>
              {" prop."}
            </>
          }
          code={lengthDemoSource}
        >
          <VerifyCodeLengthDemo />
        </ExampleSection>

        <ExampleSection
          title="Groups"
          description={
            <>
              {"Pass "}
              <Code>groups</Code>
              {" to insert separators between digit runs (for example 3-3)."}
            </>
          }
          code={groupsDemoSource}
        >
          <VerifyCodeGroupsDemo />
        </ExampleSection>

        <ExampleSection
          title="Resend"
          description={
            <>
              {"Use "}
              <Code>VerifyCodeResend</Code>
              {" with "}
              <Code>duration</Code>
              {" for a countdown before the user can request a new code."}
            </>
          }
          code={resendDemoSource}
        >
          <VerifyCodeResendDemo />
        </ExampleSection>

        <ExampleSection
          title="Filled"
          description={
            <>
              {"Pass "}
              <Code>defaultValue</Code>
              {" on the root to show a complete code."}
            </>
          }
          code={filledDemoSource}
        >
          <VerifyCodeFilledDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              {"Set "}
              <Code>invalid</Code>
              {" on the root to apply destructive styles and show "}
              <Code>VerifyCodeError</Code>
              {"."}
            </>
          }
          code={invalidDemoSource}
        >
          <VerifyCodeInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the field to block every digit and the resend control. Label and description stay readable."
          code={disabledDemoSource}
        >
          <VerifyCodeDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              {"Two heights ship by default: "}
              <Code>default</Code>
              {" (40px) and "}
              <Code>lg</Code>
              {" (48px). Use "}
              <Code>className</Code>
              {" for any other size."}
            </>
          }
          code={sizesDemoSource}
        >
          <VerifyCodeSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="In a form"
          description={
            <>
              {"Set "}
              <Code>name</Code>
              {
                " on the root so the combined code is submitted with the form, and pair the field with Cubix Button."
              }
            </>
          }
          code={formDemoSource}
          previewClassName="bg-muted"
        >
          <VerifyCodeFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              {"Every part accepts a "}
              <Code>className</Code>
              {" merged with the shipped "}
              <Code>cn</Code>
              {" helper."}
            </>
          }
          code={customDemoSource}
        >
          <VerifyCodeCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>verify-code</Code>, <Code>verify-code-label</Code>,{" "}
            <Code>verify-code-control</Code>, <Code>verify-code-digit</Code>,{" "}
            <Code>verify-code-separator</Code>, <Code>verify-code-resend</Code>,{" "}
            <Code>verify-code-description</Code>, <Code>verify-code-error</Code>) for targeting in
            tests and parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">VerifyCode</h3>
        <PropsTable data={verifyCodePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">VerifyCodeControl</h3>
        <PropsTable data={verifyCodeControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">VerifyCodeDigit</h3>
        <PropsTable data={verifyCodeDigitPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">VerifyCodeSeparator</h3>
        <PropsTable data={verifyCodeSeparatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">VerifyCodeResend</h3>
        <PropsTable data={verifyCodeResendPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          VerifyCodeLabel / Description / Error
        </h3>
        <PropsTable data={verifyCodePartPropRows} />
      </section>
    </article>
  )
}
