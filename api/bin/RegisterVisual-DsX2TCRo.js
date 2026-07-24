import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, j as jsxDevRuntimeExports, C as Calendar } from "./entry-server-DU76AYrK.js";
import { D as DynamicForm } from "./DynamicForm-B2adMGkR.js";
import { Z as Zap } from "./zap-oGyHBIOt.js";
import { U as Users } from "./users-rswYSFuP.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
      backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)",
      backgroundSize: "48px 48px"
    } }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
      background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)"
    } }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] font-semibold tracking-[0.18em] text-[#C79A4E] uppercase mb-4", children: "Register Your Interest" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 28,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-5 whitespace-pre-line", children: title }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 31,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-8", children: subtitle }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 34,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "flex flex-col gap-3", children: data.sections && data.sections.length > 0 ? data.sections.map((s, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
          i === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 42,
            columnNumber: 32
          }, this) : i === 1 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Zap, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 43,
            columnNumber: 32
          }, this) : i === 2 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 44,
            columnNumber: 32
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RefreshCw, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 45,
            columnNumber: 22
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            s.title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { className: "text-[#F0EDE8] block mb-0.5", children: s.title }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
              lineNumber: 47,
              columnNumber: 35
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: s.body }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
              lineNumber: 48,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 46,
            columnNumber: 21
          }, this)
        ] }, i, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 41,
          columnNumber: 19
        }, this)) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
              lineNumber: 55,
              columnNumber: 21
            }, this),
            "Priority notification when registration opens"
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 54,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Zap, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
              lineNumber: 59,
              columnNumber: 21
            }, this),
            "Early access to session topics and schedules"
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 58,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
              lineNumber: 63,
              columnNumber: 21
            }, this),
            "Join a community of project professionals upskilling in AI"
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 62,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RefreshCw, { size: 15, className: "text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
              lineNumber: 67,
              columnNumber: 21
            }, this),
            "Replay access included with every session"
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
            lineNumber: 66,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 53,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 38,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:sticky lg:top-32 w-full", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-5 border-b border-[#2C2F38] bg-[#1A1D24]/40", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase", children: "Register your interest" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 79,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 78,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicForm, { formId: "register" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 84,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
        lineNumber: 77,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/RegisterVisual.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
export {
  RegisterVisual as R,
  RefreshCw as a
};
