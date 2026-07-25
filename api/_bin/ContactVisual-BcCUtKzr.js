import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { l as createLucideIcon, j as jsxRuntimeExports, M as Mail } from "./entry-server-CO9Km2vr.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden pt-20 pb-16 diq-contact-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 lg:px-8 max-w-3xl diq-contact-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 diq-contact-title", children: hero.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground leading-relaxed mb-10 diq-contact-subtitle", children: hero.subtitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-10 diq-contact-info-list", children: [
      email && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${email}`, className: "flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors diq-contact-email-link", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, className: "text-primary" }),
        " ",
        email
      ] }),
      phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${phone}`, className: "flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors diq-contact-phone-link", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15, className: "text-primary" }),
        " ",
        phone
      ] }),
      address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm text-muted-foreground diq-contact-address-wrapper", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-primary mt-0.5 shrink-0" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: address })
      ] })
    ] }),
    formIntro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground border-l-2 border-primary/40 pl-4 mb-6 diq-contact-form-intro", children: formIntro })
  ] }) });
}
export {
  ContactVisual as C
};
