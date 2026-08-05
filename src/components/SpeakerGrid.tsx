import { useState, useMemo } from 'react';
import type { Speaker } from '@/lib/cms-client';
import { User } from 'lucide-react';
import SpeakerDialog from './SpeakerDialog';

interface SpeakerGridProps {
  speakers: Speaker[];
}

export function SpeakerGrid({ speakers }: SpeakerGridProps) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Alphabetical sort by first name
  const sortedSpeakers = useMemo(() => {
    return [...speakers].sort((a, b) => a.name.localeCompare(b.name));
  }, [speakers]);

  if (!sortedSpeakers.length) {
    return null;
  }

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedSpeaker(null), 200); // Allow exit animation
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-background border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Meet Our Speakers</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {sortedSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="group flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden h-full"
              >
                {/* Image Section */}
                {speaker.avatarUrl ? (
                  <img
                    src={speaker.avatarUrl}
                    alt={speaker.name}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.style.display = 'none';
                      const fallbackContainer = target.nextElementSibling as HTMLElement;
                      if (fallbackContainer) fallbackContainer.style.display = 'flex';
                    }}
                    className="w-full aspect-[4/3] object-cover object-top"
                  />
                ) : null}
                {/* Fallback Icon */}
                <div
                  className="w-full aspect-[4/3] flex items-center justify-center bg-muted"
                  style={{ display: speaker.avatarUrl ? 'none' : 'flex' }}
                >
                  <User size={48} className="text-muted-foreground opacity-50" />
                </div>

                {/* Body Section */}
                <div className="p-5 flex-grow flex flex-col text-center">
                  <h3 data-testid="speaker-name" className="text-lg font-bold text-foreground">
                    {speaker.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {[speaker.role, speaker.organisation].filter(Boolean).join(' · ')}
                  </p>

                  {/* Action Button */}
                  <div className="mt-auto pt-5">
                    <button
                      onClick={() => handleSpeakerClick(speaker)}
                      className="w-full bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wide py-2.5 rounded-md hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                      aria-label={`View details for ${speaker.name}`}
                    >
                      VIEW PROFILE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpeakerDialog
        speaker={selectedSpeaker}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
