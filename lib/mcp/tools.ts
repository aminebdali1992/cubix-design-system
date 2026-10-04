import fs from "node:fs/promises";
import path from "node:path";

import { readDocsExampleSource } from "@/lib/docs/example-source";
import { siteConfig } from "@/lib/site";

import { isObject } from "./json-rpc";
import {
  buildInstallCommand,
  componentDocsUrl,
  isValidComponentName,
  loadRegistryIndex,
  loadRegistryItem,
  normalizeBase,
  registryItemUrl,
  searchRegistryItems,
  summarizeIndexItem,
} from "./registry";
import type { McpToolDefinition, McpToolResult } from "./types";

function textResult(
  data: unknown,
  options?: { isError?: boolean }
): McpToolResult {
  return {
    content: [
      {
        type: "text",
        text:
          typeof data === "string" ? data : JSON.stringify(data, null, 2),
      },
    ],
    isError: options?.isError,
    structuredContent:
      typeof data === "object" && data !== null && !Array.isArray(data)
        ? (data as Record<string, unknown>)
        : undefined,
  };
}

function errorResult(message: string): McpToolResult {
  return textResult({ error: message }, { isError: true });
}

function readString(
  args: Record<string, unknown>,
  key: string
): string | undefined {
  const value = args[key];
  return typeof value === "string" ? value : undefined;
}

function readBoolean(
  args: Record<string, unknown>,
  key: string
): boolean | undefined {
  const value = args[key];
  return typeof value === "boolean" ? value : undefined;
}

async function loadDemoSource(name: string): Promise<string | null> {
  const relativePath = path.join(
    "app",
    "docs",
    "components",
    name,
    "examples",
    `${name}-demo.tsx`
  );
  const absolutePath = path.join(process.cwd(), relativePath);

  try {
    await fs.access(absolutePath);
  } catch {
    return null;
  }

  return readDocsExampleSource(relativePath, {
    publicImport: `@/components/cubix/${name}`,
  });
}

