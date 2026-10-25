import type { Metadata } from "next";
import { PaletteIcon, SwatchBookIcon } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  sectionHeadingClassName,
} from "../docs-shared";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Light and dark mode in Cubix: how it works, how to enable it and how to add a toggle.",
};

const lightDarkSnippet = `:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0% 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}`;

const providerSnippet = `"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`;

const layoutSnippet = `import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

const toggleSnippet = `"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/cubix/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && resolvedTheme === "dark" ? (
        <MoonIcon className="size-4" />
      ) : (
        <SunIcon className="size-4" />
      )}
    </Button>
  );
}`;

export default function ThemingPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Theming"
        description="Every Cubix component supports light and dark mode out of the box. This page shows how it works and how to turn it on."
      />

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>How it works</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each color token has two values: one under{" "}
          <InlineCode>:root</InlineCode> for light mode and one under{" "}
          <InlineCode>.dark</InlineCode> for dark mode. When the{" "}
          <InlineCode>dark</InlineCode> class is on{" "}
          <InlineCode>&lt;html&gt;</InlineCode>, the dark values are used.
          Components don&apos;t change at all.
        </p>
        <CodeBlock code={lightDarkSnippet} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Enable dark mode</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix uses <InlineCode>next-themes</InlineCode> to add or remove the{" "}
          <InlineCode>dark</InlineCode> class. First create the provider:
        </p>
        <CodeBlock
          code={providerSnippet}
          title="components/providers/theme-provider.tsx"
        />
        <p className="leading-relaxed text-muted-foreground">
          Then wrap your app with it. With{" "}
          <InlineCode>defaultTheme=&quot;system&quot;</InlineCode> the site
          follows the user&apos;s system setting:
        </p>
        <CodeBlock code={layoutSnippet} title="app/layout.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Add a toggle</h2>
        <p className="leading-relaxed text-muted-foreground">
          This button switches between light and dark. It is the same toggle
          used in the header of this site:
        </p>
        <CodeBlock code={toggleSnippet} title="components/theme-toggle.tsx" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Tokens",
              description: "See every token and add your own.",
              href: "/docs/tokens",
              icon: SwatchBookIcon,
            },
            {
              title: "Color Usage",
              description: "Pick the right color for text, surfaces and borders.",
              href: "/docs/color-usage",
              icon: PaletteIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
