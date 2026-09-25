export const families = [
  {
    name: "--font-sans",
    value: "Geist",
    usage: "UI text, body copy, and most interface chrome.",
    className: "font-sans",
  },
  {
    name: "--font-heading",
    value: "Geist",
    usage: "Page titles and section headings via font-heading.",
    className: "font-heading",
  },
  {
    name: "--font-mono",
    value: "Geist Mono",
    usage: "Code blocks, inline code, paths, and terminal snippets.",
    className: "font-mono",
  },
  {
    name: "--font-iran-sans",
    value: "IRANSans XV",
    usage:
      "Persian / RTL (variable, 100-900). Baseline-corrected via font metric overrides so fixed-height controls center like Latin; Latin stays on Geist.",
    className: "[font-family:var(--font-iran-sans)]",
  },
] as const;

/** Pixel sizes assume a 16px root font size. */
export const typeScale = [
  {
    token: "text-xs",
    size: "0.75rem",
    px: "12px",
    lh: "calc(1 / 0.75)",
    usage: "Numeric twin of text-caption",
  },
  {
    token: "text-13",
    size: "0.8125rem",
    px: "13px",
    lh: "calc(1.125 / 0.8125)",
    usage: "Numeric twin of text-label",
  },
  {
    token: "text-sm",
    size: "0.875rem",
    px: "14px",
    lh: "calc(1.25 / 0.875)",
    usage: "Numeric twin of text-description",
  },
  {
    token: "text-base",
    size: "1rem",
    px: "16px",
    lh: "calc(1.5 / 1)",
    usage: "Numeric twin of text-body",
  },
  {
    token: "text-lg",
    size: "1.125rem",
    px: "18px",
    lh: "calc(1.75 / 1.125)",
    usage: "Numeric twin of text-lead",
  },
  {
    token: "text-xl",
    size: "1.25rem",
    px: "20px",
    lh: "calc(1.75 / 1.25)",
    usage: "Small headings",
  },
  {
    token: "text-2xl",
    size: "1.5rem",
    px: "24px",
    lh: "calc(2 / 1.5)",
    usage: "Numeric twin of text-title",
  },
  {
    token: "text-3xl",
    size: "1.875rem",
    px: "30px",
    lh: "calc(2.25 / 1.875)",
    usage: "Section headings",
  },
  {
    token: "text-4xl",
    size: "2.25rem",
    px: "36px",
    lh: "calc(2.5 / 2.25)",
    usage: "Page titles",
  },
  {
    token: "text-5xl",
    size: "3rem",
    px: "48px",
    lh: "1.15",
    usage: "Hero titles",
  },
  {
    token: "text-6xl",
    size: "3.75rem",
    px: "60px",
    lh: "1.12",
    usage: "Marketing displays",
  },
  {
    token: "text-7xl",
    size: "4.5rem",
    px: "72px",
    lh: "1.1",
    usage: "Large displays",
  },
  {
    token: "text-8xl",
    size: "6rem",
    px: "96px",
    lh: "1.08",
    usage: "Poster-scale type",
  },
] as const;

export const typeRoles = [
  {
    token: "text-display",
    size: "clamp(2.25rem, 1.75rem + 2.5vw, 3.75rem)",
    px: "36-60px",
    lh: "1.12",
    tracking: "-0.03em",
    weight: "600",
    usage: "Hero and campaign titles",
  },
  {
    token: "text-headline",
    size: "clamp(1.875rem, 1.75rem + 0.625vw, 2.25rem)",
    px: "30-36px",
    lh: "1.2",
    tracking: "-0.025em",
    weight: "600",
    usage: "Page titles",
  },
  {
    token: "text-title",
    size: "1.5rem",
    px: "24px",
    lh: "1.333",
    tracking: "-0.02em",
    weight: "600",
    usage: "Section headings",
  },
  {
    token: "text-lead",
    size: "1.125rem",
    px: "18px",
    lh: "1.556",
    tracking: "0",
    weight: "400",
    usage: "Intro paragraphs",
  },
  {
    token: "text-body",
    size: "1rem",
    px: "16px",
    lh: "1.6",
    tracking: "0",
    weight: "400",
    usage: "Readable body copy",
  },
  {
    token: "text-description",
    size: "0.875rem",
    px: "14px",
    lh: "1.429",
    tracking: "0.005em",
    weight: "400",
    usage: "Controls, menu items, supporting UI copy",
  },
  {
    token: "text-label",
    size: "0.8125rem",
    px: "13px",
    lh: "1.385",
    tracking: "0.01em",
    weight: "400",
    usage: "Field titles and form labels",
  },
  {
    token: "text-caption",
    size: "0.75rem",
    px: "12px",
    lh: "1.333",
    tracking: "0.02em",
    weight: "400",
    usage: "Hints under inputs, badges, kbd, compact chrome",
  },
] as const;

export const measureRows = [
  {
    token: "max-w-prose",
    value: "65ch",
    usage: "Ideal reading column (45-75ch).",
  },
  {
    token: "max-w-prose-narrow",
    value: "45ch",
    usage: "Short asides, captions, callouts.",
  },
  {
    token: "max-w-prose-wide",
    value: "75ch",
    usage: "Upper bound before lines get hard to scan.",
  },
] as const;

