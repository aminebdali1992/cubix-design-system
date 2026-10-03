const url = "https://cubixflow.ir";

export const siteConfig = {
  name: "Cubix",
  url,
  registryUrl: `${url}/r`,
  schemaUrl: `${url}/schema.json`,
  registrySchemaUrl: `${url}/schema/registry.json`,
  registryItemSchemaUrl: `${url}/schema/registry-item.json`,
  packageName: "cubix-ui",
} as const;
