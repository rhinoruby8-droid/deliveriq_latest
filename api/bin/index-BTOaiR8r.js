import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxRuntimeExports, H as Helmet } from "./entry-server-CdzZ2syk.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-CTAfdSh-.js";
import { S as SessionsList } from "./SessionsList-NSCufTzG.js";
import { H as HomepageVisual } from "./HomepageVisual-BMEHVSR5.js";
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
import "./chevron-down-ClmTSOBP.js";
import "./tag-D6yemw6N.js";
import "./clock-pE6HbfJx.js";
import "./users-f2E1N8Pr.js";
import "./globe-PcuVdVQ1.js";
import "./circle-play-CGEMY6Bh.js";
import "./arrow-right-C6-A-7_5.js";
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
    SessionsList: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionsList, {})
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28 bg-[#1A1D24] border-t border-[#2C2F38]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8 max-w-4xl", children: widgets.SessionsList }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets }) })
  ] });
}
export {
  HomePage as default
};
