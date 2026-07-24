import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { parseVideoUrl } from '@/lib/video-utils';

interface VideoPlayerProps {
  url: string;
  title?: string;
  /** Optional thumbnail override. If not provided, YouTube/Vimeo thumbnails are auto-fetched. */
  thumbnailUrl?: string;
  className?: string;
}

export function VideoPlayer({ url, title = 'Video', thumbnailUrl, className = '' }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const info = parseVideoUrl(url);

  if (!info) {
    // Fallback for unrecognised URLs — show a plain link
    return (
      <div className={`flex items-center justify-center border border-border rounded-sm bg-background p-6 text-center ${className}`}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-primary hover:underline flex items-center gap-2"
        >
          <PlayCircle size={16} /> Watch Video
        </a>
      </div>
    );
  }

  // Auto-generate thumbnail for YouTube if not provided
  const autoThumb =
    !thumbnailUrl && info.provider === 'youtube'
      ? `https://img.youtube.com/vi/${info.videoId}/maxresdefault.jpg`
      : thumbnailUrl;

  let iframeSrc = info.embedUrl;
  if (playing && (info.provider === 'youtube' || info.provider === 'vimeo')) {
    iframeSrc = `${info.embedUrl}&autoplay=1`;
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm bg-black ${className}`}
      style={{ aspectRatio: '16 / 9' }}
    >
      {playing ? (
        <iframe
          src={iframeSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      ) : (
        /* Thumbnail + play button overlay — no iframe until user clicks */
        <button
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {autoThumb ? (
            <img
              src={autoThumb}
              alt={title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="absolute inset-0 bg-background" />
          )}

          {/* Show branded overlay when no thumbnail is available */}
          {!autoThumb && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <span className="text-xs text-muted-foreground font-semibold">
                {info.provider === 'vimeo' && `Vimeo — ${title}`}
                {info.provider === 'googledrive' && `Google Drive — ${title}`}
                {info.provider === 'onedrive' && `OneDrive — ${title}`}
              </span>
            </div>
          )}

          {/* Dark scrim */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

          {/* Play icon */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
            <PlayCircle size={32} className="text-[#1A1D24] ml-0.5" />
          </div>

          {/* Provider badge */}
          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white/70 uppercase tracking-wider">
            {info.provider === 'youtube' && 'YouTube'}
            {info.provider === 'vimeo' && 'Vimeo'}
            {info.provider === 'googledrive' && 'Google Drive'}
            {info.provider === 'onedrive' && 'OneDrive'}
          </span>
        </button>
      )}
    </div>
  );
}
