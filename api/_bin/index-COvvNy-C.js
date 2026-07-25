import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxRuntimeExports, H as Helmet } from "./entry-server-QtrLgn1N.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-BkNVbN6P.js";
import { T as TopicsList, S as SessionsList } from "./TopicsList-B0H9JO5G.js";
import { H as HomepageVisual } from "./HomepageVisual-Bd51dpVi.js";
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
import "./DynamicForm-kLH1uGDg.js";
import "./SpeakerDialog-CQBkaRt6.js";
import "./globe-B4acYbBo.js";
import "./clock-B5hOY9LC.js";
import "./chevron-down-D1_2HgaC.js";
import "./tag-AG0jTU0b.js";
import "./users-B0Eynbt8.js";
import "./circle-play-ChDDspgp.js";
function MarqueeTicker() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const sponsors = cms.sponsors || [];
  if (sponsors.length === 0) return null;
  const displaySponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full overflow-hidden bg-card/20 border-y border-border/40 py-8 relative my-8 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 z-10 pointer-events-none",
        style: {
          background: "linear-gradient(to right, #1A1D24 0%, transparent 15%, transparent 85%, #1A1D24 100%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max items-center animate-diq-marquee gap-16 md:gap-24", children: displaySponsors.map((sponsor, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: sponsor.websiteUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105 shrink-0",
        children: [
          sponsor.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
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
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-foreground font-bold tracking-wider text-base md:text-lg uppercase",
              style: { display: sponsor.logoUrl ? "none" : "block" },
              children: sponsor.name
            }
          )
        ]
      },
      `${sponsor.id}-${idx}`
    )) })
  ] });
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
    SessionsList: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionsList, {}),
    TopicsList: /* @__PURE__ */ jsxRuntimeExports.jsx(TopicsList, {}),
    MarqueeTicker: /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeTicker, {})
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: site }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: site }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }),
      cms.homepageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.homepageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: ((_a = cms.homepageContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HomepageVisual, { data: cms.homepageContent }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 max-w-4xl", children: widgets.SessionsList }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets }) })
  ] });
}
export {
  HomePage as default
};
