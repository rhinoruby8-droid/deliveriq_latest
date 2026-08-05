import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { getUserToken } from '@/lib/user-auth';

interface CheckoutButtonProps {
  sessionTitle: string;
  amount: number;
  currency?: string;
  label?: string;
  className?: string;
  tier?: 'tier1' | 'tier2' | 'tier3';
  sessionId?: string;
  gateway?: 'stripe' | 'razorpay' | 'paypal' | 'all';
  couponCode?: string;
  disabled?: boolean;
  disabledReason?: string;
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

export default function CheckoutButton({
  sessionTitle,
  amount,
  currency = 'usd',
  label = 'Register & Pay',
  className = '',
  tier,
  sessionId,
  gateway = 'stripe',
  couponCode,
  disabled = false,
  disabledReason,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    // Track the checkout initiation
    trackEvent('begin_checkout', {
      currency,
      value: amount,
      items: [{ item_name: sessionTitle, price: amount, currency }],
    });

    let activeGateway = gateway;
    if (!activeGateway || activeGateway === 'all') {
      try {
        const geoRes = await fetch('/api/geo');
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.country === 'IN') {
            activeGateway = 'razorpay';
          } else {
            activeGateway = 'stripe';
          }
        } else {
          throw new Error('Geo fetch failed');
        }
      } catch {
        // Fallback to timezone heuristics
        const curr = (currency || '').toLowerCase();
        const userTz = typeof Intl !== 'undefined' ? (Intl.DateTimeFormat().resolvedOptions().timeZone || '') : '';
        if (curr === 'inr' || userTz.includes('Kolkata') || userTz.includes('Calcutta') || userTz.includes('India')) {
          activeGateway = 'razorpay';
        } else {
          activeGateway = 'stripe';
        }
      }
    }

    try {
      const token = getUserToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      if (activeGateway === 'razorpay') {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error('Razorpay SDK failed to load. Please check your network connection.');
        }

        // 1. Create Order on Server
        const orderRes = await fetch('/api/razorpay/order', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            amount,
            currency: currency.toUpperCase(),
            sessionTitle,
            tier,
            sessionId,
            couponCode,
          }),
        });

        const orderData = await orderRes.json() as { id?: string; error?: string; amount?: number; currency?: string; keyId?: string };
        if (!orderRes.ok || !orderData.id) {
          throw new Error(orderData.error || 'Failed to initiate Razorpay order');
        }

        // Extract userId from JWT Token payload
        let decodedUserId = '';
        if (token) {
          try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
              const decoded = JSON.parse(atob(payloadBase64)) as { id?: string };
              decodedUserId = decoded.id || '';
            }
          } catch (e) {
            console.error('Failed to decode user token payload', e);
          }
        }

        // 2. Open Razorpay Checkout Modal
        const keyId = orderData.keyId || '';
        if (!keyId) throw new Error('Razorpay Key ID was not provided by the server');
        
        const options = {
          key: keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'DeliverIQ',
          description: sessionTitle,
          order_id: orderData.id,
          handler: async function (response: any) {
            setLoading(true);
            try {
              // 3. Verify Payment Signature on Server
              const verifyRes = await fetch('/api/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: decodedUserId,
                  tier,
                  sessionId,
                }),
              });

              const verifyData = await verifyRes.json() as { success?: boolean; error?: string };
              if (!verifyRes.ok || !verifyData.success) {
                throw new Error(verifyData.error || 'Signature verification failed');
              }

              // Redirect to success page
              window.location.href = `/payment/success?session_id=${response.razorpay_payment_id}`;
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Verification failed');
              setLoading(false);
            }
          },
          prefill: {
            name: '',
            email: '',
          },
          theme: {
            color: '#C79A4E',
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else if (activeGateway === 'paypal') {
        throw new Error('PayPal integration is currently under development. Please select another payment method.');
      } else {
        // Standard Stripe Checkout flow
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers,
          body: JSON.stringify({ sessionTitle, amount, currency, tier, sessionId, couponCode }),
        });

        const data = await res.json() as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          throw new Error(data.error || 'Failed to start checkout');
        }

        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={loading || disabled}
        className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            {label}
            <ArrowRight size={14} />
          </>
        )}
      </button>
      {disabled && disabledReason && (
        <p className="text-xs text-amber-500 text-center">{disabledReason}</p>
      )}
      {error && (
        <p className="text-xs text-red-400 text-center">{error}</p>
      )}
    </div>
  );
}
