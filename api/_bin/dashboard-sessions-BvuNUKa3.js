import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { l as createLucideIcon, d as distExports, r as reactExports, j as jsxRuntimeExports, C as Calendar, H as Helmet, a as ArrowRight, B as Button, k as fetchMe, n as fetchDashboardData, o as LogOut, p as removeUserToken } from "./entry-server-CO9Km2vr.js";
import { D as Dashboard, V as Video } from "./Dashboard-l1AW9gE7.js";
import { J as JoinCallButton } from "./JoinCallButton-1SHFv1Jr.js";
import { C as CirclePlay } from "./circle-play-Bmz6iiLZ.js";
import { m as motion } from "./proxy-DJyDVOIo.js";
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-10 h-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-2 border-primary/10 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-2 border-transparent border-t-[#C79A4E] rounded-full animate-spin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 font-bold tracking-widest uppercase", children: "Loading your calendar" })
    ] }) });
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
  const filteredSessions = registeredSessions.filter(
    (session) => {
      var _a2;
      return session.title.toLowerCase().includes(searchQuery.toLowerCase()) || ((_a2 = session.tag) == null ? void 0 : _a2.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dashboard, { config, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "My Sessions | DeliverIQ" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: "hidden",
        animate: "show",
        className: "space-y-8 max-w-[1140px] pb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeIn, custom: 0, className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-black text-white tracking-tight leading-none", children: "My Sessions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-2", children: "Browse and join live events you are registered for." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-slate-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search sessions...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeIn, custom: 1, children: filteredSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-background border border-dashed border-border rounded-2xl p-16 text-center flex flex-col items-center gap-4 overflow-hidden group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#2C2F38_1px,transparent_1px)] [background-size:16px_16px] opacity-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 20 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm", children: searchQuery ? "No matching sessions found" : "No registered sessions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1 max-w-[340px] mx-auto leading-relaxed", children: searchQuery ? "Try refining your search keyword or tag to find your session." : "You haven't reserved a spot in any upcoming live rooms yet. View our catalog of expert sessions." })
              ] }),
              !searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                distExports.Link,
                {
                  to: "/sessions",
                  className: "inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-primary text-[#0A0B0E] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.12)]",
                  children: [
                    "Browse Catalog ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                  ]
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: filteredSessions.map((session, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: fadeIn,
              custom: index + 2,
              className: "bg-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-primary/[0.01] rounded-full blur-2xl group-hover:bg-primary/[0.03] transition-all" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-3.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20", children: session.tag || "LIVE SESSION" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 font-semibold", children: session.duration || "90 mins" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-white text-base leading-snug group-hover:text-primary transition-colors mb-2", children: session.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4", children: session.description || "Join live to collaborate with other project managers and master AI application in real workflows." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border/40 mt-2 flex flex-col sm:flex-row items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left w-full sm:w-auto flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider", children: "Schedule" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-slate-300 mt-0.5", children: [
                      session.date,
                      " ",
                      session.time && `· ${session.time}`
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full sm:w-auto shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "border-border text-slate-400 hover:text-white hover:bg-card cursor-pointer text-xs h-9 rounded-xl flex-1 sm:flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/sessions/${session.id}`, children: "Details" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      JoinCallButton,
                      {
                        sessionId: session.id,
                        size: "sm",
                        className: "bg-primary text-[#0A0B0E] hover:brightness-110 cursor-pointer text-xs font-bold h-9 rounded-xl flex-1 sm:flex-none"
                      }
                    )
                  ] })
                ] })
              ]
            },
            session.id
          )) }) })
        ]
      }
    )
  ] });
}
export {
  DashboardSessionsPage as default
};
