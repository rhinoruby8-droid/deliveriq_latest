import { useState, useEffect } from "react";
import { SeoHead } from '../components/SeoHead';
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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-12 sm:px-6">
      <SeoHead />

      <div className="mb-8 text-center">
        <span className="text-[0.65rem] font-extrabold tracking-[0.3em] text-primary uppercase block mb-3">DeliverIQ</span>
        <h1 className="text-3xl font-extrabold text-foreground m-0">
          {isForgotPassword ? "Reset your password" : (isLogin ? "Sign in to your account" : "Create your account")}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {isForgotPassword ? (
            <button type="button" onClick={() => setIsForgotPassword(false)}
              className="text-primary font-semibold bg-transparent border-none cursor-pointer p-0 text-inherit hover:underline">
              Back to sign in
            </button>
          ) : (
            <>
              {isLogin ? "Or " : "Already have an account? "}
              <button type="button" onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold bg-transparent border-none cursor-pointer p-0 text-inherit hover:underline">
                {isLogin ? "create a new account" : "sign in instead"}
              </button>
            </>
          )}
        </p>
      </div>

      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-10 shadow-2xl">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3.5 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <span className="text-sm text-red-300">{error}</span>
          </div>
        )}

        {resetSuccess && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-3.5">
            <span className="text-sm text-green-300">{resetSuccess}</span>
          </div>
        )}

        {isForgotPassword ? (
          <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="jane@company.com" className="w-full h-12 bg-background text-foreground border border-border rounded-[10px] pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20" />
              </div>
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full h-12 mt-1 bg-primary text-primary-foreground font-bold text-base rounded-full flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_20px_hsl(var(--primary)/0.25)]">
              {isLoading ? "Please wait..." : "Send Reset Link"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe" className="w-full h-12 bg-background text-foreground border border-border rounded-[10px] pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2">Email Address</label>
            <div className="relative">
              <Mail size={16} className="text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="jane@company.com" className="w-full h-12 bg-background text-foreground border border-border rounded-[10px] pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-muted-foreground tracking-widest uppercase m-0">Password</label>
              {isLogin && (
                <button type="button" onClick={() => setIsForgotPassword(true)}
                  className="text-primary font-semibold bg-transparent border-none cursor-pointer p-0 text-xs hover:underline">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock size={16} className="text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input id="password" type={showPassword ? "text" : "password"}
                autoComplete={isLogin ? "current-password" : "new-password"} required value={password}
                onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full h-12 bg-background text-foreground border border-border rounded-[10px] pl-11 pr-11 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-muted-foreground p-0 flex items-center hover:text-foreground transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full h-12 mt-1 bg-primary text-primary-foreground font-bold text-base rounded-full flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_20px_hsl(var(--primary)/0.25)]">
            {isLoading ? "Please wait..." : (isLogin ? "Sign in" : "Create account")}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}
