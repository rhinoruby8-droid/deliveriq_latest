import { supabaseAdmin } from './supabase';
import type { SubscriptionConfig } from '../lib/cms-client';

const DEFAULTS: SubscriptionConfig = {
  isSubscriptionActive: true,
  tier2DurationMonths: 3,
  tier3DurationMonths: 12,
  tier3PriceUSD: 199.00,
  proFeaturesList: [],
};

export async function getSubscriptionConfig(): Promise<SubscriptionConfig> {
  try {
    const { data } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'subscription_config')
      .maybeSingle();
    return { ...DEFAULTS, ...(data?.value || {}) };
  } catch {
    return DEFAULTS;
  }
}

/** Compute an expiry Date by adding N months to now */
export function addMonths(months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d;
}
