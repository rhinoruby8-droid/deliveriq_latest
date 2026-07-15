import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, d as distExports, r as reactExports, j as jsxRuntimeExports, H as Helmet } from "./entry-server-CdzZ2syk.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-CTAfdSh-.js";
import { R as RegisterVisual } from "./RegisterVisual-9us3-YBl.js";
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
import "./zap-BTlhOu5S.js";
import "./users-f2E1N8Pr.js";
function RegisterPage() {
  var _a;
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  let htmlContent = cms.registerPageHtml || FALLBACK_CMS_CONTENT.registerPageHtml;
  const [searchParams] = distExports.useSearchParams();
  const sessionSlug = searchParams.get("session");
  const site = "https://deliveriq.live";
  const title = "Register — DeliverIQ";
  const description = "Register your interest for DeliverIQ live sessions. Be the first to know when registration opens for AI learning sessions built for project professionals.";
  const canonicalUrl = `${site}/register`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    name: title,
    url: canonicalUrl,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  const matchedSession = ((cms == null ? void 0 : cms.sessions) || []).find((s) => s.id === sessionSlug);
  reactExports.useEffect(() => {
  }, [matchedSession]);
  const widgets = {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: canonicalUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: canonicalUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }),
      cms.registerPageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.registerPageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: ((_a = cms.registerContent) == null ? void 0 : _a.visualMode) !== false ? /* @__PURE__ */ jsxRuntimeExports.jsx(RegisterVisual, { data: cms.registerContent }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets }) })
  ] });
}
export {
  RegisterPage as default
};
