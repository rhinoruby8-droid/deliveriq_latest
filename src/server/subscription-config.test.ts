import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSubscriptionConfig, addMonths } from './subscription-config';
import { supabaseAdmin } from './supabase';

vi.mock('./supabase', () => ({
  supabaseAdmin: {
    from: vi.fn(),
  },
}));

describe('subscription-config', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('addMonths', () => {
    it('should add the specified number of months to the current date', () => {
      const result = addMonths(3);
      const expected = new Date();
      expected.setMonth(expected.getMonth() + 3);
      
      // Since it takes a few ms to execute, we can check the difference is small
      expect(Math.abs(result.getTime() - expected.getTime())).toBeLessThan(100);
    });

    it('should handle adding 0 months', () => {
      const result = addMonths(0);
      const expected = new Date();
      
      expect(Math.abs(result.getTime() - expected.getTime())).toBeLessThan(100);
    });
  });

  describe('getSubscriptionConfig', () => {
    it('should return default config on error', async () => {
      const maybeSingleMock = vi.fn().mockRejectedValue(new Error('DB Error'));
      const eqMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock });
      const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
      (supabaseAdmin.from as any).mockReturnValue({ select: selectMock });

      const config = await getSubscriptionConfig();
      expect(config.isSubscriptionActive).toBe(true);
      expect(config.tier2DurationMonths).toBe(3);
      expect(config.tier3DurationMonths).toBe(12);
    });

    it('should merge defaults with DB data', async () => {
      const dbData = {
        value: {
          isSubscriptionActive: false,
          tier2DurationMonths: 6,
        }
      };
      
      const maybeSingleMock = vi.fn().mockResolvedValue({ data: dbData });
      const eqMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock });
      const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
      (supabaseAdmin.from as any).mockReturnValue({ select: selectMock });

      const config = await getSubscriptionConfig();
      expect(config.isSubscriptionActive).toBe(false);
      expect(config.tier2DurationMonths).toBe(6);
      expect(config.tier3DurationMonths).toBe(12); // From default
      
      expect(supabaseAdmin.from).toHaveBeenCalledWith('settings');
      expect(selectMock).toHaveBeenCalledWith('value');
      expect(eqMock).toHaveBeenCalledWith('id', 'subscription_config');
    });

    it('should return default config if data is null', async () => {
      const maybeSingleMock = vi.fn().mockResolvedValue({ data: null });
      const eqMock = vi.fn().mockReturnValue({ maybeSingle: maybeSingleMock });
      const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
      (supabaseAdmin.from as any).mockReturnValue({ select: selectMock });

      const config = await getSubscriptionConfig();
      expect(config.isSubscriptionActive).toBe(true);
      expect(config.tier2DurationMonths).toBe(3);
      expect(config.tier3DurationMonths).toBe(12);
    });
  });
});
