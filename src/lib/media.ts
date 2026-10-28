export interface YouTubeMedia {
  id: string;
  start?: number;
}

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

export function parseYouTubeMedia(value?: string | null, start?: number): YouTubeMedia | null {
  if (!value) return null;
  const raw = value.trim();
  if (!raw) return null;

  if (YOUTUBE_ID_PATTERN.test(raw)) {
    return { id: raw, start };
  }

  try {
    const url = new URL(raw);
    let id = '';

    if (url.hostname === 'youtu.be' || url.hostname.endsWith('.youtu.be')) {
      id = url.pathname.slice(1).split('/')[0];
    } else if (url.hostname.includes('youtube.com')) {
      if (url.pathname === '/watch') {
        id = url.searchParams.get('v') || '';
      } else if (url.pathname.startsWith('/embed/') || url.pathname.startsWith('/shorts/')) {
        id = url.pathname.split('/')[2] || '';
      }
    }

    if (!YOUTUBE_ID_PATTERN.test(id)) return null;
    const urlStart = Number(url.searchParams.get('start') || url.searchParams.get('t') || '');
    return { id, start: Number.isFinite(urlStart) && urlStart > 0 ? urlStart : start };
  } catch {
    return null;
  }
}

export function buildYouTubeEmbedUrl(
  value: string,
  options: { start?: number; autoplay?: boolean; muted?: boolean; loop?: boolean } = {}
): string | null {
  const media = parseYouTubeMedia(value, options.start);
  if (!media) return null;

  const params = new URLSearchParams({
    start: String(media.start || 0),
    autoplay: options.autoplay === false ? '0' : '1',
    mute: options.muted === false ? '0' : '1',
    playsinline: '1',
    rel: '0',
    modestbranding: '1'
  });
  if (options.loop !== false) {
    params.set('loop', '1');
    params.set('playlist', media.id);
  }
  return `https://www.youtube-nocookie.com/embed/${media.id}?${params.toString()}`;
}

export function buildYouTubeWatchUrl(value: string, start?: number): string | null {
  const media = parseYouTubeMedia(value, start);
  if (!media) return null;
  return `https://www.youtube.com/watch?v=${media.id}${media.start ? `&t=${media.start}s` : ''}`;
}

export function openYouTube(value: string, start?: number): void {
  const url = buildYouTubeWatchUrl(value, start);
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}
