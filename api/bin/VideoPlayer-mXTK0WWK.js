import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { r as reactExports, j as jsxDevRuntimeExports } from "./entry-server-OxH8J7fi.js";
import { C as CirclePlay } from "./circle-play-DyQNgNc3.js";
function parseVideoUrl(url) {
  var _a, _b, _c;
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
  const gdMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (gdMatch) {
    const videoId = gdMatch[1];
    return {
      provider: "googledrive",
      videoId,
      embedUrl: `https://drive.google.com/file/d/${videoId}/preview`
    };
  }
  if (url.includes("onedrive.live.com") || url.includes("1drv.ms")) {
    if (url.includes("onedrive.live.com/embed")) {
      return {
        provider: "onedrive",
        videoId: ((_a = url.match(/resid=([a-zA-Z0-9!_-]+)/)) == null ? void 0 : _a[1]) || "embed",
        embedUrl: url
      };
    }
    const resid = (_b = url.match(/resid=([a-zA-Z0-9!_-]+)/)) == null ? void 0 : _b[1];
    const authkey = (_c = url.match(/authkey=([a-zA-Z0-9!_-]+)/)) == null ? void 0 : _c[1];
    if (resid && authkey) {
      return {
        provider: "onedrive",
        videoId: resid,
        embedUrl: `https://onedrive.live.com/embed?resid=${resid}&authkey=${authkey}`
      };
    }
    if (url.includes("1drv.ms")) {
      const cleanUrl = url.trim();
      const encodeBase64 = (str) => {
        if (typeof btoa === "function") {
          return btoa(str);
        }
        return Buffer.from(str).toString("base64");
      };
      const base64Encoded = encodeBase64(cleanUrl);
      const safeBase64 = base64Encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      const embedUrl = `https://api.onedrive.com/v1.0/shares/u!${safeBase64}/root/content`;
      return {
        provider: "onedrive",
        videoId: safeBase64.substring(0, 15),
        embedUrl
      };
    }
  }
  return null;
}
function VideoPlayer({ url, title = "Video", thumbnailUrl, className = "" }) {
  const [playing, setPlaying] = reactExports.useState(false);
  const info = parseVideoUrl(url);
  if (!info) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `flex items-center justify-center border border-border rounded-sm bg-background p-6 text-center ${className}`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "a",
      {
        href: url,
        target: "_blank",
        rel: "noreferrer",
        className: "text-sm font-semibold text-primary hover:underline flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 16 }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
            lineNumber: 27,
            columnNumber: 11
          }, this),
          " Watch Video"
        ]
      },
      void 0,
      true,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
        lineNumber: 21,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this);
  }
  const autoThumb = !thumbnailUrl && info.provider === "youtube" ? `https://img.youtube.com/vi/${info.videoId}/maxresdefault.jpg` : thumbnailUrl;
  let iframeSrc = info.embedUrl;
  if (playing && (info.provider === "youtube" || info.provider === "vimeo")) {
    iframeSrc = `${info.embedUrl}&autoplay=1`;
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: `relative w-full overflow-hidden rounded-sm bg-black ${className}`,
      style: { aspectRatio: "16 / 9" },
      children: playing ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "iframe",
        {
          src: iframeSrc,
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
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
          lineNumber: 50,
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
                  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                  lineNumber: 67,
                  columnNumber: 13
                },
                this
              ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-background" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                lineNumber: 76,
                columnNumber: 13
              }, this),
              !autoThumb && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground font-semibold", children: [
                info.provider === "vimeo" && `Vimeo — ${title}`,
                info.provider === "googledrive" && `Google Drive — ${title}`,
                info.provider === "onedrive" && `OneDrive — ${title}`
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                lineNumber: 82,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                lineNumber: 81,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                lineNumber: 91,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CirclePlay, { size: 32, className: "text-[#1A1D24] ml-0.5" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                lineNumber: 95,
                columnNumber: 13
              }, this) }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                lineNumber: 94,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute bottom-3 left-3 text-[10px] font-bold text-white/70 uppercase tracking-wider", children: [
                info.provider === "youtube" && "YouTube",
                info.provider === "vimeo" && "Vimeo",
                info.provider === "googledrive" && "Google Drive",
                info.provider === "onedrive" && "OneDrive"
              ] }, void 0, true, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
                lineNumber: 99,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
            lineNumber: 61,
            columnNumber: 9
          },
          this
        )
      )
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/VideoPlayer.tsx",
      lineNumber: 45,
      columnNumber: 5
    },
    this
  );
}
export {
  VideoPlayer as V
};
