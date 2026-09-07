export function scrollToSectionStart(id: string, updateHistory = true) {
  if (document.querySelector("dialog[open]")) return;
  const section = document.getElementById(id);
  const page = section?.closest<HTMLElement>(".snap-page");
  if (!section || !page) return;

  if (updateHistory && window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${encodeURIComponent(id)}`);
  }
  section.tabIndex = -1;
  section.focus({ preventScroll: true });

  section.scrollTop = 0;
  const shouldUseFallback = page.dispatchEvent(
    new CustomEvent("vhetra:section-navigate", {
      cancelable: true,
      detail: { id },
    }),
  );

  if (!shouldUseFallback) return;

  page.scrollTo({
    top: section.offsetTop,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}
