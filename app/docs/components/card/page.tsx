import type { Metadata } from "next"
import Link from "next/link"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CardActionDemo,
  CardDemo,
  CardFormDemo,
  CardIconDemo,
  CardImageDemo,
  CardRtlDemo,
  CardSizeDemo,
  CardSpacingDemo,
} from "@/components/examples/card-examples"
import { cardPropRows, subcomponentRows } from "./card-table-data"

export const metadata: Metadata = {
  title: "Card",
  description: "A flexible container with header, content, and footer.",
}

const usageImport = `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"`

const usageSnippet = `<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>`

const compositionSnippet = `Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter`

const heroCode = `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Deploy to production</CardTitle>
    <CardDescription>
      Your changes are ready to go live. Deploy them with one click.
    </CardDescription>
  </CardHeader>
  <CardFooter>
    <Button>Deploy now</Button>
  </CardFooter>
</Card>`

const formSnippet = `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one click.</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4">
      <Input placeholder="Name of your project" />
      <Input placeholder="Name of domain" />
    </div>
  </CardContent>
  <CardFooter className="flex-col gap-2">
    <Button className="w-full">Create project</Button>
    <Button variant="outline" className="w-full">Cancel</Button>
  </CardFooter>
</Card>`

const actionSnippet = `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">Mark all as read</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <div className="flex items-start gap-3">
      <BellIcon className="mt-0.5 size-4 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Your deployment finished successfully.
      </p>
    </div>
  </CardContent>
</Card>`

const iconSnippet = `<Card className="w-full max-w-sm">
  <CardHeader>
    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <SparklesIcon className="size-5" />
    </div>
    <CardTitle>Pro plan</CardTitle>
    <CardDescription>Unlock every component and priority support.</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button className="w-full">Upgrade</Button>
  </CardFooter>
</Card>`

const sizeSnippet = `<Card className="w-full max-w-sm" size="sm">
  <CardHeader>
    <CardTitle>Scheduled reports</CardTitle>
    <CardDescription>Weekly snapshots. No more manual exports.</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>`

const imageSnippet = `<Card className="w-full max-w-sm pt-0">
  <img src="/meetup.jpg" alt="" />
  <CardHeader>
    <CardTitle>Design systems meetup</CardTitle>
    <CardDescription>...</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button variant="outline" className="w-full">View details</Button>
  </CardFooter>
</Card>`

const spacingSnippet = `<Card className="w-full max-w-sm gap-0 [--card-spacing:--spacing(6)]">
  <CardHeader className="border-b">...</CardHeader>
  <CardContent className="space-y-3 py-(--card-spacing)">
    ...
  </CardContent>
  <CardFooter className="justify-end gap-2">...</CardFooter>
</Card>`

const rtlSnippet = `<div dir="rtl" lang="fa" className="w-full max-w-xs">
  <form>
    <Card>
      <CardHeader>
        <CardTitle>ورود به حساب</CardTitle>
        <CardDescription>
          برای ادامه، ایمیل و رمز عبور خود را وارد کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Button type="button" variant="link" className="h-auto px-0">
                فراموشی رمز؟
              </Button>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button type="submit" className="w-full">ورود</Button>
        <p className="text-center text-description text-muted-foreground">
          حساب ندارید؟{" "}
          <Button type="button" variant="link" className="h-auto px-0">
            ثبت‌نام
          </Button>
        </p>
      </CardFooter>
    </Card>
  </form>
</div>`

export default function CardPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Card"
        description="A flexible container with header, content, and footer."
        slug="card"
      />

      <ComponentPreview code={heroCode}>
        <CardDemo />
      </ComponentPreview>

      <ComponentInstall name="card" />

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
          Build a card from these parts.{" "}
          <code className="font-mono text-sm">CardAction</code> is optional and
          sits at the inline-end of the header.
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Cards pair with Inputs and Buttons for short forms.
          </p>
          <ComponentPreview code={formSnippet}>
            <CardFormDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With action
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">CardAction</code> for a
            control at the inline-end of the header.
          </p>
          <ComponentPreview code={actionSnippet}>
            <CardActionDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">With icon</h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose the header with any element - an icon bubble draws
            attention to the title.
          </p>
          <ComponentPreview code={iconSnippet}>
            <CardIconDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Size</h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">size=&quot;sm&quot;</code>{" "}
            for tighter spacing and a smaller title.
          </p>
          <ComponentPreview code={sizeSnippet}>
            <CardSizeDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Image</h3>
          <p className="leading-relaxed text-muted-foreground">
            Place an image (or media block) as the first child. The card
            rounds the top edge and drops top padding automatically.
          </p>
          <ComponentPreview code={imageSnippet}>
            <CardImageDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Spacing</h3>
          <p className="leading-relaxed text-muted-foreground">
            Override{" "}
            <code className="font-mono text-sm">--card-spacing</code> on the
            root for a larger inset. Use{" "}
            <code className="font-mono text-sm">gap-0</code> when header and
            footer use borders so dividers sit flush.
          </p>
          <ComponentPreview code={spacingSnippet}>
            <CardSpacingDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          A login card under{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> and{" "}
          <code className="font-mono text-sm">lang=&quot;fa&quot;</code>. Fields,
          links, and footer actions follow reading direction. To enable RTL
          app-wide, see the{" "}
          <Link
            href="/docs/components/direction"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Direction
          </Link>{" "}
          guide.
        </p>
        <ComponentPreview code={rtlSnippet}>
          <CardRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Every part
            renders a <code className="font-mono">data-slot</code> attribute (
            <code className="font-mono">card</code>,{" "}
            <code className="font-mono">card-header</code>, ...) for targeting
            in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Card</h3>
        <p className="leading-relaxed text-muted-foreground">
          The root container for header, content, and footer.
        </p>
        <PropsTable data={cardPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardHeader</h3>
        <p className="leading-relaxed text-muted-foreground">
          Title, description, and optional action. With{" "}
          <code className="font-mono text-sm">CardAction</code> it becomes a
          two-column grid.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardTitle</h3>
        <p className="leading-relaxed text-muted-foreground">
          The card title.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CardDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Supporting text under the title.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardAction</h3>
        <p className="leading-relaxed text-muted-foreground">
          Action slot at the inline-end of the header (button, badge, menu).
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          Main body of the card.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardFooter</h3>
        <p className="leading-relaxed text-muted-foreground">
          Footer for primary and secondary actions.
        </p>
        <PropsTable data={subcomponentRows} />
      </section>
    </article>
  )
}
