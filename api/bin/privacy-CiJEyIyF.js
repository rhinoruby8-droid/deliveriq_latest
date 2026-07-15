import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxRuntimeExports, H as Helmet } from "./entry-server-CdzZ2syk.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-CTAfdSh-.js";
import { D as DocumentVisual } from "./DocumentVisual-z4t9rgZN.js";
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
function PrivacyPage() {
  var _a;
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.privacyPageHtml || FALLBACK_CMS_CONTENT.privacyPageHtml;
  const site = "https://deliveriq.live";
  const title = "Privacy Policy — DeliverIQ";
  const description = "How DeliverIQ collects, uses, and protects your personal information.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}/privacy#webpage`,
    name: title,
    url: `${site}/privacy`,
    description,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: `${site}/privacy` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: `${site}/privacy` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: "noindex" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }),
      cms.privacyPageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.privacyPageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: ((_a = cms.privacyContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentVisual, { data: cms.privacyContent }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets: {} }) })
  ] });
}
export {
  PrivacyPage as default
};
