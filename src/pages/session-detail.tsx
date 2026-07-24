import { Helmet } from '@dr.pogodin/react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { getUserToken } from '../lib/user-auth';
import { Calendar, Clock, ArrowRight, ArrowLeft, Users, Globe, CheckCircle, PlayCircle, Tag } from 'lucide-react';

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

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [gateway, setGateway] = useState('stripe');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');

  useEffect(() => {
    async function checkAuth() {
      const token = getUserToken();
      if (token) {
        try {
          const meRes = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (meRes.ok) {
            const me = await meRes.json();
            setName(me.name);
            setEmail(me.email);
            setIsLoggedIn(true);
          }
        } catch (err) {
          console.error('Failed to fetch auth/me', err);
        }
      }
    }
    checkAuth();
  }, []);

  const session = cms.sessions.find(s => s.id === id);

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6">
        <p className="text-4xl font-black text-[#2C2F38]">404</p>
        <h1 className="text-2xl font-bold text-foreground">Session not found</h1>
        <p className="text-sm text-muted-foreground">This session may have been removed or the link is incorrect.</p>
        <Link to="/sessions" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
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

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!couponCode.trim()) {
      setDiscountPercent(0);
      return;
    }
    const found = (cms.coupons || []).find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!found) {
      setCouponError('Invalid coupon code');
      setDiscountPercent(0);
      return;
    }

    if (found.active === false) {
      setCouponError('This coupon is inactive');
      setDiscountPercent(0);
      return;
    }
    if (found.sessionId && found.sessionId !== 'all' && found.sessionId !== session.id) {
      setCouponError('This coupon is not valid for this session');
      setDiscountPercent(0);
      return;
    }
    const now = new Date();
    if (found.startDate && new Date(found.startDate) > now) {
      setCouponError('This coupon promotion has not started yet');
      setDiscountPercent(0);
      return;
    }
    if (found.endDate && new Date(found.endDate) < now) {
      setCouponError('This coupon promotion has expired');
      setDiscountPercent(0);
      return;
    }
    if (found.maxUses !== undefined && found.maxUses !== null && (found.uses || 0) >= found.maxUses) {
      setCouponError('This coupon usage limit has been reached');
      setDiscountPercent(0);
      return;
    }

    setDiscountPercent(found.discountPercentage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate price locally for display/initial send
    const originalPrice = session.isFree ? 0 : (session.price || 0);
    const discountedPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));

    try {
      const res = await fetch('/api/user/register-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password: !getUserToken() ? password : undefined,
          sessionId: session.id,
          couponCode: couponCode.trim() || undefined,
          gateway: discountedPrice > 0 ? gateway : undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to register');
        return;
      }

      if (data.gateway === 'razorpay') {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          alert('Razorpay SDK failed to load. Please check your network connection.');
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
          amount: data.amount,
          currency: data.currency,
          name: 'DeliverIQ',
          description: data.sessionTitle,
          order_id: data.orderId,
          config_id: 'config_TEZskQzcdTwloM',
          handler: async function (response: any) {
            setSubmitted(true);
            setRegistrationMessage('Verifying payment details...');
            try {
              const verifyRes = await fetch('/api/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: data.userId,
                  tier: data.tier || 'tier2',
                  sessionId: data.sessionId
                }),
              });

              const verifyData = await verifyRes.json() as { success?: boolean; error?: string };
              if (!verifyRes.ok || !verifyData.success) {
                throw new Error(verifyData.error || 'Signature verification failed');
              }

              // Redirect to success page
              window.location.href = `/payment/success?session_id=${response.razorpay_payment_id}`;
            } catch (err) {
              alert(err instanceof Error ? err.message : 'Verification failed');
              setSubmitted(false);
            }
          },
          prefill: {
            name: name,
            email: email
          },
          theme: {
            color: '#C79A4E'
          },
          modal: {
            ondismiss: function () {
              setSubmitted(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else if (data.checkoutUrl) {
        setSubmitted(true);
        setCheckoutUrl(data.checkoutUrl);
        setRegistrationMessage('Redirecting to checkout...');
        window.location.href = data.checkoutUrl;
      } else {
        setSubmitted(true);
        setRegistrationMessage('Registration successful! Welcome to the session.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to registration service');
    }
  };

  const statusBadgeHtml = `
    ${past ? '<span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/60 border border-border px-3 py-1 rounded-full">Past Session</span>' : '<span class="text-[10px] font-bold text-green-400 uppercase tracking-wider bg-green-950/30 border border-green-900/30 px-3 py-1 rounded-full animate-pulse">Upcoming</span>'}
    ${session.status === 'draft' ? '<span class="text-[10px] font-bold text-yellow-400 uppercase tracking-wider bg-yellow-950/30 border border-yellow-900/30 px-3 py-1 rounded-full">Draft</span>' : ''}
  `;

  let htmlContent = cms.sessionDetailPageHtml || FALLBACK_CMS_CONTENT.sessionDetailPageHtml;
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
        <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
          <Users size={12} /> Presenters
        </h2>
        <div className="flex flex-col gap-4">
          {speakers.map(sp => (
            <div key={sp.id} className="flex items-start gap-4 border border-border bg-card/40 rounded-sm p-4">
              <img
                src={sp.avatarUrl}
                alt={sp.name}
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=64&h=64'; }}
                className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm">{sp.name}</p>
                <p className="text-xs text-primary font-medium mb-1">{sp.role} · {sp.organisation}</p>
                {sp.bio && <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{sp.bio}</p>}
              </div>
              {sp.socialUrl && (
                <a href={sp.socialUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors shrink-0">
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
        <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Session Sponsors</h2>
        <div className="flex flex-wrap gap-3">
          {sponsors.map(sp => (
            <a
              key={sp.id}
              href={sp.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 border border-border bg-card/40 rounded-sm px-4 py-3 hover:border-primary/30 transition-colors"
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
              <span className="text-xs font-semibold text-muted-foreground">{sp.name}</span>
              {sp.tier && <span className="text-[10px] text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{sp.tier}</span>}
            </a>
          ))}
        </div>
      </motion.div>
    ) : null,
    SessionRegistrationPanel: (
      <div className="border border-border/60 bg-background rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-5 border-b border-border/40 bg-card/30 flex items-center justify-between">
          <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
            {past ? 'Session Ended' : 'Register Interest'}
          </p>
          <span className={`text-[9px] font-black tracking-wider uppercase px-3 py-1 rounded-md border ${
            past
              ? 'text-slate-500 border-border bg-muted/30'
              : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
          }`}>
            {past ? 'Completed' : 'Open'}
          </span>
        </div>

        <div className="px-6 py-5 border-b border-border/40 bg-card/10">
          <div className="flex flex-col gap-3.5 text-xs">
            <div className="flex items-center gap-3 text-slate-400">
              <Calendar size={13} className="text-primary shrink-0" />
              <span className="font-medium">{session.date || 'Date TBC'}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Clock size={13} className="text-primary shrink-0" />
              <span className="font-medium">{session.time || 'Time TBC'} · {session.duration}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Tag size={13} className="text-primary shrink-0" />
              <span className="font-medium">{session.tag}</span>
            </div>
          </div>
        </div>

        {past ? (
          <div className="flex flex-col gap-4">
            {session.videoUrl && session.isFree ? (
              <div className="p-4 border-b border-border/60">
                <VideoPlayer url={session.videoUrl} title={session.title} />
              </div>
            ) : null}
            <div className="px-6 py-8 flex flex-col items-center text-center gap-3">
              <PlayCircle size={36} className="text-slate-500" />
              <p className="text-xs font-bold text-white">This session has ended</p>
              {session.videoUrl ? (
                <Link
                  to="/replays"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 text-xs font-bold rounded-xl transition-all"
                >
                  <PlayCircle size={13} /> Watch on Replays
                </Link>
              ) : (
                <p className="text-[11px] text-slate-500 italic">Replay not yet available.</p>
              )}
            </div>
          </div>
        ) : submitted ? (
          <div className="px-6 py-12 flex flex-col items-center text-center gap-4">
            <CheckCircle size={40} className="text-emerald-400 animate-bounce" />
            <div>
              <p className="text-sm font-black text-white">Successfully Registered!</p>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 max-w-xs">
                {registrationMessage || "We've registered you for this session."}
              </p>
            </div>
            {checkoutUrl && (
              <a
                href={checkoutUrl}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                Continue to Payment <ArrowRight size={12} />
              </a>
            )}
          </div>
        ) : (() => {
          const originalPrice = session.isFree ? 0 : (session.price || 0);
          const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));

          return (
            <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4.5">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Fill details below to reserve your space in this expert live session.
              </p>
              {isLoggedIn ? (
                <div className="bg-background border border-border rounded-xl p-4.5 flex flex-col gap-2.5 text-xs text-muted-foreground">
                  <div className="flex justify-between border-b border-border pb-1.5 font-semibold">
                    <span>Attendee Name:</span>
                    <span className="text-foreground">{name}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Email Address:</span>
                    <span className="text-foreground">{email}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Full name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      className="bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Work email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  {!getUserToken() && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Password *</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  )}
                </>
              )}

              {!session.isFree && originalPrice > 0 && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Promo / Coupon Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        placeholder="e.g. SAVE20"
                        className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-3 bg-muted text-white text-xs font-bold rounded-xl hover:bg-[#3C404E] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-red-400 mt-1">{couponError}</p>}
                    {discountPercent > 0 && <p className="text-[10px] text-emerald-400 mt-1 font-semibold">Discount of {discountPercent}% applied!</p>}
                  </div>

                  {finalPrice > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Payment Gateway</label>
                      <select
                        value={gateway}
                        onChange={e => setGateway(e.target.value)}
                        className="bg-card border border-border text-white px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-primary transition-colors cursor-pointer"
                      >
                        <option value="stripe">Stripe (Card / Apple Pay)</option>
                        <option value="razorpay">Razorpay (UPI / Netbanking)</option>
                      </select>
                    </div>
                  )}

                  <div className="border-t border-border/40 pt-4 mt-1 flex flex-col gap-1.5 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span className="font-semibold text-slate-300">{new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(originalPrice)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({discountPercent}%):</span>
                        <span>-{new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(originalPrice * discountPercent / 100)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-border/40 pt-3 text-xs text-white font-bold">
                      <span>Total to Pay:</span>
                      <span className="text-primary text-sm font-extrabold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(finalPrice)}</span>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black bg-primary text-[#1A1D24] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_16px_rgba(199,154,78,0.15)]"
              >
                {finalPrice > 0 ? "Pay & Register " + new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(finalPrice) : 'Register Now'} <ArrowRight size={13} />
              </button>
              <p className="text-[9px] text-slate-600 text-center uppercase tracking-wider font-semibold">Secure SSL Transaction</p>
            </form>
          );
        })()}
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
