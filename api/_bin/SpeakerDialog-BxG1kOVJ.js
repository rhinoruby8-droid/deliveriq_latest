import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, j as jsxDevRuntimeExports, D as Dialog, e as DialogContent, f as DialogHeader, h as DialogTitle, i as DialogDescription, C as Calendar, d as distExports, a as ArrowRight } from "./entry-server-GmC-mm2M.js";
import { G as Globe } from "./globe-B5iN3i7D.js";
import { C as Clock } from "./clock-Cn3dPBvF.js";
function SpeakerDialog({ speaker, isOpen, onClose }) {
  const { data: cms } = useCmsContent();
  if (!speaker) return null;
  const speakerSessions = ((cms == null ? void 0 : cms.sessions) || []).filter(
    (s) => (s.speakerIds || []).includes(speaker.id)
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogContent, { className: "sm:max-w-[500px] bg-card border-border text-foreground overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogHeader, { className: "pb-4 border-b border-border/60", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-4 text-left", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "img",
        {
          src: speaker.avatarUrl,
          alt: speaker.name,
          loading: "lazy",
          onError: (e) => {
            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120";
          },
          className: "w-16 h-16 rounded-full object-cover border border-border bg-background shrink-0"
        },
        void 0,
        false,
        {
          fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
          lineNumber: 28,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { className: "text-xl font-bold text-foreground tracking-tight", children: speaker.name }, void 0, false, {
          fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
          lineNumber: 38,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogDescription, { className: "text-sm text-primary font-medium mt-1", children: [
          speaker.role,
          " at ",
          speaker.organisation
        ] }, void 0, true, {
          fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
          lineNumber: 41,
          columnNumber: 15
        }, this),
        speaker.socialUrl && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "a",
          {
            href: speaker.socialUrl,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mt-2",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Globe, { size: 12 }, void 0, false, {
                fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                lineNumber: 51,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Visit website / social" }, void 0, false, {
                fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                lineNumber: 52,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
            lineNumber: 45,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
        lineNumber: 37,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
      lineNumber: 27,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    speaker.bio && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "py-4 text-sm text-muted-foreground leading-relaxed max-h-[150px] overflow-y-auto pr-1", children: speaker.bio }, void 0, false, {
      fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
      lineNumber: 61,
      columnNumber: 11
    }, this),
    speakerSessions.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-4 border-t border-border/60", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xs font-bold text-muted-foreground/80 uppercase tracking-widest mb-3", children: [
        "Sessions presented (",
        speakerSessions.length,
        ")"
      ] }, void 0, true, {
        fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2.5 max-h-[180px] overflow-y-auto pr-1", children: speakerSessions.map((session) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "p-3 bg-background border border-border hover:border-primary/30 rounded-md transition-colors flex items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs font-bold text-foreground truncate", children: session.title }, void 0, false, {
                fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                lineNumber: 79,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 text-[10px] text-muted-foreground mt-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { size: 10, className: "text-primary" }, void 0, false, {
                    fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                    lineNumber: 82,
                    columnNumber: 25
                  }, this),
                  session.date
                ] }, void 0, true, {
                  fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                  lineNumber: 81,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 10, className: "text-primary" }, void 0, false, {
                    fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                    lineNumber: 86,
                    columnNumber: 25
                  }, this),
                  session.duration
                ] }, void 0, true, {
                  fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                  lineNumber: 85,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                lineNumber: 80,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
              lineNumber: 78,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              distExports.Link,
              {
                to: `/sessions/${session.id}`,
                onClick: onClose,
                className: "p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0",
                title: "View details",
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
                  fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                  lineNumber: 97,
                  columnNumber: 21
                }, this)
              },
              void 0,
              false,
              {
                fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
                lineNumber: 91,
                columnNumber: 19
              },
              this
            )
          ]
        },
        session.id,
        true,
        {
          fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
          lineNumber: 74,
          columnNumber: 17
        },
        this
      )) }, void 0, false, {
        fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
        lineNumber: 72,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
      lineNumber: 68,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "E:/deliverrriqlatest/DeliverIQ_2/DeliverIQ_2/src/components/SpeakerDialog.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
export {
  SpeakerDialog as S
};
