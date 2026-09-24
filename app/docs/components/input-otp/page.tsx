import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  InputOTPAlphanumericDemo,
  InputOTPControlledDemo,
  InputOTPDemo,
  InputOTPDisabledDemo,
  InputOTPFormDemo,
  InputOTPFourDigitsDemo,
  InputOTPInvalidDemo,
  InputOTPPatternDemo,
  InputOTPSeparatedDemo,
  InputOTPSeparatorDemo,
} from "@/components/examples/input-otp-examples"

import {
  inputOTPGroupPropRows,
  inputOTPPropRows,
  inputOTPSeparatorPropRows,
  inputOTPSlotPropRows,
} from "./input-otp-table-data"

const description =
  "Accessible one-time password component with copy-paste functionality."

export const metadata: Metadata = {
  title: "Input OTP",
  description,
}

const usageImport = `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/cubix/input-otp"`

const usageSnippet = `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

const compositionSnippet = `InputOTP
├── InputOTPGroup
│   ├── InputOTPSlot
│   ├── InputOTPSlot
│   └── InputOTPSlot
├── InputOTPSeparator
├── InputOTPGroup
│   ├── InputOTPSlot
│   ├── InputOTPSlot
│   └── InputOTPSlot
├── InputOTPSeparator
└── InputOTPGroup
    ├── InputOTPSlot
    └── InputOTPSlot`

const demoSnippet = `<InputOTP maxLength={6} defaultValue="123456">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

const patternSnippet = `import { REGEXP_ONLY_DIGITS } from "input-otp"

<Field className="w-fit">
  <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
  <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </InputOTP>
</Field>`

const separatorSnippet = `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

const separatedSnippet = `<InputOTP maxLength={6} defaultValue="123456">
  <InputOTPGroup variant="separated">
    <InputOTPSlot index={0} variant="separated" />
    <InputOTPSlot index={1} variant="separated" />
    <InputOTPSlot index={2} variant="separated" />
    <InputOTPSlot index={3} variant="separated" />
    <InputOTPSlot index={4} variant="separated" />
    <InputOTPSlot index={5} variant="separated" />
  </InputOTPGroup>
</InputOTP>`

const disabledSnippet = `<InputOTP id="disabled" maxLength={6} disabled defaultValue="123456">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

const controlledSnippet = `const [value, setValue] = React.useState("")

<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

const invalidSnippet = `<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} aria-invalid />
    <InputOTPSlot index={1} aria-invalid />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={2} aria-invalid />
    <InputOTPSlot index={3} aria-invalid />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={4} aria-invalid />
    <InputOTPSlot index={5} aria-invalid />
  </InputOTPGroup>
</InputOTP>`

const fourDigitsSnippet = `import { REGEXP_ONLY_DIGITS } from "input-otp"

<InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`

const alphanumericSnippet = `import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

const formSnippet = `<Card className="mx-auto w-[min(100%,19rem)]" size="sm">
  <CardHeader>
    <CardTitle>Verify your login</CardTitle>
    <CardDescription>
      Enter the verification code we sent to your email address:{" "}
      <span className="font-medium">m@example.com</span>.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form id="otp-verification-form">
      <Field className="gap-3 *:w-auto!">
        <div className="flex w-full items-center justify-between gap-2">
          <FieldLabel htmlFor="otp-verification">
            Verification code
          </FieldLabel>
          <Button type="button" variant="outline" size="xs">
            <RefreshCwIcon data-icon="inline-start" />
            Resend Code
          </Button>
        </div>
        <InputOTP
          maxLength={6}
          id="otp-verification"
          required
          containerClassName="w-full justify-between gap-2"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="h-10 w-10 shrink-0 text-lg" />
            <InputOTPSlot index={1} className="h-10 w-10 shrink-0 text-lg" />
            <InputOTPSlot index={2} className="h-10 w-10 shrink-0 text-lg" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="h-10 w-10 shrink-0 text-lg" />
            <InputOTPSlot index={4} className="h-10 w-10 shrink-0 text-lg" />
            <InputOTPSlot index={5} className="h-10 w-10 shrink-0 text-lg" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription className="w-full">
          <a href="#">I no longer have access to this email address.</a>
        </FieldDescription>
      </Field>
    </form>
  </CardContent>
  <CardFooter className="flex-col gap-2">
    <Button type="submit" form="otp-verification-form" className="w-full">
      Verify
    </Button>
    <div className="text-center text-sm text-muted-foreground">
      Having trouble signing in?{" "}
      <a
        href="#"
        className="underline underline-offset-4 transition-colors hover:text-primary"
      >
        Contact support
      </a>
    </div>
  </CardFooter>
</Card>`

