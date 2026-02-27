import { setRequestLocale } from "next-intl/server";
import { div } from "three/tsl";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Contacto({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex flex-col">
      <h2 className="ml-20 text-4xl ">Toda identidad comienza con una conversación</h2>
    </div>
  );
}
