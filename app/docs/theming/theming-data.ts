export type ThemeSwatch = {
  token: string;
  /** CSS variable used for the live preview chip */
  variable: string;
  light: string;
  dark: string;
};

/** Color tokens shown in the palette table - values match `app/globals.css`. */
export const swatches: ThemeSwatch[] = [
  {
    token: "background",
    variable: "--background",
    light: "oklch(1 0 0)",
    dark: "oklch(0.145 0 0)",
  },
  {
    token: "foreground",
    variable: "--foreground",
    light: "oklch(0% 0 0)",
    dark: "oklch(0.985 0 0)",
  },
  {
    token: "card",
    variable: "--card",
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
  },
  {
    token: "primary",
    variable: "--primary",
    light: "oklch(0.653 0.155 271.6)",
    dark: "oklch(0.653 0.155 271.6)",
  },
  {
    token: "secondary",
    variable: "--secondary",
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
  },
  {
    token: "muted",
    variable: "--muted",
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
  },
  {
    token: "accent",
    variable: "--accent",
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.371 0 0)",
  },
  {
    token: "destructive",
    variable: "--destructive",
    light: "oklch(0.653 0.191 24.1)",
    dark: "oklch(0.653 0.191 24.1)",
  },
  {
    token: "border",
    variable: "--border",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 10%)",
  },
  {
    token: "input",
    variable: "--input",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 15%)",
  },
  {
    token: "ring",
    variable: "--ring",
    light: "oklch(0.708 0 0)",
    dark: "oklch(0.556 0 0)",
  },
  {
    token: "overlay",
    variable: "--overlay",
    light: "oklch(0% 0 0 / 10%)",
    dark: "oklch(0% 0 0 / 10%)",
  },
  {
    token: "overlay-strong",
    variable: "--overlay-strong",
    light: "oklch(0% 0 0 / 30%)",
    dark: "oklch(0% 0 0 / 30%)",
  },
  {
    token: "chart-1",
    variable: "--chart-1",
    light: "oklch(0.646 0.222 41.116)",
    dark: "oklch(0.488 0.243 264.376)",
  },
  {
    token: "chart-2",
    variable: "--chart-2",
    light: "oklch(0.6 0.118 184.704)",
    dark: "oklch(0.696 0.17 162.48)",
  },
  {
    token: "chart-3",
    variable: "--chart-3",
    light: "oklch(0.398 0.07 227.392)",
    dark: "oklch(0.769 0.188 70.08)",
  },
  {
    token: "chart-4",
    variable: "--chart-4",
    light: "oklch(0.828 0.189 84.429)",
    dark: "oklch(0.627 0.265 303.9)",
  },
  {
    token: "chart-5",
    variable: "--chart-5",
    light: "oklch(0.769 0.188 70.08)",
    dark: "oklch(0.645 0.246 16.439)",
  },
  {
    token: "sidebar",
    variable: "--sidebar",
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.205 0 0)",
  },
];

export type TokenDoc = {
  name: string;
  controls: string;
  usedBy: string;
};

