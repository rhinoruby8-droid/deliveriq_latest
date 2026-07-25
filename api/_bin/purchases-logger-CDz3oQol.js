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
async function logPurchase(log, lookupId) {
  try {
    const { data: record } = await supabaseAdmin.from("settings").select("value").eq("id", "purchases").maybeSingle();
    const purchases = (record == null ? void 0 : record.value) || [];
    const searchId = lookupId || log.id;
    const index = purchases.findIndex((p) => p.id === searchId);
    if (index !== -1) {
      purchases[index] = {
        ...purchases[index],
        ...log,
        createdAt: purchases[index].createdAt || (/* @__PURE__ */ new Date()).toISOString()
      };
    } else {
      const newLog = {
        ...log,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      purchases.push(newLog);
    }
    await supabaseAdmin.from("settings").upsert({ id: "purchases", value: purchases });
    console.log(`[Purchases] Successfully logged transaction ${log.id}`);
  } catch (err) {
    console.error("Failed to log purchase transaction:", err);
  }
}
export {
  logPurchase
};
