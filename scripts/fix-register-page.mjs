import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.resolve('d:/DeliverIQ/DeliverIQ/.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  console.log('Fetching current register page data...');
  const { data: page, error: fetchErr } = await supabase
    .from('pages')
    .select('*')
    .eq('id', 'register')
    .single();

  if (fetchErr) {
    console.error('Error fetching page:', fetchErr);
    process.exit(1);
  }

  console.log('Current visual_mode:', page.visual_mode);

  // 1. Update HTML layout classes to be items-start and add lg:sticky lg:top-32
  let html = page.html || '';
  html = html.replace('items-center', 'items-start');
  if (!html.includes('lg:sticky lg:top-32')) {
    html = html.replace('<div>\n        <div class="border border-[#2C2F38]', '<div class="lg:sticky lg:top-32">\n        <div class="border border-[#2C2F38]');
    html = html.replace('<div>\r\n        <div class="border border-[#2C2F38]', '<div class="lg:sticky lg:top-32">\r\n        <div class="border border-[#2C2F38]');
  }

  // 2. Prepare visual content defaults if not set
  const content = page.content || {
    visualMode: true,
    hero: {
      title: "Registrations\nopening soon!",
      subtitle: "Live sessions for project professionals who want to apply AI in real delivery work — not theory, not hype. Add your name below and we'll reach out the moment registration opens."
    },
    sections: [
      { title: "", body: "Priority notification when registration opens" },
      { title: "", body: "Early access to session topics and schedules" },
      { title: "", body: "Join a community of project professionals upskilling in AI" },
      { title: "", body: "Replay access included with every session" }
    ]
  };
  content.visualMode = true; // Force visual mode

  console.log('Updating page in database...');
  const { error: updateErr } = await supabase
    .from('pages')
    .update({
      html,
      content,
      visual_mode: true
    })
    .eq('id', 'register');

  if (updateErr) {
    console.error('Error updating page:', updateErr);
    process.exit(1);
  }

  console.log('Database updated successfully!');
}

run();
