import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { r as reactExports, j as jsxRuntimeExports, i as Check, d as distExports, u as useCmsContent, t as trackWatchTime, b as trackEvent, C as Calendar, B as Button, H as Helmet, L as Lock, k as fetchMe, o as LogOut, p as removeUserToken } from "./entry-server-CO9Km2vr.js";
import { D as Dashboard, V as Video } from "./Dashboard-l1AW9gE7.js";
import { V as VideoPlayer } from "./VideoPlayer-DSLAfU9G.js";
import { C as CheckoutButton } from "./CheckoutButton-C68lieQj.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-ScUIZyRi.js";
import { P as Play } from "./play-CgVP62Ck.js";
import { C as Clock } from "./clock-Dsl-OAqf.js";
import { S as Sparkles } from "./sparkles-DDHiBTym.js";
import { C as CirclePlay } from "./circle-play-Bmz6iiLZ.js";
import { A as ArrowLeft } from "./arrow-left-DIVfBb6M.js";
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
      iconColor: "text-primary",
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8 w-full max-w-4xl mx-auto py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: visibleTiers.map((tier) => {
      const Icon = tier.icon;
      const isSelected = selectedTier === tier.id || showOnlyPro;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          onClick: () => !showOnlyPro && setSelectedTier(tier.id),
          className: `relative flex flex-col justify-between transition-all duration-300 border ${showOnlyPro ? "col-span-3 max-w-md mx-auto w-full" : ""} ${isSelected ? "border-primary bg-card/80 shadow-[0_0_20px_rgba(199,154,78,0.15)] scale-[1.02]" : "border-border bg-background/40 hover:border-primary/30 cursor-pointer"}`,
          children: [
            tier.popular && !showOnlyPro && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[#1A1D24] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full z-10", children: "Popular" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "p-6 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-bold text-foreground uppercase tracking-wider font-sans", children: tier.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${tier.iconColor}` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-extrabold text-white font-sans", children: [
                  "$",
                  tier.price
                ] }),
                (tier.id === "tier3" || showOnlyPro) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-sans", children: "/year" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs text-muted-foreground mt-2 leading-relaxed", children: tier.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 pt-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 text-xs text-foreground", children: tier.features.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans leading-relaxed", children: feature })
            ] }, i)) }) }),
            !showOnlyPro && /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "p-6 pt-4 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold px-4 py-2.5 rounded-sm border w-full block text-center transition-colors font-sans ${isSelected ? "bg-primary text-[#1A1D24] border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-white"}`, children: isSelected ? "Selected" : "Select Plan" }) })
          ]
        },
        tier.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-6 mt-4 flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You are purchasing:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-white mt-1", children: getCheckoutTitle() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-extrabold text-primary mt-1", children: [
          "Total: $",
          getCheckoutAmount()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckoutButton,
        {
          sessionTitle: getCheckoutTitle(),
          amount: getCheckoutAmount(),
          tier: showOnlyPro ? "tier3" : selectedTier,
          sessionId,
          label: showOnlyPro ? "Continue Subscription" : "Purchase Plan",
          className: "w-full max-w-sm",
          couponCode
        }
      )
    ] })
  ] });
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary font-medium", children: "Loading Player..." }) });
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
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-neutral-400 hover:text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        " Sign Out"
      ] })
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, { config, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Session not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4 bg-primary text-[#1A1D24]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/replays", children: "Back to Replays" }) })
    ] }) });
  }
  const isFree = session.isFree;
  const isPro = user.subscription_tier === "tier3" && user.subscription_expires_at && new Date(user.subscription_expires_at).getTime() > Date.now();
  const isTier2 = ((_c = (_b = user.session_access) == null ? void 0 : _b[session.id]) == null ? void 0 : _c.tier) === "tier2" && ((_e = (_d = user.session_access) == null ? void 0 : _d[session.id]) == null ? void 0 : _e.expires_at) && new Date((_g = (_f = user.session_access) == null ? void 0 : _f[session.id]) == null ? void 0 : _g.expires_at).getTime() > Date.now();
  const hasAccess = isFree || isPro || isTier2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dashboard, { config, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
      session.title,
      " | Replay"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/replays", className: "inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
        " Back to Replays"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white mb-2", children: session.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-400 text-sm", children: session.description })
      ] }),
      hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-4 sm:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { url: session.videoUrl || "", title: session.title }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-neutral-800/30 border border-amber-500/20 rounded-xl p-8 max-w-3xl mx-auto flex flex-col items-center text-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white", children: "Pro Upgrade Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-400 mt-2 max-w-md mx-auto", children: "This session replay requires a Pro subscription. Upgrading grants you full access to all past events, video recordings, and upcoming sessions for an entire year." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PricingTiers,
          {
            basePrice: session.price || 49.99,
            sessionTitle: session.title,
            sessionId: session.id,
            showOnlyPro: true
          }
        )
      ] })
    ] })
  ] });
}
export {
  ReplayPlayerPage as default
};
