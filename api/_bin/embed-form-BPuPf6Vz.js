import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, j as jsxRuntimeExports } from "./entry-server-QtrLgn1N.js";
import { D as DynamicForm } from "./DynamicForm-kLH1uGDg.js";
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-red-500", children: "Form ID not provided." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full min-h-screen bg-muted p-4 font-sans text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { formId: id, forceNative: true }) });
}
export {
  EmbedFormPage as default
};
