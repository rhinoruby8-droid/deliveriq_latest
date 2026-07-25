import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { l as createLucideIcon, d as distExports, r as reactExports, j as jsxRuntimeExports, C as Calendar, H as Helmet, m as ChevronRight, a as ArrowRight, k as fetchMe, n as fetchDashboardData, B as Button, o as LogOut, p as removeUserToken } from "./entry-server-CO9Km2vr.js";
import { D as Dashboard$1, V as Video } from "./Dashboard-l1AW9gE7.js";
import { C as CheckoutButton } from "./CheckoutButton-C68lieQj.js";
import { J as JoinCallButton } from "./JoinCallButton-1SHFv1Jr.js";
import { C as CirclePlay } from "./circle-play-Bmz6iiLZ.js";
import { m as motion } from "./proxy-DJyDVOIo.js";
import { C as Clock } from "./clock-Dsl-OAqf.js";
import { S as Sparkles } from "./sparkles-DDHiBTym.js";
import { B as BookOpen, S as Settings } from "./settings-DBeTxPHs.js";
import { Z as Zap } from "./zap-CUewUkhO.js";
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
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bookmark = createLucideIcon("Bookmark", [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleHelp = createLucideIcon("CircleHelp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Crown = createLucideIcon("Crown", [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 }
  })
};
function Dashboard() {
  var _a, _b;
  const navigate = distExports.useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [metrics, setMetrics] = reactExports.useState({ minutes_attended: 0, hours_watched: 0 });
  const [registeredSessions, setRegisteredSessions] = reactExports.useState([]);
  const [upcomingOpportunities, setUpcomingOpportunities] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadData() {
      const me = await fetchMe();
      setUser(me);
      const dashboardData = await fetchDashboardData();
      if (dashboardData) {
        setMetrics(dashboardData.metrics);
        setRegisteredSessions(dashboardData.registeredSessions || []);
        setUpcomingOpportunities(dashboardData.upcomingOpportunities || []);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-10 h-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-2 border-primary/10 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-2 border-transparent border-t-[#C79A4E] rounded-full animate-spin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 font-bold tracking-widest uppercase", children: "Loading workspace" })
    ] }) });
  }
  const handleLogout = () => {
    removeUserToken();
    navigate("/");
  };
  const isPro = (user == null ? void 0 : user.subscription_tier) === "tier3" && (user == null ? void 0 : user.subscription_expires_at) && new Date(user.subscription_expires_at).getTime() > Date.now();
  const config = {
    sidebar: {
      logo: { text: "DeliverIQ", href: "/" },
      navigation: {
        main: [
          { title: "Dashboard", href: "/dashboard", icon: CirclePlay, active: true },
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
          { title: "Watch Replays", href: "/replays", icon: Video }
        ]
      },
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-slate-500 hover:text-red-400 hover:bg-red-500/5 text-xs h-9 px-3 rounded-lg transition-all duration-200", children: [
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
  const firstName = ((_b = user == null ? void 0 : user.name) == null ? void 0 : _b.split(" ")[0]) || "there";
  const liveGoal = 60;
  const liveProgress = Math.min(100, Math.round(metrics.minutes_attended / liveGoal * 100));
  const replayGoal = 5;
  const replayProgress = Math.min(100, Math.round(metrics.hours_watched / replayGoal * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dashboard$1, { config, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Dashboard | DeliverIQ" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: "hidden",
        animate: "show",
        className: "space-y-8 max-w-[1140px] pb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeIn, custom: 0, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-black text-white tracking-tight leading-none", children: [
                  "Welcome back, ",
                  firstName
                ] }),
                isPro ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C79A4E]/20 to-[#E5C185]/10 text-[10px] font-black text-[#E5C185] uppercase tracking-widest border border-primary/30 shadow-[0_0_15px_rgba(199,154,78,0.1)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3 text-primary" }),
                  " Pro Member"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-muted text-[9px] font-bold text-slate-400 uppercase tracking-wider border border-border/50", children: "Free Account" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-2", children: "Here is your active progress summary and learning schedule for this week." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 bg-card border border-border/60 px-4 py-2 rounded-xl text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Telemetry online" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeIn, custom: 1, className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-b from-card to-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.02] rounded-full blur-2xl group-hover:bg-emerald-500/[0.04] transition-all" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider", children: "Weekly Target" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black text-white tracking-tight", children: [
                    metrics.minutes_attended,
                    "m"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Live interactive room attendance" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-semibold", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400", children: [
                      liveProgress,
                      "% Completed"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500", children: [
                      liveGoal,
                      "m Goal"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500",
                      style: { width: `${liveProgress}%` }
                    }
                  ) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-b from-card to-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.02] rounded-full blur-2xl group-hover:bg-blue-500/[0.04] transition-all" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider", children: "Weekly Target" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-black text-white tracking-tight", children: [
                    Number(metrics.hours_watched).toFixed(1),
                    "h"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Recorded sessions watched" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-semibold", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400", children: [
                      replayProgress,
                      "% Completed"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500", children: [
                      replayGoal,
                      "h Goal"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500",
                      style: { width: `${replayProgress}%` }
                    }
                  ) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-gradient-to-b from-card to-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.02] rounded-full blur-2xl group-hover:bg-purple-500/[0.04] transition-all" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider", children: "Scheduled" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-white tracking-tight", children: registeredSessions.length }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Sessions on your calendar" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/sessions", className: "inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline group/btn", children: [
                  "Manage Schedule",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12, className: "group-hover/btn:translate-x-0.5 transition-transform" })
                ] }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { variants: fadeIn, custom: 2, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { size: 12, className: "text-primary" }),
                    "Your Sessions"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/sessions", className: "text-[11px] text-primary hover:underline font-bold uppercase tracking-wider", children: "Browse All" })
                ] }),
                registeredSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-background border border-dashed border-border rounded-2xl p-10 text-center flex flex-col items-center gap-4 overflow-hidden group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#2C2F38_1px,transparent_1px)] [background-size:16px_16px] opacity-10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 20 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-sm", children: "Agenda empty" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed", children: "Reserve your spot in upcoming live rooms to collaborate and build your skills." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      distExports.Link,
                      {
                        to: "/sessions",
                        className: "inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-primary text-[#0A0B0E] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.12)]",
                        children: [
                          "Find a Live Session ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                        ]
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: registeredSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-background border border-border/60 hover:border-primary/30 rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-200 group",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20", children: session.tag }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white text-sm mt-2 group-hover:text-primary transition-colors truncate", children: session.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-500 mt-1 flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 10, className: "text-slate-600" }),
                          session.date,
                          " · ",
                          session.time
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        JoinCallButton,
                        {
                          sessionId: session.id
                        }
                      )
                    ]
                  },
                  session.id
                )) })
              ] }),
              upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { variants: fadeIn, custom: 3, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold text-slate-400 uppercase tracking-[0.15em]", children: "Recommended For You" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  distExports.Link,
                  {
                    to: `/sessions/${session.id}`,
                    className: "relative bg-background border border-border/60 hover:border-primary/30 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group overflow-hidden",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-[#C79A4E]/[0.01] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20", children: session.tag }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-white text-sm mt-3 mb-1.5 line-clamp-2 leading-snug group-hover:text-primary transition-colors", children: session.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500", children: session.date })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-semibold text-primary mt-5 group-hover:text-white transition-colors", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View Details" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, className: "group-hover:translate-x-0.5 transition-transform" })
                      ] })
                    ]
                  },
                  session.id
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeIn, custom: 2, children: !isPro ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-gradient-to-b from-card to-background border border-primary/20 rounded-2xl p-6 overflow-hidden shadow-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 w-28 h-28 bg-primary/[0.05] rounded-full blur-2xl pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-[9px] font-bold text-primary uppercase tracking-widest mb-4 border border-primary/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                    " Premium Pass"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-extrabold text-white mb-2 tracking-tight", children: "Unlock Platform Access" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mb-6 leading-relaxed", children: "Upgrade to Pro for unlimited interactive session replays, direct instructor templates, and community Discord benefits." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CheckoutButton,
                    {
                      sessionTitle: "DeliverIQ Pro Yearly Subscription",
                      amount: 199,
                      tier: "tier3",
                      label: "Upgrade to Pro",
                      className: "w-full font-bold text-xs h-10 rounded-xl bg-primary text-[#0A0B0E] hover:brightness-115 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.15)]"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-gradient-to-b from-card to-background border border-primary/20 rounded-2xl p-6 overflow-hidden shadow-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 w-28 h-28 bg-primary/[0.05] rounded-full blur-2xl pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-[9px] font-bold text-primary uppercase tracking-widest mb-4 border border-primary/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5" }),
                    " PRO MEMBER"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-extrabold text-white mb-2 tracking-tight", children: "Welcome, Pro!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mb-5 leading-relaxed", children: "You have full access to our complete live archive and templates library." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-4 border-t border-border/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 p-3 rounded-xl bg-card/40 hover:bg-card/80 border border-border/40 hover:border-primary/30 transition-all text-xs text-slate-300 font-medium group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Pro templates library" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12, className: "text-slate-500 group-hover:text-primary transition-colors" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://discord.gg/deliveriq", target: "_blank", rel: "noreferrer", className: "flex items-center gap-3 p-3 rounded-xl bg-card/40 hover:bg-card/80 border border-border/40 hover:border-primary/30 transition-all text-xs text-slate-300 font-medium group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Discord private channel" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12, className: "text-slate-500 group-hover:text-primary transition-colors" })
                    ] })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeIn, custom: 3, className: "bg-background border border-border/60 rounded-2xl p-6 shadow-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4", children: "Quick Links" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: [
                  { icon: Video, label: "Recorded Library", to: "/replays", isLink: true },
                  { icon: CircleHelp, label: "Platform Help Center", to: "#", isLink: false },
                  { icon: Settings, label: "Account Preferences", to: "#", isLink: false }
                ].map((item, i) => {
                  const Icon = item.icon;
                  const cls = "flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-all text-xs text-slate-400 hover:text-white font-semibold group w-full";
                  const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: item.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, className: "text-slate-700 group-hover:text-slate-400 transition-colors" })
                  ] });
                  return item.isLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: item.to, className: cls, children: inner }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.to, className: cls, children: inner }, i);
                }) })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  Dashboard as default
};
