import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxDevRuntimeExports, H as Helmet } from "./entry-server-CnSQFCy3.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-DnQi9baR.js";
import { T as TopicsList, S as SessionsList } from "./TopicsList-OOYHEs3z.js";
import { H as HomepageVisual } from "./HomepageVisual-CRtRqOKr.js";
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
import "./DynamicForm-BWZ7a1Pd.js";
import "./SpeakerDialog-C2RwG1jL.js";
import "./globe-D2cZ1fJ3.js";
import "./clock-DLWFBWM2.js";
import "./chevron-down-C-sSapn4.js";
import "./tag-C5231WxL.js";
import "./users-C6c9f4v-.js";
import "./circle-play-CZ9WOZNI.js";
function MarqueeTicker() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const sponsors = cms.sponsors || [];
  if (sponsors.length === 0) return null;
  const displaySponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full overflow-hidden bg-[#21242C]/20 border-y border-[#2C2F38]/40 py-8 relative my-8 select-none", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "absolute inset-0 z-10 pointer-events-none",
        style: {
          background: "linear-gradient(to right, #1A1D24 0%, transparent 15%, transparent 85%, #1A1D24 100%)"
        }
      },
      void 0,
      false,
      {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/MarqueeTicker.tsx",
        lineNumber: 15,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex w-max items-center animate-diq-marquee gap-16 md:gap-24", children: displaySponsors.map((sponsor, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "a",
      {
        href: sponsor.websiteUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105 shrink-0",
        children: [
          sponsor.logoUrl ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "img",
            {
              src: sponsor.logoUrl,
              alt: sponsor.name,
              className: "h-10 md:h-12 w-auto object-contain max-w-[150px]",
              onError: (e) => {
                e.target.style.display = "none";
                const sibling = e.target.nextElementSibling;
                if (sibling) sibling.style.display = "block";
              }
            },
            void 0,
            false,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/MarqueeTicker.tsx",
              lineNumber: 33,
              columnNumber: 15
            },
            this
          ) : null,
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              className: "text-[#F0EDE8] font-bold tracking-wider text-base md:text-lg uppercase",
              style: { display: sponsor.logoUrl ? "none" : "block" },
              children: sponsor.name
            },
            void 0,
            false,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/MarqueeTicker.tsx",
              lineNumber: 45,
              columnNumber: 13
            },
            this
          )
        ]
      },
      `${sponsor.id}-${idx}`,
      true,
      {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/MarqueeTicker.tsx",
        lineNumber: 25,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/MarqueeTicker.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/MarqueeTicker.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
function HomePage() {
  var _a;
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.homepageHtml || FALLBACK_CMS_CONTENT.homepageHtml;
  const site = "https://deliveriq.live";
  const title = "DeliverIQ — The Project World's Live Room";
  const description = "Live, expert-led sessions where project managers, project controls, and delivery professionals master AI in real project work.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site}/#website`, name: "DeliverIQ", url: `${site}/` },
      {
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: "DeliverIQ",
        url: `${site}/`,
        email: "info@deliveriq.live"
      },
      {
        "@type": "WebPage",
        "@id": `${site}/#webpage`,
        url: `${site}/`,
        name: title,
        description,
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${site}/#organization` },
        datePublished: "2026-06-28",
        dateModified: "2026-06-28"
      }
    ]
  };
  const widgets = {
    SessionsList: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SessionsList, {}, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
      lineNumber: 44,
      columnNumber: 19
    }, this),
    TopicsList: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TopicsList, {}, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
      lineNumber: 45,
      columnNumber: 17
    }, this),
    MarqueeTicker: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MarqueeTicker, {}, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
      lineNumber: 46,
      columnNumber: 20
    }, this)
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: site }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: site }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:title", content: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 63,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      cms.homepageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.homepageCss }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 65,
        columnNumber: 28
      }, this) : null
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: ((_a = cms.homepageContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(HomepageVisual, { data: cms.homepageContent }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 71,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-20 lg:py-28 bg-[#1A1D24] border-t border-[#2C2F38]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 max-w-4xl", children: widgets.SessionsList }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 73,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
        lineNumber: 72,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
      lineNumber: 79,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/index.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}
export {
  HomePage as default
};
