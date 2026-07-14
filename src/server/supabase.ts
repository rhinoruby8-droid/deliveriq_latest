import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

let clientInstance: any = null;

const getClient = () => {
  if (clientInstance) return clientInstance;

  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    '';
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    '';

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Supabase environment variables (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are missing or empty.'
    );
  }

  clientInstance = createClient(supabaseUrl, supabaseServiceKey);
  return clientInstance;
};

export const supabaseAdmin: any = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});
