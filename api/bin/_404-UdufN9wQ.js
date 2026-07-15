import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, j as jsxRuntimeExports, H as Helmet } from "./entry-server-CdzZ2syk.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-CTAfdSh-.js";
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
function NotFoundPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "404 Not Found — DeliverIQ" }),
      cms.notFoundPageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.notFoundPageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: cms.notFoundPageHtml || FALLBACK_CMS_CONTENT.notFoundPageHtml }) })
  ] });
}
export {
  NotFoundPage as default
};
