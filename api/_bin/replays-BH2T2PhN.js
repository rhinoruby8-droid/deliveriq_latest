import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { r as reactExports, j as jsxRuntimeExports, d as distExports, u as useCmsContent, F as FALLBACK_CMS_CONTENT, g as getUserToken, t as trackWatchTime, b as trackEvent, H as Helmet, X, A as AuthDialog, a as ArrowRight } from "./entry-server-CO9Km2vr.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-Bbt_vtY4.js";
import { S as SpeakerDialog } from "./SpeakerDialog-Bws-rcEh.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-DJyDVOIo.js";
import { P as Play } from "./play-CgVP62Ck.js";
import { C as Clock } from "./clock-Dsl-OAqf.js";
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
import "./DynamicForm-_YvKQM8N.js";
import "./globe-DXbVACjF.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  if (process.env.NODE_ENV !== "production" && mode === "wait" && renderedChildren.length > 1) {
    console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay }
  })
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const tags = ["All", "Project Controls", "Project Management", "Delivery Leadership"];
function ReplaysArchiveWidget({ onWatchReplay, onSpeakerClick }) {
  const { data: cms } = useCmsContent();
  const [activeTag, setActiveTag] = reactExports.useState("All");
  const allReplays = ((cms == null ? void 0 : cms.sessions) || []).filter((s) => s.status === "published" && s.videoUrl);
  const filteredReplays = activeTag === "All" ? allReplays : allReplays.filter((s) => s.tag === activeTag);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: "hidden", animate: "visible", variants: stagger, className: "diq-replays-archive", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeUp, custom: 0, className: "flex flex-wrap gap-2 mb-12 diq-replays-filters", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setActiveTag(tag),
        className: `text-xs font-semibold tracking-wide px-4 py-2 rounded-sm border transition-all duration-200 diq-replays-filter-btn ${activeTag === tag ? "bg-primary text-[#1A1D24] border-primary diq-replays-filter-btn-active" : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground diq-replays-filter-btn-inactive"}`,
        children: tag
      },
      tag
    )) }),
    filteredReplays.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 diq-replays-grid", children: filteredReplays.map((session) => {
      const sessionSpeakers = ((cms == null ? void 0 : cms.speakers) || []).filter((s) => (session.speakerIds || []).includes(s.id));
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          variants: fadeUp,
          className: "border border-border bg-card/40 rounded-sm overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-300 group diq-replay-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => {
                  trackEvent("video", { action: "play_recording", title: session.title });
                  onWatchReplay(session.id);
                },
                className: "aspect-video bg-background relative cursor-pointer overflow-hidden border-b border-border diq-replay-thumb",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-[#1A1D24] to-[#C79A4E]/5 flex items-center justify-center diq-replay-thumb-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-[#4A4D56] tracking-wider uppercase select-none diq-replay-thumb-tag", children: session.tag }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300 diq-replay-thumb-overlay" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center diq-replay-play-btn-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-background/90 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#1A1D24] transition-all duration-300 scale-95 group-hover:scale-105 shadow-xl diq-replay-play-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16, fill: "currentColor", className: "ml-0.5 diq-replay-play-icon" }) }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex-1 flex flex-col justify-between diq-replay-card-body", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-2 diq-replay-card-meta", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-primary uppercase tracking-wider bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-sm diq-replay-card-tag", children: session.tag }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground flex items-center gap-1 diq-replay-card-duration", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11, className: "diq-replay-card-duration-icon" }),
                    " ",
                    session.duration
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-foreground mb-2 leading-snug group-hover:text-primary transition-colors diq-replay-card-title", children: session.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 diq-replay-card-desc", children: session.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border/40 flex items-center gap-2 diq-replay-card-footer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1.5 overflow-hidden shrink-0 diq-replay-card-avatars", children: sessionSpeakers.map((sp) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      onSpeakerClick(sp);
                    },
                    className: "inline-block h-6 w-6 rounded-full ring-2 ring-card object-cover bg-background hover:scale-110 transition-transform cursor-pointer diq-replay-card-avatar-btn overflow-hidden",
                    title: sp.name,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: sp.avatarUrl,
                        alt: sp.name,
                        onError: (e) => {
                          e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=32&h=32";
                        },
                        className: "h-full w-full object-cover"
                      }
                    )
                  },
                  sp.id
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground font-medium truncate diq-replay-card-speakers flex flex-wrap gap-1 items-center", children: [
                  sessionSpeakers.map((sp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          onSpeakerClick(sp);
                        },
                        className: "hover:text-primary transition-colors cursor-pointer",
                        children: sp.name
                      }
                    ),
                    idx < sessionSpeakers.length - 1 && ", "
                  ] }, sp.id)),
                  sessionSpeakers.length === 0 && "TBA"
                ] })
              ] })
            ] })
          ]
        },
        session.id
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: fadeUp,
        custom: 0.1,
        className: "flex flex-col items-center justify-center py-24 border border-dashed border-border rounded-sm text-center diq-replays-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full border border-border flex items-center justify-center mb-6 diq-replays-empty-icon-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/airo-assets/images/logo/icon-dark",
              alt: "DeliverIQ",
              className: "w-8 h-8 object-contain diq-replays-empty-logo"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground mb-2 diq-replays-empty-title", children: "Replays coming soon." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm leading-relaxed diq-replays-empty-desc", children: "The first live sessions are on their way. Once they've aired, replays will appear here — filterable by topic and available on demand." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: "/sessions",
              className: "mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary/40 px-5 py-2.5 rounded-sm hover:bg-primary/10 transition-colors diq-replays-empty-link",
              children: [
                "See upcoming sessions ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "diq-replays-empty-link-icon" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function getYoutubeEmbedUrl(url) {
  var _a;
  if (!url) return null;
  if (url.includes("/shorts/")) {
    const parts = url.split("/shorts/");
    const id = (_a = parts[1]) == null ? void 0 : _a.split(/[?&]/)[0];
    if (id && id.length === 11) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  return null;
}
function ReplaysPage() {
  const navigate = distExports.useNavigate();
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const [playingSession, setPlayingSession] = reactExports.useState(null);
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
  reactExports.useEffect(() => {
    if (!playingSession) return;
    const intervalId = setInterval(() => {
      trackWatchTime("recording", 1);
      trackEvent("video", { action: "watch_minute", title: playingSession.title });
    }, 6e4);
    return () => clearInterval(intervalId);
  }, [playingSession]);
  const htmlContent = cms.replaysPageHtml || FALLBACK_CMS_CONTENT.replaysPageHtml;
  const site = "https://deliveriq.live";
  const title = "Replays — DeliverIQ";
  const description = "Access replays of past DeliverIQ sessions on AI for project management, project controls, and delivery professionals.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}/replays#webpage`,
    name: title,
    url: `${site}/replays`,
    description,
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` }
  };
  const widgets = {
    ReplaysGrid: /* @__PURE__ */ jsxRuntimeExports.jsx(ReplaysArchiveWidget, { onWatchReplay: handleWatchReplay, onSpeakerClick: handleSpeakerClick })
  };
  const embedUrl = playingSession ? getYoutubeEmbedUrl(playingSession.url) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: `${site}/replays` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: `${site}/replays` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }),
      cms.replaysPageCss ? /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: cms.replaysPageCss }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageHtmlRenderer, { html: htmlContent, widgets }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: playingSession && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-background/95 backdrop-blur-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", onClick: () => setPlayingSession(null) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.95, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.95, opacity: 0 },
              transition: { duration: 0.2, delay: 0.1 },
              className: "relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-border",
              children: [
                embedUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "iframe",
                  {
                    src: embedUrl,
                    title: playingSession.title,
                    frameBorder: "0",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    allowFullScreen: true,
                    className: "w-full h-full"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "video",
                  {
                    src: playingSession.url,
                    autoPlay: true,
                    controls: true,
                    className: "w-full h-full"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setPlayingSession(null),
                    className: "absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black text-foreground hover:text-primary rounded flex items-center justify-center backdrop-blur transition-colors",
                    "aria-label": "Close video",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
                  }
                )
              ]
            }
          )
        ]
      }
    ) }),
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
export {
  ReplaysPage as default
};
