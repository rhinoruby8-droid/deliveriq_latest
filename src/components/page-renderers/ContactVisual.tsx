import type { ContactPageContent } from '@/lib/cms-client';
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props { data: ContactPageContent; }

export function ContactVisual({ data }: Props) {
  const { hero, email, phone, address, formIntro } = data;
  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-4">{hero.title}</h1>
        <p className="text-base text-[#8A8D96] leading-relaxed mb-10">{hero.subtitle}</p>
        <div className="flex flex-col gap-4 mb-10">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-[#8A8D96] hover:text-[#C79A4E] transition-colors">
              <Mail size={15} className="text-[#C79A4E]" /> {email}
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-[#8A8D96] hover:text-[#C79A4E] transition-colors">
              <Phone size={15} className="text-[#C79A4E]" /> {phone}
            </a>
          )}
          {address && (
            <div className="flex items-start gap-3 text-sm text-[#8A8D96]">
              <MapPin size={15} className="text-[#C79A4E] mt-0.5 shrink-0" /> <span>{address}</span>
            </div>
          )}
        </div>
        {formIntro && <p className="text-sm text-[#8A8D96] border-l-2 border-[#C79A4E]/40 pl-4 mb-6">{formIntro}</p>}
      </div>
    </section>
  );
}
