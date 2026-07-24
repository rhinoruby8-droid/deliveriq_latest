import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { r as reactExports, b as jsxRuntimeExports, d as distExports, u as useCmsContent, F as FALLBACK_CMS_CONTENT, g as getUserToken, t as trackWatchTime, c as trackEvent, j as jsxDevRuntimeExports, H as Helmet, X, A as AuthDialog, a as ArrowRight } from "./entry-server-DDW4XXzT.js";
import { P as PageHtmlRenderer } from "./PageHtmlRenderer-g3MpE5K-.js";
import { S as SpeakerDialog } from "./SpeakerDialog-B6Sd4SdY.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-CtfyIHLO.js";
import { P as Play } from "./play-C1RW9BHB.js";
import { C as Clock } from "./clock-fjdQaJJj.js";
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
import "./DynamicForm-DOn7isFD.js";
import "./globe-B3cQBWoH.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { initial: "hidden", animate: "visible", variants: stagger, className: "diq-replays-archive", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { variants: fadeUp, custom: 0, className: "flex flex-wrap gap-2 mb-12 diq-replays-filters", children: tags.map((tag) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setActiveTag(tag),
        className: `text-xs font-semibold tracking-wide px-4 py-2 rounded-sm border transition-all duration-200 diq-replays-filter-btn ${activeTag === tag ? "bg-[#C79A4E] text-[#1A1D24] border-[#C79A4E] diq-replays-filter-btn-active" : "bg-transparent text-[#8A8D96] border-[#2C2F38] hover:border-[#C79A4E]/50 hover:text-[#F0EDE8] diq-replays-filter-btn-inactive"}`,
        children: tag
      },
      tag,
      false,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 51,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    filteredReplays.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 diq-replays-grid", children: filteredReplays.map((session) => {
      const sessionSpeakers = ((cms == null ? void 0 : cms.speakers) || []).filter((s) => (session.speakerIds || []).includes(s.id));
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        motion.div,
        {
          variants: fadeUp,
          className: "border border-[#2C2F38] bg-[#21242C]/40 rounded-sm overflow-hidden flex flex-col hover:border-[#C79A4E]/30 transition-all duration-300 group diq-replay-card",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                onClick: () => {
                  trackEvent("video", { action: "play_recording", title: session.title });
                  onWatchReplay(session.id);
                },
                className: "aspect-video bg-[#1A1D24] relative cursor-pointer overflow-hidden border-b border-[#2C2F38] diq-replay-thumb",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-tr from-[#1A1D24] to-[#C79A4E]/5 flex items-center justify-center diq-replay-thumb-bg", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] font-mono text-[#4A4D56] tracking-wider uppercase select-none diq-replay-thumb-tag", children: session.tag }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 83,
                    columnNumber: 21
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 82,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300 diq-replay-thumb-overlay" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 85,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center diq-replay-play-btn-container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-12 h-12 rounded-full bg-[#1A1D24]/90 border border-[#C79A4E]/30 flex items-center justify-center text-[#C79A4E] group-hover:bg-[#C79A4E] group-hover:text-[#1A1D24] transition-all duration-300 scale-95 group-hover:scale-105 shadow-xl diq-replay-play-btn", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Play, { size: 16, fill: "currentColor", className: "ml-0.5 diq-replay-play-icon" }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 88,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 87,
                    columnNumber: 21
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 86,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                lineNumber: 75,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-5 flex-1 flex flex-col justify-between diq-replay-card-body", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-2 diq-replay-card-meta", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-[#C79A4E] uppercase tracking-wider bg-[#C79A4E]/5 border border-[#C79A4E]/10 px-2 py-0.5 rounded-sm diq-replay-card-tag", children: session.tag }, void 0, false, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 96,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-[#8A8D96] flex items-center gap-1 diq-replay-card-duration", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { size: 11, className: "diq-replay-card-duration-icon" }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                      lineNumber: 100,
                      columnNumber: 25
                    }, this),
                    " ",
                    session.duration
                  ] }, void 0, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 99,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                  lineNumber: 95,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-base text-[#F0EDE8] mb-2 leading-snug group-hover:text-[#C79A4E] transition-colors diq-replay-card-title", children: session.title }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                  lineNumber: 103,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-[#8A8D96] leading-relaxed mb-4 line-clamp-2 diq-replay-card-desc", children: session.description }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                  lineNumber: 106,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                lineNumber: 94,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-4 border-t border-[#2C2F38]/40 flex items-center gap-2 diq-replay-card-footer", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex -space-x-1.5 overflow-hidden shrink-0 diq-replay-card-avatars", children: sessionSpeakers.map((sp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      onSpeakerClick(sp);
                    },
                    className: "inline-block h-6 w-6 rounded-full ring-2 ring-[#21242C] object-cover bg-[#1A1D24] hover:scale-110 transition-transform cursor-pointer diq-replay-card-avatar-btn overflow-hidden",
                    title: sp.name,
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "img",
                      {
                        src: sp.avatarUrl,
                        alt: sp.name,
                        onError: (e) => {
                          e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=32&h=32";
                        },
                        className: "h-full w-full object-cover"
                      },
                      void 0,
                      false,
                      {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                        lineNumber: 120,
                        columnNumber: 27
                      },
                      this
                    )
                  },
                  sp.id,
                  false,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 114,
                    columnNumber: 25
                  },
                  this
                )) }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                  lineNumber: 112,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[10px] text-[#8A8D96] font-medium truncate diq-replay-card-speakers flex flex-wrap gap-1 items-center", children: [
                  sessionSpeakers.map((sp, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          onSpeakerClick(sp);
                        },
                        className: "hover:text-[#C79A4E] transition-colors cursor-pointer",
                        children: sp.name
                      },
                      void 0,
                      false,
                      {
                        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                        lineNumber: 132,
                        columnNumber: 27
                      },
                      this
                    ),
                    idx < sessionSpeakers.length - 1 && ", "
                  ] }, sp.id, true, {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 131,
                    columnNumber: 25
                  }, this)),
                  sessionSpeakers.length === 0 && "TBA"
                ] }, void 0, true, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                  lineNumber: 129,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                lineNumber: 111,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
              lineNumber: 93,
              columnNumber: 17
            }, this)
          ]
        },
        session.id,
        true,
        {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
          lineNumber: 70,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      motion.div,
      {
        variants: fadeUp,
        custom: 0.1,
        className: "flex flex-col items-center justify-center py-24 border border-dashed border-[#2C2F38] rounded-sm text-center diq-replays-empty",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-14 h-14 rounded-full border border-[#2C2F38] flex items-center justify-center mb-6 diq-replays-empty-icon-wrap", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "img",
            {
              src: "/airo-assets/images/logo/icon-dark",
              alt: "DeliverIQ",
              className: "w-8 h-8 object-contain diq-replays-empty-logo"
            },
            void 0,
            false,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
              lineNumber: 156,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
            lineNumber: 155,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg font-semibold text-[#F0EDE8] mb-2 diq-replays-empty-title", children: "Replays coming soon." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
            lineNumber: 162,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] max-w-sm leading-relaxed diq-replays-empty-desc", children: "The first live sessions are on their way. Once they've aired, replays will appear here — filterable by topic and available on demand." }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
            lineNumber: 165,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            distExports.Link,
            {
              to: "/sessions",
              className: "mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#C79A4E] border border-[#C79A4E]/40 px-5 py-2.5 rounded-sm hover:bg-[#C79A4E]/10 transition-colors diq-replays-empty-link",
              children: [
                "See upcoming sessions ",
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14, className: "diq-replays-empty-link-icon" }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                  lineNumber: 173,
                  columnNumber: 35
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
              lineNumber: 169,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 150,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
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
    ReplaysGrid: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ReplaysArchiveWidget, { onWatchReplay: handleWatchReplay, onSpeakerClick: handleSpeakerClick }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
      lineNumber: 255,
      columnNumber: 18
    }, this)
  };
  const embedUrl = playingSession ? getYoutubeEmbedUrl(playingSession.url) : null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 263,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 264,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("link", { rel: "canonical", href: `${site}/replays` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 265,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 266,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 267,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:type", content: "website" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 268,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:url", content: `${site}/replays` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 269,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { property: "og:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 270,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 271,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:title", content: title }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 272,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:description", content: description }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 273,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "twitter:image", content: `${site}/airo-assets/images/logo/horizontal` }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 274,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 275,
        columnNumber: 9
      }, this),
      cms.replaysPageCss ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: cms.replaysPageCss }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 276,
        columnNumber: 31
      }, this) : null
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
      lineNumber: 262,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageHtmlRenderer, { html: htmlContent, widgets }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
      lineNumber: 280,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
      lineNumber: 279,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AnimatePresence, { children: playingSession && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-[#1A1D24]/95 backdrop-blur-sm",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0", onClick: () => setPlayingSession(null) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
            lineNumber: 292,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            motion.div,
            {
              initial: { scale: 0.95, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.95, opacity: 0 },
              transition: { duration: 0.2, delay: 0.1 },
              className: "relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-[#2C2F38]",
              children: [
                embedUrl ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "iframe",
                  {
                    src: embedUrl,
                    title: playingSession.title,
                    frameBorder: "0",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    allowFullScreen: true,
                    className: "w-full h-full"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 301,
                    columnNumber: 17
                  },
                  this
                ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "video",
                  {
                    src: playingSession.url,
                    autoPlay: true,
                    controls: true,
                    className: "w-full h-full"
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 310,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setPlayingSession(null),
                    className: "absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black text-[#F0EDE8] hover:text-[#C79A4E] rounded flex items-center justify-center backdrop-blur transition-colors",
                    "aria-label": "Close video",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 20 }, void 0, false, {
                      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                      lineNumber: 322,
                      columnNumber: 17
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
                    lineNumber: 317,
                    columnNumber: 15
                  },
                  this
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
              lineNumber: 293,
              columnNumber: 13
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 285,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
      lineNumber: 283,
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
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 329,
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
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
        lineNumber: 339,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/replays.tsx",
    lineNumber: 261,
    columnNumber: 5
  }, this);
}
export {
  ReplaysPage as default
};
