import { ReactNode } from "react";

export type Proyecto = {
    id: number;
    name: string;
    displayName: string;
    miniDescripcion: string;
    descripcionCompleta: ReactNode;
    imagen: string;
}