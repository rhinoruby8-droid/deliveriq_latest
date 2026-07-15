import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, j as jsxRuntimeExports } from "./entry-server-CdzZ2syk.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MapPin = createLucideIcon("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Phone = createLucideIcon("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
function ContactVisual({ data }) {
  const { hero, email, phone, address, formIntro } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden pt-20 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-4", children: hero.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-[#8A8D96] leading-relaxed mb-10", children: hero.subtitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-10", children: [
      email && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${email}`, className: "flex items-center gap-3 text-sm text-[#8A8D96] hover:text-[#C79A4E] transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, className: "text-[#C79A4E]" }),
        " ",
        email
      ] }),
      phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${phone}`, className: "flex items-center gap-3 text-sm text-[#8A8D96] hover:text-[#C79A4E] transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15, className: "text-[#C79A4E]" }),
        " ",
        phone
      ] }),
      address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm text-[#8A8D96]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-[#C79A4E] mt-0.5 shrink-0" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: address })
      ] })
    ] }),
    formIntro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96] border-l-2 border-[#C79A4E]/40 pl-4 mb-6", children: formIntro })
  ] }) });
}
export {
  ContactVisual as C,
  Mail as M
};
