import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, d as distExports, u as useCmsContent, F as FALLBACK_CMS_CONTENT, C as Calendar, H as Helmet } from "./entry-server-Cv5aoiDe.js";
import { C as CirclePlay } from "./circle-play-DcHS-R3g.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer--R7_Ihxq.js";
import { C as Clock } from "./clock-BN05muFi.js";
import { T as Tag } from "./tag-5sduCzmd.js";
import { C as CircleCheckBig } from "./circle-check-big-CPjXYsmi.js";
import { A as ArrowRight } from "./arrow-right-u2OWLyoR.js";
import { m as motion } from "./proxy-K1yGreJG.js";
import { U as Users } from "./users-BRzZv_bL.js";
import { G as Globe } from "./globe-C_8WpPZE.js";
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
import "./DynamicForm-BwqxjMHR.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
async function notifySubmission(payload) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
  }
}
function parseVideoUrl(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/) || url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      provider: "youtube",
      videoId,
      // Use privacy-enhanced mode (no tracking until user plays)
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
    };
  }
  const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      provider: "vimeo",
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?dnt=1&color=C79A4E`
    };
  }
  return null;
}
function VideoPlayer({ url, title = "Video", thumbnailUrl, className = "" }) {
  const [playing, setPlaying] = reactExports.useState(false);
  const info = parseVideoUrl(url);
  if (!info) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `flex items-center justify-center border border-[#2C2F38] rounded-sm bg-[#1A1D24] p-6 text-center ${className}`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "a",
      {
        href: url,
        target: "_blank",
        rel: "noreferrer",
        className: "text-sm font-semibold text-[#C79A4E] hover:underline flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 16 }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
            lineNumber: 27,
            columnNumber: 11
          }, this),
          " Watch Video"
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
        lineNumber: 21,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this);
  }
  const autoThumb = !thumbnailUrl && info.provider === "youtube" ? `https://img.youtube.com/vi/${info.videoId}/maxresdefault.jpg` : thumbnailUrl;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: `relative w-full overflow-hidden rounded-sm bg-black ${className}`,
      style: { aspectRatio: "16 / 9" },
      children: playing ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "iframe",
        {
          src: `${info.embedUrl}&autoplay=1`,
          title,
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          className: "absolute inset-0 w-full h-full border-0",
          loading: "lazy"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
          lineNumber: 45,
          columnNumber: 9
        },
        this
      ) : (
        /* Thumbnail + play button overlay — no iframe until user clicks */
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setPlaying(true),
            className: "group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer",
            "aria-label": `Play ${title}`,
            children: [
              autoThumb ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "img",
                {
                  src: autoThumb,
                  alt: title,
                  loading: "lazy",
                  decoding: "async",
                  className: "absolute inset-0 w-full h-full object-cover",
                  onError: (e) => {
                    e.target.style.display = "none";
                  }
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                  lineNumber: 61,
                  columnNumber: 13
                },
                this
              ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[#1A1D24]" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 70,
                columnNumber: 13
              }, this),
              info.provider === "vimeo" && !autoThumb && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1A1D24]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-[#8A8D96] font-semibold", children: [
                "Vimeo · ",
                title
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 76,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 75,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 81,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10 w-16 h-16 rounded-full bg-[#C79A4E] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 32, className: "text-[#1A1D24] ml-0.5" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 85,
                columnNumber: 13
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 84,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute bottom-3 left-3 text-[10px] font-bold text-white/70 uppercase tracking-wider", children: info.provider === "youtube" ? "YouTube" : "Vimeo" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 89,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
            lineNumber: 55,
            columnNumber: 9
          },
          this
        )
      )
    },
    void 0,
    false,
    {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
      lineNumber: 40,
      columnNumber: 5
    },
    this
  );
}
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
  const session = cms.sessions.find((s) => s.id === id);
  if (!session) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-4xl font-black text-[#2C2F38]", children: "404" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold text-[#F0EDE8]", children: "Session not found" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96]", children: "This session may have been removed or the link is incorrect." }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(distExports.Link, { to: "/sessions", className: "inline-flex items-center gap-2 text-sm font-semibold text-[#C79A4E] hover:underline", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { size: 14 }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this),
        " Back to Sessions"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 41,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    await notifySubmission({ source: `register:${session.title}`, name, email });
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
          lineNumber: 112,
          columnNumber: 11
        }, this),
        " Presenters"
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 111,
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
            lineNumber: 117,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-bold text-[#F0EDE8] text-sm", children: sp.name }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 126,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#C79A4E] font-medium mb-1", children: [
            sp.role,
            " · ",
            sp.organisation
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 127,
            columnNumber: 17
          }, this),
          sp.bio && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed line-clamp-3", children: sp.bio }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 128,
            columnNumber: 28
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 125,
          columnNumber: 15
        }, this),
        sp.socialUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Globe, { size: 14 }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 132,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 131,
          columnNumber: 17
        }, this)
      ] }, sp.id, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 116,
        columnNumber: 13
      }, this)) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 114,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this) : null,
    SessionSponsors: sponsors.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeUp, custom: 0.25, className: "mb-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4", children: "Session Sponsors" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 142,
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
                lineNumber: 153,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs font-semibold text-[#8A8D96]", children: sp.name }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 161,
              columnNumber: 15
            }, this),
            sp.tier && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-[#C79A4E] border border-[#C79A4E]/20 bg-[#C79A4E]/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider", children: sp.tier }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 162,
              columnNumber: 27
            }, this)
          ]
        },
        sp.id,
        true,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 145,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 141,
      columnNumber: 7
    }, this) : null,
    SessionRegistrationPanel: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 border-b border-[#2C2F38] flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold tracking-widest text-[#C79A4E] uppercase", children: past ? "Session Ended" : "Register Interest" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${past ? "text-[#8A8D96] border-[#2C2F38] bg-[#2C2F38]/30" : "text-green-400 border-green-900/40 bg-green-950/20"}`, children: past ? "Completed" : "Open" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 174,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 170,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-4 border-b border-[#2C2F38]/60 bg-[#1A1D24]/60", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-2 text-xs", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 12, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 186,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: session.date || "Date TBC" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 187,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 185,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 12, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 190,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
            session.time || "Time TBC",
            " · ",
            session.duration
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 191,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 189,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { size: 12, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 194,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: session.tag }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 195,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 193,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 184,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 183,
        columnNumber: 9
      }, this),
      past ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4", children: [
        session.videoUrl ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 border-b border-[#2C2F38]/60", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VideoPlayer, { url: session.videoUrl, title: session.title }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 204,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 203,
          columnNumber: 15
        }, this) : null,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-6 flex flex-col items-center text-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 36, className: "text-[#8A8D96]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 208,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-semibold text-[#F0EDE8]", children: "This session has ended" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 209,
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
                  lineNumber: 215,
                  columnNumber: 19
                }, this),
                " Watch on Replays"
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
              lineNumber: 211,
              columnNumber: 17
            },
            this
          ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] italic", children: "Replay not yet available." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 218,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 207,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 201,
        columnNumber: 11
      }, this) : submitted ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-10 flex flex-col items-center text-center gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheckBig, { size: 36, className: "text-[#C79A4E]" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 224,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-base font-bold text-[#F0EDE8]", children: "You're on the list!" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 225,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed max-w-xs", children: "We'll notify you as soon as registration opens for this session." }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 226,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 223,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, className: "px-6 py-6 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed", children: "Register your interest and we'll notify you when registration opens for this session." }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 232,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Full name *" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 236,
            columnNumber: 15
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
              lineNumber: 237,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 235,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Work email *" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 247,
            columnNumber: 15
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
              lineNumber: 248,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 246,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            type: "submit",
            className: "mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all",
            children: [
              "Register My Interest ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
                lineNumber: 261,
                columnNumber: 36
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
            lineNumber: 257,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-[#4A4D56] text-center", children: "No spam — session updates only." }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
          lineNumber: 263,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 231,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 169,
      columnNumber: 7
    }, this)
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 273,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 274,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: pageUrl }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 275,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 276,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 277,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 278,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: pageUrl }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 279,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 280,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 281,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 282,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 283,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 284,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(eventSchema) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 285,
        columnNumber: 9
      }, this),
      cms.sessionDetailPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.sessionDetailPageCss }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
        lineNumber: 286,
        columnNumber: 37
      }, this) : null
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 272,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 289,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
      lineNumber: 288,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/session-detail.tsx",
    lineNumber: 271,
    columnNumber: 5
  }, this);
}
export {
  SessionDetailPage as default
};
