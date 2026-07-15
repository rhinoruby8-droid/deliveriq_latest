import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, j as jsxRuntimeExports, C as Calendar } from "./entry-server-CdzZ2syk.js";
import { D as DynamicForm } from "./DynamicForm-BkEFx9W_.js";
import { Z as Zap } from "./zap-BTlhOu5S.js";
import { U as Users } from "./users-f2E1N8Pr.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
function RegisterVisual({ data }) {
  var _a, _b;
  const title = ((_a = data.hero) == null ? void 0 : _a.title) || "Registrations\nopening soon!";
  const subtitle = ((_b = data.hero) == null ? void 0 : _b.subtitle) || "Live sessions for project professionals who want to apply AI in real delivery work — not theory, not hype. Add your name below and we'll reach out the moment registration opens.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
      backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)",
      backgroundSize: "48px 48px"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
      background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold tracking-[0.18em] text-[#C79A4E] uppercase mb-4", children: "Register Your Interest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-5 whitespace-pre-line", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-8", children: subtitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3", children: data.sections && data.sections.length > 0 ? data.sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
          i === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }) : i === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }) : i === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            s.title && /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-[#F0EDE8] block mb-0.5", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.body })
          ] })
        ] }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }),
            "Priority notification when registration opens"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }),
            "Early access to session topics and schedules"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }),
            "Join a community of project professionals upskilling in AI"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }),
            "Replay access included with every session"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-32 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-[#2C2F38] bg-[#1A1D24]/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase", children: "Register your interest" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { formId: "register" }) })
      ] }) })
    ] }) })
  ] });
}
export {
  RegisterVisual as R,
  RefreshCw as a
};