export default function InputOTPDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Input OTP"
        description={description}
        slug="input-otp"
      />

      <ComponentPreview code={demoSnippet}>
        <InputOTPDemo />
      </ComponentPreview>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          The <code className="font-mono text-sm">InputOTP</code> component uses{" "}
          <a
            href="https://input-otp.rodz.dev"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            input-otp
          </a>{" "}
          by{" "}
          <a
            href="https://github.com/guilhermerodz"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            Guilherme Rodz
          </a>
          .
        </p>
      </section>

      <ComponentInstall name="input-otp" />

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
          Use the following composition to build an{" "}
          <code className="font-mono text-sm">InputOTP</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Pattern</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">pattern</code> prop to
          define a custom pattern for the OTP input.
        </p>
        <ComponentPreview code={patternSnippet}>
          <InputOTPPatternDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Separator</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">{"<InputOTPSeparator />"}</code>{" "}
          to add a separator between input groups.
        </p>
        <ComponentPreview code={separatorSnippet}>
          <InputOTPSeparatorDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Separated</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">variant=&quot;separated&quot;</code>{" "}
          on{" "}
          <code className="font-mono text-sm">InputOTPGroup</code> and{" "}
          <code className="font-mono text-sm">InputOTPSlot</code> for standalone
          inputs with space between them.
        </p>
        <ComponentPreview code={separatedSnippet}>
          <InputOTPSeparatedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">disabled</code> prop to
          disable the input.
        </p>
        <ComponentPreview code={disabledSnippet}>
          <InputOTPDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Controlled</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">value</code> and{" "}
          <code className="font-mono text-sm">onChange</code> props to control
          the input value.
        </p>
        <ComponentPreview code={controlledSnippet}>
          <InputOTPControlledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Invalid</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">aria-invalid</code> on the
          slots to show an error state.
        </p>
        <ComponentPreview code={invalidSnippet}>
          <InputOTPInvalidDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Four Digits</h2>
        <p className="leading-relaxed text-muted-foreground">
          A common pattern for PIN codes. This uses the{" "}
          <code className="font-mono text-sm">
            pattern={"{REGEXP_ONLY_DIGITS}"}
          </code>{" "}
          prop.
        </p>
        <ComponentPreview code={fourDigitsSnippet}>
          <InputOTPFourDigitsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Alphanumeric
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">
            REGEXP_ONLY_DIGITS_AND_CHARS
          </code>{" "}
          to accept both letters and numbers.
        </p>
        <ComponentPreview code={alphanumericSnippet}>
          <InputOTPAlphanumericDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Form</h2>
        <p className="leading-relaxed text-muted-foreground">
          Compose{" "}
          <code className="font-mono text-sm">InputOTP</code> with{" "}
          <code className="font-mono text-sm">Card</code> and{" "}
          <code className="font-mono text-sm">Field</code> for a verification
          form.
        </p>
        <ComponentPreview code={formSnippet} previewClassName="min-h-[28rem]">
          <InputOTPFormDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See the{" "}
          <a
            href="https://input-otp.rodz.dev"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            input-otp
          </a>{" "}
          documentation for the full primitive API.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">InputOTP</h3>
          <PropsTable data={inputOTPPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputOTPGroup
          </h3>
          <PropsTable data={inputOTPGroupPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputOTPSlot
          </h3>
          <PropsTable data={inputOTPSlotPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputOTPSeparator
          </h3>
          <PropsTable data={inputOTPSeparatorPropRows} />
        </div>
      </section>
    </article>
  )
}
