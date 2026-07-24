import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, d as distExports, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, H as Helmet, a as ArrowRight, B as Button, l as fetchMe, n as fetchDashboardData, o as LogOut, p as removeUserToken } from "./entry-server-B6IYLMf8.js";
import { D as Dashboard$1, V as Video, C as CircleHelp } from "./Dashboard-1fwgfWww.js";
import { C as CheckoutButton } from "./CheckoutButton-BE3tQpV7.js";
import { C as CirclePlay } from "./circle-play-CKLViIz3.js";
import { m as motion } from "./proxy-BzXfrR70.js";
import { C as Clock } from "./clock-CPaih7je.js";
import { S as Sparkles } from "./sparkles-D16CksH9.js";
import { B as BookOpen } from "./book-open-DQZbOdHM.js";
import { Z as Zap } from "./zap-B96LG-06.js";
import { S as Settings } from "./settings-CQ51ipNm.js";
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
import "./chevron-down-Bq8PQfsL.js";
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
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.06 }
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-screen bg-[#0F1117] flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-10 h-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 border-2 border-[#C79A4E]/20 rounded-full" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 62,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 border-2 border-transparent border-t-[#C79A4E] rounded-full animate-spin" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 63,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-slate-500 font-medium tracking-wider uppercase", children: "Loading" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 59,
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
      footer: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-slate-500 hover:text-white text-xs h-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "mr-2 h-3.5 w-3.5" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 90,
          columnNumber: 11
        }, this),
        " Sign Out"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 89,
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dashboard$1, { config, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "Dashboard | DeliverIQ" }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 108,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 107,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      motion.div,
      {
        initial: "hidden",
        animate: "show",
        className: "space-y-8 max-w-[1100px]",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 0, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-extrabold text-white tracking-tight", children: [
                "Welcome back, ",
                firstName
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 120,
                columnNumber: 13
              }, this),
              isPro && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C79A4E]/15 text-[10px] font-bold text-[#C79A4E] uppercase tracking-wider border border-[#C79A4E]/20", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-2.5 h-2.5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 125,
                  columnNumber: 17
                }, this),
                " Pro"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 124,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 119,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-slate-500", children: "Your learning dashboard and session hub." }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 129,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 118,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 1, className: "grid grid-cols-3 gap-px bg-[#2C2F38]/50 rounded-2xl overflow-hidden border border-[#2C2F38]/60", children: [
            { label: "Live Minutes", value: metrics.minutes_attended, icon: Clock, color: "emerald" },
            { label: "Replay Hours", value: Number(metrics.hours_watched).toFixed(1), icon: Video, color: "blue" },
            { label: "Registered", value: registeredSessions.length, icon: Calendar, color: "violet" }
          ].map((m, i) => {
            const Icon = m.icon;
            const colorMap = {
              emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
              blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
              violet: "text-violet-400 bg-violet-500/10 border-violet-500/20"
            };
            const cls = colorMap[m.color];
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#13151B] p-5 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center border ${cls} shrink-0`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "w-[18px] h-[18px]" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 149,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 148,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]", children: m.label }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 152,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[22px] font-black text-white leading-none mt-1 tabular-nums", children: m.value }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 153,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 151,
                columnNumber: 17
              }, this)
            ] }, i, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 147,
              columnNumber: 15
            }, this);
          }) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 133,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-3 space-y-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.section, { variants: fadeIn, custom: 2, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-sm font-bold text-white uppercase tracking-wider", children: "Upcoming Sessions" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 169,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "text-[11px] text-[#C79A4E] hover:underline font-semibold uppercase tracking-wider", children: "Browse All" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 170,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 168,
                  columnNumber: 15
                }, this),
                registeredSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-[#13151B] border border-[#2C2F38]/60 rounded-2xl p-8 text-center overflow-hidden group", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-[#C79A4E]/[0.02] via-transparent to-violet-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 176,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10 flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-[#1A1D24] border border-[#2C2F38] flex items-center justify-center text-slate-500", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 20 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 179,
                      columnNumber: 23
                    }, this) }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 178,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white font-semibold text-sm", children: "No upcoming sessions" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 182,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed", children: "Join interactive live events to collaborate with industry experts." }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 183,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 181,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      distExports.Link,
                      {
                        to: "/sessions",
                        className: "inline-flex items-center gap-2 mt-2 px-6 py-2.5 text-sm font-bold bg-[#C79A4E] text-[#0F1117] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(199,154,78,0.15)]",
                        children: [
                          "Find a Session ",
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                            lineNumber: 191,
                            columnNumber: 38
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 187,
                        columnNumber: 21
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 177,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 174,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2.5", children: registeredSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "bg-[#13151B] border border-[#2C2F38]/60 hover:border-[#C79A4E]/15 rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-200 group",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-emerald-400 uppercase tracking-wider", children: session.tag }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 203,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white text-sm mt-0.5 group-hover:text-[#C79A4E] transition-colors truncate", children: session.title }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 204,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 10, className: "text-slate-600" }, void 0, false, {
                            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                            lineNumber: 206,
                            columnNumber: 27
                          }, this),
                          session.date,
                          " · ",
                          session.time
                        ] }, void 0, true, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 205,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 202,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", className: "border-[#2C2F38] text-slate-400 hover:text-white hover:bg-[#1A1D24] cursor-pointer shrink-0 text-[11px] h-8 px-3 rounded-lg", children: "Join" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 210,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  session.id,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 198,
                    columnNumber: 21
                  },
                  this
                )) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 196,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 167,
                columnNumber: 13
              }, this),
              upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.section, { variants: fadeIn, custom: 3, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TrendingUp, { size: 14, className: "text-[#C79A4E]" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 223,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-sm font-bold text-white uppercase tracking-wider", children: "Recommended" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 224,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 222,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  distExports.Link,
                  {
                    to: `/sessions/${session.id}`,
                    className: "bg-[#13151B] border border-[#2C2F38]/60 rounded-xl p-4 hover:border-[#C79A4E]/15 transition-all duration-200 flex flex-col justify-between group",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-[#C79A4E] uppercase tracking-wider", children: session.tag }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 234,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white text-sm mt-1.5 mb-1 line-clamp-2 leading-snug group-hover:text-[#C79A4E] transition-colors", children: session.title }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 235,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500", children: session.date }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 236,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 233,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-[#C79A4E] transition-colors mt-3 font-medium", children: [
                        "View details ",
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11 }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 239,
                          columnNumber: 38
                        }, this)
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 238,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  session.id,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 228,
                    columnNumber: 21
                  },
                  this
                )) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 226,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 221,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 164,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2 space-y-5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 2, children: !isPro ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-[#13151B] border border-[#C79A4E]/15 rounded-2xl p-5 overflow-hidden", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -top-12 -right-12 w-32 h-32 bg-[#C79A4E]/[0.06] rounded-full blur-2xl" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 256,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/10 px-2.5 py-1 text-[10px] font-bold text-[#C79A4E] uppercase tracking-wider mb-3 border border-[#C79A4E]/15", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 259,
                      columnNumber: 23
                    }, this),
                    " Upgrade"
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 258,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-base font-bold text-white mb-1 tracking-tight", children: "Go Pro" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 261,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 mb-5 leading-relaxed", children: "Unlimited replays, exclusive templates, and community access." }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 262,
                    columnNumber: 21
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
                      lineNumber: 265,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 257,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 254,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-[#13151B] border border-[#C79A4E]/15 rounded-2xl p-5 overflow-hidden", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -top-12 -right-12 w-32 h-32 bg-[#C79A4E]/[0.06] rounded-full blur-2xl" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 276,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/10 px-2.5 py-1 text-[10px] font-bold text-[#C79A4E] uppercase tracking-wider mb-3 border border-[#C79A4E]/15", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 279,
                      columnNumber: 23
                    }, this),
                    " Pro Member"
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 278,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-base font-bold text-white mb-1 tracking-tight", children: "Welcome, Pro!" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 281,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 mb-4 leading-relaxed", children: "Full access to all sessions and recordings." }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 282,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5 pt-3 border-t border-[#2C2F38]/40", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", className: "flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#1A1D24] transition-all text-xs text-slate-300 font-medium group", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookOpen, { className: "w-3.5 h-3.5 text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 287,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: "Pro templates" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 288,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-slate-600 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 289,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 286,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "https://discord.gg/deliveriq", target: "_blank", rel: "noreferrer", className: "flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#1A1D24] transition-all text-xs text-slate-300 font-medium group", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Zap, { className: "w-3.5 h-3.5 text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 292,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: "Discord community" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 293,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-slate-600 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 294,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 291,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 285,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 277,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 275,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 252,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 3, className: "bg-[#13151B] border border-[#2C2F38]/60 rounded-2xl p-5", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-3", children: "Quick Links" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 304,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-0.5", children: [
                  { icon: Video, label: "Video Library", to: "/replays", isLink: true },
                  { icon: CircleHelp, label: "Help Center", to: "#", isLink: false },
                  { icon: Settings, label: "Account Settings", to: "#", isLink: false }
                ].map((item, i) => {
                  const Icon = item.icon;
                  const cls = "flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#1A1D24] transition-all text-xs text-slate-400 hover:text-slate-200 font-medium group w-full";
                  const inner = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "w-4 h-4 text-slate-500 group-hover:text-[#C79A4E] transition-colors" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 315,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: item.label }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 316,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11, className: "text-slate-700 group-hover:text-slate-500 transition-colors" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 317,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 314,
                    columnNumber: 21
                  }, this);
                  return item.isLink ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: item.to, className: cls, children: inner }, i, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 321,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: item.to, className: cls, children: inner }, i, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 323,
                    columnNumber: 21
                  }, this);
                }) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 305,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 303,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 249,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 161,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 111,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
    lineNumber: 106,
    columnNumber: 5
  }, this);
}
export {
  Dashboard as default
};
