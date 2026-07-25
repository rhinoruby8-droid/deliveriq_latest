import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { j as jsxRuntimeExports, a as ArrowRight } from "./entry-server-CO9Km2vr.js";
function HomepageVisual({ data }) {
  const { hero, stats, introParagraph } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 diq-hero-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none diq-hero-grid-bg",
          "aria-hidden": "true",
          style: { backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(44,47,56,0.35) 1px,transparent 1px)", backgroundSize: "48px 48px" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none diq-hero-glow-bg",
          "aria-hidden": "true",
          style: { background: "radial-gradient(ellipse 70% 80% at 0% 50%,rgba(199,154,78,0.08) 0%,transparent 70%)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8 relative z-10 max-w-4xl diq-hero-container", children: [
        hero.eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-4 diq-hero-eyebrow", children: hero.eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-6xl lg:text-[5rem] font-bold text-foreground leading-[1.0] tracking-tight mb-6 diq-hero-headline", children: hero.headline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed max-w-xl mb-5 diq-hero-subheadline", children: hero.subheadline }),
        introParagraph && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#C0B89A] leading-relaxed border-l-2 border-primary/50 pl-4 mb-8 diq-hero-intro", children: introParagraph }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 diq-hero-cta-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: hero.primaryCta.href, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded transition-all hover:brightness-110 diq-hero-cta-primary", children: [
            hero.primaryCta.label,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ] }),
          hero.secondaryCta && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: hero.secondaryCta.href, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-border text-foreground rounded hover:bg-muted transition-colors diq-hero-cta-secondary", children: hero.secondaryCta.label })
        ] })
      ] })
    ] }),
    stats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border/60 bg-card/30 py-10 diq-stats-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 diq-stats-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-10 md:gap-16 diq-stats-row", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center diq-stat-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl md:text-4xl font-bold text-primary diq-stat-value", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 uppercase tracking-widest font-semibold diq-stat-label", children: s.label })
    ] }, i)) }) }) })
  ] });
}
export {
  HomepageVisual as H
};
