import { SectionDeck } from "@/app/components/SectionDeck";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { ServiciosSection } from "@/app/components/sections/ServiciosSection";
import { ProyectosSection } from "@/app/components/sections/ProyectosSection";
import { ComoTrabajamosSection } from "@/app/components/sections/ComoTrabajamosSection";
import { ContactoSection } from "@/app/components/sections/ContactoSection";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectionDeck>
        <HeroSection />
        <ServiciosSection />
        <ProyectosSection />
        <ComoTrabajamosSection />
        <ContactoSection />
      </SectionDeck>
    </>
  );
}
