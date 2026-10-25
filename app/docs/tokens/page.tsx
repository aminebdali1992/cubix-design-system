import type { Metadata } from "next";
import { MoonIcon, PaletteIcon } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  sectionHeadingClassName,
} from "../docs-shared";
import {
  addTokenSnippet,
  addTokenUsageSnippet,
  conventionSnippet,
  conventionUsageSnippet,
  cubixJsonSnippet,
  customizeCss,
  defaultThemeCss,
  utilitySnippet,
} from "../theming/theming-data";

export const metadata: Metadata = {
  title: "Tokens",
  description:
    "Cubix styles every component with CSS variables. Change a variable and every component that uses it updates.",
};

export default function TokensPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Tokens"
        description="Tokens are CSS variables for colors and radius. Change a token once and every component that uses it updates."
      />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Components use tokens like <InlineCode>background</InlineCode>,{" "}
          <InlineCode>foreground</InlineCode> and{" "}
          <InlineCode>primary</InlineCode>. Tailwind turns them into classes
          such as <InlineCode>bg-background</InlineCode> and{" "}
          <InlineCode>text-foreground</InlineCode>:
        </p>
        <CodeBlock code={utilitySnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          CSS variables are on by default in{" "}
          <InlineCode>cubix.json</InlineCode>:
        </p>
        <CodeBlock code={cubixJsonSnippet} title="cubix.json" lang="json" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Naming</h2>
        <p className="leading-relaxed text-muted-foreground">
          Tokens come in pairs. The base token is the surface color, and the{" "}
          <InlineCode>-foreground</InlineCode> token is the text and icon color
          on that surface. For example, <InlineCode>primary</InlineCode> pairs
          with <InlineCode>primary-foreground</InlineCode>.
        </p>
        <CodeBlock code={conventionSnippet} title="app/globals.css" lang="css" />
        <CodeBlock code={conventionUsageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Customize</h2>
        <p className="leading-relaxed text-muted-foreground">
          To change the brand, override the variables in{" "}
          <InlineCode>app/globals.css</InlineCode>. You don&apos;t need to edit
          any component:
        </p>
        <CodeBlock code={customizeCss} title="app/globals.css" lang="css" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Add a new token</h2>
        <p className="leading-relaxed text-muted-foreground">
          Define the variable under <InlineCode>:root</InlineCode> and{" "}
          <InlineCode>.dark</InlineCode>, then register it with{" "}
          <InlineCode>@theme inline</InlineCode> so Tailwind creates classes
          for it:
        </p>
        <CodeBlock code={addTokenSnippet} title="app/globals.css" lang="css" />
        <CodeBlock code={addTokenUsageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Default tokens</h2>
        <p className="leading-relaxed text-muted-foreground">
          The full default set. Copy it into your global CSS and adjust as
          needed:
        </p>
        <CodeBlock
          code={defaultThemeCss}
          title="app/globals.css"
          lang="css"
          collapsible
        />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Color Usage",
              description: "Pick the right color for text, surfaces and borders.",
              href: "/docs/color-usage",
              icon: PaletteIcon,
            },
            {
              title: "Theming",
              description: "How light and dark mode work.",
              href: "/docs/theming",
              icon: MoonIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
