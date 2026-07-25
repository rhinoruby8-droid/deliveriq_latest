import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, r as reactExports, j as jsxRuntimeExports, H as Helmet, T as TriangleAlert, M as Mail, L as Lock, a as ArrowRight, s as setUserToken } from "./entry-server-CO9Km2vr.js";
import { S as Shield } from "./shield-BLzbnVRQ.js";
import { E as EyeOff } from "./eye-off-CLlCwFA4.js";
import { E as Eye } from "./eye-KepMYcxW.js";
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
function AdminLogin() {
  const navigate = distExports.useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    var _a;
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");
      if (((_a = data.user) == null ? void 0 : _a.role) !== "admin") throw new Error("Access denied. Admin privileges required.");
      if (data.token) {
        setUserToken(data.token);
        navigate("/admin", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };
  const inputBase = {
    width: "100%",
    height: "3rem",
    backgroundColor: "#14161B",
    color: "#F0EDE8",
    border: "1.5px solid #2C2F38",
    borderRadius: "10px",
    paddingLeft: "2.75rem",
    paddingRight: "1rem",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
  };
  const handleFocus = (e) => {
    e.target.style.borderColor = "#C79A4E";
    e.target.style.boxShadow = "0 0 0 2px rgba(199,154,78,0.2)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "#2C2F38";
    e.target.style.boxShadow = "none";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minHeight: "100vh", backgroundColor: "#1A1D24", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem", position: "relative", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Admin Access | DeliverIQ" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "50%", backgroundColor: "rgba(199,154,78,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.5rem", textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "inline-flex", padding: "1rem", backgroundColor: "#21242C", border: "1px solid #2C2F38", borderRadius: "1rem", marginBottom: "1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 40, color: "#C79A4E" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: "1.75rem", fontWeight: 800, color: "#F0EDE8", margin: 0 }, children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.875rem", color: "#8A8D96", marginTop: "0.5rem" }, children: "Restricted access � administrator credentials required" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", maxWidth: "28rem", backgroundColor: "#21242C", border: "1px solid #2C2F38", borderRadius: "1.25rem", padding: "2.5rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)", position: "relative", zIndex: 10 }, children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.5rem", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.625rem", padding: "0.875rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16, color: "#f87171", style: { flexShrink: 0, marginTop: "2px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.875rem", color: "#fca5a5" }, children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "1.25rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Admin Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, color: "#8A8D96", style: { position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "email",
                type: "email",
                autoComplete: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "admin@deliveriq.com",
                style: inputBase,
                onFocus: handleFocus,
                onBlur: handleBlur
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16, color: "#8A8D96", style: { position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "password",
                type: showPassword ? "text" : "password",
                autoComplete: "current-password",
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "��������",
                style: { ...inputBase, paddingRight: "2.75rem" },
                onFocus: handleFocus,
                onBlur: handleBlur
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                style: { position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8A8D96", padding: 0, display: "flex", alignItems: "center" },
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            disabled: isLoading,
            style: { width: "100%", height: "3.25rem", backgroundColor: "#C79A4E", color: "#1A1D24", fontWeight: 700, fontSize: "1rem", borderRadius: "9999px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem", boxShadow: "0 4px 20px rgba(199,154,78,0.25)" },
            children: [
              isLoading ? "Authenticating..." : "Access Admin Panel",
              !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  AdminLogin as default
};
