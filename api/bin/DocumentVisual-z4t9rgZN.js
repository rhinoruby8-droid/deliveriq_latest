import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { j as jsxRuntimeExports } from "./entry-server-CdzZ2syk.js";
function DocumentVisual({ data }) {
  const { title, lastUpdated, sections } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-6 lg:px-8 max-w-3xl py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-3", children: title }),
    lastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#8A8D96] mb-10 border-b border-[#2C2F38] pb-6", children: [
      "Last updated: ",
      new Date(lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-10", children: sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      s.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-[#F0EDE8] mb-3", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96] leading-relaxed whitespace-pre-wrap", children: s.body })
    ] }, i)) })
  ] });
}
export {
  DocumentVisual as D
};
