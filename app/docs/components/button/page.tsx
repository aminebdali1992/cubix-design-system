import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  buttonColorRows,
  buttonTypographyRows,
  propRows,
  sizeRows,
  variantRows,
} from "./button-table-data"
import { ButtonCustomDemo } from "./examples/button-custom-demo"
import { ButtonDemo } from "./examples/button-demo"
import { ButtonDestructiveDemo } from "./examples/button-destructive-demo"
import { ButtonSuccessDemo } from "./examples/button-success-demo"
import { ButtonWarningDemo } from "./examples/button-warning-demo"
import { ButtonDisabledDemo } from "./examples/button-disabled-demo"
import { ButtonIconDemo } from "./examples/button-icon-demo"
import { ButtonIconSizesDemo } from "./examples/button-icon-sizes-demo"
import { ButtonLinkDemo } from "./examples/button-link-demo"
import { ButtonLoadingDemo } from "./examples/button-loading-demo"
import { ButtonPrimaryDemo } from "./examples/button-primary-demo"
import { ButtonSizesDemo } from "./examples/button-sizes-demo"
import { ButtonSpinnerDemo } from "./examples/button-spinner-demo"
import { ButtonGrayDemo } from "./examples/button-gray-demo"
import { ButtonOutlineDemo } from "./examples/button-outline-demo"
import { ButtonGhostDemo } from "./examples/button-ghost-demo"
import { ButtonLinkVariantDemo } from "./examples/button-link-variant-demo"
import { ButtonWithIconDemo } from "./examples/button-with-icon-demo"

const description = "Displays a button or a component that looks like a button."

