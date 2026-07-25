import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { l as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, X, q as cn, v as Menu } from "./entry-server-QtrLgn1N.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex h-full w-full overflow-hidden bg-muted text-foreground", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: cn(
      "fixed inset-y-0 left-0 z-50 w-56 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0",
      sidebarOpen ? "translate-x-0" : "-translate-x-full",
      sidebarClassName
    ), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-14 items-center justify-between px-4 border-b border-border", children: [
        logo.href ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: logo.href, className: "flex items-center gap-2 font-semibold text-sm", children: [
          logo.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo.image, alt: logo.text, className: "h-5 w-5" }),
          logo.text && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: logo.text })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-sm", children: [
          logo.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo.image, alt: logo.text, className: "h-5 w-5" }),
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
        navigation.main && navigation.main.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: navigation.main.map((item, index) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: item.href,
              className: cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border",
                item.active ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground border-transparent hover:bg-background/50 hover:text-foreground"
              ),
              children: [
                Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: item.title }),
                item.badge !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted border border-border/40 px-1 text-xs text-muted-foreground", children: item.badge })
              ]
            },
            index
          );
        }) }),
        navigation.secondary && navigation.secondary.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-4 border-t border-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: navigation.secondary.map((item, index) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: item.href,
                className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-background/50 hover:text-foreground",
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
      sidebarFooter && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-3 text-xs text-muted-foreground", children: sidebarFooter })
    ] }) }),
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/50 lg:hidden",
        onClick: () => setSidebarOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col min-w-0 overflow-hidden relative bg-muted text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.15) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", style: {
        background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.03) 0%, transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden flex h-10 items-center px-4 border-b border-border bg-background/60 backdrop-blur-md flex-shrink-0 justify-between relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground hover:text-foreground hover:bg-muted/50 h-8 px-2 flex items-center gap-1.5",
          onClick: () => setSidebarOpen(true),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Dashboard Menu" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn(
        "flex-1 overflow-y-auto relative z-10",
        padding && "p-5 lg:p-8",
        mainClassName
      ), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
        "mx-auto",
        maxWidthClasses[maxWidth]
      ), children }) })
    ] })
  ] });
}
export {
  Dashboard as D,
  Video as V
};
