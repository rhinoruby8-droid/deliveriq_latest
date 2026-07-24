/**
 * Detects whether a video URL is from YouTube or Vimeo
 * and returns the appropriate privacy-safe embed URL.
 */
export type VideoProvider = 'youtube' | 'vimeo' | 'googledrive' | 'onedrive';

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

  // Google Drive patterns:
  // https://drive.google.com/file/d/FILE_ID/view...
  // https://drive.google.com/open?id=FILE_ID
  const gdMatch =
    url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (gdMatch) {
    const videoId = gdMatch[1];
    return {
      provider: 'googledrive',
      videoId,
      embedUrl: `https://drive.google.com/file/d/${videoId}/preview`,
    };
  }

  // Microsoft OneDrive patterns:
  // https://onedrive.live.com/embed?resid=...&authkey=...
  // https://onedrive.live.com/redir?resid=...
  // https://1drv.ms/v/s!An_ID
  if (url.includes('onedrive.live.com') || url.includes('1drv.ms')) {
    if (url.includes('onedrive.live.com/embed')) {
      return {
        provider: 'onedrive',
        videoId: url.match(/resid=([a-zA-Z0-9!_-]+)/)?.[1] || 'embed',
        embedUrl: url,
      };
    }

    const resid = url.match(/resid=([a-zA-Z0-9!_-]+)/)?.[1];
    const authkey = url.match(/authkey=([a-zA-Z0-9!_-]+)/)?.[1];
    if (resid && authkey) {
      return {
        provider: 'onedrive',
        videoId: resid,
        embedUrl: `https://onedrive.live.com/embed?resid=${resid}&authkey=${authkey}`,
      };
    }

    if (url.includes('1drv.ms')) {
      const cleanUrl = url.trim();
      const encodeBase64 = (str: string): string => {
        if (typeof btoa === 'function') {
          return btoa(str);
        }
        return Buffer.from(str).toString('base64');
      };
      const base64Encoded = encodeBase64(cleanUrl);
      const safeBase64 = base64Encoded
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      const embedUrl = `https://api.onedrive.com/v1.0/shares/u!${safeBase64}/root/content`;
      return {
        provider: 'onedrive',
        videoId: safeBase64.substring(0, 15),
        embedUrl,
      };
    }
  }

  return null;
}
