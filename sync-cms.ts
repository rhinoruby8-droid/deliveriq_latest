import { supabaseAdmin } from './src/server/supabase';
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/data/cms-content.json', 'utf8'));

async function sync() {
  console.log('Syncing sessions...');
  const res1 = await supabaseAdmin.from('pages').update({ html: data.sessionsPageHtml }).eq('id', 'sessions');
  console.log(res1.error || 'Sessions synced!');
  
  console.log('Syncing speakers...');
  const res2 = await supabaseAdmin.from('pages').update({ html: data.speakersPageHtml }).eq('id', 'speakers');
  console.log(res2.error || 'Speakers synced!');
  
  if (data.heroBannerConfig) {
    console.log('Syncing heroBannerConfig...');
    const res3 = await supabaseAdmin.from('settings').upsert({ id: 'hero_banner_config', value: data.heroBannerConfig });
    console.log(res3.error || 'heroBannerConfig synced!');
  }

  if (data.globalSiteContent) {
    console.log('Syncing globalSiteContent...');
    const res4 = await supabaseAdmin.from('settings').upsert({ id: 'global_site_content', value: data.globalSiteContent });
    console.log(res4.error || 'globalSiteContent synced!');
  }
}

sync();
