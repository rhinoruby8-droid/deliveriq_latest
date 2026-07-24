import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, r as reactExports, j as jsxDevRuntimeExports, B as Button, g as getUserToken } from "./entry-server-BWjtIwOK.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
function JoinCallButton({
  sessionId,
  className,
  variant = "outline",
  size = "sm"
}) {
  const [isJoining, setIsJoining] = reactExports.useState(false);
  const handleJoinCall = async () => {
    try {
      setIsJoining(true);
      const token = getUserToken();
      const res = await fetch(`/api/user/sessions/${sessionId}/join`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to join session");
        setIsJoining(false);
        return;
      }
      if (data.joinUrl) {
        window.location.href = data.joinUrl;
      }
    } catch (err) {
      console.error("Error joining session:", err);
      alert("Network error. Please try again.");
      setIsJoining(false);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Button,
    {
      variant,
      size,
      disabled: isJoining,
      onClick: handleJoinCall,
      className: className || "border-primary/30 text-primary hover:text-[#0A0B0E] hover:bg-primary cursor-pointer shrink-0 text-xs rounded-lg px-4 h-9 font-bold bg-primary/10",
      children: isJoining ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/JoinCallButton.tsx",
          lineNumber: 56,
          columnNumber: 11
        }, this),
        "Connecting..."
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/JoinCallButton.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-1", children: [
        "Join Call ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ExternalLink, { size: 11, className: "ml-1" }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/JoinCallButton.tsx",
          lineNumber: 61,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/JoinCallButton.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this)
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/JoinCallButton.tsx",
      lineNumber: 47,
      columnNumber: 5
    },
    this
  );
}
export {
  JoinCallButton as J
};
