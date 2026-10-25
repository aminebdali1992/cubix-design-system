/* Shared UI-tree schema for the /customize chat. The model returns this JSON;
   sanitizeTree keeps only allowlisted nodes and props before rendering. */

export type UINode =
  | { type: "stack"; gap?: number; align?: "start" | "center" | "stretch"; children: UINode[] }
  | { type: "row"; gap?: number; justify?: "start" | "center" | "between" | "end"; children: UINode[] }
  | { type: "heading"; text: string; level?: 1 | 2 | 3 }
  | { type: "text"; text: string; tone?: "default" | "muted" }
  | { type: "card"; title?: string; description?: string; children: UINode[] }
  | { type: "button"; text: string; variant?: ButtonVariant; fullWidth?: boolean }
  | { type: "textField" | "emailField" | "phoneField" | "passwordField"; label: string; placeholder?: string }
  | { type: "checkbox" | "switch"; label: string; checked?: boolean }
  | { type: "badge"; text: string; variant?: BadgeVariant }
  | { type: "separator" }
  | { type: "avatar"; fallback: string };

export type UITree = { title: string; device: "mobile" | "desktop"; root: UINode };

const BUTTON_VARIANTS = ["default", "secondary", "gray", "destructive", "outline", "ghost", "link"] as const;
const BADGE_VARIANTS = ["default", "secondary", "destructive", "success", "warning", "info", "outline"] as const;
type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export const UI_TREE_PROMPT = `You are a UI designer for the Cubix design system (Persian, RTL).
Reply with ONLY one JSON object, no prose, no markdown fences:
{"title": string, "device": "mobile" | "desktop", "root": Node}
Node is one of:
{"type":"stack","gap":0-12,"align":"start"|"center"|"stretch","children":[Node]}
{"type":"row","gap":0-12,"justify":"start"|"center"|"between"|"end","children":[Node]}
{"type":"heading","text":string,"level":1|2|3}
{"type":"text","text":string,"tone":"default"|"muted"}
{"type":"card","title"?:string,"description"?:string,"children":[Node]}
{"type":"button","text":string,"variant":"${BUTTON_VARIANTS.join('"|"')}","fullWidth"?:boolean}
{"type":"textField"|"emailField"|"phoneField"|"passwordField","label":string,"placeholder"?:string}
{"type":"checkbox"|"switch","label":string,"checked"?:boolean}
{"type":"badge","text":string,"variant":"${BADGE_VARIANTS.join('"|"')}"}
{"type":"separator"}
{"type":"avatar","fallback":string (1-2 letters)}
Rules: use only these node types and keys; all visible text in Persian; prefer "mobile"; keep it under 40 nodes; a clean, realistic screen.`;

const MAX_NODES = 80;
const str = (v: unknown, max = 200) => (typeof v === "string" ? v.slice(0, max) : "");
const pick = <T extends string>(v: unknown, list: readonly T[], d: T): T =>
  list.includes(v as T) ? (v as T) : d;
const gap = (v: unknown) => (typeof v === "number" ? Math.max(0, Math.min(12, Math.round(v))) : 3);

function node(v: unknown, budget: { n: number }, depth: number): UINode | null {
  if (!v || typeof v !== "object" || depth > 8 || budget.n++ > MAX_NODES) return null;
  const o = v as Record<string, unknown>;
  const kids = () =>
    (Array.isArray(o.children) ? o.children : [])
      .map((c) => node(c, budget, depth + 1))
      .filter((c): c is UINode => c !== null);
  switch (o.type) {
    case "stack":
      return { type: "stack", gap: gap(o.gap), align: pick(o.align, ["start", "center", "stretch"] as const, "stretch"), children: kids() };
    case "row":
      return { type: "row", gap: gap(o.gap), justify: pick(o.justify, ["start", "center", "between", "end"] as const, "start"), children: kids() };
    case "heading":
      return { type: "heading", text: str(o.text), level: o.level === 1 || o.level === 3 ? o.level : 2 };
    case "text":
      return { type: "text", text: str(o.text, 600), tone: pick(o.tone, ["default", "muted"] as const, "default") };
    case "card":
      return { type: "card", title: str(o.title) || undefined, description: str(o.description) || undefined, children: kids() };
    case "button":
      return { type: "button", text: str(o.text), variant: pick(o.variant, BUTTON_VARIANTS, "default"), fullWidth: o.fullWidth === true };
    case "textField":
    case "emailField":
    case "phoneField":
    case "passwordField":
      return { type: o.type as "textField" | "emailField" | "phoneField" | "passwordField", label: str(o.label), placeholder: str(o.placeholder) || undefined };
    case "checkbox":
    case "switch":
      return { type: o.type as "checkbox" | "switch", label: str(o.label), checked: o.checked === true };
    case "badge":
      return { type: "badge", text: str(o.text, 60), variant: pick(o.variant, BADGE_VARIANTS, "default") };
    case "separator":
      return { type: "separator" };
    case "avatar":
      return { type: "avatar", fallback: str(o.fallback, 2) || "؟" };
    default:
      return null;
  }
}

/** Parse raw model output (may include fences or prose) into a safe UITree. */
export function parseTree(raw: string): UITree | null {
  const text = raw.replace(/```(?:json)?/gi, "");
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  let data: unknown;
  try {
    data = JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
  const o = data as Record<string, unknown>;
  const root = node(o?.root, { n: 0 }, 0);
  if (!root) return null;
  return {
    title: str(o.title, 80) || "طرح جدید",
    device: o.device === "desktop" ? "desktop" : "mobile",
    root,
  };
}
