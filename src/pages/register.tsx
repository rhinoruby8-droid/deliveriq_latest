import { Helmet } from '@dr.pogodin/react-helmet';
import { useState, useEffect, type FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { ArrowRight, ArrowLeft, CheckCircle, Tag } from 'lucide-react';
import { setUserToken, fetchMe, getUserToken } from '@/lib/user-auth';
import CheckoutButton from '@/components/CheckoutButton';

export default function RegisterPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const [searchParams] = useSearchParams();


  const selectedSessionId = searchParams.get('session') || '';
  const matchedSession = (cms?.sessions || []).find(s => s.id === selectedSessionId);

  // Steps: 1 = Details / Registration Form, 2 = Verification & Checkout
  const [step, setStep] = useState(1);

  // Step 1 Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('United States');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');

  // Step 2 Form Inputs
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('');

  // Pricing calculations
  const originalPrice = matchedSession ? (matchedSession.isFree ? 0 : (matchedSession.price || 0)) : 0;
  const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));

  useEffect(() => {
    async function checkAuth() {
      const me = await fetchMe();
      if (me) {
        setName(me.name);
        setEmail(me.email);
        setStep(2); // Skip Step 1 if already authenticated
      }
    }
    checkAuth();
  }, []);

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
    if (found.sessionId && found.sessionId !== 'all' && found.sessionId !== matchedSession?.id) {
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

  const handleGoToStep2 = async (e: FormEvent) => {
    e.preventDefault();
    if (!matchedSession) {
      alert('Please select a session to register.');
      return;
    }

    setSubmitting(true);
    try {
      // Create user account immediately
      const regRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          jobTitle,
          company,
          country
        })
      });

      const regData = await regRes.json();
      if (!regRes.ok) {
        alert(regData.error || 'Failed to create user account');
        return;
      }

      if (regData.token) {
        setUserToken(regData.token);
      }
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('Failed to create account.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterAndPay = async () => {
    setSubmitting(true);
    try {
      const token = getUserToken();
      if (!token) {
        alert('You must be logged in to register.');
        setSubmitting(false);
        return;
      }

      // Register for the specific Session (free registration)
      const sessionRes = await fetch('/api/user/register-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          couponCode: couponCode.trim() || undefined,
          gateway: undefined
        })
      });

      const sessionData = await sessionRes.json();
      if (!sessionRes.ok) {
        alert(sessionData.error || 'Session registration failed');
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      if (sessionData.checkoutUrl) {
        setCheckoutUrl(sessionData.checkoutUrl);
        window.location.href = sessionData.checkoutUrl;
      } else {
        // Redirect to dashboard on free registration success
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      alert('Network error completing registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register for Event — DeliverIQ</title>
      </Helmet>
      
      <main className="min-h-screen bg-background text-foreground py-12 px-6 flex items-center justify-center relative">
        <div className="w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl relative z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-border">
            <h1 className="text-2xl font-bold text-white">Register for Event</h1>
            <Link to="/sessions" className="p-2 bg-muted rounded-full text-muted-foreground hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </Link>
          </div>

          <div className="p-6 md:p-8">
            {matchedSession && (
              <div className="bg-background border border-border text-white p-4 rounded-xl mb-8 flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm md:text-base leading-snug">{matchedSession.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{matchedSession.date} • {matchedSession.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-2.5 py-1 rounded-md">
                    {matchedSession.isFree ? 'FREE' : new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(matchedSession.price || 0)}
                  </span>
                </div>
              </div>
            )}

            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <CheckCircle size={54} className="text-primary" />
                <h2 className="text-2xl font-bold text-white">Successfully Registered!</h2>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Your account has been created and you are registered for {matchedSession?.title}.
                </p>
                {checkoutUrl ? (
                  <p className="text-xs text-muted-foreground">Redirecting to payment gateway...</p>
                ) : (
                  <Link to="/dashboard" className="mt-4 px-8 py-3.5 bg-primary text-[#1A1D24] text-sm font-bold rounded-full hover:brightness-110 transition-all">
                    Go to My Dashboard
                  </Link>
                )}
              </div>
            ) : step === 1 ? (
              <form onSubmit={handleGoToStep2} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-foreground">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-foreground">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-foreground">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-foreground">Choose Password <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-foreground">Company <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-foreground">Job Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={jobTitle}
                      onChange={e => setJobTitle(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-foreground">Country <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="h-12 w-full md:w-1/2 rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Dietary Requirements - matching screenshot radio button layout */}
                <div className="flex flex-col gap-3 mt-2">
                  <label className="font-semibold text-sm text-foreground">Dietary Requirements <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="radio" name="dietary" defaultChecked className="w-4 h-4 accent-[#C79A4E]" />
                      No special requirements
                    </label>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="radio" name="dietary" className="w-4 h-4 accent-[#C79A4E]" />
                      Yes, I have requirements
                    </label>
                  </div>
                </div>

                {/* Promotion Code matching screenshot */}
                {!matchedSession?.isFree && originalPrice > 0 && (
                  <div className="flex flex-col gap-2 mt-4">
                    <label className="font-semibold text-sm text-foreground">Promotion Code <span className="text-muted-foreground font-normal">(optional)</span></label>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        placeholder="ENTER CODE"
                        className="h-12 w-full md:flex-1 rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground uppercase transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="h-12 px-8 inline-flex items-center justify-center gap-2 bg-muted text-white font-semibold rounded-[10px] hover:bg-[#3A3E4A] transition-colors shrink-0"
                      >
                        <Tag size={16} /> Apply
                      </button>
                    </div>
                    {couponError && <p className="text-sm text-red-400">{couponError}</p>}
                    {discountPercent > 0 && <p className="text-sm text-green-400 font-semibold">Coupon applied! {discountPercent}% discount.</p>}
                  </div>
                )}

                <div className="mt-8 border-t border-border pt-8">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                  >
                    Continue to Payment <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            ) : (
              // STEP 2 REVIEW & PAYMENT (Constrained inside the modal)
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <button onClick={() => setStep(1)} className="p-2 -ml-2 text-muted-foreground hover:text-white rounded-full hover:bg-muted transition-colors">
                    <ArrowLeft size={16} />
                  </button>
                  <h2 className="text-lg font-bold text-white">Review & Pay</h2>
                </div>

                <div className="bg-background border border-border rounded-xl p-5 text-sm flex flex-col gap-3">
                  <div className="flex justify-between font-semibold text-muted-foreground border-b border-border pb-2">
                    <span>Attendee Name</span>
                    <span className="text-foreground">{name}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-muted-foreground border-b border-border pb-2">
                    <span>Email Address</span>
                    <span className="text-foreground">{email}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-muted-foreground border-b border-border pb-2">
                    <span>Session Ticket</span>
                    <span className="text-foreground">{new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(originalPrice)}</span>
                  </div>
                  {/* Coupon section directly inside Review & Pay card */}
                  {!matchedSession?.isFree && originalPrice > 0 && (
                    <div className="flex flex-col gap-2 border-b border-border pb-3 pt-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value)}
                          placeholder="PROMO CODE"
                          className="h-10 flex-1 rounded-[8px] border border-border bg-muted px-3 text-xs text-foreground uppercase transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="h-10 px-4 bg-muted text-white text-xs font-semibold rounded-[8px] hover:bg-[#3A3E4A] transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-xs text-red-400 mt-1">{couponError}</p>}
                    </div>
                  )}
                  {discountPercent > 0 && (
                    <div className="flex justify-between font-semibold text-green-400 border-b border-border pb-2">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-{new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(originalPrice * discountPercent / 100)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-1">
                    <span>Total Due</span>
                    <span className="text-primary">{new Intl.NumberFormat('en-US', { style: 'currency', currency: cms.paymentConfig?.currency || 'USD' }).format(finalPrice)}</span>
                  </div>
                </div>

                {finalPrice > 0 ? (
                  <div className="mt-6">
                    <CheckoutButton
                      sessionTitle={matchedSession!.title}
                      amount={finalPrice}
                      sessionId={matchedSession!.id}
                      couponCode={couponCode.trim() || undefined}
                      gateway={matchedSession?.gateway || 'all'}
                      label="Proceed to Payment"
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="mt-6">
                    <button
                      onClick={handleRegisterAndPay}
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Processing Registration...' : 'Complete Registration'} <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}