import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDb() {
  console.log('Inserting test user...');
  const { data, error } = await supabase.from('users').insert({
    email: 'test' + Date.now() + '@example.com',
    name: 'Test User',
    password_hash: 'dummy',
    role: 'admin'
  }).select('*').single();
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success! User:', data);
  }
}

checkDb().catch(console.error);
