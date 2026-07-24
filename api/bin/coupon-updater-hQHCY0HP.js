import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { s as supabaseAdmin } from "../index.js";
import "tty";
import "util";
import "os";
import "path";
import "buffer";
import "string_decoder";
import "node:zlib";
import "node:events";
import "url";
import "node:path";
import "node:fs";
import "node:http";
import "crypto";
import "fs";
import "node:querystring";
import "node:buffer";
import "node:net";
import "stream";
import "node:url";
import "net";
import "http";
import "zlib";
import "events";
import "https";
import "node:crypto";
import "tls";
import "assert";
import "http2";
async function incrementCouponUses(code) {
  try {
    const { data: record } = await supabaseAdmin.from("settings").select("value").eq("id", "coupons").maybeSingle();
    const coupons = (record == null ? void 0 : record.value) || [];
    const updatedCoupons = coupons.map((c) => {
      if (c.code.toUpperCase() === code.trim().toUpperCase()) {
        return { ...c, uses: (c.uses || 0) + 1 };
      }
      return c;
    });
    await supabaseAdmin.from("settings").upsert({ id: "coupons", value: updatedCoupons });
    console.log(`[Coupons] Incremented uses for coupon ${code}`);
  } catch (err) {
    console.error(`[Coupons] Failed to increment uses for coupon ${code}:`, err);
  }
}
export {
  incrementCouponUses
};
