export const SITE_URL = "https://vhetra.com.ar";
export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export const CONTACTS = [
  { id: 1, img: "/icons/instagramIco.svg", titleKey: "instagramTitle", actionKey: "instagramAction", href: "https://www.instagram.com/holavhetra/" },
  { id: 2, img: "/icons/gmailIco.svg", titleKey: "gmailTitle", actionKey: "gmailAction", href: "mailto:hola.vhetra@gmail.com" },
  { id: 3, img: "/icons/whatsappIco.svg", titleKey: "whatsappTitle", actionKey: "whatsappAction", href: null },
] as const;
