import type { ContactPageContent } from '@/lib/cms-client';
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props { data: ContactPageContent; }

export function ContactVisual({ data }: Props) {
  const { hero, email, phone, address, formIntro } = data;
  return (
    <section className="relative overflow-hidden pt-20 pb-16 diq-contact-section">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl diq-contact-container">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 diq-contact-title">{hero.title}</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-10 diq-contact-subtitle">{hero.subtitle}</p>
        <div className="flex flex-col gap-4 mb-10 diq-contact-info-list">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors diq-contact-email-link">
              <Mail size={15} className="text-primary" /> {email}
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors diq-contact-phone-link">
              <Phone size={15} className="text-primary" /> {phone}
            </a>
          )}
          {address && (
            <div className="flex items-start gap-3 text-sm text-muted-foreground diq-contact-address-wrapper">
              <MapPin size={15} className="text-primary mt-0.5 shrink-0" /> <span>{address}</span>
            </div>
          )}
        </div>
        {formIntro && <p className="text-sm text-muted-foreground border-l-2 border-primary/40 pl-4 mb-6 diq-contact-form-intro">{formIntro}</p>}
      </div>
    </section>
  );
}
