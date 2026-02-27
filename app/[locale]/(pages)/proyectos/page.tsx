import ProyectoCardChica from "@/app/components/ProyectoCardChica";

const PROYECTOS = [{ id: 1, name: "Acrodata", displayName: "Acrodata web", miniDescripcion: "Web especializada", descripcionCompleta: <></>, imagen: "/img/acrodata.png" }]

export default function Proyectos() {
  return <div className="flex flex-col relative mx-6 gap-10 ">
    <h3 className="justify-start text-black text-2xl md:text-3xl font-semibold text-khand">
      Diferentes visiones, un mismo propósito, <span className="text-accents text-3xl md:text-6xl font-normal font-licorice">transformar elecciones en identidad.</span>
    </h3>
    <p className="text-black text-xl md:text-4xl font-medium">Aquí compartimos algunos de los proyectos que reflejan ese resultado.</p>
    <ProyectoCardChica proyecto={PROYECTOS[0]} />
  </div>;
}
