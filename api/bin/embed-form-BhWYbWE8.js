import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, j as jsxDevRuntimeExports } from "./entry-server-B1moBwn1.js";
import { D as DynamicForm } from "./DynamicForm-Dw6JNtJY.js";
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
function EmbedFormPage() {
  const { id } = distExports.useParams();
  if (!id) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 text-red-500", children: "Form ID not provided." }, void 0, false, {
      fileName: "C:/Users/A S U S/Downloads/DeliverIQ_2/DeliverIQ_2/src/pages/embed-form.tsx",
      lineNumber: 8,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-full min-h-screen bg-muted p-4 font-sans text-foreground", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicForm, { formId: id, forceNative: true }, void 0, false, {
    fileName: "C:/Users/A S U S/Downloads/DeliverIQ_2/DeliverIQ_2/src/pages/embed-form.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/A S U S/Downloads/DeliverIQ_2/DeliverIQ_2/src/pages/embed-form.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
export {
  EmbedFormPage as default
};