export const MCP_TOOLS: McpToolDefinition[] = [
  {
    name: "list_components",
    title: "List Cubix components",
    description:
      "Every installable Cubix component from the public registry (name, title, description, bases, docs URL). Names only plus metadata - use search_components to find by need, get_component for install details, get_component_demo for usage.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      idempotentHint: true,
    },
  },
  {
    name: "search_components",
    title: "Search Cubix components",
    description:
      "Find Cubix registry items by name, title, or description (English). Returns matching components with docs URLs. Call get_component or get_component_demo next.",
    inputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: {
        query: {
          type: "string",
          minLength: 1,
          description:
            'Search string, e.g. "dialog", "password", or "email field"',
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          description: "Maximum matches to return (default 20).",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      idempotentHint: true,
    },
  },
  {
    name: "get_component",
    title: "Get Cubix component",
    description:
      "Install command, dependencies, registry dependencies, file paths, and docs URL for one Cubix component. Source is omitted by default because `cubix-ui add` copies it; set include_source true only when you need to read or patch the file.",
    inputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: {
        name: {
          type: "string",
          description: "Registry name, e.g. button or password-field",
        },
        base: {
          type: "string",
          enum: ["base", "aria", "radix"],
          description:
            "Primitive backend. Default base (Base UI). Use aria or radix when the project (or user) asks for that base.",
        },
        include_source: {
          type: "boolean",
          description:
            "Include full file contents (large). Default false - prefer the install command.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      idempotentHint: true,
    },
  },
  {
    name: "get_component_demo",
    title: "Get Cubix component demo",
    description:
      "Paste-ready usage demo from the Cubix docs (rewritten to public @/components/cubix imports), plus docs URL and install command. Call before composing a screen so props and imports match the real API.",
    inputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: {
        name: {
          type: "string",
          description: "Registry name, e.g. button or dialog",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      idempotentHint: true,
    },
  },
  {
    name: "get_install_command",
    title: "Get Cubix install command",
    description:
      "Return the exact cubix-ui add command for one or more components, with optional --base. Prefer this when you only need the CLI line.",
    inputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: {
        name: {
          type: "string",
          description:
            "One name, or space-separated names, e.g. \"button\" or \"card email-field password-field\"",
        },
        base: {
          type: "string",
          enum: ["base", "aria", "radix"],
          description: "Primitive backend override. Default base.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      idempotentHint: true,
    },
  },
];

async function listComponents(): Promise<McpToolResult> {
  const index = await loadRegistryIndex();
  const components = index.items.map(summarizeIndexItem);
  return textResult({
    registry: siteConfig.registryUrl,
    count: components.length,
    components,
  });
}

async function searchComponents(
  args: Record<string, unknown>
): Promise<McpToolResult> {
  const query = readString(args, "query")?.trim();
  if (!query) {
    return errorResult('Missing required string argument "query".');
  }

  const limitRaw = args.limit;
  const limit =
    typeof limitRaw === "number" && Number.isFinite(limitRaw)
      ? Math.min(100, Math.max(1, Math.floor(limitRaw)))
      : 20;

  const index = await loadRegistryIndex();
  const matches = searchRegistryItems(index.items, query)
    .slice(0, limit)
    .map(summarizeIndexItem);

  return textResult({
    query,
    count: matches.length,
    components: matches,
  });
}

async function getComponent(
  args: Record<string, unknown>
): Promise<McpToolResult> {
  const name = readString(args, "name")?.trim().toLowerCase();
  if (!name || !isValidComponentName(name)) {
    return errorResult(
      'Invalid or missing "name". Use a registry slug like button or password-field.'
    );
  }

  const base = normalizeBase(args.base);
  const includeSource = readBoolean(args, "include_source") === true;
  const item = await loadRegistryItem(name, base);
  if (!item) {
    return errorResult(
      `Component "${name}" was not found for base "${base}". It may be on the roadmap. Call list_components or search_components.`
    );
  }

  const files = item.files.map((file) => {
    if (includeSource) {
      return {
        path: file.path,
        target: file.target ?? file.path,
        type: file.type,
        content: file.content ?? null,
      };
    }
    return {
      path: file.path,
      target: file.target ?? file.path,
      type: file.type,
    };
  });

  return textResult({
    name: item.name,
    title: item.title ?? item.name,
    description: item.description ?? "",
    type: item.type,
    base,
    install: buildInstallCommand(item.name, base),
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    docs: componentDocsUrl(item.name, base),
    registry: registryItemUrl(item.name, base),
    files,
    note: includeSource
      ? "Source included. Prefer cubix-ui add so dependencies and base variants stay correct."
      : "Source omitted. Run the install command, or call again with include_source: true.",
  });
}

async function getComponentDemo(
  args: Record<string, unknown>
): Promise<McpToolResult> {
  const name = readString(args, "name")?.trim().toLowerCase();
  if (!name || !isValidComponentName(name)) {
    return errorResult(
      'Invalid or missing "name". Use a registry slug like button or dialog.'
    );
  }

  const index = await loadRegistryIndex();
  const listed = index.items.some((item) => item.name === name);
  if (!listed) {
    return errorResult(
      `Component "${name}" is not in the public registry. Call search_components.`
    );
  }

  const source = await loadDemoSource(name);
  if (!source) {
    return errorResult(
      `No docs demo found for "${name}". Open ${componentDocsUrl(name)} or call get_component.`
    );
  }

  return textResult({
    name,
    docs: componentDocsUrl(name),
    install: buildInstallCommand(name),
    requirements: {
      install: buildInstallCommand(name),
    },
    source,
  });
}

async function getInstallCommand(
  args: Record<string, unknown>
): Promise<McpToolResult> {
  const raw = readString(args, "name")?.trim();
  if (!raw) {
    return errorResult('Missing required string argument "name".');
  }

  const base = normalizeBase(args.base);
  const names = raw
    .split(/[\s,]+/)
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);

  if (names.length === 0) {
    return errorResult('Missing required string argument "name".');
  }

  for (const name of names) {
    if (!isValidComponentName(name)) {
      return errorResult(`Invalid component name "${name}".`);
    }
  }

  const index = await loadRegistryIndex();
  const known = new Set(index.items.map((item) => item.name));
  const missing = names.filter((name) => !known.has(name));
  if (missing.length > 0) {
    return errorResult(
      `Unknown component(s): ${missing.join(", ")}. Call search_components.`
    );
  }

  const flag = base === "base" ? "" : ` --base ${base}`;
  const command = `npx ${siteConfig.packageName}@latest add ${names.join(" ")}${flag}`;

  return textResult({
    names,
    base,
    command,
    registry: siteConfig.registryUrl,
  });
}

export async function callMcpTool(
  name: string,
  args: unknown
): Promise<McpToolResult> {
  const toolArgs = isObject(args) ? args : {};

  switch (name) {
    case "list_components":
      return listComponents();
    case "search_components":
      return searchComponents(toolArgs);
    case "get_component":
      return getComponent(toolArgs);
    case "get_component_demo":
      return getComponentDemo(toolArgs);
    case "get_install_command":
      return getInstallCommand(toolArgs);
    default:
      return errorResult(`Unknown tool: ${name}`);
  }
}
