import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { r as reactExports, j as jsxDevRuntimeExports } from "./entry-server-CpH7kUQ-.js";
import { C as CirclePlay } from "./circle-play-JVmhUFsA.js";
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
          referrerPolicy: "strict-origin-when-cross-origin",
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
                  lineNumber: 62,
                  columnNumber: 13
                },
                this
              ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-[#1A1D24]" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 71,
                columnNumber: 13
              }, this),
              info.provider === "vimeo" && !autoThumb && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-[#1A1D24]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-[#8A8D96] font-semibold", children: [
                "Vimeo · ",
                title
              ] }, void 0, true, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 77,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 76,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 82,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10 w-16 h-16 rounded-full bg-[#C79A4E] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 32, className: "text-[#1A1D24] ml-0.5" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 86,
                columnNumber: 13
              }, this) }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 85,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute bottom-3 left-3 text-[10px] font-bold text-white/70 uppercase tracking-wider", children: info.provider === "youtube" ? "YouTube" : "Vimeo" }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
                lineNumber: 90,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/components/VideoPlayer.tsx",
            lineNumber: 56,
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
export {
  VideoPlayer as V
};
