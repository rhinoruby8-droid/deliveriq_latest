import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxDevRuntimeExports, H as Helmet } from "./entry-server-Dtcmmwg9.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-BdJzgZf_.js";
import { D as DocumentVisual } from "./DocumentVisual-BXFZtboU.js";
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
import "./DynamicForm-Drbm7K6R.js";
function TermsPage() {
  var _a;
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.termsPageHtml || FALLBACK_CMS_CONTENT.termsPageHtml;
  const site = "https://deliveriq.live";
  const title = "Terms of Use — DeliverIQ";
  const description = "Terms and conditions governing use of the DeliverIQ platform and services.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}/terms#webpage`,
    name: title,
    url: `${site}/terms`,
    description,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: `${site}/terms` }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: `${site}/terms` }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "robots", content: "noindex" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      cms.termsPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.termsPageCss }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
        lineNumber: 37,
        columnNumber: 29
      }, this) : null
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: ((_a = cms.termsContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DocumentVisual, { data: cms.termsContent }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
      lineNumber: 42,
      columnNumber: 13
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets: {} }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
      lineNumber: 43,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/terms.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}
export {
  TermsPage as default
};
