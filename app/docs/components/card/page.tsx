import type { Metadata } from "next";
import {
  BellIcon,
  CircleAlertIcon,
  SparklesIcon,
} from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card";
import { Button } from "@/components/cubix/button";
import { Input } from "@/components/cubix/input";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { cardPropRows, subcomponentRows } from "./card-table-data";

export const metadata: Metadata = {
  title: "Card",
  description: "Displays a container with header, content, and footer.",
};

const usageImport = `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"`;

const usageSnippet = `<Card>
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>`;

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
</Card>`;

export default function CardPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Card"
        description="Displays a container with header, content, and footer."
        slug="card"
      />

      {/* Hero preview */}
      <ComponentPreview code={heroCode}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Deploy to production</CardTitle>
            <CardDescription>
              Your changes are ready to go live. Deploy them with one click.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Deploy now</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <ComponentInstall name="card" />

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Cards pair naturally with Inputs and Buttons to build forms:
          </p>
          <ComponentPreview
            code={`<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
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
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
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
            </Card>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With action
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">CardAction</code> to add an
            action element (like a button) in the top-right corner of the
            header:
          </p>
          <ComponentPreview
            code={`<Card className="w-full max-w-sm">
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
</Card>`}
          >
            <Card className="w-full max-w-sm">
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
            </Card>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With icon
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose the header with any element - an icon bubble draws
            attention to the title:
          </p>
          <ComponentPreview
            code={`<Card className="w-full max-w-sm">
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
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SparklesIcon className="size-5" />
                </div>
                <CardTitle>Pro plan</CardTitle>
                <CardDescription>
                  Unlock every component and priority support.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Upgrade</Button>
              </CardFooter>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Every part
            renders a <code className="font-mono">data-slot</code> attribute
            (<code className="font-mono">card</code>,{" "}
            <code className="font-mono">card-header</code>, ...) for targeting
            in tests and parent selectors.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Card</h3>
        <p className="leading-relaxed text-muted-foreground">
          The Card component displays a container with header, content, and
          footer.
        </p>
        <PropsTable data={cardPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardHeader</h3>
        <p className="leading-relaxed text-muted-foreground">
          Displays the card header. When a <code className="font-mono text-sm">CardAction</code>{" "}
          is present it switches to a two-column grid automatically.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardTitle</h3>
        <p className="leading-relaxed text-muted-foreground">
          Displays the title of the card.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CardDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Displays the description or content of the card header.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardAction</h3>
        <p className="leading-relaxed text-muted-foreground">
          Displays an action element (like a button) positioned in the
          top-right corner of the header.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          Displays the main content of the card.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CardFooter</h3>
        <p className="leading-relaxed text-muted-foreground">
          Displays the footer of the card - ideal for actions.
        </p>
        <PropsTable data={subcomponentRows} />
      </section>
    </article>
  );
}
