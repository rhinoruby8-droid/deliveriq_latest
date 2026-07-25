import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organisation: string;
  bio: string;
  avatarUrl: string;
  email: string;
  socialUrl?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier?: 'Session Sponsor' | 'Series Sponsor' | 'Platform Partner';
}

export interface Session {
  id: string;
  title: string;
  description: string;
  tag: 'Project Controls' | 'Project Management' | 'Delivery Leadership';
  date: string;
  time: string;
  duration: string;
  status: 'draft' | 'published';
  speakerIds: string[];
  sponsorIds: string[];
  registrationUrl?: string;
  videoUrl?: string;
  price?: number;
  isFree?: boolean;
  gateway?: 'stripe' | 'razorpay' | 'paypal' | 'all';
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  sessionId?: string;
  startDate?: string;
  endDate?: string;
  maxUses?: number;
  uses?: number;
  active?: boolean;
}

// ── Visual CMS Block Types ────────────────────────────────────────────────

export interface CtaButtonBlock {
  label: string;
  href: string;
}

export interface HeroBlock {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaButtonBlock;
  secondaryCta?: CtaButtonBlock;
}

export interface StatBlock {
  value: string; // e.g. '2,000+'
  label: string; // e.g. 'Project Professionals'
}

export interface TextBlock {
  title?: string;
  body: string;
}

export interface BenefitItem {
  icon: string; // lucide icon name e.g. 'Zap'
  title: string;
  description: string;
}

export interface CtaBlock {
  headline: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface SponsorTier {
  name: string;
  priceLabel: string; // e.g. 'Contact us'
  benefits: string[];
}

export interface DocumentSection {
  title: string;
  body: string;
}

export interface HomepageContent {
  visualMode: boolean;
  hero: HeroBlock;
  stats: StatBlock[];
  introParagraph: string;
}

export interface GenericPageContent {
  visualMode: boolean;
  hero: { title: string; subtitle: string };
  sections: TextBlock[];
}

export interface SpeakersPageContent {
  visualMode: boolean;
  hero: HeroBlock;
  benefits: BenefitItem[];
  cta: CtaBlock;
}

export interface SponsorsPageContent {
  visualMode: boolean;
  hero: HeroBlock;
  tiers: SponsorTier[];
  cta: CtaBlock;
}

export interface ContactPageContent {
  visualMode: boolean;
  hero: { title: string; subtitle: string };
  email?: string;
  phone?: string;
  address?: string;
  formIntro?: string;
}

export interface DocumentPageContent {
  visualMode: boolean;
  title: string;
  lastUpdated: string;
  sections: DocumentSection[];
}

export interface PaymentConfig {
  stripeActive: boolean;
  paypalActive: boolean;
  razorpayActive: boolean;
  currency: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[]; // For select type
  placeholder?: string;
}

export interface FormDefinition {
  id: string;
  name: string;
  formType?: 'native' | 'embed';
  embedCode?: string;
  customCss?: string;
  headerHtml?: string;
  fields: FormField[];
  submitButtonText: string;
  successMessage: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
}

export interface CmsContent {
  homepageHtml: string;
  sessionsPageHtml: string;
  speakersPageHtml: string;
  sponsorsPageHtml: string;
  contactPageHtml: string;
  privacyPageHtml: string;
  termsPageHtml: string;
  registerPageHtml: string;
  replaysPageHtml: string;
  sessionDetailPageHtml: string;
  notFoundPageHtml: string;
  sessions: Session[];
  speakers: Speaker[];
  sponsors: Sponsor[];
  forms: FormDefinition[];
  topics?: Topic[];
  coupons?: Coupon[];
  // Visual CMS structured content (optional — pages fall back to *Html strings when absent)
  homepageContent?: HomepageContent;
  sessionsContent?: GenericPageContent;
  speakersContent?: SpeakersPageContent;
  sponsorsContent?: SponsorsPageContent;
  contactContent?: ContactPageContent;
  privacyContent?: DocumentPageContent;
  termsContent?: DocumentPageContent;
  registerContent?: GenericPageContent;
  replaysContent?: GenericPageContent;
  sessionDetailContent?: GenericPageContent;
  notFoundContent?: GenericPageContent;
  paymentConfig?: PaymentConfig;
  homepageCss?: string;
  sessionsPageCss?: string;
  speakersPageCss?: string;
  sponsorsPageCss?: string;
  contactPageCss?: string;
  privacyPageCss?: string;
  termsPageCss?: string;
  registerPageCss?: string;
  replaysPageCss?: string;
  sessionDetailPageCss?: string;
  notFoundPageCss?: string;
  globalCss?: string;
}

// --- Fallback default content (useful during loading and hydration) ---

export const FALLBACK_CMS_CONTENT: CmsContent = {
  globalCss: '',
  topics: [
    {
      id: 'project-controls',
      title: 'Project Controls',
      description: 'Schedule risk · EVM · Cost forecasting · Risk registers',
    },
    {
      id: 'project-management',
      title: 'Project Management',
      description: 'Prompting · Reporting · Stakeholder comms · Planning',
    },
    {
      id: 'delivery-leadership',
      title: 'Delivery Leadership',
      description: 'Lessons learned · Knowledge capture · Programme delivery',
    }
  ],
  coupons: [],
  paymentConfig: {
    stripeActive: true,
    paypalActive: false,
    razorpayActive: false,
    currency: 'USD',
  },
  homepageCss: '',
  sessionsPageCss: '',
  speakersPageCss: '',
  sponsorsPageCss: '',
  contactPageCss: '',
  privacyPageCss: '',
  termsPageCss: '',
  registerPageCss: '',
  replaysPageCss: '',
  sessionDetailPageCss: '',
  notFoundPageCss: '',
  homepageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="max-w-4xl">
      <h1 class="text-5xl md:text-6xl lg:text-[5rem] font-bold text-foreground leading-[1.0] tracking-tight mb-0">
        AI Skills for
      </h1>
      <h1 class="text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.0] tracking-tight mb-0">
        <span class="text-primary">Project</span>
        <span class="text-foreground">Delivery.</span>
      </h1>
      
      <p class="mt-7 text-lg text-muted-foreground leading-relaxed font-normal max-w-xl">
        Practical, developer-free live sessions on applying AI tools to project management, project controls, and delivery leadership.
      </p>

      <p class="mt-5 text-sm text-primary/70 leading-relaxed border-l-2 border-primary/50 pl-4">
        No flight bookings, no hotel expenses, no days out of the office.
      </p>

      <div class="mt-10 flex flex-wrap gap-4">
        <a href="/sessions" class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02]">
          View live sessions
        </a>
        <a href="/for-speakers" class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-border text-foreground rounded hover:bg-muted transition-colors">
          Share your expertise
        </a>
      </div>
    </div>
  </div>
</section>

<section class="border-t border-b border-border bg-card">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
      <div class="px-8 py-10">
        <p class="text-base font-semibold text-foreground mb-2">Project Controls</p>
        <p class="text-xs text-muted-foreground leading-relaxed tracking-wide">Schedule risk · EVM · Cost forecasting · Risk registers</p>
      </div>
      <div class="px-8 py-10">
        <p class="text-base font-semibold text-foreground mb-2">Project Management</p>
        <p class="text-xs text-muted-foreground leading-relaxed tracking-wide">Prompting · Reporting · Stakeholder comms · Planning</p>
      </div>
      <div class="px-8 py-10">
        <p class="text-base font-semibold text-foreground mb-2">Delivery Leadership</p>
        <p class="text-xs text-muted-foreground leading-relaxed tracking-wide">Lessons learned · Knowledge capture · Programme delivery</p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
      <div>
        <p class="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-3">
          Upcoming Sessions
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-sm">
          Sessions in development.
        </h2>
      </div>
      <a href="/sessions" class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/70 transition-colors">
        View all &rarr;
      </a>
    </div>
    [SessionsList]
  </div>
</section>

<section class="py-20 lg:py-24 bg-card">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="mb-16">
      <p class="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-3">
        Why DeliverIQ
      </p>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-2xl">
        Built for the way project professionals actually work.
      </h2>
    </div>

