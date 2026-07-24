import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { h as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, e as Check } from "./entry-server-8mN96Czs.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter, f as CheckoutButton } from "./card-BxQs0ipp.js";
import { P as Play } from "./play-CAM-UU75.js";
import { C as Clock } from "./clock-_WuHkYhd.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sparkles = createLucideIcon("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
function PricingTiers({
  basePrice,
  sessionTitle,
  sessionId,
  showOnlyPro = false
}) {
  const [selectedTier, setSelectedTier] = reactExports.useState("tier2");
  const tier1Price = Math.round(basePrice * 0.7);
  const tier2Price = basePrice;
  const tier3Price = 199;
  const tiers = [
    {
      id: "tier1",
      name: "Basic",
      price: tier1Price,
      description: "Cheapest subscription for live access only.",
      features: [
        "Access to the live session",
        "Interactive Q&A",
        "Digital attendance certificate"
      ],
      icon: Play,
      iconColor: "text-neutral-400"
    },
    {
      id: "tier2",
      name: "Standard",
      price: tier2Price,
      description: "Live session access plus 3 months of recording replays.",
      features: [
        "Access to the live session",
        "Watch recording replays for 3 months",
        "Interactive Q&A",
        "Digital attendance certificate",
        "Session slides and resources"
      ],
      icon: Clock,
      iconColor: "text-[#C79A4E]",
      popular: true
    },
    {
      id: "tier3",
      name: "Pro",
      price: tier3Price,
      description: "Full access to all past and upcoming sessions for a full year.",
      features: [
        "Access to all past sessions (free & paid)",
        "Access to all upcoming live sessions",
        "Watch recording replays for 1 year",
        "Interactive Q&A & resources",
        "Exclusive Pro templates & Discord"
      ],
      icon: Sparkles,
      iconColor: "text-amber-400"
    }
  ];
  const visibleTiers = showOnlyPro ? tiers.filter((t) => t.id === "tier3") : tiers;
  const getCheckoutTitle = () => {
    if (selectedTier === "tier3" || showOnlyPro) {
      return "DeliverIQ Pro Yearly Subscription";
    }
    const suffix = selectedTier === "tier1" ? "Basic Access" : "Standard Access";
    return `${sessionTitle} - ${suffix}`;
  };
  const getCheckoutAmount = () => {
    if (selectedTier === "tier3" || showOnlyPro) return tier3Price;
    if (selectedTier === "tier1") return tier1Price;
    return tier2Price;
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-8 w-full max-w-4xl mx-auto py-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: visibleTiers.map((tier) => {
      const Icon = tier.icon;
      const isSelected = selectedTier === tier.id || showOnlyPro;
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Card,
        {
          onClick: () => !showOnlyPro && setSelectedTier(tier.id),
          className: `relative flex flex-col justify-between transition-all duration-300 border ${showOnlyPro ? "col-span-3 max-w-md mx-auto w-full" : ""} ${isSelected ? "border-[#C79A4E] bg-[#21242C]/80 shadow-[0_0_20px_rgba(199,154,78,0.15)] scale-[1.02]" : "border-[#2C2F38] bg-[#1A1D24]/40 hover:border-[#C79A4E]/30 cursor-pointer"}`,
          children: [
            tier.popular && !showOnlyPro && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C79A4E] text-[#1A1D24] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full z-10", children: "Popular" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "p-6 pb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm font-bold text-[#F0EDE8] uppercase tracking-wider font-sans", children: tier.name }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                  lineNumber: 114,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: `w-5 h-5 ${tier.iconColor}` }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                  lineNumber: 115,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                lineNumber: 113,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-3xl font-extrabold text-white font-sans", children: [
                  "$",
                  tier.price
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                  lineNumber: 118,
                  columnNumber: 19
                }, this),
                (tier.id === "tier3" || showOnlyPro) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-[#8A8D96] font-sans", children: "/year" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                  lineNumber: 119,
                  columnNumber: 60
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                lineNumber: 117,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { className: "text-xs text-[#8A8D96] mt-2 leading-relaxed", children: tier.description }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                lineNumber: 121,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
              lineNumber: 112,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "p-6 pt-0 flex-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2.5 text-xs text-[#F0EDE8]", children: tier.features.map((feature, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "w-3.5 h-3.5 text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                lineNumber: 128,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-sans leading-relaxed", children: feature }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
                lineNumber: 129,
                columnNumber: 23
              }, this)
            ] }, i, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
              lineNumber: 127,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
              lineNumber: 125,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
              lineNumber: 124,
              columnNumber: 15
            }, this),
            !showOnlyPro && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardFooter, { className: "p-6 pt-4 border-t border-[#2C2F38]/40", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-xs font-semibold px-4 py-2.5 rounded-sm border w-full block text-center transition-colors font-sans ${isSelected ? "bg-[#C79A4E] text-[#1A1D24] border-[#C79A4E]" : "bg-transparent text-[#8A8D96] border-[#2C2F38] hover:border-[#C79A4E]/30 hover:text-white"}`, children: isSelected ? "Selected" : "Select Plan" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
              lineNumber: 137,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
              lineNumber: 136,
              columnNumber: 17
            }, this)
          ]
        },
        tier.id,
        true,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
          lineNumber: 95,
          columnNumber: 13
        },
        this
      );
    }) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-[#2C2F38]/40 pt-6 mt-4 flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96]", children: "You are purchasing:" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
          lineNumber: 153,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-bold text-white mt-1", children: getCheckoutTitle() }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg font-extrabold text-[#C79A4E] mt-1", children: [
          "Total: $",
          getCheckoutAmount()
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
          lineNumber: 157,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        CheckoutButton,
        {
          sessionTitle: getCheckoutTitle(),
          amount: getCheckoutAmount(),
          tier: showOnlyPro ? "tier3" : selectedTier,
          sessionId,
          label: showOnlyPro ? "Continue Subscription" : "Purchase Plan",
          className: "w-full max-w-sm"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
          lineNumber: 162,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/PricingTiers.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
export {
  PricingTiers as P
};
