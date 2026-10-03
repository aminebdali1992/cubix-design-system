import { astroTemplate } from "./astro";
import { nextTemplate } from "./next";
import { reactRouterTemplate } from "./react-router";
import type { TemplateDefinition } from "./scaffold";
import { startTemplate } from "./start";
import { viteTemplate } from "./vite";

export const TEMPLATES: TemplateDefinition[] = [
  nextTemplate,
  viteTemplate,
  startTemplate,
  reactRouterTemplate,
  astroTemplate,
];

export const TEMPLATE_IDS = TEMPLATES.map((template) => template.id);

export function getTemplate(id: string) {
  return TEMPLATES.find((template) => template.id === id);
}
