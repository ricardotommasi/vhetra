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
    /** Override CTA button label (e.g. "Visitar instagram") */
    ctaLabelKey?: string;
    /** "textImage" = text left, image right on lg; "default" = image top, text below */
    layoutType?: "default" | "textImage";
    imgClassName?: string;
}