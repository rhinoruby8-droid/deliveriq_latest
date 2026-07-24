import { Helmet } from '@dr.pogodin/react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useCmsContent, FALLBACK_CMS_CONTENT, type Speaker } from '@/lib/cms-client';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Play, Clock, ArrowRight, X } from 'lucide-react';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { trackWatchTime, getUserToken } from '@/lib/user-auth';
import { trackEvent } from '@/lib/analytics';
import AuthDialog from '@/components/AuthDialog';
import SpeakerDialog from '@/components/SpeakerDialog';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const tags = ['All', 'Project Controls', 'Project Management', 'Delivery Leadership'];

export interface PlayingSession {
  id: string;
  title: string;
  url: string;
}

function ReplaysArchiveWidget({ onWatchReplay, onSpeakerClick }: {
  onWatchReplay: (sessionId: string) => void;
  onSpeakerClick: (speaker: Speaker) => void;
}) {
  const { data: cms } = useCmsContent();
  const [activeTag, setActiveTag] = useState('All');

  const allReplays = (cms?.sessions || []).filter(s => s.status === 'published' && s.videoUrl);
  const filteredReplays = activeTag === 'All' 
    ? allReplays 
    : allReplays.filter(s => s.tag === activeTag);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="diq-replays-archive">
      <motion.div variants={fadeUp} custom={0} className="flex flex-wrap gap-2 mb-12 diq-replays-filters">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-sm border transition-all duration-200 diq-replays-filter-btn ${
              activeTag === tag
                ? 'bg-primary text-[#1A1D24] border-primary diq-replays-filter-btn-active'
                : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground diq-replays-filter-btn-inactive'
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {filteredReplays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 diq-replays-grid">
          {filteredReplays.map((session) => {
            const sessionSpeakers = (cms?.speakers || []).filter(s => (session.speakerIds || []).includes(s.id));
            return (
              <motion.div
                key={session.id}
                variants={fadeUp}
                className="border border-border bg-card/40 rounded-sm overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-300 group diq-replay-card"
              >
                <div
                  onClick={() => {
                    trackEvent('video', { action: 'play_recording', title: session.title });
                    onWatchReplay(session.id);
                  }}
                  className="aspect-video bg-background relative cursor-pointer overflow-hidden border-b border-border diq-replay-thumb"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1D24] to-[#C79A4E]/5 flex items-center justify-center diq-replay-thumb-bg">
                    <span className="text-[10px] font-mono text-[#4A4D56] tracking-wider uppercase select-none diq-replay-thumb-tag">{session.tag}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300 diq-replay-thumb-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center diq-replay-play-btn-container">
                    <div className="w-12 h-12 rounded-full bg-background/90 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[#1A1D24] transition-all duration-300 scale-95 group-hover:scale-105 shadow-xl diq-replay-play-btn">
                      <Play size={16} fill="currentColor" className="ml-0.5 diq-replay-play-icon" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between diq-replay-card-body">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 diq-replay-card-meta">
                      <span className="text-[9px] font-bold text-primary uppercase tracking-wider bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-sm diq-replay-card-tag">
                        {session.tag}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 diq-replay-card-duration">
                        <Clock size={11} className="diq-replay-card-duration-icon" /> {session.duration}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground mb-2 leading-snug group-hover:text-primary transition-colors diq-replay-card-title">
                      {session.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 diq-replay-card-desc">
                      {session.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center gap-2 diq-replay-card-footer">
                    <div className="flex -space-x-1.5 overflow-hidden shrink-0 diq-replay-card-avatars">
                      {sessionSpeakers.map(sp => (
                        <button
                          key={sp.id}
                          onClick={(e) => { e.stopPropagation(); onSpeakerClick(sp); }}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-card object-cover bg-background hover:scale-110 transition-transform cursor-pointer diq-replay-card-avatar-btn overflow-hidden"
                          title={sp.name}
                        >
                          <img
                            src={sp.avatarUrl}
                            alt={sp.name}
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=32&h=32'; }}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-medium truncate diq-replay-card-speakers flex flex-wrap gap-1 items-center">
                      {sessionSpeakers.map((sp, idx) => (
                        <span key={sp.id}>
                          <button
                            onClick={(e) => { e.stopPropagation(); onSpeakerClick(sp); }}
                            className="hover:text-primary transition-colors cursor-pointer"
                          >
                            {sp.name}
                          </button>
                          {idx < sessionSpeakers.length - 1 && ', '}
                        </span>
                      ))}
                      {sessionSpeakers.length === 0 && 'TBA'}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          variants={fadeUp}
          custom={0.1}
          className="flex flex-col items-center justify-center py-24 border border-dashed border-border rounded-sm text-center diq-replays-empty"
        >
          <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-6 diq-replays-empty-icon-wrap">
            <img
              src="/airo-assets/images/logo/icon-dark"
              alt="DeliverIQ"
              className="w-8 h-8 object-contain diq-replays-empty-logo"
            />
          </div>
          <p className="text-lg font-semibold text-foreground mb-2 diq-replays-empty-title">
            Replays coming soon.
          </p>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed diq-replays-empty-desc">
            The first live sessions are on their way. Once they've aired, replays will appear
            here — filterable by topic and available on demand.
          </p>
          <Link
            to="/sessions"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary/40 px-5 py-2.5 rounded-sm hover:bg-primary/10 transition-colors diq-replays-empty-link"
          >
            See upcoming sessions <ArrowRight size={14} className="diq-replays-empty-link-icon" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/');
    const id = parts[1]?.split(/[?&]/)[0];
    if (id && id.length === 11) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
  }
  return null;
}

export default function ReplaysPage() {
  const navigate = useNavigate();
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const [playingSession, setPlayingSession] = useState<PlayingSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isSpeakerDialogOpen, setIsSpeakerDialogOpen] = useState(false);

  useEffect(() => {
    const token = getUserToken();
    setIsAuthenticated(!!token);
  }, []);

  const handleWatchReplay = (sessionId: string) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
    } else {
      navigate(`/dashboard/replays/${sessionId}`);
    }
  };

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsSpeakerDialogOpen(true);
  };

  // Watch time telemetry heartbeat
  useEffect(() => {
    if (!playingSession) return;
    
    const intervalId = setInterval(() => {
      trackWatchTime('recording', 1);
      trackEvent('video', { action: 'watch_minute', title: playingSession.title });
    }, 60000); // every minute

    return () => clearInterval(intervalId);
  }, [playingSession]);

  const htmlContent = cms.replaysPageHtml || FALLBACK_CMS_CONTENT.replaysPageHtml;

  const site = 'https://deliveriq.live';
  const title = 'Replays — DeliverIQ';
  const description = 'Access replays of past DeliverIQ sessions on AI for project management, project controls, and delivery professionals.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/replays#webpage`,
    name: title,
    url: `${site}/replays`,
    description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };

  const widgets = {
    ReplaysGrid: <ReplaysArchiveWidget onWatchReplay={handleWatchReplay} onSpeakerClick={handleSpeakerClick} />
  };

  const embedUrl = playingSession ? getYoutubeEmbedUrl(playingSession.url) : null;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/replays`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/replays`} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.replaysPageCss ? <style>{cms.replaysPageCss}</style> : null}
      </Helmet>

      <main>
        <PageHtmlRenderer html={htmlContent} widgets={widgets} />
      </main>

      <AnimatePresence>
        {playingSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-background/95 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={() => setPlayingSession(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-border"
            >
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={playingSession.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={playingSession.url}
                  autoPlay
                  controls
                  className="w-full h-full"
                />
              )}
              <button
                onClick={() => setPlayingSession(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black text-foreground hover:text-primary rounded flex items-center justify-center backdrop-blur transition-colors"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={() => {
          setShowAuthDialog(false);
          setIsAuthenticated(true);
          navigate('/dashboard');
        }}
      />

      <SpeakerDialog
        speaker={selectedSpeaker}
        isOpen={isSpeakerDialogOpen}
        onClose={() => setIsSpeakerDialogOpen(false)}
      />
    </>
  );
}
