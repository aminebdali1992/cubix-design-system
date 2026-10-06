export const BASE_NAMES = ["base", "aria", "radix"] as const

export type BaseName = (typeof BASE_NAMES)[number]

/** Pairs each base with its module so suites run the same assertions against all three. */
export function byBase<TBase, TAria, TRadix>(modules: {
  base: TBase
  aria: TAria
  radix: TRadix
}): Array<[BaseName, TBase | TAria | TRadix]> {
  return BASE_NAMES.map((name) => [name, modules[name]])
}
