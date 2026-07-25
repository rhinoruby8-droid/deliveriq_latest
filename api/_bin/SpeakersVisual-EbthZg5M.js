import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { l as createLucideIcon, j as jsxRuntimeExports, a as ArrowRight } from "./entry-server-CO9Km2vr.js";
import { D as DynamicForm } from "./DynamicForm-_YvKQM8N.js";
import { Z as Zap } from "./zap-CUewUkhO.js";
import { U as Users } from "./users-BIBKImrg.js";
import { G as Globe } from "./globe-DXbVACjF.js";
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
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Star = createLucideIcon("Star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 diq-speakers-hero-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none diq-speakers-hero-grid-bg", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none diq-speakers-hero-glow-bg", "aria-hidden": "true", style: {
        background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 relative z-10 diq-speakers-hero-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start diq-speakers-hero-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "diq-speakers-hero-copy", children: [
          hero.eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-4 diq-speakers-hero-eyebrow", children: hero.eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5 whitespace-pre-line diq-speakers-hero-headline", children: hero.headline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 diq-speakers-hero-subheadline", children: hero.subheadline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-32 w-full diq-speakers-form-sticky-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card rounded-sm overflow-hidden shadow-2xl diq-speakers-form-box", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-border bg-background/40 diq-speakers-form-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold tracking-widest text-primary uppercase diq-speakers-form-title", children: "Apply to Speak" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 diq-speakers-form-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { formId: "speaker" }) })
        ] }) })
      ] }) })
    ] }),
    benefits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 lg:py-20 diq-speakers-benefits-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 diq-speakers-benefits-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 diq-speakers-benefits-grid", children: benefits.map((b, i) => {
      const Icon = ICONS[b.icon] || Star;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border border-border bg-card/40 rounded-sm diq-speakers-benefit-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 24, className: "text-primary mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground mb-2 diq-speakers-benefit-title", children: b.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed diq-speakers-benefit-description", children: b.description })
      ] }, i);
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 border-t border-border diq-speakers-cta-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8 text-center diq-speakers-cta-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-3 diq-speakers-cta-headline", children: cta.headline }),
      cta.subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 diq-speakers-cta-subtext", children: cta.subtext }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: cta.buttonHref, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded transition-all hover:brightness-110 diq-speakers-cta-btn", children: [
        cta.buttonLabel,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
      ] })
    ] }) })
  ] });
}
export {
  Award as A,
  SpeakersVisual as S
};
