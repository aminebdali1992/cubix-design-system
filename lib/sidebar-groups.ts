/**
 * Sidebar groups for the component docs. Slug = path after /docs/components/.
 * Anything not listed in ATOM, AI or PATTERN falls into Fragment Components.
 */

export const SIDEBAR_GROUPS = [
  "UI Patterns",
  "Fragment Components",
  "Atom Components",
  "AI Components",
] as const

export type SidebarGroup = (typeof SIDEBAR_GROUPS)[number]

/* Components built only for chat / assistant interfaces. */
const AI = new Set([
  "conversation", "message", "message-scroller", "thinking", "streaming-text",
  "prompt-input", "prompt-suggestion", "model-selector", "tool-call", "sources",
  "code-block", "branch", "queue",
])

/* Single, indivisible building blocks that do not compose other components. */
const ATOM = new Set([
  "button", "badge", "avatar", "label", "input", "textarea", "checkbox",
  "switch", "radio-group", "toggle", "slider", "separator", "spinner",
  "skeleton", "progress", "kbd", "aspect-ratio", "scroll-area", "collapsible",
  "direction",
])

/* Full interface sections assembled from many fragments. */
const PATTERN = new Set([
  "sidebar", "navigation-menu", "menubar", "data-table", "chart", "command",
  "carousel", "calendar", "date-picker", "resizable", "empty",
])

/* Prop-driven callouts and other ready-made compositions. */
const FRAGMENT = new Set(["admonition", "form-item-layout", "metric-card", "page-header", "page-section"])

/* Everything else: fields, menus, overlays, feedback and other compositions of atoms. */
export function getSidebarGroup(href: string): SidebarGroup {
  const slug = href.replace(/^\/docs\/components\//, "").split("/").pop() ?? ""
  if (AI.has(slug)) return "AI Components"
  if (FRAGMENT.has(slug)) return "Fragment Components"
  if (ATOM.has(slug)) return "Atom Components"
  /* For now Fragment and Pattern items are listed under Atom Components. */
  if (PATTERN.has(slug)) return "Atom Components"
  return "Atom Components"
}