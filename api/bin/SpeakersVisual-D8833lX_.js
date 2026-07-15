import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, j as jsxRuntimeExports } from "./entry-server-CdzZ2syk.js";
import { D as DynamicForm } from "./DynamicForm-BkEFx9W_.js";
import { Z as Zap } from "./zap-BTlhOu5S.js";
import { S as Star } from "./star-CSC7aJ8f.js";
import { U as Users } from "./users-f2E1N8Pr.js";
import { G as Globe } from "./globe-PcuVdVQ1.js";
import { A as ArrowRight } from "./arrow-right-C6-A-7_5.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          hero.eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-[#C79A4E] uppercase mb-4", children: hero.eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-5 whitespace-pre-line", children: hero.headline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-8", children: hero.subheadline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-32 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-[#2C2F38] bg-[#1A1D24]/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase", children: "Apply to Speak" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { formId: "speaker" }) })
        ] }) })
      ] }) })
    ] }),
    benefits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: benefits.map((b, i) => {
      const Icon = ICONS[b.icon] || Star;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 24, className: "text-[#C79A4E] mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-[#F0EDE8] mb-2", children: b.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96] leading-relaxed", children: b.description })
      ] }, i);
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 border-t border-[#2C2F38]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#F0EDE8] mb-3", children: cta.headline }),
      cta.subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96] mb-6", children: cta.subtext }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: cta.buttonHref, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all hover:brightness-110", children: [
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