    <div class="flex flex-col">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-20 py-12 border-t border-border">
        <div class="flex items-start gap-5">
          <span class="text-5xl font-bold text-primary/15 leading-none shrink-0 select-none">01</span>
          <h3 class="text-xl md:text-2xl font-bold text-foreground leading-tight pt-1">Live, not recorded.</h3>
        </div>
        <p class="text-base text-muted-foreground leading-relaxed self-center">
          Every session is live with real-time Q&A. Ask questions, challenge ideas, and learn alongside peers — not just watch a video.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-20 py-12 border-t border-border">
        <div class="flex items-start gap-5">
          <span class="text-5xl font-bold text-primary/15 leading-none shrink-0 select-none">02</span>
          <h3 class="text-xl md:text-2xl font-bold text-foreground leading-tight pt-1">Practical, not theoretical.</h3>
        </div>
        <p class="text-base text-muted-foreground leading-relaxed self-center">
          No AI hype. No generic overviews. Every session is built around real project work — the tools, tasks, and decisions you face every week.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-20 py-12 border-t border-border last:border-b">
        <div class="flex items-start gap-5">
          <span class="text-5xl font-bold text-primary/15 leading-none shrink-0 select-none">03</span>
          <h3 class="text-xl md:text-2xl font-bold text-foreground leading-tight pt-1">Expert-led, peer-tested.</h3>
        </div>
        <p class="text-base text-muted-foreground leading-relaxed self-center">
          Sessions are led by working professionals in project management, controls, and delivery — people who use these tools in the field.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
      <div>
        <p class="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-3">FAQ</p>
        <h2 class="text-3xl font-bold text-foreground leading-tight">Common questions.</h2>
        <p class="text-sm text-muted-foreground mt-4 leading-relaxed">Straight answers. No filler.</p>
      </div>
      <div class="flex flex-col gap-0 w-full">
        <details class="group py-5 border-t border-border cursor-pointer">
          <summary class="flex justify-between items-center text-foreground hover:text-primary transition-colors font-medium">
            What is DeliverIQ?
            <span class="text-primary font-bold">&plus;</span>
          </summary>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            DeliverIQ is a live learning platform for project management, project controls, and delivery professionals. We host expert-led online sessions focused on applying AI to real project work — with live Q&A and replay access.
          </p>
        </details>
        <details class="group py-5 border-t border-border cursor-pointer">
          <summary class="flex justify-between items-center text-foreground hover:text-primary transition-colors font-medium">
            Are sessions free to attend?
            <span class="text-primary font-bold">&plus;</span>
          </summary>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            Some sessions are free; others require registration. Pricing is shown on each session listing. Joining the notification list ensures you hear about upcoming sessions before registration fills.
          </p>
        </details>
        <details class="group py-5 border-t border-border cursor-pointer">
          <summary class="flex justify-between items-center text-foreground hover:text-primary transition-colors font-medium">
            How do I access replays?
            <span class="text-primary font-bold">&plus;</span>
          </summary>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            Replays of past sessions are available in the Replays section. Some replays are open access; others may require a one-time fee or registration.
          </p>
        </details>
        <details class="group py-5 border-t border-border cursor-pointer">
          <summary class="flex justify-between items-center text-foreground hover:text-primary transition-colors font-medium">
            Can I apply to speak at a DeliverIQ session?
            <span class="text-primary font-bold">&plus;</span>
          </summary>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            Yes. We actively invite practitioners to share their expertise. Visit the For Speakers page to learn about what we look for and submit an expression of interest.
          </p>
        </details>
        <details class="group py-5 border-t border-border cursor-pointer">
          <summary class="flex justify-between items-center text-foreground hover:text-primary transition-colors font-medium">
            How can my brand sponsor a session?
            <span class="text-primary font-bold">&plus;</span>
          </summary>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            Sponsorship opportunities are available for brands that want to reach project professionals. Visit the For Sponsors page for audience details and package options.
          </p>
        </details>
        <details class="group py-5 border-t border-border border-b cursor-pointer">
          <summary class="flex justify-between items-center text-foreground hover:text-primary transition-colors font-medium">
            Is DeliverIQ only for project managers?
            <span class="text-primary font-bold">&plus;</span>
          </summary>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            No. DeliverIQ is built for the full project delivery community — project managers, project controls professionals, planners, schedulers, cost engineers, and delivery leaders.
          </p>
        </details>
      </div>
    </div>
  </div>
</section>

<section class="relative py-24 lg:py-32 overflow-hidden border-t border-border bg-card/20">
  <div class="container mx-auto px-6 lg:px-8 text-center relative z-10">
    <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 max-w-3xl mx-auto">
      Ready to bring AI into your project work?
    </h2>
    <p class="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
      Join the list and be first to know when new sessions open for registration.
    </p>
    <div class="flex justify-center gap-4">
      <a href="/sessions" class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded hover:brightness-110 transition-all">
        Explore sessions
      </a>
    </div>
  </div>
</section>`,
  sessionsPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="max-w-3xl">
      <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
        Live Sessions
      </p>
      <h1 class="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
        Sessions are coming.
        <br />
        <span class="text-primary">Be first to know.</span>
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
        We're building out the first wave of live sessions for project professionals. Register your interest below and we'll notify you the moment registration opens.
      </p>
    </div>
  </div>
</section>

<section class="bg-card py-12">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <DynamicForm formId="notify" />
    </div>
  </div>
</section>

<section class="py-16">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="mb-12">
      <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
        Upcoming Schedule
      </p>
      <h2 class="text-3xl md:text-4xl font-bold text-foreground leading-tight">
        Live learning sessions.
      </h2>
    </div>
    [SessionsList]
  </div>
</section>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
      What to Expect
    </p>
    <div class="flex flex-col gap-0">
      [TopicsList]
    </div>
  </div>
</section>`,
  speakersPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
          For Speakers
        </p>
        <h1 class="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
          Teach what you know.
          <br />
          <span class="text-primary">To the people who need it.</span>
        </h1>
        <p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
          DeliverIQ brings together project professionals who want practical AI skills. If you use AI in real project work and have something valuable to share, we want to hear from you.
        </p>
        <div class="mt-8">
          <a href="#apply" class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded hover:brightness-110 transition-all">
            Apply to speak &rarr;
          </a>
        </div>
      </div>
      <div>
        <div class="relative rounded-sm overflow-hidden border border-border">
          <div class="aspect-video bg-card">
            <video src="/airo-assets/videos/pages/speakers/preview" autoPlay muted loop playsInline class="w-full h-full object-cover opacity-90" />
          </div>
          <div class="bg-card px-4 py-3 border-t border-border">
            <span class="text-[11px] font-semibold text-primary uppercase tracking-wider">Share your expertise with project professionals</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28 bg-card">
  <div class="container mx-auto px-6 lg:px-8">
    <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
      Criteria
    </p>
    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 max-w-xl leading-tight">
      Practitioners, not presenters.
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">Real-world application</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">You use AI in actual project work — not in theory. Your session should be grounded in practice, with examples your audience can apply immediately.</p>
      </div>
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">Relevant discipline</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Your expertise sits in project management, project controls, planning, scheduling, cost engineering, risk, or delivery leadership.</p>
      </div>
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">Clear, practical content</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">You can structure a focused 60–75 minute session with a clear takeaway. No vendor pitches, no generic AI overviews.</p>
      </div>
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">Comfortable on camera</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Sessions are live with Q&A. You should be comfortable presenting online and engaging directly with a professional audience.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
      Formats
    </p>
    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 max-w-xl leading-tight">
      Three ways to share your expertise.
    </h2>
    <div class="flex flex-col gap-0">
      <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-8 border-t border-border">
        <div>
          <p class="text-base font-semibold text-foreground mb-1">Practical Walkthrough</p>
          <span class="text-xs font-semibold tracking-widest text-primary uppercase">60 min</span>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">A step-by-step demonstration of an AI tool or workflow applied to a real project task.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-8 border-t border-border">
        <div>
          <p class="text-base font-semibold text-foreground mb-1">Case Study</p>
          <span class="text-xs font-semibold tracking-widest text-primary uppercase">60–75 min</span>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">A structured review of how AI was applied on a real project — what worked, what did not, and what you learned.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-8 border-t border-border last:border-b">
        <div>
          <p class="text-base font-semibold text-foreground mb-1">Live Workshop</p>
          <span class="text-xs font-semibold tracking-widest text-primary uppercase">75 min</span>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">An interactive session where attendees work through exercises alongside you, guided by your expertise.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28 bg-card">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      <div>
        <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
          Benefits
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Your expertise, amplified.
        </h2>
      </div>
      <ul class="flex flex-col gap-4 pt-2">
        <li class="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
          <span class="text-primary">&checkmark;</span> A live audience of project professionals actively seeking practical AI skills
        </li>
        <li class="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
          <span class="text-primary">&checkmark;</span> Promotion across DeliverIQ channels before and after your session
        </li>
        <li class="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
          <span class="text-primary">&checkmark;</span> A replay of your session published to the DeliverIQ library
        </li>
        <li class="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
          <span class="text-primary">&checkmark;</span> A speaker profile on the DeliverIQ platform
        </li>
        <li class="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
          <span class="text-primary">&checkmark;</span> Direct Q&A with your audience — no intermediary
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="apply" class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
        Get in Touch
      </p>
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
        Apply to speak.
      </h2>
      <p class="text-muted-foreground mb-10 text-sm leading-relaxed">
        Tell us what you'd like to present. We'll review your expression of interest and get
        back to you within 2 business days.
      </p>
      <DynamicForm formId="speaker" />
    </div>
  </div>
</section>`,
  sponsorsPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
          For Sponsors
        </p>
        <h1 class="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
          Be in the room
          <br />
          <span class="text-primary">where project pros learn.</span>
        </h1>
        <p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
          DeliverIQ brings together a focused audience of project management, project controls, and delivery professionals. Sponsorship puts your brand alongside content they actively seek out.
        </p>
        <div class="mt-8">
          <a href="#enquire" class="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded hover:brightness-110 transition-all">
            Enquire about sponsorship &rarr;
          </a>
        </div>
      </div>
      <div>
        [SponsorStats]
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
      The Audience
    </p>
    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 max-w-xl leading-tight">
      Professionals who deliver projects for a living.
    </h2>
    <div class="flex flex-col gap-0">
      <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-12 py-8 border-t border-border">
        <p class="text-base font-semibold text-foreground">Project Managers</p>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">Responsible for delivery outcomes across sectors and project scales.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-12 py-8 border-t border-border">
        <p class="text-base font-semibold text-foreground">Project Controls</p>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">Planners, schedulers, cost engineers, and risk professionals.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-12 py-8 border-t border-border last:border-b">
        <p class="text-base font-semibold text-foreground">Delivery Leaders</p>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">Programme directors, heads of PMO, and senior delivery executives.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-24 bg-card">
  <div class="container mx-auto px-6 lg:px-8">
    <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
      Why Sponsor
    </p>
    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 max-w-xl leading-tight">
      Visibility that compounds.
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">A focused, professional audience</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">DeliverIQ attracts practitioners actively upskilling in AI — not casual browsers. Your brand reaches people making real decisions about tools, platforms, and services.</p>
      </div>
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">Live session visibility</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Sponsors are featured before, during, and after each session — in pre-session communications, on-screen during the live event, and in post-session replays.</p>
      </div>
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">Replay longevity</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Sessions remain available on demand after they air. Sponsor visibility extends beyond the live event and compounds over time as replays accumulate.</p>
      </div>
      <div class="flex flex-col gap-3 py-8 pr-0 md:pr-12 border-t border-border">
        <h3 class="text-base font-semibold text-foreground">Relevant context</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Your brand appears alongside practical, expert-led content that your audience values. No banner blindness — sponsorship is integrated, not bolted on.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
      Sponsorship Packages
    </p>
    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-xl leading-tight">
      Three levels of partnership.
    </h2>
    <p class="text-muted-foreground text-sm mb-12 max-w-lg leading-relaxed">
      Pricing and availability are discussed directly. Enquire below and we'll share full details.
    </p>
    <div class="flex flex-col gap-5">
      <div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 p-8 border border-border rounded-sm hover:border-primary/40 transition-colors">
        <div class="flex items-center gap-3 md:w-48 shrink-0">
          <span class="text-primary">&checkmark;</span>
          <p class="text-base font-semibold text-foreground">Session Sponsor</p>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed">Exclusive sponsorship of a single live session. Includes pre-session promotion, on-screen branding during the live event, and replay credit.</p>
      </div>
      <div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 p-8 border border-border rounded-sm hover:border-primary/40 transition-colors">
        <div class="flex items-center gap-3 md:w-48 shrink-0">
          <span class="text-primary">&checkmark;</span>
          <p class="text-base font-semibold text-foreground">Series Sponsor</p>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed">Sponsorship across a defined series of sessions within a topic area. Sustained visibility with a consistent, relevant audience over multiple events.</p>
      </div>
      <div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 p-8 border border-border rounded-sm hover:border-primary/40 transition-colors">
        <div class="flex items-center gap-3 md:w-48 shrink-0">
          <span class="text-primary">&checkmark;</span>
          <p class="text-base font-semibold text-foreground">Platform Partner</p>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed">Ongoing partnership across all DeliverIQ sessions and content. Maximum reach, deepest integration, and first right of refusal on new session topics.</p>
      </div>
    </div>
  </div>
</section>

<section id="enquire" class="py-20 lg:py-28 bg-card">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="max-w-2xl">
      <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
        Get in Touch
      </p>
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
        Enquire about sponsorship.
      </h2>
      <p class="text-muted-foreground mb-10 text-sm leading-relaxed">
        Tell us about your brand and what you're looking for. We'll come back to you with
        availability and full package details.
      </p>
      <DynamicForm formId="sponsor" />
    </div>
  </div>
</section>`,
  contactPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="max-w-3xl">
      <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
        Contact
      </p>
      <h1 class="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
        We'd like to
        <br />
        <span class="text-primary">hear from you.</span>
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
        Use the form below or email us directly at <a href="mailto:info@deliveriq.live" class="text-primary hover:underline">info@deliveriq.live</a>. We aim to respond within 2 business days.
      </p>
    </div>
  </div>
</section>

<section class="py-20 lg:py-24">
  <div class="container mx-auto px-6 lg:px-8">
    <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
      How We Can Help
    </p>
    <div class="flex flex-col gap-0">
      <div class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-7 border-t border-border">
        <p class="text-sm font-semibold text-foreground">General enquiries</p>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">Questions about DeliverIQ, the platform, or upcoming sessions.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-7 border-t border-border">
        <p class="text-sm font-semibold text-foreground">Speaking</p>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">Interested in leading a session? Use the form or visit the For Speakers page.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-7 border-t border-border">
        <p class="text-sm font-semibold text-foreground">Sponsorship</p>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">Want to reach our audience? Use the form or visit the For Sponsors page.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-7 border-t border-border last:border-b">
        <p class="text-sm font-semibold text-foreground">Everything else</p>
        <p class="text-sm text-muted-foreground leading-relaxed self-center">Feedback, press, partnerships, or anything else — we read every message.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-20 lg:py-28 relative">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-20 items-start">
      <div>
        <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
          Send a Message
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          Get in touch.
        </h2>
        <p class="text-sm text-muted-foreground leading-relaxed mb-8">
          Fill in the form and we'll get back to you. Prefer email? Reach us directly at 
          <a href="mailto:info@deliveriq.live" class="text-primary hover:underline">info@deliveriq.live</a>.
        </p>
        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          <span>We aim to respond within 2 business days.</span>
        </div>
      </div>
      <div>
        <DynamicForm formId="contact" />
      </div>
    </div>
  </div>
</section>`,
  privacyPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-5">Privacy Policy</h1>
      <p class="text-sm text-muted-foreground mb-8">Last updated: July 12, 2026</p>
      
      <div class="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed space-y-6">
        <p>DeliverIQ is committed to protecting your privacy. This policy describes how we collect, use, and handle your personal data when you use our platform, register for webinars, or contact us.</p>
        
        <h2 class="text-lg font-bold text-primary mt-6 mb-2">1. Information We Collect</h2>
        <p>We collect your name, email address, job title, and organisation name when you register for webinars or submit enquiries. This data is used solely to facilitate session invitations and updates.</p>

        <h2 class="text-lg font-bold text-primary mt-6 mb-2">2. Cookies</h2>
        <p>We use essential cookies to maintain your login session and track analytics preferences according to your consent settings.</p>

        <h2 class="text-lg font-bold text-primary mt-6 mb-2">3. Data Retention</h2>
        <p>We store data securely in compliance with standard regulations. You can request deletion of your information at any time by emailing us at info@deliveriq.live.</p>
      </div>
    </div>
  </div>
</section>`,
  termsPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-5">Terms of Service</h1>
      <p class="text-sm text-muted-foreground mb-8">Last updated: July 12, 2026</p>
      
