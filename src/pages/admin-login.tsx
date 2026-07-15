import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { setUserToken } from '../lib/user-auth';
import { trackEvent } from '../lib/analytics';
import { AlertTriangle, Shield } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      if (data.user?.role !== 'admin') {
        throw new Error('Access denied: Admin privileges required.');
      }
      
      if (data.token) {
        setUserToken(data.token);
        trackEvent('auth', { action: 'admin_login', status: 'success' });
        
        // Redirect to where they came from or admin dashboard
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      trackEvent('auth', { action: 'admin_login_error', error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background element for admin portal */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C79A4E]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Helmet>
        <title>Admin Access | DeliverIQ</title>
      </Helmet>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[#1A1D24] border border-[#2C2F38] rounded-2xl shadow-xl">
             <Shield className="w-12 h-12 text-[#C79A4E]" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-[#8A8D96]">
          Restricted access. Please sign in with your administrator credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1D24] border border-[#2C2F38] py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10">
          
          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-sm p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider mb-1.5 block">
                Admin Email
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
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Sign In as Admin'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
