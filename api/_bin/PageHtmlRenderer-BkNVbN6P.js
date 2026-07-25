import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { j as jsxRuntimeExports, R as React4 } from "./entry-server-QtrLgn1N.js";
import { D as DynamicForm } from "./DynamicForm-kLH1uGDg.js";
function SafeHtml({ html, as = "div", ...props }) {
  if (!html) return null;
  const Component = as;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...props, dangerouslySetInnerHTML: { __html: html } });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("[") && part.endsWith("]")) {
      const widgetName = part.slice(1, -1);
      if (widgets[widgetName] !== void 0) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(React4.Fragment, { children: widgets[widgetName] }, i);
      }
    }
    if (part.includes("DynamicForm") && part.includes("formId=")) {
      const match = part.match(/formId=(?:["']|&quot;|”|“|\s)*([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { formId: match[1] }, i);
      }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SafeHtml, { html: part }, i);
  }) });
}
export {
  PageHtmlRenderer as P
};
