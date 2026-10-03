const url = "https://cubixflow.ir";
const githubRepo = "aminebdali1992/cubix-design-system";

export const siteConfig = {
  name: "Cubix",
  url,
  registryUrl: `${url}/r`,
  schemaUrl: `${url}/schema.json`,
  registrySchemaUrl: `${url}/schema/registry.json`,
  registryItemSchemaUrl: `${url}/schema/registry-item.json`,
  packageName: "cubix-ui",
  githubRepo,
  links: {
    github: `https://github.com/${githubRepo}`,
    npm: "https://www.npmjs.com/package/cubix-ui",
  },
} as const;
