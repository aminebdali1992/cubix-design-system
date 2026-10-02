export const USER_PROMPT =
  "Add the Cubix MCP server so you can look up components from the registry."

export const AGENT_INTRO = "I'll register the Cubix MCP server in your Cursor project config."

export const MCP_PATH = ".cursor/mcp.json"

export const MCP_JSON = `{
  "mcpServers": {
    "cubix": {
      "command": "npx",
      "args": ["-y", "@cubix/mcp@latest"]
    }
  }
}`

export const AGENT_SUCCESS =
  "Cubix MCP is connected. I can query components, tokens, and registry docs from here."

export type DemoPhase =
  | "idle"
  | "typing"
  | "sending"
  | "user-sent"
  | "thinking"
  | "agent-intro"
  | "tool-open"
  | "tool-writing"
  | "tool-done"
  | "success"
  | "hold"

export const PHASE_AT = {
  typing: 900,
  charMs: 32,
  afterTyped: 600,
  sending: 260,
  thinking: 900,
  agentIntro: 1100,
  toolOpen: 700,
  toolWriting: 1600,
  toolDone: 900,
  success: 800,
  hold: 3200,
} as const

export const FILE_TREE = [
  { name: ".cursor", kind: "folder" as const, depth: 0, highlight: true },
  { name: "mcp.json", kind: "file" as const, depth: 1, highlight: true },
  { name: "app", kind: "folder" as const, depth: 0 },
  { name: "page.tsx", kind: "file" as const, depth: 1 },
  { name: "components", kind: "folder" as const, depth: 0 },
  { name: "lib", kind: "folder" as const, depth: 0 },
  { name: "package.json", kind: "file" as const, depth: 0 },
]
