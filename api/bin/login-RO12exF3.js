import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, r as reactExports, j as jsxRuntimeExports, H as Helmet, B as Button, s as setUserToken } from "./entry-server-CdzZ2syk.js";
import { I as Input } from "./input-DNdNnT8o.js";
import { t as trackEvent } from "./analytics-jZcZ4Ayp.js";
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
function Login() {
  const navigate = distExports.useNavigate();
  const location = distExports.useLocation();
  const [isLogin, setIsLogin] = reactExports.useState(location.pathname !== "/signup");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    var _a, _b, _c;
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin ? { email, password } : { email, name, password };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }
      if (data.token) {
        setUserToken(data.token);
        trackEvent("auth", { action: isLogin ? "login" : "register", status: "success" });
        const defaultRoute = ((_a = data.user) == null ? void 0 : _a.role) === "admin" ? "/admin" : "/dashboard";
        const from = ((_c = (_b = location.state) == null ? void 0 : _b.from) == null ? void 0 : _c.pathname) || defaultRoute;
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      trackEvent("auth", { action: isLogin ? "login_error" : "register_error", error: err.message });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-neutral-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: isLogin ? "Sign In | DeliverIQ" : "Create Account | DeliverIQ" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-white", children: isLogin ? "Sign in to your account" : "Create your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-center text-sm text-neutral-400", children: [
        isLogin ? "Or " : "Already have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsLogin(!isLogin),
            className: "font-medium text-emerald-400 hover:text-emerald-300",
            children: isLogin ? "create a new account" : "sign in instead"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-neutral-800/50 backdrop-blur-xl border border-neutral-700/50 py-8 px-4 shadow sm:rounded-xl sm:px-10", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-200", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
        !isLogin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              name: "name",
              type: "text",
              required: true,
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block", children: "Email address" }),
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
              autoComplete: isLogin ? "current-password" : "new-password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: isLoading,
            children: isLoading ? "Please wait..." : isLogin ? "Sign in" : "Create account"
          }
        ) })
      ] })
    ] }) })
  ] });
}
export {
  Login as default
};
