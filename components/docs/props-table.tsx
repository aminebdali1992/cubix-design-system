export function PropsTable({
  data,
}: {
  data: {
    prop: string;
    type: string;
    default?: string;
    description: string;
  }[];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-3 text-left font-semibold">Prop</th>
            <th className="px-4 py-3 text-left font-semibold">Type</th>
            <th className="px-4 py-3 text-left font-semibold">Default</th>
            <th className="px-4 py-3 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.prop} className="border-b last:border-0">
              <td className="px-4 py-3 align-top font-mono text-xs font-medium text-primary">
                {row.prop}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                {row.type}
              </td>
              <td className="px-4 py-3 align-top font-mono text-xs text-muted-foreground">
                {row.default ?? "-"}
              </td>
              <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
