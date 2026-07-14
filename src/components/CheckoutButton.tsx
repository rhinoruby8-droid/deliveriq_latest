import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface CheckoutButtonProps {
  sessionTitle: string;
  amount: number;
  currency?: string;
  label?: string;
  className?: string;
}

export default function CheckoutButton({
  sessionTitle,
  amount,
  currency = 'usd',
  label = 'Register & Pay',
  className = '',
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

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionTitle, amount, currency }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to start checkout');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Redirecting…
          </>
        ) : (
          <>
            {label}
            <ArrowRight size={14} />
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
