export const SERVICE_KEYS = [
  {
    id: 1,
    name: "automatizaciones",
    displayKey: "grid.automationTitle",
    fullKey: "grid.automationFull",
    texture: "/services/texture-abstract-640.webp",
  },
  {
    id: 2,
    name: "webs",
    displayKey: "grid.webTitle",
    fullKey: "grid.webFull",
    texture: "/services/texture-pebbled-640.webp",
  },
  {
    id: 3,
    name: "sistemas",
    displayKey: "grid.systemTitle",
    fullKey: "grid.systemFull",
    texture: "/services/texture-brushed-640.webp",
  },
] as const;

export const SERVICE_TEXTURES = [
  { name: "abstract", src: "/services/texture-abstract-640.webp" },
  { name: "pebbled", src: "/services/texture-pebbled-640.webp" },
  { name: "brushed", src: "/services/texture-brushed-640.webp" },
  { name: "satin", src: "/services/texture-satin-640.webp" },
  { name: "marble", src: "/services/texture-marble-640.webp" },
] as const;
