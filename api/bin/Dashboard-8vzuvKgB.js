import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, B as Button, X, v as cn, w as Menu, U as User, p as LogOut } from "./entry-server-DNt-2tZu.js";
import { C as ChevronDown } from "./chevron-down-CLkNE7lJ.js";
import { S as Settings } from "./settings-B6AbM4Xb.js";
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
function Dashboard({
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex h-screen overflow-hidden bg-[#14161B] text-[#F0EDE8]", className), children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("aside", { className: cn(
      "fixed inset-y-0 left-0 z-50 w-56 bg-[#1A1D24] border-r border-[#2C2F38] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
      sidebarClassName
    ), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-14 items-center justify-between px-4 border-b border-[#2C2F38]", children: [
        logo.href ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: logo.href, className: "flex items-center gap-2 font-semibold text-sm", children: [
          logo.image && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: logo.image, alt: logo.text, className: "h-5 w-5" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 130,
            columnNumber: 19
          }, this),
          logo.text && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: logo.text }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 132,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 128,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 font-semibold text-sm", children: [
          logo.image && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: logo.image, alt: logo.text, className: "h-5 w-5" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 137,
            columnNumber: 19
          }, this),
          logo.text && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: logo.text }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 139,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 135,
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
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 148,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 142,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "flex-1 space-y-1 px-2 py-4 overflow-y-auto", children: [
        navigation.main && navigation.main.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-0.5", children: navigation.main.map((item, index) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: item.href,
              className: cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border",
                item.active ? "bg-[#C79A4E]/10 text-[#C79A4E] border-[#C79A4E]/30" : "text-[#8A8D96] border-transparent hover:bg-[#1A1D24]/50 hover:text-[#F0EDE8]"
              ),
              children: [
                Icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "h-4 w-4" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 169,
                  columnNumber: 32
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: item.title }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 170,
                  columnNumber: 23
                }, this),
                item.badge !== void 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#2C2F38] border border-[#2C2F38]/40 px-1 text-xs text-[#8A8D96]", children: item.badge }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 172,
                  columnNumber: 25
                }, this)
              ]
            },
            index,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 159,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 155,
          columnNumber: 15
        }, this),
        navigation.secondary && navigation.secondary.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-4 border-t border-[#2C2F38]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1", children: navigation.secondary.map((item, index) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "a",
              {
                href: item.href,
                className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#8A8D96] transition-colors hover:bg-[#1A1D24]/50 hover:text-[#F0EDE8]",
                children: [
                  Icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 194,
                    columnNumber: 34
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: item.title }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 195,
                    columnNumber: 25
                  }, this)
                ]
              },
              index,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 189,
                columnNumber: 23
              },
              this
            );
          }) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 185,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 183,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this),
      sidebarFooter && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-[#2C2F38] p-3 text-xs text-[#8A8D96]", children: sidebarFooter }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 206,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
      lineNumber: 119,
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
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 215,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-1 flex-col min-w-0 overflow-hidden relative bg-[#14161B] text-[#F0EDE8]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.15) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 224,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.03) 0%, transparent 70%)"
      } }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 228,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: cn(
        "flex h-14 items-center gap-4 border-b border-[#2C2F38] bg-[#1A1D24]/90 backdrop-blur-md px-4 lg:px-6 relative z-10 flex-shrink-0",
        headerClassName
      ), children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "lg:hidden text-[#8A8D96] hover:text-[#F0EDE8] hover:bg-[#2C2F38]/50",
            onClick: () => setSidebarOpen(true),
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Menu, { className: "h-5 w-5" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 244,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 238,
            columnNumber: 11
          },
          this
        ),
        search.enabled && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 max-w-md", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-[#8A8D96]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 251,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "search",
              placeholder: search.placeholder,
              className: "w-full rounded-lg border border-[#2C2F38] bg-[#14161B] pl-8 pr-3 py-2 text-sm text-[#F0EDE8] outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]/30 placeholder:text-[#8A8D96]"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 252,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 250,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 249,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-auto flex items-center gap-2", children: [
          headerActions,
          notifications.enabled && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "icon", className: "relative text-[#8A8D96] hover:text-[#F0EDE8] hover:bg-[#2C2F38]/50", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bell, { className: "h-4 w-4" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 268,
              columnNumber: 17
            }, this),
            notifications.count && notifications.count > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#C79A4E] text-[10px] font-bold text-[#1A1D24] flex items-center justify-center", children: notifications.count > 9 ? "9+" : notifications.count }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 270,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 267,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                variant: "ghost",
                className: "relative flex items-center gap-2 px-2 text-[#8A8D96] hover:text-[#F0EDE8] hover:bg-[#2C2F38]/50",
                onClick: () => setUserMenuOpen(!userMenuOpen),
                children: [
                  user.avatar ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "img",
                    {
                      src: user.avatar,
                      alt: user.name,
                      className: "h-8 w-8 rounded-full object-cover border border-[#2C2F38]"
                    },
                    void 0,
                    false,
                    {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                      lineNumber: 285,
                      columnNumber: 19
                    },
                    this
                  ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-[#2C2F38] text-sm font-semibold text-[#F0EDE8]", children: user.initials }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 291,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hidden lg:block text-left", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-medium text-[#F0EDE8]", children: user.name }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                      lineNumber: 296,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-[#8A8D96]", children: user.email }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                      lineNumber: 297,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 295,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { className: "h-4 w-4 text-[#8A8D96] hidden lg:block" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 299,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 279,
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
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 305,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-[#2C2F38] bg-[#1A1D24] shadow-2xl", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-2 py-1.5 text-sm text-[#F0EDE8]", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold", children: user.name }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 312,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-[#8A8D96]", children: user.email }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 313,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 311,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-1 border-t border-[#2C2F38]" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 315,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-[#8A8D96] hover:bg-[#2C2F38]/50 hover:text-[#F0EDE8] transition-colors cursor-pointer text-left", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(User, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 317,
                    columnNumber: 25
                  }, this),
                  "Profile"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 316,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-[#8A8D96] hover:bg-[#2C2F38]/50 hover:text-[#F0EDE8] transition-colors cursor-pointer text-left", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 321,
                    columnNumber: 25
                  }, this),
                  "Settings"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 320,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-[#8A8D96] hover:bg-[#2C2F38]/50 hover:text-[#F0EDE8] transition-colors cursor-pointer text-left", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleHelp, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 325,
                    columnNumber: 25
                  }, this),
                  "Help"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 324,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-1 border-t border-[#2C2F38]" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 328,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer text-left", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "h-4 w-4" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                    lineNumber: 330,
                    columnNumber: 25
                  }, this),
                  "Log out"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                  lineNumber: 329,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 310,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
                lineNumber: 309,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
              lineNumber: 304,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
            lineNumber: 278,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 233,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: cn(
        "flex-1 overflow-y-auto relative z-10",
        padding && "p-5 lg:p-8",
        mainClassName
      ), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn(
        "mx-auto",
        maxWidthClasses[maxWidth]
      ), children }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 347,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
        lineNumber: 342,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
      lineNumber: 222,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/layouts/Dashboard.tsx",
    lineNumber: 117,
    columnNumber: 5
  }, this);
}
export {
  CircleHelp as C,
  Dashboard as D,
  Video as V
};
