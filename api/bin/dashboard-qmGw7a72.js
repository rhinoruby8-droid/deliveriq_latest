import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, d as distExports, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, H as Helmet, a as ArrowRight, B as Button, l as fetchMe, n as fetchDashboardData, o as LogOut, p as removeUserToken } from "./entry-server-DjlAx6AP.js";
import { D as Dashboard$1, V as Video, C as CircleHelp } from "./Dashboard-FJ0Gb7b7.js";
import { C as CheckoutButton } from "./CheckoutButton-BQweZv8s.js";
import { C as CirclePlay } from "./circle-play-DfW_fG8x.js";
import { m as motion } from "./proxy-C0Wzb6uF.js";
import { C as Clock } from "./clock-BRHNqmj9.js";
import { S as Sparkles } from "./sparkles-D0b7HcRN.js";
import { B as BookOpen } from "./book-open-uD59mjyQ.js";
import { Z as Zap } from "./zap-1U33lCwJ.js";
import { S as Settings } from "./settings-BQ4uRIXw.js";
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
import "./chevron-down-CMPfGbLj.js";
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-[#14161B] flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-8 h-8 border-2 border-[#C79A4E]/30 border-t-[#C79A4E] rounded-full animate-spin" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 52,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm text-slate-400 font-medium", children: "Loading Dashboard…" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 53,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 51,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 50,
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
      footer: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-neutral-400 hover:text-white text-xs", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "mr-2 h-3.5 w-3.5" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        " Sign Out"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 77,
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dashboard$1, { config, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "Dashboard | DeliverIQ" }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 94,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 93,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6 max-w-6xl", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: "easeOut" },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-black text-white tracking-tight", children: [
              "Welcome back, ",
              (_b = user == null ? void 0 : user.name) == null ? void 0 : _b.split(" ")[0]
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 105,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-500 text-sm mt-1", children: "Here's an overview of your learning progress and upcoming sessions." }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 108,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 100,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.05 },
          className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] rounded-xl p-5 flex items-center gap-4 hover:border-[#2C2F38]/80 transition-all group", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 123,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 122,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest", children: "Live Minutes" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 126,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-black text-white mt-0.5 leading-none", children: metrics.minutes_attended }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 127,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 125,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 121,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] rounded-xl p-5 flex items-center gap-4 hover:border-[#2C2F38]/80 transition-all group", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-5 h-5 text-blue-400" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 134,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 133,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest", children: "Replay Hours" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 137,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-black text-white mt-0.5 leading-none", children: Number(metrics.hours_watched).toFixed(1) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 138,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 136,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 132,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] rounded-xl p-5 flex items-center gap-4 hover:border-[#2C2F38]/80 transition-all group", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 145,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 144,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest", children: "Registered" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 148,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-black text-white mt-0.5 leading-none", children: registeredSessions.length }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 149,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 147,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 143,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 114,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-3 space-y-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-base font-bold text-white tracking-tight", children: "Your Upcoming Sessions" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "text-[11px] text-[#C79A4E] hover:underline font-bold uppercase tracking-wider", children: "Browse All" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 164,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, this),
            registeredSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-dashed border-[#2C2F38] rounded-xl p-8 text-center flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-10 h-10 rounded-full bg-[#21242C] border border-[#2C2F38] flex items-center justify-center text-slate-500", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 18 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 170,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 169,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-300 font-medium text-sm", children: "No upcoming sessions" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 173,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 mt-0.5 max-w-xs mx-auto", children: "Join interactive live events to collaborate and grow your PM skills." }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 174,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 172,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/sessions",
                  className: "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-lg hover:brightness-110 transition-all mt-1",
                  children: [
                    "Find a Session ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 180,
                      columnNumber: 36
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 176,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 168,
              columnNumber: 17
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: registeredSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "bg-[#1A1D24] border border-[#2C2F38] hover:border-[#C79A4E]/20 transition-all rounded-xl p-4 flex items-center justify-between gap-4 group",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded", children: session.tag }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 192,
                      columnNumber: 27
                    }, this) }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 191,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white text-sm group-hover:text-[#C79A4E] transition-colors truncate", children: session.title }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 194,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 10, className: "text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 196,
                        columnNumber: 27
                      }, this),
                      session.date,
                      " · ",
                      session.time,
                      " (",
                      session.duration,
                      ")"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 195,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 190,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", className: "border-[#2C2F38] text-slate-400 hover:text-white hover:bg-[#2C2F38] cursor-pointer shrink-0 text-xs", children: "Join" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 200,
                    columnNumber: 23
                  }, this)
                ]
              },
              session.id,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 186,
                columnNumber: 21
              },
              this
            )) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 184,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 161,
            columnNumber: 13
          }, this),
          upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-base font-bold text-white mb-4 tracking-tight", children: "Recommended for You" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 212,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "bg-[#1A1D24] border border-[#2C2F38] rounded-xl p-4 hover:border-[#C79A4E]/20 transition-all flex flex-col justify-between group",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-[#C79A4E] uppercase tracking-wider bg-[#C79A4E]/10 px-2 py-0.5 rounded", children: session.tag }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 220,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white text-sm mt-2 mb-1 line-clamp-2 leading-snug group-hover:text-[#C79A4E] transition-colors", children: session.title }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 221,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500", children: [
                      session.date,
                      " · ",
                      session.time || "Time TBC"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 222,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 219,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    distExports.Link,
                    {
                      to: `/sessions/${session.id}`,
                      className: "inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#2C2F38] text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#2C2F38] rounded-lg transition-all w-full mt-4",
                      children: [
                        "View Details ",
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11 }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 228,
                          columnNumber: 38
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 224,
                      columnNumber: 23
                    },
                    this
                  )
                ]
              },
              session.id,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 215,
                columnNumber: 21
              },
              this
            )) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 213,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 211,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2 space-y-5", children: [
          !isPro ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-[#1A1D24] to-[#C79A4E]/8 border border-[#C79A4E]/20 rounded-xl p-5 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -top-4 -right-4 opacity-[0.06]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-28 h-28 text-[#C79A4E]" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 244,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 243,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#C79A4E] uppercase tracking-wider mb-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 248,
                  columnNumber: 21
                }, this),
                " Pro"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 247,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-base font-bold text-white mb-1.5 tracking-tight", children: "Upgrade to Pro" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 250,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 mb-5 leading-relaxed", children: "Unlimited replays, exclusive templates, and Discord community access." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 251,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                CheckoutButton,
                {
                  sessionTitle: "DeliverIQ Pro Yearly Subscription",
                  amount: 199,
                  tier: "tier3",
                  label: "Upgrade to Pro",
                  className: "w-full font-bold text-sm"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 254,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 246,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 242,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-[#1A1D24] to-[#C79A4E]/8 border border-[#C79A4E]/20 rounded-xl p-5 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -top-4 -right-4 opacity-[0.06]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-28 h-28 text-[#C79A4E]" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 266,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 265,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#C79A4E] uppercase tracking-wider mb-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 270,
                  columnNumber: 21
                }, this),
                " Pro Member"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 269,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-base font-bold text-white mb-1.5 tracking-tight", children: "Welcome, Pro Member!" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 272,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 mb-4 leading-relaxed", children: "Enjoy unlimited access to all sessions and recordings." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 273,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2 pt-3 border-t border-[#2C2F38]/40", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: "#",
                    className: "flex items-center justify-between p-2.5 rounded-lg bg-[#21242C]/60 border border-[#2C2F38] hover:border-[#C79A4E]/30 transition-all text-xs text-slate-300 font-medium group",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookOpen, { className: "w-3.5 h-3.5 text-[#C79A4E]" }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 282,
                          columnNumber: 25
                        }, this),
                        "Exclusive Pro templates"
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 281,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-[#C79A4E] opacity-0 group-hover:opacity-100 transition-opacity" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 285,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 277,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: "https://discord.gg/deliveriq",
                    target: "_blank",
                    rel: "noreferrer",
                    className: "flex items-center justify-between p-2.5 rounded-lg bg-[#21242C]/60 border border-[#2C2F38] hover:border-[#C79A4E]/30 transition-all text-xs text-slate-300 font-medium group",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Zap, { className: "w-3.5 h-3.5 text-[#C79A4E]" }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 294,
                          columnNumber: 25
                        }, this),
                        "Join Discord Community"
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 293,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-[#C79A4E] opacity-0 group-hover:opacity-100 transition-opacity" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 297,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 287,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 276,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 268,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 264,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] rounded-xl p-5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3", children: "Resources" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 306,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/replays",
                  className: "flex items-center justify-between p-2.5 rounded-lg hover:bg-[#21242C] transition-all text-xs text-slate-300 font-medium group",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-4 h-4 text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 313,
                        columnNumber: 21
                      }, this),
                      "Video Library"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 312,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-slate-600 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 316,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 308,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: "#",
                  className: "flex items-center justify-between p-2.5 rounded-lg hover:bg-[#21242C] transition-all text-xs text-slate-300 font-medium group",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleHelp, { className: "w-4 h-4 text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 323,
                        columnNumber: 21
                      }, this),
                      "Help Center"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 322,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-slate-600 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 326,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 318,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: "#",
                  className: "flex items-center justify-between p-2.5 rounded-lg hover:bg-[#21242C] transition-all text-xs text-slate-300 font-medium group",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { className: "w-4 h-4 text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 333,
                        columnNumber: 21
                      }, this),
                      "Account Settings"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 332,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-slate-600 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 336,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 328,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 307,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 305,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 238,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 97,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
    lineNumber: 92,
    columnNumber: 5
  }, this);
}
export {
  Dashboard as default
};
