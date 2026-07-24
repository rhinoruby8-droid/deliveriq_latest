import { useState, useEffect } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { setUserToken } from "../lib/user-auth";
import { trackEvent } from "../lib/analytics";
import { AlertTriangle, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== "/signup");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Automatically update the view when route changes
  useState(() => {
    setIsLogin(location.pathname !== "/signup");
  });

  useEffect(() => {
    setIsLogin(location.pathname !== "/signup");
    setIsForgotPassword(false);
    setResetSuccess(null);
    setError(null);
  }, [location.pathname]);

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResetSuccess(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "An error occurred. Please try again.");
      }
      setResetSuccess(`A password reset link has been sent to ${email}.`);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin ? { email, password } : { email, name, password };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");
      if (data.token) {
        setUserToken(data.token);
        trackEvent("auth", { action: isLogin ? "login" : "register", status: "success" });
        const defaultRoute = data.user?.role === "admin" ? "/admin" : "/dashboard";
        const from = location.state?.from?.pathname || defaultRoute;
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      trackEvent("auth", { action: isLogin ? "login_error" : "register_error", error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase: React.CSSProperties = {
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
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#C79A4E";
    e.target.style.boxShadow = "0 0 0 2px rgba(199,154,78,0.2)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#2C2F38";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1A1D24", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
      <Helmet>
        <title>{isForgotPassword ? "Reset Password | DeliverIQ" : (isLogin ? "Sign In | DeliverIQ" : "Create Account | DeliverIQ")}</title>
      </Helmet>

      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.3em", color: "#C79A4E", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>DeliverIQ</span>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#F0EDE8", margin: 0 }}>
          {isForgotPassword ? "Reset your password" : (isLogin ? "Sign in to your account" : "Create your account")}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#8A8D96", marginTop: "0.5rem" }}>
          {isForgotPassword ? (
            <button type="button" onClick={() => setIsForgotPassword(false)}
              style={{ color: "#C79A4E", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "inherit" }}>
              Back to sign in
            </button>
          ) : (
            <>
              {isLogin ? "Or " : "Already have an account? "}
              <button type="button" onClick={() => setIsLogin(!isLogin)}
                style={{ color: "#C79A4E", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "inherit" }}>
                {isLogin ? "create a new account" : "sign in instead"}
              </button>
            </>
          )}
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: "28rem", backgroundColor: "#21242C", border: "1px solid #2C2F38", borderRadius: "1.25rem", padding: "2.5rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }}>
        {error && (
          <div style={{ marginBottom: "1.5rem", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.625rem", padding: "0.875rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span style={{ fontSize: "0.875rem", color: "#fca5a5" }}>{error}</span>
          </div>
        )}

        {resetSuccess && (
          <div style={{ marginBottom: "1.5rem", backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "0.625rem", padding: "0.875rem 1rem" }}>
            <span style={{ fontSize: "0.875rem", color: "#86efac" }}>{resetSuccess}</span>
          </div>
        )}

        {isForgotPassword ? (
          <form onSubmit={handleForgotPasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} color="#8A8D96" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="jane@company.com" style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>
            <button type="submit" disabled={isLoading}
              style={{ width: "100%", height: "3.25rem", backgroundColor: "#C79A4E", color: "#1A1D24", fontWeight: 700, fontSize: "1rem", borderRadius: "9999px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem", boxShadow: "0 4px 20px rgba(199,154,78,0.25)" }}>
              {isLoading ? "Please wait..." : "Send Reset Link"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {!isLogin && (
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} color="#8A8D96" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe" style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#8A8D96" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="jane@company.com" style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>Password</label>
              {isLogin && (
                <button type="button" onClick={() => setIsForgotPassword(true)}
                  style={{ color: "#C79A4E", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "0.75rem" }}>
                  Forgot password?
                </button>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#8A8D96" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input id="password" type={showPassword ? "text" : "password"}
                autoComplete={isLogin ? "current-password" : "new-password"} required value={password}
                onChange={e => setPassword(e.target.value)} placeholder="��������"
                style={{ ...inputBase, paddingRight: "2.75rem" }} onFocus={handleFocus} onBlur={handleBlur} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8A8D96", padding: 0, display: "flex", alignItems: "center" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            style={{ width: "100%", height: "3.25rem", backgroundColor: "#C79A4E", color: "#1A1D24", fontWeight: 700, fontSize: "1rem", borderRadius: "9999px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem", boxShadow: "0 4px 20px rgba(199,154,78,0.25)" }}>
            {isLoading ? "Please wait..." : (isLogin ? "Sign in" : "Create account")}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}
