import { useEffect, useState } from 'react';
import { SeoHead } from '../components/SeoHead';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import DashboardLayout from '../layouts/Dashboard';
import { fetchMe, fetchDashboardData, removeUserToken, type Delegate } from '../lib/user-auth';
import { Button } from '../components/ui/button';
import JoinCallButton from '../components/JoinCallButton';
import {
  Calendar,
  PlayCircle,
  Video,
  LogOut,
  ArrowRight,
  Search
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.05 },
  }),
};

export default function DashboardSessionsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Delegate | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const me = await fetchMe();
      if (!me) {
        navigate('/login');
        return;
      }
      setUser(me);
      const dashboardData = await fetchDashboardData();
      if (dashboardData) {
        setRegisteredSessions(dashboardData.registeredSessions || []);
      }
      setIsLoading(false);
    }
    loadData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="h-screen bg-muted flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border-2 border-primary/10 rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full animate-spin" />
          </div>
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Loading your calendar</span>
        </div>
      </div>
    );
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
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar, active: true },
          { title: "Watch Replays", href: "/replays", icon: Video }
        ]
      },
      footer: (
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-slate-500 hover:text-red-400 hover:bg-red-500/5 text-xs h-9 px-3 rounded-lg transition-all duration-200">
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

  const filteredSessions = registeredSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout config={config}>
      <SeoHead />

      <motion.div
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-[1140px] pb-10"
      >
        {/* Header section */}
        <motion.div variants={fadeIn} custom={0} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight leading-none">
              My Sessions
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Browse and join live events you are registered for.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-slate-500 focus:border-primary focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Content list */}
        <motion.div variants={fadeIn} custom={1}>
          {filteredSessions.length === 0 ? (
            <div className="relative bg-background border border-dashed border-border rounded-2xl p-16 text-center flex flex-col items-center gap-4 overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#2C2F38_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-slate-500">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-foreground font-bold text-sm">
                    {searchQuery ? 'No matching sessions found' : 'No registered sessions'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-[340px] mx-auto leading-relaxed">
                    {searchQuery 
                      ? 'Try refining your search keyword or tag to find your session.' 
                      : 'You haven\'t reserved a spot in any upcoming live rooms yet. View our catalog of expert sessions.'
                    }
                  </p>
                </div>
                {!searchQuery && (
                  <Link
                    to="/sessions"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-primary text-primary-foreground rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.12)]"
                  >
                    Browse Catalog <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  variants={fadeIn}
                  custom={index + 2}
                  className="bg-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-md"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.01] rounded-full blur-2xl group-hover:bg-primary/[0.03] transition-all" />
                  
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {session.tag || 'LIVE SESSION'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">{session.duration || '90 mins'}</span>
                    </div>

                    <h3 className="font-extrabold text-foreground text-base leading-snug group-hover:text-primary transition-colors mb-2">
                      {session.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {session.description || 'Join live to collaborate with other project managers and master AI application in real workflows.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/40 mt-2 flex flex-col sm:flex-row items-center gap-3">
                    <div className="text-left w-full sm:w-auto flex-1">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Schedule</p>
                      <p className="text-xs font-semibold text-slate-300 mt-0.5">
                        {session.date} {session.time && `· ${session.time}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                      <Button asChild variant="outline" size="sm" className="border-border text-slate-400 hover:text-foreground hover:bg-card cursor-pointer text-xs h-9 rounded-xl flex-1 sm:flex-none">
                        <Link to={`/sessions/${session.id}`}>
                          Details
                        </Link>
                      </Button>
                      <JoinCallButton 
                        sessionId={session.id} 
                        size="sm"
                        className="bg-primary text-primary-foreground hover:brightness-110 cursor-pointer text-xs font-bold h-9 rounded-xl flex-1 sm:flex-none"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
