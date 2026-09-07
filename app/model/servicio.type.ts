import type { SERVICE_KEYS } from "../data/services";

export type Servicio = {
  id: number;
  name: string;
  displayName: string;
  descriptionKey: (typeof SERVICE_KEYS)[number]["fullKey"];
  texture: string;
};
