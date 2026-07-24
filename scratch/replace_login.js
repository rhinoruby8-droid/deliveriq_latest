const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'login.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the state definition and add isForgotPassword
const stateTarget = `  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== "/signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);`;

const stateReplacement = `  const location = useLocation();
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

  const { useEffect } = require("react");
  useEffect(() => {
    setIsLogin(location.pathname !== "/signup");
    setIsForgotPassword(false);
    setResetSuccess(null);
    setError(null);
  }, [location.pathname]);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResetSuccess(null);
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResetSuccess(\`A password reset link has been sent to \${email} (mocked).\`);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };`;

// Replace the return block
const returnTarget = `  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1A1D24", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
      <Helmet>
        <title>{isLogin ? "Sign In | DeliverIQ" : "Create Account | DeliverIQ"}</title>
      </Helmet>

      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.3em", color: "#C79A4E", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>DeliverIQ</span>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#F0EDE8", margin: 0 }}>
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#8A8D96", marginTop: "0.5rem" }}>
          {isLogin ? "Or " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#C79A4E", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "inherit" }}>
            {isLogin ? "create a new account" : "sign in instead"}
          </button>
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: "28rem", backgroundColor: "#21242C", border: "1px solid #2C2F38", borderRadius: "1.25rem", padding: "2.5rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)" }}>
        {error && (
          <div style={{ marginBottom: "1.5rem", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.625rem", padding: "0.875rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span style={{ fontSize: "0.875rem", color: "#fca5a5" }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>`;

const returnReplacement = `  return (
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
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>`;

// Replace the password field
const passwordTarget = `          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Password</label>
            <div style={{ position: "relative" }}>`;

const passwordReplacement = `          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8A8D96", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>Password</label>
              {isLogin && (
                <button type="button" onClick={() => setIsForgotPassword(true)}
                  style={{ color: "#C79A4E", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "0.75rem" }}>
                  Forgot password?
                </button>
              )}
            </div>
            <div style={{ position: "relative" }}>`;

// Close form conditionally
const formEndTarget = `          <button type="submit" disabled={isLoading}
            style={{ width: "100%", height: "3.25rem", backgroundColor: "#C79A4E", color: "#1A1D24", fontWeight: 700, fontSize: "1rem", borderRadius: "9999px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem", boxShadow: "0 4px 20px rgba(199,154,78,0.25)" }}>
            {isLoading ? "Please wait..." : (isLogin ? "Sign in" : "Create account")}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>`;

const formEndReplacement = `          <button type="submit" disabled={isLoading}
            style={{ width: "100%", height: "3.25rem", backgroundColor: "#C79A4E", color: "#1A1D24", fontWeight: 700, fontSize: "1rem", borderRadius: "9999px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem", boxShadow: "0 4px 20px rgba(199,154,78,0.25)" }}>
            {isLoading ? "Please wait..." : (isLogin ? "Sign in" : "Create account")}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
        )}
      </div>
    </div>`;

// Apply replacements
if (!content.includes(stateTarget)) {
  console.error("State target not found!");
  process.exit(1);
}
content = content.replace(stateTarget, stateReplacement);

if (!content.includes(returnTarget)) {
  console.error("Return target not found!");
  process.exit(1);
}
content = content.replace(returnTarget, returnReplacement);

if (!content.includes(passwordTarget)) {
  console.error("Password target not found!");
  process.exit(1);
}
content = content.replace(passwordTarget, passwordReplacement);

if (!content.includes(formEndTarget)) {
  console.error("Form end target not found!");
  process.exit(1);
}
content = content.replace(formEndTarget, formEndReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated login.tsx!");
