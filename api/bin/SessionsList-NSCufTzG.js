import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, r as reactExports, j as jsxRuntimeExports, d as distExports, X, C as Calendar } from "./entry-server-CdzZ2syk.js";
import { C as ChevronDown } from "./chevron-down-ClmTSOBP.js";
import { T as Tag } from "./tag-D6yemw6N.js";
import { C as Clock } from "./clock-pE6HbfJx.js";
import { U as Users } from "./users-f2E1N8Pr.js";
import { G as Globe } from "./globe-PcuVdVQ1.js";
import { C as CirclePlay } from "./circle-play-CGEMY6Bh.js";
import { A as ArrowRight } from "./arrow-right-C6-A-7_5.js";
function isSessionPast(dateStr) {
  if (!dateStr) return false;
  const sessionDate = new Date(dateStr);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  sessionDate.setHours(0, 0, 0, 0);
  return sessionDate < today;
}
function SessionModal({ session, speakers, sponsors, isPast, onClose }) {
  const navigate = distExports.useNavigate();
  const titleId = `session-modal-title-${session.id}`;
  const firstFocusRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = firstFocusRef.current) == null ? void 0 : _a.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": titleId,
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-2xl bg-[#21242C] border border-[#2C2F38] rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 z-10 p-1.5 rounded text-[#8A8D96] hover:text-[#F0EDE8] hover:bg-[#2C2F38] transition-colors",
            "aria-label": "Close",
            ref: firstFocusRef,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#C79A4E] uppercase bg-[#C79A4E]/5 border border-[#C79A4E]/20 px-2.5 py-0.5 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 9 }),
              " ",
              session.tag
            ] }),
            isPast ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider bg-[#2C2F38]/60 border border-[#2C2F38] px-2.5 py-0.5 rounded-full", children: "Past Session" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-2.5 py-0.5 rounded-full", children: "Upcoming" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: titleId, className: "text-2xl font-bold text-[#F0EDE8] leading-tight mb-4", children: session.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-5 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-[#C79A4E] shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: session.date || "Date TBC" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13, className: "text-[#C79A4E] shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                session.time || "Time TBC",
                " · ",
                session.duration
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96] leading-relaxed mb-6", children: session.description }),
          speakers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-widest mb-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
              " Presenters"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: speakers.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-[#1A1D24] border border-[#2C2F38] rounded-sm p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: sp.avatarUrl,
                  alt: sp.name,
                  loading: "lazy",
                  decoding: "async",
                  onError: (e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=48&h=48";
                  },
                  className: "w-9 h-9 rounded-full object-cover border border-[#2C2F38] shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-[#F0EDE8] text-xs", children: sp.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-[#C79A4E]", children: [
                  sp.role,
                  " · ",
                  sp.organisation
                ] }),
                sp.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#8A8D96] mt-1 leading-relaxed line-clamp-2", children: sp.bio })
              ] }),
              sp.socialUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 12 }) })
            ] }, sp.id)) })
          ] }),
          sponsors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-widest mb-3", children: "Sponsors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sponsors.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: sp.websiteUrl,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center gap-2 bg-[#1A1D24] border border-[#2C2F38] px-3 py-2 rounded hover:border-[#C79A4E]/30 transition-colors",
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
                      className: "h-5 max-w-[60px] object-contain filter brightness-90"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-[#8A8D96]", children: sp.name })
                ]
              },
              sp.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2C2F38]", children: [
            isPast ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: "/replays",
                onClick: onClose,
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2C2F38] border border-[#2C2F38] text-[#8A8D96] hover:bg-[#C79A4E]/10 hover:border-[#C79A4E]/30 hover:text-[#C79A4E] text-sm font-semibold rounded-sm transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 14 }),
                  " View Replay"
                ]
              }
            ) : (
              // TODO [PAYMENT GATEWAY]: Replace with paid registration flow when implemented.
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    onClose();
                    navigate(`/sessions/${session.id}`);
                  },
                  className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C79A4E] text-[#1A1D24] hover:brightness-110 text-sm font-bold rounded-sm transition-all",
                  children: [
                    "Register Interest ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                  ]
                }
              )
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  onClose();
                  navigate(`/sessions/${session.id}`);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2C2F38] text-[#8A8D96] hover:border-[#C79A4E]/30 hover:text-[#F0EDE8] text-sm font-semibold rounded-sm transition-all",
                children: [
                  "Full Session Details ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function SessionCard({ session, speakers, sponsors, isPast, onTitleClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group border rounded-sm p-6 transition-all duration-200 ${isPast ? "border-[#2C2F38]/60 bg-[#1A1D24]/60 opacity-80 hover:opacity-100 hover:border-[#2C2F38]" : "border-[#2C2F38] bg-[#21242C]/40 hover:border-[#C79A4E]/30"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-[#2C2F38]/40 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-sm border ${isPast ? "text-[#8A8D96] bg-[#2C2F38]/20 border-[#2C2F38]/40" : "text-[#C79A4E] bg-[#C79A4E]/5 border-[#C79A4E]/20"}`, children: session.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#8A8D96] font-medium flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: isPast ? "text-[#8A8D96]" : "text-[#C79A4E]" }),
          session.duration
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#8A8D96] font-semibold flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: isPast ? "text-[#8A8D96]" : "text-[#C79A4E]" }),
        session.date,
        " @ ",
        session.time
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onTitleClick,
          className: `text-left text-xl font-bold leading-tight mb-3 transition-colors underline-offset-4 hover:underline cursor-pointer ${isPast ? "text-[#8A8D96] hover:text-[#F0EDE8]" : "text-[#F0EDE8] hover:text-[#C79A4E]"}`,
          children: session.title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#8A8D96] leading-relaxed max-w-3xl line-clamp-2", children: session.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pt-4 border-t border-[#2C2F38]/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Presenters:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            speakers.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-[#1A1D24] border border-[#2C2F38] pl-1 pr-2 py-0.5 rounded-full text-[10px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: sp.avatarUrl,
                  alt: sp.name,
                  loading: "lazy",
                  decoding: "async",
                  onError: (e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=32&h=32";
                  },
                  className: "w-4 h-4 rounded-full object-cover bg-[#21242C] border border-[#2C2F38]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#F0EDE8]", children: sp.name })
            ] }, sp.id)),
            speakers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-[#8A8D96] italic", children: "TBA" })
          ] })
        ] }),
        sponsors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-[#8A8D96] uppercase tracking-wider", children: "Sponsors:" }),
          sponsors.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: sp.websiteUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "h-6 px-1.5 py-0.5 rounded bg-[#1A1D24] border border-[#2C2F38] flex items-center justify-center hover:border-[#C79A4E]/30 transition-colors",
              title: sp.name,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: sp.logoUrl,
                  alt: sp.name,
                  loading: "lazy",
                  decoding: "async",
                  onError: (e) => {
                    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=48&h=48";
                  },
                  className: "max-h-full max-w-[50px] object-contain filter brightness-90 shrink-0"
                }
              )
            },
            sp.id
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-3 border-t border-[#2C2F38]/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onTitleClick,
            className: "text-[11px] font-semibold text-[#8A8D96] hover:text-[#F0EDE8] border border-[#2C2F38] hover:border-[#2C2F38] px-3.5 py-2 rounded-sm transition-all",
            children: "Details"
          }
        ),
        isPast ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          distExports.Link,
          {
            to: "/replays",
            className: "inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C2F38] border border-[#2C2F38] text-[#8A8D96] hover:bg-[#C79A4E]/10 hover:border-[#C79A4E]/30 hover:text-[#C79A4E] text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 12 }),
              " View Replay"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          distExports.Link,
          {
            to: `/sessions/${session.id}`,
            className: "inline-flex items-center gap-1.5 px-4 py-2 bg-[#C79A4E] text-[#1A1D24] hover:brightness-110 text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap",
            children: [
              "Register Interest ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11 })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function SessionsList() {
  const { data: cms } = useCmsContent();
  const [activeModal, setActiveModal] = reactExports.useState(null);
  const [showAllPast, setShowAllPast] = reactExports.useState(false);
  if (!cms) return null;
  const published = cms.sessions.filter((s) => s.status === "published").slice().sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : Infinity;
    const dateB = b.date ? new Date(b.date).getTime() : Infinity;
    return dateA - dateB;
  });
  const upcomingSessions = published.filter((s) => !isSessionPast(s.date));
  const pastSessions = [...published.filter((s) => isSessionPast(s.date))].reverse();
  const visiblePast = showAllPast ? pastSessions : pastSessions.slice(0, 3);
  const resolveSpeakers = (s) => (cms.speakers || []).filter((sp) => (s.speakerIds || []).includes(sp.id));
  const resolveSponsors = (s) => (cms.sponsors || []).filter((sp) => (s.sponsorIds || []).includes(sp.id));
  const modalSession = activeModal ? published.find((s) => s.id === activeModal) ?? null : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    modalSession && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SessionModal,
      {
        session: modalSession,
        speakers: resolveSpeakers(modalSession),
        sponsors: resolveSponsors(modalSession),
        isPast: isSessionPast(modalSession.date),
        onClose: () => setActiveModal(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-5 bg-[#C79A4E] rounded-full shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-[#F0EDE8] tracking-tight", children: "Upcoming Sessions" }),
          upcomingSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-semibold text-[#C79A4E] bg-[#C79A4E]/10 border border-[#C79A4E]/20 px-2.5 py-1 rounded-full", children: [
            upcomingSessions.length,
            " scheduled"
          ] })
        ] }),
        upcomingSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 border border-dashed border-[#2C2F38] rounded-sm text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[#F0EDE8] mb-1", children: "No sessions scheduled yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#8A8D96] max-w-xs leading-relaxed", children: "Check back soon — new live sessions are added regularly." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: upcomingSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SessionCard,
          {
            session,
            speakers: resolveSpeakers(session),
            sponsors: resolveSponsors(session),
            isPast: false,
            onTitleClick: () => setActiveModal(session.id)
          },
          session.id
        )) })
      ] }),
      pastSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-5 bg-[#2C2F38] rounded-full shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-[#8A8D96] tracking-tight", children: "Past Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-semibold text-[#8A8D96] bg-[#2C2F38]/40 border border-[#2C2F38] px-2.5 py-1 rounded-full", children: [
            pastSessions.length,
            " completed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: visiblePast.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SessionCard,
          {
            session,
            speakers: resolveSpeakers(session),
            sponsors: resolveSponsors(session),
            isPast: true,
            onTitleClick: () => setActiveModal(session.id)
          },
          session.id
        )) }),
        pastSessions.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowAllPast((v) => !v),
            className: "mt-5 flex items-center gap-2 text-xs font-semibold text-[#8A8D96] hover:text-[#F0EDE8] transition-colors mx-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: `transition-transform duration-300 ${showAllPast ? "rotate-180" : ""}` }),
              showAllPast ? "Show less" : `Show ${pastSessions.length - 3} more past sessions`
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  SessionsList as S
};
