import { useState, type FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { setUserToken } from '@/lib/user-auth';
import { AlertTriangle, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthDialog({ isOpen, onClose, onSuccess }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = activeTab === 'login' ? { email, password } : { email, name, password };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      
      if (data.token) {
        setUserToken(data.token);
        trackEvent('auth', { action: activeTab, status: 'success' });
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      trackEvent('auth', { action: `${activeTab}_error`, error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] bg-card border-border text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white">
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-400 text-xs mt-1">
            Access platform sessions, video library, and resource materials.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2 mt-2">
            <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <span className="text-xs text-red-300">{error}</span>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full mt-4">
          <TabsList className="grid grid-cols-2 bg-background border border-border p-1 rounded-lg">
            <TabsTrigger value="login" className="text-xs rounded-md text-neutral-400 data-[state=active]:bg-primary data-[state=active]:text-[#1A1D24]">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="text-xs rounded-md text-neutral-400 data-[state=active]:bg-primary data-[state=active]:text-[#1A1D24]">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <TabsContent value="login" className="space-y-4 m-0">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    id="dialog-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    id="dialog-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 m-0">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    id="dialog-register-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    id="dialog-register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    id="dialog-register-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </TabsContent>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-[#1A1D24] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-amber-500/10"
            >
              {isLoading ? 'Processing...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
