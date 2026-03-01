import ProyectoCardChica from "@/app/components/ProyectoCardChica";

const PROYECTOS = [{ id: 1, name: "Acrodata", displayName: "Acrodata web", miniDescripcion: "Web especializada", descripcionCompleta: <></>, imagen: "/img/acrodata.png" },
{ id: 2, name: "Acrodata", displayName: "Acrodata web", miniDescripcion: "Web especializada", descripcionCompleta: <></>, imagen: "/img/acrodata.png" },
{ id: 3, name: "Acrodata", displayName: "Acrodata web", miniDescripcion: "Web especializada", descripcionCompleta: <></>, imagen: "/img/acrodata.png" },
]

export default function Proyectos() {
  return <div className="flex flex-col relative mx-6 gap-10 text-center">
    <div className="flex flex-row flex-wrap items-baseline gap-2 mx-auto justify-center">
      <h3 className="text-black text-2xl md:text-3xl font-semibold shrink-0 ">
        Diferentes visiones, un mismo propósito,
      </h3>
      <h3 className="text-accent stroke-accent text-3xl md:text-6xl font-normal font-licorice shrink-0">transformar elecciones en identidad.</h3>
    </div>
    <p className="text-black text-xl md:text-4xl font-medium">Aquí compartimos algunos de los proyectos que reflejan ese resultado.</p>
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-10 items-center mx-auto relative">
      {PROYECTOS.map((proyecto) => (
        <ProyectoCardChica key={proyecto.id} proyecto={proyecto} />
      ))}
    </div>
  </div>;
}