export const tokenDocs: TokenDoc[] = [
  {
    name: "background / foreground",
    controls: "Default app background and text.",
    usedBy: "Page shell, sections, default copy.",
  },
  {
    name: "card / card-foreground",
    controls: "Elevated surfaces and content on them.",
    usedBy: "Card, panels, settings surfaces.",
  },
  {
    name: "popover / popover-foreground",
    controls: "Floating surfaces and overlay content.",
    usedBy: "Popover, Dropdown Menu, Context Menu.",
  },
  {
    name: "primary / primary-foreground",
    controls: "High-emphasis actions and brand fills.",
    usedBy: "Default Button, selected states, badges.",
  },
  {
    name: "secondary / secondary-foreground",
    controls: "Lower-emphasis filled actions.",
    usedBy: "Secondary buttons and supporting UI.",
  },
  {
    name: "muted / muted-foreground",
    controls: "Subtle surfaces and quieter text.",
    usedBy: "Descriptions, placeholders, empty states.",
  },
  {
    name: "accent / accent-foreground",
    controls: "Hover, focus, and active surfaces.",
    usedBy: "Ghost buttons, menu highlights, hovered rows.",
  },
  {
    name: "destructive / destructive-foreground",
    controls: "Destructive actions and error emphasis.",
    usedBy: "Destructive buttons, invalid states.",
  },
  {
    name: "border",
    controls: "Default borders and separators.",
    usedBy: "Cards, tables, menus, layout dividers.",
  },
  {
    name: "input",
    controls: "Form control borders and outlines.",
    usedBy: "Input, Textarea, Select, outline controls.",
  },
  {
    name: "ring",
    controls: "Focus rings.",
    usedBy: "Buttons, inputs, checkboxes, menus.",
  },
  {
    name: "overlay / overlay-strong",
    controls: "Dimmed scrims behind floating UI.",
    usedBy: "Dialog, Sheet, Drawer.",
  },
  {
    name: "chart-1 … chart-5",
    controls: "Default chart palette.",
    usedBy: "Chart and dashboard blocks.",
  },
  {
    name: "sidebar / sidebar-foreground",
    controls: "Sidebar surface and default text.",
    usedBy: "Sidebar container and content.",
  },
  {
    name: "sidebar-primary / sidebar-primary-foreground",
    controls: "High-emphasis actions in the sidebar.",
    usedBy: "Active items, icon tiles, sidebar CTAs.",
  },
  {
    name: "sidebar-accent / sidebar-accent-foreground",
    controls: "Hover and selected states in the sidebar.",
    usedBy: "Sidebar menu rows and open items.",
  },
  {
    name: "sidebar-border / sidebar-ring",
    controls: "Sidebar borders and focus rings.",
    usedBy: "Sidebar headers, groups, focused controls.",
  },
  {
    name: "radius",
    controls: "Base corner radius; drives radius-* scale.",
    usedBy: "Cards, inputs, buttons, popovers.",
  },
];

export const radiusScale = [
  { name: "radius-sm", value: "calc(var(--radius) * 0.6)" },
  { name: "radius-md", value: "calc(var(--radius) * 0.8)" },
  { name: "radius-lg", value: "var(--radius)" },
  { name: "radius-xl", value: "calc(var(--radius) * 1.4)" },
  { name: "radius-2xl", value: "calc(var(--radius) * 1.8)" },
  { name: "radius-3xl", value: "calc(var(--radius) * 2.2)" },
  { name: "radius-4xl", value: "calc(var(--radius) * 2.6)" },
];

export const cubixJsonSnippet = `{
  "style": "cubix",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  }
}`;

export const conventionSnippet = `--primary: oklch(0.653 0.155 271.6);
--primary-foreground: oklch(0.985 0 0);`;

export const conventionUsageSnippet = `<div className="bg-primary text-primary-foreground">
  Hello
</div>`;

export const utilitySnippet = `<div className="bg-background text-foreground" />`;

export const customizeCss = `:root {
  --primary: oklch(0.55 0.2 262);
  --primary-foreground: oklch(0.98 0 0);
  --radius: 0.75rem;
}

.dark {
  --primary: oklch(0.72 0.14 262);
  --primary-foreground: oklch(0.2 0.02 262);
}`;

export const addTokenSnippet = `:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}`;

export const addTokenUsageSnippet = `<div className="bg-warning text-warning-foreground" />`;

export const radiusSnippet = `@theme inline {
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}`;

export const defaultThemeCss = `@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0% 0 0);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0% 0 0);

  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0% 0 0);

  --primary: oklch(0.653 0.155 271.6);
  --primary-foreground: oklch(0.985 0 0);

  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);

  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);

  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);

  --destructive: oklch(0.653 0.191 24.1);
  --destructive-foreground: oklch(0.985 0 0);

  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  --overlay: oklch(0% 0 0 / 10%);
  --overlay-strong: oklch(0% 0 0 / 30%);

  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0% 0 0);
  --sidebar-primary: oklch(0.653 0.155 271.6);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);

  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);

  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);

  --primary: oklch(0.653 0.155 271.6);
  --primary-foreground: oklch(0.985 0 0);

  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);

  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);

  --accent: oklch(0.371 0 0);
  --accent-foreground: oklch(0.985 0 0);

  --destructive: oklch(0.653 0.191 24.1);
  --destructive-foreground: oklch(0.985 0 0);

  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);

  --overlay: oklch(0% 0 0 / 10%);
  --overlay-strong: oklch(0% 0 0 / 30%);

  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);

  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.653 0.155 271.6);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}`;
