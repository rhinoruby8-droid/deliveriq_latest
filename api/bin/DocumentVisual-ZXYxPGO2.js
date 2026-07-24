import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { j as jsxDevRuntimeExports } from "./entry-server-DIa57ZvY.js";
function DocumentVisual({ data }) {
  const { title, lastUpdated, sections } = data;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "container mx-auto px-6 lg:px-8 max-w-3xl py-20 diq-document-main", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl md:text-4xl font-bold text-foreground mb-3 diq-document-title", children: title }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/DocumentVisual.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    lastUpdated && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground mb-10 border-b border-border pb-6 diq-document-updated", children: [
      "Last updated: ",
      new Date(lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/DocumentVisual.tsx",
      lineNumber: 11,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-10 diq-document-sections-list", children: sections.map((s, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "diq-document-section-block", children: [
      s.title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-foreground mb-3 diq-document-section-title", children: s.title }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/DocumentVisual.tsx",
        lineNumber: 18,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap diq-document-section-body", children: s.body }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/DocumentVisual.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this)
    ] }, i, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/DocumentVisual.tsx",
      lineNumber: 17,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/DocumentVisual.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/DocumentVisual.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
export {
  DocumentVisual as D
};
