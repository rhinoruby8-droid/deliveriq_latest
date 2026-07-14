import { useEffect, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../layouts/Dashboard';
import { fetchMe, fetchDashboardData, removeUserToken, type Delegate } from '../lib/user-auth';
import { Button } from '../components/ui/button';
import { PlayCircle, Clock, Calendar, Star, Crown, LogOut, Video, HelpCircle, Settings } from 'lucide-react';

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
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-emerald-400 font-medium">Loading Dashboard...</div>
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
          { title: "Dashboard", href: "/dashboard", icon: PlayCircle, active: true },
          { title: "My Sessions", href: "/dashboard/sessions", icon: Calendar },
          { title: "Watch Replays", href: "/replays", icon: Video }
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

  return (
    <DashboardLayout config={config}>
      <Helmet>
        <title>Dashboard | DeliverIQ</title>
      </Helmet>

      <div className="space-y-8">
        
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-neutral-400">Here's an overview of your learning progress and upcoming sessions.</p>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400 font-medium">Live Minutes</p>
                <p className="text-2xl font-bold text-white">{metrics.minutes_attended}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Video className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400 font-medium">Replay Hours</p>
                <p className="text-2xl font-bold text-white">{Number(metrics.hours_watched).toFixed(1)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400 font-medium">Registered</p>
                <p className="text-2xl font-bold text-white">{registeredSessions.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Registered Sessions */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Your Upcoming Sessions</h2>
                <Link to="/sessions" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Browse All</Link>
              </div>
              
              <div className="space-y-4">
                {registeredSessions.length === 0 ? (
                  <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-8 text-center">
                    <p className="text-neutral-400 mb-4">You haven't registered for any upcoming sessions yet.</p>
                    <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                      <Link to="/sessions">Find a Session</Link>
                    </Button>
                  </div>
                ) : (
                  registeredSessions.map(session => (
                    <div key={session.id} className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 mb-2">
                          {session.tag}
                        </div>
                        <h3 className="font-medium text-white text-lg">{session.title}</h3>
                        <p className="text-sm text-neutral-400 mt-1">
                          {session.date} • {session.time} ({session.duration})
                        </p>
                      </div>
                      <Button variant="outline" className="w-full sm:w-auto border-neutral-600 text-neutral-200 hover:bg-neutral-700">
                        Join Call
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Upcoming Opportunities */}
            {upcomingOpportunities.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Recommended for You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingOpportunities.slice(0, 4).map(session => (
                    <div key={session.id} className="bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
                      <h3 className="font-medium text-white mb-1 line-clamp-2">{session.title}</h3>
                      <p className="text-xs text-neutral-400 mb-4">{session.tag} • {session.date}</p>
                      <Button asChild size="sm" variant="secondary" className="w-full bg-neutral-700 hover:bg-neutral-600 text-white">
                        <Link to={`/sessions/${session.id}`}>View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Upsell Area */}
          <div className="space-y-6">
            
            {/* Premium Upsell Card */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown className="w-24 h-24 text-amber-500" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 mb-3">
                  <Star className="w-3.5 h-3.5" /> PRO
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Upgrade to Pro</h3>
                <p className="text-sm text-neutral-300 mb-6">
                  Get unlimited access to all session replays, exclusive templates, and community Discord access.
                </p>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold">
                  View Plans
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/replays" className="text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><Video className="w-4 h-4"/> Video Library</Link></li>
                <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><HelpCircle className="w-4 h-4"/> Help Center</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><Settings className="w-4 h-4"/> Account Settings</a></li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
