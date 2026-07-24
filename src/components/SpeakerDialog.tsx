import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Globe, Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Speaker } from '@/lib/cms-client';
import { useCmsContent } from '@/lib/cms-client';
import { Link } from 'react-router-dom';

interface SpeakerDialogProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SpeakerDialog({ speaker, isOpen, onClose }: SpeakerDialogProps) {
  const { data: cms } = useCmsContent();

  if (!speaker) return null;

  // Find all sessions presented by this speaker
  const speakerSessions = (cms?.sessions || []).filter(s =>
    (s.speakerIds || []).includes(speaker.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border text-foreground overflow-hidden shadow-2xl">
        <DialogHeader className="pb-4 border-b border-border/60">
          <div className="flex items-start gap-4 text-left">
            <img
              src={speaker.avatarUrl}
              alt={speaker.name}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120';
              }}
              className="w-16 h-16 rounded-full object-cover border border-border bg-background shrink-0"
            />
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold text-foreground tracking-tight">
                {speaker.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-primary font-medium mt-1">
                {speaker.role} at {speaker.organisation}
              </DialogDescription>
              {speaker.socialUrl && (
                <a
                  href={speaker.socialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
                >
                  <Globe size={12} />
                  <span>Visit website / social</span>
                </a>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Bio */}
        {speaker.bio && (
          <div className="py-4 text-sm text-muted-foreground leading-relaxed max-h-[150px] overflow-y-auto pr-1">
            {speaker.bio}
          </div>
        )}

        {/* Sessions list */}
        {speakerSessions.length > 0 && (
          <div className="pt-4 border-t border-border/60">
            <h3 className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest mb-3">
              Sessions presented ({speakerSessions.length})
            </h3>
            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
              {speakerSessions.map(session => (
                <div
                  key={session.id}
                  className="p-3 bg-background border border-border hover:border-primary/30 rounded-md transition-colors flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{session.title}</p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} className="text-primary" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="text-primary" />
                        {session.duration}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/sessions/${session.id}`}
                    onClick={onClose}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    title="View details"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
