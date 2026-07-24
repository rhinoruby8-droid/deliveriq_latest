import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxDevRuntimeExports, H as Helmet } from "./entry-server-CeZnOOR1.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-DTOfGYav.js";
import { S as SpeakersVisual } from "./SpeakersVisual-DXEc-NsD.js";
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
import "./DynamicForm-DOPU4U4w.js";
import "./zap-kdro3-cH.js";
import "./star-CfWbPms6.js";
import "./users-XJ7HQYwi.js";
import "./globe-BOKcwaE1.js";
import "./arrow-right-CCpAHd1i.js";
function ForSpeakersPage() {
  var _a;
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.speakersPageHtml || FALLBACK_CMS_CONTENT.speakersPageHtml;
  const site = "https://deliveriq.live";
  const title = "Speak at DeliverIQ — Share Practical AI Skills";
  const description = "Apply to speak at DeliverIQ. We welcome project managers, controls professionals, and delivery leaders using AI in real-world project work.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}/for-speakers#webpage`,
    name: title,
    url: `${site}/for-speakers`,
    description,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  const widgets = {};
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: `${site}/for-speakers` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: `${site}/for-speakers` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      cms.speakersPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.speakersPageCss }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
        lineNumber: 41,
        columnNumber: 32
      }, this) : null
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: ((_a = cms.speakersContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SpeakersVisual, { data: cms.speakersContent }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
      lineNumber: 46,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
      lineNumber: 48,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/for-speakers.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}
export {
  ForSpeakersPage as default
};
