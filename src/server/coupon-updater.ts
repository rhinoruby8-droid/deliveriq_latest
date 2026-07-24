import { supabaseAdmin } from './supabase';

export async function validateCoupon(code: string, sessionId?: string): Promise<{ valid: boolean; discount?: number; discountType?: 'percentage' | 'fixed'; error?: string }> {
  try {
    if (!code) return { valid: false, error: 'No code provided' };

    const { data: record } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'coupons')
      .maybeSingle();

    const coupons = record?.value || [];
    const coupon = coupons.find((c: any) => c.code.toUpperCase() === code.trim().toUpperCase());

    if (!coupon) return { valid: false, error: 'Invalid coupon code' };
    
    if (coupon.active === false) {
      return { valid: false, error: 'This coupon is inactive' };
    }

    if (coupon.maxUses !== undefined && coupon.maxUses !== null && (coupon.uses || 0) >= coupon.maxUses) {
      return { valid: false, error: 'Coupon usage limit reached' };
    }

    const now = new Date();
    if (coupon.startDate && new Date(coupon.startDate) > now) {
      return { valid: false, error: 'This coupon promotion has not started yet' };
    }

    if (coupon.endDate && new Date(coupon.endDate) < now) {
      return { valid: false, error: 'Coupon has expired' };
    }

    if (coupon.sessionId && coupon.sessionId !== 'all') {
      if (sessionId && coupon.sessionId !== sessionId) {
        return { valid: false, error: 'Coupon is not valid for this session' };
      }
    }

    return { valid: true, discount: coupon.discountPercentage, discountType: 'percentage' };
  } catch (err) {
    console.error(`[Coupons] Failed to validate coupon ${code}:`, err);
    return { valid: false, error: 'Validation error' };
  }
}

export async function incrementCouponUses(code: string) {
  try {
    const { data: record } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('id', 'coupons')
      .maybeSingle();

    const coupons = record?.value || [];
    const updatedCoupons = coupons.map((c: any) => {
      if (c.code.toUpperCase() === code.trim().toUpperCase()) {
        return { ...c, uses: (c.uses || 0) + 1 };
      }
      return c;
    });

    await supabaseAdmin
      .from('settings')
      .upsert({ id: 'coupons', value: updatedCoupons });

    console.log(`[Coupons] Incremented uses for coupon ${code}`);
  } catch (err) {
    console.error(`[Coupons] Failed to increment uses for coupon ${code}:`, err);
  }
}
