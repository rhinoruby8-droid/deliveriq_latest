export function optimizeImage(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.includes('supabase.co/storage/v1/object/public/')) {
    return url + (url.includes('?') ? '&' : '?') + 'format=webp';
  }
  return url;
}