      <div class="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed space-y-6">
        <p>By accessing and using the DeliverIQ live learning platform and replays library, you agree to comply with and be bound by the following terms.</p>
        
        <h2 class="text-lg font-bold text-primary mt-6 mb-2">1. Permitted Use</h2>
        <p>DeliverIQ resources, webinars, and replay videos are provided for individual professional learning. Redistribution, screen recording, or commercial reuse of session materials without permission is prohibited.</p>

        <h2 class="text-lg font-bold text-primary mt-6 mb-2">2. Registration</h2>
        <p>You agree to provide accurate and complete registration data. You are responsible for maintaining the confidentiality of your credentials.</p>

        <h2 class="text-lg font-bold text-primary mt-6 mb-2">3. Intellectual Property</h2>
        <p>All session materials, slides, brand assets, and videos are the property of DeliverIQ and the respective presenters.</p>
      </div>
    </div>
  </div>
</section>`,
  registerPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background-image: linear-gradient(rgba(var(--border-rgb, 140, 140, 140), 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--border-rgb, 140, 140, 140), 0.2) 1px, transparent 1px); background-size: 48px 48px"></div>
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(ellipse 50% 60% at 20% 50%, rgba(var(--primary-rgb, 199, 154, 78), 0.06) 0%, transparent 70%)"></div>
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div>
        <p class="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">
          Register Your Interest
        </p>
        <h1 class="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
          Registrations<br />
          <span class="text-primary">opening soon!</span>
        </h1>
        <p class="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
          Live sessions for project professionals who want to apply AI in real delivery work — not theory, not hype. Add your name below and we'll reach out the moment registration opens.
        </p>
        <ul class="flex flex-col gap-3">
          <li class="flex items-start gap-3 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0 mt-0.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
            Priority notification when registration opens
          </li>
          <li class="flex items-start gap-3 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0 mt-0.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            Early access to session topics and schedules
          </li>
          <li class="flex items-start gap-3 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0 mt-0.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Join a community of project professionals upskilling in AI
          </li>
          <li class="flex items-start gap-3 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0 mt-0.5"><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>
            Replay access included with every session
          </li>
        </ul>
      </div>
      <div class="lg:sticky lg:top-32">
        <div class="border border-border bg-card rounded-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-border">
            <p class="text-[10px] font-semibold tracking-widest text-primary uppercase">
              Register your interest
            </p>
          </div>
          <div class="p-6">
            <DynamicForm formId="register" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="w-full h-px bg-primary/30"></div>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center mb-14">
      <p class="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4">What to expect</p>
      <h2 class="text-3xl md:text-4xl font-bold text-foreground leading-tight">Sessions built for how project professionals actually work</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="border border-border bg-card rounded-sm px-6 py-7">
        <p class="text-4xl font-black text-[#2C2F38] mb-4 leading-none">01</p>
        <h3 class="text-base font-bold text-foreground mb-2">Live and interactive</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Every session is delivered live with real Q&A — not pre-recorded content you watch alone.</p>
      </div>
      <div class="border border-border bg-card rounded-sm px-6 py-7">
        <p class="text-4xl font-black text-[#2C2F38] mb-4 leading-none">02</p>
        <h3 class="text-base font-bold text-foreground mb-2">Practical, not theoretical</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Topics are drawn from real project delivery challenges. You leave with techniques you can apply immediately.</p>
      </div>
      <div class="border border-border bg-card rounded-sm px-6 py-7">
        <p class="text-4xl font-black text-[#2C2F38] mb-4 leading-none">03</p>
        <h3 class="text-base font-bold text-foreground mb-2">Replay included</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">Can't make the live time? Every registered attendee gets full replay access after the session.</p>
      </div>
    </div>
  </div>
</section>`,
  replaysPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background-image: linear-gradient(rgba(var(--border-rgb, 140, 140, 140), 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--border-rgb, 140, 140, 140), 0.2) 1px, transparent 1px); background-size: 48px 48px;"></div>
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(ellipse 50% 60% at 20% 50%, rgba(var(--primary-rgb, 199, 154, 78), 0.06) 0%, transparent 70%);"></div>
  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">Replays</p>
        <h1 class="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
          Past sessions.<br /><span class="text-primary">On demand.</span>
        </h1>
        <p class="text-lg text-muted-foreground leading-relaxed max-w-xl">
          Missed a live session? Replays will be available here after each event. Sign up below to be notified when the first replays go live.
        </p>
      </div>
      <div class="hidden lg:block">
        <div class="relative rounded-sm overflow-hidden border border-border">
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C79A4E]/50 to-transparent z-10"></div>
          <div class="aspect-video bg-card">
            <video src="/airo-assets/videos/pages/replays/preview" autoplay muted loop playsinline class="w-full h-full object-cover opacity-90"></video>
            <div class="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
          </div>
          <div class="bg-card px-4 py-3 flex items-center gap-2 border-t border-border">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            <span class="text-[11px] font-semibold text-primary uppercase tracking-wider">Replays available after each live session</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="w-full h-px bg-primary/30"></div>

