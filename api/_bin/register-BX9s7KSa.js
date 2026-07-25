import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, F as FALLBACK_CMS_CONTENT, d as distExports, r as reactExports, j as jsxRuntimeExports, H as Helmet, a as ArrowRight, k as fetchMe, s as setUserToken, g as getUserToken } from "./entry-server-CO9Km2vr.js";
import { C as CheckoutButton } from "./CheckoutButton-C68lieQj.js";
import { C as CircleCheckBig } from "./circle-check-big-C_nTpTy-.js";
import { T as Tag } from "./tag-BPtDAjry.js";
import { A as ArrowLeft } from "./arrow-left-DIVfBb6M.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Register for Event — DeliverIQ" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-background text-foreground py-12 px-6 flex items-center justify-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 md:p-8 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "Register for Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/sessions", className: "p-2 bg-muted rounded-full text-muted-foreground hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
        matchedSession && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border text-white p-4 rounded-xl mb-8 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm md:text-base leading-snug", children: matchedSession.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              matchedSession.date,
              " • ",
              matchedSession.time
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-2.5 py-1 rounded-md", children: matchedSession.isFree ? "FREE" : new Intl.NumberFormat("en-US", { style: "currency", currency: ((_a = cms.paymentConfig) == null ? void 0 : _a.currency) || "USD" }).format(matchedSession.price || 0) }) })
        ] }),
        success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center text-center py-12 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 54, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Successfully Registered!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-sm leading-relaxed", children: [
            "Your account has been created and you are registered for ",
            matchedSession == null ? void 0 : matchedSession.title,
            "."
          ] }),
          checkoutUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Redirecting to payment gateway..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/dashboard", className: "mt-4 px-8 py-3.5 bg-primary text-[#1A1D24] text-sm font-bold rounded-full hover:brightness-110 transition-all", children: "Go to My Dashboard" })
        ] }) : step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleGoToStep2, className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
                "First Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
                "Last Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
                "Email ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
                "Choose Password ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
                "Company ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: company,
                  onChange: (e) => setCompany(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
                "Job Title ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: jobTitle,
                  onChange: (e) => setJobTitle(e.target.value),
                  className: "h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
              "Country ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                required: true,
                value: country,
                onChange: (e) => setCountry(e.target.value),
                className: "h-12 w-full md:w-1/2 rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
              "Dietary Requirements ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "dietary", defaultChecked: true, className: "w-4 h-4 accent-[#C79A4E]" }),
                "No special requirements"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "dietary", className: "w-4 h-4 accent-[#C79A4E]" }),
                "Yes, I have requirements"
              ] })
            ] })
          ] }),
          !(matchedSession == null ? void 0 : matchedSession.isFree) && originalPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "font-semibold text-sm text-foreground", children: [
              "Promotion Code ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: couponCode,
                  onChange: (e) => setCouponCode(e.target.value),
                  placeholder: "ENTER CODE",
                  className: "h-12 w-full md:flex-1 rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground uppercase transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleApplyCoupon,
                  className: "h-12 px-8 inline-flex items-center justify-center gap-2 bg-muted text-white font-semibold rounded-[10px] hover:bg-[#3A3E4A] transition-colors shrink-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 16 }),
                    " Apply"
                  ]
                }
              )
            ] }),
            couponError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400", children: couponError }),
            discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-green-400 font-semibold", children: [
              "Coupon applied! ",
              discountPercent,
              "% discount."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 border-t border-border pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98]",
              children: [
                "Continue to Payment ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
              ]
            }
          ) })
        ] }) : (
          // STEP 2 REVIEW & PAYMENT (Constrained inside the modal)
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep(1), className: "p-2 -ml-2 text-muted-foreground hover:text-white rounded-full hover:bg-muted transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white", children: "Review & Pay" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border rounded-xl p-5 text-sm flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-muted-foreground border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Attendee Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-muted-foreground border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-muted-foreground border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Session Ticket" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_b = cms.paymentConfig) == null ? void 0 : _b.currency) || "USD" }).format(originalPrice) })
              ] }),
              !(matchedSession == null ? void 0 : matchedSession.isFree) && originalPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 border-b border-border pb-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: couponCode,
                      onChange: (e) => setCouponCode(e.target.value),
                      placeholder: "PROMO CODE",
                      className: "h-10 flex-1 rounded-[8px] border border-border bg-muted px-3 text-xs text-foreground uppercase transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleApplyCoupon,
                      className: "h-10 px-4 bg-muted text-white text-xs font-semibold rounded-[8px] hover:bg-[#3A3E4A] transition-colors shrink-0",
                      children: "Apply"
                    }
                  )
                ] }),
                couponError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-1", children: couponError })
              ] }),
              discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-green-400 border-b border-border pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Discount (",
                  discountPercent,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "-",
                  new Intl.NumberFormat("en-US", { style: "currency", currency: ((_c = cms.paymentConfig) == null ? void 0 : _c.currency) || "USD" }).format(originalPrice * discountPercent / 100)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold text-white pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Due" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_d = cms.paymentConfig) == null ? void 0 : _d.currency) || "USD" }).format(finalPrice) })
              ] })
            ] }),
            finalPrice > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CheckoutButton,
              {
                sessionTitle: matchedSession.title,
                amount: finalPrice,
                sessionId: matchedSession.id,
                couponCode: couponCode.trim() || void 0,
                gateway: (matchedSession == null ? void 0 : matchedSession.gateway) || "all",
                label: "Proceed to Payment",
                className: "w-full"
              }
            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleRegisterAndPay,
                disabled: submitting,
                className: "w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                children: [
                  submitting ? "Processing Registration..." : "Complete Registration",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
                ]
              }
            ) })
          ] })
        )
      ] })
    ] }) })
  ] });
}
export {
  RegisterPage as default
};
