import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, r as reactExports, j as jsxDevRuntimeExports, H as Helmet, B as Button, s as setUserToken } from "./entry-server-C-lDZTiB.js";
import { I as Input } from "./input-DoHn7Zkw.js";
import { t as trackEvent } from "./analytics-jZcZ4Ayp.js";
import { S as Shield } from "./shield-BmAv3D5c.js";
import { T as TriangleAlert } from "./triangle-alert-D_EMuL-1.js";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-neutral-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C79A4E]/10 blur-[120px] rounded-full pointer-events-none" }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: "Admin Access | DeliverIQ" }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "sm:mx-auto sm:w-full sm:max-w-md relative z-10", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-[#1A1D24] border border-[#2C2F38] rounded-2xl shadow-xl", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Shield, { className: "w-12 h-12 text-[#C79A4E]" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
        lineNumber: 70,
        columnNumber: 14
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-center text-3xl font-extrabold text-white", children: "Admin Portal" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2 text-center text-sm text-[#8A8D96]", children: "Restricted access. Please sign in with your administrator credentials." }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10", children: [
      error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6 bg-red-900/20 border border-red-500/50 rounded-sm p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TriangleAlert, { className: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
          lineNumber: 86,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-red-200", children: error }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
          lineNumber: 87,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
        lineNumber: 85,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "email", className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block", children: "Admin Email" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
            lineNumber: 93,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
            },
            void 0,
            false,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
              lineNumber: 97,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
            lineNumber: 96,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
          lineNumber: 92,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: "password", className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block", children: "Password" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
            lineNumber: 111,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
            },
            void 0,
            false,
            {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
              lineNumber: 115,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
            lineNumber: 114,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            type: "submit",
            className: "w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: isLoading,
            children: isLoading ? "Authenticating..." : "Sign In as Admin"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
            lineNumber: 129,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
          lineNumber: 128,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
        lineNumber: 91,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/admin-login.tsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
}
export {
  AdminLogin as default
};
