import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDb() {
  console.log('Checking users table...');
  const { data, error } = await supabase.from('users').select('*').limit(1);
  
  if (error) {
    console.error('Error fetching users:', error);
  } else {
    console.log('Successfully fetched users table!');
    if (data && data.length > 0) {
      console.log('Sample user structure (keys):', Object.keys(data[0]));
      console.log('Role column exists:', Object.keys(data[0]).includes('role'));
    } else {
      console.log('Users table is empty but exists.');
    }
  }
}

checkDb().catch(console.error);
