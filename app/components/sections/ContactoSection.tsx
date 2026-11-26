import { CONTACTS, whatsappUrl } from "@/app/config/site";
import { getTranslations } from "next-intl/server";

export async function ContactoSection() {
  const t = await getTranslations("contact");
  const whatsappHref = whatsappUrl(t("whatsappMessage"));

  return (
    <section id="contacto" className="snap-panel contact-editorial-section" aria-labelledby="contact-heading">
      <div className="contact-editorial-lines" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="contact-watermark" aria-hidden="true">VH<span>.</span></div>
      <div className="section-panel-content contact-editorial-content">
        <header className="contact-editorial-header">
          <div>
            <h2 id="contact-heading">{t("letsTalk")}<span aria-hidden="true">.</span></h2>
          </div>
        </header>
        <div className="contact-editorial-links">
          {CONTACTS.map((contact) => <a key={contact.id} className="contact-editorial-link"
            href={contact.href ?? whatsappHref} target={contact.href?.startsWith("mailto:") ? undefined : "_blank"}
            rel={contact.href?.startsWith("mailto:") ? undefined : "noopener noreferrer"}>
            <span className="contact-editorial-name">{t(contact.titleKey)}</span>
            <span className="contact-editorial-description">{t.rich(contact.actionKey, { br: () => <br /> })}</span>
            <span className="contact-editorial-arrow" aria-hidden="true">↗</span>
          </a>)}
        </div>
        <footer className="contact-editorial-footer"><span>VHETRA<sup>®</sup></span></footer>
      </div>
    </section>
  );
}
