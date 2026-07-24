import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const { data: sessions, error: fetchErr } = await supabaseAdmin.from('sessions').select('id');
  if (fetchErr || !sessions) {
    console.error('Failed to fetch sessions', fetchErr);
    process.exit(1);
  }

  for (const session of sessions) {
    const fakeUrl = `https://zoom.us/j/fake-${session.id.substring(0, 8)}`;
    const { error: updateErr } = await supabaseAdmin.from('sessions').update({ registration_url: fakeUrl }).eq('id', session.id);
    if (updateErr) {
      console.error(`Failed to update ${session.id}`, updateErr);
    } else {
      console.log(`Updated ${session.id} with ${fakeUrl}`);
    }
  }

  console.log('Seeding complete.');
}

seed();
