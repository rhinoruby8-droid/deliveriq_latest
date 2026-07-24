import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, a as ArrowRight, c as trackEvent, g as getUserToken } from "./entry-server-DDW4XXzT.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
function CheckoutButton({
  sessionTitle,
  amount,
  currency = "usd",
  label = "Register & Pay",
  className = "",
  tier,
  sessionId,
  gateway = "stripe"
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
    const activeGateway = gateway === "stripe" && "rzp_test_TEZhg0ljUCeDJa" ? "razorpay" : gateway;
    try {
      const token = getUserToken();
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      if (activeGateway === "razorpay") {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error("Razorpay SDK failed to load. Please check your network connection.");
        }
        const orderRes = await fetch("/api/razorpay/order", {
          method: "POST",
          headers,
          body: JSON.stringify({
            amount,
            currency: currency.toUpperCase(),
            sessionTitle,
            tier,
            sessionId
          })
        });
        const orderData = await orderRes.json();
        if (!orderRes.ok || !orderData.id) {
          throw new Error(orderData.error || "Failed to initiate Razorpay order");
        }
        let decodedUserId = "";
        if (token) {
          try {
            const payloadBase64 = token.split(".")[1];
            if (payloadBase64) {
              const decoded = JSON.parse(atob(payloadBase64));
              decodedUserId = decoded.id || "";
            }
          } catch (e) {
            console.error("Failed to decode user token payload", e);
          }
        }
        const keyId = "rzp_test_TEZhg0ljUCeDJa";
        const options = {
          key: keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "DeliverIQ",
          description: sessionTitle,
          order_id: orderData.id,
          config_id: "config_TEZskQzcdTwloM",
          handler: async function(response) {
            setLoading(true);
            try {
              const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: decodedUserId,
                  tier,
                  sessionId
                })
              });
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok || !verifyData.success) {
                throw new Error(verifyData.error || "Signature verification failed");
              }
              window.location.href = `/payment/success?session_id=${response.razorpay_payment_id}`;
            } catch (err) {
              setError(err instanceof Error ? err.message : "Verification failed");
              setLoading(false);
            }
          },
          prefill: {
            name: "",
            email: ""
          },
          theme: {
            color: "#C79A4E"
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            }
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
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
      }
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
            lineNumber: 186,
            columnNumber: 13
          }, this),
          "Processing…"
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
          lineNumber: 185,
          columnNumber: 11
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          label,
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
            lineNumber: 192,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
          lineNumber: 190,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
        lineNumber: 179,
        columnNumber: 7
      },
      this
    ),
    error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-red-400", children: error }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
      lineNumber: 197,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/CheckoutButton.tsx",
    lineNumber: 178,
    columnNumber: 5
  }, this);
}
export {
  CheckoutButton as C
};
