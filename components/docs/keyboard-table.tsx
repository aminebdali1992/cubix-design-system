export type KeyboardRow = {
  key: string
  action: string
}

export function KeyboardTable({ data }: { data: KeyboardRow[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left font-semibold">Key</th>
            <th className="px-4 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.key} className="border-b last:border-0">
              <td className="px-4 py-3 align-top font-mono text-xs font-medium whitespace-nowrap text-foreground">
                {row.key}
              </td>
              <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                {row.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