export const metadata: Metadata = {
  title: "Button",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/button"
const EXAMPLES_DIR = "app/docs/components/button/examples"

function loadButtonExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

/*
  Persian button labels need lang="fa" so .group/button:lang(fa) picks the
  IRANSans Cubix Button D face. Docs chrome only - not part of the paste-ready
  example source.
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
  description?: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {description ? <p className="leading-relaxed text-muted-foreground">{description}</p> : null}
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ButtonPage() {
  const buttonDemoSource = loadButtonExample("button-demo.tsx")
  const buttonPrimarySource = loadButtonExample("button-primary-demo.tsx")
  const buttonDestructiveSource = loadButtonExample("button-destructive-demo.tsx")
  const buttonWarningSource = loadButtonExample("button-warning-demo.tsx")
  const buttonSuccessSource = loadButtonExample("button-success-demo.tsx")
  const buttonGraySource = loadButtonExample("button-gray-demo.tsx")
  const buttonOutlineSource = loadButtonExample("button-outline-demo.tsx")
  const buttonGhostSource = loadButtonExample("button-ghost-demo.tsx")
  const buttonLinkVariantSource = loadButtonExample("button-link-variant-demo.tsx")
  const buttonSizesSource = loadButtonExample("button-sizes-demo.tsx")
  const buttonIconSizesSource = loadButtonExample("button-icon-sizes-demo.tsx")
  const buttonWithIconSource = loadButtonExample("button-with-icon-demo.tsx")
  const buttonIconSource = loadButtonExample("button-icon-demo.tsx")
  const buttonLoadingSource = loadButtonExample("button-loading-demo.tsx")
  const buttonSpinnerSource = loadButtonExample("button-spinner-demo.tsx")
  const buttonLinkSource = loadButtonExample("button-link-demo.tsx")
  const buttonDisabledSource = loadButtonExample("button-disabled-demo.tsx")
  const buttonCustomSource = loadButtonExample("button-custom-demo.tsx")
  const usageImport = extractDemoImports(buttonDemoSource)
  const usageSnippet = extractDemoJsx(buttonDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Button"
        description={description}
        slug="button"
      />

      <ComponentPreview code={buttonDemoSource}>
        <PreviewShell>
          <ButtonDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="button" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Primary"
          description="The main call to action: plain, with a leading or trailing icon, loading, and disabled."
          code={buttonPrimarySource}
        >
          <ButtonPrimaryDemo />
        </ExampleSection>

        <ExampleSection
          title="Destructive"
          description="Solid danger fill for irreversible actions: plain, with a leading or trailing icon, and loading."
          code={buttonDestructiveSource}
        >
          <ButtonDestructiveDemo />
        </ExampleSection>

        <ExampleSection
          title="Warning"
          description="Solid warning fill for actions that need caution: plain, with a leading or trailing icon, and loading."
          code={buttonWarningSource}
        >
          <ButtonWarningDemo />
        </ExampleSection>

        <ExampleSection
          title="Success"
          description="Solid success fill for positive, confirming actions: plain, with a leading or trailing icon, and loading."
          code={buttonSuccessSource}
        >
          <ButtonSuccessDemo />
        </ExampleSection>

        <ExampleSection
          title="Gray"
          description="Neutral filled style for secondary actions."
          code={buttonGraySource}
        >
          <ButtonGrayDemo />
        </ExampleSection>

        <ExampleSection
          title="Outline"
          description="Bordered style that pairs well with gray or ghost buttons."
          code={buttonOutlineSource}
        >
          <ButtonOutlineDemo />
        </ExampleSection>

        <ExampleSection
          title="Ghost"
          description="Quiet style with a background only on hover."
          code={buttonGhostSource}
        >
          <ButtonGhostDemo />
        </ExampleSection>

        <ExampleSection
          title="Link"
          description="Text-only style that looks like a link."
          code={buttonLinkVariantSource}
        >
          <ButtonLinkVariantDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description="Text sizes from compact chrome to large actions."
          code={buttonSizesSource}
        >
          <ButtonSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Icon sizes"
          description={
            <>
              Square icon-only sizes. Icon-only buttons need an <Code>aria-label</Code>.
            </>
          }
          code={buttonIconSizesSource}
        >
          <ButtonIconSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="With icon"
          description={
            <>
              Render an icon inside the button. Use <Code>data-icon=&quot;inline-start&quot;</Code>{" "}
              and <Code>data-icon=&quot;inline-end&quot;</Code> so padding follows reading direction
              in LTR and RTL.
            </>
          }
          code={buttonWithIconSource}
        >
          <ButtonWithIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Icon only"
          description={
            <>
              Use a square size and always provide an <Code>aria-label</Code> when there is no
              visible text.
            </>
          }
          code={buttonIconSource}
        >
          <ButtonIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Loading"
          description={
            <>
              Disable the control and show a spinning icon while an async action runs. Set{" "}
              <Code>aria-busy</Code> so assistive technology knows the action is in progress. Click
              the button to try it.
            </>
          }
          code={buttonLoadingSource}
        >
          <ButtonLoadingDemo />
        </ExampleSection>

        <ExampleSection
          title="Spinner"
          description={<>Or compose the spinner yourself for a static loading state.</>}
          code={buttonSpinnerSource}
        >
          <ButtonSpinnerDemo />
        </ExampleSection>

        <ExampleSection
          title="As link"
          description={
            <>
              Use <Code>render</Code> to style a Next.js <Code>Link</Code> as a button. It works the
              same on Base UI, React Aria, and Radix. Pass{" "}
              <Code>nativeButton=&#123;false&#125;</Code> so Base UI does not treat the host as a
              native button (ignored on Aria and Radix).
            </>
          }
          code={buttonLinkSource}
        >
          <ButtonLinkDemo />
        </ExampleSection>

        <ExampleSection title="Disabled" code={buttonDisabledSource}>
          <ButtonDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Button accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. Prefer design tokens over hardcoded colors.
            </>
          }
          code={buttonCustomSource}
        >
          <ButtonCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Mark icons and spinners with{" "}
            <Code>data-icon</Code> so spacing follows reading direction. Icon-only buttons need an{" "}
            <Code>aria-label</Code>.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={propRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Variants</h3>
        <PropsTable data={variantRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
        <PropsTable data={sizeRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={buttonTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={buttonColorRows} />
      </section>
    </article>
  )
}
