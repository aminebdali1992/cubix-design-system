import fs from "fs-extra";
import path from "node:path";
import { z } from "zod";

import { CONFIG_SCHEMA_URL } from "./constants";

export const BASES = ["base", "radix", "aria"] as const;
export type BaseName = (typeof BASES)[number];

export const cubixConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default("cubix"),
  base: z.enum(BASES).default("base"),
  rsc: z.boolean().default(true),
  tsx: z.boolean().default(true),
  tailwind: z.object({
    config: z.string().default(""),
    css: z.string(),
    baseColor: z.string().default("neutral"),
    cssVariables: z.boolean().default(true),
    prefix: z.string().default(""),
  }),
  iconLibrary: z.string().default("lucide"),
  aliases: z.object({
    components: z.string().default("@/components"),
    utils: z.string().default("@/lib/utils"),
    ui: z.string().default("@/components/cubix"),
    lib: z.string().default("@/lib"),
    hooks: z.string().default("@/hooks"),
  }),
  registries: z.record(z.string()).optional(),
});

export type CubixConfig = z.infer<typeof cubixConfigSchema>;

export const CONFIG_FILE = "cubix.json";

export function defaultConfig(options: {
  base?: BaseName;
  css: string;
  rsc?: boolean;
}): CubixConfig {
  return cubixConfigSchema.parse({
    $schema: CONFIG_SCHEMA_URL,
    style: "cubix",
    base: options.base ?? "base",
    rsc: options.rsc ?? true,
    tsx: true,
    tailwind: {
      config: "",
      css: options.css,
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    },
    iconLibrary: "lucide",
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/cubix",
      lib: "@/lib",
      hooks: "@/hooks",
    },
  });
}

export async function readConfig(cwd: string): Promise<CubixConfig | null> {
  const file = path.join(cwd, CONFIG_FILE);
  if (!(await fs.pathExists(file))) return null;
  const raw = await fs.readJson(file);
  return cubixConfigSchema.parse(raw);
}

export async function writeConfig(cwd: string, config: CubixConfig) {
  const file = path.join(cwd, CONFIG_FILE);
  await fs.writeJson(file, config, { spaces: 2 });
  await fs.appendFile(file, "\n");
}

export function resolveAliasPath(
  cwd: string,
  alias: string,
  sourceRoot: string
) {
  return path.join(cwd, sourceRoot, alias.replace(/^@\//, ""));
}
