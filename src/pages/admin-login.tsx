import { useState } from "react";
import { SeoHead } from '../components/SeoHead';
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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-12 sm:px-6 relative overflow-hidden">
      <SeoHead />

      {/* Background glow */}
      <div className="absolute -top-[20%] -right-[10%] w-1/2 h-1/2 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Shield icon */}
      <div className="mb-6 text-center">
        <div className="inline-flex p-4 bg-card border border-border rounded-2xl mb-4 shadow-2xl">
          <Shield size={40} className="text-primary" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground m-0">Admin Portal</h1>
        <p className="text-sm text-muted-foreground mt-2">Restricted access – administrator credentials required</p>
      </div>

      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-10 shadow-2xl relative z-10">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3.5 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <span className="text-sm text-red-300">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">Admin Email</label>
            <div className="relative">
              <Mail size={16} className="text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input id="email" type="email" autoComplete="email" required value={email}
                onChange={e => setEmail(e.target.value)} placeholder="admin@deliveriq.com"
                className="w-full h-12 bg-background text-foreground border border-border rounded-[10px] pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className="w-full h-12 bg-background text-foreground border border-border rounded-[10px] pl-11 pr-11 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-muted-foreground p-0 flex items-center hover:text-foreground transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full h-12 mt-1 bg-primary text-primary-foreground font-bold text-base rounded-full flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_20px_hsl(var(--primary)/0.25)]">
            {isLoading ? "Authenticating..." : "Access Admin Panel"}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
