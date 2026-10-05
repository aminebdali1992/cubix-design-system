export type Declarations = readonly (readonly [string, string])[];

function alignDeclarations(declarations: Declarations): string {
  const width = Math.max(...declarations.map(([name]) => name.length + 1));
  return declarations.map(([name, value]) => `  ${`${name}:`.padEnd(width)} ${value};`).join("\n");
}

export function cssBlock(selector: string, declarations: Declarations): string {
  return `${selector} {\n${alignDeclarations(declarations)}\n}`;
}
