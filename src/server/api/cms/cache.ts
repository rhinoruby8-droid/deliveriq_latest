const CACHE_TTL_MS = 5000; // 5 seconds

interface CachePayload {
  data: any;
  timestamp: number;
}

let cmsCache: CachePayload | null = null;

export function getCmsCache(): any | null {
  if (!cmsCache) return null;
  if (Date.now() - cmsCache.timestamp > CACHE_TTL_MS) {
    cmsCache = null;
    return null;
  }
  return cmsCache.data;
}

export function setCmsCache(val: any) { 
  cmsCache = { data: val, timestamp: Date.now() }; 
}

export function clearCmsCache() { 
  cmsCache = null; 
}