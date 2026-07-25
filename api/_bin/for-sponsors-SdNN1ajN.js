import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxRuntimeExports, H as Helmet, i as Check } from "./entry-server-CO9Km2vr.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-Bbt_vtY4.js";
import { S as SponsorsVisual } from "./SponsorsVisual-DRWOs2VU.js";
import { C as CheckoutButton } from "./CheckoutButton-C68lieQj.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-ScUIZyRi.js";
import { m as motion } from "./proxy-DJyDVOIo.js";
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
import "./DynamicForm-_YvKQM8N.js";
import "./chevron-down-DITIpfaX.js";
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
    SponsorStats: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "border-b border-border pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-[10px] font-semibold tracking-widest text-primary uppercase", children: "Audience Demographics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm text-muted-foreground", children: "Who attends DeliverIQ live sessions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [
        { role: "Project Managers", pct: 42 },
        { role: "Project Controls Professionals", pct: 31 },
        { role: "Delivery Leaders & PMO", pct: 18 },
        { role: "Other Project Professionals", pct: 9 }
      ].map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: row.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.span,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.8 + i * 0.1 },
              className: "text-sm font-bold text-primary",
              children: [
                row.pct,
                "%"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-t border-border bg-background rounded-b-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Based on registration data across 50+ live sessions." }) })
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-foreground mb-4", children: "Reach Packages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Select a standard package to immediately secure your placement, or contact us for custom opportunities." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-background border-border flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl text-foreground", children: "Brand Visibility" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Logo Placement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold text-foreground", children: "$500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: ["Logo on all session pages", "Logo on newsletter (1 month)", "Social media mention"].map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary mr-3 mt-0.5 shrink-0" }),
              benefit
            ] }, i)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutButton, { sessionTitle: "Sponsor Package: Brand Visibility", amount: 5e4, className: "w-full", label: "Purchase Package" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-primary flex flex-col relative scale-105 shadow-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-[#1A1D24] px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider", children: "Most Popular" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl text-foreground", children: "Dedicated Session" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Hosted Webinar Slot" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold text-foreground", children: "$1,500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: ["45-minute dedicated live session", "Full lead generation & registration list", "Branded waiting room", "Recording hosted on platform"].map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary mr-3 mt-0.5 shrink-0" }),
              benefit
            ] }, i)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutButton, { sessionTitle: "Sponsor Package: Dedicated Session", amount: 15e4, className: "w-full", label: "Purchase Package" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-background border-border flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl text-foreground", children: "Lead Generation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Registration List Sharing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold text-foreground", children: "$2,500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: ["Opt-in registration list for 3 sessions", "Post-event email blast to attendees", "Prominent logo placement", "Pre-roll video ad (30s)"].map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary mr-3 mt-0.5 shrink-0" }),
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
