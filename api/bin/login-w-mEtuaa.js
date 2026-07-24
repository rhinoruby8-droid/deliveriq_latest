import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { d as distExports, r as reactExports, j as jsxDevRuntimeExports, H as Helmet, T as TriangleAlert, U as User, M as Mail, L as Lock, a as ArrowRight, s as setUserToken, c as trackEvent } from "./entry-server-oePWfdgD.js";
import { E as EyeOff } from "./eye-off-BFpmSOUB.js";
import { E as Eye } from "./eye-BUSO57WW.js";
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
  const [showPassword, setShowPassword] = reactExports.useState(false);
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
      if (!res.ok) throw new Error(data.error || "Authentication failed");
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { minHeight: "100vh", backgroundColor: "#1A1D24", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Helmet, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { children: isLogin ? "Sign In | DeliverIQ" : "Create Account | DeliverIQ" }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
      lineNumber: 75,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { marginBottom: "2rem", textAlign: "center" }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.3em", color: "#C79A4E", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }, children: "DeliverIQ" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { style: { fontSize: "1.75rem", fontWeight: 800, color: "#F0EDE8", margin: 0 }, children: isLogin ? "Sign in to your account" : "Create your account" }, void 0, false, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { fontSize: "0.875rem", color: "#8A8D96", marginTop: "0.5rem" }, children: [
        isLogin ? "Or " : "Already have an account? ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            type: "button",
            onClick: () => setIsLogin(!isLogin),
            style: { color: "#C79A4E", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "inherit" },
            children: isLogin ? "create a new account" : "sign in instead"
          },
          void 0,
          false,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 85,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { width: "100%", maxWidth: "28rem", backgroundColor: "#21242C", border: "1px solid #2C2F38", borderRadius: "1.25rem", padding: "2.5rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }, children: [
      error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { marginBottom: "1.5rem", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.625rem", padding: "0.875rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TriangleAlert, { size: 16, color: "#f87171", style: { flexShrink: 0, marginTop: "2px" } }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
          lineNumber: 95,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { fontSize: "0.875rem", color: "#fca5a5" }, children: error }, void 0, false, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
          lineNumber: 96,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "1.25rem" }, children: [
        !isLogin && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Full Name" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 103,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(User, { size: 16, color: "#8A8D96", style: { position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
              lineNumber: 105,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                id: "name",
                type: "text",
                required: true,
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Jane Doe",
                style: inputBase,
                onFocus: handleFocus,
                onBlur: handleBlur
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
                lineNumber: 106,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 104,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
          lineNumber: 102,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Email Address" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 113,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mail, { size: 16, color: "#8A8D96", style: { position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
              lineNumber: 115,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                id: "email",
                type: "email",
                autoComplete: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "jane@company.com",
                style: inputBase,
                onFocus: handleFocus,
                onBlur: handleBlur
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
                lineNumber: 116,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 114,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }, children: "Password" }, void 0, false, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 122,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lock, { size: 16, color: "#8A8D96", style: { position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" } }, void 0, false, {
              fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
              lineNumber: 124,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                id: "password",
                type: showPassword ? "text" : "password",
                autoComplete: isLogin ? "current-password" : "new-password",
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "��������",
                style: { ...inputBase, paddingRight: "2.75rem" },
                onFocus: handleFocus,
                onBlur: handleBlur
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
                lineNumber: 125,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                style: { position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8A8D96", padding: 0, display: "flex", alignItems: "center" },
                children: showPassword ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EyeOff, { size: 16 }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
                  lineNumber: 131,
                  columnNumber: 33
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { size: 16 }, void 0, false, {
                  fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
                  lineNumber: 131,
                  columnNumber: 56
                }, this)
              },
              void 0,
              false,
              {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
                lineNumber: 129,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 123,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
          lineNumber: 121,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            type: "submit",
            disabled: isLoading,
            style: { width: "100%", height: "3.25rem", backgroundColor: "#C79A4E", color: "#1A1D24", fontWeight: 700, fontSize: "1rem", borderRadius: "9999px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem", boxShadow: "0 4px 20px rgba(199,154,78,0.25)" },
            children: [
              isLoading ? "Please wait..." : isLogin ? "Sign in" : "Create account",
              !isLoading && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 18 }, void 0, false, {
                fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
                lineNumber: 139,
                columnNumber: 28
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
            lineNumber: 136,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Lenovo/Downloads/DeliverIQ (2)/DeliverIQ/DeliverIQ/src/pages/login.tsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
export {
  Login as default
};
