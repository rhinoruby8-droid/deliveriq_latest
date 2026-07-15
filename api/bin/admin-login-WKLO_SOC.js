import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, r as reactExports, j as jsxRuntimeExports, H as Helmet, B as Button, s as setUserToken } from "./entry-server-CdzZ2syk.js";
import { I as Input } from "./input-DNdNnT8o.js";
import { t as trackEvent } from "./analytics-jZcZ4Ayp.js";
import { S as Shield } from "./shield-DCwC81or.js";
import { T as TriangleAlert } from "./triangle-alert-D16Q2oWk.js";
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
import "async_hooks";
function AdminLogin() {
  const navigate = distExports.useNavigate();
  const location = distExports.useLocation();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    var _a, _b, _c;
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
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }
      if (((_a = data.user) == null ? void 0 : _a.role) !== "admin") {
        throw new Error("Access denied: Admin privileges required.");
      }
      if (data.token) {
        setUserToken(data.token);
        trackEvent("auth", { action: "admin_login", status: "success" });
        const from = ((_c = (_b = location.state) == null ? void 0 : _b.from) == null ? void 0 : _c.pathname) || "/admin";
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      trackEvent("auth", { action: "admin_login_error", error: err.message });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-neutral-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C79A4E]/10 blur-[120px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Admin Access | DeliverIQ" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-[#1A1D24] border border-[#2C2F38] rounded-2xl shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 text-[#C79A4E]" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center text-3xl font-extrabold text-white", children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-sm text-[#8A8D96]", children: "Restricted access. Please sign in with your administrator credentials." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A1D24] border border-[#2C2F38] py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 bg-red-900/20 border border-red-500/50 rounded-sm p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-200", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block", children: "Admin Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              name: "email",
              type: "email",
              autoComplete: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "password",
              name: "password",
              type: "password",
              autoComplete: "current-password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: isLoading,
            children: isLoading ? "Authenticating..." : "Sign In as Admin"
          }
        ) })
      ] })
    ] }) })
  ] });
}
export {
  AdminLogin as default
};
