import { SeoHead } from '../../components/SeoHead';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, ShieldCheck, Mail, Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } }
};

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  
  return (
    <>
      <SeoHead />

      <main className="min-h-[85vh] flex items-center justify-center bg-muted relative overflow-hidden py-12">
        {/* Decorative Grid Overlays */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          backgroundImage: 'linear-gradient(rgba(44,47,56,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 max-w-2xl relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-background border border-border/60 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
          >
            {/* Success animated icon */}
            <motion.div variants={itemVariants} className="mb-6 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-125 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_24px_rgba(199,154,78,0.15)]">
                <CheckCircle size={36} className="animate-in fade-in zoom-in duration-500" />
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[10px] font-black tracking-[0.25em] text-primary uppercase mb-3">
              Payment Confirmed
            </motion.p>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Your spot is secured!
            </motion.h1>

            <motion.p variants={itemVariants} className="text-slate-400 text-sm leading-relaxed max-w-md mb-8">
              Thank you for your purchase. We've verified your transaction. A confirmation receipt and joining details have been dispatched to your email address.
            </motion.p>

            {sessionId && (
              <motion.div variants={itemVariants} className="bg-card border border-border/40 rounded-xl px-4 py-2 text-[10px] font-mono text-slate-500 mb-8 flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Reference: {sessionId}</span>
              </motion.div>
            )}

            {/* Step Guides / Next Actions */}
            <motion.div variants={itemVariants} className="w-full text-left space-y-4 mb-10 pt-6 border-t border-border/40">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Next Steps</h3>
              
              <div className="flex items-start gap-4 p-4 bg-card/30 border border-border/30 rounded-xl hover:border-border/60 transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Mail size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Check Inbox</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">We sent calendar invites, access keys, and invoices to your email.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card/30 border border-border/30 rounded-xl hover:border-border/60 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Calendar size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">View Registered Events</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Check your custom workspace to see schedules and slides.</p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-extrabold bg-primary text-[#1A1D24] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(199,154,78,0.15)] flex-1"
              >
                Go to Dashboard <ArrowRight size={13} />
              </Link>
              <Link
                to="/sessions"
                className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold border border-border text-slate-400 rounded-xl hover:border-primary/40 hover:text-white transition-all flex-1"
              >
                Browse More Sessions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
