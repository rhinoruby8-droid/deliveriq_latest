import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, B as Button, X, b as cn, M as Menu, U as User, L as LogOut, d as distExports, C as Calendar, H as Helmet, f as fetchMe, g as fetchDashboardData, h as removeUserToken } from "./entry-server-CcnwSHyK.js";
import { C as ChevronDown } from "./chevron-down-C9OcKlZC.js";
import { S as Settings } from "./settings-ChtE7lc2.js";
import { C as CirclePlay } from "./circle-play-DbfNr6Jl.js";
import { C as Clock } from "./clock-BS0WKn9g.js";
import { S as Star } from "./star-BCiFGJli.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex h-screen bg-gray-50/50", className), children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("aside", { className: cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
      sidebarClassName
    ), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-14 items-center justify-between px-4 border-b", children: [
        logo.href ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: logo.href, className: "flex items-center gap-2 font-semibold", children: [
          logo.image && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: logo.image, alt: logo.text, className: "h-6 w-6" }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 129,
            columnNumber: 19
          }, this),
          logo.text && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: logo.text }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 131,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 127,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 font-semibold", children: [
          logo.image && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: logo.image, alt: logo.text, className: "h-6 w-6" }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 136,
            columnNumber: 19
          }, this),
          logo.text && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: logo.text }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 138,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 134,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "lg:hidden",
            onClick: () => setSidebarOpen(false),
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { className: "h-4 w-4" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 147,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 141,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 125,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex-1 space-y-1 px-2 py-4 overflow-y-auto", children: [
        navigation.main && navigation.main.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1", children: navigation.main.map((item, index) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: item.href,
              className: cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                item.active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              ),
              children: [
                Icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "h-4 w-4" }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 168,
                  columnNumber: 32
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: item.title }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 169,
                  columnNumber: 23
                }, this),
                item.badge !== void 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-200 px-1 text-xs", children: item.badge }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 171,
                  columnNumber: 25
                }, this)
              ]
            },
            index,
            true,
            {
              fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 158,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, false, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 154,
          columnNumber: 15
        }, this),
        navigation.secondary && navigation.secondary.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-4 border-t" }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 183,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1", children: navigation.secondary.map((item, index) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "a",
              {
                href: item.href,
                className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900",
                children: [
                  Icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 193,
                    columnNumber: 34
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: item.title }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 194,
                    columnNumber: 25
                  }, this)
                ]
              },
              index,
              true,
              {
                fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 188,
                columnNumber: 23
              },
              this
            );
          }) }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 182,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 152,
        columnNumber: 11
      }, this),
      sidebarFooter && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t p-4", children: sidebarFooter }, void 0, false, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 205,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
      lineNumber: 123,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, this),
    sidebarOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/50 lg:hidden",
        onClick: () => setSidebarOpen(false)
      },
      void 0,
      false,
      {
        fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 214,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: cn(
        "flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6",
        headerClassName
      ), children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "lg:hidden",
            onClick: () => setSidebarOpen(true),
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Menu, { className: "h-5 w-5" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 234,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 228,
            columnNumber: 11
          },
          this
        ),
        search.enabled && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 241,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "search",
              placeholder: search.placeholder,
              className: "w-full rounded-lg border bg-gray-50 pl-8 pr-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-gray-200"
            },
            void 0,
            false,
            {
              fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 242,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 240,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 239,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-auto flex items-center gap-2", children: [
          headerActions,
          notifications.enabled && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "icon", className: "relative", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bell, { className: "h-4 w-4" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 258,
              columnNumber: 17
            }, this),
            notifications.count && notifications.count > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center", children: notifications.count > 9 ? "9+" : notifications.count }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 260,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 257,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                variant: "ghost",
                className: "relative flex items-center gap-2 px-2",
                onClick: () => setUserMenuOpen(!userMenuOpen),
                children: [
                  user.avatar ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "img",
                    {
                      src: user.avatar,
                      alt: user.name,
                      className: "h-8 w-8 rounded-full"
                    },
                    void 0,
                    false,
                    {
                      fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                      lineNumber: 275,
                      columnNumber: 19
                    },
                    this
                  ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium", children: user.initials }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 281,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hidden lg:block text-left", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-medium", children: user.name }, void 0, false, {
                      fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                      lineNumber: 286,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-gray-500", children: user.email }, void 0, false, {
                      fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                      lineNumber: 287,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 285,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { className: "h-4 w-4 text-gray-500 hidden lg:block" }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 289,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 269,
                columnNumber: 15
              },
              this
            ),
            userMenuOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  className: "fixed inset-0 z-10",
                  onClick: () => setUserMenuOpen(false)
                },
                void 0,
                false,
                {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 295,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border bg-white shadow-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-2 py-1.5 text-sm text-gray-900", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: user.name }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 302,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-gray-500", children: user.email }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 303,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 301,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-1 border-t" }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 305,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(User, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 307,
                    columnNumber: 25
                  }, this),
                  "Profile"
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 306,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 311,
                    columnNumber: 25
                  }, this),
                  "Settings"
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 310,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleHelp, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 315,
                    columnNumber: 25
                  }, this),
                  "Help"
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 314,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-1 border-t" }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 318,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 320,
                    columnNumber: 25
                  }, this),
                  "Log out"
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 319,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 300,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 299,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 294,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 268,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 252,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 223,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: cn(
        "flex-1 overflow-y-auto",
        padding && "p-4 lg:p-6",
        mainClassName
      ), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn(
        "mx-auto",
        maxWidthClasses[maxWidth]
      ), children }, void 0, false, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 337,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 332,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
      lineNumber: 221,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-neutral-900 flex items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-emerald-400 font-medium", children: "Loading Dashboard..." }, void 0, false, {
      fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 35,
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
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        " Sign Out"
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 57,
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
      fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl font-bold text-white mb-2", children: [
          "Welcome back, ",
          (_b = user == null ? void 0 : user.name) == null ? void 0 : _b.split(" ")[0]
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-neutral-400", children: "Here's an overview of your learning progress and upcoming sessions." }, void 0, false, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-emerald-500/10 p-3 rounded-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { className: "w-6 h-6 text-emerald-400" }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 90,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 89,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-neutral-400 font-medium", children: "Live Minutes" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 93,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-bold text-white", children: metrics.minutes_attended }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 94,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 92,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 88,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 87,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-blue-500/10 p-3 rounded-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-6 h-6 text-blue-400" }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 102,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 101,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-neutral-400 font-medium", children: "Replay Hours" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 105,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-bold text-white", children: Number(metrics.hours_watched).toFixed(1) }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 106,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 104,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 100,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-purple-500/10 p-3 rounded-lg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { className: "w-6 h-6 text-purple-400" }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 114,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 113,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-neutral-400 font-medium", children: "Registered" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 117,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-bold text-white", children: registeredSessions.length }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 118,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 116,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 112,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 111,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2 space-y-8", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-semibold text-white", children: "Your Upcoming Sessions" }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 132,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "text-sm text-emerald-400 hover:text-emerald-300 font-medium", children: "Browse All" }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 133,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 131,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: registeredSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-8 text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-neutral-400 mb-4", children: "You haven't registered for any upcoming sessions yet." }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 139,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { asChild: true, className: "bg-emerald-500 hover:bg-emerald-600", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", children: "Find a Session" }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 141,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 140,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 138,
              columnNumber: 19
            }, this) : registeredSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 mb-2", children: session.tag }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 148,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-medium text-white text-lg", children: session.title }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 151,
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
                  fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 152,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 147,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", className: "w-full sm:w-auto border-neutral-600 text-neutral-200 hover:bg-neutral-700", children: "Join Call" }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 156,
                columnNumber: 23
              }, this)
            ] }, session.id, true, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 146,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, this),
          upcomingOpportunities.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-semibold text-white mb-4", children: "Recommended for You" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 168,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: upcomingOpportunities.slice(0, 4).map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-5 hover:border-emerald-500/50 transition-colors", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-medium text-white mb-1 line-clamp-2", children: session.title }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 172,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-neutral-400 mb-4", children: [
                session.tag,
                " • ",
                session.date
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 173,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { asChild: true, size: "sm", variant: "secondary", className: "w-full bg-neutral-700 hover:bg-neutral-600 text-white", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: `/sessions/${session.id}`, children: "View Details" }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 175,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 174,
                columnNumber: 23
              }, this)
            ] }, session.id, true, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 171,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 169,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 167,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-6 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Crown, { className: "w-24 h-24 text-amber-500" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 190,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 189,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 mb-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Star, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 194,
                  columnNumber: 19
                }, this),
                " PRO"
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 193,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-white mb-2", children: "Upgrade to Pro" }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 196,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-neutral-300 mb-6", children: "Get unlimited access to all session replays, exclusive templates, and community Discord access." }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 197,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { className: "w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold", children: "View Plans" }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 200,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 192,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 188,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold text-white mb-4", children: "Resources" }, void 0, false, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 208,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/replays", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 210,
                  columnNumber: 135
                }, this),
                " Video Library"
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 210,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 210,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleHelp, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 211,
                  columnNumber: 127
                }, this),
                " Help Center"
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 211,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 211,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", className: "text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                  lineNumber: 212,
                  columnNumber: 127
                }, this),
                " Account Settings"
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 212,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
                lineNumber: 212,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
              lineNumber: 209,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
            lineNumber: 207,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
          lineNumber: 185,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ/DeliverIQ/src/pages/dashboard.tsx",
    lineNumber: 72,
    columnNumber: 5
  }, this);
}
export {
  Dashboard as default
};
