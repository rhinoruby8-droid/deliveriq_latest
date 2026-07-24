import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxDevRuntimeExports, H as Helmet } from "./entry-server-Dcy3SmRk.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-By2nb7AK.js";
import { T as TopicsList, S as SessionsList } from "./TopicsList-Br_g0RV7.js";
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
import "./DynamicForm-D6RTQZTi.js";
import "./SpeakerDialog-CLS5HBhS.js";
import "./globe-CevzeLPN.js";
import "./clock-DwC5v8Zh.js";
import "./chevron-down-IPBCQ3zB.js";
import "./tag-CPTxWLLw.js";
import "./users-BBix6Q_W.js";
import "./circle-play-D9sCCvxK.js";
function SessionsPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.sessionsPageHtml || FALLBACK_CMS_CONTENT.sessionsPageHtml;
  const site = "https://deliveriq.live";
  const title = "Sessions — DeliverIQ";
  const description = "Practical live sessions on applying AI tools to project management, project controls, and delivery leadership.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}/sessions#webpage`,
    name: title,
    url: `${site}/sessions`,
    description,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  const widgets = {
    SessionsList: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SessionsList, {}, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
      lineNumber: 28,
      columnNumber: 19
    }, this),
    TopicsList: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TopicsList, {}, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
      lineNumber: 29,
      columnNumber: 17
    }, this)
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: `${site}/sessions` }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: `${site}/sessions` }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      cms.sessionsPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.sessionsPageCss }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
        lineNumber: 45,
        columnNumber: 32
      }, this) : null
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
      lineNumber: 49,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/sessions.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}
export {
  SessionsPage as default
};
