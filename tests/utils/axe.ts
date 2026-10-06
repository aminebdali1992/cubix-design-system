import axe from "axe-core"
import { expect } from "vitest"

// jsdom does no layout or painting, so contrast results would be meaningless.
const RUN_OPTIONS: axe.RunOptions = {
  rules: {
    "color-contrast": { enabled: false },
  },
}

function describeViolation(violation: axe.Result): string {
  const targets = violation.nodes.map((node) => `    ${node.target.join(" ")}`).join("\n")
  return `${violation.id} (${violation.impact ?? "unknown"}): ${violation.help}\n${targets}`
}

export async function expectNoAxeViolations(element: Element): Promise<void> {
  const { violations } = await axe.run(element, RUN_OPTIONS)
  expect(violations.map(describeViolation)).toEqual([])
}
