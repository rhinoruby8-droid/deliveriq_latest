import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { h as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, a as ArrowRight, c as trackEvent, g as getUserToken, m as cn } from "./entry-server-8mN96Czs.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
function CheckoutButton({
  sessionTitle,
  amount,
  currency = "usd",
  label = "Register & Pay",
  className = "",
  tier,
  sessionId
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    trackEvent("begin_checkout", {
      currency,
      value: amount,
      items: [{ item_name: sessionTitle, price: amount, currency }]
    });
    try {
      const token = getUserToken();
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers,
        body: JSON.stringify({ sessionTitle, amount, currency, tier, sessionId })
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: handleCheckout,
        disabled: loading,
        className: `inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 ${className}`,
        children: loading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { size: 14, className: "animate-spin" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
            lineNumber: 74,
            columnNumber: 13
          }, this),
          "Redirecting…"
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          label,
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
          lineNumber: 78,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
        lineNumber: 67,
        columnNumber: 7
      },
      this
    ),
    error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-red-400", children: error }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
      lineNumber: 85,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}
const Card = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 9,
    columnNumber: 3
  },
  void 0
));
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 24,
    columnNumber: 3
  },
  void 0
));
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 36,
    columnNumber: 3
  },
  void 0
));
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 51,
    columnNumber: 3
  },
  void 0
));
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { ref, className: cn("p-6 pt-0", className), ...props }, void 0, false, {
  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
  lineNumber: 63,
  columnNumber: 3
}, void 0));
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/ui/card.tsx",
    lineNumber: 71,
    columnNumber: 3
  },
  void 0
));
CardFooter.displayName = "CardFooter";
export {
  Card as C,
  CardHeader as a,
  CardTitle as b,
  CardDescription as c,
  CardContent as d,
  CardFooter as e,
  CheckoutButton as f
};
