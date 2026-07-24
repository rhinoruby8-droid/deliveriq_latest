import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, d as distExports, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, H as Helmet, a as ArrowRight, B as Button, l as fetchMe, n as fetchDashboardData, o as LogOut, p as removeUserToken } from "./entry-server-N_NkPU1k.js";
import { D as Dashboard$1, V as Video, C as CircleHelp } from "./Dashboard-DviSYaHy.js";
import { C as Card, f as CheckoutButton } from "./card-XxD9aIEB.js";
import { C as CirclePlay } from "./circle-play-DizSTVdm.js";
import { m as motion } from "./proxy-BP5ZUg5g.js";
import { C as Clock } from "./clock-B29LJY7Q.js";
import { S as Star } from "./star-CQF99LUe.js";
import { S as Settings } from "./settings-BCm9WUs7.js";
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
import "./chevron-down-H82gZ7Xb.js";
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
          className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2C2F38]/40",
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl font-black text-white mb-1.5 tracking-tight font-sans", children: [
              "Welcome back, ",
              (_b = user == null ? void 0 : user.name) == null ? void 0 : _b.split(" ")[0]
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 101,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-400 text-sm", children: "Here's an overview of your learning progress and upcoming sessions." }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 102,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 100,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 94,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-[#1A1D24]/60 border border-[#2C2F38] rounded-xl p-6 hover:border-[#C79A4E]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(199,154,78,0.05)] relative overflow-hidden group", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 109,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4 relative z-10", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-emerald-500/10 p-3.5 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { className: "w-6 h-6 text-emerald-400" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 112,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 111,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Live Minutes" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 115,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-3xl font-black text-white mt-1.5 tracking-tight font-sans", children: metrics.minutes_attended }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 116,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "● Active session tracking" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 118,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 117,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 114,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 110,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 108,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-[#1A1D24]/60 border border-[#2C2F38] rounded-xl p-6 hover:border-[#C79A4E]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(199,154,78,0.05)] relative overflow-hidden group", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 125,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4 relative z-10", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-500/10 p-3.5 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-6 h-6 text-blue-400" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 128,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 127,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Replay Hours" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 131,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-3xl font-black text-white mt-1.5 tracking-tight font-sans", children: Number(metrics.hours_watched).toFixed(1) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 132,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-blue-400 font-semibold mt-1 flex items-center gap-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "● Recorded play sessions" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 134,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 133,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 130,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 126,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 124,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-[#1A1D24]/60 border border-[#2C2F38] rounded-xl p-6 hover:border-[#C79A4E]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(199,154,78,0.05)] relative overflow-hidden group", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4 relative z-10", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-purple-500/10 p-3.5 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/20 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { className: "w-6 h-6 text-purple-400" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 144,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 143,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Registered" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 147,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-3xl font-black text-white mt-1.5 tracking-tight font-sans", children: registeredSessions.length }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 148,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-purple-400 font-semibold mt-1 flex items-center gap-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "● Upcoming live events" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 149,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 146,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 140,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2 space-y-8", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-white font-sans tracking-tight", children: "Your Upcoming Sessions" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 165,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "text-xs text-[#C79A4E] hover:underline font-bold tracking-wider uppercase", children: "Browse All" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 166,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: registeredSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24]/40 border border-dashed border-[#2C2F38] rounded-xl p-10 text-center flex flex-col items-center justify-center gap-4 shadow-inner relative overflow-hidden group", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent to-[#C79A4E]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 172,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 rounded-full bg-slate-900/80 border border-[#2C2F38] flex items-center justify-center text-slate-400 mb-2 relative z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 20 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 174,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 173,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-300 font-medium text-sm max-w-sm relative z-10", children: "You haven't registered for any upcoming sessions yet." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 176,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 max-w-xs -mt-2 relative z-10", children: "Join our upcoming interactive live events to collaborate and grow your PM skills." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 177,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/sessions",
                  className: "inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded hover:brightness-110 hover:scale-[1.02] transition-all cursor-pointer shadow-lg active:scale-[0.98] mt-2 relative z-10",
                  children: [
                    "Find a Session ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 182,
                      columnNumber: 38
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 178,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 171,
              columnNumber: 19
            }, this) : registeredSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "bg-[#1A1D24]/60 border border-[#2C2F38] hover:border-[#C79A4E]/20 transition-all duration-300 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center rounded-sm bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2", children: session.tag }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 192,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white text-base group-hover:text-[#C79A4E] transition-colors", children: session.title }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 195,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 mt-1 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 12, className: "text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 197,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                        session.date,
                        " · ",
                        session.time,
                        " (",
                        session.duration,
                        ")"
                      ] }, void 0, true, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 198,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 196,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 191,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", className: "w-full sm:w-auto border-[#2C2F38] text-slate-300 hover:text-white hover:bg-[#2C2F38] cursor-pointer shrink-0", children: "Join Call" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 201,
                    columnNumber: 23
                  }, this)
                ]
              },
              session.id,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 187,
                columnNumber: 21
              },
              this
            )) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 169,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-white mb-5 font-sans tracking-tight", children: "Recommended for You" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 213,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "bg-[#1A1D24]/60 border border-[#2C2F38] rounded-xl p-5 hover:border-[#C79A4E]/30 hover:shadow-[0_0_20px_rgba(199,154,78,0.04)] transition-all duration-300 flex flex-col justify-between group",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center rounded-sm bg-[#C79A4E]/10 px-2 py-0.5 text-[10px] font-bold text-[#C79A4E] uppercase tracking-wider mb-3", children: session.tag }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 221,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white mb-2 line-clamp-2 text-sm leading-snug group-hover:text-[#C79A4E] transition-colors", children: session.title }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 224,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-400 mb-4", children: [
                      session.date,
                      " · ",
                      session.time || "Time TBC"
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 225,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 220,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    distExports.Link,
                    {
                      to: `/sessions/${session.id}`,
                      className: "inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-[#2C2F38] text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#2C2F38] rounded-sm transition-all text-center w-full",
                      children: [
                        "View Details ",
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 12 }, void 0, false, {
                          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                          lineNumber: 231,
                          columnNumber: 38
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 227,
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
                lineNumber: 216,
                columnNumber: 21
              },
              this
            )) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 214,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 212,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 160,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
          !((user == null ? void 0 : user.subscription_tier) === "tier3" && (user == null ? void 0 : user.subscription_expires_at) && new Date(user.subscription_expires_at).getTime() > Date.now()) ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-[#1A1D24] to-[#C79A4E]/10 border border-[#C79A4E]/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(199,154,78,0.08)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-24 h-24 text-[#C79A4E]" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 247,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 246,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/20 px-2.5 py-0.5 text-xs font-semibold text-[#C79A4E] mb-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Star, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 251,
                  columnNumber: 21
                }, this),
                " PRO"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 250,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-white mb-2 font-sans tracking-tight", children: "Upgrade to Pro" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 253,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-slate-300 mb-6 font-sans", children: "Get unlimited access to all session replays, exclusive templates, and community Discord access." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 254,
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
                  lineNumber: 257,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 249,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 245,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-[#1A1D24] to-[#C79A4E]/10 border border-[#C79A4E]/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(199,154,78,0.08)]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-24 h-24 text-[#C79A4E]" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 269,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 268,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-[#C79A4E]/20 px-2.5 py-0.5 text-xs font-semibold text-[#C79A4E] mb-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 273,
                  columnNumber: 21
                }, this),
                " PRO MEMBER"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 272,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-white mb-2 font-sans tracking-tight", children: "Welcome, Pro Member!" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 275,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-slate-300 mb-6 font-sans", children: "Thank you for being a Pro subscriber. Enjoy unlimited access to all sessions and recordings." }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 276,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 pt-4 border-t border-[#2C2F38]/40", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-xs font-bold text-[#C79A4E] uppercase tracking-wider", children: "Pro Resources" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 280,
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
                        lineNumber: 285,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14, className: "text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 286,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 281,
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
                        lineNumber: 294,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14, className: "text-[#C79A4E]" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 295,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                    lineNumber: 288,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 279,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 271,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 267,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24]/60 border border-[#2C2F38] rounded-xl p-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-white mb-4 text-xs font-sans uppercase tracking-widest text-slate-400", children: "Resources" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 304,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/replays",
                  className: "flex items-center justify-between p-3 rounded-lg bg-[#21242C]/40 border border-[#2C2F38] hover:border-[#C79A4E]/30 hover:bg-[#1A1D24]/40 transition-all text-xs text-slate-300 font-medium group",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-4 h-4 text-[#C79A4E] group-hover:scale-105 transition-transform" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 311,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Video Library" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 312,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 310,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 12, className: "text-[#C79A4E] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 314,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 306,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: "#",
                  className: "flex items-center justify-between p-3 rounded-lg bg-[#21242C]/40 border border-[#2C2F38] hover:border-[#C79A4E]/30 hover:bg-[#1A1D24]/40 transition-all text-xs text-slate-300 font-medium group",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleHelp, { className: "w-4 h-4 text-[#C79A4E] group-hover:scale-105 transition-transform" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 322,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Help Center" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 323,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 321,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 12, className: "text-[#C79A4E] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 325,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 317,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: "#",
                  className: "flex items-center justify-between p-3 rounded-lg bg-[#21242C]/40 border border-[#2C2F38] hover:border-[#C79A4E]/30 hover:bg-[#1A1D24]/40 transition-all text-xs text-slate-300 font-medium group",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { className: "w-4 h-4 text-[#C79A4E] group-hover:scale-105 transition-transform" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 333,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Account Settings" }, void 0, false, {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                        lineNumber: 334,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                      lineNumber: 332,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 12, className: "text-[#C79A4E] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" }, void 0, false, {
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
          lineNumber: 241,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 157,
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
