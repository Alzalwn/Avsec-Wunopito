import { c as createComponent, a as addAttribute, r as renderHead, b as renderSlot, d as renderTemplate, e as createAstro, f as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BfQqpCMk.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Portal Operasional AVSEC - Bandara Wunopito",
    description = "Sistem informasi terpadu pelaporan operasional, log patroli, pusat SOP & regulasi, dan direktori personel Aviation Security Bandara Wunopito Lembata."
  } = Astro2.props;
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/jpeg" href="/assets/logo.jpeg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/assets/logo.jpeg"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="/assets/logo.jpeg"><!-- Google Fonts Inter --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-slate-950 text-slate-100 min-h-screen antialiased"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/OBU 18 BRAVO/AI/AVSEC/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Portal Operasional AVSEC - Bandara Wunopito", "description": "Portal resmi manajemen pelaporan, dokumen regulasi, dan data personel Aviation Security Bandara Wunopito." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "AvsecPortal", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/OBU 18 BRAVO/AI/AVSEC/src/components/AvsecPortal.jsx", "client:component-export": "default" })} </main> ` })}`;
}, "C:/OBU 18 BRAVO/AI/AVSEC/src/pages/index.astro", void 0);

const $$file = "C:/OBU 18 BRAVO/AI/AVSEC/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
