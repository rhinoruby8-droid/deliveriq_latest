import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, X, a as cn, M as Menu, U as User, L as LogOut, d as distExports, C as Calendar, H as Helmet, f as fetchMe, e as fetchDashboardData, g as removeUserToken } from "./entry-server-CdzZ2syk.js";
import { C as ChevronDown } from "./chevron-down-ClmTSOBP.js";
import { S as Settings } from "./settings-BC_-2VHx.js";
import { C as CirclePlay } from "./circle-play-CGEMY6Bh.js";
import { C as Clock } from "./clock-pE6HbfJx.js";
import { S as Star } from "./star-CSC7aJ8f.js";
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
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bell = createLucideIcon("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }]
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
const Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Video = createLucideIcon("Video", [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
]);
const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full"
};
function Dashboard$1({
  children,
  config = {},
  className
}) {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [userMenuOpen, setUserMenuOpen] = reactExports.useState(false);
  const {
    sidebar = {},
    header = {},
    main = {}
  } = config;
  const {
    logo = { text: "Dashboard" },
    navigation = {},
    footer: sidebarFooter,
    className: sidebarClassName
  } = sidebar;
  const {
    search = { enabled: true, placeholder: "Search..." },
    notifications = { enabled: true, count: 0 },
    user = { name: "User", email: "user@example.com", initials: "U" },
    actions: headerActions,
    className: headerClassName
  } = header;
  const {
    maxWidth = "full",
    padding = true,
    className: mainClassName
  } = main;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex h-screen bg-gray-50/50", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
      sidebarClassName
    ), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-14 items-center justify-between px-4 border-b", children: [
        logo.href ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: logo.href, className: "flex items-center gap-2 font-semibold", children: [
          logo.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo.image, alt: logo.text, className: "h-6 w-6" }),
          logo.text && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: logo.text })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
          logo.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo.image, alt: logo.text, className: "h-6 w-6" }),
          logo.text && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: logo.text })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "lg:hidden",
            onClick: () => setSidebarOpen(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 space-y-1 px-2 py-4 overflow-y-auto", children: [
        navigation.main && navigation.main.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: navigation.main.map((item, index) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: item.href,
              className: cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                item.active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              ),
              children: [
                Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: item.title }),
                item.badge !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-200 px-1 text-xs", children: item.badge })
              ]
            },
            index
          );
        }) }),
        navigation.secondary && navigation.secondary.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: navigation.secondary.map((item, index) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: item.href,
                className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900",
                children: [
                  Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
                ]
              },
              index
            );
          }) })
        ] })
      ] }),
      sidebarFooter && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t p-4", children: sidebarFooter })
    ] }) }),
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/50 lg:hidden",
        onClick: () => setSidebarOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: cn(
        "flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6",
        headerClassName
      ), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "lg:hidden",
            onClick: () => setSidebarOpen(true),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        ),
        search.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "search",
              placeholder: search.placeholder,
              className: "w-full rounded-lg border bg-gray-50 pl-8 pr-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-gray-200"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          headerActions,
          notifications.enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
            notifications.count && notifications.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center", children: notifications.count > 9 ? "9+" : notifications.count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                className: "relative flex items-center gap-2 px-2",
                onClick: () => setUserMenuOpen(!userMenuOpen),
                children: [
                  user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: user.avatar,
                      alt: user.name,
                      className: "h-8 w-8 rounded-full"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium", children: user.initials }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: user.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: user.email })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-gray-500 hidden lg:block" })
                ]
              }
            ),
            userMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "fixed inset-0 z-10",
                  onClick: () => setUserMenuOpen(false)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border bg-white shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-1.5 text-sm text-gray-900", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: user.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500", children: user.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-1 border-t" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                  "Profile"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
                  "Settings"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-4 w-4" }),
                  "Help"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-1 border-t" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                  "Log out"
                ] })
              ] }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn(
        "flex-1 overflow-y-auto",
        padding && "p-4 lg:p-6",
        mainClassName
      ), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
        "mx-auto",
        maxWidthClasses[maxWidth]
      ), children }) })
    ] })
  ] });
}
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-neutral-900 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-emerald-400 font-medium", children: "Loading Dashboard..." }) });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dashboard$1, { config, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Dashboard | DeliverIQ" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold text-white mb-2", children: [
          "Welcome back, ",
          (_b = user == null ? void 0 : user.name) == null ? void 0 : _b.split(" ")[0]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-400", children: "Here's an overview of your learning progress and upcoming sessions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-500/10 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6 text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-400 font-medium", children: "Live Minutes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white", children: metrics.minutes_attended })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-500/10 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-6 h-6 text-blue-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-400 font-medium", children: "Replay Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white", children: Number(metrics.hours_watched).toFixed(1) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-purple-500/10 p-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-6 h-6 text-purple-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-400 font-medium", children: "Registered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white", children: registeredSessions.length })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-white", children: "Your Upcoming Sessions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/sessions", className: "text-sm text-emerald-400 hover:text-emerald-300 font-medium", children: "Browse All" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: registeredSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-8 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-400 mb-4", children: "You haven't registered for any upcoming sessions yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-emerald-500 hover:bg-emerald-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/sessions", children: "Find a Session" }) })
            ] }) : registeredSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 mb-2", children: session.tag }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-white text-lg", children: session.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-neutral-400 mt-1", children: [
                  session.date,
                  " • ",
                  session.time,
                  " (",
                  session.duration,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full sm:w-auto border-neutral-600 text-neutral-200 hover:bg-neutral-700", children: "Join Call" })
            ] }, session.id)) })
          ] }),
          upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-white mb-4", children: "Recommended for You" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-5 hover:border-emerald-500/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-white mb-1 line-clamp-2", children: session.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-neutral-400 mb-4", children: [
                session.tag,
                " • ",
                session.date
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "secondary", className: "w-full bg-neutral-700 hover:bg-neutral-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/sessions/${session.id}`, children: "View Details" }) })
            ] }, session.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-6 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-24 h-24 text-amber-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }),
                " PRO"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Upgrade to Pro" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-300 mb-6", children: "Get unlimited access to all session replays, exclusive templates, and community Discord access." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold", children: "View Plans" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-4", children: "Resources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/replays", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" }),
                " Video Library"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4" }),
                " Help Center"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
                " Account Settings"
              ] }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
