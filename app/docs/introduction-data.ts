import {
  BlocksIcon,
  BotIcon,
  Code2Icon,
  LanguagesIcon,
  Layers3Icon,
  PackageIcon,
  PaletteIcon,
  SparklesIcon,
  TypeIcon,
  type LucideIcon,
} from "lucide-react";

import { components } from "./components/components-data";

export type Principle = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const principles: Principle[] = [
  {
    id: "open-code",
    title: "Open code",
    description:
      "Every component is TypeScript source in your repo. Read it, change it, or delete it.",
    icon: Code2Icon,
  },
  {
    id: "one-api-three-bases",
    title: "One API, three bases",
    description:
      "Base UI, React Aria, or Radix UI underneath. The same props, slots, and styles on top.",
    icon: Layers3Icon,
  },
  {
    id: "design-tokens",
    title: "Design tokens",
    description:
      "Nine semantic tokens drive color, radius, and dark mode across the whole system.",
    icon: PaletteIcon,
  },
  {
    id: "agent-interfaces",
    title: "Agent interfaces",
    description:
      "Dedicated surfaces for chat and agent products, built on the same ownership model.",
    icon: BotIcon,
  },
  {
    id: "typeset",
    title: "Typeset",
    description:
      "Owned typesetting presets for docs, articles, and streaming chat output.",
    icon: TypeIcon,
  },
  {
    id: "rtl-and-locale",
    title: "RTL and locale",
    description:
      "Logical properties, bidirectional layouts, and a tuned Persian type stack.",
    icon: LanguagesIcon,
  },
  {
    id: "distribution",
    title: "Distribution",
    description:
      "A flat-file registry schema and a CLI that installs exactly what you ask for.",
    icon: PackageIcon,
  },
  {
    id: "ai-ready",
    title: "AI-ready",
    description:
      "Predictable source, project context, and Skills so assistants write correct Cubix code.",
    icon: SparklesIcon,
  },
];

export type BaseRow = {
  name: string;
  flag: string;
  when: string;
};

export const bases: BaseRow[] = [
  {
    name: "Base UI",
    flag: "base (default)",
    when: "Starting a new project and want the default Cubix stack.",
  },
  {
    name: "React Aria",
    flag: "--base aria",
    when: "Your team already relies on React Aria hooks and behaviors.",
  },
  {
    name: "Radix UI",
    flag: "--base radix",
    when: "Your app is built on Radix primitives and you want to keep them.",
  },
];

export type DesignToken = {
  name: string;
  swatchClassName: string;
  role: string;
};

export const designTokens: DesignToken[] = [
  { name: "background", swatchClassName: "bg-background", role: "Page surface" },
  { name: "foreground", swatchClassName: "bg-foreground", role: "Primary text" },
  { name: "muted", swatchClassName: "bg-muted", role: "Subtle surfaces" },
  { name: "accent", swatchClassName: "bg-accent", role: "Hover and selection" },
  { name: "primary", swatchClassName: "bg-primary", role: "Brand actions" },
  {
    name: "destructive",
    swatchClassName: "bg-destructive",
    role: "Errors and danger",
  },
  { name: "border", swatchClassName: "bg-border", role: "Dividers and outlines" },
  { name: "input", swatchClassName: "bg-input", role: "Form control borders" },
  { name: "ring", swatchClassName: "bg-ring", role: "Focus indicators" },
];

const agentSurfaceNames = [
  "Conversation",
  "Message Scroller",
  "Prompt Input",
  "Streaming Text",
  "Thinking",
  "Tool Call",
  "Sources",
  "Branch",
];

export type AgentSurface = {
  name: string;
  description: string;
  href: string;
  ready: boolean;
};

export const agentSurfaces: AgentSurface[] = agentSurfaceNames.flatMap(
  (name) => {
    const entry = components.find((item) => item.name === name);
    if (!entry || typeof entry.href !== "string") return [];
    return [
      {
        name: entry.name,
        description: entry.description,
        href: entry.href,
        ready: entry.ready,
      },
    ];
  }
);

export const readyComponentCount = components.filter((item) => item.ready)
  .length;

export type NextStep = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const nextSteps: NextStep[] = [
  {
    title: "Installation",
    description: "Initialize tokens, utilities, and cubix.json in your app.",
    href: "/docs/installation",
    icon: PackageIcon,
  },
  {
    title: "Components",
    description: "Browse the catalog and switch bases on every page.",
    href: "/docs/components",
    icon: BlocksIcon,
  },
  {
    title: "Theming",
    description: "Restyle the system by editing CSS variables.",
    href: "/docs/theming",
    icon: PaletteIcon,
  },
  {
    title: "CLI",
    description: "Every command for adding, viewing, and building items.",
    href: "/docs/cli",
    icon: Code2Icon,
  },
];

export const initCommands = {
  pnpm: "pnpm dlx cubix-ui@latest init",
  npm: "npx cubix-ui@latest init",
  yarn: "yarn dlx cubix-ui@latest init",
  bun: "bunx --bun cubix-ui@latest init",
};
