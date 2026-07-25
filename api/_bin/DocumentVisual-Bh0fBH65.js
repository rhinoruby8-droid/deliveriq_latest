import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { j as jsxRuntimeExports } from "./entry-server-CO9Km2vr.js";
function DocumentVisual({ data }) {
  const { title, lastUpdated, sections } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-6 lg:px-8 max-w-3xl py-20 diq-document-main", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-foreground mb-3 diq-document-title", children: title }),
    lastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-10 border-b border-border pb-6 diq-document-updated", children: [
      "Last updated: ",
      new Date(lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-10 diq-document-sections-list", children: sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "diq-document-section-block", children: [
      s.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mb-3 diq-document-section-title", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap diq-document-section-body", children: s.body })
    ] }, i)) })
  ] });
}
export {
  DocumentVisual as D
};
