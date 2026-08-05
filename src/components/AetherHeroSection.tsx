import React from 'react';
import AetherFlowHero from './ui/aether-flow-hero';

interface AetherHeroSectionProps {
  title: string;
  subtitle: string;
  badgeLabel: string;
  ctaLabel: string;
  scrollTargetId: string;
}

export function AetherHeroSection({
  title,
  subtitle,
  badgeLabel,
  ctaLabel,
  scrollTargetId
}: AetherHeroSectionProps) {
  // Prevent SSR rendering of the canvas component itself to avoid hydration mismatch
  // since the canvas dimensions rely on window.innerWidth/Height.
  // The component itself has useEffect guards, but this is a safer bet for SSR frameworks.
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScroll = () => {
    const el = document.getElementById(scrollTargetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isClient) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
        {/* Basic fallback while hydrating */}
      </div>
    );
  }

  return (
    <AetherFlowHero
      title={title}
      subtitle={subtitle}
      badgeLabel={badgeLabel}
      ctaLabel={ctaLabel}
      onCtaClick={handleScroll}
    />
  );
}
