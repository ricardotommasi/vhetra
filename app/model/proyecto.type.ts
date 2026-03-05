import { ReactNode } from "react";

export type Proyecto = {
    id: number;
    name: string;
    miniTitulo: string;
    titulo: string;
    miniDescripcion: string;
    descripcionCompleta: ReactNode;
    miniatura: string;
    imagen: string;
    webUrl?: string;
}