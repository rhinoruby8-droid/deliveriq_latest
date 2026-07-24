import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, d as distExports, j as jsxDevRuntimeExports, H as Helmet, M as Mail, C as Calendar, a as ArrowRight } from "./entry-server-Dtcmmwg9.js";
import { m as motion } from "./proxy-COLNRNaz.js";
import { C as CircleCheckBig } from "./circle-check-big-DxsT_v7m.js";
import "../index.js";
import "tty";
import "util";
import "os";
import "path";
import "buffer";
import "string_decoder";
import "node:zlib";
import "node:events";
import "url";
import "node:path";
import "node:fs";
import "node:http";
import "crypto";
import "fs";
import "node:querystring";
import "node:buffer";
import "node:net";
import "stream";
import "node:url";
import "net";
import "http";
import "zlib";
import "events";
import "https";
import "node:crypto";
import "tls";
import "assert";
import "http2";
import "async_hooks";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ShieldCheck = createLucideIcon("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};
function PaymentSuccessPage() {
  const [params] = distExports.useSearchParams();
  const sessionId = params.get("session_id");
  const site = "https://deliveriq.live";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "Payment Confirmed — DeliverIQ" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: "Your DeliverIQ session registration is confirmed. Check your email for details and replay access." }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "robots", content: "noindex" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: `${site}/payment/success` }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "min-h-[85vh] flex items-center justify-center bg-[#0A0B0E] relative overflow-hidden py-12", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.15) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C79A4E]/[0.02] rounded-full blur-[100px] pointer-events-none" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 max-w-2xl relative z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        motion.div,
        {
          variants: containerVariants,
          initial: "hidden",
          animate: "show",
          className: "bg-[#121318] border border-[#2C2F38]/60 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center flex flex-col items-center",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: itemVariants, className: "mb-6 relative", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[#C79A4E]/20 rounded-full blur-xl scale-125 animate-pulse" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 51,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-20 h-20 rounded-full border border-[#C79A4E]/30 bg-[#C79A4E]/10 flex items-center justify-center text-[#C79A4E] shadow-[0_0_24px_rgba(199,154,78,0.15)]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheckBig, { size: 36, className: "animate-in fade-in zoom-in duration-500" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 53,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 52,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
              lineNumber: 50,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.p, { variants: itemVariants, className: "text-[10px] font-black tracking-[0.25em] text-[#C79A4E] uppercase mb-3", children: "Payment Confirmed" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
              lineNumber: 57,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.h1, { variants: itemVariants, className: "text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4", children: "Your spot is secured!" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
              lineNumber: 61,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.p, { variants: itemVariants, className: "text-slate-400 text-sm leading-relaxed max-w-md mb-8", children: "Thank you for your purchase. We've verified your transaction. A confirmation receipt and joining details have been dispatched to your email address." }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
              lineNumber: 65,
              columnNumber: 13
            }, this),
            sessionId && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: itemVariants, className: "bg-[#17191E] border border-[#2C2F38]/40 rounded-xl px-4 py-2 text-[10px] font-mono text-slate-500 mb-8 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ShieldCheck, { size: 12, className: "text-emerald-500" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 71,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                "Reference: ",
                sessionId
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 72,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
              lineNumber: 70,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: itemVariants, className: "w-full text-left space-y-4 mb-10 pt-6 border-t border-[#2C2F38]/40", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5", children: "Next Steps" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 78,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-4 p-4 bg-[#17191E]/30 border border-[#2C2F38]/30 rounded-xl hover:border-[#2C2F38]/60 transition-all", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-[#C79A4E]/10 border border-[#C79A4E]/20 flex items-center justify-center text-[#C79A4E] shrink-0 mt-0.5", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mail, { size: 15 }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 82,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 81,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-xs font-bold text-white", children: "Check Inbox" }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                    lineNumber: 85,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 mt-0.5 leading-relaxed", children: "We sent calendar invites, access keys, and invoices to your email." }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                    lineNumber: 86,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 84,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 80,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-4 p-4 bg-[#17191E]/30 border border-[#2C2F38]/30 rounded-xl hover:border-[#2C2F38]/60 transition-all", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 15 }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 92,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 91,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-xs font-bold text-white", children: "View Registered Events" }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                    lineNumber: 95,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 mt-0.5 leading-relaxed", children: "Check your custom workspace to see schedules and slides." }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                    lineNumber: 96,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 94,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                lineNumber: 90,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
              lineNumber: 77,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: itemVariants, className: "flex flex-col sm:flex-row gap-4 w-full justify-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/dashboard",
                  className: "inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-extrabold bg-[#C79A4E] text-[#1A1D24] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.15)] flex-1",
                  children: [
                    "Go to Dashboard ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 13 }, void 0, false, {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                      lineNumber: 107,
                      columnNumber: 33
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 103,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/sessions",
                  className: "inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold border border-[#2C2F38] text-slate-400 rounded-xl hover:border-[#C79A4E]/40 hover:text-white transition-all flex-1",
                  children: "Browse More Sessions"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
                  lineNumber: 109,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
              lineNumber: 102,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
          lineNumber: 43,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/success.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}
export {
  PaymentSuccessPage as default
};
