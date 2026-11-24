type ProjectEntry = {
  id: number; key: string; label: string; imagen: string; webUrl?: string;
  contentKey?: "acrodata" | "estacionAlemania" | "laboragro" | "loza" | "flavia";
  technologies?: readonly string[];
};

// One entry per project; only the visual orbit repeats entries.
export const PROJECTS: readonly ProjectEntry[] = [
  { id: 1, key: "acrodata", label: "Acrodata", imagen: "/projects/orbit/acrodata.webp", contentKey: "acrodata", webUrl: "https://www.acroyogadata.com.ar/", technologies: ["React", "Tailwind CSS", "Responsive UI"] },
  { id: 2, key: "estacion-alemania", label: "Estación Alemania", imagen: "/projects/orbit/estacion-alemania.webp", contentKey: "estacionAlemania", webUrl: "https://estacionalemania.vhetra.com.ar/", technologies: ["Next.js", "React", "Tailwind CSS"] },
  { id: 4, key: "laboragro", label: "Laboragro", imagen: "/projects/orbit/laboragro.webp", contentKey: "laboragro", webUrl: "https://www.laboragro.com.ar/", technologies: ["Next.js", "React", "Tailwind CSS", "Technical SEO"] },
  { id: 5, key: "loza", label: "Loza", imagen: "/projects/orbit/loza.webp", contentKey: "loza", webUrl: "https://loza.vhetra.com.ar/", technologies: ["Next.js", "React", "Supabase", "Mercado Pago"] },
  { id: 7, key: "flavia", label: "Flavia", imagen: "/projects/orbit/flavia.webp", contentKey: "flavia", webUrl: "https://flavia.vhetra.com.ar/", technologies: ["Next.js", "React", "Tailwind CSS", "Blender"] },
  { id: 8, key: "pascal", label: "Pascal", imagen: "/projects/orbit/pascal.webp" },
  { id: 9, key: "flavia-pascal", label: "Flavia & Pascal", imagen: "/projects/orbit/flavia-pascal.webp" },
  { id: 10, key: "kim", label: "KIM", imagen: "/projects/orbit/kim.webp" },
  { id: 11, key: "kiwe", label: "KIWÉ", imagen: "/projects/orbit/kiwe.webp" },
  { id: 12, key: "pancho", label: "Las Tortas de Pancho", imagen: "/projects/orbit/pancho.webp" },
];
