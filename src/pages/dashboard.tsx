import { useEffect, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import DashboardLayout from '../layouts/Dashboard';
import { fetchMe, fetchDashboardData, removeUserToken, type Delegate } from '../lib/user-auth';
import { Button } from '../components/ui/button';
import CheckoutButton from '../components/CheckoutButton';
import JoinCallButton from '../components/JoinCallButton';
import {
  PlayCircle,
  Clock,
  Calendar,
  Crown,
  LogOut,
  Video,
  HelpCircle,
  Settings,
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  TrendingUp,
  ChevronRight,
  Bookmark
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.05 },
  }),
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Delegate | null>(null);
  const [metrics, setMetrics] = useState({ minutes_attended: 0, hours_watched: 0 });
  const [registeredSessions, setRegisteredSessions] = useState<any[]>([]);
  const [upcomingOpportunities, setUpcomingOpportunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const me = await fetchMe();
      setUser(me);
      const dashboardData = await fetchDashboardData();
      if (dashboardData) {
        setMetrics(dashboardData.metrics);
        setRegisteredSessions(dashboardData.registeredSessions || []);
        setUpcomingOpportunities(dashboardData.upcomingOpportunities || []);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-muted flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border-2 border-primary/10 rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[#C79A4E] rounded-full animate-spin" />
          </div>
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Loading workspace</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    removeUserToken();
    navigate('/');
  };

  const isPro = user?.subscription_tier === 'tier3' && user?.subscription_expires_at && new Date(user.subscription_expires_at as string).getTime() > Date.now();

  const config = {
    sidebar: {
      logo: { text: "DeliverIQ", href: "/" },
      navigation: {
        main: [
          { title: "Dashboard", href: "/dashboard", icon: PlayCircle, active: true },
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
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

  const firstName = user?.name?.split(' ')[0] || 'there';

  // Weekly goals config
  const liveGoal = 60; // 60 mins weekly target
  const liveProgress = Math.min(100, Math.round((metrics.minutes_attended / liveGoal) * 100));
  const replayGoal = 5; // 5 hours weekly target
  const replayProgress = Math.min(100, Math.round((metrics.hours_watched / replayGoal) * 100));

  return (
    <DashboardLayout config={config}>
      <Helmet>
        <title>Dashboard | DeliverIQ</title>
      </Helmet>

      <motion.div
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-[1140px] pb-10"
      >
        
        {/* ─── Premium Header ─── */}
        <motion.div variants={fadeIn} custom={0} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight leading-none">
                Welcome back, {firstName}
              </h1>
              {isPro ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C79A4E]/20 to-[#E5C185]/10 text-[10px] font-black text-[#E5C185] uppercase tracking-widest border border-primary/30 shadow-[0_0_15px_rgba(199,154,78,0.1)]">
                  <Crown className="w-3 h-3 text-primary" /> Pro Member
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-muted text-[9px] font-bold text-slate-400 uppercase tracking-wider border border-border/50">
                  Free Account
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Here is your active progress summary and learning schedule for this week.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-card border border-border/60 px-4 py-2 rounded-xl text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry online</span>
          </div>
        </motion.div>

        {/* ─── Premium Telemetry Grid ─── */}
        <motion.div variants={fadeIn} custom={1} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Live Minutes */}
          <div className="relative overflow-hidden bg-gradient-to-b from-card to-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg">
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.02] rounded-full blur-2xl group-hover:bg-emerald-500/[0.04] transition-all" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Weekly Target</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{metrics.minutes_attended}m</p>
                <p className="text-xs text-slate-500 mt-1">Live interactive room attendance</p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-slate-400">{liveProgress}% Completed</span>
                  <span className="text-slate-500">{liveGoal}m Goal</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                    style={{ width: `${liveProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Replay Hours */}
          <div className="relative overflow-hidden bg-gradient-to-b from-card to-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg">
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.02] rounded-full blur-2xl group-hover:bg-blue-500/[0.04] transition-all" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Weekly Target</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{Number(metrics.hours_watched).toFixed(1)}h</p>
                <p className="text-xs text-slate-500 mt-1">Recorded sessions watched</p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-slate-400">{replayProgress}% Completed</span>
                  <span className="text-slate-500">{replayGoal}h Goal</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500" 
                    style={{ width: `${replayProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Registered Events */}
          <div className="relative overflow-hidden bg-gradient-to-b from-card to-background border border-border/60 hover:border-primary/30 rounded-2xl p-6 transition-all duration-350 group shadow-lg">
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.02] rounded-full blur-2xl group-hover:bg-purple-500/[0.04] transition-all" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Scheduled</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{registeredSessions.length}</p>
                <p className="text-xs text-slate-500 mt-1">Sessions on your calendar</p>
              </div>

              <div className="pt-2">
                <Link to="/sessions" className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline group/btn">
                  Manage Schedule 
                  <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Content Split (5-column Grid) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left Content (3 Columns) ── */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Upcoming Agenda Section */}
            <motion.section variants={fadeIn} custom={2}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                  <Bookmark size={12} className="text-primary" />
                  Your Sessions
                </h2>
                <Link to="/sessions" className="text-[11px] text-primary hover:underline font-bold uppercase tracking-wider">
                  Browse All
                </Link>
              </div>

              {registeredSessions.length === 0 ? (
                <div className="relative bg-background border border-dashed border-border rounded-2xl p-10 text-center flex flex-col items-center gap-4 overflow-hidden group">
                  {/* Subtle vector mesh styling */}
                  <div className="absolute inset-0 bg-[radial-gradient(#2C2F38_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-slate-500">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Agenda empty</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed">
                        Reserve your spot in upcoming live rooms to collaborate and build your skills.
                      </p>
                    </div>
                    <Link
                      to="/sessions"
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold bg-primary text-[#0A0B0E] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.12)]"
                    >
                      Find a Live Session <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {registeredSessions.map(session => (
                    <div
                      key={session.id}
                      className="bg-background border border-border/60 hover:border-primary/30 rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-200 group"
                    >
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">{session.tag}</span>
                        <h3 className="font-bold text-white text-sm mt-2 group-hover:text-primary transition-colors truncate">{session.title}</h3>
                        <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                          <Calendar size={10} className="text-slate-600" />
                          {session.date} · {session.time}
                        </p>
                      </div>
                      <JoinCallButton 
                        sessionId={session.id} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* Recommended Opportunities */}
            {upcomingOpportunities.length > 0 && (
              <motion.section variants={fadeIn} custom={3} className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" />
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">Recommended For You</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingOpportunities.slice(0, 4).map(session => (
                    <Link
                      key={session.id}
                      to={`/sessions/${session.id}`}
                      className="relative bg-background border border-border/60 hover:border-primary/30 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                    >
                      {/* Interactive glow border trigger */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C79A4E]/[0.01] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <div>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">{session.tag}</span>
                        <h3 className="font-extrabold text-white text-sm mt-3 mb-1.5 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{session.title}</h3>
                        <p className="text-[11px] text-slate-500">{session.date}</p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mt-5 group-hover:text-white transition-colors">
                        <span>View Details</span>
                        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}

          </div>

          {/* ── Right Content Sidebar (2 Columns) ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Premium Upgrade Segment */}
            <motion.div variants={fadeIn} custom={2}>
              {!isPro ? (
                <div className="relative bg-gradient-to-b from-card to-background border border-primary/20 rounded-2xl p-6 overflow-hidden shadow-lg">
                  {/* Subtle structural ring elements */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/[0.05] rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-[9px] font-bold text-primary uppercase tracking-widest mb-4 border border-primary/20">
                      <Sparkles className="w-3.5 h-3.5" /> Premium Pass
                    </div>
                    <h3 className="text-lg font-extrabold text-white mb-2 tracking-tight">Unlock Platform Access</h3>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                      Upgrade to Pro for unlimited interactive session replays, direct instructor templates, and community Discord benefits.
                    </p>
                    <CheckoutButton
                      sessionTitle="DeliverIQ Pro Yearly Subscription"
                      amount={199.00}
                      tier="tier3"
                      label="Upgrade to Pro"
                      className="w-full font-bold text-xs h-10 rounded-xl bg-primary text-[#0A0B0E] hover:brightness-115 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.15)]"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative bg-gradient-to-b from-card to-background border border-primary/20 rounded-2xl p-6 overflow-hidden shadow-lg">
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/[0.05] rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-[9px] font-bold text-primary uppercase tracking-widest mb-4 border border-primary/20">
                      <Crown className="w-3.5 h-3.5" /> PRO MEMBER
                    </div>
                    <h3 className="text-lg font-extrabold text-white mb-2 tracking-tight">Welcome, Pro!</h3>
                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                      You have full access to our complete live archive and templates library.
                    </p>
                    
                    <div className="space-y-2 pt-4 border-t border-border/40">
                      <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-card/40 hover:bg-card/80 border border-border/40 hover:border-primary/30 transition-all text-xs text-slate-300 font-medium group">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="flex-1">Pro templates library</span>
                        <ArrowRight size={12} className="text-slate-500 group-hover:text-primary transition-colors" />
                      </a>
                      <a href="https://discord.gg/deliveriq" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-card/40 hover:bg-card/80 border border-border/40 hover:border-primary/30 transition-all text-xs text-slate-300 font-medium group">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="flex-1">Discord private channel</span>
                        <ArrowRight size={12} className="text-slate-500 group-hover:text-primary transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quick Resources links */}
            <motion.div variants={fadeIn} custom={3} className="bg-background border border-border/60 rounded-2xl p-6 shadow-md">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Links</h3>
              <div className="space-y-1">
                {[
                  { icon: Video, label: 'Recorded Library', to: '/replays', isLink: true },
                  { icon: HelpCircle, label: 'Platform Help Center', to: '#', isLink: false },
                  { icon: Settings, label: 'Account Preferences', to: '#', isLink: false },
                ].map((item, i) => {
                  const Icon = item.icon;
                  const cls = "flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-all text-xs text-slate-400 hover:text-white font-semibold group w-full";
                  const inner = (
                    <>
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight size={13} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
                    </>
                  );
                  return item.isLink ? (
                    <Link key={i} to={item.to} className={cls}>{inner}</Link>
                  ) : (
                    <a key={i} href={item.to} className={cls}>{inner}</a>
                  );
                })}
              </div>
            </motion.div>

          </div>

        </div>

      </motion.div>
    </DashboardLayout>
  );
}
