import { Helmet } from '@dr.pogodin/react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { Calendar, Clock, ArrowRight, ArrowLeft, Users, Globe, CheckCircle, PlayCircle, Tag } from 'lucide-react';
import { notifySubmission } from '@/lib/notify';
import { VideoPlayer } from '@/components/VideoPlayer';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: 'easeOut' as const }
  })
};

function isPast(dateStr: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return d < today;
}

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const session = cms.sessions.find(s => s.id === id);

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6">
        <p className="text-4xl font-black text-[#2C2F38]">404</p>
        <h1 className="text-2xl font-bold text-[#F0EDE8]">Session not found</h1>
        <p className="text-sm text-[#8A8D96]">This session may have been removed or the link is incorrect.</p>
        <Link to="/sessions" className="inline-flex items-center gap-2 text-sm font-semibold text-[#C79A4E] hover:underline">
          <ArrowLeft size={14} /> Back to Sessions
        </Link>
      </main>
    );
  }

  const past = isPast(session.date);
  const speakers = (cms.speakers || []).filter(sp => (session.speakerIds || []).includes(sp.id));
  const sponsors = (cms.sponsors || []).filter(sp => (session.sponsorIds || []).includes(sp.id));

  const site = 'https://deliveriq.live';
  const title = `${session.title} — DeliverIQ`;
  const description = session.description;
  const pageUrl = `${site}/sessions/${session.id}`;

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: session.title,
    description: session.description,
    url: pageUrl,
    startDate: session.date || undefined,
    eventStatus: past
      ? 'https://schema.org/EventMovedOnline'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    organizer: {
      '@type': 'Organization',
      name: 'DeliverIQ',
      url: site,
    },
    performer: speakers.map(sp => ({
      '@type': 'Person',
      name: sp.name,
      jobTitle: sp.role,
      worksFor: { '@type': 'Organization', name: sp.organisation },
    })),
    about: session.tag,
    ...(session.videoUrl ? { recordedIn: { '@type': 'VideoObject', url: session.videoUrl } } : {}),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    await notifySubmission({ source: `register:${session.title}`, name, email });
  };

  const statusBadgeHtml = `
    ${past ? '<span class="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider bg-[#2C2F38]/60 border border-[#2C2F38] px-3 py-1 rounded-full">Past Session</span>' : '<span class="text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-3 py-1 rounded-full animate-pulse">Upcoming</span>'}
    ${session.status === 'draft' ? '<span class="text-[10px] font-bold text-yellow-400 uppercase tracking-wider bg-yellow-950/30 border border-yellow-900/30 px-3 py-1 rounded-full">Draft</span>' : ''}
  `;

  let htmlContent = cms.sessionDetailPageHtml || '';
  htmlContent = htmlContent
    .replace(/\{\{session.title\}\}/g, session.title)
    .replace(/\{\{session.tag\}\}/g, session.tag)
    .replace(/\{\{session.date\}\}/g, session.date || 'Date TBC')
    .replace(/\{\{session.time\}\}/g, session.time || 'Time TBC')
    .replace(/\{\{session.duration\}\}/g, session.duration || '')
    .replace(/\{\{session.description\}\}/g, session.description)
    .replace(/\{\{session.statusBadge\}\}/g, statusBadgeHtml);

  const widgets = {
    SessionSpeakers: speakers.length > 0 ? (
      <motion.div variants={fadeUp} custom={0.2} className="mb-10">
        <h2 className="text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4 flex items-center gap-2">
          <Users size={12} /> Presenters
        </h2>
        <div className="flex flex-col gap-4">
          {speakers.map(sp => (
            <div key={sp.id} className="flex items-start gap-4 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm p-4">
              <img
                src={sp.avatarUrl}
                alt={sp.name}
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64'; }}
                className="w-12 h-12 rounded-full object-cover border border-[#2C2F38] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#F0EDE8] text-sm">{sp.name}</p>
                <p className="text-xs text-[#C79A4E] font-medium mb-1">{sp.role} · {sp.organisation}</p>
                {sp.bio && <p className="text-xs text-[#8A8D96] leading-relaxed line-clamp-3">{sp.bio}</p>}
              </div>
              {sp.socialUrl && (
                <a href={sp.socialUrl} target="_blank" rel="noreferrer" className="text-[#8A8D96] hover:text-[#C79A4E] transition-colors shrink-0">
                  <Globe size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    ) : null,
    SessionSponsors: sponsors.length > 0 ? (
      <motion.div variants={fadeUp} custom={0.25} className="mb-10">
        <h2 className="text-[11px] font-bold text-[#8A8D96] uppercase tracking-widest mb-4">Session Sponsors</h2>
        <div className="flex flex-wrap gap-3">
          {sponsors.map(sp => (
            <a
              key={sp.id}
              href={sp.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm px-4 py-3 hover:border-[#C79A4E]/30 transition-colors"
              title={sp.name}
            >
              <img
                src={sp.logoUrl}
                alt={sp.name}
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=48&h=48'; }}
                className="h-6 max-w-[80px] object-contain filter brightness-90"
              />
              <span className="text-xs font-semibold text-[#8A8D96]">{sp.name}</span>
              {sp.tier && <span className="text-[10px] text-[#C79A4E] border border-[#C79A4E]/20 bg-[#C79A4E]/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{sp.tier}</span>}
            </a>
          ))}
        </div>
      </motion.div>
    ) : null,
    SessionRegistrationPanel: (
      <div className="border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2C2F38] flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-widest text-[#C79A4E] uppercase">
            {past ? 'Session Ended' : 'Register Interest'}
          </p>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
            past
              ? 'text-[#8A8D96] border-[#2C2F38] bg-[#2C2F38]/30'
              : 'text-green-400 border-green-900/40 bg-green-950/20'
          }`}>
            {past ? 'Completed' : 'Open'}
          </span>
        </div>

        <div className="px-6 py-4 border-b border-[#2C2F38]/60 bg-[#1A1D24]/60">
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#8A8D96]">
              <Calendar size={12} className="text-[#C79A4E] shrink-0" />
              <span>{session.date || 'Date TBC'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#8A8D96]">
              <Clock size={12} className="text-[#C79A4E] shrink-0" />
              <span>{session.time || 'Time TBC'} · {session.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-[#8A8D96]">
              <Tag size={12} className="text-[#C79A4E] shrink-0" />
              <span>{session.tag}</span>
            </div>
          </div>
        </div>

        {past ? (
          <div className="flex flex-col gap-4">
            {session.videoUrl ? (
              <div className="p-4 border-b border-[#2C2F38]/60">
                <VideoPlayer url={session.videoUrl} title={session.title} />
              </div>
            ) : null}
            <div className="px-6 py-6 flex flex-col items-center text-center gap-3">
              <PlayCircle size={36} className="text-[#8A8D96]" />
              <p className="text-sm font-semibold text-[#F0EDE8]">This session has ended</p>
              {session.videoUrl ? (
                <Link
                  to="/replays"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C79A4E]/10 border border-[#C79A4E]/30 text-[#C79A4E] hover:bg-[#C79A4E]/20 text-sm font-semibold rounded-sm transition-all"
                >
                  <PlayCircle size={14} /> Watch on Replays
                </Link>
              ) : (
                <p className="text-xs text-[#8A8D96] italic">Replay not yet available.</p>
              )}
            </div>
          </div>
        ) : submitted ? (
          <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
            <CheckCircle size={36} className="text-[#C79A4E]" />
            <p className="text-base font-bold text-[#F0EDE8]">You're on the list!</p>
            <p className="text-xs text-[#8A8D96] leading-relaxed max-w-xs">
              We'll notify you as soon as registration opens for this session.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
            <p className="text-xs text-[#8A8D96] leading-relaxed">
              Register your interest and we'll notify you when registration opens for this session.
            </p>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">Full name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-4 py-2.5 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">Work email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-4 py-2.5 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all"
            >
              Register My Interest <ArrowRight size={14} />
            </button>
            <p className="text-[10px] text-[#4A4D56] text-center">No spam — session updates only.</p>
          </form>
        )}
      </div>
    )
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
        {cms.sessionDetailPageCss ? <style>{cms.sessionDetailPageCss}</style> : null}
      </Helmet>
      <main>
        <PageHtmlRenderer html={htmlContent} widgets={widgets} />
      </main>
    </>
  );
}
