export type RegistryFile = {
  path: string;
  type: string;
  target?: string;
  content?: string;
};

export type RegistryItem = {
  $schema?: string;
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
};

const cache = new Map<string, Promise<RegistryItem | null>>();

/** Real registry item served by this site from public/r. */
export function getRegistryItem(name: string) {
  let item = cache.get(name);
  if (!item) {
    item = fetch(`/r/${name}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<RegistryItem>) : null))
      .catch(() => null);
    cache.set(name, item);
  }
  return item;
}
