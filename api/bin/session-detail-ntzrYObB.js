import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, u as useCmsContent, F as FALLBACK_CMS_CONTENT, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, a as ArrowRight, g as getUserToken, H as Helmet } from "./entry-server-CnSQFCy3.js";
import { V as VideoPlayer } from "./VideoPlayer-BWf8qSPv.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-DnQi9baR.js";
import { A as ArrowLeft } from "./arrow-left-CIhVfRu5.js";
import { C as Clock } from "./clock-DLWFBWM2.js";
import { T as Tag } from "./tag-C5231WxL.js";
import { C as CirclePlay } from "./circle-play-CZ9WOZNI.js";
import { C as CircleCheckBig } from "./circle-check-big-BEQK67Gs.js";
import { m as motion } from "./proxy-CqLaS13D.js";
import { U as Users } from "./users-C6c9f4v-.js";
import { G as Globe } from "./globe-D2cZ1fJ3.js";
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
import "./DynamicForm-BWZ7a1Pd.js";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: "easeOut" }
  })
};
function isPast(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = /* @__PURE__ */ new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return d < today;
}
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
function SessionDetailPage() {
  const { id } = distExports.useParams();
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [isLoggedIn, setIsLoggedIn] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [discountPercent, setDiscountPercent] = reactExports.useState(0);
  const [couponError, setCouponError] = reactExports.useState("");
  const [gateway, setGateway] = reactExports.useState("stripe");
  const [registrationMessage, setRegistrationMessage] = reactExports.useState("");
  const [checkoutUrl, setCheckoutUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    async function checkAuth() {
      const token = getUserToken();
      if (token) {
        try {
          const meRes = await fetch("/api/auth/me", {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (meRes.ok) {
            const me = await meRes.json();
            setName(me.name);
            setEmail(me.email);
            setIsLoggedIn(true);
          }
        } catch (err) {
          console.error("Failed to fetch auth/me", err);
        }
      }
    }
    checkAuth();
  }, []);
  const session = cms.sessions.find((s) => s.id === id);
  if (!session) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-4xl font-black text-[#2C2F38]", children: "404" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold text-[#F0EDE8]", children: "Session not found" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96]", children: "This session may have been removed or the link is incorrect." }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "inline-flex items-center gap-2 text-sm font-semibold text-[#C79A4E] hover:underline", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 14 }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 90,
          columnNumber: 11
        }, this),
        " Back to Sessions"
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
      lineNumber: 85,
      columnNumber: 7
    }, this);
  }
  const past = isPast(session.date);
  const speakers = (cms.speakers || []).filter((sp) => (session.speakerIds || []).includes(sp.id));
  const sponsors = (cms.sponsors || []).filter((sp) => (session.sponsorIds || []).includes(sp.id));
  const site = "https://deliveriq.live";
  const title = `${session.title} — DeliverIQ`;
  const description = session.description;
  const pageUrl = `${site}/sessions/${session.id}`;
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: session.title,
    description: session.description,
    url: pageUrl,
    startDate: session.date || void 0,
    eventStatus: past ? "https://schema.org/EventMovedOnline" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: "DeliverIQ",
      url: site
    },
    performer: speakers.map((sp) => ({
      "@type": "Person",
      name: sp.name,
      jobTitle: sp.role,
      worksFor: { "@type": "Organization", name: sp.organisation }
    })),
    about: session.tag,
    ...session.videoUrl ? { recordedIn: { "@type": "VideoObject", url: session.videoUrl } } : {}
  };
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
    if (found.sessionId && found.sessionId !== "all" && found.sessionId !== session.id) {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const originalPrice = session.isFree ? 0 : session.price || 0;
    const discountedPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
    try {
      const res = await fetch("/api/user/register-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: !getUserToken() ? password : void 0,
          sessionId: session.id,
          couponCode: couponCode.trim() || void 0,
          gateway: discountedPrice > 0 ? gateway : void 0
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to register");
        return;
      }
      if (data.gateway === "razorpay") {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          alert("Razorpay SDK failed to load. Please check your network connection.");
          return;
        }
        const options = {
          key: "rzp_test_TEZhg0ljUCeDJa",
          amount: data.amount,
          currency: data.currency,
          name: "DeliverIQ",
          description: data.sessionTitle,
          order_id: data.orderId,
          config_id: "config_TEZskQzcdTwloM",
          handler: async function(response) {
            setSubmitted(true);
            setRegistrationMessage("Verifying payment details...");
            try {
              const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: data.userId,
                  tier: data.tier || "tier2",
                  sessionId: data.sessionId
                })
              });
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok || !verifyData.success) {
                throw new Error(verifyData.error || "Signature verification failed");
              }
              window.location.href = `/payment/success?session_id=${response.razorpay_payment_id}`;
            } catch (err) {
              alert(err instanceof Error ? err.message : "Verification failed");
              setSubmitted(false);
            }
          },
          prefill: {
            name,
            email
          },
          theme: {
            color: "#C79A4E"
          },
          modal: {
            ondismiss: function() {
              setSubmitted(false);
            }
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (data.checkoutUrl) {
        setSubmitted(true);
        setCheckoutUrl(data.checkoutUrl);
        setRegistrationMessage("Redirecting to checkout...");
        window.location.href = data.checkoutUrl;
      } else {
        setSubmitted(true);
        setRegistrationMessage("Registration successful! Welcome to the session.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to registration service");
    }
  };
  const statusBadgeHtml = `
    ${past ? '<span class="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider bg-[#2C2F38]/60 border border-[#2C2F38] px-3 py-1 rounded-full">Past Session</span>' : '<span class="text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-3 py-1 rounded-full animate-pulse">Upcoming</span>'}
    ${session.status === "draft" ? '<span class="text-[10px] font-bold text-yellow-400 uppercase tracking-wider bg-yellow-950/30 border border-yellow-900/30 px-3 py-1 rounded-full">Draft</span>' : ""}
  `;
  let htmlContent = cms.sessionDetailPageHtml || FALLBACK_CMS_CONTENT.sessionDetailPageHtml;
  htmlContent = htmlContent.replace(/\{\{session.title\}\}/g, session.title).replace(/\{\{session.tag\}\}/g, session.tag).replace(/\{\{session.date\}\}/g, session.date || "Date TBC").replace(/\{\{session.time\}\}/g, session.time || "Time TBC").replace(/\{\{session.duration\}\}/g, session.duration || "").replace(/\{\{session.description\}\}/g, session.description).replace(/\{\{session.statusBadge\}\}/g, statusBadgeHtml);
  const widgets = {
    SessionSpeakers: speakers.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeUp, custom: 0.2, className: "mb-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 12 }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 295,
          columnNumber: 11
        }, this),
        " Presenters"
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 294,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4", children: speakers.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-4 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm p-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "img",
          {
            src: sp.avatarUrl,
            alt: sp.name,
            loading: "lazy",
            decoding: "async",
            onError: (e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64";
            },
            className: "w-12 h-12 rounded-full object-cover border border-[#2C2F38] shrink-0"
          },
          void 0,
          false,
          {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 300,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-bold text-[#F0EDE8] text-sm", children: sp.name }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 309,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#C79A4E] font-medium mb-1", children: [
            sp.role,
            " · ",
            sp.organisation
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 310,
            columnNumber: 17
          }, this),
          sp.bio && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed line-clamp-3", children: sp.bio }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 311,
            columnNumber: 28
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 308,
          columnNumber: 15
        }, this),
        sp.socialUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Globe, { size: 14 }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 315,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 314,
          columnNumber: 17
        }, this)
      ] }, sp.id, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 299,
        columnNumber: 13
      }, this)) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 297,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
      lineNumber: 293,
      columnNumber: 7
    }, this) : null,
    SessionSponsors: sponsors.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeUp, custom: 0.25, className: "mb-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4", children: "Session Sponsors" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 325,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-3", children: sponsors.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: sp.websiteUrl,
          target: "_blank",
          rel: "noreferrer",
          className: "flex items-center gap-3 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm px-4 py-3 hover:border-[#C79A4E]/30 transition-colors",
          title: sp.name,
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "img",
              {
                src: sp.logoUrl,
                alt: sp.name,
                loading: "lazy",
                decoding: "async",
                onError: (e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=48&h=48";
                },
                className: "h-6 max-w-[80px] object-contain filter brightness-90"
              },
              void 0,
              false,
              {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 336,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs font-semibold text-[#8A8D96]", children: sp.name }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 344,
              columnNumber: 15
            }, this),
            sp.tier && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-[#C79A4E] border border-[#C79A4E]/20 bg-[#C79A4E]/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider", children: sp.tier }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 345,
              columnNumber: 27
            }, this)
          ]
        },
        sp.id,
        true,
        {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 328,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 326,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
      lineNumber: 324,
      columnNumber: 7
    }, this) : null,
    SessionRegistrationPanel: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-[#2C2F38]/60 bg-[#121318] rounded-2xl overflow-hidden shadow-2xl", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-5 border-b border-[#2C2F38]/40 bg-[#17191E]/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-black tracking-[0.2em] text-[#C79A4E] uppercase", children: past ? "Session Ended" : "Register Interest" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 354,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[9px] font-black tracking-wider uppercase px-3 py-1 rounded-md border ${past ? "text-slate-500 border-[#2C2F38] bg-[#2C2F38]/30" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"}`, children: past ? "Completed" : "Open" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 357,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 353,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-5 border-b border-[#2C2F38]/40 bg-[#17191E]/10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3.5 text-xs", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 text-slate-400", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 13, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 369,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: session.date || "Date TBC" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 370,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 368,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 text-slate-400", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 13, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 373,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: [
            session.time || "Time TBC",
            " · ",
            session.duration
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 374,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 372,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 text-slate-400", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { size: 13, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 377,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: session.tag }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 378,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 376,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 367,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 366,
        columnNumber: 9
      }, this),
      past ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4", children: [
        session.videoUrl && session.isFree ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 border-b border-[#2C2F38]/60", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VideoPlayer, { url: session.videoUrl, title: session.title }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 387,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 386,
          columnNumber: 15
        }, this) : null,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-8 flex flex-col items-center text-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 36, className: "text-slate-500" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 391,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs font-bold text-white", children: "This session has ended" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 392,
            columnNumber: 15
          }, this),
          session.videoUrl ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            distExports.Link,
            {
              to: "/replays",
              className: "w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C79A4E]/10 border border-[#C79A4E]/30 text-[#C79A4E] hover:bg-[#C79A4E]/20 text-xs font-bold rounded-xl transition-all",
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 13 }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 398,
                  columnNumber: 19
                }, this),
                " Watch on Replays"
              ]
            },
            void 0,
            true,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 394,
              columnNumber: 17
            },
            this
          ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 italic", children: "Replay not yet available." }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 401,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 390,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 384,
        columnNumber: 11
      }, this) : submitted ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-12 flex flex-col items-center text-center gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheckBig, { size: 40, className: "text-emerald-400 animate-bounce" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 407,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-black text-white", children: "Successfully Registered!" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 409,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 leading-relaxed mt-1 max-w-xs", children: registrationMessage || "We've registered you for this session." }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 410,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 408,
          columnNumber: 13
        }, this),
        checkoutUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: checkoutUrl,
            className: "text-xs font-bold text-[#C79A4E] hover:underline flex items-center gap-1",
            children: [
              "Continue to Payment ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 12 }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 419,
                columnNumber: 37
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 415,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 406,
        columnNumber: 11
      }, this) : (() => {
        var _a, _b, _c, _d;
        const originalPrice = session.isFree ? 0 : session.price || 0;
        const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, className: "px-6 py-6 flex flex-col gap-4.5", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] text-slate-500 leading-relaxed", children: "Fill details below to reserve your space in this expert live session." }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 429,
            columnNumber: 15
          }, this),
          isLoggedIn ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] rounded-xl p-4.5 flex flex-col gap-2.5 text-xs text-[#8A8D96]", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between border-b border-[#2C2F38] pb-1.5 font-semibold", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Attendee Name:" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 435,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#F0EDE8]", children: name }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 436,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 434,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between font-semibold", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Email Address:" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 439,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#F0EDE8]", children: email }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 440,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 438,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 433,
            columnNumber: 17
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Full name *" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 446,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "Your name",
                  className: "bg-[#17191E] border border-[#2C2F38] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#C79A4E] transition-colors"
                },
                void 0,
                false,
                {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 447,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 445,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Work email *" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 457,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "you@company.com",
                  className: "bg-[#17191E] border border-[#2C2F38] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#C79A4E] transition-colors"
                },
                void 0,
                false,
                {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 458,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 456,
              columnNumber: 19
            }, this),
            !getUserToken() && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Password *" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 469,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "password",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "Create a password",
                  className: "bg-[#17191E] border border-[#2C2F38] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#C79A4E] transition-colors"
                },
                void 0,
                false,
                {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 470,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 468,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 444,
            columnNumber: 17
          }, this),
          !session.isFree && originalPrice > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Promo / Coupon Code" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 486,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: couponCode,
                    onChange: (e) => setCouponCode(e.target.value),
                    placeholder: "e.g. SAVE20",
                    className: "flex-1 bg-[#17191E] border border-[#2C2F38] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#C79A4E] transition-colors"
                  },
                  void 0,
                  false,
                  {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                    lineNumber: 488,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: handleApplyCoupon,
                    className: "px-4 py-3 bg-[#2C2F38] text-white text-xs font-bold rounded-xl hover:bg-[#3C404E] transition-colors cursor-pointer",
                    children: "Apply"
                  },
                  void 0,
                  false,
                  {
                    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                    lineNumber: 495,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 487,
                columnNumber: 21
              }, this),
              couponError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-red-400 mt-1", children: couponError }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 503,
                columnNumber: 37
              }, this),
              discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-emerald-400 mt-1 font-semibold", children: [
                "Discount of ",
                discountPercent,
                "% applied!"
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 504,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 485,
              columnNumber: 19
            }, this),
            finalPrice > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Payment Gateway" }, void 0, false, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 509,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "select",
                {
                  value: gateway,
                  onChange: (e) => setGateway(e.target.value),
                  className: "bg-[#17191E] border border-[#2C2F38] text-white px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-[#C79A4E] transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "stripe", children: "Stripe (Card / Apple Pay)" }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                      lineNumber: 515,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "razorpay", children: "Razorpay (UPI / Netbanking)" }, void 0, false, {
                      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                      lineNumber: 516,
                      columnNumber: 25
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 510,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 508,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-[#2C2F38]/40 pt-4 mt-1 flex flex-col gap-1.5 text-xs text-slate-500", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Original Price:" }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 523,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-slate-300", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_a = cms.paymentConfig) == null ? void 0 : _a.currency) || "USD" }).format(originalPrice) }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 524,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 522,
                columnNumber: 21
              }, this),
              discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between text-emerald-400", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "Discount (",
                  discountPercent,
                  "%):"
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 528,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "-",
                  new Intl.NumberFormat("en-US", { style: "currency", currency: ((_b = cms.paymentConfig) == null ? void 0 : _b.currency) || "USD" }).format(originalPrice * discountPercent / 100)
                ] }, void 0, true, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 529,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 527,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between border-t border-[#2C2F38]/40 pt-3 text-xs text-white font-bold", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Total to Pay:" }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 533,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#C79A4E] text-sm font-extrabold", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_c = cms.paymentConfig) == null ? void 0 : _c.currency) || "USD" }).format(finalPrice) }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 534,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                lineNumber: 532,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 521,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 484,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "submit",
              className: "mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black bg-[#C79A4E] text-[#1A1D24] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_16px_rgba(199,154,78,0.15)]",
              children: [
                finalPrice > 0 ? "Pay & Register " + new Intl.NumberFormat("en-US", { style: "currency", currency: ((_d = cms.paymentConfig) == null ? void 0 : _d.currency) || "USD" }).format(finalPrice) : "Register Now",
                " ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 13 }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
                  lineNumber: 544,
                  columnNumber: 194
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
              lineNumber: 540,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[9px] text-slate-600 text-center uppercase tracking-wider font-semibold", children: "Secure SSL Transaction" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
            lineNumber: 546,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
          lineNumber: 428,
          columnNumber: 13
        }, this);
      })()
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
      lineNumber: 352,
      columnNumber: 7
    }, this)
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 557,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 558,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: pageUrl }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 559,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 560,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 561,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 562,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: pageUrl }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 563,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 564,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 565,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:title", content: title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 566,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:description", content: description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 567,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 568,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(eventSchema) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 569,
        columnNumber: 9
      }, this),
      cms.sessionDetailPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.sessionDetailPageCss }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
        lineNumber: 570,
        columnNumber: 37
      }, this) : null
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
      lineNumber: 556,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
      lineNumber: 573,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
      lineNumber: 572,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/pages/session-detail.tsx",
    lineNumber: 555,
    columnNumber: 5
  }, this);
}
export {
  SessionDetailPage as default
};
