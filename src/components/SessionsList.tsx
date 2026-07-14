import { Calendar, Clock, ArrowRight, PlayCircle, ChevronDown, X, Tag, Users, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import type { Session, Speaker, Sponsor } from '@/lib/cms-client';
import { useCmsContent } from '@/lib/cms-client';

// TODO [FUTURE ROADMAP]: Replace "Register Interest" with full multi-gateway payment flow.
// Gateways: Stripe, PayPal, Razorpay. Logged: 2026-07-13.
// TODO [PAYMENT GATEWAY]: Activate when pricing fields are added to Session in cms-client.ts

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
function SessionModal({ session, speakers, sponsors, isPast, onClose }: {
  session: Session; speakers: Speaker[]; sponsors: Sponsor[]; isPast: boolean; onClose: () => void;
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
      <div className="relative w-full max-w-2xl bg-[#21242C] border border-[#2C2F38] rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded text-[#8A8D96] hover:text-[#F0EDE8] hover:bg-[#2C2F38] transition-colors"
          aria-label="Close"
          ref={firstFocusRef}
        >
          <X size={16} />
        </button>

        <div className="p-6">
          {/* Tag + status */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#C79A4E] uppercase bg-[#C79A4E]/5 border border-[#C79A4E]/20 px-2.5 py-0.5 rounded-full">
              <Tag size={9} /> {session.tag}
            </span>
            {isPast ? (
              <span className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider bg-[#2C2F38]/60 border border-[#2C2F38] px-2.5 py-0.5 rounded-full">Past Session</span>
            ) : (
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-2.5 py-0.5 rounded-full">Upcoming</span>
            )}
          </div>

          {/* Title */}
          <h2 id={titleId} className="text-2xl font-bold text-[#F0EDE8] leading-tight mb-4">{session.title}</h2>

          {/* Schedule */}
          <div className="flex flex-wrap gap-5 mb-5">
            <div className="flex items-center gap-2 text-sm text-[#8A8D96]">
              <Calendar size={13} className="text-[#C79A4E] shrink-0" />
              <span className="font-semibold">{session.date || 'Date TBC'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8A8D96]">
              <Clock size={13} className="text-[#C79A4E] shrink-0" />
              <span className="font-semibold">{session.time || 'Time TBC'} · {session.duration}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#8A8D96] leading-relaxed mb-6">{session.description}</p>

          {/* Speakers */}
          {speakers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Users size={11} /> Presenters
              </h3>
              <div className="flex flex-col gap-3">
                {speakers.map(sp => (
                  <div key={sp.id} className="flex items-start gap-3 bg-[#1A1D24] border border-[#2C2F38] rounded-sm p-3">
                    <img
                      src={sp.avatarUrl}
                      alt={sp.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=48&h=48'; }}
                      className="w-9 h-9 rounded-full object-cover border border-[#2C2F38] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#F0EDE8] text-xs">{sp.name}</p>
                      <p className="text-[10px] text-[#C79A4E]">{sp.role} · {sp.organisation}</p>
                      {sp.bio && <p className="text-[10px] text-[#8A8D96] mt-1 leading-relaxed line-clamp-2">{sp.bio}</p>}
                    </div>
                    {sp.socialUrl && (
                      <a href={sp.socialUrl} target="_blank" rel="noreferrer" className="text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0">
                        <Globe size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sponsors */}
          {sponsors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-widest mb-3">Sponsors</h3>
              <div className="flex flex-wrap gap-2">
                {sponsors.map(sp => (
                  <a
                    key={sp.id}
                    href={sp.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-[#1A1D24] border border-[#2C2F38] px-3 py-2 rounded hover:border-[#C79A4E]/30 transition-colors"
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
                    <span className="text-[10px] font-semibold text-[#8A8D96]">{sp.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2C2F38]">
            {isPast ? (
              <Link
                to="/replays"
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2C2F38] border border-[#2C2F38] text-[#8A8D96] hover:bg-[#C79A4E]/10 hover:border-[#C79A4E]/30 hover:text-[#C79A4E] text-sm font-semibold rounded-sm transition-all"
              >
                <PlayCircle size={14} /> View Replay
              </Link>
            ) : (
              // TODO [PAYMENT GATEWAY]: Replace with paid registration flow when implemented.
              <button
                onClick={() => { onClose(); navigate(`/sessions/${session.id}`); }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C79A4E] text-[#1A1D24] hover:brightness-110 text-sm font-bold rounded-sm transition-all"
              >
                Register Interest <ArrowRight size={14} />
              </button>
            )}
            <button
              onClick={() => { onClose(); navigate(`/sessions/${session.id}`); }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2C2F38] text-[#8A8D96] hover:border-[#C79A4E]/30 hover:text-[#F0EDE8] text-sm font-semibold rounded-sm transition-all"
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
function SessionCard({ session, speakers, sponsors, isPast, onTitleClick }: {
  session: Session; speakers: Speaker[]; sponsors: Sponsor[]; isPast: boolean; onTitleClick: () => void;
}) {
  return (
    <div className={`group border rounded-sm p-6 transition-all duration-200 ${
      isPast
        ? 'border-[#2C2F38]/60 bg-[#1A1D24]/60 opacity-80 hover:opacity-100 hover:border-[#2C2F38]'
        : 'border-[#2C2F38] bg-[#21242C]/40 hover:border-[#C79A4E]/30'
    }`}>
      {/* Header: tag, duration, date */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-[#2C2F38]/40 pb-4">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-sm border ${
            isPast ? 'text-[#8A8D96] bg-[#2C2F38]/20 border-[#2C2F38]/40' : 'text-[#C79A4E] bg-[#C79A4E]/5 border-[#C79A4E]/20'
          }`}>
            {session.tag}
          </span>
          <span className="text-xs text-[#8A8D96] font-medium flex items-center gap-1">
            <Clock size={12} className={isPast ? 'text-[#8A8D96]' : 'text-[#C79A4E]'} />
            {session.duration}
          </span>
        </div>
        <div className="text-xs text-[#8A8D96] font-semibold flex items-center gap-1.5">
          <Calendar size={13} className={isPast ? 'text-[#8A8D96]' : 'text-[#C79A4E]'} />
          {session.date} @ {session.time}
        </div>
      </div>

      {/* Body: Title (clickable) and Description */}
      <div className="mb-6">
        <button
          onClick={onTitleClick}
          className={`text-left text-xl font-bold leading-tight mb-3 transition-colors underline-offset-4 hover:underline cursor-pointer ${
            isPast ? 'text-[#8A8D96] hover:text-[#F0EDE8]' : 'text-[#F0EDE8] hover:text-[#C79A4E]'
          }`}
        >
          {session.title}
        </button>
        <p className="text-sm text-[#8A8D96] leading-relaxed max-w-3xl line-clamp-2">{session.description}</p>
      </div>

      {/* Footer: Speakers, Sponsors, Action */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:justify-between pt-4 border-t border-[#2C2F38]/40">
        {/* Speakers */}
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">Presenters:</span>
          <div className="flex flex-wrap gap-3">
            {speakers.map(sp => (
              <div key={sp.id} className="flex items-center gap-2 bg-[#1A1D24] border border-[#2C2F38] pl-1.5 pr-3 py-1 rounded-full text-xs">
                <img
                  src={sp.avatarUrl} alt={sp.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=32&h=32'; }}
                  className="w-5 h-5 rounded-full object-cover bg-[#21242C] border border-[#2C2F38]"
                />
                <span className="font-semibold text-[#F0EDE8]">{sp.name}</span>
                <span className="text-[#8A8D96] text-[10px] truncate max-w-[100px]">({sp.role})</span>
              </div>
            ))}
            {speakers.length === 0 && <span className="text-xs text-[#8A8D96] italic">TBA</span>}
          </div>
        </div>

        {/* Sponsors */}
        {sponsors.length > 0 && (
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">Sponsors:</span>
            {sponsors.map(sp => (
              <a key={sp.id} href={sp.websiteUrl} target="_blank" rel="noreferrer"
                className="h-7 px-2 py-0.5 rounded bg-[#1A1D24] border border-[#2C2F38] flex items-center justify-center hover:border-[#C79A4E]/30 transition-colors" title={sp.name}>
                <img src={sp.logoUrl} alt={sp.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=48&h=48'; }}
                  className="max-h-full max-w-[60px] object-contain filter brightness-90 shrink-0" />
              </a>
            ))}
          </div>
        )}

        {/* Action button */}
        <div className="lg:ml-auto flex items-center gap-2 shrink-0">
          <button
            onClick={onTitleClick}
            className="text-xs font-semibold text-[#8A8D96] hover:text-[#F0EDE8] border border-[#2C2F38] hover:border-[#2C2F38] px-4 py-2.5 rounded-sm transition-all"
          >
            Details
          </button>
          {isPast ? (
            <Link
              to="/replays"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2F38] border border-[#2C2F38] text-[#8A8D96] hover:bg-[#C79A4E]/10 hover:border-[#C79A4E]/30 hover:text-[#C79A4E] text-xs font-semibold rounded-sm transition-all whitespace-nowrap"
            >
              <PlayCircle size={13} /> View Replay
            </Link>
          ) : (
            <Link
              to={`/sessions/${session.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C79A4E] text-[#1A1D24] hover:brightness-110 text-xs font-semibold rounded-sm transition-all whitespace-nowrap"
            >
              Register Interest <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────
export function SessionsList() {
  const { data: cms } = useCmsContent();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showAllPast, setShowAllPast] = useState(false);

  if (!cms) return null;

  const published = cms.sessions
    .filter(s => s.status === 'published')
    .slice()
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : Infinity;
      const dateB = b.date ? new Date(b.date).getTime() : Infinity;
      return dateA - dateB;
    });

  const upcomingSessions = published.filter(s => !isSessionPast(s.date));
  const pastSessions = [...published.filter(s => isSessionPast(s.date))].reverse();
  const visiblePast = showAllPast ? pastSessions : pastSessions.slice(0, 3);

  const resolveSpeakers = (s: typeof published[0]): Speaker[] =>
    (cms.speakers || []).filter(sp => (s.speakerIds || []).includes(sp.id));
  const resolveSponsors = (s: typeof published[0]): Sponsor[] =>
    (cms.sponsors || []).filter(sp => (s.sponsorIds || []).includes(sp.id));

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
          onClose={() => setActiveModal(null)}
        />
      )}

      <div className="flex flex-col gap-12">
        {/* ── UPCOMING SESSIONS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-5 bg-[#C79A4E] rounded-full shrink-0" />
            <h2 className="text-lg font-bold text-[#F0EDE8] tracking-tight">Upcoming Sessions</h2>
            {upcomingSessions.length > 0 && (
              <span className="ml-auto text-[10px] font-semibold text-[#C79A4E] bg-[#C79A4E]/10 border border-[#C79A4E]/20 px-2.5 py-1 rounded-full">
                {upcomingSessions.length} scheduled
              </span>
            )}
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#2C2F38] rounded-sm text-center">
              <p className="text-sm font-semibold text-[#F0EDE8] mb-1">No sessions scheduled yet.</p>
              <p className="text-xs text-[#8A8D96] max-w-xs leading-relaxed">Check back soon — new live sessions are added regularly.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {upcomingSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  speakers={resolveSpeakers(session)}
                  sponsors={resolveSponsors(session)}
                  isPast={false}
                  onTitleClick={() => setActiveModal(session.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── PAST SESSIONS ── */}
        {pastSessions.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-5 bg-[#2C2F38] rounded-full shrink-0" />
              <h2 className="text-lg font-bold text-[#8A8D96] tracking-tight">Past Sessions</h2>
              <span className="ml-auto text-[10px] font-semibold text-[#8A8D96] bg-[#2C2F38]/40 border border-[#2C2F38] px-2.5 py-1 rounded-full">
                {pastSessions.length} completed
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {visiblePast.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  speakers={resolveSpeakers(session)}
                  sponsors={resolveSponsors(session)}
                  isPast={true}
                  onTitleClick={() => setActiveModal(session.id)}
                />
              ))}
            </div>

            {pastSessions.length > 3 && (
              <button
                onClick={() => setShowAllPast(v => !v)}
                className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#8A8D96] hover:text-[#F0EDE8] transition-colors mx-auto"
              >
                <ChevronDown size={14} className={`transition-transform duration-300 ${showAllPast ? 'rotate-180' : ''}`} />
                {showAllPast ? 'Show less' : `Show ${pastSessions.length - 3} more past sessions`}
              </button>
            )}
          </section>
        )}
      </div>
    </>
  );
}
