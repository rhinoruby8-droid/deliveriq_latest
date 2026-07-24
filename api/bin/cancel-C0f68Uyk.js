import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, j as jsxDevRuntimeExports, H as Helmet, d as distExports, a as ArrowRight } from "./entry-server-DIa57ZvY.js";
import { m as motion } from "./proxy-Ebj0bgWW.js";
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
const CircleX = createLucideIcon("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
function PaymentCancelPage() {
  const site = "https://deliveriq.live";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "Payment Cancelled — DeliverIQ" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: "Your payment was cancelled. No charge was made. Return to sessions to try again." }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "robots", content: "noindex" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: `${site}/payment/cancel` }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "min-h-[80vh] flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 max-w-xl text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleX, { size: 28, className: "text-muted-foreground" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
            lineNumber: 28,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
            lineNumber: 27,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
            lineNumber: 26,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-4", children: "Payment Cancelled" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
            lineNumber: 32,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4", children: "No charge was made." }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
            lineNumber: 36,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground text-base leading-relaxed mb-10", children: "You cancelled before completing payment. No charge was made to your card. You can try again any time." }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
            lineNumber: 40,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              distExports.Link,
              {
                to: "/sessions",
                className: "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110",
                children: [
                  "Back to Sessions ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
                    lineNumber: 50,
                    columnNumber: 34
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
                lineNumber: 46,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              distExports.Link,
              {
                to: "/",
                className: "inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-border text-muted-foreground rounded transition-all duration-200 hover:border-primary/50 hover:text-foreground",
                children: "Back to Home"
              },
              void 0,
              false,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
                lineNumber: 52,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
            lineNumber: 45,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
        lineNumber: 20,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
      lineNumber: 18,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/payment/cancel.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
export {
  PaymentCancelPage as default
};