<section class="bg-card py-10">
  <div class="container mx-auto px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
      <div class="flex-1">
        <p class="text-base font-semibold text-foreground mb-1">Get notified when replays are available.</p>
        <p class="text-sm text-muted-foreground">We'll let you know as soon as the first sessions are published.</p>
      </div>
      <div class="flex-1 max-w-md">
        <DynamicForm formId="notify" />
      </div>
    </div>
  </div>
</section>

<div class="w-full h-px bg-muted"></div>

<section class="py-20 lg:py-28">
  <div class="container mx-auto px-6 lg:px-8">
    [ReplaysGrid]
  </div>
</section>

<div class="w-full h-px bg-primary/30"></div>

<section class="py-20 lg:py-24 bg-card">
  <div class="container mx-auto px-6 lg:px-8">
    <div>
      <p class="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">What to Expect</p>
      <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-12 max-w-xl leading-tight">Every replay. Exactly as it aired.</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0">
        <div class="flex flex-col gap-3 py-8 px-0 md:px-8 border-t border-border md:border-t-0 md:border-l first:border-l-0">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-3xl font-bold text-[#2C2F38]">01</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="text-base font-semibold text-foreground">Full session recording</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">The complete live session — presentation, demonstrations, and the full Q&A — unedited and uncut.</p>
        </div>
        <div class="flex flex-col gap-3 py-8 px-0 md:px-8 border-t border-border md:border-t-0 md:border-l first:border-l-0">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-3xl font-bold text-[#2C2F38]">02</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="text-base font-semibold text-foreground">Organised by topic</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">Filter replays by discipline — project controls, project management, or delivery leadership — to find what's most relevant to you.</p>
        </div>
        <div class="flex flex-col gap-3 py-8 px-0 md:px-8 border-t border-border md:border-t-0 md:border-l first:border-l-0">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-3xl font-bold text-[#2C2F38]">03</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="text-base font-semibold text-foreground">Available on demand</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">Watch at your own pace, on your schedule. No expiry, no time pressure.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
  sessionDetailPageHtml: `<section class="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background-image: linear-gradient(rgba(var(--border-rgb, 140, 140, 140), 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--border-rgb, 140, 140, 140), 0.2) 1px, transparent 1px); background-size: 48px 48px;"></div>
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(ellipse 60% 70% at 20% 50%, rgba(199,154,78,0.07) 0%, transparent 70%);"></div>

  <div class="container mx-auto px-6 lg:px-8 relative z-10">
    <a href="/sessions" class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-8 font-semibold">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back to Sessions
    </a>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-6">
          <span class="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 border border-primary/20 px-3 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> {{session.tag}}
          </span>
          {{session.statusBadge}}
        </div>

        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
          {{session.title}}
        </h1>

        <div class="flex flex-wrap gap-5 mb-8">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span class="font-semibold">{{session.date}}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span class="font-semibold">{{session.time}} &nbsp;·&nbsp; {{session.duration}}</span>
          </div>
        </div>

        <div class="mb-10">
          <h2 class="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">About this session</h2>
          <p class="text-base text-muted-foreground leading-relaxed max-w-2xl">{{session.description}}</p>
        </div>

        <div class="w-full h-px bg-muted mb-10"></div>

        [SessionSpeakers]
        [SessionSponsors]
      </div>

      <div class="lg:sticky lg:top-28">
        [SessionRegistrationPanel]
        
        <a href="/sessions" class="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> All Sessions
        </a>
      </div>
    </div>
  </div>
</section>`,
  notFoundPageHtml: `<div class="min-h-screen flex items-center justify-center" style="background: linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--secondary)))">
  <div class="container mx-auto px-4 max-w-2xl text-center">
    <div class="space-y-8">
      <div class="space-y-4">
        <h1 class="text-6xl font-bold text-white/90">404</h1>
        <h2 class="text-2xl font-semibold text-white/90">Page Not Found</h2>
        <p class="text-white/90">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      </div>
      <div class="flex justify-center gap-4">
        <a href="/" class="px-8 py-3 bg-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105" style="color: hsl(var(--primary))">🏠 Go Home</a>
        <a href="#" onclick="window.history.back(); return false;" class="px-8 py-3 bg-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105" style="color: hsl(var(--primary))">← Go Back</a>
      </div>
    </div>
  </div>
</div>`,
  sessions: [
    {
      id: 'schedule-risk',
      title: 'AI-Assisted Schedule Risk Analysis',
      description: 'Apply AI tools to identify schedule risks earlier, model scenarios faster, and communicate findings with clarity.',
      tag: 'Project Controls',
      date: '2026-07-28',
      time: '14:00 BST',
      duration: '60 min',
      status: 'published',
      speakerIds: ['john-doe'],
      sponsorIds: ['aecom']
    },
    {
      id: 'pm-prompting',
      title: 'Prompting for Project Managers',
      description: 'Write effective prompts for real PM tasks — status reports, risk registers, stakeholder briefs, and more.',
      tag: 'Project Management',
      date: '2026-08-04',
      time: '15:00 BST',
      duration: '60 min',
      status: 'published',
      speakerIds: ['jane-smith'],
      sponsorIds: ['microsoft']
    },
    {
      id: 'evm-ai',
      title: 'AI in Earned Value Management',
      description: 'Accelerate EVM reporting, flag variances, and support forecasting without replacing your professional judgment.',
      tag: 'Delivery Leadership',
      date: '2026-08-11',
      time: '16:00 BST',
      duration: '60 min',
      status: 'published',
      speakerIds: ['bob-johnson'],
      sponsorIds: ['slack']
    }
  ],
  speakers: [
    {
      id: 'john-doe',
      name: 'John Doe',
      role: 'Project Controls Manager',
      organisation: 'AECOM',
      bio: 'John has 15 years of experience in project controls, schedule forecasting, and risk analysis.',
      avatarUrl: '/airo-assets/images/speakers/john-doe',
      email: 'john.doe@aecom.com'
    },
    {
      id: 'jane-smith',
      name: 'Jane Smith',
      role: 'Senior Project Manager',
      organisation: 'Google',
      bio: 'Jane specializes in agile execution, prompt engineering for product delivery, and cross-functional leadership.',
      avatarUrl: '/airo-assets/images/speakers/jane-smith',
      email: 'janesmith@google.com'
    },
    {
      id: 'bob-johnson',
      name: 'Bob Johnson',
      role: 'Programme Director',
      organisation: 'DeliverIQ',
      bio: 'Bob leads large-scale software transformations and has researched lessons-learned automation using LLMs.',
      avatarUrl: '/airo-assets/images/speakers/bob-johnson',
      email: 'bob@deliveriq.live'
    }
  ],
  sponsors: [
    {
      id: 'aecom',
      name: 'AECOM',
      logoUrl: '/airo-assets/images/logo/aecom',
      websiteUrl: 'https://aecom.com',
      tier: 'Session Sponsor'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      logoUrl: '/airo-assets/images/logo/microsoft',
      websiteUrl: 'https://microsoft.com',
      tier: 'Series Sponsor'
    },
    {
      id: 'slack',
      name: 'Slack',
      logoUrl: '/airo-assets/images/logo/slack',
      websiteUrl: 'https://slack.com',
      tier: 'Platform Partner'
    }
  ],
  forms: [
    {
      id: 'contact',
      name: 'Contact Form',
      submitButtonText: 'Send Message',
      successMessage: 'Thank you for your message. We will get back to you shortly.',
      fields: [
        { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Jane Doe' },
        { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'jane@example.com' },
        { id: 'message', type: 'textarea', label: 'Message', required: true, placeholder: 'How can we help?' }
      ]
    },
    {
      id: 'register',
      name: 'Registration Form',
      submitButtonText: 'Register',
      successMessage: 'Thank you for registering. We will notify you when sessions open.',
      fields: [
        { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Jane Doe' },
        { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'jane@example.com' },
        { id: 'role', type: 'text', label: 'Role', required: true, placeholder: 'Project Manager' }
      ]
    },
    {
      id: 'speaker',
      name: 'Apply to Speak',
      submitButtonText: 'Submit Application',
      successMessage: 'Thank you for applying. We will review your application and get back to you.',
      fields: [
        { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Jane Doe' },
        { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'jane@example.com' },
        { id: 'topic', type: 'text', label: 'Proposed Topic', required: true, placeholder: 'AI in Risk Management' },
        { id: 'experience', type: 'textarea', label: 'Relevant Experience', required: true, placeholder: 'Describe your practical experience.' }
      ]
    },
    {
      id: 'sponsor',
      name: 'Enquire about Sponsorship',
      submitButtonText: 'Enquire Now',
      successMessage: 'Thank you for your enquiry. Our team will reach out soon.',
      fields: [
        { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Jane Doe' },
        { id: 'email', type: 'email', label: 'Work Email', required: true, placeholder: 'jane@company.com' },
        { id: 'company', type: 'text', label: 'Company', required: true, placeholder: 'Acme Corp' },
        { id: 'interest', type: 'select', label: 'Sponsorship Interest', required: true, options: ['Session Sponsor', 'Series Sponsor', 'Platform Partner', 'Other'] }
      ]
    },
    {
      id: 'notify',
      name: 'Notify Me',
      submitButtonText: 'Join the List',
      successMessage: 'You are on the list! We will notify you.',
      fields: [
        { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'jane@example.com' }
      ]
    }
  ],
  homepageContent: {
    visualMode: false,
    hero: {
      eyebrow: 'AI-Powered Learning',
      headline: 'AI Skills for Project Delivery.',
      subheadline: 'Practical, developer-free live sessions on applying AI tools to project management, project controls, and delivery leadership.',
      primaryCta: { label: 'View live sessions', href: '/sessions' },
      secondaryCta: { label: 'Share your expertise', href: '/for-speakers' },
    },
    stats: [
      { value: '2,000+', label: 'Project Professionals' },
      { value: '50+', label: 'AI Sessions Delivered' },
      { value: '15+', label: 'Industry Topics' }
    ],
    introParagraph: 'DeliverIQ connects project professionals with practical AI knowledge through live, interactive online sessions.',
  },
  speakersContent: {
    visualMode: false,
    hero: {
      eyebrow: 'Speak at DeliverIQ',
      headline: 'Share Your Expertise',
      subheadline: 'Join our roster of industry leaders and share your AI project delivery knowledge with thousands of professionals.',
      primaryCta: { label: 'Apply to Speak', href: '/contact' },
    },
    benefits: [
      { icon: 'Globe', title: 'Global Reach', description: 'Reach project professionals across the world from your desk.' },
      { icon: 'Users', title: 'Engaged Audience', description: 'Speak to a focused, motivated audience ready to learn and apply.' },
      { icon: 'Award', title: 'Build Authority', description: 'Establish yourself as a thought leader in AI project delivery.' }
    ],
    cta: { headline: 'Ready to Share Your Knowledge?', subtext: 'Apply to speak at an upcoming session.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
  },
  sponsorsContent: {
    visualMode: false,
    hero: {
      eyebrow: 'Sponsor DeliverIQ',
      headline: 'Partner With Us',
      subheadline: 'Reach a targeted audience of project professionals and decision-makers across the globe.',
      primaryCta: { label: 'Become a Sponsor', href: '/contact' },
    },
    tiers: [
      { name: 'Session Sponsor', priceLabel: 'Single Session Package', benefits: ['Exclusive sponsorship of one live session', 'Pre-session promotion', 'On-screen branding during live event', 'Replay credit'] },
      { name: 'Series Sponsor', priceLabel: 'Sustained Series Package', benefits: ['Sponsorship across defined series', 'Consistent visibility', 'Logo on all series pages', 'Newsletter features'] },
      { name: 'Platform Partner', priceLabel: 'Full Platform Package', benefits: ['Ongoing partnership across all content', 'Maximum reach & deepest integration', 'First right of refusal on new topics', 'Custom collaboration'] }
    ],
    cta: { headline: 'Interested in Sponsoring?', subtext: 'Get in touch and we will put together a package for you.', buttonLabel: 'Contact Us', buttonHref: '/contact' },
  },
  contactContent: {
    visualMode: false,
    hero: { title: 'Get in Touch', subtitle: 'Have a question, want to speak, or interested in sponsoring? We would love to hear from you.' },
    email: 'hello@deliveriq.live',
    formIntro: 'Fill out the form below and we will get back to you within 2 business days.',
  },
  privacyContent: {
    visualMode: false,
    title: 'Privacy Policy',
    lastUpdated: '2025-01-01',
    sections: [
      { title: 'Introduction', body: 'This Privacy Policy explains how DeliverIQ collects, uses, and protects your personal information.' },
      { title: 'Information We Collect', body: 'We collect information you provide directly, such as your name and email address when registering for sessions.' }
    ]
  },
  termsContent: {
    visualMode: false,
    title: 'Terms of Use',
    lastUpdated: '2025-01-01',
    sections: [
      { title: 'Acceptance', body: 'By accessing DeliverIQ, you agree to these Terms of Use.' },
      { title: 'Use of Service', body: 'You may use DeliverIQ for lawful purposes only, in accordance with these terms.' },
    ],
  },
  registerContent: {
    visualMode: false,
    hero: { title: 'Register Now', subtitle: 'Secure your spot for the upcoming session.' },
    sections: [],
  },
};

// --- Authentication Session Storage Helpers ---

const AUTH_KEY = 'deliveriq_cms_token';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, token);
}

export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn(): boolean {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(window.atob(token)) as { exp?: number };
    return payload.exp ? payload.exp > Date.now() : false;
  } catch {
    return false;
  }
}

// --- React Query Hooks ---

export function useCmsContent() {
  return useQuery<CmsContent>({
    queryKey: ['cmsContent'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/cms/content');
        if (!res.ok) throw new Error('Failed to load CMS content');
        const data = await res.json() as CmsContent;
        if (!data.forms || data.forms.length === 0) {
          data.forms = FALLBACK_CMS_CONTENT.forms;
        }
        if (!data.sessions || data.sessions.length === 0) {
          data.sessions = FALLBACK_CMS_CONTENT.sessions;
        }
        if (!data.speakers || data.speakers.length === 0) {
          data.speakers = FALLBACK_CMS_CONTENT.speakers;
        }
        if (!data.sponsors || data.sponsors.length === 0) {
          data.sponsors = FALLBACK_CMS_CONTENT.sponsors;
        }
        if (!data.topics || data.topics.length === 0) {
          data.topics = FALLBACK_CMS_CONTENT.topics;
        }
        return data;
      } catch (err) {
        console.error('API failed, returning fallback CMS content:', err);
        return FALLBACK_CMS_CONTENT;
      }
    },
    // Do NOT use initialData — it causes the admin useEffect to fire with
    // an empty sessions [] before the real DB data loads, which can wipe sessions.
    // Instead show a loading state until real data arrives.
    staleTime: 5 * 60 * 1000, // 5 minutes — prevents constant refetching that resets admin local edits
    refetchOnWindowFocus: false, // Prevents admin data loss when user switches browser tabs
  });
}

import { getUserToken } from './user-auth';

export function useUpdateCmsContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: CmsContent) => {
      const token = getUserToken();
      const res = await fetch('/api/cms/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const errorData = await res.json() as { error?: string };
        throw new Error(errorData.error || 'Failed to update CMS content');
      }
      return res.json() as Promise<{ ok: boolean }>;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cmsContent'] });
    },
  });
}
