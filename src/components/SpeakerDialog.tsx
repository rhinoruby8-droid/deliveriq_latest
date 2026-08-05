import { Globe, Calendar, Clock, Linkedin, X } from 'lucide-react';
import type { Speaker } from '@/lib/cms-client';
import { useCmsContent } from '@/lib/cms-client';
import { Link } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface SpeakerDialogProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SpeakerDialog — Centralized speaker pop-up modal.
 *
 * Per .cursorrules: This component bypasses the shared shadcn DialogContent
 * wrapper entirely and renders via raw @radix-ui/react-dialog primitives
 * to avoid Tailwind class-merge conflicts with the base shadcn styles.
 *
 * Critical layout properties use inline styles (not Tailwind classes) to
 * guarantee the 2-column portrait layout renders correctly regardless of
 * Tailwind JIT compilation, class ordering, or responsive breakpoint issues.
 */
export default function SpeakerDialog({ speaker, isOpen, onClose }: SpeakerDialogProps) {
  const { data: cms } = useCmsContent();

  if (!speaker) return null;

  // Find all sessions presented by this speaker
  const speakerSessions = (cms?.sessions || []).filter(s =>
    (s.speakerIds || []).includes(speaker.id)
  );

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        />

        {/* Modal Content Shell */}
        <DialogPrimitive.Content
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            width: '95vw',
            maxWidth: '900px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
          className="bg-card border border-border text-foreground"
        >
          {/* WAI-ARIA: Visually hidden title & description */}
          <DialogPrimitive.Title className="sr-only">
            {speaker.name} - Speaker Details
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Details about {speaker.name} including bio and sessions presented.
          </DialogPrimitive.Description>

          {/* Close Button */}
          <DialogPrimitive.Close
            style={{
              position: 'absolute',
              right: '12px',
              top: '12px',
              zIndex: 60,
              borderRadius: '4px',
              padding: '6px',
              opacity: 0.7,
              cursor: 'pointer',
              border: 'none',
              transition: 'opacity 0.2s',
            }}
            className="bg-background/60 backdrop-blur-sm text-foreground hover:opacity-100"
          >
            <X style={{ width: '18px', height: '18px' }} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* ===== 2-Column Layout ===== */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              flex: 1,
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            {/* ===== LEFT COLUMN: Speaker Info ===== */}
            <div
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                borderRight: '1px solid',
              }}
              className="bg-muted/30 border-border/60 custom-scrollbar"
            >
              {/* Avatar & Identity */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {speaker.avatarUrl ? (
                  <img
                    src={speaker.avatarUrl}
                    alt={speaker.name}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid',
                      flexShrink: 0,
                      marginBottom: '16px',
                    }}
                    className="border-background bg-background shadow-sm"
                  />
                ) : null}

                <div
                  style={{
                    display: speaker.avatarUrl ? 'none' : 'flex',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    flexShrink: 0,
                  }}
                  className="bg-muted border-4 border-background shadow-sm"
                >
                  <User size={48} className="text-muted-foreground opacity-50" />
                </div>

                <h2
                  style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '4px' }}
                  className="text-foreground"
                >
                  {speaker.name}
                </h2>
                <p
                  style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '20px' }}
                  className="text-primary"
                >
                  {speaker.role} {speaker.organisation ? `at ${speaker.organisation}` : ''}
                </p>

                {/* Social Link */}
                {speaker.socialUrl && (
                  <a
                    href={speaker.socialUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      marginBottom: '24px',
                      transition: 'background-color 0.2s',
                      textDecoration: 'none',
                    }}
                    className="bg-primary/10 hover:bg-primary/20 text-primary"
                  >
                    {speaker.socialUrl.includes('linkedin.com') ? <Linkedin size={16} /> : <Globe size={16} />}
                    <span>{speaker.socialUrl.includes('linkedin.com') ? 'Connect on LinkedIn' : 'Visit Website'}</span>
                  </a>
                )}
              </div>

              {/* Sessions List */}
              {speakerSessions.length > 0 && (
                <div style={{ marginTop: 'auto' }}>
                  <h3
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '12px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid',
                    }}
                    className="text-muted-foreground border-border/40"
                  >
                    Sessions presented ({speakerSessions.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {speakerSessions.map(session => (
                      <div
                        key={session.id}
                        style={{
                          position: 'relative',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid',
                          transition: 'all 0.2s',
                        }}
                        className="group bg-background/50 hover:bg-background border-border hover:border-primary/30"
                      >
                        <Link
                          to={`/sessions/${session.id}`}
                          onClick={onClose}
                          style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                          aria-label={`View details for ${session.title}`}
                        />
                        <p
                          style={{ fontSize: '0.75rem', fontWeight: 700, lineHeight: '1.3', transition: 'color 0.2s' }}
                          className="text-foreground line-clamp-2 group-hover:text-primary"
                        >
                          {session.title}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '10px', marginTop: '8px' }} className="text-muted-foreground">
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={12} className="text-primary/70" />
                            {session.date}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={12} className="text-primary/70" />
                            {session.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ===== RIGHT COLUMN: Bio ===== */}
            <div
              style={{
                padding: '24px 32px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
              className="bg-background custom-scrollbar"
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                  position: 'sticky',
                  top: 0,
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  zIndex: 10,
                }}
                className="text-foreground bg-background/95 backdrop-blur"
              >
                Speaker Bio
              </h3>
              {speaker.bio ? (
                <div
                  style={{ fontSize: '0.9rem', lineHeight: '1.75', whiteSpace: 'pre-wrap' }}
                  className="text-muted-foreground"
                >
                  {speaker.bio}
                </div>
              ) : (
                <div style={{ fontSize: '0.875rem', fontStyle: 'italic' }} className="text-muted-foreground">
                  No biography provided.
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
