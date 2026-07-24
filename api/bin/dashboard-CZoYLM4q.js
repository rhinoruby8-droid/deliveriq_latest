import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, d as distExports, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, H as Helmet, n as ChevronRight, a as ArrowRight, B as Button, l as fetchMe, o as fetchDashboardData, p as LogOut, q as removeUserToken } from "./entry-server-DNt-2tZu.js";
import { D as Dashboard$1, V as Video, C as CircleHelp } from "./Dashboard-8vzuvKgB.js";
import { C as CheckoutButton } from "./CheckoutButton-BKa_0LKn.js";
import { C as CirclePlay } from "./circle-play-Dr4Zsxqk.js";
import { m as motion } from "./proxy-CvlGsPV1.js";
import { C as Clock } from "./clock-DjiRo04o.js";
import { S as Sparkles } from "./sparkles-Blej2HXW.js";
import { B as BookOpen } from "./book-open-SG1fZ7I5.js";
import { Z as Zap } from "./zap-BCLws2Pz.js";
import { S as Settings } from "./settings-B6AbM4Xb.js";
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
import "async_hooks";
import "./chevron-down-CLkNE7lJ.js";
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-screen bg-[#0A0B0E] flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-10 h-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 border-2 border-[#C79A4E]/10 rounded-full" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 64,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 border-2 border-transparent border-t-[#C79A4E] rounded-full animate-spin" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-slate-500 font-bold tracking-widest uppercase", children: "Loading workspace" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this);
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
      footer: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-slate-500 hover:text-red-400 hover:bg-red-500/5 text-xs h-9 px-3 rounded-lg transition-all duration-200", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "mr-2 h-4 w-4" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 92,
          columnNumber: 11
        }, this),
        " Sign Out"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 91,
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
  const firstName = ((_b = user == null ? void 0 : user.name) == null ? void 0 : _b.split(" ")[0]) || "there";
  const liveGoal = 60;
  const liveProgress = Math.min(100, Math.round(metrics.minutes_attended / liveGoal * 100));
  const replayGoal = 5;
  const replayProgress = Math.min(100, Math.round(metrics.hours_watched / replayGoal * 100));
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dashboard$1, { config, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "Dashboard | DeliverIQ" }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 116,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      motion.div,
      {
        initial: "hidden",
        animate: "show",
        className: "space-y-8 max-w-[1140px] pb-10",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 0, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl font-black text-white tracking-tight leading-none", children: [
                  "Welcome back, ",
                  firstName
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 129,
                  columnNumber: 15
                }, this),
                isPro ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C79A4E]/20 to-[#E5C185]/10 text-[10px] font-black text-[#E5C185] uppercase tracking-widest border border-[#C79A4E]/30 shadow-[0_0_15px_rgba(199,154,78,0.1)]", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-3 h-3 text-[#C79A4E]" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 134,
                    columnNumber: 19
                  }, this),
                  " Pro Member"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 133,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2C2F38] text-[9px] font-bold text-slate-400 uppercase tracking-wider border border-[#2C2F38]/50", children: "Free Account" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 137,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 128,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-slate-500 mt-2", children: "Here is your active progress summary and learning schedule for this week." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 142,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 127,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hidden sm:flex items-center gap-2 bg-[#17191E] border border-[#2C2F38]/60 px-4 py-2 rounded-xl text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 147,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Telemetry online" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 148,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 146,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 126,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 1, className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative overflow-hidden bg-gradient-to-b from-[#17191E] to-[#121318] border border-[#2C2F38]/60 hover:border-[#C79A4E]/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.02] rounded-full blur-2xl group-hover:bg-emerald-500/[0.04] transition-all" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 157,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 161,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 160,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider", children: "Weekly Target" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 163,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 159,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-black text-white tracking-tight", children: [
                    metrics.minutes_attended,
                    "m"
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 168,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 mt-1", children: "Live interactive room attendance" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 169,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 167,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5 pt-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between text-[10px] font-semibold", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-slate-400", children: [
                      liveProgress,
                      "% Completed"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 175,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-slate-500", children: [
                      liveGoal,
                      "m Goal"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 176,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 174,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-1.5 w-full bg-[#2C2F38]/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "div",
                    {
                      className: "h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500",
                      style: { width: `${liveProgress}%` }
                    },
                    void 0,
                    false,
                    {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 179,
                      columnNumber: 19
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 178,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 173,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 166,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 155,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative overflow-hidden bg-gradient-to-b from-[#17191E] to-[#121318] border border-[#2C2F38]/60 hover:border-[#C79A4E]/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.02] rounded-full blur-2xl group-hover:bg-blue-500/[0.04] transition-all" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 191,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 195,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 194,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider", children: "Weekly Target" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 197,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 193,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-black text-white tracking-tight", children: [
                    Number(metrics.hours_watched).toFixed(1),
                    "h"
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 202,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 mt-1", children: "Recorded sessions watched" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 203,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 201,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5 pt-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between text-[10px] font-semibold", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-slate-400", children: [
                      replayProgress,
                      "% Completed"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 209,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-slate-500", children: [
                      replayGoal,
                      "h Goal"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 210,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 208,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-1.5 w-full bg-[#2C2F38]/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "div",
                    {
                      className: "h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500",
                      style: { width: `${replayProgress}%` }
                    },
                    void 0,
                    false,
                    {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 213,
                      columnNumber: 19
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 212,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 207,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 200,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 189,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative overflow-hidden bg-gradient-to-b from-[#17191E] to-[#121318] border border-[#2C2F38]/60 hover:border-[#C79A4E]/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.02] rounded-full blur-2xl group-hover:bg-purple-500/[0.04] transition-all" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 225,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-start mb-6", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 229,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 228,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider", children: "Scheduled" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 231,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 227,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-black text-white tracking-tight", children: registeredSessions.length }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 236,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 mt-1", children: "Sessions on your calendar" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 237,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 235,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "inline-flex items-center gap-1 text-[11px] font-bold text-[#C79A4E] hover:underline group/btn", children: [
                  "Manage Schedule",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 12, className: "group-hover/btn:translate-x-0.5 transition-transform" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 243,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 241,
                  columnNumber: 17
                }, this) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 240,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 234,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 223,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 153,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-3 space-y-8", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.section, { variants: fadeIn, custom: 2, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bookmark, { size: 12, className: "text-[#C79A4E]" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 260,
                      columnNumber: 19
                    }, this),
                    "Your Sessions"
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 259,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "text-[11px] text-[#C79A4E] hover:underline font-bold uppercase tracking-wider", children: "Browse All" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 263,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 258,
                  columnNumber: 15
                }, this),
                registeredSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-[#121318] border border-dashed border-[#2C2F38] rounded-2xl p-10 text-center flex flex-col items-center gap-4 overflow-hidden group", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(#2C2F38_1px,transparent_1px)] [background-size:16px_16px] opacity-10" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 271,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10 flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 rounded-full bg-[#17191E] border border-[#2C2F38] flex items-center justify-center text-slate-500", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 20 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 274,
                      columnNumber: 23
                    }, this) }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 273,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white font-bold text-sm", children: "Agenda empty" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 277,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed", children: "Reserve your spot in upcoming live rooms to collaborate and build your skills." }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 278,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 276,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      distExports.Link,
                      {
                        to: "/sessions",
                        className: "inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-[#C79A4E] text-[#0A0B0E] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.12)]",
                        children: [
                          "Find a Live Session ",
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 13 }, void 0, false, {
                            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                            lineNumber: 286,
                            columnNumber: 43
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 282,
                        columnNumber: 21
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 272,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 269,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: registeredSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "bg-[#121318] border border-[#2C2F38]/60 hover:border-[#C79A4E]/30 rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-200 group",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20", children: session.tag }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 298,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white text-sm mt-2 group-hover:text-[#C79A4E] transition-colors truncate", children: session.title }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 299,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 mt-1 flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 10, className: "text-slate-600" }, void 0, false, {
                            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                            lineNumber: 301,
                            columnNumber: 27
                          }, this),
                          session.date,
                          " · ",
                          session.time
                        ] }, void 0, true, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 300,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 297,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", className: "border-[#2C2F38] text-slate-400 hover:text-white hover:bg-[#1C1E24] cursor-pointer shrink-0 text-xs rounded-lg px-4 h-9", children: "Join Call" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 305,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  session.id,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 293,
                    columnNumber: 21
                  },
                  this
                )) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 291,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 257,
                columnNumber: 13
              }, this),
              upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.section, { variants: fadeIn, custom: 3, className: "space-y-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TrendingUp, { size: 14, className: "text-[#C79A4E]" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 318,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xs font-bold text-slate-400 uppercase tracking-[0.15em]", children: "Recommended For You" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 319,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 317,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  distExports.Link,
                  {
                    to: `/sessions/${session.id}`,
                    className: "relative bg-[#121318] border border-[#2C2F38]/60 hover:border-[#C79A4E]/30 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group overflow-hidden",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-[#C79A4E]/[0.01] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 329,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-[#C79A4E] uppercase tracking-widest bg-[#C79A4E]/10 px-2 py-0.5 rounded-md border border-[#C79A4E]/20", children: session.tag }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 332,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-extrabold text-white text-sm mt-3 mb-1.5 line-clamp-2 leading-snug group-hover:text-[#C79A4E] transition-colors", children: session.title }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 333,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500", children: session.date }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 334,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 331,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1.5 text-xs font-semibold text-[#C79A4E] mt-5 group-hover:text-white transition-colors", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "View Details" }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 338,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 13, className: "group-hover:translate-x-0.5 transition-transform" }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 339,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 337,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  session.id,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 323,
                    columnNumber: 21
                  },
                  this
                )) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 321,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 316,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 254,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2 space-y-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 2, children: !isPro ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-gradient-to-b from-[#17191E] to-[#121318] border border-[#C79A4E]/20 rounded-2xl p-6 overflow-hidden shadow-lg", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -top-10 -right-10 w-28 h-28 bg-[#C79A4E]/[0.05] rounded-full blur-2xl pointer-events-none" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 357,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-md bg-[#C79A4E]/10 px-2.5 py-1 text-[9px] font-bold text-[#C79A4E] uppercase tracking-widest mb-4 border border-[#C79A4E]/20", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 361,
                      columnNumber: 23
                    }, this),
                    " Premium Pass"
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 360,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-extrabold text-white mb-2 tracking-tight", children: "Unlock Platform Access" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 363,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 mb-6 leading-relaxed", children: "Upgrade to Pro for unlimited interactive session replays, direct instructor templates, and community Discord benefits." }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 364,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    CheckoutButton,
                    {
                      sessionTitle: "DeliverIQ Pro Yearly Subscription",
                      amount: 199,
                      tier: "tier3",
                      label: "Upgrade to Pro",
                      className: "w-full font-bold text-xs h-10 rounded-xl bg-[#C79A4E] text-[#0A0B0E] hover:brightness-115 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.15)]"
                    },
                    void 0,
                    false,
                    {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 367,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 359,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 355,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-gradient-to-b from-[#17191E] to-[#121318] border border-[#C79A4E]/20 rounded-2xl p-6 overflow-hidden shadow-lg", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -top-10 -right-10 w-28 h-28 bg-[#C79A4E]/[0.05] rounded-full blur-2xl pointer-events-none" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 378,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-md bg-[#C79A4E]/10 px-2.5 py-1 text-[9px] font-bold text-[#C79A4E] uppercase tracking-widest mb-4 border border-[#C79A4E]/20", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 382,
                      columnNumber: 23
                    }, this),
                    " PRO MEMBER"
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 381,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-extrabold text-white mb-2 tracking-tight", children: "Welcome, Pro!" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 384,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 mb-5 leading-relaxed", children: "You have full access to our complete live archive and templates library." }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 385,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2 pt-4 border-t border-[#2C2F38]/40", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", className: "flex items-center gap-3 p-3 rounded-xl bg-[#1C1D24]/40 hover:bg-[#1C1D24]/80 border border-[#2C2F38]/40 hover:border-[#C79A4E]/30 transition-all text-xs text-slate-300 font-medium group", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookOpen, { className: "w-4 h-4 text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 391,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: "Pro templates library" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 392,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 12, className: "text-slate-500 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 393,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 390,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "https://discord.gg/deliveriq", target: "_blank", rel: "noreferrer", className: "flex items-center gap-3 p-3 rounded-xl bg-[#1C1D24]/40 hover:bg-[#1C1D24]/80 border border-[#2C2F38]/40 hover:border-[#C79A4E]/30 transition-all text-xs text-slate-300 font-medium group", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Zap, { className: "w-4 h-4 text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 396,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: "Discord private channel" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 397,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 12, className: "text-slate-500 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 398,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 395,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 389,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 380,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 377,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 353,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 3, className: "bg-[#121318] border border-[#2C2F38]/60 rounded-2xl p-6 shadow-md", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4", children: "Quick Links" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 408,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1", children: [
                  { icon: Video, label: "Recorded Library", to: "/replays", isLink: true },
                  { icon: CircleHelp, label: "Platform Help Center", to: "#", isLink: false },
                  { icon: Settings, label: "Account Preferences", to: "#", isLink: false }
                ].map((item, i) => {
                  const Icon = item.icon;
                  const cls = "flex items-center gap-3 p-3 rounded-xl hover:bg-[#17191E] transition-all text-xs text-slate-400 hover:text-white font-semibold group w-full";
                  const inner = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "w-4 h-4 text-slate-500 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 419,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: item.label }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 420,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { size: 13, className: "text-slate-700 group-hover:text-slate-400 transition-colors" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 421,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 418,
                    columnNumber: 21
                  }, this);
                  return item.isLink ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: item.to, className: cls, children: inner }, i, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 425,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: item.to, className: cls, children: inner }, i, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 427,
                    columnNumber: 21
                  }, this);
                }) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 409,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 407,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 350,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 251,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 119,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
    lineNumber: 114,
    columnNumber: 5
  }, this);
}
export {
  Dashboard as default
};
