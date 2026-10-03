import fs from "fs-extra";
import { applyEdits, modify, parse, type ParseError } from "jsonc-parser";
import path from "node:path";

const ALIAS = "@/*";
const TSCONFIG_FILES = ["tsconfig.json", "tsconfig.app.json"];

export type AliasResult = {
  updated: string[];
  /** Files where `@/*` already points somewhere else - left untouched. */
  conflicts: string[];
};

/**
 * Ensures `@/*` resolves to the source root in every tsconfig that exists.
 * Edits are applied with jsonc-parser so comments and formatting survive.
 */
export async function ensurePathAlias(
  cwd: string,
  sourceRoot: string
): Promise<AliasResult> {
  const target = sourceRoot ? `./${sourceRoot}/*` : "./*";
  const result: AliasResult = { updated: [], conflicts: [] };

  for (const name of TSCONFIG_FILES) {
    const file = path.join(cwd, name);
    if (!(await fs.pathExists(file))) continue;

    const text = await fs.readFile(file, "utf8");
    const errors: ParseError[] = [];
    const json = parse(text, errors, { allowTrailingComma: true });
    if (errors.length > 0 || typeof json !== "object" || json === null) {
      result.conflicts.push(name);
      continue;
    }

    const current: unknown = json.compilerOptions?.paths?.[ALIAS];
    if (Array.isArray(current)) {
      if (!current.includes(target)) result.conflicts.push(name);
      continue;
    }

    const edits = modify(text, ["compilerOptions", "paths", ALIAS], [target], {
      formattingOptions: { insertSpaces: true, tabSize: 2 },
    });
    await fs.writeFile(file, applyEdits(text, edits), "utf8");
    result.updated.push(name);
  }

  return result;
}
