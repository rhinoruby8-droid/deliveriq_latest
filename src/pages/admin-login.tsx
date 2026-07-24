import { useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "../lib/user-auth";
import { AlertTriangle, Mail, Lock, Shield, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");
      if (data.user?.role !== "admin") throw new Error("Access denied. Admin privileges required.");
      if (data.token) {
        setUserToken(data.token);
        navigate("/admin", { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
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
    <div style={{ minHeight: "100vh", backgroundColor: "#1A1D24", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem", position: "relative", overflow: "hidden" }}>
      <Helmet>
        <title>Admin Access | DeliverIQ</title>
      </Helmet>

      {/* Background glow */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "50%", backgroundColor: "rgba(199,154,78,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Shield icon */}
      <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", padding: "1rem", backgroundColor: "#21242C", border: "1px solid #2C2F38", borderRadius: "1rem", marginBottom: "1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          <Shield size={40} color="#C79A4E" />
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#F0EDE8", margin: 0 }}>Admin Portal</h1>
        <p style={{ fontSize: "0.875rem", color: "#8A8D96", marginTop: "0.5rem" }}>Restricted access — administrator credentials required</p>
      </div>

      <div style={{ width: "100%", maxWidth: "28rem", backgroundColor: "#21242C", border: "1px solid #2C2F38", borderRadius: "1.25rem", padding: "2.5rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)", position: "relative", zIndex: 10 }}>
        {error && (
          <div style={{ marginBottom: "1.5rem", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.625rem", padding: "0.875rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span style={{ fontSize: "0.875rem", color: "#fca5a5" }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Admin Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#8A8D96" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input id="email" type="email" autoComplete="email" required value={email}
                onChange={e => setEmail(e.target.value)} placeholder="admin@deliveriq.com"
                style={inputBase} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#8A8D96" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={{ ...inputBase, paddingRight: "2.75rem" }}
                onFocus={handleFocus} onBlur={handleBlur} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8A8D96", padding: 0, display: "flex", alignItems: "center" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            style={{ width: "100%", height: "3.25rem", backgroundColor: "#C79A4E", color: "#1A1D24", fontWeight: 700, fontSize: "1rem", borderRadius: "9999px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem", boxShadow: "0 4px 20px rgba(199,154,78,0.25)" }}>
            {isLoading ? "Authenticating..." : "Access Admin Panel"}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
