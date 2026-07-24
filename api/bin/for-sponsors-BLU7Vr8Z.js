import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { r as reactExports, j as jsxDevRuntimeExports, e as cn, u as useCmsContent, F as FALLBACK_CMS_CONTENT, H as Helmet, f as Check } from "./entry-server-CxGE4Mv8.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-DqSiLUJ8.js";
import { S as SponsorsVisual } from "./SponsorsVisual-CrIQVbJm.js";
import { C as CheckoutButton } from "./CheckoutButton-DMIp0tG1.js";
import { m as motion } from "./proxy-BAXjbeGF.js";
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
import "./DynamicForm-C6ZnGWEi.js";
import "./index-DXm1IhX1.js";
import "./chevron-down-8cuKfimt.js";
import "./analytics-jZcZ4Ayp.js";
import "./arrow-right-WA1XerRG.js";
const Card = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 9,
    columnNumber: 3
  },
  void 0
));
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 24,
    columnNumber: 3
  },
  void 0
));
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 36,
    columnNumber: 3
  },
  void 0
));
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 51,
    columnNumber: 3
  },
  void 0
));
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { ref, className: cn("p-6 pt-0", className), ...props }, void 0, false, {
  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
  lineNumber: 63,
  columnNumber: 3
}, void 0));
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 71,
    columnNumber: 3
  },
  void 0
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
    SponsorStats: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "border-[#2C2F38] bg-[#21242C] shadow-xl", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "border-b border-[#2C2F38] pb-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase", children: "Audience Demographics" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
          lineNumber: 34,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { className: "text-sm text-[#8A8D96]", children: "Who attends DeliverIQ live sessions" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
          lineNumber: 37,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
        { role: "Project Managers", pct: 42 },
        { role: "Project Controls Professionals", pct: 31 },
        { role: "Delivery Leaders & PMO", pct: 18 },
        { role: "Other Project Professionals", pct: 9 }
      ].map((row, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm text-[#F0EDE8] font-medium", children: row.role }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
            lineNumber: 51,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
            },
            void 0,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 52,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
          lineNumber: 50,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-2 bg-[#2C2F38] rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          motion.div,
          {
            className: "h-full bg-gradient-to-r from-[#C79A4E] to-[#e0bc7f] rounded-full",
            initial: { width: 0 },
            whileInView: { width: `${row.pct}%` },
            viewport: { once: true, margin: "-50px" },
            transition: { duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
            lineNumber: 62,
            columnNumber: 19
          },
          this
        ) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
          lineNumber: 61,
          columnNumber: 17
        }, this)
      ] }, row.role, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 49,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 border-t border-[#2C2F38] bg-[#1A1D24] rounded-b-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-[#8A8D96]", children: "Based on registration data across 50+ live sessions." }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 75,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this)
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: `${site}/for-sponsors` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: `${site}/for-sponsors` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this),
      cms.sponsorsPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.sponsorsPageCss }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 94,
        columnNumber: 32
      }, this) : null
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: ((_a = cms.sponsorsContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SponsorsVisual, { data: cms.sponsorsContent }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-20 bg-[#15171C]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-3xl font-bold text-[#F0EDE8] mb-4", children: "Reach Packages" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
            lineNumber: 106,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[#8A8D96] max-w-2xl mx-auto", children: "Select a standard package to immediately secure your placement, or contact us for custom opportunities." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
            lineNumber: 107,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
          lineNumber: 105,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-[#1A1D24] border-[#2C2F38] flex flex-col", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl text-[#F0EDE8]", children: "Brand Visibility" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 116,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { children: "Logo Placement" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 117,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 text-3xl font-bold text-[#F0EDE8]", children: "$500" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 118,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-3", children: ["Logo on all session pages", "Logo on newsletter (1 month)", "Social media mention"].map((benefit, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 124,
                columnNumber: 29
              }, this),
              benefit
            ] }, i, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 123,
              columnNumber: 27
            }, this)) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 121,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 120,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardFooter, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CheckoutButton, { sessionTitle: "Sponsor Package: Brand Visibility", amount: 5e4, className: "w-full", label: "Purchase Package" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 131,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 130,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
            lineNumber: 114,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-[#21242C] border-[#C79A4E] flex flex-col relative scale-105 shadow-2xl", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C79A4E] text-[#1A1D24] px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider", children: "Most Popular" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 137,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl text-[#F0EDE8]", children: "Dedicated Session" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 141,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { children: "Hosted Webinar Slot" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 142,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 text-3xl font-bold text-[#F0EDE8]", children: "$1,500" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 143,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 140,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-3", children: ["45-minute dedicated live session", "Full lead generation & registration list", "Branded waiting room", "Recording hosted on platform"].map((benefit, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 149,
                columnNumber: 29
              }, this),
              benefit
            ] }, i, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 148,
              columnNumber: 27
            }, this)) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 146,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 145,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardFooter, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CheckoutButton, { sessionTitle: "Sponsor Package: Dedicated Session", amount: 15e4, className: "w-full", label: "Purchase Package" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 156,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 155,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
            lineNumber: 136,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-[#1A1D24] border-[#2C2F38] flex flex-col", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl text-[#F0EDE8]", children: "Lead Generation" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 163,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { children: "Registration List Sharing" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 164,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 text-3xl font-bold text-[#F0EDE8]", children: "$2,500" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 165,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 162,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-3", children: ["Opt-in registration list for 3 sessions", "Post-event email blast to attendees", "Prominent logo placement", "Pre-roll video ad (30s)"].map((benefit, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
                lineNumber: 171,
                columnNumber: 29
              }, this),
              benefit
            ] }, i, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 170,
              columnNumber: 27
            }, this)) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 168,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 167,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardFooter, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CheckoutButton, { sessionTitle: "Sponsor Package: Lead Generation", amount: 25e4, className: "w-full", label: "Purchase Package" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 178,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
              lineNumber: 177,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
            lineNumber: 161,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
          lineNumber: 112,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 104,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
        lineNumber: 103,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
      lineNumber: 99,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
      lineNumber: 186,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
      lineNumber: 97,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-sponsors.tsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
}
export {
  ForSponsorsPage as default
};
