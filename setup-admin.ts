import { config } from 'dotenv';
config({ path: '.env.local' });
import { supabaseAdmin } from './src/server/supabase';
import { hashPassword } from './src/server/auth';

async function setup() {
  const email = 'admin@deliveriq.live';
  const password = 'AdminPassword123!';
  const name = 'System Administrator';

  const { data: existing } = await supabaseAdmin.from('users').select('*').eq('email', email).maybeSingle();
  if (existing) {
    if (existing.role !== 'admin') {
      await supabaseAdmin.from('users').update({ role: 'admin', password_hash: hashPassword(password) }).eq('email', email);
      console.log('Updated existing user to admin with new password.');
    } else {
       await supabaseAdmin.from('users').update({ password_hash: hashPassword(password) }).eq('email', email);
       console.log('Updated admin password.');
    }
    return;
  }

  const { error } = await supabaseAdmin.from('users').insert({
    email,
    password_hash: hashPassword(password),
    name,
    role: 'admin',
    registered_session_ids: []
  });
  
  if (error) console.error('Error:', error);
  else console.log('Admin created.');
}

setup();
