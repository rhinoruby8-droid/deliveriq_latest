import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, j as jsxRuntimeExports } from "./entry-server-CdzZ2syk.js";
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
function EmbedFormPage() {
  const { id } = distExports.useParams();
  if (!id) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-red-500", children: "Form ID not provided." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full min-h-screen bg-[#13151A] p-4 font-sans text-[#F0EDE8]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { formId: id }) });
}
export {
  EmbedFormPage as default
};
