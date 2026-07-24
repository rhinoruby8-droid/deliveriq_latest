import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, d as distExports, r as reactExports, j as jsxDevRuntimeExports, H as Helmet, a as ArrowRight, l as fetchMe, s as setUserToken, g as getUserToken } from "./entry-server-NL5JUnTS.js";
import { C as CheckoutButton } from "./CheckoutButton-CMAt9Uwt.js";
import { C as CircleCheckBig } from "./circle-check-big-2wpvETHW.js";
import { T as Tag } from "./tag-C-EXj1M1.js";
import { A as ArrowLeft } from "./arrow-left-DYwQCEDp.js";
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
function RegisterPage() {
  var _a, _b, _c, _d;
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
    if (!found) {
      setCouponError("Invalid coupon code");
      setDiscountPercent(0);
      return;
    }
    if (found.active === false) {
      setCouponError("This coupon is inactive");
      setDiscountPercent(0);
      return;
    }
    if (found.sessionId && found.sessionId !== "all" && found.sessionId !== (matchedSession == null ? void 0 : matchedSession.id)) {
      setCouponError("This coupon is not valid for this session");
      setDiscountPercent(0);
      return;
    }
    const now = /* @__PURE__ */ new Date();
    if (found.startDate && new Date(found.startDate) > now) {
      setCouponError("This coupon promotion has not started yet");
      setDiscountPercent(0);
      return;
    }
    if (found.endDate && new Date(found.endDate) < now) {
      setCouponError("This coupon promotion has expired");
      setDiscountPercent(0);
      return;
    }
    if (found.maxUses !== void 0 && found.maxUses !== null && (found.uses || 0) >= found.maxUses) {
      setCouponError("This coupon usage limit has been reached");
      setDiscountPercent(0);
      return;
    }
    setDiscountPercent(found.discountPercentage);
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
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
      lineNumber: 188,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
      lineNumber: 187,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "min-h-screen bg-background text-foreground py-12 px-6 flex items-center justify-center relative", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl relative z-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between p-6 md:p-8 border-b border-border", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold text-white", children: "Register for Event" }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
          lineNumber: 196,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "p-2 bg-muted rounded-full text-muted-foreground hover:text-white transition-colors", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { d: "M18 6L6 18M6 6l12 12" }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
          lineNumber: 198,
          columnNumber: 113
        }, this) }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
          lineNumber: 197,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
        lineNumber: 195,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 md:p-8", children: [
        matchedSession && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-background border border-border text-white p-4 rounded-xl mb-8 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold text-sm md:text-base leading-snug", children: matchedSession.title }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 206,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground mt-1", children: [
              matchedSession.date,
              " • ",
              matchedSession.time
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 207,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 205,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-2.5 py-1 rounded-md", children: matchedSession.isFree ? "FREE" : new Intl.NumberFormat("en-US", { style: "currency", currency: ((_a = cms.paymentConfig) == null ? void 0 : _a.currency) || "USD" }).format(matchedSession.price || 0) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 210,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 209,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
          lineNumber: 204,
          columnNumber: 15
        }, this),
        success ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center justify-center text-center py-12 gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheckBig, { size: 54, className: "text-primary" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 219,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-white", children: "Successfully Registered!" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 220,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground max-w-sm leading-relaxed", children: [
            "Your account has been created and you are registered for ",
            matchedSession == null ? void 0 : matchedSession.title,
            "."
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 221,
            columnNumber: 17
          }, this),
          checkoutUrl ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground", children: "Redirecting to payment gateway..." }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 225,
            columnNumber: 19
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/dashboard", className: "mt-4 px-8 py-3.5 bg-primary text-[#1A1D24] text-sm font-bold rounded-full hover:brightness-110 transition-all", children: "Go to My Dashboard" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 227,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
          lineNumber: 218,
          columnNumber: 15
        }, this) : step === 1 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleGoToStep2, className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
                "First Name ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 236,
                  columnNumber: 89
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 236,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 237,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 235,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
                "Last Name ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 246,
                  columnNumber: 88
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 246,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 247,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 245,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 234,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
                "Email ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 257,
                  columnNumber: 84
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 257,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 258,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 256,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
                "Choose Password ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 267,
                  columnNumber: 94
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 267,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "password",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 268,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 266,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 255,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
                "Company ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 280,
                  columnNumber: 86
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 280,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: company,
                  onChange: (e) => setCompany(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 281,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 279,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
                "Job Title ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 290,
                  columnNumber: 88
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 290,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: jobTitle,
                  onChange: (e) => setJobTitle(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 291,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 289,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 278,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
              "Country ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 302,
                columnNumber: 84
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 302,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "text",
                required: true,
                value: country,
                onChange: (e) => setCountry(e.target.value),
                className: "h-12 w-full md:w-1/2 rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              },
              void 0,
              false,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 303,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 301,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 mt-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
              "Dietary Requirements ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", children: "*" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 314,
                columnNumber: 97
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 314,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center gap-2 text-sm text-muted-foreground cursor-pointer", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "radio", name: "dietary", defaultChecked: true, className: "w-4 h-4 accent-[#C79A4E]" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 317,
                  columnNumber: 23
                }, this),
                "No special requirements"
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 316,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center gap-2 text-sm text-muted-foreground cursor-pointer", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "radio", name: "dietary", className: "w-4 h-4 accent-[#C79A4E]" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 321,
                  columnNumber: 23
                }, this),
                "Yes, I have requirements"
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 320,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 315,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 313,
            columnNumber: 17
          }, this),
          !(matchedSession == null ? void 0 : matchedSession.isFree) && originalPrice > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2 mt-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "font-semibold text-sm text-foreground", children: [
              "Promotion Code ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground font-normal", children: "(optional)" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 330,
                columnNumber: 93
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 330,
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
                  className: "h-12 w-full md:flex-1 rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground uppercase transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 332,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: handleApplyCoupon,
                  className: "h-12 px-8 inline-flex items-center justify-center gap-2 bg-muted text-white font-semibold rounded-[10px] hover:bg-[#3A3E4A] transition-colors shrink-0",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { size: 16 }, void 0, false, {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                      lineNumber: 344,
                      columnNumber: 25
                    }, this),
                    " Apply"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 339,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 331,
              columnNumber: 21
            }, this),
            couponError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-red-400", children: couponError }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 347,
              columnNumber: 37
            }, this),
            discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-green-400 font-semibold", children: [
              "Coupon applied! ",
              discountPercent,
              "% discount."
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 348,
              columnNumber: 45
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 329,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-8 border-t border-border pt-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "submit",
              className: "w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98]",
              children: [
                "Continue to Payment ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 18 }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 357,
                  columnNumber: 41
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 353,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 352,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
          lineNumber: 233,
          columnNumber: 15
        }, this) : (
          // STEP 2 REVIEW & PAYMENT (Constrained inside the modal)
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 border-b border-border pb-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: () => setStep(1), className: "p-2 -ml-2 text-muted-foreground hover:text-white rounded-full hover:bg-muted transition-colors", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 16 }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 366,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 365,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-white", children: "Review & Pay" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 368,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 364,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-background border border-border rounded-xl p-5 text-sm flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-muted-foreground border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Attendee Name" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 373,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-foreground", children: name }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 374,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 372,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-muted-foreground border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Email Address" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 377,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-foreground", children: email }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 378,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 376,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-muted-foreground border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Session Ticket" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 381,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-foreground", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_b = cms.paymentConfig) == null ? void 0 : _b.currency) || "USD" }).format(originalPrice) }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 382,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 380,
                columnNumber: 19
              }, this),
              !(matchedSession == null ? void 0 : matchedSession.isFree) && originalPrice > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2 border-b border-border pb-3 pt-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "input",
                    {
                      type: "text",
                      value: couponCode,
                      onChange: (e) => setCouponCode(e.target.value),
                      placeholder: "PROMO CODE",
                      className: "h-10 flex-1 rounded-[8px] border border-border bg-muted px-3 text-xs text-foreground uppercase transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    },
                    void 0,
                    false,
                    {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                      lineNumber: 388,
                      columnNumber: 25
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      type: "button",
                      onClick: handleApplyCoupon,
                      className: "h-10 px-4 bg-muted text-white text-xs font-semibold rounded-[8px] hover:bg-[#3A3E4A] transition-colors shrink-0",
                      children: "Apply"
                    },
                    void 0,
                    false,
                    {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                      lineNumber: 395,
                      columnNumber: 25
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 387,
                  columnNumber: 23
                }, this),
                couponError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-red-400 mt-1", children: couponError }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 403,
                  columnNumber: 39
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 386,
                columnNumber: 21
              }, this),
              discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold text-green-400 border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "Discount (",
                  discountPercent,
                  "%)"
                ] }, void 0, true, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 408,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "-",
                  new Intl.NumberFormat("en-US", { style: "currency", currency: ((_c = cms.paymentConfig) == null ? void 0 : _c.currency) || "USD" }).format(originalPrice * discountPercent / 100)
                ] }, void 0, true, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 409,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 407,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between text-base font-bold text-white pt-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Total Due" }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 413,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-primary", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_d = cms.paymentConfig) == null ? void 0 : _d.currency) || "USD" }).format(finalPrice) }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                  lineNumber: 414,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 412,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 371,
              columnNumber: 17
            }, this),
            finalPrice > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              CheckoutButton,
              {
                sessionTitle: matchedSession.title,
                amount: finalPrice,
                sessionId: matchedSession.id,
                couponCode: couponCode.trim() || void 0,
                gateway: (matchedSession == null ? void 0 : matchedSession.gateway) || "all",
                label: "Proceed to Payment",
                className: "w-full"
              },
              void 0,
              false,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 420,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 419,
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
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                    lineNumber: 437,
                    columnNumber: 93
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
                lineNumber: 432,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
              lineNumber: 431,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
            lineNumber: 363,
            columnNumber: 15
          }, this)
        )
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
        lineNumber: 202,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
      lineNumber: 192,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
      lineNumber: 191,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/pages/register.tsx",
    lineNumber: 186,
    columnNumber: 5
  }, this);
}
export {
  RegisterPage as default
};
