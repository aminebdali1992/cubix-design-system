export const COLOR_MODES = ["light", "dark"] as const;

export type ColorMode = (typeof COLOR_MODES)[number];

export function otherMode(mode: ColorMode): ColorMode {
  return mode === "light" ? "dark" : "light";
}

export type TokenGroup = {
  id: string;
  title: string;
  panelTitle: string;
  description: string;
  tokens: readonly string[];
};

export const TOKEN_GROUPS: readonly TokenGroup[] = [
  {
    id: "base",
    title: "Base",
    panelTitle: "Base",
    description:
      "The page itself: the ground everything is drawn on and the text that sits on it.",
    tokens: ["background", "foreground"],
  },
  {
    id: "surface",
    title: "Card & popover",
    panelTitle: "Card & Popover",
    description:
      "The raised surfaces - cards and popovers - and the text they carry.",
    tokens: ["card", "card-foreground", "popover", "popover-foreground"],
  },
  {
    id: "brand",
    title: "Primary, secondary, muted & accent",
    panelTitle: "Primary, secondary, muted, accent",
    description:
      "The four fills that carry actions and emphasis, each with the text written on it.",
    tokens: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
    ],
  },
  {
    id: "destructive",
    title: "Destructive",
    panelTitle: "Destructive",
    description:
      "The one color reserved for deleting, discarding and anything that cannot be undone.",
    tokens: ["destructive", "destructive-foreground"],
  },
  {
    id: "form",
    title: "Border, input & ring",
    panelTitle: "Border, input, ring",
    description:
      "The hairlines, field fills and focus ring that give every control its edges.",
    tokens: ["border", "input", "ring"],
  },
  {
    id: "chart",
    title: "Charts",
    panelTitle: "Charts",
    description:
      "Five categorical series colors, meant to stay apart from each other at a glance.",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    id: "sidebar",
    title: "Sidebar",
    panelTitle: "Sidebar",
    description:
      "The navigation shell's own palette, so it can sit apart from the page it frames.",
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
  },
];

export const ALL_TOKENS: readonly string[] = TOKEN_GROUPS.flatMap(
  (group) => group.tokens
);

export const WIDE_SPECIMEN_TOKENS: ReadonlySet<string> = new Set([
  "background",
  "foreground",
]);

export type ContrastPair = { surface: string; text: string };

export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  { surface: "background", text: "foreground" },
  { surface: "card", text: "card-foreground" },
  { surface: "popover", text: "popover-foreground" },
  { surface: "primary", text: "primary-foreground" },
  { surface: "secondary", text: "secondary-foreground" },
  { surface: "muted", text: "muted-foreground" },
  { surface: "accent", text: "accent-foreground" },
];

export const BASE_COLORS = [
  { value: "neutral", label: "Neutral" },
  { value: "stone", label: "Stone" },
  { value: "zinc", label: "Zinc" },
  { value: "gray", label: "Gray" },
  { value: "slate", label: "Slate" },
] as const;

export type BaseColor = (typeof BASE_COLORS)[number]["value"];

export function isBaseColor(value: unknown): value is BaseColor {
  return BASE_COLORS.some((option) => option.value === value);
}
