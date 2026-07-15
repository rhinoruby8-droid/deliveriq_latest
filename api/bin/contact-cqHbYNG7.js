import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxRuntimeExports, H as Helmet } from "./entry-server-CdzZ2syk.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-CTAfdSh-.js";
import { C as ContactVisual } from "./ContactVisual-Cl2d6OYN.js";
import { D as DynamicForm } from "./DynamicForm-BkEFx9W_.js";
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
function ContactPage() {
  var _a;
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  let htmlContent = cms.contactPageHtml || FALLBACK_CMS_CONTENT.contactPageHtml;
  const site = "https://deliveriq.live";
  const title = "Contact — DeliverIQ";
  const description = "Get in touch with the DeliverIQ team. Questions about sessions, speaking, sponsorship, or anything else — we read every message.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site}/contact#webpage`,
    name: title,
    url: `${site}/contact`,
    description,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  const widgets = {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: `${site}/contact` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: `${site}/contact` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }),
      cms.contactPageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.contactPageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: ((_a = cms.contactContent) == null ? void 0 : _a.visualMode) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContactVisual, { data: cms.contactContent }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "form", className: "py-16 lg:py-20 border-t border-[#2C2F38] bg-[#1A1D24]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-[#F0EDE8] mb-3", children: "Send a Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96]", children: "Fill out the form below and we will get back to you shortly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { formId: "contact" })
      ] }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets }) })
  ] });
}
export {
  ContactPage as default
};
