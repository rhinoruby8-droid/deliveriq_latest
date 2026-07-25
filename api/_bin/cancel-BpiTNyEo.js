import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { l as createLucideIcon, j as jsxRuntimeExports, H as Helmet, d as distExports, a as ArrowRight } from "./entry-server-QtrLgn1N.js";
import { m as motion } from "./proxy-DK08kDt0.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Payment Cancelled — DeliverIQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: "Your payment was cancelled. No charge was made. Return to sessions to try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: "noindex" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: `${site}/payment/cancel` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-[80vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 max-w-xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 28, className: "text-muted-foreground" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-4", children: "Payment Cancelled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4", children: "No charge was made." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed mb-10", children: "You cancelled before completing payment. No charge was made to your card. You can try again any time." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: "/sessions",
                className: "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110",
                children: [
                  "Back to Sessions ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              distExports.Link,
              {
                to: "/",
                className: "inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-border text-muted-foreground rounded transition-all duration-200 hover:border-primary/50 hover:text-foreground",
                children: "Back to Home"
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  PaymentCancelPage as default
};
