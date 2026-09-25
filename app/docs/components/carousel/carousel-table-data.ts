export const carouselPropRows = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Scroll axis of the carousel.",
  },
  {
    prop: "opts",
    type: "EmblaOptions",
    description:
      "Embla options such as loop, align, and direction. Under a dir=rtl ancestor, direction resolves to rtl automatically unless you set opts.direction.",
  },
  {
    prop: "plugins",
    type: "EmblaPlugin[]",
    description: "Embla plugins such as Autoplay.",
  },
  {
    prop: "setApi",
    type: "(api: CarouselApi) => void",
    description:
      "Receive the Embla API instance for events and programmatic scroll.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const itemPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Use basis utilities such as basis-1/2 or md:basis-1/3 to set slide width.",
  },
]

export const navPropRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"',
    default: '"outline"',
    description: "Visual style of the previous or next button.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    default: '"icon-sm"',
    description: "Size of the previous or next button.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
