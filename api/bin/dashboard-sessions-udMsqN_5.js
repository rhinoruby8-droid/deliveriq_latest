import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, d as distExports, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, H as Helmet, a as ArrowRight, B as Button, l as fetchMe, o as fetchDashboardData, p as LogOut, q as removeUserToken } from "./entry-server-BzYaCnx0.js";
import { D as Dashboard, V as Video } from "./Dashboard-DBc8SHJd.js";
import { C as CirclePlay } from "./circle-play-BGldtqFk.js";
import { m as motion } from "./proxy-4J_q7BjS.js";
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
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 }
  })
};
function DashboardSessionsPage() {
  var _a;
  const navigate = distExports.useNavigate();
  const [user, setUser] = reactExports.useState(null);
  const [registeredSessions, setRegisteredSessions] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadData() {
      const me = await fetchMe();
      if (!me) {
        navigate("/login");
        return;
      }
      setUser(me);
      const dashboardData = await fetchDashboardData();
      if (dashboardData) {
        setRegisteredSessions(dashboardData.registeredSessions || []);
      }
      setIsLoading(false);
    }
    loadData();
  }, [navigate]);
  if (isLoading) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-screen bg-[#0A0B0E] flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-10 h-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 border-2 border-[#C79A4E]/10 rounded-full" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
          lineNumber: 56,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 border-2 border-transparent border-t-[#C79A4E] rounded-full animate-spin" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
          lineNumber: 57,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-slate-500 font-bold tracking-widest uppercase", children: "Loading your calendar" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
        lineNumber: 59,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
      lineNumber: 54,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
      lineNumber: 53,
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
          { title: "Dashboard", href: "/dashboard", icon: CirclePlay },
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar, active: true },
          { title: "Watch Replays", href: "/replays", icon: Video }
        ]
      },
      footer: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: handleLogout, className: "w-full justify-start text-slate-500 hover:text-red-400 hover:bg-red-500/5 text-xs h-9 px-3 rounded-lg transition-all duration-200", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "mr-2 h-4 w-4" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        " Sign Out"
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
        lineNumber: 81,
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
  const filteredSessions = registeredSessions.filter(
    (session) => {
      var _a2;
      return session.title.toLowerCase().includes(searchQuery.toLowerCase()) || ((_a2 = session.tag) == null ? void 0 : _a2.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dashboard, { config, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "My Sessions | DeliverIQ" }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      motion.div,
      {
        initial: "hidden",
        animate: "show",
        className: "space-y-8 max-w-[1140px] pb-10",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 0, className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl font-black text-white tracking-tight leading-none", children: "My Sessions" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                lineNumber: 114,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-slate-500 mt-2", children: "Browse and join live events you are registered for." }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                lineNumber: 117,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
              lineNumber: 113,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-full sm:w-72", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-slate-500" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                lineNumber: 124,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  placeholder: "Search sessions...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "w-full rounded-xl border border-[#2C2F38] bg-[#121318] pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-[#C79A4E] focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                  lineNumber: 125,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
              lineNumber: 123,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
            lineNumber: 112,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeIn, custom: 1, children: filteredSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative bg-[#121318] border border-dashed border-[#2C2F38] rounded-2xl p-16 text-center flex flex-col items-center gap-4 overflow-hidden group", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(#2C2F38_1px,transparent_1px)] [background-size:16px_16px] opacity-10" }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
              lineNumber: 139,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10 flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 rounded-full bg-[#17191E] border border-[#2C2F38] flex items-center justify-center text-slate-500", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 20 }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                lineNumber: 142,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                lineNumber: 141,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-white font-bold text-sm", children: searchQuery ? "No matching sessions found" : "No registered sessions" }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                  lineNumber: 145,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500 mt-1 max-w-[340px] mx-auto leading-relaxed", children: searchQuery ? "Try refining your search keyword or tag to find your session." : "You haven't reserved a spot in any upcoming live rooms yet. View our catalog of expert sessions." }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                  lineNumber: 148,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                lineNumber: 144,
                columnNumber: 17
              }, this),
              !searchQuery && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                distExports.Link,
                {
                  to: "/sessions",
                  className: "inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-[#C79A4E] text-[#0A0B0E] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.12)]",
                  children: [
                    "Browse Catalog ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 13 }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 160,
                      columnNumber: 36
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                  lineNumber: 156,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
              lineNumber: 140,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
            lineNumber: 138,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: filteredSessions.map((session, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            motion.div,
            {
              variants: fadeIn,
              custom: index + 2,
              className: "bg-[#121318] border border-[#2C2F38]/60 hover:border-[#C79A4E]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-md",
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-[#C79A4E]/[0.01] rounded-full blur-2xl group-hover:bg-[#C79A4E]/[0.03] transition-all" }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                  lineNumber: 174,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-3.5", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20", children: session.tag || "LIVE SESSION" }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 178,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-slate-500 font-semibold", children: session.duration || "90 mins" }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 181,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                    lineNumber: 177,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-extrabold text-white text-base leading-snug group-hover:text-[#C79A4E] transition-colors mb-2", children: session.title }, void 0, false, {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                    lineNumber: 184,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4", children: session.description || "Join live to collaborate with other project managers and master AI application in real workflows." }, void 0, false, {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                    lineNumber: 187,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                  lineNumber: 176,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-4 border-t border-[#2C2F38]/40 mt-2 flex flex-col sm:flex-row items-center gap-3", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-left w-full sm:w-auto flex-1", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider", children: "Schedule" }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 194,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs font-semibold text-slate-300 mt-0.5", children: [
                      session.date,
                      " ",
                      session.time && `· ${session.time}`
                    ] }, void 0, true, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 195,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                    lineNumber: 193,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 w-full sm:w-auto shrink-0", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { asChild: true, variant: "outline", size: "sm", className: "border-[#2C2F38] text-slate-400 hover:text-white hover:bg-[#1C1E24] cursor-pointer text-xs h-9 rounded-xl flex-1 sm:flex-none", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: `/sessions/${session.id}`, children: "Details" }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 202,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 201,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { asChild: true, size: "sm", className: "bg-[#C79A4E] text-[#0A0B0E] hover:brightness-110 cursor-pointer text-xs font-bold h-9 rounded-xl flex-1 sm:flex-none", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", className: "inline-flex items-center gap-1", children: [
                      "Join Call ",
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ExternalLink, { size: 11 }, void 0, false, {
                        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                        lineNumber: 208,
                        columnNumber: 37
                      }, this)
                    ] }, void 0, true, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 207,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                      lineNumber: 206,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                    lineNumber: 200,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
                  lineNumber: 192,
                  columnNumber: 19
                }, this)
              ]
            },
            session.id,
            true,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
              lineNumber: 168,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
            lineNumber: 166,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
            lineNumber: 136,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
        lineNumber: 106,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/dashboard-sessions.tsx",
    lineNumber: 101,
    columnNumber: 5
  }, this);
}
export {
  DashboardSessionsPage as default
};
