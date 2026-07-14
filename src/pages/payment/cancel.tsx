import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { XCircle, ArrowRight } from 'lucide-react';

export default function PaymentCancelPage() {
  const site = 'https://deliveriq.live';

  return (
    <>
      <Helmet>
        <title>Payment Cancelled — DeliverIQ</title>
        <meta name="description" content="Your payment was cancelled. No charge was made. Return to sessions to try again." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${site}/payment/cancel`} />
      </Helmet>

      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full border border-[#2C2F38] bg-[#21242C] flex items-center justify-center">
                <XCircle size={28} className="text-[#8A8D96]" />
              </div>
            </div>

            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#8A8D96] uppercase mb-4">
              Payment Cancelled
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#F0EDE8] leading-tight mb-4">
              No charge was made.
            </h1>

            <p className="text-[#8A8D96] text-base leading-relaxed mb-10">
              You cancelled before completing payment. No charge was made to your card.
              You can try again any time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sessions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110"
              >
                Back to Sessions <ArrowRight size={14} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-[#2C2F38] text-[#8A8D96] rounded transition-all duration-200 hover:border-[#C79A4E]/50 hover:text-[#F0EDE8]"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
