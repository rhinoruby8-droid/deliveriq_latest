import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, u as useCmsContent, r as reactExports, g as getUserToken, j as jsxRuntimeExports, A as AuthDialog, X, C as Calendar, a as ArrowRight, F as FALLBACK_CMS_CONTENT$1 } from "./entry-server-QtrLgn1N.js";
import { S as SpeakerDialog } from "./SpeakerDialog-CQBkaRt6.js";
import { C as ChevronDown } from "./chevron-down-D1_2HgaC.js";
import { T as Tag } from "./tag-AG0jTU0b.js";
import { C as Clock } from "./clock-B5hOY9LC.js";
import { U as Users } from "./users-B0Eynbt8.js";
import { G as Globe } from "./globe-B4acYbBo.js";
import { C as CirclePlay } from "./circle-play-ChDDspgp.js";
function isSessionPast(dateStr) {
  if (!dateStr) return false;
  const sessionDate = new Date(dateStr);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  sessionDate.setHours(0, 0, 0, 0);
  return sessionDate < today;
}
function SessionModal({ session, speakers, sponsors, isPast, onClose, onWatchReplay, onSpeakerClick }) {
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
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-2xl bg-card border border-border rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 z-10 p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            "aria-label": "Close",
            ref: firstFocusRef,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 px-2.5 py-0.5 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 9 }),
              " ",
              session.tag
            ] }),
            isPast ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/60 border border-border px-2.5 py-0.5 rounded-full", children: "Past Session" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-2.5 py-0.5 rounded-full", children: "Upcoming" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: titleId, className: "text-2xl font-bold text-foreground leading-tight mb-4", children: session.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-5 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: "text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: session.date || "Date TBC" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13, className: "text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                session.time || "Time TBC",
                " · ",
                session.duration
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-6", children: session.description }),
          speakers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 11 }),
              " Presenters"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: speakers.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onSpeakerClick(sp);
                },
                className: "flex items-start gap-3 bg-background border border-border hover:border-primary/30 rounded-sm p-3 text-left w-full cursor-pointer transition-colors",
                children: [
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
                      className: "w-9 h-9 rounded-full object-cover border border-border shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-xs", children: sp.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-primary", children: [
                      sp.role,
                      " · ",
                      sp.organisation
                    ] }),
                    sp.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2", children: sp.bio })
                  ] }),
                  sp.socialUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-muted-foreground hover:text-primary transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 12 }) })
                ]
              },
              sp.id
            )) })
          ] }),
          sponsors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3", children: "Sponsors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sponsors.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: sp.websiteUrl,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center gap-2 bg-background border border-border px-3 py-2 rounded hover:border-primary/30 transition-colors",
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground", children: sp.name })
                ]
              },
              sp.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-border", children: [
            isPast ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  onClose();
                  onWatchReplay(session.id);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-muted border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-sm font-semibold rounded-sm transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 14 }),
                  " View Replay"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  onClose();
                  navigate(`/register?session=${session.id}`);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-[#1A1D24] hover:brightness-110 text-sm font-bold rounded-sm transition-all",
                children: [
                  session.isFree ? "Register for Free" : "Register & Pay",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  onClose();
                  navigate(`/sessions/${session.id}`);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground text-sm font-semibold rounded-sm transition-all",
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
function SessionCard({ session, speakers, sponsors, isPast, currency, onTitleClick, onWatchReplay, onSpeakerClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group border rounded-sm p-6 transition-all duration-200 flex flex-col diq-session-card ${isPast ? "border-border/60 bg-background/60 opacity-80 hover:opacity-100 hover:border-border" : "border-border bg-card/40 hover:border-primary/30"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-border/40 pb-4 diq-card-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-sm border diq-card-tag ${isPast ? "text-muted-foreground bg-muted/20 border-border/40" : "text-primary bg-primary/5 border-primary/20"}`, children: session.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium flex items-center gap-1 diq-card-duration", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: isPast ? "text-muted-foreground" : "text-primary" }),
          session.duration
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-semibold flex items-center gap-1.5 diq-card-date-time", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 13, className: isPast ? "text-muted-foreground" : "text-primary" }),
        session.date,
        " @ ",
        session.time
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex-1 diq-card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onTitleClick,
          className: `text-left text-xl font-bold leading-tight mb-3 transition-colors underline-offset-4 hover:underline cursor-pointer diq-card-title ${isPast ? "text-muted-foreground hover:text-foreground" : "text-foreground hover:text-primary"}`,
          children: session.title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xl mb-5 diq-card-description", children: session.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pt-4 border-t border-border/40 mt-auto diq-card-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 diq-card-metadata-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center diq-card-presenters-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-muted-foreground uppercase tracking-wider diq-card-presenters-label", children: "Presenters:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 diq-card-presenters-list", children: [
            speakers.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onSpeakerClick(sp);
                },
                className: "flex items-center gap-1.5 bg-background border border-border hover:border-primary/30 pl-1 pr-2 py-0.5 rounded-full text-[10px] diq-card-presenter-badge cursor-pointer transition-colors",
                children: [
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
                      className: "w-4 h-4 rounded-full object-cover bg-card border border-border diq-card-presenter-avatar"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground diq-card-presenter-name", children: sp.name })
                ]
              },
              sp.id
            )),
            speakers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground italic", children: "TBA" })
          ] })
        ] }),
        sponsors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center diq-card-sponsors-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-muted-foreground uppercase tracking-wider diq-card-sponsors-label", children: "Sponsors:" }),
          sponsors.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: sp.websiteUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "h-6 px-1.5 py-0.5 rounded bg-background border border-border flex items-center justify-center hover:border-primary/30 transition-colors diq-card-sponsor-link",
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
                  className: "max-h-full max-w-[50px] object-contain filter brightness-90 shrink-0 diq-card-sponsor-logo"
                }
              )
            },
            sp.id
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-border/20 diq-card-actions-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground text-sm", children: session.isFree ? "FREE" : new Intl.NumberFormat("en-US", { style: "currency", currency }).format(session.price || 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onTitleClick,
              className: "text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-border px-3.5 py-2 rounded-sm transition-all diq-card-details-btn",
              children: "Details"
            }
          ),
          isPast ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => onWatchReplay(session.id),
              className: "inline-flex items-center gap-1.5 px-4 py-2 bg-muted border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-replay-btn cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 12 }),
                " View Replay"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: `/register?session=${session.id}`,
              className: "inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] hover:brightness-110 text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-register-btn",
              children: [
                session.isFree ? "Register for Free" : "Register & Pay",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11 })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SessionsList() {
  const navigate = distExports.useNavigate();
  const { data: cms } = useCmsContent();
  const [activeModal, setActiveModal] = reactExports.useState(null);
  const [showAllPast, setShowAllPast] = reactExports.useState(false);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [showAuthDialog, setShowAuthDialog] = reactExports.useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = reactExports.useState(null);
  const [isSpeakerDialogOpen, setIsSpeakerDialogOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const token = getUserToken();
    setIsAuthenticated(!!token);
  }, []);
  const handleWatchReplay = (sessionId) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
    } else {
      navigate(`/dashboard/replays/${sessionId}`);
    }
  };
  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsSpeakerDialogOpen(true);
  };
  if (!cms) return null;
  const rawSessions = cms.sessions && cms.sessions.length > 0 ? cms.sessions : FALLBACK_CMS_CONTENT.sessions;
  const published = rawSessions.filter((s) => s.status === "published").slice().sort((a, b) => {
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
        onClose: () => setActiveModal(null),
        onWatchReplay: handleWatchReplay,
        onSpeakerClick: handleSpeakerClick
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 upcoming-session", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-5 bg-primary rounded-full shrink-0 -ml-[18px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground tracking-tight", children: "Upcoming Sessions" }),
          upcomingSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full", children: [
            upcomingSessions.length,
            " scheduled"
          ] })
        ] }),
        upcomingSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-sm text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "No sessions scheduled yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs leading-relaxed", children: "Check back soon — new live sessions are added regularly." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid", children: upcomingSessions.map((session) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SessionCard,
            {
              session,
              speakers: resolveSpeakers(session),
              sponsors: resolveSponsors(session),
              isPast: false,
              currency: ((_a = cms == null ? void 0 : cms.paymentConfig) == null ? void 0 : _a.currency) || "USD",
              onTitleClick: () => setActiveModal(session.id),
              onWatchReplay: handleWatchReplay,
              onSpeakerClick: handleSpeakerClick
            },
            session.id
          );
        }) })
      ] }),
      pastSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 upcoming-session", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-5 bg-muted rounded-full shrink-0 -ml-[18px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-muted-foreground tracking-tight", children: "Past Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-semibold text-muted-foreground bg-muted/40 border border-border px-2.5 py-1 rounded-full", children: [
            pastSessions.length,
            " completed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid", children: visiblePast.map((session) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SessionCard,
            {
              session,
              speakers: resolveSpeakers(session),
              sponsors: resolveSponsors(session),
              isPast: true,
              currency: ((_a = cms == null ? void 0 : cms.paymentConfig) == null ? void 0 : _a.currency) || "USD",
              onTitleClick: () => setActiveModal(session.id),
              onWatchReplay: handleWatchReplay,
              onSpeakerClick: handleSpeakerClick
            },
            session.id
          );
        }) }),
        pastSessions.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowAllPast((v) => !v),
            className: "mt-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mx-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: `transition-transform duration-300 ${showAllPast ? "rotate-180" : ""}` }),
              showAllPast ? "Show less" : `Show ${pastSessions.length - 3} more past sessions`
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AuthDialog,
      {
        isOpen: showAuthDialog,
        onClose: () => setShowAuthDialog(false),
        onSuccess: () => {
          setShowAuthDialog(false);
          setIsAuthenticated(true);
          navigate("/dashboard");
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SpeakerDialog,
      {
        speaker: selectedSpeaker,
        isOpen: isSpeakerDialogOpen,
        onClose: () => setIsSpeakerDialogOpen(false)
      }
    )
  ] });
}
function TopicsList() {
  const { data: cms } = useCmsContent();
  const topics = (cms == null ? void 0 : cms.topics) && cms.topics.length > 0 ? cms.topics : FALLBACK_CMS_CONTENT$1.topics || [];
  if (topics.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 py-4", children: "No topics found. Please add topics in the Admin panel." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 lg:px-8", children: topics.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-8 border-t border-border last:border-b", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: topic.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed self-center", children: topic.description })
  ] }, topic.id)) });
}
export {
  SessionsList as S,
  TopicsList as T
};
