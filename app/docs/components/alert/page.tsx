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
  <AlertTitle>خبر خوب!</AlertTitle>
  <AlertDescription>
    می‌توانید کامپوننت‌ها و وابستگی‌ها را با ابزار خط فرمان به پروژه اضافه کنید.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">فعال‌سازی</Button>
  </AlertAction>
</Alert>`;

const compositionTree = `Alert
├── Icon
├── AlertTitle
├── AlertDescription
└── AlertAction`;

export default function AlertPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Alert"
        description="Displays a callout for user attention."
        slug="alert"
      />

      {/* Hero preview */}
      <ComponentPreview
        code={`<Alert>
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
</Alert>`}
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
              حالت تاریک اضافه شده. می‌توانید آن را از تنظیمات حساب فعال کنید.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentInstall name="alert" />

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
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
        <h2 className="scroll-m-20 font-semibold tracking-tight">Basic</h2>
        <p className="leading-relaxed text-muted-foreground">
          A basic alert with an icon, title and description.
        </p>
        <ComponentPreview
          code={`<Alert>
  <CircleCheckIcon />
  <AlertTitle>اطلاعات حساب به‌روزرسانی شد</AlertTitle>
  <AlertDescription>
    اطلاعات پروفایل شما ذخیره شد. تغییرات بلافاصله اعمال می‌شوند.
  </AlertDescription>
</Alert>`}
        >
          <div dir="rtl" lang="fa" className="w-full max-w-md">
            <Alert className="w-full">
              <CircleCheckIcon />
              <AlertTitle>اطلاعات حساب به‌روزرسانی شد</AlertTitle>
              <AlertDescription>
                اطلاعات پروفایل شما ذخیره شد. تغییرات بلافاصله اعمال می‌شوند.
              </AlertDescription>
            </Alert>
          </div>
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
          code={`<Alert variant="destructive" className="border-destructive/20 bg-destructive/10 text-red-900 dark:text-red-400">
  <CircleAlertIcon />
  <AlertTitle>پرداخت ناموفق بود</AlertTitle>
  <AlertDescription className="text-red-900/80 dark:text-red-400/80">
    پرداخت شما انجام نشد. لطفاً روش پرداخت را بررسی کنید و دوباره تلاش کنید.
  </AlertDescription>
</Alert>`}
        >
          <div dir="rtl" lang="fa" className="w-full max-w-md">
            <Alert
              variant="destructive"
              className="w-full border-destructive/20 bg-destructive/10 text-red-900 dark:text-red-400"
            >
              <CircleAlertIcon />
              <AlertTitle>پرداخت ناموفق بود</AlertTitle>
              <AlertDescription className="text-red-900/80 dark:text-red-400/80">
                پرداخت شما انجام نشد. لطفاً روش پرداخت را بررسی کنید و دوباره
                تلاش کنید.
              </AlertDescription>
            </Alert>
          </div>
        </ComponentPreview>
      </section>

      {/* Action */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Action</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">AlertAction</code> to add a
          button or other action element to the alert.
        </p>
        <ComponentPreview
          code={`<Alert>
  <AlertTitle>حالت تاریک فعال شد</AlertTitle>
  <AlertDescription>
    برای شروع آن را از تنظیمات پروفایل شخصی‌سازی کنید.
  </AlertDescription>
  <AlertAction>
    <Button size="xs" variant="default">
      تنظیمات
    </Button>
  </AlertAction>
</Alert>`}
        >
          <div dir="rtl" lang="fa" className="w-full max-w-md">
            <Alert className="w-full">
              <AlertTitle>حالت تاریک فعال شد</AlertTitle>
              <AlertDescription>
                برای شروع آن را از تنظیمات پروفایل شخصی‌سازی کنید.
              </AlertDescription>
              <AlertAction>
                <Button size="xs" variant="default">
                  تنظیمات
                </Button>
              </AlertAction>
            </Alert>
          </div>
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
          code={`<Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-300">
  <TriangleAlertIcon />
  <AlertTitle>اشتراک شما تا ۳ روز دیگر منقضی می‌شود.</AlertTitle>
  <AlertDescription>
    برای جلوگیری از قطع سرویس، همین حالا تمدید کنید یا به طرح پولی ارتقا دهید.
  </AlertDescription>
</Alert>`}
        >
          <div dir="rtl" lang="fa" className="w-full max-w-md">
            <Alert className="w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-300">
              <TriangleAlertIcon />
              <AlertTitle>اشتراک شما تا ۳ روز دیگر منقضی می‌شود.</AlertTitle>
              <AlertDescription>
                برای جلوگیری از قطع سرویس، همین حالا تمدید کنید یا به طرح پولی
                ارتقا دهید.
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
