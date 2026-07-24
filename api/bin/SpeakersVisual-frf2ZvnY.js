import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, j as jsxDevRuntimeExports } from "./entry-server-CWKB5vPg.js";
import { D as DynamicForm } from "./DynamicForm-C9T2449g.js";
import { Z as Zap } from "./zap-C2VYqgEe.js";
import { S as Star } from "./star-IiilIga7.js";
import { U as Users } from "./users-BI0gliBr.js";
import { G as Globe } from "./globe-Co1rCyyF.js";
import { A as ArrowRight } from "./arrow-right-u8W77o7i.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Award = createLucideIcon("Award", [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
]);
const ICONS = {
  Globe,
  Users,
  Award,
  Star,
  Zap
};
function SpeakersVisual({ data }) {
  const { hero, benefits, cta } = data;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 diq-speakers-hero-section", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none diq-speakers-hero-grid-bg", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none diq-speakers-hero-glow-bg", "aria-hidden": "true", style: {
        background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)"
      } }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 relative z-10 diq-speakers-hero-container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start diq-speakers-hero-row", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "diq-speakers-hero-copy", children: [
          hero.eyebrow && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-[#C79A4E] uppercase mb-4 diq-speakers-hero-eyebrow", children: hero.eyebrow }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
            lineNumber: 27,
            columnNumber: 32
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-5 whitespace-pre-line diq-speakers-hero-headline", children: hero.headline }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
            lineNumber: 28,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-8 diq-speakers-hero-subheadline", children: hero.subheadline }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
            lineNumber: 29,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
          lineNumber: 26,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:sticky lg:top-32 w-full diq-speakers-form-sticky-col", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden shadow-2xl diq-speakers-form-box", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-5 border-b border-[#2C2F38] bg-[#1A1D24]/40 diq-speakers-form-header", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase diq-speakers-form-title", children: "Apply to Speak" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
            lineNumber: 35,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
            lineNumber: 34,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 diq-speakers-form-body", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicForm, { formId: "speaker" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
            lineNumber: 40,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
            lineNumber: 39,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
          lineNumber: 33,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
          lineNumber: 32,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    benefits.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-16 lg:py-20 diq-speakers-benefits-section", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 diq-speakers-benefits-container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 diq-speakers-benefits-grid", children: benefits.map((b, i) => {
      const Icon = ICONS[b.icon] || Star;
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm diq-speakers-benefit-card", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 24, className: "text-[#C79A4E] mb-4" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
          lineNumber: 55,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-base font-bold text-[#F0EDE8] mb-2 diq-speakers-benefit-title", children: b.title }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
          lineNumber: 56,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] leading-relaxed diq-speakers-benefit-description", children: b.description }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
          lineNumber: 57,
          columnNumber: 21
        }, this)
      ] }, i, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 54,
        columnNumber: 19
      }, this);
    }) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
      lineNumber: 50,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
      lineNumber: 49,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-16 border-t border-[#2C2F38] diq-speakers-cta-section", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 text-center diq-speakers-cta-container", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-[#F0EDE8] mb-3 diq-speakers-cta-headline", children: cta.headline }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this),
      cta.subtext && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] mb-6 diq-speakers-cta-subtext", children: cta.subtext }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 68,
        columnNumber: 27
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: cta.buttonHref, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all hover:brightness-110 diq-speakers-cta-btn", children: [
        cta.buttonLabel,
        " ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
          lineNumber: 70,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/SpeakersVisual.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
export {
  Award as A,
  SpeakersVisual as S
};
