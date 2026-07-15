import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, u as useCmsContent, F as FALLBACK_CMS_CONTENT, H as Helmet, b as Check } from "./entry-server-CdzZ2syk.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-CTAfdSh-.js";
import { S as SponsorsVisual } from "./SponsorsVisual-jtdRH6GU.js";
import { t as trackEvent } from "./analytics-jZcZ4Ayp.js";
import { A as ArrowRight } from "./arrow-right-C6-A-7_5.js";
import { m as motion } from "./proxy-Xo9ayrB_.js";
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
import "async_hooks";
import "./DynamicForm-BkEFx9W_.js";
import "./input-DNdNnT8o.js";
import "./chevron-down-ClmTSOBP.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
function CheckoutButton({
  sessionTitle,
  amount,
  currency = "usd",
  label = "Register & Pay",
  className = ""
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    trackEvent("begin_checkout", {
      currency,
      value: amount,
      items: [{ item_name: sessionTitle, price: amount, currency }]
    });
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionTitle, amount, currency })
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleCheckout,
        disabled: loading,
        className: `inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 ${className}`,
        children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
          "Redirecting…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] })
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: error })
  ] });
}
const Card = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function ForSponsorsPage() {
  var _a;
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.sponsorsPageHtml || FALLBACK_CMS_CONTENT.sponsorsPageHtml;
  const site = "https://deliveriq.live";
  const title = "Sponsor DeliverIQ — Reach Project Professionals";
  const description = "Sponsorship opportunities at DeliverIQ. Put your brand in front of project managers, project controls professionals, and delivery leaders actively learning AI skills.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}/for-sponsors#webpage`,
    name: title,
    url: `${site}/for-sponsors`,
    description,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  const widgets = {
    SponsorStats: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-[#2C2F38] bg-[#21242C] shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "border-b border-[#2C2F38] pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase", children: "Audience Demographics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm text-[#8A8D96]", children: "Who attends DeliverIQ live sessions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [
        { role: "Project Managers", pct: 42 },
        { role: "Project Controls Professionals", pct: 31 },
        { role: "Delivery Leaders & PMO", pct: 18 },
        { role: "Other Project Professionals", pct: 9 }
      ].map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#F0EDE8] font-medium", children: row.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.span,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.8 + i * 0.1 },
              className: "text-sm font-bold text-[#C79A4E]",
              children: [
                row.pct,
                "%"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-[#2C2F38] rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full bg-gradient-to-r from-[#C79A4E] to-[#e0bc7f] rounded-full",
            initial: { width: 0 },
            whileInView: { width: `${row.pct}%` },
            viewport: { once: true, margin: "-50px" },
            transition: { duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }
          }
        ) })
      ] }, row.role)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-t border-[#2C2F38] bg-[#1A1D24] rounded-b-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#8A8D96]", children: "Based on registration data across 50+ live sessions." }) })
    ] })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: `${site}/for-sponsors` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: `${site}/for-sponsors` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }),
      cms.sponsorsPageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.sponsorsPageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: ((_a = cms.sponsorsContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SponsorsVisual, { data: cms.sponsorsContent }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-[#15171C]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-[#F0EDE8] mb-4", children: "Reach Packages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#8A8D96] max-w-2xl mx-auto", children: "Select a standard package to immediately secure your placement, or contact us for custom opportunities." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1D24] border-[#2C2F38] flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl text-[#F0EDE8]", children: "Brand Visibility" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Logo Placement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold text-[#F0EDE8]", children: "$500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: ["Logo on all session pages", "Logo on newsletter (1 month)", "Social media mention"].map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" }),
              benefit
            ] }, i)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutButton, { sessionTitle: "Sponsor Package: Brand Visibility", amount: 5e4, className: "w-full", label: "Purchase Package" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#21242C] border-[#C79A4E] flex flex-col relative scale-105 shadow-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C79A4E] text-[#1A1D24] px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider", children: "Most Popular" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl text-[#F0EDE8]", children: "Dedicated Session" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Hosted Webinar Slot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold text-[#F0EDE8]", children: "$1,500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: ["45-minute dedicated live session", "Full lead generation & registration list", "Branded waiting room", "Recording hosted on platform"].map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" }),
              benefit
            ] }, i)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutButton, { sessionTitle: "Sponsor Package: Dedicated Session", amount: 15e4, className: "w-full", label: "Purchase Package" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1A1D24] border-[#2C2F38] flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl text-[#F0EDE8]", children: "Lead Generation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Registration List Sharing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold text-[#F0EDE8]", children: "$2,500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: ["Opt-in registration list for 3 sessions", "Post-event email blast to attendees", "Prominent logo placement", "Pre-roll video ad (30s)"].map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" }),
              benefit
            ] }, i)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutButton, { sessionTitle: "Sponsor Package: Lead Generation", amount: 25e4, className: "w-full", label: "Purchase Package" }) })
          ] })
        ] })
      ] }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets }) })
  ] });
}
export {
  ForSponsorsPage as default
};
