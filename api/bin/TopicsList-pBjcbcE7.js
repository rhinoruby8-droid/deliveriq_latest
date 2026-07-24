import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, u as useCmsContent, r as reactExports, g as getUserToken, j as jsxDevRuntimeExports, A as AuthDialog, X, C as Calendar, a as ArrowRight, F as FALLBACK_CMS_CONTENT } from "./entry-server-BWjtIwOK.js";
import { S as SpeakerDialog } from "./SpeakerDialog-DtDig_PZ.js";
import { C as ChevronDown } from "./chevron-down-CV7qg31p.js";
import { T as Tag } from "./tag-DMIKoJNZ.js";
import { C as Clock } from "./clock-DWM36wsG.js";
import { U as Users } from "./users-DLq2GmZz.js";
import { G as Globe } from "./globe-DkbX8O74.js";
import { C as CirclePlay } from "./circle-play--aOlJdrG.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": titleId,
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-full max-w-2xl bg-card border border-border rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 z-10 p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            "aria-label": "Close",
            ref: firstFocusRef,
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 16 }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 58,
              columnNumber: 11
            }, this)
          },
          void 0,
          false,
          {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 52,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 px-2.5 py-0.5 rounded-full", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { size: 9 }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 65,
                columnNumber: 15
              }, this),
              " ",
              session.tag
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 64,
              columnNumber: 13
            }, this),
            isPast ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/60 border border-border px-2.5 py-0.5 rounded-full", children: "Past Session" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 68,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-2.5 py-0.5 rounded-full", children: "Upcoming" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 70,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 63,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { id: titleId, className: "text-2xl font-bold text-foreground leading-tight mb-4", children: session.title }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 75,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-5 mb-5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 13, className: "text-primary shrink-0" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 80,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: session.date || "Date TBC" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 81,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 79,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 13, className: "text-primary shrink-0" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 84,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: [
                session.time || "Time TBC",
                " · ",
                session.duration
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 85,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 83,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 78,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground leading-relaxed mb-6", children: session.description }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 90,
            columnNumber: 11
          }, this),
          speakers.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 11 }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 96,
                columnNumber: 17
              }, this),
              " Presenters"
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3", children: speakers.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onSpeakerClick(sp);
                },
                className: "flex items-start gap-3 bg-background border border-border hover:border-primary/30 rounded-sm p-3 text-left w-full cursor-pointer transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                    },
                    void 0,
                    false,
                    {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                      lineNumber: 105,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-bold text-foreground text-xs", children: sp.name }, void 0, false, {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                      lineNumber: 114,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-primary", children: [
                      sp.role,
                      " · ",
                      sp.organisation
                    ] }, void 0, true, {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                      lineNumber: 115,
                      columnNumber: 23
                    }, this),
                    sp.bio && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2", children: sp.bio }, void 0, false, {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                      lineNumber: 116,
                      columnNumber: 34
                    }, this)
                  ] }, void 0, true, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 113,
                    columnNumber: 21
                  }, this),
                  sp.socialUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-muted-foreground hover:text-primary transition-colors shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Globe, { size: 12 }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 120,
                    columnNumber: 25
                  }, this) }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 119,
                    columnNumber: 23
                  }, this)
                ]
              },
              sp.id,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 100,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 98,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 94,
            columnNumber: 13
          }, this),
          sponsors.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3", children: "Sponsors" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 132,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: sponsors.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "a",
              {
                href: sp.websiteUrl,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center gap-2 bg-background border border-border px-3 py-2 rounded hover:border-primary/30 transition-colors",
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
                      className: "h-5 max-w-[60px] object-contain filter brightness-90"
                    },
                    void 0,
                    false,
                    {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                      lineNumber: 143,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-semibold text-muted-foreground", children: sp.name }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 151,
                    columnNumber: 21
                  }, this)
                ]
              },
              sp.id,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 135,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 133,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 131,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-border", children: [
            isPast ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  onClose();
                  onWatchReplay(session.id);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-muted border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-sm font-semibold rounded-sm transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 14 }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 165,
                    columnNumber: 17
                  }, this),
                  " View Replay"
                ]
              },
              void 0,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 161,
                columnNumber: 15
              },
              this
            ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 173,
                    columnNumber: 75
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 169,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  onClose();
                  navigate(`/sessions/${session.id}`);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground text-sm font-semibold rounded-sm transition-all",
                children: [
                  "Full Session Details ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 13 }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 180,
                    columnNumber: 36
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 176,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 159,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 61,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 50,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
      lineNumber: 43,
      columnNumber: 5
    },
    this
  );
}
function SessionCard({ session, speakers, sponsors, isPast, currency, onTitleClick, onWatchReplay, onSpeakerClick }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `group border rounded-sm p-6 transition-all duration-200 flex flex-col diq-session-card ${isPast ? "border-border/60 bg-background/60 opacity-80 hover:opacity-100 hover:border-border" : "border-border bg-card/40 hover:border-primary/30"}`, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-border/40 pb-4 diq-card-header", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-sm border diq-card-tag ${isPast ? "text-muted-foreground bg-muted/20 border-border/40" : "text-primary bg-primary/5 border-primary/20"}`, children: session.tag }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 203,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground font-medium flex items-center gap-1 diq-card-duration", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 12, className: isPast ? "text-muted-foreground" : "text-primary" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 210,
            columnNumber: 13
          }, this),
          session.duration
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 209,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 202,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-muted-foreground font-semibold flex items-center gap-1.5 diq-card-date-time", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 13, className: isPast ? "text-muted-foreground" : "text-primary" }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, this),
        session.date,
        " @ ",
        session.time
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
      lineNumber: 201,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6 flex-1 diq-card-body", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: onTitleClick,
          className: `text-left text-xl font-bold leading-tight mb-3 transition-colors underline-offset-4 hover:underline cursor-pointer diq-card-title ${isPast ? "text-muted-foreground hover:text-foreground" : "text-foreground hover:text-primary"}`,
          children: session.title
        },
        void 0,
        false,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 222,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xl mb-5 diq-card-description", children: session.description }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 230,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
      lineNumber: 221,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4 pt-4 border-t border-border/40 mt-auto diq-card-footer", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-4 diq-card-metadata-row", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2 items-center diq-card-presenters-col", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-muted-foreground uppercase tracking-wider diq-card-presenters-label", children: "Presenters:" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 239,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-1.5 diq-card-presenters-list", children: [
            speakers.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onSpeakerClick(sp);
                },
                className: "flex items-center gap-1.5 bg-background border border-border hover:border-primary/30 pl-1 pr-2 py-0.5 rounded-full text-[10px] diq-card-presenter-badge cursor-pointer transition-colors",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                    },
                    void 0,
                    false,
                    {
                      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                      lineNumber: 247,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-foreground diq-card-presenter-name", children: sp.name }, void 0, false, {
                    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                    lineNumber: 254,
                    columnNumber: 19
                  }, this)
                ]
              },
              sp.id,
              true,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 242,
                columnNumber: 17
              },
              this
            )),
            speakers.length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-muted-foreground italic", children: "TBA" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 257,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 240,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 238,
          columnNumber: 11
        }, this),
        sponsors.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2 items-center diq-card-sponsors-col", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-muted-foreground uppercase tracking-wider diq-card-sponsors-label", children: "Sponsors:" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 264,
            columnNumber: 15
          }, this),
          sponsors.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: sp.websiteUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "h-6 px-1.5 py-0.5 rounded bg-background border border-border flex items-center justify-center hover:border-primary/30 transition-colors diq-card-sponsor-link",
              title: sp.name,
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
                },
                void 0,
                false,
                {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                  lineNumber: 268,
                  columnNumber: 19
                },
                this
              )
            },
            sp.id,
            false,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 266,
              columnNumber: 17
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 263,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 236,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between pt-3 border-t border-border/20 diq-card-actions-row", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-bold text-foreground text-sm", children: session.isFree ? "FREE" : new Intl.NumberFormat("en-US", { style: "currency", currency }).format(session.price || 0) }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 281,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: onTitleClick,
              className: "text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-border px-3.5 py-2 rounded-sm transition-all diq-card-details-btn",
              children: "Details"
            },
            void 0,
            false,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 285,
              columnNumber: 11
            },
            this
          ),
          isPast ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => onWatchReplay(session.id),
              className: "inline-flex items-center gap-1.5 px-4 py-2 bg-muted border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-replay-btn cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 12 }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                  lineNumber: 296,
                  columnNumber: 15
                }, this),
                " View Replay"
              ]
            },
            void 0,
            true,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 292,
              columnNumber: 13
            },
            this
          ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            distExports.Link,
            {
              to: `/register?session=${session.id}`,
              className: "inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] hover:brightness-110 text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-register-btn",
              children: [
                session.isFree ? "Register for Free" : "Register & Pay",
                " ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11 }, void 0, false, {
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                  lineNumber: 303,
                  columnNumber: 73
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 299,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 284,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 280,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
      lineNumber: 234,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
    lineNumber: 195,
    columnNumber: 5
  }, this);
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    modalSession && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SessionModal,
      {
        session: modalSession,
        speakers: resolveSpeakers(modalSession),
        sponsors: resolveSponsors(modalSession),
        isPast: isSessionPast(modalSession.date),
        onClose: () => setActiveModal(null),
        onWatchReplay: handleWatchReplay,
        onSpeakerClick: handleSpeakerClick
      },
      void 0,
      false,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 368,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 mb-6 upcoming-session", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-1.5 h-5 bg-primary rounded-full shrink-0 -ml-[18px]" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 383,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-foreground tracking-tight", children: "Upcoming Sessions" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 384,
            columnNumber: 13
          }, this),
          upcomingSessions.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full", children: [
            upcomingSessions.length,
            " scheduled"
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 386,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 382,
          columnNumber: 11
        }, this),
        upcomingSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-sm text-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-semibold text-foreground mb-1", children: "No sessions scheduled yet." }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 394,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground max-w-xs leading-relaxed", children: "Check back soon — new live sessions are added regularly." }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 395,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 393,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid", children: upcomingSessions.map((session) => {
          var _a;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
            session.id,
            false,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 400,
              columnNumber: 17
            },
            this
          );
        }) }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 398,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 381,
        columnNumber: 9
      }, this),
      pastSessions.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 mb-6 upcoming-session", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-1.5 h-5 bg-muted rounded-full shrink-0 -ml-[18px]" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 420,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-muted-foreground tracking-tight", children: "Past Sessions" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 421,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto text-[10px] font-semibold text-muted-foreground bg-muted/40 border border-border px-2.5 py-1 rounded-full", children: [
            pastSessions.length,
            " completed"
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 422,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 419,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid", children: visiblePast.map((session) => {
          var _a;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
            session.id,
            false,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
              lineNumber: 429,
              columnNumber: 17
            },
            this
          );
        }) }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
          lineNumber: 427,
          columnNumber: 13
        }, this),
        pastSessions.length > 3 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setShowAllPast((v) => !v),
            className: "mt-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mx-auto",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { size: 14, className: `transition-transform duration-300 ${showAllPast ? "rotate-180" : ""}` }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
                lineNumber: 448,
                columnNumber: 17
              }, this),
              showAllPast ? "Show less" : `Show ${pastSessions.length - 3} more past sessions`
            ]
          },
          void 0,
          true,
          {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
            lineNumber: 444,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 418,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
      lineNumber: 379,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      AuthDialog,
      {
        isOpen: showAuthDialog,
        onClose: () => setShowAuthDialog(false),
        onSuccess: () => {
          setShowAuthDialog(false);
          setIsAuthenticated(true);
          navigate("/dashboard");
        }
      },
      void 0,
      false,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 456,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      SpeakerDialog,
      {
        speaker: selectedSpeaker,
        isOpen: isSpeakerDialogOpen,
        onClose: () => setIsSpeakerDialogOpen(false)
      },
      void 0,
      false,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
        lineNumber: 466,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SessionsList.tsx",
    lineNumber: 365,
    columnNumber: 5
  }, this);
}
function TopicsList() {
  const { data: cms } = useCmsContent();
  const topics = (cms == null ? void 0 : cms.topics) && cms.topics.length > 0 ? cms.topics : FALLBACK_CMS_CONTENT.topics || [];
  if (topics.length === 0) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-red-500 py-4", children: "No topics found. Please add topics in the Admin panel." }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/TopicsList.tsx",
      lineNumber: 12,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8", children: topics.map((topic) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-8 border-t border-border last:border-b", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-base font-semibold text-foreground", children: topic.title }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/TopicsList.tsx",
      lineNumber: 19,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground leading-relaxed self-center", children: topic.description }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/TopicsList.tsx",
      lineNumber: 20,
      columnNumber: 11
    }, this)
  ] }, topic.id, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/TopicsList.tsx",
    lineNumber: 18,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/TopicsList.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
export {
  SessionsList as S,
  TopicsList as T
};
