import { useCmsContent, FALLBACK_CMS_CONTENT } from "@/lib/cms-client";

export function MarqueeTicker() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const sponsors = cms.sponsors || [];

  if (sponsors.length === 0) return null;

  // Duplicate sponsors list to ensure seamless looping
  const displaySponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="w-full overflow-hidden bg-card/20 border-y border-border/40 py-8 relative my-8 select-none">
      {/* Left/Right fading gradient mask */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #1A1D24 0%, transparent 15%, transparent 85%, #1A1D24 100%)"
        }}
      />
      
      {/* Scrolling container */}
      <div className="flex w-max items-center animate-diq-marquee gap-16 md:gap-24">
        {displaySponsors.map((sponsor, idx) => (
          <a
            key={`${sponsor.id}-${idx}`}
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105 shrink-0"
          >
            {sponsor.logoUrl ? (
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="h-10 md:h-12 w-auto object-contain max-w-[150px]"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  (e.target as HTMLElement).style.display = "none";
                  const sibling = (e.target as HTMLElement).nextElementSibling;
                  if (sibling) (sibling as HTMLElement).style.display = "block";
                }}
              />
            ) : null}
            <span 
              className="text-foreground font-bold tracking-wider text-base md:text-lg uppercase"
              style={{ display: sponsor.logoUrl ? "none" : "block" }}
            >
              {sponsor.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
