import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as distExports, u as useCmsContent, F as FALLBACK_CMS_CONTENT, C as Calendar, H as Helmet } from "./entry-server-CdzZ2syk.js";
import { C as CirclePlay } from "./circle-play-CGEMY6Bh.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-CTAfdSh-.js";
import { C as Clock } from "./clock-pE6HbfJx.js";
import { T as Tag } from "./tag-D6yemw6N.js";
import { C as CircleCheckBig } from "./circle-check-big-urLkLviu.js";
import { A as ArrowRight } from "./arrow-right-C6-A-7_5.js";
import { m as motion } from "./proxy-Xo9ayrB_.js";
import { U as Users } from "./users-f2E1N8Pr.js";
import { G as Globe } from "./globe-PcuVdVQ1.js";
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
import "./DynamicForm-BkEFx9W_.js";
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center justify-center border border-[#2C2F38] rounded-sm bg-[#1A1D24] p-6 text-center ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: url,
        target: "_blank",
        rel: "noreferrer",
        className: "text-sm font-semibold text-[#C79A4E] hover:underline flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 16 }),
          " Watch Video"
        ]
      }
    ) });
  }
  const autoThumb = !thumbnailUrl && info.provider === "youtube" ? `https://img.youtube.com/vi/${info.videoId}/maxresdefault.jpg` : thumbnailUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `relative w-full overflow-hidden rounded-sm bg-black ${className}`,
      style: { aspectRatio: "16 / 9" },
      children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          src: `${info.embedUrl}&autoplay=1`,
          title,
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          className: "absolute inset-0 w-full h-full border-0",
          loading: "lazy"
        }
      ) : (
        /* Thumbnail + play button overlay — no iframe until user clicks */
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setPlaying(true),
            className: "group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer",
            "aria-label": `Play ${title}`,
            children: [
              autoThumb ? /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#1A1D24]" }),
              info.provider === "vimeo" && !autoThumb && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1A1D24]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#8A8D96] font-semibold", children: [
                "Vimeo · ",
                title
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-16 h-16 rounded-full bg-[#C79A4E] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 32, className: "text-[#1A1D24] ml-0.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-3 left-3 text-[10px] font-bold text-white/70 uppercase tracking-wider", children: info.provider === "youtube" ? "YouTube" : "Vimeo" })
            ]
          }
        )
      )
    }
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-black text-[#2C2F38]", children: "404" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[#F0EDE8]", children: "Session not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96]", children: "This session may have been removed or the link is incorrect." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/sessions", className: "inline-flex items-center gap-2 text-sm font-semibold text-[#C79A4E] hover:underline", children: [
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
    SessionSpeakers: speakers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, custom: 0.2, className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
        " Presenters"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: speakers.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm p-4", children: [
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
            className: "w-12 h-12 rounded-full object-cover border border-[#2C2F38] shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-[#F0EDE8] text-sm", children: sp.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#C79A4E] font-medium mb-1", children: [
            sp.role,
            " · ",
            sp.organisation
          ] }),
          sp.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#8A8D96] leading-relaxed line-clamp-3", children: sp.bio })
        ] }),
        sp.socialUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 14 }) })
      ] }, sp.id)) })
    ] }) : null,
    SessionSponsors: sponsors.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, custom: 0.25, className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4", children: "Session Sponsors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: sponsors.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: sp.websiteUrl,
          target: "_blank",
          rel: "noreferrer",
          className: "flex items-center gap-3 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm px-4 py-3 hover:border-[#C79A4E]/30 transition-colors",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-[#8A8D96]", children: sp.name }),
            sp.tier && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-[#C79A4E] border border-[#C79A4E]/20 bg-[#C79A4E]/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider", children: sp.tier })
          ]
        },
        sp.id
      )) })
    ] }) : null,
    SessionRegistrationPanel: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-[#2C2F38] flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold tracking-widest text-[#C79A4E] uppercase", children: past ? "Session Ended" : "Register Interest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${past ? "text-[#8A8D96] border-[#2C2F38] bg-[#2C2F38]/30" : "text-green-400 border-green-900/40 bg-green-950/20"}`, children: past ? "Completed" : "Open" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-[#2C2F38]/60 bg-[#1A1D24]/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12, className: "text-[#C79A4E] shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: session.date || "Date TBC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: "text-[#C79A4E] shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            session.time || "Time TBC",
            " · ",
            session.duration
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#8A8D96]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 12, className: "text-[#C79A4E] shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: session.tag })
        ] })
      ] }) }),
      past ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        session.videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-[#2C2F38]/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { url: session.videoUrl, title: session.title }) }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 flex flex-col items-center text-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 36, className: "text-[#8A8D96]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[#F0EDE8]", children: "This session has ended" }),
          session.videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: "/replays",
              className: "w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C79A4E]/10 border border-[#C79A4E]/30 text-[#C79A4E] hover:bg-[#C79A4E]/20 text-sm font-semibold rounded-sm transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 14 }),
                " Watch on Replays"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#8A8D96] italic", children: "Replay not yet available." })
        ] })
      ] }) : submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 flex flex-col items-center text-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 36, className: "text-[#C79A4E]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-[#F0EDE8]", children: "You're on the list!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#8A8D96] leading-relaxed max-w-xs", children: "We'll notify you as soon as registration opens for this session." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-6 py-6 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#8A8D96] leading-relaxed", children: "Register your interest and we'll notify you when registration opens for this session." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Full name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              required: true,
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Your name",
              className: "bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-4 py-2.5 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Work email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "you@company.com",
              className: "bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-4 py-2.5 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            className: "mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all",
            children: [
              "Register My Interest ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#4A4D56] text-center", children: "No spam — session updates only." })
      ] })
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
