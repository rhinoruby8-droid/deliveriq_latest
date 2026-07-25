import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, u as useCmsContent, F as FALLBACK_CMS_CONTENT, r as reactExports, j as jsxRuntimeExports, C as Calendar, a as ArrowRight, g as getUserToken, H as Helmet } from "./entry-server-QtrLgn1N.js";
import { V as VideoPlayer } from "./VideoPlayer-Dv46olnE.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-BkNVbN6P.js";
import { A as ArrowLeft } from "./arrow-left-BwArLChT.js";
import { C as Clock } from "./clock-B5hOY9LC.js";
import { T as Tag } from "./tag-AG0jTU0b.js";
import { C as CirclePlay } from "./circle-play-ChDDspgp.js";
import { C as CircleCheckBig } from "./circle-check-big-bUnoqoLc.js";
import { m as motion } from "./proxy-DK08kDt0.js";
import { U as Users } from "./users-B0Eynbt8.js";
import { G as Globe } from "./globe-B4acYbBo.js";
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
import "./DynamicForm-kLH1uGDg.js";
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-black text-[#2C2F38]", children: "404" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Session not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This session may have been removed or the link is incorrect." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/sessions", className: "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
        " Back to Sessions"
      ] })
    ] });
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
    ${past ? '<span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/60 border border-border px-3 py-1 rounded-full">Past Session</span>' : '<span class="text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-3 py-1 rounded-full animate-pulse">Upcoming</span>'}
    ${session.status === "draft" ? '<span class="text-[10px] font-bold text-yellow-400 uppercase tracking-wider bg-yellow-950/30 border border-yellow-900/30 px-3 py-1 rounded-full">Draft</span>' : ""}
  `;
  let htmlContent = cms.sessionDetailPageHtml || FALLBACK_CMS_CONTENT.sessionDetailPageHtml;
  htmlContent = htmlContent.replace(/\{\{session.title\}\}/g, session.title).replace(/\{\{session.tag\}\}/g, session.tag).replace(/\{\{session.date\}\}/g, session.date || "Date TBC").replace(/\{\{session.time\}\}/g, session.time || "Time TBC").replace(/\{\{session.duration\}\}/g, session.duration || "").replace(/\{\{session.description\}\}/g, session.description).replace(/\{\{session.statusBadge\}\}/g, statusBadgeHtml);
  const widgets = {
    SessionSpeakers: speakers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, custom: 0.2, className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
        " Presenters"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: speakers.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 border border-border bg-card/40 rounded-sm p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: sp.avatarUrl,
            alt: sp.name,
            loading: "lazy",
            decoding: "async",
            onError: (e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64";
            },
            className: "w-12 h-12 rounded-full object-cover border border-border shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: sp.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-medium mb-1", children: [
            sp.role,
            " · ",
            sp.organisation
          ] }),
          sp.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-3", children: sp.bio })
        ] }),
        sp.socialUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-muted-foreground hover:text-primary transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 14 }) })
      ] }, sp.id)) })
    ] }) : null,
    SessionSponsors: sponsors.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, custom: 0.25, className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4", children: "Session Sponsors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: sponsors.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: sp.websiteUrl,
          target: "_blank",
          rel: "noreferrer",
          className: "flex items-center gap-3 border border-border bg-card/40 rounded-sm px-4 py-3 hover:border-primary/30 transition-colors",
          title: sp.name,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
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
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: sp.name }),
            sp.tier && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider", children: sp.tier })
          ]
        },
        sp.id
      )) })
    ] }) : null,
    SessionRegistrationPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/60 bg-background rounded-2xl overflow-hidden shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-b border-border/40 bg-card/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black tracking-[0.2em] text-primary uppercase", children: past ? "Session Ended" : "Register Interest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-black tracking-wider uppercase px-3 py-1 rounded-md border ${past ? "text-slate-500 border-border bg-muted/30" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"}`, children: past ? "Completed" : "Open" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-border/40 bg-card/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: session.date || "Date TBC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13, className: "text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            session.time || "Time TBC",
            " · ",
            session.duration
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 13, className: "text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: session.tag })
        ] })
      ] }) }),
      past ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        session.videoUrl && session.isFree ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { url: session.videoUrl, title: session.title }) }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 flex flex-col items-center text-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 36, className: "text-slate-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-white", children: "This session has ended" }),
          session.videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: "/replays",
              className: "w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 text-xs font-bold rounded-xl transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 13 }),
                " Watch on Replays"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 italic", children: "Replay not yet available." })
        ] })
      ] }) : submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-12 flex flex-col items-center text-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 40, className: "text-emerald-400 animate-bounce" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black text-white", children: "Successfully Registered!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 leading-relaxed mt-1 max-w-xs", children: registrationMessage || "We've registered you for this session." })
        ] }),
        checkoutUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: checkoutUrl,
            className: "text-xs font-bold text-primary hover:underline flex items-center gap-1",
            children: [
              "Continue to Payment ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
            ]
          }
        )
      ] }) : (() => {
        var _a, _b, _c, _d;
        const originalPrice = session.isFree ? 0 : session.price || 0;
        const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-6 py-6 flex flex-col gap-4.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 leading-relaxed", children: "Fill details below to reserve your space in this expert live session." }),
          isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background border border-border rounded-xl p-4.5 flex flex-col gap-2.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border pb-1.5 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Attendee Name:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email Address:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: email })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Full name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "Your name",
                  className: "bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Work email *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "you@company.com",
                  className: "bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                }
              )
            ] }),
            !getUserToken() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Password *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "Create a password",
                  className: "bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                }
              )
            ] })
          ] }),
          !session.isFree && originalPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Promo / Coupon Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: couponCode,
                    onChange: (e) => setCouponCode(e.target.value),
                    placeholder: "e.g. SAVE20",
                    className: "flex-1 bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleApplyCoupon,
                    className: "px-4 py-3 bg-muted text-white text-xs font-bold rounded-xl hover:bg-[#3C404E] transition-colors cursor-pointer",
                    children: "Apply"
                  }
                )
              ] }),
              couponError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-red-400 mt-1", children: couponError }),
              discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-emerald-400 mt-1 font-semibold", children: [
                "Discount of ",
                discountPercent,
                "% applied!"
              ] })
            ] }),
            finalPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] font-black text-slate-500 uppercase tracking-widest", children: "Payment Gateway" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: gateway,
                  onChange: (e) => setGateway(e.target.value),
                  className: "bg-card border border-border text-white px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-primary transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "stripe", children: "Stripe (Card / Apple Pay)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "razorpay", children: "Razorpay (UPI / Netbanking)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-4 mt-1 flex flex-col gap-1.5 text-xs text-slate-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Original Price:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-300", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_a = cms.paymentConfig) == null ? void 0 : _a.currency) || "USD" }).format(originalPrice) })
              ] }),
              discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-emerald-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Discount (",
                  discountPercent,
                  "%):"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "-",
                  new Intl.NumberFormat("en-US", { style: "currency", currency: ((_b = cms.paymentConfig) == null ? void 0 : _b.currency) || "USD" }).format(originalPrice * discountPercent / 100)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border/40 pt-3 text-xs text-white font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total to Pay:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm font-extrabold", children: new Intl.NumberFormat("en-US", { style: "currency", currency: ((_c = cms.paymentConfig) == null ? void 0 : _c.currency) || "USD" }).format(finalPrice) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black bg-primary text-[#1A1D24] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_16px_rgba(199,154,78,0.15)]",
              children: [
                finalPrice > 0 ? "Pay & Register " + new Intl.NumberFormat("en-US", { style: "currency", currency: ((_d = cms.paymentConfig) == null ? void 0 : _d.currency) || "USD" }).format(finalPrice) : "Register Now",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-slate-600 text-center uppercase tracking-wider font-semibold", children: "Secure SSL Transaction" })
        ] });
      })()
    ] })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: pageUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: pageUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(eventSchema) }),
      cms.sessionDetailPageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.sessionDetailPageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets }) })
  ] });
}
export {
  SessionDetailPage as default
};
