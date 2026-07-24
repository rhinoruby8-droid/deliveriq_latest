import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { r as reactExports, j as jsxDevRuntimeExports, k as Check, d as distExports, u as useCmsContent, t as trackWatchTime, c as trackEvent, C as Calendar, B as Button, H as Helmet, L as Lock, l as fetchMe, p as LogOut, q as removeUserToken } from "./entry-server-DMO3DLBc.js";
import { D as Dashboard, V as Video } from "./Dashboard-pycTSA-C.js";
import { V as VideoPlayer } from "./VideoPlayer-DiC68Biw.js";
import { C as CheckoutButton } from "./CheckoutButton-D6h0Ec4a.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-BjiqrYFN.js";
import { P as Play } from "./play-DgPbiHvZ.js";
import { C as Clock } from "./clock-Dog4KGLi.js";
import { S as Sparkles } from "./sparkles-C1Kus-I1.js";
import { C as CirclePlay } from "./circle-play-C6m7RcAo.js";
import { A as ArrowLeft } from "./arrow-left-BGykrJU2.js";
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
import "tls";
import "assert";
import "http2";
import "async_hooks";
function PricingTiers({
  basePrice,
  sessionTitle,
  sessionId,
  showOnlyPro = false,
  couponCode
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
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
              lineNumber: 109,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "p-6 pb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm font-bold text-[#F0EDE8] uppercase tracking-wider font-sans", children: tier.name }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                  lineNumber: 116,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: `w-5 h-5 ${tier.iconColor}` }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                  lineNumber: 117,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                lineNumber: 115,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-3xl font-extrabold text-white font-sans", children: [
                  "$",
                  tier.price
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                  lineNumber: 120,
                  columnNumber: 19
                }, this),
                (tier.id === "tier3" || showOnlyPro) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-[#8A8D96] font-sans", children: "/year" }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                  lineNumber: 121,
                  columnNumber: 60
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                lineNumber: 119,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { className: "text-xs text-[#8A8D96] mt-2 leading-relaxed", children: tier.description }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                lineNumber: 123,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
              lineNumber: 114,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "p-6 pt-0 flex-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2.5 text-xs text-[#F0EDE8]", children: tier.features.map((feature, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "w-3.5 h-3.5 text-[#C79A4E] shrink-0 mt-0.5" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                lineNumber: 130,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-sans leading-relaxed", children: feature }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
                lineNumber: 131,
                columnNumber: 23
              }, this)
            ] }, i, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
              lineNumber: 129,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
              lineNumber: 127,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
              lineNumber: 126,
              columnNumber: 15
            }, this),
            !showOnlyPro && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardFooter, { className: "p-6 pt-4 border-t border-[#2C2F38]/40", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-xs font-semibold px-4 py-2.5 rounded-sm border w-full block text-center transition-colors font-sans ${isSelected ? "bg-[#C79A4E] text-[#1A1D24] border-[#C79A4E]" : "bg-transparent text-[#8A8D96] border-[#2C2F38] hover:border-[#C79A4E]/30 hover:text-white"}`, children: isSelected ? "Selected" : "Select Plan" }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
              lineNumber: 139,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
              lineNumber: 138,
              columnNumber: 17
            }, this)
          ]
        },
        tier.id,
        true,
        {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
          lineNumber: 97,
          columnNumber: 13
        },
        this
      );
    }) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-[#2C2F38]/40 pt-6 mt-4 flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96]", children: "You are purchasing:" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
          lineNumber: 155,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-bold text-white mt-1", children: getCheckoutTitle() }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
          lineNumber: 156,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg font-extrabold text-[#C79A4E] mt-1", children: [
          "Total: $",
          getCheckoutAmount()
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
          lineNumber: 159,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
        lineNumber: 154,
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
          className: "w-full max-w-sm",
          couponCode
        },
        void 0,
        false,
        {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
          lineNumber: 164,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/PricingTiers.tsx",
    lineNumber: 91,
    columnNumber: 5
  }, this);
}
function ReplayPlayerPage() {
  var _a, _b, _c, _d, _e, _f, _g;
  const { id } = distExports.useParams();
  const navigate = distExports.useNavigate();
  const { data: cms } = useCmsContent();
  const [user, setUser] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadData() {
      const me = await fetchMe();
      if (!me) {
        navigate("/login");
        return;
      }
      setUser(me);
      setIsLoading(false);
    }
    loadData();
  }, [navigate]);
  const session = ((cms == null ? void 0 : cms.sessions) || []).find((s) => s.id === id);
  reactExports.useEffect(() => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    if (!session || !user) return;
    const isFree2 = session.isFree;
    const isPro2 = user.subscription_tier === "tier3" && user.subscription_expires_at && new Date(user.subscription_expires_at).getTime() > Date.now();
    const isTier22 = ((_b2 = (_a2 = user.session_access) == null ? void 0 : _a2[session.id]) == null ? void 0 : _b2.tier) === "tier2" && ((_d2 = (_c2 = user.session_access) == null ? void 0 : _c2[session.id]) == null ? void 0 : _d2.expires_at) && new Date((_f2 = (_e2 = user.session_access) == null ? void 0 : _e2[session.id]) == null ? void 0 : _f2.expires_at).getTime() > Date.now();
    const hasAccess2 = isFree2 || isPro2 || isTier22;
    if (!hasAccess2) return;
    const intervalId = setInterval(() => {
      trackWatchTime("recording", 1);
      trackEvent("video", { action: "watch_minute", title: session.title });
    }, 6e4);
    return () => clearInterval(intervalId);
  }, [session, user]);
  if (isLoading) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-[#1A1D24] flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[#C79A4E] font-medium", children: "Loading Player..." }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this);
  }
  if (!user) {
    return null;
  }
  const handleLogout = () => {
    removeUserToken();
    navigate("/");
  };
  const config = {
    sidebar: {
      logo: { text: "DeliverIQ", href: "/" },
      navigation: {
        main: [
          { title: "Dashboard", href: "/dashboard", icon: CirclePlay },
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
          { title: "Watch Replays", href: "/replays", icon: Video, active: true }
        ]
      },
      footer: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-neutral-400 hover:text-white", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "mr-2 h-4 w-4" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
          lineNumber: 88,
          columnNumber: 11
        }, this),
        " Sign Out"
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this)
    },
    header: {
      user: {
        name: user == null ? void 0 : user.name,
        email: user == null ? void 0 : user.email,
        initials: (_a = user == null ? void 0 : user.name) == null ? void 0 : _a.substring(0, 2).toUpperCase()
      }
    }
  };
  if (!session) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dashboard, { config, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-8 text-center text-white", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold", children: "Session not found" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { asChild: true, className: "mt-4 bg-[#C79A4E] text-[#1A1D24]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/replays", children: "Back to Replays" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 107,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
      lineNumber: 104,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this);
  }
  const isFree = session.isFree;
  const isPro = user.subscription_tier === "tier3" && user.subscription_expires_at && new Date(user.subscription_expires_at).getTime() > Date.now();
  const isTier2 = ((_c = (_b = user.session_access) == null ? void 0 : _b[session.id]) == null ? void 0 : _c.tier) === "tier2" && ((_e = (_d = user.session_access) == null ? void 0 : _d[session.id]) == null ? void 0 : _e.expires_at) && new Date((_g = (_f = user.session_access) == null ? void 0 : _f[session.id]) == null ? void 0 : _g.expires_at).getTime() > Date.now();
  const hasAccess = isFree || isPro || isTier2;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dashboard, { config, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: [
      session.title,
      " | Replay"
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/replays", className: "inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-2 transition-colors", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 16 }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        " Back to Replays"
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold text-white mb-2", children: session.title }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
          lineNumber: 137,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-neutral-400 text-sm", children: session.description }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this),
      hasAccess ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-4 sm:p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VideoPlayer, { url: session.videoUrl || "", title: session.title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 143,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 142,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/30 border border-amber-500/20 rounded-xl p-8 max-w-3xl mx-auto flex flex-col items-center text-center gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lock, { className: "w-6 h-6" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
          lineNumber: 148,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
          lineNumber: 147,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-bold text-white", children: "Pro Upgrade Required" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
            lineNumber: 152,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-neutral-400 mt-2 max-w-md mx-auto", children: "This session replay requires a Pro subscription. Upgrading grants you full access to all past events, video recordings, and upcoming sessions for an entire year." }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
            lineNumber: 153,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
          lineNumber: 151,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          PricingTiers,
          {
            basePrice: session.price || 49.99,
            sessionTitle: session.title,
            sessionId: session.id,
            showOnlyPro: true
          },
          void 0,
          false,
          {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
            lineNumber: 158,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
        lineNumber: 146,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
      lineNumber: 131,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-replay-player.tsx",
    lineNumber: 126,
    columnNumber: 5
  }, this);
}
export {
  ReplayPlayerPage as default
};
