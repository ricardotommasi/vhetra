export default function Filosofia() {
  return (
    <div className="flex items-center justify-center flex-col mx-5">
      <img
        src="/img/respira.svg"
        alt="En VHETRA lo digital respira"
        className="svg-breathe w-full max-w-2xl mb-12 "
      />

      <section className="text-azulo max-w-xl text-center space-y-4">
        <h5 className="text-lg font-medium">
          No vemos pantallas: vemos experiencias que se sienten.
        </h5>

        <p className="text-sm opacity-80">
          Cada proyecto es un proceso consciente donde lo técnico encuentra
          forma estética y lo estético obtiene estructura. Menos plantillas, más
          artesanía.
        </p>

        <p className="text-sm opacity-80">
          Somos el punto donde convergen la precisión del código y la
          sensibilidad del diseño.
        </p>
      </section>
    </div>
  );
}
