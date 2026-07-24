import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { h as createLucideIcon, d as distExports, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, H as Helmet, a as ArrowRight, B as Button, f as fetchMe, i as fetchDashboardData, k as LogOut, l as removeUserToken } from "./entry-server-DeKfuMuv.js";
import { D as Dashboard$1, V as Video, C as CircleHelp } from "./Dashboard-DHvzKmUE.js";
import { C as Card, f as CheckoutButton } from "./card-CsdYVpMi.js";
import { C as CirclePlay } from "./circle-play-CMMa_r4W.js";
import { m as motion } from "./proxy-CFRrpa9M.js";
import { C as Clock } from "./clock-ME3xfpm1.js";
import { S as Star } from "./star-DrCpUTH2.js";
import { S as Settings } from "./settings-CGvPTYh7.js";
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
import "./chevron-down-BQYrPcoo.js";
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-neutral-900 flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-emerald-400 font-medium", children: "Loading Dashboard..." }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this);
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
          { title: "Dashboard", href: "/dashboard", icon: CirclePlay, active: true },
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
          { title: "Watch Replays", href: "/replays", icon: Video }
        ]
      },
      footer: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-neutral-400 hover:text-white", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "mr-2 h-4 w-4" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        " Sign Out"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 71,
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
      lineNumber: 88,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: "easeOut" },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl font-bold text-white mb-2 font-sans tracking-tight", children: [
              "Welcome back, ",
              (_b = user == null ? void 0 : user.name) == null ? void 0 : _b.split(" ")[0]
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 99,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-400 text-sm", children: "Here's an overview of your learning progress and upcoming sessions." }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 100,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 94,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-slate-900/50 border border-slate-800/80 rounded-xl p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-emerald-500/10 p-3 rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { className: "w-6 h-6 text-emerald-400" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 108,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 107,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Live Minutes" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 111,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-3xl font-extrabold text-white mt-1", children: metrics.minutes_attended }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 112,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 110,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 105,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-slate-900/50 border border-slate-800/80 rounded-xl p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-500/10 p-3 rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-6 h-6 text-blue-400" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 120,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 119,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Replay Hours" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 123,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-3xl font-extrabold text-white mt-1", children: Number(metrics.hours_watched).toFixed(1) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 124,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 122,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 118,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 117,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-slate-900/50 border border-slate-800/80 rounded-xl p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-purple-500/10 p-3 rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { className: "w-6 h-6 text-purple-400" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 132,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 131,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "Registered" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 135,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-3xl font-extrabold text-white mt-1", children: registeredSessions.length }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 136,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 134,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 130,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 129,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2 space-y-8", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-semibold text-white", children: "Your Upcoming Sessions" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 150,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "text-sm text-emerald-400 hover:text-emerald-300 font-medium", children: "Browse All" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 151,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 149,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: registeredSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-400 text-sm max-w-sm", children: "You haven't registered for any upcoming sessions yet." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 157,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/sessions",
                  className: "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded hover:brightness-110 hover:scale-[1.02] transition-all cursor-pointer shadow-lg active:scale-[0.98]",
                  children: [
                    "Find a Session ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 162,
                      columnNumber: 38
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 158,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 156,
              columnNumber: 19
            }, this) : registeredSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 mb-2", children: session.tag }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 169,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-medium text-white text-lg", children: session.title }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 172,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-neutral-400 mt-1", children: [
                  session.date,
                  " • ",
                  session.time,
                  " (",
                  session.duration,
                  ")"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 173,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 168,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", className: "w-full sm:w-auto border-neutral-600 text-neutral-200 hover:bg-neutral-700", children: "Join Call" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 177,
                columnNumber: 23
              }, this)
            ] }, session.id, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 167,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 148,
            columnNumber: 13
          }, this),
          upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-semibold text-white mb-4", children: "Recommended for You" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 189,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-5 hover:border-emerald-500/50 transition-colors", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-medium text-white mb-1 line-clamp-2", children: session.title }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 193,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-neutral-400 mb-4", children: [
                session.tag,
                " • ",
                session.date
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 194,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { asChild: true, size: "sm", variant: "secondary", className: "w-full bg-neutral-700 hover:bg-neutral-600 text-white", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: `/sessions/${session.id}`, children: "View Details" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 196,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 195,
                columnNumber: 23
              }, this)
            ] }, session.id, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 192,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 190,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 188,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
          !((user == null ? void 0 : user.subscription_tier) === "tier3" && (user == null ? void 0 : user.subscription_expires_at) && new Date(user.subscription_expires_at).getTime() > Date.now()) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-[#1A1D24] to-[#C79A4E]/10 border border-[#C79A4E]/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(199,154,78,0.08)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-24 h-24 text-[#C79A4E]" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 212,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 211,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/20 px-2.5 py-0.5 text-xs font-semibold text-[#C79A4E] mb-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Star, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 216,
                  columnNumber: 21
                }, this),
                " PRO"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 215,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-white mb-2 font-sans tracking-tight", children: "Upgrade to Pro" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 218,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-slate-300 mb-6 font-sans", children: "Get unlimited access to all session replays, exclusive templates, and community Discord access." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 219,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                CheckoutButton,
                {
                  sessionTitle: "DeliverIQ Pro Yearly Subscription",
                  amount: 199,
                  tier: "tier3",
                  label: "Upgrade to Pro",
                  className: "w-full font-bold"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 222,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 214,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 210,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-[#1A1D24] to-[#C79A4E]/10 border border-[#C79A4E]/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(199,154,78,0.08)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-24 h-24 text-[#C79A4E]" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 234,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 233,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/20 px-2.5 py-0.5 text-xs font-semibold text-[#C79A4E] mb-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 238,
                  columnNumber: 21
                }, this),
                " PRO MEMBER"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 237,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-white mb-2 font-sans tracking-tight", children: "Welcome, Pro Member!" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 240,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-slate-300 mb-6 font-sans", children: "Thank you for being a Pro subscriber. Enjoy unlimited access to all sessions and recordings." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 241,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 pt-4 border-t border-[#2C2F38]/40", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-xs font-bold text-[#C79A4E] uppercase tracking-wider", children: "Pro Resources" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 245,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "a",
                  {
                    href: "#",
                    className: "flex items-center justify-between p-3 rounded-lg bg-[#21242C]/60 border border-[#2C2F38] hover:border-[#C79A4E]/30 transition-all text-sm text-[#F0EDE8] font-medium",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Exclusive Pro templates" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 250,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14, className: "text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 251,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 246,
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
                    className: "flex items-center justify-between p-3 rounded-lg bg-[#21242C]/60 border border-[#2C2F38] hover:border-[#C79A4E]/30 transition-all text-sm text-[#F0EDE8] font-medium",
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Join Discord Community" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 259,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14, className: "text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 260,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 253,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 244,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 236,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 232,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold text-white mb-4", children: "Resources" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 269,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/replays", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 271,
                  columnNumber: 135
                }, this),
                " Video Library"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 271,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 271,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleHelp, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 272,
                  columnNumber: 127
                }, this),
                " Help Center"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 272,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 272,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 273,
                  columnNumber: 127
                }, this),
                " Account Settings"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 273,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 273,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 270,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 268,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 206,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 142,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
}
export {
  Dashboard as default
};
