import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { setUserToken } from '../lib/user-auth';
import { trackEvent } from '../lib/analytics';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== '/signup');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { email, name, password };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      if (data.token) {
        setUserToken(data.token);
        trackEvent('auth', { action: isLogin ? 'login' : 'register', status: 'success' });
        
        // Redirect to where they came from or dashboard/admin
        const defaultRoute = data.user?.role === 'admin' ? '/admin' : '/dashboard';
        const from = location.state?.from?.pathname || defaultRoute;
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      trackEvent('auth', { action: isLogin ? 'login_error' : 'register_error', error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>{isLogin ? 'Sign In | DeliverIQ' : 'Create Account | DeliverIQ'}</title>
      </Helmet>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-400">
          {isLogin ? 'Or ' : 'Already have an account? '}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            {isLogin ? 'create a new account' : 'sign in instead'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-700/50 py-8 px-4 shadow sm:rounded-xl sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block">
                  Full Name
                </label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8A8D96] hover:text-[#C79A4E] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign in' : 'Create account')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