export const trackingRows = [
  {
    token: "tracking-display",
    value: "-0.03em",
    usage: "Largest display type",
  },
  {
    token: "tracking-headline",
    value: "-0.025em",
    usage: "Page and section titles",
  },
  {
    token: "tracking-title",
    value: "-0.02em",
    usage: "Smaller headings",
  },
  {
    token: "tracking-body",
    value: "0em",
    usage: "Body, lead, and UI copy",
  },
  {
    token: "tracking-label",
    value: "0.02em",
    usage: "text-caption and compact overlines",
  },
] as const;

export const rhythmControls = [
  {
    name: "--typeset-size",
    role: "Base text size",
    detail: "Defaults to 1rem (16px). Chat may tighten; docs should not go below 16px.",
  },
  {
    name: "--typeset-leading",
    role: "Line height",
    detail: "1.5 minimum for body. Typeset uses 1.6; docs prose uses 1.7.",
  },
  {
    name: "--typeset-flow",
    role: "Block spacing",
    detail: "Gap between paragraphs, lists, and other blocks. One-direction only.",
  },
  {
    name: "--typeset-stack",
    role: "Title to supporting line",
    detail:
      "Gap from a title to its supporting line. 0.125rem in every locale.",
  },
  {
    name: "--typeset-measure",
    role: "Line length",
    detail: "65ch by default. Chat sets this to none so the parent owns width.",
  },
] as const;

export const docsProseSnippet = `.docs-prose {
  --typeset-size: var(--text-body);
  --typeset-leading: var(--leading-prose);
  --typeset-flow: 1.35em;
  letter-spacing: var(--tracking-body);
}`;

export const typesetBaseSnippet = `.typeset {
  --typeset-font-body: var(--font-sans);
  --typeset-font-heading: var(--font-heading);
  --typeset-font-mono: var(--font-mono);
  --typeset-size: var(--text-body);
  --typeset-leading: var(--leading-body);
  --typeset-flow: 1.25em;
  --typeset-after-heading: 0.5em;
  --typeset-measure: var(--container-prose);
  --typeset-tracking: var(--tracking-body);

  max-width: var(--typeset-measure);
  font-family: var(--typeset-font-body);
  font-size: var(--typeset-size);
  line-height: var(--typeset-leading);
  letter-spacing: var(--typeset-tracking);
  text-wrap: pretty;
}`;

export const presetsSnippet = `.typeset-docs {
  --typeset-size: var(--text-body);
  --typeset-leading: var(--leading-prose);
  --typeset-flow: 1.35em;
}

.typeset-chat {
  --typeset-size: var(--text-description);
  --typeset-leading: 1.6;
  --typeset-flow: 1em;
  --typeset-measure: none;
}

.typeset-large {
  --typeset-size: var(--text-lg);
  --typeset-leading: 1.75;
  --typeset-flow: 1.5em;
}`;

export const usageSnippet = `<h1 className="font-heading text-display">Page title</h1>
<p className="text-lead text-muted-foreground">Intro copy.</p>
<article className="typeset typeset-docs">{page}</article>
<div className="typeset typeset-chat">{message}</div>`;

export const oneOffSnippet = `<article className="typeset [--typeset-flow:1.75em] [--typeset-measure:75ch]">
  ...
</article>`;

export const optOutSnippet = `<div className="typeset typeset-docs">
  <p>Styled prose.</p>
  <Card className="not-typeset">Untouched component.</Card>
</div>`;

export const overrideSnippet = `<div className="typeset typeset-docs">
  <p className="text-lead">Utility wins over typeset defaults.</p>
</div>`;

export const largeSnippet = `.typeset-large {
  --typeset-size: var(--text-lg);
  --typeset-leading: 1.75;
  --typeset-flow: 1.5em;
}

.dark .typeset {
  --typeset-leading: 1.7;
}

.dark .typeset-docs {
  --typeset-leading: 1.8;
}

.dark .typeset-large {
  --typeset-leading: 1.85;
}`;

export const importSnippet = `@import "tailwindcss";
/* Cubix tokens and utilities */
@import "./globals.css";`;

export const persianFontSnippet = `import localFont from "next/font/local";

// IRANSans XV ships ascent 100% / descent 50%, which leaves its baseline ~0.068em
// too high, so Persian reads about 1px high in leading-none controls. Moving the
// baseline down while keeping the 150% total leaves prose leading untouched.
export const iranSans = localFont({
  src: "./IRANSansXV.woff2",
  weight: "100 900",
  variable: "--font-iran-sans",
  display: "swap",
  declarations: [
    { prop: "ascent-override", value: "107%" },
    { prop: "descent-override", value: "43%" },
    { prop: "line-gap-override", value: "0%" },
  ],
});`;

export const persianSnippet = `[lang="fa"] {
  font-family: var(--font-arab), var(--font-sans), ui-sans-serif, sans-serif;
  --leading-body: 1.75;
  --leading-prose: 1.85;
}

[lang="fa"] .typeset {
  --typeset-leading: 1.75;
  --typeset-flow: 1.45em;
  --typeset-after-heading: 0.75em;
}`;
