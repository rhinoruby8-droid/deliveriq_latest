import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, u as useCmsContent, F as FALLBACK_CMS_CONTENT, r as reactExports, j as jsxDevRuntimeExports, C as Calendar, a as ArrowRight, H as Helmet } from "./entry-server-DqkZC2NC.js";
import { V as VideoPlayer } from "./VideoPlayer-DaySK87-.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-Cwwqv8sf.js";
import { A as ArrowLeft } from "./arrow-left-DZTJN1Io.js";
import { C as Clock } from "./clock-DuUSPseH.js";
import { T as Tag } from "./tag-BJmR4aUz.js";
import { C as CirclePlay } from "./circle-play-y-DjdEnC.js";
import { C as CircleCheckBig } from "./circle-check-big-CYwBAWZ2.js";
import { m as motion } from "./proxy-CFgZDI-s.js";
import { U as Users } from "./users-8Fnq1bTK.js";
import { G as Globe } from "./globe-DtV95820.js";
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
import "./DynamicForm-Dev-NrDP.js";
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
function SessionDetailPage() {
  const { id } = distExports.useParams();
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [discountPercent, setDiscountPercent] = reactExports.useState(0);
  const [couponError, setCouponError] = reactExports.useState("");
  const [gateway, setGateway] = reactExports.useState("stripe");
  const [registrationMessage, setRegistrationMessage] = reactExports.useState("");
  const [checkoutUrl, setCheckoutUrl] = reactExports.useState("");
  const session = cms.sessions.find((s) => s.id === id);
  if (!session) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-4xl font-black text-[#2C2F38]", children: "404" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold text-[#F0EDE8]", children: "Session not found" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96]", children: "This session may have been removed or the link is incorrect." }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "inline-flex items-center gap-2 text-sm font-semibold text-[#C79A4E] hover:underline", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 14 }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this),
        " Back to Sessions"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 47,
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
    if (found) {
      setDiscountPercent(found.discountPercentage);
    } else {
      setCouponError("Invalid coupon code");
      setDiscountPercent(0);
    }
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
      setSubmitted(true);
      if (data.checkoutUrl) {
        setCheckoutUrl(data.checkoutUrl);
        setRegistrationMessage("Redirecting to checkout...");
        window.location.href = data.checkoutUrl;
      } else {
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
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 167,
          columnNumber: 11
        }, this),
        " Presenters"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 166,
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
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 172,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-bold text-[#F0EDE8] text-sm", children: sp.name }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 181,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#C79A4E] font-medium mb-1", children: [
            sp.role,
            " · ",
            sp.organisation
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 182,
            columnNumber: 17
          }, this),
          sp.bio && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed line-clamp-3", children: sp.bio }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 183,
            columnNumber: 28
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 180,
          columnNumber: 15
        }, this),
        sp.socialUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Globe, { size: 14 }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 187,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 186,
          columnNumber: 17
        }, this)
      ] }, sp.id, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 171,
        columnNumber: 13
      }, this)) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 169,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 165,
      columnNumber: 7
    }, this) : null,
    SessionSponsors: sponsors.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeUp, custom: 0.25, className: "mb-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4", children: "Session Sponsors" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 197,
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
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 208,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs font-semibold text-[#8A8D96]", children: sp.name }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 216,
              columnNumber: 15
            }, this),
            sp.tier && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-[#C79A4E] border border-[#C79A4E]/20 bg-[#C79A4E]/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider", children: sp.tier }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 217,
              columnNumber: 27
            }, this)
          ]
        },
        sp.id,
        true,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 200,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 198,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 196,
      columnNumber: 7
    }, this) : null,
    SessionRegistrationPanel: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 border-b border-[#2C2F38] flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold tracking-widest text-[#C79A4E] uppercase", children: past ? "Session Ended" : "Register Interest" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 226,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${past ? "text-[#8A8D96] border-[#2C2F38] bg-[#2C2F38]/30" : "text-green-400 border-green-900/40 bg-green-950/20"}`, children: past ? "Completed" : "Open" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 229,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 225,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 border-b border-[#2C2F38]/60 bg-[#1A1D24]/60", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2 text-xs", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 12, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 241,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: session.date || "Date TBC" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 242,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 240,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 12, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 245,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
            session.time || "Time TBC",
            " · ",
            session.duration
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 246,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 244,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { size: 12, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 249,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: session.tag }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 250,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 248,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 239,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 238,
        columnNumber: 9
      }, this),
      past ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4", children: [
        session.videoUrl && session.isFree ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 border-b border-[#2C2F38]/60", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VideoPlayer, { url: session.videoUrl, title: session.title }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 259,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 258,
          columnNumber: 15
        }, this) : null,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-6 flex flex-col items-center text-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 36, className: "text-[#8A8D96]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 263,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-semibold text-[#F0EDE8]", children: "This session has ended" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 264,
            columnNumber: 15
          }, this),
          session.videoUrl ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            distExports.Link,
            {
              to: "/replays",
              className: "w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C79A4E]/10 border border-[#C79A4E]/30 text-[#C79A4E] hover:bg-[#C79A4E]/20 text-sm font-semibold rounded-sm transition-all",
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 14 }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 270,
                  columnNumber: 19
                }, this),
                " Watch on Replays"
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 266,
              columnNumber: 17
            },
            this
          ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] italic", children: "Replay not yet available." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 262,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 256,
        columnNumber: 11
      }, this) : submitted ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-10 flex flex-col items-center text-center gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheckBig, { size: 36, className: "text-green-400" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 279,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-base font-bold text-[#F0EDE8]", children: "Successfully Registered!" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 280,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed max-w-xs", children: registrationMessage || "We've registered you for this session." }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 281,
          columnNumber: 13
        }, this),
        checkoutUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: checkoutUrl,
            className: "mt-2 text-xs text-[#C79A4E] hover:underline",
            children: "Click here if you aren't redirected automatically"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 285,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 278,
        columnNumber: 11
      }, this) : (() => {
        const originalPrice = session.isFree ? 0 : session.price || 0;
        const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, className: "px-6 py-6 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed", children: "Register for this session. Complete payment if required." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 299,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Full name *" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 303,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "text",
                required: true,
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Your name",
                className: "bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-4 py-2.5 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 304,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 302,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Work email *" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 314,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "you@company.com",
                className: "bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-4 py-2.5 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 315,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 313,
            columnNumber: 15
          }, this),
          !session.isFree && originalPrice > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Promo / Coupon Code" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 328,
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
                    className: "flex-1 bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-4 py-2.5 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                    lineNumber: 330,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: handleApplyCoupon,
                    className: "px-4 py-2 bg-[#2C2F38] text-[#F0EDE8] text-xs font-semibold rounded-sm hover:bg-[#2C2F38]/80 transition-colors",
                    children: "Apply"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                    lineNumber: 337,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 329,
                columnNumber: 21
              }, this),
              couponError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-red-400 mt-1", children: couponError }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 345,
                columnNumber: 37
              }, this),
              discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-green-400 mt-1", children: [
                "Discount of ",
                discountPercent,
                "% applied!"
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 346,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 327,
              columnNumber: 19
            }, this),
            finalPrice > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Payment Gateway" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 351,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "select",
                {
                  value: gateway,
                  onChange: (e) => setGateway(e.target.value),
                  className: "bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 text-sm rounded focus:outline-none focus:border-[#C79A4E]/50 transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "stripe", children: "Stripe (Card / Apple Pay)" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                      lineNumber: 357,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "paypal", children: "PayPal" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                      lineNumber: 358,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "razorpay", children: "Razorpay" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                      lineNumber: 359,
                      columnNumber: 25
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 352,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 350,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-[#2C2F38]/60 pt-3 mt-1 flex flex-col gap-1 text-xs text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Original Price:" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 366,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-[#F0EDE8]", children: [
                  "$",
                  originalPrice.toFixed(2)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 367,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 365,
                columnNumber: 21
              }, this),
              discountPercent > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between text-green-400", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "Discount (",
                  discountPercent,
                  "%):"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 371,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                  "-$",
                  (originalPrice * discountPercent / 100).toFixed(2)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 372,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 370,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between border-t border-[#2C2F38]/40 pt-2 text-sm text-[#F0EDE8] font-bold", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Total to Pay:" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 376,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#C79A4E]", children: [
                  "$",
                  finalPrice.toFixed(2)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 377,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 375,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 364,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 326,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "submit",
              className: "mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all cursor-pointer",
              children: [
                finalPrice > 0 ? "Pay & Register $" + finalPrice.toFixed(2) : "Register Now",
                " ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                  lineNumber: 387,
                  columnNumber: 96
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 383,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-[#4A4D56] text-center", children: "Secure checkout." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 389,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 298,
          columnNumber: 13
        }, this);
      })()
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 224,
      columnNumber: 7
    }, this)
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 400,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 401,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: pageUrl }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 402,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 403,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 404,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 405,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: pageUrl }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 406,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 407,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 408,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 409,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 410,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 411,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(eventSchema) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 412,
        columnNumber: 9
      }, this),
      cms.sessionDetailPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.sessionDetailPageCss }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 413,
        columnNumber: 37
      }, this) : null
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 399,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 416,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 415,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
    lineNumber: 398,
    columnNumber: 5
  }, this);
}
export {
  SessionDetailPage as default
};
