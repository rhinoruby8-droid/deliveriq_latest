import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { j as jsxDevRuntimeExports, a as ArrowRight } from "./entry-server-6OwPOchN.js";
function HomepageVisual({ data }) {
  const { hero, stats, introParagraph } = data;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 diq-hero-section", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "absolute inset-0 pointer-events-none diq-hero-grid-bg",
          "aria-hidden": "true",
          style: { backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(44,47,56,0.35) 1px,transparent 1px)", backgroundSize: "48px 48px" }
        },
        void 0,
        false,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
          lineNumber: 12,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "absolute inset-0 pointer-events-none diq-hero-glow-bg",
          "aria-hidden": "true",
          style: { background: "radial-gradient(ellipse 70% 80% at 0% 50%,rgba(199,154,78,0.08) 0%,transparent 70%)" }
        },
        void 0,
        false,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
          lineNumber: 14,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 relative z-10 max-w-4xl diq-hero-container", children: [
        hero.eyebrow && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-4 diq-hero-eyebrow", children: hero.eyebrow }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
          lineNumber: 18,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-5xl md:text-6xl lg:text-[5rem] font-bold text-foreground leading-[1.0] tracking-tight mb-6 diq-hero-headline", children: hero.headline }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
          lineNumber: 20,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-muted-foreground leading-relaxed max-w-xl mb-5 diq-hero-subheadline", children: hero.subheadline }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
          lineNumber: 21,
          columnNumber: 11
        }, this),
        introParagraph && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#C0B89A] leading-relaxed border-l-2 border-primary/50 pl-4 mb-8 diq-hero-intro", children: introParagraph }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
          lineNumber: 23,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-4 diq-hero-cta-group", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: hero.primaryCta.href, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded transition-all hover:brightness-110 diq-hero-cta-primary", children: [
            hero.primaryCta.label,
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
              lineNumber: 27,
              columnNumber: 39
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
            lineNumber: 26,
            columnNumber: 13
          }, this),
          hero.secondaryCta && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: hero.secondaryCta.href, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-border text-foreground rounded hover:bg-muted transition-colors diq-hero-cta-secondary", children: hero.secondaryCta.label }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
            lineNumber: 30,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
          lineNumber: 25,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    stats.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "border-y border-border/60 bg-card/30 py-10 diq-stats-section", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 diq-stats-container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap justify-center gap-10 md:gap-16 diq-stats-row", children: stats.map((s, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center diq-stat-item", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-3xl md:text-4xl font-bold text-primary diq-stat-value", children: s.value }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
        lineNumber: 44,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground mt-1 uppercase tracking-widest font-semibold diq-stat-label", children: s.label }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
        lineNumber: 45,
        columnNumber: 19
      }, this)
    ] }, i, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
      lineNumber: 43,
      columnNumber: 17
    }, this)) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
      lineNumber: 41,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
      lineNumber: 40,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/HomepageVisual.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}
export {
  HomepageVisual as H
};
