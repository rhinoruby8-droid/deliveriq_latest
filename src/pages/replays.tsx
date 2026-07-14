import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Play, Clock, ArrowRight, X } from 'lucide-react';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';

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

function ReplaysArchiveWidget({ setPlayingVideoUrl }: { setPlayingVideoUrl: (url: string) => void }) {
  const { data: cms } = useCmsContent();
  const [activeTag, setActiveTag] = useState('All');

  const allReplays = (cms?.sessions || []).filter(s => s.status === 'published' && s.videoUrl);
  const filteredReplays = activeTag === 'All' 
    ? allReplays 
    : allReplays.filter(s => s.tag === activeTag);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <motion.div variants={fadeUp} custom={0} className="flex flex-wrap gap-2 mb-12">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-sm border transition-all duration-200 ${
              activeTag === tag
                ? 'bg-[#C79A4E] text-[#1A1D24] border-[#C79A4E]'
                : 'bg-transparent text-[#8A8D96] border-[#2C2F38] hover:border-[#C79A4E]/50 hover:text-[#F0EDE8]'
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {filteredReplays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReplays.map((session) => {
            const sessionSpeakers = (cms?.speakers || []).filter(s => (session.speakerIds || []).includes(s.id));
            return (
              <motion.div
                key={session.id}
                variants={fadeUp}
                className="border border-[#2C2F38] bg-[#21242C]/40 rounded-sm overflow-hidden flex flex-col hover:border-[#C79A4E]/30 transition-all duration-300 group"
              >
                <div
                  onClick={() => setPlayingVideoUrl(session.videoUrl || '')}
                  className="aspect-video bg-[#1A1D24] relative cursor-pointer overflow-hidden border-b border-[#2C2F38]"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1D24] to-[#C79A4E]/5 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-[#4A4D56] tracking-wider uppercase select-none">{session.tag}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#1A1D24]/90 border border-[#C79A4E]/30 flex items-center justify-center text-[#C79A4E] group-hover:bg-[#C79A4E] group-hover:text-[#1A1D24] transition-all duration-300 scale-95 group-hover:scale-105 shadow-xl">
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[9px] font-bold text-[#C79A4E] uppercase tracking-wider bg-[#C79A4E]/5 border border-[#C79A4E]/10 px-2 py-0.5 rounded-sm">
                        {session.tag}
                      </span>
                      <span className="text-[10px] text-[#8A8D96] flex items-center gap-1">
                        <Clock size={11} /> {session.duration}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#F0EDE8] mb-2 leading-snug group-hover:text-[#C79A4E] transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-xs text-[#8A8D96] leading-relaxed mb-4 line-clamp-2">
                      {session.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2C2F38]/40 flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden shrink-0">
                      {sessionSpeakers.map(sp => (
                        <img
                          key={sp.id}
                          src={sp.avatarUrl}
                          alt={sp.name}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=32&h=32'; }}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-[#21242C] object-cover bg-[#1A1D24]"
                          title={sp.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8A8D96] font-medium truncate">
                      {sessionSpeakers.map(s => s.name).join(', ') || 'TBA'}
                    </span>
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
          className="flex flex-col items-center justify-center py-24 border border-dashed border-[#2C2F38] rounded-sm text-center"
        >
          <div className="w-14 h-14 rounded-full border border-[#2C2F38] flex items-center justify-center mb-6">
            <img
              src="/airo-assets/images/logo/icon-dark"
              alt="DeliverIQ"
              className="w-8 h-8 object-contain"
            />
          </div>
          <p className="text-lg font-semibold text-[#F0EDE8] mb-2">
            Replays coming soon.
          </p>
          <p className="text-sm text-[#8A8D96] max-w-sm leading-relaxed">
            The first live sessions are on their way. Once they've aired, replays will appear
            here — filterable by topic and available on demand.
          </p>
          <Link
            to="/sessions"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#C79A4E] border border-[#C79A4E]/40 px-5 py-2.5 rounded-sm hover:bg-[#C79A4E]/10 transition-colors"
          >
            See upcoming sessions <ArrowRight size={14} />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ReplaysPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

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
    ReplaysGrid: <ReplaysArchiveWidget setPlayingVideoUrl={setPlayingVideoUrl} />
  };

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
        {playingVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-[#1A1D24]/95 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={() => setPlayingVideoUrl(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-[#2C2F38]"
            >
              <video
                src={playingVideoUrl}
                autoPlay
                controls
                className="w-full h-full"
              />
              <button
                onClick={() => setPlayingVideoUrl(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black text-[#F0EDE8] hover:text-[#C79A4E] rounded flex items-center justify-center backdrop-blur transition-colors"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
