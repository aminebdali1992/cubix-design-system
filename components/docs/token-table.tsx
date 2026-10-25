export type TokenTableRow = {
  element: string;
  token: string;
  value: string;
  /** CSS color variable shown as a swatch, for example "--foreground". */
  swatch?: string;
  /** Outline the swatch when its color is close to the page background. */
  swatchOutline?: boolean;
};

export function TokenTable({ data }: { data: TokenTableRow[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left font-semibold">Element</th>
            <th className="px-4 py-3 text-left font-semibold">Token</th>
            <th className="px-4 py-3 text-left font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`${row.element}-${row.token}`} className="border-b last:border-0">
              <td className="px-4 py-3 align-top text-xs font-medium text-foreground">
                {row.element}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                {row.token}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  {row.swatch ? (
                    <span
                      aria-hidden
                      className={`size-3.5 shrink-0 rounded-[4px]${row.swatchOutline ? " ring-1 ring-foreground/15" : ""}`}
                      style={{ background: `var(${row.swatch})` }}
                    />
                  ) : null}
                  {row.value}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}