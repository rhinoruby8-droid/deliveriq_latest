import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, B as Button, X, v as cn, w as Menu } from "./entry-server-EqKGxfE5.js";
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
  const {
    sidebar = {},
    main = {}
  } = config;
  const {
    logo = { text: "Dashboard" },
    navigation = {},
    footer: sidebarFooter,
    className: sidebarClassName
  } = sidebar;
  const {
    maxWidth = "full",
    padding = true,
    className: mainClassName
  } = main;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex h-full w-full overflow-hidden bg-[#14161B] text-[#F0EDE8]", className), children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("aside", { className: cn(
      "fixed inset-y-0 left-0 z-50 w-56 bg-[#1A1D24] border-r border-[#2C2F38] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
      sidebarClassName
    ), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-14 items-center justify-between px-4 border-b border-[#2C2F38]", children: [
        logo.href ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: logo.href, className: "flex items-center gap-2 font-semibold text-sm", children: [
          logo.image && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: logo.image, alt: logo.text, className: "h-5 w-5" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
            lineNumber: 95,
            columnNumber: 19
          }, this),
          logo.text && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: logo.text }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
            lineNumber: 97,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
          lineNumber: 93,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 font-semibold text-sm", children: [
          logo.image && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: logo.image, alt: logo.text, className: "h-5 w-5" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
            lineNumber: 102,
            columnNumber: 19
          }, this),
          logo.text && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: logo.text }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
            lineNumber: 104,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
          lineNumber: 100,
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
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
              lineNumber: 113,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
            lineNumber: 107,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 91,
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
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
                  lineNumber: 134,
                  columnNumber: 32
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex-1", children: item.title }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
                  lineNumber: 135,
                  columnNumber: 23
                }, this),
                item.badge !== void 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#2C2F38] border border-[#2C2F38]/40 px-1 text-xs text-[#8A8D96]", children: item.badge }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
                  lineNumber: 137,
                  columnNumber: 25
                }, this)
              ]
            },
            index,
            true,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
              lineNumber: 124,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
          lineNumber: 120,
          columnNumber: 15
        }, this),
        navigation.secondary && navigation.secondary.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "my-4 border-t border-[#2C2F38]" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
            lineNumber: 149,
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
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
                    lineNumber: 159,
                    columnNumber: 34
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: item.title }, void 0, false, {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
                    lineNumber: 160,
                    columnNumber: 25
                  }, this)
                ]
              },
              index,
              true,
              {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
                lineNumber: 154,
                columnNumber: 23
              },
              this
            );
          }) }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
            lineNumber: 150,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
          lineNumber: 148,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      sidebarFooter && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-[#2C2F38] p-3 text-xs text-[#8A8D96]", children: sidebarFooter }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 171,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
      lineNumber: 89,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
      lineNumber: 84,
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
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 180,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-1 flex-col min-w-0 overflow-hidden relative bg-[#14161B] text-[#F0EDE8]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.15) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 189,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.03) 0%, transparent 70%)"
      } }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 193,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:hidden flex h-10 items-center px-4 border-b border-[#2C2F38] bg-[#1A1D24]/60 backdrop-blur-md flex-shrink-0 justify-between relative z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "text-[#8A8D96] hover:text-[#F0EDE8] hover:bg-[#2C2F38]/50 h-8 px-2 flex items-center gap-1.5",
          onClick: () => setSidebarOpen(true),
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Menu, { className: "h-4 w-4" }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
              lineNumber: 205,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs font-semibold", children: "Dashboard Menu" }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
              lineNumber: 206,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
          lineNumber: 199,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 198,
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
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
        lineNumber: 211,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
      lineNumber: 187,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/layouts/Dashboard.tsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
}
export {
  Dashboard as D,
  Video as V
};
