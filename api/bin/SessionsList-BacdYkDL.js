import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, u as useCmsContent, r as reactExports, g as getUserToken, j as jsxDevRuntimeExports, A as AuthDialog, X, C as Calendar, a as ArrowRight } from "./entry-server-DCJCKegT.js";
import { C as ChevronDown } from "./chevron-down-D9oGqTS4.js";
import { T as Tag } from "./tag-DGtjh5TM.js";
import { C as Clock } from "./clock-D3NmRn3h.js";
import { U as Users, G as Globe } from "./users-CQCKO3lT.js";
import { C as CirclePlay } from "./circle-play-DvZdA2P8.js";
function isSessionPast(dateStr) {
  if (!dateStr) return false;
  const sessionDate = new Date(dateStr);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  sessionDate.setHours(0, 0, 0, 0);
  return sessionDate < today;
}
function SessionModal({ session, speakers, sponsors, isPast, onClose, onWatchReplay }) {
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
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-full max-w-2xl bg-[#21242C] border border-[#2C2F38] rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "absolute top-4 right-4 z-10 p-1.5 rounded text-[#8A8D96] hover:text-[#F0EDE8] hover:bg-[#2C2F38] transition-colors",
            "aria-label": "Close",
            ref: firstFocusRef,
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 16 }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this)
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 54,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#C79A4E] uppercase bg-[#C79A4E]/5 border border-[#C79A4E]/20 px-2.5 py-0.5 rounded-full", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { size: 9 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 67,
                columnNumber: 15
              }, this),
              " ",
              session.tag
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 66,
              columnNumber: 13
            }, this),
            isPast ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider bg-[#2C2F38]/60 border border-[#2C2F38] px-2.5 py-0.5 rounded-full", children: "Past Session" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 70,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-2.5 py-0.5 rounded-full", children: "Upcoming" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 72,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 65,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { id: titleId, className: "text-2xl font-bold text-[#F0EDE8] leading-tight mb-4", children: session.title }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 77,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-5 mb-5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 13, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 82,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: session.date || "Date TBC" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 83,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 81,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm text-[#8A8D96]", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 13, className: "text-[#C79A4E] shrink-0" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 86,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: [
                session.time || "Time TBC",
                " · ",
                session.duration
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 87,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 85,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 80,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] leading-relaxed mb-6", children: session.description }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 92,
            columnNumber: 11
          }, this),
          speakers.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-widest mb-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, { size: 11 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 98,
                columnNumber: 17
              }, this),
              " Presenters"
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 97,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3", children: speakers.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3 bg-[#1A1D24] border border-[#2C2F38] rounded-sm p-3", children: [
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
                  className: "w-9 h-9 rounded-full object-cover border border-[#2C2F38] shrink-0"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                  lineNumber: 103,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-bold text-[#F0EDE8] text-xs", children: sp.name }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                  lineNumber: 112,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-[#C79A4E]", children: [
                  sp.role,
                  " · ",
                  sp.organisation
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                  lineNumber: 113,
                  columnNumber: 23
                }, this),
                sp.bio && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-[#8A8D96] mt-1 leading-relaxed line-clamp-2", children: sp.bio }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                  lineNumber: 114,
                  columnNumber: 34
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 111,
                columnNumber: 21
              }, this),
              sp.socialUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: sp.socialUrl, target: "_blank", rel: "noreferrer", className: "text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Globe, { size: 12 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 118,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 117,
                columnNumber: 23
              }, this)
            ] }, sp.id, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 102,
              columnNumber: 19
            }, this)) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 100,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 96,
            columnNumber: 13
          }, this),
          sponsors.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-widest mb-3", children: "Sponsors" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 130,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: sponsors.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "a",
              {
                href: sp.websiteUrl,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center gap-2 bg-[#1A1D24] border border-[#2C2F38] px-3 py-2 rounded hover:border-[#C79A4E]/30 transition-colors",
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
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                      lineNumber: 141,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-semibold text-[#8A8D96]", children: sp.name }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                    lineNumber: 149,
                    columnNumber: 21
                  }, this)
                ]
              },
              sp.id,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 133,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 131,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 129,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2C2F38]", children: [
            isPast ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  onClose();
                  onWatchReplay(session.id);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2C2F38] border border-[#2C2F38] text-[#8A8D96] hover:bg-[#C79A4E]/10 hover:border-[#C79A4E]/30 hover:text-[#C79A4E] text-sm font-semibold rounded-sm transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 14 }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                    lineNumber: 163,
                    columnNumber: 17
                  }, this),
                  " View Replay"
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 159,
                columnNumber: 15
              },
              this
            ) : (
              // TODO [PAYMENT GATEWAY]: Replace with paid registration flow when implemented.
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: () => {
                    onClose();
                    navigate(`/register?session=${session.id}`);
                  },
                  className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C79A4E] text-[#1A1D24] hover:brightness-110 text-sm font-bold rounded-sm transition-all",
                  children: [
                    "$",
                    session.isFree ? "Register for Free" : "Register & Pay",
                    " ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                      lineNumber: 171,
                      columnNumber: 76
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                  lineNumber: 167,
                  columnNumber: 15
                },
                this
              )
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => {
                  onClose();
                  navigate(`/sessions/${session.id}`);
                },
                className: "flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2C2F38] text-[#8A8D96] hover:border-[#C79A4E]/30 hover:text-[#F0EDE8] text-sm font-semibold rounded-sm transition-all",
                children: [
                  "Full Session Details ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 13 }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                    lineNumber: 178,
                    columnNumber: 36
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 174,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 157,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 63,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 52,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
      lineNumber: 45,
      columnNumber: 5
    },
    this
  );
}
function SessionCard({ session, speakers, sponsors, isPast, onTitleClick, onWatchReplay }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `group border rounded-sm p-6 transition-all duration-200 flex flex-col diq-session-card ${isPast ? "border-[#2C2F38]/60 bg-[#1A1D24]/60 opacity-80 hover:opacity-100 hover:border-[#2C2F38]" : "border-[#2C2F38] bg-[#21242C]/40 hover:border-[#C79A4E]/30"}`, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-[#2C2F38]/40 pb-4 diq-card-header", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-sm border diq-card-tag ${isPast ? "text-[#8A8D96] bg-[#2C2F38]/20 border-[#2C2F38]/40" : "text-[#C79A4E] bg-[#C79A4E]/5 border-[#C79A4E]/20"}`, children: session.tag }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 201,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${session.isFree ? "text-green-400 bg-green-950/20 border-green-900/30" : "text-[#C79A4E] bg-[#C79A4E]/5 border-[#C79A4E]/20"}`, children: session.isFree ? "Free" : `${session.price || 0}` }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 206,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-[#8A8D96] font-medium flex items-center gap-1 diq-card-duration", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 12, className: isPast ? "text-[#8A8D96]" : "text-[#C79A4E]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 212,
            columnNumber: 13
          }, this),
          session.duration
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 211,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-[#8A8D96] font-semibold flex items-center gap-1.5 diq-card-date-time", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 13, className: isPast ? "text-[#8A8D96]" : "text-[#C79A4E]" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 217,
          columnNumber: 11
        }, this),
        session.date,
        " @ ",
        session.time
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 216,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
      lineNumber: 199,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6 flex-1 diq-card-body", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: onTitleClick,
          className: `text-left text-xl font-bold leading-tight mb-3 transition-colors underline-offset-4 hover:underline cursor-pointer diq-card-title ${isPast ? "text-[#8A8D96] hover:text-[#F0EDE8]" : "text-[#F0EDE8] hover:text-[#C79A4E]"}`,
          children: session.title
        },
        void 0,
        false,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 224,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] leading-relaxed max-w-xl mb-5 diq-card-description", children: session.description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 232,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
      lineNumber: 223,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4 pt-4 border-t border-[#2C2F38]/40 mt-auto diq-card-footer", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-4 diq-card-metadata-row", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2 items-center diq-card-presenters-col", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-[#8A8D96] uppercase tracking-wider diq-card-presenters-label", children: "Presenters:" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 241,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-1.5 diq-card-presenters-list", children: [
            speakers.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1.5 bg-[#1A1D24] border border-[#2C2F38] pl-1 pr-2 py-0.5 rounded-full text-[10px] diq-card-presenter-badge", children: [
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
                  className: "w-4 h-4 rounded-full object-cover bg-[#21242C] border border-[#2C2F38] diq-card-presenter-avatar"
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                  lineNumber: 245,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-[#F0EDE8] diq-card-presenter-name", children: sp.name }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 252,
                columnNumber: 19
              }, this)
            ] }, sp.id, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 244,
              columnNumber: 17
            }, this)),
            speakers.length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-[#8A8D96] italic", children: "TBA" }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 255,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 242,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 240,
          columnNumber: 11
        }, this),
        sponsors.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2 items-center diq-card-sponsors-col", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-[#8A8D96] uppercase tracking-wider diq-card-sponsors-label", children: "Sponsors:" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 262,
            columnNumber: 15
          }, this),
          sponsors.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "a",
            {
              href: sp.websiteUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "h-6 px-1.5 py-0.5 rounded bg-[#1A1D24] border border-[#2C2F38] flex items-center justify-center hover:border-[#C79A4E]/30 transition-colors diq-card-sponsor-link",
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
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                  lineNumber: 266,
                  columnNumber: 19
                },
                this
              )
            },
            sp.id,
            false,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
              lineNumber: 264,
              columnNumber: 17
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 261,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 238,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-end gap-2 pt-3 border-t border-[#2C2F38]/20 diq-card-actions-row", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: onTitleClick,
            className: "text-[11px] font-semibold text-[#8A8D96] hover:text-[#F0EDE8] border border-[#2C2F38] hover:border-[#2C2F38] px-3.5 py-2 rounded-sm transition-all diq-card-details-btn",
            children: "Details"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 279,
            columnNumber: 11
          },
          this
        ),
        isPast ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => onWatchReplay(session.id),
            className: "inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C2F38] border border-[#2C2F38] text-[#8A8D96] hover:bg-[#C79A4E]/10 hover:border-[#C79A4E]/30 hover:text-[#C79A4E] text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-replay-btn cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 12 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 290,
                columnNumber: 15
              }, this),
              " View Replay"
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 286,
            columnNumber: 13
          },
          this
        ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          distExports.Link,
          {
            to: `/register?session=${session.id}`,
            className: "inline-flex items-center gap-1.5 px-4 py-2 bg-[#C79A4E] text-[#1A1D24] hover:brightness-110 text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-register-btn",
            children: [
              session.isFree ? "Register for Free" : "Register & Pay",
              " ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 11 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 297,
                columnNumber: 73
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 293,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 278,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
      lineNumber: 236,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
    lineNumber: 193,
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
        onWatchReplay: handleWatchReplay
      },
      void 0,
      false,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 354,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 mb-6 upcoming-session", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-1.5 h-5 bg-[#C79A4E] rounded-full shrink-0 -ml-[18px]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 368,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-[#F0EDE8] tracking-tight", children: "Upcoming Sessions" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 369,
            columnNumber: 13
          }, this),
          upcomingSessions.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto text-[10px] font-semibold text-[#C79A4E] bg-[#C79A4E]/10 border border-[#C79A4E]/20 px-2.5 py-1 rounded-full", children: [
            upcomingSessions.length,
            " scheduled"
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 371,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 367,
          columnNumber: 11
        }, this),
        upcomingSessions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center justify-center py-16 border border-dashed border-[#2C2F38] rounded-sm text-center", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-semibold text-[#F0EDE8] mb-1", children: "No sessions scheduled yet." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 379,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] max-w-xs leading-relaxed", children: "Check back soon — new live sessions are added regularly." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 380,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 378,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid", children: upcomingSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          SessionCard,
          {
            session,
            speakers: resolveSpeakers(session),
            sponsors: resolveSponsors(session),
            isPast: false,
            onTitleClick: () => setActiveModal(session.id),
            onWatchReplay: handleWatchReplay
          },
          session.id,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 385,
            columnNumber: 17
          },
          this
        )) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 383,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 366,
        columnNumber: 9
      }, this),
      pastSessions.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 mb-6 upcoming-session", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-1.5 h-5 bg-[#2C2F38] rounded-full shrink-0 -ml-[18px]" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 403,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-[#8A8D96] tracking-tight", children: "Past Sessions" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 404,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-auto text-[10px] font-semibold text-[#8A8D96] bg-[#2C2F38]/40 border border-[#2C2F38] px-2.5 py-1 rounded-full", children: [
            pastSessions.length,
            " completed"
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 405,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 402,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid", children: visiblePast.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          SessionCard,
          {
            session,
            speakers: resolveSpeakers(session),
            sponsors: resolveSponsors(session),
            isPast: true,
            onTitleClick: () => setActiveModal(session.id),
            onWatchReplay: handleWatchReplay
          },
          session.id,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 412,
            columnNumber: 17
          },
          this
        )) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
          lineNumber: 410,
          columnNumber: 13
        }, this),
        pastSessions.length > 3 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => setShowAllPast((v) => !v),
            className: "mt-5 flex items-center gap-2 text-xs font-semibold text-[#8A8D96] hover:text-[#F0EDE8] transition-colors mx-auto",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { size: 14, className: `transition-transform duration-300 ${showAllPast ? "rotate-180" : ""}` }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
                lineNumber: 429,
                columnNumber: 17
              }, this),
              showAllPast ? "Show less" : `Show ${pastSessions.length - 3} more past sessions`
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
            lineNumber: 425,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 401,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
      lineNumber: 364,
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
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
        lineNumber: 437,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/SessionsList.tsx",
    lineNumber: 351,
    columnNumber: 5
  }, this);
}
export {
  SessionsList as S
};
