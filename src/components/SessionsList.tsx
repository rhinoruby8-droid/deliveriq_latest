import { Calendar, Clock, ArrowRight, PlayCircle, ChevronDown, X, Tag, Users, Globe, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import type { Session, Speaker, Sponsor } from '@/lib/cms-client';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { getUserToken, useUserProfile } from '@/lib/user-auth';
import AuthDialog from './AuthDialog';
import SpeakerDialog from './SpeakerDialog';


/** Returns true if the session's date is strictly before today */
function isSessionPast(dateStr: string): boolean {
  if (!dateStr) return false;
  const sessionDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  sessionDate.setHours(0, 0, 0, 0);
  return sessionDate < today;
}

// ── Session Detail Modal (ARIA-compliant) ─────────────────────────────────
function SessionModal({ session, speakers, sponsors, isPast, currency, onClose, onWatchReplay, onSpeakerClick, hasAccess }: {
  session: Session; speakers: Speaker[]; sponsors: Sponsor[]; isPast: boolean; currency: string; onClose: () => void;
  onWatchReplay: (sessionId: string) => void; onSpeakerClick: (speaker: Speaker) => void;
  hasAccess: boolean;
}) {
  const navigate = useNavigate();
  const titleId = `session-modal-title-${session.id}`;
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape key handler
  useEffect(() => {
    firstFocusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close"
          ref={firstFocusRef}
        >
          <X size={16} />
        </button>

        <div className="p-6">
          {/* Tag + status */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 px-2.5 py-0.5 rounded-full">
              <Tag size={9} /> {session.tag}
            </span>
            {isPast ? (
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/60 border border-border px-2.5 py-0.5 rounded-full">Past Session</span>
            ) : (
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-2.5 py-0.5 rounded-full">Upcoming</span>
            )}
          </div>

          {/* Title */}
          <h2 id={titleId} className="text-2xl font-bold text-foreground leading-tight mb-4">{session.title}</h2>

          {/* Schedule */}
          <div className="flex flex-wrap gap-5 mb-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={13} className="text-primary shrink-0" />
              <span className="font-semibold">{session.date || 'Date TBC'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={13} className="text-primary shrink-0" />
              <span className="font-semibold">{session.time || 'Time TBC'} · {session.duration}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{session.description}</p>

          {/* Speakers */}
          {speakers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Users size={11} /> Presenters
              </h3>
              <div className="flex flex-col gap-3">
                {speakers.map(sp => (
                  <button
                    key={sp.id}
                    onClick={(e) => { e.stopPropagation(); onSpeakerClick(sp); }}
                    className="flex items-start gap-3 bg-background border border-border hover:border-primary/30 rounded-sm p-3 text-left w-full cursor-pointer transition-colors"
                  >
                    {sp.avatarUrl ? (
                      <img
                        src={sp.avatarUrl}
                        alt={sp.name}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64'; }}
                        className="w-8 h-8 rounded-full border-2 border-background bg-card object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                        <User size={16} className="text-secondary-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-xs">{sp.name}</p>
                      <p className="text-[10px] text-primary">{sp.role} · {sp.organisation}</p>
                      {sp.bio && <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">{sp.bio}</p>}
                    </div>
                    {sp.socialUrl && (
                      <a href={sp.socialUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors shrink-0">
                        <Globe size={12} />
                      </a>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sponsors */}
          {sponsors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Sponsors</h3>
              <div className="flex flex-wrap gap-2">
                {sponsors.map(sp => (
                  <a
                    key={sp.id}
                    href={sp.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-background border border-border px-3 py-2 rounded hover:border-primary/30 transition-colors"
                    title={sp.name}
                  >
                    <img
                      src={sp.logoUrl}
                      alt={sp.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=48&h=48'; }}
                      className="h-5 max-w-[60px] object-contain filter brightness-90"
                    />
                    <span className="text-[10px] font-semibold text-muted-foreground">{sp.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Block */}
          {(() => {
            const currentPrice = isPast ? (session.replayPrice ?? session.price) : session.price;
            const isFree = session.isFree || currentPrice === 0;
            if (!isFree && (currentPrice === undefined || currentPrice === null)) return null;

            return (
              <div className="flex items-center justify-between rounded-sm bg-muted/30 border border-border px-4 py-3 mb-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {isPast ? 'On-Demand Replay Price' : 'Registration Price'}
                  </span>
                  {isFree ? (
                    <span className="text-base font-bold text-green-400">Free · Included</span>
                  ) : (
                    <span className="text-base font-bold text-foreground">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(currentPrice!)}
                    </span>
                  )}
                </div>
                {!isFree && (
                  <span className="text-[10px] text-muted-foreground italic">
                    {isPast ? 'Gated Replay Content' : 'All taxes included'}
                  </span>
                )}
              </div>
            );
          })()}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            {isPast ? (
              <button
                onClick={() => { onClose(); onWatchReplay(session.id); }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-muted border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-sm font-semibold rounded-sm transition-all cursor-pointer"
              >
                <PlayCircle size={14} /> View Replay
              </button>
            ) : (
              hasAccess ? (
                <button
                  onClick={() => { onClose(); navigate(`/dashboard`); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-muted border border-border text-foreground hover:bg-muted/80 text-sm font-bold rounded-sm transition-all"
                >
                  Go to Dashboard <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => { onClose(); navigate(`/register?session=${session.id}`); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground hover:brightness-110 text-sm font-bold rounded-sm transition-all"
                >
                  {session.isFree ? 'Register for Free' : 'Register & Pay'} <ArrowRight size={14} />
                </button>
              )
            )}
            <button
              onClick={() => { onClose(); navigate(`/sessions/${session.id}`); }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground text-sm font-semibold rounded-sm transition-all"
            >
              Full Session Details <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Session Card ───────────────────────────────────────────────────────────
function SessionCard({ session, speakers, sponsors, isPast, currency, onTitleClick, onWatchReplay, onSpeakerClick, hasAccess }: {
  session: Session; speakers: Speaker[]; sponsors: Sponsor[]; isPast: boolean; currency: string; onTitleClick: () => void;
  onWatchReplay: (sessionId: string) => void; onSpeakerClick: (speaker: Speaker) => void;
  hasAccess: boolean;
}) {
  return (
    <div className={`group border rounded-sm p-6 transition-all duration-200 flex flex-col diq-session-card ${
      isPast
        ? 'border-border/60 bg-background/60 opacity-80 hover:opacity-100 hover:border-border'
        : 'border-border bg-card/40 hover:border-primary/30'
    }`}>
      {/* Header: tag, duration, date */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-border/40 pb-4 diq-card-header">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-sm border diq-card-tag ${
            isPast ? 'text-muted-foreground bg-muted/20 border-border/40' : 'text-primary bg-primary/5 border-primary/20'
          }`}>
            {session.tag}
          </span>

          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 diq-card-duration">
            <Clock size={12} className={isPast ? 'text-muted-foreground' : 'text-primary'} />
            {session.duration}
          </span>
        </div>
        <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 diq-card-date-time">
          <Calendar size={13} className={isPast ? 'text-muted-foreground' : 'text-primary'} />
          {session.date} @ {session.time}
        </div>
      </div>

      {/* Body: Title (clickable) and Description */}
      <div className="mb-6 flex-1 diq-card-body">
        <button
          onClick={onTitleClick}
          className={`text-left text-xl font-bold leading-tight mb-3 transition-colors underline-offset-4 hover:underline cursor-pointer diq-card-title ${
            isPast ? 'text-muted-foreground hover:text-foreground' : 'text-foreground hover:text-primary'
          }`}
        >
          {session.title}
        </button>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-5 diq-card-description">{session.description}</p>
      </div>

      {/* Footer: Speakers, Sponsors, Action */}
      <div className="flex flex-col gap-4 pt-4 border-t border-border/40 mt-auto diq-card-footer">
        {/* Row 1: Metadata (Speakers & Sponsors) */}
        <div className="flex flex-wrap items-center justify-between gap-4 diq-card-metadata-row">
          {/* Speakers */}
          <div className="flex flex-wrap gap-2 items-center diq-card-presenters-col">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider diq-card-presenters-label">Presenters:</span>
            <div className="flex flex-wrap gap-1.5 diq-card-presenters-list">
              {speakers.map(sp => (
                <button
                  key={sp.id}
                  onClick={(e) => { e.stopPropagation(); onSpeakerClick(sp); }}
                  className="flex items-center gap-1.5 bg-background border border-border hover:border-primary/30 pl-1 pr-2 py-0.5 rounded-full text-[10px] diq-card-presenter-badge cursor-pointer transition-colors"
                >
                  {sp.avatarUrl ? (
                    <img
                      src={sp.avatarUrl} alt={sp.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=32&h=32'; }}
                      className="w-4 h-4 rounded-full object-cover bg-card border border-border diq-card-presenter-avatar"
                    />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center border border-border">
                       <User size={10} className="text-secondary-foreground" />
                    </div>
                  )}
                  <span className="font-semibold text-foreground diq-card-presenter-name">{sp.name}</span>
                </button>
              ))}
              {speakers.length === 0 && <span className="text-[10px] text-muted-foreground italic">TBA</span>}
            </div>
          </div>

          {/* Sponsors */}
          {sponsors.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center diq-card-sponsors-col">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider diq-card-sponsors-label">Sponsors:</span>
              {sponsors.map(sp => (
                <a key={sp.id} href={sp.websiteUrl} target="_blank" rel="noreferrer"
                  className="h-6 px-1.5 py-0.5 rounded bg-background border border-border flex items-center justify-center hover:border-primary/30 transition-colors diq-card-sponsor-link" title={sp.name}>
                  <img src={sp.logoUrl} alt={sp.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=48&h=48'; }}
                    className="max-h-full max-w-[50px] object-contain filter brightness-90 shrink-0 diq-card-sponsor-logo" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Row 2: Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border/20 diq-card-actions-row">
          <div className="font-bold text-foreground text-sm">
            {(() => {
              const currentPrice = isPast ? (session.replayPrice ?? session.price) : session.price;
              const isFree = session.isFree || currentPrice === 0;
              if (isFree) return 'FREE';
              return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(currentPrice || 0);
            })()}
          </div>
          <div className="flex items-center justify-end gap-2">
          <button
            onClick={onTitleClick}
            className="text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-border px-3.5 py-2 rounded-sm transition-all diq-card-details-btn"
          >
            Details
          </button>
          {isPast ? (
            <button
              onClick={() => onWatchReplay(session.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-replay-btn cursor-pointer"
            >
              <PlayCircle size={12} /> View Replay
            </button>
          ) : (
            hasAccess ? (
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted text-foreground hover:bg-muted/80 text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-register-btn"
              >
                Go to Dashboard <ArrowRight size={11} />
              </button>
            ) : (
              <Link
                to={`/register?session=${session.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 text-[11px] font-semibold rounded-sm transition-all whitespace-nowrap diq-card-register-btn"
              >
                {session.isFree ? 'Register for Free' : 'Register & Pay'} <ArrowRight size={11} />
              </Link>
            )
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────
export function SessionsList() {
  const navigate = useNavigate();
  const { data: cms } = useCmsContent();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showAllPast, setShowAllPast] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isSpeakerDialogOpen, setIsSpeakerDialogOpen] = useState(false);
  const { data: userProfile } = useUserProfile();

  const checkAccess = (sessionId: string) => {
    if (!userProfile) return false;
    const now = new Date();
    if (userProfile.subscription_tier === 'tier3' && userProfile.subscription_expires_at) {
      if (new Date(userProfile.subscription_expires_at) > now) return true;
    }
    const access = userProfile.session_access?.[sessionId];
    if (access && access.tier === 'tier2' && access.expires_at) {
      if (new Date(access.expires_at) > now) return true;
    }
    const registeredIds = userProfile.registered_session_ids || [];
    if (registeredIds.includes(sessionId)) return true;
    return false;
  };

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

  if (!cms) return null;

  // Merge fallback content with DB content so both sample sessions and custom admin sessions render together
  const allSessionsMap = new Map<string, Session>();
  (FALLBACK_CMS_CONTENT.sessions || []).forEach(s => allSessionsMap.set(s.id, s));
  (cms.sessions || []).forEach(s => allSessionsMap.set(s.id, s));

  const allSpeakersMap = new Map<string, Speaker>();
  (FALLBACK_CMS_CONTENT.speakers || []).forEach(sp => allSpeakersMap.set(sp.id, sp));
  (cms.speakers || []).forEach(sp => allSpeakersMap.set(sp.id, sp));

  const allSponsorsMap = new Map<string, Sponsor>();
  (FALLBACK_CMS_CONTENT.sponsors || []).forEach(sp => allSponsorsMap.set(sp.id, sp));
  (cms.sponsors || []).forEach(sp => allSponsorsMap.set(sp.id, sp));

  const rawSessions = Array.from(allSessionsMap.values());
  const published = rawSessions
    .filter(s => s.status === 'published' || !s.status)
    .slice()
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : Infinity;
      const dateB = b.date ? new Date(b.date).getTime() : Infinity;
      return dateA - dateB;
    });

  const upcomingSessions = published.filter(s => !isSessionPast(s.date));
  const pastSessions = [...published.filter(s => isSessionPast(s.date))].reverse();
  const visiblePast = showAllPast ? pastSessions : pastSessions.slice(0, 3);

  const allSpeakers = Array.from(allSpeakersMap.values());
  const allSponsors = Array.from(allSponsorsMap.values());

  const resolveSpeakers = (s: Session): Speaker[] =>
    allSpeakers.filter(sp => (s.speakerIds || []).includes(sp.id));
  const resolveSponsors = (s: Session): Sponsor[] =>
    allSponsors.filter(sp => (s.sponsorIds || []).includes(sp.id));

  const modalSession = activeModal ? published.find(s => s.id === activeModal) ?? null : null;

  return (
    <>
      {/* Detail Modal */}
      {modalSession && (
        <SessionModal
          session={modalSession}
          speakers={resolveSpeakers(modalSession)}
          sponsors={resolveSponsors(modalSession)}
          isPast={isSessionPast(modalSession.date)}
          currency={cms?.paymentConfig?.currency || 'USD'}
          onClose={() => setActiveModal(null)}
          onWatchReplay={handleWatchReplay}
          onSpeakerClick={handleSpeakerClick}
          hasAccess={checkAccess(modalSession.id)}
        />
      )}

      <div className="flex flex-col gap-12">
        {/* ── UPCOMING SESSIONS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6 upcoming-session">
            <span className="w-1.5 h-5 bg-primary rounded-full shrink-0 -ml-[18px]" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">Upcoming Sessions</h2>
            {upcomingSessions.length > 0 && (
              <span className="ml-auto text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                {upcomingSessions.length} scheduled
              </span>
            )}
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-sm text-center">
              <p className="text-sm font-semibold text-foreground mb-1">No sessions scheduled yet.</p>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">Check back soon — new live sessions are added regularly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid">
              {upcomingSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  speakers={resolveSpeakers(session)}
                  sponsors={resolveSponsors(session)}
                  isPast={false}
                  currency={cms?.paymentConfig?.currency || 'USD'}
                  onTitleClick={() => setActiveModal(session.id)}
                  onWatchReplay={handleWatchReplay}
                  onSpeakerClick={handleSpeakerClick}
                  hasAccess={checkAccess(session.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── PAST SESSIONS ── */}
        {pastSessions.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 upcoming-session">
              <span className="w-1.5 h-5 bg-muted rounded-full shrink-0 -ml-[18px]" />
              <h2 className="text-lg font-bold text-muted-foreground tracking-tight">Past Sessions</h2>
              <span className="ml-auto text-[10px] font-semibold text-muted-foreground bg-muted/40 border border-border px-2.5 py-1 rounded-full">
                {pastSessions.length} completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sessions-grid">
              {visiblePast.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  speakers={resolveSpeakers(session)}
                  sponsors={resolveSponsors(session)}
                  isPast={true}
                  currency={cms?.paymentConfig?.currency || 'USD'}
                  onTitleClick={() => setActiveModal(session.id)}
                  onWatchReplay={handleWatchReplay}
                  onSpeakerClick={handleSpeakerClick}
                  hasAccess={checkAccess(session.id)}
                />
              ))}
            </div>

            {pastSessions.length > 3 && (
              <button
                onClick={() => setShowAllPast(v => !v)}
                className="mt-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <ChevronDown size={14} className={`transition-transform duration-300 ${showAllPast ? 'rotate-180' : ''}`} />
                {showAllPast ? 'Show less' : `Show ${pastSessions.length - 3} more past sessions`}
              </button>
            )}
          </section>
        )}
      </div>

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
