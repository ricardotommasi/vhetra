export type Proyecto = {
    id: number;
    name: string;
    miniTitulo: string;
    titulo: string;
    miniDescripcion: string;
    descripcionCompleta: string[];
    imagen?: string;
    webUrl?: string;
    technologies?: readonly string[];
    /** Override CTA button label (e.g. "Visitar instagram") */
    ctaLabelKey?: "visitWeb" | "visitInstagram";
    /** "textImage" = text left, image right on lg; "default" = image top, text below */
    layoutType?: "default" | "textImage";
    imgClassName?: string;
}
