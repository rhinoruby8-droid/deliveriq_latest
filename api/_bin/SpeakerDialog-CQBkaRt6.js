import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { u as useCmsContent, j as jsxRuntimeExports, D as Dialog, c as DialogContent, e as DialogHeader, f as DialogTitle, h as DialogDescription, C as Calendar, d as distExports, a as ArrowRight } from "./entry-server-QtrLgn1N.js";
import { G as Globe } from "./globe-B4acYbBo.js";
import { C as Clock } from "./clock-B5hOY9LC.js";
function SpeakerDialog({ speaker, isOpen, onClose }) {
  const { data: cms } = useCmsContent();
  if (!speaker) return null;
  const speakerSessions = ((cms == null ? void 0 : cms.sessions) || []).filter(
    (s) => (s.speakerIds || []).includes(speaker.id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] bg-card border-border text-foreground overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "pb-4 border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: speaker.avatarUrl,
          alt: speaker.name,
          loading: "lazy",
          onError: (e) => {
            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120";
          },
          className: "w-16 h-16 rounded-full object-cover border border-border bg-background shrink-0"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-bold text-foreground tracking-tight", children: speaker.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-sm text-primary font-medium mt-1", children: [
          speaker.role,
          " at ",
          speaker.organisation
        ] }),
        speaker.socialUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: speaker.socialUrl,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mt-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Visit website / social" })
            ]
          }
        )
      ] })
    ] }) }),
    speaker.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 text-sm text-muted-foreground leading-relaxed max-h-[150px] overflow-y-auto pr-1", children: speaker.bio }),
    speakerSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-muted-foreground/80 uppercase tracking-widest mb-3", children: [
        "Sessions presented (",
        speakerSessions.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 max-h-[180px] overflow-y-auto pr-1", children: speakerSessions.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 bg-background border border-border hover:border-primary/30 rounded-md transition-colors flex items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground truncate", children: session.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] text-muted-foreground mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 10, className: "text-primary" }),
                  session.date
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10, className: "text-primary" }),
                  session.duration
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              distExports.Link,
              {
                to: `/sessions/${session.id}`,
                onClick: onClose,
                className: "p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0",
                title: "View details",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              }
            )
          ]
        },
        session.id
      )) })
    ] })
  ] }) });
}
export {
  SpeakerDialog as S
};
