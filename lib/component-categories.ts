/**
 * English category labels for Cubix component docs badges.
 * Lookup is by the same `slug` passed to ComponentDocsHeader
 * (href path after /docs/components/).
 */

export const COMPONENT_CATEGORIES = [
  "Web",
  "Web/Mobile",
  "Mobile",
  "AI/Chat",
] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

const SLUG_TO_CATEGORY: Record<string, ComponentCategory> = {
  // AI/Chat
  conversation: "AI/Chat",
  message: "AI/Chat",
  "message-scroller": "AI/Chat",
  thinking: "AI/Chat",
  "streaming-text": "AI/Chat",
  "prompt-input": "AI/Chat",
  "prompt-suggestion": "AI/Chat",
  "model-selector": "AI/Chat",
  "tool-call": "AI/Chat",
  sources: "AI/Chat",
  "code-block": "AI/Chat",
  branch: "AI/Chat",
  queue: "AI/Chat",

  // Mobile
  "bottom-navigation": "Mobile",
  "app-bar": "Mobile",
  "action-sheet": "Mobile",
  "bottom-sheet": "Mobile",
  fab: "Mobile",
  "swipe-actions": "Mobile",
  "pull-to-refresh": "Mobile",
  "safe-area": "Mobile",
  "segmented-control": "Mobile",
  stepper: "Mobile",
  snackbar: "Mobile",
  dock: "Mobile",

  // Web
  sidebar: "Web",
  "navigation-menu": "Web",
  menubar: "Web",
  "dropdown-menu": "Web",
  "context-menu": "Web",
  breadcrumb: "Web",
  pagination: "Web",
  table: "Web",
  "data-table": "Web",
  chart: "Web",
  command: "Web",
  "hover-card": "Web",
  resizable: "Web",
  "scroll-area": "Web",

  // Web/Mobile - shared / remaining components
  button: "Web/Mobile",
  "button-group": "Web/Mobile",
  input: "Web/Mobile",
  "text-field": "Web/Mobile",
  "email-field": "Web/Mobile",
  "phone-field": "Web/Mobile",
  "password-field": "Web/Mobile",
  "number-field": "Web/Mobile",
  "amount-field": "Web/Mobile",
  "birthday-date": "Web/Mobile",
  "credit-card": "Web/Mobile",
  "verify-code": "Web/Mobile",
  textarea: "Web/Mobile",
  "text-area": "Web/Mobile",
  checkbox: "Web/Mobile",
  switch: "Web/Mobile",
  "radio-group": "Web/Mobile",
  select: "Web/Mobile",
  combobox: "Web/Mobile",
  label: "Web/Mobile",
  field: "Web/Mobile",
  "input-group": "Web/Mobile",
  slider: "Web/Mobile",
  calendar: "Web/Mobile",
  "date-picker": "Web/Mobile",
  badge: "Web/Mobile",
  card: "Web/Mobile",
  avatar: "Web/Mobile",
  "aspect-ratio": "Web/Mobile",
  skeleton: "Web/Mobile",
  separator: "Web/Mobile",
  spinner: "Web/Mobile",
  progress: "Web/Mobile",
  empty: "Web/Mobile",
  kbd: "Web/Mobile",
  chips: "Web/Mobile",
  toggle: "Web/Mobile",
  "toggle-group": "Web/Mobile",
  collapsible: "Web/Mobile",
  accordion: "Web/Mobile",
  carousel: "Web/Mobile",
  direction: "Web/Mobile",
  dialog: "Web/Mobile",
  "alert-dialog": "Web/Mobile",
  popover: "Web/Mobile",
  tooltip: "Web/Mobile",
  sheet: "Web/Mobile",
  drawer: "Web/Mobile",
  tabs: "Web/Mobile",
  alert: "Web/Mobile",
  toast: "Web/Mobile",
  sonner: "Web/Mobile",
  attachment: "Web/Mobile",
};

export function getComponentCategory(slug: string): string | undefined {
  return SLUG_TO_CATEGORY[slug];
}