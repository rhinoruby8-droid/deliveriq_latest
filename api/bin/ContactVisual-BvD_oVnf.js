import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, j as jsxDevRuntimeExports, M as Mail } from "./entry-server-DRV1RqeA.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "relative overflow-hidden pt-20 pb-16 diq-contact-section", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 max-w-3xl diq-contact-container", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-4 diq-contact-title", children: hero.title }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
      lineNumber: 11,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-base text-[#8A8D96] leading-relaxed mb-10 diq-contact-subtitle", children: hero.subtitle }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
      lineNumber: 12,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4 mb-10 diq-contact-info-list", children: [
      email && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `mailto:${email}`, className: "flex items-center gap-3 text-sm text-[#8A8D96] hover:text-[#C79A4E] transition-colors diq-contact-email-link", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mail, { size: 15, className: "text-[#C79A4E]" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
          lineNumber: 16,
          columnNumber: 15
        }, this),
        " ",
        email
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
        lineNumber: 15,
        columnNumber: 13
      }, this),
      phone && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: `tel:${phone}`, className: "flex items-center gap-3 text-sm text-[#8A8D96] hover:text-[#C79A4E] transition-colors diq-contact-phone-link", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Phone, { size: 15, className: "text-[#C79A4E]" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
          lineNumber: 21,
          columnNumber: 15
        }, this),
        " ",
        phone
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
        lineNumber: 20,
        columnNumber: 13
      }, this),
      address && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3 text-sm text-[#8A8D96] diq-contact-address-wrapper", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MapPin, { size: 15, className: "text-[#C79A4E] mt-0.5 shrink-0" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
          lineNumber: 26,
          columnNumber: 15
        }, this),
        " ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: address }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
          lineNumber: 26,
          columnNumber: 79
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
        lineNumber: 25,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
      lineNumber: 13,
      columnNumber: 9
    }, this),
    formIntro && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] border-l-2 border-[#C79A4E]/40 pl-4 mb-6 diq-contact-form-intro", children: formIntro }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
      lineNumber: 30,
      columnNumber: 23
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
    lineNumber: 10,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/page-renderers/ContactVisual.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}
export {
  ContactVisual as C
};
