import { useEffect, useState } from 'react';
import { SeoHead } from '../components/SeoHead';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../layouts/Dashboard';
import { fetchMe, removeUserToken, type User, trackWatchTime } from '../lib/user-auth';
import { useCmsContent } from '@/lib/cms-client';
import { VideoPlayer } from '@/components/VideoPlayer';
import PricingTiers from '@/components/PricingTiers';
import { Button } from '@/components/ui/button';
import { PlayCircle, Calendar, Video, LogOut, ArrowLeft, Lock } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function ReplayPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: cms } = useCmsContent();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const me = await fetchMe();
      if (!me) {
        navigate('/login');
        return;
      }
      setUser(me);
      setIsLoading(false);
    }
    loadData();
  }, [navigate]);

  const session = (cms?.sessions || []).find(s => s.id === id);

  // Watch time telemetry heartbeat
  useEffect(() => {
    if (!session || !user) return;
    
    // Check if user has access
    const isFree = session.isFree;
    const isPro = user.subscription_tier === 'tier3' && 
      user.subscription_expires_at && 
      new Date(user.subscription_expires_at as string).getTime() > Date.now();
    const isTier2 = user.session_access?.[session.id]?.tier === 'tier2' &&
      user.session_access?.[session.id]?.expires_at &&
      new Date(user.session_access?.[session.id]?.expires_at as string).getTime() > Date.now();
      
    const hasAccess = isFree || isPro || isTier2;
    if (!hasAccess) return;

    const intervalId = setInterval(() => {
      trackWatchTime('recording', 1);
      trackEvent('video', { action: 'watch_minute', title: session.title });
    }, 60000); // every minute

    return () => clearInterval(intervalId);
  }, [session, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary font-medium">Loading Player...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    removeUserToken();
    navigate('/');
  };

  const config = {
    sidebar: {
      logo: { text: "DeliverIQ", href: "/" },
      navigation: {
        main: [
          { title: "Dashboard", href: "/dashboard", icon: PlayCircle },
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
          { title: "Watch Replays", href: "/replays", icon: Video, active: true }
        ]
      },
      footer: (
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-neutral-400 hover:text-white">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      )
    },
    header: {
      user: {
        name: user?.name,
        email: user?.email,
        initials: user?.name?.substring(0, 2).toUpperCase()
      }
    }
  };

  if (!session) {
    return (
      <DashboardLayout config={config}>
        <div className="p-8 text-center text-foreground">
          <h2 className="text-2xl font-bold">Session not found</h2>
          <Button asChild className="mt-4 bg-primary text-primary-foreground">
            <Link to="/replays">Back to Replays</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Determine access
  const isFree = session.isFree;
  const isPro = user.subscription_tier === 'tier3' && 
    user.subscription_expires_at && 
    new Date(user.subscription_expires_at as string).getTime() > Date.now();
  const isTier2 = user.session_access?.[session.id]?.tier === 'tier2' &&
    user.session_access?.[session.id]?.expires_at &&
    new Date(user.session_access?.[session.id]?.expires_at as string).getTime() > Date.now();
    
  const hasAccess = isFree || isPro || isTier2;

  return (
    <DashboardLayout config={config}>
      <SeoHead />

      <div className="space-y-6">
        <Link to="/replays" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-2 transition-colors">
          <ArrowLeft size={16} /> Back to Replays
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{session.title}</h1>
          <p className="text-neutral-400 text-sm">{session.description}</p>
        </div>

        {hasAccess ? (
          <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-4 sm:p-6">
            <VideoPlayer url={session.videoUrl || ''} title={session.title} />
          </div>
        ) : (
          <div className="bg-neutral-800/30 border border-amber-500/20 rounded-xl p-8 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Lock className="w-6 h-6" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-foreground">Pro Upgrade Required</h2>
              <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto">
                This session replay requires a Pro subscription. Upgrading grants you full access to all past events, video recordings, and upcoming sessions for an entire year.
              </p>
            </div>

            <PricingTiers
              basePrice={session.price || 49.99}
              sessionTitle={session.title}
              sessionId={session.id}
              showOnlyPro={true}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
