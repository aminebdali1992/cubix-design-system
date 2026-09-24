import type { Metadata } from "next";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/cubix/alert";
import { Button } from "@/components/cubix/button";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import {
  alertActionRows,
  alertDescriptionRows,
  alertPropRows,
  alertTitleRows,
} from "./alert-table-data";

export const metadata: Metadata = {
  title: "Alert",
  description: "Displays a callout for user attention.",
};

const usageImport = `import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/cubix/alert"`;

const usageSnippet = `<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the CLI.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>`;

const compositionTree = `Alert
├── Icon
├── AlertTitle
├── AlertDescription
└── AlertAction`;

const heroCode = `<Alert>
  <CircleCheckIcon />
  <AlertTitle>Payment successful</AlertTitle>
  <AlertDescription>
    Your payment of $29.99 has been processed. A receipt has been sent to your
    email address.
  </AlertDescription>
</Alert>

<Alert>
  <InfoIcon />
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>
    We've added dark mode support. You can enable it in your account settings.
  </AlertDescription>
</Alert>`;

export default function AlertPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Alert"
        description="Displays a callout for user attention."
        slug="alert"
      />

      {/* Hero preview */}
      <ComponentPreview code={heroCode}>
        <div className="grid max-w-xl gap-4">
          <Alert className="w-full">
            <CircleCheckIcon />
            <AlertTitle>Payment successful</AlertTitle>
            <AlertDescription>
              Your payment of $29.99 has been processed. A receipt has been
              sent to your email address.
            </AlertDescription>
          </Alert>
          <Alert className="w-full">
            <InfoIcon />
            <AlertTitle>New feature available</AlertTitle>
            <AlertDescription>
              We&apos;ve added dark mode support. You can enable it in your
              account settings.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentInstall name="alert" />

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      {/* Composition */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build an{" "}
          <code className="font-mono text-sm">Alert</code>:
        </p>
        <CodeBlock code={compositionTree} title="Composition" />
      </section>

      {/* Basic */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Basic
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          A basic alert with an icon, title and description.
        </p>
        <ComponentPreview
          code={`<Alert>
  <CircleCheckIcon />
  <AlertTitle>Account updated successfully</AlertTitle>
  <AlertDescription>
    Your profile information has been saved. Changes will be reflected
    immediately.
  </AlertDescription>
</Alert>`}
        >
          <Alert className="w-full max-w-md">
            <CircleCheckIcon />
            <AlertTitle>Account updated successfully</AlertTitle>
            <AlertDescription>
              Your profile information has been saved. Changes will be
              reflected immediately.
            </AlertDescription>
          </Alert>
        </ComponentPreview>
      </section>

      {/* Destructive */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Destructive
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">variant=&quot;destructive&quot;</code>{" "}
          to create a destructive alert.
        </p>
        <ComponentPreview
          code={`<Alert variant="destructive">
  <CircleAlertIcon />
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>
    Your payment could not be processed. Please check your payment method
    and try again.
  </AlertDescription>
</Alert>`}
        >
          <Alert variant="destructive" className="w-full max-w-md">
            <CircleAlertIcon />
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>
              Your payment could not be processed. Please check your payment
              method and try again.
            </AlertDescription>
          </Alert>
        </ComponentPreview>
      </section>

      {/* Action */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Action
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">AlertAction</code> to add a
          button or other action element to the alert.
        </p>
        <ComponentPreview
          code={`<Alert className="max-w-md">
  <AlertTitle>Dark mode is now available</AlertTitle>
  <AlertDescription>
    Enable it under your profile settings to get started.
  </AlertDescription>
  <AlertAction>
    <Button size="xs" variant="default">
      Enable
    </Button>
  </AlertAction>
</Alert>`}
        >
          <Alert className="w-full max-w-md">
            <AlertTitle>Dark mode is now available</AlertTitle>
            <AlertDescription>
              Enable it under your profile settings to get started.
            </AlertDescription>
            <AlertAction>
              <Button size="xs" variant="default">
                Enable
              </Button>
            </AlertAction>
          </Alert>
        </ComponentPreview>
      </section>

      {/* Custom Colors */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Custom Colors
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          You can customize the alert colors by adding custom classes such as{" "}
          <code className="font-mono text-sm">bg-amber-50 dark:bg-amber-950</code>{" "}
          to the <code className="font-mono text-sm">Alert</code> component.
        </p>
        <ComponentPreview
          code={`<Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
  <TriangleAlertIcon />
  <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
  <AlertDescription>
    Renew now to avoid service interruption or upgrade to a paid plan to
    continue using the service.
  </AlertDescription>
</Alert>`}
        >
          <Alert className="w-full max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <TriangleAlertIcon />
            <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
            <AlertDescription>
              Renew now to avoid service interruption or upgrade to a paid
              plan to continue using the service.
            </AlertDescription>
          </Alert>
        </ComponentPreview>
      </section>

      {/* RTL */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap the alert in{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> and{" "}
          <code className="font-mono text-sm">lang=&quot;fa&quot;</code> so
          layout, action placement, and IRANSans XV follow Persian.
        </p>
        <ComponentPreview
          code={`<div dir="rtl" lang="fa" className="grid max-w-xl gap-4">
  <Alert>
    <CircleCheckIcon />
    <AlertTitle>پرداخت موفق</AlertTitle>
    <AlertDescription>
      پرداخت ۲۹٫۹۹ دلاری شما انجام شد. رسید به نشانی ایمیل ارسال شده است.
    </AlertDescription>
  </Alert>

  <Alert>
    <InfoIcon />
    <AlertTitle>قابلیت جدید در دسترس است</AlertTitle>
    <AlertDescription>
      حالت تاریک اضافه شده. می‌توانید آن را از تنظیمات حساب فعال کنید.
    </AlertDescription>
  </Alert>
</div>`}
        >
          <div dir="rtl" lang="fa" className="grid w-full max-w-xl gap-4">
            <Alert className="w-full">
              <CircleCheckIcon />
              <AlertTitle>پرداخت موفق</AlertTitle>
              <AlertDescription>
                پرداخت ۲۹٫۹۹ دلاری شما انجام شد. رسید به نشانی ایمیل ارسال شده
                است.
              </AlertDescription>
            </Alert>
            <Alert className="w-full">
              <InfoIcon />
              <AlertTitle>قابلیت جدید در دسترس است</AlertTitle>
              <AlertDescription>
                حالت تاریک اضافه شده. می‌توانید آن را از تنظیمات حساب فعال
                کنید.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Alert</h3>
        <p className="leading-relaxed text-muted-foreground">
          The Alert component displays a callout for user attention.
        </p>
        <PropsTable data={alertPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertTitle</h3>
        <p className="leading-relaxed text-muted-foreground">
          The AlertTitle component displays the title of the alert.
        </p>
        <PropsTable data={alertTitleRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The AlertDescription component displays the description or content
          of the alert.
        </p>
        <PropsTable data={alertDescriptionRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertAction</h3>
        <p className="leading-relaxed text-muted-foreground">
          The AlertAction component displays an action element (like a button)
          positioned absolutely in the top-end corner of the alert.
        </p>
        <PropsTable data={alertActionRows} />
      </section>
    </article>
  );
}
