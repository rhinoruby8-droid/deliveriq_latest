import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, u as useCmsContent, r as reactExports, t as trackWatchTime, c as trackEvent, j as jsxDevRuntimeExports, C as Calendar, B as Button, H as Helmet, L as Lock, l as fetchMe, p as LogOut, q as removeUserToken } from "./entry-server-DEohozKf.js";
import { D as Dashboard, V as Video } from "./Dashboard-BzLkskJO.js";
import { V as VideoPlayer } from "./VideoPlayer-DCgas-Bc.js";
import { P as PricingTiers } from "./PricingTiers-CDHifAn5.js";
import { C as CirclePlay } from "./circle-play-DV-X4iDy.js";
import { A as ArrowLeft } from "./arrow-left-D6y3Sdnm.js";
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
import "./CheckoutButton-Bw2J-lHy.js";
import "./card-D_Qdl3Jt.js";
import "./play-MkOiE1cL.js";
import "./clock-BhuqJpsQ.js";
import "./sparkles-BiqlQYfa.js";
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
