export const smoothScroll = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const offset = (header ? (header as HTMLElement).offsetHeight : 64) + 16;
  const target = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: target + 24, behavior: "smooth" });
  setTimeout(() => window.scrollTo({ top: target, behavior: "smooth" }), 450);
};
