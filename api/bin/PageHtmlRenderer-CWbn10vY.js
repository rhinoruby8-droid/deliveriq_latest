import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { j as jsxDevRuntimeExports, k as React4 } from "./entry-server-DU76AYrK.js";
import { D as DynamicForm } from "./DynamicForm-B2adMGkR.js";
function SafeHtml({ html, as = "div", ...props }) {
  if (!html) return null;
  const Component = as;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Component, { ...props, dangerouslySetInnerHTML: { __html: html } }, void 0, false, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SafeHtml.tsx",
    lineNumber: 11,
    columnNumber: 10
  }, this);
}
function PageHtmlRenderer({ html, widgets = {} }) {
  if (!html) return null;
  const widgetNames = Object.keys(widgets);
  const widgetPattern = widgetNames.length > 0 ? widgetNames.map((name) => `\\[${name}\\]`).join("|") : "";
  const tokenRegex = new RegExp(
    `(${widgetPattern ? widgetPattern + "|" : ""}(?:<|&lt;|\\[)DynamicForm\\s+formId=(?:["']|&quot;|”|“|\\s)*(?:[a-zA-Z0-9_-]+)(?:["']|&quot;|”|“|\\s)*(?:\\/)?(?:>|&gt;|\\])(?:\\s*(?:<|&lt;)\\/DynamicForm(?:>|&gt;))?)`,
    "g"
  );
  const parts = html.split(tokenRegex);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("[") && part.endsWith("]")) {
      const widgetName = part.slice(1, -1);
      if (widgets[widgetName] !== void 0) {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(React4.Fragment, { children: widgets[widgetName] }, i, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PageHtmlRenderer.tsx",
          lineNumber: 34,
          columnNumber: 20
        }, this);
      }
    }
    if (part.includes("DynamicForm") && part.includes("formId=")) {
      const match = part.match(/formId=(?:["']|&quot;|”|“|\s)*([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DynamicForm, { formId: match[1] }, i, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PageHtmlRenderer.tsx",
          lineNumber: 41,
          columnNumber: 20
        }, this);
      }
    }
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SafeHtml, { html: part }, i, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PageHtmlRenderer.tsx",
      lineNumber: 45,
      columnNumber: 16
    }, this);
  }) }, void 0, false, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PageHtmlRenderer.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
export {
  PageHtmlRenderer as P
};
