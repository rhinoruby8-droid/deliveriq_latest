import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, d as distExports, r as reactExports, j as jsxDevRuntimeExports, H as Helmet, i as fetchMe, s as setUserToken, g as getUserToken } from "./entry-server-CxGE4Mv8.js";
import { P as PricingTiers } from "./PricingTiers-Cx6mfm7Z.js";
import { C as CircleCheckBig } from "./circle-check-big-oA9yPdeW.js";
import { T as Tag } from "./tag-1LVHa6w8.js";
import { A as ArrowRight } from "./arrow-right-WA1XerRG.js";
import { A as ArrowLeft } from "./arrow-left-D0A0vOl7.js";
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
import "./CheckoutButton-DMIp0tG1.js";
import "./analytics-jZcZ4Ayp.js";
import "./play-PNXn4-22.js";
import "./clock-C9KMasjD.js";
function RegisterPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const [searchParams] = distExports.useSearchParams();
  const selectedSessionId = searchParams.get("session") || "";
  const matchedSession = ((cms == null ? void 0 : cms.sessions) || []).find((s) => s.id === selectedSessionId);
  const [step, setStep] = reactExports.useState(1);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [jobTitle, setJobTitle] = reactExports.useState("");
  const [company, setCompany] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("United States");
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [discountPercent, setDiscountPercent] = reactExports.useState(0);
  const [couponError, setCouponError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [checkoutUrl, setCheckoutUrl] = reactExports.useState("");
  const originalPrice = matchedSession ? matchedSession.isFree ? 0 : matchedSession.price || 0 : 0;
  const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
  reactExports.useEffect(() => {
    async function checkAuth() {
      const me = await fetchMe();
      if (me) {
        setName(me.name);
        setEmail(me.email);
        setStep(2);
      }
    }
    checkAuth();
  }, []);
  const handleApplyCoupon = () => {
    setCouponError("");
    if (!couponCode.trim()) {
      setDiscountPercent(0);
      return;
    }
    const found = (cms.coupons || []).find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (found) {
      setDiscountPercent(found.discountPercentage);
    } else {
      setCouponError("Invalid coupon code");
      setDiscountPercent(0);
    }
  };
  const handleGoToStep2 = async (e) => {
    e.preventDefault();
    if (!matchedSession) {
      alert("Please select a session to register.");
      return;
    }
    setSubmitting(true);
    try {
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          jobTitle,
          company,
          country
        })
      });
      const regData = await regRes.json();
      if (!regRes.ok) {
        alert(regData.error || "Failed to create user account");
        return;
      }
      if (regData.token) {
        setUserToken(regData.token);
      }
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to create account.");
    } finally {
      setSubmitting(false);
    }
  };
  const handleRegisterAndPay = async () => {
    setSubmitting(true);
    try {
      const token = getUserToken();
      if (!token) {
        alert("You must be logged in to register.");
        setSubmitting(false);
        return;
      }
      const sessionRes = await fetch("/api/user/register-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          couponCode: couponCode.trim() || void 0,
          gateway: void 0
        })
      });
      const sessionData = await sessionRes.json();
      if (!sessionRes.ok) {
        alert(sessionData.error || "Session registration failed");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      if (sessionData.checkoutUrl) {
        setCheckoutUrl(sessionData.checkoutUrl);
        window.location.href = sessionData.checkoutUrl;
      } else {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      alert("Network error completing registration.");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "Register for Event — DeliverIQ" }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
      lineNumber: 160,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
      lineNumber: 159,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "min-h-screen bg-[#1A1D24] text-[#F0EDE8] py-12 px-6 flex items-center justify-center relative", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full max-w-3xl bg-[#21242C] border border-[#2C2F38] rounded-2xl shadow-2xl relative z-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between p-6 md:p-8 border-b border-[#2C2F38]", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold text-white", children: "Register for Event" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
          lineNumber: 168,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "p-2 bg-[#2C2F38] rounded-full text-[#8A8D96] hover:text-white transition-colors", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M18 6L6 18M6 6l12 12" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
          lineNumber: 170,
          columnNumber: 113
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
          lineNumber: 170,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
          lineNumber: 169,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
        lineNumber: 167,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 md:p-8", children: [
        matchedSession && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] text-white p-4 rounded-xl mb-8 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold text-sm md:text-base leading-snug", children: matchedSession.title }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 178,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] mt-1", children: [
              matchedSession.date,
              " • ",
              matchedSession.time
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 179,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 177,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "bg-[#C79A4E]/10 text-[#C79A4E] border border-[#C79A4E]/20 text-xs font-bold px-2.5 py-1 rounded-md", children: matchedSession.isFree ? "FREE" : "$" + matchedSession.price }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 182,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 181,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
          lineNumber: 176,
          columnNumber: 15
        }, this),
        success ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center justify-center text-center py-12 gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheckBig, { size: 54, className: "text-[#C79A4E]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 191,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-white", children: "Successfully Registered!" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 192,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] max-w-sm leading-relaxed", children: [
            "Your account has been created and you are registered for ",
            matchedSession == null ? void 0 : matchedSession.title,
            "."
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 193,
            columnNumber: 17
          }, this),
          checkoutUrl ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96]", children: "Redirecting to payment gateway..." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 197,
            columnNumber: 19
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/dashboard", className: "mt-4 px-8 py-3.5 bg-[#C79A4E] text-[#1A1D24] text-sm font-bold rounded-full hover:brightness-110 transition-all", children: "Go to My Dashboard" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 199,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this) : step === 1 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleGoToStep2, className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
                "First Name ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 208,
                  columnNumber: 88
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 208,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 209,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 207,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
                "Last Name ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 218,
                  columnNumber: 87
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 218,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 219,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 217,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 206,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
                "Email ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 229,
                  columnNumber: 83
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 229,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 230,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 228,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
                "Choose Password ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 239,
                  columnNumber: 93
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 239,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "password",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 240,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 238,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 227,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
                "Company ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 252,
                  columnNumber: 85
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 252,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: company,
                  onChange: (e) => setCompany(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 253,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 251,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
                "Job Title ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 262,
                  columnNumber: 87
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 262,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: jobTitle,
                  onChange: (e) => setJobTitle(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 263,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 261,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 250,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
              "Country ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 274,
                columnNumber: 83
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 274,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "text",
                required: true,
                value: country,
                onChange: (e) => setCountry(e.target.value),
                className: "h-12 w-full md:w-1/2 rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 275,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 mt-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
              "Dietary Requirements ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 286,
                columnNumber: 96
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 286,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center gap-2 text-sm text-[#8A8D96] cursor-pointer", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "radio", name: "dietary", defaultChecked: true, className: "w-4 h-4 accent-[#C79A4E]" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 289,
                  columnNumber: 23
                }, this),
                "No special requirements"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 288,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center gap-2 text-sm text-[#8A8D96] cursor-pointer", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "radio", name: "dietary", className: "w-4 h-4 accent-[#C79A4E]" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 293,
                  columnNumber: 23
                }, this),
                "Yes, I have requirements"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 292,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 287,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 285,
            columnNumber: 17
          }, this),
          !(matchedSession == null ? void 0 : matchedSession.isFree) && originalPrice > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2 mt-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-[#F0EDE8]", children: [
              "Promotion Code ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#8A8D96] font-normal", children: "(optional)" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 302,
                columnNumber: 92
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 302,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col md:flex-row gap-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  value: couponCode,
                  onChange: (e) => setCouponCode(e.target.value),
                  placeholder: "ENTER CODE",
                  className: "h-12 w-full md:flex-1 rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] uppercase transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 304,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: handleApplyCoupon,
                  className: "h-12 px-8 inline-flex items-center justify-center gap-2 bg-[#2C2F38] text-white font-semibold rounded-[10px] hover:bg-[#3A3E4A] transition-colors shrink-0",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { size: 16 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                      lineNumber: 316,
                      columnNumber: 25
                    }, this),
                    " Apply"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 311,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 303,
              columnNumber: 21
            }, this),
            couponError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-red-400", children: couponError }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 319,
              columnNumber: 37
            }, this),
            discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-green-400 font-semibold", children: [
              "Coupon applied! ",
              discountPercent,
              "% discount."
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 320,
              columnNumber: 45
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 301,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-8 border-t border-[#2C2F38] pt-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "submit",
              className: "w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98]",
              children: [
                "Continue to Payment ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 18 }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 329,
                  columnNumber: 41
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 325,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 324,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
          lineNumber: 205,
          columnNumber: 15
        }, this) : (
          // STEP 2 REVIEW & PAYMENT (Constrained inside the modal)
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 border-b border-[#2C2F38] pb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setStep(1), className: "p-2 -ml-2 text-[#8A8D96] hover:text-white rounded-full hover:bg-[#2C2F38] transition-colors", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 16 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 338,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 337,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-white", children: "Review & Pay" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 340,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 336,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] rounded-xl p-5 text-sm flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-[#8A8D96] border-b border-[#2C2F38] pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Attendee Name" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 345,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#F0EDE8]", children: name }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 346,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 344,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-[#8A8D96] border-b border-[#2C2F38] pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Email Address" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 349,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#F0EDE8]", children: email }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 350,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 348,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-[#8A8D96] border-b border-[#2C2F38] pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Session Ticket" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 353,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#F0EDE8]", children: [
                  "$$",
                  originalPrice.toFixed(2)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 354,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 352,
                columnNumber: 19
              }, this),
              discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-green-400 border-b border-[#2C2F38] pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "Discount (",
                  discountPercent,
                  "%)"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 358,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "-$$",
                  (originalPrice * discountPercent / 100).toFixed(2)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 359,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 357,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between text-base font-bold text-white pt-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Total Due" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 363,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#C79A4E]", children: [
                  "$$",
                  finalPrice.toFixed(2)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                  lineNumber: 364,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 362,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 343,
              columnNumber: 17
            }, this),
            finalPrice > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 border-t border-[#2C2F38] pt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              PricingTiers,
              {
                basePrice: originalPrice,
                sessionTitle: matchedSession.title,
                sessionId: matchedSession.id
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 370,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 369,
              columnNumber: 19
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: handleRegisterAndPay,
                disabled: submitting,
                className: "w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                children: [
                  submitting ? "Processing Registration..." : "Complete Registration",
                  " ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 18 }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                    lineNumber: 383,
                    columnNumber: 93
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
                lineNumber: 378,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
              lineNumber: 377,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
            lineNumber: 335,
            columnNumber: 15
          }, this)
        )
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
        lineNumber: 174,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
      lineNumber: 164,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
      lineNumber: 163,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/register.tsx",
    lineNumber: 158,
    columnNumber: 5
  }, this);
}
export {
  RegisterPage as default
};
