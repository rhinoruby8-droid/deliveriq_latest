/**
 * Detects whether a video URL is from YouTube or Vimeo
 * and returns the appropriate privacy-safe embed URL.
 */
export type VideoProvider = 'youtube' | 'vimeo';

export interface VideoInfo {
  provider: VideoProvider;
  embedUrl: string;
  videoId: string;
}

export function parseVideoUrl(url: string): VideoInfo | null {
  if (!url) return null;

  // YouTube patterns:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  const ytMatch =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      provider: 'youtube',
      videoId,
      // Use privacy-enhanced mode (no tracking until user plays)
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
    };
  }

  // Vimeo patterns:
  // https://vimeo.com/VIDEO_ID
  // https://player.vimeo.com/video/VIDEO_ID
  const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return {
      provider: 'vimeo',
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?dnt=1&color=C79A4E`,
    };
  }

  return null;
}
